type SidebarLanguage = "it" | "en";

const BLOCKCHAIN_SIDEBAR_ITEMS_I18N = [
  { labelIt: "Dashboard", labelEn: "Dashboard", href: "/", icon: "📊" },
  { labelIt: "Manuale", labelEn: "Manual", href: "/manuale", icon: "📚" },
  { labelIt: "DeFi", labelEn: "DeFi", href: "/defi", icon: "💹" },
  { labelIt: "Airdrops", labelEn: "Airdrops", href: "/airdrops", icon: "🎁" },
  { labelIt: "Blockchains", labelEn: "Blockchains", href: "/blockchain", icon: "⛓️" },
  { labelIt: "Compra/Vendi Crypto", labelEn: "Buy/Sell Crypto", href: "/compraevendicrypto", icon: "💳" },
  { labelIt: "Portafogli", labelEn: "Wallets", href: "/wallet", icon: "👛" },
  { labelIt: "Strumenti Utili", labelEn: "Useful Tools", href: "/strumentiutili", icon: "🔧" },
  { labelIt: "Memecoins", labelEn: "Memecoins", href: "/memecoins", icon: "🪙" },
  { labelIt: "NFTs", labelEn: "NFTs", href: "/nft", icon: "🖼️" },
  { labelIt: "Giochi", labelEn: "Games", href: "/giochi", icon: "🎮" },
  { labelIt: "Mercati di Predizione", labelEn: "Prediction Markets", href: "/giochi/polymarket", icon: "📈" },
  { labelIt: "Eventi Storici", labelEn: "Historical Events", href: "/eventi-storici", icon: "📅" },
  { labelIt: "Mappa Ecosistema", labelEn: "Ecosystem Map", href: "/esplora-app", icon: "🌐" },
  { labelIt: "Notizie", labelEn: "News", href: "/news", icon: "📰" },
  { labelIt: "Segnalibri", labelEn: "Bookmarks", href: "/segnalibri", icon: "🔖" },
  { labelIt: "Leaderboard", labelEn: "Leaderboard", href: "/leaderboards/global", icon: "🏆" },
] as const;

export function getBlockchainSidebarItems(language: SidebarLanguage) {
  return BLOCKCHAIN_SIDEBAR_ITEMS_I18N.map((item) => ({
    label: language === "en" ? item.labelEn : item.labelIt,
    href: item.href,
    icon: item.icon,
  }));
}

export const BLOCKCHAIN_SIDEBAR_ITEMS = getBlockchainSidebarItems("it");
