import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function BlastPage() {
  return (
    <>
      <PageTitle description="Layer 2 di Ethereum con yield nativo">
        Blast
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">B</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Blast</h2>
              <p className="text-neutral-600">Layer 2 • Ethereum • Yield</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Blast</strong> è un Layer 2 di Ethereum che offre yield nativo per ETH e stablecoin. Blast è progettato per essere il primo Layer 2 con yield nativo, permettendo agli utenti di guadagnare automaticamente sui propri asset depositati mentre utilizzano le applicazioni DeFi sulla rete.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Blast</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Native Yield">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Yield Automatico</h4>
              <p className="text-neutral-600">
                Blast è il primo Layer 2 con yield nativo, permettendo agli utenti di guadagnare automaticamente sui propri ETH e stablecoin depositati, senza dover partecipare attivamente a protocolli DeFi.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Built on Ethereum">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ethereum L2</h4>
              <p className="text-neutral-600">
                Blast è costruito su Ethereum come Layer 2, mantenendo la sicurezza della rete principale mentre offre transazioni più veloci e costi più bassi per gli utenti.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. EVM Compatible">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ethereum Compatibility</h4>
              <p className="text-neutral-600">
                Blast è completamente compatibile con Ethereum Virtual Machine (EVM), permettendo agli sviluppatori di migrare facilmente le loro dApp da Ethereum senza modifiche al codice.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Automatic Rebasing">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Rebase Automatico</h4>
              <p className="text-neutral-600">
                Blast utilizza un sistema di rebasing automatico per distribuire gli yield agli utenti, garantendo che tutti i depositanti ricevano la loro parte proporzionale dei rendimenti.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Developer Friendly">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Facilità di Sviluppo</h4>
              <p className="text-neutral-600">
                Blast offre strumenti e SDK per sviluppatori, rendendo facile la creazione e il deployment di applicazioni DeFi che sfruttano il yield nativo della rete.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Come Funziona il Native Yield</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">ETH Yield</h4>
              <List>
                <li>Staking automatico</li>
                <li>Rebasing periodico</li>
                <li>Yield distribuito</li>
                <li>Compounding automatico</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Stablecoin Yield</h4>
              <List>
                <li>Lending protocols</li>
                <li>Yield farming</li>
                <li>Rebasing automatico</li>
                <li>Rendimenti stabili</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Meccanismo</h4>
              <List>
                <li>Depositi automatici</li>
                <li>Strategie ottimizzate</li>
                <li>Risk management</li>
                <li>Performance tracking</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Benefici</h4>
              <List>
                <li>Yield passivo</li>
                <li>Nessuna azione richiesta</li>
                <li>Rendimenti competitivi</li>
                <li>Trasparenza completa</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Depositi su Blast</h4>
                <List>
                  <li>Deposita ETH su Blast</li>
                  <li>Deposita stablecoin (USDB)</li>
                  <li>Mantieni depositi per periodi significativi</li>
                  <li>Utilizza volumi consistenti</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Attività DeFi</h4>
                <List>
                  <li>Utilizza protocolli DeFi su Blast</li>
                  <li>Partecipa a lending e borrowing</li>
                  <li>Fai yield farming</li>
                  <li>Interagisci con dApp native</li>
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
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a Blast</h4>
                <List>
                  <li>Visita <a href="https://blast.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">blast.io</a></li>
                  <li>Connetti il tuo wallet</li>
                  <li>Configura la rete Blast</li>
                  <li>Esplora le funzionalità</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Depositi e Yield</h4>
                <List>
                  <li>Deposita ETH per yield automatico</li>
                  <li>Deposita stablecoin per USDB</li>
                  <li>Monitora i rendimenti</li>
                  <li>Gestisci i tuoi asset</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Utilizzo DeFi</h4>
                <List>
                  <li>Esplora i protocolli disponibili</li>
                  <li>Partecipa a lending e borrowing</li>
                  <li>Fai yield farming</li>
                  <li>Interagisci con dApp native</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Ecosistema Blast</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Protocolli DeFi">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ecosistema in Crescita</h4>
              <p className="text-neutral-600">
                Blast sta attirando numerosi protocolli DeFi che sfruttano il yield nativo, creando un ecosistema ricco di opportunità per utenti e sviluppatori.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Developer Tools">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Strumenti di Sviluppo</h4>
              <p className="text-neutral-600">
                Blast offre SDK, documentazione e strumenti per sviluppatori, rendendo facile la creazione di applicazioni che sfruttano il yield nativo della rete.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Future Development">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Roadmap</h4>
              <p className="text-neutral-600">
                Blast ha una roadmap ambiziosa che include nuove funzionalità, protocolli DeFi, partnership e miglioramenti al sistema di yield nativo.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://blast.io/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Blast
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/Blast_L2" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/blast" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.blast.io/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🔧</span>
              <a href="https://blast.io/developers" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Developer Portal
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
