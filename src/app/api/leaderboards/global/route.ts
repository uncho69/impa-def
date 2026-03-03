import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, userEpochScores } from '@/lib/db/schema';
import { eq, desc, sql, and } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

/**
 * Leaderboard globale: somma di punti/tweet/like/reply/retweet/quote da tutte le
 * campagne ed epoche (user_epoch_scores), non dalla tabella users.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const leaderboard = await db
      .select({
        userId: userEpochScores.userId,
        username: users.username,
        email: users.email,
        walletAddress: users.walletAddress,
        totalPoints: sql<number>`coalesce(sum(${userEpochScores.points}), 0)::bigint`.as('totalPoints'),
        totalLikes: sql<number>`coalesce(sum(${userEpochScores.totalLikes}), 0)::bigint`.as('totalLikes'),
        totalReplies: sql<number>`coalesce(sum(${userEpochScores.totalReplies}), 0)::bigint`.as('totalReplies'),
        totalRetweets: sql<number>`coalesce(sum(${userEpochScores.totalRetweets}), 0)::bigint`.as('totalRetweets'),
        totalQuotes: sql<number>`coalesce(sum(${userEpochScores.totalQuotes}), 0)::bigint`.as('totalQuotes'),
      })
      .from(userEpochScores)
      .innerJoin(users, eq(userEpochScores.userId, users.id))
      .where(
        and(
          eq(userEpochScores.isActive, 1),
          eq(users.isActive, 1),
          sql`${users.deletedAt} IS NULL`,
          sql`${userEpochScores.deletedAt} IS NULL`
        )
      )
      .groupBy(userEpochScores.userId, users.id, users.username, users.email, users.walletAddress)
      .orderBy(desc(sql`sum(${userEpochScores.points})`))
      .limit(limit)
      .offset(offset);

    const leaderboardWithRank = leaderboard.map((entry, index) => ({
      ...entry,
      rank: offset + index + 1,
    }));

    const totalCountResult = await db
      .select({ count: sql<number>`count(distinct ${userEpochScores.userId})` })
      .from(userEpochScores)
      .innerJoin(users, eq(userEpochScores.userId, users.id))
      .where(
        and(
          eq(userEpochScores.isActive, 1),
          eq(users.isActive, 1),
          sql`${users.deletedAt} IS NULL`,
          sql`${userEpochScores.deletedAt} IS NULL`
        )
      );

    const totalCount = Number(totalCountResult[0]?.count ?? 0);

    return NextResponse.json(
      {
        leaderboard: leaderboardWithRank,
        pagination: {
          limit,
          offset,
          total: totalCount,
          hasMore: offset + limit < totalCount,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching global leaderboard:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

