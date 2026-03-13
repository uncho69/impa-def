"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Redirect alla nuova sezione Gestione campagne (tab Richieste partecipazione). */
export default function AdminParticipationRequestsPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/campaigns");
  }, [router]);
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <p className="text-gray-600">Reindirizzamento a Gestione campagne...</p>
    </div>
  );
}
