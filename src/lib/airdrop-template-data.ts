import { getProjectPageData, type ProjectPageData } from "@/lib/project-page-data";

const AIRDROP_SLUG_ALIASES: Record<string, string> = {
  "polygon-zkevm": "polygon_zkevm",
};

type AirdropSeed = {
  name: string;
  description: string;
  appUrl: string;
  websiteUrl: string;
  twitterUrl: string;
  tokenSymbol?: string;
};

const AIRDROP_SEEDS: Record<string, AirdropSeed> = {
  rainbow: {
    name: "Rainbow",
    description: "Wallet mobile-first con UX semplice per gestire asset e interagire con applicazioni Web3.",
    appUrl: "https://rainbow.me",
    websiteUrl: "https://rainbow.me",
    twitterUrl: "https://x.com/rainbowdotme",
    tokenSymbol: "—",
  },
  metamask: {
    name: "MetaMask",
    description: "Wallet non-custodial EVM per onboarding, firma transazioni e accesso alle dApp.",
    appUrl: "https://metamask.io",
    websiteUrl: "https://metamask.io",
    twitterUrl: "https://x.com/metamask",
    tokenSymbol: "—",
  },
  zerion: {
    name: "Zerion",
    description: "Wallet e portfolio tracker per gestire posizioni DeFi e NFT in un'unica interfaccia.",
    appUrl: "https://zerion.io",
    websiteUrl: "https://zerion.io",
    twitterUrl: "https://x.com/zerion",
    tokenSymbol: "—",
  },
  debank: {
    name: "DeBank",
    description: "Dashboard on-chain per monitorare wallet, posizioni DeFi e attivita multichain.",
    appUrl: "https://debank.com",
    websiteUrl: "https://debank.com",
    twitterUrl: "https://x.com/DeBankDeFi",
    tokenSymbol: "DBANK",
  },
  zapper: {
    name: "Zapper",
    description: "Portfolio intelligence per tracciare asset, smart money e trend di mercato on-chain.",
    appUrl: "https://zapper.xyz",
    websiteUrl: "https://zapper.xyz",
    twitterUrl: "https://x.com/zapper_fi",
    tokenSymbol: "—",
  },
  snapshot: {
    name: "Snapshot",
    description: "Piattaforma di governance off-chain usata da DAO e protocolli per votazioni trasparenti.",
    appUrl: "https://snapshot.org",
    websiteUrl: "https://snapshot.org",
    twitterUrl: "https://x.com/SnapshotLabs",
    tokenSymbol: "—",
  },
  gitcoin: {
    name: "Gitcoin",
    description: "Ecosistema grants e funding per progetti open-source e public goods del Web3.",
    appUrl: "https://gitcoin.co",
    websiteUrl: "https://gitcoin.co",
    twitterUrl: "https://x.com/gitcoin",
    tokenSymbol: "GTC",
  },
  moonwell: {
    name: "Moonwell",
    description: "Protocollo di lending su Base e Optimism per prestiti e rendimenti su collateral on-chain.",
    appUrl: "https://moonwell.fi",
    websiteUrl: "https://moonwell.fi",
    twitterUrl: "https://x.com/MoonwellDeFi",
    tokenSymbol: "WELL",
  },
  marginfi: {
    name: "Marginfi",
    description: "Money market su Solana per lending e borrowing con gestione dinamica del rischio.",
    appUrl: "https://marginfi.com",
    websiteUrl: "https://marginfi.com",
    twitterUrl: "https://x.com/marginfi",
    tokenSymbol: "—",
  },
  phantom: {
    name: "Phantom",
    description: "Wallet user-friendly nativo Solana, oggi multichain, per pagamenti e dApp.",
    appUrl: "https://phantom.app",
    websiteUrl: "https://phantom.app",
    twitterUrl: "https://x.com/phantom",
    tokenSymbol: "—",
  },
  getgrass: {
    name: "GetGrass",
    description: "Network che incentiva la condivisione di banda con ricompense e potenziale programma points.",
    appUrl: "https://www.getgrass.io",
    websiteUrl: "https://www.getgrass.io",
    twitterUrl: "https://x.com/getgrass_io",
    tokenSymbol: "GRASS",
  },
  polymarket: {
    name: "Polymarket",
    description: "Prediction market on-chain per negoziare probabilita su eventi real-world.",
    appUrl: "https://polymarket.com",
    websiteUrl: "https://polymarket.com",
    twitterUrl: "https://x.com/Polymarket",
    tokenSymbol: "—",
  },
  opensea: {
    name: "OpenSea",
    description: "Marketplace NFT per comprare, vendere e monitorare collezioni su diverse chain.",
    appUrl: "https://opensea.io",
    websiteUrl: "https://opensea.io",
    twitterUrl: "https://x.com/opensea",
    tokenSymbol: "—",
  },
  "nifty-island": {
    name: "Nifty Island",
    description: "Piattaforma gaming/social con economia creator-first e integrazione NFT.",
    appUrl: "https://www.niftyisland.com",
    websiteUrl: "https://www.niftyisland.com",
    twitterUrl: "https://x.com/Nifty_Island",
    tokenSymbol: "ISLAND",
  },
  "bong-bears": {
    name: "Bong Bears",
    description: "Collezione NFT community-driven con focus su cultura e attivita native Web3.",
    appUrl: "https://opensea.io/collection/bong-bear",
    websiteUrl: "https://opensea.io/collection/bong-bear",
    twitterUrl: "https://x.com/BongBearsNFT",
    tokenSymbol: "—",
  },
  "relay-bridge": {
    name: "Relay Bridge",
    description: "Bridge e routing cross-chain per trasferimenti rapidi tra ecosistemi.",
    appUrl: "https://relay.link",
    websiteUrl: "https://relay.link",
    twitterUrl: "https://x.com/relayprotocol",
    tokenSymbol: "—",
  },
  propellerswap: {
    name: "PropellerSwap",
    description: "Tool di swap orientato ad execution veloce e UX semplificata.",
    appUrl: "https://app.propellerswap.xyz",
    websiteUrl: "https://app.propellerswap.xyz",
    twitterUrl: "https://x.com/propellerswap",
    tokenSymbol: "—",
  },
  warpcast: {
    name: "Warpcast",
    description: "Client social Farcaster per discovery, contenuti e identita nel social graph Web3.",
    appUrl: "https://warpcast.com",
    websiteUrl: "https://warpcast.com",
    twitterUrl: "https://x.com/warpcast_",
    tokenSymbol: "—",
  },
  beramarket: {
    name: "Beramarket",
    description: "Hub ecosistema Berachain per monitoraggio opportunita e protocolli emergenti.",
    appUrl: "https://www.berachain.com",
    websiteUrl: "https://www.berachain.com",
    twitterUrl: "https://x.com/berachain",
    tokenSymbol: "BERA",
  },
};

