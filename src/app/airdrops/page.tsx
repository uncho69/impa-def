"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { GuidaAirdropsModal } from "@/components/GuidaAirdropsModal";
import { getProjectLogo } from "@/lib/project-logos";
import { BookmarkButton } from "@/components/bookmarks/BookmarkButton";
import Placeholder from "@/assets/placeholder.svg";
import { useLanguage } from "@/contexts/LanguageContext";

// Import delle immagini per i progetti di airdrop
import baseLogo from "@/assets/base-logo.svg";
import hyperliquidLogo from "@/assets/hyperliquid-logo.png";
import scrollLogo from "@/assets/Scroll-Logo.svg";
import polygonLogo from "@/assets/polygon-matic-logo.svg";
import optimismLogo from "@/assets/optimism-ethereum-op-logo.svg";
import arbitrumLogo from "@/assets/arbitrum-arb-logo.svg";
import ethereumLogo from "@/assets/ethereum-icon.svg";
import solanaLogo from "@/assets/solana-sol-logo.svg";
import bitcoinLogo from "@/assets/bitcoin-icon.svg";
import avalancheLogo from "@/assets/avalanche-avax-logo.svg";
import zksyncLogo from "@/assets/zkSync-logo.png";
import zoraLogo from "@/assets/zora-logo.png";
import lineaLogo from "@/assets/linea-logo.svg";
import blastLogo from "@/assets/blast-logo.webp";
import berachainLogo from "@/assets/berachain-logo.png";
import degenLogo from "@/assets/degen-base-degen-logo.svg";
import hyperlaneLogo from "@/assets/hyperlane-logo.svg";
import layer3Logo from "@/assets/layer3-logo.png";


