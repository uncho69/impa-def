import { NextRequest, NextResponse } from 'next/server';
import { db, hasDatabase } from '@/lib/db';
import { campaigns } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { FALLBACK_CAMPAIGNS } from '@/lib/leaderboards-fallback';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '1', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    if (!hasDatabase || !db) {
      const sliced = FALLBACK_CAMPAIGNS.slice(offset, offset + limit);
      return NextResponse.json(
        {
          campaigns: sliced,
          pagination: {
            limit,
            offset,
            total: FALLBACK_CAMPAIGNS.length,
            hasMore: offset + limit < FALLBACK_CAMPAIGNS.length,
          },
        },
        { status: 200 }
      );
    }

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

    // In locale, se il DB e' vuoto, mostriamo una campagna fallback per la UX.
    if (process.env.NODE_ENV !== 'production' && totalCount === 0) {
      const sliced = FALLBACK_CAMPAIGNS.slice(offset, offset + limit);
      return NextResponse.json(
        {
          campaigns: sliced,
          pagination: {
            limit,
            offset,
            total: FALLBACK_CAMPAIGNS.length,
            hasMore: offset + limit < FALLBACK_CAMPAIGNS.length,
          },
        },
        { status: 200 }
      );
    }

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
