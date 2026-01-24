import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function HyperlanePage() {
  return (
    <>
      <PageTitle description="Protocollo di interoperabilità universale per blockchain">
        Hyperlane
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">H</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Hyperlane</h2>
              <p className="text-neutral-600">Interoperabilità • Cross-Chain • Messaging</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Hyperlane</strong> è un protocollo di interoperabilità universale che permette alle blockchain di comunicare e trasferire dati e asset in modo sicuro e decentralizzato. Hyperlane facilita la connessione tra diverse blockchain, creando un ecosistema Web3 più integrato e interoperabile.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Hyperlane</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Interoperabilità Universale">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Cross-Chain Communication</h4>
              <p className="text-neutral-600">
                Hyperlane permette a qualsiasi blockchain di comunicare con qualsiasi altra blockchain, creando un ecosistema Web3 veramente interoperabile dove dati e asset possono fluire liberamente.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Messaging Sicuro">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Sicurezza Garantita</h4>
              <p className="text-neutral-600">
                Hyperlane utilizza un sistema di validazione decentralizzato e crittografia avanzata per garantire che tutti i messaggi cross-chain siano sicuri, verificati e non manomessi.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Modularità">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Flessibilità</h4>
              <p className="text-neutral-600">
                Hyperlane è progettato per essere modulare, permettendo agli sviluppatori di integrare facilmente l&apos;interoperabilità nelle loro applicazioni senza dover ricostruire l&apos;infrastruttura esistente.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Validatori Decentralizzati">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Consenso Distribuito</h4>
              <p className="text-neutral-600">
                Hyperlane utilizza una rete di validatori decentralizzati per verificare e validare i messaggi cross-chain, garantendo la sicurezza e l&apos;affidabilità del protocollo.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Developer-Friendly">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Facilità di Sviluppo</h4>
              <p className="text-neutral-600">
                Hyperlane offre SDK e strumenti di sviluppo intuitivi, permettendo agli sviluppatori di integrare facilmente l&apos;interoperabilità nelle loro applicazioni decentralizzate.
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
                <li>Avalanche</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Layer 2</h4>
              <List>
                <li>Arbitrum</li>
                <li>Optimism</li>
                <li>Base</li>
                <li>Linea</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">zk-Rollups</h4>
              <List>
                <li>zkSync Era</li>
                <li>Scroll</li>
                <li>Polygon zkEVM</li>
                <li>StarkNet</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Altri</h4>
              <List>
                <li>BNB Chain</li>
                <li>Fantom</li>
                <li>Celo</li>
                <li>Gnosis</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Utilizzo del Protocollo</h4>
                <List>
                  <li>Utilizza applicazioni che integrano Hyperlane</li>
                  <li>Effettua transazioni cross-chain</li>
                  <li>Partecipa a bridge e transfer</li>
                  <li>Interagisci con protocolli interoperabili</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Validazione</h4>
                <List>
                  <li>Diventa un validatore Hyperlane</li>
                  <li>Partecipa alla sicurezza del protocollo</li>
                  <li>Guadagna ricompense per la validazione</li>
                  <li>Contribuisci alla decentralizzazione</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Sviluppo</h4>
                <List>
                  <li>Sviluppa applicazioni che utilizzano Hyperlane</li>
                  <li>Contribuisci al codice open source</li>
                  <li>Partecipa ai programmi per sviluppatori</li>
                  <li>Interagisci con la community</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a Hyperlane</h4>
                <List>
                  <li>Visita <a href="https://hyperlane.xyz/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">hyperlane.xyz</a></li>
                  <li>Esplora le applicazioni integrate</li>
                  <li>Connetti il tuo wallet</li>
                  <li>Testa le funzionalità cross-chain</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Transazioni Cross-Chain</h4>
                <List>
                  <li>Seleziona le blockchain di origine e destinazione</li>
                  <li>Inserisci l&apos;importo da trasferire</li>
                  <li>Conferma la transazione</li>
                  <li>Monitora lo stato del transfer</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Sviluppo dApp</h4>
                <List>
                  <li>Scarica l&apos;SDK Hyperlane</li>
                  <li>Integra l&apos;interoperabilità nella tua dApp</li>
                  <li>Testa le funzionalità cross-chain</li>
                  <li>Deploy su blockchain supportate</li>
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
              <a href="https://hyperlane.xyz/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Hyperlane
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/hyperlane_xyz" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/hyperlane" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.hyperlane.xyz/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🔧</span>
              <a href="https://github.com/hyperlane-xyz" 
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
