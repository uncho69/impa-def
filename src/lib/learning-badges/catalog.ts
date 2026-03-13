export type BadgeLevel = "principiante" | "intermedio" | "avanzato" | "globale" | "speciale";
export type BadgeStatus = "locked" | "unlocked";

export interface BadgeDefinition {
  key: string;
  title: string;
  description: string;
  level: BadgeLevel;
  category: "task" | "reputation" | "campaign" | "level";
  requirementLabel: string;
  icon: string;
  order: number;
}

export interface LevelDefinition {
  key: "principiante" | "intermedio" | "avanzato";
  label: string;
  requiredBadgeKeys: string[];
  completionBadgeKey: string;
}

export const TEMPLATE_WALLET = "0x0eccdc8512cf12f188750d1b55c739d55cc27766";

export const BASE_BADGES: BadgeDefinition[] = [
  {
    key: "principiante_receive_eth",
    title: "Funding Iniziale",
    description: "Ricevi almeno 0.006 ETH su una chain EVM supportata.",
    level: "principiante",
    category: "task",
    requirementLabel: ">= 0.006 ETH ricevuti (EVM)",
    icon: "💸",
    order: 10,
  },
  {
    key: "principiante_swap_uniswap",
    title: "Primo Swap",
    description: "Esegui uno swap di almeno 0.003 ETH su Uniswap.",
    level: "principiante",
    category: "task",
    requirementLabel: ">= 0.003 ETH swap su Uniswap",
    icon: "🔄",
    order: 20,
  },
  {
    key: "principiante_bridge_relay",
    title: "Bridge Explorer",
    description: "Bridge di almeno 0.003 ETH tramite Relay verso EVM o SOL.",
    level: "principiante",
    category: "task",
    requirementLabel: ">= 0.003 ETH bridge su Relay",
    icon: "🌉",
    order: 30,
  },
  {
    key: "principiante_deposit_aave",
    title: "Lender Starter",
    description: "Deposita almeno 0.003 ETH su Aave (qualsiasi EVM chain).",
    level: "principiante",
    category: "task",
    requirementLabel: ">= 0.003 ETH deposit su Aave",
    icon: "🏦",
    order: 40,
  },
  {
    key: "principiante_level_complete",
    title: "Principiante Completato",
    description: "Completa tutte le missioni Principiante.",
    level: "principiante",
    category: "level",
    requirementLabel: "4/4 missioni completate",
    icon: "⭐",
    order: 50,
  },
  {
    key: "intermedio_aave_borrow",
    title: "Borrow Builder",
    description: "Apri un prestito su Aave da almeno $3.",
    level: "intermedio",
    category: "task",
    requirementLabel: "Borrow Aave >= $3",
    icon: "📉",
    order: 60,
  },
  {
    key: "intermedio_hyperbeat_deposit",
    title: "Hyperbeat Depositor",
    description: "Deposita almeno 0.3 HYPE su Hyperbeat.",
    level: "intermedio",
    category: "task",
    requirementLabel: "Deposit Hyperbeat >= 0.3 HYPE",
    icon: "🎧",
    order: 70,
  },
  {
    key: "intermedio_hyperliquid_unit_deposit",
    title: "Hyperliquid Unit Onboard",
    description: "Deposita almeno $5 in USDC o equivalente via Unit verso Hyperliquid.",
    level: "intermedio",
    category: "task",
    requirementLabel: "Deposit Unit/Hyperliquid >= $5",
    icon: "🧪",
    order: 80,
  },
  {
    key: "intermedio_level_complete",
    title: "Intermedio Completato",
    description: "Completa tutte le missioni Intermedio.",
    level: "intermedio",
    category: "level",
    requirementLabel: "3/3 missioni completate",
    icon: "🥈",
    order: 90,
  },
  {
    key: "avanzato_hyperliquid_trade",
    title: "Trader Hyperliquid",
    description: "Apri un trade su Hyperliquid di almeno $4.",
    level: "avanzato",
    category: "task",
    requirementLabel: "Trade Hyperliquid >= $4",
    icon: "📊",
    order: 100,
  },
  {
    key: "avanzato_pendle_buy",
    title: "Pendle Strategist",
    description: "Compra almeno $5 di YT o PT su Pendle.",
    level: "avanzato",
    category: "task",
    requirementLabel: "Buy YT/PT >= $5",
    icon: "⏳",
    order: 110,
  },
  {
    key: "avanzato_extended_vault_deposit",
    title: "Vault Operator",
    description: "Deposita almeno $5 nella Vault di Extended.",
    level: "avanzato",
    category: "task",
    requirementLabel: "Deposit Extended Vault >= $5",
    icon: "🛡️",
    order: 120,
  },
  {
    key: "avanzato_level_complete",
    title: "Avanzato Completato",
    description: "Completa tutte le missioni Avanzato.",
    level: "avanzato",
    category: "level",
    requirementLabel: "3/3 missioni completate",
    icon: "🥇",
    order: 130,
  },
  {
    key: "globale_gas_1_eth",
    title: "Gas Spender I",
    description: "Spendi almeno 1 ETH di gas cumulativo.",
    level: "globale",
    category: "reputation",
    requirementLabel: "Gas fees >= 1 ETH",
    icon: "⛽",
    order: 140,
  },
  {
    key: "globale_gas_5_eth",
    title: "Gas Spender II",
    description: "Spendi almeno 5 ETH di gas cumulativo.",
    level: "globale",
    category: "reputation",
    requirementLabel: "Gas fees >= 5 ETH",
    icon: "🔥",
    order: 150,
  },
  {
    key: "globale_gas_10_eth",
    title: "Gas Spender III",
    description: "Spendi almeno 10 ETH di gas cumulativo.",
    level: "globale",
    category: "reputation",
    requirementLabel: "Gas fees >= 10 ETH",
    icon: "🚀",
    order: 160,
  },
  {
    key: "globale_uniswap_volume_1k",
    title: "Uniswap Volume I",
    description: "Raggiungi almeno $1k di volume su Uniswap.",
    level: "globale",
    category: "reputation",
    requirementLabel: "Volume Uniswap >= $1k",
    icon: "🦄",
    order: 170,
  },
  {
    key: "globale_uniswap_volume_10k",
    title: "Uniswap Volume II",
    description: "Raggiungi almeno $10k di volume su Uniswap.",
    level: "globale",
    category: "reputation",
    requirementLabel: "Volume Uniswap >= $10k",
    icon: "🦄",
    order: 180,
  },
  {
    key: "globale_uniswap_volume_100k",
    title: "Uniswap Volume III",
    description: "Raggiungi almeno $100k di volume su Uniswap.",
    level: "globale",
    category: "reputation",
    requirementLabel: "Volume Uniswap >= $100k",
    icon: "🦄",
    order: 190,
  },
  {
    key: "globale_uniswap_volume_1m",
    title: "Uniswap Volume IV",
    description: "Raggiungi almeno $1M di volume su Uniswap.",
    level: "globale",
    category: "reputation",
    requirementLabel: "Volume Uniswap >= $1M",
    icon: "💎",
    order: 200,
  },
  {
    key: "globale_uniswap_volume_10m",
    title: "Uniswap Volume V",
    description: "Raggiungi almeno $10M di volume su Uniswap.",
    level: "globale",
    category: "reputation",
    requirementLabel: "Volume Uniswap >= $10M",
    icon: "👑",
    order: 210,
  },
  {
    key: "globale_wallet_age_1y",
    title: "OG Wallet I",
    description: "Wallet attivo da almeno 1 anno.",
    level: "globale",
    category: "reputation",
    requirementLabel: "Età wallet >= 1 anno",
    icon: "🕰️",
    order: 220,
  },
  {
    key: "globale_wallet_age_2y",
    title: "OG Wallet II",
    description: "Wallet attivo da almeno 2 anni.",
    level: "globale",
    category: "reputation",
    requirementLabel: "Età wallet >= 2 anni",
    icon: "🕰️",
    order: 230,
  },
  {
    key: "globale_wallet_age_3y",
    title: "OG Wallet III",
    description: "Wallet attivo da almeno 3 anni.",
    level: "globale",
    category: "reputation",
    requirementLabel: "Età wallet >= 3 anni",
    icon: "🕰️",
    order: 240,
  },
  {
    key: "globale_wallet_age_5y",
    title: "OG Wallet IV",
    description: "Wallet attivo da almeno 5 anni.",
    level: "globale",
    category: "reputation",
    requirementLabel: "Età wallet >= 5 anni",
    icon: "🕰️",
    order: 250,
  },
  {
    key: "globale_wallet_age_8y",
    title: "OG Wallet V",
    description: "Wallet attivo da almeno 8 anni (era Ethereum 2016+).",
    level: "globale",
    category: "reputation",
    requirementLabel: "Età wallet >= 8 anni",
    icon: "🏛️",
    order: 260,
  },
  {
    key: "globale_hyperliquid_airdrop",
    title: "Hyperliquid Airdrop Claimer",
    description: "Wallet che ha ricevuto/claimato l'airdrop Hyperliquid.",
    level: "globale",
    category: "reputation",
    requirementLabel: "Claim/ricezione airdrop Hyperliquid",
    icon: "🪂",
    order: 270,
  },
];

export const LEVELS: LevelDefinition[] = [
  {
    key: "principiante",
    label: "Principiante",
    requiredBadgeKeys: [
      "principiante_receive_eth",
      "principiante_swap_uniswap",
      "principiante_bridge_relay",
      "principiante_deposit_aave",
    ],
    completionBadgeKey: "principiante_level_complete",
  },
  {
    key: "intermedio",
    label: "Intermedio",
    requiredBadgeKeys: [
      "intermedio_aave_borrow",
      "intermedio_hyperbeat_deposit",
      "intermedio_hyperliquid_unit_deposit",
    ],
    completionBadgeKey: "intermedio_level_complete",
  },
  {
    key: "avanzato",
    label: "Avanzato",
    requiredBadgeKeys: [
      "avanzato_hyperliquid_trade",
      "avanzato_pendle_buy",
      "avanzato_extended_vault_deposit",
    ],
    completionBadgeKey: "avanzato_level_complete",
  },
];

export function getBaseBadgeMap(): Map<string, BadgeDefinition> {
  return new Map(BASE_BADGES.map((badge) => [badge.key, badge]));
}

