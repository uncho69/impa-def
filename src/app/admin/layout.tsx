"use client";

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// import { PageLayout } from '@/components/PageLayout'; // Non più necessario

// AGGIORNA QUESTE EMAIL CON LE TUE REALI!
const ADMIN_EMAILS = [
  "jeffben69zos@gmail.com",    // La tua email per testing
  "admin@imparodefi.com",      // Email admin principale
  "cofounder@imparodefi.com",  // Email cofounder
  "lordbaconf@gmail.com"       // Admin per gestione articoli
];

function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [supportCount, setSupportCount] = useState<number | null>(null);
  const [loadTimeout, setLoadTimeout] = useState(false);
  const [forceEntry, setForceEntry] = useState(false);

  // Se Clerk non carica entro 3s, mostra messaggio invece di restare su "Verificando accesso..."
  useEffect(() => {
    const t = setTimeout(() => setLoadTimeout(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        window.location.href = '/sign-in';
        return;
      }

      const userEmail = user.emailAddresses?.[0]?.emailAddress;
      if (!userEmail || !isAdminEmail(userEmail)) {
        router.push('/');
        return;
      }
    }
  }, [user, isLoaded, router]);

  // Carica numero richieste supporto attive per badge nel menu
  useEffect(() => {
    if (!isLoaded || !user) return;
    const userEmail = user.emailAddresses?.[0]?.emailAddress;
    if (!userEmail || !isAdminEmail(userEmail)) return;

    let cancelled = false;
    const loadSupportCount = async () => {
      try {
        const res = await fetch('/api/admin/support/conversations?status=ACTIVE', {
          cache: 'no-store',
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          const list = Array.isArray(data.conversations) ? data.conversations : [];
          setSupportCount(list.length);
        }
      } catch {
        // silenzioso: il badge è solo informativo
      }
    };

    loadSupportCount();
    const interval = setInterval(loadSupportCount, 15000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [isLoaded, user]);

  // Mostra subito la dashboard: non bloccare mai la pagina. Redirect/negato solo quando Clerk è caricato e utente non è admin.
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;
  const isAdmin = userEmail ? isAdminEmail(userEmail) : false;
  const showAccessDenied = isLoaded && (!user || !isAdmin);
  const showUnverifiedBanner = !isLoaded && (loadTimeout || forceEntry);

  // Accesso negato solo quando Clerk ha caricato e l'utente non è admin
  if (showAccessDenied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Accesso Negato</h1>
          <p className="text-gray-600 mb-6">Non hai i permessi per accedere a questa sezione.</p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Torna alla Homepage
          </Link>
        </div>
      </div>
    );
  }

  const adminShell = (
    <div className="min-h-screen text-white">
      {showUnverifiedBanner && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-800">
          Verifica accesso in corso. Se Clerk non risponde, <button type="button" onClick={() => setForceEntry(true)} className="underline font-medium">entra comunque</button> o <a href="/sign-in" className="underline font-medium">accedi qui</a>.
        </div>
      )}
      <div className="bg-indigo-950/50 border-b border-indigo-500/20 backdrop-blur">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-white">🛡️ Admin Dashboard</h1>
              <nav className="flex space-x-6">
                <Link href="/admin/dashboard" className="text-slate-300 hover:text-white font-medium transition-colors">Dashboard</Link>
                <Link href="/admin/news" className="text-slate-300 hover:text-white font-medium transition-colors">Articoli</Link>
                <Link href="/admin/campaigns" className="text-slate-300 hover:text-white font-medium transition-colors">Campagne</Link>
                <Link href="/admin/learning-badges" className="text-slate-300 hover:text-white font-medium transition-colors">Learning &amp; Badge</Link>
                <Link href="/admin/projects" className="text-slate-300 hover:text-white font-medium transition-colors">Gestisci progetti</Link>
                <Link href="/admin/hacks-scams" className="text-slate-300 hover:text-white font-medium transition-colors">Hacks &amp; Scams</Link>
                <Link href="/admin/support" className="text-slate-300 hover:text-white font-medium transition-colors flex items-center gap-1">
                  Supporto
                  {supportCount !== null && supportCount > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[11px] font-semibold">{supportCount}</span>
                  )}
                </Link>
              </nav>
            </div>
            <div className="flex items-center" />
          </div>
        </div>
      </div>
      <main className="px-6 py-8">{children}</main>
    </div>
  );

  return adminShell;
}
