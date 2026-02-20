import { ClerkProtectedRoute } from "@/components/ClerkProtectedRoute";
import { PageTitle } from "@/components/PageTitle";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";

export default function StrumentiUtiliPage() {
  return (
    <ClerkProtectedRoute title="Strumenti Utili">
      <MobileContainer>
        <PageTitle>Strumenti Utili</PageTitle>
        <SectionBody>
          <p className="text-neutral-900 mb-6">
            Una raccolta di strumenti essenziali per navigare nel mondo Web3. Questi strumenti ti aiuteranno ad analizzare, monitorare e interagire con le criptovalute e le blockchain in modo più efficace e sicuro.
          </p>
          
          <Accordion buttonText="Blockchain Explorers">
            <div className="space-y-3">
              <p className="text-neutral-900">
                I blockchain explorers sono strumenti fondamentali per esplorare e analizzare le transazioni, i contratti intelligenti e i wallet su diverse blockchain.
              </p>
              <p className="text-neutral-900">
                <strong>Caratteristiche principali:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-900">
                <li><strong>Etherscan</strong> - Explorer per Ethereum e reti compatibili</li>
                <li><strong>Solscan</strong> - Explorer per Solana</li>
                <li><strong>Polygonscan</strong> - Explorer per Polygon</li>
                <li><strong>Arbiscan</strong> - Explorer per Arbitrum</li>
                <li><strong>Basescan</strong> - Explorer per Base</li>
              </ul>
            </div>
          </Accordion>

          <Accordion buttonText="Portfolio Tracker">
            <div className="space-y-3">
              <p className="text-neutral-900">
                I portfolio tracker ti permettono di monitorare il valore dei tuoi asset crypto in tempo reale e analizzare le performance del tuo portafoglio.
              </p>
              <p className="text-neutral-900">
                <strong>Strumenti consigliati:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-900">
                <li><strong>CoinGecko Portfolio</strong> - Tracker gratuito e completo</li>
                <li><strong>CoinMarketCap Portfolio</strong> - Interfaccia intuitiva</li>
                <li><strong>DeFiPulse</strong> - Focus su DeFi protocols</li>
                <li><strong>Zerion</strong> - Integrazione wallet e DeFi</li>
                <li><strong>DeBank</strong> - Analisi dettagliata DeFi</li>
              </ul>
            </div>
          </Accordion>

          <Accordion buttonText="Analisi e Ricerca">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Strumenti per analizzare progetti crypto, token e mercati. Essenziali per fare ricerche approfondite prima di investire.
              </p>
              <p className="text-neutral-900">
                <strong>Piattaforme di analisi:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-900">
                <li><strong>DexScreener</strong> - Analisi DEX e token</li>
                <li><strong>DexTools</strong> - Trading tools e analytics</li>
                <li><strong>TokenSniffer</strong> - Sicurezza e audit token</li>
                <li><strong>RugDoc</strong> - Valutazione sicurezza DeFi</li>
                <li><strong>DefiLlama</strong> - TVL e metriche DeFi</li>
              </ul>
            </div>
          </Accordion>

          <Accordion buttonText="Trading e DeFi">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Strumenti per il trading e l'interazione con protocolli DeFi. Ti aiutano a ottimizzare le tue operazioni e massimizzare i rendimenti.
              </p>
              <p className="text-neutral-900">
                <strong>Strumenti essenziali:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-900">
                <li><strong>1inch</strong> - Aggregatore DEX per migliori prezzi</li>
                <li><strong>ParaSwap</strong> - Aggregatore multi-chain</li>
                <li><strong>Zapper</strong> - Dashboard DeFi unificata</li>
                <li><strong>Yearn Finance</strong> - Yield farming automatizzato</li>
                <li><strong>Uniswap</strong> - DEX leader per trading</li>
              </ul>
            </div>
          </Accordion>

          <Accordion buttonText="Sicurezza e Privacy">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Strumenti per proteggere i tuoi asset e mantenere la privacy nelle tue operazioni crypto.
              </p>
              <p className="text-neutral-900">
                <strong>Strumenti di sicurezza:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-900">
                <li><strong>MetaMask</strong> - Wallet sicuro e diffuso</li>
                <li><strong>Ledger Live</strong> - Hardware wallet management</li>
                <li><strong>Tornado Cash</strong> - Privacy per transazioni</li>
                <li><strong>Revoke.cash</strong> - Revoca permessi token</li>
                <li><strong>Honeypot.is</strong> - Rilevamento honeypot</li>
              </ul>
            </div>
          </Accordion>

          <Accordion buttonText="News e Informazioni">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Fonti di notizie e informazioni aggiornate per rimanere al corrente delle ultime novità nel mondo crypto.
              </p>
              <p className="text-neutral-900">
                <strong>Fonti consigliate:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-900">
                <li><strong>CoinDesk</strong> - Notizie crypto mainstream</li>
                <li><strong>The Block</strong> - Analisi e report approfonditi</li>
                <li><strong>DeFi Pulse</strong> - Focus su DeFi e TVL</li>
                <li><strong>Crypto Twitter</strong> - Community e insights</li>
                <li><strong>Reddit r/cryptocurrency</strong> - Discussioni community</li>
              </ul>
            </div>
          </Accordion>
        </SectionBody>
      </MobileContainer>
    </ClerkProtectedRoute>
  );
}
