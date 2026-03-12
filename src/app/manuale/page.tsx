"use client";

import { Accordion } from "@/components/Accordion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { UnifiedAuthControls } from "@/components/auth/UnifiedAuthControls";
import { SearchBar } from "@/components/SearchBar";
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";
import imparodefiLogo from "@/assets/imparodefi-logo-nobg.webp";
import { LEARNING_PATH_CARDS } from "@/lib/learning-paths";
import { SiteFooter } from "@/components/SiteFooter";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

const SIDEBAR_ITEMS = [
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
];

const QUICK_SECTIONS = [
  { href: "#fondamenti", label: "Fondamenti Web3" },
  { href: "#guide-rapide", label: "Wallet e sicurezza" },
  { href: "#onramp", label: "Accesso al mercato" },
  { href: "#analisi", label: "Analisi progetti" },
  { href: "#nft", label: "NFT e community" },
  { href: "#sicurezza", label: "Anti-truffe" },
];

const BEGINNER_SNAPSHOT = [
  {
    title: "Cosa sono le crypto?",
    description: "Asset digitali su blockchain, noti anche come token, trasferibili senza banche in modo tracciabile e continuo.",
  },
  {
    title: "Cos'e una blockchain?",
    description: "Un registro pubblico e distribuito dove transazioni e dati restano verificabili nel tempo.",
  },
  {
    title: "Cosa sono i portafogli non-custodial?",
    description: "Wallet dove controlli direttamente chiavi e fondi: sei tu il custode.",
  },
  {
    title: "Come compro e vendo crypto?",
    description: "Via CEX o on-ramp, poi trasferisci al wallet personale con test iniziale.",
  },
  {
    title: "Cosa sono le CEX?",
    description: "Exchange centralizzati per convertire euro/dollari in crypto in modo semplice.",
  },
  {
    title: "Cos'e la DeFi?",
    description: "Servizi finanziari su blockchain (swap, lending, staking) senza banca centrale, accessibili dal tuo wallet.",
  },
];

const FIRST_STEPS = [
  "Apri un wallet affidabile e salva la seed phrase offline.",
  "Compra piccola cifra su canale affidabile e fai una transazione test.",
  "Inizia da 1-2 protocolli grandi, evitando dispersione.",
];

const BENEFIT_GROUP_CARDS = [
  {
    icon: "👤",
    slug: "consumatori",
    title: "Consumatori",
    description: "Più controllo su capitale, dati e accesso ai servizi finanziari globali.",
  },
  {
    icon: "🛍️",
    slug: "negozianti",
    title: "Negozianti",
    description: "Pagamenti più rapidi, fee ridotte e nuovi modelli di loyalty con token.",
  },
  {
    icon: "🏛️",
    slug: "governi",
    title: "Governi",
    description: "Maggiore trasparenza, tracciabilità e processi pubblici più efficienti.",
  },
  {
    icon: "🏢",
    slug: "imprese",
    title: "Imprese",
    description: "Supply chain tracciabile, automazione e nuovi modelli digitali.",
  },
  {
    icon: "🧑‍💻",
    slug: "sviluppatori",
    title: "Sviluppatori",
    description: "Infrastruttura open e componibile per creare prodotti più velocemente.",
  },
  {
    icon: "🎨",
    slug: "creatori",
    title: "Creatori",
    description: "Monetizzazione diretta e royalties programmabili su asset digitali.",
  },
];

type Theme = "dark" | "light";
type ManualQuickGuideId = "navigate" | "blockchain" | "defi" | "wallet";

