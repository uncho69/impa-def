import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { hasRole, hasAnyRole, UserRole } from './permissions';
import { db } from '@/lib/db';
import { authAccounts, users } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { getSessionCookieName, parseSessionToken } from './session';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getUserIdFromRequest(_request: NextRequest): Promise<string | null> {
  try {
    let clerkUserId: string | null = null;
    try {
      const authResult = await auth();
      clerkUserId = authResult?.userId ?? null;
    } catch (error) {
      console.error('❌ Error getting Clerk user ID:', error instanceof Error ? error.message : 'Unknown error');
      console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    }

    // Fallback per keyless/dev: prova a leggere lo user id dal JWT di sessione cookie
    // (claim "sub"). Non verifica firma: usato solo come fallback locale.
    if (!clerkUserId) {
      try {
        const raw = _request.cookies.get('__session')?.value;
        if (raw) {
          const parts = raw.split('.');
          if (parts.length >= 2) {
            const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')) as { sub?: string };
            if (payload?.sub && typeof payload.sub === 'string') {
              clerkUserId = payload.sub;
            }
          }
        }
      } catch {
        // ignore
      }
    }

    console.log('🔍 getUserIdFromRequest - resolved Clerk userId:', clerkUserId);

    if (clerkUserId) {
      // Se DB non configurato, restituiamo comunque lo user id Clerk
      if (!db) return clerkUserId;

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
        console.warn(`Clerk user ${clerkUserId} found in users table but no authAccount found`);
        return user[0].id;
      }

      // Ultimo fallback: ritorna comunque l'id Clerk (gestito poi dalle route con upsert)
      return clerkUserId;
    }

    // Fallback solo se non c'e autenticazione Clerk:
    // usa eventuale sessione firmata (es. Privy).
    const sessionToken = _request.cookies.get(getSessionCookieName())?.value;
    const parsedSession = parseSessionToken(sessionToken);
    if (parsedSession?.userId) {
      return parsedSession.userId;
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

