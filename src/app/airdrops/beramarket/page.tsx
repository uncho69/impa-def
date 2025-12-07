import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function BeramarketPage() {
  return (
    <ProtectedRoute title="Beramarket - Airdrop">
      <PageTitle description="Marketplace NFT su Berachain con funzionalità avanzate">
        Beramarket
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">B</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Beramarket</h2>
              <p className="text-neutral-600">NFT • Marketplace • Berachain</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Beramarket</strong> è un marketplace NFT su Berachain che offre trading di NFT con funzionalità avanzate e integrazione con l&apos;ecosistema Berachain. Beramarket sfrutta il proof of liquidity di Berachain per creare un&apos;esperienza di trading NFT più efficiente e sostenibile.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Beramarket</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Integrazione Berachain">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ecosistema Nativo</h4>
              <p className="text-neutral-600">
                Beramarket è nativamente integrato con l&apos;ecosistema Berachain, sfruttando il proof of liquidity per creare un marketplace NFT più efficiente e allineato con gli incentivi della blockchain.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Trading NFT Avanzato">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Funzionalità Complete</h4>
              <p className="text-neutral-600">
                Beramarket offre funzionalità avanzate per il trading di NFT, inclusi bundle, aste, offerte e trading programmato, ottimizzate per l&apos;ecosistema Berachain.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Liquidità Incentivizzata">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Proof of Liquidity</h4>
              <p className="text-neutral-600">
                Beramarket integra il meccanismo proof of liquidity di Berachain, incentivando gli utenti a fornire liquidità al marketplace e partecipare all&apos;ecosistema DeFi.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Creator-Friendly">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Supporto Creatori</h4>
              <p className="text-neutral-600">
                Beramarket offre strumenti avanzati per i creatori di NFT, inclusi royalty personalizzabili, metadati ricchi e integrazione con l&apos;ecosistema DeFi di Berachain.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Interoperabilità">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Cross-Chain</h4>
              <p className="text-neutral-600">
                Beramarket supporta l&apos;interoperabilità con altre blockchain attraverso l&apos;ecosistema Cosmos, permettendo il trading di NFT cross-chain e l&apos;accesso a liquidità esterna.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Funzionalità del Marketplace</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Trading</h4>
              <List>
                <li>Vendite istantanee</li>
                <li>Aste temporizzate</li>
                <li>Offerte su collezioni</li>
                <li>Bundle di NFT</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Creazione</h4>
              <List>
                <li>Minting facile</li>
                <li>Metadati personalizzati</li>
                <li>Royalty configurabili</li>
                <li>Collezioni multiple</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Analytics</h4>
              <List>
                <li>Statistiche di vendita</li>
                <li>Trend di mercato</li>
                <li>Performance portfolio</li>
                <li>Insights avanzati</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">DeFi Integration</h4>
              <List>
                <li>NFT lending</li>
                <li>Collateralization</li>
                <li>Yield farming</li>
                <li>Liquid staking</li>
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
                  <li>Compra e vendi NFT su Beramarket</li>
                  <li>Partecipa a aste e offerte</li>
                  <li>Utilizza volumi significativi</li>
                  <li>Interagisci con diverse collezioni</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Creazione di Contenuti</h4>
                <List>
                  <li>Crea e mint NFT su Beramarket</li>
                  <li>Partecipa a programmi per creator</li>
                  <li>Costruisci una community</li>
                  <li>Interagisci con altri artisti</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Integrazione DeFi</h4>
                <List>
                  <li>Utilizza NFT come collateral</li>
                  <li>Partecipa a lending protocols</li>
                  <li>Fai yield farming con NFT</li>
                  <li>Integra con protocolli DeFi</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a Beramarket</h4>
                <List>
                  <li>Visita <a href="https://beramarket.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">beramarket.com</a></li>
                  <li>Connetti il tuo wallet Berachain</li>
                  <li>Completa il profilo</li>
                  <li>Verifica l&apos;account</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Trading NFT</h4>
                <List>
                  <li>Esplora le collezioni disponibili</li>
                  <li>Fai offerte su NFT</li>
                  <li>Partecipa a aste</li>
                  <li>Vendi i tuoi NFT</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Creazione NFT</h4>
                <List>
                  <li>Vai alla sezione &quot;Create&quot;</li>
                  <li>Carica i tuoi file</li>
                  <li>Configura metadati e royalty</li>
                  <li>Mint il tuo NFT</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">4. Integrazione DeFi</h4>
                <List>
                  <li>Utilizza NFT come collateral</li>
                  <li>Partecipa a lending protocols</li>
                  <li>Fai yield farming</li>
                  <li>Integra con altri protocolli</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Ecosistema Berachain</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Protocolli DeFi Integrati">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Interoperabilità</h4>
              <p className="text-neutral-600">
                Beramarket si integra con i protocolli DeFi nativi di Berachain, permettendo agli utenti di utilizzare NFT per lending, borrowing, staking e altre attività DeFi.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Proof of Liquidity">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Incentivi</h4>
              <p className="text-neutral-600">
                Beramarket sfrutta il proof of liquidity di Berachain per incentivizzare la liquidità nel marketplace e allineare gli interessi degli utenti con la salute dell&apos;ecosistema.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Governance">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Partecipazione</h4>
              <p className="text-neutral-600">
                Gli utenti di Beramarket possono partecipare alla governance di Berachain, influenzando lo sviluppo del marketplace e dell&apos;ecosistema più ampio.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://beramarket.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Beramarket
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/beramarket" 
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
                Documentazione Berachain
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🔧</span>
              <a href="https://testnet.berachain.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Testnet Berachain
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
