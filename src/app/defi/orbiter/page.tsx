import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import orbiterIcon from "@/assets/orbiterfinance-icon.png";

export default function Orbiter() {
  return (
    <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={orbiterIcon} alt="Orbiter Finance" width={64} height={64} />
          <div>
            <SectionTitle>Orbiter Finance</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Bridge
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                Cross-Chain
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Ethereum
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Orbiter Finance</strong> è un protocollo di bridging decentralizzato che facilita le transazioni cross-chain (o cross-rollup) all&apos;interno dell&apos;ecosistema Ethereum. Orbiter permette trasferimenti di asset nativi tra diverse reti Layer 2 e Layer 3 in modo sicuro ed efficiente, sfruttando le caratteristiche di sicurezza degli zk-rollup.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Bridging Cross-Chain" defaultOpen={true}>
            Orbiter Finance permette agli utenti di trasferire asset tra diverse blockchain e Layer 2 in modo sicuro e veloce, supportando le principali reti dell&apos;ecosistema Ethereum.
          </Accordion>

          <Accordion buttonText="Sicurezza zk-Rollup">
            Il protocollo sfrutta la sicurezza degli zero-knowledge rollup per garantire che le transazioni cross-chain siano sicure e verificabili.
          </Accordion>

          <Accordion buttonText="Costi Ridotti">
            Grazie all&apos;ottimizzazione per Layer 2, Orbiter offre commissioni di bridging significativamente più basse rispetto ai bridge tradizionali.
          </Accordion>

          <Accordion buttonText="Velocità di Transazione">
            Le transazioni attraverso Orbiter sono rapide, con tempi di conferma che variano da pochi minuti a massimo qualche ora a seconda delle reti coinvolte.
          </Accordion>

          <Accordion buttonText="Asset Supportati">
            Supporta i principali asset come ETH, USDC, USDT e altri token ERC-20 popolari attraverso diverse blockchain.
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Connessione del Portafoglio" defaultOpen={true}>
            <List ordered={true}>
              <li>
                Vai su <a href="https://www.orbiter.finance/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Orbiter Finance</a> e clicca su &quot;Connect Wallet&quot;.
              </li>
              <li>
                Seleziona il tuo portafoglio (MetaMask, WalletConnect, etc.) e connettilo alla piattaforma.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="2. Selezione delle Reti">
            <List ordered={true}>
              <li>
                Scegli la rete di origine da cui vuoi trasferire i fondi.
              </li>
              <li>
                Seleziona la rete di destinazione dove vuoi ricevere i fondi.
              </li>
              <li>
                Verifica che il tuo portafoglio sia connesso alla rete di origine corretta.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="3. Trasferimento di Asset">
            <List ordered={true}>
              <li>
                Seleziona l&apos;asset che vuoi trasferire (ETH, USDC, etc.).
              </li>
              <li>
                Inserisci l&apos;importo che desideri bridgare.
              </li>
              <li>
                Controlla le commissioni e i tempi di trasferimento stimati.
              </li>
              <li>
                Conferma la transazione nel tuo portafoglio.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="4. Monitoraggio della Transazione">
            <List ordered={true}>
              <li>
                Dopo aver confermato, puoi monitorare lo stato della transazione sulla dashboard di Orbiter.
              </li>
              <li>
                Una volta completata, i fondi appariranno nella rete di destinazione.
              </li>
              <li>
                Cambia la rete nel tuo portafoglio per visualizzare i fondi ricevuti.
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
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">zkSync</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Polygon</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">StarkNet</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://www.orbiter.finance/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/Orbiter_Finance" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🐦 Twitter/X
                </a>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
  );
}
