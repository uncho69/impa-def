import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function DeBridgePage() {
  return (
    <>
      <PageTitle description="Protocollo di interoperabilità cross-chain">
        deBridge
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">dB</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">deBridge</h2>
              <p className="text-neutral-600">Cross-Chain • Interoperabilità • DeFi</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>deBridge</strong> è un protocollo di interoperabilità e trasferimento di liquidità cross-chain, che facilita il trasferimento decentralizzato di dati e asset tra varie blockchain. deBridge è progettato per migliorare l&apos;interoperabilità nel mondo del Web3, offrendo una piattaforma sicura e performante per le interazioni cross-chain.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di deBridge</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Trasferimento Cross-Chain">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Messaggi Arbitrari</h4>
              <p className="text-neutral-600 mb-3">
                deBridge permette il trasferimento di messaggi arbitrari e di valore tra diverse blockchain, consentendo l&apos;interconnessione di smart contract su reti differenti. Questo include trasferimenti di dati, chiamate di transazioni e scambi di valore nella stessa transazione.
              </p>
              <h4 className="font-semibold text-neutral-900">Validazione Off-Chain</h4>
              <p className="text-neutral-600">
                Le transazioni cross-chain sono validate da una rete di validatori indipendenti eletti dalla governance di deBridge. Questi validatori gestiscono i nodi deBridge e firmano tutte le transazioni che passano attraverso i contratti smart di deBridge.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Prodotti e Servizi">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">deSwap</h4>
              <p className="text-neutral-600 mb-3">
                Una piattaforma per scambi rapidi e fluidi tra reti diverse. Gli utenti possono eseguire swap di token in pochi clic, sfruttando la profonda liquidità e la protezione contro il MEV (Miner Extractable Value) e lo slippage.
              </p>
              <h4 className="font-semibold text-neutral-900">DLN (DeFi Liquidity Network)</h4>
              <p className="text-neutral-600 mb-3">
                Una soluzione per il trading cross-chain ad alte prestazioni, progettata per offrire ordini limite e protezione avanzata contro il MEV. DLN utilizza un design 0-TVL (Total Value Locked) che elimina la necessità di pool di liquidità centralizzati.
              </p>
              <h4 className="font-semibold text-neutral-900">dePort</h4>
              <p className="text-neutral-600">
                Un bridge nativo per asset che utilizza un approccio di locking e minting. I token nativi sono bloccati in un contratto smart su una rete e le loro rappresentazioni sintetiche (deToken) sono mintate su altre reti.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Sicurezza e Governance">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Governance Decentralizzata</h4>
              <p className="text-neutral-600 mb-3">
                deBridge è gestito da una DAO (Organizzazione Autonoma Decentralizzata), che permette a tutti i detentori di token di partecipare alle decisioni riguardanti i parametri del protocollo e la gestione del treasury.
              </p>
              <h4 className="font-semibold text-neutral-900">Validatori e Staking</h4>
              <p className="text-neutral-600">
                I validatori di deBridge svolgono un ruolo cruciale nella sicurezza del protocollo, validando tutte le transazioni cross-chain e assicurando l&apos;integrità del sistema attraverso meccanismi di staking e slashing.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Reti Supportate</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Layer 1</h4>
              <List>
                <li>Ethereum</li>
                <li>Solana</li>
                <li>Avalanche</li>
                <li>BNB Chain</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Layer 2</h4>
              <List>
                <li>Arbitrum</li>
                <li>Optimism</li>
                <li>Base</li>
                <li>Linea</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">zk-Rollups</h4>
              <List>
                <li>zkSync</li>
                <li>Scroll</li>
                <li>Polygon zkEVM</li>
                <li>StarkNet</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Altri</h4>
              <List>
                <li>Polygon</li>
                <li>Blast</li>
                <li>Fantom</li>
                <li>Aurora</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Utilizzo dei Prodotti</h4>
                <List>
                  <li>Utilizza deSwap per scambi cross-chain</li>
                  <li>Effettua trasferimenti con dePort</li>
                  <li>Partecipa a DLN per trading avanzato</li>
                  <li>Interagisci con la governance</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Volume e Frequenza</h4>
                <List>
                  <li>Mantieni un volume di transazioni consistente</li>
                  <li>Effettua transazioni regolari nel tempo</li>
                  <li>Utilizza diverse reti supportate</li>
                  <li>Partecipa a programmi di incentivazione</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a deBridge</h4>
                <List>
                  <li>Visita <a href="https://debridge.finance/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">debridge.finance</a></li>
                  <li>Clicca su &quot;Launch App&quot; per accedere all&apos;interfaccia</li>
                  <li>Collega il tuo portafoglio MetaMask</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Utilizzo di deSwap e dePort</h4>
                <List>
                  <li><strong>deSwap:</strong> Vai alla sezione &quot;deSwap&quot; per eseguire swap di token tra diverse blockchain</li>
                  <li><strong>dePort:</strong> Utilizza &quot;dePort&quot; per trasferire asset bloccando i token nativi e mintando le loro rappresentazioni sintetiche su altre reti</li>
                  <li>Seleziona le reti di origine e destinazione</li>
                  <li>Conferma le transazioni in MetaMask</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://debridge.finance/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale deBridge
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/deBridgeFinance" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">🔄</span>
              <a href="https://app.debridge.finance/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                deBridge App
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📊</span>
              <a href="https://debridge.finance/analytics" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Analytics Dashboard
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">📚</span>
              <a href="https://docs.debridge.finance/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
