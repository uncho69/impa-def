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

export type LearningPathRewardTask = {
  title: string;
  requirement: string;
  badge: string;
  badgeImage: string;
  guide: {
    intro: string;
    estimatedTime: string;
    difficulty: "Base" | "Media" | "Avanzata";
    steps: string[];
    tips: string[];
    ctaHref: string;
    ctaLabel: string;
  };
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
  rewardTasks: LearningPathRewardTask[];
  rewardNote: string;
  levelRewardUsdc: number;
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
    rewardTasks: [
      {
        title: "Funding iniziale wallet",
        requirement: "Ricevi almeno 0.006 ETH su ETH/Base o altre EVM supportate.",
        badge: "principiante_receive_eth",
        badgeImage: "/badges/tasks/principiante_receive_eth.svg",
        guide: {
          intro: "Porta liquidita nel wallet operativo per iniziare il percorso in sicurezza.",
          estimatedTime: "5-10 min",
          difficulty: "Base",
          steps: [
            "Apri il wallet non-custodial che userai per il percorso e copia il tuo address pubblico.",
            "Vai su CEX o on-ramp dove hai gia crypto acquistate e apri la schermata di prelievo/withdraw.",
            "Incolla il tuo address wallet, seleziona la stessa rete EVM e imposta almeno 0.006 ETH.",
            "Controlla network e address prima di confermare, poi attendi la conferma on-chain e verifica saldo aggiornato.",
          ],
          tips: [
            "Fai prima una test transaction con importo minimo.",
            "Mantieni sempre una parte di ETH per le gas fee.",
          ],
          ctaHref: "/manuale#wallet",
          ctaLabel: "Apri guida Wallet",
        },
      },
      {
        title: "Primo swap su Uniswap",
        requirement: "Swappa almeno 0.003 ETH su Uniswap.",
        badge: "principiante_swap_uniswap",
        badgeImage: "/badges/tasks/principiante_swap_uniswap.svg",
        guide: {
          intro: "Esegui il tuo primo swap DEX per sbloccare il badge di execution base.",
          estimatedTime: "5-12 min",
          difficulty: "Base",
          steps: [
            "Apri Uniswap e collega il wallet.",
            "Seleziona pair e chain corretta.",
            "Inserisci almeno 0.003 ETH e controlla slippage.",
            "Conferma transazione e attendi esecuzione.",
          ],
          tips: [
            "Evita token poco liquidi nelle prime operazioni.",
            "Controlla sempre price impact prima del confirm.",
          ],
          ctaHref: "/defi",
          ctaLabel: "Apri sezione DeFi",
        },
      },
      {
        title: "Bridge su Relay",
        requirement: "Bridge di almeno 0.003 ETH da EVM a EVM/SOL via Relay.",
        badge: "principiante_bridge_relay",
        badgeImage: "/badges/tasks/principiante_bridge_relay.svg",
        guide: {
          intro: "Impara a spostare fondi cross-chain con bridge operativo.",
          estimatedTime: "8-20 min",
          difficulty: "Base",
          steps: [
            "Apri Relay e collega wallet.",
            "Scegli chain di origine e destinazione (EVM o SOL).",
            "Imposta almeno 0.003 ETH di bridge.",
            "Conferma tx su chain sorgente e attendi completamento.",
          ],
          tips: [
            "Verifica sempre il tempo stimato del bridge.",
            "Controlla fee totale prima di inviare.",
          ],
          ctaHref: "/defi",
          ctaLabel: "Apri strumenti DeFi",
        },
      },
      {
        title: "Deposit su Aave",
        requirement: "Deposita almeno 0.003 ETH su Aave (EVM supportate).",
        badge: "principiante_deposit_aave",
        badgeImage: "/badges/tasks/principiante_deposit_aave.svg",
        guide: {
          intro: "Completa il primo step lending depositando asset su Aave.",
          estimatedTime: "6-15 min",
          difficulty: "Base",
          steps: [
            "Apri Aave sulla chain scelta.",
            "Seleziona ETH e clicca Supply/Deposit.",
            "Inserisci almeno 0.003 ETH e conferma allowance/tx.",
            "Verifica che il deposito sia visibile nella dashboard.",
          ],
          tips: [
            "Controlla APY e rischio del mercato selezionato.",
            "Conserva sempre liquidita per fee e movimenti successivi.",
          ],
          ctaHref: "/defi",
          ctaLabel: "Apri Aave nel percorso DeFi",
        },
      },
    ],
    rewardNote:
      "Ogni task completa 1 badge. Con 4/4 task ottieni il badge livello Principiante e puoi claimare la reward dalla sezione Profilo > Badges.",
    levelRewardUsdc: 3,
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
    rewardTasks: [
      {
        title: "Prestito su Aave",
        requirement: "Apri un borrow su Aave di almeno $3.",
        badge: "intermedio_aave_borrow",
        badgeImage: "/badges/tasks/intermedio_aave_borrow.svg",
        guide: {
          intro: "Passa da lender a borrower con un prestito controllato.",
          estimatedTime: "8-18 min",
          difficulty: "Media",
          steps: [
            "Assicurati di avere collateral depositato su Aave.",
            "Seleziona asset da prendere in prestito.",
            "Imposta borrow >= $3 con health factor prudente.",
            "Conferma transazione e verifica posizione aperta.",
          ],
          tips: [
            "Mantieni health factor alto per ridurre rischio liquidazione.",
            "Monitora tasso variabile/fisso del borrow.",
          ],
          ctaHref: "/manuale#strategie",
          ctaLabel: "Apri guida strategie",
        },
      },
      {
        title: "Deposit su Hyperbeat",
        requirement: "Deposita almeno 0.3 HYPE su Hyperbeat.",
        badge: "intermedio_hyperbeat_deposit",
        badgeImage: "/badges/tasks/intermedio_hyperbeat_deposit.svg",
        guide: {
          intro: "Completa una missione ecosistema Hyperbeat con deposito on-chain.",
          estimatedTime: "6-14 min",
          difficulty: "Media",
          steps: [
            "Collega wallet su Hyperbeat.",
            "Seleziona token HYPE e market corretto.",
            "Inserisci almeno 0.3 HYPE e conferma il deposit.",
            "Controlla che la posizione sia registrata correttamente.",
          ],
          tips: [
            "Verifica network supportato prima dell'operazione.",
            "Evita orari di congestione se le fee salgono.",
          ],
          ctaHref: "/defi/hyperliquid/guida-rapida",
          ctaLabel: "Apri guida Hyperliquid",
        },
      },
      {
        title: "Deposit Hyperliquid via Unit",
        requirement: "Deposita almeno $5 in USDC (o equivalente) su Hyperliquid tramite Unit.",
        badge: "intermedio_hyperliquid_unit_deposit",
        badgeImage: "/badges/tasks/intermedio_hyperliquid_unit_deposit.svg",
        guide: {
          intro: "Onboarding su Hyperliquid con deposito minimo operativo.",
          estimatedTime: "8-20 min",
          difficulty: "Media",
          steps: [
            "Apri Unit/Hyperliquid con wallet collegato.",
            "Scegli asset (USDC o equivalente) e importo >= $5.",
            "Conferma transfer/deposit verso Hyperliquid.",
            "Verifica bilancio disponibile su account Hyperliquid.",
          ],
          tips: [
            "Controlla memo/network se richiesti dal bridge.",
            "Fai prima un importo ridotto se e il primo utilizzo.",
          ],
          ctaHref: "/defi/hyperliquid/guida-rapida",
          ctaLabel: "Apri tutorial Hyperliquid",
        },
      },
    ],
    rewardNote:
      "Ogni task completa 1 badge. Con 3/3 task ottieni il badge livello Intermedio e puoi claimare la reward dalla sezione Profilo > Badges.",
    levelRewardUsdc: 5,
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
    rewardTasks: [
      {
        title: "Trade su Hyperliquid",
        requirement: "Apri un trade di almeno $4 su Hyperliquid.",
        badge: "avanzato_hyperliquid_trade",
        badgeImage: "/badges/tasks/avanzato_hyperliquid_trade.svg",
        guide: {
          intro: "Esegui un trade reale con gestione del rischio.",
          estimatedTime: "10-20 min",
          difficulty: "Avanzata",
          steps: [
            "Apri il terminal Hyperliquid e seleziona pair.",
            "Definisci size >= $4 e direzione (long/short).",
            "Imposta stop/invalidation prima del submit.",
            "Conferma order e monitora esecuzione.",
          ],
          tips: [
            "Evita leva alta nelle prime operazioni.",
            "Annota entry/exit per review a fine giornata.",
          ],
          ctaHref: "/manuale#strategie",
          ctaLabel: "Apri guida risk management",
        },
      },
      {
        title: "Acquisto YT/PT su Pendle",
        requirement: "Compra almeno $5 di YT o PT su Pendle.",
        badge: "avanzato_pendle_buy",
        badgeImage: "/badges/tasks/avanzato_pendle_buy.svg",
        guide: {
          intro: "Completa una strategia fixed/yield token su Pendle.",
          estimatedTime: "10-22 min",
          difficulty: "Avanzata",
          steps: [
            "Apri Pendle e scegli pool/mercato.",
            "Valuta se acquistare PT o YT in base alla tesi.",
            "Inserisci importo >= $5 e conferma swap.",
            "Controlla posizione e data di maturity.",
          ],
          tips: [
            "Leggi sempre maturity e implied yield.",
            "Non usare size alta senza capire PT vs YT.",
          ],
          ctaHref: "/defi",
          ctaLabel: "Apri sezione DeFi avanzata",
        },
      },
      {
        title: "Deposit su Extended Vault",
        requirement: "Deposita almeno $5 nella Vault di Extended.",
        badge: "avanzato_extended_vault_deposit",
        badgeImage: "/badges/tasks/avanzato_extended_vault_deposit.svg",
        guide: {
          intro: "Concludi il livello avanzato con un deposito su vault.",
          estimatedTime: "8-18 min",
          difficulty: "Avanzata",
          steps: [
            "Apri Extended e collega wallet.",
            "Seleziona vault con strategia coerente al tuo profilo rischio.",
            "Deposita almeno $5 e conferma transazione.",
            "Verifica quota e dettagli performance della vault.",
          ],
          tips: [
            "Controlla lock period e withdrawal conditions.",
            "Leggi la strategia della vault prima del deposito.",
          ],
          ctaHref: "/manuale#strategie",
          ctaLabel: "Apri guida allocazione",
        },
      },
    ],
    rewardNote:
      "Ogni task completa 1 badge. Con 3/3 task ottieni il badge livello Avanzato e puoi claimare la reward dalla sezione Profilo > Badges.",
    levelRewardUsdc: 10,
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

