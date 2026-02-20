import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function NiftyIslandPage() {
  return (
    <>
      <PageTitle description="Metaverso e piattaforma di gaming NFT">
        Nifty Island
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">N</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Nifty Island</h2>
              <p className="text-neutral-600">Metaverse • Gaming • NFT</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Nifty Island</strong> è un metaverso e piattaforma di gaming NFT che permette agli utenti di creare, esplorare e interagire in mondi virtuali utilizzando NFT. Nifty Island combina gaming, social interaction e creatività in un ecosistema decentralizzato dove gli utenti possono possedere e personalizzare le proprie isole virtuali.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Nifty Island</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Metaverso NFT">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Virtual Worlds</h4>
              <p className="text-neutral-600">
                Nifty Island permette agli utenti di creare e possedere isole virtuali utilizzando NFT, dove possono costruire, personalizzare e interagire con altri giocatori in un metaverso decentralizzato.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Gaming e Social">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Interazione Sociale</h4>
              <p className="text-neutral-600">
                Nifty Island combina elementi di gaming e social interaction, permettendo agli utenti di giocare, chattare, collaborare e competere in un ambiente virtuale immersivo e coinvolgente.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Creatività e Personalizzazione">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Customization</h4>
              <p className="text-neutral-600">
                Gli utenti possono personalizzare completamente le proprie isole, creare contenuti unici, costruire strutture e decorazioni, e condividere le loro creazioni con la community.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. NFT Integration">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Digital Ownership</h4>
              <p className="text-neutral-600">
                Nifty Island integra NFT per la proprietà digitale, permettendo agli utenti di possedere, scambiare e monetizzare le proprie creazioni virtuali e asset del metaverso.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Play-to-Earn">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Earning Opportunities</h4>
              <p className="text-neutral-600">
                Nifty Island offre opportunità di guadagno attraverso il play-to-earn, permettendo agli utenti di guadagnare token e NFT partecipando a giochi, eventi e attività del metaverso.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Funzionalità del Metaverso</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Creazione</h4>
              <List>
                <li>Costruzione di isole</li>
                <li>Personalizzazione ambienti</li>
                <li>Creazione di contenuti</li>
                <li>Design di strutture</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Gaming</h4>
              <List>
                <li>Mini-giochi</li>
                <li>Competizioni</li>
                <li>Eventi speciali</li>
                <li>Challenges</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Social</h4>
              <List>
                <li>Chat e comunicazione</li>
                <li>Collaborazione</li>
                <li>Community events</li>
                <li>Networking</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Economia</h4>
              <List>
                <li>NFT marketplace</li>
                <li>Token rewards</li>
                <li>Trading di asset</li>
                <li>Monetizzazione</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Attività di Gaming</h4>
                <List>
                  <li>Gioca regolarmente su Nifty Island</li>
                  <li>Partecipa a eventi e competizioni</li>
                  <li>Completa quest e challenges</li>
                  <li>Mantieni un&apos;attività costante</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Creazione di Contenuti</h4>
                <List>
                  <li>Crea e personalizza isole</li>
                  <li>Partecipa a programmi per creator</li>
                  <li>Condividi contenuti con la community</li>
                  <li>Interagisci con altri utenti</li>
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
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a Nifty Island</h4>
                <List>
                  <li>Visita <a href="https://niftyisland.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">niftyisland.com</a></li>
                  <li>Connetti il tuo wallet</li>
                  <li>Completa il setup del profilo</li>
                  <li>Esplora il metaverso</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Creazione di Isole</h4>
                <List>
                  <li>Acquista o ottieni un&apos;isola NFT</li>
                  <li>Personalizza l&apos;ambiente</li>
                  <li>Costruisci strutture e decorazioni</li>
                  <li>Condividi con la community</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Gaming e Social</h4>
                <List>
                  <li>Partecipa a mini-giochi</li>
                  <li>Interagisci con altri giocatori</li>
                  <li>Partecipa a eventi speciali</li>
                  <li>Guadagna token e NFT</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Ecosistema NFT</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Island NFTs">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Proprietà Virtuale</h4>
              <p className="text-neutral-600">
                Le isole in Nifty Island sono rappresentate come NFT, permettendo agli utenti di possedere, scambiare e monetizzare le proprie proprietà virtuali nel metaverso.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Asset NFTs">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Digital Assets</h4>
              <p className="text-neutral-600">
                Nifty Island supporta vari tipi di NFT, inclusi avatar, oggetti, strutture e decorazioni, che gli utenti possono utilizzare per personalizzare le proprie isole e creare esperienze uniche.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Marketplace">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Trading Platform</h4>
              <p className="text-neutral-600">
                Nifty Island include un marketplace integrato dove gli utenti possono acquistare, vendere e scambiare NFT e asset del metaverso, creando un&apos;economia virtuale sostenibile.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://niftyisland.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Nifty Island
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/niftyisland" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/niftyisland" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.niftyisland.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🎮</span>
              <a href="https://niftyisland.com/play" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Inizia a Giocare
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
