import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import type { ProjectPageData } from "@/lib/project-page-data";
import magicEdenLogo from "@/assets/magiceden-icon.png";

export default function MagicEden() {
  const data: ProjectPageData = {
    slug: "magic-eden",
    name: "Magic Eden",
    logo: magicEdenLogo,
    tags: [{ label: "NFT" }, { label: "Marketplace" }, { label: "Solana" }],
    appUrl: "https://magiceden.io/",
    guideUrl: "/manuale",
    tokenSymbol: "ME",
    coinId: "magic-eden",
    description:
      "Magic Eden e un marketplace NFT multi-chain con forte presenza su Solana, noto per launchpad, trading e strumenti creator.",
    featureCards: [
      { icon: "lightning", title: "Onboarding", description: "Apri account e imposta wallet compatibile." },
      { icon: "droplet", title: "Flow trading", description: "Analizza volume e momentum collection." },
      { icon: "cap", title: "Guida", description: "Workflow operativo per marketplace NFT.", href: "/manuale" },
      { icon: "warning", title: "Rischi", description: "Alta volatilita su mint e floor price." },
      { icon: "gift", title: "Opportunita", description: "Nuovi launch e trend di breve periodo." },
    ],
    howToSteps: [
      { icon: "1", title: "Connetti wallet", description: "Verifica rete e dominio ufficiale." },
      { icon: "2", title: "Filtra collection", description: "Usa volume/holder per ridurre rumore." },
      { icon: "3", title: "Definisci piano", description: "Entry e uscita prima di ogni trade." },
      { icon: "4", title: "Gestisci rischio", description: "Controlla esposizione per singola collezione." },
    ],
    riskCards: [
      { title: "Launch Risk", description: "Mint affollati possono creare execution sfavorevole." },
      { title: "Liquidity Risk", description: "Collection minori hanno spread ampio." },
      { title: "Token Risk", description: "ME e asset correlati seguono il ciclo NFT." },
      { title: "Security Risk", description: "Massima attenzione a link fake e wallet drains." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: "https://magiceden.io/" },
      { label: "Twitter / X", href: "https://x.com/MagicEden" },
      { label: "Token ME", href: "https://www.coingecko.com/en/coins/magic-eden" },
    ],
    contentItems: [
      { type: "article", title: "Magic Eden Platform", source: "Magic Eden", href: "https://magiceden.io/" },
      { type: "article", title: "ME Token Metrics", source: "CoinGecko", href: "https://www.coingecko.com/en/coins/magic-eden" },
      { type: "video", title: "NFT Launchpad Basics", source: "YouTube", skillLevel: "Beginner", embedId: "L-SCdSfGztA" },
    ],
  };

  return <ProjectPageTemplate data={data} />;
}
