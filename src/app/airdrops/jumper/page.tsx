import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function JumperPage() {
  return (
    <ProtectedRoute title="Jumper - Airdrop">
      <PageTitle description="Piattaforma di bridging e swapping multi-chain">
        Jumper
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">J</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Jumper</h2>
              <p className="text-neutral-600">Bridge • DEX • Multi-Chain</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Jumper</strong> è una piattaforma di bridging e swapping multi-chain, alimentata da LI.FI, che permette trasferimenti di token fluidi e senza interruzioni tra diverse blockchain. Jumper si posiziona come un aggregatore di ponti e DEX, semplificando il processo di trasferimento cross-chain grazie all&apos;integrazione di numerose fonti di liquidità.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Jumper</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Trasferimenti Multi-Chain">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ampia Integrazione</h4>
              <p className="text-neutral-600 mb-3">
                Jumper supporta trasferimenti tra numerose blockchain, tra cui Ethereum, Arbitrum, Optimism, Base, Polygon, BNB Chain e Avalanche. Questo permette agli utenti di spostare token (criptovalute) tra diverse reti senza complicazioni.
              </p>
              <h4 className="font-semibold text-neutral-900">Bridging e Swapping</h4>
              <p className="text-neutral-600">
                La piattaforma aggrega le migliori fonti di liquidità, inclusi ponti come Connext, Circle CCTP, Hop, Stargate, Across, cBridge, Hyphen e DEX come Uniswap, 1inch, Paraswap, Sushi, Quickswap, Pancake, e altri, offrendo una singola interfaccia per gestire tutte le operazioni.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Supporto per USDC e USDT">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Token Supportati</h4>
              <p className="text-neutral-600">
                Attualmente, Jumper supporta principalmente i trasferimenti di USDC e USDT tra diverse EVM chains, garantendo transazioni sicure e veloci.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Efficienza e Bassi Costi">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ottimizzazione delle Rotte</h4>
              <p className="text-neutral-600">
                Jumper trova le migliori rotte per il trasferimento e lo swapping di token, ottimizzando i tempi di transazione, i costi e la sicurezza. La piattaforma astrae le complessità dei trasferimenti cross-chain, rendendo l&apos;esperienza utente semplice e intuitiva.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Interfaccia User-Friendly">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Semplicità d&apos;Uso</h4>
              <p className="text-neutral-600">
                Jumper offre un&apos;interfaccia user-friendly che rende facile per gli utenti trovare le rotte migliori per i trasferimenti di token e gestire le loro risorse digitali attraverso diverse blockchain.
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
                <li>BNB Chain</li>
                <li>Avalanche</li>
                <li>Polygon</li>
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
              <h4 className="font-semibold text-neutral-900 mb-2">Bridge Integrati</h4>
              <List>
                <li>Connext</li>
                <li>Circle CCTP</li>
                <li>Hop Protocol</li>
                <li>Stargate</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">DEX Integrati</h4>
              <List>
                <li>Uniswap</li>
                <li>1inch</li>
                <li>Paraswap</li>
                <li>SushiSwap</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Utilizzo del Bridge</h4>
                <List>
                  <li>Effettua trasferimenti regolari tra diverse reti</li>
                  <li>Utilizza volumi significativi di USDC/USDT</li>
                  <li>Partecipa a eventi e campagne speciali</li>
                  <li>Interagisci con la community</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Volume e Frequenza</h4>
                <List>
                  <li>Mantieni un volume di trasferimenti consistente</li>
                  <li>Effettua transazioni regolari nel tempo</li>
                  <li>Utilizza diverse coppie di reti</li>
                  <li>Partecipa a programmi di incentivazione</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a Jumper</h4>
                <List>
                  <li>Visita <a href="https://jumper.exchange/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">jumper.exchange</a></li>
                  <li>Clicca su &quot;Open app&quot; per accedere all&apos;interfaccia</li>
                  <li>Collega il tuo portafoglio MetaMask</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Trasferimento Cross-Chain</h4>
                <List>
                  <li>Seleziona la rete e il token di origine</li>
                  <li>Seleziona la rete e il token di destinazione</li>
                  <li>Inserisci l&apos;importo da trasferire</li>
                  <li>Seleziona la rotta preferita</li>
                  <li>Clicca su &quot;Review bridge&quot; e conferma</li>
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
              <a href="https://jumper.exchange/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Jumper
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/JumperExchange" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">🔄</span>
              <a href="https://jumper.exchange/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Jumper App
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📊</span>
              <a href="https://jumper.exchange/analytics" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Analytics Dashboard
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
