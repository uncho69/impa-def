import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, userEpochScores } from '@/lib/db/schema';
import { eq, desc, sql, and } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

/**
 * Leaderboard globale: somma di punti/tweet/like/reply/retweet/quote da tutte le
 * campagne ed epoche (user_epoch_scores), non dalla tabella users.
 *
 * Mostra solo gli utenti che hanno almeno 1 punto o 1 tweet
 * complessivo (altrimenti non hanno mai fatto nulla in nessuna campagna).
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // Prima aggreghiamo i punteggi per utente su user_epoch_scores
    const userTotals = db
      .select({
        userId: userEpochScores.userId,
        totalPoints: sql<number>`coalesce(sum(${userEpochScores.points}), 0)::bigint`.as('totalPoints'),
        totalLikes: sql<number>`coalesce(sum(${userEpochScores.totalLikes}), 0)::bigint`.as('totalLikes'),
        totalReplies: sql<number>`coalesce(sum(${userEpochScores.totalReplies}), 0)::bigint`.as('totalReplies'),
        totalRetweets: sql<number>`coalesce(sum(${userEpochScores.totalRetweets}), 0)::bigint`.as('totalRetweets'),
        totalQuotes: sql<number>`coalesce(sum(${userEpochScores.totalQuotes}), 0)::bigint`.as('totalQuotes'),
        totalTweetCount: sql<number>`coalesce(sum(${userEpochScores.tweetCount}), 0)::bigint`.as('totalTweetCount'),
      })
      .from(userEpochScores)
      .where(
        and(
          eq(userEpochScores.isActive, 1),
          sql`${userEpochScores.deletedAt} IS NULL`
        )
      )
      .groupBy(userEpochScores.userId)
      .as('user_totals');

    const leaderboard = await db
      .select({
        userId: userTotals.userId,
        username: users.username,
        email: users.email,
        walletAddress: users.walletAddress,
        totalPoints: userTotals.totalPoints,
        totalLikes: userTotals.totalLikes,
        totalReplies: userTotals.totalReplies,
        totalRetweets: userTotals.totalRetweets,
        totalQuotes: userTotals.totalQuotes,
      })
      .from(userTotals)
      .innerJoin(users, eq(userTotals.userId, users.id))
      .where(
        and(
          eq(users.isActive, 1),
          sql`${users.deletedAt} IS NULL`,
          // Nascondi utenti senza punti e senza tweet totali
          sql`${userTotals.totalPoints} > 0 OR ${userTotals.totalTweetCount} > 0`
        )
      )
      .orderBy(desc(userTotals.totalPoints))
      .limit(limit)
      .offset(offset);

    const leaderboardWithRank = leaderboard.map((entry, index) => ({
      ...entry,
      rank: offset + index + 1,
    }));

    const totalCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(userTotals)
      .innerJoin(users, eq(userTotals.userId, users.id))
      .where(
        and(
          eq(users.isActive, 1),
          sql`${users.deletedAt} IS NULL`,
          sql`${userTotals.totalPoints} > 0 OR ${userTotals.totalTweetCount} > 0`
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

