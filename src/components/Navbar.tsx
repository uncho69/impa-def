"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/imparodefi-logo-nobg.webp";
import { MobileMenu } from "./MobileMenu";
import { useLanguage } from "@/contexts/LanguageContext";
import { ClerkAuthStatus } from "./ClerkAuthStatus";
import { useState, useEffect, useRef } from "react";
import { SearchBar } from "./SearchBar";
import { useUser } from "@clerk/nextjs";
import { AuthModal } from "@/components/auth/AuthModal";
import { usePathname } from "next/navigation";

// Admin emails - AGGIORNA CON LE TUE REALI
const ADMIN_EMAILS = [
  "jeffben69zos@gmail.com",    // La tua email per testing
  "admin@imparodefi.com",      // Email admin principale
  "cofounder@imparodefi.com",  // Email cofounder
  "lordbaconf@gmail.com"       // Admin per gestione articoli
];

function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const adminDropdownRef = useRef<HTMLDivElement>(null);
  const { isSignedIn, user } = useUser();
  const { t } = useLanguage();
  const pathname = usePathname();
  
  // Check if user is admin
  const isAdmin = user?.emailAddresses?.[0]?.emailAddress && 
                  isAdminEmail(user.emailAddresses[0].emailAddress);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target as Node)) {
        setIsAdminDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Funzione per mostrare il modale di autenticazione
  const showAuthModal = (e: React.MouseEvent<HTMLAnchorElement, unknown>) => {
    // Solo se l'utente NON è loggato
    if (!isSignedIn) {
      e.preventDefault();
      setAuthMode("signin");
      setIsAuthModalOpen(true);
    }
    // Se l'utente è loggato, non fare nulla (lascia che il link funzioni normalmente)
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-neutral-200">
      <div className="w-full px-4 md:px-8 lg:px-12 mx-auto">
        <nav className="flex items-center justify-between h-16 lg:h-20 py-2">
          <Link href="/" className="group flex items-center">
            <div className="flex items-center">
              <Image 
                src={logo} 
                alt="ImparoDeFi Logo" 
                width={48}
                height={48}
                className="h-10 w-10 lg:h-12 lg:w-12 transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="ml-2 flex flex-col">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight leading-none text-center">
                  <span className="gradient-text">ImparoDeFi</span>
                </h1>
                <span className="gradient-text text-xs lg:text-sm font-medium self-center">
                  BETA
                </span>
              </div>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-8">
            <SearchBar />
            <div className="flex space-x-6">
              <Link href="/manuale" className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                {t('nav.manuale')}
              </Link>
              <Link href="/blockchain" onClick={showAuthModal} className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                {t('nav.blockchain')}
              </Link>
              <Link href="/defi" onClick={showAuthModal} className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                {t('nav.defi')}
              </Link>
              <Link href="/memecoins" onClick={showAuthModal} className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                Memecoins
              </Link>
              <Link href="/airdrops" onClick={showAuthModal} className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                Airdrops
              </Link>
              <Link href="/wallet" onClick={showAuthModal} className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                {t('nav.wallet')}
              </Link>
              <Link href="/leaderboards/global" className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                {t('nav.leaderboards')}
              </Link>
              <Link href="/news" onClick={showAuthModal} className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                News
              </Link>
              
              {/* Admin Panel Dropdown (solo per admin) */}
              {isAdmin && (
                <div className="relative" ref={adminDropdownRef}>
                  <button
                    onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                    className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm"
                  >
                    Admin Panel
                  </button>
                  
                  {isAdminDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-blue-200 rounded-lg shadow-lg py-2 z-50">
                      <Link 
                        href="/admin/dashboard" 
                        onClick={() => setIsAdminDropdownOpen(false)}
                        className="block px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        📊 Dashboard
                      </Link>
                    </div>
                  )}
                </div>
              )}
              
              {/* Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm flex items-center gap-1"
                >
                  <span className="text-xl">+</span>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-blue-200 rounded-lg shadow-lg py-2 z-50">
                    <Link href="/compraevendicrypto" onClick={showAuthModal} className="block px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors">
                      Compra e vendi crypto
                    </Link>
                    <Link href="/nft" onClick={showAuthModal} className="block px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors">
                      NFTs
                    </Link>
                    <Link href="/giochi" onClick={showAuthModal} className="block px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors">
                      Giochi & Mercati di Predizione
                    </Link>
                    <Link href="/strumenti-utili" onClick={showAuthModal} className="block px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors">
                      Strumenti Utili
                    </Link>
                    <Link href="/eventi-storici" onClick={showAuthModal} className="block px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors">
                      Eventi Storici
                    </Link>
                    <Link href="/supporto" className="block px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors">
                      Assistenza
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            <ClerkAuthStatus />
          </div>
          
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </nav>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        redirectUrl={pathname}
      />
    </header>
  );
}
