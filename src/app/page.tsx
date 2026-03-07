"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { UnifiedAuthControls } from "@/components/auth/UnifiedAuthControls";

import baseLogo from "@/assets/base-logo.svg";
import hyperliquidLogo from "@/assets/hyperliquid-logo.png";
import scrollLogo from "@/assets/Scroll-Logo.svg";
import jumperLogo from "@/assets/jumper-logo.png";
import debridgeLogo from "@/assets/debridge-logo.png";
import ethereumLogo from "@/assets/ethereum-icon.svg";
import bitcoinIcon from "@/assets/bitcoin-icon.svg";
import solanaLogo from "@/assets/solana-sol-logo.svg";
import imparodefiLogo from "@/assets/imparodefi-logo-nobg.webp";
import { LEARNING_PATH_CARDS } from "@/lib/learning-paths";
import { DEFAULT_HACKS_SCAMS_ALERTS, toPublicAlert } from "@/lib/hacks-scams-alerts";

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
  { label: "Memecoin/NFT", href: "/nft", icon: "🖼️" },
  { label: "Giochi", href: "/giochi", icon: "🎮" },
  { label: "Mercati di Predizione", href: "/giochi/polymarket", icon: "📈" },
  { label: "Eventi Storici", href: "/eventi-storici", icon: "📅" },
  { label: "Mappa Ecosistema", href: "/esplora-app", icon: "🌐" },
  { label: "Notizie", href: "/news", icon: "📰" },
  { label: "Leaderboard", href: "/leaderboards/global", icon: "🏆" },
];

const TRENDING = [
  { name: "Hyperliquid", desc: "Perpetuals on-chain, HIP-3 – Trading azionario on-chain.", href: "/defi/hyperliquid", tag: "Airdrop", logo: hyperliquidLogo },
  { name: "Rainbow", desc: "Wallet multichain e aggregatore DeFi.", href: "/airdrops/rainbow", tag: "Airdrop", logo: ethereumLogo },
  { name: "Base", desc: "L2 di Coinbase. Scopri come usare al meglio la Base app.", href: "/airdrops/base", tag: "Airdrop", logo: baseLogo },
  { name: "Scroll", desc: "Layer 2 zkEVM per Ethereum. Scalabilità e bassi costi.", href: "/airdrops/scroll", tag: "Airdrop", logo: scrollLogo },
  { name: "Jumper", desc: "Bridging e swapping multi-chain con LI.FI.", href: "/airdrops/jumper", tag: "Airdrop", logo: jumperLogo },
];

const AIRDROP_MONITOR = [
  { name: "Hyperliquid", desc: "Punti, token, azioni HIPS, commodities e farm. Clicca qui e inizia a tradare.", href: "/defi/hyperliquid", logo: hyperliquidLogo },
  { name: "Base", desc: "L2 di Coinbase. Scopri come usare al meglio la Base app su mobile.", href: "/airdrops/base", logo: baseLogo },
  { name: "Scroll", desc: "Layer 2 zkEVM. Monitora i volumi per potenziale airdrop.", href: "/airdrops/scroll", logo: scrollLogo },
  { name: "Jumper", desc: "Bridging multi-chain. Accumula attività per eligibility.", href: "/airdrops/jumper", logo: jumperLogo },
  { name: "deBridge", desc: "Protocollo di derivati on-chain. Monitora i volumi per airdrop.", href: "/airdrops/debridge", logo: debridgeLogo },
];

const NEWS_CARDS = [
  {
    title: "Rosetta e Circular: l'AI che decide dove allocare capitale nella DeFi",
    summary: "Un nuovo esempio di AI applicata alla DeFi mostra come l'agente \"Rosetta\" utilizzi i dati di Circular per analizzare mercati di lending come Morpho, Aave...",
    category: "CRYPTO AI",
    date: "05/03/2026",
    href: "/news/crypto-ai",
    tagClass: "bg-cyan-500/80",
    btnClass: "bg-cyan-600 hover:bg-cyan-500",
    borderClass: "border-cyan-500/20",
  },
  {
    title: "Terra, Jane Street e il rimbalzo del mercato: coincidenza o segnale strutturale?",
    summary: "Le accuse contro Jane Street riaccendono i riflettori sul collasso di Terra nel 2022 e sollevano interrogativi più ampi sulla manipolazione del mercato.",
    category: "GENERAL",
    date: "25/02/2026",
    href: "/news",
    tagClass: "bg-blue-500/80",
    btnClass: "bg-blue-600 hover:bg-blue-500",
    borderClass: "border-blue-500/20",
  },
  {
    title: "Trading Alpha",
    summary: "Molti altcoin salgono per domanda spot artificiale, ma dopo gli unlock entrano in una lunga fase di vendita. Uno schema ormai ricorrente nei progetti meno...",
    category: "DEFI",
    date: "27/01/2026",
    href: "/news/defi",
    tagClass: "bg-emerald-500/80",
    btnClass: "bg-emerald-600 hover:bg-emerald-500",
    borderClass: "border-emerald-500/20",
  },
];

