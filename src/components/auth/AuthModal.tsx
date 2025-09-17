"use client";

import { useState, useEffect } from "react";
import { EmbeddedSignIn } from "./EmbeddedSignIn";
import { EmbeddedSignUp } from "./EmbeddedSignUp";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
}

export function AuthModal({ isOpen, onClose, initialMode = "signin" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);

  // Gestisci il cambio di modalità tramite hash
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#signup") {
        setMode("signup");
      } else if (window.location.hash === "#signin") {
        setMode("signin");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleModeChange = (newMode: "signin" | "signup") => {
    setMode(newMode);
    window.location.hash = newMode === "signin" ? "#signin" : "#signup";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header con branding ImparoDeFi */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ID</span>
              </div>
              <span className="text-xl font-bold gradient-text">ImparoDeFi</span>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 transition-colors p-2 hover:bg-neutral-100 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-neutral-100 rounded-lg p-1">
            <button
              onClick={() => handleModeChange("signin")}
              className={`flex-1 px-4 py-2 rounded-md font-semibold transition-all duration-200 ${
                mode === "signin"
                  ? "bg-white text-primary-600 shadow-sm"
                  : "text-neutral-600 hover:text-primary-600"
              }`}
            >
              Accedi
            </button>
            <button
              onClick={() => handleModeChange("signup")}
              className={`flex-1 px-4 py-2 rounded-md font-semibold transition-all duration-200 ${
                mode === "signup"
                  ? "bg-white text-primary-600 shadow-sm"
                  : "text-neutral-600 hover:text-primary-600"
              }`}
            >
              Registrati
            </button>
          </div>

          {/* Content */}
          <div className="min-h-[400px]">
            {mode === "signin" ? <EmbeddedSignIn /> : <EmbeddedSignUp />}
          </div>
        </div>
      </div>
    </div>
  );
}