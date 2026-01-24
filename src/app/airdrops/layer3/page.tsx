import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function Layer3Page() {
  return (
    <>
      <PageTitle description="Piattaforma di gamification per Web3 e DeFi">
        Layer3
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">L</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Layer3</h2>
              <p className="text-neutral-600">Gamification • Web3 • DeFi</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Layer3</strong> è una piattaforma di gamification per Web3 e DeFi che trasforma le attività crypto in esperienze coinvolgenti e ricompensanti. Layer3 utilizza meccaniche di gioco, quest e ricompense per incentivizzare l&apos;adozione e l&apos;utilizzo di protocolli DeFi e applicazioni Web3.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Layer3</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Gamification Web3">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Esperienze Coinvolgenti</h4>
              <p className="text-neutral-600">
                Layer3 trasforma le attività crypto in esperienze gamificate, utilizzando quest, achievement, livelli e ricompense per rendere l&apos;interazione con protocolli DeFi più coinvolgente e divertente.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Quest e Missioni">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Attività Strutturate</h4>
              <p className="text-neutral-600">
                Layer3 offre una vasta gamma di quest e missioni che guidano gli utenti attraverso diverse attività Web3, dall&apos;utilizzo di protocolli DeFi alla partecipazione a governance e community.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Ricompense e Incentivi">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Sistema di Ricompense</h4>
              <p className="text-neutral-600">
                Gli utenti guadagnano ricompense per completare quest e attività, inclusi token, NFT, punti esperienza e accesso a funzionalità premium, creando un ecosistema di incentivi sostenibile.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Integrazione Protocolli">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ecosistema DeFi</h4>
              <p className="text-neutral-600">
                Layer3 si integra con numerosi protocolli DeFi e applicazioni Web3, permettendo agli utenti di scoprire e utilizzare nuove piattaforme attraverso esperienze gamificate.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Community e Social">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Interazione Sociale</h4>
              <p className="text-neutral-600">
                Layer3 include funzionalità sociali che permettono agli utenti di competere, collaborare e condividere i loro successi, creando una community attiva e coinvolta.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Tipi di Quest e Attività</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">DeFi Quest</h4>
              <List>
                <li>Swap di token</li>
                <li>Fornitura di liquidità</li>
                <li>Yield farming</li>
                <li>Staking e governance</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">NFT Quest</h4>
              <List>
                <li>Acquisto e vendita NFT</li>
                <li>Partecipazione a collezioni</li>
                <li>Creazione di contenuti</li>
                <li>Community engagement</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Bridge Quest</h4>
              <List>
                <li>Cross-chain transfers</li>
                <li>Bridge di asset</li>
                <li>Multi-chain activities</li>
                <li>Interoperabilità</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Social Quest</h4>
              <List>
                <li>Social media engagement</li>
                <li>Community participation</li>
                <li>Content creation</li>
                <li>Referral programs</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Completamento Quest</h4>
                <List>
                  <li>Completa il maggior numero di quest</li>
                  <li>Partecipa a missioni speciali</li>
                  <li>Mantieni un&apos;attività costante</li>
                  <li>Esplora nuove attività e protocolli</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Volume e Frequenza</h4>
                <List>
                  <li>Utilizza volumi significativi</li>
                  <li>Partecipa regolarmente alle attività</li>
                  <li>Completa quest di alto valore</li>
                  <li>Partecipa a eventi speciali</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Community Engagement</h4>
                <List>
                  <li>Partecipa alle discussioni</li>
                  <li>Contribuisci alla community</li>
                  <li>Invita nuovi utenti</li>
                  <li>Partecipa a eventi e AMA</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a Layer3</h4>
                <List>
                  <li>Visita <a href="https://layer3.xyz/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">layer3.xyz</a></li>
                  <li>Connetti il tuo wallet</li>
                  <li>Completa il profilo</li>
                  <li>Esplora le quest disponibili</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Completamento Quest</h4>
                <List>
                  <li>Seleziona una quest interessante</li>
                  <li>Leggi i requisiti e le istruzioni</li>
                  <li>Completa le attività richieste</li>
                  <li>Verifica il completamento</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Gestione Ricompense</h4>
                <List>
                  <li>Raccogli le ricompense guadagnate</li>
                  <li>Partecipa a programmi di staking</li>
                  <li>Utilizza i punti per benefici</li>
                  <li>Partecipa a eventi speciali</li>
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
              <a href="https://layer3.xyz/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Layer3
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/Layer3xyz" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/layer3" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.layer3.xyz/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🎮</span>
              <a href="https://layer3.xyz/quests" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Quest Disponibili
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
