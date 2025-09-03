"use client";

import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { SimpleCard } from "@/components/SimpleCard";
import { ExploreWeb3 } from "@/components/ExploreWeb3";
import { useState } from "react";

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
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Array con tutti i 34 progetti di potenziali airdrop
  const allProjects: Array<{
    title: string;
    image: any;
    website: string;
    xProfile: string;
    tokenNFT: string;
    description: string;
    href?: string;
  }> = [
    {
      title: "Base",
      image: baseLogo,
      website: "https://base.org/",
      xProfile: "https://x.com/base",
      tokenNFT: "https://www.coingecko.com/en/coins/base",
      description: "Layer 2 di Ethereum sviluppata da Coinbase, progettata per offrire una piattaforma sicura, scalabile e conveniente per le applicazioni decentralizzate.",
      href: "/airdrops/base"
    },
    {
      title: "Hyperliquid",
      image: hyperliquidLogo,
      website: "https://hyperliquid.xyz/",
      xProfile: "https://x.com/HyperliquidX",
      tokenNFT: "https://www.coingecko.com/en/coins/purr-2",
      description: "Exchange decentralizzato focalizzato sui perpetual futures, operante sulla blockchain Hyperliquid L1 con trading veloce e trasparente.",
      href: "/airdrops/hyperliquid"
    },
    {
      title: "Jumper",
      image: ethereumLogo, // Placeholder - non ho l'icona specifica
      website: "https://jumper.exchange/",
      xProfile: "https://x.com/JumperExchange",
      tokenNFT: "#",
      description: "Piattaforma di bridging e swapping multi-chain, alimentata da LI.FI, che permette trasferimenti di token fluidi tra diverse blockchain.",
      href: "/airdrops/jumper"
    },
    {
      title: "Scroll",
      image: scrollLogo,
      website: "https://scroll.io/",
      xProfile: "https://x.com/Scroll_ZKP",
      tokenNFT: "#",
      description: "Soluzione Layer 2 per Ethereum che utilizza la tecnologia zkEVM per migliorare la scalabilità e ridurre i costi di transazione.",
      href: "/airdrops/scroll"
    },
    {
      title: "Orbiter",
      image: ethereumLogo, // Placeholder
      website: "https://www.orbiter.finance/",
      xProfile: "https://x.com/Orbiter_Finance",
      tokenNFT: "#",
      description: "Protocollo di bridging decentralizzato che facilita le transazioni cross-chain all'interno dell'ecosistema Ethereum.",
      href: "/airdrops/orbiter"
    },
    {
      title: "deBridge",
      image: ethereumLogo, // Placeholder
      website: "https://debridge.finance/",
      xProfile: "https://x.com/deBridgeFinance",
      tokenNFT: "#",
      description: "Protocollo di interoperabilità cross-chain che permette trasferimenti di messaggi arbitrari e valore tra diverse blockchain.",
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

  const displayedProjects = showAllProjects ? allProjects : allProjects.slice(0, 3);

  return (
    <ProtectedRoute title="Airdrops">
      <PageTitle description="Token gratuiti distribuiti ai primi utenti dei progetti Web3">
        Airdrops
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div>
            Un&apos; <strong>Airdrop</strong> è quando un progetto Web3 fino ad ora senza token, lancia il proprio token e ne distribuisce una parte agli utenti della sua piattaforma/tecnologia (in regalo). La quantità ed il valore di questi token ricevuti da ogni utente solitamente varia tra i $100 e i $50,000, in base alle attività fatte dall&apos;utente sulla piattaforma e dai criteri di distribuzione scelti dal team del progetto.
          </div>
          
          <Accordion buttonText="Cosa sono le Airdrop e come guadagnarci?">
            Un&apos; &quot;Airdrop&quot; è quando un progetto Web3 fino ad ora senza token, lancia il proprio token e ne distribuisce una parte agli utenti della sua piattaforma/tecnologia (in regalo). La quantità ed il valore di questi token ricevuti da ogni utente solitamente varia tra i $100 e i $50,000, in base alle attività fatte dall&apos;utente sulla piattaforma e dai criteri di distribuzione scelti dal team del progetto.
          </Accordion>
        </SectionBody>

        <SectionTitle>Come Funzionano gli Airdrops</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Alta Ricompensa, Basso Rischio</h3>
              <p className="text-gray-600">
                Utilizzare progetti che ancora non hanno rilasciato il proprio token offre quindi un&apos;alta ricompensa a basso rischio, diventando molto profittevole se fatto nella giusta maniera.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Costi Principali</h3>
              <p className="text-gray-600">
                Il costo principale di questa attività sono i costi di transazione, principalmente in gas fees. Questi sono generalmente molto bassi rispetto al potenziale valore dell&apos;airdrop.
              </p>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Criteri di Eligibilità</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Volume di Trading">
            Il volume totale delle transazioni che hai fatto sulla piattaforma. Più alto è il volume, maggiore è la probabilità di ricevere un airdrop più consistente.
          </Accordion>
          
          <Accordion buttonText="Numero di Transazioni">
            Quante transazioni individuali hai completato. La frequenza delle interazioni è importante per dimostrare il tuo impegno con la piattaforma.
          </Accordion>
          
          <Accordion buttonText="Periodicità">
            Con che regolarità interagisci con la piattaforma nel tempo. L&apos;uso costante e regolare è spesso premiato più dell&apos;uso sporadico.
          </Accordion>
        </SectionBody>

        <SectionTitle>Progetti Senza Token (Potenziali Airdrop)</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project, index) => (
              <SimpleCard
                key={index}
                title={project.title}
                image={project.image}
                website={project.website}
                xProfile={project.xProfile}
                tokenNFT={project.tokenNFT}
                description={project.description}
                href={project.href || "/"}
              />
            ))}
          </div>
          
          {allProjects.length > 3 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {showAllProjects ? "Mostra meno contenuti" : "Mostra più contenuti"}
              </button>
            </div>
          )}
        </SectionBody>

        <SectionTitle>Strategie per Massimizzare gli Airdrops</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Early Adoption">
            <div className="space-y-3">
              <p>• Partecipa ai progetti nelle fasi iniziali</p>
              <p>• Testa le funzionalità beta</p>
              <p>• Fornisci feedback alla community</p>
              <p>• Partecipa alle discussioni sui social</p>
            </div>
          </Accordion>
          
          <Accordion buttonText="Consistent Activity">
            <div className="space-y-3">
              <p>• Usa regolarmente la piattaforma</p>
              <p>• Mantieni un volume di trading costante</p>
              <p>• Partecipa a eventi e campagne</p>
              <p>• Interagisci con la community</p>
            </div>
          </Accordion>
          
          <Accordion buttonText="Diversificazione">
            <div className="space-y-3">
              <p>• Non concentrarti su un solo progetto</p>
              <p>• Esplora diversi ecosistemi</p>
              <p>• Partecipa a progetti su diverse blockchain</p>
              <p>• Mantieni un portafoglio diversificato</p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>⚠️ Attenzione alle Truffe</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Fake Airdrop Scams">
            <List>
              <li>Le truffe di airdrop falsi sono molto comuni</li>
              <li>Non rivelare mai le tue private keys</li>
              <li>Non firmare transazioni sospette</li>
              <li>Partecipa solo ad airdrop da fonti affidabili</li>
              <li>Verifica sempre l'autenticità tramite canali ufficiali</li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🔗</span>
              <a href="https://www.coinbase.com/en-gb/learn/crypto-basics/what-is-a-crypto-airdrop" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Coinbase Guide: What is a Crypto Airdrop
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">📱</span>
              <span className="text-gray-700">Seguici sui social per aggiornamenti sui nuovi airdrop</span>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
      
      <ExploreWeb3 />
    </ProtectedRoute>
  );
}
