import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function DegenPage() {
  return (
    <ProtectedRoute title="Degen - Airdrop">
      <PageTitle description="Ecosistema su Base per applicazioni decentralizzate">
        Degen
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">D</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Degen</h2>
              <p className="text-neutral-600">Base • Ecosystem • Token</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Degen</strong> è un ecosistema su Base progettato per supportare applicazioni decentralizzate e integrare DEGEN come token nativo. L&apos;ecosistema Degen si concentra sulla community, l&apos;innovazione e la creazione di valore attraverso l&apos;utilizzo del token DEGEN in varie applicazioni e protocolli.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Degen</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Ecosistema su Base">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Layer 2 Integration</h4>
              <p className="text-neutral-600">
                Degen è costruito su Base, il Layer 2 di Coinbase, sfruttando la scalabilità e i bassi costi della rete per creare un ecosistema efficiente per applicazioni decentralizzate.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Token DEGEN">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Utility Token</h4>
              <p className="text-neutral-600">
                Il token DEGEN serve come valuta nativa dell&apos;ecosistema, utilizzato per governance, pagamenti, incentivi e accesso a funzionalità premium nelle applicazioni Degen.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Community-Driven">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Governance Decentralizzata</h4>
              <p className="text-neutral-600">
                L&apos;ecosistema Degen è guidato dalla community, con token holder che partecipano alle decisioni di governance e allo sviluppo delle applicazioni e protocolli.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Applicazioni Diversificate">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ecosistema Completo</h4>
              <p className="text-neutral-600">
                Degen supporta una vasta gamma di applicazioni, inclusi giochi, DeFi, NFT, social media e strumenti di produttività, tutti integrati con il token DEGEN.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Innovazione Continua">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Sviluppo Attivo</h4>
              <p className="text-neutral-600">
                L&apos;ecosistema Degen è in continua evoluzione, con nuovi protocolli, applicazioni e funzionalità che vengono regolarmente aggiunti per migliorare l&apos;esperienza utente.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Applicazioni nell&apos;Ecosistema Degen</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">DeFi</h4>
              <List>
                <li>DEX e trading</li>
                <li>Lending protocols</li>
                <li>Yield farming</li>
                <li>Staking platforms</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Gaming</h4>
              <List>
                <li>Play-to-earn games</li>
                <li>NFT gaming</li>
                <li>Virtual worlds</li>
                <li>Gaming tournaments</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Social</h4>
              <List>
                <li>Social media platforms</li>
                <li>Community tools</li>
                <li>Content creation</li>
                <li>Influencer networks</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Utility</h4>
              <List>
                <li>Payment systems</li>
                <li>Productivity tools</li>
                <li>Analytics platforms</li>
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
                <h4 className="font-semibold text-neutral-900 mb-2">1. Utilizzo dell&apos;Ecosistema</h4>
                <List>
                  <li>Utilizza le applicazioni Degen</li>
                  <li>Partecipa a giochi e attività</li>
                  <li>Interagisci con i protocolli DeFi</li>
                  <li>Mantieni un&apos;attività costante</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Token DEGEN</h4>
                <List>
                  <li>Acquista e detieni token DEGEN</li>
                  <li>Partecipa alla governance</li>
                  <li>Utilizza il token per pagamenti</li>
                  <li>Staking e yield farming</li>
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
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso all&apos;Ecosistema</h4>
                <List>
                  <li>Visita <a href="https://degen.tips/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">degen.tips</a></li>
                  <li>Connetti il tuo wallet Base</li>
                  <li>Acquista token DEGEN</li>
                  <li>Esplora le applicazioni disponibili</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Utilizzo delle Applicazioni</h4>
                <List>
                  <li>Partecipa a giochi e attività</li>
                  <li>Utilizza protocolli DeFi</li>
                  <li>Interagisci con NFT e collezioni</li>
                  <li>Partecipa a community e social</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Governance e Staking</h4>
                <List>
                  <li>Partecipa alle votazioni di governance</li>
                  <li>Fai staking dei tuoi token DEGEN</li>
                  <li>Partecipa a yield farming</li>
                  <li>Contribuisci alle proposte</li>
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
              <a href="https://degen.tips/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Degen
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/degentips" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/degen" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.degen.tips/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🔧</span>
              <a href="https://degen.tips/apps" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Applicazioni Degen
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