const TRENDING_TOKENS = [
  { symbol: "BTC", name: "Bitcoin", price: "$92,450", change: "+2.4%", positive: true },
  { symbol: "SOL", name: "Solana", price: "$210.20", change: "+5.1%", positive: true },
  { symbol: "ETH", name: "Ethereum", price: "$3,450", change: "-0.5%", positive: false },
];

const TOKEN_ICONS: Record<string, typeof bitcoinIcon> = {
  BTC: bitcoinIcon,
  SOL: solanaLogo,
  ETH: ethereumLogo,
};

type Theme = "dark" | "light";
type PublicHackAlert = { name: string; desc: string; link: string | null };

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [hacksAlerts, setHacksAlerts] = useState<PublicHackAlert[]>(
    DEFAULT_HACKS_SCAMS_ALERTS.filter((item) => item.isActive).map(toPublicAlert),
  );

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
    let mounted = true;
    const loadHacksAlerts = async () => {
      try {
        const res = await fetch("/api/hacks-scams-alerts", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!mounted) return;
        const alerts = Array.isArray(data?.alerts) ? data.alerts : [];
        if (alerts.length > 0) setHacksAlerts(alerts);
      } catch {
        // Keep local fallback alerts on network errors.
      }
    };
    loadHacksAlerts();
    return () => {
      mounted = false;
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen text-white transition-colors ${
        isDark
          ? "bg-gradient-to-b from-indigo-950 via-slate-900/95 via-30% to-indigo-950"
          : "bg-gradient-to-b from-slate-100 via-indigo-50/50 to-slate-100 text-slate-900"
      }`}
    >
      {/* Geometric pattern overlay */}
      <div className={`fixed inset-0 pointer-events-none bg-[size:48px_48px] ${isDark ? "bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)]" : "bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)]"}`} />

      <div className="relative flex min-h-screen">
        {/* Left sidebar */}
        <aside className={`w-56 flex-shrink-0 border-r backdrop-blur py-6 ${isDark ? "border-indigo-500/20 bg-indigo-950/70" : "border-slate-200 bg-white/80"}`}>
          <nav className="px-3 space-y-0.5">
            {SIDEBAR_ITEMS.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  item.href === "/"
                    ? "bg-indigo-500/90 text-white"
                    : isDark ? "text-slate-300 hover:bg-indigo-500/20 hover:text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Center + Right */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar: logo + login/account */}
          <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? "border-indigo-500/20 bg-indigo-950/50" : "border-slate-200 bg-white/70"}`}>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={isDark ? "/imparodefi-logo-dark.png" : imparodefiLogo}
                alt="ImparoDeFi"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>ImparoDeFi</span>
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${isDark ? "text-slate-400 bg-white/10" : "text-slate-500 bg-slate-200"}`}>BETA</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/dashboard"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${isDark ? "border-white/20 bg-white/5 hover:bg-white/10 text-white" : "border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
              >
                Admin Panel
              </Link>
              <button
                type="button"
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                className={`p-2 rounded-lg border transition-colors ${isDark ? "border-white/20 bg-white/5 hover:bg-white/10" : "border-slate-300 bg-slate-100 hover:bg-slate-200"}`}
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
                className={`p-2 rounded-lg border transition-colors ${isDark ? "border-white/20 bg-white/5 hover:bg-white/10 text-white" : "border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
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

          {/* Top header - central */}
          <div className="px-8 pt-8 pb-6 text-center">
            <h1 className={`text-4xl lg:text-5xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              Domina la Finanza Decentralizzata
            </h1>
            <p className={`text-lg max-w-2xl mx-auto mb-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Il tuo hub per imparare, scoprire e monitorare il mondo Web3.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/manuale"
                className="inline-flex items-center px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white border border-indigo-400/50 hover:opacity-90 transition-opacity"
              >
                Inizia da qui
              </Link>
              <Link
                href="/esplora-app"
                className="inline-flex items-center px-6 py-3 rounded-xl font-medium bg-indigo-500/20 text-white border border-indigo-400/30 hover:bg-indigo-500/30 hover:border-indigo-400/50 transition-colors"
              >
                Mappa Ecosistema
              </Link>
            </div>
          </div>

          <div className="flex-1 px-6 pb-8 overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] grid-rows-[auto_auto_auto] gap-6 items-stretch">
            {/* Riga 1: Trending (sinistra) | Airdrop Monitor (destra) - altezza contenuto, no stretch */}
              <section className={`min-w-0 rounded-2xl border backdrop-blur p-6 overflow-hidden lg:col-start-1 lg:row-start-1 lg:self-start ${isDark ? "border-indigo-500/25 bg-indigo-900/25" : "border-slate-200 bg-white/80"}`}>
                <div className="min-h-[3.5rem] flex items-center mb-4">
                  <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                    Trending ora su ImparoDeFi
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center items-stretch">
                  {TRENDING.map((t) => (
                    <Link
                      key={t.name}
                      href={t.href}
                      className={`flex flex-col p-4 w-full max-w-[180px] min-w-0 rounded-xl border hover:border-indigo-500/50 transition-colors min-h-[160px] box-border overflow-hidden ${isDark ? "bg-slate-700/50 border-white/5" : "bg-slate-100 border-slate-200"}`}
                    >
                      <div className="flex flex-col items-start gap-1.5 mb-2">
                        <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
                          <Image src={t.logo} alt={t.name} width={28} height={28} className="object-contain" />
                        </div>
                        <span className={`font-semibold text-sm break-words line-clamp-2 w-full ${isDark ? "text-white" : "text-slate-900"}`}>{t.name}</span>
                      </div>
                      <p className={`text-[11px] leading-snug mb-2 flex-1 break-words line-clamp-3 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{t.desc}</p>
                      <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[11px] w-fit mt-auto">
                        {t.tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
              <section className={`min-w-0 rounded-2xl border backdrop-blur p-4 flex flex-col max-h-[20rem] min-h-0 lg:col-start-2 lg:row-start-1 lg:self-start overflow-hidden ${isDark ? "border-indigo-500/25 bg-indigo-900/25" : "border-slate-200 bg-white/80"}`}>
                <div className="min-h-[3.5rem] flex items-center mb-3">
                  <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Airdrop Monitor</h2>
                </div>
              <div className="space-y-3 overflow-y-auto flex-1 min-h-0 pr-1">
                {AIRDROP_MONITOR.map((a) => (
                  <Link
                    key={a.name}
                    href={a.href}
                    className={`flex items-start gap-3 p-3 rounded-lg border hover:border-indigo-400/40 transition-colors group ${isDark ? "bg-indigo-900/20 border-indigo-500/15" : "bg-slate-100 border-slate-200"}`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
                      <Image src={a.logo} alt={a.name} width={24} height={24} className="object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`font-semibold group-hover:text-indigo-600 ${isDark ? "text-white" : "text-slate-900"}`}>{a.name}</div>
                      <p className={`text-xs mt-0.5 line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{a.desc}</p>
                      <span className="text-indigo-400 text-xs mt-1 inline-block">
                        Clicca qui e inizia a tradare →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              </section>

            {/* Riga 2: Percorsi (sinistra) | Token (destra) */}
              <section className={`min-w-0 rounded-2xl border backdrop-blur p-6 lg:col-start-1 lg:row-start-2 ${isDark ? "border-indigo-500/25 bg-indigo-900/25" : "border-slate-200 bg-white/80"}`}>
                <div className="min-h-[3.5rem] flex items-center mb-4">
                  <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Percorsi di Apprendimento</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center items-stretch">
                  {LEARNING_PATH_CARDS.map((p) => (
                    <Link
                      key={p.level}
                      href={p.href}
                      className={`block p-4 w-full max-w-[280px] rounded-xl border hover:border-indigo-400/50 transition-colors ${isDark ? "bg-indigo-900/20 border-indigo-500/15" : "bg-slate-100 border-slate-200"}`}
                    >
                      <div className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{p.level}</div>
                      <div className={`text-sm mb-1 ${isDark ? "text-indigo-300" : "text-indigo-600"}`}>{p.sub}</div>
                      <p className={`text-sm line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{p.desc}</p>
                    </Link>
                  ))}
                </div>
              </section>
              <section className={`min-w-0 rounded-2xl border backdrop-blur p-4 lg:col-start-2 lg:row-start-2 ${isDark ? "border-indigo-500/25 bg-indigo-900/25" : "border-slate-200 bg-white/80"}`}>
                <div className="min-h-[3.5rem] flex items-center mb-3">
                  <h2 className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Token in Tendenza</h2>
                </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${isDark ? "border-indigo-500/20 text-slate-400" : "border-slate-200 text-slate-600"}`}>
                      <th className="text-left py-2 px-2 font-medium">Token</th>
                      <th className="text-left py-2 px-2 font-medium">Prezzo</th>
                      <th className="text-right py-2 px-2 font-medium">Cambio%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRENDING_TOKENS.map((row) => (
                      <tr key={row.symbol} className={`border-b ${isDark ? "border-indigo-500/10" : "border-slate-100"}`}>
                        <td className="py-2.5 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
                              <Image
                                src={TOKEN_ICONS[row.symbol]}
                                alt={row.name}
                                width={18}
                                height={18}
                                className="object-contain"
                              />
                            </div>
                            <span className={`font-medium ${isDark ? "text-white" : "text-slate-900"}`}>{row.symbol}</span>
                          </div>
                        </td>
                        <td className={`py-2.5 px-2 ${isDark ? "text-slate-300" : "text-slate-600"}`}>{row.price}</td>
                        <td className="py-2.5 px-2 text-right">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${
                              row.positive ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {row.change}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </section>

            {/* Riga 3: Notizie (sinistra) | Hacks (destra) */}
              <section className={`min-w-0 rounded-2xl border backdrop-blur p-6 lg:col-start-1 lg:row-start-3 ${isDark ? "border-indigo-500/25 bg-indigo-900/25" : "border-slate-200 bg-white/80"}`}>
                <div className="min-h-[3.5rem] flex items-center justify-between mb-4">
                  <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>Notizie</h2>
                  <Link href="/news" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                    Vedi tutte →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {NEWS_CARDS.map((n) => (
                    <Link
                      key={n.href + n.title}
                      href={n.href}
                      className={`flex flex-col rounded-xl p-5 border hover:shadow-lg transition-shadow text-left ${
                        isDark
                          ? `bg-indigo-900/30 backdrop-blur ${n.borderClass} hover:border-indigo-400/30`
                          : `bg-white/90 ${n.borderClass} border-slate-200`
                      }`}
                    >
                      <span className={`${n.tagClass} text-white text-xs font-bold px-2.5 py-1 rounded-md w-fit uppercase tracking-wide`}>
                        {n.category}
                      </span>
                      <h3 className={`font-bold mt-3 mb-2 text-sm leading-snug line-clamp-2 ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                        {n.title}
                      </h3>
                      <p className={`text-xs leading-relaxed flex-1 line-clamp-3 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        {n.summary}
                      </p>
                        <div className={`flex items-center justify-between mt-4 pt-3 border-t ${isDark ? "border-indigo-500/15" : "border-slate-200/80"}`}>
                        <span className={`text-xs ${isDark ? "text-slate-500" : "text-slate-500"}`}>{n.date}</span>
                        <span className={`${n.btnClass} text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors`}>
                          Leggi →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
              <section className={`min-w-0 rounded-2xl border backdrop-blur p-4 lg:col-start-2 lg:row-start-3 ${isDark ? "border-red-500/30 bg-red-950/30" : "border-red-200 bg-red-50"}`}>
                <div className="min-h-[3.5rem] flex items-center mb-3">
                  <h2 className={`flex items-center gap-2 text-lg font-bold ${isDark ? "text-red-300" : "text-red-700"}`}>
                    <span>⚠️</span> Hacks & Scams Alerts
                  </h2>
                </div>
              <ul className="space-y-2">
                {hacksAlerts.map((h) => (
                  <li key={`${h.name}-${h.desc}`} className={`p-2 rounded-lg border ${isDark ? "bg-red-900/20 border-red-500/20" : "bg-red-100/80 border-red-200"}`}>
                    <div className={`font-medium ${isDark ? "text-red-200" : "text-red-900"}`}>{h.name}</div>
                    <p className={`text-xs ${isDark ? "text-red-300/90" : "text-red-800"}`}>{h.desc}</p>
                    {h.link && (
                      <a
                        href={h.link}
                        target="_blank"
                        rel="noreferrer"
                        className={`text-xs underline mt-1 inline-block ${isDark ? "text-red-300" : "text-red-700"}`}
                      >
                        Approfondisci
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer minimale per la landing */}
      <footer className={`border-t py-4 text-center text-sm ${isDark ? "border-indigo-500/20 text-slate-400" : "border-slate-200 text-slate-600"}`}>
        ImparoDeFi © {new Date().getFullYear()}. All rights reserved.
      </footer>
    </div>
  );
}
