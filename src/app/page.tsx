import Link from "next/link";
import Image from "next/image";
import VideoImage from "@/assets/Video.png";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
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
                <Link href="/registrati?next=/manuale" className="btn-primary">
                  Inizia Subito
                </Link>
                <Link href="/newsletter" className="btn-outline">
                  Iscriviti alla Newsletter
                </Link>
              </div>
            </div>
            
            <div className="animate-fade-in [animation-delay:600ms]">
              <div className="relative overflow-hidden rounded-2xl shadow-hard">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-30 animate-pulse-slow"></div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src={VideoImage}
                    alt="ImparoDeFi Video Intro"
                    className="w-full h-auto object-cover rounded-2xl transform hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white/20 backdrop-blur-sm w-20 h-20 flex items-center justify-center shadow-lg border border-white/30 hover:scale-105 transition-transform cursor-pointer group">
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

      {/* Perché ImparoDeFi Section - Design Innovativo */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.03),transparent_70%)]"></div>
        <div className="container-custom relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mb-6">
              <span className="text-primary-700 font-semibold text-sm">La Nostra Missione</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 text-neutral-900">Perché ImparoDeFi?</h2>
          </div>
          
          {/* Main Content - Vertical Timeline Layout */}
          <div className="max-w-4xl mx-auto">
            {/* Introduzione */}
            <div className="relative mb-16">
              <div className="absolute left-8 top-0 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg"></div>
              <div className="ml-20">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-100">
                  <h3 className="text-2xl font-bold mb-4 text-neutral-900">Introduzione</h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Il mondo Web3 è in rapida evoluzione e offre opportunità straordinarie per chi sa navigarlo. 
                    Tuttavia, la complessità tecnica e la mancanza di fonti affidabili rendono difficile per molti 
                    iniziare questo viaggio in modo sicuro e consapevole.
                  </p>
                </div>
              </div>
              <div className="absolute left-8 top-16 w-0.5 h-16 bg-gradient-to-b from-primary-500 to-transparent"></div>
            </div>

            {/* Il Problema */}
            <div className="relative mb-16">
              <div className="absolute left-8 top-0 w-4 h-4 bg-red-500 rounded-full border-4 border-white shadow-lg"></div>
              <div className="ml-20">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-100">
                  <h3 className="text-2xl font-bold mb-4 text-neutral-900">Il Problema</h3>
                  <p className="text-neutral-700 leading-relaxed">
                    La maggior parte delle risorse educative sul Web3 sono troppo tecniche, incomplete o addirittura 
                    fuorvianti. Molti principianti si perdono in un mare di informazioni contrastanti, rischiando di 
                    commettere errori costosi o di cadere in truffe. La mancanza di un percorso strutturato e 
                    affidabile impedisce a molti di sfruttare le opportunità del Web3.
                  </p>
                </div>
              </div>
              <div className="absolute left-8 top-16 w-0.5 h-16 bg-gradient-to-b from-red-500 to-transparent"></div>
            </div>

            {/* La Nostra Soluzione */}
            <div className="relative mb-16">
              <div className="absolute left-8 top-0 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
              <div className="ml-20">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-100">
                  <h3 className="text-2xl font-bold mb-4 text-neutral-900">La Nostra Soluzione</h3>
                  <p className="text-neutral-700 leading-relaxed">
                    ImparoDeFi è la piattaforma educativa definitiva che colma questo gap. Offriamo contenuti 
                    curati da esperti del settore, organizzati in percorsi progressivi che guidano gli utenti 
                    dall&apos;abc fino alle strategie avanzate. La nostra missione è democratizzare l&apos;accesso 
                    al Web3, rendendo l&apos;apprendimento accessibile, sicuro e coinvolgente per tutti.
                  </p>
                </div>
              </div>
              <div className="absolute left-8 top-16 w-0.5 h-16 bg-gradient-to-b from-green-500 to-transparent"></div>
            </div>

            {/* Governance e Tokenomics */}
            <div className="relative">
              <div className="absolute left-8 top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
              <div className="ml-20">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-100">
                  <h3 className="text-2xl font-bold mb-4 text-neutral-900">Governance e Tokenomics</h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Crediamo nel potere della decentralizzazione e della comunità. Il nostro ecosistema è governato 
                    dai nostri utenti attraverso un sistema di governance trasparente e inclusivo. I token ImparoDeFi 
                    non sono solo un mezzo di pagamento, ma rappresentano la partecipazione attiva nella crescita 
                    e nell&apos;evoluzione della piattaforma, creando un circolo virtuoso di valore condiviso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Resta aggiornato</h2>
            <p className="text-lg text-neutral-700 mb-8">
              Inserisci la tua email per ottenere accesso gratuito all&apos;intera piattaforma e ricevere aggiornamenti sul mondo Web3.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="La tua email"
                className="input-field flex-grow"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Iscriviti Ora
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
