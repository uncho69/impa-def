import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";

export default function DeBridge() {
  return (
    <ProtectedRoute title="deBridge">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={Placeholder} alt="deBridge" width={64} height={64} />
          <div>
            <SectionTitle main={true}>deBridge</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Bridge
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                Interoperability
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Cross-Chain
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>deBridge</strong> è un protocollo di interoperabilità e trasferimento di liquidità cross-chain che facilita il trasferimento decentralizzato di asset tra varie blockchain. Il protocollo permette l&apos;interoperabilità nel mondo del Web3, offrendo una piattaforma sicura e performante per le interazioni cross-chain.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Cross-Chain Interoperability" defaultOpen={true}>
            deBridge facilita l&apos;interoperabilità tra diverse blockchain, permettendo il trasferimento sicuro e veloce di asset e dati.
          </Accordion>

          <Accordion buttonText="Decentralized Infrastructure">
            Utilizza un&apos;infrastruttura completamente decentralizzata con validatori distribuiti per garantire sicurezza e resistenza alla censura.
          </Accordion>

          <Accordion buttonText="Smart Contract Integration">
            Offre integrazione nativa con smart contract, permettendo operazioni cross-chain complesse oltre i semplici trasferimenti.
          </Accordion>

          <Accordion buttonText="Low Fees &amp; High Speed">
            Progettato per offrire commissioni competitive e tempi di transazione veloci per trasferimenti cross-chain.
          </Accordion>

          <Accordion buttonText="Multi-Asset Support">
            Supporta una vasta gamma di asset e token, inclusi token nativi e wrapped di diverse blockchain.
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Accesso alla Piattaforma" defaultOpen={true}>
            <List ordered={true}>
              <li>
                Vai su <a href="https://debridge.finance/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">deBridge Finance</a> per accedere alla piattaforma.
              </li>
              <li>
                Connetti il tuo portafoglio Web3 preferito alla piattaforma.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="2. Configurazione del Bridge">
            <List ordered={true}>
              <li>
                Seleziona la blockchain di origine da cui vuoi trasferire asset.
              </li>
              <li>
                Scegli la blockchain di destinazione dove vuoi ricevere i fondi.
              </li>
              <li>
                Assicurati che il tuo portafoglio sia connesso alla rete corretta.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="3. Trasferimento di Asset">
            <List ordered={true}>
              <li>
                Seleziona l&apos;asset che vuoi trasferire dall&apos;elenco supportato.
              </li>
              <li>
                Inserisci l&apos;importo che desideri bridgare.
              </li>
              <li>
                Rivedi le commissioni del bridge e i tempi di transazione stimati.
              </li>
              <li>
                Conferma la transazione nel tuo portafoglio.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="4. Monitoraggio e Completamento">
            <List ordered={true}>
              <li>
                Utilizza il transaction explorer di deBridge per monitorare lo stato del trasferimento.
              </li>
              <li>
                Attendi che i validatori confermino la transazione cross-chain.
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
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Caratteristiche Tecniche</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Decentralized</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Cross-Chain</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Low Fees</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">Smart Contracts</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://debridge.finance/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/deBridgeFinance" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
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
