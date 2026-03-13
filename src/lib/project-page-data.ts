import type { StaticImageData } from "next/image";

export type ProjectPageData = {
  slug: string;
  name: string;
  logo: StaticImageData;
  tags: { label: string; airdrop?: boolean }[];
  appUrl: string;
  tradingUrl?: string;
  guideUrl?: string;
  tokenSymbol: string;
  /** Coingecko id for price API, or null for no live price */
  coinId?: string | null;
  description: string;
  overviewTags?: { label: string; icon?: "shield" | "chain" | "gas" | "rocket" }[];
  featureCards: {
    icon: "lightning" | "droplet" | "cap" | "warning" | "gift";
    title: string;
    description: string;
    href?: string;
  }[];
  howToSteps: { icon: string; title: string; description: string; href?: string }[];
  riskCards: { title: string; description: string }[];
  usefulLinks: { label: string; href: string; icon?: "globe" | "twitter" | "chart" | "doc" }[];
  contentItems: {
    type: "video" | "article";
    title: string;
    tags?: string[];
    source?: string;
    skillLevel?: string;
    href?: string;
    embedId?: string;
  }[];
};

type DefiSeed = {
  slug: string;
  name: string;
  category: "DEX" | "Lending" | "Yield" | "Bridge" | "Stablecoins";
  tokenSymbol: string;
  description: string;
  appUrl: string;
  websiteUrl: string;
  twitterUrl: string;
  coinId?: string | null;
  docsUrl?: string;
  guideUrl?: string;
  airdrop?: boolean;
};

type BlockchainSeed = {
  slug: string;
  name: string;
  type: "Layer 1" | "Layer 2";
  tokenSymbol: string;
  description: string;
  appUrl: string;
  websiteUrl: string;
  twitterUrl: string;
  coinId?: string | null;
  docsUrl?: string;
  airdrop?: boolean;
};

function buildDefiData(seed: DefiSeed): Omit<ProjectPageData, "slug" | "logo"> {
  const tokenLink =
    seed.coinId && seed.tokenSymbol !== "—"
      ? { label: `Token ${seed.tokenSymbol}`, href: `https://www.coingecko.com/en/coins/${seed.coinId}` }
      : null;
  return {
    name: seed.name,
    tags: [
      { label: seed.category },
      ...(seed.tokenSymbol !== "—" ? [{ label: "Token" }] : [{ label: "No Token" }]),
      ...(seed.airdrop ? [{ label: "Airdrop Potential", airdrop: true }] : []),
    ],
    appUrl: seed.appUrl,
    guideUrl: seed.guideUrl,
    tokenSymbol: seed.tokenSymbol,
    coinId: seed.coinId ?? null,
    description: seed.description,
    overviewTags: [
      { label: "Non-custodial" },
      { label: "On-chain" },
      { label: "Web3" },
      { label: "DYOR" },
    ],
    featureCards: [
      {
        icon: "lightning",
        title: "Inizia Subito",
        description: `Accedi a ${seed.name} e prova le funzionalita principali in modo graduale.`,
      },
      {
        icon: "droplet",
        title: "Gestione Liquidita",
        description: "Valuta costi, fee, slippage e profondita del mercato prima di operare.",
      },
      {
        icon: "cap",
        title: "Guida Base",
        description: `Impara i concetti chiave per usare ${seed.name} in modo consapevole.`,
        href: "/manuale",
      },
      {
        icon: "warning",
        title: "Rischi Operativi",
        description: "Attenzione a smart contract risk, volatilita e possibili errori di execution.",
      },
      {
        icon: "gift",
        title: "Opportunita",
        description: seed.airdrop
          ? "Monitora campagne, punti e potenziali reward."
          : "Esplora nuove opportunita in base al tuo profilo di rischio.",
      },
    ],
    howToSteps: [
      {
        icon: "1",
        title: "Collega Wallet",
        description: "Connetti un wallet compatibile alla piattaforma.",
      },
      {
        icon: "2",
        title: "Deposita Fondi",
        description: "Trasferisci l'asset che vuoi usare per operare.",
      },
      {
        icon: "3",
        title: "Esegui Operazione",
        description: "Completa swap/trade/lend con importi ridotti per iniziare.",
      },
      {
        icon: "4",
        title: "Monitora e Gestisci",
        description: "Controlla performance, fee e rischio nel tempo.",
      },
    ],
    riskCards: [
      { title: "Smart Contract Risk", description: "Bug o exploit possono causare perdite." },
      { title: "Volatilita", description: "Prezzi e rendimenti possono cambiare rapidamente." },
      { title: "Liquidity Risk", description: "Spread/slippage elevati su coppie poco liquide." },
      { title: "Operational Errors", description: "Verifica sempre rete, token e indirizzi prima di confermare." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: seed.websiteUrl },
      { label: "Twitter / X", href: seed.twitterUrl },
      ...(tokenLink ? [tokenLink] : []),
      ...(seed.docsUrl ? [{ label: "Docs", href: seed.docsUrl }] : []),
    ],
    contentItems: [
      {
        type: "video",
        title: `${seed.name}: guida introduttiva`,
        source: "YouTube",
        skillLevel: "Beginner",
        embedId: "Afi5cf6hya8",
      },
      {
        type: "video",
        title: `${seed.name}: strategie e rischi`,
        source: "YouTube",
        skillLevel: "Intermediate",
        embedId: "L-SCdSfGztA",
      },
      {
        type: "article",
        title: `${seed.name} - risorse ufficiali`,
        source: "ImparoDeFi",
        href: seed.websiteUrl,
      },
    ],
  };
}

