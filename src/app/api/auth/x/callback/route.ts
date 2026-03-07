/**
 * GET: Callback OAuth 2.0 X. Scambia il code con access token, salva in auth_accounts
 * (provider='twitter') e aggiorna users.twitterId. Poi redirect a leaderboard.
 */
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { db } from '@/lib/db';
import { pool } from '@/lib/db';
import { authAccounts, users } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

const X_TOKEN_URL = 'https://api.x.com/2/oauth2/token';
const X_USER_ME_URL = 'https://api.x.com/2/users/me';
const CODE_VERIFIER_COOKIE = 'x_oauth_code_verifier';

async function resolveAuthenticatedUserId(request: NextRequest): Promise<string | null> {
  const fromMiddleware = await getUserIdFromRequest(request);
  if (fromMiddleware) return fromMiddleware;

  try {
    const authResult = await auth();
    const clerkUserId = authResult.userId;
    if (!clerkUserId || !pool) return null;

    const linked = await pool.query(
      `
      SELECT aa.user_id
      FROM auth_accounts aa
      JOIN users u ON u.id = aa.user_id
      WHERE
        aa.provider = 'clerk'
        AND aa.provider_account_id = $1
        AND aa.is_active = 1
        AND u.is_active = 1
        AND u.deleted_at IS NULL
      LIMIT 1
      `,
      [clerkUserId]
    );
    if (linked.rows.length > 0) return linked.rows[0].user_id as string;

    await pool.query(
      `
      INSERT INTO users (id, is_active, created_at, updated_at)
      VALUES ($1, 1, now(), now())
      ON CONFLICT (id)
      DO UPDATE SET
        is_active = 1,
        deleted_at = NULL,
        updated_at = now()
      `,
      [clerkUserId]
    );
    await pool.query(
      `
      INSERT INTO auth_accounts (user_id, provider, provider_account_id, provider_user_id, is_active, created_at, updated_at)
      VALUES ($1, 'clerk', $2, $2, 1, now(), now())
      ON CONFLICT (provider, provider_account_id)
      DO UPDATE SET
        user_id = EXCLUDED.user_id,
        provider_user_id = EXCLUDED.provider_user_id,
        is_active = 1,
        updated_at = now()
      `,
      [clerkUserId, clerkUserId]
    );
    return clerkUserId;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const errorParam = searchParams.get('error');

  if (errorParam) {
    const redirectUrl = new URL('/leaderboards/epoch', request.nextUrl.origin);
    redirectUrl.searchParams.set('twitter_error', errorParam === 'access_denied' ? 'autorizzazione_annullata' : errorParam);
    return NextResponse.redirect(redirectUrl.toString());
  }

  if (!code) {
    return NextResponse.redirect(new URL('/leaderboards/epoch?twitter_error=code_mancante', request.nextUrl.origin));
  }

  const userId = await resolveAuthenticatedUserId(request);
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in?redirect_url=' + encodeURIComponent('/api/auth/x/connect'), request.nextUrl.origin));
  }

  const codeVerifier = request.cookies.get(CODE_VERIFIER_COOKIE)?.value;
  if (!codeVerifier) {
    return NextResponse.redirect(new URL('/leaderboards/epoch?twitter_error=session_scaduta', request.nextUrl.origin));
  }

  const clientId = process.env.X_OAUTH2_CLIENT_ID;
  const clientSecret = process.env.X_OAUTH2_CLIENT_SECRET;
  if (!clientId) {
    return NextResponse.redirect(new URL('/leaderboards/epoch?twitter_error=config', request.nextUrl.origin));
  }

  const origin = request.nextUrl.origin;
  const redirectUri = `${origin}/api/auth/x/callback`;

  const body = new URLSearchParams({
    code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  const authHeader =
    clientSecret
      ? 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
      : undefined;

  const tokenRes = await fetch(X_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
    body: body.toString(),
  });

  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    console.error('X token exchange failed:', tokenRes.status, errText);
    return NextResponse.redirect(
      new URL('/leaderboards/epoch?twitter_error=token_fallito', request.nextUrl.origin)
    );
  }

  const tokenData = (await tokenRes.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    token_type?: string;
  };

  const accessToken = tokenData.access_token;
  const refreshToken = tokenData.refresh_token ?? null;
  const expiresIn = tokenData.expires_in ?? 7200;
  const expiresAt = new Date(Date.now() + expiresIn * 1000);

  const meRes = await fetch(X_USER_ME_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!meRes.ok) {
    console.error('X users/me failed:', meRes.status);
    return NextResponse.redirect(
      new URL('/leaderboards/epoch?twitter_error=user_me_fallito', request.nextUrl.origin)
    );
  }
  const meData = (await meRes.json()) as { data?: { id: string } };
  const xUserId = meData?.data?.id;
  if (!xUserId) {
    return NextResponse.redirect(
      new URL('/leaderboards/epoch?twitter_error=id_non_trovato', request.nextUrl.origin)
    );
  }

  const existing = await db
    .select()
    .from(authAccounts)
    .where(
      and(
        eq(authAccounts.provider, 'twitter'),
        eq(authAccounts.providerAccountId, xUserId)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(authAccounts)
      .set({
        userId,
        accessToken,
        refreshToken,
        expiresAt,
        updatedAt: new Date(),
      })
      .where(eq(authAccounts.id, existing[0].id));
  } else {
    await db.insert(authAccounts).values({
      userId,
      provider: 'twitter',
      providerAccountId: xUserId,
      providerUserId: xUserId,
      accessToken,
      refreshToken,
      expiresAt,
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await db
    .update(users)
    .set({ twitterId: xUserId, updatedAt: new Date() })
    .where(eq(users.id, userId));

  const redirect = NextResponse.redirect(new URL('/leaderboards/epoch?twitter_connected=1', request.nextUrl.origin));
  redirect.cookies.delete(CODE_VERIFIER_COOKIE);
  return redirect;
}
