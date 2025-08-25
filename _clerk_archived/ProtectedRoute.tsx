"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

interface ProtectedRouteProps {
  children: React.ReactNode;
  title?: string;
}

export function ProtectedRoute({ children, title = "Contenuto Protetto" }: ProtectedRouteProps) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-background">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-neutral-200">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>

                <p className="text-gray-600">Per visualizzare {title} devi essere registrato o loggato</p>
              </div>
              
              <div className="space-y-3">
                <SignInButton mode="modal">
                  <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors">
                    Accedi
                  </button>
                </SignInButton>
                
                <SignUpButton mode="modal">
                  <button className="w-full bg-white text-primary-600 py-3 px-4 rounded-xl font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors">
                    Registrati
                  </button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}
