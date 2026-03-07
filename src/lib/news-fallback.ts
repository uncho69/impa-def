export type FallbackNewsItem = {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  authorEmail: string;
  imageUrl: string | null;
  featured: boolean;
  status: "PUBLISHED";
  readTime: string;
  tags: string[];
  views: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

const NOW = new Date().toISOString();

export const FALLBACK_NEWS: FallbackNewsItem[] = [
  {
    id: "fb-1",
    title: "Rosetta e Circular: l'AI che decide dove allocare capitale nella DeFi",
    summary: "Un nuovo esempio di AI applicata alla DeFi mostra come l'agente Rosetta utilizzi i dati di Circular per analizzare i mercati.",
    content: `Un nuovo esempio di AI applicata alla DeFi mostra come l'agente Rosetta utilizzi i dati di Circular per analizzare mercati di lending come Morpho, Aave, Euler e Fluid e suggerire automaticamente dove allocare capitale in USDC con il miglior rapporto rischio/rendimento.

L'integrazione tra AI agent e dati on-chain sta iniziando a cambiare il modo in cui gli utenti prendono decisioni nella DeFi: invece di confrontare manualmente decine di dashboard, l'utente puo delegare la fase di analisi e ricevere una proposta operativa gia motivata.

Nel caso mostrato, l'agente ha valutato metriche come APY netto, liquidita disponibile, storico della volatilita e rischio smart contract, costruendo una strategia di allocazione su piu protocolli e riducendo la concentrazione del rischio su una singola piattaforma.

Questo approccio apre una nuova fase: tool intelligenti che non si limitano a leggere i dati, ma aiutano concretamente a trasformarli in decisioni, con trasparenza sui criteri usati e possibilita di revisione da parte dell'utente.`,
    category: "CRYPTO_AI",
    author: "ImparoDeFi",
    authorEmail: "admin@imparodefi.com",
    imageUrl: null,
    featured: true,
    status: "PUBLISHED",
    readTime: "4 min",
    tags: ["AI", "DeFi"],
    views: 124,
    publishedAt: NOW,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "fb-2",
    title: "Terra, Jane Street e il rimbalzo del mercato: coincidenza o segnale strutturale?",
    summary: "Le accuse contro Jane Street riaccendono i riflettori sul collasso di Terra nel 2022.",
    content: `Le accuse contro Jane Street riaccendono i riflettori sul collasso di Terra nel 2022 e, allo stesso tempo, riaprono il dibattito su quanto il mercato crypto resti sensibile alle dinamiche dei grandi operatori.

Il crollo di UST/LUNA e stato uno spartiacque per l'intero settore: ha evidenziato i limiti dei modelli di stabilita algoritmica e ha accelerato la pressione regolamentare su exchange, market maker e protocolli.

Nelle ultime settimane, il mercato ha registrato un rimbalzo proprio mentre alcune attivita di market making risultavano ridotte o sotto attenzione legale. Da qui la domanda centrale: coincidenza ciclica o segnale che il peso di alcuni desk sia stato storicamente sottovalutato?

Per gli investitori retail, la lezione resta pratica: monitorare liquidita reale, depth dei book e distribuzione dei volumi e piu utile che inseguire il rumore del momento.`,
    category: "GENERAL",
    author: "ImparoDeFi",
    authorEmail: "admin@imparodefi.com",
    imageUrl: null,
    featured: true,
    status: "PUBLISHED",
    readTime: "5 min",
    tags: ["Mercato", "Regolamentazione"],
    views: 88,
    publishedAt: NOW,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "fb-3",
    title: "Trading Alpha",
    summary: "Molti altcoin salgono per domanda spot artificiale e poi entrano in fase di vendita.",
    content: `Molti altcoin stanno mostrando pattern ripetitivi: accelerazione iniziale trainata da domanda spot, espansione dei volumi su timeframe brevi e successiva fase di presa profitto.

In questo scenario, il vantaggio competitivo non e prevedere il top, ma gestire il rischio in modo disciplinato: sizing piu conservativo, stop coerenti con la volatilita e riduzione progressiva dell'esposizione durante i picchi.

Un altro elemento chiave e distinguere i movimenti guidati da narrativa da quelli supportati da fondamentali on-chain: TVL, entrate protocollo, attivita utenti e crescita della liquidita sono segnali piu affidabili rispetto al solo momentum di prezzo.

La fase corrente premia chi combina execution rapida e lettura del contesto: meno FOMO, piu processo.`,
    category: "DEFI",
    author: "ImparoDeFi",
    authorEmail: "admin@imparodefi.com",
    imageUrl: null,
    featured: true,
    status: "PUBLISHED",
    readTime: "3 min",
    tags: ["DeFi", "Trading"],
    views: 67,
    publishedAt: NOW,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "fb-4",
    title: "Nuovi airdrop da monitorare questa settimana",
    summary: "Selezione dei protocolli con maggiore probabilita di reward in fase pre-token.",
    content: `La settimana in corso presenta diverse opportunita airdrop su protocolli in fase pre-token, ma la selezione deve partire da una checklist chiara.

Primo: privilegiare piattaforme con prodotto realmente usabile e metriche di adozione in crescita. Secondo: distribuire le interazioni su piu ecosistemi per evitare dipendenza da un solo drop. Terzo: mantenere una traccia ordinata delle attivita (wallet, bridge, volume, date) per non perdere eleggibilita.

Attenzione ai rischi: smart contract non auditati, phishing su campagne social e costi gas che possono superare il valore atteso del reward.

Strategia consigliata: approccio costante, capitali limitati per wallet e focus su qualita delle interazioni, non solo quantita.`,
    category: "AIRDROPS",
    author: "ImparoDeFi",
    authorEmail: "admin@imparodefi.com",
    imageUrl: null,
    featured: false,
    status: "PUBLISHED",
    readTime: "4 min",
    tags: ["Airdrop"],
    views: 43,
    publishedAt: NOW,
    createdAt: NOW,
    updatedAt: NOW,
  },
];

