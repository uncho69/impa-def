import { CardContainer } from "@/components/CardContainer";
import { SimpleCard } from "@/components/SimpleCard";
import Placeholder from "@/assets/placeholder.svg";
import metamaskIcon from "@/assets/metamask-icon.svg";

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Portafogli Non-Custodial
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Scopri i migliori wallet per gestire le tue criptovalute in modo sicuro e decentralizzato
          </p>
        </div>

        {/* Sezione Portafogli Software */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Portafogli Software
          </h2>
          <CardContainer>
            <SimpleCard
              icon={metamaskIcon}
              title="MetaMask"
              subArray={[
                { icon: Placeholder, text: "" },
                { icon: Placeholder, text: "" },
              ]}
              href="./wallet/metamask"
              externalLink="https://metamask.io/"
              xPage="https://x.com/MetaMask"
            />
            <SimpleCard
              icon={Placeholder}
              title="Phantom"
              subArray={[
                { icon: Placeholder, text: "" },
                { icon: Placeholder, text: "" },
              ]}
              href="./wallet/phantom"
              externalLink="https://phantom.app/"
              xPage="https://x.com/phantom"
            />
            <SimpleCard
              icon={Placeholder}
              title="Rainbow"
              subArray={[
                { icon: Placeholder, text: "" },
                { icon: Placeholder, text: "" },
              ]}
              href="./wallet/rainbow"
              externalLink="https://rainbow.me/"
              xPage="https://x.com/rainbowdotme"
            />
            <SimpleCard
              icon={Placeholder}
              title="Rabby"
              subArray={[
                { icon: Placeholder, text: "" },
                { icon: Placeholder, text: "" },
              ]}
              href="./wallet/rabby"
              externalLink="https://rabby.io/"
              xPage="https://x.com/Rabby_io"
            />
          </CardContainer>
        </div>

        {/* Sezione Hardware Wallets */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Hardware Wallets
          </h2>
          <CardContainer>
            <SimpleCard
              icon={Placeholder}
              title="Trezor"
              subArray={[
                { icon: Placeholder, text: "" },
                { icon: Placeholder, text: "" },
              ]}
              href="./wallet/trezor"
              externalLink="https://trezor.io/"
              xPage="https://x.com/Trezor"
            />
            <SimpleCard
              icon={Placeholder}
              title="Ledger"
              subArray={[
                { icon: Placeholder, text: "" },
                { icon: Placeholder, text: "" },
              ]}
              href="./wallet/ledger"
              externalLink="https://shop.ledger.com/"
              xPage="https://x.com/Ledger"
            />
          </CardContainer>
        </div>

        {/* Sezione Informazioni Generali */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">
            Cos&apos;è il Wallet Non-Custodial?
          </h3>
          <p className="text-neutral-600 mb-6 leading-relaxed">
            Il portafoglio (&quot;wallet&quot;) non-custodial è un portafoglio virtuale utilizzato per ricevere, inviare, e conservare le criptovalute. Viene indicato anche come &quot;self-custody wallet&quot;, che significa &quot;a custodia personale&quot;. Può essere scaricato su mobile o aggiunto come browser extension sul pc, o in forma di hardware wallet (dispositivo fisico).
          </p>
          
          <h4 className="text-xl font-semibold text-neutral-900 mb-4">
            Che vantaggi offre?
          </h4>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            A differenza degli exchange, o delle banche, dove l&apos;intestatario del conto può vedersi il conto bloccato/congelato, o dove la banca/exchange può andare fallita e l&apos;utente perdere i propri risparmi, il wallet non-custodial offre all&apos;utente il <strong>pieno controllo delle chiavi private e dei fondi in esso custoditi</strong>, senza coinvolgere soggetti esterni.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            Con il wallet non-custodial, è l&apos;utente stesso ad avere la piena responsabilità delle proprie chiavi private e pertanto deve prendere le precauzioni necessarie per non perdere irrimediabilmente la possibilità di accedere alle proprie monete.
          </p>
        </div>
      </div>
    </div>
  );
}
