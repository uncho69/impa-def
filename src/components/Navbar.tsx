"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/imparodefi-logo-nobg.webp";
import { MobileMenu } from "./MobileMenu";
import { AuthStatus } from "./AuthStatus";
import { useState, useEffect, useRef } from "react";
import { SearchBar } from "./SearchBar";
import { useUser } from "@clerk/nextjs";
import { AuthModal } from "@/components/auth/AuthModal";

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const adminDropdownRef = useRef<HTMLDivElement>(null);
  const { isSignedIn, user } = useUser();
  
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
      
      // Rimuovi modale esistente se presente
      const existingModal = document.getElementById('navbar-auth-modal');
      if (existingModal) {
        existingModal.remove();
      }
      
      // Crea il modale
      const modal = document.createElement('div');
      modal.id = 'navbar-auth-modal';
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
            <button id="close-navbar-modal" style="
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
              <button id="navbar-signup-btn" style="
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
              
              <button id="navbar-signin-btn" style="
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
      const closeBtn = document.getElementById('close-navbar-modal');
      if (closeBtn) {
        closeBtn.onclick = () => modal.remove();
      }
      modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
      };
      
      // Gestisci i pulsanti
      const signupBtn = document.getElementById('navbar-signup-btn');
      if (signupBtn) {
        signupBtn.onclick = () => {
          modal.remove();
          window.location.href = '/sign-up';
        };
      }
      
      const signinBtn = document.getElementById('navbar-signin-btn');
      if (signinBtn) {
        signinBtn.onclick = () => {
          modal.remove();
          window.location.href = '/sign-in';
        };
      }
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
                Manuale
              </Link>
              <Link href="/blockchain" onClick={showAuthModal} className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                Blockchain
              </Link>
              <Link href="/defi" onClick={showAuthModal} className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                DeFi
              </Link>
              <Link href="/memecoins" onClick={showAuthModal} className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                Memecoins
              </Link>
              <Link href="/airdrops" onClick={showAuthModal} className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                Airdrops
              </Link>
              <Link href="/wallet" onClick={showAuthModal} className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                Wallet
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
                    <Link href="/supporto" className="block px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors">
                      Assistenza
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <AuthStatus />
            </div>
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
        initialMode="signin"
      />
    </header>
  );
}