function buildBlockchainData(seed: BlockchainSeed): Omit<ProjectPageData, "slug" | "logo"> {
  const tokenLink =
    seed.coinId && seed.tokenSymbol !== "—"
      ? { label: `Token ${seed.tokenSymbol}`, href: `https://www.coingecko.com/en/coins/${seed.coinId}` }
      : null;
  return {
    name: seed.name,
    tags: [
      { label: "Blockchain" },
      { label: seed.type },
      ...(seed.tokenSymbol !== "—" ? [{ label: "Token" }] : [{ label: "Ecosistema" }]),
      ...(seed.airdrop ? [{ label: "Airdrop Potential", airdrop: true }] : []),
    ],
    appUrl: seed.appUrl,
    guideUrl: "/manuale",
    tokenSymbol: seed.tokenSymbol,
    coinId: seed.coinId ?? null,
    description: seed.description,
    overviewTags: [
      { label: seed.type },
      { label: "Smart Contracts" },
      { label: "Ecosystem" },
      { label: "Security" },
    ],
    featureCards: [
      {
        icon: "lightning",
        title: "Network Overview",
        description: `Scopri le caratteristiche principali di ${seed.name} e il suo ruolo nel Web3.`,
      },
      {
        icon: "droplet",
        title: "Ecosistema dApp",
        description: "Analizza i principali use case: DeFi, pagamenti, gaming e infrastruttura.",
      },
      {
        icon: "cap",
        title: "Guida Base",
        description: "Impara wallet, sicurezza, fee e operativita prima di iniziare.",
        href: "/manuale",
      },
      {
        icon: "warning",
        title: "Rischi Operativi",
        description: "Valuta rischi di rete, bridge, smart contract e volatilita del token.",
      },
      {
        icon: "gift",
        title: seed.airdrop ? "Airdrop Potential" : "Opportunita",
        description: seed.airdrop
          ? "Monitora campagne, task e possibili reward dell'ecosistema."
          : "Approfondisci opportunita e trend emergenti dell'ecosistema.",
      },
    ],
    howToSteps: [
      {
        icon: "1",
        title: "Scegli Wallet e Rete",
        description: "Configura un wallet compatibile e verifica sempre la rete prima di inviare fondi.",
      },
      {
        icon: "2",
        title: "Deposita una Piccola Somma",
        description: "Inizia con importi contenuti per testare transfer, fee e conferme.",
      },
      {
        icon: "3",
        title: "Esplora dApp Affidabili",
        description: "Interagisci con protocolli noti e controlla URL, audit e community.",
      },
      {
        icon: "4",
        title: "Gestisci Sicurezza",
        description: "Monitora autorizzazioni, phishing e rischio controparte in ogni operazione.",
      },
    ],
    riskCards: [
      { title: "Security Risk", description: "Bug, exploit o problemi di smart contract possono causare perdite." },
      { title: "Bridge Risk", description: "Trasferimenti cross-chain introducono rischio aggiuntivo." },
      { title: "Token Volatility", description: "I prezzi possono variare rapidamente in entrambe le direzioni." },
      { title: "Operational Errors", description: "Una rete o address sbagliato puo compromettere i fondi." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: seed.websiteUrl },
      { label: "Twitter / X", href: seed.twitterUrl },
      ...(tokenLink ? [tokenLink] : []),
      ...(seed.docsUrl ? [{ label: "Docs", href: seed.docsUrl }] : []),
    ],
    contentItems: [
      {
        type: "video",
        title: `${seed.name}: introduzione e casi d'uso`,
        source: "YouTube",
        skillLevel: "Beginner",
        embedId: "K4TOrB7at0Y",
      },
      {
        type: "video",
        title: `${seed.name}: rischi, fee e operativita`,
        source: "YouTube",
        skillLevel: "Intermediate",
        embedId: "1jzFNzUgZ6Q",
      },
      {
        type: "article",
        title: `${seed.name} - documentazione ufficiale`,
        source: seed.name,
        href: seed.docsUrl || seed.websiteUrl,
      },
    ],
  };
}

