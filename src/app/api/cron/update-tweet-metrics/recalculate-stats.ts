/**
 * Recalculate leaderboard stats for verified tweets
 * This is called after metrics are updated to ensure leaderboards are accurate
 */

import { db } from '@/lib/db';
import { tweets, userEpochScores, epochs, users } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { calculatePoints } from '@/lib/points-config';

/**
 * Recalculate stats for all verified tweets that were recently updated
 * This ensures leaderboard scores are accurate after metrics updates
 */
export async function recalculateStatsForVerifiedTweets(): Promise<number> {
  // Get all verified tweets that need stat recalculation
  // We'll recalculate stats for tweets updated in the last hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const updatedTweets = await db
    .select({
      id: tweets.id,
      userId: tweets.userId,
      projectId: tweets.projectId,
      campaignIndex: tweets.campaignIndex,
      epochIndex: tweets.epochIndex,
      likes: tweets.likes,
      replies: tweets.replies,
      retweets: tweets.retweets,
      quotes: tweets.quotes,
      impressions: tweets.impressions,
    })
    .from(tweets)
    .where(
      and(
        eq(tweets.isVerified, 1),
        eq(tweets.isActive, 1),
        sql`${tweets.updatedAt} >= ${oneHourAgo}`,
        sql`${tweets.deletedAt} IS NULL`
      )
    );

  let recalculated = 0;

  for (const tweet of updatedTweets) {
    if (
      !tweet.userId ||
      !tweet.projectId ||
      tweet.campaignIndex === null ||
      tweet.epochIndex === null
    ) {
      continue;
    }

    try {
      await updateStatsForTweet(
        {
          likes: tweet.likes || 0,
          replies: tweet.replies || 0,
          retweets: tweet.retweets || 0,
          quotes: tweet.quotes || 0,
          impressions: tweet.impressions || 0,
        },
        tweet.userId,
        tweet.projectId,
        tweet.campaignIndex,
        tweet.epochIndex
      );
      recalculated++;
    } catch (error) {
      console.error(
        `Error recalculating stats for tweet ${tweet.id}:`,
        error
      );
    }
  }

  return recalculated;
}

async function updateStatsForTweet(
  tweet: {
    likes: number;
    replies: number;
    retweets: number;
    quotes: number;
    impressions: number;
  },
  userId: string,
  projectId: string,
  campaignIndex: number,
  epochIndex: number
) {
  // Calculate points (you may want to include impressions in point calculation)
  const points = calculatePoints(
    tweet.likes,
    tweet.replies,
    tweet.retweets,
    tweet.quotes
  );

  // Update user epoch scores
  const existingScore = await db
    .select()
    .from(userEpochScores)
    .where(
      and(
        eq(userEpochScores.projectId, projectId),
        eq(userEpochScores.campaignIndex, campaignIndex),
        eq(userEpochScores.epochIndex, epochIndex),
        eq(userEpochScores.userId, userId)
      )
    )
    .limit(1);

  if (existingScore.length > 0) {
    // Recalculate totals by summing all tweets for this user/epoch
    const allTweets = await db
      .select({
        likes: tweets.likes,
        replies: tweets.replies,
        retweets: tweets.retweets,
        quotes: tweets.quotes,
      })
      .from(tweets)
      .where(
        and(
          eq(tweets.userId, userId),
          eq(tweets.projectId, projectId),
          eq(tweets.campaignIndex, campaignIndex),
          eq(tweets.epochIndex, epochIndex),
          eq(tweets.isVerified, 1),
          eq(tweets.isActive, 1),
          sql`${tweets.deletedAt} IS NULL`
        )
      );

    const totals = allTweets.reduce(
      (acc, t) => ({
        points: acc.points + calculatePoints(t.likes || 0, t.replies || 0, t.retweets || 0, t.quotes || 0),
        likes: acc.likes + (t.likes || 0),
        replies: acc.replies + (t.replies || 0),
        retweets: acc.retweets + (t.retweets || 0),
        quotes: acc.quotes + (t.quotes || 0),
      }),
      { points: 0, likes: 0, replies: 0, retweets: 0, quotes: 0 }
    );

    await db
      .update(userEpochScores)
      .set({
        points: totals.points,
        tweetCount: allTweets.length,
        totalLikes: totals.likes,
        totalReplies: totals.replies,
        totalRetweets: totals.retweets,
        totalQuotes: totals.quotes,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(userEpochScores.projectId, projectId),
          eq(userEpochScores.campaignIndex, campaignIndex),
          eq(userEpochScores.epochIndex, epochIndex),
          eq(userEpochScores.userId, userId)
        )
      );
  }

  // Update epoch totals
  const epoch = await db
    .select()
    .from(epochs)
    .where(
      and(
        eq(epochs.projectId, projectId),
        eq(epochs.campaignIndex, campaignIndex),
        eq(epochs.index, epochIndex)
      )
    )
    .limit(1);

  if (epoch.length > 0) {
    const allEpochTweets = await db
      .select({
        likes: tweets.likes,
        replies: tweets.replies,
        retweets: tweets.retweets,
        quotes: tweets.quotes,
      })
      .from(tweets)
      .where(
        and(
          eq(tweets.projectId, projectId),
          eq(tweets.campaignIndex, campaignIndex),
          eq(tweets.epochIndex, epochIndex),
          eq(tweets.isVerified, 1),
          eq(tweets.isActive, 1),
          sql`${tweets.deletedAt} IS NULL`
        )
      );

    const epochTotals = allEpochTweets.reduce(
      (acc, t) => ({
        points: acc.points + calculatePoints(t.likes || 0, t.replies || 0, t.retweets || 0, t.quotes || 0),
        likes: acc.likes + (t.likes || 0),
        replies: acc.replies + (t.replies || 0),
        retweets: acc.retweets + (t.retweets || 0),
        quotes: acc.quotes + (t.quotes || 0),
      }),
      { points: 0, likes: 0, replies: 0, retweets: 0, quotes: 0 }
    );

    await db
      .update(epochs)
      .set({
        tweetCount: allEpochTweets.length,
        totalLikes: epochTotals.likes,
        totalReplies: epochTotals.replies,
        totalRetweets: epochTotals.retweets,
        totalQuotes: epochTotals.quotes,
        totalPoints: epochTotals.points,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(epochs.projectId, projectId),
          eq(epochs.campaignIndex, campaignIndex),
          eq(epochs.index, epochIndex)
        )
      );
  }

  // Update user totals
  const userTweets = await db
    .select({
      likes: tweets.likes,
      replies: tweets.replies,
      retweets: tweets.retweets,
      quotes: tweets.quotes,
    })
    .from(tweets)
    .where(
      and(
        eq(tweets.userId, userId),
        eq(tweets.isVerified, 1),
        eq(tweets.isActive, 1),
        sql`${tweets.deletedAt} IS NULL`
      )
    );

  const userTotals = userTweets.reduce(
    (acc, t) => ({
      points: acc.points + calculatePoints(t.likes || 0, t.replies || 0, t.retweets || 0, t.quotes || 0),
      likes: acc.likes + (t.likes || 0),
      replies: acc.replies + (t.replies || 0),
      retweets: acc.retweets + (t.retweets || 0),
      quotes: acc.quotes + (t.quotes || 0),
    }),
    { points: 0, likes: 0, replies: 0, retweets: 0, quotes: 0 }
  );

  await db
    .update(users)
    .set({
      totalPoints: userTotals.points,
      totalLikes: userTotals.likes,
      totalReplies: userTotals.replies,
      totalRetweets: userTotals.retweets,
      totalQuotes: userTotals.quotes,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
}

