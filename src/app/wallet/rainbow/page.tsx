
import rainbowIcon from "@/assets/rainbow-icon.png";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function RainbowPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src={rainbowIcon.src} alt="Rainbow" className="w-24 h-24" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Rainbow
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
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    Portafoglio &apos;Wallet&apos; Non-custodial (Extension)
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Airdrop
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">🔗</span>
                </div>
                <span className="text-neutral-600 font-medium">Profilo Twitter/X:</span>
                <a href="https://x.com/rainbowdotme" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                  x.com/rainbowdotme
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">🔗</span>
                </div>
                <span className="text-neutral-600 font-medium">Sito Web:</span>
                <a href="https://rainbow.me/" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                  rainbow.me/
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
                <span className="text-neutral-900">May 29, 2024</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center mt-1">
                  <span className="text-neutral-600 text-sm">📋</span>
                </div>
                <div>
                  <span className="text-neutral-600 font-medium block mb-2">Blockchain Supported:</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Ethereum</span>
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
            Rainbow Wallet è un portafoglio di criptovalute non-custodial progettato per Ethereum e altri asset basati su Ethereum. Con una forte attenzione alla sicurezza e alla privacy, Rainbow è noto per la sua interfaccia user-friendly e le sue funzionalità avanzate che lo rendono ideale sia per i nuovi utenti che per gli esperti di criptovalute.
          </p>
        </div>

        {/* Sezioni Espandibili */}
        <div className="space-y-6">
            <Accordion buttonText="Supporto Multi-Chain">
              <List>
                <li>
                  <strong>Blockchain Supportate:</strong> Principalmente Ethereum, con supporto per altri asset basati su questa blockchain.
                </li>
                <li>
                  <strong>Gestione Unificata:</strong> Permette di gestire tutte le tue criptovalute e NFT in un unico portafoglio senza dover cambiare tra diverse reti.
                </li>
              </List>
            </Accordion>

            <Accordion buttonText="Sicurezza Avanzata">
              <List>
                <li>
                  <strong>Autocustodia:</strong> Gli utenti hanno il controllo completo delle loro chiavi private, che sono generate e memorizzate localmente sui dispositivi degli utenti.
                </li>
                <li>
                  <strong>Rilevamento di Scam:</strong> Rileva e segnala transazioni sospette o potenzialmente pericolose.
                </li>
                <li>
                  <strong>Backup Sicuro:</strong> Opzioni di backup su iCloud per iOS e Google Drive per Android, oltre alla possibilità di annotare manualmente la frase di recupero su un pezzo di carta.
                </li>
              </List>
            </Accordion>

            <Accordion buttonText="Interfaccia User-Friendly">
              <List>
                <li>
                  <strong>Facilità d&apos;Uso:</strong> Un&apos;interfaccia semplice e intuitiva che rende la gestione delle criptovalute e degli NFT accessibile anche ai principianti.
                </li>
                <li>
                  <strong>Open Source:</strong> Il codice di Rainbow è open source, permettendo alla comunità di controllare e migliorare continuamente la sicurezza e l&apos;affidabilità del portafoglio.
                </li>
              </List>
            </Accordion>

            <Accordion buttonText="Funzionalità per NFT">
              <List>
                <li>
                  <strong>Gestione Completa degli NFT:</strong> Visualizza, elenca, brucia e nasconde NFT direttamente dal portafoglio.
                </li>
                <li>
                  <strong>Accesso ai Mercati NFT:</strong> Accesso integrato ai principali mercati NFT per acquistare e vendere NFT facilmente.
                </li>
              </List>
            </Accordion>

            <Accordion buttonText="Integrazione con Hardware Wallet">
              <p className="text-neutral-600">
                Supporto per Trezor e Ledger: Rainbow si integra con hardware wallet come Trezor e Ledger per una sicurezza aggiuntiva.
              </p>
            </Accordion>
        </div>
      </div>
    </div>
  );
}
