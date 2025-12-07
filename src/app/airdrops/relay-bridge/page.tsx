import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function RelayBridgePage() {
  return (
    <ProtectedRoute title="Relay Bridge - Airdrop">
      <PageTitle description="Piattaforma di bridging cross-chain istantaneo">
        Relay Bridge
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">R</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Relay Bridge</h2>
              <p className="text-neutral-600">Bridge • Cross-Chain • Reservoir</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Relay Bridge</strong> è una piattaforma di bridging cross-chain che facilita il trasferimento di token tra diverse blockchain in modo rapido, sicuro e a basso costo. Relay utilizza un modello di relayer, dove agenti finanziari eseguono transazioni cross-chain per conto degli utenti, minimizzando i costi del gas e riducendo la latenza delle transazioni.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Relay Bridge</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Bridging Istantaneo e a Basso Costo">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Velocità e Economicità</h4>
              <p className="text-neutral-600">
                Relay consente il bridging di token in pochi secondi, riducendo i costi fino al 70% rispetto ad altri bridge grazie all&apos;uso di relayer che effettuano le transazioni direttamente con i propri fondi.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Modello di Relayer">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Esecuzione Immediata</h4>
              <p className="text-neutral-600">
                A differenza dei bridge basati su messaggi che richiedono il consenso tra più attori, Relay utilizza un singolo relayer che esegue immediatamente l&apos;ordine sulla rete di destinazione, senza attendere conferme complete sulla rete di origine.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Compatibilità Multi-Chain">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ampia Compatibilità</h4>
              <p className="text-neutral-600">
                Relay supporta un&apos;ampia gamma di blockchain, tra cui Ethereum, Arbitrum, Arbitrum Nova, Optimism, Base, e Zora. Questo rende possibile trasferire token tra queste reti in modo semplice e sicuro.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Economicità">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Riduzione dei Costi</h4>
              <p className="text-neutral-600">
                Relay riduce i costi eseguendo la convalida degli ordini e la raccolta delle commissioni su rete di regolamento più economiche, mentre i trasferimenti di asset avvengono direttamente tra l&apos;utente e il relayer. Questo evita il gas costoso richiesto dai protocolli on-chain, abbassando ulteriormente i costi complessivi delle transazioni.
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
                <li>Polygon</li>
                <li>Avalanche</li>
                <li>BNB Chain</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Layer 2</h4>
              <List>
                <li>Arbitrum</li>
                <li>Arbitrum Nova</li>
                <li>Optimism</li>
                <li>Base</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">zk-Rollups</h4>
              <List>
                <li>zkSync</li>
                <li>Scroll</li>
                <li>Polygon zkEVM</li>
                <li>Redstone</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Altri</h4>
              <List>
                <li>Linea</li>
                <li>Blast</li>
                <li>Zora</li>
                <li>Degen</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Utilizzo del Bridge</h4>
                <List>
                  <li>Effettua trasferimenti regolari tra diverse reti</li>
                  <li>Utilizza volumi significativi di token</li>
                  <li>Partecipa a eventi e campagne speciali</li>
                  <li>Interagisci con la community</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Volume e Frequenza</h4>
                <List>
                  <li>Mantieni un volume di trasferimenti consistente</li>
                  <li>Effettua transazioni regolari nel tempo</li>
                  <li>Utilizza diverse coppie di reti</li>
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
                  <li>Vai su <a href="https://relay.link/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">relay.link</a></li>
                  <li>Clicca su &quot;Connect Wallet&quot;</li>
                  <li>Puoi connettere MetaMask, WalletConnect, Coinbase Wallet e altri</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Esecuzione di un Bridge</h4>
                <List>
                  <li>Seleziona i token che desideri trasferire</li>
                  <li>Scegli la blockchain di destinazione</li>
                  <li>Ricevi un preventivo dal relayer</li>
                  <li>Conferma l&apos;ordine e invia i fondi al relayer</li>
                  <li>Il relayer eseguirà la transazione sulla catena di destinazione</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Monitoraggio delle Transazioni</h4>
                <List>
                  <li>Utilizza l&apos;interfaccia di Relay per monitorare lo stato</li>
                  <li>Assicurati che le transazioni siano completate correttamente</li>
                  <li>Verifica i dettagli del trasferimento</li>
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
              <a href="https://relay.link/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Relay Bridge
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/reservoir0x" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">🌉</span>
              <a href="https://relay.link/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Relay Bridge App
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📊</span>
              <a href="https://reservoir.tools/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Reservoir Tools
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
