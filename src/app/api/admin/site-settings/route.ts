import { NextRequest, NextResponse } from "next/server";
import { canManageAdmin } from "@/lib/auth/admin";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { getSiteSettings, saveSiteSettings } from "@/lib/site-settings";
import { hasDatabase } from "@/lib/db";

async function ensureAdmin(request: NextRequest): Promise<string | null> {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return null;

  // Keep admin pages usable in local/dev without a configured DB.
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
    const settings = await getSiteSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Error loading admin site settings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const userId = await ensureAdmin(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const settings = await saveSiteSettings(body?.settings ?? body);
    return NextResponse.json({ ok: true, settings });
  } catch (error) {
    console.error("Error saving admin site settings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
