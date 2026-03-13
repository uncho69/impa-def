import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import type { ProjectPageData } from "@/lib/project-page-data";
import openseaLogo from "@/assets/opensea-icon.png";

export default function OpenSea() {
  const data: ProjectPageData = {
    slug: "opensea",
    name: "OpenSea",
    logo: openseaLogo,
    tags: [{ label: "NFT" }, { label: "Marketplace" }, { label: "Ethereum" }],
    appUrl: "https://opensea.io/",
    guideUrl: "/manuale",
    tokenSymbol: "—",
    coinId: null,
    description: "OpenSea e il marketplace NFT piu conosciuto per discovery, listing e trading di collezioni su piu chain.",
    featureCards: [
      { icon: "lightning", title: "Setup", description: "Connetti wallet e configura profilo." },
      { icon: "droplet", title: "Liquidita", description: "Confronta floor, spread e volumi collezione." },
      { icon: "cap", title: "Guida", description: "Workflow base buy/sell NFT.", href: "/manuale" },
      { icon: "warning", title: "Rischi", description: "Contraffazioni, scam e bassa liquidita." },
      { icon: "gift", title: "Opportunita", description: "Monitoraggio mint e trend collezioni." },
    ],
    howToSteps: [
      { icon: "1", title: "Connetti wallet", description: "Usa wallet sicuro e dominio ufficiale." },
      { icon: "2", title: "Analizza collection", description: "Controlla volumi, holder e storico prezzi." },
      { icon: "3", title: "Esegui trade", description: "Inserisci offerte e limiti in modo disciplinato." },
      { icon: "4", title: "Gestisci rischio", description: "Evita overexposure su singola narrativa." },
    ],
    riskCards: [
      { title: "Fake Collections", description: "Verifica sempre check ufficiali e contract." },
      { title: "Liquidity Risk", description: "Uscita difficile su asset poco trattati." },
      { title: "Volatility", description: "Floor price puo muoversi molto in poco tempo." },
      { title: "Operational Risk", description: "Phishing e approve malevole restano rischi primari." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: "https://opensea.io/" },
      { label: "Twitter / X", href: "https://x.com/opensea" },
      { label: "Help Center", href: "https://support.opensea.io/" },
    ],
    contentItems: [
      { type: "article", title: "OpenSea Help", source: "OpenSea", href: "https://support.opensea.io/" },
      { type: "video", title: "OpenSea Basics", source: "YouTube", skillLevel: "Beginner", embedId: "Afi5cf6hya8" },
      { type: "article", title: "NFT Security Checklist", source: "ImparoDeFi", href: "/manuale" },
    ],
  };

  return <ProjectPageTemplate data={data} />;
}
