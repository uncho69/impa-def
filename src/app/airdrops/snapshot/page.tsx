import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function SnapshotPage() {
  return (
    <>
      <PageTitle description="Piattaforma di governance decentralizzata per DAO">
        Snapshot
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Snapshot</h2>
              <p className="text-neutral-600">DAO • Governance • Voting</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Snapshot</strong> è una piattaforma di governance decentralizzata che permette alle DAO (Decentralized Autonomous Organizations) di creare e gestire proposte di governance, votazioni e decisioni comunitarie. Snapshot utilizza firme off-chain per ridurre i costi e migliorare l&apos;esperienza di governance.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Snapshot</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Governance Decentralizzata">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">DAO Management</h4>
              <p className="text-neutral-600">
                Snapshot permette alle DAO di creare e gestire proposte di governance, votazioni e decisioni comunitarie in modo decentralizzato, facilitando la partecipazione democratica dei token holder.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Off-Chain Voting">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Votazioni Efficaci</h4>
              <p className="text-neutral-600">
                Snapshot utilizza firme off-chain per le votazioni, riducendo drasticamente i costi del gas e permettendo a più utenti di partecipare alla governance senza dover pagare commissioni elevate.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Multi-Chain Support">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Cross-Chain Governance</h4>
              <p className="text-neutral-600">
                Snapshot supporta numerose blockchain, permettendo alle DAO di gestire governance su diverse reti e coinvolgere token holder da diversi ecosistemi.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Strategie di Voto Flessibili">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Voting Strategies</h4>
              <p className="text-neutral-600">
                Snapshot offre diverse strategie di voto, inclusi voting power basato su token, delegazione, quadratic voting e altre metodologie avanzate per una governance più equa e inclusiva.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Integrazione Facile">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Setup Semplificato</h4>
              <p className="text-neutral-600">
                Snapshot rende facile per le DAO configurare e gestire la propria governance, con strumenti intuitivi e documentazione completa per iniziare rapidamente.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Funzionalità della Piattaforma</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Proposte</h4>
              <List>
                <li>Creazione proposte</li>
                <li>Discussioni comunitarie</li>
                <li>Modifiche ai parametri</li>
                <li>Decisioni strategiche</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Votazioni</h4>
              <List>
                <li>Voting off-chain</li>
                <li>Strategie personalizzate</li>
                <li>Delegazione voti</li>
                <li>Risultati trasparenti</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Governance</h4>
              <List>
                <li>Gestione DAO</li>
                <li>Configurazione parametri</li>
                <li>Moderazione contenuti</li>
                <li>Analytics governance</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Integrazione</h4>
              <List>
                <li>API per sviluppatori</li>
                <li>Webhook notifications</li>
                <li>Plugin personalizzati</li>
                <li>Integrazione wallet</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Partecipazione Governance</h4>
                <List>
                  <li>Partecipa a votazioni su Snapshot</li>
                  <li>Vota su proposte di DAO</li>
                  <li>Mantieni un&apos;attività costante</li>
                  <li>Interagisci con diverse DAO</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Creazione di Proposte</h4>
                <List>
                  <li>Crea proposte significative</li>
                  <li>Partecipa alle discussioni</li>
                  <li>Contribuisci allo sviluppo</li>
                  <li>Interagisci con la community</li>
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
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a Snapshot</h4>
                <List>
                  <li>Visita <a href="https://snapshot.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">snapshot.org</a></li>
                  <li>Connetti il tuo wallet</li>
                  <li>Esplora le DAO disponibili</li>
                  <li>Trova le proposte attive</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Partecipazione alle Votazioni</h4>
                <List>
                  <li>Seleziona una proposta interessante</li>
                  <li>Leggi la descrizione completa</li>
                  <li>Partecipa alle discussioni</li>
                  <li>Vota secondo le tue convinzioni</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Creazione di Proposte</h4>
                <List>
                  <li>Assicurati di avere i permessi necessari</li>
                  <li>Crea una proposta ben strutturata</li>
                  <li>Includi dettagli e motivazioni</li>
                  <li>Promuovi la discussione</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>DAO Popolari su Snapshot</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. DeFi DAOs">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Protocolli DeFi</h4>
              <p className="text-neutral-600">
                Snapshot ospita governance per numerosi protocolli DeFi, inclusi Uniswap, Aave, Compound, MakerDAO e molti altri, permettendo ai token holder di partecipare alle decisioni che riguardano questi protocolli.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. NFT DAOs">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Comunità NFT</h4>
              <p className="text-neutral-600">
                Molte comunità NFT utilizzano Snapshot per la governance, permettendo ai holder di NFT di partecipare alle decisioni che riguardano lo sviluppo e la direzione dei progetti.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Infrastructure DAOs">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Infrastruttura</h4>
              <p className="text-neutral-600">
                Snapshot supporta anche DAO di infrastruttura, inclusi progetti di Layer 2, bridge protocols e altri servizi essenziali per l&apos;ecosistema Web3.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://snapshot.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Snapshot
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/SnapshotLabs" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/snapshot" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.snapshot.org/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🔧</span>
              <a href="https://github.com/snapshot-labs" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                GitHub Repository
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
