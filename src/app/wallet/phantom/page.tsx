import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import phantomIcon from "@/assets/phantom-icon.png";
// Loghi delle reti supportate
import solanaIcon from "@/assets/solana-sol-logo.svg";
import ethereumIcon from "@/assets/ethereum-icon.svg";
import bitcoinIcon from "@/assets/bitcoin-icon.svg";
import polygonIcon from "@/assets/polygon-matic-logo.svg";
import arbitrumIcon from "@/assets/arbitrum-arb-logo.svg";
import optimismIcon from "@/assets/optimism-ethereum-op-logo.svg";
import baseIcon from "@/assets/base-logo.svg";

export default function Phantom() {
  return (
    <ProtectedRoute title="Phantom">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={phantomIcon} alt="Phantom" width={64} height={64} />
          <div>
            <SectionTitle>Phantom</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Software Wallet
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                Solana Native
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Multi-Chain
              </span>
            </div>
          </div>
        </div>

        <SectionBody className="mt-4 gap-2">
          <strong>Phantom</strong> è il wallet principale per l'ecosistema Solana, progettato 
          per offrire un'esperienza utente fluida e intuitiva. Con supporto multi-chain 
          e funzionalità DeFi avanzate, Phantom è la porta d'accesso ideale per Solana.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Solana Native" defaultOpen={true}>
            <List>
              <li>
                <strong>Solana Optimized</strong>: Progettato specificamente per l'ecosistema Solana.
              </li>
              <li>
                <strong>Transazioni Veloci</strong>: Sfrutta la velocità e i bassi costi di Solana.
              </li>
              <li>
                <strong>SPL Token Support</strong>: Gestione completa di token SPL.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Funzionalità DeFi">
            <List>
              <li>
                <strong>DEX Integration</strong>: Accesso diretto a Jupiter, Raydium e altri DEX.
              </li>
              <li>
                <strong>Staking</strong>: Staking diretto di SOL e token SPL.
              </li>
              <li>
                <strong>NFT Support</strong>: Visualizzazione e gestione di NFT Solana.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Multi-Chain Support">
            <List>
              <li>
                <strong>Ethereum</strong>: Supporto per Ethereum e reti EVM.
              </li>
              <li>
                <strong>Bitcoin</strong>: Gestione di Bitcoin e Lightning Network.
              </li>
              <li>
                <strong>Layer 2</strong>: Supporto per Arbitrum, Optimism, Polygon e Base.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Come Iniziare</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Installazione">
            <List>
              <li>
                <strong>Scarica Phantom</strong>: Installa dal sito <a href="https://phantom.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">phantom.app</a>.
              </li>
              <li>
                <strong>Crea Wallet</strong>: Segui la procedura guidata per creare un nuovo wallet.
              </li>
              <li>
                <strong>Configura Sicurezza</strong>: Imposta password e abilita autenticazione biometrica.
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
                <strong>Ricevi SOL</strong>: Copia il tuo indirizzo Solana e ricevi SOL.
              </li>
              <li>
                <strong>Esplora DeFi</strong>: Scopri i protocolli DeFi su Solana.
              </li>
              <li>
                <strong>Gestisci NFT</strong>: Visualizza e gestisci la tua collezione NFT.
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
                title="Phantom Tutorial"
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
                  Phantom supporta Solana e le principali blockchain multi-chain.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Image 
                    src={solanaIcon} 
                    alt="Solana" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={ethereumIcon} 
                    alt="Ethereum" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={bitcoinIcon} 
                    alt="Bitcoin" 
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
                    src={baseIcon} 
                    alt="Base" 
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
                      href="https://phantom.app" 
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
                      href="https://x.com/phantom" 
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
                      href="https://apps.apple.com/app/phantom-solana-wallet/id1598432977" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      App Store
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}