

export default function RainbowPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-4xl font-bold">🌈</span>
            </div>
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
          {/* Supporto Multi-Chain */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-3">
                <span className="text-primary-600">▼</span>
                Supporto Multi-Chain
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Blockchain Supportate:</strong> Principalmente Ethereum, con supporto per altri asset basati su questa blockchain.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Gestione Unificata:</strong> Permette di gestire tutte le tue criptovalute e NFT in un unico portafoglio senza dover cambiare tra diverse reti.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Sicurezza Avanzata */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-3">
                <span className="text-primary-600">▼</span>
                Sicurezza Avanzata
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Autocustodia:</strong> Gli utenti hanno il controllo completo delle loro chiavi private, che sono generate e memorizzate localmente sui dispositivi degli utenti.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Rilevamento di Scam:</strong> Rileva e segnala transazioni sospette o potenzialmente pericolose.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Backup Sicuro:</strong> Opzioni di backup su iCloud per iOS e Google Drive per Android, oltre alla possibilità di annotare manualmente la frase di recupero su un pezzo di carta.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Interfaccia User-Friendly */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-3">
                <span className="text-primary-600">▼</span>
                Interfaccia User-Friendly
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Facilità d&apos;Uso:</strong> Un&apos;interfaccia semplice e intuitiva che rende la gestione delle criptovalute e degli NFT accessibile anche ai principianti.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Open Source:</strong> Il codice di Rainbow è open source, permettendo alla comunità di controllare e migliorare continuamente la sicurezza e l&apos;affidabilità del portafoglio.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Funzionalità per NFT */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-3">
                <span className="text-primary-600">▼</span>
                Funzionalità per NFT
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Gestione Completa degli NFT:</strong> Visualizza, elenca, brucia e nasconde NFT direttamente dal portafoglio.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Accesso ai Mercati NFT:</strong> Accesso integrato ai principali mercati NFT per acquistare e vendere NFT facilmente.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Integrazione con Hardware Wallet */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-3">
                <span className="text-primary-600">▼</span>
                Integrazione con Hardware Wallet
              </h3>
            </div>
            <div className="p-6">
              <p className="text-neutral-600">
                Supporto per Trezor e Ledger: Rainbow si integra con hardware wallet come Trezor e Ledger per una sicurezza aggiuntiva.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
