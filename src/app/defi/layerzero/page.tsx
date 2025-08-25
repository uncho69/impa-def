import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";

export default function LayerZero() {
  return (
    <ProtectedRoute title="LayerZero">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={Placeholder} alt="LayerZero" width={64} height={64} />
          <div>
            <SectionTitle>LayerZero</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Omnichain
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                Interoperability
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Protocol
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>LayerZero</strong> è un protocollo di interoperabilità blockchain che consente la comunicazione tra diverse blockchain in modo decentralizzato. Il suo obiettivo principale è risolvere i problemi di frammentazione tra blockchain diverse, permettendo il trasferimento di dati e asset in modo sicuro e affidabile. Utilizzando LayerZero, gli sviluppatori possono creare applicazioni che operano attraverso multiple blockchain senza sacrificare la sicurezza e l&apos;affidabilità.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Omnichain Protocol" defaultOpen={true}>
            LayerZero permette alle applicazioni di operare attraverso multiple blockchain, creando un ecosistema veramente omnichain.
          </Accordion>

          <Accordion buttonText="Ultra Light Nodes">
            Utilizza Ultra Light Nodes (ULN) per fornire sicurezza equivalente a light client ma con efficienza molto maggiore.
          </Accordion>

          <Accordion buttonText="Trustless Communication">
            Facilita la comunicazione trustless tra blockchain diverse senza bisogno di trusted intermediate parties.
          </Accordion>

          <Accordion buttonText="Developer Friendly">
            Offre SDK e strumenti per sviluppatori che semplificano la creazione di applicazioni cross-chain.
          </Accordion>

          <Accordion buttonText="Configurable Security">
            Permette alle applicazioni di configurare i propri modelli di sicurezza in base alle loro specifiche esigenze.
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Comprensione dell&apos;Ecosistema" defaultOpen={true}>
            <List ordered={true}>
              <li>
                Visita <a href="https://layerzero.network/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">LayerZero Network</a> per comprendere il protocollo.
              </li>
              <li>
                Esplora la documentazione per sviluppatori per capire come funziona l&apos;interoperabilità.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="2. Applicazioni Built on LayerZero">
            <List ordered={true}>
              <li>
                Stargate Finance - per trasferimenti di liquidità cross-chain.
              </li>
              <li>
                Aptos Bridge - per bridging tra Ethereum e Aptos.
              </li>
              <li>
                Radiant Capital - per lending cross-chain.
              </li>
              <li>
                Molte altre applicazioni utilizzano LayerZero come infrastruttura sottostante.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="3. Per Sviluppatori">
            <List ordered={true}>
              <li>
                Accedi alla documentazione tecnica su docs.layerzero.network.
              </li>
              <li>
                Utilizza gli SDK forniti per integrare LayerZero nelle tue dApp.
              </li>
              <li>
                Configura endpoint personalizzati per le tue esigenze specifiche.
              </li>
              <li>
                Testa le integrazioni su testnet prima del deployment in mainnet.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="4. Utilizzo Come Utente">
            <List ordered={true}>
              <li>
                Interagisci con applicazioni che utilizzano LayerZero per operazioni cross-chain.
              </li>
              <li>
                Utilizza protocolli come Stargate per trasferimenti tra diverse blockchain.
              </li>
              <li>
                Beneficia della sicurezza e dell&apos;efficienza di LayerZero senza doverlo utilizzare direttamente.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Blockchain Supportate</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">Ethereum</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">BNB Chain</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">Avalanche</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">Polygon</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">Arbitrum</span>
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">40+ altre</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://layerzero.network/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/LayerZero_Labs" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
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
