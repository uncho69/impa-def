"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

export function AIBotAuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    // Listen for custom event to open the modal
    const handleOpenModal = () => {
      setIsOpen(true);
    };
    
    window.addEventListener('open-ai-bot-auth-modal', handleOpenModal);
    
    return () => {
      window.removeEventListener('open-ai-bot-auth-modal', handleOpenModal);
      setMounted(false);
    };
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

  if (!mounted) return null;

  const finalRedirectUrl = pathname || '/';

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
          aria-label="Close modal"
        >
          ×
        </button>
        
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🤖</span>
          </div>
          
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Accedi per utilizzare l'AI Bot
          </h2>
          
          <p className="text-neutral-600 text-base">
            Per utilizzare l'assistente AI, devi prima registrarti o effettuare il login.
          </p>
        </div>
        
        <div className="space-y-3">
          <SignInButton 
            mode="modal" 
            redirectUrl={finalRedirectUrl}
            afterSignInUrl={finalRedirectUrl}
          >
            <button 
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
              className="w-full bg-white text-primary-600 py-3 px-4 rounded-xl font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors"
            >
              Registrati
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return createPortal(modalContent, document.body);
}
