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
  ["approfondisci", "learn more"],
  ["caricamento", "loading"],
  ["chiudi", "close"],
  ["menu", "menu"],
  ["wallet", "wallet"],
  ["rischio", "risk"],
  ["rischi", "risks"],
  ["valutazione", "evaluation"],
  ["opportunità", "opportunities"],
  ["opportunita", "opportunities"],
  ["sicurezza", "security"],
  ["prestiti", "lending"],
  ["rendimenti", "yield"],
  ["azioni", "actions"],
  ["consigliate", "recommended"],
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

export function translateItalianToEnglish(text: string): string {
  if (!text || !text.trim()) return text;
  if (/(https?:\/\/|www\.)/i.test(text)) return text;

  let output = text;

  const sortedPhrases = [...PHRASE_REPLACEMENTS].sort((a, b) => b[0].length - a[0].length);
  sortedPhrases.forEach(([it, en]) => {
    const re = new RegExp(escapeRegExp(it), "gi");
    output = output.replace(re, (match) => preserveCase(match, en));
  });

  WORD_REPLACEMENTS.forEach(([it, en]) => {
    const re = new RegExp(`\\b${escapeRegExp(it)}\\b`, "gi");
    output = output.replace(re, (match) => preserveCase(match, en));
  });

  return output;
}

export function deepTranslateItalianToEnglish<T>(value: T): T {
  if (typeof value === "string") return translateItalianToEnglish(value) as T;
  if (Array.isArray(value)) return value.map((item) => deepTranslateItalianToEnglish(item)) as T;
  if (value && typeof value === "object") {
    const next: Record<string, unknown> = {};
    Object.entries(value as Record<string, unknown>).forEach(([key, v]) => {
      next[key] = deepTranslateItalianToEnglish(v);
    });
    return next as T;
  }
  return value;
}
