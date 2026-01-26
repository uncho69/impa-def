"use client";

import { Button } from "./Button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser, SignOutButton } from '@clerk/nextjs';
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { AuthModal } from "@/components/auth/AuthModal";

const btnModalStyle =
  "bg-white text-primary-600 border-2 border-primary-200 hover:bg-primary-50 hover:border-primary-300 leading-6 text-base font-medium items-center justify-center w-full rounded-lg shadow-sm text-center no-underline flex flex-grow transition-all duration-200";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();
  const { t } = useLanguage();

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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center size-12 text-primary-600 hover:text-primary-700 transition-colors"
        aria-label="Menu mobile"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
      </button>
      
      {open && (
        <div className="absolute px-4 -right-7 top-20 w-[100vw] z-30">
          <div className="bg-white/95 backdrop-blur-lg border border-neutral-200 rounded-xl shadow-xl">
            <div className="grid grid-cols-2 gap-3 p-6 w-full">
              <Button href="/manuale" local={true} className={btnModalStyle}>
                {t('nav.manuale')}
              </Button>
              <Button href="/blockchain" onLinkClick={showAuthModal} local={true} className={btnModalStyle}>
                {t('nav.blockchain')}
              </Button>
              <Button href="/defi" onLinkClick={showAuthModal} local={true} className={btnModalStyle}>
                {t('nav.defi')}
              </Button>
              <Button href="/memecoins" onLinkClick={showAuthModal} local={true} className={btnModalStyle}>
                Memecoins
              </Button>
              <Button href="/airdrops" onLinkClick={showAuthModal} local={true} className={btnModalStyle}>
                Airdrops
              </Button>
              <Button href="/wallet" onLinkClick={showAuthModal} local={true} className={btnModalStyle}>
                {t('nav.wallet')}
              </Button>
              <Button href="/leaderboards/global" local={true} className={btnModalStyle}>
                {t('nav.leaderboards')}
              </Button>
              <Button href="/supporto" local={true} className={btnModalStyle}>
                {t('nav.supporto')}
              </Button>
              
              {/* Toggle lingua */}
              <div className="col-span-2 flex justify-center">
                <LanguageToggle />
              </div>
              
              {/* Pulsanti di autenticazione (Clerk) */}
              {isLoaded && (
                isSignedIn ? (
                  <SignOutButton>
                    <button className={btnModalStyle}>
                      {t('auth.logout')}
                    </button>
                  </SignOutButton>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        setAuthMode("signin");
                        setIsAuthModalOpen(true);
                      }}
                      className={btnModalStyle}
                    >
                      {t('auth.accedi')}
                    </button>
                    <button 
                      onClick={() => {
                        setAuthMode("signup");
                        setIsAuthModalOpen(true);
                      }}
                      className={btnModalStyle}
                    >
                      {t('auth.createNewAccount')}
                    </button>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        redirectUrl={pathname}
      />
    </div>
  );
}
