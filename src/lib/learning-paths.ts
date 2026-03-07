export type LearningPathCard = {
  level: string;
  sub: string;
  desc: string;
  href: string;
};

export type LearningPathModule = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

export type LearningPathData = {
  slug: string;
  level: string;
  subtitle: string;
  summary: string;
  duration: string;
  commitment: string;
  whoIsFor: string;
  outcomes: string[];
  modules: LearningPathModule[];
  pitfalls: string[];
};

export const LEARNING_PATHS: LearningPathData[] = [
  {
    slug: "principiante",
    level: "Principiante",
    subtitle: "Onboarding Web3 senza caos",
    summary:
      "Impari le basi pratiche: wallet, sicurezza, acquisto dei primi asset e uso delle prime app in modo controllato.",
    duration: "2-3 settimane",
    commitment: "20-30 minuti al giorno",
    whoIsFor: "Chi parte da zero o vuole un reset ordinato delle basi.",
    outcomes: [
      "Configuri un wallet non-custodial in sicurezza",
      "Capisci differenza tra CEX, on-ramp e wallet personale",
      "Esegui le prime transazioni senza errori comuni",
      "Leggi metriche base (market cap, supply, rischio)",
    ],
    modules: [
      {
        title: "Fondamenti e linguaggio Web3",
        description: "Capire cosa sono blockchain, asset digitali e DeFi senza tecnicismi inutili.",
        href: "/manuale#fondamenti",
        cta: "Apri Fondamenti",
      },
      {
        title: "Wallet setup e sicurezza operativa",
        description: "Seed phrase, wallet cold/attivo, regole anti-phishing e test transaction.",
        href: "/manuale#wallet",
        cta: "Apri Wallet",
      },
      {
        title: "Primo acquisto e trasferimento",
        description: "Percorso pratico CEX/on-ramp -> wallet personale con checklist pre-invio.",
        href: "/manuale#onramp",
        cta: "Apri Accesso al mercato",
      },
      {
        title: "Primi strumenti e dashboard",
        description: "Impostare una routine base tra portfolio tracking e ricerca progetti.",
        href: "/strumentiutili",
        cta: "Apri Strumenti Utili",
      },
    ],
    pitfalls: [
      "Usare un solo wallet per tutto",
      "Firmare transazioni senza verificare dominio e permessi",
      "Entrare con size troppo alta nei primi giorni",
    ],
  },
  {
    slug: "intermedio",
    level: "Intermedio",
    subtitle: "DeFi execution e gestione del rischio",
    summary:
      "Passi da utente base a utente operativo: swap, LP, lending e analisi comparativa tra protocolli.",
    duration: "4-6 settimane",
    commitment: "30-45 minuti al giorno",
    whoIsFor: "Chi usa già wallet e vuole migliorare execution e decision making.",
    outcomes: [
      "Valuti protocolli con framework (TVL/MC, tokenomics, narrativa)",
      "Costruisci una routine DeFi con rischio controllato",
      "Distingui opportunità reali da hype temporaneo",
      "Imposti un processo di revisione periodica del portafoglio",
    ],
    modules: [
      {
        title: "Mappa protocolli DeFi",
        description: "DEX, lending, yield, bridge: scegliere il tool giusto per lo scenario giusto.",
        href: "/defi",
        cta: "Apri sezione DeFi",
      },
      {
        title: "Valutazione progetto step-by-step",
        description: "Market cap, FDV, supply e ratio TVL/MC per evitare valutazioni superficiali.",
        href: "/manuale#nft",
        cta: "Apri Valutazione Progetti",
      },
      {
        title: "Strategie di allocazione",
        description: "Diversificazione per tesi, orizzonte temporale e livello di rischio.",
        href: "/manuale#strategie",
        cta: "Apri Strategie",
      },
      {
        title: "Risk management pratico",
        description: "Position sizing, invalidazione e limiti di esposizione per categoria.",
        href: "/manuale#sicurezza",
        cta: "Apri Sicurezza",
      },
    ],
    pitfalls: [
      "Confondere alta APR con alta qualità del protocollo",
      "Ignorare lockup/unlock e rischio di diluizione",
      "Overtrading su segnali di breve periodo",
    ],
  },
  {
    slug: "avanzato",
    level: "Avanzato",
    subtitle: "Ricerca alpha e strategie evolute",
    summary:
      "Approccio da power-user: workflow di ricerca, monitoraggio on-chain e ottimizzazione performance.",
    duration: "Continuo (ciclo mensile)",
    commitment: "45-60 minuti al giorno",
    whoIsFor: "Chi vuole un sistema ripetibile di ricerca, esecuzione e revisione.",
    outcomes: [
      "Costruisci pipeline di ricerca (news, on-chain, narrative)",
      "Applichi un piano di execution multi-scenario",
      "Riduci drawdown con disciplina e post-analisi",
      "Mantieni vantaggio informativo nel tempo",
    ],
    modules: [
      {
        title: "Airdrop e protocolli emergenti",
        description: "Selezione opportunità ad alto potenziale con costo-opportunità sostenibile.",
        href: "/airdrops",
        cta: "Apri Airdrops",
      },
      {
        title: "Price action e timing",
        description: "Setup multi-timeframe, aree di liquidità e piano d'ingresso/uscita.",
        href: "/manuale#nft",
        cta: "Apri Price Action",
      },
      {
        title: "Framework decisionale",
        description: "Tesi -> trigger -> invalidazione -> target -> review post-trade.",
        href: "/manuale#nft",
        cta: "Apri Framework",
      },
      {
        title: "Monitoraggio ecosistema",
        description: "Unire manuale, notizie e mappa ecosistema in una dashboard personale.",
        href: "/esplora-app",
        cta: "Apri Mappa Ecosistema",
      },
    ],
    pitfalls: [
      "Inseguire troppe narrative contemporaneamente",
      "Cambiare strategia dopo ogni trade",
      "Trascurare journaling e review delle decisioni",
    ],
  },
];

export const LEARNING_PATH_CARDS: LearningPathCard[] = LEARNING_PATHS.map((path) => ({
  level: path.level,
  sub: "Apprendimento",
  desc: path.summary,
  href: `/percorsi-apprendimento/${path.slug}`,
}));

export function getLearningPathBySlug(slug: string): LearningPathData | null {
  return LEARNING_PATHS.find((item) => item.slug === slug) || null;
}

