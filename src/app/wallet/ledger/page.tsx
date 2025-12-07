import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import ledgerIcon from "@/assets/ledger-icon.png";
// Loghi delle reti supportate
import bitcoinIcon from "@/assets/bitcoin-icon.svg";
import ethereumIcon from "@/assets/ethereum-icon.svg";
import solanaIcon from "@/assets/solana-sol-logo.svg";
import optimismIcon from "@/assets/optimism-ethereum-op-logo.svg";
import arbitrumIcon from "@/assets/arbitrum-arb-logo.svg";
import polygonIcon from "@/assets/polygon-matic-logo.svg";
import baseIcon from "@/assets/base-logo.svg";
import cosmosIcon from "@/assets/cosmos-logo.png";
import dogechainIcon from "@/assets/dogechain-logo.png";

export default function Ledger() {
  return (
    <ProtectedRoute title="Ledger">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={ledgerIcon} alt="Ledger" width={64} height={64} />
          <div>
            <SectionTitle>Ledger</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Hardware Wallet
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Cold Storage
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Security
              </span>
            </div>
          </div>
        </div>

        <SectionBody className="mt-4 gap-2">
          <p><strong>Ledger</strong> è uno dei wallet hardware più sicuri e affidabili del mercato. Offre protezione offline per le tue criptovalute, mantenendo le chiavi private sempre al sicuro nel dispositivo fisico, lontano da potenziali minacce online.</p>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Sicurezza Hardware" defaultOpen={true}>
            <List>
              <li>
                <strong>Secure Element</strong>: Chip di sicurezza certificato che protegge le chiavi private.
              </li>
              <li>
                <strong>Offline Storage</strong>: Le chiavi private non lasciano mai il dispositivo fisico.
              </li>
              <li>
                <strong>PIN Protection</strong>: Accesso protetto da PIN e passphrase opzionale.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Gestione Multi-Currency">
            <List>
              <li>
                <strong>1000+ Criptovalute</strong>: Supporta Bitcoin, Ethereum, Solana e molte altre.
              </li>
              <li>
                <strong>Ledger Live</strong>: App ufficiale per gestire portfolio e transazioni.
              </li>
              <li>
                <strong>DeFi Integration</strong>: Accesso diretto a protocolli DeFi popolari.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Facilità d'Uso">
            <List>
              <li>
                <strong>Setup Semplice</strong>: Configurazione guidata in pochi minuti.
              </li>
              <li>
                <strong>Backup Seed</strong>: Recupero sicuro con frase di recupero a 24 parole.
              </li>
              <li>
                <strong>Portabilità</strong>: Dispositivo compatto e portatile.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Come Iniziare</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Setup Iniziale">
            <List>
              <li>
                <strong>Scarica Ledger Live</strong>: Installa l'app ufficiale dal sito <a href="https://ledger.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">ledger.com</a>.
              </li>
              <li>
                <strong>Collega il Dispositivo</strong>: Connetti il tuo Ledger al computer via USB.
              </li>
              <li>
                <strong>Configura PIN</strong>: Imposta un PIN sicuro per proteggere il dispositivo.
              </li>
              <li>
                <strong>Salva la seed phrase</strong>: 
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-yellow-600 font-bold text-sm">Consiglio</span>
                    <p className="text-sm text-yellow-800 flex-1">
                      Scrivi la frase di recupero a 24 parole su carta e conservala in un posto sicuro. 
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
                <strong>Installa App Coin</strong>: Aggiungi le app delle criptovalute che vuoi gestire.
              </li>
              <li>
                <strong>Ricevi Fondi</strong>: Genera un indirizzo e ricevi le tue prime criptovalute.
              </li>
              <li>
                <strong>Invia Transazione</strong>: Conferma le transazioni direttamente sul dispositivo.
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
                title="Ledger Tutorial"
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
                  Ledger supporta oltre 1000 criptovalute e token su diverse blockchain.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Image 
                    src={bitcoinIcon} 
                    alt="Bitcoin" 
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
                    src={solanaIcon} 
                    alt="Solana" 
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
                    src={arbitrumIcon} 
                    alt="Arbitrum" 
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
                    src={cosmosIcon} 
                    alt="Cosmos" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={dogechainIcon} 
                    alt="Dogechain" 
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
                      href="https://ledger.com" 
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
                      href="https://x.com/Ledger" 
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
                      href="https://apps.apple.com/app/ledger-live/id1361671700" 
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