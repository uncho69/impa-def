import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";


export default function Airdrops() {
  return (
    <ProtectedRoute title="Airdrops">
      <PageTitle description="Token gratuiti distribuiti ai primi utenti dei progetti Web3">
        Airdrops
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          Un&apos; <strong>Airdrop</strong> è quando un progetto Web3 fino ad ora senza token, lancia il proprio token e ne distribuisce una parte agli utenti della sua piattaforma/tecnologia (in regalo). La quantità ed il valore di questi token ricevuti da ogni utente solitamente varia tra i $100 e i $50,000, in base alle attività fatte dall&apos;utente sulla piattaforma e dai criteri di distribuzione scelti dal team del progetto.
          
          <Accordion buttonText="Cosa sono le Airdrop e come guadagnarci?">
            Un&apos; &quot;Airdrop&quot; è quando un progetto Web3 fino ad ora senza token, lancia il proprio token e ne distribuisce una parte agli utenti della sua piattaforma/tecnologia (in regalo). La quantità ed il valore di questi token ricevuti da ogni utente solitamente varia tra i $100 e i $50,000, in base alle attività fatte dall&apos;utente sulla piattaforma e dai criteri di distribuzione scelti dal team del progetto.
          </Accordion>
        </SectionBody>

        <SectionTitle>Come Funzionano gli Airdrops</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Alta Ricompensa, Basso Rischio</h3>
              <p className="text-gray-600">
                Utilizzare progetti che ancora non hanno rilasciato il proprio token offre quindi un&apos;alta ricompensa a basso rischio, diventando molto profittevole se fatto nella giusta maniera.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Costi Principali</h3>
              <p className="text-gray-600">
                Il costo principale di questa attività sono i costi di transazione, principalmente in gas fees. Questi sono generalmente molto bassi rispetto al potenziale valore dell&apos;airdrop.
              </p>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Criteri di Eligibilità</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Volume di Trading">
            Il volume totale delle transazioni che hai fatto sulla piattaforma. Più alto è il volume, maggiore è la probabilità di ricevere un airdrop più consistente.
          </Accordion>
          
          <Accordion buttonText="Numero di Transazioni">
            Quante transazioni individuali hai completato. La frequenza delle interazioni è importante per dimostrare il tuo impegno con la piattaforma.
          </Accordion>
          
          <Accordion buttonText="Periodicità">
            Con che regolarità interagisci con la piattaforma nel tempo. L&apos;uso costante e regolare è spesso premiato più dell&apos;uso sporadico.
          </Accordion>
        </SectionBody>

        <SectionTitle>Progetti Senza Token (Potenziali Airdrop)</SectionTitle>
        <SectionBody>
          <Accordion buttonText="LayerZero">
            Protocollo per la comunicazione tra blockchain diverse. Molto utilizzato per bridge e cross-chain swaps. Ha già annunciato un potenziale airdrop per i suoi utenti attivi.
          </Accordion>
          
          <Accordion buttonText="GetGrass">
            Piattaforma DePIN che permette di guadagnare token contribuendo alla rete. Gli utenti che forniscono risorse computazionali potrebbero ricevere token in futuro.
          </Accordion>
          
          <Accordion buttonText="Nifty Island">
            Piattaforma di gaming e metaverso con meccaniche play-to-earn e potenziali airdrop. Gli utenti attivi potrebbero ricevere token della piattaforma.
          </Accordion>
          
          <Accordion buttonText="Hyperlane">
            Protocollo per l&apos;interoperabilità tra blockchain con quest per potenziali airdrop. Gli utenti che completano le quest potrebbero ricevere token in futuro.
          </Accordion>
        </SectionBody>

        <SectionTitle>Strategie per Massimizzare gli Airdrops</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Early Adoption">
            <div className="space-y-3">
              <p>• Partecipa ai progetti nelle fasi iniziali</p>
              <p>• Testa le funzionalità beta</p>
              <p>• Fornisci feedback alla community</p>
              <p>• Partecipa alle discussioni sui social</p>
            </div>
          </Accordion>
          
          <Accordion buttonText="Consistent Activity">
            <div className="space-y-3">
              <p>• Usa regolarmente la piattaforma</p>
              <p>• Mantieni un volume di trading costante</p>
              <p>• Partecipa a eventi e campagne</p>
              <p>• Interagisci con la community</p>
            </div>
          </Accordion>
          
          <Accordion buttonText="Diversificazione">
            <div className="space-y-3">
              <p>• Non concentrarti su un solo progetto</p>
              <p>• Esplora diversi ecosistemi</p>
              <p>• Partecipa a progetti su diverse blockchain</p>
              <p>• Mantieni un portafoglio diversificato</p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>⚠️ Attenzione alle Truffe</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Fake Airdrop Scams">
            <List>
              <li>Le truffe di airdrop falsi sono molto comuni</li>
              <li>Non rivelare mai le tue private keys</li>
              <li>Non firmare transazioni sospette</li>
              <li>Partecipa solo ad airdrop da fonti affidabili</li>
              <li>Verifica sempre l'autenticità tramite canali ufficiali</li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🔗</span>
              <a href="https://www.coinbase.com/en-gb/learn/crypto-basics/what-is-a-crypto-airdrop" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Coinbase Guide: What is a Crypto Airdrop
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">📱</span>
              <span className="text-gray-700">Seguici sui social per aggiornamenti sui nuovi airdrop</span>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
