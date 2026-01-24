import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { users, authAccounts } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    let clerkUserId: string | null = null;
    
    try {
      const authResult = await auth();
      clerkUserId = authResult.userId || null;
    } catch (error) {
      // Auth might not be available in this context
      console.debug('Auth not available:', error);
    }

    if (!clerkUserId) {
      return NextResponse.json(
        { registered: false, error: 'Not authenticated' },
        { status: 200 }
      );
    }

    // Check if user exists in authAccounts
    const authAccount = await db
      .select({ userId: authAccounts.userId })
      .from(authAccounts)
      .where(
        and(
          eq(authAccounts.provider, 'clerk'),
          eq(authAccounts.providerAccountId, clerkUserId)
        )
      )
      .limit(1);

    if (authAccount.length === 0) {
      return NextResponse.json(
        { registered: false, error: 'User not registered in database' },
        { status: 200 }
      );
    }

    const userId = authAccount[0].userId;

    // Check if user exists in users table and is active
    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(
        and(
          eq(users.id, userId),
          eq(users.isActive, 1),
          sql`${users.deletedAt} IS NULL`
        )
      )
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { registered: false, error: 'User not found or inactive' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { registered: true, userId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking user registration:', error);
    return NextResponse.json(
      { registered: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

