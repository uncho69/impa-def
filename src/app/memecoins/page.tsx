"use client";

import { useEffect, useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { IntroduzioneMemecoinModal } from "@/components/IntroduzioneMemecoinModal";

import floppaIcon from "@/assets/floppa-icon.png";
import dogwifhatIcon from "@/assets/dogwifhat-icon.png";
import sharkcatIcon from "@/assets/sharkcat-icon.png";
import kenidyIcon from "@/assets/kenidy-icon.png";
import bodenIcon from "@/assets/boden-icon.png";
import trempIcon from "@/assets/tremp-icon.png";
import higherIcon from "@/assets/higher-icon.png";
import tn100xIcon from "@/assets/tn100x-icon.png";
import degenIcon from "@/assets/degen-icon.png";
import retardioIcon from "@/assets/retardio-icon.png";
import apuIcon from "@/assets/apu-icon.png";
import pepeIcon from "@/assets/pepe-icon.png";
import dogecoinIcon from "@/assets/dogecoin-icon.png";

type MemecoinItem = {
  title: string;
  image: StaticImageData;
  website: string;
  xProfile: string;
  tokenNFT: string;
  coingeckoId: string | null;
  description: string;
  chain: "solana" | "ethereum" | "base" | "multi";
};

const CHAIN_FILTERS = [
  { id: "all", label: "Tutti" },
  { id: "solana", label: "Solana" },
  { id: "ethereum", label: "Ethereum" },
  { id: "base", label: "Base" },
  { id: "multi", label: "Multi-chain" },
] as const;

type ChainFilterId = (typeof CHAIN_FILTERS)[number]["id"];

const MEMECOINS: MemecoinItem[] = [
  {
    title: "Floppa",
    image: floppaIcon,
    website: "https://floppa.wtf/",
    xProfile: "https://x.com/floppa/",
    tokenNFT: "https://dexscreener.com/base/0x6caa62e48a2d9f3a8eacaadca2462ed5dfe0c685",
    coingeckoId: "floppa",
    description: "Memecoin community-driven su Base con narrativa virale e volume speculativo.",
    chain: "base",
  },
  {
    title: "Dogwifhat (WIF)",
    image: dogwifhatIcon,
    website: "https://dogwifcoin.org",
    xProfile: "https://x.com/dogwifcoin",
    tokenNFT: "https://www.coingecko.com/en/coins/dogwifhat",
    coingeckoId: "dogwifcoin",
    description: "Uno dei memecoin piu noti su Solana, guidato da hype social e community.",
    chain: "solana",
  },
  {
    title: "Shark Cat",
    image: sharkcatIcon,
    website: "https://sharkcatsolana.com",
    xProfile: "https://x.com/SharkCatSolana",
    tokenNFT: "https://www.coingecko.com/en/coins/shark-cat",
    coingeckoId: "shark-cat",
    description: "Token meme su Solana nato da branding ironico e forte presenza online.",
    chain: "solana",
  },
  {
    title: "Kenidy",
    image: kenidyIcon,
    website: "https://kenidy.io",
    xProfile: "https://x.com/kenidy_on_sol",
    tokenNFT: "https://www.coingecko.com/en/coins/ruburt-f-kenidy-jr",
    coingeckoId: "ruburt-f-kenidy-jr",
    description: "Memecoin satirico su Solana con community molto attiva nei social.",
    chain: "solana",
  },
  {
    title: "Boden",
    image: bodenIcon,
    website: "https://boden4pres.com",
    xProfile: "https://x.com/boden4pres",
    tokenNFT: "https://www.coingecko.com/en/coins/jeo-boden",
    coingeckoId: "jeo-boden",
    description: "Token meme politico, ad alta volatilita e fortemente sentiment-driven.",
    chain: "solana",
  },
  {
    title: "Tremp",
    image: trempIcon,
    website: "https://tremp.xyz",
    xProfile: "https://x.com/dolandtremp_sol",
    tokenNFT: "https://www.coingecko.com/en/coins/doland-tremp",
    coingeckoId: "doland-tremp",
    description: "Memecoin a tema politico su Solana con movimenti di prezzo molto rapidi.",
    chain: "solana",
  },
  {
    title: "Higher",
    image: higherIcon,
    website: "https://www.aimhigher.net/",
    xProfile: "https://x.com/higheronchain",
    tokenNFT: "https://www.coingecko.com/en/coins/higher",
    coingeckoId: "higher",
    description: "Progetto meme su Base orientato alla narrativa community e cultura internet.",
    chain: "base",
  },
  {
    title: "TN100X",
    image: tn100xIcon,
    website: "https://ham.fun/",
    xProfile: "https://x.com/HamOnWarpcast",
    tokenNFT: "https://www.coingecko.com/en/coins/tn100x",
    coingeckoId: "tn100x",
    description: "Token meme su Base ad alta speculazione, molto esposto a trend social.",
    chain: "base",
  },
  {
    title: "Degen",
    image: degenIcon,
    website: "https://degen.tips",
    xProfile: "https://x.com/degenbase",
    tokenNFT: "https://www.coingecko.com/en/coins/degen-base",
    coingeckoId: "degen-base",
    description: "Memecoin di riferimento nell'ecosistema Farcaster/Base, con forte community.",
    chain: "base",
  },
  {
    title: "Retardio",
    image: retardioIcon,
    website: "https://retardio.xyz/",
    xProfile: "https://x.com/retardiosolana",
    tokenNFT: "https://www.coingecko.com/en/coins/retardio",
    coingeckoId: "retardio",
    description: "Token meme Solana con volatilita elevata e dinamica tipica da hype cycle.",
    chain: "solana",
  },
  {
    title: "Apu",
    image: apuIcon,
    website: "https://apu.com/",
    xProfile: "https://x.com/ApusCoin",
    tokenNFT: "https://www.coingecko.com/en/coins/apu-apustaja",
    coingeckoId: "apu-apustaja",
    description: "Memecoin nato dal meme Apu, con community globale e forte esposizione social.",
    chain: "ethereum",
  },
  {
    title: "Pepe (PEPE)",
    image: pepeIcon,
    website: "https://www.pepe.vip/",
    xProfile: "https://x.com/pepecoineth",
    tokenNFT: "https://www.coingecko.com/en/coins/pepe",
    coingeckoId: "pepe",
    description: "Tra i memecoin piu iconici su Ethereum, altissima liquidita e volatilita.",
    chain: "ethereum",
  },
  {
    title: "Dogecoin",
    image: dogecoinIcon,
    website: "https://dogecoin.com/",
    xProfile: "https://x.com/dogecoin",
    tokenNFT: "https://www.coingecko.com/en/coins/dogecoin",
    coingeckoId: "dogecoin",
    description: "Il memecoin storico per eccellenza, nato come meme e diventato mainstream.",
    chain: "multi",
  },
];

type CoinGeckoRecord = Record<string, { usd?: number; usd_market_cap?: number }>;
type SortMcap = "none" | "asc" | "desc";

export default function MemecoinsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<ChainFilterId>("all");
  const [introOpen, setIntroOpen] = useState(false);
  const [cgData, setCgData] = useState<CoinGeckoRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortByMcap, setSortByMcap] = useState<SortMcap>("none");

  useEffect(() => {
    const ids = [...new Set(MEMECOINS.map((m) => m.coingeckoId).filter(Boolean))] as string[];
    if (ids.length === 0) {
      setLoading(false);
      return;
    }
    fetch(`/api/coingecko?ids=${ids.join(",")}`)
      .then((r) => (r.ok ? r.json() : {}))
      .then(setCgData)
      .catch(() => setCgData(null))
      .finally(() => setLoading(false));
  }, []);

  const filteredMemecoins = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = MEMECOINS.filter((coin) => {
      const matchesFilter = activeFilter === "all" ? true : coin.chain === activeFilter;
      const matchesSearch =
        q.length === 0 ||
        coin.title.toLowerCase().includes(q) ||
        coin.description.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });

    if (sortByMcap === "none") return base;

    return [...base].sort((a, b) => {
      const mcapA = (a.coingeckoId && cgData?.[a.coingeckoId]?.usd_market_cap) ?? null;
      const mcapB = (b.coingeckoId && cgData?.[b.coingeckoId]?.usd_market_cap) ?? null;
      const numA = mcapA ?? (sortByMcap === "desc" ? -1 : Infinity);
      const numB = mcapB ?? (sortByMcap === "desc" ? -1 : Infinity);
      return sortByMcap === "desc" ? numB - numA : numA - numB;
    });
  }, [search, activeFilter, sortByMcap, cgData]);

  const formatPrice = (n: number) =>
    n > 0 ? `$${n.toLocaleString("en-US", { maximumFractionDigits: 6 })}` : "—";
  const formatMc = (n: number) =>
    n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : n > 0 ? `$${n.toLocaleString()}` : "—";

  return (
    <div className="relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Memecoins</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Criptovalute basate su meme e cultura internet
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIntroOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors shrink-0 border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            <span>🎭</span>
            <span>Intro ai Memecoin</span>
          </button>
          <Link
            href="/news/memecoins"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-slate-900 transition-colors"
          >
            <span>📰</span>
            <span>Notizie</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {CHAIN_FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                : "bg-white dark:bg-indigo-900/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-indigo-800/50 border border-slate-200 dark:border-indigo-500/20"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="relative mb-8 max-w-2xl">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        <input
          type="search"
          placeholder="Cerca memecoin"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/40 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Ordina per market cap:</span>
        <div className="flex gap-2">
          {(["none", "asc", "desc"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSortByMcap(opt)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sortByMcap === opt
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-indigo-800/50"
              }`}
            >
              {opt === "none" ? "Nessuno" : opt === "asc" ? "Crescente" : "Decrescente"}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredMemecoins.map((coin) => (
            <div
              key={coin.title}
              className="rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-indigo-800/40 flex items-center justify-center overflow-hidden shrink-0">
                    <Image src={coin.image} alt={coin.title} width={32} height={32} className="object-contain" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white truncate">{coin.title}</span>
                </div>
                <span className="shrink-0 px-2 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-[11px] font-medium whitespace-nowrap">
                  Memecoin
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-3">{coin.description}</p>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 space-y-1">
                <div>
                  Prezzo:{" "}
                  {loading || !coin.coingeckoId
                    ? "—"
                    : cgData?.[coin.coingeckoId]?.usd != null
                      ? formatPrice(cgData[coin.coingeckoId]!.usd!)
                      : "—"}
                </div>
                <div>
                  Market Cap:{" "}
                  {loading || !coin.coingeckoId
                    ? "—"
                    : cgData?.[coin.coingeckoId]?.usd_market_cap != null
                      ? formatMc(cgData[coin.coingeckoId]!.usd_market_cap!)
                      : "—"}
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-200 dark:border-slate-600">
                <a
                  href={coin.xProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors"
                  title="X (Twitter)"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a
                  href={coin.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors"
                  title="Sito web"
                  aria-label="Sito web"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                </a>
                <a
                  href={coin.tokenNFT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors"
                  title="Token"
                  aria-label="Token"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 1v22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H6" /></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        {filteredMemecoins.length === 0 && (
          <p className="text-center py-12 text-slate-500 dark:text-slate-400">
            Nessun memecoin trovato per i filtri selezionati.
          </p>
        )}
      </main>

      <IntroduzioneMemecoinModal isOpen={introOpen} onClose={() => setIntroOpen(false)} />
    </div>
  );
}

