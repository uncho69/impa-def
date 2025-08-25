"use client";

import { ReactNode } from "react";
import { PrivyProtectedRoute } from "@/components/PrivyProtectedRoute";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <PrivyProtectedRoute title="Area riservata: NFTs">
      {children}
    </PrivyProtectedRoute>
  );
}


