const PHRASE_REPLACEMENTS: Array<[string, string]> = [
  ["Torna al Manuale", "Back to Manual"],
  ["Torna alla Dashboard", "Back to Dashboard"],
  ["Cosa conta davvero", "What really matters"],
  ["Playbook operativo", "Operational playbook"],
  ["Azioni consigliate", "Recommended actions"],
  ["Errori da evitare", "Mistakes to avoid"],
  ["Apri guida categoria", "Open category guide"],
  ["Basi DeFi", "DeFi Basics"],
  ["Guida Airdrops", "Airdrops Guide"],
  ["Notizie Airdrops", "Airdrops News"],
  ["Notizie Rilevanti", "Relevant News"],
  ["Sito ufficiale", "Official website"],
  ["Guida Rapida", "Quick Guide"],
  ["Inizia Subito", "Get Started"],
  ["Gestione Liquidita", "Liquidity Management"],
  ["Guida Base", "Core Guide"],
  ["Rischi Operativi", "Operational Risks"],
  ["Opportunita", "Opportunities"],
  ["Come usarlo", "How to use it"],
  ["Contenuti", "Content"],
  ["Link Utili", "Useful Links"],
  ["Rischi & Dati", "Risk & Data"],
  ["Dati & Rischi", "Data & Risk"],
  ["Apri dettagli", "Open details"],
  ["Apri contenuto", "Open content"],
  ["News in evidenza", "Featured news"],
  ["Nessun articolo in evidenza al momento", "No featured articles at the moment"],
  ['Gli articoli pubblicati e contrassegnati come "in evidenza" appariranno qui', 'Published articles marked as "featured" will appear here'],
  ["Le ultime notizie dal mondo crypto, sempre aggiornate", "Latest crypto news, always updated"],
  ["Valutazione dei progetti", "Project evaluation"],
  ["Analizzare un Cryptoasset dalla Market Cap", "Analyzing a cryptoasset through Market Cap"],
  ["Calcolare il Rischio usando la Media del Prezzo", "Calculating risk using price averages"],
  ["Come funziona", "How it works"],
  ["Offerta in Circolazione", "Circulating Supply"],
  ["Offerta totale", "Total Supply"],
  ["Offerta Massima", "Max Supply"],
  ["Capitalizzazione di Mercato", "Market Capitalization"],
  ["Benefici delle tecnologie Web3", "Benefits of Web3 technologies"],
  ["Introduzione alle Blockchain", "Blockchain Introduction"],
  ["Introduzione ai Portafogli Crypto", "Crypto Wallet Introduction"],
  ["Come Comprare e Vendere Crypto", "How to Buy and Sell Crypto"],
  ["Intro ai Memecoin", "Memecoin Introduction"],
  ["Intro ai NFTs", "NFT Introduction"],
  ["Intro ai Giochi Web3", "Web3 Gaming Introduction"],
  ["Intro ai Mercati di Predizione", "Prediction Markets Introduction"],
  ["Come funzionano gli Airdrops", "How Airdrops work"],
  ["Categorie Airdrop interattive", "Interactive Airdrop categories"],
  ["Strategie per massimizzare gli Airdrops", "Strategies to maximize Airdrops"],
  ["Attenzione alle truffe", "Scam warning"],
  ["Risorsa utile", "Useful resource"],
  ["Applicazioni DeFi interattive", "Interactive DeFi applications"],
  ["Piattaforme disponibili", "Available platforms"],
  ["Sicurezza e best practice", "Security and best practices"],
  ["Vantaggi principali", "Main benefits"],
  ["Caratteristiche principali", "Main characteristics"],
  ["Utilizzi comuni", "Common use cases"],
  ["Come comprare e vendere", "How to buy and sell"],
  ["Problemi tecnici comuni", "Common technical issues"],
  ["Avvertenze importanti", "Important warnings"],
  ["Rischi e attenzione", "Risks and caution"],
  ["Rischi e best practice", "Risks and best practices"],
  ["Come funziona il Play-to-Earn", "How Play-to-Earn works"],
  ["Vantaggi dei giochi Web3", "Benefits of Web3 games"],
  ["Address pubblico", "Public address"],
  ["chiave privata", "private key"],
  ["seed phrase", "seed phrase"],
  ["Manuale per evitare truffe", "Anti-scam guide"],
  ["Ricerca Approfondita", "Thorough research"],
  ["Attenzione ai Link Malevoli", "Beware of malicious links"],
  ["Riconosci i Segnali di Allarme", "Recognize warning signs"],
  ["Utilizza Exchange Reputati", "Use reputable exchanges"],
  ["Proteggi i Tuoi Wallet", "Protect your wallets"],
  ["Evita le Truffe dei Falsi Airdrop", "Avoid fake airdrop scams"],
  ["Vai alla scheda", "Go to page"],
  ["Vai alla pagina", "Go to page"],
  ["Torna alla Home", "Back to Home"],
  ["Tutti i projects dell'ecosistema", "All ecosystem projects"],
  ["Tutti i progetti dell'ecosistema", "All ecosystem projects"],
  ["Cerca per nome o id", "Search by name or id"],
  ["Ordina per market cap", "Sort by market cap"],
  ["Nessun progetto trovato per questa ricerca o categoria", "No projects found for this search or category"],
  ["Arbitrum e una Layer 2 su Ethereum che riduce costi e aumenta scalabilita per dApp e DeFi.", "Arbitrum is a Layer 2 on Ethereum that reduces costs and improves scalability for dApps and DeFi."],
  ["Scroll porta la tecnologia zk-rollup su Ethereum per scalare le dApp mantenendo compatibilita EVM.", "Scroll brings zk-rollup technology to Ethereum to scale dApps while keeping EVM compatibility."],
  ["Hyperliquid e un DEX focalizzato sui perpetual futures, costruito su una propria L1 per trading veloce, non-custodial e trasparente.", "Hyperliquid is a DEX focused on perpetual futures, built on its own L1 for fast, transparent non-custodial trading."],
  ["Accedi a leve e prova le funzionalità principali in modo graduale.", "Access leverage and try core features gradually."],
  ["Accedi a leve e prova le funzionalita principali in modo graduale.", "Access leverage and try core features gradually."],
  ["Valuta volume, fees, slippage e profondità del market first di operare.", "Evaluate volume, fees, slippage, and market depth before trading."],
  ["Valuta volume, fees, slippage e profondita del market first di operare.", "Evaluate volume, fees, slippage, and market depth before trading."],
  ["Impara i concetti key per operare in modo consapevole.", "Learn core concepts to operate consciously."],
  ["Attenzione a smart contract risk, volatility e possibili errori di execution.", "Pay attention to smart contract risk, volatility, and execution errors."],
  ["Esplora nuove opportunità in base al tuo profilo di risk.", "Explore new opportunities based on your risk profile."],
  ["Esplora nuove opportunita in base al tuo profilo di risk.", "Explore new opportunities based on your risk profile."],
  ["Abstract e una Layer 2 su Ethereum pensata per UX semplice e costi ridotti.", "Abstract is a Layer 2 on Ethereum designed for simple UX and lower costs."],
  ["Memecoin nato dal meme Apu con community internazionale.", "Memecoin born from the Apu meme with an international community."],
  ["USDC e una stablecoin collateralizzata in fiat emessa da Circle, progettata per pagamenti, trasferimenti e operativita DeFi con elevata liquidita.", "USDC is a fiat-collateralized stablecoin issued by Circle, designed for payments, transfers, and DeFi operations with high liquidity."],
  ["USDT e una stablecoin ancorata al dollaro emessa da Tether, tra le piu usate per trading, trasferimenti rapidi e liquidita globale in ambito crypto.", "USDT is a dollar-pegged stablecoin issued by Tether, widely used for trading, fast transfers, and global crypto liquidity."],
  ["Use case principale", "Primary use case"],
  ["Liquidita e integrazione", "Liquidity and integrations"],
  ["Come iniziare", "How to start"],
  ["Rischi specifici", "Specific risks"],
  ["Strategia base", "Base strategy"],
  ["Ruolo nel mercato", "Role in the market"],
  ["Liquidita profonda", "Deep liquidity"],
  ["Operativita consigliata", "Recommended operations"],
  ["Uso strategico", "Strategic use"],
  ["Scegli il network", "Choose the network"],
  ["Acquista o converti", "Buy or convert"],
  ["Trasferisci in sicurezza", "Transfer safely"],
  ["Usa e monitora", "Use and monitor"],
  ["Identifica il token giusto", "Identify the correct token"],
  ["Acquista o swappa", "Buy or swap"],
  ["Trasferisci con test", "Transfer with a test"],
  ["Gestisci rischio operativo", "Manage operational risk"],
  ["Rischio controparte emittente, rischio regolatorio e mismatch di rete in trasferimento.", "Issuer counterparty risk, regulatory risk, and network mismatch during transfer."],
  ["Usala come riserva di stabilita per ridurre volatilita del portafoglio operativo.", "Use it as a stability reserve to reduce operational portfolio volatility."],
  ["USDT esiste su molte reti: verifica chain, ticker e contract esatto.", "USDT exists on multiple networks: verify chain, ticker, and exact contract."],
  ["Utile come collateral e parcheggio tattico durante fasi di alta volatilita.", "Useful as collateral and tactical parking during high-volatility phases."],
  ["USDC su reti principali: guida operativa", "USDC on major networks: operational guide"],
  ["USDT transparency dashboard", "USDT transparency dashboard"],
  ["USDT e gestione liquidita in DeFi", "USDT and liquidity management in DeFi"],
  ["Aggregatore swap di DeFiLlama per trovare route efficienti tra DEX e reti diverse.", "DeFiLlama swap aggregator to find efficient routes across DEXs and networks."],
  ["Accedi a link ufficiali e prepara un piano operativo.", "Access official links and prepare an operating plan."],
  ["Valuta volume, spread e profondita first di entrare.", "Evaluate volume, spread, and depth before entering."],
  ["Use size piccole e regole di gestione risk.", "Use smaller size and risk-management rules."],
  ["Volatility estrema e drawdown rapidi.", "Extreme volatility and fast drawdowns."],
  ["Catalyst sociale e momentum di breve periodo.", "Social catalyst and short-term momentum."],
];

