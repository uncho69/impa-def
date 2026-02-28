/**
 * Tweet Discovery Service
 * Fetches tweets from authenticated users and verifies them against project keywords
 */

import { db } from '@/lib/db';
import { users, authAccounts, tweets, projects, campaigns, epochs } from '@/lib/db/schema';
import { eq, and, isNotNull, sql, lte, gte } from 'drizzle-orm';
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
  hoursBack?: number; // If set, overrides daysBack for a precise hour window (e.g. 24 for past 24 hours)
  maxTweetsPerUser?: number; // Max tweets to process per user (default: 1000)
}

export interface CampaignKeyword {
  projectId: string;
  campaignIndex: number;
  name: string;
  nameLower: string;
  epochIndex: number;
}

/**
 * Get all active campaigns with open epochs for keyword matching (campaign name = keyword)
 */
async function getCampaignKeywords(): Promise<CampaignKeyword[]> {
  const now = new Date();
  const openEpochs = await db
    .select({
      projectId: epochs.projectId,
      campaignIndex: epochs.campaignIndex,
      epochIndex: epochs.index,
      campaignName: campaigns.name,
    })
    .from(epochs)
    .innerJoin(campaigns, and(
      eq(epochs.projectId, campaigns.projectId),
      eq(epochs.campaignIndex, campaigns.index)
    ))
    .where(
      and(
        eq(epochs.isActive, 1),
        sql`${epochs.deletedAt} IS NULL`,
        eq(campaigns.isActive, 1),
        sql`${campaigns.deletedAt} IS NULL`,
        lte(epochs.startDate, now),
        gte(epochs.endDate, now)
      )
    );

  return openEpochs.map((e) => ({
    projectId: e.projectId,
    campaignIndex: e.campaignIndex,
    name: e.campaignName,
    nameLower: e.campaignName.toLowerCase().trim(),
    epochIndex: e.epochIndex,
  }));
}

/**
 * Get all matching campaigns for tweet text (campaign name in text)
 */
function getMatchingCampaigns(
  tweetText: string,
  campaignKeywords: CampaignKeyword[]
): CampaignKeyword[] {
  const normalizedText = tweetText.toLowerCase();
  return campaignKeywords.filter((c) => normalizedText.includes(c.nameLower));
}

/**
 * Discover and verify tweets for a single user.
 * A tweet can match multiple campaigns (e.g. contains "Extended" and "Hyperliquid"); we insert one row per match.
 */
async function discoverUserTweets(
  userId: string,
  twitterUserId: string,
  accessToken: string,
  campaignKeywords: CampaignKeyword[],
  options: DiscoveryOptions
): Promise<{
  verified: number;
  rejected: number;
  errors: string[];
}> {
  const client = getXAPIClient();
  const endTime = new Date();
  const startTime = new Date();
  if (options.hoursBack) {
    startTime.setHours(startTime.getHours() - options.hoursBack);
  } else {
    startTime.setDate(startTime.getDate() - (options.daysBack || 30));
  }

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
        const matchingCampaigns = getMatchingCampaigns(tweet.text, campaignKeywords);

        for (const campaign of matchingCampaigns) {
          const existingTweet = await db
            .select()
            .from(tweets)
            .where(
              and(
                eq(tweets.postId, tweet.id),
                eq(tweets.projectId, campaign.projectId),
                eq(tweets.campaignIndex, campaign.campaignIndex),
                eq(tweets.epochIndex, campaign.epochIndex)
              )
            )
            .limit(1);

          if (existingTweet.length > 0) {
            const existing = existingTweet[0];
            if (existing.isVerified === null) {
              await db
                .update(tweets)
                .set({
                  isVerified: 1,
                  verifiedAt: new Date(),
                  verifiedBy: 'system',
                  content: tweet.text,
                  updatedAt: new Date(),
                })
                .where(eq(tweets.id, existing.id));
              verifiedCount++;
            } else if (existing.isVerified === 1) {
              await db
                .update(tweets)
                .set({ content: tweet.text, updatedAt: new Date() })
                .where(eq(tweets.id, existing.id));
            }
          } else {
            await db.insert(tweets).values({
              postId: tweet.id,
              projectId: campaign.projectId,
              campaignIndex: campaign.campaignIndex,
              epochIndex: campaign.epochIndex,
              userId,
              twitterUserId,
              content: tweet.text,
              postedAt: new Date(tweet.created_at),
              likes: tweet.public_metrics?.like_count || 0,
              replies: tweet.public_metrics?.reply_count || 0,
              retweets: tweet.public_metrics?.retweet_count || 0,
              quotes: tweet.public_metrics?.quote_count || 0,
              isVerified: 1,
              verifiedAt: new Date(),
              verifiedBy: 'system',
              isActive: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
            verifiedCount++;
          }
        }

        if (matchingCampaigns.length === 0) {
          rejectedCount++;
        }

        if (options.maxTweetsPerUser && totalProcessed >= options.maxTweetsPerUser) {
          break;
        }
      }

      nextToken = result.nextToken;
    } while (nextToken && (!options.maxTweetsPerUser || totalProcessed < options.maxTweetsPerUser));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    errors.push(`Error processing tweets for user ${userId}: ${errorMessage}`);
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

  // Get campaign keywords (campaign names) for matching; each has an open epoch
  const campaignKeywords = await getCampaignKeywords();

  if (campaignKeywords.length === 0) {
    console.warn('No active campaigns with open epochs found for keyword matching');
    return [];
  }

  console.log(`Found ${authenticatedUsers.length} authenticated users`);
  console.log(`Using ${campaignKeywords.length} campaign keywords for matching`);

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
        campaignKeywords,
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

