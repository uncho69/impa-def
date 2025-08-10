"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Account() {
  const router = useRouter();
  const [registered, setRegistered] = useState<boolean>(false);

  useEffect(() => {
    const hasCookie = document.cookie
      .split(";")
      .map((c) => c.trim())
      .some((c) => c.startsWith("imparodefi_registered=1"));
    setRegistered(hasCookie);
  }, []);

  function handleLogout() {
    document.cookie = `imparodefi_registered=; path=/; max-age=0`;
    router.push("/");
  }

  if (!registered) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h1 className="text-2xl font-bold mb-2">Non sei loggato</h1>
          <p className="text-neutral-700">Accedi dalla pagina di registrazione per gestire l&apos;account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-16">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-4">
        <h1 className="text-2xl font-bold">Il tuo account</h1>
        <p className="text-neutral-700">Accesso attivo. Puoi uscire quando vuoi.</p>
        <button onClick={handleLogout} className="btn-outline w-full">Logout</button>
      </div>
    </div>
  );
}

