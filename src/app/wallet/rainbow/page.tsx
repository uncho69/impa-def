import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import rainbowIcon from "@/assets/rainbow-icon.png";
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

export default function Rainbow() {
  return (
    <ProtectedRoute title="Rainbow">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={rainbowIcon} alt="Rainbow" width={64} height={64} />
          <div>
            <SectionTitle>Rainbow</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-sm font-medium">
                Software Wallet
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Mobile First
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                User Friendly
              </span>
            </div>
          </div>
        </div>

        <SectionBody className="mt-4 gap-2">
          <p><strong>Rainbow</strong> è un wallet mobile elegante e user-friendly progettato per rendere l'uso delle criptovalute semplice e divertente. Con un design colorato e un'interfaccia intuitiva, Rainbow è perfetto per principianti ed esperti.</p>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Design Elegante" defaultOpen={true}>
            <List>
              <li>
                <strong>UI Colorata</strong>: Interfaccia visivamente accattivante e moderna.
              </li>
              <li>
                <strong>Mobile First</strong>: Progettato specificamente per dispositivi mobili.
              </li>
              <li>
                <strong>Animazioni Fluide</strong>: Transizioni smooth e interazioni intuitive.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Funzionalità Avanzate">
            <List>
              <li>
                <strong>DeFi Integration</strong>: Accesso diretto a protocolli DeFi popolari.
              </li>
              <li>
                <strong>NFT Support</strong>: Visualizzazione e gestione completa di NFT.
              </li>
              <li>
                <strong>Multi-Network</strong>: Supporto per Ethereum e Layer 2.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Sicurezza">
            <List>
              <li>
                <strong>Seed Phrase</strong>: Backup sicuro con frase di recupero a 12 parole.
              </li>
              <li>
                <strong>Biometric Security</strong>: Protezione con Touch ID o Face ID.
              </li>
              <li>
                <strong>Hardware Wallet Support</strong>: Integrazione con Ledger e Trezor.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Come Iniziare</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Installazione">
            <List>
              <li>
                <strong>Scarica Rainbow</strong>: Installa da <a href="https://apps.apple.com/app/rainbow-ethereum-wallet/id1457119021" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">App Store</a> o <a href="https://play.google.com/store/apps/details?id=me.rainbow" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">Google Play</a>.
              </li>
              <li>
                <strong>Crea Wallet</strong>: Segui la procedura guidata per creare un nuovo wallet.
              </li>
              <li>
                <strong>Imposta Sicurezza</strong>: Abilita Touch ID o Face ID per maggiore sicurezza.
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
                <strong>Ricevi Fondi</strong>: Copia il tuo indirizzo e ricevi ETH o altre criptovalute.
              </li>
              <li>
                <strong>Esplora DeFi</strong>: Scopri i protocolli DeFi integrati nell'app.
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
                title="Rainbow Tutorial"
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
                  Rainbow supporta Ethereum e le principali reti Layer 2.
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
                      href="https://rainbow.me" 
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
                      href="https://x.com/rainbowdotme" 
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
                      href="https://apps.apple.com/app/rainbow-ethereum-wallet/id1457119021" 
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