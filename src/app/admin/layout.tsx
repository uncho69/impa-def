"use client";

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
// import { PageLayout } from '@/components/PageLayout'; // Non più necessario

// AGGIORNA QUESTE EMAIL CON LE TUE REALI!
const ADMIN_EMAILS = [
  "jeffben69zos@gmail.com",    // La tua email per testing
  "admin@imparodefi.com",      // Email admin principale
  "cofounder@imparodefi.com"   // Email cofounder
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

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        router.push('/sign-in');
        return;
      }

      const userEmail = user.emailAddresses?.[0]?.emailAddress;
      if (!userEmail || !isAdminEmail(userEmail)) {
        router.push('/');
        return;
      }
    }
  }, [user, isLoaded, router]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando accesso...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return null;
  }

  // Not admin
  const userEmail = user.emailAddresses?.[0]?.emailAddress;
  if (!userEmail || !isAdminEmail(userEmail)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  // Admin layout
  return (
    <div className="min-h-screen bg-gray-50">
        {/* Admin Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <h1 className="text-xl font-bold text-gray-900">
                  🛡️ Admin Dashboard
                </h1>
                <nav className="flex space-x-6">
                  <Link 
                    href="/admin/dashboard" 
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/admin/news" 
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    News
                  </Link>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  👋 {user.firstName || userEmail}
                </span>
                <Link 
                  href="/" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Vai al Sito
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
