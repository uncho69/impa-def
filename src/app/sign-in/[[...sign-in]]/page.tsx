"use client";
import { EmbeddedSignIn } from "@/components/auth/EmbeddedSignIn";
import { PageTitle } from "@/components/PageTitle";
import { MobileContainer } from "@/components/MobileContainer";

export default function Page() {
  return (
    <MobileContainer>
      <PageTitle 
        description="Inserisci le tue credenziali per accedere alla piattaforma ImparoDeFi"
      >
        Accedi al tuo account
      </PageTitle>
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
        <EmbeddedSignIn />
      </div>
    </MobileContainer>
  );
}


