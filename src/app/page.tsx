import Link from "next/link";
import { Button } from "@/components/Button";
import { CardContainer } from "@/components/CardContainer";
import { SimpleCard } from "@/components/SimpleCard";
import { HomeButtons } from "@/components/HomeButtons";
import { RichSectionTitle } from "@/components/RichSectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionTutorial } from "@/components/SectionTutorial";
import { TokenCard } from "@/components/TokenCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { MobileContainer } from "@/components/MobileContainer";
import { MobileMenu } from "@/components/MobileMenu";
import { ModalMenu } from "@/components/ModalMenu";
import { AuthStatus } from "@/components/AuthStatus";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

// Import delle icone
import imparoDefiLogo from "@/assets/imparodefi-logo-nobg.webp";
import ethereumIcon from "@/assets/ethereum-icon.svg";
import bitcoinIcon from "@/assets/bitcoin-icon.svg";
import solanaIcon from "@/assets/solana-sol-logo.svg";
import polygonIcon from "@/assets/polygon-matic-logo.svg";
import arbitrumIcon from "@/assets/arbitrum-arb-logo.svg";
import optimismIcon from "@/assets/optimism-ethereum-op-logo.svg";
import baseIcon from "@/assets/base-logo.svg";
import avalancheIcon from "@/assets/avalanche-avax-logo.svg";
import zksyncIcon from "@/assets/zkSync-logo.png";
import scrollIcon from "@/assets/Scroll-Logo.svg";
import lineaIcon from "@/assets/linea-logo.svg";
import polygonZkIcon from "@/assets/polygon-matic-logo.svg";
import berachainIcon from "@/assets/berachain-logo.png";
import blastIcon from "@/assets/blast-logo.webp";
import degenIcon from "@/assets/degen-base-degen-logo.svg";
import zoraIcon from "@/assets/zora-logo.png";
import sankoIcon from "@/assets/placeholder.svg";
import hyperlaneIcon from "@/assets/hyperlane-logo.svg";
import hyperliquidIcon from "@/assets/hyperliquid-logo.png";
import layer3Icon from "@/assets/layer3-logo.png";
import externalLinkIcon from "@/assets/external-link.svg";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <img
                src={imparoDefiLogo.src}
                alt="ImparoDeFi Logo"
                className="w-32 h-32 lg:w-40 lg:h-40"
              />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-neutral-900 leading-tight">
              Impara il{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                Web3
              </span>{" "}
              in modo semplice
            </h1>
            <p className="text-xl lg:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              La tua guida sicura nel mondo delle criptovalute, DeFi e blockchain.
              Curata da veri esperti per principianti e avanzati.
            </p>
            <HomeButtons />
          </div>
        </div>
      </section>

      {/* Perché ImparoDeFi Section - Design Innovativo */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05)_0%,transparent_50%)]"></div>
        
        <div className="container-custom relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mb-6">
              <span className="text-primary-700 font-semibold text-sm">La Nostra Missione</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 text-neutral-900">
              Perché ImparoDeFi?
            </h2>
          </div>

          {/* Main Content - Innovative Layout */}
          <div className="max-w-6xl mx-auto">
            {/* Introduzione - Large Card */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-10 mb-16 border border-primary-100">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-6 text-primary-700">Introduzione</h3>
                  <div className="space-y-4 text-neutral-700 leading-relaxed text-lg">
                    <p>
                      I problemi di fiducia sono il motivo per cui le blockchain sono state create; è stato Bitcoin, e la mancanza di fiducia dei suoi creatori nei confronti dei sistemi monetari tradizionali sostenuti dai governi (fiat: USD, EUR, JPY, ecc.) ad accendere per la prima volta la fiamma di questa rivoluzione decentralizzata.
                    </p>
                    <p>
                      Come sappiamo, la blockchain di Bitcoin, soprattutto all&apos;epoca, era ancora limitata a essere principalmente un buon deposito di valore, sotto forma di valuta BTC, che i miner potevano produrre nei loro garage e guadagnare qualcosa. Non durò a lungo (la parte del garage), poiché presto si scoprì che le ricompense (i blocchi) erano limitate: man mano che venivano utilizzate sempre più GPU per il mining, non era più possibile farlo con i normali computer di casa, ma bisognava allestire strutture più grandi e complesse per minare BTC.
                    </p>
                    <p>
                      Le tecnologie Web3 hanno la capacità di migliorare la vita delle persone quando funzionano correttamente e quando gli utenti sanno cosa stanno facendo. Sfortunatamente, il settore ha avuto una barriera d&apos;ingresso relativamente alta per chi non è esperto di tecnologia, le persone comuni.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Il Problema e La Soluzione - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Il Problema */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-red-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-red-600">Il Problema</h3>
                </div>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>
                    Quando una persona nuova nel mondo Web3 cerca di capire di più sull&apos;ecosistema per eventualmente entrarvi, si trova di fronte a:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Migliaia di criptovalute</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Centinaia di blockchain</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Migliaia di NFT</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Difficoltà a orientarsi tra le blockchain</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Truffatori e rischi di phishing</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* La Nostra Soluzione */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-600">La Nostra Soluzione</h3>
                </div>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>
                    Imparodefi consentirà ai nuovi aspiranti utenti Web3 di imparare esclusivamente da progetti realmente validi, selezionati dalle persone migliori per questo compito: veri esperti Web3 forgiati &quot;sul campo&quot;.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-green-800 font-semibold text-center">
                      Curazione fatta da veri esperti Web3
                    </p>
                  </div>
                  <p>
                    Gli esperti Web3 si trovano in comunità di nicchia; dal DeFi agli NFT, pochi gruppi si distinguono. Ogni comunità è governata da un token (o NFT), e i possessori di questi asset dimostrano reale coinvolgimento avendo speso i propri soldi per ottenerli.
                  </p>
                </div>
              </div>
            </div>

            {/* Governance e Tokenomics - Full Width */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-10 border border-blue-100">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-blue-700">Governance e Tokenomics</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>
                    I possessori degli NFT Shroomiez saranno inizialmente coloro che guideranno il progetto, votando quali progetti aggiungere, rimuovere o mantenere su Imparodefi.
                  </p>
                  <p>
                    In futuro, gli smart contract potranno essere aggiornati tramite una funzione integrata per consentire l&apos;aggiunta o la rimozione di contratti token dalla piattaforma di governance di Imparodefi, permettendo a qualsiasi altra comunità di contribuire.
                  </p>
                </div>
                <div className="space-y-4 text-neutral-700 leading-relaxed">
                  <p>
                    Gli elettori in whitelist decidono anche come distribuire il budget di ciascuna epoch di Imparodefi tra i progetti approvati. L&apos;allocazione sarà poi suddivisa equamente tra i Creator Pool e i Promoter Pool.
                  </p>
                  <p>
                    Questa funzione potrà cambiare in futuro, consentendo agli elettori in whitelist di votare sulla percentuale di distribuzione dei premi tra i due pool per ciascun progetto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorie Principali */}
      <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-neutral-900">
                Esplora il mondo Web3
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Scegli la categoria che ti interessa e inizia il tuo percorso di apprendimento
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blockchain */}
              <SimpleCard
                title="Blockchain"
                description="Impara le fondamenta delle blockchain, dai concetti base alle tecnologie avanzate"
                icon={ethereumIcon}
                href="/blockchain"
                externalLink="https://ethereum.org"
                externalLinkText="Website"
              />

              {/* DeFi */}
              <SimpleCard
                title="DeFi"
                description="Scopri la finanza decentralizzata e come guadagnare con i tuoi asset digitali"
                icon={ethereumIcon}
                href="/defi"
                externalLink="https://defipulse.com"
                externalLinkText="Website"
              />

              {/* NFT */}
              <SimpleCard
                title="NFT"
                description="Entra nel mondo degli NFT e scopri come creare, comprare e vendere collezioni digitali"
                icon={ethereumIcon}
                href="/nft"
                externalLink="https://opensea.io"
                externalLinkText="Website"
              />

              {/* Gaming */}
              <SimpleCard
                title="Gaming"
                description="Esplora il gaming blockchain e come guadagnare giocando"
                icon={ethereumIcon}
                href="/giochi"
                externalLink="https://axieinfinity.com"
                externalLinkText="Website"
              />

              {/* Exchange */}
              <SimpleCard
                title="Exchange"
                description="Impara a fare trading di criptovalute in modo sicuro e consapevole"
                icon={ethereumIcon}
                href="/exchange"
                externalLink="https://coinbase.com"
                externalLinkText="Website"
              />

              {/* Wallet */}
              <SimpleCard
                title="Wallet"
                description="Scopri come gestire in sicurezza le tue criptovalute e chiavi private"
                icon={ethereumIcon}
                href="/wallet"
                externalLink="https://metamask.io"
                externalLinkText="Website"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-neutral-900">
                Inizia Subito
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Tutorial pratici per iniziare il tuo viaggio nel Web3
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <SectionTutorial
                title="Primi Passi"
                description="Guida completa per principianti assoluti"
                href="/manuale"
                icon="🚀"
              />
              <SectionTutorial
                title="Wallet Setup"
                description="Configura il tuo primo wallet in sicurezza"
                href="/wallet"
                icon="💼"
              />
              <SectionTutorial
                title="Prima Transazione"
                description="Impara a fare la tua prima transazione"
                href="/blockchain/ethereum"
                icon="💸"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
