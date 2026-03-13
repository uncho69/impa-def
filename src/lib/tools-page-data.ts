import type { ProjectPageData } from "@/lib/project-page-data";

type ToolSeed = {
  slug: string;
  name: string;
  category: string;
  appUrl: string;
  websiteUrl: string;
  twitterUrl: string;
  description: string;
  guideUrl?: string;
  docsUrl?: string;
};

function buildToolData(seed: ToolSeed): Omit<ProjectPageData, "slug" | "logo"> {
  return {
    name: seed.name,
    tags: [{ label: "Strumenti Utili" }, { label: seed.category }, { label: "Research" }],
    appUrl: seed.appUrl,
    guideUrl: seed.guideUrl || "/manuale",
    tokenSymbol: "N/A",
    coinId: null,
    description: seed.description,
    overviewTags: [{ label: "Data-driven" }, { label: "On-chain" }, { label: "Workflow" }, { label: "Pro" }],
    featureCards: [
      {
        icon: "lightning",
        title: "Setup Rapido",
        description: `Configura ${seed.name} in pochi minuti e parti con un workflow pulito.`,
      },
      {
        icon: "droplet",
        title: "Metriche Chiave",
        description: "Monitora KPI reali: volumi, wallet attivi, TVL, fee, retention, trend.",
      },
      {
        icon: "cap",
        title: "Framework Operativo",
        description: "Applica checklist e playbook per decisioni migliori, senza rumore.",
        href: "/manuale",
      },
      {
        icon: "warning",
        title: "Bias e Falsi Segnali",
        description: "Evita overfitting e conclusioni affrettate su dati incompleti.",
      },
      {
        icon: "gift",
        title: "Alpha Ricercabile",
        description: "Trova opportunita replicabili con un processo misurabile.",
      },
    ],
    howToSteps: [
      {
        icon: "1",
        title: "Definisci obiettivo",
        description: "Chiarisci cosa vuoi misurare: rischio, performance, discovery, timing.",
      },
      {
        icon: "2",
        title: "Costruisci dashboard",
        description: "Configura watchlist, filtri e soglie con pochi indicatori ad alto impatto.",
      },
      {
        icon: "3",
        title: "Conferma con piu fonti",
        description: "Valida ogni insight con almeno una seconda fonte indipendente.",
      },
      {
        icon: "4",
        title: "Rivedi ogni settimana",
        description: "Mantieni il sistema aggiornato e rimuovi metriche non utili.",
      },
    ],
    riskCards: [
      { title: "Data Lag", description: "Alcune metriche arrivano in ritardo e possono falsare il timing." },
      { title: "Survivorship Bias", description: "Guardare solo i winner altera la qualita delle decisioni." },
      { title: "Narrative Bias", description: "Un trend social forte non implica qualita del progetto." },
      { title: "Source Risk", description: "Verifica sempre la fonte primaria prima di agire." },
    ],
    usefulLinks: [
      { label: "App", href: seed.appUrl },
      { label: "Sito ufficiale", href: seed.websiteUrl },
      { label: "Twitter / X", href: seed.twitterUrl },
      ...(seed.docsUrl ? [{ label: "Docs", href: seed.docsUrl }] : []),
    ],
    contentItems: [
      {
        type: "article",
        title: `${seed.name}: quickstart operativo`,
        source: "ImparoDeFi",
        href: seed.websiteUrl,
      },
      {
        type: "article",
        title: `${seed.name}: best practice di analisi`,
        source: seed.name,
        href: seed.docsUrl || seed.websiteUrl,
      },
    ],
  };
}

