import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";

import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";

export default function Balancer() {
  return (
    <ProtectedRoute title="Balancer">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={Placeholder} alt="Balancer" width={64} height={64} />
          <div>
            <SectionTitle>Balancer</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                DEX
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                Multi-Asset
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Ethereum
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Balancer</strong> è un exchange decentralizzato (DEX) e protocollo di liquidità su Ethereum che permette agli utenti di creare pool di liquidità multi-asset con pesi personalizzabili. Questo consente una gestione flessibile del portafoglio e l&apos;ottimizzazione delle strategie di investimento. Balancer è noto per la sua capacità di automatizzare il ribilanciamento del portafoglio e ridurre le commissioni di trading.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Pool di Liquidità Personalizzabili" defaultOpen={true}>
            Balancer permette la creazione di pool di liquidità con fino a 8 asset diversi, con pesi variabili che possono essere personalizzati secondo le preferenze dell&apos;utente. Questo fornisce grande flessibilità nella gestione degli investimenti e nella fornitura di liquidità.
          </Accordion>

          <Accordion buttonText="Ribilanciamento Automatico del Portafoglio">
            I pool di Balancer si riequilibrano automaticamente in base alle transazioni effettuate, permettendo agli utenti di mantenere la composizione desiderata del portafoglio senza intervento manuale.
          </Accordion>

          <Accordion buttonText="Guadagni da Commissioni di Trading">
            I fornitori di liquidità guadagnano commissioni dalle transazioni condotte nel pool. Queste commissioni vengono distribuite proporzionalmente alla quantità di liquidità fornita da ciascun utente.
          </Accordion>

          <Accordion buttonText="Protezione dalla Perdita Impermanente">
            Alcuni pool di Balancer offrono meccanismi che proteggono dalla perdita impermanente, riducendo il rischio associato alla fornitura di liquidità in mercati volatili.
          </Accordion>

          <Accordion buttonText="Governance Decentralizzata">
            Il protocollo è governato dalla comunità attraverso il token BAL, permettendo ai detentori di votare su proposte e decisioni chiave riguardanti lo sviluppo e la gestione del protocollo.
          </Accordion>

          <Accordion buttonText="Supporto Multi-Chain">
            Oltre a Ethereum, Balancer è disponibile su altre blockchain come Polygon e Arbitrum, espandendo le opportunità di trading e liquidità.
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Reti Supportate</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Ethereum</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Optimism</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Polygon</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Arbitrum</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Base</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Avalanche</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://balancer.fi/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/Balancer" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🐦 Twitter/X
                </a>
                <a href="https://www.coingecko.com/en/coins/balancer" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  📊 Token BAL
                </a>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
