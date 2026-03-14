import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_GATE_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/access-gate";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { canManageAdmin } from "@/lib/auth/admin";
import { hasDatabase, pool } from "@/lib/db";
import { ensureBetaAccessRequestsTable } from "@/lib/db/ensure-beta-access-table";

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
      return NextResponse.json({
        unlocked: false,
        reason: "not_authenticated",
        requestStatus: null,
        requestAccessPath: "/beta-access",
      });
    }

    if (!hasDatabase && process.env.NODE_ENV !== "production") {
      return NextResponse.json({ unlocked: true, source: "dev-bypass" });
    }

    const isAdmin = await canManageAdmin(userId);
    if (isAdmin) {
      return NextResponse.json({ unlocked: true, source: "admin" });
    }

    if (!hasDatabase || !pool) {
      return NextResponse.json({
        unlocked: false,
        reason: "not_approved",
        requestStatus: "none",
        requestAccessPath: "/beta-access",
      });
    }

    await ensureBetaAccessRequestsTable();
    const requestRow = await pool.query<{ status: "pending" | "approved" | "rejected" }>(
      `
      SELECT status
      FROM beta_access_requests
      WHERE user_id = $1
      LIMIT 1
      `,
      [userId],
    );
    const requestStatus = requestRow.rows[0]?.status ?? "none";
    if (requestStatus === "approved") {
      return NextResponse.json({ unlocked: true, source: "approved-user" });
    }

    return NextResponse.json({
      unlocked: false,
      reason: "not_approved",
      requestStatus,
      requestAccessPath: "/beta-access",
    });
  } catch (error) {
    console.error("Error resolving access gate status:", error);
    return NextResponse.json({ unlocked: false }, { status: 200 });
  }
}

