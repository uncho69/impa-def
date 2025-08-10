"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AuthStatus() {
  const [registered, setRegistered] = useState<boolean>(false);

  useEffect(() => {
    const hasCookie = document.cookie
      .split(";")
      .map((c) => c.trim())
      .some((c) => c.startsWith("imparodefi_registered=1"));
    setRegistered(hasCookie);

    const interval = setInterval(() => {
      const still = document.cookie
        .split(";")
        .map((c) => c.trim())
        .some((c) => c.startsWith("imparodefi_registered=1"));
      setRegistered(still);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (registered) {
    return (
      <Link href="/account" className="btn-outline">
        Account
      </Link>
    );
  }

  return (
    <Link href="/registrati?next=/manuale" className="btn-primary">
      Manuale A-Z
    </Link>
  );
}

