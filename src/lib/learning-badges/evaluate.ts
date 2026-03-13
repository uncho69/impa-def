import { BASE_BADGES, LEVELS, TEMPLATE_WALLET, type BadgeDefinition } from "@/lib/learning-badges/catalog";
import type { BadgeClaim, CampaignClaim, LearningCampaign } from "@/lib/learning-badges/campaigns";

type ProgressMetrics = {
  receivedEth: number;
  uniswapSwapEth: number;
  relayBridgeEth: number;
  aaveDepositEth: number;
  aaveBorrowUsd: number;
  hyperbeatDepositHype: number;
  hyperliquidUnitDepositUsd: number;
  hyperliquidTradeUsd: number;
  pendleBuyUsd: number;
  extendedVaultDepositUsd: number;
  gasSpentEth: number;
  uniswapVolumeUsd: number;
  walletAgeYears: number;
  hyperliquidAirdropClaimed: number;
};

export type EvaluatedBadge = BadgeDefinition & {
  unlocked: boolean;
  metRequirement: boolean;
  claimable: boolean;
  claimed: boolean;
  claimedAt: string | null;
  progressValue: number;
  threshold: number;
  unit: string;
};

export type EvaluatedCampaign = LearningCampaign & {
  eligible: boolean;
  eligibilityReason: string;
  claimed: boolean;
  claimedAt: string | null;
};

export type LearningEvaluation = {
  wallet: string;
  metrics: ProgressMetrics;
  badges: EvaluatedBadge[];
  levels: Array<{
    key: "principiante" | "intermedio" | "avanzato";
    label: string;
    completed: number;
    total: number;
    completionUnlocked: boolean;
  }>;
  campaigns: EvaluatedCampaign[];
};

const ZERO_METRICS: ProgressMetrics = {
  receivedEth: 0,
  uniswapSwapEth: 0,
  relayBridgeEth: 0,
  aaveDepositEth: 0,
  aaveBorrowUsd: 0,
  hyperbeatDepositHype: 0,
  hyperliquidUnitDepositUsd: 0,
  hyperliquidTradeUsd: 0,
  pendleBuyUsd: 0,
  extendedVaultDepositUsd: 0,
  gasSpentEth: 0,
  uniswapVolumeUsd: 0,
  walletAgeYears: 0,
  hyperliquidAirdropClaimed: 0,
};

const TEMPLATE_METRICS: ProgressMetrics = {
  receivedEth: 0.021,
  uniswapSwapEth: 0.007,
  relayBridgeEth: 0.004,
  aaveDepositEth: 0.006,
  aaveBorrowUsd: 4.2,
  hyperbeatDepositHype: 0.15,
  hyperliquidUnitDepositUsd: 8.4,
  hyperliquidTradeUsd: 2.8,
  pendleBuyUsd: 0,
  extendedVaultDepositUsd: 0,
  gasSpentEth: 1.4,
  uniswapVolumeUsd: 2340,
  walletAgeYears: 3.6,
  hyperliquidAirdropClaimed: 1,
};

function normalizeWallet(wallet: string): string {
  return wallet.trim().toLowerCase();
}

function metricForWallet(wallet: string): ProgressMetrics {
  const normalized = normalizeWallet(wallet);
  if (normalized === TEMPLATE_WALLET) return TEMPLATE_METRICS;
  return ZERO_METRICS;
}

type BadgeRule = {
  value: (metrics: ProgressMetrics) => number;
  threshold: number;
  unit: string;
};

