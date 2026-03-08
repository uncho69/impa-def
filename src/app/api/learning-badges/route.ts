import { NextRequest, NextResponse } from "next/server";
import { readBadgeClaims, readCampaignClaims, readLearningCampaigns } from "@/lib/learning-badges/campaign-storage";
import { evaluateLearningProgress } from "@/lib/learning-badges/evaluate";

export const dynamic = "force-dynamic";

function normalizeWallet(value: string | null): string {
  if (!value) return "";
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return "";
  return trimmed;
}

export async function GET(request: NextRequest) {
  try {
    const wallet = normalizeWallet(request.nextUrl.searchParams.get("wallet"));
    if (!wallet) {
      return NextResponse.json({ error: "Parametro wallet obbligatorio" }, { status: 400 });
    }
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
