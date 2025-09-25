import Image from "next/image";
import metamaskIcon from "@/assets/metamask-icon.svg";
// Loghi delle reti supportate
import ethereumIcon from "@/assets/ethereum-icon.svg";
import arbitrumIcon from "@/assets/arbitrum-arb-logo.svg";
import optimismIcon from "@/assets/optimism-ethereum-op-logo.svg";
import polygonIcon from "@/assets/polygon-matic-logo.svg";
import baseIcon from "@/assets/base-logo.svg";
import avalancheIcon from "@/assets/avalanche-avax-logo.svg";

export default function MetaMaskPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image src={metamaskIcon} alt="MetaMask" width={96} height={96} />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-neutral-900">MetaMask</h1>
            <p className="text-xl text-neutral-600">
              Il wallet più popolare e utilizzato nel mondo Web3
            </p>
          </div>

          {/* Contenuto principale */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Cos&apos;è MetaMask?</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                MetaMask è un wallet software che permette agli utenti di interagire con la blockchain Ethereum e altre reti compatibili. È disponibile come estensione per browser e come app mobile.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                MetaMask è stato creato da ConsenSys e si è affermato come uno dei wallet più affidabili e facili da usare per principianti ed esperti.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Caratteristiche principali</h2>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Interfaccia intuitiva e facile da usare</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Supporto per multiple reti blockchain</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Integrazione con dApp e marketplace</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Gestione sicura delle chiavi private</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Supporto per token ERC-20 e NFT</span>
                </li>
              </ul>
            </div>

            {/* Sezione Reti Supportate */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-6 text-neutral-900">Reti Supportate</h2>
              <p className="text-neutral-600 mb-6">
                MetaMask supporta una vasta gamma di reti blockchain, permettendoti di gestire i tuoi asset su diverse piattaforme.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

                {/* Avalanche */}
                <div className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Image src={avalancheIcon} alt="Avalanche" className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 text-center">Avalanche</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>💡 Suggerimento:</strong> Puoi aggiungere facilmente nuove reti personalizzate tramite le impostazioni di MetaMask.
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
                        href="https://metamask.io" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 underline font-medium transition-colors duration-200"
                      >
                        metamask.io
                      </a>{" "}
                      e scarica l&apos;estensione per il tuo browser
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
                    <p className="text-neutral-700">Ora puoi ricevere, inviare e gestire i tuoi asset digitali</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Sicurezza</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  <strong>Importante:</strong> MetaMask non ha mai accesso alle tue chiavi private. Queste sono crittografate e memorizzate localmente sul tuo dispositivo.
                </p>
                <p>
                  <strong>Seed Phrase:</strong> Le 12 parole di recupero sono l&apos;unico modo per ripristinare il tuo wallet. Non condividerle mai con nessuno e conservale in un posto sicuro.
                </p>
                <p>
                  <strong>Phishing:</strong> Fai sempre attenzione ai siti che chiedono di inserire la tua seed phrase. MetaMask non richiederà mai queste informazioni.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
