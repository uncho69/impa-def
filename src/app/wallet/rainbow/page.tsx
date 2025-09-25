
import Image from "next/image";
import rainbowIcon from "@/assets/rainbow-icon.png";
// Loghi delle reti supportate
import ethereumIcon from "@/assets/ethereum-icon.svg";
import arbitrumIcon from "@/assets/arbitrum-arb-logo.svg";
import optimismIcon from "@/assets/optimism-ethereum-op-logo.svg";
import polygonIcon from "@/assets/polygon-matic-logo.svg";
import baseIcon from "@/assets/base-logo.svg";

export default function RainbowPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image src={rainbowIcon} alt="Rainbow" width={96} height={96} />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-neutral-900">Rainbow</h1>
            <p className="text-xl text-neutral-600">
              Il wallet più colorato e user-friendly per Ethereum
            </p>
          </div>

          {/* Contenuto principale */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Cos&apos;è Rainbow?</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Rainbow è un wallet mobile non-custodial progettato per offrire la migliore esperienza utente possibile nell&apos;ecosistema Ethereum. Con la sua interfaccia colorata e intuitiva, rende l&apos;uso delle criptovalute accessibile a tutti.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Disponibile solo per iOS e Android, Rainbow si concentra sulla semplicità d&apos;uso senza compromettere la sicurezza.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Caratteristiche principali</h2>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Interfaccia colorata e moderna</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Supporto completo per Ethereum e token ERC-20</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Gestione NFT integrata</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Integrazione con dApp Ethereum</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Design mobile-first</span>
                </li>
              </ul>
            </div>

            {/* Sezione Reti Supportate */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-6 text-neutral-900">Reti Supportate</h2>
              <p className="text-neutral-600 mb-6">
                Rainbow supporta le principali reti EVM, permettendoti di gestire i tuoi asset su diverse piattaforme Ethereum-compatibili.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Ethereum */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={ethereumIcon} alt="Ethereum" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Ethereum</span>
                </div>

                {/* Polygon */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={polygonIcon} alt="Polygon" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Polygon</span>
                </div>

                {/* Arbitrum */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={arbitrumIcon} alt="Arbitrum" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Arbitrum</span>
                </div>

                {/* Optimism */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={optimismIcon} alt="Optimism" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Optimism</span>
                </div>

                {/* Base */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl border border-indigo-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={baseIcon} alt="Base" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Base</span>
                </div>

              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200">
                <p className="text-sm text-pink-800">
                  <strong>🌈 Suggerimento:</strong> Rainbow è ottimizzato per Ethereum e le sue Layer 2, offrendo un'esperienza fluida su tutte le reti supportate.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Come iniziare</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Scarica l&apos;app</h3>
                    <p className="text-neutral-700">
                      Scarica Rainbow dall&apos;{" "}
                      <a 
                        href="https://apps.apple.com/app/rainbow-ethereum-wallet/id1457119021" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 underline font-medium transition-colors duration-200"
                      >
                        App Store
                      </a>{" "}
                      o{" "}
                      <a 
                        href="https://play.google.com/store/apps/details?id=me.rainbow" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 underline font-medium transition-colors duration-200"
                      >
                        Google Play
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Crea un wallet</h3>
                    <p className="text-neutral-700">Segui la procedura guidata per creare un nuovo wallet</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Salva la seed phrase</h3>
                    <p className="text-neutral-700">Scrivi e conserva in sicurezza le 12 parole di recupero</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Inizia a usare</h3>
                    <p className="text-neutral-700">Ora puoi ricevere, inviare e gestire i tuoi asset Ethereum</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Vantaggi di Rainbow</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  <strong>Semplicità:</strong> Rainbow è progettato per essere il più semplice possibile da usare, perfetto per principianti.
                </p>
                <p>
                  <strong>Bellezza:</strong> L&apos;interfaccia è curata nei minimi dettagli, rendendo l&apos;esperienza piacevole e coinvolgente.
                </p>
                <p>
                  <strong>Performance:</strong> Ottimizzato per dispositivi mobili, offre transazioni veloci e responsive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
