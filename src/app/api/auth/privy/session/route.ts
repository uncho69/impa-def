import { NextRequest, NextResponse } from "next/server";
import { pool, hasDatabase } from "@/lib/db";
import { createSessionToken, getSessionCookieName } from "@/lib/auth/session";
import { verifyPrivyAccessToken } from "@/lib/auth/privy";
import { ensureAccessControlTables } from "@/lib/db/ensure-access-control-tables";

export const dynamic = "force-dynamic";

type SessionBody = {
  accessToken?: string;
  walletAddress?: string | null;
  email?: string | null;
  twitterSubject?: string | null;
  twitterUsername?: string | null;
};
const X_SUBJECT_COOKIE = "idf_x_subject";
const X_USERNAME_COOKIE = "idf_x_username";
const PRIVY_USER_COOKIE = "idf_privy_user_id";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as SessionBody;
    const accessToken = body.accessToken?.trim();
    if (!accessToken) {
      return NextResponse.json({ error: "Missing access token" }, { status: 400 });
    }

    const verified = await verifyPrivyAccessToken(accessToken);
    if (!verified?.userId) {
      return NextResponse.json({ error: "Invalid Privy token" }, { status: 401 });
    }
    // #region agent log
    fetch('http://127.0.0.1:7427/ingest/53de14af-f544-4874-907d-9c3852d2c5f6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'933492'},body:JSON.stringify({sessionId:'933492',runId:'run2',hypothesisId:'H5',location:'src/app/api/auth/privy/session/route.ts:POST:verified',message:'privy session payload flags',data:{hasDatabase,hasPool:Boolean(pool),hasTwitterSubject:Boolean(body.twitterSubject),hasWalletAddress:Boolean(body.walletAddress),hasEmail:Boolean(body.email),userId:verified.userId},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    if (hasDatabase && pool) {
      await pool.query(
        `
        INSERT INTO users (id, email, wallet_address, twitter_id, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, 1, now(), now())
        ON CONFLICT (id)
        DO UPDATE SET
          email = COALESCE(EXCLUDED.email, users.email),
          wallet_address = COALESCE(EXCLUDED.wallet_address, users.wallet_address),
          is_active = 1,
          deleted_at = NULL,
          twitter_id = COALESCE(EXCLUDED.twitter_id, users.twitter_id),
          updated_at = now()
        `,
        [verified.userId, body.email ?? null, body.walletAddress ?? null, body.twitterSubject ?? null]
      );

      await pool.query(
        `
        INSERT INTO auth_accounts (
          user_id,
          provider,
          provider_account_id,
          provider_user_id,
          wallet_address,
          email,
          is_active,
          created_at,
          updated_at
        )
        VALUES ($1, 'privy', $2, $2, $3, $4, 1, now(), now())
        ON CONFLICT (provider, provider_account_id)
        DO UPDATE SET
          user_id = EXCLUDED.user_id,
          wallet_address = COALESCE(EXCLUDED.wallet_address, auth_accounts.wallet_address),
          email = COALESCE(EXCLUDED.email, auth_accounts.email),
          is_active = 1,
          updated_at = now()
        `,
        [verified.userId, verified.userId, body.walletAddress ?? null, body.email ?? null]
      );

      if (body.twitterSubject) {
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
            verified_at = COALESCE(social_accounts.verified_at, now()),
            last_revalidated_at = now(),
            updated_at = now()
          `,
          [verified.userId, body.twitterSubject]
        );
      }
    }

    const sessionToken = createSessionToken(verified.userId, "privy");
    const response = NextResponse.json({
      ok: true,
      userId: verified.userId,
      noDatabase: !hasDatabase || !pool,
    });
    response.cookies.set(getSessionCookieName(), sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    response.cookies.set(PRIVY_USER_COOKIE, verified.userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    response.cookies.set(X_SUBJECT_COOKIE, body.twitterSubject?.trim() || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: body.twitterSubject ? 60 * 60 * 24 * 30 : 0,
    });
    response.cookies.set(X_USERNAME_COOKIE, body.twitterUsername?.trim() || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: body.twitterUsername ? 60 * 60 * 24 * 30 : 0,
    });
    return response;
  } catch (error) {
    console.error("Error creating Privy session:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(getSessionCookieName(), "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(PRIVY_USER_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(X_SUBJECT_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(X_USERNAME_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}