export default function Airdrops() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [search, setSearch] = useState("");
  const [guidaOpen, setGuidaOpen] = useState(false);

  // Array con tutti i 34 progetti di potenziali airdrop
  const allProjects: Array<{
    title: string;
    image: string | StaticImageData;
    website: string;
    xProfile: string;
    tokenNFT: string;
    description: string;
    descriptionEn?: string;
    href?: string;
  }> = [
    {
      title: "Base",
      image: baseLogo,
      website: "https://base.org/",
      xProfile: "https://x.com/base",
      tokenNFT: "https://www.coingecko.com/en/coins/base",
      description: "Layer 2 di Ethereum sviluppata da Coinbase, progettata per offrire una piattaforma sicura, scalabile e conveniente per le applicazioni decentralizzate.",
      descriptionEn: "Ethereum Layer 2 by Coinbase, built to provide a secure, scalable, and low-cost platform for decentralized applications.",
      href: "/airdrops/base"
    },
    {
      title: "Hyperliquid",
      image: hyperliquidLogo,
      website: "https://hyperliquid.xyz/",
      xProfile: "https://x.com/HyperliquidX",
      tokenNFT: "https://www.coingecko.com/en/coins/purr-2",
      description: "Exchange decentralizzato focalizzato sui perpetual futures, operante sulla blockchain Hyperliquid L1 con trading veloce e trasparente.",
      descriptionEn: "Decentralized exchange focused on perpetual futures on Hyperliquid L1, with fast and transparent trading.",
      href: "/defi/hyperliquid"
    },
    {
      title: "Jumper",
      image: ethereumLogo, // Placeholder - non ho l'icona specifica
      website: "https://jumper.exchange/",
      xProfile: "https://x.com/JumperExchange",
      tokenNFT: "#",
      description: "Piattaforma di bridging e swapping multi-chain, alimentata da LI.FI, che permette trasferimenti di token fluidi tra diverse blockchain.",
      descriptionEn: "Multi-chain bridging and swapping platform powered by LI.FI for smooth token transfers across chains.",
      href: "/airdrops/jumper"
    },
    {
      title: "Scroll",
      image: scrollLogo,
      website: "https://scroll.io/",
      xProfile: "https://x.com/Scroll_ZKP",
      tokenNFT: "#",
      description: "Soluzione Layer 2 per Ethereum che utilizza la tecnologia zkEVM per migliorare la scalabilità e ridurre i costi di transazione.",
      descriptionEn: "Ethereum Layer 2 using zkEVM technology to improve scalability and reduce transaction costs.",
      href: "/airdrops/scroll"
    },
    {
      title: "Orbiter",
      image: ethereumLogo, // Placeholder
      website: "https://www.orbiter.finance/",
      xProfile: "https://x.com/Orbiter_Finance",
      tokenNFT: "#",
      description: "Protocollo di bridging decentralizzato che facilita le transazioni cross-chain all'interno dell'ecosistema Ethereum.",
      descriptionEn: "Decentralized bridging protocol enabling cross-chain transactions within the Ethereum ecosystem.",
      href: "/airdrops/orbiter"
    },
    {
      title: "deBridge",
      image: ethereumLogo, // Placeholder
      website: "https://debridge.finance/",
      xProfile: "https://x.com/deBridgeFinance",
      tokenNFT: "#",
      description: "Protocollo di interoperabilità cross-chain che permette trasferimenti di messaggi arbitrari e valore tra diverse blockchain.",
      descriptionEn: "Cross-chain interoperability protocol for arbitrary message passing and value transfer across blockchains.",
      href: "/airdrops/debridge"
    },
    {
      title: "Polymarket",
      image: polygonLogo,
      website: "https://polymarket.com/",
      xProfile: "https://x.com/Polymarket",
      tokenNFT: "#",
      description: "Piattaforma di mercati predittivi basata su Polygon, dove gli utenti possono scommettere su vari eventi futuri.",
      href: "/airdrops/polymarket"
    },
    {
      title: "Relay Bridge",
      image: ethereumLogo, // Placeholder
      website: "https://relay.link/",
      xProfile: "https://x.com/ReservoirProtocol",
      tokenNFT: "#",
      description: "Bridge sviluppato da Reservoir che utilizza un singolo relayer per eseguire immediatamente gli ordini sulla rete di destinazione.",
      href: "/airdrops/relay-bridge"
    },
    {
      title: "Metamask",
      image: ethereumLogo, // Placeholder - non ho l'icona specifica
      website: "https://metamask.io/",
      xProfile: "https://x.com/MetaMask",
      tokenNFT: "#",
      description: "Portafoglio non-custodial più popolare per Ethereum e varie soluzioni Layer 2, con supporto per browser e mobile.",
      href: "/airdrops/metamask"
    },
    {
      title: "PropellerSwap",
      image: ethereumLogo, // Placeholder
      website: "https://propellerswap.com/",
      xProfile: "#",
      tokenNFT: "#",
      description: "Exchange decentralizzato che offre trading di token con funzionalità avanzate e commissioni competitive.",
      href: "/airdrops/propellerswap"
    },
    {
      title: "Phantom",
      image: solanaLogo,
      website: "https://phantom.app/",
      xProfile: "https://x.com/phantom",
      tokenNFT: "#",
      description: "Portafoglio non-custodial per Solana e Ethereum, progettato per essere user-friendly e sicuro per la gestione di criptovalute.",
      href: "/airdrops/phantom"
    },
    {
      title: "Berachain",
      image: berachainLogo,
      website: "https://berachain.com/",
      xProfile: "https://x.com/berachain",
      tokenNFT: "#",
      description: "Blockchain Layer 1 basata su Cosmos, focalizzata su DeFi con un consenso 'proof of liquidity' per migliorare l'efficienza del capitale.",
      href: "/airdrops/berachain"
    },
    {
      title: "OpenSea",
      image: ethereumLogo, // Placeholder - non ho l'icona specifica
      website: "https://opensea.io/",
      xProfile: "https://x.com/opensea",
      tokenNFT: "#",
      description: "Marketplace leader per NFT, fondato nel 2017, che ha abilitato la creazione, vendita e scoperta di oggetti digitali unici.",
      href: "/airdrops/opensea"
    },
    {
      title: "Beramarket",
      image: berachainLogo,
      website: "https://beramarket.com/",
      xProfile: "#",
      tokenNFT: "#",
      description: "Marketplace NFT su Berachain che offre trading di NFT con funzionalità avanzate e integrazione con l'ecosistema Berachain.",
      href: "/airdrops/beramarket"
    },
    {
      title: "Warpcast",
      image: ethereumLogo, // Placeholder
      website: "https://warpcast.com/",
      xProfile: "https://x.com/warpcast",
      tokenNFT: "#",
      description: "Client per il protocollo Farcaster, una piattaforma social decentralizzata basata su blockchain.",
      href: "/airdrops/warpcast"
    },
    {
      title: "Syncswap",
      image: zksyncLogo,
      website: "https://syncswap.xyz/",
      xProfile: "https://x.com/syncswap",
      tokenNFT: "#",
      description: "Exchange decentralizzato su zkSync Era che offre trading di token con commissioni basse e transazioni veloci.",
      href: "/airdrops/syncswap"
    },
    {
      title: "Polygon zkEVM",
      image: polygonLogo,
      website: "https://polygon.technology/polygon-zkevm",
      xProfile: "https://x.com/0xPolygon",
      tokenNFT: "https://www.coingecko.com/en/coins/polygon",
      description: "Soluzione Layer 2 per Ethereum che utilizza la tecnologia zero-knowledge rollup per migliorare la scalabilità.",
      href: "/airdrops/polygon-zkevm"
    },
    {
      title: "Degen",
      image: degenLogo,
      website: "https://degen.tips/",
      xProfile: "https://x.com/degentips",
      tokenNFT: "#",
      description: "Ecosistema su Base progettato per supportare applicazioni decentralizzate e integrare DEGEN come token nativo.",
      href: "/airdrops/degen"
    },
    {
      title: "Rainbow",
      image: ethereumLogo, // Placeholder - non ho l'icona specifica
      website: "https://rainbow.me/",
      xProfile: "https://x.com/rainbowdotme",
      tokenNFT: "#",
      description: "Portafoglio mobile per Ethereum e Layer 2, progettato per essere bello, sicuro e facile da usare.",
      href: "/airdrops/rainbow"
    },
    {
      title: "Gitcoin",
      image: ethereumLogo, // Placeholder
      website: "https://www.gitcoin.co/",
      xProfile: "https://x.com/gitcoin",
      tokenNFT: "https://www.coingecko.com/en/coins/gitcoin",
      description: "Piattaforma per il finanziamento di beni pubblici open source attraverso il Quadratic Funding e altri meccanismi.",
      href: "/airdrops/gitcoin"
    },
    {
      title: "Linea",
      image: lineaLogo,
      website: "https://linea.build/",
      xProfile: "https://x.com/LineaBuild",
      tokenNFT: "#",
      description: "Blockchain Layer 2 di Consensys che utilizza la tecnologia zk-rollup per offrire transazioni rapide, economiche e sicure.",
      href: "/airdrops/linea"
    },
    {
      title: "Getgrass",
      image: ethereumLogo, // Placeholder
      website: "https://getgrass.io/",
      xProfile: "https://x.com/getgrass_io",
      tokenNFT: "#",
      description: "Piattaforma DePIN che permette di guadagnare token contribuendo alla rete con risorse computazionali.",
      href: "/airdrops/getgrass"
    },
    {
      title: "Zora",
      image: zoraLogo,
      website: "https://zora.co/",
      xProfile: "https://x.com/ourZORA",
      tokenNFT: "#",
      description: "Piattaforma per la creazione su internet libera e preziosa, permettendo agli artisti di monetizzare il loro lavoro.",
      href: "/airdrops/zora"
    },
    {
      title: "Hyperlane",
      image: hyperlaneLogo,
      website: "https://hyperlane.xyz/",
      xProfile: "https://x.com/hyperlane_xyz",
      tokenNFT: "#",
      description: "Protocollo per l'interoperabilità tra blockchain con quest per potenziali airdrop e trasferimenti cross-chain.",
      href: "/airdrops/hyperlane"
    },
    {
      title: "Layer3",
      image: layer3Logo,
      website: "https://layer3.xyz/",
      xProfile: "https://x.com/layer3xyz",
      tokenNFT: "#",
      description: "Piattaforma per quest e gamification in Web3, che permette agli utenti di guadagnare token completando attività.",
      href: "/airdrops/layer3"
    },
    {
      title: "Moonwell",
      image: baseLogo, // Placeholder
      website: "https://moonwell.fi/",
      xProfile: "https://x.com/MoonwellFi",
      tokenNFT: "#",
      description: "Protocollo di prestito e prestito decentralizzato costruito su Base, Moonbeam e Moonriver.",
      href: "/airdrops/moonwell"
    },
    {
      title: "Zerion",
      image: ethereumLogo, // Placeholder
      website: "https://zerion.io/",
      xProfile: "https://x.com/zerion",
      tokenNFT: "#",
      description: "Piattaforma che offre un portafoglio non-custodial specializzato nell'accesso a DeFi e NFT.",
      href: "/airdrops/zerion"
    },
    {
      title: "Zapper",
      image: ethereumLogo, // Placeholder
      website: "https://zapper.xyz/",
      xProfile: "https://x.com/zapper_fi",
      tokenNFT: "#",
      description: "Piattaforma di gestione del portafoglio DeFi che consente di monitorare e interagire con asset criptovalute.",
      href: "/airdrops/zapper"
    },
    {
      title: "Marginfi",
      image: solanaLogo, // Placeholder
      website: "https://marginfi.com/",
      xProfile: "https://x.com/marginfi",
      tokenNFT: "#",
      description: "Protocollo di prestito decentralizzato su Solana che offre un'esperienza di trading e gestione del margine efficiente.",
      href: "/airdrops/marginfi"
    },
    {
      title: "Snapshot",
      image: ethereumLogo, // Placeholder
      website: "https://snapshot.org/",
      xProfile: "https://x.com/SnapshotLabs",
      tokenNFT: "#",
      description: "Piattaforma di governance decentralizzata che permette alle DAO di prendere decisioni collettive in modo trasparente.",
      href: "/airdrops/snapshot"
    },
    {
      title: "DeBank",
      image: ethereumLogo, // Placeholder
      website: "https://debank.com/",
      xProfile: "https://x.com/debank",
      tokenNFT: "#",
      description: "Piattaforma di tracciamento del portafoglio DeFi che offre una panoramica completa degli asset e delle attività.",
      href: "/airdrops/debank"
    },
    {
      title: "Nifty Island",
      image: ethereumLogo, // Placeholder
      website: "https://niftyisland.com/",
      xProfile: "https://x.com/niftyisland",
      tokenNFT: "#",
      description: "Piattaforma di gaming e metaverso con meccaniche play-to-earn e potenziali airdrop per utenti attivi.",
      href: "/airdrops/nifty-island"
    },
    {
      title: "Bong Bears",
      image: ethereumLogo, // Placeholder
      website: "https://bongbears.com/",
      xProfile: "https://x.com/bongbears",
      tokenNFT: "#",
      description: "Collezione NFT che celebra la cultura dei fumatori, rendendo ogni NFT distintivo e collezionabile.",
      href: "/airdrops/bong-bears"
    },
    {
      title: "Blast",
      image: blastLogo,
      website: "https://blast.io/",
      xProfile: "https://x.com/Blast_L2",
      tokenNFT: "#",
      description: "Blockchain Layer 2 di Ethereum che offre rendimenti nativi ETH e staking automatico per gli utenti.",
      href: "/airdrops/blast"
    }
  ];

  const projectsWithLogos = useMemo(() => {
    const resolveSlug = (project: (typeof allProjects)[number]) => {
      if (project.href?.startsWith("/airdrops/")) return project.href.replace("/airdrops/", "");
      if (project.href?.startsWith("/defi/")) return project.href.replace("/defi/", "");
      return project.title.toLowerCase().replace(/\s+/g, "-");
    };

    return allProjects.map((project) => {
      const slug = resolveSlug(project);
      const normalizedSlug = slug.toLowerCase();
      const logo =
        getProjectLogo(normalizedSlug) ??
        getProjectLogo(normalizedSlug.replace(/_/g, "-")) ??
        getProjectLogo(normalizedSlug.replace(/-/g, "_")) ??
        project.image ??
        Placeholder;

      return {
        ...project,
        description: isEnglish
          ? project.descriptionEn || `${project.title} is tracked for potential airdrop opportunities and ecosystem activity.`
          : project.description,
        image: logo,
      };
    });
  }, [allProjects, isEnglish]);

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return projectsWithLogos;
    return projectsWithLogos.filter((project) =>
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q)
    );
  }, [projectsWithLogos, search]);

  return (
    <div className="relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Airdrops</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {isEnglish ? "Free tokens distributed to early users of Web3 projects." : "Token gratuiti distribuiti ai primi utenti dei progetti Web3."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setGuidaOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors shrink-0 border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            <span>📘</span>
            <span>{isEnglish ? "Airdrops Guide" : "Guida Airdrops"}</span>
          </button>
          <Link
            href="/news/airdrops"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-slate-900 transition-colors"
          >
            <span>📰</span>
            <span>{isEnglish ? "Airdrops News" : "Notizie Airdrops"}</span>
          </Link>
        </div>
      </div>

      <div className="relative mb-8 max-w-2xl">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        <input
          type="search"
          placeholder={isEnglish ? "Search airdrop projects" : "Cerca progetti Airdrop"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/40 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <main className="flex-1 min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.href + project.title}
              className="rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <Link href={project.href || "/"} className="block">
                <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-indigo-800/40 flex items-center justify-center overflow-hidden shrink-0">
                      <Image src={project.image} alt={project.title} width={32} height={32} className="object-contain" />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white truncate">{project.title}</span>
                  </div>
                  <span className="shrink-0 px-2 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-[11px] font-medium whitespace-nowrap">
                    Airdrop
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-3">{project.description}</p>
              </Link>
              <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-200 dark:border-slate-600">
                <a href={project.xProfile} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors" title="X (Twitter)" aria-label="X (Twitter)">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href={project.website} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors" title={isEnglish ? "Website" : "Sito web"} aria-label={isEnglish ? "Website" : "Sito web"}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                </a>
                {project.tokenNFT !== "#" ? (
                  <a href={project.tokenNFT} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors" title="Token" aria-label="Token">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 1v22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H6" /></svg>
                  </a>
                ) : null}
                <BookmarkButton
                  url={project.href || "/airdrops"}
                  title={`${project.title} - ${isEnglish ? "Airdrop project" : "Progetto airdrop"}`}
                  type="page"
                  projectId={(project.href || "").replace("/airdrops/", "").replace("/defi/", "") || project.title.toLowerCase().replace(/\s+/g, "-")}
                  className="ml-auto"
                />
              </div>
            </div>
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <p className="text-center py-12 text-slate-500 dark:text-slate-400">
            {isEnglish ? "No projects found for this search." : "Nessun progetto trovato per questa ricerca."}
          </p>
        )}
      </main>

      <GuidaAirdropsModal isOpen={guidaOpen} onClose={() => setGuidaOpen(false)} />
    </div>
  );
}
