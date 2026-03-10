"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ProjectPageData } from "@/lib/project-page-data";
import { MobileContainer } from "@/components/MobileContainer";
import { getProjectMacroCategory, type MacroCategoryId } from "@/lib/admin-project-categories";
import { getProjectLogo } from "@/lib/project-logos";
import { getCoingeckoId } from "@/lib/project-coingecko-ids";
import { BookmarkButton } from "@/components/bookmarks/BookmarkButton";

type TabId = "overview" | "come-usarlo" | "contenuti" | "dati-rischi" | "link-utili" | "notizie";

const CONTENT_FILTERS = [
  { id: "all", label: "Tutti", icon: null },
  { id: "video", label: "Video", icon: "video" },
  { id: "article", label: "Articoli", icon: "doc" },
  { id: "tutorial", label: "Tutorial", icon: "cap" },
  { id: "analisi", label: "Analisi", icon: "search" },
] as const;

const BLOCKCHAIN_EXPLORER_CARDS: {
  id: "portafogli" | "defi" | "nft" | "memecoin";
  label: string;
  subtitle: string;
  icon: string;
}[] = [
  { id: "portafogli", label: "Portafogli", subtitle: "Wallet e custodia", icon: "👛" },
  { id: "defi", label: "Applicazioni", subtitle: "dApp e protocolli", icon: "🧩" },
  { id: "nft", label: "NFT", subtitle: "Marketplace e collezioni", icon: "🖼️" },
  { id: "memecoin", label: "Memecoin", subtitle: "Token meme", icon: "🪙" },
];

type EcosystemProject = {
  id: string;
  name: string;
  description?: string | null;
  websiteUrl?: string | null;
  twitterUrl?: string | null;
};

type SortKey = "none" | "mcap_desc" | "mcap_asc" | "tvl_desc" | "tvl_asc";
type DefiSubCategory = "all" | "dex" | "yield" | "lending" | "options" | "derivatives" | "stablecoins";
type NftSubCategory = "collezione" | "launchpad" | "marketplace" | "prestiti";

const DEFI_SUBCATEGORY_LABELS: { id: DefiSubCategory; label: string }[] = [
  { id: "all", label: "Tutti" },
  { id: "dex", label: "DEX" },
  { id: "yield", label: "Rendimenti" },
  { id: "lending", label: "Prestiti" },
  { id: "options", label: "Opzioni" },
  { id: "derivatives", label: "Derivati" },
  { id: "stablecoins", label: "Stablecoin" },
];

const NFT_SUBCATEGORY_LABELS: { id: NftSubCategory; label: string }[] = [
  { id: "collezione", label: "Collezione" },
  { id: "launchpad", label: "Launchpad" },
  { id: "marketplace", label: "Marketplace" },
  { id: "prestiti", label: "Prestiti" },
];

const DEFI_SUBCATEGORY_BY_PROJECT_ID: Record<string, DefiSubCategory> = {
  uniswap: "dex",
  curve: "dex",
  balancer: "dex",
  jupiter: "dex",
  raydium: "dex",
  camelot: "dex",
  syncswap: "dex",
  "cow-swap": "dex",
  yearn: "yield",
  "yearn-finance": "yield",
  lido: "yield",
  "lido-finance": "yield",
  aave: "lending",
  compound: "lending",
  liquity: "lending",
  moonwell: "lending",
  kamino: "lending",
  marginfi: "lending",
  rysk: "options",
  smilee: "options",
  hyperliquid: "derivatives",
  ostium: "derivatives",
  limitless: "derivatives",
  liquityusd: "stablecoins",
};

const NFT_SUBCATEGORY_BY_PROJECT_ID: Record<string, NftSubCategory> = {
  opensea: "marketplace",
  blur: "marketplace",
  sudoswap: "marketplace",
  "magic-eden": "marketplace",
  "crypto-punks": "collezione",
  "pudgy-penguins": "collezione",
  milady: "collezione",
  "tubby-cats": "collezione",
  "bong-bears-and-rebase": "collezione",
  "redacted-remilio-babies": "collezione",
  "fractional-uprising-fu": "collezione",
  shroomiez: "collezione",
  radbro: "launchpad",
  zora: "launchpad",
  nftfi: "prestiti",
  benddao: "prestiti",
};

const DEFI_TVL_USD_BY_PROJECT_ID: Record<string, number> = {
  aave: 21000000000,
  uniswap: 5500000000,
  curve: 2200000000,
  lido: 33000000000,
  "lido-finance": 33000000000,
  compound: 2700000000,
  balancer: 1400000000,
  yearn: 420000000,
  "yearn-finance": 420000000,
  stargate: 420000000,
  camelot: 130000000,
  raydium: 1200000000,
  kamino: 1700000000,
  moonwell: 460000000,
  liquity: 780000000,
};

