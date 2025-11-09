import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { hasRole, hasAnyRole, UserRole } from './permissions';
import { db } from '@/lib/db';
import { authAccounts } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

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

    if (hasValidClerkKeys) {
      try {
        const { userId: clerkUserId } = await auth();
        if (clerkUserId) {
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
        }
      } catch (error) {
        console.debug('Clerk auth not available (dev mode?):', error instanceof Error ? error.message : 'Unknown error');
      }
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