const WORD_REPLACEMENTS: Array<[string, string]> = [
  ["notizie", "news"],
  ["guida", "guide"],
  ["manuale", "manual"],
  ["categoria", "category"],
  ["leggi", "read"],
  ["apri", "open"],
  ["vai a", "go to"],
  ["strumenti utili", "useful tools"],
  ["portafogli", "wallets"],
  ["segnalibri", "bookmarks"],
  ["mercati di predizione", "prediction markets"],
  ["eventi storici", "historical events"],
  ["mappa ecosistema", "ecosystem map"],
  ["compra/vendi crypto", "buy/sell crypto"],
  ["compra e vendi crypto", "buy and sell crypto"],
  ["fondamentali", "fundamentals"],
  ["caricamento", "loading"],
  ["chiudi", "close"],
  ["rischio", "risk"],
  ["rischi", "risks"],
  ["valutazione", "evaluation"],
  ["opportunita", "opportunities"],
  ["opportunità", "opportunities"],
  ["sicurezza", "security"],
  ["principiante", "beginner"],
  ["intermedio", "intermediate"],
  ["avanzato", "advanced"],
  ["consumatori", "consumers"],
  ["negozianti", "merchants"],
  ["governi", "governments"],
  ["imprese", "businesses"],
  ["sviluppatori", "developers"],
  ["creatori", "creators"],
  ["trasparenza", "transparency"],
  ["decentralizzata", "decentralized"],
  ["decentralizzato", "decentralized"],
  ["criptovaluta", "cryptocurrency"],
  ["criptovalute", "cryptocurrencies"],
  ["progetto", "project"],
  ["progetti", "projects"],
  ["offerta", "supply"],
  ["prezzo", "price"],
  ["mercato", "market"],
  ["valore", "value"],
  ["transazione", "transaction"],
  ["transazioni", "transactions"],
  ["rete", "network"],
  ["reti", "networks"],
  ["chiave", "key"],
  ["chiavi", "keys"],
  ["privata", "private"],
  ["pubblico", "public"],
  ["pubblica", "public"],
  ["fondi", "funds"],
  ["truffe", "scams"],
  ["truffa", "scam"],
  ["falso", "fake"],
  ["falsi", "fake"],
  ["introduzione", "introduction"],
  ["comunita", "community"],
  ["liquidita", "liquidity"],
  ["volatilita", "volatility"],
  ["volatilità", "volatility"],
  ["costi", "costs"],
  ["piattaforma", "platform"],
  ["piattaforme", "platforms"],
  ["sezione", "section"],
  ["sezioni", "sections"],
  ["dettagli", "details"],
  ["dettaglio", "detail"],
  ["descrizione", "description"],
  ["descrizioni", "descriptions"],
  ["panoramica", "overview"],
  ["ordinamento", "sorting"],
  ["crescente", "ascending"],
  ["decrescente", "descending"],
  ["non custodial", "non-custodial"],
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function preserveCase(source: string, replacement: string): string {
  if (!source) return replacement;
  if (source.toUpperCase() === source) return replacement.toUpperCase();
  if (source[0] === source[0].toUpperCase()) {
    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

const NON_TRANSLATABLE_KEYS = new Set([
  "id",
  "slug",
  "href",
  "url",
  "src",
  "logo",
  "image",
  "icon",
  "websiteUrl",
  "twitterUrl",
  "discordUrl",
  "telegramUrl",
  "youtubeUrl",
  "coingeckoId",
  "tokenAddress",
  "address",
  "ticker",
  "symbol",
  "projectId",
  "categoryId",
  "type",
]);

function looksLikeTechnicalString(value: string): boolean {
  return (
    /^(https?:\/\/|www\.|mailto:|tel:|#|\/)/i.test(value) ||
    /\.(png|jpe?g|webp|svg|gif|ico|avif)(\?|#|$)/i.test(value) ||
    /^ipfs:\/\//i.test(value)
  );
}

const COMPILED_PHRASE_REPLACEMENTS = [...PHRASE_REPLACEMENTS]
  .sort((a, b) => b[0].length - a[0].length)
  .map(([it, en]) => ({
    re: new RegExp(escapeRegExp(it), "gi"),
    en,
  }));

const COMPILED_WORD_REPLACEMENTS = WORD_REPLACEMENTS.map(([it, en]) => ({
  re: new RegExp(`\\b${escapeRegExp(it)}\\b`, "gi"),
  en,
}));

export function translateItalianToEnglish(text: string): string {
  if (!text || !text.trim()) return text;
  if (looksLikeTechnicalString(text)) return text;

  let output = text;

  COMPILED_PHRASE_REPLACEMENTS.forEach(({ re, en }) => {
    output = output.replace(re, (match) => preserveCase(match, en));
  });

  COMPILED_WORD_REPLACEMENTS.forEach(({ re, en }) => {
    output = output.replace(re, (match) => preserveCase(match, en));
  });

  return output;
}

export function deepTranslateItalianToEnglish<T>(value: T): T {
  return deepTranslateWithKey(value, "");
}

function deepTranslateWithKey<T>(value: T, parentKey: string): T {
  if (typeof value === "string") {
    if (NON_TRANSLATABLE_KEYS.has(parentKey) || looksLikeTechnicalString(value)) {
      return value as T;
    }
    return translateItalianToEnglish(value) as T;
  }
  if (Array.isArray(value)) return value.map((item) => deepTranslateWithKey(item, parentKey)) as T;
  if (value && typeof value === "object") {
    const next: Record<string, unknown> = {};
    Object.entries(value as Record<string, unknown>).forEach(([key, v]) => {
      next[key] = deepTranslateWithKey(v, key);
    });
    return next as T;
  }
  return value;
}
