import { NextRequest, NextResponse } from "next/server";
import { hasDatabase, pool } from "@/lib/db";
import { ensureTrendingTokensTable } from "@/lib/db/ensure-trending-tokens-table";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { canManageAdmin } from "@/lib/auth/admin";
import { deleteNoDbTrendingToken } from "@/lib/trending-tokens-fallback-store";

export const dynamic = "force-dynamic";

async function checkAdmin(request: NextRequest): Promise<boolean> {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return false;
  if (!hasDatabase && process.env.NODE_ENV !== "production") return true;
  return canManageAdmin(userId);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const isAdmin = await checkAdmin(_request);
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  if (!hasDatabase || !pool) {
    deleteNoDbTrendingToken(id);
    return NextResponse.json({ ok: true, noDatabase: true });
  }

  try {
    await ensureTrendingTokensTable();
    await pool.query("BEGIN");
    await pool.query(`DELETE FROM trending_tokens WHERE id = $1`, [id]);
    await pool.query(`
      WITH ordered AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY sort_order ASC, id ASC) AS next_order
        FROM trending_tokens
      )
      UPDATE trending_tokens t
      SET sort_order = ordered.next_order, updated_at = now()
      FROM ordered
      WHERE t.id = ordered.id
    `);
    await pool.query("COMMIT");
    return NextResponse.json({ ok: true });
  } catch (error) {
    await pool?.query("ROLLBACK").catch(() => null);
    console.error("Error deleting trending token:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
