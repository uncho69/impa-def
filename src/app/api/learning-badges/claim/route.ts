import { NextRequest, NextResponse } from "next/server";
import {
  readBadgeClaims,
  readCampaignClaims,
  readLearningCampaigns,
  writeCampaignClaims,
} from "@/lib/learning-badges/campaign-storage";
import { evaluateLearningProgress } from "@/lib/learning-badges/evaluate";

export const dynamic = "force-dynamic";

function normalizeWallet(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const wallet = normalizeWallet(body?.wallet);
    const campaignId = String(body?.campaignId || "").trim();

    if (!wallet || !campaignId) {
      return NextResponse.json({ error: "wallet e campaignId obbligatori" }, { status: 400 });
    }

    const [campaigns, claims, badgeClaims] = await Promise.all([
      readLearningCampaigns(),
      readCampaignClaims(),
      readBadgeClaims(),
    ]);
    const campaign = campaigns.find((item) => item.id === campaignId);
    if (!campaign) {
      return NextResponse.json({ error: "Campagna non trovata" }, { status: 404 });
    }

    const alreadyClaimed = claims.some((item) => item.wallet === wallet && item.campaignId === campaignId);
    if (alreadyClaimed) {
      return NextResponse.json({ error: "Reward gia riscattata" }, { status: 409 });
    }

    const evaluation = evaluateLearningProgress(wallet, campaigns, claims, badgeClaims);
    const candidate = evaluation.campaigns.find((item) => item.id === campaignId);
    if (!candidate || !candidate.eligible) {
      return NextResponse.json({ error: candidate?.eligibilityReason || "Non idoneo al claim" }, { status: 400 });
    }

    const nextClaims = [
      ...claims,
      {
        id: crypto.randomUUID(),
        campaignId,
        wallet,
        claimedAt: new Date().toISOString(),
      },
    ];
    await writeCampaignClaims(nextClaims);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Errore claim learning reward:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
