import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import {
  DEFAULT_LEARNING_CAMPAIGNS,
  type BadgeClaim,
  type CampaignClaim,
  type LearningCampaign,
} from "@/lib/learning-badges/campaigns";

const DATA_DIR = path.join(process.cwd(), "data");
const CAMPAIGNS_FILE_PATH = path.join(DATA_DIR, "learning-badge-campaigns.json");
const CLAIMS_FILE_PATH = path.join(DATA_DIR, "learning-badge-claims.json");
const BADGE_CLAIMS_FILE_PATH = path.join(DATA_DIR, "learning-badge-item-claims.json");

function normalizeCampaign(input: LearningCampaign, fallbackOrder: number): LearningCampaign {
  return {
    ...input,
    id: String(input.id),
    title: String(input.title || "").trim(),
    description: String(input.description || "").trim(),
    conditionValue: String(input.conditionValue || "").trim(),
    rewardValue: String(input.rewardValue || "").trim(),
    rewardToken: input.rewardToken ? String(input.rewardToken).trim() : null,
    threshold: Number.isFinite(input.threshold) ? Number(input.threshold) : null,
    isActive: Boolean(input.isActive),
    startsAt: input.startsAt || null,
    endsAt: input.endsAt || null,
    order: Number.isFinite(input.order) ? Number(input.order) : fallbackOrder,
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: input.updatedAt || new Date().toISOString(),
  };
}

function sortCampaigns(items: LearningCampaign[]): LearningCampaign[] {
  return [...items].sort((a, b) => a.order - b.order || a.createdAt.localeCompare(b.createdAt));
}

export async function readLearningCampaigns(): Promise<LearningCampaign[]> {
  try {
    const raw = await readFile(CAMPAIGNS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as LearningCampaign[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return sortCampaigns(DEFAULT_LEARNING_CAMPAIGNS.map((item, idx) => normalizeCampaign(item, idx + 1)));
    }
    return sortCampaigns(parsed.map((item, idx) => normalizeCampaign(item, idx + 1)));
  } catch {
    return sortCampaigns(DEFAULT_LEARNING_CAMPAIGNS.map((item, idx) => normalizeCampaign(item, idx + 1)));
  }
}

export async function writeLearningCampaigns(campaigns: LearningCampaign[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const normalized = sortCampaigns(campaigns.map((item, idx) => normalizeCampaign(item, idx + 1)));
  await writeFile(CAMPAIGNS_FILE_PATH, JSON.stringify(normalized, null, 2), "utf-8");
}

function normalizeClaim(input: CampaignClaim): CampaignClaim {
  return {
    id: String(input.id),
    campaignId: String(input.campaignId),
    wallet: String(input.wallet || "").toLowerCase(),
    claimedAt: input.claimedAt || new Date().toISOString(),
  };
}

export async function readCampaignClaims(): Promise<CampaignClaim[]> {
  try {
    const raw = await readFile(CLAIMS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as CampaignClaim[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeClaim);
  } catch {
    return [];
  }
}

export async function writeCampaignClaims(claims: CampaignClaim[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(CLAIMS_FILE_PATH, JSON.stringify(claims.map(normalizeClaim), null, 2), "utf-8");
}

function normalizeBadgeClaim(input: BadgeClaim): BadgeClaim {
  return {
    id: String(input.id),
    badgeKey: String(input.badgeKey),
    wallet: String(input.wallet || "").toLowerCase(),
    claimedAt: input.claimedAt || new Date().toISOString(),
  };
}

export async function readBadgeClaims(): Promise<BadgeClaim[]> {
  try {
    const raw = await readFile(BADGE_CLAIMS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as BadgeClaim[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeBadgeClaim);
  } catch {
    return [];
  }
}

export async function writeBadgeClaims(claims: BadgeClaim[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(BADGE_CLAIMS_FILE_PATH, JSON.stringify(claims.map(normalizeBadgeClaim), null, 2), "utf-8");
}
