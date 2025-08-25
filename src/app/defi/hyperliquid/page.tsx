import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import hyperliquidIcon from "@/assets/hyperliquid-icon.png";

export default function Hyperliquid() {
  return (
    <ProtectedRoute title="Hyperliquid">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={hyperliquidIcon} alt="Hyperliquid" width={64} height={64} />
          <div>
            <SectionTitle>Hyperliquid</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                DEX
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                Perpetuals
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                L1
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Hyperliquid</strong> è un exchange decentralizzato (DEX) focalizzato sui perpetual futures, operante sulla blockchain Hyperliquid L1. Progettato per combinare le caratteristiche dei principali exchange centralizzati con i vantaggi della decentralizzazione, Hyperliquid offre un trading veloce, trasparente e a basso costo.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Perpetual Futures" defaultOpen={true}>
            Hyperliquid è specializzato nel trading di perpetual futures, offrendo leverage fino a 50x su una vasta gamma di asset crypto.
          </Accordion>

          <Accordion buttonText="Hyperliquid L1">
            Opera su una propria blockchain L1 ottimizzata per il trading ad alta frequenza, garantendo latenza ultra-bassa e throughput elevato.
          </Accordion>

          <Accordion buttonText="Orderbook On-Chain">
            Utilizza un orderbook completamente on-chain, garantendo trasparenza totale nelle operazioni di trading e nell&apos;esecuzione degli ordini.
          </Accordion>

          <Accordion buttonText="Liquidità Profonda">
            Offre liquidità sostanziale e spread stretti grazie al suo design ottimizzato e al sistema di market making integrato.
          </Accordion>

          <Accordion buttonText="Costi Bassi">
            Le commissioni sono competitive rispetto agli exchange centralizzati, con struttura di fee trasparente e senza costi nascosti.
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Accesso alla Piattaforma" defaultOpen={true}>
            <List ordered={true}>
              <li>
                Vai su <a href="https://app.hyperliquid.xyz/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Hyperliquid App</a> per accedere alla piattaforma di trading.
              </li>
              <li>
                Connetti il tuo portafoglio Web3 supportato (MetaMask o altri).
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="2. Deposito di Fondi">
            <List ordered={true}>
              <li>
                Usa il bridge integrato per trasferire fondi da Ethereum o Arbitrum a Hyperliquid L1.
              </li>
              <li>
                I principali asset supportati includono USDC come collaterale principale.
              </li>
              <li>
                Conferma la transazione e attendi la conferma del bridge.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="3. Trading di Perpetuals">
            <List ordered={true}>
              <li>
                Seleziona il perpetual future che vuoi tradare dalla lista disponibile.
              </li>
              <li>
                Scegli il tipo di ordine (Market, Limit, Stop) e la direzione (Long/Short).
              </li>
              <li>
                Imposta la leva finanziaria desiderata (fino a 50x).
              </li>
              <li>
                Inserisci size e prezzo (se limit order) e conferma la transazione.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="4. Gestione delle Posizioni">
            <List ordered={true}>
              <li>
                Monitora le tue posizioni aperte dalla dashboard trading.
              </li>
              <li>
                Imposta stop loss e take profit per gestire il rischio.
              </li>
              <li>
                Chiudi le posizioni quando desideri realizzare profitti o limitare perdite.
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
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">BTC-PERP</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">ETH-PERP</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">SOL-PERP</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">AVAX-PERP</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Altri Perpetuals</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://app.hyperliquid.xyz/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Trading App
                </a>
                <a href="https://x.com/HyperliquidX" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
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
