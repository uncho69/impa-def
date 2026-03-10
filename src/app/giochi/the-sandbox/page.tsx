import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import type { ProjectPageData } from "@/lib/project-page-data";
import sandboxLogo from "@/assets/sandbox-logo.jpg";

export default function TheSandbox() {
  const data: ProjectPageData = {
    slug: "the-sandbox",
    name: "The Sandbox",
    logo: sandboxLogo,
    tags: [{ label: "Gaming" }, { label: "Metaverse" }, { label: "UGC" }],
    appUrl: "https://www.sandbox.game/en/",
    guideUrl: "/manuale",
    tokenSymbol: "SAND",
    coinId: "the-sandbox",
    description:
      "The Sandbox e un metaverso Web3 dove creator e brand possono costruire esperienze, possedere LAND e monetizzare contenuti digitali.",
    overviewTags: [{ label: "Metaverse" }, { label: "Creator Economy" }, { label: "LAND" }, { label: "Web3" }],
    featureCards: [
      { icon: "lightning", title: "Setup rapido", description: "Crea account e scopri hub, mappe e LAND." },
      { icon: "droplet", title: "Economia creator", description: "Analizza ricavi da esperienze e asset virtuali." },
      { icon: "cap", title: "Learning Path", description: "Dal ruolo player al ruolo creator.", href: "/manuale" },
      { icon: "warning", title: "Rischi", description: "Valore LAND e asset legato a ciclo mercato e adozione." },
      { icon: "gift", title: "Opportunita", description: "Partnership brand e eventi metaverse stagionali." },
    ],
    howToSteps: [
      { icon: "1", title: "Crea account", description: "Registrati e collega wallet per funzionalita Web3." },
      { icon: "2", title: "Esplora esperienze", description: "Valuta metriche utenti e qualita delle mappe." },
      { icon: "3", title: "Usa tool creator", description: "Costruisci contenuti e asset con workflow iterativo." },
      { icon: "4", title: "Monetizza", description: "Definisci pricing e strategia di distribuzione." },
    ],
    riskCards: [
      { title: "Adoption Risk", description: "Traffico e retention influenzano direttamente la monetizzazione." },
      { title: "Asset Volatility", description: "SAND e asset in-game sono esposti a forte volatilita." },
      { title: "Execution Risk", description: "Progetti creator richiedono effort continuativo." },
      { title: "Security Risk", description: "Proteggi wallet e account da phishing." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: "https://www.sandbox.game/" },
      { label: "Mappa esperienze", href: "https://www.sandbox.game/en/map/" },
      { label: "Twitter / X", href: "https://x.com/TheSandboxGame" },
      { label: "Token SAND", href: "https://www.coingecko.com/en/coins/the-sandbox" },
    ],
    contentItems: [
      { type: "article", title: "Creator Fundamentals", source: "The Sandbox", href: "https://www.sandbox.game/en/create/" },
      { type: "article", title: "Token Metrics SAND", source: "CoinGecko", href: "https://www.coingecko.com/en/coins/the-sandbox" },
      { type: "video", title: "Sandbox Overview", source: "YouTube", skillLevel: "Beginner", embedId: "K4TOrB7at0Y" },
    ],
  };

  return <ProjectPageTemplate data={data} />;
}
