import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";

export default function Curve() {
  return (
    <ProtectedRoute title="Curve">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={Placeholder} alt="Curve" width={64} height={64} />
          <div>
            <SectionTitle>Curve</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                DEX
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                Stablecoin
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Ethereum
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Curve Finance</strong> è una piattaforma di finanza decentralizzata (DeFi) che opera come exchange decentralizzato (DEX) e protocollo di liquidità su Ethereum e altre blockchain compatibili EVM. È particolarmente noto per l&apos;ottimizzazione del trading di stablecoin, offrendo commissioni di transazione basse e slippage minimo.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Trading di Stablecoin" defaultOpen={true}>
            Curve è progettato per minimizzare lo slippage e le commissioni di trading quando si scambiano stablecoin e altre criptovalute con comportamento simile.
          </Accordion>

          <Accordion buttonText="Automated Market Maker (AMM)">
            Utilizza un meccanismo AMM per quotare i prezzi tra due asset diversi, principalmente stablecoin e versioni wrapped di criptovalute come wBTC e wETH.
          </Accordion>

          <Accordion buttonText="Pool di Liquidità">
            Gli utenti possono depositare criptovalute nei pool di liquidità per guadagnare una parte delle commissioni di trading. Curve offre vari tipi di pool, come tri-pool, meta-pool e altri.
          </Accordion>

          <Accordion buttonText="Curve Lending">
            Recentemente introdotto, Curve Lending permette agli utenti di prestare e prendere in prestito criptovalute utilizzando il protocollo di Curve. Gli utenti possono fornire asset come collaterale per ottenere prestiti o depositare asset per guadagnare interessi.
          </Accordion>

          <Accordion buttonText="Token CRV">
            Il token nativo della piattaforma, CRV, può essere utilizzato per staking, vote locking e governance. Gli utenti possono guadagnare ricompense CRV fornendo liquidità.
          </Accordion>

          <Accordion buttonText="Governance Decentralizzata">
            Gli utenti che bloccano CRV per ottenere veCRV possono partecipare alla governance del protocollo votando sui cambiamenti dei parametri di rete o proponendo nuove iniziative.
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Connessione del Portafoglio" defaultOpen={true}>
            <List ordered={true}>
              <li>
                Visita <a href="https://curve.fi/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Curve Finance</a> e clicca su &quot;Connect Wallet&quot;.
              </li>
              <li>
                Seleziona il tuo portafoglio cripto (es. MetaMask, Ledger, WalletConnect) e connettilo alla piattaforma.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="2. Scambio di Token">
            <List ordered={true}>
              <li>
                Usa la funzione &quot;Swap&quot; per scambiare tra stablecoin supportate o altre criptovalute.
              </li>
              <li>
                Seleziona i token che vuoi scambiare, inserisci l&apos;importo e conferma la transazione.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="3. Fornitura di Liquidità">
            <List ordered={true}>
              <li>
                Vai alla sezione &quot;Deposit&quot; e scegli un pool di liquidità.
              </li>
              <li>
                Seleziona i token da depositare nel pool e conferma la transazione.
              </li>
              <li>
                Puoi scegliere tra depositi normali o &quot;stake & gauge&quot;, che ti permette di guadagnare ricompense CRV senza periodi di blocco.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Reti Supportate</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Ethereum</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Arbitrum</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Optimism</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Polygon</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Base</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Avalanche</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://curve.fi/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/CurveFinance" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🐦 Twitter/X
                </a>
                <a href="https://www.coingecko.com/en/coins/curve-dao-token" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  📊 Token CRV
                </a>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
