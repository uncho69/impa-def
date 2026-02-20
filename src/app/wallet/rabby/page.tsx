import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import rabbyIcon from "@/assets/rabby-icon.png";
// Loghi delle reti supportate
import ethereumIcon from "@/assets/ethereum-icon.svg";
import arbitrumIcon from "@/assets/arbitrum-arb-logo.svg";
import optimismIcon from "@/assets/optimism-ethereum-op-logo.svg";
import polygonIcon from "@/assets/polygon-matic-logo.svg";
import baseIcon from "@/assets/base-logo.svg";
import avalancheIcon from "@/assets/avalanche-avax-logo.svg";
import bscIcon from "@/assets/bsc-logo.png";
import gnosisIcon from "@/assets/gnosis-logo.png";
import lineaIcon from "@/assets/linea-logo.svg";
import scrollIcon from "@/assets/Scroll-Logo.svg";
import blastIcon from "@/assets/blast-logo.webp";
import xaiIcon from "@/assets/xai-logo.svg";

export default function Rabby() {
  return (
    <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={rabbyIcon} alt="Rabby" width={64} height={64} />
          <div>
            <SectionTitle>Rabby</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Software Wallet
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                DeFi Focused
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Advanced
              </span>
            </div>
          </div>
        </div>

        <SectionBody className="mt-4 gap-2">
          <p><strong>Rabby</strong> è un wallet browser avanzato progettato specificamente per utenti DeFi esperti. Offre funzionalità avanzate come simulazione di transazioni, gestione gas intelligente e supporto multi-chain per un'esperienza DeFi ottimale.</p>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Funzionalità Avanzate" defaultOpen={true}>
            <List>
              <li>
                <strong>Transaction Simulation</strong>: Simula le transazioni prima dell'esecuzione.
              </li>
              <li>
                <strong>Gas Optimization</strong>: Gestione intelligente delle commissioni gas.
              </li>
              <li>
                <strong>Multi-Chain Support</strong>: Supporto nativo per diverse blockchain.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="DeFi Integration">
            <List>
              <li>
                <strong>DEX Aggregation</strong>: Trova automaticamente i migliori prezzi sui DEX.
              </li>
              <li>
                <strong>Portfolio Tracking</strong>: Monitoraggio completo del portfolio multi-chain.
              </li>
              <li>
                <strong>Yield Farming</strong>: Accesso diretto a protocolli di yield farming.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Sicurezza">
            <List>
              <li>
                <strong>Seed Phrase</strong>: Backup sicuro con frase di recupero a 12 parole.
              </li>
              <li>
                <strong>Hardware Wallet Support</strong>: Integrazione con Ledger e Trezor.
              </li>
              <li>
                <strong>Transaction Review</strong>: Controllo dettagliato prima della conferma.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Come Iniziare</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Installazione">
            <List>
              <li>
                <strong>Scarica Rabby</strong>: Installa dal sito <a href="https://rabby.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">rabby.io</a>.
              </li>
              <li>
                <strong>Crea o Importa Wallet</strong>: Crea un nuovo wallet o importa uno esistente.
              </li>
              <li>
                <strong>Configura Reti</strong>: Aggiungi le blockchain che vuoi utilizzare.
              </li>
              <li>
                <strong>Salva la seed phrase</strong>: 
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold text-sm">Consiglio</span>
                    <p className="text-sm text-yellow-800 flex-1">
                      Scrivi la frase di recupero a 12 parole su carta e conservala in un posto sicuro. 
                      Non salvarla mai online o su dispositivi connessi a internet.
                    </p>
                  </div>
                </div>
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Prima Transazione">
            <List>
              <li>
                <strong>Ricevi Fondi</strong>: Copia il tuo indirizzo e ricevi criptovalute.
              </li>
              <li>
                <strong>Esplora DeFi</strong>: Scopri i protocolli DeFi integrati.
              </li>
              <li>
                <strong>Simula Transazioni</strong>: Usa la funzione di simulazione per testare le operazioni.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Video Tutorial">
            <div className="w-full max-w-2xl mx-auto">
              <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/K4TOrB7at0Y?si=vOBf2_Kw_RkdMPph"
                title="Rabby Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Reti Supportate */}
              <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-3">Reti Supportate</h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Rabby supporta tutte le principali reti EVM e blockchain.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Image 
                    src={ethereumIcon} 
                    alt="Ethereum" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={arbitrumIcon} 
                    alt="Arbitrum" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={optimismIcon} 
                    alt="Optimism" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={polygonIcon} 
                    alt="Polygon" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={baseIcon} 
                    alt="Base" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={avalancheIcon} 
                    alt="Avalanche" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={bscIcon} 
                    alt="BSC" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={gnosisIcon} 
                    alt="Gnosis" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={lineaIcon} 
                    alt="Linea" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={scrollIcon} 
                    alt="Scroll" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={blastIcon} 
                    alt="Blast" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={xaiIcon} 
                    alt="XAI" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                </div>
              </div>

              {/* Link Utili */}
              <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-3">Link Utili</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600">🌐</span>
                    <a 
                      href="https://rabby.io" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Sito Web
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600">🐦</span>
                    <a 
                      href="https://x.com/Rabby_io" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Twitter/X
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600">📱</span>
                    <a 
                      href="https://chrome.google.com/webstore/detail/rabby/acmacodjbdocokkpnlifncoacihohlcc" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Chrome Extension
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionBody>
    </MobileContainer>
  );
}