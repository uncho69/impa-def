import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import hyperliquidLogo from "@/assets/hyperliquid-logo.png";

export default function HyperliquidPage() {
  return (
    <>
      <PageTitle description="Exchange decentralizzato per perpetual futures">
        Hyperliquid
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <Image 
              src={hyperliquidLogo} 
              alt="Hyperliquid" 
              className="w-16 h-16" 
              width={64}
              height={64}
            />
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Hyperliquid</h2>
              <p className="text-neutral-600">DEX • Perpetual Futures • Layer 1</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Hyperliquid</strong> è un exchange decentralizzato (DEX) focalizzato sui perpetual futures, operante sulla blockchain Hyperliquid L1. Progettato per combinare le caratteristiche dei principali exchange centralizzati con i vantaggi della decentralizzazione, Hyperliquid offre un trading veloce, trasparente e a basso costo.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Hyperliquid</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Velocità e Efficienza">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Performance Elevata</h4>
              <p className="text-neutral-600">
                Hyperliquid L1 è in grado di gestire fino a 20.000 ordini al secondo grazie alla sua architettura ottimizzata e all&apos;uso del consenso Tendermint. La latenza media è di circa 0.2 secondi, rendendo il trading quasi istantaneo.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Ordine e Liquidità On-Chain">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Trasparenza Totale</h4>
              <p className="text-neutral-600">
                Tutte le operazioni, inclusi ordini, cancellazioni e liquidazioni, avvengono on-chain, garantendo trasparenza e sicurezza. Supporta la gestione della liquidità senza la necessità di interventi off-chain.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Struttura delle Commissioni">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Commissioni Basse</h4>
              <p className="text-neutral-600">
                Takers pagano 2.5 basis points (bps), mentre i makers ricevono un rebate di 0.2 bps. Durante la fase alpha, le transazioni erano esenti da commissioni di gas, dimostrando l&apos;impegno di Hyperliquid a ridurre i costi per gli utenti.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Leva Flessibile">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Alte Leve</h4>
              <p className="text-neutral-600">
                Hyperliquid offre fino a 50x di leva per asset principali come BTC e ETH, mentre altri asset come AAVE e AVAX offrono fino a 20x di leva. Ciò permette agli utenti di ottimizzare le loro strategie di trading in base al loro profilo di rischio.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Programma di Punti e Airdrop">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Incentivi per gli Utenti</h4>
              <p className="text-neutral-600">
                Gli utenti possono guadagnare punti attraverso attività di trading, che saranno convertiti in token di governance durante un futuro airdrop. Questo programma incoraggia l&apos;uso attivo della piattaforma.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="6. Funzionalità Avanzate di Trading">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ordini Avanzati</h4>
              <p className="text-neutral-600">
                Supporta ordini complessi come TWAP (Time-Weighted Average Price), scale trading e ordini TP/SL (Take Profit/Stop Loss), consentendo strategie di trading sofisticate.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>$PURR Token</SectionTitle>
        <SectionBody>
          <div className="gradient-text text-lg leading-relaxed mb-4">
            <strong>$PURR</strong> è il primo token nativo della blockchain <strong>Hyperliquid</strong> Layer 1. Lanciato come parte dello standard HIP-1, il token è stato introdotto senza una vendita iniziale o un&apos;utilità pre-pianificata.
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-900">Distribuzione del Token</h4>
            <List>
              <li><strong>Fornitura totale:</strong> 1 miliardo di token PURR</li>
              <li><strong>50%</strong> distribuito tramite airdrop ai partecipanti dell&apos;ecosistema</li>
              <li><strong>50%</strong> bloccato nel pool di liquidità per il trading</li>
            </List>
            
            <h4 className="font-semibold text-neutral-900">Utilità Futura</h4>
            <p className="text-neutral-600">
              I possessori di $PURR potranno beneficiare di funzionalità future e meme token creati su Hyperliquid, incentivando la detenzione a lungo termine e la partecipazione all&apos;ecosistema.
            </p>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Trading">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Attività di Trading</h4>
                <List>
                  <li>Effettua trading regolare su perpetual futures</li>
                  <li>Utilizza diverse coppie di trading</li>
                  <li>Mantieni posizioni aperte per periodi significativi</li>
                  <li>Partecipa a eventi e campagne speciali</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Volume e Frequenza</h4>
                <List>
                  <li>Mantieni un volume di trading consistente</li>
                  <li>Effettua transazioni regolari nel tempo</li>
                  <li>Utilizza funzionalità avanzate come TWAP</li>
                  <li>Partecipa alla community e governance</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a Hyperliquid</h4>
                <List>
                  <li>Visita <a href="https://hyperliquid.xyz/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">hyperliquid.xyz</a></li>
                  <li>Clicca su &quot;Launch App&quot; per accedere all&apos;interfaccia</li>
                  <li>Collega il tuo portafoglio MetaMask</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Trading di Perpetual Futures</h4>
                <List>
                  <li>Seleziona il mercato di futures desiderato (es. BTC/USDT)</li>
                  <li>Inserisci i dettagli del tuo ordine</li>
                  <li>Conferma l&apos;ordine e la transazione in MetaMask</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Fornitura di Liquidità</h4>
                <List>
                  <li>Vai alla sezione &quot;Vaults&quot;</li>
                  <li>Seleziona il vault di liquidità desiderato</li>
                  <li>Deposita i tuoi asset per guadagnare interessi passivi</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://hyperliquid.xyz/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Hyperliquid
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://twitter.com/HyperliquidX" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">📊</span>
              <a href="https://app.hyperliquid.xyz/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                App di Trading
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">💰</span>
              <a href="https://www.coingecko.com/en/coins/purr-2" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                $PURR Token (CoinGecko)
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
