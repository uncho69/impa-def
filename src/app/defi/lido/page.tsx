import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";

export default function Lido() {
  return (
    <ProtectedRoute title="Lido Finance">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={Placeholder} alt="Lido Finance" width={64} height={64} />
          <div>
            <SectionTitle main={true}>Lido Finance</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Staking
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                Liquid Staking
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Ethereum
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Lido Finance</strong> è il principale protocollo di liquid staking decentralizzato che permette agli utenti di fare staking di ETH (e altri asset Proof-of-Stake) senza bloccare i fondi. Fondato nel 2020, Lido offre stETH, una rappresentazione liquida dell&apos;ETH stakato, che può essere utilizzata liberamente in altri protocolli DeFi mentre continua a guadagnare rewards di staking.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Liquid Staking" defaultOpen={true}>
            Lido permette di fare staking di ETH ricevendo stETH in cambio, che rappresenta l&apos;ETH stakato più i rewards accumulati e può essere usato in DeFi.
          </Accordion>

          <Accordion buttonText="No Minimum Requirements">
            Non ci sono requisiti minimi di stake (diversamente dai 32 ETH richiesti per essere un validatore), rendendo lo staking accessibile a tutti.
          </Accordion>

          <Accordion buttonText="Professional Node Operators">
            Lido lavora con operatori di nodi professionali e affidabili per gestire i validatori e massimizzare i rewards di staking.
          </Accordion>

          <Accordion buttonText="Daily Rewards">
            I rewards vengono distribuiti giornalmente e sono automaticamente reinvestiti per aumentare il valore di stETH.
          </Accordion>

          <Accordion buttonText="DAO Governance">
            Lido è governato da una DAO dove i token holder LDO possono votare su decisioni importanti del protocollo.
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Accesso alla Piattaforma" defaultOpen={true}>
            <List ordered={true}>
              <li>
                Vai su <a href="https://lido.fi/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Lido Finance</a> per accedere al protocollo.
              </li>
              <li>
                Connetti il tuo portafoglio Ethereum (MetaMask, WalletConnect, etc.).
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="2. Staking di ETH">
            <List ordered={true}>
              <li>
                Nella pagina principale, inserisci l&apos;importo di ETH che vuoi stakare.
              </li>
              <li>
                Rivedi il tasso di cambio ETH/stETH (solitamente 1:1 al momento del stake).
              </li>
              <li>
                Clicca su &quot;Stake&quot; e conferma la transazione nel tuo portafoglio.
              </li>
              <li>
                Riceverai stETH nel tuo portafoglio che rappresenta la tua posizione di stake.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="3. Utilizzo di stETH in DeFi">
            <List ordered={true}>
              <li>
                Puoi utilizzare stETH in altri protocolli DeFi come collaterale o per fornire liquidità.
              </li>
              <li>
                Partecipa a pool di liquidità come stETH/ETH su Curve o Uniswap.
              </li>
              <li>
                Usa stETH come collaterale su piattaforme di lending come Aave.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="4. Monitoraggio e Unstaking">
            <List ordered={true}>
              <li>
                Monitora i tuoi rewards di staking che si accumulano automaticamente nel valore di stETH.
              </li>
              <li>
                Per fare unstaking, puoi scambiare stETH per ETH su DEX o utilizzare la funzione di withdrawal di Lido.
              </li>
              <li>
                Nota che il withdrawal diretto può richiedere un periodo di attesa a seconda della coda di withdrawal di Ethereum.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Asset Supportati</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">ETH → stETH</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">MATIC → stMATIC</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">SOL → stSOL</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">DOT → stDOT</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://lido.fi/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/LidoFinance" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
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
