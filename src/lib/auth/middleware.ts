import { NextRequest, NextResponse } from 'next/server';
import { hasRole, hasAnyRole, UserRole } from './permissions';
import { getSessionCookieName, parseSessionToken } from './session';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getUserIdFromRequest(_request: NextRequest): Promise<string | null> {
  try {
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

