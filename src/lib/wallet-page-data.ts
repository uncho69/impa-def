import type { ProjectPageData } from "@/lib/project-page-data";

type WalletSeed = {
  slug: string;
  name: string;
  walletType: "Software Wallet" | "Hardware Wallet";
  highlights: string[];
  description: string;
  appUrl: string;
  websiteUrl: string;
  twitterUrl: string;
  docsUrl?: string;
};

function buildWalletData(seed: WalletSeed): Omit<ProjectPageData, "slug" | "logo"> {
  return {
    name: seed.name,
    tags: [{ label: seed.walletType }, ...seed.highlights.map((h) => ({ label: h }))],
    appUrl: seed.appUrl,
    guideUrl: "/manuale",
    tokenSymbol: "—",
    coinId: null,
    description: seed.description,
    overviewTags: [
      { label: "Self-custody" },
      { label: "Security" },
      { label: "Wallet Ops" },
      { label: "Web3" },
    ],
    featureCards: [
      { icon: "lightning", title: "Setup iniziale", description: `Configurazione rapida e sicura di ${seed.name}.` },
      { icon: "droplet", title: "Operativita", description: "Invio/ricezione asset, gestione network e uso dApp." },
      { icon: "cap", title: "Best practice", description: "Regole pratiche per usare il wallet in sicurezza.", href: "/manuale" },
      { icon: "warning", title: "Rischi operativi", description: "Phishing, errori address/network, gestione seed phrase." },
      { icon: "gift", title: "Opportunita", description: "Accesso semplificato a DeFi, NFT e nuove applicazioni." },
    ],
    howToSteps: [
      { icon: "1", title: "Crea o importa wallet", description: "Imposta wallet nuovo o importa con recovery phrase." },
      { icon: "2", title: "Metti in sicurezza seed", description: "Conserva offline la frase di recupero." },
      { icon: "3", title: "Configura reti", description: "Aggiungi le chain utili e verifica sempre la rete attiva." },
      { icon: "4", title: "Esegui transazione test", description: "Prima operazione con importo ridotto." },
    ],
    riskCards: [
      { title: "Phishing Risk", description: "Usa solo link ufficiali ed evita firme su siti non verificati." },
      { title: "Operational Errors", description: "Address o chain sbagliati possono causare perdita fondi." },
      { title: "Key Management", description: "Seed phrase esposta = controllo fondi compromesso." },
      { title: "Device Security", description: "Mantieni dispositivo e browser aggiornati e protetti." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: seed.websiteUrl },
      { label: "Twitter / X", href: seed.twitterUrl },
      ...(seed.docsUrl ? [{ label: "Docs", href: seed.docsUrl }] : []),
    ],
    contentItems: [
      { type: "video", title: `${seed.name}: setup e sicurezza`, source: "YouTube", skillLevel: "Beginner", embedId: "K4TOrB7at0Y" },
      { type: "video", title: `${seed.name}: workflow operativo`, source: "YouTube", skillLevel: "Intermediate", embedId: "L-SCdSfGztA" },
      { type: "article", title: `${seed.name} - risorse ufficiali`, source: "ImparoDeFi", href: seed.websiteUrl },
    ],
  };
}

const WALLET_SEEDS: WalletSeed[] = [
  {
    slug: "metamask",
    name: "MetaMask",
    walletType: "Software Wallet",
    highlights: ["Browser Extension", "DeFi Gateway"],
    description: "MetaMask e il wallet EVM piu diffuso per interagire con dApp, DeFi e asset su Ethereum e Layer 2.",
    appUrl: "https://metamask.io/",
    websiteUrl: "https://metamask.io/",
    twitterUrl: "https://x.com/MetaMask",
    docsUrl: "https://support.metamask.io/",
  },
  {
    slug: "phantom",
    name: "Phantom",
    walletType: "Software Wallet",
    highlights: ["Solana Native", "Multi-Chain"],
    description: "Phantom e un wallet user-friendly nato su Solana, oggi esteso a piu ecosistemi con UX semplice.",
    appUrl: "https://phantom.app/",
    websiteUrl: "https://phantom.app/",
    twitterUrl: "https://x.com/phantom",
    docsUrl: "https://help.phantom.com/",
  },
  {
    slug: "rainbow",
    name: "Rainbow",
    walletType: "Software Wallet",
    highlights: ["Mobile First", "User Friendly"],
    description: "Rainbow e un wallet mobile orientato a UX premium per Ethereum e Layer 2, ideale per onboarding rapido.",
    appUrl: "https://rainbow.me/",
    websiteUrl: "https://rainbow.me/",
    twitterUrl: "https://x.com/rainbowdotme",
    docsUrl: "https://support.rainbow.me/",
  },
  {
    slug: "rabby",
    name: "Rabby",
    walletType: "Software Wallet",
    highlights: ["DeFi Focused", "Advanced"],
    description: "Rabby e un wallet avanzato per utenti DeFi, con attenzione a sicurezza transazioni e multi-chain ops.",
    appUrl: "https://rabby.io/",
    websiteUrl: "https://rabby.io/",
    twitterUrl: "https://x.com/Rabby_io",
    docsUrl: "https://support.rabby.io/",
  },
  {
    slug: "trezor",
    name: "Trezor",
    walletType: "Hardware Wallet",
    highlights: ["Cold Storage", "Open Source"],
    description: "Trezor e un hardware wallet storico con focus su self-custody, sicurezza offline e trasparenza.",
    appUrl: "https://trezor.io/",
    websiteUrl: "https://trezor.io/",
    twitterUrl: "https://x.com/Trezor",
    docsUrl: "https://trezor.io/learn",
  },
  {
    slug: "ledger",
    name: "Ledger",
    walletType: "Hardware Wallet",
    highlights: ["Cold Storage", "Security"],
    description: "Ledger e un hardware wallet diffuso per proteggere chiavi private offline e gestire asset con Ledger Live.",
    appUrl: "https://www.ledger.com/",
    websiteUrl: "https://www.ledger.com/",
    twitterUrl: "https://x.com/Ledger",
    docsUrl: "https://support.ledger.com/",
  },
];

export const WALLET_PAGE_DATA: Record<string, Omit<ProjectPageData, "slug" | "logo">> =
  Object.fromEntries(WALLET_SEEDS.map((seed) => [seed.slug, buildWalletData(seed)]));

export function getWalletPageData(slug: string): Omit<ProjectPageData, "logo"> | null {
  const key = slug.toLowerCase();
  const raw = WALLET_PAGE_DATA[key];
  if (!raw) return null;
  return { ...raw, slug: key };
}
