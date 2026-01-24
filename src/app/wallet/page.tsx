import { CardContainer } from "@/components/CardContainer";
import { SimpleCard } from "@/components/SimpleCard";
import { BackToHome } from "@/components/BackToHome";
import { ExploreWeb3 } from "@/components/ExploreWeb3";
import Placeholder from "@/assets/placeholder.svg";
import metamaskIcon from "@/assets/metamask-icon.svg";
import phantomIcon from "@/assets/phantom-icon.png";
import rainbowIcon from "@/assets/rainbow-icon.png";
import rabbyIcon from "@/assets/rabby-icon.png";
import trezorIcon from "@/assets/trezor-icon.png";
import ledgerIcon from "@/assets/ledger-icon.png";
// Loghi delle reti per MetaMask
import ethereumIcon from "@/assets/ethereum-icon.svg";
import arbitrumIcon from "@/assets/arbitrum-arb-logo.svg";
import optimismIcon from "@/assets/optimism-ethereum-op-logo.svg";
import polygonIcon from "@/assets/polygon-matic-logo.svg";
import baseIcon from "@/assets/base-logo.svg";
import avalancheIcon from "@/assets/avalanche-avax-logo.svg";
// Loghi delle reti per Phantom
import solanaIcon from "@/assets/solana-sol-logo.svg";
import bitcoinIcon from "@/assets/bitcoin-icon.svg";
// Loghi delle reti per Rainbow (usando loghi disponibili)
// Loghi delle reti per Rabby
import bscIcon from "@/assets/bsc-logo.png";
import zoraIcon from "@/assets/zora-logo.png";
import fantomIcon from "@/assets/fantom-logo.png";
import zkSyncIcon from "@/assets/zksynk-logo.png";
import lineaIcon from "@/assets/linea-logo.svg";
import gnosisIcon from "@/assets/gnosis-logo.png";
import hypervmIcon from "@/assets/hypervm-logo.png";
// Loghi delle reti per Trezor
import cosmosIcon from "@/assets/cosmos-logo.png";
import dogechainIcon from "@/assets/dogechain-logo.png";

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        <div className="flex justify-end mb-6">
          <BackToHome />
        </div>
        <div className="text-center mb-12 py-4">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-6" style={{ lineHeight: '1.6' }}>
            Portafogli Non-Custodial
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Scopri i migliori wallet per gestire le tue criptovalute in modo sicuro e decentralizzato
          </p>
        </div>

        {/* Sezione Informazioni Generali */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-16">
          <h3 className="text-2xl font-bold gradient-text mb-6">
            Cos&apos;è il Wallet Non-Custodial?
          </h3>
          <p className="text-neutral-900 mb-6 leading-relaxed">
            Il portafoglio (&quot;wallet&quot;) non-custodial è un portafoglio virtuale utilizzato per ricevere, inviare, e conservare le criptovalute. Viene indicato anche come &quot;self-custody wallet&quot;, che significa &quot;a custodia personale&quot;. Può essere scaricato su mobile o aggiunto come browser extension sul pc, o in forma di hardware wallet (dispositivo fisico).
          </p>
          
          <h4 className="text-xl font-semibold gradient-text mb-4">
            Che vantaggi offre?
          </h4>
          <p className="text-neutral-900 mb-4 leading-relaxed">
            A differenza degli exchange, o delle banche, dove l&apos;intestatario del conto può vedersi il conto bloccato/congelato, o dove la banca/exchange può andare fallita e l&apos;utente perdere i propri risparmi, il wallet non-custodial offre all&apos;utente il <strong>pieno controllo delle chiavi private e dei fondi in esso custoditi</strong>, senza coinvolgere soggetti esterni.
          </p>
          <p className="text-neutral-900 leading-relaxed">
            Con il wallet non-custodial, è l&apos;utente stesso ad avere la piena responsabilità delle proprie chiavi private e pertanto deve prendere le precauzioni necessarie per non perdere irrimediabilmente la possibilità di accedere alle proprie monete.
          </p>
        </div>

        {/* Sezione Portafogli Software */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
            Portafogli Software (Software Wallets)
          </h2>
          <CardContainer>
            <SimpleCard
              icon={metamaskIcon}
              title="MetaMask"
              subArray={[
                { icon: ethereumIcon, text: "" },
                { icon: polygonIcon, text: "" },
                { icon: arbitrumIcon, text: "" },
                { icon: optimismIcon, text: "" },
                { icon: baseIcon, text: "" },
                { icon: avalancheIcon, text: "" },
              ]}
              subArrayTitle="Reti Supportate:"
              href="./wallet/metamask"
              externalLink="https://metamask.io/"
              xPage="https://x.com/MetaMask"
            />
            <SimpleCard
              icon={phantomIcon}
              title="Phantom"
              subArray={[
                { icon: solanaIcon, text: "" },
                { icon: ethereumIcon, text: "" },
                { icon: polygonIcon, text: "" },
                { icon: bitcoinIcon, text: "" },
              ]}
              subArrayTitle="Reti Supportate:"
              href="./wallet/phantom"
              externalLink="https://phantom.app/"
              xPage="https://x.com/phantom"
            />
            <SimpleCard
              icon={rainbowIcon}
              title="Rainbow"
              subArray={[
                { icon: ethereumIcon, text: "" },
                { icon: arbitrumIcon, text: "" },
                { icon: optimismIcon, text: "" },
                { icon: polygonIcon, text: "" },
                { icon: baseIcon, text: "" },
              ]}
              subArrayTitle="Reti Supportate:"
              href="./wallet/rainbow"
              externalLink="https://rainbow.me/"
              xPage="https://x.com/rainbowdotme"
            />
            <SimpleCard
              icon={rabbyIcon}
              title="Rabby"
              subArray={[
                { icon: ethereumIcon, text: "" },
                { icon: arbitrumIcon, text: "" },
                { icon: optimismIcon, text: "" },
                { icon: polygonIcon, text: "" },
                { icon: baseIcon, text: "" },
                { icon: hypervmIcon, text: "" },
                { icon: bscIcon, text: "" },
                { icon: avalancheIcon, text: "" },
                { icon: zoraIcon, text: "" },
                { icon: fantomIcon, text: "" },
                { icon: zkSyncIcon, text: "" },
                { icon: lineaIcon, text: "" },
                { icon: gnosisIcon, text: "" },
              ]}
              subArrayTitle="Reti Supportate:"
              href="./wallet/rabby"
              externalLink="https://rabby.io/"
              xPage="https://x.com/Rabby_io"
            />
          </CardContainer>
        </div>

        {/* Sezione Hardware Wallets */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">
            Portafogli Hardware (Hardware Wallets)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 max-w-4xl mx-auto">
            <SimpleCard
              icon={trezorIcon}
              title="Trezor"
              subArray={[
                { icon: bitcoinIcon, text: "" },
                { icon: ethereumIcon, text: "" },
                { icon: solanaIcon, text: "" },
                { icon: cosmosIcon, text: "" },
                { icon: dogechainIcon, text: "" },
                { icon: optimismIcon, text: "" },
                { icon: arbitrumIcon, text: "" },
                { icon: polygonIcon, text: "" },
                { icon: baseIcon, text: "" },
              ]}
              subArrayTitle="Reti Supportate:"
              href="./wallet/trezor"
              externalLink="https://trezor.io/"
              xPage="https://x.com/Trezor"
            />
            <SimpleCard
              icon={ledgerIcon}
              title="Ledger"
              subArray={[
                { icon: bitcoinIcon, text: "" },
                { icon: ethereumIcon, text: "" },
                { icon: solanaIcon, text: "" },
                { icon: cosmosIcon, text: "" },
                { icon: dogechainIcon, text: "" },
                { icon: arbitrumIcon, text: "" },
                { icon: optimismIcon, text: "" },
                { icon: polygonIcon, text: "" },
                { icon: baseIcon, text: "" },
              ]}
              subArrayTitle="Reti Supportate:"
              href="./wallet/ledger"
              externalLink="https://shop.ledger.com/"
              xPage="https://x.com/Ledger"
            />
          </div>
        </div>

        <div className="container-custom py-8">
          <ExploreWeb3 />
        </div>

      </div>
    </div>
  );
}
