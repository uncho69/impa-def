
import Image from "next/image";
import phantomIcon from "@/assets/phantom-icon.png";
// Loghi delle reti supportate
import solanaIcon from "@/assets/solana-sol-logo.svg";
import ethereumIcon from "@/assets/ethereum-icon.svg";
import polygonIcon from "@/assets/polygon-matic-logo.svg";
import bitcoinIcon from "@/assets/bitcoin-icon.svg";

export default function PhantomPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image src={phantomIcon} alt="Phantom" width={96} height={96} />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-neutral-900">Phantom</h1>
            <p className="text-xl text-neutral-600">
              Il wallet più popolare per l&apos;ecosistema Solana
            </p>
          </div>

          {/* Contenuto principale */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Cos&apos;è Phantom?</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Phantom è un wallet non-custodial progettato specificamente per l&apos;ecosistema Solana. Offre un&apos;esperienza utente intuitiva e moderna per gestire SOL, token SPL e NFT.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Disponibile come estensione per browser e app mobile, Phantom è diventato il wallet di riferimento per gli utenti Solana.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Caratteristiche principali</h2>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Interfaccia elegante e moderna</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Supporto completo per Solana e token SPL</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Gestione NFT integrata</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Staking diretto di SOL</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Integrazione con dApp Solana</span>
                </li>
              </ul>
            </div>

            {/* Sezione Reti Supportate */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-6 text-neutral-900">Reti Supportate</h2>
              <p className="text-neutral-600 mb-6">
                Phantom supporta le principali blockchain, permettendoti di gestire i tuoi asset su diverse piattaforme.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Solana */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={solanaIcon} alt="Solana" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Solana</span>
                </div>

                {/* Ethereum */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={ethereumIcon} alt="Ethereum" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Ethereum</span>
                </div>

                {/* Polygon */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={polygonIcon} alt="Polygon" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Polygon</span>
                </div>

                {/* Bitcoin */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={bitcoinIcon} alt="Bitcoin" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Bitcoin</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                <p className="text-sm text-purple-800">
                  <strong>💡 Suggerimento:</strong> Phantom è ottimizzato per Solana, ma supporta anche altre reti per una gestione completa dei tuoi asset.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Come iniziare</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Scarica l&apos;estensione</h3>
                    <p className="text-neutral-700">
                      Vai su{" "}
                      <a 
                        href="https://phantom.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 underline font-medium transition-colors duration-200"
                      >
                        phantom.app
                      </a>{" "}
                      e scarica l&apos;estensione per il tuo browser
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Crea un wallet</h3>
                    <p className="text-neutral-700">Segui la procedura guidata per creare un nuovo wallet Solana</p>
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
                    <p className="text-neutral-700">Ora puoi ricevere, inviare e gestire i tuoi asset Solana</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Vantaggi di Solana</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  <strong>Velocità:</strong> Solana può processare fino a 65.000 transazioni al secondo, rendendo le operazioni istantanee.
                </p>
                <p>
                  <strong>Costi bassi:</strong> Le commissioni di transazione sono estremamente basse, spesso meno di $0.01.
                </p>
                <p>
                  <strong>Ecosistema ricco:</strong> Solana ospita numerose dApp, DeFi protocols e marketplace NFT.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
