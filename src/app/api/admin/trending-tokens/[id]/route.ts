import { NextRequest, NextResponse } from "next/server";
import { hasDatabase, pool } from "@/lib/db";
import { ensureTrendingTokensTable } from "@/lib/db/ensure-trending-tokens-table";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { canManageAdmin } from "@/lib/auth/admin";

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
  if (!hasDatabase || !pool) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    await ensureTrendingTokensTable();
    await pool.query(`DELETE FROM trending_tokens WHERE id = $1`, [id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting trending token:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
