"use client";

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
import AutoTranslateText from "@/components/AutoTranslateText";

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
  { href: "#stablecoin", label: "Stablecoin" },
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
type EvaluationPillarId = "fundamentals" | "onchain" | "execution";
type NftFocusId = "collectibles" | "utility" | "creative";
type ScamDefenseId = "verification" | "wallet" | "operations";

export default function Manuale() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeQuickGuide, setActiveQuickGuide] = useState<ManualQuickGuideId | null>(null);
  const [activeEvaluationPillar, setActiveEvaluationPillar] = useState<EvaluationPillarId>("fundamentals");
  const [activeNftFocus, setActiveNftFocus] = useState<NftFocusId>("collectibles");
  const [activeScamDefense, setActiveScamDefense] = useState<ScamDefenseId>("verification");

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
        { href: "#stablecoin", label: "Stablecoins" },
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
  const evaluationPillars = isEnglish
    ? [
        {
          id: "fundamentals" as const,
          label: "Fundamental valuation",
          subtitle: "Supply, dilution, and room to grow.",
          checks: [
            "Compare circulating market cap vs FDV to estimate future dilution pressure.",
            "Check unlock schedule and concentration of tokens in team/VC wallets.",
            "Benchmark valuation against direct competitors in the same category.",
          ],
          redFlags: [
            "FDV multiple too high versus category median.",
            "Large unlocks expected in the next 30-90 days.",
            "Narrative strong but no measurable usage trend.",
          ],
        },
        {
          id: "onchain" as const,
          label: "On-chain demand",
          subtitle: "Real usage quality over pure hype.",
          checks: [
            "Track active users, transactions, and net inflows over multiple weeks.",
            "Review protocol revenue, fee trend, and retention quality.",
            "Use TVL / Market Cap only together with revenue and liquidity depth.",
          ],
          redFlags: [
            "TVL inflated by incentives with weak organic retention.",
            "Volume spikes only around announcements and then collapses.",
            "Liquidity too shallow for your intended position size.",
          ],
        },
        {
          id: "execution" as const,
          label: "Execution and risk",
          subtitle: "Entry discipline and downside control.",
          checks: [
            "Define invalidation before entering (where your thesis is wrong).",
            "Predefine max risk per trade (for example 0.5%-1.0% portfolio risk).",
            "Scale entries in tranches instead of full-size market entry.",
          ],
          redFlags: [
            "No stop logic, only hope-based position management.",
            "Overexposure to correlated assets in the same narrative.",
            "Position too large for available liquidity and volatility.",
          ],
        },
      ]
    : [
        {
          id: "fundamentals" as const,
          label: "Valutazione fondamentale",
          subtitle: "Supply, diluizione e spazio di crescita.",
          checks: [
            "Confronta market cap circolante e FDV per stimare la pressione da diluizione.",
            "Controlla calendario unlock e concentrazione token in wallet team/VC.",
            "Paragona la valutazione con competitor diretti nella stessa categoria.",
          ],
          redFlags: [
            "FDV troppo alto rispetto alla media della categoria.",
            "Unlock importanti in arrivo nei prossimi 30-90 giorni.",
            "Narrativa forte ma assenza di trend d'uso misurabile.",
          ],
        },
        {
          id: "onchain" as const,
          label: "Domanda on-chain",
          subtitle: "Uso reale del protocollo oltre l'hype.",
          checks: [
            "Monitora utenti attivi, transazioni e net inflow su più settimane.",
            "Analizza revenue protocollo, trend fee e qualità della retention.",
            "Usa TVL / Market Cap insieme a revenue e profondità di liquidità.",
          ],
          redFlags: [
            "TVL gonfiato da incentivi con retention organica debole.",
            "Picchi di volume solo durante annunci, poi crollo.",
            "Liquidità troppo sottile per la size che vuoi allocare.",
          ],
        },
        {
          id: "execution" as const,
          label: "Execution e rischio",
          subtitle: "Disciplina in entrata e controllo del downside.",
          checks: [
            "Definisci l'invalidazione prima dell'ingresso (dove la tesi è sbagliata).",
            "Imposta rischio massimo per trade (es. 0.5%-1.0% del portafoglio).",
            "Scala l'ingresso a tranche invece di entrare full-size subito.",
          ],
          redFlags: [
            "Nessuna logica di stop, solo gestione basata sulla speranza.",
            "Sovraesposizione ad asset correlati della stessa narrativa.",
            "Size troppo grande rispetto a liquidità e volatilità.",
          ],
        },
      ];
  const activeEvaluation = evaluationPillars.find((pillar) => pillar.id === activeEvaluationPillar) ?? evaluationPillars[0];
  const nftFocusPillars = isEnglish
    ? [
        {
          id: "collectibles" as const,
          label: "Community collectibles",
          subtitle: "Network quality and long-term culture.",
          checks: [
            "Track holder distribution and concentration risk across top wallets.",
            "Evaluate community quality: recurring events, builders, and useful member-generated content.",
            "Check social growth quality, not only spikes driven by giveaways.",
          ],
          redFlags: [
            "Volume depends only on hype cycles with no engagement between launches.",
            "Roadmap changes every month without measurable delivery.",
            "Team communication is inconsistent or mostly anonymous without proof of work.",
          ],
        },
        {
          id: "utility" as const,
          label: "Utility and access",
          subtitle: "Real value beyond profile pictures.",
          checks: [
            "Map concrete benefits: gated products, education, events, royalties, or governance rights.",
            "Estimate whether utility is sustainable with realistic unit economics.",
            "Verify if token-gating and contracts are transparent and auditable.",
          ],
          redFlags: [
            "Vague utility language with no timeline or product metrics.",
            "Benefits depend on new mints instead of existing customer demand.",
            "No clarity on treasury use, runway, or ongoing operating costs.",
          ],
        },
        {
          id: "creative" as const,
          label: "Creative and IP quality",
          subtitle: "Brand defensibility and execution.",
          checks: [
            "Assess visual consistency, storytelling, and uniqueness of the art direction.",
            "Verify licensing rights and commercial-use permissions for holders.",
            "Review collaborations and distribution channels that can expand brand reach.",
          ],
          redFlags: [
            "Derivative design with no clear brand identity.",
            "Unclear intellectual property rights or changing license terms.",
            "No strategic partnerships to support long-term distribution.",
          ],
        },
      ]
    : [
        {
          id: "collectibles" as const,
          label: "Collectible community",
          subtitle: "Qualita del network e cultura nel lungo periodo.",
          checks: [
            "Monitora distribuzione holder e rischio concentrazione nei wallet principali.",
            "Valuta qualita della community: eventi ricorrenti, builder attivi e contenuti utili prodotti dai membri.",
            "Controlla la qualita della crescita social, non solo picchi da giveaway.",
          ],
          redFlags: [
            "Volume legato solo a cicli hype senza engagement tra un lancio e l'altro.",
            "Roadmap che cambia ogni mese senza delivery misurabile.",
            "Comunicazione del team incoerente o anonima senza prove operative.",
          ],
        },
        {
          id: "utility" as const,
          label: "Utilita e accesso",
          subtitle: "Valore reale oltre l'immagine profilo.",
          checks: [
            "Mappa benefici concreti: prodotti gated, education, eventi, royalties o governance.",
            "Stima se l'utilita e sostenibile con economics realistici.",
            "Verifica se token-gating e contratti sono trasparenti e auditabili.",
          ],
          redFlags: [
            "Utility vaga senza timeline o metriche di prodotto.",
            "Benefici sostenuti da nuovi mint e non da domanda reale.",
            "Nessuna chiarezza su tesoreria, runway e costi operativi.",
          ],
        },
        {
          id: "creative" as const,
          label: "Qualita creativa e IP",
          subtitle: "Difendibilita del brand e execution.",
          checks: [
            "Valuta coerenza visiva, storytelling e unicita della direzione artistica.",
            "Verifica diritti di licenza e uso commerciale per holder.",
            "Analizza collaborazioni e canali distributivi che possono ampliare la reach del brand.",
          ],
          redFlags: [
            "Design derivativo senza identita di brand chiara.",
            "Diritti IP poco chiari o termini di licenza che cambiano spesso.",
            "Assenza di partnership strategiche per la distribuzione nel tempo.",
          ],
        },
      ];
  const activeNftPillar = nftFocusPillars.find((pillar) => pillar.id === activeNftFocus) ?? nftFocusPillars[0];
  const scamDefensePillars = isEnglish
    ? [
        {
          id: "verification" as const,
          label: "Source verification",
          subtitle: "Validate domains, teams, and contracts before any action.",
          checks: [
            "Open links only from official channels and verify exact domain spelling.",
            "Cross-check team identities, audits, and documentation from independent sources.",
            "Confirm contract addresses from official docs before approving any transaction.",
          ],
          redFlags: [
            "Urgent DMs asking for immediate wallet connection.",
            "Copied websites with minor URL differences.",
            "Promises of guaranteed returns with no risk disclosure.",
          ],
        },
        {
          id: "wallet" as const,
          label: "Wallet security",
          subtitle: "Protect keys, approvals, and account boundaries.",
          checks: [
            "Keep seed phrase offline and never store it in cloud notes or screenshots.",
            "Use hardware wallet for treasury and a separate burner wallet for experiments.",
            "Review and revoke token approvals periodically for unused dApps.",
          ],
          redFlags: [
            "Any request for seed phrase or private key, even from fake support agents.",
            "Blind-sign prompts without clear transaction simulation.",
            "Large token approvals requested for simple read-only features.",
          ],
        },
        {
          id: "operations" as const,
          label: "Operational discipline",
          subtitle: "Reduce damage with process and position controls.",
          checks: [
            "Run test transactions with small amounts before full-size transfers.",
            "Set per-trade risk limits and avoid all-in moves during high volatility.",
            "Document your entry thesis and invalidation before signing transactions.",
          ],
          redFlags: [
            "Decision pressure from countdown timers and fake scarcity.",
            "Switching networks without checking token compatibility and destination wallet.",
            "No incident plan for compromised devices or leaked credentials.",
          ],
        },
      ]
    : [
        {
          id: "verification" as const,
          label: "Verifica delle fonti",
          subtitle: "Convalida domini, team e contratti prima di agire.",
          checks: [
            "Apri link solo da canali ufficiali e verifica con precisione il dominio.",
            "Controlla identita team, audit e documentazione su fonti indipendenti.",
            "Conferma indirizzi dei contratti dalla documentazione ufficiale prima di approvare.",
          ],
          redFlags: [
            "DM urgenti che chiedono connessione wallet immediata.",
            "Siti clonati con differenze minime nell'URL.",
            "Promesse di rendimenti garantiti senza disclosure del rischio.",
          ],
        },
        {
          id: "wallet" as const,
          label: "Sicurezza wallet",
          subtitle: "Proteggi chiavi, approvazioni e separazione degli account.",
          checks: [
            "Conserva la seed phrase offline e mai in cloud, note digitali o screenshot.",
            "Usa hardware wallet per tesoreria e burner wallet separato per test e dApp nuove.",
            "Rivedi e revoca periodicamente le autorizzazioni token non piu utilizzate.",
          ],
          redFlags: [
            "Qualsiasi richiesta di seed phrase o private key, anche da finti supporti.",
            "Prompt di firma cieca senza simulazione chiara della transazione.",
            "Richieste di approvazioni elevate per funzioni che non le richiedono.",
          ],
        },
        {
          id: "operations" as const,
          label: "Disciplina operativa",
          subtitle: "Riduci i danni con processo e controllo della size.",
          checks: [
            "Esegui sempre transazioni test con importi ridotti prima di inviare size piena.",
            "Imposta limiti di rischio per operazione ed evita mosse all-in in alta volatilita.",
            "Scrivi tesi d'ingresso e invalidazione prima di firmare transazioni.",
          ],
          redFlags: [
            "Pressione decisionale con countdown e scarsita artificiale.",
            "Cambio network senza verifica compatibilita token e wallet di destinazione.",
            "Assenza di un piano di risposta per dispositivo compromesso o credenziali esposte.",
          ],
        },
      ];
  const activeScamPillar =
    scamDefensePillars.find((pillar) => pillar.id === activeScamDefense) ?? scamDefensePillars[0];

  return (
    <AutoTranslateText>
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
                </section>
              </div>

              <div className="mb-6">
                <div className={`manual-card rounded-2xl border p-4 ${isDark ? "bg-indigo-900/20 border-indigo-500/25" : "bg-white border-slate-200 shadow-lg"}`}>
                  <p className={`text-xs uppercase tracking-wide mb-3 ${isDark ? "text-indigo-300" : "text-indigo-700"}`}>
                    {isEnglish ? "Jump to section" : "Vai alla sezione"}
                  </p>
                  <div className="flex flex-wrap gap-2">
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
                </div>
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
                    </Link>
                  ))}
                </div>
              </div>
                
            </div>

          <div
            id="guide-rapide"
            className={`manual-card scroll-mt-24 rounded-2xl border p-4 mb-6 ${
              isDark ? "bg-indigo-900/25 border-indigo-500/20" : "bg-white border-slate-200 shadow-lg"
            }`}
          >
            <div className={`rounded-xl border p-3 ${isDark ? "border-indigo-500/30 bg-indigo-900/15" : "border-slate-200 bg-slate-50"}`}>
              <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{isEnglish ? "Essential quick guides" : "Guide rapide essenziali"}</h3>
              <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                {isEnglish ? "Open a quick guide for core concepts before moving to operational sections." : "Apri una guida rapida per i concetti base prima di passare alle sezioni operative."}
              </p>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {quickGuideCards.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveQuickGuide(item.id)}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      isDark
                        ? "border-indigo-500/25 bg-indigo-900/20 hover:border-indigo-400/60 hover:bg-indigo-800/30"
                        : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40"
                    }`}
                  >
                    <div className="text-lg">{item.icon}</div>
                    <p className={`mt-2 text-base font-semibold leading-tight ${isDark ? "text-white" : "text-slate-900"}`}>{item.title}</p>
                    <p className={`mt-1 text-sm leading-snug ${isDark ? "text-slate-300" : "text-slate-700"}`}>{item.subtitle}</p>
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

          <div id="stablecoin" className="manual-card scroll-mt-24 rounded-2xl border p-8 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
              <div className="max-w-3xl">
                <p className={`text-xs uppercase tracking-wide ${isDark ? "text-indigo-300" : "text-indigo-700"}`}>
                  {isEnglish ? "Capital stability layer" : "Layer di stabilita del capitale"}
                </p>
                <h3 className={`mt-1 text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  {isEnglish ? "Stablecoins: what they are and how to use them safely" : "Stablecoin: cosa sono e come usarle in sicurezza"}
                </h3>
                <p className={`mt-2 text-sm md:text-base ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  {isEnglish
                    ? "Stablecoins are crypto assets designed to track fiat value (usually USD or EUR). They are the operational bridge between cash and DeFi, useful for payments, treasury, and risk management."
                    : "Le stablecoin sono asset crypto progettati per seguire il valore fiat (di solito USD o EUR). Sono il ponte operativo tra cash e DeFi, utili per pagamenti, tesoreria e gestione del rischio."}
                </p>
              </div>
              <div className={`rounded-xl border px-3 py-2 text-sm ${isDark ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
                {isEnglish ? "Priority: preserve purchasing power" : "Priorita: preservare potere d'acquisto"}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3 mb-5">
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="font-semibold text-white">{isEnglish ? "Fiat-collateralized" : "Collateralizzate in fiat"}</p>
                <p className="mt-2 text-sm text-slate-300">
                  {isEnglish
                    ? "Issued against reserves (cash or T-bills). Usually the most liquid and widely used."
                    : "Emesse contro riserve (cash o T-bills). In genere sono le piu liquide e diffuse."}
                </p>
              </div>
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="font-semibold text-white">{isEnglish ? "Crypto-collateralized" : "Collateralizzate in crypto"}</p>
                <p className="mt-2 text-sm text-slate-300">
                  {isEnglish
                    ? "Backed by on-chain assets, often over-collateralized and transparent on-chain."
                    : "Garantite da asset on-chain, spesso sovra-collateralizzate e trasparenti on-chain."}
                </p>
              </div>
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="font-semibold text-white">{isEnglish ? "Algorithmic/hybrid" : "Algoritmiche/ibride"}</p>
                <p className="mt-2 text-sm text-slate-300">
                  {isEnglish
                    ? "Use market incentives and protocol logic. Higher complexity means higher risk."
                    : "Usano incentivi di mercato e logiche di protocollo. Piu complessita significa piu rischio."}
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {[
                isEnglish
                  ? "Check the issuer, reserve attestations, and legal transparency before holding size."
                  : "Verifica emittente, attestazioni delle riserve e trasparenza legale prima di allocare size.",
                isEnglish
                  ? "Always verify network and token contract (USDT/USDC can exist on multiple chains)."
                  : "Controlla sempre rete e contratto token (USDT/USDC esistono su chain diverse).",
                isEnglish
                  ? "Avoid concentrating all treasury in one stablecoin or one chain."
                  : "Evita di concentrare tutta la tesoreria su una sola stablecoin o una sola chain.",
                isEnglish
                  ? "Use test transfers first and monitor depeg risk during stress events."
                  : "Usa transazioni test e monitora il rischio depeg durante eventi di stress.",
              ].map((line) => (
                <div key={line} className="rounded-xl border border-indigo-500/25 bg-slate-950/20 p-4">
                  <p className="text-sm text-slate-300">{line}</p>
                </div>
              ))}
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

          <div
            id="nft"
            className={`manual-card scroll-mt-24 rounded-2xl border p-6 mb-8 ${
              isDark ? "bg-indigo-900/25 border-indigo-500/20" : "bg-white border-slate-200 shadow-lg"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
              <div>
                <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  {isEnglish ? "Project evaluation" : "Valutazione dei progetti"}
                </h3>
                <p className={`mt-2 text-sm md:text-base ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  {isEnglish
                    ? "A professional framework to evaluate any crypto project using fundamentals, on-chain demand, and execution discipline."
                    : "Framework professionale per valutare un progetto crypto con fondamentali, domanda on-chain e disciplina operativa."}
                </p>
              </div>
              <div className={`rounded-xl border px-3 py-2 text-sm ${isDark ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
                {isEnglish ? "Decision quality > prediction speed" : "Qualità decisionale > velocità di previsione"}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-4 mb-5">
              {[
                {
                  label: isEnglish ? "Dilution Risk" : "Rischio Diluizione",
                  value: "FDV / MCap",
                  hint: isEnglish ? "Lower is generally healthier." : "Più basso è generalmente meglio.",
                },
                {
                  label: isEnglish ? "Usage Efficiency" : "Efficienza d'Uso",
                  value: "TVL / MCap",
                  hint: isEnglish ? "Context-dependent, compare peers." : "Dipende dal settore, confronta i peer.",
                },
                {
                  label: isEnglish ? "Revenue Quality" : "Qualità Revenue",
                  value: isEnglish ? "Fees + retention" : "Fee + retention",
                  hint: isEnglish ? "Organic users beat incentive farming." : "Utenti organici > incentivi temporanei.",
                },
                {
                  label: isEnglish ? "Risk Control" : "Controllo Rischio",
                  value: isEnglish ? "Position sizing" : "Position sizing",
                  hint: isEnglish ? "Protect downside before upside." : "Proteggi il downside prima dell'upside.",
                },
              ].map((metric) => (
                <div key={metric.label} className={`rounded-xl border p-4 ${isDark ? "border-indigo-500/25 bg-indigo-900/20" : "border-slate-200 bg-slate-50"}`}>
                  <p className={`text-[11px] uppercase tracking-wide ${isDark ? "text-slate-400" : "text-slate-500"}`}>{metric.label}</p>
                  <p className={`mt-1 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{metric.value}</p>
                  <p className={`mt-2 text-xs ${isDark ? "text-slate-300" : "text-slate-600"}`}>{metric.hint}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {evaluationPillars.map((pillar) => {
                const active = pillar.id === activeEvaluationPillar;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActiveEvaluationPillar(pillar.id)}
                    className={`rounded-xl border px-3 py-2 text-sm transition-colors ${
                      active
                        ? isDark
                          ? "border-indigo-400/70 bg-indigo-500/20 text-white"
                          : "border-indigo-300 bg-indigo-50 text-indigo-800"
                        : isDark
                          ? "border-indigo-500/25 bg-indigo-900/20 text-slate-300 hover:bg-indigo-800/30"
                          : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {pillar.label}
                  </button>
                );
              })}
            </div>

            <div className={`rounded-2xl border p-5 mb-5 ${isDark ? "border-indigo-500/25 bg-indigo-950/35" : "border-slate-200 bg-white"}`}>
              <p className={`font-semibold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>{activeEvaluation.label}</p>
              <p className={`mt-1 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>{activeEvaluation.subtitle}</p>

              <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr] mt-4">
                <div className={`rounded-xl border p-4 ${isDark ? "border-indigo-500/20 bg-indigo-900/20" : "border-slate-200 bg-slate-50"}`}>
                  <p className={`text-sm font-semibold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>
                    {isEnglish ? "Checklist" : "Checklist operativa"}
                  </p>
                  <div className="space-y-2">
                    {activeEvaluation.checks.map((item) => (
                      <div key={item} className={`rounded-lg border px-3 py-2 text-sm ${isDark ? "border-indigo-500/20 bg-slate-950/30 text-slate-200" : "border-slate-200 bg-white text-slate-700"}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`rounded-xl border p-4 ${isDark ? "border-rose-400/25 bg-rose-500/10" : "border-rose-200 bg-rose-50"}`}>
                  <p className={`text-sm font-semibold mb-2 ${isDark ? "text-rose-200" : "text-rose-800"}`}>
                    {isEnglish ? "Red flags" : "Red flags (allerta)"}
                  </p>
                  <div className="space-y-2">
                    {activeEvaluation.redFlags.map((item) => (
                      <div key={item} className={`rounded-lg border px-3 py-2 text-sm ${isDark ? "border-rose-300/20 bg-rose-950/20 text-rose-100" : "border-rose-200 bg-white text-rose-800"}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3 mb-5">
              {[
                {
                  step: isEnglish ? "Step 1" : "Step 1",
                  title: isEnglish ? "Map the category" : "Mappa la categoria",
                  desc: isEnglish
                    ? "Pick 3-5 comparable projects and normalize metrics on the same timeframe."
                    : "Seleziona 3-5 comparabili e normalizza le metriche sullo stesso timeframe.",
                },
                {
                  step: isEnglish ? "Step 2" : "Step 2",
                  title: isEnglish ? "Score conviction" : "Assegna conviction score",
                  desc: isEnglish
                    ? "Rate fundamentals, demand, and execution from 1-5. Invest only if total score is above your threshold."
                    : "Valuta fondamentali, domanda e execution da 1 a 5. Entra solo sopra la tua soglia minima.",
                },
                {
                  step: isEnglish ? "Step 3" : "Step 3",
                  title: isEnglish ? "Build entry plan" : "Costruisci il piano d'ingresso",
                  desc: isEnglish
                    ? "Define invalidation, position size, and staged entries before opening the trade."
                    : "Definisci invalidazione, size e ingressi a tranche prima di aprire la posizione.",
                },
              ].map((step) => (
                <div key={step.title} className={`rounded-xl border p-4 ${isDark ? "border-indigo-500/25 bg-indigo-900/20" : "border-slate-200 bg-slate-50"}`}>
                  <p className={`text-xs uppercase tracking-wide ${isDark ? "text-indigo-300" : "text-indigo-700"}`}>{step.step}</p>
                  <p className={`mt-1 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{step.title}</p>
                  <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>{step.desc}</p>
                </div>
              ))}
            </div>

            <div className={`rounded-xl border p-4 ${isDark ? "border-amber-400/25 bg-amber-500/10" : "border-amber-200 bg-amber-50"}`}>
              <p className={`font-semibold ${isDark ? "text-amber-200" : "text-amber-900"}`}>
                {isEnglish ? "Position sizing template" : "Template position sizing"}
              </p>
              <p className={`mt-2 text-sm ${isDark ? "text-amber-100/90" : "text-amber-900/90"}`}>
                {isEnglish
                  ? "Risk per trade = Portfolio x 0.5%-1.0%. Position size = (Risk per trade) / (Entry - Invalidation). This keeps losses controlled even when conviction is high."
                  : "Rischio per trade = Portafoglio x 0.5%-1.0%. Size = (Rischio per trade) / (Entry - Invalidation). Così controlli le perdite anche con alta convinzione."}
              </p>
            </div>
          </div>

          <div id="sicurezza" className="manual-card scroll-mt-24 rounded-2xl border p-6 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <p className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-indigo-300" : "text-indigo-700"}`}>
                  {isEnglish ? "NFT strategy" : "Strategia NFT"}
                </p>
                <h2 className={`mt-2 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                  {isEnglish ? "How to evaluate NFT projects with discipline" : "Come valutare progetti NFT con disciplina"}
                </h2>
                <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  {isEnglish
                    ? "NFTs are a broad market: collectibles, utility assets, and tokenized creative IP. The edge is not chasing hype, but scoring community quality, utility sustainability, and brand defensibility with a repeatable framework."
                    : "Gli NFT sono un mercato ampio: collectible, asset con utilita e IP creativa tokenizzata. Il vantaggio non e inseguire l'hype, ma valutare qualita della community, sostenibilita dell'utilita e difendibilita del brand con un framework ripetibile."}
                </p>
              </div>
              <Link
                href="/nft"
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                  isDark
                    ? "border-indigo-400/40 bg-indigo-500/10 text-indigo-100 hover:bg-indigo-500/20"
                    : "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                }`}
              >
                {isEnglish ? "Open NFT section" : "Apri sezione NFT"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  kpi: isEnglish ? "Holder concentration" : "Concentrazione holder",
                  value: isEnglish ? "Top 10 < 35%" : "Top 10 < 35%",
                  note: isEnglish ? "Lower concentration, lower fragility." : "Minore concentrazione, minore fragilita.",
                },
                {
                  kpi: isEnglish ? "Engagement quality" : "Qualita engagement",
                  value: isEnglish ? "Weekly recurrence" : "Ricorrenza settimanale",
                  note: isEnglish ? "Events and content should be consistent." : "Eventi e contenuti devono essere costanti.",
                },
                {
                  kpi: isEnglish ? "Utility durability" : "Durata utilita",
                  value: isEnglish ? "Product-backed" : "Supportata da prodotto",
                  note: isEnglish ? "Benefits should not rely on new buyers." : "I benefici non devono dipendere da nuovi ingressi.",
                },
                {
                  kpi: isEnglish ? "IP defensibility" : "Difendibilita IP",
                  value: isEnglish ? "Clear licensing" : "Licensing chiaro",
                  note: isEnglish ? "Rights and terms must be explicit." : "Diritti e termini devono essere espliciti.",
                },
              ].map((item) => (
                <div key={item.kpi} className={`rounded-xl border p-4 ${isDark ? "border-indigo-500/25 bg-indigo-900/20" : "border-slate-200 bg-slate-50"}`}>
                  <p className={`text-xs uppercase tracking-wide ${isDark ? "text-indigo-300" : "text-indigo-700"}`}>{item.kpi}</p>
                  <p className={`mt-2 text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{item.value}</p>
                  <p className={`mt-1 text-xs ${isDark ? "text-slate-300" : "text-slate-600"}`}>{item.note}</p>
                </div>
              ))}
            </div>

            <div className={`mt-5 rounded-xl border p-4 ${isDark ? "border-indigo-500/25 bg-indigo-900/15" : "border-slate-200 bg-white"}`}>
              <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                {isEnglish ? "Interactive analysis framework" : "Framework analitico interattivo"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {nftFocusPillars.map((pillar) => (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActiveNftFocus(pillar.id)}
                    className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                      activeNftFocus === pillar.id
                        ? isDark
                          ? "border-indigo-300 bg-indigo-500/20 text-white"
                          : "border-indigo-300 bg-indigo-100 text-indigo-900"
                        : isDark
                          ? "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
                          : "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {pillar.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
                <div className={`rounded-xl border p-4 ${isDark ? "border-indigo-500/20 bg-indigo-950/30" : "border-slate-200 bg-slate-50"}`}>
                  <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{activeNftPillar.label}</p>
                  <p className={`mt-1 text-xs ${isDark ? "text-slate-300" : "text-slate-600"}`}>{activeNftPillar.subtitle}</p>
                  <ul className={`mt-3 space-y-2 text-sm ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                    {activeNftPillar.checks.map((check) => (
                      <li key={check} className="flex items-start gap-2">
                        <span className={`mt-1 inline-block h-1.5 w-1.5 rounded-full ${isDark ? "bg-emerald-300" : "bg-emerald-600"}`} />
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`rounded-xl border p-4 ${isDark ? "border-rose-300/30 bg-rose-500/10" : "border-rose-200 bg-rose-50"}`}>
                  <p className={`text-sm font-semibold ${isDark ? "text-rose-100" : "text-rose-900"}`}>
                    {isEnglish ? "Red flags to avoid" : "Red flag da evitare"}
                  </p>
                  <ul className={`mt-3 space-y-2 text-sm ${isDark ? "text-rose-100/90" : "text-rose-900/90"}`}>
                    {activeNftPillar.redFlags.map((flag) => (
                      <li key={flag} className="flex items-start gap-2">
                        <span className={`mt-1 inline-block h-1.5 w-1.5 rounded-full ${isDark ? "bg-rose-200" : "bg-rose-600"}`} />
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {[
                {
                  step: isEnglish ? "Step 1" : "Step 1",
                  title: isEnglish ? "Map project quality" : "Mappa qualita progetto",
                  desc: isEnglish
                    ? "Start from team credibility, roadmap delivery, and holder distribution."
                    : "Parti da credibilita team, delivery roadmap e distribuzione holder.",
                },
                {
                  step: isEnglish ? "Step 2" : "Step 2",
                  title: isEnglish ? "Score conviction" : "Assegna conviction score",
                  desc: isEnglish
                    ? "Rate each pillar from 1-5 and proceed only above your minimum threshold."
                    : "Valuta ogni pillar da 1 a 5 e procedi solo sopra la soglia minima.",
                },
                {
                  step: isEnglish ? "Step 3" : "Step 3",
                  title: isEnglish ? "Define portfolio sizing" : "Definisci position sizing",
                  desc: isEnglish
                    ? "Cap exposure per single collection and use staggered entries."
                    : "Limita esposizione per singola collezione e usa ingressi a tranche.",
                },
              ].map((step) => (
                <div key={step.title} className={`rounded-xl border p-4 ${isDark ? "border-indigo-500/25 bg-indigo-900/20" : "border-slate-200 bg-slate-50"}`}>
                  <p className={`text-xs uppercase tracking-wide ${isDark ? "text-indigo-300" : "text-indigo-700"}`}>{step.step}</p>
                  <p className={`mt-1 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{step.title}</p>
                  <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border p-6 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <div className="max-w-3xl">
              <p className={`text-xs uppercase tracking-[0.18em] ${isDark ? "text-amber-300" : "text-amber-700"}`}>
                {isEnglish ? "Security playbook" : "Playbook di sicurezza"}
              </p>
              <h2 className={`mt-2 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                {isEnglish ? "Anti-scam manual: protect capital and credentials" : "Manuale anti-truffe: proteggi capitale e credenziali"}
              </h2>
              <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                {isEnglish
                  ? "Most losses in crypto come from operational mistakes, not market direction. Build a process: verify sources, secure wallets, and execute with strict risk discipline."
                  : "Gran parte delle perdite nel crypto deriva da errori operativi, non dalla direzione del mercato. Serve un processo: verifica fonti, proteggi wallet e opera con disciplina di rischio."}
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  kpi: isEnglish ? "Link hygiene" : "Igiene dei link",
                  value: isEnglish ? "100% verified" : "100% verificati",
                  note: isEnglish ? "Use bookmarks and official domains only." : "Usa solo bookmark e domini ufficiali.",
                },
                {
                  kpi: isEnglish ? "Wallet architecture" : "Architettura wallet",
                  value: isEnglish ? "Treasury + burner" : "Tesoreria + burner",
                  note: isEnglish ? "Separate strategic funds from daily activity." : "Separa fondi strategici da operativita quotidiana.",
                },
                {
                  kpi: isEnglish ? "Approval control" : "Controllo approvazioni",
                  value: isEnglish ? "Weekly review" : "Revisione settimanale",
                  note: isEnglish ? "Revoke stale allowances on inactive dApps." : "Revoca allowance non piu necessarie.",
                },
                {
                  kpi: isEnglish ? "Incident readiness" : "Prontezza incidenti",
                  value: isEnglish ? "< 15 min response" : "Risposta < 15 min",
                  note: isEnglish ? "Predefine emergency actions before problems happen." : "Definisci azioni di emergenza prima dei problemi.",
                },
              ].map((item) => (
                <div key={item.kpi} className={`rounded-xl border p-4 ${isDark ? "border-indigo-500/25 bg-indigo-900/20" : "border-slate-200 bg-slate-50"}`}>
                  <p className={`text-xs uppercase tracking-wide ${isDark ? "text-amber-300" : "text-amber-700"}`}>{item.kpi}</p>
                  <p className={`mt-2 text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{item.value}</p>
                  <p className={`mt-1 text-xs ${isDark ? "text-slate-300" : "text-slate-600"}`}>{item.note}</p>
                </div>
              ))}
            </div>

            <div className={`mt-5 rounded-xl border p-4 ${isDark ? "border-indigo-500/25 bg-indigo-900/15" : "border-slate-200 bg-white"}`}>
              <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                {isEnglish ? "Interactive anti-scam framework" : "Framework anti-truffe interattivo"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {scamDefensePillars.map((pillar) => (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActiveScamDefense(pillar.id)}
                    className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                      activeScamDefense === pillar.id
                        ? isDark
                          ? "border-amber-300 bg-amber-500/20 text-white"
                          : "border-amber-300 bg-amber-100 text-amber-900"
                        : isDark
                          ? "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
                          : "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {pillar.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
                <div className={`rounded-xl border p-4 ${isDark ? "border-indigo-500/20 bg-indigo-950/30" : "border-slate-200 bg-slate-50"}`}>
                  <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{activeScamPillar.label}</p>
                  <p className={`mt-1 text-xs ${isDark ? "text-slate-300" : "text-slate-600"}`}>{activeScamPillar.subtitle}</p>
                  <ul className={`mt-3 space-y-2 text-sm ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                    {activeScamPillar.checks.map((check) => (
                      <li key={check} className="flex items-start gap-2">
                        <span className={`mt-1 inline-block h-1.5 w-1.5 rounded-full ${isDark ? "bg-emerald-300" : "bg-emerald-600"}`} />
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`rounded-xl border p-4 ${isDark ? "border-rose-300/30 bg-rose-500/10" : "border-rose-200 bg-rose-50"}`}>
                  <p className={`text-sm font-semibold ${isDark ? "text-rose-100" : "text-rose-900"}`}>
                    {isEnglish ? "Attack signals" : "Segnali di attacco"}
                  </p>
                  <ul className={`mt-3 space-y-2 text-sm ${isDark ? "text-rose-100/90" : "text-rose-900/90"}`}>
                    {activeScamPillar.redFlags.map((flag) => (
                      <li key={flag} className="flex items-start gap-2">
                        <span className={`mt-1 inline-block h-1.5 w-1.5 rounded-full ${isDark ? "bg-rose-200" : "bg-rose-600"}`} />
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {[
                {
                  step: isEnglish ? "Step 1" : "Step 1",
                  title: isEnglish ? "Pre-trade checks" : "Check pre-trade",
                  desc: isEnglish
                    ? "Confirm domain, contract address, and required permissions before any signature."
                    : "Conferma dominio, contract address e permessi richiesti prima di ogni firma.",
                },
                {
                  step: isEnglish ? "Step 2" : "Step 2",
                  title: isEnglish ? "Execute safely" : "Esegui in sicurezza",
                  desc: isEnglish
                    ? "Start with a test transfer, then scale size only after successful settlement."
                    : "Parti con una transazione test, poi aumenta la size solo dopo conferma corretta.",
                },
                {
                  step: isEnglish ? "Step 3" : "Step 3",
                  title: isEnglish ? "Post-trade cleanup" : "Pulizia post-trade",
                  desc: isEnglish
                    ? "Revoke unnecessary approvals, archive tx hashes, and update your risk log."
                    : "Revoca approvazioni inutili, archivia hash tx e aggiorna il tuo risk log.",
                },
              ].map((step) => (
                <div key={step.title} className={`rounded-xl border p-4 ${isDark ? "border-indigo-500/25 bg-indigo-900/20" : "border-slate-200 bg-slate-50"}`}>
                  <p className={`text-xs uppercase tracking-wide ${isDark ? "text-amber-300" : "text-amber-700"}`}>{step.step}</p>
                  <p className={`mt-1 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{step.title}</p>
                  <p className={`mt-2 text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>{step.desc}</p>
                </div>
              ))}
            </div>

            <div className={`mt-5 rounded-xl border p-4 ${isDark ? "border-amber-400/30 bg-amber-500/10" : "border-amber-200 bg-amber-50"}`}>
              <p className={`text-sm font-semibold ${isDark ? "text-amber-100" : "text-amber-900"}`}>
                {isEnglish ? "Emergency protocol" : "Protocollo di emergenza"}
              </p>
              <p className={`mt-2 text-sm ${isDark ? "text-amber-100/90" : "text-amber-900/90"}`}>
                {isEnglish
                  ? "If you suspect compromise: disconnect wallet, transfer remaining funds to a safe wallet, revoke approvals, rotate credentials, and document every transaction for forensic review."
                  : "Se sospetti compromissione: disconnetti wallet, trasferisci i fondi residui su wallet sicuro, revoca approvazioni, ruota credenziali e documenta ogni transazione per analisi successiva."}
              </p>
            </div>
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
    </AutoTranslateText>
  );
}
