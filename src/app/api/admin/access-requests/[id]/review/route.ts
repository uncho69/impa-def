import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { canManageAdmin } from "@/lib/auth/admin";
import { hasDatabase, pool } from "@/lib/db";
import { ensureBetaAccessRequestsTable } from "@/lib/db/ensure-beta-access-table";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function ensureAdmin(request: NextRequest): Promise<string | null> {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return null;
  if (!hasDatabase && process.env.NODE_ENV !== "production") return userId;
  if (await canManageAdmin(userId)) return userId;
  return null;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const adminUserId = await ensureAdmin(request);
  if (!adminUserId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasDatabase || !pool) {
    return NextResponse.json({ error: "Database non configurato." }, { status: 503 });
  }

  const requestId = Number.parseInt(params.id, 10);
  if (!Number.isFinite(requestId) || requestId <= 0) {
    return NextResponse.json({ error: "ID richiesta non valido." }, { status: 400 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    action?: "approve" | "reject";
    notes?: string;
  };
  const action = body.action;
  if (action !== "approve" && action !== "reject") {
    return NextResponse.json({ error: "Azione non valida." }, { status: 400 });
  }

  await ensureBetaAccessRequestsTable();

  const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 1000) : "";
  const status = action === "approve" ? "approved" : "rejected";

  const updated = await pool.query(
    `
    UPDATE beta_access_requests
    SET
      status = $2,
      admin_review_notes = $3,
      reviewed_at = now(),
      reviewed_by = $4,
      updated_at = now()
    WHERE id = $1
    RETURNING id, status
    `,
    [requestId, status, notes || null, adminUserId],
  );

  if (updated.rowCount === 0) {
    return NextResponse.json({ error: "Richiesta non trovata." }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    id: updated.rows[0].id,
    status: updated.rows[0].status,
  });
}
