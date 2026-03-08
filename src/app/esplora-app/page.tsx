"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Placeholder from "@/assets/placeholder.svg";
import imparodefiLogo from "@/assets/imparodefi-logo-nobg.webp";
import { getProjectMacroCategory, type MacroCategoryId } from "@/lib/admin-project-categories";
import { getProjectLogo } from "@/lib/project-logos";
import { getCoingeckoId } from "@/lib/project-coingecko-ids";
import { UnifiedAuthControls } from "@/components/auth/UnifiedAuthControls";
import { SearchBar } from "@/components/SearchBar";
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "/", icon: "📊" },
  { label: "Manuale", href: "/manuale", icon: "📚" },
  { label: "DeFi", href: "/defi", icon: "💹" },
  { label: "Airdrops", href: "/airdrops", icon: "🎁" },
  { label: "Blockchains", href: "/blockchain", icon: "⛓️" },
  { label: "Compra/Vendi Crypto", href: "/compraevendicrypto", icon: "💳" },
  { label: "Portafogli", href: "/wallet", icon: "👛" },
  { label: "Strumenti Utili", href: "/strumentiutili", icon: "🔧" },
  { label: "Memecoins", href: "/memecoins", icon: "🪙" },
  { label: "NFTs", href: "/nft", icon: "🖼️" },
  { label: "Giochi", href: "/giochi", icon: "🎮" },
  { label: "Mercati di Predizione", href: "/giochi/polymarket", icon: "📈" },
  { label: "Eventi Storici", href: "/eventi-storici", icon: "📅" },
  { label: "Mappa Ecosistema", href: "/esplora-app", icon: "🌐" },
  { label: "Notizie", href: "/news", icon: "📰" },
  { label: "Segnalibri", href: "/segnalibri", icon: "🔖" },
  { label: "Leaderboard", href: "/leaderboards/global", icon: "🏆" },
];

/** Filtri categoria per la pagina Mappa Ecosistema */
const ECOSYSTEM_FILTERS: { id: MacroCategoryId; label: string }[] = [
  { id: "all", label: "Tutti" },
  { id: "blockchain", label: "Blockchains" },
  { id: "compra-vendi-crypto", label: "Compra/Vendi Crypto" },
  { id: "portafogli", label: "Portafogli" },
  { id: "defi", label: "DeFi" },
  { id: "airdrops", label: "Airdrops" },
  { id: "nft", label: "NFTs" },
  { id: "memecoin", label: "Memecoins" },
  { id: "strumenti-utili", label: "Strumenti Utili" },
];

type EcosystemProject = {
  id: string;
  name: string;
  websiteUrl?: string | null;
  twitterUrl?: string | null;
  description?: string | null;
  category?: string | null;
};

type PriceData = { usd?: number; usd_market_cap?: number };
type SortMarketCap = "none" | "asc" | "desc";

