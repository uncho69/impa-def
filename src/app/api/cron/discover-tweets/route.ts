import { NextRequest, NextResponse } from 'next/server';
import { discoverTweetsForAllUsers } from '@/lib/x-api/discover-tweets';

/**
 * Cron job endpoint for discovering and verifying tweets
 * 
 * This endpoint:
 * 1. Fetches tweets from all authenticated users
 * 2. Checks tweets against project keywords
 * 3. Marks tweets as verified or rejected
 * 
 * Should be run daily or weekly to discover new tweets
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
    const hoursBackParam = searchParams.get('hoursBack');
    const daysBackParam = searchParams.get('daysBack');
    const hoursBack = hoursBackParam ? parseInt(hoursBackParam, 10) : 24;
    const daysBack = daysBackParam ? parseInt(daysBackParam, 10) : undefined;
    const maxTweetsPerUser = searchParams.get('maxTweetsPerUser')
      ? parseInt(searchParams.get('maxTweetsPerUser')!, 10)
      : 1000;

    console.log(
      `Starting tweet discovery: hoursBack=${hoursBack ?? 'n/a'}, daysBack=${daysBack ?? 'n/a'}, maxTweetsPerUser=${maxTweetsPerUser}`
    );

    const results = await discoverTweetsForAllUsers({
      hoursBack,
      ...(daysBack !== undefined && { daysBack }),
      maxTweetsPerUser,
    });

    const summary = {
      totalUsers: results.length,
      totalTweetsProcessed: results.reduce((sum, r) => sum + r.tweetsProcessed, 0),
      totalTweetsVerified: results.reduce((sum, r) => sum + r.tweetsVerified, 0),
      totalTweetsRejected: results.reduce((sum, r) => sum + r.tweetsRejected, 0),
      totalErrors: results.reduce((sum, r) => sum + r.errors.length, 0),
      usersWithErrors: results.filter((r) => r.errors.length > 0).length,
      usersNeedingReauth: results.filter((r) =>
        r.errors.some((e) => e.includes('re-authentication'))
      ).length,
    };

    console.log('Tweet discovery completed:', summary);

    return NextResponse.json(
      {
        message: 'Tweet discovery completed',
        summary,
        results: results.map((r) => ({
          userId: r.userId,
          tweetsProcessed: r.tweetsProcessed,
          tweetsVerified: r.tweetsVerified,
          tweetsRejected: r.tweetsRejected,
          hasErrors: r.errors.length > 0,
          needsReauth: r.errors.some((e) => e.includes('re-authentication')),
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in discover-tweets cron job:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

