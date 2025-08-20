
import ledgerIcon from "@/assets/ledger-icon.png";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function LedgerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src={ledgerIcon.src} alt="Ledger" className="w-24 h-24" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Ledger
          </h1>
        </div>

        {/* Informazioni Principali */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">📋</span>
                </div>
                <span className="text-neutral-600 font-medium">Tags:</span>
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Portafoglio Non-custodial (Hardware Wallet)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">🔗</span>
                </div>
                <span className="text-neutral-600 font-medium">Profilo Twitter/X:</span>
                <a href="https://x.com/Ledger" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                  x.com/Ledger
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">🔗</span>
                </div>
                <span className="text-neutral-600 font-medium">Sito Web:</span>
                <a href="https://shop.ledger.com/" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                  shop.ledger.com/
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">🔗</span>
                </div>
                <span className="text-neutral-600 font-medium">Token/NFT:</span>
                <span className="text-neutral-400">Empty</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">📅</span>
                </div>
                <span className="text-neutral-600 font-medium">Last Updated:</span>
                <span className="text-neutral-900">June 8, 2024</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center mt-1">
                  <span className="text-neutral-600 text-sm">📋</span>
                </div>
                <div>
                  <span className="text-neutral-600 font-medium block mb-2">Blockchain Supported:</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Bitcoin</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Ethereum</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Solana</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Cosmos</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Dogechain</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Arbitrum</span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Optimism</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Polygon</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Base</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrizione */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
          <p className="text-neutral-600 leading-relaxed text-lg">
            Ledger è una delle principali aziende nel settore della sicurezza delle criptovalute, specializzata nella produzione di hardware wallet. Fondata nel 2014 e di origine Francesi, Ledger offre soluzioni di sicurezza avanzate per la gestione e la protezione delle criptovalute. Gli hardware wallet prodotti da Ledger sono tra i più popolari e utilizzati al mondo, grazie alla loro robustezza e affidabilità.
          </p>
        </div>

        {/* Sezioni Espandibili */}
        <div className="space-y-6">
            <Accordion buttonText="Prodotti (Hardware Wallet) Offerti da Ledger">
              <List>
                <li>Ledger Nano S</li>
                <li>Ledger Nano X</li>
                <li>Ledger Live</li>
              </List>
            </Accordion>

            <Accordion buttonText="Ledger Nano S">
              <p className="text-neutral-600 mb-4">
                Il Ledger Nano S è uno dei wallet hardware più venduti al mondo. Offre un elevato livello di sicurezza a un prezzo accessibile, ideale per gli utenti che desiderano proteggere le proprie criptovalute senza spendere troppo.
              </p>
              <h4 className="text-lg font-semibold text-neutral-900 mb-3">Caratteristiche:</h4>
              <List>
                <li>Supporta oltre 1.500 criptovalute e token.</li>
                <li>Memoria per un massimo di 6 applicazioni crittografiche contemporaneamente.</li>
                <li>Display OLED integrato per verificare le transazioni.</li>
                <li>Protezione tramite un PIN e la frase di recupero (seed phrase) di 24 parole.</li>
                <li>Connessione tramite cavo USB.</li>
              </List>
            </Accordion>

            <Accordion buttonText="Ledger Nano X">
              <p className="text-neutral-600 mb-4">
                Il Ledger Nano X è una versione più avanzata del Nano S, con funzionalità aggiuntive e una maggiore capacità di memoria. È progettato per utenti che gestiscono un portafoglio di criptovalute più diversificato.
              </p>
              <h4 className="text-lg font-semibold text-neutral-900 mb-3">Caratteristiche:</h4>
              <List>
                <li>Supporta oltre 1.500 criptovalute e token.</li>
                <li>Memoria per un massimo di 100 applicazioni crittografiche contemporaneamente.</li>
                <li>Display OLED integrato per verificare le transazioni.</li>
                <li>Protezione tramite un PIN e la frase di recupero (seed phrase) di 24 parole.</li>
                <li>Connettività Bluetooth, oltre alla connessione tramite cavo USB, per un uso più comodo con dispositivi mobili.</li>
                <li>Batteria ricaricabile integrata.</li>
              </List>
            </Accordion>

            <Accordion buttonText="Ledger Live">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Descrizione:</h4>
                <p className="text-neutral-600">
                  Ledger Live è un&apos;applicazione software che permette di gestire facilmente le criptovalute su hardware wallet Ledger. È disponibile per desktop (Windows, macOS, Linux) e dispositivi mobili (iOS, Android).
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Caratteristiche:</h4>
                <List>
                  <li>Interfaccia user-friendly per gestire e monitorare le criptovalute.</li>
                  <li>Funzionalità di acquisto, vendita, scambio e staking di criptovalute.</li>
                  <li>Supporto per l&apos;installazione e l&apos;aggiornamento delle applicazioni crittografiche sui dispositivi Ledger.</li>
                  <li>Integrazione con i servizi di DeFi (Finanza Decentralizzata).</li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText="Sicurezza e Vantaggi">
              <List>
                <li>
                  <strong>Protezione delle Chiavi Private:</strong> Le chiavi private sono memorizzate in modo sicuro all&apos;interno del dispositivo Ledger e non lasciano mai il dispositivo, proteggendo gli utenti anche se il computer o il telefono sono compromessi.
                </li>
                <li>
                  <strong>Autenticazione a Due Fattori:</strong> Il wallet Ledger supporta l&apos;autenticazione a due fattori per un livello di sicurezza aggiuntivo.
                </li>
                <li>
                  <strong>Supporto Multivaluta:</strong> Ledger Nano S e Nano X supportano una vasta gamma di criptovalute, inclusi Bitcoin (BTC), Ethereum (ETH), Ripple (XRP), e molte altre.
                </li>
              </List>
            </Accordion>
        </div>
      </div>
    </div>
  );
}
