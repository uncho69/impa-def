import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";
import camelotIcon from "@/assets/camelot-logo.png";
// Loghi delle reti supportate
import arbitrumIcon from "@/assets/arbitrum-arb-logo.svg";
import xaiIcon from "@/assets/xai-logo.svg";

export default function Camelot() {
  return (
    <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={camelotIcon} alt="Camelot" width={64} height={64} />
          <div>
            <SectionTitle>Camelot</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                DEX
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                Launchpad
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Arbitrum
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Camelot</strong> è una piattaforma di exchange decentralizzato (DEX) e launchpad costruita per supportare l&apos;ecosistema Arbitrum. È una piattaforma focalizzata sulla comunità e sull&apos;efficienza del capitale, progettata per offrire una liquidità profonda, sostenibile e adattabile. Camelot si distingue per la sua infrastruttura personalizzabile che permette sia ai costruttori che agli utenti di sfruttare le sue capacità in modo flessibile e composable.
        </SectionBody>

        <SectionTitle>Funzionalità di Camelot</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Scambio di Token (Swap)" defaultOpen={true}>
            Gli utenti possono scambiare token in modo efficiente utilizzando l&apos;AMM (Automated Market Maker) di Camelot, che supporta sia scambi volatili (UniV2) che stabili (simili a Curve).
          </Accordion>

          <Accordion buttonText="Fornitura di Liquidità">
            Gli utenti possono aggiungere liquidità ai pool di Camelot per guadagnare commissioni di trading. Camelot offre diverse configurazioni di pool personalizzate per adattarsi ai diversi tipi di coppie di trading.
          </Accordion>

          <Accordion buttonText="Yield Farming e Nitro Pools">
            Camelot introduce una nuova approccio alla liquidità basato su posizioni staked non fungibili (spNFT). Queste posizioni yield-bearing offrono nuove funzionalità che migliorano l&apos;efficienza del capitale e permettono strategie di staking personalizzate. Gli utenti possono anche partecipare ai Nitro Pools per ottenere rendimenti incrementati.
          </Accordion>

          <Accordion buttonText="Launchpad">
            Camelot funge anche da launchpad per nuovi protocolli sull&apos;Arbitrum, fornendo strumenti per il lancio, il bootstrap della liquidità e la crescita sostenibile. Il launchpad è progettato per essere pienamente permissionless, permettendo a tutti i progetti di avviare i loro token e la loro liquidità in modo trasparente e decentralizzato.
          </Accordion>

          <Accordion buttonText="Governance e Tokenomics">
            Camelot utilizza un sistema a doppio token composto da GRAIL e xGRAIL. Gli utenti possono partecipare alla governance del protocollo attraverso il locking dei token e ricevere ricompense sotto forma di dividendi e potenziamenti del rendimento.
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Connessione del Portafoglio" defaultOpen={true}>
            <List ordered={true}>
              <li>
                Vai su <a href="https://app.camelot.exchange/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Camelot Exchange</a> e clicca su &quot;Connect Wallet&quot;.
              </li>
              <li>
                Scegli il tuo portafoglio cripto (ad es. MetaMask, WalletConnect) e connettilo alla piattaforma.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="2. Scambio di Token">
            <List ordered={true}>
              <li>
                Utilizza la funzione &quot;Swap&quot; per scambiare tra diversi token supportati.
              </li>
              <li>
                Seleziona i token che desideri scambiare, inserisci l&apos;importo e conferma la transazione.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="3. Aggiunta di Liquidità">
            <List ordered={true}>
              <li>
                Vai alla sezione &quot;Add Liquidity&quot; e scegli un pool di liquidità.
              </li>
              <li>
                Seleziona i token da depositare nel pool e conferma la transazione.
              </li>
              <li>
                Puoi scegliere tra modalità automatica (spNFT) e manuale (LP only).
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="4. Yield Farming e Nitro Pools">
            <List ordered={true}>
              <li>
                Partecipa allo yield farming depositando i tuoi token nei Nitro Pools.
              </li>
              <li>
                Questi pool offrono rendimenti incrementati attraverso strategie di staking avanzate.
              </li>
              <li>
                Segui le istruzioni per creare una posizione spNFT e stakearla in un Nitro Pool per massimizzare i tuoi rendimenti.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="5. Partecipazione al Launchpad">
            <List ordered={true}>
              <li>
                Esplora la sezione &quot;Launchpad&quot; per partecipare ai lanci di nuovi progetti.
              </li>
              <li>
                Puoi acquistare token di nuovi progetti e contribuire alla loro liquidità iniziale.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="6. Gestione e Monitoraggio">
            <List ordered={true}>
              <li>
                Utilizza il dashboard di Camelot per monitorare le tue posizioni.
              </li>
              <li>
                Traccia i rendimenti dei pool di liquidità e le opportunità di yield farming disponibili.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Reti Supportate</h3>
              <p className="text-neutral-600 mb-4 text-sm">
                Camelot opera principalmente su Arbitrum e supporta anche altre reti per il trading e il launchpad.
              </p>
              <div className="flex flex-wrap gap-4">
                <Image src={arbitrumIcon} alt="Arbitrum" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
                <Image src={Placeholder} alt="Sanko" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
                <Image src={xaiIcon} alt="XAI" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://app.camelot.exchange/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/CamelotDEX" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🐦 Twitter/X
                </a>
                <a href="https://www.coingecko.com/en/coins/camelot-token" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  📊 Token GRAIL
                </a>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
  );
}