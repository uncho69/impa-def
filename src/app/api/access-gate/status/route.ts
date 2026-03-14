import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_GATE_COOKIE_NAME,
  ACCESS_GATE_SESSION_HOURS,
  createAdminBypassSession,
  verifySessionToken,
} from "@/lib/access-gate";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { canManageAdmin } from "@/lib/auth/admin";
import { hasDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(ACCESS_GATE_COOKIE_NAME)?.value ?? "";
    if (token) {
      const valid = await verifySessionToken(token);
      if (valid) {
        return NextResponse.json({ unlocked: true, source: "session" });
      }
    }

    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ unlocked: false });
    }

    if (!hasDatabase && process.env.NODE_ENV !== "production") {
      return NextResponse.json({ unlocked: true, source: "dev-bypass" });
    }

    const isAdmin = await canManageAdmin(userId);
    if (!isAdmin) {
      return NextResponse.json({ unlocked: false });
    }

    const session = await createAdminBypassSession();
    const response = NextResponse.json({ unlocked: true, source: "admin" });
    response.cookies.set({
      name: ACCESS_GATE_COOKIE_NAME,
      value: session.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_GATE_SESSION_HOURS * 60 * 60,
      expires: session.expiresAt,
    });
    return response;
  } catch (error) {
    console.error("Error resolving access gate status:", error);
    return NextResponse.json({ unlocked: false }, { status: 200 });
  }
}

