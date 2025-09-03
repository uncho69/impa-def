import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function GitcoinPage() {
  return (
    <ProtectedRoute title="Gitcoin - Airdrop">
      <PageTitle description="Piattaforma per il finanziamento di beni pubblici open source">
        Gitcoin
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">G</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Gitcoin</h2>
              <p className="text-neutral-600">Open Source • Funding • Quadratic Voting</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Gitcoin</strong> è una piattaforma per il finanziamento di beni pubblici open source attraverso il Quadratic Funding e altri meccanismi di finanziamento decentralizzato. Gitcoin permette alla community di supportare progetti open source, sviluppatori e iniziative che beneficiano l&apos;intero ecosistema Web3.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Gitcoin</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Quadratic Funding">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Finanziamento Democratico</h4>
              <p className="text-neutral-600">
                Gitcoin utilizza il Quadratic Funding, un meccanismo che permette alla community di votare con i propri fondi per determinare come distribuire i finanziamenti, dando più peso ai progetti supportati da molte persone piuttosto che da pochi grandi donatori.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Open Source Funding">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Supporto ai Beni Pubblici</h4>
              <p className="text-neutral-600">
                Gitcoin si concentra sul finanziamento di beni pubblici open source, inclusi protocolli, strumenti di sviluppo, ricerca e altre iniziative che beneficiano l&apos;intero ecosistema Web3 e crypto.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Developer Grants">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Supporto agli Sviluppatori</h4>
              <p className="text-neutral-600">
                Gitcoin offre programmi di grant per sviluppatori, permettendo loro di ricevere finanziamenti per lavorare su progetti open source e contribuire allo sviluppo dell&apos;ecosistema Web3.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Community Governance">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Governance Decentralizzata</h4>
              <p className="text-neutral-600">
                Gitcoin è guidato dalla community attraverso un sistema di governance decentralizzato, dove i token holder partecipano alle decisioni che riguardano il futuro della piattaforma e l&apos;allocazione dei fondi.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Impact Measurement">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Misurazione dell&apos;Impatto</h4>
              <p className="text-neutral-600">
                Gitcoin utilizza metriche e strumenti per misurare l&apos;impatto dei progetti finanziati, garantendo che i fondi vengano utilizzati efficacemente per creare valore per l&apos;ecosistema.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Programmi di Finanziamento</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Quadratic Funding</h4>
              <List>
                <li>Votazione con fondi</li>
                <li>Distribuzione democratica</li>
                <li>Supporto community</li>
                <li>Matching funds</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Developer Grants</h4>
              <List>
                <li>Finanziamento progetti</li>
                <li>Supporto sviluppatori</li>
                <li>Open source focus</li>
                <li>Milestone-based</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Bounties</h4>
              <List>
                <li>Task specifici</li>
                <li>Ricompense immediate</li>
                <li>Competizione</li>
                <li>Skill-based</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Hackathons</h4>
              <List>
                <li>Eventi competitivi</li>
                <li>Innovazione</li>
                <li>Premi in denaro</li>
                <li>Networking</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Partecipazione ai Round</h4>
                <List>
                  <li>Partecipa ai round di Quadratic Funding</li>
                  <li>Dona a progetti open source</li>
                  <li>Mantieni un&apos;attività costante</li>
                  <li>Supporta progetti di qualità</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Sviluppo e Contributi</h4>
                <List>
                  <li>Contribuisci a progetti open source</li>
                  <li>Partecipa a hackathons</li>
                  <li>Completa bounties</li>
                  <li>Applica per developer grants</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Community Engagement</h4>
                <List>
                  <li>Partecipa alle discussioni</li>
                  <li>Contribuisci alla governance</li>
                  <li>Partecipa a eventi e AMA</li>
                  <li>Invita nuovi utenti</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a Gitcoin</h4>
                <List>
                  <li>Visita <a href="https://gitcoin.co/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">gitcoin.co</a></li>
                  <li>Connetti il tuo wallet</li>
                  <li>Completa il profilo</li>
                  <li>Esplora i progetti disponibili</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Partecipazione ai Round</h4>
                <List>
                  <li>Seleziona i progetti da supportare</li>
                  <li>Effettua donazioni</li>
                  <li>Partecipa alla votazione</li>
                  <li>Monitora i risultati</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Contributi e Sviluppo</h4>
                <List>
                  <li>Applica per developer grants</li>
                  <li>Partecipa a hackathons</li>
                  <li>Completa bounties</li>
                  <li>Contribuisci a progetti open source</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Ecosistema Gitcoin</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Progetti Supportati">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Beni Pubblici</h4>
              <p className="text-neutral-600">
                Gitcoin supporta una vasta gamma di progetti open source, inclusi protocolli DeFi, strumenti di sviluppo, ricerca, educazione e altre iniziative che beneficiano l&apos;ecosistema Web3.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Community Impact">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Impatto Positivo</h4>
              <p className="text-neutral-600">
                Gitcoin ha finanziato migliaia di progetti e sviluppatori, creando un impatto positivo significativo sull&apos;ecosistema open source e Web3, promuovendo l&apos;innovazione e la collaborazione.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Future Development">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Roadmap</h4>
              <p className="text-neutral-600">
                Gitcoin continua a evolversi, introducendo nuovi meccanismi di finanziamento, migliorando la governance e espandendo il supporto per progetti e sviluppatori nell&apos;ecosistema Web3.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://gitcoin.co/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Gitcoin
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/gitcoin" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/gitcoin" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.gitcoin.co/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🔧</span>
              <a href="https://github.com/gitcoinco" 
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
