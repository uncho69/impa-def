import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";

export default function Compound() {
  return (
    <ProtectedRoute title="Compound">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={Placeholder} alt="Compound" width={64} height={64} />
          <div>
            <SectionTitle main={true}>Compound</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Lending
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                Borrowing
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Ethereum
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Compound</strong> è un protocollo di finanza decentralizzata (DeFi) basato su Ethereum che consente agli utenti di prestare e prendere in prestito criptovalute senza intermediari. Fondato da Robert Leshner e Geoffrey Hayes, Compound è diventata una delle piattaforme leader nel settore DeFi grazie alla sua interfaccia user-friendly e alle sue solide funzionalità di governance.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Lending Protocol" defaultOpen={true}>
            Compound permette agli utenti di prestare criptovalute senza intermediari utilizzando Ether (ETH) come collaterale. I prestiti sono garantiti dall&apos;interesse composto al 100%.
          </Accordion>

          <Accordion buttonText="Interest Rate Algorithm">
            Utilizza un algoritmo automatico per determinare i tassi di interesse in base alla domanda e all&apos;offerta di ogni asset nel protocollo.
          </Accordion>

          <Accordion buttonText="cTokens">
            Quando depositi asset, ricevi cToken (ad esempio cETH per ETH) che rappresentano la tua quota e accumulano interessi automaticamente.
          </Accordion>

          <Accordion buttonText="Collateralization">
            Permette di utilizzare i depositi come collaterale per prendere in prestito altri asset, con liquidazione automatica se il collaterale scende sotto la soglia.
          </Accordion>

          <Accordion buttonText="COMP Governance">
            I token COMP permettono ai holder di partecipare alla governance del protocollo, votando su modifiche e aggiornamenti.
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Accesso alla Piattaforma" defaultOpen={true}>
            <List ordered={true}>
              <li>
                Vai su <a href="https://compound.finance/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Compound Finance</a> per accedere alla piattaforma.
              </li>
              <li>
                Connetti il tuo portafoglio Ethereum (MetaMask, WalletConnect, etc.).
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="2. Lending (Prestare)">
            <List ordered={true}>
              <li>
                Vai alla sezione &quot;Supply&quot; per vedere gli asset disponibili per il lending.
              </li>
              <li>
                Seleziona l&apos;asset che vuoi prestare e clicca su &quot;Enable&quot;.
              </li>
              <li>
                Inserisci l&apos;importo che vuoi depositare.
              </li>
              <li>
                Conferma la transazione per iniziare a guadagnare interessi.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="3. Borrowing (Prendere in Prestito)">
            <List ordered={true}>
              <li>
                Prima devi fornire collaterale depositando asset nella sezione Supply.
              </li>
              <li>
                Vai alla sezione &quot;Borrow&quot; e seleziona l&apos;asset che vuoi prendere in prestito.
              </li>
              <li>
                Inserisci l&apos;importo (rispettando il limite di collateralizzazione).
              </li>
              <li>
                Conferma la transazione per ricevere i fondi.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="4. Gestione delle Posizioni">
            <List ordered={true}>
              <li>
                Monitora i tuoi depositi e prestiti dalla dashboard principale.
              </li>
              <li>
                Tieni d&apos;occhio il tuo &quot;Borrow Limit&quot; per evitare liquidazioni.
              </li>
              <li>
                Ripaga i prestiti quando vuoi ridurre il rischio o liberare collaterale.
              </li>
              <li>
                Ritira i tuoi depositi quando non hai prestiti attivi.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Asset Supportati</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">ETH</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">USDC</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">USDT</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">DAI</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">WBTC</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Altri...</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://compound.finance/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/compoundfinance" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🐦 Twitter/X
                </a>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
