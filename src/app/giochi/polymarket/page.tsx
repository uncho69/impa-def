import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import polymarketIcon from "@/assets/polymarket-logo.png";
// Loghi delle reti supportate
import polygonIcon from "@/assets/polygon-matic-logo.svg";

export default function Polymarket() {
  return (
    <ProtectedRoute title="Polymarket">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={polymarketIcon} alt="Polymarket" width={64} height={64} />
          <div>
            <SectionTitle>Polymarket</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Prediction Market
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                DeFi
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Polygon
              </span>
              <span className="px-3 py-1 bg-neutral-200 text-neutral-800 rounded-full text-sm font-medium">
                Scommesse
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Airdrop
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Polymarket</strong> è una piattaforma di mercato di previsione basata sulla blockchain di Polygon. Su Polymarket, gli utenti possono scommettere su vari eventi futuri, come elezioni politiche, risultati sportivi, o qualsiasi altro evento di interesse pubblico, e guadagnare denaro in base alle loro previsioni.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Mercati di Previsione" defaultOpen={true}>
            <List>
              <li>
                <strong>Creazione di Mercati</strong>: Gli utenti possono creare o partecipare a mercati di previsione su qualsiasi evento. Ogni mercato ha due o più possibili risultati su cui gli utenti possono scommettere.
              </li>
              <li>
                <strong>Eventi Diversificati</strong>: Dalle elezioni politiche ai risultati sportivi, dai mercati finanziari agli eventi di intrattenimento, Polymarket copre una vasta gamma di tematiche.
              </li>
              <li>
                <strong>Risultati Verificati</strong>: Una volta che l'evento è concluso, il risultato viene verificato in modo decentralizzato tramite oracoli, che forniscono dati affidabili e non manipolabili.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Scommesse in Criptovaluta">
            <List>
              <li>
                <strong>USDC come Valuta Principale</strong>: Le scommesse sono effettuate utilizzando criptovalute, principalmente USDC (una stablecoin legata al dollaro americano).
              </li>
              <li>
                <strong>Stabilità dei Prezzi</strong>: L'uso di USDC garantisce che il valore delle scommesse rimanga stabile, eliminando la volatilità delle criptovalute tradizionali.
              </li>
              <li>
                <strong>Transazioni Rapide</strong>: Grazie alla blockchain Polygon, le transazioni sono veloci ed economiche.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Decentralizzazione e Sicurezza">
            <List>
              <li>
                <strong>Blockchain Polygon</strong>: Polymarket è costruito sulla blockchain di Polygon, garantendo decentralizzazione senza un'autorità centrale che controlla la piattaforma.
              </li>
              <li>
                <strong>Trasparenza Totale</strong>: Tutte le transazioni e le scommesse sono pubbliche e verificabili sulla blockchain.
              </li>
              <li>
                <strong>Smart Contract</strong>: La logica della piattaforma è gestita da smart contract non modificabili, garantendo equità e sicurezza.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Liquidità e Trading">
            <List>
              <li>
                <strong>Scambi Flessibili</strong>: Gli utenti possono comprare e vendere le loro posizioni nei mercati in qualsiasi momento prima che l'evento si concluda.
              </li>
              <li>
                <strong>Gestione del Rischio</strong>: La possibilità di chiudere le posizioni anticipatamente offre flessibilità nella gestione del rischio.
              </li>
              <li>
                <strong>Mercati Liquidi</strong>: I mercati più popolari offrono alta liquidità, facilitando gli scambi.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Come Iniziare</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Registrazione e Setup">
            <List>
              <li>
                <strong>Collega il Wallet</strong>: Connetti un wallet compatibile con Polygon (MetaMask, WalletConnect, etc.)
              </li>
              <li>
                <strong>Acquista USDC</strong>: Deposita USDC sul tuo wallet o acquistali direttamente sulla piattaforma
              </li>
              <li>
                <strong>Verifica l'Account</strong>: Completa la verifica dell'identità se richiesta per mercati specifici
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Fare la Prima Scommessa">
            <List>
              <li>
                <strong>Scegli un Mercato</strong>: Esplora i mercati disponibili e seleziona quello di tuo interesse
              </li>
              <li>
                <strong>Analizza le Probabilità</strong>: Studia le quote e le probabilità di ogni possibile risultato
              </li>
              <li>
                <strong>Piazza la Scommessa</strong>: Seleziona il risultato su cui vuoi scommettere e inserisci l'importo
              </li>
              <li>
                <strong>Monitora la Posizione</strong>: Tieni traccia della tua posizione e considera di chiuderla anticipatamente se necessario
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Reti Supportate */}
              <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-3">Reti Supportate</h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Polymarket opera sulla blockchain di Polygon, offrendo transazioni veloci ed economiche per i mercati di previsione.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Image 
                    src={polygonIcon} 
                    alt="Polygon" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                </div>
              </div>

              {/* Link Utili */}
              <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-3">Link Utili</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600">🌐</span>
                    <a 
                      href="https://polymarket.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Sito Web
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600">🐦</span>
                    <a 
                      href="https://x.com/Polymarket" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Twitter/X
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600">📊</span>
                    <a 
                      href="#" 
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Token POLY
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
