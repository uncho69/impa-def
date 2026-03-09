import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { registered: false, error: 'Not authenticated' },
        { status: 200 }
      );
    }

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

