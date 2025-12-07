import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function PhantomPage() {
  return (
    <ProtectedRoute title="Phantom - Wallet">
      <PageTitle description="Portafoglio non-custodial per Solana ed Ethereum">
        Phantom
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">P</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Phantom</h2>
              <p className="text-neutral-600">Wallet • Solana • Ethereum</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Phantom</strong> è un portafoglio non-custodial progettato per essere user-friendly e sicuro per la gestione di criptovalute. Originariamente focalizzato su Solana, Phantom si è espanso per supportare anche Ethereum, offrendo un&apos;esperienza seamless per entrambi gli ecosistemi.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Phantom</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Supporto Multi-Chain">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Solana ed Ethereum</h4>
              <p className="text-neutral-600">
                Phantom supporta nativamente Solana ed Ethereum, permettendo agli utenti di gestire asset su entrambe le blockchain da un singolo portafoglio. L&apos;interfaccia si adatta automaticamente alla rete selezionata.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Interfaccia User-Friendly">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Design Intuitivo</h4>
              <p className="text-neutral-600">
                Phantom è progettato con un&apos;interfaccia pulita e intuitiva che rende facile per principianti ed esperti navigare nell&apos;ecosistema crypto. L&apos;esperienza utente è ottimizzata per essere semplice e accessibile.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Gestione NFT">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Collezione NFT</h4>
              <p className="text-neutral-600">
                Phantom offre un&apos;eccellente gestione degli NFT, permettendo agli utenti di visualizzare, organizzare e interagire con le loro collezioni digitali in modo intuitivo e visivamente accattivante.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Swap Integrato">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Trading Conveniente</h4>
              <p className="text-neutral-600">
                Phantom include una funzione di swap integrata che permette agli utenti di scambiare token direttamente dal portafoglio, aggregando liquidità da diversi DEX per ottenere i migliori prezzi disponibili.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Sicurezza Avanzata">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Protezione dei Fondi</h4>
              <p className="text-neutral-600">
                Phantom implementa misure di sicurezza avanzate come la protezione contro phishing, la verifica delle transazioni e l&apos;integrazione con hardware wallet per massimizzare la sicurezza dei fondi degli utenti.
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
                <li>Solana</li>
                <li>Ethereum</li>
                <li>Polygon</li>
                <li>BNB Smart Chain</li>
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
              <h4 className="font-semibold text-neutral-900 mb-2">Ecosistema Solana</h4>
              <List>
                <li>Solana Mainnet</li>
                <li>Solana Devnet</li>
                <li>Solana Testnet</li>
                <li>Custom RPC</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Altri</h4>
              <List>
                <li>Avalanche</li>
                <li>Fantom</li>
                <li>Celo</li>
                <li>Gnosis</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Funzionalità Avanzate</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Staking e DeFi">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ecosistema DeFi</h4>
              <p className="text-neutral-600">
                Phantom si integra con numerose piattaforme DeFi su Solana ed Ethereum, permettendo agli utenti di partecipare a staking, lending, borrowing e yield farming direttamente dal portafoglio.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Gestione Portfolio">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Monitoraggio Asset</h4>
              <p className="text-neutral-600">
                Phantom offre una vista completa del portfolio, permettendo agli utenti di tracciare il valore dei propri asset, visualizzare le performance e gestire diverse tipologie di token e NFT.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Interazione dApp">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ecosistema Web3</h4>
              <p className="text-neutral-600">
                Phantom si connette facilmente con migliaia di applicazioni decentralizzate su Solana ed Ethereum, offrendo un&apos;esperienza seamless per accedere a giochi, DeFi, NFT e altri servizi Web3.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Come Utilizzare Phantom</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Tutorial di Setup">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Installazione</h4>
                <List>
                  <li>Visita <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">phantom.app</a></li>
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
                  <li>Seleziona la rete principale (Solana/Ethereum)</li>
                  <li>Aggiungi reti aggiuntive se necessario</li>
                  <li>Configura RPC personalizzati</li>
                  <li>Testa le connessioni</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Utilizzo Avanzato">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Gestione NFT</h4>
                <List>
                  <li>Visualizza la tua collezione NFT</li>
                  <li>Organizza gli NFT per categoria</li>
                  <li>Interagisci con marketplace NFT</li>
                  <li>Partecipa a airdrop e collezioni</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. DeFi e Staking</h4>
                <List>
                  <li>Partecipa a staking su Solana</li>
                  <li>Utilizza protocolli DeFi</li>
                  <li>Fai yield farming</li>
                  <li>Monitora i rendimenti</li>
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
              <a href="https://phantom.app/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Phantom
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/phantom" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">📱</span>
              <a href="https://phantom.app/download" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Download App
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://help.phantom.app/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Centro Supporto
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🔧</span>
              <a href="https://phantom.app/learn" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Phantom Learn
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
