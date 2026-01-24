import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import orbiterIcon from "@/assets/orbiterfinance-icon.png";

export default function OrbiterPage() {
  return (
    <>
      <PageTitle description="Protocollo di bridging decentralizzato cross-chain">
        Orbiter Finance
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <Image 
              src={orbiterIcon} 
              alt="Orbiter Finance" 
              className="w-16 h-16" 
              width={64}
              height={64}
            />
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Orbiter Finance</h2>
              <p className="text-neutral-600">Bridge • Cross-Chain • DeFi</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Orbiter Finance</strong> è un protocollo di bridging decentralizzato che facilita le transazioni cross-chain (o cross-rollup) all&apos;interno dell&apos;ecosistema Ethereum. Orbiter permette trasferimenti di asset nativi tra diverse reti Layer 2 e Layer 3 in modo sicuro ed efficiente, sfruttando le caratteristiche di sicurezza degli zk-rollup.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Orbiter Finance</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Trasferimenti Cross-Rollup">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Integrazione Multi-chain</h4>
              <p className="text-neutral-600 mb-3">
                Orbiter supporta numerose reti, tra cui Ethereum, zkSync Era, zkSync Lite, Arbitrum, Optimism, Polygon, BNB Chain, StarkNet, ImmutableX e molte altre. Questo consente trasferimenti fluidi di risorse tra diverse blockchain senza complicazioni.
              </p>
              <h4 className="font-semibold text-neutral-900">Transazioni Veloci</h4>
              <p className="text-neutral-600">
                Le transazioni tra due indirizzi esterni (EOA) possono essere completate in 10-20 secondi, rendendo Orbiter una delle soluzioni più rapide disponibili.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Sicurezza e Efficienza">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Sicurezza dei Rollup</h4>
              <p className="text-neutral-600 mb-3">
                Orbiter beneficia della sicurezza dei rollup, che sincronizzano i loro dati con la rete principale, garantendo la sicurezza del processo di trasferimento.
              </p>
              <h4 className="font-semibold text-neutral-900">Costi di Rete Bassi</h4>
              <p className="text-neutral-600">
                Orbiter offre costi di rete bassi, rendendo le transazioni tra EOA più economiche rispetto ad altre soluzioni.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Compatibilità e Flessibilità">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Ampia Compatibilità</h4>
              <p className="text-neutral-600 mb-3">
                Supporta rollup EVM e non-EVM, validium e rollup specifici per dApp, offrendo una vasta gamma di casi d&apos;uso e flessibilità nelle transazioni.
              </p>
              <h4 className="font-semibold text-neutral-900">Apertura e Trustless</h4>
              <p className="text-neutral-600">
                Orbiter consente l&apos;aggiunta decentralizzata di liquidità per vari token ERC20, permettendo agli sviluppatori di personalizzare le transazioni cross-rollup e gli eventi di messaggistica.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Meccanismo di Arbitrato">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Arbitration Mechanism</h4>
              <p className="text-neutral-600">
                In caso di controversie, il protocollo prevede un meccanismo di arbitrato che utilizza prove a conoscenza zero per risolvere i problemi, garantendo la sicurezza delle transazioni cross-rollup.
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
                <li>Polygon</li>
                <li>Avalanche</li>
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
                <li>zkSync Era</li>
                <li>zkSync Lite</li>
                <li>StarkNet</li>
                <li>Scroll</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Altri</h4>
              <List>
                <li>ImmutableX</li>
                <li>Loopring</li>
                <li>Metis</li>
                <li>Boba Network</li>
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
                  <li>Utilizza volumi significativi di asset</li>
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
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a Orbiter</h4>
                <List>
                  <li>Visita <a href="https://www.orbiter.finance/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">orbiter.finance</a></li>
                  <li>Clicca su &quot;Launch App&quot; per accedere all&apos;interfaccia</li>
                  <li>Collega il tuo portafoglio MetaMask</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Trasferimento Cross-Rollup</h4>
                <List>
                  <li>Seleziona la rete di origine e di destinazione</li>
                  <li>Scegli il token che desideri trasferire</li>
                  <li>Inserisci l&apos;importo da trasferire</li>
                  <li>Conferma la transazione in MetaMask</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Monitoraggio</h4>
                <List>
                  <li>Verifica lo stato della transazione</li>
                  <li>Controlla i dettagli del trasferimento</li>
                  <li>Monitora i costi e i tempi di elaborazione</li>
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
              <a href="https://www.orbiter.finance/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Orbiter Finance
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/Orbiter_Finance" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">🌉</span>
              <a href="https://app.orbiter.finance/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Orbiter Bridge App
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📊</span>
              <a href="https://orbiter.finance/analytics" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Analytics Dashboard
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">📚</span>
              <a href="https://docs.orbiter.finance/" 
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
