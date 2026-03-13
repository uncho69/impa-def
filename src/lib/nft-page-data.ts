import type { ProjectPageData } from "@/lib/project-page-data";

type NftSeed = {
  slug: string;
  name: string;
  kind: "Marketplace" | "Collection";
  description: string;
  websiteUrl: string;
  twitterUrl: string;
};

function buildNftData(seed: NftSeed): Omit<ProjectPageData, "slug" | "logo"> {
  return {
    name: seed.name,
    tags: [{ label: "NFT" }, { label: seed.kind }, { label: "Digital Ownership" }],
    appUrl: seed.websiteUrl,
    guideUrl: "/manuale",
    tokenSymbol: "—",
    coinId: null,
    description: seed.description,
    overviewTags: [
      { label: seed.kind },
      { label: "On-chain Assets" },
      { label: "Community" },
      { label: "Risk Aware" },
    ],
    featureCards: [
      { icon: "lightning", title: "Inizio rapido", description: "Apri la piattaforma e configura il wallet in sicurezza." },
      { icon: "droplet", title: "Market structure", description: "Controlla floor, volume e profondita del mercato." },
      { icon: "cap", title: "Framework", description: "Approccio disciplinato per acquisto e vendita.", href: "/manuale" },
      { icon: "warning", title: "Rischi", description: "Liquidita e pricing possono cambiare rapidamente." },
      { icon: "gift", title: "Opportunita", description: "Nuove collezioni, catalyst e narrative di settore." },
    ],
    howToSteps: [
      { icon: "1", title: "Verifica link", description: "Usa solo dominio ufficiale e social verificati." },
      { icon: "2", title: "Analizza asset", description: "Confronta storico vendite e holder distribution." },
      { icon: "3", title: "Definisci piano", description: "Entry, target e invalidation prima dell'esecuzione." },
      { icon: "4", title: "Gestione rischio", description: "Evita concentrazione su singola collezione." },
    ],
    riskCards: [
      { title: "Liquidity Risk", description: "Uscita complessa su asset meno trattati." },
      { title: "Narrative Risk", description: "Interesse community e hype possono invertire velocemente." },
      { title: "Counterfeit Risk", description: "Esistono collection fake: verifica contract e source." },
      { title: "Operational Risk", description: "Phishing e permessi wallet sono i rischi principali." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: seed.websiteUrl },
      { label: "Twitter / X", href: seed.twitterUrl },
      { label: "Manuale sicurezza", href: "/manuale" },
    ],
    contentItems: [
      { type: "article", title: `${seed.name}: overview`, source: "Sito ufficiale", href: seed.websiteUrl },
      { type: "article", title: "Checklist sicurezza NFT", source: "ImparoDeFi", href: "/manuale" },
      { type: "video", title: "NFT workflow operativo", source: "YouTube", skillLevel: "Beginner", embedId: "1jzFNzUgZ6Q" },
    ],
  };
}

const NFT_SEEDS: NftSeed[] = [
  { slug: "opensea", name: "OpenSea", kind: "Marketplace", description: "Marketplace NFT leader per acquisto, vendita e discovery di collezioni.", websiteUrl: "https://opensea.io/", twitterUrl: "https://x.com/opensea" },
  { slug: "blur", name: "Blur", kind: "Marketplace", description: "Marketplace NFT orientato a trader avanzati con execution rapida.", websiteUrl: "https://blur.io/", twitterUrl: "https://x.com/blur_io" },
  { slug: "magic-eden", name: "Magic Eden", kind: "Marketplace", description: "Marketplace NFT multi-chain con forte presenza su Solana.", websiteUrl: "https://magiceden.io/", twitterUrl: "https://x.com/MagicEden" },
  { slug: "crypto-punks", name: "CryptoPunks", kind: "Collection", description: "Collezione storica e iconica nell'ecosistema NFT su Ethereum.", websiteUrl: "https://www.larvalabs.com/cryptopunks", twitterUrl: "https://x.com/cryptopunksnfts" },
  { slug: "milady", name: "Milady", kind: "Collection", description: "Collezione community-driven con identita visuale riconoscibile.", websiteUrl: "https://miladymaker.net/", twitterUrl: "https://x.com/miladymaker" },
  { slug: "pudgy-penguins", name: "Pudgy Penguins", kind: "Collection", description: "Brand NFT mainstream con sviluppo IP e presenza retail.", websiteUrl: "https://www.pudgypenguins.com/", twitterUrl: "https://x.com/pudgypenguins" },
  { slug: "redacted-remilio-babies", name: "Redacted Remilio Babies", kind: "Collection", description: "Collezione nota per cultura internet e community engagement.", websiteUrl: "https://remilio.org/", twitterUrl: "https://x.com/remiliobabies" },
  { slug: "tubby-cats", name: "Tubby Cats", kind: "Collection", description: "Collezione NFT cartoon-oriented con focus community.", websiteUrl: "https://tubbycats.xyz/", twitterUrl: "https://x.com/tubbycatsxyz" },
];

export const NFT_PAGE_DATA: Record<string, Omit<ProjectPageData, "slug" | "logo">> =
  Object.fromEntries(NFT_SEEDS.map((seed) => [seed.slug, buildNftData(seed)]));

export function getNftPageData(slug: string): Omit<ProjectPageData, "logo"> | null {
  const key = slug.toLowerCase();
  const raw = NFT_PAGE_DATA[key];
  if (!raw) return null;
  return { ...raw, slug: key };
}
