"use client";

import { useEffect, useState } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { trackEvent } from "@/lib/analytics";

function shortenAddress(value?: string | null): string {
  if (!value) return "-";
  if (value.length < 14) return value;
  return `${value.slice(0, 8)}...${value.slice(-6)}`;
}

export function PrivyWalletConnector({
  onAddressChange,
}: {
  onAddressChange: (address: string | null) => void;
}) {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const [showInitWarning, setShowInitWarning] = useState(false);

  const walletAddress = wallets?.[0]?.address ?? null;
  const hasWalletConnected = Boolean(walletAddress);

  useEffect(() => {
    onAddressChange(walletAddress);
    if (walletAddress) {
      trackEvent("wallet_connect", { provider: "privy" });
    }
  }, [walletAddress, onAddressChange]);

  useEffect(() => {
    if (ready) {
      setShowInitWarning(false);
      return;
    }
    const timer = setTimeout(() => setShowInitWarning(true), 8000);
    return () => clearTimeout(timer);
  }, [ready]);

  if (!ready) {
    return (
      <div className="space-y-1">
        <div className="text-xs text-slate-400">Inizializzazione wallet...</div>
        {showInitWarning ? (
          <div className="text-xs text-amber-300">
            Privy impiega troppo a inizializzarsi. Controlla `NEXT_PUBLIC_PRIVY_APP_ID`, CSP e riavvia il dev server.
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-slate-300">
        Wallet Privy: <span className="text-white">{shortenAddress(walletAddress)}</span>
      </span>
      {!authenticated || !hasWalletConnected ? (
        <button
          type="button"
          onClick={() => login({ loginMethods: ["wallet"] })}
          className="rounded-lg border border-emerald-400/40 px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-500/20"
        >
          Connetti wallet
        </button>
      ) : (
        <button
          type="button"
          onClick={logout}
          className="rounded-lg border border-rose-400/40 px-4 py-2 text-sm text-rose-200 hover:bg-rose-500/20"
        >
          Disconnetti wallet
        </button>
      )}
    </div>
  );
}

