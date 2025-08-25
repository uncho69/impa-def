import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";

import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";

export default function TraderJoe() {
  return (
    <ProtectedRoute title="Trader Joe">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={Placeholder} alt="Trader Joe" width={64} height={64} />
          <div>
            <SectionTitle>Trader Joe</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                DEX
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                DeFi
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Avalanche
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Trader Joe</strong> è un exchange decentralizzato (DEX) e una piattaforma DeFi costruita sulle reti Avalanche e Arbitrum. Lanciato su Avalanche, ha rapidamente guadagnato popolarità grazie alla sua interfaccia intuitiva e alla vasta gamma di servizi DeFi. Trader Joe offre molto più del semplice scambio di token; fornisce anche pool di liquidità, yield farming, staking e prestiti, rendendolo una piattaforma completa per la finanza decentralizzata.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Scambio di Token" defaultOpen={true}>
            Trader Joe consente agli utenti di scambiare token in un ambiente decentralizzato e sicuro, sfruttando la velocità e i bassi costi di Avalanche e Arbitrum.
          </Accordion>

          <Accordion buttonText="Fornitura di Liquidità">
            Gli utenti possono fornire liquidità a varie coppie di token e guadagnare una parte delle commissioni di scambio, aiutando a mantenere la liquidità e l&apos;efficienza della piattaforma.
          </Accordion>

          <Accordion buttonText="Yield Farming">
            Trader Joe offre opportunità di yield farming, in cui gli utenti possono mettere in staking i loro token LP (Liquidity Pool) per guadagnare ricompense aggiuntive, incentivando la partecipazione all&apos;ecosistema.
          </Accordion>

          <Accordion buttonText="Staking">
            I detentori di token JOE possono mettere in staking i loro token per guadagnare ricompense, aumentando l&apos;utilità del token nativo della piattaforma e coinvolgendo gli utenti in una partecipazione a lungo termine.
          </Accordion>

          <Accordion buttonText="Prestiti e Prestiti Garantiti">
            Trader Joe fornisce anche una piattaforma di prestiti decentralizzata, consentendo agli utenti di prestare i propri asset per guadagnare interessi o prendere in prestito contro i propri fondi in modo non custodiale.
          </Accordion>

          <Accordion buttonText="Rocket Joe">
            Una funzionalità innovativa progettata per lanciare nuovi progetti di token attraverso il &quot;liquidity bootstrapping&quot;, permettendo ai nuovi progetti di ottenere slancio e offrendo opportunità di accesso anticipato alla comunità.
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Reti Supportate</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Avalanche</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Arbitrum</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://lfj.gg/avalanche" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/traderjoe_xyz" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🐦 Twitter/X
                </a>
                <a href="https://www.coingecko.com/en/coins/joe" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  📊 Token JOE
                </a>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
