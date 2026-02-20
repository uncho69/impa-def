/**
 * Tweet Discovery Service
 * Fetches tweets from authenticated users and verifies them against project keywords
 */

import { db } from '@/lib/db';
import { users, authAccounts, tweets, projects } from '@/lib/db/schema';
import { eq, and, isNotNull, sql } from 'drizzle-orm';
import { getXAPIClient } from './client';

export interface DiscoveryResult {
  userId: string;
  twitterUserId: string;
  tweetsProcessed: number;
  tweetsVerified: number;
  tweetsRejected: number;
  errors: string[];
}

export interface DiscoveryOptions {
  daysBack?: number; // How many days back to fetch tweets (default: 30)
  maxTweetsPerUser?: number; // Max tweets to process per user (default: 1000)
}

/**
 * Get all active project names for keyword matching
 */
async function getProjectKeywords(): Promise<string[]> {
  const activeProjects = await db
    .select({ name: projects.name })
    .from(projects)
    .where(
      and(
        eq(projects.isActive, 1),
        sql`${projects.deletedAt} IS NULL`
      )
    );

  return activeProjects.map((p) => p.name.toLowerCase().trim());
}

/**
 * Check if tweet content contains any project keywords
 */
function containsProjectKeywords(
  tweetText: string,
  keywords: string[]
): boolean {
  const normalizedText = tweetText.toLowerCase();
  
  return keywords.some((keyword) => {
    // Case-insensitive matching
    // Could enhance with word boundary matching if needed
    return normalizedText.includes(keyword.toLowerCase());
  });
}

/**
 * Discover and verify tweets for a single user
 */
