import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { canManageAdmin } from '@/lib/auth/admin';
import { updateTweetMetrics } from '@/lib/x-api/update-metrics';
import { discoverTweetsForAllUsers } from '@/lib/x-api/discover-tweets';
import { recalculateStatsForVerifiedTweets } from '@/app/api/cron/update-tweet-metrics/recalculate-stats';

export const dynamic = 'force-dynamic';

/**
 * POST: Trigger manual discovery + refresh of tweet metrics and leaderboard stats.
 * Access: admin / moderator (same check as other /api/admin endpoints).
 *
 * Optionally accepts query params:
 * - batchSize: number of tweets per batch (default 100)
 * - maxTweets: maximum tweets to process in this run
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!(await canManageAdmin(userId))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const batchSize = searchParams.get('batchSize')
      ? parseInt(searchParams.get('batchSize')!, 10)
      : 100;
    const maxTweets = searchParams.get('maxTweets')
      ? parseInt(searchParams.get('maxTweets')!, 10)
      : undefined;
    const daysBack = searchParams.get('daysBack')
      ? parseInt(searchParams.get('daysBack')!, 10)
      : 7;
    const maxTweetsPerUser = searchParams.get('maxTweetsPerUser')
      ? parseInt(searchParams.get('maxTweetsPerUser')!, 10)
      : 500;

    // 1) Discover tweets (import nuovi tweet e verifica per progetto)
    const discoveryResults = await discoverTweetsForAllUsers({
      daysBack,
      maxTweetsPerUser,
    });

    // 2) Aggiorna metriche per tutti i tweet verificati
    const metricsResult = await updateTweetMetrics({
      batchSize,
      maxTweets,
    });

    let statsRecalculated = 0;
    try {
      statsRecalculated = await recalculateStatsForVerifiedTweets();
    } catch (error) {
      console.error('Error recalculating stats (manual refresh):', error);
    }

    return NextResponse.json(
      {
        message: 'Manual discovery + metrics refresh completed',
        discovery: {
          totalUsers: discoveryResults.length,
          totalTweetsProcessed: discoveryResults.reduce((sum, r) => sum + r.tweetsProcessed, 0),
          totalTweetsVerified: discoveryResults.reduce((sum, r) => sum + r.tweetsVerified, 0),
          totalTweetsRejected: discoveryResults.reduce((sum, r) => sum + r.tweetsRejected, 0),
        },
        metrics: {
          tweetsUpdated: metricsResult.tweetsUpdated,
          tweetsWithImpressions: metricsResult.tweetsWithImpressions,
          errors: metricsResult.errors.slice(0, 10),
          usersSkipped: metricsResult.usersSkipped,
        },
        stats: {
          tweetsRecalculated: statsRecalculated,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in manual refresh-metrics endpoint:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

