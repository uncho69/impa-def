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
  migrationFromUserId?: string | null;
};
const X_SUBJECT_COOKIE = "idf_x_subject";
const X_USERNAME_COOKIE = "idf_x_username";
const PRIVY_USER_COOKIE = "idf_privy_user_id";
let usersTwitterIdColumnCache: boolean | null = null;

async function usersTableHasTwitterIdColumn(): Promise<boolean> {
  if (!pool) return false;
  if (usersTwitterIdColumnCache !== null) return usersTwitterIdColumnCache;
  try {
    const result = await pool.query(
      `
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'users'
        AND column_name = 'twitter_id'
      LIMIT 1
      `
    );
    usersTwitterIdColumnCache = result.rows.length > 0;
  } catch {
    usersTwitterIdColumnCache = false;
  }
  return usersTwitterIdColumnCache;
}

async function resolveCanonicalUserIdByTwitterSubject(twitterSubject: string): Promise<string | null> {
  if (!pool || !twitterSubject) return null;
  try {
    const result = await pool.query(
      `
      SELECT id
      FROM users
      WHERE twitter_id = $1
        AND is_active = 1
        AND deleted_at IS NULL
      ORDER BY updated_at DESC
      LIMIT 1
      `,
      [twitterSubject]
    );
    return (result.rows?.[0]?.id as string | undefined) ?? null;
  } catch {
    return null;
  }
}

function normalizeWalletAddress(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function parseWalletAddresses(value: unknown): string[] {
  if (typeof value !== "string" || value.trim().length === 0) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return Array.from(
      new Set(parsed.map((item) => normalizeWalletAddress(item)).filter((item) => item.length > 0))
    ).slice(0, 20);
  } catch {
    return [];
  }
}

