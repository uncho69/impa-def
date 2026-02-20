import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { campaigns } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '1', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const activeCampaigns = await db
      .select()
      .from(campaigns)
      .where(
        and(
          eq(campaigns.isActive, 1),
          sql`${campaigns.deletedAt} IS NULL`
        )
      )
      .limit(limit)
      .offset(offset);

    const totalCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(campaigns)
      .where(
        and(
          eq(campaigns.isActive, 1),
          sql`${campaigns.deletedAt} IS NULL`
        )
      );

    const totalCount = totalCountResult[0]?.count || 0;

    return NextResponse.json(
      {
        campaigns: activeCampaigns,
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
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
