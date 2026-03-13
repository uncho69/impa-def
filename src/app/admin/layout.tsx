"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppAuth } from '@/lib/auth/useAppAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import AutoTranslateText from '@/components/AutoTranslateText';
// import { PageLayout } from '@/components/PageLayout'; // Non più necessario

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const { isLoaded, isSignedIn } = useAppAuth();
  const router = useRouter();
  const [supportCount, setSupportCount] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setIsAdmin(false);
      setCheckingAdmin(false);
      router.push('/');
      return;
    }

    let cancelled = false;
    const resolveAdmin = async () => {
      setCheckingAdmin(true);
      try {
        const res = await fetch('/api/auth/admin-status', { cache: 'no-store' });
        const payload = await res.json().catch(() => ({}));
        const nextAdmin = Boolean(payload?.isAdmin);
        if (cancelled) return;
        setIsAdmin(nextAdmin);
        if (!nextAdmin) {
          router.push('/');
        }
      } catch {
        if (cancelled) return;
        setIsAdmin(false);
        router.push('/');
      } finally {
        if (!cancelled) setCheckingAdmin(false);
      }
    };
    resolveAdmin();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, router]);

  // Carica numero richieste supporto attive per badge nel menu
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !isAdmin) return;

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
  }, [isLoaded, isSignedIn, isAdmin]);

  if (!isLoaded || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">{isEnglish ? "Checking admin access..." : "Verifica accesso admin in corso..."}</p>
      </div>
    );
  }

  if (!isSignedIn || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{isEnglish ? "Access denied" : "Accesso Negato"}</h1>
          <p className="text-gray-600 mb-6">{isEnglish ? "You don't have permission to access this section." : "Non hai i permessi per accedere a questa sezione."}</p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEnglish ? "Back to Homepage" : "Torna alla Homepage"}
          </Link>
        </div>
      </div>
    );
  }

  const adminShell = (
    <div className="min-h-screen text-white">
      <div className="bg-indigo-950/50 border-b border-indigo-500/20 backdrop-blur">
        <div className="px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-white">🛡️ {isEnglish ? "Admin Dashboard" : "Admin Dashboard"}</h1>
            </div>
            <div className="flex items-center">
              {supportCount !== null && supportCount > 0 ? (
                <Link
                  href="/admin/support"
                  className="inline-flex items-center gap-2 rounded-md border border-red-400/40 bg-red-500/10 px-2.5 py-1.5 text-xs text-red-100 hover:bg-red-500/20"
                >
                  {isEnglish ? "Support" : "Supporto"}
                  <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[11px] font-semibold">
                    {supportCount}
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <main className="px-6 py-8">
        <AutoTranslateText>{children}</AutoTranslateText>
      </main>
    </div>
  );

  return adminShell;
}
