import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { hasRole, hasAnyRole, UserRole } from './permissions';
import { db } from '@/lib/db';
import { authAccounts, users } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';

export async function getUserIdFromRequest(request: NextRequest): Promise<string | null> {
  try {
    const hasValidClerkKeys = !!(
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY &&
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.trim().length > 0 &&
      process.env.CLERK_SECRET_KEY.trim().length > 0 &&
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_') &&
      process.env.CLERK_SECRET_KEY.startsWith('sk_')
    );

    console.log('🔍 getUserIdFromRequest - hasValidClerkKeys:', hasValidClerkKeys);

    if (hasValidClerkKeys) {
      try {
        // Only call auth() if we're in a context where clerkMiddleware has run
        // This will work in API routes that go through the middleware
        const authResult = await auth();
        const clerkUserId = authResult?.userId;
        console.log('🔍 getUserIdFromRequest - Clerk userId:', clerkUserId);
        
        if (clerkUserId) {
          // First try to find via authAccounts (preferred method)
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

          if (authAccount.length > 0) {
            return authAccount[0].userId;
          }

          // If no authAccount found, check if user exists directly with Clerk ID as primary key
          // (since we use Clerk ID as the user ID in the users table)
          const user = await db
            .select({ id: users.id })
            .from(users)
            .where(
              and(
                eq(users.id, clerkUserId),
                eq(users.isActive, 1),
                sql`${users.deletedAt} IS NULL`
              )
            )
            .limit(1);

          if (user.length > 0) {
            // User exists but authAccount is missing - return the user ID anyway
            console.warn(`Clerk user ${clerkUserId} found in users table but no authAccount found`);
            return user[0].id;
          } else {
            // Clerk user authenticated but no user record found
            // This can happen if the webhook hasn't created the user yet
            console.warn(`⚠️  Clerk user ${clerkUserId} authenticated but no user record found in database. User needs to be created via webhook.`);
          }
        } else {
          console.warn('⚠️  Clerk auth() returned no userId - user may not be signed in');
        }
      } catch (error) {
        // Log error for debugging but don't fail completely
        console.error('❌ Error getting Clerk user ID:', error instanceof Error ? error.message : 'Unknown error');
        console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      }
    } else {
      console.warn('⚠️  Clerk keys not configured or invalid');
    }

    const privyToken = request.headers.get('authorization')?.replace('Bearer ', '');
    if (privyToken) {
      const authAccount = await db
        .select({ userId: authAccounts.userId })
        .from(authAccounts)
        .where(eq(authAccounts.provider, 'privy'))
        .limit(1);

      if (authAccount.length > 0) {
        return authAccount[0].userId;
      }
    }

    return null;
  } catch (error) {
    console.error('Error extracting user ID from request:', error);
    return null;
  }
}

export function requireRole(role: UserRole) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const hasRequiredRole = await hasRole(userId, role);
    if (!hasRequiredRole) {
      return NextResponse.json(
        { error: 'Forbidden: Insufficient permissions' },
        { status: 403 }
      );
    }

    return null;
  };
}

export function requireAnyRole(roles: UserRole[]) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const hasRequiredRole = await hasAnyRole(userId, roles);
    if (!hasRequiredRole) {
      return NextResponse.json(
        { error: 'Forbidden: Insufficient permissions' },
        { status: 403 }
      );
    }

    return null;
  };
}

export function requireAuth() {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    const userId = await getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return null;
  };
}

export async function withAuth(
  request: NextRequest,
  check: (request: NextRequest) => Promise<NextResponse | null>
): Promise<{ userId: string } | { error: NextResponse }> {
  const userId = await getUserIdFromRequest(request);

  if (!userId) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  const authResponse = await check(request);
  if (authResponse) {
    return { error: authResponse };
  }

  return { userId };
}

