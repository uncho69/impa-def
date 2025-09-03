import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function PolygonZkEVMPage() {
  return (
    <ProtectedRoute title="Polygon zkEVM - Airdrop">
      <PageTitle description="Soluzione Layer 2 per Ethereum con tecnologia zero-knowledge">
        Polygon zkEVM
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">P</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Polygon zkEVM</h2>
              <p className="text-neutral-600">Layer 2 • zk-Rollup • Ethereum</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Polygon zkEVM</strong> è una soluzione Layer 2 per Ethereum che utilizza la tecnologia zero-knowledge rollup per migliorare la scalabilità. Basata su Polygon, zkEVM offre compatibilità completa con Ethereum Virtual Machine (EVM) mantenendo la sicurezza e la decentralizzazione della rete principale.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Polygon zkEVM</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Compatibilità EVM Completa">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ethereum Compatibility</h4>
              <p className="text-neutral-600">
                Polygon zkEVM offre compatibilità completa con Ethereum Virtual Machine, permettendo agli sviluppatori di migrare facilmente le loro dApp da Ethereum senza modifiche al codice.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Tecnologia Zero-Knowledge">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">zk-Rollup</h4>
              <p className="text-neutral-600">
                Utilizza la tecnologia zero-knowledge rollup per aggregare migliaia di transazioni in una singola prova, riducendo drasticamente i costi del gas e migliorando la velocità delle transazioni.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Sicurezza di Ethereum">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Sicurezza Garantita</h4>
              <p className="text-neutral-600">
                Polygon zkEVM mantiene la sicurezza di Ethereum attraverso prove crittografiche, garantendo che tutte le transazioni siano valide e che i fondi siano sempre al sicuro.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Costi Ridotti">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Gas Fees Bassi</h4>
              <p className="text-neutral-600">
                I costi delle transazioni su Polygon zkEVM sono significativamente più bassi rispetto a Ethereum, rendendo l&apos;ecosistema DeFi più accessibile a tutti gli utenti.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Velocità Elevata">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Transazioni Rapide</h4>
              <p className="text-neutral-600">
                Polygon zkEVM offre tempi di finalizzazione rapidi, permettendo transazioni quasi istantanee e migliorando l&apos;esperienza utente per le applicazioni decentralizzate.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Ecosistema Polygon zkEVM</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">DeFi Protocols</h4>
              <List>
                <li>DEX nativi</li>
                <li>Lending protocols</li>
                <li>Yield farming</li>
                <li>Staking platforms</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Infrastruttura</h4>
              <List>
                <li>RPC endpoints</li>
                <li>Block explorers</li>
                <li>Indexing services</li>
                <li>Analytics tools</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Applicazioni</h4>
              <List>
                <li>NFT marketplaces</li>
                <li>Gaming platforms</li>
                <li>Social applications</li>
                <li>Enterprise solutions</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Strumenti</h4>
              <List>
                <li>Wallet integration</li>
                <li>Bridge protocols</li>
                <li>Developer tools</li>
                <li>Testing frameworks</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Attività di Bridge</h4>
                <List>
                  <li>Effettua bridge regolari da Ethereum</li>
                  <li>Utilizza volumi significativi</li>
                  <li>Partecipa a eventi e campagne</li>
                  <li>Interagisci con la community</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Utilizzo DeFi</h4>
                <List>
                  <li>Utilizza protocolli DeFi su zkEVM</li>
                  <li>Fornisci liquidità ai pool</li>
                  <li>Partecipa a yield farming</li>
                  <li>Fai staking di token</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Sviluppo e Testing</h4>
                <List>
                  <li>Testa le applicazioni su zkEVM</li>
                  <li>Contribuisci allo sviluppo</li>
                  <li>Partecipa ai programmi per sviluppatori</li>
                  <li>Interagisci con la community</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Bridge da Ethereum</h4>
                <List>
                  <li>Visita <a href="https://bridge.polygon.technology/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">bridge.polygon.technology</a></li>
                  <li>Seleziona Polygon zkEVM</li>
                  <li>Connetti il tuo wallet</li>
                  <li>Effettua il bridge dei token</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Utilizzo DeFi</h4>
                <List>
                  <li>Esplora i protocolli DeFi disponibili</li>
                  <li>Fornisci liquidità ai pool</li>
                  <li>Partecipa a yield farming</li>
                  <li>Fai staking di token</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Sviluppo dApp</h4>
                <List>
                  <li>Configura l&apos;ambiente di sviluppo</li>
                  <li>Deploy le tue dApp su zkEVM</li>
                  <li>Testa le funzionalità</li>
                  <li>Partecipa ai programmi per sviluppatori</li>
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
              <a href="https://polygon.technology/polygon-zkevm" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Polygon zkEVM
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/0xPolygon" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">🌉</span>
              <a href="https://bridge.polygon.technology/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Polygon Bridge
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.polygon.technology/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🔧</span>
              <a href="https://polygon.technology/developers/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Developer Portal
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
