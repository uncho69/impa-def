"use client";

import { ReactNode } from "react";
import { ClerkProtectedRoute } from "@/components/ClerkProtectedRoute";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Layout({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  
  return (
    <ClerkProtectedRoute title={`${t('protected.title')}: ${t('categories.wallet')}`}>
      {children}
    </ClerkProtectedRoute>
  );
}