function toTitleFromSlug(slug: string): string {
  return slug
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildGenericAirdropData(slug: string): Omit<ProjectPageData, "logo"> {
  const name = toTitleFromSlug(slug);
  const appUrl = `/airdrops/${slug}`;
  return {
    slug,
    name,
    tags: [{ label: "Airdrop" }, { label: "Campaign" }, { label: "Airdrop Potential", airdrop: true }],
    appUrl,
    guideUrl: "/manuale",
    tokenSymbol: "—",
    coinId: null,
    description: `${name} e un progetto dell'ecosistema Web3 con possibili campagne points e iniziative community.`,
    overviewTags: [{ label: "Web3" }, { label: "On-chain" }, { label: "Community" }, { label: "DYOR" }],
    featureCards: [
      { icon: "lightning", title: "Inizia Subito", description: `Prova ${name} con piccoli importi e test graduali.` },
      { icon: "droplet", title: "Attivita On-chain", description: "Mantieni operativita costante e monitorabile nel tempo." },
      { icon: "cap", title: "Guida Base", description: "Rivedi best practice su wallet, sicurezza e execution.", href: "/manuale" },
      { icon: "warning", title: "Rischi Operativi", description: "Controlla URL, permessi wallet e possibili errori manuali." },
      { icon: "gift", title: "Airdrop Potential", description: "Monitora task, points e snapshot ufficiali del progetto." },
    ],
    howToSteps: [
      { icon: "1", title: "Setup Wallet", description: "Prepara wallet e rete corretta prima di interagire." },
      { icon: "2", title: "Esegui Test", description: "Fai una transazione test con importo ridotto." },
      { icon: "3", title: "Completa Task", description: "Mantieni attivita regolare e on-chain verificabile." },
      { icon: "4", title: "Monitora Annunci", description: "Segui canali ufficiali per update e snapshot." },
    ],
    riskCards: [
      { title: "Phishing Risk", description: "Interagisci solo da link ufficiali e verificati." },
      { title: "Operational Errors", description: "Verifica rete, token e importi prima di confermare." },
      { title: "Volatilita", description: "Evita size eccessive su asset ad alta variabilita." },
      { title: "Assunzioni Airdrop", description: "I reward non sono garantiti: mantieni aspettative realistiche." },
    ],
    usefulLinks: [{ label: "Pagina Airdrops", href: "/airdrops" }],
    contentItems: [
      { type: "video", title: `${name}: overview e setup`, source: "YouTube", skillLevel: "Beginner", embedId: "Afi5cf6hya8" },
      { type: "article", title: `${name}: checklist operativa`, source: "ImparoDeFi", href: "/manuale" },
    ],
  };
}

function buildFromSeed(slug: string, seed: AirdropSeed): Omit<ProjectPageData, "logo"> {
  return {
    slug,
    name: seed.name,
    tags: [{ label: "Airdrop" }, { label: "Campaign" }, { label: "Airdrop Potential", airdrop: true }],
    appUrl: seed.appUrl,
    guideUrl: "/manuale",
    tokenSymbol: seed.tokenSymbol ?? "—",
    coinId: null,
    description: seed.description,
    overviewTags: [{ label: "Airdrop" }, { label: "On-chain" }, { label: "Community" }, { label: "DYOR" }],
    featureCards: [
      { icon: "lightning", title: "Setup Iniziale", description: `Configura ${seed.name} e completa i task base.` },
      { icon: "droplet", title: "Attivita Consistente", description: "Mantieni frequenza nelle interazioni richieste." },
      { icon: "cap", title: "Guida Operativa", description: "Segui il manuale per ridurre errori comuni.", href: "/manuale" },
      { icon: "warning", title: "Rischi", description: "Attenzione a phishing, fake task e URL non ufficiali." },
      { icon: "gift", title: "Reward Tracking", description: "Monitora points, badge e snapshot ufficiali." },
    ],
    howToSteps: [
      { icon: "1", title: "Accedi alla piattaforma", description: "Connetti wallet/account dal sito ufficiale." },
      { icon: "2", title: "Completa task base", description: "Esegui attivita iniziali e verifica lo storico." },
      { icon: "3", title: "Mantieni attivita", description: "Ripeti interazioni utili con cadenza regolare." },
      { icon: "4", title: "Controlla annunci", description: "Segui update ufficiali per eligibility." },
    ],
    riskCards: [
      { title: "Fake Links", description: "Usa solo dominio ufficiale e canali verificati." },
      { title: "Wallet Permissions", description: "Revoca permessi non necessari periodicamente." },
      { title: "Execution Risk", description: "Parti con importi piccoli, poi scala gradualmente." },
      { title: "Reward Uncertainty", description: "I potenziali reward non sono garantiti." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: seed.websiteUrl },
      { label: "Twitter / X", href: seed.twitterUrl },
    ],
    contentItems: [
      { type: "video", title: `${seed.name}: setup rapido`, source: "YouTube", skillLevel: "Beginner", embedId: "Afi5cf6hya8" },
      { type: "article", title: `${seed.name}: checklist`, source: "ImparoDeFi", href: "/manuale" },
    ],
  };
}

export function getAirdropTemplateData(slugInput: string): Omit<ProjectPageData, "logo"> {
  const slug = slugInput.toLowerCase().trim();
  const aliased = AIRDROP_SLUG_ALIASES[slug] ?? slug;
  const fromProjectData = getProjectPageData(aliased);
  if (fromProjectData) {
    const hasAirdropTag = fromProjectData.tags.some((tag) => tag.airdrop || tag.label.toLowerCase().includes("airdrop"));
    return {
      ...fromProjectData,
      tags: hasAirdropTag
        ? fromProjectData.tags
        : [...fromProjectData.tags, { label: "Airdrop Potential", airdrop: true }],
      guideUrl: fromProjectData.guideUrl ?? "/manuale",
    };
  }
  const seed = AIRDROP_SEEDS[slug];
  if (seed) return buildFromSeed(slug, seed);
  return buildGenericAirdropData(slug);
}

