import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function BongBearsPage() {
  return (
    <ProtectedRoute title="Bong Bears - Airdrop">
      <PageTitle description="Collezione NFT e community su Solana">
        Bong Bears
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">B</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Bong Bears</h2>
              <p className="text-neutral-600">NFT • Solana • Community</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Bong Bears</strong> è una collezione NFT su Solana che combina arte digitale, community building e utility token. La collezione presenta orsi stilizzati con diverse caratteristiche e rarità, creando un ecosistema NFT che include gaming, staking e opportunità di guadagno per i holder.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Bong Bears</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Collezione NFT">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Digital Art</h4>
              <p className="text-neutral-600">
                Bong Bears è una collezione di 10,000 NFT unici su Solana, ognuno con caratteristiche diverse e livelli di rarità variabili, creando un ecosistema di arte digitale collezionabile.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Community-Driven">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Community Building</h4>
              <p className="text-neutral-600">
                Bong Bears si concentra sulla costruzione di una community forte e coinvolta, con holder che partecipano a eventi, discussioni e attività che aggiungono valore all&apos;ecosistema NFT.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Utility Token">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Token Economics</h4>
              <p className="text-neutral-600">
                Bong Bears include un token di utility che i holder possono guadagnare attraverso staking, gaming e partecipazione alla community, creando un ecosistema economico sostenibile.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Gaming Integration">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Play-to-Earn</h4>
              <p className="text-neutral-600">
                Bong Bears include elementi di gaming e play-to-earn, permettendo ai holder di utilizzare i propri NFT per partecipare a giochi e guadagnare ricompense.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Staking Rewards">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Passive Income</h4>
              <p className="text-neutral-600">
                I holder di Bong Bears possono fare staking dei propri NFT per guadagnare token di utility e altre ricompense, creando un flusso di reddito passivo.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Caratteristiche degli NFT</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Traits</h4>
              <List>
                <li>Background colors</li>
                <li>Fur patterns</li>
                <li>Accessories</li>
                <li>Facial expressions</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Rarity</h4>
              <List>
                <li>Common traits</li>
                <li>Rare combinations</li>
                <li>Legendary features</li>
                <li>One-of-a-kind</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Utility</h4>
              <List>
                <li>Staking rewards</li>
                <li>Gaming benefits</li>
                <li>Community access</li>
                <li>Future airdrops</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Benefits</h4>
              <List>
                <li>Exclusive events</li>
                <li>Merchandise access</li>
                <li>Governance rights</li>
                <li>Premium features</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Possesso di NFT</h4>
                <List>
                  <li>Acquista Bong Bears NFT</li>
                  <li>Mantieni gli NFT per periodi significativi</li>
                  <li>Possiedi NFT rari e di valore</li>
                  <li>Partecipa a collezioni multiple</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Attività di Staking</h4>
                <List>
                  <li>Fai staking dei tuoi NFT</li>
                  <li>Mantieni posizioni di staking</li>
                  <li>Partecipa a programmi di incentivazione</li>
                  <li>Guadagna token di utility</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Community Engagement</h4>
                <List>
                  <li>Partecipa alle discussioni</li>
                  <li>Contribuisci alla community</li>
                  <li>Partecipa a eventi e AMA</li>
                  <li>Invita nuovi membri</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Acquisto di NFT</h4>
                <List>
                  <li>Visita <a href="https://bongbears.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">bongbears.com</a></li>
                  <li>Connetti il tuo wallet Solana</li>
                  <li>Scegli gli NFT che preferisci</li>
                  <li>Completa l&apos;acquisto</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Staking di NFT</h4>
                <List>
                  <li>Accedi alla sezione staking</li>
                  <li>Seleziona gli NFT da fare staking</li>
                  <li>Conferma la transazione</li>
                  <li>Inizia a guadagnare ricompense</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Partecipazione Community</h4>
                <List>
                  <li>Unisciti al Discord</li>
                  <li>Segui i social media</li>
                  <li>Partecipa agli eventi</li>
                  <li>Interagisci con altri holder</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Ecosistema Bong Bears</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Token Utility">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Token Economics</h4>
              <p className="text-neutral-600">
                Bong Bears include un token di utility che i holder possono utilizzare per accedere a funzionalità premium, partecipare a governance e ottenere benefici esclusivi nell&apos;ecosistema.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Gaming Features">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Play-to-Earn</h4>
              <p className="text-neutral-600">
                Bong Bears include elementi di gaming che permettono ai holder di utilizzare i propri NFT per partecipare a giochi e guadagnare ricompense aggiuntive.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Future Development">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Roadmap</h4>
              <p className="text-neutral-600">
                Bong Bears ha una roadmap ambiziosa che include nuove funzionalità, partnership, espansioni dell&apos;ecosistema e opportunità di guadagno per i holder.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://bongbears.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Bong Bears
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/bongbears" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/bongbears" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">🛒</span>
              <a href="https://magiceden.io/collections/bongbears" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Magic Eden Marketplace
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">📊</span>
              <a href="https://bongbears.com/staking" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Staking Platform
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
