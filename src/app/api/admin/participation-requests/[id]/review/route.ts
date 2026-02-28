import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { campaignParticipationRequests, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { isModeratorOrAdmin } from '@/lib/auth/permissions';

const ADMIN_EMAILS_RAW = process.env.ADMIN_EMAILS ?? '';
const ADMIN_EMAILS_SET = new Set(
  ADMIN_EMAILS_RAW.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
);

async function canManageParticipationRequests(userId: string): Promise<boolean> {
  if (!userId) return false;
  if (await isModeratorOrAdmin(userId)) return true;
  if (ADMIN_EMAILS_SET.size === 0) return false;
  const row = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  const email = row[0]?.email?.trim().toLowerCase();
  return !!email && ADMIN_EMAILS_SET.has(email);
}

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

    const allowed = await canManageParticipationRequests(userId);
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