const BADGE_RULES: Record<string, BadgeRule> = {
  principiante_receive_eth: { value: (m) => m.receivedEth, threshold: 0.006, unit: "ETH" },
  principiante_swap_uniswap: { value: (m) => m.uniswapSwapEth, threshold: 0.003, unit: "ETH" },
  principiante_bridge_relay: { value: (m) => m.relayBridgeEth, threshold: 0.003, unit: "ETH" },
  principiante_deposit_aave: { value: (m) => m.aaveDepositEth, threshold: 0.003, unit: "ETH" },
  intermedio_aave_borrow: { value: (m) => m.aaveBorrowUsd, threshold: 3, unit: "USD" },
  intermedio_hyperbeat_deposit: { value: (m) => m.hyperbeatDepositHype, threshold: 0.3, unit: "HYPE" },
  intermedio_hyperliquid_unit_deposit: { value: (m) => m.hyperliquidUnitDepositUsd, threshold: 5, unit: "USD" },
  avanzato_hyperliquid_trade: { value: (m) => m.hyperliquidTradeUsd, threshold: 4, unit: "USD" },
  avanzato_pendle_buy: { value: (m) => m.pendleBuyUsd, threshold: 5, unit: "USD" },
  avanzato_extended_vault_deposit: { value: (m) => m.extendedVaultDepositUsd, threshold: 5, unit: "USD" },
  globale_gas_1_eth: { value: (m) => m.gasSpentEth, threshold: 1, unit: "ETH" },
  globale_gas_5_eth: { value: (m) => m.gasSpentEth, threshold: 5, unit: "ETH" },
  globale_gas_10_eth: { value: (m) => m.gasSpentEth, threshold: 10, unit: "ETH" },
  globale_uniswap_volume_1k: { value: (m) => m.uniswapVolumeUsd, threshold: 1000, unit: "USD" },
  globale_uniswap_volume_10k: { value: (m) => m.uniswapVolumeUsd, threshold: 10000, unit: "USD" },
  globale_uniswap_volume_100k: { value: (m) => m.uniswapVolumeUsd, threshold: 100000, unit: "USD" },
  globale_uniswap_volume_1m: { value: (m) => m.uniswapVolumeUsd, threshold: 1000000, unit: "USD" },
  globale_uniswap_volume_10m: { value: (m) => m.uniswapVolumeUsd, threshold: 10000000, unit: "USD" },
  globale_wallet_age_1y: { value: (m) => m.walletAgeYears, threshold: 1, unit: "YEARS" },
  globale_wallet_age_2y: { value: (m) => m.walletAgeYears, threshold: 2, unit: "YEARS" },
  globale_wallet_age_3y: { value: (m) => m.walletAgeYears, threshold: 3, unit: "YEARS" },
  globale_wallet_age_5y: { value: (m) => m.walletAgeYears, threshold: 5, unit: "YEARS" },
  globale_wallet_age_8y: { value: (m) => m.walletAgeYears, threshold: 8, unit: "YEARS" },
  globale_hyperliquid_airdrop: { value: (m) => m.hyperliquidAirdropClaimed, threshold: 1, unit: "BOOL" },
};

function computeTaskBadges(metrics: ProgressMetrics): Map<string, EvaluatedBadge> {
  const map = new Map<string, EvaluatedBadge>();
  for (const badge of BASE_BADGES) {
    if (badge.category === "level") continue;
    const rule = BADGE_RULES[badge.key];
    const progressValue = rule ? rule.value(metrics) : 0;
    const threshold = rule ? rule.threshold : 1;
    map.set(badge.key, {
      ...badge,
      unlocked: false,
      metRequirement: progressValue >= threshold,
      claimable: false,
      claimed: false,
      claimedAt: null,
      progressValue,
      threshold,
      unit: rule?.unit || "COUNT",
    });
  }
  return map;
}

function computeLevelCompletionBadges(taskMap: Map<string, EvaluatedBadge>): EvaluatedBadge[] {
  const result: EvaluatedBadge[] = [];
  for (const badge of BASE_BADGES) {
    if (badge.category !== "level") continue;
    const level = LEVELS.find((item) => item.completionBadgeKey === badge.key);
    const required = level?.requiredBadgeKeys || [];
    const completed = required.filter((key) => taskMap.get(key)?.metRequirement).length;
    const total = Math.max(required.length, 1);
    result.push({
      ...badge,
      unlocked: false,
      metRequirement: completed >= total,
      claimable: false,
      claimed: false,
      claimedAt: null,
      progressValue: completed,
      threshold: total,
      unit: "COUNT",
    });
  }
  return result;
}

