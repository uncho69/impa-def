import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { readLearningCampaigns, writeLearningCampaigns } from "@/lib/learning-badges/campaign-storage";
import type { LearningCampaign } from "@/lib/learning-badges/campaigns";
import { isAdminEmail } from "@/lib/admin-emails";

async function checkAdmin() {
  try {
    const hasValidClerkKeys = Boolean(
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
        process.env.CLERK_SECRET_KEY &&
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_") &&
        process.env.CLERK_SECRET_KEY.startsWith("sk_"),
    );
    if (!hasValidClerkKeys && process.env.NODE_ENV !== "production") {
      return true;
    }

    const { userId } = await auth();
    if (!userId) return false;

    const user = await currentUser();
    const userEmail = user?.emailAddresses?.[0]?.emailAddress?.toLowerCase();
    return Boolean(userEmail && isAdminEmail(userEmail));
  } catch (error) {
    console.error("Errore auth admin learning badges:", error);
    return false;
  }
}

function sanitizeLevel(value: unknown): LearningCampaign["level"] {
  if (value === "principiante" || value === "intermedio" || value === "avanzato" || value === "globale") {
    return value;
  }
  return "speciale";
}

function sanitizeConditionType(value: unknown): LearningCampaign["conditionType"] {
  if (value === "badge_key" || value === "wallet_metric") return value;
  return "manual";
}

function sanitizeRewardType(value: unknown): LearningCampaign["rewardType"] {
  if (value === "idf_points" || value === "token") return value;
  return "custom";
}

export async function GET() {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }
  try {
    const campaigns = await readLearningCampaigns();
    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error("Errore GET admin learning campaigns:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }
  try {
    const data = await request.json();
    const title = String(data?.title || "").trim();
    const description = String(data?.description || "").trim();
    const conditionValue = String(data?.conditionValue || "").trim();
    const rewardValue = String(data?.rewardValue || "").trim();

    if (!title || !description || !conditionValue || !rewardValue) {
      return NextResponse.json(
        { error: "title, description, conditionValue e rewardValue sono obbligatori" },
        { status: 400 },
      );
    }

    const campaigns = await readLearningCampaigns();
    const parsedThreshold =
      data?.threshold === null || data?.threshold === "" || typeof data?.threshold === "undefined"
        ? null
        : Number.isFinite(Number(data.threshold))
          ? Number(data.threshold)
          : null;
    const now = new Date().toISOString();
    const nextOrder = Number.isFinite(Number(data?.order)) ? Number(data.order) : campaigns.length + 1;
    const nextCampaign: LearningCampaign = {
      id: crypto.randomUUID(),
      title,
      description,
      level: sanitizeLevel(data?.level),
      conditionType: sanitizeConditionType(data?.conditionType),
      conditionValue,
      threshold: parsedThreshold,
      rewardType: sanitizeRewardType(data?.rewardType),
      rewardValue,
      rewardToken: data?.rewardToken ? String(data.rewardToken).trim() : null,
      isActive: Boolean(data?.isActive ?? true),
      startsAt: data?.startsAt ? String(data.startsAt) : null,
      endsAt: data?.endsAt ? String(data.endsAt) : null,
      order: nextOrder,
      createdAt: now,
      updatedAt: now,
    };
    campaigns.push(nextCampaign);
    await writeLearningCampaigns(campaigns);
    return NextResponse.json({ campaign: nextCampaign }, { status: 201 });
  } catch (error) {
    console.error("Errore POST admin learning campaigns:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
