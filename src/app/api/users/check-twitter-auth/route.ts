import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { checkUserTokenStatus } from '@/lib/x-api/token-management';

/**
 * API endpoint to check if the current user's Twitter token is expired
 * Frontend can call this to show re-authentication prompts
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const status = await checkUserTokenStatus(userId);

    return NextResponse.json(
      {
        needsReauth: status.needsReauth,
        expiresAt: status.expiresAt?.toISOString() || null,
        isExpired: status.isExpired,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking Twitter auth status:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

