import type { ProjectPageData } from "@/lib/project-page-data";

type ExchangeSeed = {
  slug: string;
  name: string;
  model: "CEX" | "On/Off-Ramp";
  description: string;
  websiteUrl: string;
  twitterUrl: string;
  docsUrl?: string;
};

function buildExchangeData(seed: ExchangeSeed): Omit<ProjectPageData, "slug" | "logo"> {
  return {
    name: seed.name,
    tags: [{ label: seed.model }, { label: "Fiat Gateway" }, { label: "Trading" }],
    appUrl: seed.websiteUrl,
    guideUrl: "/manuale",
    tokenSymbol: "—",
    coinId: null,
    description: seed.description,
    overviewTags: [
      { label: "Onboarding" },
      { label: "Execution" },
      { label: "Compliance" },
      { label: "Risk Control" },
    ],
    featureCards: [
      { icon: "lightning", title: "Inizia subito", description: `Configura account su ${seed.name} e completa setup operativo.` },
      { icon: "droplet", title: "Operativita", description: "Deposito, acquisto spot e gestione prelievi in sicurezza." },
      { icon: "cap", title: "Guida base", description: "Workflow pratico per comprare/vendere crypto.", href: "/manuale" },
      { icon: "warning", title: "Rischi operativi", description: "Fee, slippage, errori di rete e gestione custody." },
      { icon: "gift", title: "Opportunita", description: "Servizi extra: earn, carta, promo e strumenti avanzati." },
    ],
    howToSteps: [
      { icon: "1", title: "Apri account", description: "Registrazione e verifica identita/KYC." },
      { icon: "2", title: "Configura sicurezza", description: "2FA, whitelist indirizzi e anti-phishing code." },
      { icon: "3", title: "Deposita e opera", description: "Effettua deposito fiat/crypto e primo acquisto." },
      { icon: "4", title: "Trasferisci in self-custody", description: "Sposta i fondi su wallet non-custodial quando serve." },
    ],
    riskCards: [
      { title: "Custody Risk", description: "I fondi su exchange restano sotto rischio controparte." },
      { title: "Operational Errors", description: "Address/network errati possono causare perdita fondi." },
      { title: "Fee & Spread", description: "Costi nascosti e spread incidono sul risultato netto." },
      { title: "Security Risk", description: "Account takeover senza hardening adeguato e 2FA." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: seed.websiteUrl },
      { label: "Twitter / X", href: seed.twitterUrl },
      ...(seed.docsUrl ? [{ label: "Support / Docs", href: seed.docsUrl }] : []),
    ],
    contentItems: [
      { type: "video", title: `${seed.name}: onboarding completo`, source: "YouTube", skillLevel: "Beginner", embedId: "K4TOrB7at0Y" },
      { type: "video", title: `${seed.name}: best practice operative`, source: "YouTube", skillLevel: "Intermediate", embedId: "L-SCdSfGztA" },
      { type: "article", title: `${seed.name} - risorse ufficiali`, source: "ImparoDeFi", href: seed.websiteUrl },
    ],
  };
}

const EXCHANGE_SEEDS: ExchangeSeed[] = [
  {
    slug: "coinbase",
    name: "Coinbase",
    model: "CEX",
    description: "Exchange regolamentata e user-friendly, adatta a onboarding graduale e gestione operativa semplice.",
    websiteUrl: "https://www.coinbase.com/",
    twitterUrl: "https://x.com/coinbase",
    docsUrl: "https://help.coinbase.com/",
  },
  {
    slug: "kraken",
    name: "Kraken",
    model: "CEX",
    description: "Exchange orientata a sicurezza e affidabilita, con strumenti pro per trader piu strutturati.",
    websiteUrl: "https://www.kraken.com/",
    twitterUrl: "https://x.com/krakenfx",
    docsUrl: "https://support.kraken.com/",
  },
  {
    slug: "binance",
    name: "Binance",
    model: "CEX",
    description: "Piattaforma con ampia liquidita e molti strumenti per spot, derivati ed ecosistema servizi.",
    websiteUrl: "https://www.binance.com",
    twitterUrl: "https://x.com/binance",
    docsUrl: "https://www.binance.com/en/support",
  },
  {
    slug: "crypto",
    name: "Crypto.com",
    model: "CEX",
    description: "Exchange con app consumer, carta e servizi multipli per acquisto, gestione e spesa crypto.",
    websiteUrl: "https://crypto.com/",
    twitterUrl: "https://x.com/cryptocom",
    docsUrl: "https://help.crypto.com/",
  },
  {
    slug: "young",
    name: "Young Platform",
    model: "CEX",
    description: "Exchange italiana focalizzata su onboarding semplificato e percorso educativo progressivo.",
    websiteUrl: "https://exchange.youngplatform.com/",
    twitterUrl: "https://x.com/youngplatform",
    docsUrl: "https://support.youngplatform.com/",
  },
  {
    slug: "holyheld",
    name: "Holyheld",
    model: "On/Off-Ramp",
    description: "On-ramp con carta e integrazione Web3 per passaggio rapido da fiat a wallet non-custodial.",
    websiteUrl: "https://holyheld.com/",
    twitterUrl: "https://x.com/holyheld",
  },
  {
    slug: "wirex",
    name: "Wirex",
    model: "On/Off-Ramp",
    description: "Piattaforma payment-first per conversione fiat/crypto e gestione spese con carta.",
    websiteUrl: "https://wirexapp.com/",
    twitterUrl: "https://x.com/wirexapp",
    docsUrl: "https://wirexapp.com/help",
  },
  {
    slug: "transak",
    name: "Transak",
    model: "On/Off-Ramp",
    description: "On-ramp integrato in molte dApp per acquisto crypto con carta e metodi locali.",
    websiteUrl: "https://transak.com/",
    twitterUrl: "https://x.com/Transak",
    docsUrl: "https://support.transak.com/",
  },
];

export const COMPRA_VENDI_PAGE_DATA: Record<string, Omit<ProjectPageData, "slug" | "logo">> =
  Object.fromEntries(EXCHANGE_SEEDS.map((seed) => [seed.slug, buildExchangeData(seed)]));

export function getCompraVendiPageData(slug: string): Omit<ProjectPageData, "logo"> | null {
  const key = slug.toLowerCase();
  const raw = COMPRA_VENDI_PAGE_DATA[key];
  if (!raw) return null;
  return { ...raw, slug: key };
}
