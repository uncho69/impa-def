/**
 * Metrics Update Service
 * Fetches and updates tweet metrics (likes, replies, retweets, quotes, impressions)
 * from X API and updates PostgreSQL
 */

import { db } from '@/lib/db';
import { tweets, authAccounts, users } from '@/lib/db/schema';
import { eq, and, isNotNull, sql } from 'drizzle-orm';
import { getXAPIClient } from './client';

export interface MetricsUpdateResult {
  tweetsUpdated: number;
  tweetsWithImpressions: number;
  errors: string[];
  usersSkipped: string[]; // Users with expired tokens
}

/**
 * Update metrics for verified tweets
 */
export async function updateTweetMetrics(
  options?: {
    batchSize?: number; // Batch size for API calls (default: 100)
    maxTweets?: number; // Max tweets to update (default: all)
  }
): Promise<MetricsUpdateResult> {
  const client = getXAPIClient();
  const batchSize = options?.batchSize || 100;
  
  // Get all verified tweets that need updating
  const verifiedTweets = await db
    .select({
      id: tweets.id,
      postId: tweets.postId,
      userId: tweets.userId,
      twitterUserId: tweets.twitterUserId,
    })
    .from(tweets)
    .where(
      and(
        eq(tweets.isVerified, 1),
        eq(tweets.isActive, 1),
        sql`${tweets.deletedAt} IS NULL`
      )
    )
    .limit(options?.maxTweets || 10000); // Default limit to avoid memory issues

  if (verifiedTweets.length === 0) {
    return {
      tweetsUpdated: 0,
      tweetsWithImpressions: 0,
      errors: [],
      usersSkipped: [],
    };
  }

  console.log(`Updating metrics for ${verifiedTweets.length} verified tweets`);

  // Get bearer token from environment (for public metrics)
  const bearerToken = process.env.X_API_BEARER_TOKEN;
  if (!bearerToken) {
    throw new Error('X_API_BEARER_TOKEN environment variable is required');
  }

  // Group tweets by user for impressions fetching
  const tweetsByUser = new Map<string, typeof verifiedTweets>();
  for (const tweet of verifiedTweets) {
    if (tweet.userId) {
      if (!tweetsByUser.has(tweet.userId)) {
        tweetsByUser.set(tweet.userId, []);
      }
      tweetsByUser.get(tweet.userId)!.push(tweet);
    }
  }

  // Fetch public metrics in batches (using bearer token)
  const allTweetIds = verifiedTweets.map((t) => t.postId);
  const publicMetrics = await client.getTweetMetrics(allTweetIds, {
    bearerToken,
  });

  // Create a map for quick lookup
  const metricsMap = new Map(
    publicMetrics.map((m) => [m.tweetId, m])
  );

  let tweetsUpdated = 0;
  let tweetsWithImpressions = 0;
  const errors: string[] = [];
  const usersSkipped = new Set<string>();

  // Update public metrics
  for (const tweet of verifiedTweets) {
    const metrics = metricsMap.get(tweet.postId);
    if (!metrics) {
      errors.push(`No metrics found for tweet ${tweet.postId}`);
      continue;
    }

    try {
      await db
        .update(tweets)
        .set({
          likes: metrics.likes,
          replies: metrics.replies,
          retweets: metrics.retweets,
          quotes: metrics.quotes,
          updatedAt: new Date(),
        })
        .where(eq(tweets.id, tweet.id));

      tweetsUpdated++;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`Error updating tweet ${tweet.postId}: ${errorMessage}`);
    }
  }

  // Fetch impressions for each user's tweets (requires user OAuth token)
  for (const [userId, userTweets] of tweetsByUser.entries()) {
    // Get user's OAuth token
    const authAccount = await db
      .select({
        accessToken: authAccounts.accessToken,
        expiresAt: authAccounts.expiresAt,
      })
      .from(authAccounts)
      .where(
        and(
          eq(authAccounts.userId, userId),
          eq(authAccounts.provider, 'twitter'),
          eq(authAccounts.isActive, 1),
          isNotNull(authAccounts.accessToken)
        )
      )
      .limit(1);

    if (authAccount.length === 0 || !authAccount[0].accessToken) {
      usersSkipped.add(userId);
      continue;
    }

    const { accessToken, expiresAt } = authAccount[0];

    // Check if token is expired
    if (expiresAt && expiresAt < new Date()) {
      usersSkipped.add(userId);
      continue;
    }

    // Fetch impressions for user's tweets
    // Note: Impressions are only available for posts owned by the authenticated user
    // and only for posts from the last 30 days
    for (const tweet of userTweets) {
      try {
        const metrics = await client.getTweetWithImpressions(
          tweet.postId,
          accessToken
        );

        if (metrics && metrics.impressions !== undefined) {
          await db
            .update(tweets)
            .set({
              impressions: metrics.impressions,
              updatedAt: new Date(),
            })
            .where(eq(tweets.id, tweet.id));

          tweetsWithImpressions++;

          // Small delay to avoid rate limits
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        // Handle token expiration
        if (errorMessage === 'UNAUTHORIZED_TOKEN_EXPIRED') {
          usersSkipped.add(userId);
          break; // Stop processing this user's tweets
        } else {
          // Other errors (e.g., tweet not found, not owned by user, etc.)
          // These are expected for some tweets, so we just log and continue
          console.debug(
            `Could not fetch impressions for tweet ${tweet.postId}: ${errorMessage}`
          );
        }
      }
    }
  }

  return {
    tweetsUpdated,
    tweetsWithImpressions,
    errors,
    usersSkipped: Array.from(usersSkipped),
  };
}

