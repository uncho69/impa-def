"use client";

import { Button } from "./Button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const btnModalStyle =
  "bg-white text-primary-600 border-2 border-primary-200 hover:bg-primary-50 hover:border-primary-300 leading-6 text-base font-medium items-center justify-center w-full rounded-lg shadow-sm text-center no-underline flex flex-grow transition-all duration-200";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();
  const { t } = useLanguage();

  // Funzione per mostrare il modale di autenticazione
  const showAuthModal = (e: React.MouseEvent<HTMLAnchorElement, unknown>) => {
    // Solo se l'utente NON è loggato
    if (!isSignedIn) {
      e.preventDefault();
      
      // Rimuovi modale esistente se presente
      const existingModal = document.getElementById('mobile-auth-modal');
      if (existingModal) {
        existingModal.remove();
      }
      
      // Crea il modale
      const modal = document.createElement('div');
      modal.id = 'mobile-auth-modal';
      modal.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(4px);
        ">
          <div style="
            background: white;
            border-radius: 16px;
            padding: 32px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            text-align: center;
            position: relative;
          ">
            <button id="close-mobile-modal" style="
              position: absolute;
              top: 16px;
              right: 16px;
              background: none;
              border: none;
              font-size: 24px;
              cursor: pointer;
              color: #6b7280;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='#f3f4f6'" onmouseout="this.style.backgroundColor='transparent'">
              ×
            </button>
            
            <div style="
              width: 64px;
              height: 64px;
              background: linear-gradient(135deg, #3b82f6, #1d4ed8);
              border-radius: 50%;
              margin: 0 auto 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
              color: white;
            ">
              🔒
            </div>
            
            <h2 style="
              font-size: 24px;
              font-weight: 700;
              color: #111827;
              margin: 0 0 16px 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
              Accedi per continuare
            </h2>
            
            <p style="
              color: #6b7280;
              font-size: 16px;
              line-height: 1.5;
              margin: 0 0 32px 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">
              Per accedere a questa sezione, devi prima registrarti o effettuare il login.
            </p>
            
            <div style="display: flex; gap: 12px; justify-content: center;">
              <button id="mobile-signup-btn" style="
                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.2s;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 10px 15px -3px rgba(59, 130, 246, 0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                Registrati
              </button>
              
              <button id="mobile-signin-btn" style="
                background: white;
                color: #3b82f6;
                border: 2px solid #3b82f6;
                padding: 10px 24px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              " onmouseover="this.style.backgroundColor='#3b82f6'; this.style.color='white'" onmouseout="this.style.backgroundColor='white'; this.style.color='#3b82f6'">
                Accedi
              </button>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Gestisci la chiusura del modale
      const closeBtn = document.getElementById('close-mobile-modal');
      if (closeBtn) {
        closeBtn.onclick = () => modal.remove();
      }
      modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
      };
      
      // Gestisci i pulsanti
      const signupBtn = document.getElementById('mobile-signup-btn');
      if (signupBtn) {
        signupBtn.onclick = () => {
          modal.remove();
          window.location.href = 'https://accounts.imparodefi.xyz/sign-up';
        };
      }
      
      const signinBtn = document.getElementById('mobile-signin-btn');
      if (signinBtn) {
        signinBtn.onclick = () => {
          modal.remove();
          window.location.href = 'https://accounts.imparodefi.xyz/sign-in';
        };
      }
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
                  <SignInButton mode="modal" signInUrl="https://accounts.imparodefi.xyz/sign-in">
                    <button className={btnModalStyle}>
                      {t('auth.accedi')}
                    </button>
                  </SignInButton>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
