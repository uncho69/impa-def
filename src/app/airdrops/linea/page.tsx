import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function LineaPage() {
  return (
    <ProtectedRoute title="Linea - Airdrop">
      <PageTitle description="Layer 2 di ConsenSys per Ethereum con zk-Rollup">
        Linea
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">L</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Linea</h2>
              <p className="text-neutral-600">Layer 2 • zk-Rollup • ConsenSys</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Linea</strong> è un Layer 2 di ConsenSys per Ethereum che utilizza la tecnologia zero-knowledge rollup per offrire transazioni veloci, sicure e a basso costo. Linea è progettato per essere completamente compatibile con Ethereum, permettendo agli sviluppatori di migrare facilmente le loro applicazioni.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Linea</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Tecnologia zk-Rollup">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Zero-Knowledge Proofs</h4>
              <p className="text-neutral-600">
                Linea utilizza la tecnologia zero-knowledge rollup per aggregare migliaia di transazioni in una singola prova, riducendo drasticamente i costi del gas e migliorando la velocità delle transazioni mantenendo la sicurezza di Ethereum.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Compatibilità EVM Completa">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ethereum Compatibility</h4>
              <p className="text-neutral-600">
                Linea offre compatibilità completa con Ethereum Virtual Machine (EVM), permettendo agli sviluppatori di migrare le loro dApp da Ethereum senza modifiche al codice, garantendo un&apos;esperienza di sviluppo familiare.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Sicurezza di Ethereum">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Sicurezza Garantita</h4>
              <p className="text-neutral-600">
                Linea mantiene la sicurezza di Ethereum attraverso prove crittografiche zero-knowledge, garantendo che tutte le transazioni siano valide e che i fondi siano sempre al sicuro sulla rete principale.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Costi Ridotti">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Gas Fees Bassi</h4>
              <p className="text-neutral-600">
                I costi delle transazioni su Linea sono significativamente più bassi rispetto a Ethereum, rendendo l&apos;ecosistema DeFi più accessibile e permettendo micro-transazioni economicamente sostenibili.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Velocità Elevata">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Transazioni Rapide</h4>
              <p className="text-neutral-600">
                Linea offre tempi di finalizzazione rapidi, permettendo transazioni quasi istantanee e migliorando significativamente l&apos;esperienza utente per le applicazioni decentralizzate.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Ecosistema Linea</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">DeFi Protocols</h4>
              <List>
                <li>DEX e trading</li>
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
                <li>MetaMask integration</li>
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
                  <li>Utilizza protocolli DeFi su Linea</li>
                  <li>Fornisci liquidità ai pool</li>
                  <li>Partecipa a yield farming</li>
                  <li>Fai staking di token</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Sviluppo e Testing</h4>
                <List>
                  <li>Testa le applicazioni su Linea</li>
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
                  <li>Visita <a href="https://bridge.linea.build/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">bridge.linea.build</a></li>
                  <li>Connetti il tuo wallet MetaMask</li>
                  <li>Seleziona i token da trasferire</li>
                  <li>Effettua il bridge su Linea</li>
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
                  <li>Deploy le tue dApp su Linea</li>
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
              <a href="https://linea.build/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Linea
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/LineaBuild" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">🌉</span>
              <a href="https://bridge.linea.build/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Linea Bridge
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.linea.build/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🔧</span>
              <a href="https://linea.build/developers/" 
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
