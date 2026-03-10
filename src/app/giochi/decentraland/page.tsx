import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import type { ProjectPageData } from "@/lib/project-page-data";
import decentralandLogo from "@/assets/decentraland-logo.jpg";

export default function Decentraland() {
  const data: ProjectPageData = {
    slug: "decentraland",
    name: "Decentraland",
    logo: decentralandLogo,
    tags: [{ label: "Gaming" }, { label: "Metaverse" }, { label: "DAO" }],
    appUrl: "https://play.decentraland.org/",
    guideUrl: "/manuale",
    tokenSymbol: "MANA",
    coinId: "decentraland",
    description:
      "Decentraland e un metaverso decentralizzato dove utenti e brand costruiscono esperienze immersive, possiedono LAND NFT e partecipano alla governance DAO.",
    overviewTags: [{ label: "DAO" }, { label: "LAND NFTs" }, { label: "Events" }, { label: "Web3" }],
    featureCards: [
      { icon: "lightning", title: "Onboarding", description: "Accedi al mondo virtuale e scopri i distretti principali." },
      { icon: "droplet", title: "Economia LAND", description: "Comprendi mercato secondario e pricing degli asset." },
      { icon: "cap", title: "Guida pratica", description: "Workflow base da utente a creator.", href: "/manuale" },
      { icon: "warning", title: "Rischi", description: "Dipendenza da engagement utenti e trend metaverse." },
      { icon: "gift", title: "Opportunita", description: "Eventi live, partnership e attivazioni brand." },
    ],
    howToSteps: [
      { icon: "1", title: "Connetti wallet", description: "Usa wallet sicuro e separa fondi operativi." },
      { icon: "2", title: "Esplora hub", description: "Valuta aree ad alta trazione e activity." },
      { icon: "3", title: "Analizza LAND", description: "Confronta location, domanda e liquidity." },
      { icon: "4", title: "Partecipa governance", description: "Segui proposte e direzione ecosistema." },
    ],
    riskCards: [
      { title: "Liquidity Risk", description: "Mercato LAND/NFT puo avere liquidita discontinua." },
      { title: "Demand Risk", description: "Retention utenti impatta valore economico dell'ecosistema." },
      { title: "Token Risk", description: "MANA risente del ciclo macro crypto." },
      { title: "Operational Risk", description: "Errori di wallet/network restano irreversibili on-chain." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: "https://decentraland.org/" },
      { label: "App", href: "https://play.decentraland.org/" },
      { label: "Twitter / X", href: "https://x.com/decentraland" },
      { label: "Token MANA", href: "https://www.coingecko.com/en/coins/decentraland" },
    ],
    contentItems: [
      { type: "article", title: "What is Decentraland", source: "Decentraland", href: "https://decentraland.org/" },
      { type: "article", title: "Token Metrics MANA", source: "CoinGecko", href: "https://www.coingecko.com/en/coins/decentraland" },
      { type: "video", title: "Decentraland Walkthrough", source: "YouTube", skillLevel: "Beginner", embedId: "1jzFNzUgZ6Q" },
    ],
  };

  return <ProjectPageTemplate data={data} />;
}