export const TOOL_PAGE_DATA: Record<string, Omit<ProjectPageData, "slug" | "logo">> = {
  debank: buildToolData({
    slug: "debank",
    name: "DeBank",
    category: "Portfolio Tracker",
    appUrl: "https://debank.com",
    websiteUrl: "https://debank.com",
    twitterUrl: "https://x.com/DebankDeFi",
    docsUrl: "https://debank.com/official",
    description: "Dashboard portfolio multichain per wallet tracking, approvazioni e discovery on-chain.",
  }),
  zerion: buildToolData({
    slug: "zerion",
    name: "Zerion",
    category: "Portfolio Tracker",
    appUrl: "https://zerion.io",
    websiteUrl: "https://zerion.io",
    twitterUrl: "https://x.com/zerion",
    docsUrl: "https://help.zerion.io",
    description: "Portfolio e wallet app con focus su UX, mobile-first e monitoraggio asset cross-chain.",
  }),
  defillama: buildToolData({
    slug: "defillama",
    name: "DeFiLlama",
    category: "Analytics",
    appUrl: "https://defillama.com",
    websiteUrl: "https://defillama.com",
    twitterUrl: "https://x.com/DefiLlama",
    docsUrl: "https://docs.llama.fi",
    description: "Standard de facto per TVL, fee, revenue e analytics DeFi cross-chain.",
  }),
  "token-terminal": buildToolData({
    slug: "token-terminal",
    name: "Token Terminal",
    category: "Analytics",
    appUrl: "https://tokenterminal.com",
    websiteUrl: "https://tokenterminal.com",
    twitterUrl: "https://x.com/tokenterminal",
    docsUrl: "https://tokenterminal.com",
    description: "Piattaforma fundamental per valutare protocolli crypto con metriche finance-like.",
  }),
  dune: buildToolData({
    slug: "dune",
    name: "Dune",
    category: "Analytics",
    appUrl: "https://dune.com",
    websiteUrl: "https://dune.com",
    twitterUrl: "https://x.com/Dune",
    docsUrl: "https://docs.dune.com",
    description: "Data platform SQL-first per creare dashboard custom su blockchain e protocolli.",
  }),
  etherscan: buildToolData({
    slug: "etherscan",
    name: "Etherscan",
    category: "Blockchain Explorer",
    appUrl: "https://etherscan.io",
    websiteUrl: "https://etherscan.io",
    twitterUrl: "https://x.com/etherscan",
    docsUrl: "https://docs.etherscan.io",
    description: "Explorer di riferimento per transazioni, contratti, wallet e tracking su Ethereum.",
  }),
  "relay-transactions": buildToolData({
    slug: "relay-transactions",
    name: "Relay Transaction Scanner",
    category: "Blockchain Explorer",
    appUrl: "https://relay.link/transactions",
    websiteUrl: "https://relay.link/transactions",
    twitterUrl: "https://x.com/relayprotocol",
    docsUrl: "https://relay.link",
    description: "Scanner cross-chain per monitorare transazioni bridge e stato execution end-to-end.",
  }),
  layerzeroscan: buildToolData({
    slug: "layerzeroscan",
    name: "LayerZeroScan",
    category: "Blockchain Explorer",
    appUrl: "https://layerzeroscan.com/",
    websiteUrl: "https://layerzeroscan.com/",
    twitterUrl: "https://x.com/LayerZero_Labs",
    docsUrl: "https://layerzero.network",
    description: "Explorer ufficiale LayerZero per tracciare messaggi cross-chain e delivery status.",
  }),
  tornado: buildToolData({
    slug: "tornado",
    name: "Tornado Cash",
    category: "Privacy",
    appUrl: "https://tornado.cash",
    websiteUrl: "https://tornado.cash",
    twitterUrl: "https://x.com/TornadoCash",
    docsUrl: "https://docs.tornado.cash",
    description: "Protocollo privacy on-chain. Da usare con forte attenzione a compliance e contesto normativo.",
  }),
  railgun: buildToolData({
    slug: "railgun",
    name: "RAILGUN",
    category: "Privacy",
    appUrl: "https://railgun.org",
    websiteUrl: "https://railgun.org",
    twitterUrl: "https://x.com/RailgunProject",
    docsUrl: "https://docs.railgun.org",
    description: "Privacy system on-chain con smart wallet shielded per DeFi e transfer privati.",
  }),
  zcash: buildToolData({
    slug: "zcash",
    name: "Zcash",
    category: "Privacy",
    appUrl: "https://z.cash",
    websiteUrl: "https://z.cash",
    twitterUrl: "https://x.com/zcash",
    docsUrl: "https://zips.z.cash",
    description: "Network privacy-first con transazioni shielded e crittografia a zero-knowledge.",
  }),
  nansen: buildToolData({
    slug: "nansen",
    name: "Nansen",
    category: "Analytics",
    appUrl: "https://www.nansen.ai",
    websiteUrl: "https://www.nansen.ai",
    twitterUrl: "https://x.com/nansen_ai",
    docsUrl: "https://www.nansen.ai/guides",
    description: "On-chain analytics premium per wallet intelligence, smart money tracking e signal discovery.",
  }),
};

export function getToolPageData(slug: string): Omit<ProjectPageData, "logo"> | null {
  const normalized = slug.toLowerCase();
  const raw = TOOL_PAGE_DATA[normalized];
  if (!raw) return null;
  return { ...raw, slug: normalized };
}

