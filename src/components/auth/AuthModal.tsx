"use client";

import { useEffect } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
}

export function AuthModal({ isOpen, onClose, initialMode = "signin" }: AuthModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Redirect to Clerk Account Portal
      const url = initialMode === "signup" 
        ? "https://accounts.imparodefi.xyz/sign-up"
        : "https://accounts.imparodefi.xyz/sign-in";
      window.location.href = url;
      onClose(); // Close modal since we're redirecting
    }
  }, [isOpen, initialMode, onClose]);

  return null; // No UI needed, just redirect
}