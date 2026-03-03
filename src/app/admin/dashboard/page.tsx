\"use client\";

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className=\"space-y-8\">
      {/* Header */}
      <div className=\"flex justify-between items-center\">
        <div>
          <h1 className=\"text-3xl font-bold text-gray-900\">Dashboard</h1>
          <p className=\"text-gray-600 mt-2\">
            Benvenuto nel pannello admin di ImparoDeFi. Scegli cosa gestire qui sotto.
          </p>
        </div>
      </div>

      {/* Azioni principali */}
      <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6\">
        <div className=\"bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between\">
          <div>
            <h2 className=\"text-xl font-bold text-gray-900 mb-2\">Articoli</h2>
            <p className=\"text-gray-600 text-sm mb-4\">
              Gestisci news, bozze e la sezione &quot;Cosa c&apos;è di nuovo&quot; del sito.
            </p>
          </div>
          <div className=\"flex flex-wrap gap-2\">
            <Link
              href=\"/admin/news\"
              className=\"inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors\"
            >
              Vai ad Articoli
            </Link>
            <Link
              href=\"/admin/news/new\"
              className=\"inline-flex items-center px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-colors\"
            >
              ➕ Nuovo articolo
            </Link>
          </div>
        </div>

        <div className=\"bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between\">
          <div>
            <h2 className=\"text-xl font-bold text-gray-900 mb-2\">Campagne</h2>
            <p className=\"text-gray-600 text-sm mb-4\">
              Crea e gestisci campagne, epoch, richieste di partecipazione e refresh delle leaderboard.
            </p>
          </div>
          <div className=\"flex flex-wrap gap-2\">
            <Link
              href=\"/admin/campaigns\"
              className=\"inline-flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors\"
            >
              Vai a Campagne
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
