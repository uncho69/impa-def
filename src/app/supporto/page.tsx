import { PageLayout } from "@/components/PageLayout";
import { ExploreWeb3 } from "@/components/ExploreWeb3";
import Link from "next/link";

export default function Supporto() {
  return (
    <PageLayout 
      title="Assistenza" 
      description="Hai bisogno di aiuto? Siamo qui per te"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
        <p className="text-neutral-700">
          Hai bisogno di aiuto con ImparoDeFi? Qui trovi risposte rapide e i canali per contattarci.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-6">FAQ</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Come sblocco l&apos;accesso completo? Vai su <Link href="/abbonamento" className="text-primary-600 hover:underline">Abbonamento</Link> e scegli il piano che preferisci.
          </li>
          <li>
            Posso disdire quando voglio? Sì, puoi disdire in qualsiasi momento dal tuo profilo.
          </li>
          <li>
            Quali pagamenti accettate? PayPal, Apple Pay, carte e crypto.
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-6">Contatti</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-neutral-200 bg-white">
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-neutral-700 text-sm">support@imparodefi.it</p>
          </div>
          <div className="p-4 rounded-lg border border-neutral-200 bg-white">
            <h3 className="font-semibold mb-1">Telegram</h3>
            <p className="text-neutral-700 text-sm">t.me/imparodefi</p>
          </div>
          <div className="p-4 rounded-lg border border-neutral-200 bg-white">
            <h3 className="font-semibold mb-1">X (Twitter)</h3>
            <p className="text-neutral-700 text-sm">@imparodefi</p>
          </div>
        </div>
      </div>
      
      <ExploreWeb3 />
    </PageLayout>
  );
}

