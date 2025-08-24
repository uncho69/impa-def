import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";

export default function Stargate() {
  return (
    <ProtectedRoute title="Stargate Finance">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={Placeholder} alt="Stargate Finance" width={64} height={64} />
          <div>
            <SectionTitle>Stargate Finance</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Bridge
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                Omnichain
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                LayerZero
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Stargate Finance</strong> è un protocollo di trasporto di liquidità omnichain che facilita i trasferimenti di risorse cross-chain in modo sicuro e trasparente. Costruito sulla tecnologia LayerZero, Stargate mira a risolvere i problemi di liquidità tra reti diverse, offrendo un&apos;infrastruttura che permette trasferimenti di token fluidi e senza interruzioni.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Protocollo Omnichain" defaultOpen={true}>
            Stargate utilizza la tecnologia LayerZero per creare una rete omnichain che permette comunicazione seamless tra diverse blockchain.
          </Accordion>

          <Accordion buttonText="Pool di Liquidità Unificata">
            Utilizza pool di liquidità condivisi tra diverse chain, eliminando la necessità di wrapping e unwrapping di token.
          </Accordion>

          <Accordion buttonText="Instant Guaranteed Finality">
            Offre finalità istantanea garantita per le transazioni cross-chain, eliminando i rischi di revert delle transazioni.
          </Accordion>

          <Accordion buttonText="Native Asset Support">
            Supporta asset nativi invece di wrapped token, mantenendo la fungibilità completa tra diverse blockchain.
          </Accordion>

          <Accordion buttonText="Unified Liquidity">
            Permette l&apos;accesso a liquidità unificata attraverso tutte le chain supportate, migliorando l&apos;efficienza del capitale.
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Connessione alla Piattaforma" defaultOpen={true}>
            <List ordered={true}>
              <li>
                Visita <a href="https://stargate.finance/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Stargate Finance</a> per accedere al protocollo.
              </li>
              <li>
                Connetti il tuo portafoglio Web3 (MetaMask, WalletConnect, etc.).
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="2. Trasferimento Cross-Chain">
            <List ordered={true}>
              <li>
                Seleziona la blockchain di origine e quella di destinazione.
              </li>
              <li>
                Scegli l&apos;asset che vuoi trasferire (USDC, USDT, ETH, etc.).
              </li>
              <li>
                Inserisci l&apos;importo che desideri bridgare.
              </li>
              <li>
                Rivedi commissioni e slippage prima di confermare.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="3. Fornitura di Liquidità">
            <List ordered={true}>
              <li>
                Vai alla sezione &quot;Pool&quot; per fornire liquidità ai pool di Stargate.
              </li>
              <li>
                Seleziona il pool e l&apos;asset che vuoi depositare.
              </li>
              <li>
                Deposita i tuoi asset per guadagnare commissioni e rewards STG.
              </li>
              <li>
                Monitora i tuoi guadagni dalla dashboard.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="4. Farming e Staking">
            <List ordered={true}>
              <li>
                Utilizza i LP token ricevuti per partecipare al farming.
              </li>
              <li>
                Fai staking dei token STG per guadagnare rewards aggiuntivi.
              </li>
              <li>
                Partecipa alla governance del protocollo con i tuoi token stakati.
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
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Ethereum</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">BNB Chain</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Avalanche</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Polygon</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Arbitrum</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Optimism</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://stargate.finance/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/StargateFinance" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
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
