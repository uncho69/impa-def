import Link from "next/link";

export default function Abbonamento() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/50 to-background pt-20 pb-12">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">Sblocca tutta la piattaforma</h1>
          <p className="mt-4 text-neutral-700 max-w-2xl mx-auto">
            Abbonati ora per ottenere accesso completo a guide, tutorial, strumenti e aggiornamenti. Disdici quando vuoi.
          </p>
        </div>
      </section>

      {/* Piani */}
      <section id="piani" className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1 mese */}
            <div className="card">
              <div className="card-content">
                <h3 className="text-2xl font-bold">Mensile</h3>
                <p className="mt-2 text-neutral-600">1 mese</p>
                <div className="mt-4 text-4xl font-extrabold">€9,99</div>
                <ul className="mt-6 text-left text-neutral-700 space-y-2">
                  <li>Accesso completo</li>
                  <li>Aggiornamenti e nuove guide</li>
                  <li>Supporto community</li>
                </ul>
                <Link href="#" className="btn-primary mt-6 w-full">Scegli Mensile</Link>
              </div>
            </div>

            {/* 3 mesi */}
            <div className="card relative overflow-visible border-primary-200">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md ring-1 ring-white/60">Più scelto</div>
              <div className="card-content">
                <h3 className="text-2xl font-bold">Trimestrale</h3>
                <p className="mt-2 text-neutral-600">3 mesi</p>
                <div className="mt-4 text-4xl font-extrabold">€21,99</div>
                <p className="text-sm text-green-600 mt-1">Risparmi €7,98 rispetto al mensile</p>
                <ul className="mt-6 text-left text-neutral-700 space-y-2">
                  <li>Accesso completo</li>
                  <li>Aggiornamenti e nuove guide</li>
                  <li>Supporto prioritario</li>
                </ul>
                <Link href="#" className="btn-primary mt-6 w-full">Scegli Trimestrale</Link>
              </div>
            </div>

            {/* 12 mesi */}
            <div className="card">
              <div className="card-content">
                <h3 className="text-2xl font-bold">Annuale</h3>
                <p className="mt-2 text-neutral-600">12 mesi</p>
                <div className="mt-4 text-4xl font-extrabold">€69,99</div>
                <p className="text-sm text-green-600 mt-1">Risparmi €49,89 rispetto al mensile</p>
                <ul className="mt-6 text-left text-neutral-700 space-y-2">
                  <li>Accesso completo</li>
                  <li>Aggiornamenti e nuove guide</li>
                  <li>Benefit esclusivi</li>
                </ul>
                <Link href="#" className="btn-primary mt-6 w-full">Scegli Annuale</Link>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-neutral-600">
            Pagamenti supportati: PayPal, Apple Pay, Carte di Credito, Crypto
          </div>
        </div>
      </section>
    </div>
  );
}

