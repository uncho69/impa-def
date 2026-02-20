import { NextRequest, NextResponse } from 'next/server';
import { updateTweetMetrics } from '@/lib/x-api/update-metrics';
import { recalculateStatsForVerifiedTweets } from './recalculate-stats';

/**
 * Cron job endpoint for updating tweet metrics
 * 
 * This endpoint:
 * 1. Fetches verified tweets from PostgreSQL
 * 2. Updates metrics (likes, replies, retweets, quotes, impressions) from X API
 * 3. Recalculates leaderboard stats
 * 
 * Should be run multiple times per day to keep metrics up to date
 */
export async function POST(request: NextRequest) {
  try {
    // Optional: Add cron secret authentication
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
    const batchSize = searchParams.get('batchSize')
      ? parseInt(searchParams.get('batchSize')!, 10)
      : 100;
    const maxTweets = searchParams.get('maxTweets')
      ? parseInt(searchParams.get('maxTweets')!, 10)
      : undefined;

    console.log(
      `Starting metrics update: batchSize=${batchSize}, maxTweets=${maxTweets || 'all'}`
    );

    // Update metrics from X API
    const metricsResult = await updateTweetMetrics({
      batchSize,
      maxTweets,
    });

    console.log('Metrics update completed:', {
      tweetsUpdated: metricsResult.tweetsUpdated,
      tweetsWithImpressions: metricsResult.tweetsWithImpressions,
      errors: metricsResult.errors.length,
      usersSkipped: metricsResult.usersSkipped.length,
    });

    // Recalculate leaderboard stats for updated tweets
    let statsRecalculated = 0;
    try {
      statsRecalculated = await recalculateStatsForVerifiedTweets();
      console.log(`Recalculated stats for ${statsRecalculated} tweets`);
    } catch (error) {
      console.error('Error recalculating stats:', error);
    }

    return NextResponse.json(
      {
        message: 'Metrics update completed',
        metrics: {
          tweetsUpdated: metricsResult.tweetsUpdated,
          tweetsWithImpressions: metricsResult.tweetsWithImpressions,
          errors: metricsResult.errors.slice(0, 10), // Limit error details
          usersSkipped: metricsResult.usersSkipped,
        },
        stats: {
          tweetsRecalculated: statsRecalculated,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in update-tweet-metrics cron job:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

