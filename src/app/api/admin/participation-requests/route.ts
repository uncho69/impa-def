import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { campaignParticipationRequests, users, campaigns } from '@/lib/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { isModeratorOrAdmin } from '@/lib/auth/permissions';

export interface ParticipationRequestRow {
  id: number;
  userId: string;
  userEmail: string | null;
  userUsername: string | null;
  projectId: string;
  campaignIndex: number;
  campaignName: string;
  status: string;
  requestedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
}

/**
 * GET: List participation requests (pending first). Admin or moderator only.
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allowed = await isModeratorOrAdmin(userId);
    if (!allowed) {
      return NextResponse.json({ error: 'Forbidden: admin or moderator only' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status'); // 'pending' | 'approved' | 'rejected' | omit for all

    const requests = await db
      .select({
        id: campaignParticipationRequests.id,
        userId: campaignParticipationRequests.userId,
        userEmail: users.email,
        userUsername: users.username,
        projectId: campaignParticipationRequests.projectId,
        campaignIndex: campaignParticipationRequests.campaignIndex,
        campaignName: campaigns.name,
        status: campaignParticipationRequests.status,
        requestedAt: campaignParticipationRequests.requestedAt,
        reviewedAt: campaignParticipationRequests.reviewedAt,
        reviewedBy: campaignParticipationRequests.reviewedBy,
      })
      .from(campaignParticipationRequests)
      .innerJoin(users, eq(campaignParticipationRequests.userId, users.id))
      .innerJoin(
        campaigns,
        and(
          eq(campaignParticipationRequests.projectId, campaigns.projectId),
          eq(campaignParticipationRequests.campaignIndex, campaigns.index)
        )
      )
      .where(
        statusFilter
          ? eq(campaignParticipationRequests.status, statusFilter)
          : sql`true`
      )
      .orderBy(desc(campaignParticipationRequests.requestedAt));

    const list: ParticipationRequestRow[] = requests.map((r) => ({
      id: r.id,
      userId: r.userId,
      userEmail: r.userEmail,
      userUsername: r.userUsername,
      projectId: r.projectId,
      campaignIndex: r.campaignIndex,
      campaignName: r.campaignName,
      status: r.status,
      requestedAt: r.requestedAt?.toISOString() ?? '',
      reviewedAt: r.reviewedAt?.toISOString() ?? null,
      reviewedBy: r.reviewedBy,
    }));

    return NextResponse.json({ requests: list }, { status: 200 });
  } catch (error) {
    console.error('Error listing participation requests:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
