import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import type { ProjectPageData } from "@/lib/project-page-data";
import kalshiLogo from "@/assets/kalshi-logo.png";

export default function Kalshi() {
  const data: ProjectPageData = {
    slug: "kalshi",
    name: "Kalshi",
    logo: kalshiLogo,
    tags: [{ label: "Prediction Market" }, { label: "Regulated" }, { label: "Macro" }],
    appUrl: "https://kalshi.com/",
    guideUrl: "/manuale",
    tokenSymbol: "—",
    coinId: null,
    description:
      "Kalshi e una piattaforma di prediction markets regolamentata negli USA, focalizzata su eventi macro, economici e politici con struttura compliance-first.",
    overviewTags: [{ label: "Regulated Venue" }, { label: "Event Contracts" }, { label: "Macro" }, { label: "Risk Control" }],
    featureCards: [
      { icon: "lightning", title: "Setup account", description: "Apri account e definisci limiti operativi." },
      { icon: "droplet", title: "Execution", description: "Confronta spread, liquidita e timing delle entry." },
      { icon: "cap", title: "Metodo", description: "Usa framework probabilistico e sizing disciplinato.", href: "/manuale" },
      { icon: "warning", title: "Rischi", description: "Event risk e sorprese macro possono invertire il bias rapidamente." },
      { icon: "gift", title: "Opportunita", description: "Mercati evento con pricing inefficiente nel breve." },
    ],
    howToSteps: [
      { icon: "1", title: "Seleziona evento", description: "Scegli market con tesi chiara e orizzonte definito." },
      { icon: "2", title: "Valuta probabilita", description: "Confronta pricing implicito con scenario personale." },
      { icon: "3", title: "Imposta sizing", description: "Limita esposizione per singolo evento." },
      { icon: "4", title: "Gestisci uscita", description: "Definisci take profit e invalidation prima dell'ingresso." },
    ],
    riskCards: [
      { title: "Event Shock", description: "Headline improvvise cambiano rapidamente la probabilita implicita." },
      { title: "Liquidity Risk", description: "Alcuni market hanno spread elevato fuori dagli orari chiave." },
      { title: "Behavioral Risk", description: "Bias confermativo e overconfidence degradano i risultati." },
      { title: "Execution Risk", description: "Senza piano di uscita il drawdown puo allargarsi velocemente." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: "https://kalshi.com/" },
      { label: "Twitter / X", href: "https://x.com/Kalshi" },
      { label: "Help Center", href: "https://help.kalshi.com/" },
    ],
    contentItems: [
      { type: "article", title: "How Kalshi Works", source: "Kalshi", href: "https://help.kalshi.com/" },
      { type: "article", title: "Risk & Market Basics", source: "Kalshi", href: "https://kalshi.com/" },
      { type: "video", title: "Prediction Markets Primer", source: "YouTube", skillLevel: "Beginner", embedId: "Afi5cf6hya8" },
    ],
  };

  return <ProjectPageTemplate data={data} />;
}
