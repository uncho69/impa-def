"use client";

import { Button } from "./Button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

const btnModalStyle =
  "bg-white text-primary-600 border-2 border-primary-200 hover:bg-primary-50 hover:border-primary-300 leading-6 text-base font-medium items-center justify-center w-full rounded-lg shadow-sm text-center no-underline flex flex-grow transition-all duration-200";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useUser();

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
                Manuale
              </Button>
              <Button href="/blockchain" local={true} className={btnModalStyle}>
                Blockchain
              </Button>
              <Button href="/defi" local={true} className={btnModalStyle}>
                DeFi
              </Button>
              <Button href="/nft" local={true} className={btnModalStyle}>
                NFTs
              </Button>
              <Button href="/giochi" local={true} className={btnModalStyle}>
                GameFi
              </Button>
              <Button href="/wallet" local={true} className={btnModalStyle}>
                Wallet
              </Button>
              <Button href="/supporto" local={true} className={btnModalStyle}>
                Assistenza
              </Button>
              
              {/* Pulsanti di autenticazione */}
              {isSignedIn ? (
                <Button href="/account" local={true} className={btnModalStyle}>
                  Account
                </Button>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className={btnModalStyle}>
                      Accedi
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className={btnModalStyle}>
                      Registrati
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
