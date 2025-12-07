import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function PropellerSwapPage() {
  return (
    <ProtectedRoute title="PropellerSwap - Airdrop">
      <PageTitle description="DEX con protezione MEV e routing intelligente">
        PropellerSwap
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">P</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">PropellerSwap</h2>
              <p className="text-neutral-600">DEX • MEV Protection • DeFi</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>PropellerSwap</strong> è una piattaforma di scambio decentralizzata (DEX) sviluppata da PropellerHeads, progettata per offrire prezzi ottimizzati e protezione contro l&apos;estrazione del valore del miner (MEV). La piattaforma utilizza algoritmi avanzati e una rete di liquidità estesa per garantire che gli utenti ottengano i migliori prezzi possibili per i loro scambi di criptovalute.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di PropellerSwap</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Routing Intelligente">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Algoritmi Avanzati</h4>
              <p className="text-neutral-600">
                PropellerSwap utilizza algoritmi di routing avanzati per trovare il percorso ottimale per qualsiasi swap. Questo include l&apos;integrazione di diverse fonti di liquidità, non solo DEX ma anche liquidità off-chain, rotte non-DEX, token LP, e desk di trading OTC.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Protezione MEV">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Protezione Avanzata</h4>
              <p className="text-neutral-600">
                La piattaforma protegge le transazioni dagli attacchi MEV inviandole ai principali costruttori e validatori per un&apos;esecuzione veloce e equa, monitorando costantemente per garantire la migliore protezione possibile.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Combining Orders e CoWs">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ottimizzazione delle Transazioni</h4>
              <p className="text-neutral-600">
                PropellerSwap combina ordini che si sovrappongono in termini di token in entrata o in uscita, risparmiando sulle commissioni di gas e riducendo il rischio di esecuzione. Trova anche coincidenze di desideri (CoWs), abbinando direttamente gli scambi opposti per risparmiare ulteriormente sulle commissioni e sul gas.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Simulazioni del Gas Ottimizzate">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Efficienza dei Costi</h4>
              <p className="text-neutral-600">
                La piattaforma include simulazioni accurate delle commissioni di gas per restituire sempre il percorso più economico netto di tutte le commissioni di gas, migliorando l&apos;efficienza delle transazioni.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Supporto per Ordini Avanzati">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Flessibilità di Trading</h4>
              <p className="text-neutral-600">
                PropellerSwap supporta ordini non standard come stop-limit, ordini a tempo e swap attivati da altre condizioni, offrendo una maggiore flessibilità agli utenti.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Reti Supportate</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Layer 1</h4>
              <List>
                <li>Ethereum</li>
                <li>BNB Chain</li>
                <li>Avalanche</li>
                <li>Polygon</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">zk-Rollups</h4>
              <List>
                <li>zkSync</li>
                <li>Scroll</li>
                <li>Polygon zkEVM</li>
                <li>StarkNet</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Layer 2</h4>
              <List>
                <li>Arbitrum</li>
                <li>Optimism</li>
                <li>Base</li>
                <li>Linea</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Altri</h4>
              <List>
                <li>Fantom</li>
                <li>Aurora</li>
                <li>Celo</li>
                <li>Gnosis</li>
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
                  <li>Effettua swap regolari su PropellerSwap</li>
                  <li>Utilizza volumi significativi di token</li>
                  <li>Partecipa a eventi e campagne speciali</li>
                  <li>Interagisci con la community</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Volume e Frequenza</h4>
                <List>
                  <li>Mantieni un volume di trading consistente</li>
                  <li>Effettua transazioni regolari nel tempo</li>
                  <li>Utilizza diverse coppie di token</li>
                  <li>Partecipa a programmi di incentivazione</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Connessione del Portafoglio</h4>
                <List>
                  <li>Visita <a href="https://swap.propellerheads.xyz/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">swap.propellerheads.xyz</a></li>
                  <li>Connetti il tuo portafoglio cripto (es. MetaMask)</li>
                  <li>Assicurati che JavaScript sia abilitato</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Esecuzione di uno Swap</h4>
                <List>
                  <li>Seleziona i token che desideri scambiare</li>
                  <li>Inserisci l&apos;importo e conferma l&apos;ordine</li>
                  <li>PropellerSwap troverà automaticamente il percorso ottimale</li>
                  <li>Utilizza l&apos;algoritmo di routing avanzato</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Funzioni Avanzate</h4>
                <List>
                  <li>Approfitta delle funzioni di combining orders</li>
                  <li>Utilizza CoWs per migliorare l&apos;efficienza</li>
                  <li>Esplora le opzioni di ordini avanzati</li>
                  <li>Personalizza ulteriormente i tuoi scambi</li>
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
              <a href="https://www.propellerheads.xyz/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale PropellerSwap
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/propellerswap" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">🔄</span>
              <a href="https://swap.propellerheads.xyz/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                PropellerSwap App
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📊</span>
              <a href="https://propellerheads.xyz/analytics" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Analytics Dashboard
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
