import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function ZerionPage() {
  return (
    <ProtectedRoute title="Zerion - Airdrop">
      <PageTitle description="Portafoglio e dashboard DeFi multi-chain">
        Zerion
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">Z</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Zerion</h2>
              <p className="text-neutral-600">Wallet • DeFi • Multi-Chain</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Zerion</strong> è un portafoglio e dashboard DeFi multi-chain che permette agli utenti di gestire i propri asset, interagire con protocolli DeFi e monitorare le performance del proprio portfolio da un&apos;unica interfaccia. Zerion supporta numerose blockchain e migliaia di protocolli DeFi.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Zerion</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Portafoglio Multi-Chain">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Gestione Unificata</h4>
              <p className="text-neutral-600">
                Zerion permette di gestire asset su multiple blockchain da un&apos;unica interfaccia, includendo Ethereum, Polygon, Arbitrum, Optimism, Base e molte altre reti, semplificando la gestione del portfolio.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Dashboard DeFi">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Vista Completa</h4>
              <p className="text-neutral-600">
                Zerion offre una dashboard completa che mostra tutti i tuoi asset DeFi, posizioni di lending, staking, yield farming e altre attività, fornendo una vista unificata del tuo portfolio.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Interazione DeFi">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Accesso ai Protocolli</h4>
              <p className="text-neutral-600">
                Zerion si integra con migliaia di protocolli DeFi, permettendo agli utenti di interagire con DEX, lending protocols, staking platforms e altri servizi direttamente dall&apos;app.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Analytics Avanzate">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Insights Dettagliati</h4>
              <p className="text-neutral-600">
                Zerion fornisce analytics dettagliate sulle performance del portfolio, inclusi rendimenti, P&L, asset allocation e trend storici, aiutando gli utenti a prendere decisioni informate.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Sicurezza e Privacy">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Protezione dei Fondi</h4>
              <p className="text-neutral-600">
                Zerion è un portafoglio non-custodial che non ha mai accesso alle chiavi private degli utenti, garantendo la massima sicurezza e controllo sui propri asset.
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
                <h4 className="font-semibold text-neutral-900 mb-2">1. Utilizzo del Portafoglio</h4>
                <List>
                  <li>Utilizza Zerion come portafoglio principale</li>
                  <li>Gestisci asset su multiple blockchain</li>
                  <li>Mantieni un&apos;attività costante</li>
                  <li>Interagisci con protocolli DeFi</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Attività DeFi</h4>
                <List>
                  <li>Utilizza protocolli DeFi tramite Zerion</li>
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
                  <li>Scarica l&apos;app Zerion</li>
                  <li>Connetti il tuo wallet esistente</li>
                  <li>Oppure crea un nuovo wallet</li>
                  <li>Configura le reti preferite</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Gestione Portfolio</h4>
                <List>
                  <li>Visualizza tutti i tuoi asset</li>
                  <li>Monitora le performance</li>
                  <li>Analizza i rendimenti</li>
                  <li>Gestisci le posizioni DeFi</li>
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
                Zerion offre analytics avanzate che includono performance storiche, asset allocation, P&L tracking e trend analysis, aiutando gli utenti a ottimizzare i loro investimenti.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. DeFi Integration">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Protocolli Supportati</h4>
              <p className="text-neutral-600">
                Zerion si integra con migliaia di protocolli DeFi, permettendo agli utenti di accedere a DEX, lending platforms, staking services e altri strumenti finanziari decentralizzati.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Cross-Chain Support">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Multi-Chain</h4>
              <p className="text-neutral-600">
                Zerion supporta numerose blockchain, permettendo agli utenti di gestire asset su diverse reti e partecipare a ecosistemi DeFi multipli da un&apos;unica interfaccia.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://zerion.io/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Zerion
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/zerion_io" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/zerion" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.zerion.io/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">📱</span>
              <a href="https://zerion.io/download" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Download App
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
