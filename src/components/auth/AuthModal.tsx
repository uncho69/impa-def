"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
  redirectUrl?: string;
}

export function AuthModal({ isOpen, onClose, initialMode = "signin", redirectUrl }: AuthModalProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const finalRedirectUrl = redirectUrl || pathname || '/';

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
          aria-label="Close modal"
        >
          ×
        </button>
        
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Accedi per continuare
          </h2>
          
          <p className="text-neutral-600 text-base">
            Per accedere a questa sezione, devi prima registrarti o effettuare il login.
          </p>
        </div>
        
        <div className="space-y-3">
          <SignInButton 
            mode="modal" 
            redirectUrl={finalRedirectUrl}
            afterSignInUrl={finalRedirectUrl}
          >
            <button 
              onClick={onClose}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Accedi
            </button>
          </SignInButton>
          
          <SignUpButton 
            mode="modal" 
            redirectUrl={finalRedirectUrl}
            afterSignUpUrl={finalRedirectUrl}
          >
            <button 
              onClick={onClose}
              className="w-full bg-white text-primary-600 py-3 px-4 rounded-xl font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors"
            >
              Registrati
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );

  // Use portal to render outside normal DOM hierarchy
  return createPortal(modalContent, document.body);
}
