import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { canManageAdmin } from "@/lib/auth/admin";
import { hasDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ authenticated: false, isAdmin: false });
    }

    // In local/dev without DB we allow admin UI access for authenticated users,
    // otherwise the panel flickers open and immediately redirects.
    if (!hasDatabase && process.env.NODE_ENV !== "production") {
      return NextResponse.json({ authenticated: true, isAdmin: true, devBypass: true });
    }

    const isAdmin = await canManageAdmin(userId);
    return NextResponse.json({ authenticated: true, isAdmin });
  } catch (error) {
    console.error("Error resolving admin status:", error);
    return NextResponse.json({ authenticated: true, isAdmin: false });
  }
}
