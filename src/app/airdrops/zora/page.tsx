import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function ZoraPage() {
  return (
    <ProtectedRoute title="Zora - Airdrop">
      <PageTitle description="Piattaforma per la creazione su internet libera e preziosa">
        Zora
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">Z</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Zora</h2>
              <p className="text-neutral-600">NFT • Creator Economy • Web3</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Zora</strong> è una piattaforma per la creazione su internet libera e preziosa, permettendo agli artisti e creatori di monetizzare il loro lavoro attraverso NFT e altri strumenti Web3. Zora si concentra sulla democratizzazione della creazione di contenuti e sulla creazione di un ecosistema sostenibile per i creatori.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Zora</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Creator Economy">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Monetizzazione Creativa</h4>
              <p className="text-neutral-600">
                Zora permette agli artisti e creatori di monetizzare il loro lavoro attraverso NFT, collezioni digitali e altri strumenti Web3, creando nuove opportunità di guadagno per i creatori.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Internet Libera">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Decentralizzazione</h4>
              <p className="text-neutral-600">
                Zora promuove un internet libero e decentralizzato, dove i creatori mantengono il controllo sui propri contenuti e possono interagire direttamente con la loro audience senza intermediari.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. NFT e Collezioni">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Creazione NFT</h4>
              <p className="text-neutral-600">
                La piattaforma offre strumenti intuitivi per creare, vendere e gestire NFT e collezioni digitali, rendendo accessibile la tecnologia blockchain ai creatori di tutti i livelli.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Community-Driven">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Governance Decentralizzata</h4>
              <p className="text-neutral-600">
                Zora è guidato dalla community, con token holder che partecipano alle decisioni di governance e allo sviluppo della piattaforma, creando un ecosistema veramente decentralizzato.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Interoperabilità">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ecosistema Aperto</h4>
              <p className="text-neutral-600">
                Zora si integra con altri protocolli e piattaforme Web3, permettendo ai creatori di accedere a un ecosistema più ampio di strumenti e opportunità per monetizzare il loro lavoro.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Funzionalità della Piattaforma</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Creazione</h4>
              <List>
                <li>Minting di NFT</li>
                <li>Collezioni personalizzate</li>
                <li>Metadati ricchi</li>
                <li>Royalty configurabili</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Trading</h4>
              <List>
                <li>Marketplace integrato</li>
                <li>Vendite istantanee</li>
                <li>Aste temporizzate</li>
                <li>Offerte su collezioni</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Community</h4>
              <List>
                <li>Profili creatori</li>
                <li>Social features</li>
                <li>Discovery tools</li>
                <li>Collaboration tools</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Analytics</h4>
              <List>
                <li>Statistiche di vendita</li>
                <li>Performance tracking</li>
                <li>Audience insights</li>
                <li>Revenue analytics</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Attività di Creazione</h4>
                <List>
                  <li>Crea e mint NFT su Zora</li>
                  <li>Pubblica collezioni regolari</li>
                  <li>Partecipa a programmi per creator</li>
                  <li>Interagisci con altri artisti</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Trading e Acquisti</h4>
                <List>
                  <li>Compra NFT da altri creatori</li>
                  <li>Partecipa a aste e offerte</li>
                  <li>Utilizza volumi significativi</li>
                  <li>Supporta la community</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Community Engagement</h4>
                <List>
                  <li>Partecipa alle discussioni</li>
                  <li>Contribuisci allo sviluppo</li>
                  <li>Partecipa a eventi e AMA</li>
                  <li>Costruisci la community</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Setup Account</h4>
                <List>
                  <li>Visita <a href="https://zora.co/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">zora.co</a></li>
                  <li>Connetti il tuo wallet</li>
                  <li>Completa il profilo creatore</li>
                  <li>Verifica l&apos;account</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Creazione NFT</h4>
                <List>
                  <li>Vai alla sezione &quot;Create&quot;</li>
                  <li>Carica i tuoi file</li>
                  <li>Configura metadati e royalty</li>
                  <li>Mint il tuo NFT</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Trading e Community</h4>
                <List>
                  <li>Esplora le collezioni disponibili</li>
                  <li>Compra NFT da altri creatori</li>
                  <li>Partecipa a aste e offerte</li>
                  <li>Interagisci con la community</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Ecosistema Zora</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Protocolli Integrati">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Interoperabilità</h4>
              <p className="text-neutral-600">
                Zora si integra con numerosi protocolli Web3, permettendo ai creatori di accedere a un ecosistema più ampio di strumenti e opportunità per monetizzare il loro lavoro.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Governance Token">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">ZORA Token</h4>
              <p className="text-neutral-600">
                Il token ZORA permette ai holder di partecipare alla governance della piattaforma, influenzando lo sviluppo e le decisioni che riguardano l&apos;ecosistema Zora.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Developer Tools">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">API e SDK</h4>
              <p className="text-neutral-600">
                Zora offre API e SDK per sviluppatori, permettendo l&apos;integrazione di funzionalità NFT e creator economy in altre applicazioni e piattaforme.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://zora.co/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Zora
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/ourZORA" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/zora" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.zora.co/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🔧</span>
              <a href="https://github.com/ourzora" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                GitHub Repository
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
