import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import scrollLogo from "@/assets/Scroll-Logo.svg";

export default function ScrollPage() {
  return (
    <>
      <PageTitle description="Layer 2 di Ethereum con tecnologia zkEVM">
        Scroll
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <Image 
              src={scrollLogo} 
              alt="Scroll" 
              className="w-16 h-16" 
              width={64}
              height={64}
            />
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Scroll</h2>
              <p className="text-neutral-600">Layer 2 • zkEVM • Ethereum</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Scroll</strong> è una soluzione Layer 2 per Ethereum che utilizza la tecnologia zkEVM per migliorare la scalabilità, ridurre i costi di transazione e mantenere la sicurezza della blockchain di Ethereum. Scroll è progettato per essere completamente compatibile con l&apos;Ethereum Virtual Machine (EVM), facilitando la migrazione delle applicazioni esistenti su Scroll senza modifiche significative.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Scroll</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Tecnologia zkEVM">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Zero-Knowledge Ethereum Virtual Machine</h4>
              <p className="text-neutral-600">
                Scroll utilizza una zkEVM (Zero-Knowledge Ethereum Virtual Machine) per generare prove crittografiche che attestano la validità delle transazioni eseguite. Questo approccio migliora la sicurezza e riduce i costi, mantenendo la compatibilità con l&apos;EVM.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Architettura di Scroll">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Settlement Layer</h4>
              <p className="text-neutral-600 mb-3">
                Utilizza Ethereum come livello di settlement per garantire la disponibilità dei dati e l&apos;ordinamento delle transazioni. Questo livello verifica le prove di validità e consente agli utenti e alle dApp di inviare messaggi e asset tra Ethereum e Scroll.
              </p>
              <h4 className="font-semibold text-neutral-900">Sequencing Layer</h4>
              <p className="text-neutral-600 mb-3">
                Include un Execution Node che esegue le transazioni e un Rollup Node che aggrega le transazioni in batch e le invia a Ethereum per la finalizzazione.
              </p>
              <h4 className="font-semibold text-neutral-900">Proving Layer</h4>
              <p className="text-neutral-600">
                Comprende un pool di prover responsabili della generazione delle prove di validità zkEVM e un coordinatore che gestisce queste prove e le invia al Rollup Node per la finalizzazione.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Costi di Transazione">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Struttura delle Commissioni</h4>
              <p className="text-neutral-600 mb-3">
                <strong>L2 Fee:</strong> Le transazioni su Scroll devono pagare una commissione per l&apos;esecuzione delle operazioni e la memorizzazione dei dati, calcolata in modo simile alle transazioni su Ethereum.
              </p>
              <p className="text-neutral-600">
                <strong>L1 Fee:</strong> Le transazioni devono anche pagare una commissione per la memorizzazione dei dati su Ethereum, che viene calcolata in base al numero di byte zero e non zero nella transazione RLP-encoded.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Pre-Alpha Testnet">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Testnet Attiva</h4>
              <p className="text-neutral-600">
                Scroll ha lanciato una pre-alpha testnet che supporta il deployment di smart contract, permettendo agli sviluppatori di testare e sperimentare con la piattaforma prima del lancio ufficiale.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Progetti su Scroll</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">DeFi</h4>
              <List>
                <li>Uniswap V3</li>
                <li>SyncSwap</li>
                <li>iZiSwap</li>
                <li>KyberSwap</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Bridge & Infrastructure</h4>
              <List>
                <li>Scroll Bridge</li>
                <li>LayerZero</li>
                <li>Wormhole</li>
                <li>Stargate</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">NFT & Gaming</h4>
              <List>
                <li>Scroll Name Service</li>
                <li>Scroll NFT Marketplace</li>
                <li>Gaming dApps</li>
                <li>Social Applications</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Tools & Utilities</h4>
              <List>
                <li>Scroll Explorer</li>
                <li>Faucet</li>
                <li>Developer Tools</li>
                <li>Analytics Platforms</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Utilizzo della Rete</h4>
                <List>
                  <li>Effettua transazioni regolari su Scroll</li>
                  <li>Utilizza il bridge ufficiale da Ethereum</li>
                  <li>Interagisci con dApp native di Scroll</li>
                  <li>Partecipa a DeFi su Scroll</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Volume e Frequenza</h4>
                <List>
                  <li>Mantieni un volume di transazioni consistente</li>
                  <li>Effettua transazioni regolari nel tempo</li>
                  <li>Partecipa a eventi e campagne</li>
                  <li>Interagisci con la community</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Progetti da Utilizzare">
            <div className="space-y-3">
              <p className="text-neutral-600">
                Per massimizzare le possibilità di airdrop, utilizza regolarmente questi progetti su Scroll:
              </p>
              <List>
                <li><strong>Scroll Bridge</strong> - Bridge ufficiale da Ethereum</li>
                <li><strong>Uniswap V3</strong> - Trading e liquidity providing</li>
                <li><strong>SyncSwap</strong> - DEX nativo di Scroll</li>
                <li><strong>iZiSwap</strong> - Concentrated liquidity</li>
                <li><strong>LayerZero</strong> - Cross-chain messaging</li>
                <li><strong>Stargate</strong> - Cross-chain transfers</li>
              </List>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://scroll.io/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Scroll
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/Scroll_ZKP" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">🌉</span>
              <a href="https://scroll.io/bridge" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Scroll Bridge
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📊</span>
              <a href="https://scrollscan.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Scroll Explorer
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">🚰</span>
              <a href="https://scroll.io/faucet" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Scroll Faucet
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
