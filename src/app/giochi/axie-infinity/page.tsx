import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import type { ProjectPageData } from "@/lib/project-page-data";
import axieLogo from "@/assets/axie-logo.png";

export default function AxieInfinity() {
  const data: ProjectPageData = {
    slug: "axie-infinity",
    name: "Axie Infinity",
    logo: axieLogo,
    tags: [{ label: "Gaming" }, { label: "Play-to-Earn" }, { label: "NFT" }],
    appUrl: "https://app.axieinfinity.com/",
    guideUrl: "/manuale",
    tokenSymbol: "AXS",
    coinId: "axie-infinity",
    description:
      "Axie Infinity e uno dei progetti pionieri del Web3 gaming: combina gameplay strategico, asset NFT e un'economia on-chain basata su token.",
    overviewTags: [{ label: "Strategy" }, { label: "NFT Economy" }, { label: "Web3" }, { label: "Community" }],
    featureCards: [
      { icon: "lightning", title: "Inizia a giocare", description: "Setup wallet, account e primo team Axie." },
      { icon: "droplet", title: "Economia in-game", description: "Valuta costi, reward e sostenibilita del farming." },
      { icon: "cap", title: "Learning Path", description: "Parti da modalita base prima del competitivo.", href: "/manuale" },
      { icon: "warning", title: "Rischi", description: "Elevata variabilita reward e prezzo asset NFT/token." },
      { icon: "gift", title: "Opportunita", description: "Eventi stagionali, tornei e premi community." },
    ],
    howToSteps: [
      { icon: "1", title: "Crea wallet", description: "Prepara un wallet compatibile e metti in sicurezza la seed." },
      { icon: "2", title: "Configura account", description: "Collega wallet e completa setup su Axie Hub." },
      { icon: "3", title: "Acquista team", description: "Scegli Axie con ruoli bilanciati per iniziare." },
      { icon: "4", title: "Gioca e monitora", description: "Migliora win-rate e gestisci rischio economico." },
    ],
    riskCards: [
      { title: "Token Volatility", description: "AXS/SLP possono avere movimenti rapidi e drawdown importanti." },
      { title: "Game Economy Risk", description: "Il bilanciamento reward cambia con patch e stagioni." },
      { title: "Liquidity Risk", description: "Asset NFT meno liquidi richiedono tempi di uscita maggiori." },
      { title: "Operational Errors", description: "Attenzione a phishing e marketplace non ufficiali." },
    ],
    usefulLinks: [
      { label: "Sito ufficiale", href: "https://axieinfinity.com/" },
      { label: "App", href: "https://app.axieinfinity.com/" },
      { label: "Twitter / X", href: "https://x.com/AxieInfinity" },
      { label: "Token AXS", href: "https://www.coingecko.com/en/coins/axie-infinity" },
    ],
    contentItems: [
      { type: "article", title: "Getting Started", source: "Axie Docs", href: "https://support.axieinfinity.com/" },
      { type: "article", title: "Economy & Tokens", source: "CoinGecko", href: "https://www.coingecko.com/en/coins/axie-infinity" },
      { type: "video", title: "Axie Infinity Basics", source: "YouTube", skillLevel: "Beginner", embedId: "L-SCdSfGztA" },
    ],
  };

  return <ProjectPageTemplate data={data} />;
}
