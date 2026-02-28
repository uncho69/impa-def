import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { campaignParticipationRequests, campaigns } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';

/**
 * Parse campaignId into projectId and campaignIndex.
 * Format: projectId-campaignIndex (e.g. imparodefi-0, imparodefi-1)
 */
function parseCampaignId(campaignId: string): { projectId: string; campaignIndex: number } | null {
  const lastDash = campaignId.lastIndexOf('-');
  if (lastDash === -1) return null;
  const projectId = campaignId.substring(0, lastDash);
  const campaignIndex = parseInt(campaignId.substring(lastDash + 1), 10);
  if (isNaN(campaignIndex)) return null;
  return { projectId, campaignIndex };
}

/**
 * POST: Request participation in a campaign (creates a pending request).
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { campaignId: string } }
) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: Please sign in to request access' },
        { status: 401 }
      );
    }

    const parsed = parseCampaignId(params.campaignId);
    if (!parsed) {
      return NextResponse.json(
        { error: 'Invalid campaign ID format' },
        { status: 400 }
      );
    }

    const { projectId, campaignIndex } = parsed;

    const campaignExists = await db
      .select()
      .from(campaigns)
      .where(
        and(
          eq(campaigns.projectId, projectId),
          eq(campaigns.index, campaignIndex)
        )
      )
      .limit(1);

    if (campaignExists.length === 0) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    const existing = await db
      .select()
      .from(campaignParticipationRequests)
      .where(
        and(
          eq(campaignParticipationRequests.userId, userId),
          eq(campaignParticipationRequests.projectId, projectId),
          eq(campaignParticipationRequests.campaignIndex, campaignIndex)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      const status = existing[0].status;
      if (status === 'approved') {
        return NextResponse.json(
          { message: 'You already have access to this campaign', status: 'approved' },
          { status: 200 }
        );
      }
      if (status === 'pending') {
        return NextResponse.json(
          { message: 'Your request is pending review', status: 'pending' },
          { status: 200 }
        );
      }
      if (status === 'rejected') {
        return NextResponse.json(
          { error: 'Your previous request was denied. Contact an admin to try again.' },
          { status: 403 }
        );
      }
    }

    await db.insert(campaignParticipationRequests).values({
      userId,
      projectId,
      campaignIndex,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { message: 'Participation request submitted. An admin will review it.', status: 'pending' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating participation request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET: Check current user's participation status for this campaign.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { campaignId: string } }
) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { status: null, message: 'Not signed in' },
        { status: 200 }
      );
    }

    const parsed = parseCampaignId(params.campaignId);
    if (!parsed) {
      return NextResponse.json(
        { error: 'Invalid campaign ID format' },
        { status: 400 }
      );
    }

    const { projectId, campaignIndex } = parsed;

    const existing = await db
      .select({ status: campaignParticipationRequests.status })
      .from(campaignParticipationRequests)
      .where(
        and(
          eq(campaignParticipationRequests.userId, userId),
          eq(campaignParticipationRequests.projectId, projectId),
          eq(campaignParticipationRequests.campaignIndex, campaignIndex)
        )
      )
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { status: null, message: 'No request yet' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        status: existing[0].status,
        message:
          existing[0].status === 'approved'
            ? 'You have access'
            : existing[0].status === 'pending'
              ? 'Request pending'
              : 'Request denied',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching participation status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