async function tryMigrateWalletProfileData(sourceUserId: string, targetUserId: string): Promise<void> {
  if (!pool) return;
  if (!sourceUserId || !targetUserId || sourceUserId === targetUserId) return;

  const sourceUserRes = await pool.query(
    `
    SELECT id, wallet_address
    FROM users
    WHERE id = $1 AND is_active = 1 AND deleted_at IS NULL
    LIMIT 1
    `,
    [sourceUserId]
  );
  if (sourceUserRes.rows.length === 0) return;

  const targetUserRes = await pool.query(
    `
    SELECT id, wallet_address
    FROM users
    WHERE id = $1
    LIMIT 1
    `,
    [targetUserId]
  );
  if (targetUserRes.rows.length === 0) return;

  const sourcePrimaryWallet = normalizeWalletAddress(sourceUserRes.rows[0]?.wallet_address);
  const targetPrimaryWallet = normalizeWalletAddress(targetUserRes.rows[0]?.wallet_address);
  if (!targetPrimaryWallet && sourcePrimaryWallet) {
    await pool.query(
      `
      UPDATE users
      SET wallet_address = $2, updated_at = now()
      WHERE id = $1
      `,
      [targetUserId, sourcePrimaryWallet]
    );
  }

  try {
    const sourceSettings = await pool.query(
      `
      SELECT custom_username, show_wallet_address_public, wallet_addresses, instagram_url, tiktok_url, youtube_url
      FROM user_profile_settings
      WHERE user_id = $1
      LIMIT 1
      `,
      [sourceUserId]
    );
    const targetSettings = await pool.query(
      `
      SELECT custom_username, show_wallet_address_public, wallet_addresses, instagram_url, tiktok_url, youtube_url
      FROM user_profile_settings
      WHERE user_id = $1
      LIMIT 1
      `,
      [targetUserId]
    );
    const source = sourceSettings.rows[0] ?? null;
    const target = targetSettings.rows[0] ?? null;
    if (!source && !target) return;

    const mergedWallets = Array.from(
      new Set([
        ...parseWalletAddresses(source?.wallet_addresses),
        ...parseWalletAddresses(target?.wallet_addresses),
        sourcePrimaryWallet,
        targetPrimaryWallet,
      ].filter((wallet) => wallet.length > 0))
    ).slice(0, 20);

    const mergedCustomUsername = target?.custom_username ?? source?.custom_username ?? null;
    const mergedShowWallet =
      Number(target?.show_wallet_address_public ?? 0) === 1 || Number(source?.show_wallet_address_public ?? 0) === 1 ? 1 : 0;
    const mergedInstagram = target?.instagram_url ?? source?.instagram_url ?? null;
    const mergedTikTok = target?.tiktok_url ?? source?.tiktok_url ?? null;
    const mergedYoutube = target?.youtube_url ?? source?.youtube_url ?? null;

    await pool.query(
      `
      INSERT INTO user_profile_settings (
        user_id,
        custom_username,
        show_wallet_address_public,
        wallet_addresses,
        instagram_url,
        tiktok_url,
        youtube_url,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, now())
      ON CONFLICT (user_id)
      DO UPDATE SET
        custom_username = EXCLUDED.custom_username,
        show_wallet_address_public = EXCLUDED.show_wallet_address_public,
        wallet_addresses = EXCLUDED.wallet_addresses,
        instagram_url = EXCLUDED.instagram_url,
        tiktok_url = EXCLUDED.tiktok_url,
        youtube_url = EXCLUDED.youtube_url,
        updated_at = now()
      `,
      [
        targetUserId,
        mergedCustomUsername,
        mergedShowWallet,
        JSON.stringify(mergedWallets),
        mergedInstagram,
        mergedTikTok,
        mergedYoutube,
      ]
    );
  } catch {
    // Settings table might not exist or may have a legacy schema; skip without failing login.
  }
}

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
    // #region agent log
    fetch('http://127.0.0.1:7427/ingest/53de14af-f544-4874-907d-9c3852d2c5f6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'933492'},body:JSON.stringify({sessionId:'933492',runId:'run6',hypothesisId:'H19',location:'src/app/api/auth/privy/session/route.ts:POST:requestContext',message:'privy session request context',data:{origin:request.headers.get('origin') ?? null,host:request.headers.get('host') ?? null,hasIncomingSessionCookie:Boolean(request.cookies.get(getSessionCookieName())?.value),hasIncomingPrivyCookie:Boolean(request.cookies.get(PRIVY_USER_COOKIE)?.value)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    if (hasDatabase && pool) {
      const hasTwitterIdColumn = await usersTableHasTwitterIdColumn();
      let sessionUserId = verified.userId;
      const twitterSubject = body.twitterSubject?.trim() || "";
      if (hasTwitterIdColumn && twitterSubject) {
        const canonicalByTwitter = await resolveCanonicalUserIdByTwitterSubject(twitterSubject);
        if (canonicalByTwitter && canonicalByTwitter !== verified.userId) {
          sessionUserId = canonicalByTwitter;
          // #region agent log
          fetch('http://127.0.0.1:7427/ingest/53de14af-f544-4874-907d-9c3852d2c5f6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'933492'},body:JSON.stringify({sessionId:'933492',runId:'run8',hypothesisId:'H21',location:'src/app/api/auth/privy/session/route.ts:POST:canonicalByTwitter',message:'session user switched to canonical twitter owner',data:{verifiedUserId:verified.userId,sessionUserId,twitterSubject},timestamp:Date.now()})}).catch(()=>{});
          // #endregion
        }
      }

      const migrationFromUserId = body.migrationFromUserId?.trim() || null;
      const sourceUserFromCookie = request.cookies.get(PRIVY_USER_COOKIE)?.value?.trim() || null;

      if (
        migrationFromUserId &&
        sourceUserFromCookie &&
        migrationFromUserId === sourceUserFromCookie &&
        migrationFromUserId !== sessionUserId &&
        body.twitterSubject
      ) {
        try {
          await tryMigrateWalletProfileData(migrationFromUserId, sessionUserId);
        } catch (migrationError) {
          console.warn("Privy session migration warning:", migrationError);
        }
      }

      if (sessionUserId !== verified.userId) {
        try {
          await tryMigrateWalletProfileData(verified.userId, sessionUserId);
        } catch (migrationError) {
          console.warn("Privy canonical migration warning:", migrationError);
        }
      }

      if (hasTwitterIdColumn) {
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
          [sessionUserId, body.email ?? null, body.walletAddress ?? null, body.twitterSubject ?? null]
        );
      } else {
        await pool.query(
          `
          INSERT INTO users (id, email, wallet_address, is_active, created_at, updated_at)
          VALUES ($1, $2, $3, 1, now(), now())
          ON CONFLICT (id)
          DO UPDATE SET
            email = COALESCE(EXCLUDED.email, users.email),
            wallet_address = COALESCE(EXCLUDED.wallet_address, users.wallet_address),
            is_active = 1,
            deleted_at = NULL,
            updated_at = now()
          `,
          [sessionUserId, body.email ?? null, body.walletAddress ?? null]
        );
      }

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
        [sessionUserId, verified.userId, body.walletAddress ?? null, body.email ?? null]
      );

      if (body.twitterSubject) {
        try {
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
            [sessionUserId, body.twitterSubject]
          );
        } catch (socialSyncError) {
          console.warn("Privy session social sync warning:", socialSyncError);
        }
      }

      // #region agent log
      fetch('http://127.0.0.1:7427/ingest/53de14af-f544-4874-907d-9c3852d2c5f6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'933492'},body:JSON.stringify({sessionId:'933492',runId:'run8',hypothesisId:'H22',location:'src/app/api/auth/privy/session/route.ts:POST:resolvedSessionUser',message:'final session user chosen after db sync',data:{verifiedUserId:verified.userId,sessionUserId,hasTwitterSubject:Boolean(body.twitterSubject),hasDatabase,hasPool:Boolean(pool)},timestamp:Date.now()})}).catch(()=>{});
      // #endregion

      const sessionToken = createSessionToken(sessionUserId, "privy");
      const response = NextResponse.json({
        ok: true,
        userId: sessionUserId,
        noDatabase: !hasDatabase || !pool,
      });
      response.cookies.set(getSessionCookieName(), sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
      response.cookies.set(PRIVY_USER_COOKIE, sessionUserId, {
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
      // #region agent log
      fetch('http://127.0.0.1:7427/ingest/53de14af-f544-4874-907d-9c3852d2c5f6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'933492'},body:JSON.stringify({sessionId:'933492',runId:'run6',hypothesisId:'H19',location:'src/app/api/auth/privy/session/route.ts:POST:responseCookies',message:'privy session response cookies set',data:{userId:sessionUserId,setSessionCookie:true,setPrivyCookie:true,setXSubjectCookie:Boolean(body.twitterSubject),setXUsernameCookie:Boolean(body.twitterUsername),isProduction:process.env.NODE_ENV==='production'},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      return response;
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
    // #region agent log
    fetch('http://127.0.0.1:7427/ingest/53de14af-f544-4874-907d-9c3852d2c5f6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'933492'},body:JSON.stringify({sessionId:'933492',runId:'run6',hypothesisId:'H19',location:'src/app/api/auth/privy/session/route.ts:POST:responseCookies',message:'privy session response cookies set',data:{userId:verified.userId,setSessionCookie:true,setPrivyCookie:true,setXSubjectCookie:Boolean(body.twitterSubject),setXUsernameCookie:Boolean(body.twitterUsername),isProduction:process.env.NODE_ENV==='production'},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return response;
  } catch (error) {
    const err = error as { message?: string; code?: string };
    // #region agent log
    fetch('http://127.0.0.1:7427/ingest/53de14af-f544-4874-907d-9c3852d2c5f6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'933492'},body:JSON.stringify({sessionId:'933492',runId:'run7',hypothesisId:'H20',location:'src/app/api/auth/privy/session/route.ts:POST:catch',message:'privy session route threw error',data:{message:err?.message ?? null,code:err?.code ?? null,hasDatabase,hasPool:Boolean(pool),isProduction:process.env.NODE_ENV==='production'},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
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

