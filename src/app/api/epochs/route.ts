import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { epochs, campaigns } from '@/lib/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const campaignIndexParam = searchParams.get('campaignIndex');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const conditions = [eq(epochs.isActive, 1), sql`${epochs.deletedAt} IS NULL`];

    if (projectId) {
      conditions.push(eq(epochs.projectId, projectId));
    }
    const campaignIndexNum = campaignIndexParam !== null && campaignIndexParam !== '' ? parseInt(campaignIndexParam, 10) : null;
    if (campaignIndexNum !== null && !isNaN(campaignIndexNum)) {
      conditions.push(eq(epochs.campaignIndex, campaignIndexNum));
    }

    const epochsList = await db
      .select({
        projectId: epochs.projectId,
        campaignIndex: epochs.campaignIndex,
        index: epochs.index,
        startDate: epochs.startDate,
        endDate: epochs.endDate,
        userCount: epochs.userCount,
        tweetCount: epochs.tweetCount,
        totalLikes: epochs.totalLikes,
        totalReplies: epochs.totalReplies,
        totalRetweets: epochs.totalRetweets,
        totalQuotes: epochs.totalQuotes,
        totalPoints: epochs.totalPoints,
        createdAt: epochs.createdAt,
        campaignName: campaigns.name,
      })
      .from(epochs)
      .leftJoin(
        campaigns,
        and(
          eq(epochs.projectId, campaigns.projectId),
          eq(epochs.campaignIndex, campaigns.index)
        )
      .where(and(...conditions))
      .orderBy(desc(epochs.createdAt))
      .limit(limit)
      .offset(offset);

    const totalCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(epochs)
      .where(and(...conditions));

    const totalCount = totalCountResult[0]?.count || 0;

    return NextResponse.json(
      {
        epochs: epochsList.map((e) => ({
          ...e,
          campaignName: e.campaignName ?? `Campaign ${e.campaignIndex}`,
        })),
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
    console.error('Error fetching epochs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

