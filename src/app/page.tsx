import Link from "next/link";
import Image from "next/image";
import VideoImage from "@/assets/Video.png";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section - Enhanced with 3D Effects */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-background py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <h1 className="animate-slide-down mb-6 tracking-tight">
                <span className="gradient-text text-4xl md:text-5xl lg:text-6xl">
                  Il tuo accesso al mondo Web3
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-neutral-700 mb-8 animate-slide-down [animation-delay:200ms]">
                Blockchain, DeFi, NFTs, memecoins, metaversi: tutto questo è Web3.
                Le opportunità sono infinite, ma anche le trappole.
                ImparoDeFi è la tua guida sicura per navigare questo nuovo mondo.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up [animation-delay:400ms]">
                <Link href="/registrati?next=/manuale" className="cssbuttons-io-button">
                  Inizia Subito
                  <div className="icon">
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="animate-fade-in [animation-delay:600ms] group">
              <div className="relative overflow-hidden rounded-2xl shadow-hard transition-all duration-700">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-30 animate-pulse-slow group-hover:opacity-50 transition-opacity"></div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src={VideoImage}
                    alt="ImparoDeFi Video Intro"
                    className="w-full h-auto object-cover rounded-2xl transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white/20 backdrop-blur-sm w-20 h-20 flex items-center justify-center shadow-lg border border-white/30 transition-transform cursor-pointer group-hover:bg-white/30 group-hover:shadow-2xl">
                      <svg className="h-10 w-10 text-white group-hover:text-primary-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Perché ImparoDeFi Section - Enhanced with 3D Cards and Animations */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Enhanced Background Pattern with Moving Gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05)_0%,transparent_50%)] animate-pulse-slow"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary-50/20 to-transparent animate-pulse-slow opacity-30"></div>
        </div>
        
        <div className="container-custom relative z-10">
          {/* Header with Enhanced Animation */}
          <div className="text-center mb-16">
            <h2 className="gradient-text text-5xl font-bold mb-6 transition-transform duration-300">
              Perché ImparoDeFi?
            </h2>
          </div>

          {/* Main Content - Enhanced 3D Layout */}
          <div className="max-w-6xl mx-auto">
            {/* Introduzione - Enhanced 3D Card */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-10 mb-16 border border-primary-100 transition-all duration-500 relative group">
              
              <div className="relative z-10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-6 text-primary-700 group-hover:text-primary-800 transition-colors">Introduzione</h3>
                    <div className="space-y-4 text-neutral-700 leading-relaxed text-lg">
                      <p>
                        I problemi di fiducia sono il motivo per cui le blockchain sono state create; è stato Bitcoin, e la mancanza di fiducia dei suoi creatori nei confronti dei sistemi monetari tradizionali sostenuti dai governi (fiat: USD, EUR, JPY, ecc.) ad accendere per la prima volta la fiamma di questa rivoluzione decentralizzata.
                      </p>
                      <p>
                        Come sappiamo, la blockchain di Bitcoin, soprattutto all&apos;epoca, era ancora limitata a essere principalmente un buon deposito di valore, sotto forma di valuta BTC, che i miner potevano produrre nei loro garage e guadagnare qualcosa. Non durò a lungo (la parte del garage), poiché presto si scoprì che le ricompense (i blocchi) erano limitate: man mano che venivano utilizzate sempre più GPU per il mining, non era più possibile farlo con i normali computer di casa, ma bisognava allestire strutture più grandi e complesse per minare BTC.
                      </p>
                      <p>
                        Le tecnologie Web3 hanno la capacità di migliorare la vita delle persone quando funzionano correttamente e quando gli utenti sanno cosa stanno facendo. Sfortunatamente, il settore ha avuto una barriera d&apos;ingresso relativamente alta per chi non è esperto di tecnologia, le persone comuni.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Il Problema e La Soluzione - Enhanced Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Il Problema - Enhanced 3D Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-red-100 transition-all duration-500 group relative">
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-red-600 group-hover:text-red-700 transition-colors">Il Problema</h3>
                  </div>
                  <div className="space-y-4 text-neutral-700 leading-relaxed">
                    <p>
                      Quando una persona nuova nel mondo Web3 cerca di capire di più sull&apos;ecosistema per eventualmente entrarvi, si trova di fronte a:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>Migliaia di criptovalute</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>Centinaia di blockchain</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>Migliaia di NFT</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>Difficoltà a orientarsi tra le blockchain</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>Truffatori e rischi di phishing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* La Nostra Soluzione - Enhanced 3D Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100 transition-all duration-500 group relative">
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors">La Nostra Soluzione</h3>
                  </div>
                  <div className="space-y-4 text-neutral-700 leading-relaxed">
                    <p>
                      Imparodefi consentirà ai nuovi aspiranti utenti Web3 di imparare esclusivamente da progetti realmente validi, selezionati dalle persone migliori per questo compito: veri esperti Web3 forgiati &quot;sul campo&quot;.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 hover:bg-green-100 transition-all duration-300 group-hover:shadow-lg">
                      <p className="text-green-800 font-semibold text-center">
                        Curazione fatta da veri esperti Web3
                      </p>
                    </div>
                    <p>
                      Gli esperti Web3 si trovano in comunità di nicchia; dal DeFi agli NFT, pochi gruppi si distinguono. Ogni comunità è governata da un token (o NFT), e i possessori di questi asset dimostrano reale coinvolgimento avendo speso i propri soldi per ottenerli.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Governance e Tokenomics - Enhanced Full Width */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-10 border border-blue-100 transition-all duration-500 relative group">
              
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-blue-700 group-hover:text-blue-800 transition-colors">Governance e Tokenomics</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4 text-neutral-700 leading-relaxed">
                    <p>
                      I possessori degli NFT Shroomiez saranno inizialmente coloro che guideranno il progetto, votando quali progetti aggiungere, rimuovere o mantenere su Imparodefi.
                    </p>
                    <p>
                      In futuro, gli smart contract potranno essere aggiornati tramite una funzione integrata per consentire l&apos;aggiunta o la rimozione di contratti token dalla piattaforma di governance di Imparodefi, permettendo a qualsiasi altra comunità di contribuire.
                    </p>
                  </div>
                  <div className="space-y-4 text-neutral-700 leading-relaxed">
                    <p>
                      Gli elettori in whitelist decidono anche come distribuire il budget di ciascuna epoch di Imparodefi tra i progetti approvati. L&apos;allocazione sarà poi suddivisa equamente tra i Creator Pool e i Promoter Pool.
                    </p>
                    <p>
                      Questa funzione potrà cambiare in futuro, consentendo agli elettori in whitelist di votare sulla percentuale di distribuzione dei premi tra i due pool per ciascun progetto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
