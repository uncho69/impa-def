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
