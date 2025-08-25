import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";

export default function Yearn() {
  return (
    <ProtectedRoute title="Yearn Finance">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={Placeholder} alt="Yearn Finance" width={64} height={64} />
          <div>
            <SectionTitle>Yearn Finance</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Yield Farming
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                Vaults
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Ethereum
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Yearn Finance</strong> è una piattaforma di finanza decentralizzata (DeFi) basata su Ethereum che offre una suite di prodotti per ottimizzare il rendimento delle criptovalute attraverso strategie automatizzate. Fondata da Andre Cronje, Yearn Finance è affermata rapidamente come uno dei principali protocolli DeFi, grazie alla sua interfaccia user-friendly e alle sue solide funzionalità di governance.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Yearn Vaults" defaultOpen={true}>
            I Vaults sono pool di capitali con strategie di rendimento associate che eseguono automaticamente più complesse attività DeFi per ottimizzare i rendimenti degli utenti.
          </Accordion>

          <Accordion buttonText="Strategie Automatizzate">
            Yearn automatizza il processo di ricerca delle migliori opportunità di rendimento, reinvestendo automaticamente i guadagni per massimizzare i profitti composti.
          </Accordion>

          <Accordion buttonText="Governance Decentralizzata">
            I token holder YFI partecipano alla governance del protocollo, votando su proposte e modifiche alle strategie di investimento.
          </Accordion>

          <Accordion buttonText="Ottimizzazione Gas">
            Le strategie condivise permettono di ridurre i costi del gas per singolo utente, rendendo il yield farming accessibile anche con somme minori.
          </Accordion>

          <Accordion buttonText="Sicurezza Multi-Layer">
            Implementa multiple misure di sicurezza inclusi audit dei smart contract, limiti di deposito e sistemi di monitoraggio continuo.
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Accesso alla Piattaforma" defaultOpen={true}>
            <List ordered={true}>
              <li>
                Vai su <a href="https://yearn.fi/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Yearn Finance</a> per accedere alla piattaforma.
              </li>
              <li>
                Connetti il tuo portafoglio Ethereum (MetaMask, WalletConnect, etc.).
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="2. Selezione del Vault">
            <List ordered={true}>
              <li>
                Esplora i Vaults disponibili nella sezione principale.
              </li>
              <li>
                Confronta APY (Annual Percentage Yield) e strategie dei diversi vault.
              </li>
              <li>
                Leggi i dettagli della strategia e i rischi associati.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="3. Deposito nei Vaults">
            <List ordered={true}>
              <li>
                Seleziona il vault che preferisci e clicca su &quot;Deposit&quot;.
              </li>
              <li>
                Inserisci l&apos;importo che vuoi depositare.
              </li>
              <li>
                Approva il token se è la prima volta che usi quel vault.
              </li>
              <li>
                Conferma la transazione di deposito.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="4. Monitoraggio e Prelievo">
            <List ordered={true}>
              <li>
                Monitora le performance del tuo investimento dalla dashboard.
              </li>
              <li>
                I guadagni vengono reinvestiti automaticamente nella strategia.
              </li>
              <li>
                Quando vuoi ritirare, usa la funzione &quot;Withdraw&quot; per prelevare i tuoi fondi più i guadagni.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Prodotti Principali</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Vaults v3</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">YFI Token</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">veYFI</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">Yield Strategies</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://yearn.fi/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/yearnfi" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
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
