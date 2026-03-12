export type ManualAudienceSlug =
  | "consumatori"
  | "negozianti"
  | "governi"
  | "imprese"
  | "sviluppatori"
  | "creatori";

export type ManualAudienceAction = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

export type ManualAudiencePageData = {
  slug: ManualAudienceSlug;
  icon: string;
  title: string;
  subtitle: string;
  summary: string;
  keyPoints: string[];
  playbook: string[];
  pitfalls: string[];
  actions: ManualAudienceAction[];
};

const MANUAL_AUDIENCE_PAGES: Record<ManualAudienceSlug, ManualAudiencePageData> = {
  consumatori: {
    slug: "consumatori",
    icon: "👤",
    title: "Per i Consumatori",
    subtitle: "Custodia, autonomia e uso intelligente delle app Web3.",
    summary:
      "Questa guida trasforma un utente retail in un utente operativo: sicurezza wallet, primi passi in DeFi e valutazione rischio su NFT/memecoin.",
    keyPoints: [
      "Controllo diretto dei fondi con wallet non-custodial.",
      "Accesso globale a servizi finanziari senza intermediari tradizionali.",
      "Trasparenza on-chain: puoi verificare dati e transazioni.",
      "Strategia graduale: test piccoli prima di aumentare la size.",
    ],
    playbook: [
      "Apri un wallet e salva la seed phrase offline.",
      "Compra una piccola cifra da canale affidabile e fai una transazione test.",
      "Inizia da protocolli noti (DEX/lending) con capitale ridotto.",
      "Documenta errori e risultati: migliora il processo, non inseguire hype.",
    ],
    pitfalls: [
      "Usare un solo wallet per tutto (operatività + risparmi).",
      "Firmare transazioni senza leggere permessi/approve.",
      "Entrare su memecoin o NFT senza gestione rischio.",
    ],
    actions: [
      {
        title: "Portafogli non-custodial",
        description: "Scegli wallet affidabili e imposta una sicurezza di base corretta.",
        href: "/wallet",
        cta: "Vai a Portafogli",
      },
      {
        title: "DeFi fundamentals",
        description: "Impara swap, lending, rendimento e gestione delle fee.",
        href: "/defi",
        cta: "Vai a DeFi",
      },
      {
        title: "NFT e community",
        description: "Capire utilità reale, liquidità e qualità delle community.",
        href: "/nft",
        cta: "Vai a NFT",
      },
      {
        title: "Memecoin risk framework",
        description: "Approccio ad alta volatilità: sizing, exit plan e controllo rischio.",
        href: "/memecoins",
        cta: "Vai a Memecoin",
      },
      {
        title: "Gitcoin",
        description: "Scopri grant e funding comunitario nel mondo open source.",
        href: "/airdrops/gitcoin",
        cta: "Apri Gitcoin",
      },
    ],
  },
  negozianti: {
    slug: "negozianti",
    icon: "🛍️",
    title: "Per i Negozianti",
    subtitle: "Accettare pagamenti crypto in modo semplice e compliance-friendly.",
    summary:
      "Focus su incasso in stablecoin, riduzione fee, integrazione checkout e riconciliazione operativa per e-commerce e retail.",
    keyPoints: [
      "Pagamenti globali con settlement rapido.",
      "Riduzione dipendenza da circuiti tradizionali.",
      "Stablecoin come ponte tra crypto e gestione cassa.",
      "Nuove leve loyalty e community-driven marketing.",
    ],
    playbook: [
      "Definisci policy: quali asset accetti e come gestisci conversione.",
      "Integra una soluzione di checkout crypto con monitoraggio ordini.",
      "Parti con USDC su volumi limitati e crea SOP interne.",
      "Allinea accounting, fiscalità e riconciliazione periodica.",
    ],
    pitfalls: [
      "Accettare troppi asset senza una policy chiara.",
      "Non gestire il rischio cambio su asset volatili.",
      "Implementare checkout senza test su casi edge (refund, charge dispute).",
    ],
    actions: [
      {
        title: "Coinbase Commerce / USDC checkout",
        description: "Integrazione pagamenti crypto per merchant online.",
        href: "https://www.coinbase.com/commerce",
        cta: "Apri Coinbase Commerce",
      },
      {
        title: "Accept USDC (Coinbase)",
        description: "Panoramica strumenti per accettare USDC in modo operativo.",
        href: "https://www.coinbase.com/accept-usdc",
        cta: "Apri Accept USDC",
      },
      {
        title: "Stripe crypto resources",
        description: "Soluzioni payment e risorse Stripe per pagamenti digitali.",
        href: "https://stripe.com",
        cta: "Apri Stripe",
      },
      {
        title: "Compra/Vendi Crypto",
        description: "Confronta on-ramp e strumenti per conversione operativa.",
        href: "/compraevendicrypto",
        cta: "Vai a Compra/Vendi",
      },
      {
        title: "Wallet operativi",
        description: "Setup wallet merchant e segregazione fondi business.",
        href: "/wallet",
        cta: "Vai a Portafogli",
      },
    ],
  },
  governi: {
    slug: "governi",
    icon: "🏛️",
    title: "Per i Governi",
    subtitle: "Trasparenza, auditabilità e servizi pubblici digitali.",
    summary:
      "Percorso introduttivo per comprendere i casi d’uso pubblici: identità, tracciabilità, pagamenti e modernizzazione amministrativa.",
    keyPoints: [
      "Registri pubblici verificabili e immutabili.",
      "Riduzione attriti burocratici con workflow programmabili.",
      "Migliore tracciabilità per aiuti e fondi pubblici.",
      "Possibilità di audit civico su dataset on-chain.",
    ],
    playbook: [
      "Seleziona un caso d’uso specifico (es. tracciamento fondi).",
      "Progetta un pilot su scala ridotta e metriche chiare.",
      "Valuta privacy, governance e integrazione con sistemi legacy.",
      "Pubblica risultati e criteri di verifica per trasparenza pubblica.",
    ],
    pitfalls: [
      "Pilot senza obiettivi misurabili o KPI di impatto.",
      "Scelta tecnologica guidata dal trend e non dal caso d’uso.",
      "Assenza di piano per interoperabilità e manutenzione.",
    ],
    actions: [
      {
        title: "Panoramica blockchain",
        description: "Base tecnica per capire reti, consenso e auditabilità.",
        href: "/blockchain",
        cta: "Vai a Blockchain",
      },
      {
        title: "Eventi storici Web3",
        description: "Lezioni da hack, crisi e svolte normative del settore.",
        href: "/eventi-storici",
        cta: "Vai a Eventi Storici",
      },
      {
        title: "Notizie e scenario",
        description: "Segui trend macro, policy e innovazioni del settore.",
        href: "/news",
        cta: "Vai a Notizie",
      },
      {
        title: "Strumenti analisi",
        description: "Explorer e tool data-driven per monitoraggio pubblico.",
        href: "/strumentiutili",
        cta: "Vai a Strumenti Utili",
      },
    ],
  },
  imprese: {
    slug: "imprese",
    icon: "🏢",
    title: "Per Imprese e Grandi Aziende",
    subtitle: "Tokenizzazione, efficienza operativa e nuovi modelli di business.",
    summary:
      "Guida pratica per team business/prodotto: dove Web3 può creare vantaggio competitivo reale e come testarlo senza over-commit.",
    keyPoints: [
      "Automazione tramite smart contract e riduzione costi operativi.",
      "Tracciabilità supply chain e certificazione processi.",
      "Nuovi modelli loyalty e community ownership.",
      "Sperimentazione di prodotti digitali con go-to-market rapido.",
    ],
    playbook: [
      "Identifica 1 use-case con ROI potenziale chiaro.",
      "Costruisci pilot con team cross-funzionale (ops/finance/legal).",
      "Definisci metriche: costo, tempo ciclo, adozione utente.",
      "Scala solo dopo validazione tecnica e commerciale.",
    ],
    pitfalls: [
      "Progetti troppo grandi senza fase pilota.",
      "Mancanza di allineamento tra compliance, prodotto e operation.",
      "Nessuna strategia per education interna del team.",
    ],
    actions: [
      {
        title: "DeFi e protocolli",
        description: "Capire i mattoni principali su cui costruire servizi finanziari.",
        href: "/defi",
        cta: "Vai a DeFi",
      },
      {
        title: "Tool di analisi",
        description: "Stack strumenti per monitoraggio e valutazione progetti.",
        href: "/strumentiutili",
        cta: "Vai a Strumenti Utili",
      },
      {
        title: "On-ramp e payment rails",
        description: "Canali per acquisto/gestione asset in contesto business.",
        href: "/compraevendicrypto",
        cta: "Vai a Compra/Vendi",
      },
      {
        title: "Wallet architecture",
        description: "Impostare custodia e separazione ruoli per team operativi.",
        href: "/wallet",
        cta: "Vai a Portafogli",
      },
    ],
  },
  sviluppatori: {
    slug: "sviluppatori",
    icon: "🧑‍💻",
    title: "Per Sviluppatori e Innovatori",
    subtitle: "Costruire prodotti Web3 solidi, composabili e user-centric.",
    summary:
      "Roadmap per sviluppatori: dalla comprensione dei protocolli al lancio di feature reali con focus su security, UX e iterazione rapida.",
    keyPoints: [
      "Ecosistema open source e standard interoperabili.",
      "Componibilità: integrare servizi esistenti invece di reinventare.",
      "Sicurezza come requisito di prodotto, non optional.",
      "Feedback rapido da community e utenti power-user.",
    ],
    playbook: [
      "Studia 2-3 protocolli reference e i loro design pattern.",
      "Costruisci MVP con workflow minimo e testabile.",
      "Valida UX su utenti reali e ottimizza onboarding wallet.",
      "Itera con telemetry, bug triage e hardening sicurezza.",
    ],
    pitfalls: [
      "Sottostimare la UX di firma/transazione.",
      "Integrare troppi protocolli insieme nella prima release.",
      "Ignorare logging e monitoraggio post-lancio.",
    ],
    actions: [
      {
        title: "Blockchains da conoscere",
        description: "Confronto ecosistemi dove distribuire app e funzionalità.",
        href: "/blockchain",
        cta: "Vai a Blockchain",
      },
      {
        title: "Protocolli DeFi",
        description: "Catalogo progetti e pagine tecniche già strutturate.",
        href: "/defi",
        cta: "Vai a DeFi",
      },
      {
        title: "Toolkit operativo",
        description: "Explorer, analytics e strumenti di ricerca on-chain.",
        href: "/strumentiutili",
        cta: "Vai a Strumenti Utili",
      },
      {
        title: "Gitcoin (grants)",
        description: "Funding e opportunità per team builder open source.",
        href: "/airdrops/gitcoin",
        cta: "Apri Gitcoin",
      },
    ],
  },
  creatori: {
    slug: "creatori",
    icon: "🎨",
    title: "Per Artisti e Creatori",
    subtitle: "Distribuzione, monetizzazione e community ownership nel Web3.",
    summary:
      "Percorso pratico per creator: setup wallet, pubblicazione asset, crescita community e monetizzazione sostenibile tramite NFT/social graph.",
    keyPoints: [
      "Monetizzazione diretta con controllo su distribuzione.",
      "Royalties programmabili e nuovi modelli membership.",
      "Community-first: audience attiva, non solo traffico.",
      "Possibilità di sperimentare formati e utility digitali.",
    ],
    playbook: [
      "Definisci il tuo format creativo e utility per la community.",
      "Setup wallet e profili creator su piattaforme rilevanti.",
      "Lancia una collezione/pilot con pricing trasparente.",
      "Analizza engagement e itera su contenuto e reward.",
    ],
    pitfalls: [
      "Lanciare collezioni senza roadmap community.",
      "Prezzi iniziali non coerenti con audience reale.",
      "Dipendere da una sola piattaforma di distribuzione.",
    ],
    actions: [
      {
        title: "Wallet per creator",
        description: "Base operativa per gestire asset, mint e incassi.",
        href: "/wallet",
        cta: "Vai a Portafogli",
      },
      {
        title: "Ecosistema NFT",
        description: "Marketplace, collezioni e valutazione opportunità.",
        href: "/nft",
        cta: "Vai a NFT",
      },
      {
        title: "Zora",
        description: "Piattaforma creator-centric per pubblicare e distribuire contenuti.",
        href: "/airdrops/zora",
        cta: "Apri Zora",
      },
      {
        title: "Warpcast / Farcaster",
        description: "Social graph nativo Web3 per costruire community.",
        href: "/airdrops/warpcast",
        cta: "Apri Warpcast",
      },
      {
        title: "OpenSea",
        description: "Marketplace NFT per distribuzione e liquidità secondaria.",
        href: "/giochi/opensea",
        cta: "Apri OpenSea",
      },
    ],
  },
};

export const MANUAL_AUDIENCE_SLUGS = Object.keys(MANUAL_AUDIENCE_PAGES) as ManualAudienceSlug[];

export function getManualAudiencePageData(slug: string): ManualAudiencePageData | null {
  const key = slug.toLowerCase() as ManualAudienceSlug;
  return MANUAL_AUDIENCE_PAGES[key] ?? null;
}
