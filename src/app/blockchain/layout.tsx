"use client";

import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import imparodefiLogo from "@/assets/imparodefi-logo-nobg.webp";
import { BLOCKCHAIN_SIDEBAR_ITEMS } from "@/lib/blockchain-sidebar";
import { UnifiedAuthControls } from "@/components/auth/UnifiedAuthControls";
import { SearchBar } from "@/components/SearchBar";

type Theme = "dark" | "light";

export default function BlockchainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const stored = localStorage.getItem("imparodefi-theme") as Theme | null;
    if (stored === "dark" || stored === "light") setTheme(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("imparodefi-theme", theme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const isDark = theme === "dark";
  const isBlockchainSection = pathname === "/blockchain" || pathname.startsWith("/blockchain/");
  const isProfilePath = pathname === "/profilo" || pathname.startsWith("/profilo/");

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        isDark
          ? "bg-gradient-to-b from-indigo-950 via-slate-900/95 via-30% to-indigo-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Griglia come landing / DeFi */}
      <div
        className="fixed inset-0 pointer-events-none bg-[size:48px_48px] bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)]"
        aria-hidden
      />
      <div className="relative flex flex-col min-h-screen">
        <header className={`flex items-center justify-between min-h-[4.5rem] border-b flex-shrink-0 ${isDark ? "border-indigo-500/20 bg-indigo-950/50" : "border-slate-200 bg-white/90"}`}>
          <Link href="/" className="flex items-center gap-2 px-4 w-56 flex-shrink-0">
            <Image src={isDark ? "/imparodefi-logo-dark.png" : imparodefiLogo} alt="ImparoDeFi" width={36} height={36} className="rounded-lg shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-lg leading-tight text-slate-900 dark:text-white">
                ImparoDeFi
              </span>
              <span className="text-xs font-medium rounded text-slate-500 bg-slate-200 dark:text-slate-400 dark:bg-white/10 w-fit px-1.5 py-0.5">
                BETA
              </span>
            </div>
          </Link>
          <div className="hidden lg:block flex-1 max-w-xl mx-6">
            <SearchBar />
          </div>
          <div className="flex items-center justify-end gap-2 px-4 md:px-6">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-white/20 bg-white/80 dark:bg-white/10 text-slate-700 dark:text-slate-200 transition-colors"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <div className="flex items-center gap-2 md:gap-3">
              <Link
                href="/admin/dashboard"
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white transition-colors"
              >
                Admin Panel
              </Link>
              <button
                type="button"
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                className="p-2 rounded-lg border border-slate-300 bg-slate-100 hover:bg-slate-200 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
                title={isDark ? "Passa a tema chiaro" : "Passa a tema scuro"}
                aria-label={isDark ? "Passa a tema chiaro" : "Passa a tema scuro"}
              >
                {isDark ? (
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <Link
                href="/profilo"
                className={`hidden sm:flex p-2 rounded-lg border transition-colors ${
                  isProfilePath
                    ? "border-indigo-400/70 bg-indigo-500/20 text-indigo-100"
                    : "border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white"
                }`}
                title="Profilo"
                aria-label="Profilo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a8.967 8.967 0 0114.998 0A17.933 17.933 0 0112 22.5c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </Link>
              <UnifiedAuthControls />
            </div>
          </div>
        </header>

        {mobileMenuOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              aria-label="Chiudi menu"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside className={`fixed top-0 right-0 z-50 h-full w-64 max-w-[85vw] shadow-xl lg:hidden flex flex-col border-l ${isDark ? "bg-indigo-950 border-indigo-500/20" : "bg-white border-slate-200"}`}>
              <div className={`flex items-center justify-between p-4 border-b ${isDark ? "border-indigo-500/20" : "border-slate-200"}`}>
                <span className="font-semibold text-slate-900 dark:text-white">Menu</span>
                <button type="button" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10" aria-label="Chiudi">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <nav className="p-3 overflow-y-auto flex-1 space-y-0.5">
                {BLOCKCHAIN_SIDEBAR_ITEMS.map((item) => {
                  const isActive = item.href === "/blockchain" ? isBlockchainSection : pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? "bg-indigo-500/90 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-indigo-500/20 dark:hover:text-white"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </>
        )}

        <div className="flex flex-1 min-h-0 relative">
          <aside className={`hidden lg:flex w-56 flex-shrink-0 backdrop-blur flex-col border-r ${isDark ? "bg-indigo-950/70 border-indigo-500/20" : "bg-white/80 border-slate-200"}`}>
            <nav className="px-3 py-6 space-y-0.5 flex-1">
              {BLOCKCHAIN_SIDEBAR_ITEMS.map((item) => {
                const isActive = item.href === "/blockchain" ? isBlockchainSection : pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                        ? "bg-indigo-500/90 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-indigo-500/20 dark:hover:text-white"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1 flex flex-col min-w-0 overflow-auto relative">
            <div className="flex-1 px-6 py-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
