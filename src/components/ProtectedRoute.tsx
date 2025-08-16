"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useState } from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

interface ProtectedRouteProps {
  children: React.ReactNode;
  title?: string;
}

export function ProtectedRoute({ children, title = "Contenuto Protetto" }: ProtectedRouteProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-background">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-neutral-200">
              {/* Logo */}
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                  {title}
                </h1>
                <p className="text-neutral-600">
                  Per visualizzare questo contenuto devi essere registrato o effettuare l'accesso
                </p>
              </div>

              {/* Pulsanti */}
              <div className="space-y-4">
                <SignInButton mode="modal">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
                    Accedi
                  </button>
                </SignInButton>
                
                <SignUpButton mode="modal">
                  <button className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl">
                    Registrati
                  </button>
                </SignUpButton>
              </div>

              {/* Informazioni aggiuntive */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <p className="text-sm text-neutral-500">
                  Accedi gratuitamente per accedere a tutto il contenuto educativo su blockchain, DeFi, NFTs e GameFi
                </p>
              </div>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
