import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq, desc, sql, and } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const leaderboard = await db
      .select({
        userId: users.id,
        username: users.username,
        email: users.email,
        walletAddress: users.walletAddress,
        totalPoints: users.totalPoints,
        totalLikes: users.totalLikes,
        totalReplies: users.totalReplies,
        totalRetweets: users.totalRetweets,
        totalQuotes: users.totalQuotes,
      })
      .from(users)
      .where(
        and(
          eq(users.isActive, 1),
          sql`${users.deletedAt} IS NULL`
        )
      )
      .orderBy(desc(users.totalPoints))
      .limit(limit)
      .offset(offset);

    const leaderboardWithRank = leaderboard.map((entry, index) => ({
      ...entry,
      rank: offset + index + 1,
    }));

    const totalCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(
        and(
          eq(users.isActive, 1),
          sql`${users.deletedAt} IS NULL`
        )
      );

    const totalCount = totalCountResult[0]?.count || 0;

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