export default function Manuale() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeQuickGuide, setActiveQuickGuide] = useState<ManualQuickGuideId | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("imparodefi-theme") as Theme | null;
    if (stored === "dark" || stored === "light") setTheme(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("imparodefi-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const isDark = theme === "dark";
  const sidebarItems = SIDEBAR_ITEMS.map((item) => ({
    label: isEnglish ? item.labelEn : item.labelIt,
    href: item.href,
    icon: item.icon,
  }));
  const quickSections = isEnglish
    ? [
        { href: "#fondamenti", label: "Web3 Fundamentals" },
        { href: "#guide-rapide", label: "Wallets and security" },
        { href: "#onramp", label: "Market access" },
        { href: "#analisi", label: "Project analysis" },
        { href: "#nft", label: "NFT and community" },
        { href: "#sicurezza", label: "Anti-scam" },
      ]
    : QUICK_SECTIONS;
  const beginnerSnapshot = isEnglish
    ? [
        {
          title: "What is crypto?",
          description:
            "Digital assets on blockchain, also known as tokens, transferable without banks in a transparent and continuous way.",
        },
        {
          title: "What is a blockchain?",
          description: "A public, distributed ledger where transactions and data remain verifiable over time.",
        },
        {
          title: "What are non-custodial wallets?",
          description: "Wallets where you directly control keys and funds: you are the custodian.",
        },
        {
          title: "How do I buy and sell crypto?",
          description: "Use CEX or on-ramp, then transfer to your personal wallet with a test transaction first.",
        },
        {
          title: "What are CEXs?",
          description: "Centralized exchanges to convert fiat into crypto in a simple way.",
        },
        {
          title: "What is DeFi?",
          description: "On-chain financial services (swap, lending, staking) without centralized banks, accessible from your wallet.",
        },
      ]
    : BEGINNER_SNAPSHOT;
  const firstSteps = isEnglish
    ? [
        "Open a trusted wallet and store your seed phrase offline.",
        "Buy a small amount on a trusted channel and execute a test transaction.",
        "Start from 1-2 major protocols and avoid spreading too thin.",
      ]
    : FIRST_STEPS;
  const manualLearningCards = LEARNING_PATH_CARDS.map((path) => {
    if (!isEnglish) return path;
    const byHref: Record<string, { level: string; desc: string }> = {
      "/percorsi-apprendimento/principiante": {
        level: "Beginner",
        desc: "Learn practical basics: wallet setup, security, first purchases, and first apps with controlled risk.",
      },
      "/percorsi-apprendimento/intermedio": {
        level: "Intermediate",
        desc: "Move from basic user to operational user: swaps, LP, lending, and comparative protocol analysis.",
      },
      "/percorsi-apprendimento/avanzato": {
        level: "Advanced",
        desc: "Power-user approach: research workflow, on-chain monitoring, and performance optimization.",
      },
    };
    const translated = byHref[path.href];
    return translated ? { ...path, ...translated } : path;
  });
  const quickGuideCards = isEnglish
    ? [
        { id: "navigate" as const, title: "How to navigate Web3?", subtitle: "A 5-step operational path to start safely.", icon: "🧭" },
        { id: "blockchain" as const, title: "What is a Blockchain?", subtitle: "Distributed ledger, immutability, and programmability.", icon: "⛓️" },
        { id: "defi" as const, title: "What are decentralized applications (DeFi)?", subtitle: "Smart contracts, permissionless access, and practical use cases.", icon: "💹" },
        { id: "wallet" as const, title: "What are non-custodial wallets?", subtitle: "Self-custody, risks, and operational best practices.", icon: "👛" },
      ]
    : [
        { id: "navigate" as const, title: "Come navigare il mondo Web3?", subtitle: "Percorso operativo in 5 step per iniziare in sicurezza.", icon: "🧭" },
        { id: "blockchain" as const, title: "Cos'è una Blockchain?", subtitle: "Registro distribuito, immutabilita e programmabilita.", icon: "⛓️" },
        { id: "defi" as const, title: "Cosa sono le applicazioni decentralizzate (DeFi)", subtitle: "Smart contract, accesso permissionless e casi pratici.", icon: "💹" },
        { id: "wallet" as const, title: "Cosa sono i wallet non-custodial", subtitle: "Custodia personale, rischio e best practice operative.", icon: "👛" },
      ];
  const benefitHighlights = isEnglish
    ? [
        "Manage your capital autonomously and without censorship.",
        "Access decentralized investment opportunities.",
        "Join communities with real value and networking.",
        "Store money securely and in a censorship-resistant way.",
        "Send money almost instantly at low cost.",
        "Earn yield autonomously.",
      ]
    : [
        "Gestire il proprio capitale in modo autonomo e senza censure",
        "Accedere a opportunità d'investimento decentralizzate",
        "Entrare in community con valore reale e networking",
        "Conservare denaro in modo sicuro e incensurabile",
        "Inviare denaro quasi istantaneo e low-cost",
        "Ottenere rendimenti in autonomia",
      ];
  const benefitGroupCards = BENEFIT_GROUP_CARDS.map((group) => {
    if (!isEnglish) return group;
    const enBySlug: Record<string, { title: string; description: string }> = {
      consumatori: { title: "Consumers", description: "More control over capital, data, and access to global financial services." },
      negozianti: { title: "Merchants", description: "Faster payments, lower fees, and new token-based loyalty models." },
      governi: { title: "Governments", description: "Higher transparency, traceability, and more efficient public processes." },
      imprese: { title: "Businesses", description: "Traceable supply chain, automation, and new digital business models." },
      sviluppatori: { title: "Developers", description: "Open, composable infrastructure to build products faster." },
      creatori: { title: "Creators", description: "Direct monetization and programmable royalties on digital assets." },
    };
    const translated = enBySlug[group.slug];
    return translated ? { ...group, ...translated } : group;
  });
  const onrampRules = isEnglish
    ? [
        "Choose the correct network (ETH, Arbitrum, Base, etc.) before sending.",
        "Run a small test transaction first.",
        "Always confirm address and memo/tag when required.",
        "Avoid impulsive trading: the initial goal is operational learning.",
      ]
    : [
        "Scegli rete corretta (ETH, Arbitrum, Base, ecc.) prima dell'invio.",
        "Fai una transazione test con importo piccolo.",
        "Conferma sempre indirizzo e memo/tag se richiesti.",
        "Evita trading impulsivo: l'obiettivo iniziale è apprendimento operativo.",
      ];

  return (
    <div
      className={`h-screen overflow-hidden transition-colors ${
        isDark
          ? "bg-gradient-to-b from-indigo-950 via-slate-900/95 via-30% to-indigo-950 text-white"
          : "bg-gradient-to-b from-slate-100 via-indigo-50/50 to-slate-100 text-slate-900"
      }`}
    >
      <div className={`fixed inset-0 pointer-events-none bg-[size:48px_48px] ${isDark ? "bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)]" : "bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)]"}`} />
      <div className="relative flex flex-col h-full overflow-hidden">
        <div className={`flex items-center justify-between py-4 border-b ${isDark ? "border-indigo-500/20 bg-indigo-950/50" : "border-slate-200 bg-white/70"}`}>
          <Link href="/" className="hidden lg:flex items-center gap-2 px-4 w-56 flex-shrink-0">
            <Image src={isDark ? "/imparodefi-logo-dark.png" : imparodefiLogo} alt="ImparoDeFi" width={36} height={36} className="rounded-lg" />
            <span className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>ImparoDeFi</span>
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${isDark ? "text-slate-400 bg-white/10" : "text-slate-500 bg-slate-200"}`}>BETA</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 lg:hidden">
              <Image src={isDark ? "/imparodefi-logo-dark.png" : imparodefiLogo} alt="ImparoDeFi" width={36} height={36} className="rounded-lg" />
              <span className={`hidden sm:inline font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>ImparoDeFi</span>
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${isDark ? "text-slate-400 bg-white/10" : "text-slate-500 bg-slate-200"}`}>BETA</span>
          </Link>
          <div className="hidden lg:block flex-1 max-w-xl mx-6">
            <SearchBar />
          </div>
          <div className="flex items-center justify-end gap-2 px-4 md:px-6">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className={`lg:hidden p-2 rounded-lg border transition-colors ${isDark ? "border-white/20 bg-white/5 hover:bg-white/10 text-white" : "border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
              aria-label={isEnglish ? "Open menu" : "Apri menu"}
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
            <div className="hidden md:flex">
              <LanguageToggle />
            </div>
            <button type="button" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} className={`p-2 rounded-lg border transition-colors ${isDark ? "border-white/20 bg-white/5 hover:bg-white/10" : "border-slate-300 bg-slate-100 hover:bg-slate-200"}`} title={isDark ? "Passa a tema chiaro" : "Passa a tema scuro"} aria-label={isDark ? "Passa a tema chiaro" : "Passa a tema scuro"}>
              {isDark ? <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg> : <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>}
            </button>
            <Link
              href="/profilo"
              className={`hidden sm:flex p-2 rounded-lg border transition-colors ${isDark ? "border-white/20 bg-white/5 hover:bg-white/10 text-white" : "border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
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
                aria-label={isEnglish ? "Close menu" : "Chiudi menu"}
                onClick={() => setMobileMenuOpen(false)}
              />
              <aside className={`fixed top-0 right-0 z-50 h-full w-64 max-w-[85vw] shadow-xl lg:hidden flex flex-col ${isDark ? "bg-indigo-950 border-l border-indigo-500/20" : "bg-white border-l border-slate-200"}`}>
                <div className={`flex items-center justify-between p-4 border-b ${isDark ? "border-indigo-500/20" : "border-slate-200"}`}>
                  <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{isEnglish ? "Menu" : "Menu"}</span>
                  <button type="button" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10" aria-label={isEnglish ? "Close" : "Chiudi"}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                <nav className="p-3 overflow-y-auto flex-1 space-y-0.5">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        item.href === "/manuale"
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

          <div className="flex flex-1 min-h-0 overflow-hidden">
            <CollapsibleSidebar
              items={sidebarItems}
              isDark={isDark}
              isItemActive={(href) => (href === "/manuale" ? pathname === "/manuale" || pathname.startsWith("/manuale/") : href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"))}
            />
            <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 px-2 sm:px-3 lg:px-4 py-6 overflow-auto manual-modern">
            <div className="w-full">
              <Link href="/" className={`inline-flex items-center gap-1.5 text-sm mb-6 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                {isEnglish ? "Back to Dashboard" : "Torna alla Dashboard"}
              </Link>
              <h1 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>{isEnglish ? "Manual A-Z" : "Manuale A-Z"}</h1>
              <p className={`text-lg mb-8 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {isEnglish ? "Complete guide to Web3, crypto, and DeFi from A to Z." : "Guida completa al mondo Web3, crypto e DeFi dalla A alla Z"}
              </p>
              <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)] items-start mb-6">
                <section className={`manual-card rounded-2xl border p-5 ${isDark ? "bg-indigo-900/25 border-indigo-500/25" : "bg-white border-slate-200 shadow-lg"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className={`text-xs uppercase tracking-wide ${isDark ? "text-indigo-300" : "text-indigo-700"}`}>{isEnglish ? "Start here" : "Parti da qui"}</p>
                      <p className={`mt-1 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                        {isEnglish ? "These are the fundamentals every beginner should understand first." : "Queste sono le basi che un neofita deve capire al primo colpo."}
                      </p>
                    </div>
                    <Link
                      href="#fondamenti"
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                        isDark
                          ? "border border-indigo-400/35 bg-indigo-500/15 text-indigo-200 hover:bg-indigo-500/25"
                          : "border border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-100"
                      }`}
                    >
                      {isEnglish ? "Open fundamentals →" : "Apri i fondamentali →"}
                    </Link>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {beginnerSnapshot.map((item) => (
                      <div
                        key={item.title}
                        className={`rounded-xl border p-4 ${isDark ? "border-indigo-500/25 bg-indigo-900/20" : "border-indigo-100 bg-white/90"}`}
                      >
                        <p className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{item.title}</p>
                        <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-4 rounded-xl border p-4 ${isDark ? "border-emerald-500/25 bg-emerald-500/10" : "border-emerald-200 bg-emerald-50"}`}>
                    <p className={`text-sm font-medium ${isDark ? "text-emerald-200" : "text-emerald-800"}`}>
                      {isEnglish ? "What to do today (practical):" : "Cosa fare oggi (pratico):"}
                    </p>
                    <ul className={`mt-2 space-y-1.5 text-sm ${isDark ? "text-emerald-100/90" : "text-emerald-900"}`}>
                      {firstSteps.map((step) => (
                        <li key={step}>• {step}</li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section className={`manual-card rounded-2xl border p-5 ${isDark ? "bg-indigo-900/25 border-indigo-500/25" : "bg-white border-slate-200 shadow-lg"}`}>
                  <p className={`text-sm font-medium mb-3 ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                    {isEnglish ? "Learning with USDC rewards" : "Apprendimento con Ricompense in USDC"}
                  </p>
                  <div className="grid gap-3">
                    {manualLearningCards.map((path) => (
                      <Link
                        key={path.level}
                        href={path.href}
                        className="rounded-xl border border-indigo-500/30 bg-indigo-900/20 p-3 transition-colors hover:border-indigo-400/50 hover:bg-indigo-800/25"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-base font-semibold text-white">{path.level}</p>
                          <span className="rounded-full border border-emerald-400/35 bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-200">
                            {path.href.endsWith("/principiante")
                              ? "3 USDC"
                              : path.href.endsWith("/intermedio")
                                ? "5 USDC"
                                : "10 USDC"}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm text-slate-300 line-clamp-3">{path.desc}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {quickSections.map((section) => (
                      <a
                        key={section.href}
                        href={section.href}
                        className={`rounded-xl border px-3 py-2 text-sm transition-colors ${
                          isDark
                            ? "border-indigo-500/30 bg-indigo-900/25 text-slate-200 hover:bg-indigo-800/40"
                            : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {section.label}
                      </a>
                    ))}
                  </div>
                </section>
              </div>

        <div id="fondamenti" className={`manual-card scroll-mt-24 rounded-2xl border p-5 mb-6 ${isDark ? "bg-indigo-900/25 border-indigo-500/20" : "bg-white border-slate-200 shadow-lg"}`}>
              <div className="space-y-4 mb-5">
                <div className={`rounded-xl border p-4 ${isDark ? "border-indigo-500/30 bg-indigo-900/15" : "border-slate-200 bg-slate-50"}`}>
                  <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {isEnglish ? "Benefits of Web3 technologies" : "Benefici delle tecnologie Web3"}
                  </h3>
                  <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    {isEnglish
                      ? "The internet transfers data; blockchain transfers value. Benefits differ by user profile."
                      : "Internet trasferisce dati; la blockchain trasferisce valore. I benefici cambiano in base al ruolo di chi la usa."}
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {benefitHighlights.map((item) => (
                      <div
                        key={item}
                        className={`rounded-lg border px-3 py-2 text-sm ${
                          isDark ? "border-indigo-500/25 bg-slate-950/30 text-slate-200" : "border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {benefitGroupCards.map((group) => (
                    <Link
                      key={group.title}
                      href={`/manuale/${group.slug}`}
                      className={`rounded-xl border p-4 min-h-[150px] ${
                        isDark ? "border-indigo-500/25 bg-indigo-900/20" : "border-slate-200 bg-white"
                      } hover:border-indigo-400/60 transition-colors`}
                    >
                      <div className="text-2xl">{group.icon}</div>
                      <p className={`mt-2 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{group.title}</p>
                      <p className={`mt-1.5 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>{group.description}</p>
                      <p className={`mt-3 text-xs font-medium ${isDark ? "text-indigo-300" : "text-indigo-700"}`}>
                        {isEnglish ? "Open category guide →" : "Apri guida categoria →"}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
                
            </div>

          <div
            id="guide-rapide"
            className={`manual-card scroll-mt-24 rounded-2xl border p-5 mb-6 ${
              isDark ? "bg-indigo-900/25 border-indigo-500/20" : "bg-white border-slate-200 shadow-lg"
            }`}
          >
            <div className={`rounded-xl border p-4 ${isDark ? "border-indigo-500/30 bg-indigo-900/15" : "border-slate-200 bg-slate-50"}`}>
              <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{isEnglish ? "Essential quick guides" : "Guide rapide essenziali"}</h3>
              <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                {isEnglish ? "Open a quick guide for core concepts before moving to operational sections." : "Apri una guida rapida per i concetti base prima di passare alle sezioni operative."}
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {quickGuideCards.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveQuickGuide(item.id)}
                    className={`aspect-square rounded-xl border p-3.5 text-left transition-colors ${
                      isDark
                        ? "border-indigo-500/25 bg-indigo-900/20 hover:border-indigo-400/60 hover:bg-indigo-800/30"
                        : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40"
                    }`}
                  >
                    <div className="text-xl">{item.icon}</div>
                    <p className={`mt-2.5 text-base font-semibold leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>{item.title}</p>
                    <p className={`mt-1.5 text-sm leading-snug ${isDark ? "text-slate-300" : "text-slate-700"}`}>{item.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div id="defi-dapp" className="scroll-mt-24" />
          <div id="wallet" className="scroll-mt-24" />

          <div id="onramp" className="manual-card scroll-mt-24 rounded-2xl border p-8 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              {isEnglish
                ? "To get crypto into your non-custodial wallet, you typically buy it through a centralized exchange (like Coinbase or Binance), or directly with an on-ramp (like Transak or MoonPay)."
                : "Per ottenere le criptovalute da mandare al proprio wallet non-custodial, sarà necessario ottenerle tramite un exchange centralizzata (come Coinbase o Binance), altrimenti utilizzando un on-ramp (come Transak o Moonpay)."}
            </p>
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              {isEnglish
                ? "After purchasing with card or bank transfer, send assets to your personal non-custodial wallet where you maintain direct control."
                : "Una volta acquistate le criptovalute con la propria carta o facendo un bonifico, si potranno inviare al proprio wallet non-custodial, dove saranno al sicuro da rischi esterni e sotto al vostro esclusivo controllo."}
            </p>

            <div className="grid gap-3 md:grid-cols-2 mb-4">
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="font-semibold text-white">1) CEX (Centralized Exchange)</p>
                <p className="mt-2 text-sm text-slate-300">
                  {isEnglish
                    ? "Ideal to convert EUR/USD into crypto. Use major platforms and then send funds to your personal wallet."
                    : "Ideale per convertire EUR/USD in crypto. Usa piattaforme grandi e invia i fondi al tuo wallet personale dopo l&apos;acquisto."}
                </p>
              </div>
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="font-semibold text-white">2) On-Ramp</p>
                <p className="mt-2 text-sm text-slate-300">
                  {isEnglish
                    ? "Direct card purchase into the wallet. Fast and convenient, but compare fees and spread first."
                    : "Acquisto diretto via carta nel wallet. Comodo e rapido, ma confronta fee e spread prima di confermare."}
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {onrampRules.map((rule) => (
                <div key={rule} className="rounded-xl border border-indigo-500/25 bg-slate-950/20 p-4">
                  <p className="text-sm text-slate-300">{rule}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Link href="/compraevendicrypto">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  {isEnglish ? "Go to Buy and Sell Crypto" : "Vai a Compra e vendi crypto"}
                </div>
              </Link>
            </div>
          </div>

          <div id="analisi" className="manual-card scroll-mt-24 rounded-2xl border p-8 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              {isEnglish
                ? "There are many tools you can use to analyze projects. From simple blockchain explorers to analytics and data-visualization platforms, mastering these tools gives you a real edge when evaluating Web3 opportunities."
                : "Esistono molti strumenti diversi che possiamo utilizzare per analizzare i progetti. Dai più semplici Navigatori di Blockchain (\"blockchain explorers\"), alle piattaforme di analisi e visualizzazione dei dati; saper utilizzare questi strumenti può offrire una marcia in più nella valutazione dei propri acquisti nel mondo Web3."}
            </p>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="font-semibold text-white">Blockchain Explorers</p>
                <p className="mt-2 text-sm text-slate-300">
                  {isEnglish ? "Read transactions, wallets, and smart contracts directly on-chain." : "Leggi transazioni, wallet e smart contract direttamente on-chain."}
                </p>
              </div>
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="font-semibold text-white">Analytics Dashboard</p>
                <p className="mt-2 text-sm text-slate-300">
                  {isEnglish ? "Compare TVL, volume, fees, and user activity across protocols." : "Confronta TVL, volumi, fee e attività utenti tra protocolli."}
                </p>
              </div>
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="font-semibold text-white">Portfolio Tracking</p>
                <p className="mt-2 text-sm text-slate-300">
                  {isEnglish ? "Monitor exposure, performance, and portfolio risk." : "Monitora esposizione, performance e rischio del portafoglio."}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Link href="/strumentiutili">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  {isEnglish ? "Go to Useful Tools" : "Vai a Strumenti Utili"}
                </div>
              </Link>
            </div>
          </div>

          <div id="nft" className="manual-card scroll-mt-24 rounded-2xl border p-8 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">{isEnglish ? "Project evaluation" : "Valutazione dei progetti"}</h3>
            <p className="text-slate-900 dark:text-slate-300 mb-5">
              {isEnglish
                ? "To evaluate a project professionally, combine core metrics (market cap, supply, TVL) with risk analysis and market context."
                : "Per valutare un progetto in modo professionale, combina metriche fondamentali (market cap, supply, TVL) con analisi del rischio e contesto di mercato."}
            </p>
            <div className="grid gap-3 md:grid-cols-3 mb-6">
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">{isEnglish ? "Fundamentals" : "Fondamentali"}</p>
                <p className="mt-1 font-semibold text-white">Market Cap + Supply</p>
                <p className="mt-2 text-sm text-slate-300">
                  {isEnglish ? "Understand dilution and potential room for growth." : "Capire diluizione e spazio potenziale di crescita."}
                </p>
              </div>
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">{isEnglish ? "Protocol efficiency" : "Efficienza protocollo"}</p>
                <p className="mt-1 font-semibold text-white">TVL / Market Cap</p>
                <p className="mt-2 text-sm text-slate-300">
                  {isEnglish ? "Compare usage value versus current valuation." : "Confronta valore d&apos;uso e valutazione attuale."}
                </p>
              </div>
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Timing</p>
                <p className="mt-1 font-semibold text-white">Price Action + Risk</p>
                <p className="mt-2 text-sm text-slate-300">
                  {isEnglish ? "Scale in gradually, define invalidation, and manage position size." : "Ingresso graduale, invalidazione e gestione size."}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Accordion
                buttonText={
                  <div>
                    <div className="text-lg md:text-xl">
                      {isEnglish ? "Analyzing a cryptoasset through Market Cap" : "Analizzare un Cryptoasset dalla Market Cap"}
                    </div>
                    <p className="mt-1 text-sm font-normal text-slate-400">
                      {isEnglish ? "Base framework: price, supply, FDV, and comparables." : "Base framework: prezzo, supply, FDV e comparables."}
                    </p>
                  </div>
                }
                className="mb-4"
              >
                <div className="p-5 space-y-6">
                  <div className="space-y-4">
                    <p className="text-slate-900 dark:text-slate-200 leading-relaxed">
                      Prima di tutto bisogna sapere che il prezzo di una criptovaluta è dettato dall'offerta della criptovaluta e la valutazione del progetto della criptovaluta (la capitalizzazione di mercato, o market cap).
                    </p>
                    <p className="text-slate-900 dark:text-slate-200 leading-relaxed">
                      Inversamente, si può dire che la market cap della criptovaluta sia determinata dall'offerta moltiplicata per il prezzo della criptovaluta.
                    </p>
                    <p className="text-slate-900 dark:text-slate-200 leading-relaxed">
                      Gli investitori ragionano con la market cap per poter determinare il potenziale di crescita di una criptovaluta rispetto ad un'altra.
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <Image 
                      src="/analizing.png" 
                      alt="Analisi Market Cap Bitcoin su CoinGecko"
                      width={800}
                      height={600}
                      className="max-w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <Accordion
                    buttonText={isEnglish ? "How it works" : "Come funziona"}
                    className="mb-3"
                  >
                    <div className="p-4 space-y-4 text-slate-900 dark:text-slate-200">
                      <p className="mb-4">
                        La schermata sopra (accessibile da <a href="https://www.coingecko.com/it/monete/bitcoin" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.coingecko.com/it/monete/bitcoin</a>) mostra nei rettangoli evidenziati in blu le seguenti:
                      </p>
                      
                             <Accordion buttonText={isEnglish ? "1. Market Capitalization (Market Cap)" : "1. Capitalizzazione di Mercato (Market Cap)"}>
                               <div className="p-4 space-y-4 text-slate-900 dark:text-slate-200">
                                 <p>
                                   La capitalizzazione di mercato di un criptoasset si calcola usando la seguente formula:
                                 </p>
                                 
                                 <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                                   <p className="font-semibold mb-2">Consideriamo che:</p>
                                   <p><strong>A = Prezzo attuale dei criptoasset in USD</strong></p>
                                   <p><strong>B = Offerta in circolazione del criptoasset</strong></p>
                                   <div className="mt-3 p-3 bg-white rounded border">
                                     <p className="text-lg font-bold text-blue-700">
                                       Capitalizzazione di mercato = A × B
                                     </p>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                   <p className="font-semibold mb-2">Esempio pratico con Bitcoin:</p>
                                   <p>
                                     Ad esempio, la capitalizzazione di mercato di Bitcoin viene calcolata moltiplicando l'Offerta disponibile di BTC per il suo prezzo. Vedendo che l'Offerta disponibile di BTC sia <strong>19.712.371</strong> e che il prezzo di BTC sia <strong>USD $66.147,70</strong>, la capitalizzazione di mercato viene quindi calcolata come:
                                   </p>
                                   <div className="mt-3 p-3 bg-white rounded border">
                                     <p className="text-lg font-bold text-green-700">
                                       19.712.371 × USD $66.147,70 = <span className="text-xl">USD 1.303.928.022.909</span>
                                     </p>
                                   </div>
                                 </div>
                               </div>
                             </Accordion>
                      
                      <Accordion buttonText={isEnglish ? "2. Fully Diluted Valuation (FDV)" : "2. Valutazione 100% diluita (Fully diluted valuation, o FDV)"}>
                        <p className="p-4 text-slate-900 dark:text-slate-200">
                          La FDV rappresenta la capitalizzazione di mercato se tutti i token fossero già in circolazione. È importante per capire il potenziale di inflazione futura e il vero valore del progetto.
                        </p>
                      </Accordion>
                      
                      <Accordion buttonText={isEnglish ? "3. Circulating Supply" : "3. Offerta in Circolazione (Circulating Supply)"}>
                        <p className="p-4 text-slate-900 dark:text-slate-200">
                          La quantità di valute che circolano sul mercato e sono scambiabili dal pubblico. È paragonabile a guardare le azioni prontamente disponibili sul mercato (non detenute e bloccate dagli addetti ai lavori, dalle autorità governative).
                        </p>
                      </Accordion>
                      
                      <Accordion buttonText={isEnglish ? "4. Total Supply" : "4. Offerta totale"}>
                        <p className="p-4 text-slate-900 dark:text-slate-200">
                          Le quantità di valute che sono già state create, meno le valute che sono state bruciate (rimosse dalla circolazione). È paragonabile alle azioni in circolazione nel mercato azionario.
                        </p>
                      </Accordion>
                      
                      <Accordion buttonText={isEnglish ? "5. Max Supply" : "5. Offerta Massima (Max Supply)"}>
                        <div className="p-4 space-y-4 text-slate-900 dark:text-slate-200">
                          <p>
                            Il numero massimo di valute codificate per esistere nel periodo di vita della criptovaluta. È paragonabile al numero massimo di azioni emettibili nel mercato azionario.
                          </p>
                          
                          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <p className="font-semibold text-blue-800">
                              Offerta massima = massimo teorico programmato
                            </p>
                          </div>
                          
                          <p>
                            Ethereum (ETH) non ha un offerta massima per esempio, come puoi vedere sotto dal simbolo dell'infinito accanto all'offerta massima. (<a href="https://www.coingecko.com/it/monete/ethereum" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.coingecko.com/it/monete/ethereum</a>)
                          </p>
                          
                          <div className="flex justify-center">
                            <Image 
                              src="/analizing2.png" 
                              alt="Ethereum Max Supply su CoinGecko"
                              width={800}
                              height={400}
                              className="max-w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                          
                          <p>
                            Tuttavia, la quantità di ETH in circolazione è progressivamente diminuita da Settembre 2022, quando è avvenuto il Merge (ETH 2.0, passaggio da <em>POW</em>, Proof-of-Work a <em>POS</em>, Proof-of-Stake) come visibile dal grafico sotto.
                          </p>
                          
                          <p>
                            <a href="https://etherscan.io/chart/ethersupplygrowth" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://etherscan.io/chart/ethersupplygrowth</a>
                          </p>
                          
                          <div className="flex justify-center">
                            <Image 
                              src="/analizing3.png" 
                              alt="Ethereum Supply Growth Chart"
                              width={800}
                              height={400}
                              className="max-w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <Accordion buttonText="Controllare la Market Cap del Cryptoasset">
                              <div className="p-4 space-y-4 text-slate-900 dark:text-slate-200">
                                <p>
                                  Prima di tutto, bisogna vedere se la criptovaluta che si vuole analizzare sia completamente in circolazione, o se una parte della supply debba ancora essere immessa nel mercato.
                                </p>
                                
                                <p>
                                  Useremo il token di Liquity ($LQTY) nei nostri esempi (<a href="https://www.coingecko.com/it/monete/liquity" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.coingecko.com/it/monete/liquity</a>)
                                </p>
                                
                                <div className="flex justify-center">
                                  <Image 
                                    src="/analizing4.png" 
                                    alt="Liquity Token su CoinGecko"
                                    width={800}
                                    height={400}
                                    className="max-w-full h-auto rounded-lg shadow-md"
                                  />
                                </div>
                                
                                <p>
                                  Cliccando su "Max" in alto a destra potrete osservare la cronologia del prezzo del token desiderato, graficamente.
                                </p>
                                
                                <p>
                                  Come possiamo notare nel rettangolo in blu, la Cap. di Mercato (Market Cap) è più bassa della Valutaz. 100% diluita (FDV), il che significa che non tutti i token sono stati rilasciati.
                                </p>
                                
                                <p>
                                  Possiamo usare <a href="https://token.unlocks.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://token.unlocks.app/</a> per vedere quando verranno immessi nel mercato e come.
                                </p>
                                
                                <p>
                                  Come vedrete dal grafico del prezzo di $LQTY, sembrerebbe che il prezzo sia andato costantemente giù.
                                </p>
                                
                                <p>
                                  Tuttavia, se si considera che l'offerta iniziale era più bassa di quella di oggi, e che una parte delle emissioni (o tutte) sono andate a chi possedeva il token $LQTY (tramite Staking o di altro tipo), fare un'analisi usando solamente il prezzo sarebbe errato.
                                </p>
                                
                                <p>
                                  Visualizzando il grafico della Market Cap invece, potremmo notare un'interessante differenza. 👇🏻
                                </p>
                                
                                <div className="flex justify-center">
                                  <Image 
                                    src="/analizing5.png" 
                                    alt="Liquity Market Cap Chart"
                                    width={800}
                                    height={400}
                                    className="max-w-full h-auto rounded-lg shadow-md"
                                  />
                                </div>
                                
                                <p>
                                  Prima di tutto, che l'andamento è stato costantemente a rialzo sin dall'inizio, e secondo poi, che adesso siamo ai minimi storici per questa crypto.
                                </p>
                              </div>
                            </Accordion>
                            
                            <Accordion buttonText="Comparare la Market Cap con quella di progetti simili">
                              <p className="p-4 text-slate-900 dark:text-slate-200">
                                Confronta la Market Cap del progetto che stai analizzando con quella di progetti simili nel stesso settore. Ad esempio, se stai valutando un DEX, confrontalo con Uniswap, SushiSwap o altri exchange decentralizzati. Questo ti darà un'idea del potenziale di crescita relativo.
                              </p>
                            </Accordion>
                          </div>
                        </div>
                      </Accordion>
                    </div>
                  </Accordion>
                  
                </div>
              </Accordion>
              
              <Accordion
                buttonText={
                  <div>
                    <div className="text-lg md:text-xl">
                      {isEnglish ? "Calculating risk using price averages" : "Calcolare il Rischio usando la Media del Prezzo"}
                    </div>
                    <p className="mt-1 text-sm font-normal text-slate-400">
                      {isEnglish ? "Positioning against averages and volatility." : "Posizionamento rispetto alle medie e volatilità."}
                    </p>
                  </div>
                }
                className="mb-4"
              >
                <div className="p-5 space-y-4 text-slate-900 dark:text-slate-200">
                  <div className="flex justify-center">
                    <Image 
                      src="/analizing6.png" 
                      alt="Benjamin Cowen - Into The Cryptoverse"
                      width={800}
                      height={400}
                      className="max-w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-lg font-semibold mb-2">Benjamin Cowen</p>
                    <p className="mb-4">
                      You have just jumped into the cryptoverse, which provides high quality cryptocurrency education to those who want to dive deeper
                    </p>
                    <a 
                      href="https://www.youtube.com/@intothecryptoverse" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      https://www.youtube.com/@intothecryptoverse
                    </a>
                  </div>
                </div>
              </Accordion>
              
              <Accordion
                buttonText={
                  <div>
                    <div className="text-lg md:text-xl">TVL to Market Cap ratio</div>
                    <p className="mt-1 text-sm font-normal text-slate-400">Valuta se il protocollo è caro o economico rispetto all&apos;uso reale.</p>
                  </div>
                }
                className="mb-4"
              >
                <div className="p-5 space-y-4 text-slate-900 dark:text-slate-200">
                  <p>
                    Valore fondamentale del prodotto: per esempio, il TVL ("Total Value Locked") di un progetto rappresenta il valore in dollari dei token depositati nei suoi smart-contract.
                  </p>
                  
                  <p>
                    Se si prende la market cap (capitalizzazione di mercato = valore del progetto/azienda) e la si mette accanto al TVL, si ottiene un ratio tra le due, che ci permette di paragonarlo ad altri progetti nella stessa categoria, per capire se è sottovalutato o sopravvalutato rispetto ad essa, e se fosse sottovalutato, si può calcolare il potenziale apprezzamento (upside) calcolando il ratio tra quella sottovalutata e sopravvalutata.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-semibold text-blue-800 mb-3">Esempio pratico:</p>
                    
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border">
                        <p className="font-semibold text-green-700">AAVE (Leader nel Lending & Borrowing)</p>
                        <p><strong>TVL:</strong> $13 miliardi</p>
                        <p><strong>Market Cap:</strong> $1.5 miliardi</p>
                        <p><strong>Ratio TVL/Market Cap:</strong> 8.67x</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded border">
                        <p className="font-semibold text-orange-700">Liquity (Progetto sottovalutato)</p>
                        <p><strong>TVL:</strong> $700 milioni</p>
                        <p><strong>Market Cap:</strong> $100 milioni</p>
                        <p><strong>Ratio TVL/Market Cap:</strong> 7x</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-yellow-50 rounded border">
                      <p className="font-semibold text-yellow-800">Calcolo del Potenziale Apprezzamento:</p>
                      <p className="text-sm">
                        Se Liquity avesse lo stesso ratio di AAVE (8.67x), la sua Market Cap dovrebbe essere:
                      </p>
                      <p className="text-lg font-bold text-yellow-700">
                        $700M ÷ 8.67 = $80.7M (attuale) → $700M × 8.67 = $6.07B (potenziale)
                      </p>
                      <p className="text-sm mt-2">
                        <strong>Upside potenziale:</strong> Da $100M a $6.07B = <span className="text-green-600 font-bold">6,070% di crescita</span>
                      </p>
                    </div>
                  </div>
                  
                  <p>
                    Il potenziale apprezzamento della market cap di Liquity sarebbe da $100M a $1.5B, se si assume che il mercato eventualmente capirà il suo valore (per mercato si intende i partecipanti ad esso, ovvero gli "investitori").
                  </p>
                </div>
              </Accordion>
              
              <Accordion
                buttonText={
                  <div>
                    <div className="text-lg md:text-xl">Price Action (Analisi Tecnica)</div>
                    <p className="mt-1 text-sm font-normal text-slate-400">Trend, livelli chiave e execution plan.</p>
                  </div>
                }
                className="mb-4"
              >
                <div className="p-5 space-y-5 text-slate-900 dark:text-slate-200">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Trend</p>
                      <p className="mt-1 font-semibold text-white">Higher High / Lower Low</p>
                      <p className="mt-2 text-sm text-slate-300">Capisci se il mercato premia o distribuisce rischio.</p>
                    </div>
                    <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Livelli</p>
                      <p className="mt-1 font-semibold text-white">Supporti e resistenze</p>
                      <p className="mt-2 text-sm text-slate-300">Zone dove prezzo e liquidità reagiscono più spesso.</p>
                    </div>
                    <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Execution</p>
                      <p className="mt-1 font-semibold text-white">Entry + invalidazione</p>
                      <p className="mt-2 text-sm text-slate-300">Ogni trade deve avere stop logico e size coerente.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      "Non entrare in breakout estesi: preferisci retest o zone value.",
                      "Definisci prima rischio massimo per operazione (es. 0.5%-1% del capitale).",
                      "Se il setup cambia, esci: proteggere capitale è priorità.",
                      "Usa timeframe multipli: trend su HTF, timing su LTF.",
                    ].map((rule) => (
                      <div key={rule} className="rounded-xl border border-indigo-500/25 bg-slate-950/20 p-4">
                        <p className="text-sm text-slate-300">{rule}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                    <p className="font-semibold text-white">Template pratico</p>
                    <p className="mt-2 text-sm text-slate-300">
                      Tesi (perché entro) → Trigger (dove entro) → Invalidazione (dove sbaglio) → Target (dove prendo profitto) → Post-analisi.
                    </p>
                  </div>
                </div>
              </Accordion>
            </div>
          </div>

          <div id="sicurezza" className="manual-card scroll-mt-24 rounded-2xl border p-8 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              Gli NFT sono uno dei settori ancora meno sviluppati all&apos;interno del mondo Web3. Se ne è sentito molto parlare negli anni scorsi per via di progetti buoni che ancora esistono (come i Crypto Punk, i Pudgy Penguin, i Bored Ape..) ma anche per i molti scam che ci sono stati (come purtroppo accade in tutti i settori nascenti, anche non-Web3, quindi non preoccupatevi o per lo meno, prestate attenzione).
            </p>
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              Possono essere collezioni di PFP (profile pictures), arte digitale, arte tradizionale tokenizzata, o addirittura interi immobili, e molto altro ancora.
            </p>
            
              <Accordion
                buttonText="Come scegliere la propria community NFT"
                className="mb-4"
              >
                <div className="p-5 space-y-4 text-slate-900 dark:text-slate-200">
                  <p className="font-semibold text-lg mb-4">
                    Quando scegli una community NFT, considera i seguenti fattori:
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      {
                        title: "1. Visione e Valori",
                        text: "La community deve riflettere i tuoi interessi e obiettivi.",
                      },
                      {
                        title: "2. Engagement",
                        text: "Cerca una community attiva su piattaforme come Discord e Twitter.",
                      },
                      {
                        title: "3. Utilita",
                        text: "Valuta i benefici dell'NFT, come eventi esclusivi o ricompense previste per gli holders.",
                      },
                      {
                        title: "4. Team e Trasparenza",
                        text: "Assicurati che il team sia esperto e chiaro sui piani.",
                      },
                      {
                        title: "5. Prezzo della Collezione",
                        text: "Scegli NFT che puoi permetterti senza sovra-allocare il tuo portafoglio. Evita di impegnarti troppo, a meno che tu non voglia entrarci solo temporaneamente per esplorare la community.",
                      },
                    ].map((item) => (
                      <div key={item.title} className="rounded-xl border border-indigo-500/25 bg-slate-950/20 p-4">
                        <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-slate-300 text-sm">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Accordion>
            
            <div className="mt-4">
              <Link href="/nft">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  {isEnglish ? "Go to NFT" : "Vai a NFT"}
                </div>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border p-8 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              È <span className="text-red-600 font-bold">importantissimo prestare molta attenzione</span> a non cadere in truffe di vario genere come <em>Phishing</em> o <em>Scam</em>. Ci sono diversi modi in cui si può perdere il proprio denaro cadendo vittima di truffe che purtroppo, sono presenti anche in questo lato del web. Seguendo i consigli che troverai nel manuale Anti Truffe qui sotto, sarai in grado di navigare questo mondo minimizzando i rischi.
            </p>
            
            <Accordion
              buttonText={
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Manuale per evitare truffe
                </div>
              }
              className="mb-4"
            >
              <div className="p-5 space-y-6">
                <p className="text-slate-900 dark:text-slate-200">
                  Il mondo delle criptovalute offre enormi opportunità, ma è anche terreno fertile per truffatori. Ecco una guida su come proteggerti dalle truffe, basata su consigli di esperti del settore.
                </p>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">1. Ricerca Approfondita</h4>
                  <p className="text-slate-900 dark:text-slate-200">
                    Prima di investire in qualsiasi criptovaluta o progetto, è fondamentale fare una ricerca approfondita. Leggi il whitepaper del progetto, verifica l&apos;identità del team dietro il progetto e cerca recensioni e analisi indipendenti. Progetti con team anonimi o senza documentazione chiara sono da considerare sospetti.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">2. Utilizza Solo Wallet Reputati</h4>
                  <p className="text-slate-900 dark:text-slate-200">
                    Assicurati che i wallet che scarichi provengano da fonti affidabili. Evita di installare wallet da link ricevuti via email o messaggi privati, poiché potrebbero essere falsi e progettati per rubare le tue criptovalute. Verifica sempre che il wallet sia ufficiale e controlla le recensioni degli utenti.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">3. Attenzione ai Link Malevoli</h4>
                  <p className="text-slate-900 dark:text-slate-200">
                    I link malevoli possono infettare il tuo dispositivo con malware o portarti su siti fasulli che possono drenare i tuoi fondi. Verifica sempre i link accedendo direttamente dal sito ufficiale o dai canali social ufficiali del progetto. Tratta ogni link ricevuto da sconosciuti con estrema cautela.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">4. Riconosci i Segnali di Allarme</h4>
                  <ul className="list-disc list-inside space-y-2 text-slate-900 dark:text-slate-200">
                    <li><strong>Promesse di Guadagni Elevati</strong>: Se un&apos;offerta sembra troppo bella per essere vera, probabilmente è una truffa. Nessuna piattaforma legittima garantisce rendimenti altissimi senza rischi.</li>
                    <li><strong>Mancanza di Trasparenza</strong>: Progetti che non forniscono informazioni chiare sul loro funzionamento, il team o i loro obiettivi sono sospetti.</li>
                    <li><strong>Senso di Urgenza</strong>: I truffatori spesso cercano di creare un senso di urgenza per farti agire senza riflettere. Le opportunità di investimento genuine non richiedono decisioni affrettate.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">5. Utilizza Exchange Reputati</h4>
                  <p className="text-slate-900 dark:text-slate-200">
                    Quando compri, vendi o scambi criptovalute, usa solo exchange ben conosciuti e con una buona reputazione. Verifica che l&apos;exchange rispetti le normative, abbia una storia di sicurezza solida e offra protezioni come l&apos;assicurazione sui depositi.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">6. Proteggi i Tuoi Wallet</h4>
                  <p className="text-slate-900 dark:text-slate-200">
                    Mantieni i tuoi software sempre aggiornati per proteggerti dalle vulnerabilità. Usa hardware wallet per conservare quantità significative di criptovalute e attiva l&apos;autenticazione a due fattori (2FA) dove possibile. Utilizza un &quot;burner&quot; wallet per le transazioni quotidiane, lasciando i fondi principali in un wallet separato e più sicuro.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">7. Evita le Truffe dei Falsi Airdrop</h4>
                  <p className="text-slate-900 dark:text-slate-200">
                    I falsi airdrop sono una tattica comune per indurre le persone a rivelare le loro chiavi private o a firmare transazioni malevole. Partecipa solo a airdrop da fonti affidabili e verifica sempre l&apos;autenticità dell&apos;offerta tramite i canali ufficiali del progetto.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">
                    Seguendo questi consigli, puoi ridurre significativamente il rischio di cadere vittima di truffe nel mondo delle criptovalute e navigare questo spazio con maggiore sicurezza.
                  </p>
            </div>
        </div>
            </Accordion>
          </div>

          {activeQuickGuide ? (
            <div className="fixed inset-0 z-[70]">
              <button
                type="button"
                className="absolute inset-0 bg-black/55"
                onClick={() => setActiveQuickGuide(null)}
                aria-label={isEnglish ? "Close popup" : "Chiudi popup"}
              />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div
                  className={`w-full max-w-3xl max-h-[88vh] overflow-auto rounded-2xl border p-5 ${
                    isDark ? "border-indigo-500/25 bg-indigo-950 text-white" : "border-slate-200 bg-white text-slate-900"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold">
                      {activeQuickGuide === "navigate"
                        ? isEnglish
                          ? "How to navigate Web3?"
                          : "Come navigare il mondo Web3?"
                        : activeQuickGuide === "blockchain"
                          ? isEnglish
                            ? "What is a Blockchain?"
                            : "Cos'è una Blockchain?"
                          : activeQuickGuide === "defi"
                            ? isEnglish
                              ? "What are decentralized applications (DeFi)?"
                              : "Cosa sono le applicazioni decentralizzate (DeFi)"
                            : isEnglish
                              ? "What are non-custodial wallets?"
                              : "Cosa sono i wallet non-custodial"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveQuickGuide(null)}
                      className={`rounded-lg border px-2.5 py-1 text-sm ${
                        isDark ? "border-white/20 hover:bg-white/10" : "border-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {isEnglish ? "Close" : "Chiudi"}
                    </button>
                  </div>

                  <div className="mt-4 space-y-3 text-sm">
                    {activeQuickGuide === "navigate"
                      ? (isEnglish
                          ? [
                              "1) Create a non-custodial wallet and keep seed phrase/private keys offline.",
                              "2) Separate cold wallet (treasury) from active wallet (operations).",
                              "3) Buy through a trusted channel and execute a test transaction first.",
                              "4) Always verify network, address, and domain before signing.",
                              "5) Enter Web3 apps gradually with small amounts.",
                            ]
                          : [
                              "1) Crea un wallet non-custodial e conserva seed phrase/chiavi offline.",
                              "2) Separa wallet cold (tesoreria) da wallet attivo (operativita).",
                              "3) Acquista su canale affidabile e fai una transazione test.",
                              "4) Verifica sempre rete, indirizzo e dominio prima di firmare.",
                              "5) Entra gradualmente nelle app Web3 con importi piccoli.",
                            ]).map((line) => (
                          <div
                            key={line}
                            className={`rounded-xl border p-3 ${
                              isDark ? "border-indigo-500/25 bg-indigo-900/25" : "border-slate-200 bg-slate-50"
                            }`}
                          >
                            {line}
                          </div>
                        ))
                      : null}

                    {activeQuickGuide === "blockchain"
                      ? (isEnglish
                          ? [
                              "Distributed ledger: data lives across a network of nodes, not one server.",
                              "Cryptographic integrity: chained blocks make history hard to alter.",
                              "Programmability: smart contracts enable dApps and financial services without intermediaries.",
                            ]
                          : [
                              "Registro distribuito: i dati sono su una rete di nodi, non su un server unico.",
                              "Integrita crittografica: blocchi concatenati rendono la cronologia difficile da alterare.",
                              "Programmabilita: smart contract abilitano dApp e servizi finanziari senza intermediari.",
                            ]).map((line) => (
                          <div
                            key={line}
                            className={`rounded-xl border p-3 ${
                              isDark ? "border-indigo-500/25 bg-indigo-900/25" : "border-slate-200 bg-slate-50"
                            }`}
                          >
                            {line}
                          </div>
                        ))
                      : null}

                    {activeQuickGuide === "defi"
                      ? (isEnglish
                          ? [
                              "DeFi dApps use smart contracts: logic is on-chain and publicly verifiable.",
                              "Anyone with a wallet can access them without opening traditional accounts.",
                              "Main use cases: swaps (DEX), lending/borrowing, staking, and NFT marketplaces.",
                            ]
                          : [
                              "Le dApp DeFi usano smart contract: la logica e on-chain e verificabile pubblicamente.",
                              "Chiunque con wallet puo accedere senza aprire conti tradizionali.",
                              "Casi principali: swap (DEX), lending/borrowing, staking e NFT marketplace.",
                            ]).map((line) => (
                          <div
                            key={line}
                            className={`rounded-xl border p-3 ${
                              isDark ? "border-indigo-500/25 bg-indigo-900/25" : "border-slate-200 bg-slate-50"
                            }`}
                          >
                            {line}
                          </div>
                        ))
                      : null}

                    {activeQuickGuide === "wallet"
                      ? (isEnglish
                          ? [
                              "Non-custodial means you control private keys directly (you are the custodian).",
                              "If you lose seed phrase/keys, no one can recover them for you.",
                              "Best practice: cold wallet for savings and active wallet for tests/apps.",
                            ]
                          : [
                              "Non-custodial = controlli tu le chiavi private (sei tu il custode).",
                              "Se perdi seed phrase/chiavi, nessuno puo recuperarle al posto tuo.",
                              "Best practice: wallet cold per risparmio e wallet attivo per test/app.",
                            ]).map((line) => (
                          <div
                            key={line}
                            className={`rounded-xl border p-3 ${
                              isDark ? "border-indigo-500/25 bg-indigo-900/25" : "border-slate-200 bg-slate-50"
                            }`}
                          >
                            {line}
                          </div>
                        ))
                      : null}

                    <div className="pt-1">
                      {activeQuickGuide === "blockchain" ? (
                        <Link href="/blockchain" className={`font-medium ${isDark ? "text-indigo-300" : "text-indigo-700"} hover:underline`}>
                          {isEnglish ? "Go to Blockchains →" : "Vai a Blockchain →"}
                        </Link>
                      ) : null}
                      {activeQuickGuide === "defi" ? (
                        <Link href="/defi" className={`font-medium ${isDark ? "text-indigo-300" : "text-indigo-700"} hover:underline`}>
                          {isEnglish ? "Go to DeFi →" : "Vai a DeFi →"}
                        </Link>
                      ) : null}
                      {activeQuickGuide === "wallet" ? (
                        <Link href="/wallet" className={`font-medium ${isDark ? "text-indigo-300" : "text-indigo-700"} hover:underline`}>
                          {isEnglish ? "Go to Wallets →" : "Vai a Wallet →"}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

            </div>
            <SiteFooter isDark={isDark} className="mt-6" />
          </div>
            </div>
          </div>
        </div>
    </div>
  );
}
