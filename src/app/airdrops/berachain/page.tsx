import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function BerachainPage() {
  return (
    <ProtectedRoute title="Berachain - Airdrop">
      <PageTitle description="Blockchain Layer 1 basata su Cosmos con proof of liquidity">
        Berachain
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">B</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Berachain</h2>
              <p className="text-neutral-600">Layer 1 • Cosmos • DeFi</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Berachain</strong> è una blockchain Layer 1 basata su Cosmos, focalizzata su DeFi con un consenso &quot;proof of liquidity&quot; per migliorare l&apos;efficienza del capitale. Berachain introduce un nuovo paradigma per la liquidità e l&apos;incentivazione degli utenti nell&apos;ecosistema DeFi.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Berachain</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Proof of Liquidity">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Consenso Innovativo</h4>
              <p className="text-neutral-600">
                Berachain utilizza un meccanismo di consenso &quot;proof of liquidity&quot; che incentiva gli utenti a fornire liquidità ai protocolli DeFi. Questo sistema allinea gli interessi degli utenti con la salute dell&apos;ecosistema.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Ecosistema DeFi Nativo">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">DeFi-First</h4>
              <p className="text-neutral-600">
                Berachain è progettata specificamente per DeFi, con protocolli nativi che sfruttano il proof of liquidity per creare un ecosistema più efficiente e sostenibile per la finanza decentralizzata.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Architettura Cosmos">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Interoperabilità</h4>
              <p className="text-neutral-600">
                Basata su Cosmos SDK, Berachain beneficia dell&apos;interoperabilità dell&apos;ecosistema Cosmos, permettendo connessioni seamless con altre blockchain e protocolli nell&apos;ecosistema IBC.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Tokenomics Innovativi">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Sistema Token</h4>
              <p className="text-neutral-600">
                Berachain introduce un sistema tokenomics innovativo che include token per la governance, l&apos;utilità e l&apos;incentivazione della liquidità, creando un ecosistema economico sostenibile.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Efficienza del Capitale">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ottimizzazione</h4>
              <p className="text-neutral-600">
                Il proof of liquidity di Berachain migliora l&apos;efficienza del capitale nell&apos;ecosistema DeFi, permettendo una migliore allocazione delle risorse e riducendo la frammentazione della liquidità.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Ecosistema Berachain</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Protocolli DeFi</h4>
              <List>
                <li>DEX nativi</li>
                <li>Lending protocols</li>
                <li>Yield farming</li>
                <li>Liquid staking</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Infrastruttura</h4>
              <List>
                <li>Validatori</li>
                <li>RPC endpoints</li>
                <li>Indexing services</li>
                <li>Analytics tools</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Applicazioni</h4>
              <List>
                <li>Beramarket (NFT)</li>
                <li>DeFi protocols</li>
                <li>Gaming platforms</li>
                <li>Social applications</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Strumenti</h4>
              <List>
                <li>Wallet integration</li>
                <li>Bridge protocols</li>
                <li>Analytics dashboards</li>
                <li>Developer tools</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Testnet Activity</h4>
                <List>
                  <li>Partecipa alla testnet di Berachain</li>
                  <li>Testa i protocolli DeFi</li>
                  <li>Fornisci liquidità ai pool</li>
                  <li>Interagisci con le dApp</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Community Engagement</h4>
                <List>
                  <li>Segui i canali ufficiali</li>
                  <li>Partecipa alle discussioni</li>
                  <li>Contribuisci alla community</li>
                  <li>Partecipa a eventi e AMA</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Early Adoption</h4>
                <List>
                  <li>Utilizza i protocolli nativi</li>
                  <li>Fornisci liquidità consistente</li>
                  <li>Partecipa alla governance</li>
                  <li>Contribuisci allo sviluppo</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso alla Testnet</h4>
                <List>
                  <li>Visita <a href="https://berachain.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">berachain.com</a></li>
                  <li>Ottieni token di test</li>
                  <li>Configura il wallet</li>
                  <li>Connetti alla testnet</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Interazione con DeFi</h4>
                <List>
                  <li>Esplora i protocolli DeFi</li>
                  <li>Fornisci liquidità ai pool</li>
                  <li>Partecipa a yield farming</li>
                  <li>Testa le funzionalità</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Community e Governance</h4>
                <List>
                  <li>Unisciti ai canali Discord/Telegram</li>
                  <li>Partecipa alle votazioni</li>
                  <li>Contribuisci alle proposte</li>
                  <li>Mantieni un&apos;attività costante</li>
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
              <a href="https://berachain.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Berachain
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/berachain" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/berachain" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.berachain.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🔧</span>
              <a href="https://testnet.berachain.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Testnet
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
