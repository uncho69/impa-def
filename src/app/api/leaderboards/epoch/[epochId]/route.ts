import { NextRequest, NextResponse } from 'next/server';
import { db, hasDatabase } from '@/lib/db';
import { userEpochScores, users, epochs } from '@/lib/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { FALLBACK_EPOCHS } from '@/lib/leaderboards-fallback';

export async function GET(
  request: NextRequest,
  { params }: { params: { epochId: string } }
) {
  try {
    // Parse epochId: projectId can contain hyphens, so we parse from the end
    // Format: projectId-campaignIndex-epochIndex
    // We know campaignIndex and epochIndex are always numbers, so parse from the end
    const epochIdStr = params.epochId;
    const lastDashIndex = epochIdStr.lastIndexOf('-');
    const secondLastDashIndex = epochIdStr.lastIndexOf('-', lastDashIndex - 1);
    
    if (lastDashIndex === -1 || secondLastDashIndex === -1) {
      return NextResponse.json(
        { error: 'Invalid epochId format. Expected: projectId-campaignIndex-epochIndex' },
        { status: 400 }
      );
    }

    const epochIndex = parseInt(epochIdStr.substring(lastDashIndex + 1), 10);
    const campaignIndex = parseInt(epochIdStr.substring(secondLastDashIndex + 1, lastDashIndex), 10);
    const projectId = epochIdStr.substring(0, secondLastDashIndex);

    if (!hasDatabase || !db) {
      const fallbackEpoch = FALLBACK_EPOCHS.find(
        (e) => e.projectId === projectId && e.campaignIndex === campaignIndex && e.index === epochIndex
      );
      if (!fallbackEpoch) {
        return NextResponse.json({ error: 'Epoch not found' }, { status: 404 });
      }
      const { searchParams } = new URL(request.url);
      const limit = parseInt(searchParams.get('limit') || '50', 10);
      const offset = parseInt(searchParams.get('offset') || '0', 10);
      return NextResponse.json(
        {
          epoch: {
            projectId: fallbackEpoch.projectId,
            campaignIndex: fallbackEpoch.campaignIndex,
            epochIndex: fallbackEpoch.index,
            startDate: fallbackEpoch.startDate,
            endDate: fallbackEpoch.endDate,
          },
          leaderboard: [],
          pagination: {
            limit,
            offset,
            total: 0,
            hasMore: false,
          },
        },
        { status: 200 }
      );
    }

    if (isNaN(campaignIndex) || isNaN(epochIndex)) {
      return NextResponse.json(
        { error: 'Invalid campaignIndex or epochIndex' },
        { status: 400 }
      );
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

    if (epoch.length === 0) {
      return NextResponse.json(
        { error: 'Epoch not found' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const leaderboard = await db
      .select({
        userId: users.id,
        username: users.username,
        email: users.email,
        walletAddress: users.walletAddress,
        points: userEpochScores.points,
        tweetCount: userEpochScores.tweetCount,
        totalLikes: userEpochScores.totalLikes,
        totalReplies: userEpochScores.totalReplies,
        totalRetweets: userEpochScores.totalRetweets,
        totalQuotes: userEpochScores.totalQuotes,
      })
      .from(userEpochScores)
      .innerJoin(users, eq(userEpochScores.userId, users.id))
      .where(
        and(
          eq(userEpochScores.projectId, projectId),
          eq(userEpochScores.campaignIndex, campaignIndex),
          eq(userEpochScores.epochIndex, epochIndex),
          eq(userEpochScores.isActive, 1),
          eq(users.isActive, 1),
          // Nascondi gli utenti che non hanno più punti né tweet per questo epoch
          sql`${userEpochScores.points} > 0 OR ${userEpochScores.tweetCount} > 0`
        )
      )
      .orderBy(desc(userEpochScores.points))
      .limit(limit)
      .offset(offset);

    const leaderboardWithRank = leaderboard.map((entry, index) => ({
      ...entry,
      rank: offset + index + 1,
    }));

    const totalCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(userEpochScores)
      .where(
        and(
          eq(userEpochScores.projectId, projectId),
          eq(userEpochScores.campaignIndex, campaignIndex),
          eq(userEpochScores.epochIndex, epochIndex),
          eq(userEpochScores.isActive, 1),
          sql`${userEpochScores.points} > 0 OR ${userEpochScores.tweetCount} > 0`
        )
      );

    const totalCount = totalCountResult[0]?.count || 0;

    return NextResponse.json(
      {
        epoch: {
          projectId,
          campaignIndex,
          epochIndex,
          startDate: epoch[0].startDate,
          endDate: epoch[0].endDate,
        },
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
    console.error('Error fetching epoch leaderboard:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

