"use client";

import { ReactNode } from "react";
import { ClerkProtectedRoute } from "@/components/ClerkProtectedRoute";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ClerkProtectedRoute title="Compra e vendi crypto">
      {children}
    </ClerkProtectedRoute>
  );
}
