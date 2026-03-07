"use client";

import { useRouter } from "next/navigation";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useBookmarks } from "@/components/bookmarks/useBookmarks";

const PANEL_CLASS = "rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-6";

export default function SegnalibriPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const { bookmarks, loading, toggleBookmark } = useBookmarks();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <section className={PANEL_CLASS}>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Segnalibri</h1>
        <p className="mt-2 text-slate-300">
          Sezione privata: qui trovi pagine, sezioni e contenuti che hai salvato.
        </p>
      </section>

      {!isLoaded || loading ? (
        <section className={PANEL_CLASS}>
          <p className="text-slate-300">Caricamento segnalibri...</p>
        </section>
      ) : !isSignedIn ? (
        <section className={PANEL_CLASS}>
          <p className="text-slate-300">Per vedere i tuoi segnalibri devi effettuare il login.</p>
          <div className="mt-4">
            <SignInButton mode="modal">
              <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium hover:bg-indigo-400">
                Accedi
              </button>
            </SignInButton>
          </div>
        </section>
      ) : (
        <section className={PANEL_CLASS}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarks.length === 0 ? (
              <div className="md:col-span-2 rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4 text-slate-300">
                Nessun elemento salvato per ora.
              </div>
            ) : (
              bookmarks.map((item) => (
                <article
                  key={`${item.url}-${item.title}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(item.url)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(item.url);
                    }
                  }}
                  className="group cursor-pointer rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4 hover:border-indigo-400/60 hover:bg-indigo-900/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium border border-indigo-400/35 bg-indigo-500/15 text-indigo-200">
                          {item.type === "section" ? "Sezione" : item.type === "content" ? "Contenuto" : "Pagina"}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-white line-clamp-2">{item.title}</p>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">{item.url}</p>
                      <p className="text-xs text-slate-300/90 mt-3">
                        {item.type === "content"
                          ? "Apri il contenuto salvato con preview/modal."
                          : item.type === "section"
                            ? "Apri direttamente la sezione salvata."
                            : "Apri la pagina salvata."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        void toggleBookmark(item);
                      }}
                      className="shrink-0 rounded-lg border border-rose-400/40 px-2.5 py-1 text-sm font-semibold text-rose-200 hover:bg-rose-500/20"
                      aria-label="Rimuovi segnalibro"
                      title="Rimuovi segnalibro"
                    >
                      X
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      )}
    </div>
  );
}

