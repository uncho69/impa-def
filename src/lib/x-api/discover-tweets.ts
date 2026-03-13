/**
 * Tweet Discovery Service
 * Fetches tweets from authenticated users and verifies them against project keywords
 */

import { db } from '@/lib/db';
import { users, authAccounts, tweets, projects, epochs } from '@/lib/db/schema';
import { eq, and, isNotNull, sql, lte, gte, asc } from 'drizzle-orm';
import { getXAPIClient } from './client';

type ProjectWithId = { id: string; name: string };

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
 * Get all active projects (id + name) for keyword matching and epoch assignment
 */
async function getActiveProjects(): Promise<ProjectWithId[]> {
  const list = await db
    .select({ id: projects.id, name: projects.name })
    .from(projects)
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
  return list;
}

/**
 * Find first matching project by keyword in tweet text (case-insensitive). Returns project id or null.
 */
function getMatchingProjectId(tweetText: string, projectList: ProjectWithId[]): string | null {
  const normalized = tweetText.toLowerCase();
  for (const p of projectList) {
    if (normalized.includes(p.name.toLowerCase().trim())) return p.id;
  }
  return null;
}

/**
 * Find an active epoch for the given project that contains the given date (startDate <= date <= endDate).
 * Returns { projectId, campaignIndex, epochIndex } or null.
 */
async function findEpochForProjectAndDate(
  projectId: string,
  date: Date
): Promise<{ projectId: string; campaignIndex: number; epochIndex: number } | null> {
  const list = await db
    .select({
      projectId: epochs.projectId,
      campaignIndex: epochs.campaignIndex,
      index: epochs.index,
      startDate: epochs.startDate,
      endDate: epochs.endDate,
    })
    .from(epochs)
    .where(
      and(
        eq(epochs.projectId, projectId),
        eq(epochs.isActive, 1),
        sql`${epochs.deletedAt} IS NULL`,
        lte(epochs.startDate, date),
        gte(epochs.endDate, date)
      )
    )
    .orderBy(asc(epochs.startDate))
    .limit(1);
  if (list.length === 0) return null;
  return {
    projectId: list[0].projectId,
    campaignIndex: list[0].campaignIndex,
    epochIndex: list[0].index,
  };
}

/**
 * Discover and verify tweets for a single user.
 * A tweet can match multiple campaigns (e.g. contains "Extended" and "Hyperliquid"); we insert one row per match.
 */
async function discoverUserTweets(
  userId: string,
  twitterUserId: string,
  accessToken: string,
  projectList: ProjectWithId[],
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

        const matchingProjectId = getMatchingProjectId(tweet.text, projectList);
        const isVerified = !!matchingProjectId;
        const postedAt = new Date(tweet.created_at);
        const epochAssignment = isVerified
          ? await findEpochForProjectAndDate(matchingProjectId, postedAt)
          : null;

        const epochFields = epochAssignment
          ? {
              projectId: epochAssignment.projectId,
              campaignIndex: epochAssignment.campaignIndex,
              epochIndex: epochAssignment.epochIndex,
            }
          : {};

        const existingTweet = await db
          .select()
          .from(tweets)
          .where(eq(tweets.postId, tweet.id))
          .limit(1);

        if (existingTweet.length > 0) {
          const existing = existingTweet[0];
          if (existing.isVerified === null) {
            await db
              .update(tweets)
              .set({
                isVerified: isVerified ? 1 : -1,
                verifiedAt: new Date(),
                verifiedBy: 'system',
                content: tweet.text,
                updatedAt: new Date(),
                ...epochFields,
              })
              .where(eq(tweets.id, existing.id));
            if (isVerified) verifiedCount++;
            else rejectedCount++;
          } else if (existing.isVerified === 1 && isVerified) {
            await db
              .update(tweets)
              .set({
                content: tweet.text,
                updatedAt: new Date(),
                ...(Object.keys(epochFields).length ? epochFields : {}),
              })
              .where(eq(tweets.id, existing.id));
          }
        } else {
          await db.insert(tweets).values({
            postId: tweet.id,
            userId: userId,
            twitterUserId: twitterUserId,
            content: tweet.text,
            postedAt,
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
            ...epochFields,
          });
          if (isVerified) verifiedCount++;
          else rejectedCount++;
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

  const projectList = await getActiveProjects();
  if (projectList.length === 0) {
    console.warn('No active projects found for keyword matching');
    return [];
  }

  console.log(`Found ${authenticatedUsers.length} authenticated users`);
  console.log(`Using ${projectList.length} projects for matching`);

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
        projectList,
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

