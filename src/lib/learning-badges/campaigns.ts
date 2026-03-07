export type LearningCampaignLevel = "principiante" | "intermedio" | "avanzato" | "globale" | "speciale";
export type LearningCampaignConditionType = "badge_key" | "wallet_metric" | "manual";
export type LearningCampaignRewardType = "idf_points" | "token" | "custom";

export type LearningCampaign = {
  id: string;
  title: string;
  description: string;
  level: LearningCampaignLevel;
  conditionType: LearningCampaignConditionType;
  conditionValue: string;
  threshold: number | null;
  rewardType: LearningCampaignRewardType;
  rewardValue: string;
  rewardToken: string | null;
  isActive: boolean;
  startsAt: string | null;
  endsAt: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type CampaignClaim = {
  id: string;
  campaignId: string;
  wallet: string;
  claimedAt: string;
};

export type BadgeClaim = {
  id: string;
  badgeKey: string;
  wallet: string;
  claimedAt: string;
};

const NOW = new Date().toISOString();

export const DEFAULT_LEARNING_CAMPAIGNS: LearningCampaign[] = [
  {
    id: "lvl-principiante-reward",
    title: "Reward Livello Principiante",
    description: "Completa tutte le missioni Principiante e richiedi la reward configurata.",
    level: "principiante",
    conditionType: "badge_key",
    conditionValue: "principiante_level_complete",
    threshold: null,
    rewardType: "idf_points",
    rewardValue: "250",
    rewardToken: "IDF",
    isActive: true,
    startsAt: null,
    endsAt: null,
    order: 10,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "lvl-intermedio-reward",
    title: "Reward Livello Intermedio",
    description: "Completa tutte le missioni Intermedio e richiedi la reward.",
    level: "intermedio",
    conditionType: "badge_key",
    conditionValue: "intermedio_level_complete",
    threshold: null,
    rewardType: "idf_points",
    rewardValue: "500",
    rewardToken: "IDF",
    isActive: true,
    startsAt: null,
    endsAt: null,
    order: 20,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "lvl-avanzato-reward",
    title: "Reward Livello Avanzato",
    description: "Completa tutte le missioni Avanzato e richiedi la reward.",
    level: "avanzato",
    conditionType: "badge_key",
    conditionValue: "avanzato_level_complete",
    threshold: null,
    rewardType: "idf_points",
    rewardValue: "1000",
    rewardToken: "IDF",
    isActive: true,
    startsAt: null,
    endsAt: null,
    order: 30,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "special-hyperliquid-nft",
    title: "Speciale: Mint NFT",
    description: "Minta l'NFC/NFT indicato nella campagna per ottenere badge o reward.",
    level: "speciale",
    conditionType: "manual",
    conditionValue: "mint_nft",
    threshold: null,
    rewardType: "custom",
    rewardValue: "Badge speciale + reward temporanea",
    rewardToken: null,
    isActive: false,
    startsAt: null,
    endsAt: null,
    order: 40,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "special-uniswap-lp",
    title: "Speciale: LP su Uniswap",
    description: "Fornisci liquidita a una pool Uniswap target per ottenere reward.",
    level: "speciale",
    conditionType: "wallet_metric",
    conditionValue: "uniswapVolumeUsd",
    threshold: 1000,
    rewardType: "idf_points",
    rewardValue: "300",
    rewardToken: "IDF",
    isActive: false,
    startsAt: null,
    endsAt: null,
    order: 50,
    createdAt: NOW,
    updatedAt: NOW,
  },
];
