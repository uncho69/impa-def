/**
 * GET: Avvia OAuth 2.0 PKCE con X (Twitter).
 * L'utente deve essere loggato. Reindirizza a X per autorizzare;
 * al ritorno /api/auth/x/callback salva il token e collega l'account.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
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
  return getUserIdFromRequest(request);
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
