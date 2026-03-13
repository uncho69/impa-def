import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { pool } from "@/lib/db";
import { ensureAccessControlTables } from "@/lib/db/ensure-access-control-tables";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!pool) return NextResponse.json({ accounts: [] });

  await ensureAccessControlTables();
  const result = await pool.query(
    `
    SELECT provider, provider_user_id, status, verified_at, last_revalidated_at
    FROM social_accounts
    WHERE user_id = $1
    ORDER BY provider ASC
    `,
    [userId],
  );

  return NextResponse.json({
    accounts: result.rows.map((row) => ({
      provider: row.provider,
      providerUserId: row.provider_user_id,
      status: row.status,
      verifiedAt: row.verified_at,
      lastRevalidatedAt: row.last_revalidated_at,
    })),
  });
}

