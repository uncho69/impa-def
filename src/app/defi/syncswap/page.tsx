import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";

import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";
import syncswapIcon from "@/assets/syncswap-logo.png";
// Loghi delle reti supportate
import zksyncIcon from "@/assets/zksynk-logo.png";
import lineaIcon from "@/assets/linea-logo.svg";
import scrollIcon from "@/assets/Scroll-Logo.svg";

export default function SyncSwap() {
  return (
    <ProtectedRoute title="SyncSwap">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={syncswapIcon} alt="SyncSwap" width={64} height={64} />
          <div>
            <SectionTitle>SyncSwap</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                DEX
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                ZK-Rollup
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                zkSync
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>SyncSwap</strong> è un exchange decentralizzato (DEX) che opera sulla rete zkSync Era, una soluzione di scaling di Ethereum basata sulla tecnologia zero-knowledge (zk). La piattaforma mira a rendere la finanza decentralizzata (DeFi) più accessibile e conveniente, offrendo transazioni rapide e a basso costo con la sicurezza completa di Ethereum.
        </SectionBody>

        <SectionTitle>Funzionalità di SyncSwap</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Trading di Token" defaultOpen={true}>
            SyncSwap consente agli utenti di scambiare facilmente tra migliaia di criptovalute disponibili sulla rete zkSync Era. Basta selezionare i token da scambiare, inserire l&apos;importo e cliccare sul pulsante &quot;Swap&quot;. La piattaforma mostra l&apos;impatto sul prezzo e altre informazioni rilevanti per aiutare gli utenti a fare scelte informate.
          </Accordion>

          <Accordion buttonText="Pool di Liquidità">
            Gli utenti possono fornire liquidità ai pool di SyncSwap per guadagnare commissioni di trading. La piattaforma utilizza una tecnologia multi-pool innovativa che ottimizza le strategie di trading e potenzialmente aumenta i guadagni per i fornitori di liquidità.
          </Accordion>

          <Accordion buttonText="Tariffe Dinamiche">
            SyncSwap implementa tariffe dinamiche che variano a seconda del pool e della direzione dello scambio, permettendo una gestione più efficiente dei costi di transazione e una migliore ottimizzazione del mercato.
          </Accordion>

          <Accordion buttonText="Router Intelligente">
            La piattaforma utilizza un router intelligente che ottimizza le rotte di scambio attraverso più pool per ottenere il miglior prezzo possibile per ogni transazione.
          </Accordion>

          <Accordion buttonText="Governance Abilitata">
            SyncSwap è progettato per essere governato dalla comunità. Gli utenti possono partecipare alle decisioni di governance e controllare parametri chiave del protocollo attraverso proposte e votazioni.
          </Accordion>

          <Accordion buttonText="Architettura Future-Proof">
            La struttura di SyncSwap è progettata per evolversi nel tempo, con l&apos;integrazione di nuovi modelli di pool e funzionalità che manterranno il protocollo potente e competitivo.
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Reti Supportate</h3>
              <p className="text-neutral-600 mb-4 text-sm">
                SyncSwap supporta le principali reti zk-rollup per trading veloce e a basso costo.
              </p>
              <div className="flex flex-wrap gap-4">
                <Image src={zksyncIcon} alt="zkSync" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
                <Image src={lineaIcon} alt="Linea" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
                <Image src={scrollIcon} alt="Scroll" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://syncswap.xyz/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://twitter.com/syncswap" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
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