function evaluateCampaignEligibility(
  campaign: LearningCampaign,
  badgeMap: Map<string, EvaluatedBadge>,
  metrics: ProgressMetrics,
): { eligible: boolean; reason: string } {
  if (!campaign.isActive) return { eligible: false, reason: "Campagna non attiva" };
  const now = Date.now();
  if (campaign.startsAt && Date.parse(campaign.startsAt) > now) {
    return { eligible: false, reason: "Campagna non ancora iniziata" };
  }
  if (campaign.endsAt && Date.parse(campaign.endsAt) < now) {
    return { eligible: false, reason: "Campagna terminata" };
  }

  if (campaign.conditionType === "badge_key") {
    const completed = badgeMap.get(campaign.conditionValue)?.metRequirement || false;
    return completed
      ? { eligible: true, reason: "Requisito badge soddisfatto" }
      : { eligible: false, reason: "Requisito badge non completato" };
  }

  if (campaign.conditionType === "wallet_metric") {
    const metricKey = campaign.conditionValue as keyof ProgressMetrics;
    const threshold = Number(campaign.threshold || 0);
    const value = Number(metrics[metricKey] || 0);
    return value >= threshold
      ? { eligible: true, reason: "Requisito metrica soddisfatto" }
      : { eligible: false, reason: `Richiesto >= ${threshold}` };
  }

  return { eligible: false, reason: "Verifica manuale richiesta" };
}

export function evaluateLearningProgress(
  wallet: string,
  campaigns: LearningCampaign[],
  claims: CampaignClaim[],
  badgeClaims: BadgeClaim[],
): LearningEvaluation {
  const normalizedWallet = normalizeWallet(wallet);
  const metrics = metricForWallet(normalizedWallet);
  const taskMap = computeTaskBadges(metrics);
  const levelBadges = computeLevelCompletionBadges(taskMap);
  const rawBadges = [...taskMap.values(), ...levelBadges].sort((a, b) => a.order - b.order);
  const badgeClaimsByKey = new Map(
    badgeClaims
      .filter((item) => normalizeWallet(item.wallet) === normalizedWallet)
      .map((item) => [item.badgeKey, item]),
  );

  const badges = rawBadges.map((item) => {
    const claim = badgeClaimsByKey.get(item.key);
    const claimed = Boolean(claim);
    return {
      ...item,
      claimable: item.metRequirement && !claimed,
      claimed,
      claimedAt: claim?.claimedAt || null,
      unlocked: claimed,
    };
  });
  const badgeMap = new Map<string, EvaluatedBadge>(badges.map((item) => [item.key, item]));

  const levels = LEVELS.map((level) => {
    const completed = level.requiredBadgeKeys.filter((key) => badgeMap.get(key)?.metRequirement).length;
    const completionUnlocked = Boolean(badgeMap.get(level.completionBadgeKey)?.claimed);
    return {
      key: level.key,
      label: level.label,
      completed,
      total: level.requiredBadgeKeys.length,
      completionUnlocked,
    };
  });

  const campaignClaimsById = new Map(
    claims
      .filter((item) => normalizeWallet(item.wallet) === normalizedWallet)
      .map((item) => [item.campaignId, item]),
  );

  const evaluatedCampaigns: EvaluatedCampaign[] = campaigns
    .map((campaign) => {
      const eligibility = evaluateCampaignEligibility(campaign, badgeMap, metrics);
      const claim = campaignClaimsById.get(campaign.id);
      return {
        ...campaign,
        eligible: eligibility.eligible,
        eligibilityReason: eligibility.reason,
        claimed: Boolean(claim),
        claimedAt: claim?.claimedAt || null,
      };
    })
    .sort((a, b) => a.order - b.order || a.createdAt.localeCompare(b.createdAt));

  return {
    wallet: normalizedWallet,
    metrics,
    badges,
    levels,
    campaigns: evaluatedCampaigns,
  };
}
