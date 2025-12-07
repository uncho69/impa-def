import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function OpenSeaPage() {
  return (
    <ProtectedRoute title="OpenSea - Airdrop">
      <PageTitle description="Marketplace leader per NFT e oggetti digitali">
        OpenSea
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">O</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">OpenSea</h2>
              <p className="text-neutral-600">NFT • Marketplace • Web3</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>OpenSea</strong> è il marketplace leader per NFT, fondato nel 2017, che ha abilitato la creazione, vendita e scoperta di oggetti digitali unici. OpenSea ha giocato un ruolo fondamentale nella crescita dell&apos;ecosistema NFT, offrendo una piattaforma accessibile per artisti, collezionisti e investitori.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di OpenSea</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Marketplace Globale">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Piattaforma Leader</h4>
              <p className="text-neutral-600">
                OpenSea è il più grande marketplace NFT al mondo, con milioni di utenti attivi e migliaia di collezioni. La piattaforma supporta NFT su Ethereum, Polygon, Solana, Base e altre blockchain.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Creazione NFT">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Minting Facile</h4>
              <p className="text-neutral-600">
                OpenSea permette agli utenti di creare NFT facilmente senza conoscenze tecniche avanzate. Il processo di minting è guidato e accessibile, permettendo a chiunque di entrare nel mondo degli NFT.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Trading e Vendite">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Mercato Liquido</h4>
              <p className="text-neutral-600">
                OpenSea offre un mercato liquido per il trading di NFT, con funzionalità come offerte, aste, vendite istantanee e bundle. Gli utenti possono comprare e vendere NFT con facilità.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Scoperta e Cura">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Esplorazione</h4>
              <p className="text-neutral-600">
                OpenSea offre strumenti avanzati per scoprire nuove collezioni, artisti e trend. La piattaforma include funzionalità di ricerca, filtri e raccomandazioni personalizzate.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Multi-Chain Support">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Interoperabilità</h4>
              <p className="text-neutral-600">
                OpenSea supporta NFT su multiple blockchain, permettendo agli utenti di accedere a diverse collezioni e mercati da un&apos;unica piattaforma.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Blockchain Supportate</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Layer 1</h4>
              <List>
                <li>Ethereum</li>
                <li>Solana</li>
                <li>Polygon</li>
                <li>BNB Smart Chain</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Layer 2</h4>
              <List>
                <li>Base</li>
                <li>Arbitrum</li>
                <li>Optimism</li>
                <li>Linea</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Altri</h4>
              <List>
                <li>Avalanche</li>
                <li>Fantom</li>
                <li>Celo</li>
                <li>Gnosis</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Standard NFT</h4>
              <List>
                <li>ERC-721</li>
                <li>ERC-1155</li>
                <li>SPL (Solana)</li>
                <li>Altri standard</li>
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
                  <li>Compra e vendi NFT regolarmente</li>
                  <li>Partecipa a aste e offerte</li>
                  <li>Utilizza volumi significativi</li>
                  <li>Interagisci con diverse collezioni</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Creazione di Contenuti</h4>
                <List>
                  <li>Crea e mint NFT</li>
                  <li>Partecipa a programmi per creator</li>
                  <li>Costruisci una community</li>
                  <li>Interagisci con altri artisti</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Community Engagement</h4>
                <List>
                  <li>Segui i canali ufficiali</li>
                  <li>Partecipa a eventi e AMA</li>
                  <li>Contribuisci alla community</li>
                  <li>Mantieni un&apos;attività costante</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Setup Account</h4>
                <List>
                  <li>Visita <a href="https://opensea.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">opensea.io</a></li>
                  <li>Connetti il tuo wallet</li>
                  <li>Completa il profilo</li>
                  <li>Verifica l&apos;account</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Trading NFT</h4>
                <List>
                  <li>Esplora le collezioni</li>
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
                  <li>Configura i metadati</li>
                  <li>Mint il tuo NFT</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Funzionalità Avanzate</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Bundle e Offerte">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Trading Avanzato</h4>
              <p className="text-neutral-600">
                OpenSea offre funzionalità avanzate come bundle di NFT, offerte su collezioni intere, e trading programmato, permettendo strategie di trading più sofisticate.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Analytics e Insights">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Dati di Mercato</h4>
              <p className="text-neutral-600">
                OpenSea fornisce analytics dettagliate su prezzi, volumi, e trend del mercato NFT, aiutando utenti e investitori a prendere decisioni informate.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. API e Integrazioni">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Sviluppo</h4>
              <p className="text-neutral-600">
                OpenSea offre API robuste per sviluppatori, permettendo l&apos;integrazione di funzionalità NFT in applicazioni e piattaforme terze.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://opensea.io/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale OpenSea
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/opensea" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/opensea" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.opensea.io/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione API
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">📊</span>
              <a href="https://opensea.io/rankings" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Rankings e Analytics
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
