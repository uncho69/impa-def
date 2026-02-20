import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function SyncSwapPage() {
  return (
    <>
      <PageTitle description="DEX nativo di zkSync Era con governance">
        SyncSwap
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">SyncSwap</h2>
              <p className="text-neutral-600">DEX • zkSync • Governance</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>SyncSwap</strong> è un exchange decentralizzato (DEX) che opera sulla rete zkSync Era, una soluzione di scaling di Ethereum basata sulla tecnologia zero-knowledge (zk). La piattaforma mira a rendere la finanza decentralizzata (DeFi) più accessibile e conveniente, offrendo transazioni rapide e a basso costo con la sicurezza completa di Ethereum.
          </div>
        </SectionBody>

        <SectionTitle>Funzionalità di SyncSwap</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Trading di Token">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Scambi Facili</h4>
              <p className="text-neutral-600">
                SyncSwap consente agli utenti di scambiare facilmente tra migliaia di criptovalute disponibili sulla rete zkSync Era. Basta selezionare i token da scambiare, inserire l&apos;importo e cliccare sul pulsante &quot;Swap&quot;. La piattaforma mostra l&apos;impatto sul prezzo e altre informazioni rilevanti per aiutare gli utenti a fare scelte informate.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Pool di Liquidità">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Fornitura di Liquidità</h4>
              <p className="text-neutral-600">
                Gli utenti possono fornire liquidità ai pool di SyncSwap per guadagnare commissioni di trading. La piattaforma utilizza una tecnologia multi-pool innovativa che ottimizza le strategie di trading e potenzialmente aumenta i guadagni per i fornitori di liquidità.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Tariffe Dinamiche">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Gestione Efficiente</h4>
              <p className="text-neutral-600">
                SyncSwap implementa tariffe dinamiche che variano a seconda del pool e della direzione dello scambio, permettendo una gestione più efficiente dei costi di transazione e una migliore ottimizzazione del mercato.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Router Intelligente">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ottimizzazione delle Rotte</h4>
              <p className="text-neutral-600">
                La piattaforma utilizza un router intelligente che ottimizza le rotte di scambio attraverso più pool per ottenere il miglior prezzo possibile per ogni transazione.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Governance Abilitata">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Controllo della Community</h4>
              <p className="text-neutral-600">
                SyncSwap è progettato per essere governato dalla community. Gli utenti possono partecipare alle decisioni di governance e controllare parametri chiave del protocollo attraverso proposte e votazioni.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="6. Architettura Future-Proof">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Evoluzione Continua</h4>
              <p className="text-neutral-600">
                La struttura di SyncSwap è progettata per evolversi nel tempo, con l&apos;integrazione di nuovi modelli di pool e funzionalità che manterranno il protocollo potente e competitivo.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Reti Supportate</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">zk-Rollups</h4>
              <List>
                <li>zkSync Era</li>
                <li>zkSync Lite</li>
                <li>Polygon zkEVM</li>
                <li>Scroll</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Layer 2</h4>
              <List>
                <li>Linea</li>
                <li>Arbitrum</li>
                <li>Optimism</li>
                <li>Base</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Layer 1</h4>
              <List>
                <li>Ethereum</li>
                <li>Polygon</li>
                <li>BNB Chain</li>
                <li>Avalanche</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Altri</h4>
              <List>
                <li>Fantom</li>
                <li>Celo</li>
                <li>Gnosis</li>
                <li>Aurora</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Attività di Trading</h4>
                <List>
                  <li>Effettua swap regolari su SyncSwap</li>
                  <li>Utilizza volumi significativi di token</li>
                  <li>Partecipa a eventi e campagne speciali</li>
                  <li>Interagisci con la community</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Fornitura di Liquidità</h4>
                <List>
                  <li>Fornisci liquidità ai pool di SyncSwap</li>
                  <li>Mantieni posizioni per periodi significativi</li>
                  <li>Partecipa a pool ad alto volume</li>
                  <li>Guadagna commissioni di trading</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Governance</h4>
                <List>
                  <li>Partecipa alle votazioni di governance</li>
                  <li>Proponi miglioramenti al protocollo</li>
                  <li>Interagisci con la community</li>
                  <li>Contribuisci allo sviluppo</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Connessione del Portafoglio</h4>
                <List>
                  <li>Vai su <a href="https://syncswap.xyz/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">syncswap.xyz</a></li>
                  <li>Clicca su &quot;Connect Wallet&quot;</li>
                  <li>Scegli il tuo portafoglio cripto (es. MetaMask)</li>
                  <li>Assicurati di essere sulla rete zkSync Era</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Scambio di Token</h4>
                <List>
                  <li>Seleziona i token che desideri scambiare</li>
                  <li>Inserisci l&apos;importo e clicca su &quot;Swap&quot;</li>
                  <li>Visualizza l&apos;impatto sul prezzo e altri dettagli</li>
                  <li>Conferma la transazione</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Fornitura di Liquidità</h4>
                <List>
                  <li>Vai alla sezione &quot;Liquidity Pools&quot;</li>
                  <li>Scegli un pool a cui aggiungere liquidità</li>
                  <li>Seleziona i token da depositare</li>
                  <li>Conferma la transazione per iniziare a guadagnare</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">4. Partecipazione alla Governance</h4>
                <List>
                  <li>Partecipa alle votazioni su proposte di governance</li>
                  <li>Influenza lo sviluppo e le operazioni del protocollo</li>
                  <li>Proponi miglioramenti</li>
                  <li>Contribuisci alla community</li>
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
              <a href="https://syncswap.xyz/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale SyncSwap
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://twitter.com/syncswap" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">🔄</span>
              <a href="https://syncswap.xyz/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                SyncSwap App
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📊</span>
              <a href="https://syncswap.xyz/analytics" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Analytics Dashboard
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🏛️</span>
              <a href="https://syncswap.xyz/governance" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Governance
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
