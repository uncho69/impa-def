import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function DebankPage() {
  return (
    <ProtectedRoute title="DeBank - Airdrop">
      <PageTitle description="Dashboard DeFi e aggregatore di portfolio multi-chain">
        DeBank
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">D</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">DeBank</h2>
              <p className="text-neutral-600">DeFi • Dashboard • Analytics</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>DeBank</strong> è una dashboard DeFi e aggregatore di portfolio multi-chain che permette agli utenti di visualizzare, gestire e analizzare i propri asset DeFi da un&apos;unica interfaccia. DeBank supporta centinaia di protocolli DeFi e offre strumenti avanzati per l&apos;analisi e la gestione del portfolio.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di DeBank</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Dashboard DeFi Unificata">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Vista Completa</h4>
              <p className="text-neutral-600">
                DeBank offre una dashboard unificata che mostra tutti i tuoi asset DeFi, posizioni di lending, staking, yield farming e altre attività su diverse blockchain, fornendo una vista completa del tuo portfolio.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Multi-Chain Support">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Cross-Chain</h4>
              <p className="text-neutral-600">
                DeBank supporta numerose blockchain, permettendo agli utenti di gestire asset su diverse reti e partecipare a ecosistemi DeFi multipli, creando un&apos;esperienza seamless cross-chain.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Analytics Avanzate">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Insights Dettagliati</h4>
              <p className="text-neutral-600">
                DeBank fornisce analytics dettagliate sulle performance del portfolio, inclusi rendimenti, P&L, asset allocation, risk metrics e trend storici, aiutando gli utenti a ottimizzare i loro investimenti.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Aggregatore di Protocolli">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Accesso Multi-Protocol</h4>
              <p className="text-neutral-600">
                DeBank si integra con centinaia di protocolli DeFi, permettendo agli utenti di interagire con DEX, lending platforms, staking services e altri strumenti finanziari decentralizzati da un&apos;unica interfaccia.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. DeFi Tools">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Strumenti Avanzati</h4>
              <p className="text-neutral-600">
                DeBank offre strumenti avanzati per la gestione DeFi, inclusi portfolio rebalancing, yield optimization, risk management e strategie di investimento automatizzate.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Blockchain Supportate</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Layer 1</h4>
              <List>
                <li>Ethereum</li>
                <li>Polygon</li>
                <li>BNB Smart Chain</li>
                <li>Avalanche</li>
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
                <li>Solana</li>
                <li>Fantom</li>
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
                <h4 className="font-semibold text-neutral-900 mb-2">1. Utilizzo della Dashboard</h4>
                <List>
                  <li>Utilizza DeBank come dashboard principale</li>
                  <li>Gestisci asset su multiple blockchain</li>
                  <li>Mantieni un&apos;attività costante</li>
                  <li>Interagisci con protocolli DeFi</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Attività DeFi</h4>
                <List>
                  <li>Utilizza protocolli DeFi tramite DeBank</li>
                  <li>Partecipa a lending e borrowing</li>
                  <li>Fai yield farming e staking</li>
                  <li>Utilizza volumi significativi</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Community Engagement</h4>
                <List>
                  <li>Partecipa alle discussioni</li>
                  <li>Contribuisci allo sviluppo</li>
                  <li>Partecipa a eventi e AMA</li>
                  <li>Invita nuovi utenti</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Setup Iniziale</h4>
                <List>
                  <li>Visita <a href="https://debank.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">debank.com</a></li>
                  <li>Connetti il tuo wallet</li>
                  <li>Configura le reti preferite</li>
                  <li>Esplora la dashboard</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Gestione Portfolio</h4>
                <List>
                  <li>Visualizza tutti i tuoi asset DeFi</li>
                  <li>Monitora le performance</li>
                  <li>Analizza i rendimenti</li>
                  <li>Gestisci le posizioni</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Interazione DeFi</h4>
                <List>
                  <li>Esplora i protocolli disponibili</li>
                  <li>Partecipa a lending e borrowing</li>
                  <li>Fai yield farming</li>
                  <li>Partecipa a staking</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Funzionalità Avanzate</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Portfolio Analytics">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Insights Dettagliati</h4>
              <p className="text-neutral-600">
                DeBank offre analytics avanzate che includono performance storiche, asset allocation, P&L tracking, risk metrics e trend analysis, aiutando gli utenti a ottimizzare i loro investimenti DeFi.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. DeFi Tools">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Strumenti Avanzati</h4>
              <p className="text-neutral-600">
                DeBank offre strumenti avanzati per la gestione DeFi, inclusi portfolio rebalancing, yield optimization, risk management e strategie di investimento automatizzate.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Cross-Chain Support">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Multi-Chain</h4>
              <p className="text-neutral-600">
                DeBank supporta numerose blockchain, permettendo agli utenti di gestire asset su diverse reti e partecipare a ecosistemi DeFi multipli da un&apos;unica interfaccia.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://debank.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale DeBank
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/debank" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/debank" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.debank.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">📊</span>
              <a href="https://debank.com/analytics" 
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
