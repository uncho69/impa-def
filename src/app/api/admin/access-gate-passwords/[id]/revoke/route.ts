import { NextRequest, NextResponse } from "next/server";
import { canManageAdmin } from "@/lib/auth/admin";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { hasDatabase } from "@/lib/db";
import { revokeAccessGatePassword } from "@/lib/access-gate";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function ensureAdmin(request: NextRequest): Promise<string | null> {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return null;

  if (!hasDatabase && process.env.NODE_ENV !== "production") {
    return userId;
  }

  const isAdmin = await canManageAdmin(userId);
  if (!isAdmin) return null;
  return userId;
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const userId = await ensureAdmin(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = await context.params;
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const ok = await revokeAccessGatePassword(id);
    if (!ok) {
      return NextResponse.json({ error: "Password non revocabile" }, { status: 409 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error revoking access gate password:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

