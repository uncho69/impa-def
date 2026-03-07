"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Placeholder from "@/assets/placeholder.svg";
import btcIcon from "@/assets/bitcoin-icon.svg";
import ethIcon from "@/assets/ethereum-icon.svg";
import solIcon from "@/assets/solana-sol-logo.svg";
import arbIcon from "@/assets/arbitrum-arb-logo.svg";
import polIcon from "@/assets/polygon-matic-logo.svg";
import degIcon from "@/assets/degen-base-degen-logo.svg";
import basIcon from "@/assets/base-logo.svg";
import optIcon from "@/assets/optimism-ethereum-op-logo.svg";
import zorIcon from "@/assets/zora-logo.png";
import hlqIcon from "@/assets/hyperliquid-logo.png";
import sclIcon from "@/assets/Scroll-Logo.svg";
import berIcon from "@/assets/berachain-logo.png";
import zksIcon from "@/assets/zkSync-logo.png";
import linIcon from "@/assets/linea-logo.svg";
import layIcon from "@/assets/layer3-logo.png";
import hlaIcon from "@/assets/hyperlane-logo.svg";
import blaIcon from "@/assets/blast-logo.webp";
import avaIcon from "@/assets/avalanche-avax-logo.svg";
import abstractLogo from "@/assets/abstract-logo.jpg";
import inkLogo from "@/assets/ink-logo.jpg";
import type { StaticImageData } from "next/image";
import { IntroduzioneBlockchainModal } from "@/components/IntroduzioneBlockchainModal";

const QUICK_ACTIONS = [
  { title: "Introduzione alle Blockchain", icon: "📚", isModal: true },
  { title: "Guida Blockchain Airdrops", icon: "🎁", href: "/airdrops" },
  { title: "Notizie Blockchain", icon: "📰", href: "/news" },
];

/** Id delle blockchain in questa pagina con tag airdrop (Hyperliquid, Base, L2, etc.) */
const AIRDROP_BLOCKCHAIN_IDS = new Set([
  "hyperliquid", "base", "optimism", "arbitrum", "scroll", "zksync", "linea",
  "blast", "berachain", "degen", "layer3", "hyperlane", "polygon_zkEVM", "zora",
  "abstract", "ink",
]);

function getBlockchainId(b: { href: string }): string {
  return b.href.split("/").filter(Boolean).pop() ?? "";
}

type CoinGeckoRecord = Record<string, { usd?: number; usd_market_cap?: number }>;
type SortMcap = "none" | "asc" | "desc";

