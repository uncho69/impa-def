import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";

export default function Jumper() {
  return (
    <ProtectedRoute title="Jumper">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={Placeholder} alt="Jumper" width={64} height={64} />
          <div>
            <SectionTitle main={true}>Jumper</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Bridge
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                Multi-Chain
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Swap
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Jumper</strong> è una piattaforma di bridging e swapping multi-chain, alimentata da LI.FI, che permette trasferimenti di token fluidi e senza interruzioni tra diverse blockchain. Jumper si posiziona come un aggregatore di bridge e DEX, semplificando il processo di trasferimento cross-chain grazie all&apos;integrazione di numerose fonti di liquidità.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Aggregazione Multi-Chain" defaultOpen={true}>
            Jumper aggrega multiple soluzioni di bridging e DEX per trovare sempre la rotta migliore e più conveniente per i trasferimenti cross-chain.
          </Accordion>

          <Accordion buttonText="Trasferimenti Fluidi">
            La piattaforma permette trasferimenti di token tra diverse blockchain in modo semplice e intuitivo, eliminando la complessità dei bridge tradizionali.
          </Accordion>

          <Accordion buttonText="Ottimizzazione dei Costi">
            Jumper trova automaticamente la rotta più economica per i tuoi trasferimenti, confrontando commissioni e tempi di diverse soluzioni.
          </Accordion>

          <Accordion buttonText="Supporto Esteso">
            Supporta un ampio numero di blockchain e token, coprendo la maggior parte dell&apos;ecosistema DeFi multi-chain.
          </Accordion>

          <Accordion buttonText="Interfaccia Intuitiva">
            L&apos;interfaccia utente è progettata per essere semplice e accessibile, anche per utenti meno esperti nel bridging cross-chain.
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Accesso alla Piattaforma" defaultOpen={true}>
            <List ordered={true}>
              <li>
                Visita <a href="https://jumper.exchange/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Jumper Exchange</a> per accedere alla piattaforma.
              </li>
              <li>
                Connetti il tuo portafoglio Web3 (MetaMask, WalletConnect, etc.).
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="2. Configurazione del Trasferimento">
            <List ordered={true}>
              <li>
                Seleziona la blockchain di origine e quella di destinazione.
              </li>
              <li>
                Scegli il token che vuoi trasferire e quello che vuoi ricevere.
              </li>
              <li>
                Inserisci l&apos;importo del trasferimento.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="3. Revisione della Rotta">
            <List ordered={true}>
              <li>
                Jumper mostrerà la rotta ottimale con commissioni, tempi stimati e provider utilizzati.
              </li>
              <li>
                Puoi confrontare diverse opzioni se disponibili.
              </li>
              <li>
                Verifica tutti i dettagli prima di procedere.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="4. Esecuzione e Monitoraggio">
            <List ordered={true}>
              <li>
                Conferma la transazione nel tuo portafoglio.
              </li>
              <li>
                Monitora il progresso del trasferimento attraverso la dashboard.
              </li>
              <li>
                Una volta completato, i fondi appariranno nella blockchain di destinazione.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Caratteristiche</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Multi-Chain</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Bridge Aggregator</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">DEX Integration</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Cost Optimization</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://jumper.exchange/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/JumperExchange" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🐦 Twitter/X
                </a>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
