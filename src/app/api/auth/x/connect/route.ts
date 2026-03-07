/**
 * GET: Avvia OAuth 2.0 PKCE con X (Twitter).
 * L'utente deve essere loggato (Clerk). Reindirizza a X per autorizzare;
 * al ritorno /api/auth/x/callback salva il token e collega l'account.
 */
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { pool } from '@/lib/db';
import { randomBytes, createHash } from 'crypto';

const X_AUTHORIZE_URL = 'https://x.com/i/oauth2/authorize';
const SCOPES = 'tweet.read users.read offline.access';
const CODE_VERIFIER_COOKIE = 'x_oauth_code_verifier';
const CODE_VERIFIER_MAX_AGE = 600; // 10 min

function base64UrlEncode(buffer: Buffer): string {
  return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function generateCodeVerifier(): string {
  return base64UrlEncode(randomBytes(32));
}

function generateCodeChallenge(verifier: string): string {
  return base64UrlEncode(createHash('sha256').update(verifier).digest());
}

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
  const userId = await resolveAuthenticatedUserId(request);
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in?redirect_url=' + encodeURIComponent('/leaderboards/epoch'), request.url));
  }

  const clientId = process.env.X_OAUTH2_CLIENT_ID;
  if (!clientId) {
    console.error('X_OAUTH2_CLIENT_ID not set');
    return NextResponse.json(
      { error: 'Configurazione X non disponibile. Contatta l’amministratore.' },
      { status: 500 }
    );
  }

  const origin = request.nextUrl.origin;
  const redirectUri = `${origin}/api/auth/x/callback`;

  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = base64UrlEncode(randomBytes(16));

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: SCOPES,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  const redirectUrl = `${X_AUTHORIZE_URL}?${params.toString()}`;
  const res = NextResponse.redirect(redirectUrl);

  res.cookies.set(CODE_VERIFIER_COOKIE, codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: CODE_VERIFIER_MAX_AGE,
    path: '/',
  });

  return res;
}