const BLOCKCHAINS: Array<{
  name: string;
  description: string;
  icon: StaticImageData;
  href: string;
  ticker: string;
  coingeckoId: string | null;
  twitterUrl: string;
  websiteUrl: string;
}> = [
  { name: "Bitcoin", description: "La prima criptovaluta e rete decentralizzata.", icon: btcIcon, href: "/blockchain/bitcoin", ticker: "BTC", coingeckoId: "bitcoin", websiteUrl: "https://bitcoin.org", twitterUrl: "https://x.com/bitcoin" },
  { name: "Ethereum", description: "Smart contract e ecosistema DeFi e L2.", icon: ethIcon, href: "/blockchain/ethereum", ticker: "ETH", coingeckoId: "ethereum", websiteUrl: "https://ethereum.org/it/", twitterUrl: "https://x.com/ethereum" },
  { name: "Solana", description: "Alta velocità e bassi costi per dApp e NFT.", icon: solIcon, href: "/blockchain/solana", ticker: "SOL", coingeckoId: "solana", websiteUrl: "https://solana.com/", twitterUrl: "https://x.com/solana" },
  { name: "Arbitrum", description: "L2 Ethereum con rollup optimistic.", icon: arbIcon, href: "/blockchain/arbitrum", ticker: "ARB", coingeckoId: "arbitrum", websiteUrl: "https://arbitrum.foundation/", twitterUrl: "https://x.com/arbitrum" },
  { name: "Polygon", description: "Scalabilità Ethereum e sidechain.", icon: polIcon, href: "/blockchain/polygon", ticker: "POL", coingeckoId: "polygon-ecosystem-token", websiteUrl: "https://polygon.technology/", twitterUrl: "https://x.com/0xPolygon" },
  { name: "Base", description: "L2 di Coinbase su Ethereum.", icon: basIcon, href: "/blockchain/base", ticker: "—", coingeckoId: null, websiteUrl: "https://www.base.org/", twitterUrl: "https://x.com/base" },
  { name: "Optimism", description: "Layer 2 optimistic rollup per Ethereum.", icon: optIcon, href: "/blockchain/optimism", ticker: "OP", coingeckoId: "optimism", websiteUrl: "https://www.optimism.io/", twitterUrl: "https://twitter.com/Optimism" },
  { name: "Zora", description: "Rete per creatori e NFT.", icon: zorIcon, href: "/blockchain/zora", ticker: "ZORA", coingeckoId: "zora", websiteUrl: "https://zora.co/", twitterUrl: "https://x.com/ourZORA" },
  { name: "Sanko", description: "Piattaforma gaming e community.", icon: Placeholder, href: "/blockchain/sanko", ticker: "—", coingeckoId: null, websiteUrl: "https://sanko.xyz/", twitterUrl: "https://x.com/SankoGameCorp" },
  { name: "Hyperliquid", description: "Perpetuals on-chain e trading DeFi.", icon: hlqIcon, href: "/defi/hyperliquid", ticker: "HYPE", coingeckoId: "hyperliquid", websiteUrl: "https://hyperliquid.xyz/", twitterUrl: "https://twitter.com/HyperliquidX" },
  { name: "Scroll", description: "L2 Ethereum con ZK rollup.", icon: sclIcon, href: "/blockchain/scroll", ticker: "—", coingeckoId: null, websiteUrl: "https://scroll.io/", twitterUrl: "https://x.com/Scroll_ZKP" },
  { name: "Berachain", description: "L1 orientata a DeFi e liquidità.", icon: berIcon, href: "/blockchain/berachain", ticker: "BERA", coingeckoId: "berachain-berachain", websiteUrl: "https://www.berachain.com/", twitterUrl: "https://x.com/berachain" },
  { name: "zkSync", description: "L2 Ethereum con zero-knowledge.", icon: zksIcon, href: "/blockchain/zksync", ticker: "ZK", coingeckoId: "zksync", websiteUrl: "https://zksync.io/", twitterUrl: "https://x.com/zksync" },
  { name: "Linea", description: "L2 ZK di ConsenSys su Ethereum.", icon: linIcon, href: "/blockchain/linea", ticker: "LINEA", coingeckoId: "linea", websiteUrl: "https://linea.build/", twitterUrl: "https://x.com/LineaBuild" },
  { name: "Layer3", description: "Quest e incentivi multichain.", icon: layIcon, href: "/blockchain/layer3", ticker: "—", coingeckoId: null, websiteUrl: "https://layer3.xyz/", twitterUrl: "https://x.com/layer3xyz" },
  { name: "Hyperlane", description: "Interoperabilità e messaggi cross-chain.", icon: hlaIcon, href: "/blockchain/hyperlane", ticker: "—", coingeckoId: null, websiteUrl: "https://www.hyperlane.xyz/", twitterUrl: "https://x.com/hyperlane" },
  { name: "Polygon zkEVM", description: "EVM equivalente ZK su Polygon.", icon: polIcon, href: "/blockchain/polygon_zkEVM", ticker: "—", coingeckoId: null, websiteUrl: "https://polygon.technology/", twitterUrl: "https://x.com/0xpolygondefi" },
  { name: "Degen", description: "Chain e community su Base.", icon: degIcon, href: "/blockchain/degen", ticker: "DEGEN", coingeckoId: "degen-base", websiteUrl: "https://degen.tips", twitterUrl: "https://x.com/degentokenbase" },
  { name: "Blast", description: "L2 con yield nativo su ETH e stablecoin.", icon: blaIcon, href: "/blockchain/blast", ticker: "BLAST", coingeckoId: "blast", websiteUrl: "https://blast.io", twitterUrl: "https://x.com/Blast_L2" },
  { name: "Avalanche", description: "L1 veloce con subnet e DeFi.", icon: avaIcon, href: "/blockchain/avalanche", ticker: "AVAX", coingeckoId: "avalanche-2", websiteUrl: "https://www.avax.network/", twitterUrl: "https://x.com/avax" },
  { name: "Abstract", description: "Blockchain Layer-2 su Ethereum con ZK rollup per Web3 più semplice ed economico.", icon: abstractLogo, href: "/blockchain/abstract", ticker: "—", coingeckoId: "abstract", websiteUrl: "https://www.abs.xyz/", twitterUrl: "https://x.com/AbstractChain" },
  { name: "Ink", description: "Layer 2 sulla Superchain di Optimism, lanciata da Kraken per scalare Ethereum e DeFi.", icon: inkLogo, href: "/blockchain/ink", ticker: "—", coingeckoId: "ink", websiteUrl: "https://inkonchain.com/", twitterUrl: "https://x.com/inkonchain" },
  { name: "HyperEVM", description: "Componente di Hyperliquid per smart contract in stile Ethereum sulla sua blockchain.", icon: hlqIcon, href: "/blockchain/hyperevm", ticker: "—", coingeckoId: null, websiteUrl: "https://hyperfoundation.org/", twitterUrl: "https://x.com/HyperliquidX" },
];

