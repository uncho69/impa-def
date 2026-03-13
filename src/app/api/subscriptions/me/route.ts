import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { getUserEntitlements } from "@/lib/subscriptions/entitlements";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json(
      {
        authenticated: false,
        entitlements: {
          plan: "free",
          canViewPremium: false,
          maxProjectsPerCategory: 1,
        },
      },
      { status: 200 },
    );
  }

  const entitlements = await getUserEntitlements(userId);
  return NextResponse.json({
    authenticated: true,
    userId,
    entitlements,
  });
}