function formatPrice(n: number): string {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
  if (n >= 1) return `$${n.toFixed(2)}`;
  if (n >= 0.01) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(6)}`;
}

function getProjectPageHref(projectId: string): string {
  const macro = getProjectMacroCategory(projectId);
  if (macro === "defi") return `/defi/${projectId}`;
  if (macro === "portafogli") return `/wallet/${projectId}`;
  if (macro === "nft") return `/nft/${projectId}`;
  if (macro === "blockchain") return `/blockchain/${projectId}`;
  if (macro === "compra-vendi-crypto") return "/compraevendicrypto";
  if (macro === "airdrops") return "/airdrops";
  if (macro === "memecoin") return "/memecoins";
  if (macro === "strumenti-utili") return "/strumentiutili";
  if (macro === "giochi-metaversi") return "/giochi";
  return `/blockchain/${projectId}`;
}

type Theme = "dark" | "light";

export default function EsploraAppPage() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState<EcosystemProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<MacroCategoryId>("all");
  const [sortByMarketCap, setSortByMarketCap] = useState<SortMarketCap>("none");
  const [priceData, setPriceData] = useState<Record<string, PriceData>>({});

  useEffect(() => {
    const stored = localStorage.getItem("imparodefi-theme") as Theme | null;
    if (stored === "dark" || stored === "light") setTheme(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("imparodefi-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/ecosystem-projects")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data.projects)) setProjects(data.projects);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;
    const cgIds = [...new Set(projects.map((p) => getCoingeckoId(p.id)).filter(Boolean))] as string[];
    if (cgIds.length === 0) return;
    const idsParam = cgIds.slice(0, 200).join(",");
    let cancelled = false;
    fetch(`/api/coingecko?ids=${encodeURIComponent(idsParam)}`)
      .then((r) => (r.ok ? r.json() : {}))
      .then((data: Record<string, { usd?: number; usd_market_cap?: number }>) => {
        if (cancelled) return;
        const byProjectId: Record<string, PriceData> = {};
        for (const p of projects) {
          const cgId = getCoingeckoId(p.id);
          if (cgId && data[cgId]) byProjectId[p.id] = data[cgId];
        }
        setPriceData(byProjectId);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = q
      ? projects.filter(
          (p) =>
            p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
        )
      : projects;
    if (activeCategory !== "all") {
      if (activeCategory === "airdrops") {
        const defaultAirdropIds = new Set([
          "base", "ink", "hyperliquid", "getgrass", "layerzero", "scroll", "zksync",
          "linea", "blast", "berachain", "stargate", "jumper", "debridge", "orbiter",
          "ens", "gitcoin", "farcaster", "snapshot",
        ]);
        list = list.filter(
          (p) =>
            getProjectMacroCategory(p.id) === "airdrops" ||
            defaultAirdropIds.has(p.id.toLowerCase())
        );
      } else {
        list = list.filter((p) => getProjectMacroCategory(p.id) === activeCategory);
      }
    }
    if (sortByMarketCap === "none") return list;
    const withToken = list.filter((p) => priceData[p.id]?.usd_market_cap != null);
    return [...withToken].sort((a, b) => {
      const mcapA = priceData[a.id]!.usd_market_cap ?? 0;
      const mcapB = priceData[b.id]!.usd_market_cap ?? 0;
      if (sortByMarketCap === "desc") return mcapB - mcapA;
      return mcapA - mcapB;
    });
  }, [projects, search, activeCategory, sortByMarketCap, priceData]);

  const isDark = theme === "dark";
  const isProfilePath = pathname === "/profilo" || pathname.startsWith("/profilo/");
  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors ${
        isDark
          ? "bg-gradient-to-b from-indigo-950 via-slate-900/95 via-30% to-indigo-950 text-white"
          : "bg-gradient-to-b from-slate-100 via-indigo-50/50 to-slate-100 text-slate-900"
      }`}
    >
      <div
        className="fixed inset-0 pointer-events-none bg-[size:48px_48px] bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)]"
        aria-hidden
      />
      <div className="relative flex min-h-screen overflow-x-hidden">
        <CollapsibleSidebar
          items={SIDEBAR_ITEMS}
          isDark={isDark}
          isItemActive={isItemActive}
        />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top header - come landing */}
          <div
            className={`flex items-center justify-between px-3 sm:px-6 py-4 border-b flex-shrink-0 ${
              isDark ? "border-indigo-500/20 bg-indigo-950/50" : "border-slate-200 bg-white/70"
            }`}
          >
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={isDark ? "/imparodefi-logo-dark.png" : imparodefiLogo}
                alt="ImparoDeFi"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>ImparoDeFi</span>
              <span
                className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                  isDark ? "text-slate-400 bg-white/10" : "text-slate-500 bg-slate-200"
                }`}
              >
                BETA
              </span>
            </Link>
            <div className="hidden lg:block flex-1 max-w-xl mx-6">
              <SearchBar />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                className={`lg:hidden p-2 rounded-lg border transition-colors ${
                  isDark
                    ? "border-white/20 bg-white/5 hover:bg-white/10 text-white"
                    : "border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
                aria-label="Apri menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                className={`p-2 rounded-lg border transition-colors ${
                  isDark ? "border-white/20 bg-white/5 hover:bg-white/10" : "border-slate-300 bg-slate-100 hover:bg-slate-200"
                }`}
                title={isDark ? "Passa a tema chiaro" : "Passa a tema scuro"}
                aria-label={isDark ? "Passa a tema chiaro" : "Passa a tema scuro"}
              >
                {isDark ? (
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <Link
                href="/profilo"
                className={`hidden sm:flex p-2 rounded-lg border transition-colors ${
                  isProfilePath
                    ? "border-indigo-400/70 bg-indigo-500/20 text-indigo-100"
                    : isDark
                      ? "border-white/20 bg-white/5 hover:bg-white/10 text-white"
                      : "border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
                title="Profilo"
                aria-label="Profilo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a8.967 8.967 0 0114.998 0A17.933 17.933 0 0112 22.5c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </Link>
              <UnifiedAuthControls />
            </div>
          </div>
          {mobileMenuOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                aria-label="Chiudi menu"
                onClick={() => setMobileMenuOpen(false)}
              />
              <aside className={`fixed top-0 right-0 z-50 h-full w-64 max-w-[85vw] shadow-xl lg:hidden flex flex-col ${isDark ? "bg-indigo-950 border-l border-indigo-500/20" : "bg-white border-l border-slate-200"}`}>
                <div className={`flex items-center justify-between p-4 border-b ${isDark ? "border-indigo-500/20" : "border-slate-200"}`}>
                  <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Menu</span>
                  <button type="button" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10" aria-label="Chiudi">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <nav className="p-3 overflow-y-auto flex-1 space-y-0.5">
                  {SIDEBAR_ITEMS.map((item) => (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isItemActive(item.href)
                          ? "bg-indigo-600/90 text-white"
                          : isDark
                            ? "text-slate-300 hover:bg-white/10 hover:text-white"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </aside>
            </>
          )}

          {/* Main content */}
          <div className="flex-1 px-6 py-8 overflow-auto">
            <Link
              href="/"
              className={`inline-block text-sm font-medium mb-6 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              ← Torna alla Home
            </Link>
            <h1 className={`text-4xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              Mappa Ecosistema
            </h1>
            <p className={`text-lg mb-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Tutti i progetti dell&apos;ecosistema: Blockchains, DeFi, Portafogli, Airdrops, NFT, Memecoins e altro.
            </p>

            {/* Search bar */}
            <div className="mb-4">
              <div className="relative max-w-xl">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" aria-hidden>
                  🔍
                </span>
                <input
                  type="search"
                  placeholder="Cerca per nome o id..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-indigo-900/40 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    isDark ? "border-indigo-500/30" : "border-slate-200"
                  }`}
                />
              </div>
            </div>

            {/* Filtri categoria */}
            <div className="flex flex-wrap gap-2 mb-4">
              {ECOSYSTEM_FILTERS.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-indigo-600 text-white dark:bg-indigo-500"
                      : isDark
                        ? "bg-white/10 border border-white/20 text-slate-200 hover:bg-white/15"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Ordinamento per market cap */}
            <div className="flex items-center gap-2 mb-6">
              <span className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Ordina per market cap:
              </span>
              <div className="flex gap-2">
                {(["none", "desc", "asc"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSortByMarketCap(opt)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      sortByMarketCap === opt
                        ? "bg-indigo-600 text-white dark:bg-indigo-500"
                        : isDark
                          ? "bg-white/10 border border-white/20 text-slate-200 hover:bg-white/15"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                    }`}
                  >
                    {opt === "none" ? "Nessuno" : opt === "desc" ? "Decrescente" : "Crescente"}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid di card */}
            {loading ? (
              <div className={`py-16 text-center ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Caricamento progetti...
              </div>
            ) : filteredProjects.length === 0 ? (
              <p className={`py-12 text-center ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Nessun progetto trovato per questa ricerca o categoria.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProjects.map((p) => {
                  const href = getProjectPageHref(p.id);
                  const macroId = getProjectMacroCategory(p.id);
                  const macroLabel = ECOSYSTEM_FILTERS.find((f) => f.id === macroId)?.label ?? (macroId === "giochi-metaversi" ? "Giochi / Metaversi" : macroId === "other" ? "Altro" : macroId);
                  return (
                    <Link
                      key={p.id}
                      href={href}
                      className="group block p-5 rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-indigo-800/40 flex items-center justify-center overflow-hidden shrink-0">
                            <Image
                              src={getProjectLogo(p.id) ?? Placeholder}
                              alt=""
                              width={48}
                              height={48}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white truncate">{p.name}</span>
                        </div>
                        <span className="shrink-0 px-2 py-1 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-[11px] font-medium whitespace-nowrap">
                          {macroLabel}
                        </span>
                      </div>
                      {(priceData[p.id]?.usd != null || priceData[p.id]?.usd_market_cap != null) && (
                        <div className={`flex flex-wrap gap-3 text-xs mb-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                          {priceData[p.id]?.usd != null && (
                            <span>Prezzo: {formatPrice(priceData[p.id].usd!)}</span>
                          )}
                          {priceData[p.id]?.usd_market_cap != null && (
                            <span>MCap: {formatPrice(priceData[p.id].usd_market_cap!)}</span>
                          )}
                        </div>
                      )}
                      {p.description && (
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{p.description}</p>
                      )}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200 dark:border-indigo-500/20">
                        <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium group-hover:underline">
                          Vai alla scheda →
                        </span>
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          {p.twitterUrl && (
                            <a
                              href={p.twitterUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors"
                              title="X (Twitter)"
                              aria-label="X (Twitter)"
                            >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                            </a>
                          )}
                          {p.websiteUrl && (
                            <a
                              href={p.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors"
                              title="Sito web"
                              aria-label="Sito web"
                            >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <p className={`text-sm mt-8 text-center ${isDark ? "text-slate-500" : "text-slate-600"}`}>
              {filteredProjects.length} di {projects.length} progetti
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