export default function BlockchainPage() {
  const [search, setSearch] = useState("");
  const [cgData, setCgData] = useState<CoinGeckoRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortByMcap, setSortByMcap] = useState<SortMcap>("none");
  const [airdropOnly, setAirdropOnly] = useState(false);
  const [introBlockchainOpen, setIntroBlockchainOpen] = useState(false);

  useEffect(() => {
    const ids = [...new Set(BLOCKCHAINS.map((b) => b.coingeckoId).filter(Boolean))] as string[];
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

  const filtered = useMemo(() => {
    let list = BLOCKCHAINS;
    const q = search.trim().toLowerCase();
    if (q) list = list.filter((b) => b.name.toLowerCase().includes(q) || b.ticker.toLowerCase().includes(q));
    if (airdropOnly) list = list.filter((b) => AIRDROP_BLOCKCHAIN_IDS.has(getBlockchainId(b)));
    if (sortByMcap !== "none") {
      list = [...list].sort((a, b) => {
        const mcapA = (a.coingeckoId && cgData?.[a.coingeckoId]?.usd_market_cap) ?? null;
        const mcapB = (b.coingeckoId && cgData?.[b.coingeckoId]?.usd_market_cap) ?? null;
        const numA = mcapA ?? (sortByMcap === "desc" ? -1 : Infinity);
        const numB = mcapB ?? (sortByMcap === "desc" ? -1 : Infinity);
        return sortByMcap === "desc" ? numB - numA : numA - numB;
      });
    }
    return list;
  }, [search, airdropOnly, sortByMcap, cgData]);

  const formatPrice = (n: number) =>
    n > 0 ? `$${n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}` : "—";
  const formatMc = (n: number) =>
    n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : n > 0 ? `$${n.toLocaleString()}` : "—";

  return (
    <>
      {/* Header: stesso stile della pagina DeFi */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Blockchain</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Scopri le reti e i protocolli che alimentano il Web3
          </p>
        </div>
        <div className="flex flex-wrap justify-end items-center gap-2 sm:ml-auto">
          {QUICK_ACTIONS.map((a) =>
            "isModal" in a && a.isModal ? (
              <button
                key={a.title}
                type="button"
                onClick={() => setIntroBlockchainOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors shrink-0 border-white/20 bg-white/5 hover:bg-white/10 text-white"
              >
                <span>{a.icon}</span>
                <span>{a.title}</span>
              </button>
            ) : (
              <Link
                key={(a as { href: string }).href + a.title}
                href={(a as { href: string }).href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-colors shrink-0 ${
                  a.title === "Notizie Blockchain"
                    ? "font-semibold bg-amber-400 hover:bg-amber-500 text-slate-900"
                    : "font-medium border border-white/20 bg-white/5 hover:bg-white/10 text-white"
                }`}
              >
                <span>{a.icon}</span>
                <span>{a.title}</span>
              </Link>
            )
          )}
        </div>
      </div>

      <IntroduzioneBlockchainModal isOpen={introBlockchainOpen} onClose={() => setIntroBlockchainOpen(false)} />

      {/* Search: stesso stile DeFi */}
      <div className="relative mb-4 max-w-2xl">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        <input
          type="search"
          placeholder="Cerca blockchain"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/40 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Filtri: ordinamento market cap + Airdrop */}
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
        <button
          type="button"
          onClick={() => setAirdropOnly((v) => !v)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            airdropOnly
              ? "bg-emerald-600 text-white dark:bg-emerald-500"
              : "border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-indigo-800/50"
          }`}
        >
          <span>🎁</span>
          Airdrop
        </button>
      </div>

      {/* Grid: stesse card della pagina DeFi */}
      <main className="flex-1 min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((b) => {
            const price = b.coingeckoId && cgData?.[b.coingeckoId]?.usd;
            const mcap = b.coingeckoId && cgData?.[b.coingeckoId]?.usd_market_cap;
            const tickerDisplay = b.ticker === "—" ? "—" : b.ticker;
            const priceDisplay = loading && b.coingeckoId ? "—" : price != null ? formatPrice(price) : "—";
            const mcapDisplay = loading && b.coingeckoId ? "—" : mcap != null ? formatMc(mcap) : "—";
            return (
              <Link
                key={b.href + b.name}
                href={b.href}
                className="group block p-5 rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-indigo-800/40 flex items-center justify-center overflow-hidden shrink-0">
                      <Image src={b.icon} alt={b.name} width={32} height={32} className="object-contain" />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white truncate">{b.name}</span>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{b.description}</p>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 space-y-1">
                  <div>Token: {tickerDisplay}</div>
                  <div>Prezzo: {priceDisplay}</div>
                  <div>Market Cap: {mcapDisplay}</div>
                  <div>TVL: —</div>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-indigo-500/20" onClick={(e) => e.stopPropagation()}>
                  <a href={b.twitterUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors" title="X (Twitter)" aria-label="X (Twitter)">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href={b.websiteUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors" title="Sito web" aria-label="Sito web">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                  </a>
                </div>
              </Link>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-12 text-slate-500 dark:text-slate-400">Nessuna blockchain trovata.</p>
        )}
      </main>
    </>
  );
}
