import type { ProjectPageData } from "@/lib/project-page-data";

type MemecoinSeed = {
  slug: string;
  name: string;
  symbol: string;
  coinId: string | null;
  chain: "Solana" | "Ethereum" | "Base" | "Multi-chain";
  description: string;
  websiteUrl: string;
  twitterUrl: string;
  marketUrl: string;
};

function buildMemecoinData(seed: MemecoinSeed): Omit<ProjectPageData, "slug" | "logo"> {
  return {
    name: seed.name,
    tags: [{ label: "Memecoin" }, { label: seed.chain }, { label: "High Volatility" }],
    appUrl: seed.websiteUrl,
    guideUrl: "/manuale",
    tokenSymbol: seed.symbol,
    coinId: seed.coinId,
    description: seed.description,
    overviewTags: [
      { label: "Narrative-driven" },
      { label: "Community" },
      { label: "Risk Management" },
      { label: "Execution" },
    ],
    featureCards: [
      { icon: "lightning", title: "Setup rapido", description: "Accedi ai link ufficiali e prepara un piano operativo." },
      { icon: "droplet", title: "Liquidita", description: "Valuta volume, spread e profondita prima di entrare." },
      { icon: "cap", title: "Approccio", description: "Usa size piccole e regole di gestione rischio.", href: "/manuale" },
      { icon: "warning", title: "Rischi", description: "Volatilita estrema e drawdown rapidi." },
      { icon: "gift", title: "Opportunita", description: "Catalyst social e momentum di breve periodo." },
    ],
    howToSteps: [
      { icon: "1", title: "Verifica progetto", description: "Controlla sito, social e contract ufficiali." },
      { icon: "2", title: "Analizza market", description: "Confronta market cap, volumi e trend." },
      { icon: "3", title: "Definisci sizing", description: "Imposta una size coerente col rischio." },
      { icon: "4", title: "Gestisci uscita", description: "Pianifica take profit e invalidation level." },
    ],
    riskCards: [
      { title: "Volatility Risk", description: "Prezzo fortemente influenzato da hype e sentiment." },
      { title: "Liquidity Risk", description: "In alcune fasi la liquidita puo ridursi rapidamente." },
      { title: "Narrative Risk", description: "La narrativa cambia velocemente e puo invertire il trend." },
      { title: "Operational Risk", description: "Errori su rete/address o link fake sono irreversibili." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: seed.websiteUrl },
      { label: "Twitter / X", href: seed.twitterUrl },
      { label: "Market / Token", href: seed.marketUrl },
    ],
    contentItems: [
      { type: "article", title: `${seed.name}: overview progetto`, source: "Sito ufficiale", href: seed.websiteUrl },
      { type: "article", title: `${seed.name}: market data`, source: "Market data", href: seed.marketUrl },
      { type: "video", title: "Gestione rischio su memecoin", source: "YouTube", skillLevel: "Intermediate", embedId: "Afi5cf6hya8" },
    ],
  };
}

