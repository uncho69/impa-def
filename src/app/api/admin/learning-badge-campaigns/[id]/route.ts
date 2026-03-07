import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { readLearningCampaigns, writeLearningCampaigns } from "@/lib/learning-badges/campaign-storage";
import type { LearningCampaign } from "@/lib/learning-badges/campaigns";

const ADMIN_EMAILS = [
  "jeffben69zos@gmail.com",
  "admin@imparodefi.com",
  "cofounder@imparodefi.com",
  "lordbaconf@gmail.com",
];

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
    return Boolean(userEmail && ADMIN_EMAILS.includes(userEmail));
  } catch (error) {
    console.error("Errore auth admin learning campaigns [id]:", error);
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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }
  try {
    const data = await request.json();
    const campaigns = await readLearningCampaigns();
    const index = campaigns.findIndex((item) => item.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: "Campagna non trovata" }, { status: 404 });
    }
    const prev = campaigns[index];
    const hasThreshold = Object.prototype.hasOwnProperty.call(data, "threshold");
    const parsedThreshold =
      !hasThreshold || data?.threshold === "" || typeof data?.threshold === "undefined"
        ? prev.threshold
        : data?.threshold === null
          ? null
          : Number.isFinite(Number(data.threshold))
            ? Number(data.threshold)
            : prev.threshold;
    const next: LearningCampaign = {
      ...prev,
      title: data?.title ? String(data.title).trim() : prev.title,
      description: data?.description ? String(data.description).trim() : prev.description,
      level: data?.level ? sanitizeLevel(data.level) : prev.level,
      conditionType: data?.conditionType ? sanitizeConditionType(data.conditionType) : prev.conditionType,
      conditionValue: data?.conditionValue ? String(data.conditionValue).trim() : prev.conditionValue,
      threshold: parsedThreshold,
      rewardType: data?.rewardType ? sanitizeRewardType(data.rewardType) : prev.rewardType,
      rewardValue: data?.rewardValue ? String(data.rewardValue).trim() : prev.rewardValue,
      rewardToken: data?.rewardToken === null ? null : data?.rewardToken ? String(data.rewardToken).trim() : prev.rewardToken,
      isActive: typeof data?.isActive === "boolean" ? data.isActive : prev.isActive,
      startsAt: data?.startsAt === null ? null : data?.startsAt ? String(data.startsAt) : prev.startsAt,
      endsAt: data?.endsAt === null ? null : data?.endsAt ? String(data.endsAt) : prev.endsAt,
      order: Number.isFinite(Number(data?.order)) ? Number(data.order) : prev.order,
      updatedAt: new Date().toISOString(),
    };
    campaigns[index] = next;
    await writeLearningCampaigns(campaigns);
    return NextResponse.json({ campaign: next });
  } catch (error) {
    console.error("Errore PUT admin learning campaigns:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }
  try {
    const campaigns = await readLearningCampaigns();
    const exists = campaigns.some((item) => item.id === params.id);
    if (!exists) return NextResponse.json({ error: "Campagna non trovata" }, { status: 404 });
    const next = campaigns.filter((item) => item.id !== params.id);
    await writeLearningCampaigns(next);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Errore DELETE admin learning campaigns:", error);
    return NextResponse.json({ error: "Errore interno del server" }, { status: 500 });
  }
}
