import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { campaignParticipationRequests } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { isModeratorOrAdmin } from '@/lib/auth/permissions';

/**
 * POST: Approve or reject a participation request. Admin or moderator only.
 * Body: { action: 'approve' | 'reject' }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allowed = await isModeratorOrAdmin(userId);
    if (!allowed) {
      return NextResponse.json({ error: 'Forbidden: admin or moderator only' }, { status: 403 });
    }

    const requestId = parseInt(params.id, 10);
    if (isNaN(requestId)) {
      return NextResponse.json({ error: 'Invalid request ID' }, { status: 400 });
    }

    const body = await request.json();
    const action = body?.action;
    if (action !== 'approve' && action !== 'reject') {
      return NextResponse.json(
        { error: 'Body must include action: "approve" or "reject"' },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(campaignParticipationRequests)
      .where(eq(campaignParticipationRequests.id, requestId))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (existing[0].status !== 'pending') {
      return NextResponse.json(
        { error: 'Request has already been reviewed' },
        { status: 400 }
      );
    }

    const now = new Date();
    await db
      .update(campaignParticipationRequests)
      .set({
        status: action === 'approve' ? 'approved' : 'rejected',
        reviewedAt: now,
        reviewedBy: userId,
        updatedAt: now,
      })
      .where(eq(campaignParticipationRequests.id, requestId));

    return NextResponse.json(
      { message: action === 'approve' ? 'Request approved' : 'Request rejected', status: action === 'approve' ? 'approved' : 'rejected' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error reviewing participation request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
