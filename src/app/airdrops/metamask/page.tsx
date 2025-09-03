import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function MetamaskPage() {
  return (
    <ProtectedRoute title="MetaMask - Wallet">
      <PageTitle description="Portafoglio non-custodial leader per Ethereum e Layer 2">
        MetaMask
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">M</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">MetaMask</h2>
              <p className="text-neutral-600">Wallet • Browser • Mobile</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>MetaMask</strong> è il portafoglio non-custodial più popolare per Ethereum e varie soluzioni Layer 2. Sviluppato da ConsenSys, MetaMask offre un&apos;interfaccia user-friendly per gestire criptovalute, interagire con dApp e accedere all&apos;ecosistema Web3.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di MetaMask</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Portafoglio Non-Custodial">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Controllo Totale</h4>
              <p className="text-neutral-600">
                MetaMask è un portafoglio non-custodial, il che significa che solo tu hai il controllo delle tue chiavi private e dei tuoi fondi. Nessun terzo può accedere ai tuoi asset senza la tua autorizzazione.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Supporto Multi-Chain">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ampia Compatibilità</h4>
              <p className="text-neutral-600">
                MetaMask supporta Ethereum e numerose reti Layer 2 e sidechain, tra cui Polygon, Arbitrum, Optimism, Base, BSC, Avalanche e molte altre, permettendo agli utenti di interagire con diversi ecosistemi.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Interfaccia Browser e Mobile">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Accessibilità</h4>
              <p className="text-neutral-600">
                MetaMask è disponibile come estensione browser per Chrome, Firefox, Brave e Edge, oltre che come app mobile per iOS e Android, offrendo un&apos;esperienza seamless su tutti i dispositivi.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Integrazione dApp">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ecosistema Web3</h4>
              <p className="text-neutral-600">
                MetaMask si integra perfettamente con migliaia di applicazioni decentralizzate (dApp), permettendo agli utenti di accedere facilmente a DeFi, NFT, giochi e altri servizi Web3.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Swap Integrato">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Trading Conveniente</h4>
              <p className="text-neutral-600">
                MetaMask include una funzione di swap integrata che permette agli utenti di scambiare token direttamente dal portafoglio, aggregando liquidità da diversi DEX per ottenere i migliori prezzi.
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
                <li>BNB Smart Chain</li>
                <li>Avalanche</li>
                <li>Polygon</li>
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
              <h4 className="font-semibold text-neutral-900 mb-2">zk-Rollups</h4>
              <List>
                <li>zkSync Era</li>
                <li>Scroll</li>
                <li>Polygon zkEVM</li>
                <li>StarkNet</li>
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

        <SectionTitle>Funzionalità Avanzate</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Gestione Portfolio">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Monitoraggio Asset</h4>
              <p className="text-neutral-600">
                MetaMask permette di visualizzare il valore del proprio portfolio in tempo reale, tracciare le performance degli asset e gestire diverse tipologie di token, inclusi NFT e token personalizzati.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Sicurezza Avanzata">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Protezione dei Fondi</h4>
              <p className="text-neutral-600">
                MetaMask offre funzionalità di sicurezza avanzate come la possibilità di impostare password, utilizzare hardware wallet, e ricevere notifiche per transazioni sospette.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Staking e DeFi">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ecosistema DeFi</h4>
              <p className="text-neutral-600">
                MetaMask si integra con numerose piattaforme DeFi per staking, lending, borrowing e yield farming, permettendo agli utenti di massimizzare i rendimenti dei propri asset.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Come Utilizzare MetaMask</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Tutorial di Setup">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Installazione</h4>
                <List>
                  <li>Visita <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">metamask.io</a></li>
                  <li>Scarica l&apos;estensione per il tuo browser</li>
                  <li>Oppure scarica l&apos;app mobile</li>
                  <li>Segui la procedura di setup guidata</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Creazione Wallet</h4>
                <List>
                  <li>Crea una nuova password sicura</li>
                  <li>Salva la frase seed in un posto sicuro</li>
                  <li>Non condividere mai le tue chiavi private</li>
                  <li>Verifica la frase seed</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Configurazione Reti</h4>
                <List>
                  <li>Aggiungi le reti che utilizzi di più</li>
                  <li>Configura RPC personalizzati se necessario</li>
                  <li>Verifica i dettagli delle reti</li>
                  <li>Testa le connessioni</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Utilizzo Avanzato">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Interazione con dApp</h4>
                <List>
                  <li>Connetti MetaMask alle dApp</li>
                  <li>Autorizza le transazioni necessarie</li>
                  <li>Verifica sempre i dettagli delle transazioni</li>
                  <li>Gestisci i permessi delle dApp</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Swap e Trading</h4>
                <List>
                  <li>Utilizza la funzione swap integrata</li>
                  <li>Confronta i prezzi su diversi DEX</li>
                  <li>Considera le commissioni di gas</li>
                  <li>Monitora lo slippage</li>
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
              <a href="https://metamask.io/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale MetaMask
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/MetaMask" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">📱</span>
              <a href="https://metamask.io/download/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Download App
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://support.metamask.io/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Centro Supporto
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🔧</span>
              <a href="https://metamask.io/learn/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                MetaMask Learn
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
