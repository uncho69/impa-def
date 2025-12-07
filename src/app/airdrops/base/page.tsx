import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import baseLogo from "@/assets/base-logo.svg";

export default function BasePage() {
  return (
    <ProtectedRoute title="Base - Airdrop">
      <PageTitle description="Layer 2 di Ethereum sviluppata da Coinbase">
        Base
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <Image 
              src={baseLogo} 
              alt="Base" 
              className="w-16 h-16" 
              width={64}
              height={64}
            />
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Base</h2>
              <p className="text-neutral-600">Layer 2 di Ethereum • Sviluppata da Coinbase</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Base</strong> è una soluzione Layer 2 per Ethereum sviluppata da Coinbase, progettata per offrire una piattaforma sicura, scalabile e conveniente per le applicazioni decentralizzate (dApp). Utilizzando l&apos;OP Stack di Optimism, Base mira a combinare la sicurezza della blockchain di Ethereum con una maggiore efficienza e costi di transazione ridotti.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Base</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Tecnologia di Scalabilità">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">OP Stack di Optimism</h4>
              <p className="text-neutral-600">
                Base è alimentata dall&apos;OP Stack di Optimism, una tecnologia che utilizza i rollup ottimistici per aggregare transazioni fuori catena e pubblicarle in batch su Ethereum. Questo approccio riduce significativamente i costi di transazione e aumenta la velocità senza compromettere la sicurezza.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Sicurezza e Affidabilità">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Supporto di Coinbase</h4>
              <p className="text-neutral-600">
                Essendo sviluppata da Coinbase, Base beneficia dell&apos;infrastruttura sicura e affidabile di uno degli exchange di criptovalute più grandi e rispettati al mondo. Questo include l&apos;utilizzo dei nodi di Coinbase per garantire la resilienza della rete.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Ecosistema e Integrazioni">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ampio Ecosistema</h4>
              <p className="text-neutral-600 mb-3">
                Base supporta una vasta gamma di dApp e protocolli DeFi, grazie alla sua compatibilità con l&apos;Ethereum Virtual Machine (EVM). Gli sviluppatori possono facilmente migrare le loro applicazioni esistenti su Base per sfruttare costi inferiori e maggiore scalabilità.
              </p>
              <h4 className="font-semibold text-neutral-900">Strumenti per Sviluppatori</h4>
              <p className="text-neutral-600">
                Base offre una serie di strumenti e risorse per sviluppatori, tra cui il Base SDK e documentazione dettagliata, per facilitare lo sviluppo e il deployment di smart contract e dApp sulla piattaforma.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Accessibilità e Facilità d'Uso">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Compatibilità con Ethereum</h4>
              <p className="text-neutral-600">
                Base è progettata per essere completamente compatibile con Ethereum, il che significa che gli sviluppatori possono utilizzare gli stessi strumenti e librerie che già conoscono, riducendo la curva di apprendimento e accelerando lo sviluppo.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Applicazioni su Base</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">DeFi</h4>
              <List>
                <li>Uniswap V3</li>
                <li>Aave</li>
                <li>Compound</li>
                <li>Curve Finance</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">NFT & Gaming</h4>
              <List>
                <li>OpenSea</li>
                <li>Zora</li>
                <li>Friend.tech</li>
                <li>Degen</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Bridge & Infrastructure</h4>
              <List>
                <li>Base Bridge</li>
                <li>Orbiter Finance</li>
                <li>LayerZero</li>
                <li>Hyperlane</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Social & Memecoins</h4>
              <List>
                <li>Farcaster</li>
                <li>Higher</li>
                <li>TN100X</li>
                <li>Floppa</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Utilizzo della Rete</h4>
                <List>
                  <li>Effettua transazioni regolari su Base</li>
                  <li>Utilizza dApp native di Base</li>
                  <li>Partecipa a DeFi su Base</li>
                  <li>Interagisci con NFT e gaming</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Volume e Frequenza</h4>
                <List>
                  <li>Mantieni un volume di trading consistente</li>
                  <li>Effettua transazioni regolari nel tempo</li>
                  <li>Partecipa a eventi e campagne</li>
                  <li>Interagisci con la community</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Progetti da Utilizzare">
            <div className="space-y-3">
              <p className="text-neutral-600">
                Per massimizzare le possibilità di airdrop, utilizza regolarmente questi progetti su Base:
              </p>
              <List>
                <li><strong>Uniswap V3</strong> - Trading e liquidity providing</li>
                <li><strong>Aave</strong> - Lending e borrowing</li>
                <li><strong>Friend.tech</strong> - Social trading</li>
                <li><strong>Zora</strong> - NFT marketplace</li>
                <li><strong>Degen</strong> - Memecoin ecosystem</li>
                <li><strong>Base Bridge</strong> - Bridge da Ethereum</li>
              </List>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://base.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Base
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/base" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">📊</span>
              <a href="https://basescan.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Base Explorer (BaseScan)
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">🌉</span>
              <a href="https://bridge.base.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Base Bridge
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
