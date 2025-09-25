import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";

import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";
import jupiterIcon from "@/assets/jupiter-logo.png";
// Loghi delle reti supportate
import solanaIcon from "@/assets/solana-sol-logo.svg";

export default function Jupiter() {
  return (
    <ProtectedRoute title="Jupiter">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={jupiterIcon} alt="Jupiter" width={64} height={64} />
          <div>
            <SectionTitle>Jupiter</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                DEX Aggregator
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                DeFi
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Solana
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Jupiter</strong> è un aggregatore di exchange decentralizzati (DEX) sulla blockchain di Solana. Progettato per aiutare gli utenti a trovare i migliori tassi di cambio in un unico posto, Jupiter consolida tutte le fonti di liquidità su Solana in un singolo endpoint, fornendo dati di prezzo accurati in tempo reale e funzionalità di pagamento per utenti e sviluppatori.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Aggregazione Swap" defaultOpen={true}>
            Jupiter aggrega le migliori rotte di prezzo, offrendo la selezione più completa di token con un&apos;interfaccia utente intuitiva. Questo permette agli utenti di ottenere i migliori tassi di cambio da varie fonti di liquidità su Solana.
          </Accordion>

          <Accordion buttonText="Dati di Prezzo Accurati in Tempo Reale">
            Jupiter estrae dati di prezzo accurati in tempo reale per i token SPL scambiati attraverso DEX e AMM sulla blockchain di Solana, che è cruciale per il trading e le transazioni finanziarie.
          </Accordion>

          <Accordion buttonText="Pagamenti">
            Jupiter abilita i pagamenti utilizzando qualsiasi token SPL fornendo l&apos;infrastruttura di scambio necessaria. Questo semplifica il processo di utilizzo dei token per i pagamenti su Solana.
          </Accordion>

          <Accordion buttonText="Interfaccia di Liquidità Unificata">
            Jupiter consolida il numero crescente di token e fonti di liquidità su Solana in un singolo endpoint, permettendo a utenti e progetti di accedere completamente al valore all&apos;interno di Solana in modo fluido.
          </Accordion>

          <Accordion buttonText="Guidato dalla Comunità">
            Jupiter si basa fortemente sulla sua comunità di utenti per condividere, promuovere e aiutare a formare partnership, rendendolo un prodotto che è plasmato dal feedback costante degli utenti.
          </Accordion>

          <Accordion buttonText="Funzionalità Avanzate">
            Jupiter supporta anche strumenti avanzati come Limit Orders, Dollar-Cost Averaging (DCA) e Perpetual Trading (Perps), offrendo opzioni sofisticate per gestire e ottimizzare gli investimenti DeFi.
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Reti Supportate</h3>
              <p className="text-neutral-600 mb-4 text-sm">
                Jupiter è il principale aggregatore DEX su Solana, offrendo il miglior prezzo per ogni swap.
              </p>
              <div className="flex flex-wrap gap-4">
                <Image src={solanaIcon} alt="Solana" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://jup.ag/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/JupiterExchange" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🐦 Twitter/X
                </a>
                <a href="https://www.coingecko.com/en/coins/jupiter" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  📊 Token JUP
                </a>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}