import { NextRequest, NextResponse } from "next/server";
import {
  readBadgeClaims,
  readCampaignClaims,
  readLearningCampaigns,
  writeBadgeClaims,
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
    const badgeKey = String(body?.badgeKey || "").trim();

    if (!wallet || !badgeKey) {
      return NextResponse.json({ error: "wallet e badgeKey obbligatori" }, { status: 400 });
    }

    const [campaigns, claims, badgeClaims] = await Promise.all([
      readLearningCampaigns(),
      readCampaignClaims(),
      readBadgeClaims(),
    ]);

    const alreadyClaimed = badgeClaims.some((item) => item.wallet === wallet && item.badgeKey === badgeKey);
    if (alreadyClaimed) {
      return NextResponse.json({ error: "Badge gia claimato" }, { status: 409 });
    }

    const evaluation = evaluateLearningProgress(wallet, campaigns, claims, badgeClaims);
    const candidate = evaluation.badges.find((item) => item.key === badgeKey);
    if (!candidate) {
      return NextResponse.json({ error: "Badge non trovato" }, { status: 404 });
    }
    if (!candidate.metRequirement) {
      return NextResponse.json({ error: "Task non ancora completata per questo badge" }, { status: 400 });
    }

    const nextClaims = [
      ...badgeClaims,
      {
        id: crypto.randomUUID(),
        badgeKey,
        wallet,
        claimedAt: new Date().toISOString(),
      },
    ];
    await writeBadgeClaims(nextClaims);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Errore claim badge singolo:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
