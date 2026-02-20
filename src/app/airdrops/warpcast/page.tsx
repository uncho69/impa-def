import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function WarpcastPage() {
  return (
    <>
      <PageTitle description="Piattaforma social Web3 decentralizzata">
        Warpcast
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">W</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Warpcast</h2>
              <p className="text-neutral-600">Social • Web3 • Farcaster</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Warpcast</strong> è una piattaforma social Web3 decentralizzata costruita sul protocollo Farcaster. Offre un&apos;esperienza social media decentralizzata dove gli utenti possono interagire, condividere contenuti e partecipare alla community crypto senza la dipendenza da piattaforme centralizzate.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Warpcast</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Social Media Decentralizzato">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Protocollo Farcaster</h4>
              <p className="text-neutral-600">
                Warpcast è costruito sul protocollo Farcaster, che permette un&apos;esperienza social media decentralizzata. Gli utenti mantengono il controllo dei propri dati e possono interagire senza dipendere da server centralizzati.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Community Crypto">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ecosistema Web3</h4>
              <p className="text-neutral-600">
                La piattaforma è focalizzata sulla community crypto e Web3, offrendo un ambiente dove sviluppatori, investitori e appassionati possono condividere conoscenze, discutere progetti e rimanere aggiornati sulle ultime novità del settore.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Interazioni Native">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Funzionalità Social</h4>
              <p className="text-neutral-600">
                Warpcast offre funzionalità social native come post, commenti, like e condivisioni, ma in un ambiente decentralizzato. Gli utenti possono anche utilizzare token e NFT come parte delle loro interazioni social.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Integrazione Wallet">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Connessione Portafoglio</h4>
              <p className="text-neutral-600">
                Gli utenti possono connettere i propri wallet per interagire con token, NFT e altre funzionalità Web3 direttamente dalla piattaforma social.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Funzionalità Social</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Interazioni Base</h4>
              <List>
                <li>Post e aggiornamenti</li>
                <li>Commenti e risposte</li>
                <li>Like e reazioni</li>
                <li>Condivisioni</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Funzionalità Web3</h4>
              <List>
                <li>Connessione wallet</li>
                <li>Token e NFT</li>
                <li>Transazioni social</li>
                <li>Governance partecipativa</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Community</h4>
              <List>
                <li>Gruppi e canali</li>
                <li>Discussioni tematiche</li>
                <li>Eventi e meetup</li>
                <li>Networking professionale</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Contenuti</h4>
              <List>
                <li>Articoli e blog</li>
                <li>Video e media</li>
                <li>Podcast e audio</li>
                <li>Live streaming</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Attività Social</h4>
                <List>
                  <li>Pubblica contenuti regolarmente</li>
                  <li>Interagisci con altri utenti</li>
                  <li>Partecipa a discussioni e community</li>
                  <li>Condividi conoscenze e insights</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Engagement e Qualità</h4>
                <List>
                  <li>Mantieni un engagement consistente</li>
                  <li>Crea contenuti di qualità</li>
                  <li>Partecipa a eventi e campagne</li>
                  <li>Interagisci con la community</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a Warpcast</h4>
                <List>
                  <li>Visita <a href="https://warpcast.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">warpcast.com</a></li>
                  <li>Crea un account o accedi</li>
                  <li>Connetti il tuo wallet se necessario</li>
                  <li>Completa il setup del profilo</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Attività Social</h4>
                <List>
                  <li>Pubblica i tuoi primi post</li>
                  <li>Segui utenti interessanti</li>
                  <li>Partecipa a discussioni</li>
                  <li>Interagisci con contenuti di altri</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Community e Networking</h4>
                <List>
                  <li>Unisciti a gruppi tematici</li>
                  <li>Partecipa a eventi virtuali</li>
                  <li>Condividi le tue conoscenze</li>
                  <li>Costruisci la tua reputazione</li>
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
              <a href="https://warpcast.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Warpcast
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://twitter.com/warpcast_" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">📱</span>
              <a href="https://warpcast.com/download" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                App Mobile
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.farcaster.xyz/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione Farcaster
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
