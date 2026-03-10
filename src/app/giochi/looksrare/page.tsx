import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import type { ProjectPageData } from "@/lib/project-page-data";
import placeholder from "@/assets/placeholder.svg";

export default function LooksRare() {
  const data: ProjectPageData = {
    slug: "looksrare",
    name: "LooksRare",
    logo: placeholder,
    tags: [{ label: "NFT" }, { label: "Marketplace" }, { label: "Community" }],
    appUrl: "https://looksrare.org/",
    guideUrl: "/manuale",
    tokenSymbol: "LOOKS",
    coinId: "looksrare",
    description: "LooksRare e un marketplace NFT community-driven con focus su reward, governance e trading on-chain.",
    featureCards: [
      { icon: "lightning", title: "Start rapido", description: "Setup wallet e monitoraggio collection principali." },
      { icon: "droplet", title: "Reward dynamics", description: "Valuta incentivi e sostenibilita." },
      { icon: "cap", title: "Guida", description: "Imposta processo decisionale per trade NFT.", href: "/manuale" },
      { icon: "warning", title: "Rischi", description: "Tokenomics e attivita utente impattano i reward." },
      { icon: "gift", title: "Opportunita", description: "Tracking narratives e volumi emergenti." },
    ],
    howToSteps: [
      { icon: "1", title: "Connetti wallet", description: "Opera sempre da URL ufficiale." },
      { icon: "2", title: "Seleziona collection", description: "Preferisci set con liquidita verificabile." },
      { icon: "3", title: "Gestisci ordini", description: "Esegui con limiti e sizing disciplinato." },
      { icon: "4", title: "Controlla reward", description: "Valuta rendimento netto reale." },
    ],
    riskCards: [
      { title: "Liquidity Risk", description: "Volume discontinuo su collection secondarie." },
      { title: "Token Risk", description: "LOOKS puo essere molto volatile." },
      { title: "Execution Risk", description: "Errori operativi su listing/offer sono frequenti." },
      { title: "Smart Contract Risk", description: "Resta presente rischio tecnico di protocollo." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: "https://looksrare.org/" },
      { label: "Twitter / X", href: "https://x.com/LooksRare" },
      { label: "Token LOOKS", href: "https://www.coingecko.com/en/coins/looksrare" },
    ],
    contentItems: [
      { type: "article", title: "LooksRare App", source: "LooksRare", href: "https://looksrare.org/" },
      { type: "article", title: "LOOKS Token Data", source: "CoinGecko", href: "https://www.coingecko.com/en/coins/looksrare" },
      { type: "video", title: "NFT Market Structure", source: "YouTube", skillLevel: "Intermediate", embedId: "K4TOrB7at0Y" },
    ],
  };

  return <ProjectPageTemplate data={data} />;
}
