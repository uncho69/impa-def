import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { campaigns, epochs } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { canManageAdmin } from '@/lib/auth/admin';

export const dynamic = 'force-dynamic';

function parseCampaignId(campaignId: string): { projectId: string; campaignIndex: number } | null {
  const lastDash = campaignId.lastIndexOf('-');
  if (lastDash === -1) return null;
  const projectId = campaignId.substring(0, lastDash);
  const campaignIndex = parseInt(campaignId.substring(lastDash + 1), 10);
  if (isNaN(campaignIndex)) return null;
  return { projectId, campaignIndex };
}

/**
 * PATCH: Chiudi o riapri campagna. Body: { action: 'close' | 'reopen' }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { campaignId: string } }
) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!(await canManageAdmin(userId))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const campaignId = typeof params.campaignId === 'string' ? params.campaignId : await (params as { campaignId: Promise<string> }).campaignId;
    const parsed = parseCampaignId(campaignId);
    if (!parsed) return NextResponse.json({ error: 'Invalid campaign ID' }, { status: 400 });

    const body = await request.json().catch(() => ({}));
    const action = body.action === 'reopen' ? 'reopen' : 'close';

    await db
      .update(campaigns)
      .set({
        isActive: action === 'close' ? 0 : 1,
        updatedAt: new Date(),
        updatedBy: userId,
      })
      .where(and(eq(campaigns.projectId, parsed.projectId), eq(campaigns.index, parsed.campaignIndex)));

    return NextResponse.json({ message: action === 'close' ? 'Campagna chiusa' : 'Campagna riaperta' }, { status: 200 });
  } catch (error) {
    console.error('Error updating campaign:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE: Elimina campagna (soft delete: imposta deletedAt). Gli epoch vengono lasciati; le reward/epoch hanno FK cascade.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { campaignId: string } }
) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!(await canManageAdmin(userId))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const campaignId = typeof params.campaignId === 'string' ? params.campaignId : await (params as { campaignId: Promise<string> }).campaignId;
    const parsed = parseCampaignId(campaignId);
    if (!parsed) return NextResponse.json({ error: 'Invalid campaign ID' }, { status: 400 });

    const now = new Date();
    await db
      .update(campaigns)
      .set({ deletedAt: now, isActive: 0, updatedAt: now, updatedBy: userId })
      .where(and(eq(campaigns.projectId, parsed.projectId), eq(campaigns.index, parsed.campaignIndex)));

    await db
      .update(epochs)
      .set({ deletedAt: now, isActive: 0 })
      .where(and(eq(epochs.projectId, parsed.projectId), eq(epochs.campaignIndex, parsed.campaignIndex)));

    return NextResponse.json({ message: 'Campagna eliminata' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