/** Default data for project pages (no logo; add in page). Key = slug (e.g. hyperliquid). */
export const PROJECT_PAGE_DATA: Record<string, Omit<ProjectPageData, "slug" | "logo">> = {
  hyperliquid: buildDefiData({
    slug: "hyperliquid",
    name: "Hyperliquid",
    category: "DEX",
    tokenSymbol: "HYPE",
    description:
      "Hyperliquid e un DEX focalizzato sui perpetual futures, costruito su una propria L1 per trading veloce, non-custodial e trasparente.",
    appUrl: "https://app.hyperliquid.xyz/",
    websiteUrl: "https://hyperliquid.xyz",
    twitterUrl: "https://x.com/HyperliquidX",
    coinId: "hyperliquid",
    docsUrl: "https://hyperliquid.gitbook.io/",
    guideUrl: "/defi/hyperliquid/guida-rapida",
    airdrop: true,
  }),
  uniswap: buildDefiData({
    slug: "uniswap",
    name: "Uniswap",
    category: "DEX",
    tokenSymbol: "UNI",
    description: "DEX leader su Ethereum e L2 per swap e liquidity.",
    appUrl: "https://app.uniswap.org",
    websiteUrl: "https://uniswap.org",
    twitterUrl: "https://x.com/Uniswap",
    coinId: "uniswap",
    docsUrl: "https://docs.uniswap.org",
  }),
  aave: buildDefiData({
    slug: "aave",
    name: "Aave",
    category: "Lending",
    tokenSymbol: "AAVE",
    description: "Prestiti e borrowing decentralizzati su piu reti.",
    appUrl: "https://app.aave.com",
    websiteUrl: "https://aave.com",
    twitterUrl: "https://x.com/aave",
    coinId: "aave",
    docsUrl: "https://docs.aave.com",
  }),
  curve: buildDefiData({
    slug: "curve",
    name: "Curve",
    category: "DEX",
    tokenSymbol: "CRV",
    description: "DEX specializzato in stablecoin e curve di liquidita.",
    appUrl: "https://curve.fi",
    websiteUrl: "https://curve.fi",
    twitterUrl: "https://x.com/CurveFinance",
    coinId: "curve-dao-token",
    docsUrl: "https://resources.curve.fi",
  }),
  compound: buildDefiData({
    slug: "compound",
    name: "Compound",
    category: "Lending",
    tokenSymbol: "COMP",
    description: "Lending e borrowing con algoritmi sui tassi.",
    appUrl: "https://app.compound.finance",
    websiteUrl: "https://compound.finance",
    twitterUrl: "https://x.com/compoundfinance",
    coinId: "compound-governance-token",
    docsUrl: "https://docs.compound.finance",
  }),
  jupiter: buildDefiData({
    slug: "jupiter",
    name: "Jupiter",
    category: "DEX",
    tokenSymbol: "JUP",
    description: "Aggregatore DEX su Solana per swap e route ottimali.",
    appUrl: "https://jup.ag",
    websiteUrl: "https://jup.ag",
    twitterUrl: "https://x.com/JupiterExchange",
    coinId: "jupiter-exchange-solana",
    docsUrl: "https://station.jup.ag/docs",
  }),
  raydium: buildDefiData({
    slug: "raydium",
    name: "Raydium",
    category: "DEX",
    tokenSymbol: "RAY",
    description: "DEX e AMM su Solana con pool concentrati.",
    appUrl: "https://raydium.io",
    websiteUrl: "https://raydium.io",
    twitterUrl: "https://x.com/RaydiumProtocol",
    coinId: "raydium",
    docsUrl: "https://docs.raydium.io",
  }),
  balancer: buildDefiData({
    slug: "balancer",
    name: "Balancer",
    category: "DEX",
    tokenSymbol: "BAL",
    description: "AMM con pool configurabili e pesi dinamici.",
    appUrl: "https://balancer.fi",
    websiteUrl: "https://balancer.fi",
    twitterUrl: "https://x.com/Balancer",
    coinId: "balancer",
    docsUrl: "https://docs.balancer.fi",
  }),
  syncswap: buildDefiData({
    slug: "syncswap",
    name: "SyncSwap",
    category: "DEX",
    tokenSymbol: "SYNCSWAP",
    description: "DEX nativo su zkSync, Linea e Scroll.",
    appUrl: "https://syncswap.xyz",
    websiteUrl: "https://syncswap.xyz",
    twitterUrl: "https://x.com/syncswap",
    coinId: null,
    docsUrl: "https://docs.syncswap.xyz",
  }),
  yearn: buildDefiData({
    slug: "yearn",
    name: "Yearn Finance",
    category: "Yield",
    tokenSymbol: "YFI",
    description: "Aggregatore di yield e strategie automatizzate.",
    appUrl: "https://yearn.fi",
    websiteUrl: "https://yearn.fi",
    twitterUrl: "https://x.com/yearnfi",
    coinId: "yearn-finance",
    docsUrl: "https://docs.yearn.fi",
  }),
  lido: buildDefiData({
    slug: "lido",
    name: "Lido Finance",
    category: "Yield",
    tokenSymbol: "LDO",
    description: "Liquid staking per ETH e SOL con token staked.",
    appUrl: "https://stake.lido.fi",
    websiteUrl: "https://lido.fi",
    twitterUrl: "https://x.com/LidoFinance",
    coinId: "lido-dao",
    docsUrl: "https://docs.lido.fi",
  }),
  layerzero: buildDefiData({
    slug: "layerzero",
    name: "LayerZero",
    category: "Bridge",
    tokenSymbol: "ZRO",
    description: "Protocollo di interoperabilita cross-chain.",
    appUrl: "https://layerzero.network",
    websiteUrl: "https://layerzero.network",
    twitterUrl: "https://x.com/LayerZero_Labs",
    coinId: "layer-zero",
    docsUrl: "https://docs.layerzero.network",
  }),
  stargate: buildDefiData({
    slug: "stargate",
    name: "Stargate",
    category: "Bridge",
    tokenSymbol: "STG",
    description: "Bridge e trasferimenti cross-chain con LayerZero.",
    appUrl: "https://stargate.finance",
    websiteUrl: "https://stargate.finance",
    twitterUrl: "https://x.com/StargateFinance",
    coinId: "stargate-finance",
    docsUrl: "https://docs.stargate.finance",
  }),
  debridge: buildDefiData({
    slug: "debridge",
    name: "deBridge",
    category: "Bridge",
    tokenSymbol: "DBR",
    description: "Bridge e messaggeria cross-chain per asset e dati.",
    appUrl: "https://app.debridge.finance",
    websiteUrl: "https://debridge.finance",
    twitterUrl: "https://x.com/deBridgeFinance",
    coinId: "debridge",
    docsUrl: "https://docs.debridge.finance",
  }),
  jumper: buildDefiData({
    slug: "jumper",
    name: "Jumper",
    category: "Bridge",
    tokenSymbol: "—",
    description: "Swap e bridge multi-chain in un'unica interfaccia.",
    appUrl: "https://jumper.exchange",
    websiteUrl: "https://jumper.exchange",
    twitterUrl: "https://x.com/JumperExchange",
    coinId: null,
    docsUrl: "https://docs.li.fi",
    airdrop: true,
  }),
  camelot: buildDefiData({
    slug: "camelot",
    name: "Camelot",
    category: "DEX",
    tokenSymbol: "GRAIL",
    description: "DEX su Arbitrum con incentivi e pool dinamici.",
    appUrl: "https://app.camelot.exchange",
    websiteUrl: "https://camelot.exchange",
    twitterUrl: "https://x.com/CamelotDEX",
    coinId: "camelot-token",
    docsUrl: "https://docs.camelot.exchange",
  }),
  orbiter: buildDefiData({
    slug: "orbiter",
    name: "Orbiter Finance",
    category: "Bridge",
    tokenSymbol: "—",
    description: "Bridge veloce tra Ethereum, L2 e rollup.",
    appUrl: "https://www.orbiter.finance",
    websiteUrl: "https://www.orbiter.finance",
    twitterUrl: "https://x.com/Orbiter_Finance",
    coinId: null,
    docsUrl: "https://docs.orbiter.finance",
  }),
  llamaswap: buildDefiData({
    slug: "llamaswap",
    name: "LlamaSwap",
    category: "DEX",
    tokenSymbol: "—",
    description: "Aggregatore swap di DeFiLlama per trovare route efficienti tra DEX e reti diverse.",
    appUrl: "https://swap.defillama.com/?chain=ethereum&from=0x0000000000000000000000000000000000000000&tab=swap",
    websiteUrl: "https://defillama.com",
    twitterUrl: "https://x.com/DefiLlama",
    coinId: null,
    docsUrl: "https://docs.llama.fi",
    guideUrl: "/manuale#analisi",
  }),
  traderjoe: buildDefiData({
    slug: "traderjoe",
    name: "Trader Joe",
    category: "DEX",
    tokenSymbol: "JOE",
    description: "DEX multi-chain con AMM, lending e trading tools.",
    appUrl: "https://www.traderjoexyz.com",
    websiteUrl: "https://www.traderjoexyz.com",
    twitterUrl: "https://x.com/traderjoe_xyz",
    coinId: "joe",
    docsUrl: "https://docs.traderjoexyz.com",
  }),
  usdc: {
    name: "USDC",
    tags: [{ label: "Stablecoins" }, { label: "Dollar-Pegged" }, { label: "Payments" }, { label: "Treasury" }],
    appUrl: "https://www.circle.com/usdc",
    guideUrl: "/manuale#stablecoin",
    tokenSymbol: "USDC",
    coinId: "usd-coin",
    description:
      "USDC e una stablecoin collateralizzata in fiat emessa da Circle, progettata per pagamenti, trasferimenti e operativita DeFi con elevata liquidita.",
    overviewTags: [{ label: "Stablecoin" }, { label: "Fiat-backed" }, { label: "Multi-chain" }, { label: "Low volatility" }],
    featureCards: [
      {
        icon: "lightning",
        title: "Use case principale",
        description: "Ponte operativo tra fiat e DeFi per pagamenti, settlement e gestione della liquidita.",
      },
      {
        icon: "droplet",
        title: "Liquidita e integrazione",
        description: "Integrata in exchange, wallet e protocolli lending/DEX su piu reti.",
      },
      {
        icon: "cap",
        title: "Come iniziare",
        description: "Prima di trasferire, verifica chain, network fee e contract address corretto.",
        href: "/manuale#stablecoin",
      },
      {
        icon: "warning",
        title: "Rischi specifici",
        description: "Rischio controparte emittente, rischio regolatorio e mismatch di rete in trasferimento.",
      },
      {
        icon: "gift",
        title: "Strategia base",
        description: "Usala come riserva di stabilita per ridurre volatilita del portafoglio operativo.",
      },
    ],
    howToSteps: [
      {
        icon: "1",
        title: "Scegli il network",
        description: "Decidi la rete (Ethereum, Base, Arbitrum, Solana, ecc.) in base a costi e compatibilita.",
      },
      {
        icon: "2",
        title: "Acquista o converti",
        description: "Ottieni USDC da CEX, on-ramp o swap su DEX affidabili.",
      },
      {
        icon: "3",
        title: "Trasferisci in sicurezza",
        description: "Esegui un test con importo ridotto e conferma indirizzo + rete prima della size piena.",
      },
      {
        icon: "4",
        title: "Usa e monitora",
        description: "Impiega USDC per pagamenti, collateral o parcheggio liquidita monitorando sempre il peg.",
      },
    ],
    riskCards: [
      { title: "Issuer / Counterparty Risk", description: "La fiducia nel peg dipende anche dall'emittente e dalle riserve." },
      { title: "Regulatory Risk", description: "Normative e restrizioni possono impattare accesso e utilizzo." },
      { title: "Network Risk", description: "Inviare sulla rete sbagliata puo causare perdita dei fondi." },
      { title: "Operational Risk", description: "Approval e firme non verificate possono esporre il wallet a drain." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: "https://www.circle.com/usdc" },
      { label: "Twitter / X", href: "https://x.com/circle" },
      { label: "Token USDC", href: "https://www.coingecko.com/en/coins/usd-coin" },
      { label: "Docs", href: "https://developers.circle.com/stablecoins/docs/usdc-on-main-networks" },
    ],
    contentItems: [
      {
        type: "article",
        title: "USDC su reti principali: guida operativa",
        source: "Circle",
        href: "https://developers.circle.com/stablecoins/docs/usdc-on-main-networks",
      },
      {
        type: "article",
        title: "USDC - pagina CoinGecko",
        source: "CoinGecko",
        href: "https://www.coingecko.com/en/coins/usd-coin",
      },
      {
        type: "video",
        title: "Stablecoin basics: USDC in pratica",
        source: "YouTube",
        skillLevel: "Beginner",
        embedId: "K4TOrB7at0Y",
      },
    ],
  },
  usdt: {
    name: "USDT",
    tags: [{ label: "Stablecoins" }, { label: "Dollar-Pegged" }, { label: "Liquidity" }, { label: "Cross-chain" }],
    appUrl: "https://tether.to/",
    guideUrl: "/manuale#stablecoin",
    tokenSymbol: "USDT",
    coinId: "tether",
    description:
      "USDT e una stablecoin ancorata al dollaro emessa da Tether, tra le piu usate per trading, trasferimenti rapidi e liquidita globale in ambito crypto.",
    overviewTags: [{ label: "Stablecoin" }, { label: "High liquidity" }, { label: "Trading rails" }, { label: "Global use" }],
    featureCards: [
      {
        icon: "lightning",
        title: "Ruolo nel mercato",
        description: "Asset di riferimento per molte coppie di trading su CEX e DEX.",
      },
      {
        icon: "droplet",
        title: "Liquidita profonda",
        description: "Ampia presenza su exchange centralizzati e catene multiple per settlement veloce.",
      },
      {
        icon: "cap",
        title: "Operativita consigliata",
        description: "Controlla sempre chain e format dell'indirizzo prima di inviare.",
        href: "/manuale#stablecoin",
      },
      {
        icon: "warning",
        title: "Rischi specifici",
        description: "Rischio emittente, rischio regolatorio e rischio di errore network/token.",
      },
      {
        icon: "gift",
        title: "Uso strategico",
        description: "Utile come collateral e parcheggio tattico durante fasi di alta volatilita.",
      },
    ],
    howToSteps: [
      {
        icon: "1",
        title: "Identifica il token giusto",
        description: "USDT esiste su molte reti: verifica chain, ticker e contract esatto.",
      },
      {
        icon: "2",
        title: "Acquista o swappa",
        description: "Acquista su CEX affidabile o converti da altri asset tramite DEX con buona liquidita.",
      },
      {
        icon: "3",
        title: "Trasferisci con test",
        description: "Invia prima una test transaction e conferma ricezione prima del trasferimento principale.",
      },
      {
        icon: "4",
        title: "Gestisci rischio operativo",
        description: "Controlla allowance attive, phishing e siti clone prima di ogni firma.",
      },
    ],
    riskCards: [
      { title: "Issuer / Reserve Risk", description: "Monitorare trasparenza riserve e aggiornamenti ufficiali." },
      { title: "Regulatory Risk", description: "Nuove regole possono influenzare disponibilita e utilizzo." },
      { title: "Chain Fragmentation", description: "USDT su reti diverse non e sempre intercambiabile senza bridge/swap." },
      { title: "Operational Mistakes", description: "Errori di address o rete possono essere irreversibili." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: "https://tether.to/" },
      { label: "Twitter / X", href: "https://x.com/Tether_to" },
      { label: "Token USDT", href: "https://www.coingecko.com/en/coins/tether" },
      { label: "Transparency", href: "https://tether.to/en/transparency/" },
    ],
    contentItems: [
      {
        type: "article",
        title: "USDT transparency dashboard",
        source: "Tether",
        href: "https://tether.to/en/transparency/",
      },
      {
        type: "article",
        title: "USDT - pagina CoinGecko",
        source: "CoinGecko",
        href: "https://www.coingecko.com/en/coins/tether",
      },
      {
        type: "video",
        title: "USDT e gestione liquidita in DeFi",
        source: "YouTube",
        skillLevel: "Beginner",
        embedId: "1jzFNzUgZ6Q",
      },
    ],
  },
  ethereum: buildBlockchainData({
    slug: "ethereum",
    name: "Ethereum",
    type: "Layer 1",
    tokenSymbol: "ETH",
    description:
      "Ethereum e la blockchain di riferimento per smart contract e applicazioni decentralizzate, con un ecosistema maturo per DeFi, NFT e infrastrutture Web3.",
    appUrl: "https://ethereum.org/it/",
    websiteUrl: "https://ethereum.org/it/",
    twitterUrl: "https://x.com/ethereum",
    coinId: "ethereum",
    docsUrl: "https://ethereum.org/it/developers/docs/",
  }),
  bitcoin: buildBlockchainData({
    slug: "bitcoin",
    name: "Bitcoin",
    type: "Layer 1",
    tokenSymbol: "BTC",
    description: "Bitcoin e la prima rete decentralizzata, focalizzata su sicurezza, scarsita digitale e trasferimento di valore.",
    appUrl: "https://bitcoin.org",
    websiteUrl: "https://bitcoin.org",
    twitterUrl: "https://x.com/bitcoin",
    coinId: "bitcoin",
    docsUrl: "https://developer.bitcoin.org",
  }),
  solana: buildBlockchainData({
    slug: "solana",
    name: "Solana",
    type: "Layer 1",
    tokenSymbol: "SOL",
    description: "Solana e una L1 ad alte performance con fee basse, usata per DeFi, pagamenti, NFT e gaming.",
    appUrl: "https://solana.com",
    websiteUrl: "https://solana.com",
    twitterUrl: "https://x.com/solana",
    coinId: "solana",
    docsUrl: "https://solana.com/docs",
  }),
  arbitrum: buildBlockchainData({
    slug: "arbitrum",
    name: "Arbitrum",
    type: "Layer 2",
    tokenSymbol: "ARB",
    description: "Arbitrum e una Layer 2 su Ethereum che riduce costi e aumenta scalabilita per dApp e DeFi.",
    appUrl: "https://arbitrum.foundation/",
    websiteUrl: "https://arbitrum.foundation/",
    twitterUrl: "https://x.com/arbitrum",
    coinId: "arbitrum",
    docsUrl: "https://docs.arbitrum.io",
    airdrop: true,
  }),
  polygon: buildBlockchainData({
    slug: "polygon",
    name: "Polygon",
    type: "Layer 2",
    tokenSymbol: "POL",
    description: "Polygon scala Ethereum con diverse soluzioni, offrendo costi ridotti e ampia compatibilita EVM.",
    appUrl: "https://polygon.technology/",
    websiteUrl: "https://polygon.technology/",
    twitterUrl: "https://x.com/0xPolygon",
    coinId: "polygon-ecosystem-token",
    docsUrl: "https://docs.polygon.technology",
  }),
  base: buildBlockchainData({
    slug: "base",
    name: "Base",
    type: "Layer 2",
    tokenSymbol: "—",
    description: "Base e la L2 di Coinbase costruita su Ethereum, con focus su UX e onboarding mainstream.",
    appUrl: "https://www.base.org/",
    websiteUrl: "https://www.base.org/",
    twitterUrl: "https://x.com/base",
    coinId: null,
    docsUrl: "https://docs.base.org",
    airdrop: true,
  }),
  optimism: buildBlockchainData({
    slug: "optimism",
    name: "Optimism",
    type: "Layer 2",
    tokenSymbol: "OP",
    description: "Optimism e una L2 Ethereum orientata a scalabilita, governance e sviluppo dell'ecosistema Superchain.",
    appUrl: "https://www.optimism.io/",
    websiteUrl: "https://www.optimism.io/",
    twitterUrl: "https://twitter.com/Optimism",
    coinId: "optimism",
    docsUrl: "https://docs.optimism.io",
    airdrop: true,
  }),
  zora: buildBlockchainData({
    slug: "zora",
    name: "Zora",
    type: "Layer 2",
    tokenSymbol: "ZORA",
    description: "Zora e una rete focalizzata sull'economia creator, NFT e contenuti on-chain.",
    appUrl: "https://zora.co/",
    websiteUrl: "https://zora.co/",
    twitterUrl: "https://x.com/ourZORA",
    coinId: "zora",
    docsUrl: "https://docs.zora.co",
    airdrop: true,
  }),
  sanko: buildBlockchainData({
    slug: "sanko",
    name: "Sanko",
    type: "Layer 1",
    tokenSymbol: "—",
    description: "Sanko e un ecosistema blockchain orientato a gaming e community native Web3.",
    appUrl: "https://sanko.xyz/",
    websiteUrl: "https://sanko.xyz/",
    twitterUrl: "https://x.com/SankoGameCorp",
    coinId: null,
  }),
  scroll: buildBlockchainData({
    slug: "scroll",
    name: "Scroll",
    type: "Layer 2",
    tokenSymbol: "—",
    description: "Scroll porta la tecnologia zk-rollup su Ethereum per scalare le dApp mantenendo compatibilita EVM.",
    appUrl: "https://scroll.io/",
    websiteUrl: "https://scroll.io/",
    twitterUrl: "https://x.com/Scroll_ZKP",
    coinId: null,
    docsUrl: "https://docs.scroll.io",
    airdrop: true,
  }),
  berachain: buildBlockchainData({
    slug: "berachain",
    name: "Berachain",
    type: "Layer 1",
    tokenSymbol: "BERA",
    description: "Berachain e una L1 progettata per liquidita e DeFi, con meccaniche economiche dedicate.",
    appUrl: "https://www.berachain.com/",
    websiteUrl: "https://www.berachain.com/",
    twitterUrl: "https://x.com/berachain",
    coinId: "berachain-berachain",
    docsUrl: "https://docs.berachain.com",
    airdrop: true,
  }),
  zksync: buildBlockchainData({
    slug: "zksync",
    name: "zkSync",
    type: "Layer 2",
    tokenSymbol: "ZK",
    description: "zkSync e una L2 basata su zero-knowledge proofs per transazioni veloci e costi ridotti su Ethereum.",
    appUrl: "https://zksync.io/",
    websiteUrl: "https://zksync.io/",
    twitterUrl: "https://x.com/zksync",
    coinId: "zksync",
    docsUrl: "https://docs.zksync.io",
    airdrop: true,
  }),
  linea: buildBlockchainData({
    slug: "linea",
    name: "Linea",
    type: "Layer 2",
    tokenSymbol: "LINEA",
    description: "Linea e la zkEVM di ConsenSys per sviluppare e scalare applicazioni Ethereum.",
    appUrl: "https://linea.build/",
    websiteUrl: "https://linea.build/",
    twitterUrl: "https://x.com/LineaBuild",
    coinId: "linea",
    docsUrl: "https://docs.linea.build",
    airdrop: true,
  }),
  layer3: buildBlockchainData({
    slug: "layer3",
    name: "Layer3",
    type: "Layer 2",
    tokenSymbol: "—",
    description: "Layer3 e una piattaforma di quest e attivazioni multichain con forte focus su community growth.",
    appUrl: "https://layer3.xyz/",
    websiteUrl: "https://layer3.xyz/",
    twitterUrl: "https://x.com/layer3xyz",
    coinId: null,
    airdrop: true,
  }),
  hyperlane: buildBlockchainData({
    slug: "hyperlane",
    name: "Hyperlane",
    type: "Layer 2",
    tokenSymbol: "—",
    description: "Hyperlane e un protocollo di interoperabilita per messaggistica cross-chain permissionless.",
    appUrl: "https://www.hyperlane.xyz/",
    websiteUrl: "https://www.hyperlane.xyz/",
    twitterUrl: "https://x.com/hyperlane",
    coinId: null,
    docsUrl: "https://docs.hyperlane.xyz",
    airdrop: true,
  }),
  polygon_zkevm: buildBlockchainData({
    slug: "polygon_zkevm",
    name: "Polygon zkEVM",
    type: "Layer 2",
    tokenSymbol: "—",
    description: "Polygon zkEVM offre compatibilita EVM con sicurezza zero-knowledge per applicazioni Ethereum.",
    appUrl: "https://polygon.technology/",
    websiteUrl: "https://polygon.technology/",
    twitterUrl: "https://x.com/0xpolygondefi",
    coinId: null,
    docsUrl: "https://docs.polygon.technology/zkEVM/",
    airdrop: true,
  }),
  degen: buildBlockchainData({
    slug: "degen",
    name: "Degen",
    type: "Layer 2",
    tokenSymbol: "DEGEN",
    description: "Degen e un ecosistema social-native su Base con forte componente community.",
    appUrl: "https://degen.tips",
    websiteUrl: "https://degen.tips",
    twitterUrl: "https://x.com/degentokenbase",
    coinId: "degen-base",
    airdrop: true,
  }),
  blast: buildBlockchainData({
    slug: "blast",
    name: "Blast",
    type: "Layer 2",
    tokenSymbol: "BLAST",
    description: "Blast e una L2 Ethereum con focus su rendimento nativo e applicazioni DeFi.",
    appUrl: "https://blast.io",
    websiteUrl: "https://blast.io",
    twitterUrl: "https://x.com/Blast_L2",
    coinId: "blast",
    docsUrl: "https://docs.blast.io",
    airdrop: true,
  }),
  avalanche: buildBlockchainData({
    slug: "avalanche",
    name: "Avalanche",
    type: "Layer 1",
    tokenSymbol: "AVAX",
    description: "Avalanche e una blockchain ad alte performance con subnet e tooling per applicazioni custom.",
    appUrl: "https://www.avax.network/",
    websiteUrl: "https://www.avax.network/",
    twitterUrl: "https://x.com/avax",
    coinId: "avalanche-2",
    docsUrl: "https://docs.avax.network",
  }),
  abstract: buildBlockchainData({
    slug: "abstract",
    name: "Abstract",
    type: "Layer 2",
    tokenSymbol: "—",
    description: "Abstract e una Layer 2 su Ethereum pensata per UX semplice e costi ridotti.",
    appUrl: "https://www.abs.xyz/",
    websiteUrl: "https://www.abs.xyz/",
    twitterUrl: "https://x.com/AbstractChain",
    coinId: "abstract",
    airdrop: true,
  }),
  ink: buildBlockchainData({
    slug: "ink",
    name: "Ink",
    type: "Layer 2",
    tokenSymbol: "—",
    description: "Ink e una L2 della Superchain Optimism, orientata a scalabilita e integrazione con Kraken.",
    appUrl: "https://inkonchain.com/",
    websiteUrl: "https://inkonchain.com/",
    twitterUrl: "https://x.com/inkonchain",
    coinId: "ink",
    airdrop: true,
  }),
  hyperevm: buildBlockchainData({
    slug: "hyperevm",
    name: "HyperEVM",
    type: "Layer 1",
    tokenSymbol: "—",
    description: "HyperEVM estende l'ecosistema Hyperliquid per smart contract in stile EVM.",
    appUrl: "https://hyperfoundation.org/",
    websiteUrl: "https://hyperfoundation.org/",
    twitterUrl: "https://x.com/HyperliquidX",
    coinId: null,
    airdrop: true,
  }),
};

export function getProjectPageData(slug: string): Omit<ProjectPageData, "logo"> | null {
  const raw = PROJECT_PAGE_DATA[slug.toLowerCase()];
  if (!raw) return null;
  return { ...raw, slug: slug.toLowerCase() };
}
