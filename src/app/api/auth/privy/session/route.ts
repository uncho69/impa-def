import { NextRequest, NextResponse } from "next/server";
import { pool, hasDatabase } from "@/lib/db";
import { createSessionToken, getSessionCookieName } from "@/lib/auth/session";
import { verifyPrivyAccessToken } from "@/lib/auth/privy";

export const dynamic = "force-dynamic";

type SessionBody = {
  accessToken?: string;
  walletAddress?: string | null;
  email?: string | null;
};

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

    if (hasDatabase && pool) {
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
        [verified.userId, body.email ?? null, body.walletAddress ?? null]
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
  return response;
}