function formatPrice(n: number | null | undefined): string {
  if (typeof n !== "number" || !Number.isFinite(n)) return "—";
  if (n >= 1) return `$${n.toFixed(2)}`;
  if (n >= 0.01) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(6)}`;
}

function formatCompactUsd(n: number | null | undefined): string {
  if (typeof n !== "number" || !Number.isFinite(n)) return "—";
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

function getProjectHref(projectId: string, macro: MacroCategoryId): string {
  if (macro === "defi") return `/defi/${projectId}`;
  if (macro === "portafogli") return `/wallet/${projectId}`;
  if (macro === "nft") return `/nft/${projectId}`;
  if (macro === "memecoin") return `/memecoins/${projectId}`;
  return "/esplora-app";
}

function FeatureIcon({ type }: { type: ProjectPageData["featureCards"][0]["icon"] }) {
  const cls = "w-8 h-8";
  if (type === "lightning")
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  if (type === "droplet")
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    );
  if (type === "cap")
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    );
  if (type === "warning")
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
  if (type === "gift")
    return (
      <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    );
  return null;
}

type FeatureModalContent = {
  subtitle: string;
  objective: string;
  checklist: string[];
  steps: string[];
  kpis: string[];
  mistakes: string[];
  ctaLabel: string;
  ctaHref?: string;
};

function buildFeatureModalContent(
  projectName: string,
  card: ProjectPageData["featureCards"][0],
  appUrl: string,
): FeatureModalContent {
  const base = {
    subtitle: `${projectName} · Playbook operativo`,
    objective: card.description,
  };

  if (card.icon === "lightning") {
    return {
      ...base,
      objective: `Onboarding rapido su ${projectName}: prima operazione in sicurezza con capitale ridotto e controllo pieno dei passaggi critici.`,
      checklist: [
        "Wallet corretto con rete verificata",
        "Piccola size di test pronta (es. 10-50$)",
        "URL ufficiale controllato e bookmark salvato",
        "Gas fee disponibili sul wallet",
      ],
      steps: [
        `Apri ${projectName} dal link ufficiale e connetti il wallet.`,
        "Conferma chain, token e importo prima della firma.",
        "Esegui una transazione minima di test.",
        "Verifica esito su explorer e saldo aggiornato.",
      ],
      kpis: [
        "Time-to-first-successful-tx < 5 minuti",
        "0 errori di rete/indirizzo",
        "Slippage entro range pianificato",
      ],
      mistakes: [
        "Entrare con size troppo alta al primo click",
        "Firmare transazioni senza leggere i dettagli",
        "Usare link trovati su fonti non ufficiali",
      ],
      ctaLabel: `Apri ${projectName}`,
      ctaHref: appUrl,
    };
  }

  if (card.icon === "droplet") {
    return {
      ...base,
      objective: `Gestione liquidita e execution: massimizzare efficienza su ${projectName} riducendo costi impliciti (fee, slippage, timing).`,
      checklist: [
        "Volumi e profondita mercato verificati",
        "Slippage tollerance impostata in modo conservativo",
        "Costo gas stimato prima di confermare",
        "Scenario exit gia definito",
      ],
      steps: [
        "Scegli coppia/mercato con profondita adeguata alla tua size.",
        "Confronta execution in fascia oraria a migliore liquidita.",
        "Dividi ordini grandi in tranche per ridurre impatto.",
        "Monitora prezzo medio di ingresso e costo totale.",
      ],
      kpis: [
        "Slippage reale <= slippage target",
        "Fee totali sotto soglia prefissata",
        "Execution senza reverts/fail",
      ],
      mistakes: [
        "Eseguire ordini grandi su pool sottili",
        "Ignorare costo gas in fasi congestionate",
        "Cambiare slippage in modo aggressivo all'ultimo",
      ],
      ctaLabel: "Vedi link utili",
      ctaHref: card.href,
    };
  }

  if (card.icon === "cap") {
    return {
      ...base,
      objective: `Framework di apprendimento su ${projectName}: capire meccanica, rischio e best practice prima di scalare il capitale.`,
      checklist: [
        "Conosci differenza tra action base e advanced",
        "Comprendi i rischi specifici del protocollo",
        "Hai provato almeno 1 operazione test",
        "Hai un piano di allocazione progressiva",
      ],
      steps: [
        "Leggi la guida base e la documentazione ufficiale.",
        "Esegui test pratico su importo minimo.",
        "Annota rischi e regole operative personali.",
        "Passa a size maggiori solo dopo 2-3 esecuzioni pulite.",
      ],
      kpis: [
        "Completamento guida 100%",
        "Almeno 3 esecuzioni senza errori",
        "Checklist rischio rispettata prima di ogni tx",
      ],
      mistakes: [
        "Saltare la fase tutorial per fretta",
        "Confondere rendimento atteso con rendimento garantito",
        "Operare senza piano di sizing",
      ],
      ctaLabel: "Apri guida",
      ctaHref: card.href,
    };
  }

  if (card.icon === "warning") {
    return {
      ...base,
      objective: `Risk control operativo su ${projectName}: minimizzare errori irreversibili e proteggere il capitale nelle condizioni di mercato avverse.`,
      checklist: [
        "Wallet principale separato dal wallet operativo",
        "Permessi token periodicamente revocati",
        "Stop di perdita e limite giornaliero definiti",
        "Controllo anti-phishing attivo",
      ],
      steps: [
        "Valuta rischio smart contract e rischio liquidita.",
        "Definisci invalidation level prima dell'ingresso.",
        "Monitora posizione e aggiorna il piano quando il contesto cambia.",
        "Riduci esposizione se volatilita/fee diventano anomale.",
      ],
      kpis: [
        "Nessuna tx verso address errati",
        "Max drawdown per trade entro limite",
        "Zero approve non necessarie persistenti",
      ],
      mistakes: [
        "Aumentare size dopo perdita per recuperare",
        "Lasciare approve illimitate su token sensibili",
        "Ignorare segnali di risk regime change",
      ],
      ctaLabel: "Apri manuale sicurezza",
      ctaHref: "/manuale",
    };
  }

  return {
    ...base,
    objective: `Valutazione opportunita su ${projectName}: identificare setup ad alto rapporto rischio/rendimento senza overtrading.`,
    checklist: [
      "Catalyst chiaro (nuovo update, incentivo, campagna)",
      "Rischio downside definito prima dell'ingresso",
      "Allocazione coerente col profilo personale",
      "Orizzonte temporale dichiarato (breve/medio)",
    ],
    steps: [
      "Mappa opportunita disponibili e priorita.",
      "Stima reward potenziale vs costo/tempo richiesto.",
      "Esegui solo se il setup supera le tue regole minime.",
      "Review post-operazione per migliorare decisioni future.",
    ],
    kpis: [
      "Reward netto positivo vs fee/costi",
      "Hit-rate opportunita > baseline personale",
      "Nessun trade fuori piano",
    ],
    mistakes: [
      "Inseguire hype senza edge misurabile",
      "Moltiplicare operazioni senza criterio",
      "Confondere attivita con performance",
    ],
    ctaLabel: "Apri risorse progetto",
    ctaHref: card.href || appUrl,
  };
}

export function ProjectPageTemplate({ data }: { data: ProjectPageData }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [selectedContentIndex, setSelectedContentIndex] = useState<number | null>(null);
  const [contentFilter, setContentFilter] = useState<string>("all");
  const [priceData, setPriceData] = useState<{
    price: number;
    volume_24h: number;
    price_change_percentage_24h: number;
    market_cap: number;
  } | null>(null);
  const [contentOverrides, setContentOverrides] = useState<{
    overviewText?: string;
    appUrl?: string;
    guideUrl?: string;
    usefulLinks?: { label: string; href: string }[];
    featureCards?: { title: string; description: string; href?: string }[];
    howToSteps?: { title: string; description: string; href?: string }[];
    riskCards?: { title: string; description: string }[];
    contentItems?: {
      type: "video" | "article";
      title: string;
      tags?: string[];
      source?: string;
      skillLevel?: string;
      href?: string;
      embedId?: string;
    }[];
  } | null>(null);
  const [metadataOverrides, setMetadataOverrides] = useState<{
    description?: string | null;
    websiteUrl?: string | null;
    twitterUrl?: string | null;
  } | null>(null);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [explorerCategory, setExplorerCategory] = useState<"portafogli" | "defi" | "nft" | "memecoin">("portafogli");
  const [explorerSearch, setExplorerSearch] = useState("");
  const [explorerProjects, setExplorerProjects] = useState<EcosystemProject[]>([]);
  const [explorerLoading, setExplorerLoading] = useState(false);
  const [explorerSortKey, setExplorerSortKey] = useState<SortKey>("none");
  const [explorerDefiSubCategory, setExplorerDefiSubCategory] = useState<DefiSubCategory>("all");
  const [explorerNftSubCategory, setExplorerNftSubCategory] = useState<NftSubCategory>("collezione");
  const [explorerCgData, setExplorerCgData] = useState<Record<string, { usd?: number; usd_market_cap?: number }>>({});
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState<number | null>(null);

  const isBlockchainProject = getProjectMacroCategory(data.slug) === "blockchain";

  useEffect(() => {
    if (!data.coinId) return;
    const setFromResponse = (d: {
      price?: number | null;
      volume_24h?: number | null;
      price_change_percentage_24h?: number | null;
      market_cap?: number | null;
    }) => {
      if (d && (typeof d.price === "number" || (d.price != null && Number.isFinite(d.price)))) {
        setPriceData({
          price: Number(d.price) ?? 0,
          volume_24h: typeof d.volume_24h === "number" ? d.volume_24h : 0,
          price_change_percentage_24h:
            typeof d.price_change_percentage_24h === "number" ? d.price_change_percentage_24h : 0,
          market_cap: typeof d.market_cap === "number" ? d.market_cap : 0,
        });
        return true;
      }
      return false;
    };
    const tryCoinGecko = () =>
      fetch(`/api/coingecko/coin/${data.coinId}`)
        .then((r) => r.json())
        .then((d) => {
          if (d && !d.error) setFromResponse(d);
        })
        .catch(() => {});
    fetch(`/api/coin/${data.coinId}`)
      .then((r) => r.json())
      .then((d) => {
        if (!setFromResponse(d)) tryCoinGecko();
      })
      .catch(() => tryCoinGecko());
  }, [data.coinId]);

  useEffect(() => {
    if (!data.slug) return;
    fetch(`/api/projects/content/${data.slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((payload) => {
        if (!payload) return;
        setContentOverrides(payload.contentOverrides ?? null);
        setMetadataOverrides(payload.metadata ?? null);
      })
      .catch(() => {
        setContentOverrides(null);
        setMetadataOverrides(null);
      });
  }, [data.slug]);

  useEffect(() => {
    if (!isBlockchainProject || explorerProjects.length > 0 || explorerLoading) return;
    setExplorerLoading(true);
    fetch("/api/ecosystem-projects", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((payload) => {
        const list = (payload?.projects as EcosystemProject[] | undefined) ?? [];
        setExplorerProjects(list);
      })
      .catch(() => setExplorerProjects([]))
      .finally(() => setExplorerLoading(false));
  }, [isBlockchainProject, explorerProjects.length, explorerLoading]);

  useEffect(() => {
    if (!explorerOpen) return;
    const relevantProjects = explorerProjects.filter((p) => getProjectMacroCategory(p.id) === explorerCategory);
    const ids = [...new Set(relevantProjects.map((p) => getCoingeckoId(p.id)).filter(Boolean))] as string[];
    if (ids.length === 0) return;
    fetch(`/api/coingecko?ids=${encodeURIComponent(ids.join(","))}`)
      .then((r) => (r.ok ? r.json() : {}))
      .then((payload) => setExplorerCgData(payload ?? {}))
      .catch(() => setExplorerCgData({}));
  }, [explorerCategory, explorerOpen, explorerProjects]);

  const resolvedDescription =
    contentOverrides?.overviewText ?? metadataOverrides?.description ?? data.description;
  const resolvedAppUrl = contentOverrides?.appUrl ?? data.appUrl;
  const resolvedGuideUrl = contentOverrides?.guideUrl ?? data.guideUrl;
  const resolvedFeatureCards =
    contentOverrides?.featureCards && contentOverrides.featureCards.length > 0
      ? data.featureCards.map((baseCard, index) => {
          const overrideCard = contentOverrides.featureCards?.[index];
          if (!overrideCard) return baseCard;
          return {
            ...baseCard,
            title: overrideCard.title || baseCard.title,
            description: overrideCard.description || baseCard.description,
            href: overrideCard.href || baseCard.href,
          };
        })
      : data.featureCards;
  const resolvedHowToSteps =
    contentOverrides?.howToSteps && contentOverrides.howToSteps.length > 0
      ? data.howToSteps.map((baseStep, index) => {
          const overrideStep = contentOverrides.howToSteps?.[index];
          if (!overrideStep) return baseStep;
          return {
            ...baseStep,
            title: overrideStep.title || baseStep.title,
            description: overrideStep.description || baseStep.description,
            href: overrideStep.href || baseStep.href,
          };
        })
      : data.howToSteps;
  const resolvedRiskCards =
    contentOverrides?.riskCards && contentOverrides.riskCards.length > 0
      ? data.riskCards.map((baseRisk, index) => {
          const overrideRisk = contentOverrides.riskCards?.[index];
          if (!overrideRisk) return baseRisk;
          return {
            ...baseRisk,
            title: overrideRisk.title || baseRisk.title,
            description: overrideRisk.description || baseRisk.description,
          };
        })
      : data.riskCards;
  const resolvedContentItems =
    contentOverrides?.contentItems && contentOverrides.contentItems.length > 0
      ? contentOverrides.contentItems
      : data.contentItems;
  const filteredContentItems = useMemo(() => {
    if (contentFilter === "all") return resolvedContentItems;
    if (contentFilter === "video") return resolvedContentItems.filter((item) => item.type === "video");
    if (contentFilter === "article") return resolvedContentItems.filter((item) => item.type === "article");
    if (contentFilter === "tutorial") {
      return resolvedContentItems.filter((item) => {
        const hasTag = item.tags?.some((t) => t.toLowerCase().includes("tutorial")) ?? false;
        const hasTitle = item.title.toLowerCase().includes("tutorial");
        return hasTag || hasTitle;
      });
    }
    if (contentFilter === "analisi") {
      return resolvedContentItems.filter((item) => {
        const hasTag = item.tags?.some((t) => t.toLowerCase().includes("analisi")) ?? false;
        const hasTitle = item.title.toLowerCase().includes("analisi");
        return hasTag || hasTitle;
      });
    }
    return resolvedContentItems;
  }, [contentFilter, resolvedContentItems]);
  const resolvedUsefulLinks = useMemo(() => {
    if (contentOverrides?.usefulLinks && contentOverrides.usefulLinks.length > 0) {
      return contentOverrides.usefulLinks;
    }
    const fromMetadata: { label: string; href: string }[] = [];
    if (metadataOverrides?.websiteUrl) {
      fromMetadata.push({ label: "Sito ufficiale", href: metadataOverrides.websiteUrl });
    }
    if (metadataOverrides?.twitterUrl) {
      fromMetadata.push({ label: "Twitter / X", href: metadataOverrides.twitterUrl });
    }
    if (fromMetadata.length > 0) {
      const extra = data.usefulLinks.filter((link) => {
        if (link.label.toLowerCase().includes("sito")) return false;
        if (link.label.toLowerCase().includes("twitter")) return false;
        return true;
      });
      return [...fromMetadata, ...extra];
    }
    return data.usefulLinks;
  }, [contentOverrides?.usefulLinks, metadataOverrides?.websiteUrl, metadataOverrides?.twitterUrl, data.usefulLinks]);
  const filteredExplorerProjects = useMemo(() => {
    let byCategory = explorerProjects.filter((p) => getProjectMacroCategory(p.id) === explorerCategory);
    if (explorerCategory === "defi" && explorerDefiSubCategory !== "all") {
      byCategory = byCategory.filter((p) => DEFI_SUBCATEGORY_BY_PROJECT_ID[p.id.toLowerCase()] === explorerDefiSubCategory);
    }
    if (explorerCategory === "nft") {
      byCategory = byCategory.filter((p) => (NFT_SUBCATEGORY_BY_PROJECT_ID[p.id.toLowerCase()] ?? "collezione") === explorerNftSubCategory);
    }
    const q = explorerSearch.trim().toLowerCase();
    let result = !q ? byCategory : byCategory.filter((p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
    if (explorerSortKey !== "none") {
      result = [...result].sort((a, b) => {
        const cgA = getCoingeckoId(a.id);
        const cgB = getCoingeckoId(b.id);
        const mcapA = cgA ? explorerCgData[cgA]?.usd_market_cap ?? null : null;
        const mcapB = cgB ? explorerCgData[cgB]?.usd_market_cap ?? null : null;
        const tvlA = DEFI_TVL_USD_BY_PROJECT_ID[a.id.toLowerCase()] ?? null;
        const tvlB = DEFI_TVL_USD_BY_PROJECT_ID[b.id.toLowerCase()] ?? null;
        if (explorerSortKey === "mcap_desc") return (mcapB ?? -1) - (mcapA ?? -1);
        if (explorerSortKey === "mcap_asc") return (mcapA ?? Number.POSITIVE_INFINITY) - (mcapB ?? Number.POSITIVE_INFINITY);
        if (explorerSortKey === "tvl_desc") return (tvlB ?? -1) - (tvlA ?? -1);
        if (explorerSortKey === "tvl_asc") return (tvlA ?? Number.POSITIVE_INFINITY) - (tvlB ?? Number.POSITIVE_INFINITY);
        return 0;
      });
    }
    return result;
  }, [explorerProjects, explorerCategory, explorerDefiSubCategory, explorerNftSubCategory, explorerSearch, explorerSortKey, explorerCgData]);

  useEffect(() => {
    const syncFromHash = () => {
      if (typeof window === "undefined") return;
      const raw = window.location.hash.replace(/^#/, "");
      if (!raw) return;

      if (raw === "contenuti") {
        setActiveTab("contenuti");
        return;
      }

      if (raw.startsWith("contenuti-")) {
        const idx = Number(raw.replace("contenuti-", ""));
        if (Number.isInteger(idx) && idx >= 0 && idx < resolvedContentItems.length) {
          setActiveTab("contenuti");
          setSelectedContentIndex(idx);
        }
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [resolvedContentItems.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedFeatureIndex(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const selectedFeatureCard =
    selectedFeatureIndex !== null && selectedFeatureIndex >= 0 && selectedFeatureIndex < resolvedFeatureCards.length
      ? resolvedFeatureCards[selectedFeatureIndex]
      : null;
  const selectedFeatureContent = selectedFeatureCard
    ? buildFeatureModalContent(data.name, selectedFeatureCard, resolvedAppUrl)
    : null;

  return (
    <MobileContainer>
      <div className="bg-white dark:bg-indigo-900/25 dark:border-indigo-500/25 dark:backdrop-blur rounded-2xl shadow-lg border border-slate-200 dark:shadow-none overflow-hidden">
        {/* Header: logo, name, tags, token box */}
        <div className="p-6 md:p-8 border-b border-slate-200 dark:border-indigo-500/20">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700/50 dark:border dark:border-white/5 shrink-0 flex items-center justify-center">
                <Image src={data.logo} alt={data.name} width={64} height={64} className="object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{data.name}</h1>
                  <BookmarkButton
                    url={pathname}
                    title={`${data.name} - Pagina progetto`}
                    type="page"
                    projectId={data.slug}
                    showLabel
                    inactiveLabel="Salva"
                    activeLabel="Salva"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.tags.map((t) => (
                    <span
                      key={t.label}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        t.airdrop
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
                          : "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-200 dark:border dark:border-white/5"
                      }`}
                    >
                      {t.airdrop && (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                      )}
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Token stats box (stile card landing) */}
            <div className="bg-slate-100 dark:bg-slate-700/50 dark:border dark:border-white/5 rounded-xl p-4 min-w-[200px] shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-white dark:bg-white/10 flex items-center justify-center">
                  <Image src={data.logo} alt="" width={24} height={24} className="object-contain" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white">{data.tokenSymbol}</span>
              </div>
              <div className="space-y-1.5 text-sm">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Price: </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {priceData && Number.isFinite(priceData.price) ? `$${priceData.price.toFixed(2)}` : "—"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">24h Change: </span>
                  <span
                    className={
                      priceData && Number.isFinite(priceData.price_change_percentage_24h)
                        ? priceData.price_change_percentage_24h >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                        : "text-slate-500 dark:text-slate-400"
                    }
                  >
                    {priceData && Number.isFinite(priceData.price_change_percentage_24h)
                      ? `${priceData.price_change_percentage_24h >= 0 ? "+" : ""}${priceData.price_change_percentage_24h.toFixed(1)}%`
                      : "—"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">24h Volume: </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {priceData && Number.isFinite(priceData.volume_24h) ? `$${(priceData.volume_24h / 1e6).toFixed(1)}M` : "—"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Market Cap: </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {priceData && Number.isFinite(priceData.market_cap) ? `$${(priceData.market_cap / 1e9).toFixed(2)}B` : "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Link utili: sotto i tag, sopra i pulsanti */}
          {resolvedUsefulLinks && resolvedUsefulLinks.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {resolvedUsefulLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-200 dark:bg-white/5 dark:border dark:border-white/20 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/10 font-medium text-sm transition-colors"
                >
                  {link.label}
                  <svg className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={resolvedAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 border border-indigo-400/50 hover:opacity-90 text-white font-medium text-sm transition-opacity"
            >
              Apri {data.name}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {resolvedGuideUrl && (
              <a
                href={resolvedGuideUrl}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-slate-300 dark:border-indigo-400/30 dark:bg-indigo-500/20 dark:text-white text-slate-700 hover:bg-slate-50 dark:hover:bg-indigo-500/30 dark:hover:border-indigo-400/50 font-medium text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Guida Rapida
              </a>
            )}
          </div>
        </div>

        {/* Feature cards row (card interne come landing) */}
        <div className="p-6 md:p-8 border-b border-slate-200 dark:border-indigo-500/20">
          {isBlockchainProject ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BLOCKCHAIN_EXPLORER_CARDS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => {
                    setExplorerCategory(card.id);
                    setExplorerSearch("");
                    setExplorerSortKey("none");
                    setExplorerDefiSubCategory("all");
                    setExplorerNftSubCategory("collezione");
                    setExplorerOpen(true);
                  }}
                  className="rounded-xl border p-4 text-left bg-white dark:bg-slate-700/50 dark:border-white/5 border-slate-200 hover:border-indigo-400 dark:hover:border-indigo-400/60 transition-colors"
                >
                  <div className="text-2xl mb-2">{card.icon}</div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white">{card.label}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{card.subtitle}</p>
                  <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-blue-600 dark:text-blue-400">
                    Esplora progetti
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {resolvedFeatureCards.map((card, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedFeatureIndex(i)}
                  className={`rounded-xl border p-4 flex flex-col ${
                    card.icon === "gift"
                      ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                      : "bg-white dark:bg-slate-700/50 dark:border-white/5 border-slate-200"
                  } text-left hover:border-indigo-400 dark:hover:border-indigo-400/60 transition-colors`}
                >
                  <div className={card.icon === "gift" ? "text-amber-600 dark:text-amber-400" : "text-slate-600 dark:text-slate-400"}>
                    <FeatureIcon type={card.icon} />
                  </div>
                  <h3 className={`font-semibold mt-2 text-sm ${card.icon === "gift" ? "text-amber-900 dark:text-amber-100" : "text-slate-900 dark:text-white"}`}>
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 flex-1">{card.description}</p>
                  <span className="self-end mt-2 text-blue-600 dark:text-blue-400 text-xs font-medium inline-flex items-center gap-1">
                    Apri dettagli
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 dark:border-indigo-500/20 px-6 md:px-8">
          <nav className="flex flex-wrap gap-1 -mb-px">
            {[
              { id: "overview" as const, label: "Overview" },
              { id: "come-usarlo" as const, label: "Come usarlo" },
              { id: "contenuti" as const, label: "Contenuti" },
              { id: "dati-rischi" as const, label: "Dati & Rischi" },
              { id: "link-utili" as const, label: "Link Utili" },
              { id: "notizie" as const, label: "Notizie Rilevanti" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="p-6 md:p-8">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Overview</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">{resolvedDescription}</p>
              {data.overviewTags && data.overviewTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.overviewTags.map((t, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-white/10 dark:border dark:border-white/5 border-slate-200 text-xs font-medium text-slate-700 dark:text-slate-300"
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "come-usarlo" && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Come usarlo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {resolvedHowToSteps.map((step, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 dark:border-white/5 p-4 bg-white dark:bg-slate-700/50">
                    <div className="text-slate-500 dark:text-slate-400 mb-2 text-2xl">{(i + 1).toString().padStart(2, "0")}</div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{step.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{step.description}</p>
                    {step.href && (
                      <a href={step.href} className="mt-3 inline-block text-sm font-medium text-blue-600 dark:text-blue-400">
                        Approfondisci →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contenuti" && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Contenuti</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {CONTENT_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setContentFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      contentFilter === f.id
                        ? "bg-indigo-500/90 dark:bg-indigo-600 text-white"
                        : "bg-slate-100 dark:bg-white/10 dark:border dark:border-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredContentItems.map((item, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 dark:border-white/5 overflow-hidden bg-white dark:bg-slate-700/50">
                    <div className="aspect-video bg-slate-100 dark:bg-slate-700/50 dark:border dark:border-white/5 flex items-center justify-center">
                      {item.embedId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${item.embedId}`}
                          className="w-full h-full"
                          title={item.title}
                          allowFullScreen
                        />
                      ) : (
                        <div className="text-slate-400 text-4xl">📄</div>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2">{item.title}</h4>
                      <div className="flex flex-wrap gap-1.5 mt-2 text-xs text-slate-500 dark:text-slate-400">
                        {item.skillLevel && <span>{item.skillLevel}</span>}
                        {item.source && <span>By {item.source}</span>}
                        {item.tags?.includes("Verificato") && (
                          <span className="text-green-600 dark:text-green-400">Verificato</span>
                        )}
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedContentIndex(i)}
                          className="inline-block px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium"
                        >
                          {item.type === "video" ? "Guarda" : "Leggi"}
                        </button>
                        <BookmarkButton
                          url={`${pathname}#contenuti-${i}`}
                          title={`${data.name} - Contenuto: ${item.title}`}
                          type="content"
                          projectId={data.slug}
                          sectionId={`contenuti-${i}`}
                          showLabel
                          inactiveLabel="Salva Contenuto"
                          activeLabel="Contenuto Salvato"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "dati-rischi" && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Rischi & Dati</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {resolvedRiskCards.map((risk, i) => (
                  <div key={i} className="rounded-xl border border-amber-200 dark:border-amber-800 p-4 bg-amber-50/50 dark:bg-amber-900/10">
                    <div className="text-amber-600 dark:text-amber-400 text-xl font-bold mb-2">!</div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{risk.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{risk.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "link-utili" && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Link Utili</h2>
              <div className="flex flex-wrap gap-3">
                {resolvedUsefulLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/20 dark:bg-white/5 bg-white hover:bg-slate-50 dark:hover:bg-white/10 font-medium text-sm text-slate-800 dark:text-slate-200"
                  >
                    {link.label}
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notizie" && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Notizie Rilevanti</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Le notizie relative a questo progetto verranno mostrate qui.</p>
            </div>
          )}
        </div>
      </div>
      {selectedContentIndex !== null && resolvedContentItems[selectedContentIndex] && (
        <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-indigo-500/30 bg-[#141c45] text-white flex flex-col">
            <div className="px-5 py-4 border-b border-indigo-500/20 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base md:text-lg font-semibold">{resolvedContentItems[selectedContentIndex].title}</h3>
                <p className="text-xs text-slate-300">
                  {resolvedContentItems[selectedContentIndex].type === "video" ? "Video" : "Contenuto"} • {data.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedContentIndex(null)}
                className="px-3 py-1.5 rounded-lg border border-white/20 text-sm hover:bg-white/10"
              >
                Chiudi
              </button>
            </div>
            <div className="p-5 overflow-auto">
              {resolvedContentItems[selectedContentIndex].embedId ? (
                <div className="aspect-video rounded-xl overflow-hidden border border-indigo-500/20">
                  <iframe
                    src={`https://www.youtube.com/embed/${resolvedContentItems[selectedContentIndex].embedId}`}
                    className="w-full h-full"
                    title={resolvedContentItems[selectedContentIndex].title}
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="rounded-xl border border-indigo-500/20 bg-indigo-900/20 p-4">
                  <p className="text-sm text-slate-200">
                    Questo contenuto non ha embed interno. Aprilo nel link originale.
                  </p>
                  <a
                    href={resolvedContentItems[selectedContentIndex].href ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium"
                  >
                    Apri contenuto
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {selectedFeatureCard && selectedFeatureContent && (
        <div className="fixed inset-0 z-[82] bg-black/70 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-indigo-500/30 bg-[#141c45] text-white flex flex-col">
            <div className="px-5 py-4 border-b border-indigo-500/20 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-indigo-300">{selectedFeatureContent.subtitle}</p>
                <h3 className="text-lg md:text-xl font-semibold mt-1">{selectedFeatureCard.title}</h3>
                <p className="text-sm text-slate-300 mt-1">{selectedFeatureContent.objective}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFeatureIndex(null)}
                className="px-3 py-1.5 rounded-lg border border-white/20 text-sm hover:bg-white/10 shrink-0"
              >
                Chiudi
              </button>
            </div>
            <div className="p-5 overflow-auto space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <section className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                  <h4 className="font-semibold text-indigo-100">Checklist pre-esecuzione</h4>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-200">
                    {selectedFeatureContent.checklist.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-emerald-300">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                  <h4 className="font-semibold text-indigo-100">Errori comuni da evitare</h4>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-200">
                    {selectedFeatureContent.mistakes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-rose-300">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
              <section className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <h4 className="font-semibold text-indigo-100">Procedura consigliata</h4>
                <ol className="mt-2 space-y-2 text-sm text-slate-200">
                  {selectedFeatureContent.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/30 text-[11px] font-semibold text-indigo-100">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
              <section className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <h4 className="font-semibold text-indigo-100">KPI di controllo</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedFeatureContent.kpis.map((kpi) => (
                    <span key={kpi} className="rounded-lg border border-indigo-400/30 bg-indigo-800/40 px-2.5 py-1 text-xs text-indigo-100">
                      {kpi}
                    </span>
                  ))}
                </div>
              </section>
              <div className="flex flex-wrap justify-end gap-2 pt-1">
                {selectedFeatureContent.ctaHref && (
                  <a
                    href={selectedFeatureContent.ctaHref}
                    target={selectedFeatureContent.ctaHref.startsWith("http") ? "_blank" : undefined}
                    rel={selectedFeatureContent.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
                  >
                    {selectedFeatureContent.ctaLabel}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isBlockchainProject && explorerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="w-full max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-indigo-500/25 bg-[#171f49] text-white flex flex-col">
            <div className="px-5 py-4 border-b border-indigo-500/20 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {BLOCKCHAIN_EXPLORER_CARDS.find((c) => c.id === explorerCategory)?.label}
                </h3>
                <p className="text-xs text-slate-300">Seleziona un progetto dalla categoria</p>
              </div>
              <button
                type="button"
                onClick={() => setExplorerOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-white/20 text-sm hover:bg-white/10"
              >
                Chiudi
              </button>
            </div>

            <div className="px-5 py-4 border-b border-indigo-500/20">
              <div className="flex flex-wrap gap-2 mb-3">
                {BLOCKCHAIN_EXPLORER_CARDS.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => {
                      setExplorerCategory(card.id);
                      setExplorerSearch("");
                      setExplorerSortKey("none");
                      if (card.id !== "defi") setExplorerDefiSubCategory("all");
                      if (card.id !== "nft") setExplorerNftSubCategory("collezione");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      explorerCategory === card.id
                        ? "bg-indigo-500 text-white"
                        : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    {card.label}
                  </button>
                ))}
              </div>
              {explorerCategory === "defi" && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {DEFI_SUBCATEGORY_LABELS.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setExplorerDefiSubCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        explorerDefiSubCategory === cat.id
                          ? "bg-indigo-500 text-white"
                          : "bg-white/10 text-slate-300 hover:bg-white/20"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                <input
                  type="search"
                  value={explorerSearch}
                  onChange={(e) => setExplorerSearch(e.target.value)}
                  placeholder="Cerca progetto..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-indigo-400/30 bg-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              {explorerCategory === "nft" && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {NFT_SUBCATEGORY_LABELS.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setExplorerNftSubCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                        explorerNftSubCategory === cat.id
                          ? "bg-indigo-500 text-white"
                          : "bg-white/10 text-slate-300 hover:bg-white/20"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
              {explorerCategory === "defi" && (
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="text-xs text-slate-300">Ordina:</span>
                  <button
                    type="button"
                    onClick={() => setExplorerSortKey("mcap_desc")}
                    className={`px-2.5 py-1 rounded-md text-xs ${explorerSortKey === "mcap_desc" ? "bg-indigo-500 text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"}`}
                  >
                    Market Cap ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => setExplorerSortKey("mcap_asc")}
                    className={`px-2.5 py-1 rounded-md text-xs ${explorerSortKey === "mcap_asc" ? "bg-indigo-500 text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"}`}
                  >
                    Market Cap ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => setExplorerSortKey("tvl_desc")}
                    className={`px-2.5 py-1 rounded-md text-xs ${explorerSortKey === "tvl_desc" ? "bg-indigo-500 text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"}`}
                  >
                    TVL ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => setExplorerSortKey("tvl_asc")}
                    className={`px-2.5 py-1 rounded-md text-xs ${explorerSortKey === "tvl_asc" ? "bg-indigo-500 text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"}`}
                  >
                    TVL ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => setExplorerSortKey("none")}
                    className={`px-2.5 py-1 rounded-md text-xs ${explorerSortKey === "none" ? "bg-indigo-500 text-white" : "bg-white/10 text-slate-300 hover:bg-white/20"}`}
                  >
                    Nessuno
                  </button>
                </div>
              )}
            </div>

            <div className="p-5 overflow-auto">
              {explorerLoading ? (
                <p className="text-slate-300">Caricamento progetti...</p>
              ) : filteredExplorerProjects.length === 0 ? (
                <p className="text-slate-300">Nessun progetto trovato in questa categoria.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredExplorerProjects.map((project) => {
                    const macro = getProjectMacroCategory(project.id);
                    const href = getProjectHref(project.id, macro);
                    const logo = getProjectLogo(project.id);
                    return (
                      <Link
                        key={project.id}
                        href={href}
                        onClick={() => setExplorerOpen(false)}
                        className="rounded-xl border border-indigo-400/20 bg-indigo-900/25 p-4 hover:border-indigo-300/60 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                            {logo ? (
                              <Image src={logo} alt={project.name} width={32} height={32} className="object-contain" />
                            ) : (
                              <span className="text-sm font-semibold">{project.name.charAt(0).toUpperCase()}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm text-white truncate">{project.name}</p>
                            <p className="text-xs text-slate-400">{project.id}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2">
                          {project.description?.trim() || "Apri la pagina progetto per dettagli, link utili e contenuti."}
                        </p>
                        <div className="mt-3 pt-3 border-t border-indigo-400/20 space-y-1 text-xs text-slate-300">
                          <div>
                            Prezzo: {formatPrice((() => {
                              const cgId = getCoingeckoId(project.id);
                              return cgId ? explorerCgData[cgId]?.usd : null;
                            })())}
                          </div>
                          <div>
                            Market Cap: {formatCompactUsd((() => {
                              const cgId = getCoingeckoId(project.id);
                              return cgId ? explorerCgData[cgId]?.usd_market_cap : null;
                            })())}
                          </div>
                          <div>
                            TVL: {formatCompactUsd(DEFI_TVL_USD_BY_PROJECT_ID[project.id.toLowerCase()] ?? null)}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </MobileContainer>
  );
}
