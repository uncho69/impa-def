import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import type { ProjectPageData } from "@/lib/project-page-data";
import blurLogo from "@/assets/blur-icon.png";

export default function Blur() {
  const data: ProjectPageData = {
    slug: "blur",
    name: "Blur",
    logo: blurLogo,
    tags: [{ label: "NFT" }, { label: "Marketplace" }, { label: "Trader Focus" }],
    appUrl: "https://blur.io/",
    guideUrl: "/manuale",
    tokenSymbol: "BLUR",
    coinId: "blur",
    description: "Blur e un marketplace NFT orientato a trader attivi, con strumenti di esecuzione rapida e analytics avanzate.",
    featureCards: [
      { icon: "lightning", title: "Execution veloce", description: "Interfaccia ottimizzata per trading rapido." },
      { icon: "droplet", title: "Orderflow", description: "Valuta profondita book e liquidita reale." },
      { icon: "cap", title: "Guida", description: "Approccio risk-first per NFT trading.", href: "/manuale" },
      { icon: "warning", title: "Rischi", description: "Alta rotazione implica rischio operativo elevato." },
      { icon: "gift", title: "Opportunita", description: "Setup tattici su market structure NFT." },
    ],
    howToSteps: [
      { icon: "1", title: "Connetti wallet", description: "Usa indirizzo operativo separato." },
      { icon: "2", title: "Configura watchlist", description: "Segui solo collection con volume rilevante." },
      { icon: "3", title: "Definisci entry/exit", description: "Piano chiaro prima di ogni esecuzione." },
      { icon: "4", title: "Review giornaliera", description: "Misura PnL netto fee e errori." },
    ],
    riskCards: [
      { title: "Execution Risk", description: "Errori di click o timing possono costare molto." },
      { title: "Liquidity Risk", description: "Book sottili amplificano slippage." },
      { title: "Token Risk", description: "BLUR segue dinamiche narrative e incentive." },
      { title: "Behavioral Risk", description: "Overtrading e FOMO riducono performance." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: "https://blur.io/" },
      { label: "Twitter / X", href: "https://x.com/blur_io" },
      { label: "Token BLUR", href: "https://www.coingecko.com/en/coins/blur" },
    ],
    contentItems: [
      { type: "article", title: "Blur Marketplace", source: "Blur", href: "https://blur.io/" },
      { type: "article", title: "BLUR Token Metrics", source: "CoinGecko", href: "https://www.coingecko.com/en/coins/blur" },
      { type: "video", title: "NFT Trading Concepts", source: "YouTube", skillLevel: "Intermediate", embedId: "1jzFNzUgZ6Q" },
    ],
  };

  return <ProjectPageTemplate data={data} />;
}
