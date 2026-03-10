import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import type { ProjectPageData } from "@/lib/project-page-data";
import polymarketLogo from "@/assets/polymarket-logo.png";

export default function PolymarketProjectPage() {
  const data: ProjectPageData = {
    slug: "polymarket-progetto",
    name: "Polymarket",
    logo: polymarketLogo,
    tags: [{ label: "Prediction Market" }, { label: "Decentralized" }, { label: "Polygon" }],
    appUrl: "https://polymarket.com/",
    guideUrl: "/manuale",
    tokenSymbol: "—",
    coinId: null,
    description:
      "Polymarket e una piattaforma prediction market Web3 dove il prezzo riflette la probabilita implicita degli eventi, con execution on-chain.",
    overviewTags: [{ label: "On-chain" }, { label: "Event Contracts" }, { label: "Macro" }, { label: "Risk Management" }],
    featureCards: [
      { icon: "lightning", title: "Setup", description: "Connetti wallet e configura workflow operativo." },
      { icon: "droplet", title: "Prezzo/Probabilita", description: "Interpreta quote e scenario di mercato." },
      { icon: "cap", title: "Metodo", description: "Approccio probabilistico con sizing disciplinato.", href: "/manuale" },
      { icon: "warning", title: "Rischi", description: "Event shock e sentiment possono invertire il bias." },
      { icon: "gift", title: "Opportunita", description: "Inefficienze di pricing su eventi specifici." },
    ],
    howToSteps: [
      { icon: "1", title: "Seleziona evento", description: "Scegli market con tesi chiara e verificabile." },
      { icon: "2", title: "Confronta probabilita", description: "Confronta prezzo implicito con scenario personale." },
      { icon: "3", title: "Imposta size", description: "Rischia solo una quota limitata del capitale." },
      { icon: "4", title: "Gestisci posizione", description: "Definisci uscita prima dell'evento finale." },
    ],
    riskCards: [
      { title: "Event Risk", description: "News improvvise possono cambiare il pricing istantaneamente." },
      { title: "Liquidity Risk", description: "Alcuni market possono avere spread elevato." },
      { title: "Execution Risk", description: "Senza piano di uscita il drawdown aumenta." },
      { title: "Behavioral Risk", description: "FOMO e bias narrativi riducono edge decisionale." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: "https://polymarket.com/" },
      { label: "Twitter / X", href: "https://x.com/Polymarket" },
      { label: "FAQ", href: "https://polymarket.com/" },
    ],
    contentItems: [
      { type: "article", title: "Polymarket Overview", source: "Polymarket", href: "https://polymarket.com/" },
      { type: "article", title: "Risk Playbook", source: "ImparoDeFi", href: "/manuale" },
      { type: "video", title: "Prediction Markets Basics", source: "YouTube", skillLevel: "Beginner", embedId: "Afi5cf6hya8" },
    ],
  };

  return <ProjectPageTemplate data={data} />;
}
