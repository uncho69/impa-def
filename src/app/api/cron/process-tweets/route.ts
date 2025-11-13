import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tweets, users, userEpochScores, epochs } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { fetchTweetsFromSnowflake } from '@/lib/snowflake/queries';
import { calculatePoints } from '@/lib/points-config';

export async function POST(request: NextRequest) {
  try {
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
      const authHeader = request.headers.get('authorization');
      if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    const projectId = searchParams.get('projectId');
    const campaignIndex = searchParams.get('campaignIndex');
    const epochIndex = searchParams.get('epochIndex');

    const endDate = endDateParam ? new Date(endDateParam) : new Date();
    const startDate = startDateParam
      ? new Date(startDateParam)
      : new Date(endDate.getTime() - 24 * 60 * 60 * 1000);

    console.log(`Processing tweets from ${startDate.toISOString()} to ${endDate.toISOString()}`);

    let snowflakeTweets;
    try {
      snowflakeTweets = await fetchTweetsFromSnowflake(startDate, endDate);
      console.log(`Fetched ${snowflakeTweets.length} tweets from Snowflake`);
    } catch (error) {
      console.error('Error fetching tweets from Snowflake:', error);
      return NextResponse.json(
        { error: 'Failed to fetch tweets from Snowflake', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }

    if (snowflakeTweets.length === 0) {
      return NextResponse.json(
        { message: 'No tweets to process', processed: 0 },
        { status: 200 }
      );
    }

    let processedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const tweetData of snowflakeTweets) {
      try {
        const existingTweet = await db
          .select()
          .from(tweets)
          .where(eq(tweets.postId, tweetData.tweet_id))
          .limit(1);

        if (existingTweet.length > 0) {
          const existing = existingTweet[0];
          const newLikes = tweetData.likes || 0;
          const newReplies = tweetData.replies || 0;
          const newRetweets = tweetData.retweets || 0;
          const newQuotes = tweetData.quotes || 0;

          if (
            existing.likes !== newLikes ||
            existing.replies !== newReplies ||
            existing.retweets !== newRetweets ||
            existing.quotes !== newQuotes
          ) {
            await db
              .update(tweets)
              .set({
                likes: newLikes,
                replies: newReplies,
                retweets: newRetweets,
                quotes: newQuotes,
                updatedAt: new Date(),
              })
              .where(eq(tweets.id, existing.id));

            await recalculateStatsForTweet(existing);
          }

          skippedCount++;
          continue;
        }

        let userId: string | null = null;
        if (tweetData.user_id) {
          const user = await db
            .select()
            .from(users)
            .where(eq(users.twitterId, tweetData.user_id))
            .limit(1);

          if (user.length > 0) {
            userId = user[0].id;
          }
        }

        const tweetProjectId = projectId || null;
        const tweetCampaignIndex = campaignIndex ? parseInt(campaignIndex, 10) : null;
        const tweetEpochIndex = epochIndex ? parseInt(epochIndex, 10) : null;

        const [newTweet] = await db
          .insert(tweets)
          .values({
            postId: tweetData.tweet_id,
            userId: userId,
            twitterUserId: tweetData.user_id,
            content: tweetData.content || null,
            postedAt: tweetData.posted_at ? new Date(tweetData.posted_at) : null,
            likes: tweetData.likes || 0,
            replies: tweetData.replies || 0,
            retweets: tweetData.retweets || 0,
            quotes: tweetData.quotes || 0,
            hashtags: tweetData.hashtags ? JSON.stringify(tweetData.hashtags) : null,
            taggedUsers: tweetData.tagged_users ? JSON.stringify(tweetData.tagged_users) : null,
            hasImage: tweetData.has_image ? 1 : 0,
            hasVideo: tweetData.has_video ? 1 : 0,
            projectId: tweetProjectId,
            campaignIndex: tweetCampaignIndex,
            epochIndex: tweetEpochIndex,
            isActive: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .returning();

        if (userId && tweetProjectId && tweetCampaignIndex !== null && tweetEpochIndex !== null) {
          await updateStatsForTweet(newTweet, userId, tweetProjectId, tweetCampaignIndex, tweetEpochIndex);
        }

        processedCount++;
      } catch (error) {
        errorCount++;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Error processing tweet ${tweetData.tweet_id}: ${errorMessage}`);
        console.error(`Error processing tweet ${tweetData.tweet_id}:`, error);
      }
    }

    return NextResponse.json(
      {
        message: 'Tweet processing completed',
        processed: processedCount,
        skipped: skippedCount,
        errors: errorCount,
        errorDetails: errors.slice(0, 10),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in process-tweets cron job:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


interface TweetData {
  likes?: number | null;
  replies?: number | null;
  retweets?: number | null;
  quotes?: number | null;
}

async function updateStatsForTweet(
  tweet: TweetData,
  userId: string,
  projectId: string,
  campaignIndex: number,
  epochIndex: number
) {
  const points = calculatePoints(tweet.likes, tweet.replies, tweet.retweets, tweet.quotes);

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
    await db
      .update(userEpochScores)
      .set({
        points: sql`${userEpochScores.points} + ${points}`,
        tweetCount: sql`${userEpochScores.tweetCount} + 1`,
        totalLikes: sql`${userEpochScores.totalLikes} + ${tweet.likes || 0}`,
        totalReplies: sql`${userEpochScores.totalReplies} + ${tweet.replies || 0}`,
        totalRetweets: sql`${userEpochScores.totalRetweets} + ${tweet.retweets || 0}`,
        totalQuotes: sql`${userEpochScores.totalQuotes} + ${tweet.quotes || 0}`,
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
  } else {
    await db.insert(userEpochScores).values({
      projectId,
      campaignIndex,
      epochIndex,
      userId,
      points: points,
      tweetCount: 1,
      totalLikes: tweet.likes || 0,
      totalReplies: tweet.replies || 0,
      totalRetweets: tweet.retweets || 0,
      totalQuotes: tweet.quotes || 0,
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

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
    await db
      .update(epochs)
      .set({
        tweetCount: sql`${epochs.tweetCount} + 1`,
        totalLikes: sql`${epochs.totalLikes} + ${tweet.likes || 0}`,
        totalReplies: sql`${epochs.totalReplies} + ${tweet.replies || 0}`,
        totalRetweets: sql`${epochs.totalRetweets} + ${tweet.retweets || 0}`,
        totalQuotes: sql`${epochs.totalQuotes} + ${tweet.quotes || 0}`,
        totalPoints: sql`${epochs.totalPoints} + ${points}`,
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

  await db
    .update(users)
    .set({
      totalPoints: sql`${users.totalPoints} + ${points}`,
      totalLikes: sql`${users.totalLikes} + ${tweet.likes || 0}`,
      totalReplies: sql`${users.totalReplies} + ${tweet.replies || 0}`,
      totalRetweets: sql`${users.totalRetweets} + ${tweet.retweets || 0}`,
      totalQuotes: sql`${users.totalQuotes} + ${tweet.quotes || 0}`,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
}

interface TweetWithIds {
  id: number;
  userId: string | null;
  projectId: string | null;
  campaignIndex: number | null;
  epochIndex: number | null;
  likes: number | null;
  replies: number | null;
  retweets: number | null;
  quotes: number | null;
}

async function recalculateStatsForTweet(tweet: TweetWithIds) {
  if (!tweet.userId || !tweet.projectId || tweet.campaignIndex === null || tweet.epochIndex === null) {
    return;
  }

  const oldPoints = calculatePoints(tweet.likes, tweet.replies, tweet.retweets, tweet.quotes);

  const updatedTweet = await db
    .select()
    .from(tweets)
    .where(eq(tweets.id, tweet.id))
    .limit(1);

  if (updatedTweet.length === 0) {
    return;
  }

  const newTweet = updatedTweet[0];
  const newPoints = calculatePoints(newTweet.likes, newTweet.replies, newTweet.retweets, newTweet.quotes);
  const pointsDiff = newPoints - oldPoints;
  const likesDiff = (newTweet.likes || 0) - (tweet.likes || 0);
  const repliesDiff = (newTweet.replies || 0) - (tweet.replies || 0);
  const retweetsDiff = (newTweet.retweets || 0) - (tweet.retweets || 0);
  const quotesDiff = (newTweet.quotes || 0) - (tweet.quotes || 0);

  const existingScore = await db
    .select()
    .from(userEpochScores)
    .where(
      and(
        eq(userEpochScores.projectId, tweet.projectId),
        eq(userEpochScores.campaignIndex, tweet.campaignIndex),
        eq(userEpochScores.epochIndex, tweet.epochIndex),
        eq(userEpochScores.userId, tweet.userId)
      )
    )
    .limit(1);

  if (existingScore.length > 0) {
    await db
      .update(userEpochScores)
      .set({
        points: sql`${userEpochScores.points} + ${pointsDiff}`,
        totalLikes: sql`${userEpochScores.totalLikes} + ${likesDiff}`,
        totalReplies: sql`${userEpochScores.totalReplies} + ${repliesDiff}`,
        totalRetweets: sql`${userEpochScores.totalRetweets} + ${retweetsDiff}`,
        totalQuotes: sql`${userEpochScores.totalQuotes} + ${quotesDiff}`,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(userEpochScores.projectId, tweet.projectId),
          eq(userEpochScores.campaignIndex, tweet.campaignIndex),
          eq(userEpochScores.epochIndex, tweet.epochIndex),
          eq(userEpochScores.userId, tweet.userId)
        )
      );
  }

  const epoch = await db
    .select()
    .from(epochs)
    .where(
      and(
        eq(epochs.projectId, tweet.projectId),
        eq(epochs.campaignIndex, tweet.campaignIndex),
        eq(epochs.index, tweet.epochIndex)
      )
    )
    .limit(1);

  if (epoch.length > 0) {
    await db
      .update(epochs)
      .set({
        totalLikes: sql`${epochs.totalLikes} + ${likesDiff}`,
        totalReplies: sql`${epochs.totalReplies} + ${repliesDiff}`,
        totalRetweets: sql`${epochs.totalRetweets} + ${retweetsDiff}`,
        totalQuotes: sql`${epochs.totalQuotes} + ${quotesDiff}`,
        totalPoints: sql`${epochs.totalPoints} + ${pointsDiff}`,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(epochs.projectId, tweet.projectId),
          eq(epochs.campaignIndex, tweet.campaignIndex),
          eq(epochs.index, tweet.epochIndex)
        )
      );
  }

  await db
    .update(users)
    .set({
      totalPoints: sql`${users.totalPoints} + ${pointsDiff}`,
      totalLikes: sql`${users.totalLikes} + ${likesDiff}`,
      totalReplies: sql`${users.totalReplies} + ${repliesDiff}`,
      totalRetweets: sql`${users.totalRetweets} + ${retweetsDiff}`,
      totalQuotes: sql`${users.totalQuotes} + ${quotesDiff}`,
      updatedAt: new Date(),
    })
    .where(eq(users.id, tweet.userId));
}

