import { NextRequest, NextResponse } from "next/server";
import { readBadgeClaims, readCampaignClaims, readLearningCampaigns } from "@/lib/learning-badges/campaign-storage";
import { evaluateLearningProgress } from "@/lib/learning-badges/evaluate";
import { TEMPLATE_WALLET } from "@/lib/learning-badges/catalog";

export const dynamic = "force-dynamic";

function normalizeWallet(value: string | null): string {
  if (!value) return TEMPLATE_WALLET;
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return TEMPLATE_WALLET;
  return trimmed;
}

export async function GET(request: NextRequest) {
  try {
    const wallet = normalizeWallet(request.nextUrl.searchParams.get("wallet"));
    const [campaigns, claims, badgeClaims] = await Promise.all([
      readLearningCampaigns(),
      readCampaignClaims(),
      readBadgeClaims(),
    ]);
    const evaluation = evaluateLearningProgress(wallet, campaigns, claims, badgeClaims);
    return NextResponse.json(evaluation);
  } catch (error) {
    console.error("Errore valutazione learning badges:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
