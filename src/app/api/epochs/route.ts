import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { epochs } from '@/lib/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const campaignIndex = searchParams.get('campaignIndex');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const conditions = [eq(epochs.isActive, 1), sql`${epochs.deletedAt} IS NULL`];

    if (projectId) {
      conditions.push(eq(epochs.projectId, projectId));
    }
    if (campaignIndex !== null) {
      conditions.push(eq(epochs.campaignIndex, parseInt(campaignIndex, 10)));
    }

    const epochsList = await db
      .select()
      .from(epochs)
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
        epochs: epochsList,
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

