import { NextRequest, NextResponse } from "next/server";
import { canManageAdmin } from "@/lib/auth/admin";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { hasDatabase } from "@/lib/db";
import { createAccessGatePassword, listAccessGatePasswords } from "@/lib/access-gate";

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

export async function GET(request: NextRequest) {
  const userId = await ensureAdmin(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const passwords = await listAccessGatePasswords();
    return NextResponse.json(
      { passwords },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("Error loading access gate passwords:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const userId = await ensureAdmin(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const created = await createAccessGatePassword(userId);
    return NextResponse.json({ ok: true, password: created });
  } catch (error) {
    console.error("Error creating access gate password:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

