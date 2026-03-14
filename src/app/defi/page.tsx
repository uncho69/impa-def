"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BasiDeFiModal } from "@/components/BasiDeFiModal";
import { BookmarkButton } from "@/components/bookmarks/BookmarkButton";
import Placeholder from "@/assets/placeholder.svg";
import hyperliquidIcon from "@/assets/hyperliquid-icon.png";
import uniswapIcon from "@/assets/uniswap-icon.png";
import jumperIcon from "@/assets/jumper-logo.png";
import camelotIcon from "@/assets/camelot-logo.png";
import curveIcon from "@/assets/curve-logo.png";
import stargateIcon from "@/assets/stargate-logo.png";
import debridgeIcon from "@/assets/debridge-logo.png";
import compoundIcon from "@/assets/compound-logo.png";
import jupiterIcon from "@/assets/jupiter-logo.png";
import raydiumIcon from "@/assets/raydium-logo.svg";
import balancerIcon from "@/assets/balancer-logo.png";
import syncswapIcon from "@/assets/syncswap-logo.png";
import yearnIcon from "@/assets/yearnfinance-logo.png";
import lidoIcon from "@/assets/lidofinance-logo.png";
import layerzeroIcon from "@/assets/layerzero-logo.png";
import orbiterIcon from "@/assets/orbiterfinance-icon.png";
import usdcIcon from "@/assets/usdc-logo.svg";
import usdtIcon from "@/assets/usdt-logo.svg";
import defillamaIcon from "@/assets/defillama-logo.png";
import deriveIcon from "@/assets/derive-logo.png";
import ryskIcon from "@/assets/rysk-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const CATEGORIES = [
  { id: "dex", label: "DEX" },
  { id: "lending", label: "Lending" },
  { id: "yield", label: "Yield" },
  { id: "derivatives", label: "Derivatives" },
  { id: "bridge", label: "Bridge" },
  { id: "stablecoins", label: "Stablecoins" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const PROTOCOLS = [
  { name: "Uniswap", description: "DEX leader su Ethereum e L2 per swap e liquidity.", icon: uniswapIcon, href: "/defi/uniswap", category: "dex" as CategoryId, token: "UNI", price: "$12.40", marketCap: "$7.2B", airdropPotential: false, twitterUrl: "https://x.com/Uniswap", websiteUrl: "https://uniswap.org", contractAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984" },
  { name: "Aave", description: "Prestiti e borrowing decentralizzati su più reti.", icon: Placeholder, href: "/defi/aave", category: "lending" as CategoryId, token: "AAVE", price: "$285", marketCap: "$4.1B", airdropPotential: false, twitterUrl: "https://x.com/AaveAave", websiteUrl: "https://aave.com", contractAddress: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9" },
  { name: "Hyperliquid", description: "Perpetuals on-chain e trading con potenziale airdrop.", icon: hyperliquidIcon, href: "/defi/hyperliquid", category: "dex" as CategoryId, token: "HYPE", price: "$18.20", marketCap: "$3.5B", airdropPotential: true, twitterUrl: "https://x.com/HyperliquidX", websiteUrl: "https://hyperliquid.xyz", contractAddress: "0xf4b0387084f4b2c4d7266a2c7d1a7f0c2e3d4c5b" },
  { name: "Derive", description: "Piattaforma DeFi per trading di derivati on-chain con focus su perpetual e opzioni.", icon: deriveIcon, href: "/defi/derive", category: "derivatives" as CategoryId, token: "DRV", price: "—", marketCap: "—", airdropPotential: false, twitterUrl: "https://x.com/derivexyz", websiteUrl: "https://www.derive.xyz", contractAddress: "" },
  { name: "Rysk", description: "Protocollo DeFi per strategie su opzioni on-chain con rendimento da premium.", icon: ryskIcon, href: "/defi/rysk", category: "derivatives" as CategoryId, token: "—", price: "—", marketCap: "—", airdropPotential: false, twitterUrl: "https://x.com/ryskfinance", websiteUrl: "https://app.rysk.finance", contractAddress: "" },
  { name: "Stargate", description: "Bridge e trasferimenti cross-chain con LayerZero.", icon: stargateIcon, href: "/defi/stargate", category: "bridge" as CategoryId, token: "STG", price: "$0.82", marketCap: "$168M", airdropPotential: false, twitterUrl: "https://x.com/StargateFinance", websiteUrl: "https://stargate.finance", contractAddress: "0xaf5191b0de278c7286d6c7cc6ab6bb8a4ba2a6b8" },
  { name: "Jumper", description: "Swap e bridge multi-chain in un’unica interfaccia.", icon: jumperIcon, href: "/defi/jumper", category: "bridge" as CategoryId, token: "—", price: "—", marketCap: "—", airdropPotential: true, twitterUrl: "https://x.com/JumperExchange", websiteUrl: "https://jumper.exchange", contractAddress: "" },
  { name: "deBridge", description: "Bridge e messaggeria cross-chain per asset e dati.", icon: debridgeIcon, href: "/defi/debridge", category: "bridge" as CategoryId, token: "—", price: "—", marketCap: "—", airdropPotential: false, twitterUrl: "https://x.com/deBridgeFinance", websiteUrl: "https://debridge.finance", contractAddress: "" },
  { name: "Curve", description: "DEX specializzato in stablecoin e curve di liquidità.", icon: curveIcon, href: "/defi/curve", category: "dex" as CategoryId, token: "CRV", price: "$0.45", marketCap: "$485M", airdropPotential: false, twitterUrl: "https://x.com/CurveFinance", websiteUrl: "https://curve.fi", contractAddress: "0xD533a949740bb3306d119CC777fa900bA034cd52" },
  { name: "Compound", description: "Lending e borrowing con algoritmi sui tassi.", icon: compoundIcon, href: "/defi/compound", category: "lending" as CategoryId, token: "COMP", price: "$52.10", marketCap: "$418M", airdropPotential: false, twitterUrl: "https://x.com/compoundfinance", websiteUrl: "https://compound.finance", contractAddress: "0xc00e94Cb662C3520282E6f5717214004A7f26888" },
  { name: "Jupiter", description: "Aggregatore DEX su Solana per swap e route ottimali.", icon: jupiterIcon, href: "/defi/jupiter", category: "dex" as CategoryId, token: "JUP", price: "$0.92", marketCap: "$1.2B", airdropPotential: false, twitterUrl: "https://x.com/JupiterExchange", websiteUrl: "https://jup.ag", contractAddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN" },
  { name: "Raydium", description: "DEX e AMM su Solana con pool concentrati.", icon: raydiumIcon, href: "/defi/raydium", category: "dex" as CategoryId, token: "RAY", price: "$1.85", marketCap: "$485M", airdropPotential: false, twitterUrl: "https://x.com/RaydiumProtocol", websiteUrl: "https://raydium.io", contractAddress: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R" },
  { name: "Balancer", description: "AMM con pool configurabili e pesi dinamici.", icon: balancerIcon, href: "/defi/balancer", category: "dex" as CategoryId, token: "BAL", price: "$3.20", marketCap: "$182M", airdropPotential: false, twitterUrl: "https://x.com/Balancer", websiteUrl: "https://balancer.fi", contractAddress: "0xba100000625a3754423978a60c9317c58a424e3D" },
  { name: "SyncSwap", description: "DEX nativo su zkSync, Linea e Scroll.", icon: syncswapIcon, href: "/defi/syncswap", category: "dex" as CategoryId, token: "—", price: "—", marketCap: "—", airdropPotential: false, twitterUrl: "https://x.com/syncswap", websiteUrl: "https://syncswap.xyz", contractAddress: "" },
  { name: "Yearn Finance", description: "Aggregatore di yield e strategie automatizzate.", icon: yearnIcon, href: "/defi/yearn", category: "yield" as CategoryId, token: "YFI", price: "$6.420", marketCap: "$214M", airdropPotential: false, twitterUrl: "https://x.com/yearnfi", websiteUrl: "https://yearn.fi", contractAddress: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e" },
  { name: "Lido Finance", description: "Liquid staking per ETH e SOL con token staked.", icon: lidoIcon, href: "/defi/lido", category: "yield" as CategoryId, token: "LDO", price: "$1.95", marketCap: "$1.8B", airdropPotential: false, twitterUrl: "https://x.com/LidoFinance", websiteUrl: "https://lido.fi", contractAddress: "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32" },
  { name: "LayerZero", description: "Protocollo di interoperabilità cross-chain.", icon: layerzeroIcon, href: "/defi/layerzero", category: "bridge" as CategoryId, token: "ZRO", price: "$1.12", marketCap: "$—", airdropPotential: false, twitterUrl: "https://x.com/LayerZero_Labs", websiteUrl: "https://layerzero.network", contractAddress: "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32" },
  { name: "Camelot", description: "DEX su Arbitrum con incentivi e pool dinamici.", icon: camelotIcon, href: "/defi/camelot", category: "dex" as CategoryId, token: "GRAIL", price: "$0.28", marketCap: "$—", airdropPotential: false, twitterUrl: "https://x.com/CamelotDEX", websiteUrl: "https://camelot.exchange", contractAddress: "0x3d9907F9a368ad0a51Be0f7D4EcC2e09567f8D9e" },
  { name: "Orbiter Finance", description: "Bridge veloce tra Ethereum, L2 e rollup.", icon: orbiterIcon, href: "/defi/orbiter", category: "bridge" as CategoryId, token: "—", price: "—", marketCap: "—", airdropPotential: false, twitterUrl: "https://x.com/Orbiter_Finance", websiteUrl: "https://orbiter.finance", contractAddress: "" },
  { name: "LlamaSwap", description: "Aggregatore swap di DeFiLlama per trovare route efficienti tra DEX e reti diverse.", icon: defillamaIcon, href: "/defi/llamaswap", category: "dex" as CategoryId, token: "—", price: "—", marketCap: "—", airdropPotential: false, twitterUrl: "https://x.com/DefiLlama", websiteUrl: "https://swap.defillama.com/?chain=ethereum&from=0x0000000000000000000000000000000000000000&tab=swap", contractAddress: "" },
  { name: "USDC", description: "Stablecoin fiat-collateralizzata per pagamenti, tesoreria e operatività DeFi.", icon: usdcIcon, href: "/defi/usdc", category: "stablecoins" as CategoryId, token: "USDC", price: "$1.00", marketCap: "$62B", airdropPotential: false, twitterUrl: "https://x.com/circle", websiteUrl: "https://www.circle.com/usdc", contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
  { name: "USDT", description: "Stablecoin ancorata al dollaro, usata per trading e liquidità globale.", icon: usdtIcon, href: "/defi/usdt", category: "stablecoins" as CategoryId, token: "USDT", price: "$1.00", marketCap: "$140B", airdropPotential: false, twitterUrl: "https://x.com/Tether_to", websiteUrl: "https://tether.to", contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
];

const RECOMMENDED_PATHS = [
  { title: "Principianti", icon: "🔗", desc: "Inizia facile.", href: "/manuale" },
  { title: "Yield Farming", icon: "💰", desc: "Guadagna rendimenti.", href: "/defi" },
  { title: "Avanzato", icon: "⚙️", desc: "Strategie complesse.", href: "/airdrops" },
];

const MEDIA_EXAMPLES = [
  { type: "video", title: "Tutorial swap su Uniswap", source: "YouTube", embedId: "dQw4w9WgXcQ", href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { type: "x", title: "Hyperliquid HIP-3 spiegato", handle: "@HyperliquidX", href: "https://x.com/HyperliquidX" },
  { type: "video", title: "DeFi per principianti", source: "YouTube", embedId: "dQw4w9WgXcQ", href: "https://www.youtube.com" },
  { type: "x", title: "Curve Finance – liquidity pool", handle: "@CurveFinance", href: "https://x.com/CurveFinance" },
];

const VALID_CATEGORIES = new Set(CATEGORIES.map((c) => c.id));

const PROTOCOL_DESCRIPTION_EN: Record<string, string> = {
  "DEX leader su Ethereum e L2 per swap e liquidity.": "Leading DEX on Ethereum and L2 for swaps and liquidity.",
  "Prestiti e borrowing decentralizzati su più reti.": "Decentralized lending and borrowing across multiple networks.",
  "Perpetuals on-chain e trading con potenziale airdrop.": "On-chain perpetuals trading with potential airdrop upside.",
  "Piattaforma DeFi per trading di derivati on-chain con focus su perpetual e opzioni.": "DeFi platform for on-chain derivatives trading focused on perpetuals and options.",
  "Protocollo DeFi per strategie su opzioni on-chain con rendimento da premium.": "DeFi protocol for on-chain options strategies with premium yield.",
  "Bridge e trasferimenti cross-chain con LayerZero.": "Bridge and cross-chain transfers powered by LayerZero.",
  "Swap e bridge multi-chain in un’unica interfaccia.": "Multi-chain swaps and bridging in one interface.",
  "Bridge e messaggeria cross-chain per asset e dati.": "Cross-chain bridge and messaging for assets and data.",
  "DEX specializzato in stablecoin e curve di liquidità.": "DEX specialized in stablecoins and liquidity curves.",
  "Lending e borrowing con algoritmi sui tassi.": "Lending and borrowing with algorithmic rates.",
  "Aggregatore DEX su Solana per swap e route ottimali.": "DEX aggregator on Solana for optimal swap routes.",
  "DEX e AMM su Solana con pool concentrati.": "DEX and AMM on Solana with concentrated liquidity pools.",
  "AMM con pool configurabili e pesi dinamici.": "AMM with customizable pools and dynamic weights.",
  "DEX nativo su zkSync, Linea e Scroll.": "Native DEX on zkSync, Linea, and Scroll.",
  "Aggregatore di yield e strategie automatizzate.": "Yield aggregator with automated strategies.",
  "Liquid staking per ETH e SOL con token staked.": "Liquid staking for ETH and SOL via staked tokens.",
  "Protocollo di interoperabilità cross-chain.": "Cross-chain interoperability protocol.",
  "DEX su Arbitrum con incentivi e pool dinamici.": "Arbitrum DEX with incentives and dynamic pools.",
  "Bridge veloce tra Ethereum, L2 e rollup.": "Fast bridge across Ethereum, L2s, and rollups.",
  "Aggregatore swap di DeFiLlama per trovare route efficienti tra DEX e reti diverse.": "DeFiLlama swap aggregator to find efficient routes across DEXs and networks.",
  "Stablecoin fiat-collateralizzata per pagamenti, tesoreria e operatività DeFi.": "Fiat-collateralized stablecoin for payments, treasury, and DeFi operations.",
  "Stablecoin ancorata al dollaro, usata per trading e liquidità globale.": "Dollar-pegged stablecoin used for trading and global liquidity.",
};

const RECOMMENDED_PATHS_EN: Record<string, { title: string; desc: string }> = {
  Principianti: { title: "Beginners", desc: "Start simple." },
  "Yield Farming": { title: "Yield Farming", desc: "Earn yield." },
  Avanzato: { title: "Advanced", desc: "Advanced strategies." },
};

const MEDIA_TITLES_EN: Record<string, string> = {
  "Tutorial swap su Uniswap": "Uniswap swap tutorial",
  "Hyperliquid HIP-3 spiegato": "Hyperliquid HIP-3 explained",
  "DeFi per principianti": "DeFi for beginners",
  "Curve Finance – liquidity pool": "Curve Finance - liquidity pool",
};

function DefiPageContent({ onOpenBasiDefi }: { onOpenBasiDefi: () => void }) {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const activeCategory: CategoryId = (categoryFromUrl && VALID_CATEGORIES.has(categoryFromUrl)) ? categoryFromUrl as CategoryId : "dex";

  const [search, setSearch] = useState("");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDark(root.classList.contains("dark"));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const filteredProtocols = useMemo(() => {
    return PROTOCOLS.filter((p) => {
      const matchCategory = p.category === activeCategory;
      const matchSearch = !search.trim() || p.name.toLowerCase().includes(search.trim().toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="relative z-10">
              {/* Header: titolo a sinistra, Quick Actions in alto a destra (sopra i filtri) */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">DeFi</h1>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">{isEnglish ? "Explore protocols, start now." : "Esplora protocolli, Inizia ora."}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={onOpenBasiDefi}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors shrink-0 cursor-pointer ${isDark ? "border-white/20 bg-white/5 hover:bg-white/10 text-white" : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800"}`}
                  >
                    <span>💡</span>
                    <span>{isEnglish ? "DeFi Basics" : "Basi DeFi"}</span>
                  </button>
                  <Link
                    href="/news/defi"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-slate-900 transition-colors"
                  >
                    <span>📰</span> {isEnglish ? "DeFi News" : "Notizie DeFi"}
                  </Link>
                </div>
              </div>

              {/* Tabs filtri: Link così la categoria è nell'URL e il filtro funziona sempre */}
              <div className="flex flex-wrap gap-2 mb-6">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/defi?category=${cat.id}`}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      activeCategory === cat.id
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                        : "bg-white dark:bg-indigo-900/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-indigo-800/50 border border-slate-200 dark:border-indigo-500/20"
                    }`}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>

              {/* Search */}
              <div className="relative mb-8 max-w-2xl">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                <input
                  type="search"
                  placeholder={isEnglish ? "Search DeFi protocols" : "Cerca protocolli DeFi"}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/40 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Grid protocolli: card = div unico, link progetto sopra, icone link sotto (niente <a> dentro <a>) */}
              <main className="flex-1 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProtocols.map((p) => (
                  <div
                    key={p.href + p.name}
                    className="rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                  >
                    <Link href={p.href} className="block">
                      <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-indigo-800/40 flex items-center justify-center overflow-hidden shrink-0">
                            <Image src={p.icon} alt={p.name} width={32} height={32} className="object-contain" />
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white truncate">{p.name}</span>
                        </div>
                        {p.airdropPotential && (
                          <span className="shrink-0 px-2 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-[11px] font-medium whitespace-nowrap">
                            Airdrop
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">
                        {isEnglish ? (PROTOCOL_DESCRIPTION_EN[p.description] ?? p.description) : p.description}
                      </p>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 space-y-1">
                        <div>Token: {p.token}</div>
                        <div>{isEnglish ? "Price" : "Prezzo"}: {p.price}</div>
                        <div>Market Cap: {p.marketCap}</div>
                      </div>
                    </Link>
                    <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-200 dark:border-slate-600">
                      <a href={p.twitterUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors" title="X (Twitter)" aria-label="X (Twitter)">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                      </a>
                      <a href={p.websiteUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors" title={isEnglish ? "Website" : "Sito web"} aria-label={isEnglish ? "Website" : "Sito web"}>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                      </a>
                      {p.contractAddress ? (
                        <button type="button" onClick={() => void navigator.clipboard.writeText(p.contractAddress)} className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors" title="Copia contract address" aria-label="Copia contract address">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                        </button>
                      ) : null}
                      <BookmarkButton
                        url={p.href}
                        title={`${p.name} - ${isEnglish ? "Project page" : "Pagina progetto"}`}
                        type="page"
                        projectId={p.href.replace("/defi/", "")}
                        className="ml-auto"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {filteredProtocols.length === 0 && (
                <p className="text-center py-12 text-slate-500 dark:text-slate-400">
                  {isEnglish ? "No protocol found for this category or search." : "Nessun protocollo trovato per questa categoria o ricerca."}
                </p>
              )}
              </main>

              {/* Percorsi Consigliati */}
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{isEnglish ? "Recommended Paths" : "Percorsi Consigliati"}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {RECOMMENDED_PATHS.map((path) => (
                <Link
                  key={path.href + path.title}
                  href={path.href}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                >
                  <span className="text-2xl">{path.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 dark:text-white">{isEnglish ? (RECOMMENDED_PATHS_EN[path.title]?.title ?? path.title) : path.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {isEnglish ? (RECOMMENDED_PATHS_EN[path.title]?.desc ?? path.desc) : path.desc}
                    </p>
                  </div>
                  <span className="text-slate-400">→</span>
                </Link>
              ))}
                </div>
              </section>

              {/* Video / Post X */}
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{isEnglish ? "Videos and X posts" : "Video e post X"}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {isEnglish ? "Tutorials, explainers, and updates from the community." : "Tutorial, spiegazioni e aggiornamenti dalla community."}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MEDIA_EXAMPLES.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 overflow-hidden"
                >
                  {item.type === "video" ? (
                    <div className="aspect-video bg-slate-200 dark:bg-indigo-800/40 flex items-center justify-center">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-2 p-6 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        <span className="text-4xl">▶️</span>
                        <span className="text-sm font-medium">{item.source}</span>
                      </a>
                    </div>
                  ) : (
                    <div className="aspect-video bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center p-6">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                      >
                        <span className="text-4xl">𝕏</span>
                        <span className="text-sm font-medium">{item.handle}</span>
                      </a>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{isEnglish ? (MEDIA_TITLES_EN[item.title] ?? item.title) : item.title}</h3>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-1 inline-block"
                    >
                      {isEnglish ? `Open ${item.type === "video" ? "video" : "post"} →` : `Apri ${item.type === "video" ? "video" : "post"} →`}
                    </a>
                  </div>
                </div>
              ))}
                </div>
              </section>

    </div>
  );
}

export default function DefiPage() {
  const [basiDefiOpen, setBasiDefiOpen] = useState(false);
  return (
    <>
      <Suspense fallback={<div className="px-6 py-8 text-slate-500 dark:text-slate-400">Loading...</div>}>
        <DefiPageContent onOpenBasiDefi={() => setBasiDefiOpen(true)} />
      </Suspense>
      <BasiDeFiModal isOpen={basiDefiOpen} onClose={() => setBasiDefiOpen(false)} />
    </>
  );
}
