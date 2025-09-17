"use client";
import { EmbeddedSignUp } from "@/components/auth/EmbeddedSignUp";
import { PageTitle } from "@/components/PageTitle";
import { MobileContainer } from "@/components/MobileContainer";

export default function Page() {
  return (
    <MobileContainer>
      <PageTitle 
        description="Registrati su ImparoDeFi per accedere a tutti i contenuti esclusivi"
      >
        Crea il tuo account
      </PageTitle>
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
        <EmbeddedSignUp />
      </div>
    </MobileContainer>
  );
}


