/**
 * GET: Callback OAuth 2.0 X. Scambia il code con access token, salva in auth_accounts
 * (provider='twitter') e aggiorna users.twitterId. Poi redirect a leaderboard.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromRequest } from '@/lib/auth/middleware';
import { db } from '@/lib/db';
import { pool, hasDatabase } from '@/lib/db';
import { authAccounts, users } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { ensureAccessControlTables } from '@/lib/db/ensure-access-control-tables';

export const dynamic = "force-dynamic";
export const revalidate = 0;

const X_TOKEN_URL = 'https://api.x.com/2/oauth2/token';
const X_USER_ME_URL = 'https://api.x.com/2/users/me';
const CODE_VERIFIER_COOKIE = 'x_oauth_code_verifier';

async function resolveAuthenticatedUserId(request: NextRequest): Promise<string | null> {
  return getUserIdFromRequest(request);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');
    // #region agent log
    fetch('http://127.0.0.1:7427/ingest/53de14af-f544-4874-907d-9c3852d2c5f6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'933492'},body:JSON.stringify({sessionId:'933492',runId:'run1',hypothesisId:'H4',location:'src/app/api/auth/x/callback/route.ts:GET:start',message:'x callback invoked',data:{hasCode:Boolean(code),errorParam:errorParam??null,origin:request.nextUrl.origin},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    if (errorParam) {
      const redirectUrl = new URL('/leaderboards/epoch', request.nextUrl.origin);
      redirectUrl.searchParams.set('twitter_error', errorParam === 'access_denied' ? 'autorizzazione_annullata' : errorParam);
      return NextResponse.redirect(redirectUrl.toString());
    }

    if (!code) {
      return NextResponse.redirect(new URL('/leaderboards/epoch?twitter_error=code_mancante', request.nextUrl.origin));
    }

    const userId = await resolveAuthenticatedUserId(request);
    // #region agent log
    fetch('http://127.0.0.1:7427/ingest/53de14af-f544-4874-907d-9c3852d2c5f6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'933492'},body:JSON.stringify({sessionId:'933492',runId:'run1',hypothesisId:'H4',location:'src/app/api/auth/x/callback/route.ts:GET:auth',message:'x callback auth context',data:{hasUserId:Boolean(userId),hasCodeVerifier:Boolean(request.cookies.get(CODE_VERIFIER_COOKIE)?.value),hasClientId:Boolean(process.env.X_OAUTH2_CLIENT_ID),hasDatabase},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in?redirect_url=' + encodeURIComponent('/profilo'), request.nextUrl.origin));
    }

    const codeVerifier = request.cookies.get(CODE_VERIFIER_COOKIE)?.value;
    if (!codeVerifier) {
      return NextResponse.redirect(new URL('/leaderboards/epoch?twitter_error=session_scaduta', request.nextUrl.origin));
    }

    const clientId = process.env.X_OAUTH2_CLIENT_ID;
    const clientSecret = process.env.X_OAUTH2_CLIENT_SECRET;
    if (!clientId || !hasDatabase) {
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
    // #region agent log
    fetch('http://127.0.0.1:7427/ingest/53de14af-f544-4874-907d-9c3852d2c5f6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'933492'},body:JSON.stringify({sessionId:'933492',runId:'run1',hypothesisId:'H4',location:'src/app/api/auth/x/callback/route.ts:GET:tokenExchange',message:'x token exchange result',data:{status:tokenRes.status,ok:tokenRes.ok},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

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

    if (pool) {
      await ensureAccessControlTables();
      await pool.query(
        `
        INSERT INTO social_accounts (
          user_id,
          provider,
          provider_user_id,
          status,
          verified_at,
          last_revalidated_at,
          created_at,
          updated_at
        )
        VALUES ($1, 'x', $2, 'verified', now(), now(), now(), now())
        ON CONFLICT (user_id, provider)
        DO UPDATE SET
          provider_user_id = EXCLUDED.provider_user_id,
          status = 'verified',
          verified_at = now(),
          last_revalidated_at = now(),
          updated_at = now()
        `,
        [userId, xUserId],
      );
    }

    const redirect = NextResponse.redirect(new URL('/leaderboards/epoch?twitter_connected=1', request.nextUrl.origin));
    redirect.cookies.delete(CODE_VERIFIER_COOKIE);
    return redirect;
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7427/ingest/53de14af-f544-4874-907d-9c3852d2c5f6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'933492'},body:JSON.stringify({sessionId:'933492',runId:'run1',hypothesisId:'H4',location:'src/app/api/auth/x/callback/route.ts:GET:catch',message:'x callback fatal error',data:{error:error instanceof Error?error.message:String(error)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    console.error('X callback fatal error:', error);
    return NextResponse.redirect(new URL('/leaderboards/epoch?twitter_error=errore_server', request.nextUrl.origin));
  }
}
