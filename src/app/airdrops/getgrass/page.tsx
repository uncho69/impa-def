import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function GetgrassPage() {
  return (
    <ProtectedRoute title="Getgrass - Airdrop">
      <PageTitle description="Piattaforma DePIN per guadagnare token con risorse computazionali">
        Getgrass
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">G</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Getgrass</h2>
              <p className="text-neutral-600">DePIN • AI • Computing</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Getgrass</strong> è una piattaforma DePIN (Decentralized Physical Infrastructure Network) che permette agli utenti di guadagnare token contribuendo alla rete con le proprie risorse computazionali. Getgrass utilizza l&apos;intelligenza artificiale e il machine learning per creare una rete decentralizzata di computing power.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Getgrass</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. DePIN Network">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Infrastruttura Decentralizzata</h4>
              <p className="text-neutral-600">
                Getgrass crea una rete decentralizzata di infrastruttura fisica, permettendo agli utenti di contribuire con le proprie risorse computazionali per supportare applicazioni AI e machine learning.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. AI e Machine Learning">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Computing Power</h4>
              <p className="text-neutral-600">
                La piattaforma utilizza le risorse computazionali degli utenti per supportare modelli di intelligenza artificiale, training di machine learning e altre applicazioni che richiedono potenza di calcolo.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Token Rewards">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Sistema di Ricompense</h4>
              <p className="text-neutral-600">
                Gli utenti guadagnano token GRASS per aver contribuito con le proprie risorse computazionali alla rete, creando un sistema di incentivi sostenibile per la partecipazione.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Accessibilità">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Facile Partecipazione</h4>
              <p className="text-neutral-600">
                Getgrass è progettato per essere accessibile a tutti, permettendo a chiunque con un computer di partecipare alla rete e guadagnare token contribuendo con le proprie risorse.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Sostenibilità">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Efficienza Energetica</h4>
              <p className="text-neutral-600">
                Getgrass ottimizza l&apos;utilizzo delle risorse computazionali esistenti, riducendo la necessità di nuovi data center e promuovendo un approccio più sostenibile al computing.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Come Funziona Getgrass</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Contribuzione</h4>
              <List>
                <li>Installa l&apos;app Getgrass</li>
                <li>Condividi risorse computazionali</li>
                <li>Supporta modelli AI</li>
                <li>Guadagna token GRASS</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Utilizzo</h4>
              <List>
                <li>Training di modelli ML</li>
                <li>Inferenza AI</li>
                <li>Elaborazione dati</li>
                <li>Computing distribuito</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Ricompense</h4>
              <List>
                <li>Token GRASS</li>
                <li>Punti di reputazione</li>
                <li>Accesso premium</li>
                <li>Benefici esclusivi</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Sicurezza</h4>
              <List>
                <li>Validazione decentralizzata</li>
                <li>Protezione privacy</li>
                <li>Controllo risorse</li>
                <li>Monitoraggio trasparente</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Contribuzione Attiva</h4>
                <List>
                  <li>Installa e utilizza l&apos;app Getgrass</li>
                  <li>Mantieni il computer attivo per il mining</li>
                  <li>Contribuisci con risorse significative</li>
                  <li>Partecipa regolarmente alla rete</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Volume e Frequenza</h4>
                <List>
                  <li>Mantieni un&apos;attività costante</li>
                  <li>Utilizza hardware performante</li>
                  <li>Partecipa a programmi speciali</li>
                  <li>Interagisci con la community</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Community Engagement</h4>
                <List>
                  <li>Partecipa alle discussioni</li>
                  <li>Contribuisci allo sviluppo</li>
                  <li>Invita nuovi utenti</li>
                  <li>Partecipa a eventi e AMA</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Setup Iniziale</h4>
                <List>
                  <li>Visita <a href="https://getgrass.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">getgrass.io</a></li>
                  <li>Scarica l&apos;applicazione</li>
                  <li>Registrati e verifica l&apos;account</li>
                  <li>Configura le impostazioni di mining</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Mining e Contribuzione</h4>
                <List>
                  <li>Avvia l&apos;applicazione</li>
                  <li>Seleziona le risorse da condividere</li>
                  <li>Imposta i limiti di utilizzo</li>
                  <li>Monitora le performance</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Gestione Ricompense</h4>
                <List>
                  <li>Raccogli i token GRASS guadagnati</li>
                  <li>Partecipa a programmi di staking</li>
                  <li>Utilizza i token per benefici</li>
                  <li>Partecipa alla governance</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Requisiti di Sistema</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Hardware Minimo">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Specifiche Base</h4>
              <p className="text-neutral-600">
                Per partecipare a Getgrass è necessario un computer con almeno 4GB di RAM, 10GB di spazio libero e una connessione internet stabile. Le performance migliori si ottengono con hardware più potente.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Sistema Operativo">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Compatibilità</h4>
              <p className="text-neutral-600">
                Getgrass supporta Windows, macOS e Linux, permettendo a utenti con diversi sistemi operativi di partecipare alla rete e contribuire con le proprie risorse computazionali.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Connessione Internet">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Requisiti di Rete</h4>
              <p className="text-neutral-600">
                È necessaria una connessione internet stabile per partecipare efficacemente alla rete Getgrass. Una connessione più veloce permette di contribuire con più risorse e guadagnare più token.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://getgrass.io/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Getgrass
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/getgrass_io" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/getgrass" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.getgrass.io/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">📱</span>
              <a href="https://getgrass.io/download" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Download App
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
