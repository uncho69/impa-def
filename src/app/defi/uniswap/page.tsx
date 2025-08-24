import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import uniswapIcon from "@/assets/uniswap-icon.png";

export default function Uniswap() {
  return (
    <ProtectedRoute title="Uniswap">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={uniswapIcon} alt="Uniswap" width={64} height={64} />
          <div>
            <SectionTitle main={true}>Uniswap</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                DEX
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                DeFi
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Ethereum
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Uniswap</strong> è un protocollo di scambio decentralizzato (anche noto come Exchange Decentralizzato, o DEX) che opera sulla blockchain di Ethereum. È uno dei principali attori nell&apos;ecosistema della finanza decentralizzata (DeFi), permettendo agli utenti di scambiare token ERC-20 senza la necessità di intermediari centralizzati. Uniswap utilizza un modello di market making automatizzato (AMM) per facilitare le transazioni, garantendo liquidità attraverso pool di liquidità.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Protocollo Decentralizzato" defaultOpen={true}>
            <List>
              <li>
                <strong>Automated Market Maker (AMM)</strong>: Uniswap utilizza un sistema di market making automatizzato, basato sulla formula del prodotto costante (x⋅y=k). Questo meccanismo consente scambi peer-to-peer senza intermediari centralizzati.
              </li>
              <li>
                <strong>Smart Contract Non Modificabili</strong>: Il protocollo è composto da smart contract non aggiornabili che garantiscono la trasparenza e la sicurezza delle operazioni.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Pool di Liquidità">
            <List>
              <li>
                <strong>Fornitura di Liquidità</strong>: Gli utenti possono diventare fornitori di liquidità (LP) depositando coppie di token in un pool. In cambio, ricevono token del pool che rappresentano la loro quota della liquidità totale e possono essere riscattati in qualsiasi momento.
              </li>
              <li>
                <strong>Commissioni di Transazione</strong>: Ogni scambio su Uniswap comporta una commissione dello 0.30%, che viene distribuita tra i fornitori di liquidità come ricompensa.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Versioni del Protocollo">
            <List>
              <li>
                <strong>Uniswap V1</strong>: La prima iterazione del protocollo, lanciata nel 2018, che ha dimostrato il concetto di AMM.
              </li>
              <li>
                <strong>Uniswap V2</strong>: Lanciata nel 2020, ha introdotto miglioramenti come le coppie di token ERC-20, oracoli dei prezzi e flash swaps.
              </li>
              <li>
                <strong>Uniswap V3</strong>: Lanciata nel 2021, ha introdotto la liquidità concentrata, che consente ai fornitori di liquidità di concentrare i loro fondi in intervalli di prezzo specifici, aumentando l&apos;efficienza del capitale.
              </li>
              <li>
                <strong>Uniswap V4</strong>: Attualmente in sviluppo, promette ulteriori ottimizzazioni e nuove funzionalità come le commissioni dinamiche e ordini limite on-chain.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Interfaccia Utente">
            <List>
              <li>
                <strong>Web Interface</strong>: L&apos;interfaccia web di Uniswap consente agli utenti di interagire facilmente con il protocollo, effettuando scambi e fornendo liquidità.
              </li>
              <li>
                <strong>Governance</strong>: Il protocollo è governato dalla comunità attraverso il token UNI, che consente ai detentori di votare su proposte che influenzano il futuro del protocollo.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Passo 1: Accedere a Uniswap" defaultOpen={true}>
            <List ordered={true}>
              <li>
                <strong>Visita il Sito di Uniswap</strong>: Vai su <a href="https://uniswap.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Uniswap</a> e clicca su &quot;Launch App&quot; per accedere all&apos;interfaccia di Uniswap.
              </li>
              <li>
                <strong>Collegamento del Portafoglio</strong>: Clicca su &quot;Connect Wallet&quot; nell&apos;angolo in alto a destra. Seleziona MetaMask (o il tuo portafoglio preferito) e segui le istruzioni per collegare il portafoglio.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Passo 2: Scambio di Token">
            <List ordered={true}>
              <li>
                <strong>Seleziona i Token da Scambiare</strong>: Nella schermata principale di Uniswap, seleziona il token che desideri scambiare (ad esempio, ETH) e il token che desideri ricevere (ad esempio, USDC). Inserisci l&apos;importo che desideri scambiare. Uniswap calcolerà automaticamente l&apos;importo dell&apos;altro token che riceverai.
              </li>
              <li>
                <strong>Revisione e Conferma dello Scambio</strong>: Controlla i dettagli dello scambio, inclusi il prezzo, le commissioni e l&apos;impatto sul prezzo. Clicca su &quot;Swap&quot;, quindi conferma l&apos;operazione in MetaMask. Pagherai una piccola commissione di gas per completare la transazione.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Passo 3: Fornitura di Liquidità">
            <List ordered={true}>
              <li>
                <strong>Aggiunta di Liquidità a un Pool</strong>: Vai alla scheda &quot;Pool&quot; e clicca su &quot;Add Liquidity&quot;. Seleziona i token che desideri depositare nel pool. Devi fornire una quantità equivalente di entrambi i token (ad esempio, ETH e USDC). Inserisci gli importi e clicca su &quot;Supply&quot;, quindi conferma l&apos;operazione in MetaMask.
              </li>
              <li>
                <strong>Gestione delle Tue Posizioni di Liquidità</strong>: Nella scheda &quot;Pool&quot;, puoi visualizzare le tue posizioni di liquidità, il tuo saldo e le commissioni guadagnate. Puoi ritirare la tua liquidità in qualsiasi momento cliccando su &quot;Remove&quot;, selezionando la quantità che desideri ritirare e confermando l&apos;operazione in MetaMask.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Passo 4: Gestione dei Token e delle Commissioni">
            <List ordered={true}>
              <li>
                <strong>Visualizzazione dei Saldi</strong>: Puoi visualizzare i tuoi saldi di token direttamente in MetaMask o nella sezione &quot;Assets&quot; del tuo portafoglio collegato.
              </li>
              <li>
                <strong>Pagamento delle Commissioni di Gas</strong>: Ogni transazione su Uniswap richiede il pagamento di una commissione di gas in ETH. Assicurati di avere sempre un po&apos; di ETH nel tuo portafoglio per coprire queste commissioni.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Reti Supportate</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Ethereum</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Arbitrum</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Optimism</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Polygon</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Base</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://app.uniswap.org/swap" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/Uniswap" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🐦 Twitter/X
                </a>
                <a href="https://www.coingecko.com/en/coins/uniswap" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  📊 Token UNI
                </a>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}