const MEMECOIN_SEEDS: MemecoinSeed[] = [
  { slug: "floppa", name: "Floppa", symbol: "FLOPPA", coinId: "floppa", chain: "Base", description: "Memecoin community-driven su Base con narrativa virale e forte componente social.", websiteUrl: "https://floppa.wtf/", twitterUrl: "https://x.com/floppa/", marketUrl: "https://dexscreener.com/base/0x6caa62e48a2d9f3a8eacaadca2462ed5dfe0c685" },
  { slug: "dogwifhat-wif", name: "Dogwifhat (WIF)", symbol: "WIF", coinId: "dogwifcoin", chain: "Solana", description: "Uno dei memecoin piu noti su Solana, con elevata attenzione retail.", websiteUrl: "https://dogwifcoin.org", twitterUrl: "https://x.com/dogwifcoin", marketUrl: "https://www.coingecko.com/en/coins/dogwifhat" },
  { slug: "shark-cat", name: "Shark Cat", symbol: "SC", coinId: "shark-cat", chain: "Solana", description: "Token meme su Solana nato da branding ironico e community attiva.", websiteUrl: "https://sharkcatsolana.com", twitterUrl: "https://x.com/SharkCatSolana", marketUrl: "https://www.coingecko.com/en/coins/shark-cat" },
  { slug: "kenidy", name: "Kenidy", symbol: "KENIDY", coinId: "ruburt-f-kenidy-jr", chain: "Solana", description: "Memecoin satirico orientato a meme culture e engagement social.", websiteUrl: "https://kenidy.io", twitterUrl: "https://x.com/kenidy_on_sol", marketUrl: "https://www.coingecko.com/en/coins/ruburt-f-kenidy-jr" },
  { slug: "boden", name: "Boden", symbol: "BODEN", coinId: "jeo-boden", chain: "Solana", description: "Memecoin a tema politico, molto reattivo a narrative e newsflow.", websiteUrl: "https://boden4pres.com", twitterUrl: "https://x.com/boden4pres", marketUrl: "https://www.coingecko.com/en/coins/jeo-boden" },
  { slug: "tremp", name: "Tremp", symbol: "TREMP", coinId: "doland-tremp", chain: "Solana", description: "Memecoin politico con movimenti rapidi e dinamiche speculative.", websiteUrl: "https://tremp.xyz", twitterUrl: "https://x.com/dolandtremp_sol", marketUrl: "https://www.coingecko.com/en/coins/doland-tremp" },
  { slug: "higher", name: "Higher", symbol: "HIGHER", coinId: "higher", chain: "Base", description: "Progetto meme su Base focalizzato su narrativa e cultura on-chain.", websiteUrl: "https://www.aimhigher.net/", twitterUrl: "https://x.com/higheronchain", marketUrl: "https://www.coingecko.com/en/coins/higher" },
  { slug: "tn100x", name: "TN100X", symbol: "TN100X", coinId: "tn100x", chain: "Base", description: "Memecoin ad alta speculazione guidato da trend social.", websiteUrl: "https://ham.fun/", twitterUrl: "https://x.com/HamOnWarpcast", marketUrl: "https://www.coingecko.com/en/coins/tn100x" },
  { slug: "degen", name: "Degen", symbol: "DEGEN", coinId: "degen-base", chain: "Base", description: "Token meme di riferimento nell'ecosistema Farcaster/Base.", websiteUrl: "https://degen.tips", twitterUrl: "https://x.com/degenbase", marketUrl: "https://www.coingecko.com/en/coins/degen-base" },
  { slug: "retardio", name: "Retardio", symbol: "RETARDIO", coinId: "retardio", chain: "Solana", description: "Memecoin Solana con forte componente narrativa e volatilita elevata.", websiteUrl: "https://retardio.xyz/", twitterUrl: "https://x.com/retardiosolana", marketUrl: "https://www.coingecko.com/en/coins/retardio" },
  { slug: "apu", name: "Apu", symbol: "APU", coinId: "apu-apustaja", chain: "Ethereum", description: "Memecoin nato dal meme Apu con community internazionale.", websiteUrl: "https://apu.com/", twitterUrl: "https://x.com/ApusCoin", marketUrl: "https://www.coingecko.com/en/coins/apu-apustaja" },
  { slug: "pepe-coin", name: "Pepe (PEPE)", symbol: "PEPE", coinId: "pepe", chain: "Ethereum", description: "Memecoin iconico su Ethereum con elevata liquidita.", websiteUrl: "https://www.pepe.vip/", twitterUrl: "https://x.com/pepecoineth", marketUrl: "https://www.coingecko.com/en/coins/pepe" },
  { slug: "dogecoin", name: "Dogecoin", symbol: "DOGE", coinId: "dogecoin", chain: "Multi-chain", description: "Il memecoin storico piu riconosciuto del mercato crypto.", websiteUrl: "https://dogecoin.com/", twitterUrl: "https://x.com/dogecoin", marketUrl: "https://www.coingecko.com/en/coins/dogecoin" },
];

export const MEMECOIN_PAGE_DATA: Record<string, Omit<ProjectPageData, "slug" | "logo">> =
  Object.fromEntries(MEMECOIN_SEEDS.map((seed) => [seed.slug, buildMemecoinData(seed)]));

export function getMemecoinPageData(slug: string): Omit<ProjectPageData, "logo"> | null {
  const key = slug.toLowerCase();
  const raw = MEMECOIN_PAGE_DATA[key];
  if (!raw) return null;
  return { ...raw, slug: key };
}
