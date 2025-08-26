"use client";

import { ReactNode } from "react";
import { PrivyProtectedRoute } from "@/components/PrivyProtectedRoute";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Layout({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  
  return (
    <PrivyProtectedRoute title={`${t('protected.title')}: ${t('categories.defi')}`}>
      {children}
    </PrivyProtectedRoute>
  );
}


