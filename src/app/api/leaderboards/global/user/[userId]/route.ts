import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq, and, sql, gt } from 'drizzle-orm';


export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    const user = await db
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
          eq(users.id, userId),
          eq(users.isActive, 1),
          sql`${users.deletedAt} IS NULL`
        )
      )
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = user[0];

    const rankResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(
        and(
          eq(users.isActive, 1),
          sql`${users.deletedAt} IS NULL`,
          gt(users.totalPoints, userData.totalPoints)
        )
      );

    const rank = (rankResult[0]?.count || 0) + 1;

    const totalUsersResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(
        and(
          eq(users.isActive, 1),
          sql`${users.deletedAt} IS NULL`
        )
      );

    const totalUsers = totalUsersResult[0]?.count || 0;

    return NextResponse.json(
      {
        user: {
          ...userData,
          rank,
        },
        totalUsers,
        percentile: totalUsers > 0 ? ((totalUsers - rank + 1) / totalUsers) * 100 : 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user leaderboard:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

