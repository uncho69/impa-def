
import Image from "next/image";
import ledgerIcon from "@/assets/ledger-icon.png";

export default function LedgerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image src={ledgerIcon} alt="Ledger" width={96} height={96} />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-neutral-900">Ledger</h1>
            <p className="text-xl text-neutral-600">
              Il leader mondiale negli hardware wallet
            </p>
          </div>

          {/* Contenuto principale */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Cos&apos;è Ledger?</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Ledger è un&apos;azienda francese leader nella produzione di hardware wallet per criptovalute. I dispositivi Ledger utilizzano un chip Secure Element certificato per proteggere le tue chiavi private con il massimo livello di sicurezza.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Disponibile in diversi modelli, Ledger offre soluzioni per tutti i tipi di utenti, dai principianti agli esperti.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Caratteristiche principali</h2>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Chip Secure Element certificato</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Supporto per oltre 5.500 criptovalute</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>App Ledger Live integrata</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Staking diretto di criptovalute</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Integrazione con DeFi e NFT</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Come iniziare</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Acquista il dispositivo</h3>
                    <p className="text-neutral-700">Acquista Ledger dal sito ufficiale ledger.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Scarica Ledger Live</h3>
                    <p className="text-neutral-700">Scarica l&apos;app Ledger Live per desktop o mobile</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Configura il wallet</h3>
                    <p className="text-neutral-700">Segui la procedura guidata per inizializzare il dispositivo</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Inizia a usare</h3>
                    <p className="text-neutral-700">Ora puoi ricevere, inviare e gestire i tuoi asset in sicurezza</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Vantaggi di Ledger</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  <strong>Sicurezza certificata:</strong> Utilizza chip Secure Element certificati per la massima protezione.
                </p>
                <p>
                  <strong>Ecosistema completo:</strong> Ledger Live offre un&apos;esperienza completa per gestire le tue criptovalute.
                </p>
                <p>
                  <strong>Supporto esteso:</strong> Compatibile con la maggior parte delle dApp e servizi DeFi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