async function discoverUserTweets(
  userId: string,
  twitterUserId: string,
  accessToken: string,
  keywords: string[],
  options: DiscoveryOptions
): Promise<{
  verified: number;
  rejected: number;
  errors: string[];
}> {
  const client = getXAPIClient();
  const endTime = new Date();
  const startTime = new Date();
  startTime.setDate(startTime.getDate() - (options.daysBack || 30));

  let verifiedCount = 0;
  let rejectedCount = 0;
  const errors: string[] = [];
  let nextToken: string | undefined;
  let totalProcessed = 0;

  try {
    do {
      const result = await client.getUserTweets(twitterUserId, accessToken, {
        maxResults: 100,
        startTime,
        endTime,
        paginationToken: nextToken,
      });

      for (const tweet of result.tweets) {
        totalProcessed++;

        // Check if tweet already exists
        const existingTweet = await db
          .select()
          .from(tweets)
          .where(eq(tweets.postId, tweet.id))
          .limit(1);

        const isVerified = containsProjectKeywords(tweet.text, keywords);

        if (existingTweet.length > 0) {
          // Update existing tweet
          const existing = existingTweet[0];
          
          // Only update verification status if it hasn't been verified yet
          if (existing.isVerified === null) {
            await db
              .update(tweets)
              .set({
                isVerified: isVerified ? 1 : -1,
                verifiedAt: new Date(),
                verifiedBy: 'system',
                content: tweet.text, // Update content in case it changed
                updatedAt: new Date(),
              })
              .where(eq(tweets.id, existing.id));

            if (isVerified) verifiedCount++;
            else rejectedCount++;
          } else if (existing.isVerified === 1 && isVerified) {
            // Already verified, just update content
            await db
              .update(tweets)
              .set({
                content: tweet.text,
                updatedAt: new Date(),
              })
              .where(eq(tweets.id, existing.id));
          }
        } else {
          // Insert new tweet
          await db.insert(tweets).values({
            postId: tweet.id,
            userId: userId,
            twitterUserId: twitterUserId,
            content: tweet.text,
            postedAt: new Date(tweet.created_at),
            likes: tweet.public_metrics?.like_count || 0,
            replies: tweet.public_metrics?.reply_count || 0,
            retweets: tweet.public_metrics?.retweet_count || 0,
            quotes: tweet.public_metrics?.quote_count || 0,
            isVerified: isVerified ? 1 : -1,
            verifiedAt: new Date(),
            verifiedBy: 'system',
            isActive: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          if (isVerified) verifiedCount++;
          else rejectedCount++;
        }

        // Stop if we've processed enough tweets
        if (options.maxTweetsPerUser && totalProcessed >= options.maxTweetsPerUser) {
          break;
        }
      }

      nextToken = result.nextToken;
    } while (nextToken && (!options.maxTweetsPerUser || totalProcessed < options.maxTweetsPerUser));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    errors.push(`Error processing tweets for user ${userId}: ${errorMessage}`);
    
    // If it's a token expiration error, mark it
    if (errorMessage === 'UNAUTHORIZED_TOKEN_EXPIRED') {
      errors.push(`Token expired for user ${userId} - re-authentication required`);
    }
  }

  return { verified: verifiedCount, rejected: rejectedCount, errors };
}

/**
 * Discover tweets for all authenticated users
 */
export async function discoverTweetsForAllUsers(
  options: DiscoveryOptions = {}
): Promise<DiscoveryResult[]> {
  // Get all users with active Twitter authentication
  const authenticatedUsers = await db
    .select({
      userId: users.id,
      twitterUserId: users.twitterId,
      accessToken: authAccounts.accessToken,
      tokenExpiresAt: authAccounts.expiresAt,
    })
    .from(users)
    .innerJoin(authAccounts, eq(users.id, authAccounts.userId))
    .where(
      and(
        eq(users.isActive, 1),
        eq(authAccounts.provider, 'twitter'),
        eq(authAccounts.isActive, 1),
        isNotNull(authAccounts.accessToken),
        isNotNull(users.twitterId),
        sql`${users.deletedAt} IS NULL`,
        sql`${authAccounts.accessToken} IS NOT NULL`
      )
    );

  if (authenticatedUsers.length === 0) {
    console.log('No authenticated users found with Twitter OAuth tokens');
    return [];
  }

  // Get project keywords once
  const keywords = await getProjectKeywords();
  
  if (keywords.length === 0) {
    console.warn('No active projects found for keyword matching');
    return [];
  }

  console.log(`Found ${authenticatedUsers.length} authenticated users`);
  console.log(`Using ${keywords.length} project keywords for matching`);

  const results: DiscoveryResult[] = [];

  // Process users sequentially to avoid rate limits
  for (const user of authenticatedUsers) {
    // Check if token is expired
    if (user.tokenExpiresAt && user.tokenExpiresAt < new Date()) {
      console.warn(
        `Token expired for user ${user.userId} (expired at ${user.tokenExpiresAt.toISOString()})`
      );
      results.push({
        userId: user.userId,
        twitterUserId: user.twitterUserId || '',
        tweetsProcessed: 0,
        tweetsVerified: 0,
        tweetsRejected: 0,
        errors: ['Token expired - re-authentication required'],
      });
      continue;
    }

    if (!user.accessToken || !user.twitterUserId) {
      console.warn(`Missing access token or Twitter ID for user ${user.userId}`);
      continue;
    }

    try {
      const result = await discoverUserTweets(
        user.userId,
        user.twitterUserId,
        user.accessToken,
        keywords,
        options
      );

      results.push({
        userId: user.userId,
        twitterUserId: user.twitterUserId,
        tweetsProcessed: result.verified + result.rejected,
        tweetsVerified: result.verified,
        tweetsRejected: result.rejected,
        errors: result.errors,
      });

      // Small delay between users to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Handle token expiration
      if (errorMessage === 'UNAUTHORIZED_TOKEN_EXPIRED') {
        results.push({
          userId: user.userId,
          twitterUserId: user.twitterUserId || '',
          tweetsProcessed: 0,
          tweetsVerified: 0,
          tweetsRejected: 0,
          errors: ['Token expired - re-authentication required'],
        });
      } else {
        results.push({
          userId: user.userId,
          twitterUserId: user.twitterUserId || '',
          tweetsProcessed: 0,
          tweetsVerified: 0,
          tweetsRejected: 0,
          errors: [errorMessage],
        });
      }
    }
  }

  return results;
}

