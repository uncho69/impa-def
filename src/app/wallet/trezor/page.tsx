
import Image from "next/image";
import trezorIcon from "@/assets/trezor-icon.png";
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

export default function TrezorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image src={trezorIcon} alt="Trezor" width={96} height={96} />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-neutral-900">Trezor</h1>
            <p className="text-xl text-neutral-600">
              Il primo e più sicuro hardware wallet al mondo
            </p>
          </div>

          {/* Contenuto principale */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Cos&apos;è Trezor?</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Trezor è il primo hardware wallet mai creato, sviluppato da SatoshiLabs nel 2014. È un dispositivo fisico che mantiene le tue chiavi private offline, offrendo il massimo livello di sicurezza per i tuoi asset digitali.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Disponibile in due modelli principali: Trezor One e Trezor Model T, entrambi offrono sicurezza di livello militare per le tue criptovalute.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Caratteristiche principali</h2>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sicurezza offline delle chiavi private</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Supporto per oltre 1.800 criptovalute</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Interfaccia web intuitiva</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Backup con seed phrase</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Integrazione con software wallet</span>
                </li>
              </ul>
            </div>

            {/* Sezione Reti Supportate */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-6 text-neutral-900">Reti Supportate</h2>
              <p className="text-neutral-600 mb-6">
                Trezor supporta le principali blockchain, offrendo sicurezza hardware per oltre 1.800 criptovalute.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Bitcoin */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={bitcoinIcon} alt="Bitcoin" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Bitcoin</span>
                </div>

                {/* Ethereum */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={ethereumIcon} alt="Ethereum" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Ethereum</span>
                </div>

                {/* Solana */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={solanaIcon} alt="Solana" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Solana</span>
                </div>

                {/* Optimism */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={optimismIcon} alt="Optimism" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Optimism</span>
                </div>

                {/* Arbitrum */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={arbitrumIcon} alt="Arbitrum" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Arbitrum</span>
                </div>

                {/* Polygon */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={polygonIcon} alt="Polygon" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Polygon</span>
                </div>

                {/* Base */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={baseIcon} alt="Base" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Base</span>
                </div>

                {/* Cosmos */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border border-cyan-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={cosmosIcon} alt="Cosmos" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Cosmos</span>
                </div>

                {/* Dogechain */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={dogechainIcon} alt="Dogechain" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Dogechain</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                <p className="text-sm text-orange-800">
                  <strong>🔒 Suggerimento:</strong> Trezor offre il massimo livello di sicurezza per tutte le reti supportate, mantenendo le tue chiavi private sempre offline.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Come iniziare</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Acquista il dispositivo</h3>
                    <p className="text-neutral-700">
                      Acquista Trezor dal sito ufficiale{" "}
                      <a 
                        href="https://trezor.io" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 underline font-medium transition-colors duration-200"
                      >
                        trezor.io
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Configura il wallet</h3>
                    <p className="text-neutral-700">Segui la procedura guidata per inizializzare il dispositivo</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Salva la seed phrase</h3>
                    <p className="text-neutral-700">Scrivi e conserva in sicurezza le 12 o 24 parole di recupero</p>
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
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Vantaggi di Trezor</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  <strong>Sicurezza massima:</strong> Le chiavi private rimangono sempre offline sul dispositivo fisico.
                </p>
                <p>
                  <strong>Affidabilità:</strong> Trezor è stato testato e utilizzato da milioni di utenti in tutto il mondo.
                </p>
                <p>
                  <strong>Supporto:</strong> Compatibile con la maggior parte dei software wallet e dApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
