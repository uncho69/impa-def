"use client";

import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { UnifiedAuthControls } from "@/components/auth/UnifiedAuthControls";
import imparodefiLogo from "@/assets/imparodefi-logo-nobg.webp";
import { LEARNING_PATH_CARDS } from "@/lib/learning-paths";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "/", icon: "📊" },
  { label: "Manuale", href: "/manuale", icon: "📚" },
  { label: "DeFi", href: "/defi", icon: "💹" },
  { label: "Airdrops", href: "/airdrops", icon: "🎁" },
  { label: "Blockchains", href: "/blockchain", icon: "⛓️" },
  { label: "Compra/Vendi Crypto", href: "/compraevendicrypto", icon: "💳" },
  { label: "Portafogli", href: "/wallet", icon: "👛" },
  { label: "Strumenti Utili", href: "/strumentiutili", icon: "🔧" },
  { label: "Memecoins", href: "/memecoins", icon: "🪙" },
  { label: "Memecoin/NFT", href: "/nft", icon: "🖼️" },
  { label: "Giochi", href: "/giochi", icon: "🎮" },
  { label: "Mercati di Predizione", href: "/giochi/polymarket", icon: "📈" },
  { label: "Eventi Storici", href: "/eventi-storici", icon: "📅" },
  { label: "Mappa Ecosistema", href: "/esplora-app", icon: "🌐" },
  { label: "Notizie", href: "/news", icon: "📰" },
  { label: "Leaderboard", href: "/leaderboards/global", icon: "🏆" },
];

const QUICK_SECTIONS = [
  { href: "#fondamenti", label: "Fondamenti Web3" },
  { href: "#wallet", label: "Wallet e sicurezza" },
  { href: "#onramp", label: "Accesso al mercato" },
  { href: "#analisi", label: "Analisi progetti" },
  { href: "#nft", label: "NFT e community" },
  { href: "#sicurezza", label: "Anti-truffe" },
];

type Theme = "dark" | "light";

export default function Manuale() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("imparodefi-theme") as Theme | null;
    if (stored === "dark" || stored === "light") setTheme(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("imparodefi-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors ${
        isDark
          ? "bg-gradient-to-b from-indigo-950 via-slate-900/95 via-30% to-indigo-950 text-white"
          : "bg-gradient-to-b from-slate-100 via-indigo-50/50 to-slate-100 text-slate-900"
      }`}
    >
      <div className={`fixed inset-0 pointer-events-none bg-[size:48px_48px] ${isDark ? "bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)]" : "bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)]"}`} />
      <div className="relative flex min-h-screen">
        <aside className={`w-56 flex-shrink-0 border-r backdrop-blur py-6 ${isDark ? "border-indigo-500/20 bg-indigo-950/70" : "border-slate-200 bg-white/80"}`}>
          <nav className="px-3 space-y-0.5">
            {SIDEBAR_ITEMS.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  item.href === "/manuale"
                    ? "bg-indigo-500/90 text-white"
                    : isDark ? "text-slate-300 hover:bg-indigo-500/20 hover:text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 flex flex-col min-w-0">
          <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? "border-indigo-500/20 bg-indigo-950/50" : "border-slate-200 bg-white/70"}`}>
            <Link href="/" className="flex items-center gap-2">
              <Image src={isDark ? "/imparodefi-logo-dark.png" : imparodefiLogo} alt="ImparoDeFi" width={36} height={36} className="rounded-lg" />
              <span className={`font-bold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>ImparoDeFi</span>
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${isDark ? "text-slate-400 bg-white/10" : "text-slate-500 bg-slate-200"}`}>BETA</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/admin/dashboard" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${isDark ? "border-white/20 bg-white/5 hover:bg-white/10 text-white" : "border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700"}`}>
                Admin Panel
              </Link>
              <button type="button" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} className={`p-2 rounded-lg border transition-colors ${isDark ? "border-white/20 bg-white/5 hover:bg-white/10" : "border-slate-300 bg-slate-100 hover:bg-slate-200"}`} title={isDark ? "Passa a tema chiaro" : "Passa a tema scuro"} aria-label={isDark ? "Passa a tema chiaro" : "Passa a tema scuro"}>
                {isDark ? <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg> : <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>}
              </button>
              <Link
                href="/profilo"
                className={`p-2 rounded-lg border transition-colors ${isDark ? "border-white/20 bg-white/5 hover:bg-white/10 text-white" : "border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
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
          <div className="flex-1 px-6 py-8 overflow-auto manual-modern">
            <div className="max-w-4xl mx-auto">
              <Link href="/" className={`inline-flex items-center gap-1.5 text-sm mb-6 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Torna alla Dashboard
              </Link>
              <h1 className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}>Manuale A-Z</h1>
              <p className={`text-lg mb-8 ${isDark ? "text-slate-400" : "text-slate-600"}`}>Guida completa al mondo Web3, crypto e DeFi dalla A alla Z</p>
              <section className={`manual-card rounded-2xl border p-6 mb-8 ${isDark ? "bg-indigo-900/25 border-indigo-500/25" : "bg-white border-slate-200 shadow-lg"}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className={`text-xs uppercase tracking-wide ${isDark ? "text-indigo-300" : "text-indigo-600"}`}>Percorso consigliato</p>
                    <p className={`mt-1 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                      Parti dai fondamentali, passa alla pratica e chiudi con risk management e sicurezza.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full border border-indigo-400/40 bg-indigo-500/15 px-3 py-1 text-indigo-200">Step 1: Capire</span>
                    <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-emerald-200">Step 2: Usare</span>
                    <span className="rounded-full border border-amber-400/40 bg-amber-500/15 px-3 py-1 text-amber-200">Step 3: Proteggere</span>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Tipo di rete</p>
                    <p className="mt-1 text-2xl font-semibold text-white">Layer 1 + Layer 2</p>
                    <p className="mt-2 text-sm text-slate-300">Le L1 garantiscono sicurezza, le L2 migliorano velocita e costi.</p>
                  </div>
                  <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Disponibilita</p>
                    <p className="mt-1 text-2xl font-semibold text-white">24/7</p>
                    <p className="mt-2 text-sm text-slate-300">Transazioni e applicazioni attive in modo continuo.</p>
                  </div>
                  <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Verificabilita</p>
                    <p className="mt-1 text-2xl font-semibold text-white">On-chain</p>
                    <p className="mt-2 text-sm text-slate-300">Dati e transazioni pubblici e controllabili da chiunque.</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {QUICK_SECTIONS.map((section) => (
                    <a
                      key={section.href}
                      href={section.href}
                      className={`rounded-xl border px-3 py-2 text-sm transition-colors ${
                        isDark
                          ? "border-indigo-500/30 bg-indigo-900/25 text-slate-200 hover:bg-indigo-800/40"
                          : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {section.label}
                    </a>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="text-sm font-medium text-slate-200 mb-3">Percorsi guidati</p>
                  <div className="grid gap-3 md:grid-cols-3">
                    {LEARNING_PATH_CARDS.map((path) => (
                      <Link
                        key={path.level}
                        href={path.href}
                        className="rounded-xl border border-indigo-500/30 bg-indigo-900/20 p-4 transition-colors hover:border-indigo-400/50 hover:bg-indigo-800/25"
                      >
                        <p className="text-xs uppercase tracking-wide text-indigo-300">{path.sub}</p>
                        <p className="mt-1 text-lg font-semibold text-white">{path.level}</p>
                        <p className="mt-2 text-sm text-slate-300 line-clamp-3">{path.desc}</p>
                        <p className="mt-3 text-sm font-medium text-indigo-300">Apri percorso →</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
        <div id="fondamenti" className={`manual-card scroll-mt-24 rounded-2xl border p-8 mb-8 ${isDark ? "bg-indigo-900/25 border-indigo-500/20" : "bg-white border-slate-200 shadow-lg"}`}>
              <p className={`mb-6 ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                Cosa sono le criptovalute? Cos&apos;è il metaverso, il mondo Web3, la DeFi e l&apos;economia digitale?
              </p>
              <p className="text-slate-900 dark:text-slate-200 mb-6">
                Per iniziare, dovete sapere che a noi interessa usare questo mondo digitale per gli enormi vantaggi e benefici che comporta, come ad esempio:
              </p>
              <div className="rounded-xl p-5 border dark:bg-indigo-900/25 dark:border-indigo-500/30 bg-slate-50 border-slate-200 mb-8">
                <List>
                  <li><b>Conservare il denaro</b> in maniera sicura ed incensurabile</li>
                  <li><b>Inviare denaro istantaneamente</b> a costo quasi zero</li>
                  <li><b>Ottenere rendimenti più alti</b> sui propri risparmi in totale autonomia e sicurezza</li>
                </List>
              </div>
              
              <div className="space-y-4 mb-8">
                <Accordion
                  buttonText="Benefici delle tecnologie Web3"
                  showTooltip={true}
                >
                  <div className="p-5 space-y-4 text-slate-900 dark:text-slate-200">
                    <p className="mb-4">
                      Internet ha abilitato il trasferimento di dati istantaneamente attraverso il mondo, a costo quasi zero. Le blockchain fanno la stessa cosa ma per la finanza.
                    </p>
                    
                    <p className="mb-4">
                      I benefici dell'adozione delle tecnologie Web3 <strong>variano a seconda del proprio utilizzo</strong>, coinvolgendo consumatori, imprese, governi e altri soggetti. Alcuni esempi concreti:
                    </p>
                    
                    <ul className="list-disc list-inside space-y-2 mb-4">
                      <li>Gestire il proprio capitale in modo autonomo e senza censure</li>
                      <li>Accedere a opportunità d'investimento rese possibili dalle tecnologie decentralizzate</li>
                      <li>Entrare in comunità di appassionati in qualunque settore, beneficiando del supporto reciproco per progetti personali e accedendo a opportunità d'investimento esclusive</li>
                    </ul>
                    
                    <p className="mb-4">
                      Di seguito una panoramica dei vantaggi per ciascun gruppo.
                    </p>
                    
                    <div className="space-y-3">
                      <Accordion buttonText="Per i Consumatori">
                        <div className="p-4 space-y-4 text-slate-900 dark:text-slate-200">
                          <ul className="list-disc list-inside space-y-3">
                            <li>
                              <strong>Gestione del proprio capitale in maniera autonoma ed incensurabile</strong>
                            </li>
                            <li>
                              <strong>Proprietà e controllo dei dati</strong>: Le tecnologie Web3 permettono agli utenti di mantenere il controllo dei propri dati personali attraverso reti decentralizzate, garantendo privacy e proprietà. A differenza del Web2, dove le aziende possiedono e monetizzano i dati degli utenti, nel Web3 gli utenti hanno il pieno controllo.
                            </li>
                            <li>
                              <strong>Identità decentralizzata</strong>: Possibilità di creare identità decentralizzate (DID) completamente controllate dall'utente. Questo riduce la necessità di multiple registrazioni e migliora la sicurezza e la privacy su diverse piattaforme.
                            </li>
                            <li>
                              <strong>Accesso alla DeFi</strong>: Gli utenti possono prestare, prendere in prestito, guadagnare interessi e scambiare asset all'interno della finanza decentralizzata (DeFi) senza dipendere da intermediari tradizionali come le banche.
                            </li>
                            <li>
                              <strong>Trasparenza e fiducia</strong>: Le transazioni, spesso registrate su blockchain, sono trasparenti e immutabili, favorendo la fiducia nel sistema.
                            </li>
                            <li>
                              <strong>Opportunità di guadagno (Play-to-Earn, Learn-to-Earn)</strong>: Possibilità di guadagnare ricompense attraverso videogiochi (Play-to-Earn), piattaforme educative (Learn-to-Earn) o contribuendo a community e protocolli (es. staking, governance).
                            </li>
                            <li>
                              <strong>NFT e proprietà digitale</strong>: Possesso e scambio di Non-Fungible Token (NFT), che rappresentano asset digitali unici come arte, musica, immobili virtuali e altre forme di proprietà digitale.
                            </li>
                          </ul>
                        </div>
                      </Accordion>
                      
                      <Accordion buttonText="Per i Negozianti (es. retailer, piattaforme e-commerce)">
                        <div className="p-4 space-y-4 text-slate-900 dark:text-slate-200">
                          <ul className="list-disc list-inside space-y-3">
                            <li>
                              <strong>Pagamenti diretti in criptovalute:</strong> Eliminano gli intermediari (banche o PSP), riducono le commissioni e abilitano transazioni globali più rapide.
                            </li>
                            <li>
                              <strong>Programmi fedeltà e ricompense:</strong> Token e blockchain rendono i programmi più trasparenti e flessibili; i clienti possono guadagnare e scambiare premi.
                            </li>
                            <li>
                              <strong>Beni digitali e integrazione NFT:</strong> Vendita di beni digitali come NFT, con proprietà verificabile ed esperienze esclusive per i clienti.
                            </li>
                            <li>
                              <strong>Marketplace decentralizzati:</strong> Mercati peer-to-peer che tagliano gli intermediari, aumentano i margini e rafforzano la relazione diretta col cliente.
                            </li>
                            <li>
                              <strong>Incentivi basati su token:</strong> Token nativi per stimolare engagement (recensioni, referral, contributi alla community).
                            </li>
                            <li>
                              <strong>Accesso globale e inclusione finanziaria:</strong> Mercati internazionali raggiungibili da chiunque abbia Internet, inclusi i non bancarizzati.
                            </li>
                          </ul>
                        </div>
                      </Accordion>
                      
                      <Accordion buttonText="Per i Governi">
                        <div className="p-4 space-y-4 text-slate-900 dark:text-slate-200">
                          <ul className="list-disc list-inside space-y-3">
                            <li>
                              <strong>Trasparenza nella governance:</strong> I registri pubblici possono diventare più trasparenti, affidabili e immutabili, riducendo la corruzione e aumentando la fiducia.
                            </li>
                            <li>
                              <strong>Identità digitale:</strong> Sistemi di identità decentralizzati possono semplificare processi come votazioni, previdenza sociale, sanità e welfare, proteggendo al contempo privacy e sicurezza dei dati.
                            </li>
                            <li>
                              <strong>Voto decentralizzato:</strong> Processi elettorali più sicuri e trasparenti, aumentando la fiducia dei cittadini e prevenendo frodi.
                            </li>
                            <li>
                              <strong>Servizi pubblici più efficienti:</strong> Utilizzo di smart contract per automatizzare accordi, tasse, permessi e altri servizi pubblici, velocizzando l'amministrazione.
                            </li>
                            <li>
                              <strong>Pagamenti transfrontalieri e distribuzione degli aiuti:</strong> Uso di criptovalute e blockchain per pagamenti e distribuzione di aiuti più veloci, economici, tracciabili e trasparenti.
                            </li>
                            <li>
                              <strong>Regolazione delle economie tokenizzate:</strong> Sviluppo di framework normativi per valute digitali, economia tokenizzata e DeFi, bilanciando innovazione e compliance.
                            </li>
                          </ul>
                        </div>
                      </Accordion>
                      
                      <Accordion buttonText="Per Imprese e Grandi Aziende">
                        <div className="p-4 space-y-4 text-slate-900 dark:text-slate-200">
                          <ul className="list-disc list-inside space-y-3">
                            <li>
                              <strong>Trasparenza della supply chain:</strong> Tracciabilità in tempo reale dei beni, permettendo la verifica di origine e qualità dalle materie prime al prodotto finito.
                            </li>
                            <li>
                              <strong>Archiviazione cloud decentralizzata:</strong> Soluzioni di storage decentralizzato come IPFS o Filecoin, offrendo maggiore sicurezza, privacy e potenziali risparmi sui costi rispetto ai servizi cloud tradizionali.
                            </li>
                            <li>
                              <strong>Monetizzazione dei dati e tutela della privacy:</strong> Nuovi modelli dove gli utenti controllano i propri dati e possono condividerli in cambio di ricompense, migliorando fiducia e qualità dei dati.
                            </li>
                            <li>
                              <strong>Fidelizzazione ed engagement:</strong> Utilizzo della tokenizzazione per le interazioni (es. punti, community del brand) per rafforzare le relazioni con i clienti e favorire senso di appartenenza.
                            </li>
                            <li>
                              <strong>Contratti programmabili e automazione:</strong> Utilizzo di smart contract per automatizzare pagamenti e accordi legali, aumentando velocità, efficienza e riducendo errori.
                            </li>
                            <li>
                              <strong>DAO (organizzazioni autonome decentralizzate):</strong> Sperimentazione di modelli di governance condivisa coinvolgendo azionisti, dipendenti o la community.
                            </li>
                          </ul>
                        </div>
                      </Accordion>
                      
                      <Accordion buttonText="Per Sviluppatori e Innovatori">
                        <div className="p-4 space-y-4 text-slate-900 dark:text-slate-200">
                          <ul className="list-disc list-inside space-y-3">
                            <li>
                              <strong>Collaborazione open source:</strong> Protocolli aperti favoriscono collaborazione globale, riuso dell'infrastruttura ed interoperabilità.
                            </li>
                            <li>
                              <strong>Monetizzare lo sviluppo:</strong> Ricompense dirette tramite token, NFT o altri incentivi, senza dover passare da strutture aziendali tradizionali.
                            </li>
                            <li>
                              <strong>Interoperabilità e componibilità:</strong> Integrazione semplice di protocolli (es. DeFi, standard NFT) per maggiore flessibilità e innovazione.
                            </li>
                            <li>
                              <strong>Sistemi trustless:</strong> Applicazioni in cui non serve fidarsi di intermediari grazie a garanzie crittografiche e smart contract.
                            </li>
                          </ul>
                        </div>
                      </Accordion>
                      
                      <Accordion buttonText="Per Artisti e Creatori">
                        <div className="p-4 space-y-4 text-slate-900 dark:text-slate-200">
                          <ul className="list-disc list-inside space-y-3">
                            <li>
                              <strong>Monetizzazione diretta via NFT:</strong> Vendita di opere digitali direttamente al pubblico, eliminando intermediari e trattenendo una quota maggiore dei ricavi.
                            </li>
                            <li>
                              <strong>Royalties su vendite secondarie:</strong> Royalties programmabili negli NFT per guadagnare anche nelle rivendite.
                            </li>
                            <li>
                              <strong>Pubblico globale e piattaforme decentralizzate:</strong> Maggior controllo sull'opera e sulla distribuzione, con portata internazionale.
                            </li>
                          </ul>
                        </div>
                      </Accordion>
                    </div>
                  </div>
                </Accordion>
                
                <Accordion
                  buttonText="Come navigare il mondo Web3?"
                >
                  <div className="p-5 space-y-5 text-slate-900 dark:text-slate-200">
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Focus</p>
                        <p className="mt-1 font-semibold text-white">Ethereum + Layer 2</p>
                        <p className="mt-2 text-sm text-slate-300">Poche reti, use-case chiari, esecuzione migliore.</p>
                      </div>
                      <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Prerequisito</p>
                        <p className="mt-1 font-semibold text-white">Wallet non-custodial</p>
                        <p className="mt-2 text-sm text-slate-300">Controlli chiavi e fondi. Nessun intermediario.</p>
                      </div>
                      <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Regola d&apos;oro</p>
                        <p className="mt-1 font-semibold text-white">Sicurezza prima di tutto</p>
                        <p className="mt-2 text-sm text-slate-300">Separare wallet cold e wallet attivo.</p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-indigo-500/25 bg-slate-950/20 p-4">
                      <p className="text-sm text-slate-300">
                        Ci sono molte blockchain (BTC, ETH, SOL...), ma per partire bene conviene usare un percorso semplice e ripetibile.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          title: "1) Crea il wallet giusto",
                          text: "Apri un wallet non-custodial e conserva seed phrase/chiavi offline.",
                        },
                        {
                          title: "2) Separa tesoreria e operativita",
                          text: "Usa un wallet \"cold\" per risparmio e uno \"attivo\" per app e test.",
                        },
                        {
                          title: "3) Acquista asset da canale affidabile",
                          text: "Compra su exchange/on-ramp affidabili e verifica sempre rete e indirizzo.",
                        },
                        {
                          title: "4) Trasferisci al wallet personale",
                          text: "Sposta i fondi al wallet non-custodial con una transazione test prima dell'importo pieno.",
                        },
                        {
                          title: "5) Entra nelle app Web3",
                          text: "Connetti il wallet e accedi a DeFi, NFT e strumenti on-chain in modo graduale.",
                        },
                      ].map((step) => (
                        <div
                          key={step.title}
                          className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4 transition-colors hover:bg-indigo-800/25"
                        >
                          <p className="font-semibold text-white">{step.title}</p>
                          <p className="mt-1 text-sm text-slate-300">{step.text}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-sm text-slate-300">
                      In breve: evita di lasciare capitali su piattaforme custodial e tratta il wallet come la tua banca personale.
                    </p>
                  </div>
                </Accordion>
              </div>
              
              <p className="text-slate-900 dark:text-slate-200 mb-6">
                Ci sono diverse Blockchain, ognuna per un caso specifico. Ma non spaventatevi, perché a noi interessano al massimo una dozzina di queste, tra cui alcune Layer2 di Ethereum ed i loro ecosistemi di progetti.
              </p>
          
              <div className="mb-4">
                <Accordion buttonText={"Cos'è una Blockchain?"}>
                  <div className="p-5 space-y-5 text-slate-900 dark:text-slate-200">
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Struttura</p>
                        <p className="mt-1 font-semibold text-white">Registro distribuito</p>
                        <p className="mt-2 text-sm text-slate-300">I dati non vivono su un server unico ma su una rete di nodi.</p>
                      </div>
                      <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Integrita</p>
                        <p className="mt-1 font-semibold text-white">Immutabilita crittografica</p>
                        <p className="mt-2 text-sm text-slate-300">Blocchi concatenati che rendono difficile alterare la cronologia.</p>
                      </div>
                      <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-400">Utilita</p>
                        <p className="mt-1 font-semibold text-white">Valore + Applicazioni</p>
                        <p className="mt-2 text-sm text-slate-300">Da trasferimento di denaro a smart contract e dApp.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        "Le blockchain sono reti decentralizzate: non c'è un'autorità centrale che controlla i dati.",
                        "La trasparenza on-chain permette audit pubblici e maggiore verificabilità delle transazioni.",
                        "Bitcoin nasce come layer monetario; Ethereum amplia il modello con contratti programmabili.",
                      ].map((point) => (
                        <div key={point} className="rounded-xl border border-indigo-500/25 bg-slate-950/20 p-4">
                          <p className="text-sm text-slate-300">{point}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-sm text-slate-300">
                      In sintesi: una blockchain combina sicurezza, trasparenza e programmabilità per creare sistemi finanziari e applicativi senza intermediari tradizionali.
                    </p>
                  </div>
                </Accordion>
              </div>
              
              <div className="mt-4">
                <Link href="/blockchain">
                  <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    Vai a Blockchain
                  </div>
                </Link>
              </div>
            </div>

          <div id="defi-dapp" className="manual-card scroll-mt-24 rounded-2xl border p-8 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              Ogni Blockchain ha il proprio ecosistema di applicazioni, ed è importante saper riconoscere quali sono le migliori per poter gestire al meglio le proprio risorse (tempo e denaro).
            </p>

          <Accordion
            buttonText={"Cosa sono le applicazioni decentralizzate (DeFi)"}
              className="mb-4"
          >
              <div className="p-5 space-y-5 text-slate-900 dark:text-slate-200">
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Motore</p>
                    <p className="mt-1 font-semibold text-white">Smart contract</p>
                    <p className="mt-2 text-sm text-slate-300">Logica eseguita on-chain, senza backoffice centrale.</p>
                  </div>
                  <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Vantaggio</p>
                    <p className="mt-1 font-semibold text-white">Accesso permissionless</p>
                    <p className="mt-2 text-sm text-slate-300">Chiunque con wallet può usare le app in pochi secondi.</p>
                  </div>
                  <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Esempi</p>
                    <p className="mt-1 font-semibold text-white">DEX, lending, NFT</p>
                    <p className="mt-2 text-sm text-slate-300">Uniswap, Aave, marketplace NFT e app gaming.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      title: "dApp vs App tradizionali",
                      text: "Le app tradizionali dipendono da server e policy aziendali; le dApp da regole codificate e verificabili pubblicamente.",
                    },
                    {
                      title: "Perché sono utili",
                      text: "Riduzione di intermediari, maggior trasparenza e integrazione rapida tra protocolli (componibilità).",
                    },
                    {
                      title: "Come iniziare",
                      text: "Scegli 1-2 protocolli affidabili, usa importi piccoli e verifica sempre URL ufficiale prima di connettere il wallet.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-indigo-500/25 bg-slate-950/20 p-4">
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
          </Accordion>
          
            <div className="mt-4">
              <Link href="/defi">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Vai a DeFi
                </div>
              </Link>
            </div>
          </div>

          <div id="wallet" className="manual-card scroll-mt-24 rounded-2xl border p-8 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              Per accedere a queste applicazioni, bisogna avere un portafogli (wallet) non-custodial, che si trova sotto forma di app su dispositivi mobile oppure come estensione chrome per il computer.
            </p>
            
            <Accordion
              buttonText={"Cosa sono i wallet non-custodial"}
              className="mb-4"
            >
              <div className="p-5 space-y-5 text-slate-900 dark:text-slate-200">
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Custodia</p>
                    <p className="mt-1 font-semibold text-white">Sei tu la banca</p>
                    <p className="mt-2 text-sm text-slate-300">Controlli direttamente chiavi private e accesso ai fondi.</p>
                  </div>
                  <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Rischio</p>
                    <p className="mt-1 font-semibold text-white">Responsabilità totale</p>
                    <p className="mt-2 text-sm text-slate-300">Se perdi seed phrase/chiavi, nessuno può recuperarle per te.</p>
                  </div>
                  <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Best practice</p>
                    <p className="mt-1 font-semibold text-white">Cold + Active wallet</p>
                    <p className="mt-2 text-sm text-slate-300">Separare risparmio lungo termine da operatività quotidiana.</p>
                  </div>
                </div>

                <div className="rounded-xl border border-indigo-500/25 bg-slate-950/20 p-4">
                  <p className="font-semibold text-white">Checklist minima di sicurezza</p>
                  <ul className="mt-2 list-disc list-inside">
                    <li>Seed phrase scritta offline e mai condivisa.</li>
                    <li>Verifica dominio prima di firmare transazioni.</li>
                    <li>Usa un wallet secondario per test e dApp nuove.</li>
                  </ul>
                </div>
              </div>
            </Accordion>
            
            <div className="mt-4">
              <Link href="/wallet">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Vai a Wallet
                </div>
              </Link>
            </div>
          </div>

          <div id="onramp" className="manual-card scroll-mt-24 rounded-2xl border p-8 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              Per ottenere le criptovalute da mandare al proprio wallet non-custodial, sarà necessario ottenerle tramite un exchange centralizzata (come Coinbase o Binance), altrimenti utilizzando un on-ramp (come Transak o Moonpay).
            </p>
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              Una volta acquistate le criptovalute con la propria carta o facendo un bonifico, si potranno inviare al proprio wallet non-custodial, dove saranno al sicuro da rischi esterni e sotto al vostro esclusivo controllo.
            </p>
            
            <Accordion
              buttonText={"Come accedere al mondo Web3"}
              className="mb-4"
            >
              <div className="p-5 space-y-5 text-slate-900 dark:text-slate-200">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                    <p className="font-semibold text-white">1) CEX (Centralized Exchange)</p>
                    <p className="mt-2 text-sm text-slate-300">
                      Ideale per convertire EUR/USD in crypto. Usa piattaforme grandi e invia i fondi al tuo wallet personale dopo l&apos;acquisto.
                    </p>
                  </div>
                  <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                    <p className="font-semibold text-white">2) On-Ramp</p>
                    <p className="mt-2 text-sm text-slate-300">
                      Acquisto diretto via carta nel wallet. Comodo e rapido, ma confronta fee e spread prima di confermare.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "Scegli rete corretta (ETH, Arbitrum, Base, ecc.) prima dell'invio.",
                    "Fai una transazione test con importo piccolo.",
                    "Conferma sempre indirizzo e memo/tag se richiesti.",
                    "Evita trading impulsivo: l'obiettivo iniziale è apprendimento operativo.",
                  ].map((rule) => (
                    <div key={rule} className="rounded-xl border border-indigo-500/25 bg-slate-950/20 p-4">
                      <p className="text-sm text-slate-300">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Accordion>
            
            <div className="mt-4">
              <Link href="/compraevendicrypto">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Vai a Compra e vendi crypto
                </div>
              </Link>
            </div>
          </div>

          <div id="strategie" className="manual-card scroll-mt-24 rounded-2xl border p-8 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              Adesso che siamo riusciti ad accedere al mondo Web3, e abbiamo visto quali sono le applicazioni migliori che fanno al caso nostro, possiamo iniziare ad intraprendere le seguenti strade:
            </p>
            
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="font-semibold text-white">Track & Learn</p>
                <p className="mt-2 text-sm text-slate-300">
                  Segui governance, changelog e community ufficiali per capire come evolve un protocollo.
                </p>
              </div>
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="font-semibold text-white">Deploy capitale graduale</p>
                <p className="mt-2 text-sm text-slate-300">
                  Parti con ETH su wallet personale e testa piccole operazioni prima di scalare.
                </p>
              </div>
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="font-semibold text-white">Costruisci network</p>
                <p className="mt-2 text-sm text-slate-300">
                  Entra in community ad alta qualità (anche NFT) dove ricevi feedback e opportunità reali.
                </p>
              </div>
            </div>
          </div>

          <div id="analisi" className="manual-card scroll-mt-24 rounded-2xl border p-8 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              Esistono molti strumenti diversi che possiamo utilizzare per analizzare i progetti. Dai più semplici Navigatori di Blockchain ("blockchain explorers"), alle piattaforme di analisi e visualizzazione dei dati; saper utilizzare questi strumenti può offrire una marcia in più nella valutazione dei propri acquisti nel mondo Web3.
            </p>
            
            <div className="mt-4">
              <Link href="/strumentiutili">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Vai a Strumenti Utili
                </div>
              </Link>
            </div>
          </div>

          <div id="nft" className="manual-card scroll-mt-24 rounded-2xl border p-8 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Valutazione dei progetti</h3>
            <p className="text-slate-900 dark:text-slate-300 mb-5">
              Per valutare un progetto in modo professionale, combina metriche fondamentali (market cap, supply, TVL) con analisi del rischio e contesto di mercato.
            </p>
            <div className="grid gap-3 md:grid-cols-3 mb-6">
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Fondamentali</p>
                <p className="mt-1 font-semibold text-white">Market Cap + Supply</p>
                <p className="mt-2 text-sm text-slate-300">Capire diluizione e spazio potenziale di crescita.</p>
              </div>
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Efficienza protocollo</p>
                <p className="mt-1 font-semibold text-white">TVL / Market Cap</p>
                <p className="mt-2 text-sm text-slate-300">Confronta valore d&apos;uso e valutazione attuale.</p>
              </div>
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Timing</p>
                <p className="mt-1 font-semibold text-white">Price Action + Risk</p>
                <p className="mt-2 text-sm text-slate-300">Ingresso graduale, invalidazione e gestione size.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Accordion
                buttonText={
                  <div>
                    <div className="text-lg md:text-xl">Analizzare un Cryptoasset dalla Market Cap</div>
                    <p className="mt-1 text-sm font-normal text-slate-400">Base framework: prezzo, supply, FDV e comparables.</p>
                  </div>
                }
                className="mb-4"
              >
                <div className="p-5 space-y-6">
                  <div className="space-y-4">
                    <p className="text-slate-900 dark:text-slate-200 leading-relaxed">
                      Prima di tutto bisogna sapere che il prezzo di una criptovaluta è dettato dall'offerta della criptovaluta e la valutazione del progetto della criptovaluta (la capitalizzazione di mercato, o market cap).
                    </p>
                    <p className="text-slate-900 dark:text-slate-200 leading-relaxed">
                      Inversamente, si può dire che la market cap della criptovaluta sia determinata dall'offerta moltiplicata per il prezzo della criptovaluta.
                    </p>
                    <p className="text-slate-900 dark:text-slate-200 leading-relaxed">
                      Gli investitori ragionano con la market cap per poter determinare il potenziale di crescita di una criptovaluta rispetto ad un'altra.
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <Image 
                      src="/analizing.png" 
                      alt="Analisi Market Cap Bitcoin su CoinGecko"
                      width={800}
                      height={600}
                      className="max-w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <Accordion
                    buttonText="Come funziona"
                    className="mb-3"
                  >
                    <div className="p-4 space-y-4 text-slate-900 dark:text-slate-200">
                      <p className="mb-4">
                        La schermata sopra (accessibile da <a href="https://www.coingecko.com/it/monete/bitcoin" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.coingecko.com/it/monete/bitcoin</a>) mostra nei rettangoli evidenziati in blu le seguenti:
                      </p>
                      
                             <Accordion buttonText="1. Capitalizzazione di Mercato (Market Cap)">
                               <div className="p-4 space-y-4 text-slate-900 dark:text-slate-200">
                                 <p>
                                   La capitalizzazione di mercato di un criptoasset si calcola usando la seguente formula:
                                 </p>
                                 
                                 <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                                   <p className="font-semibold mb-2">Consideriamo che:</p>
                                   <p><strong>A = Prezzo attuale dei criptoasset in USD</strong></p>
                                   <p><strong>B = Offerta in circolazione del criptoasset</strong></p>
                                   <div className="mt-3 p-3 bg-white rounded border">
                                     <p className="text-lg font-bold text-blue-700">
                                       Capitalizzazione di mercato = A × B
                                     </p>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                   <p className="font-semibold mb-2">Esempio pratico con Bitcoin:</p>
                                   <p>
                                     Ad esempio, la capitalizzazione di mercato di Bitcoin viene calcolata moltiplicando l'Offerta disponibile di BTC per il suo prezzo. Vedendo che l'Offerta disponibile di BTC sia <strong>19.712.371</strong> e che il prezzo di BTC sia <strong>USD $66.147,70</strong>, la capitalizzazione di mercato viene quindi calcolata come:
                                   </p>
                                   <div className="mt-3 p-3 bg-white rounded border">
                                     <p className="text-lg font-bold text-green-700">
                                       19.712.371 × USD $66.147,70 = <span className="text-xl">USD 1.303.928.022.909</span>
                                     </p>
                                   </div>
                                 </div>
                               </div>
                             </Accordion>
                      
                      <Accordion buttonText="2. Valutazione 100% diluita (Fully diluted valuation, o FDV)">
                        <p className="p-4 text-slate-900 dark:text-slate-200">
                          La FDV rappresenta la capitalizzazione di mercato se tutti i token fossero già in circolazione. È importante per capire il potenziale di inflazione futura e il vero valore del progetto.
                        </p>
                      </Accordion>
                      
                      <Accordion buttonText="3. Offerta in Circolazione (Circulating Supply)">
                        <p className="p-4 text-slate-900 dark:text-slate-200">
                          La quantità di valute che circolano sul mercato e sono scambiabili dal pubblico. È paragonabile a guardare le azioni prontamente disponibili sul mercato (non detenute e bloccate dagli addetti ai lavori, dalle autorità governative).
                        </p>
                      </Accordion>
                      
                      <Accordion buttonText="4. Offerta totale">
                        <p className="p-4 text-slate-900 dark:text-slate-200">
                          Le quantità di valute che sono già state create, meno le valute che sono state bruciate (rimosse dalla circolazione). È paragonabile alle azioni in circolazione nel mercato azionario.
                        </p>
                      </Accordion>
                      
                      <Accordion buttonText="5. Offerta Massima (Max Supply)">
                        <div className="p-4 space-y-4 text-slate-900 dark:text-slate-200">
                          <p>
                            Il numero massimo di valute codificate per esistere nel periodo di vita della criptovaluta. È paragonabile al numero massimo di azioni emettibili nel mercato azionario.
                          </p>
                          
                          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <p className="font-semibold text-blue-800">
                              Offerta massima = massimo teorico programmato
                            </p>
                          </div>
                          
                          <p>
                            Ethereum (ETH) non ha un offerta massima per esempio, come puoi vedere sotto dal simbolo dell'infinito accanto all'offerta massima. (<a href="https://www.coingecko.com/it/monete/ethereum" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.coingecko.com/it/monete/ethereum</a>)
                          </p>
                          
                          <div className="flex justify-center">
                            <Image 
                              src="/analizing2.png" 
                              alt="Ethereum Max Supply su CoinGecko"
                              width={800}
                              height={400}
                              className="max-w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                          
                          <p>
                            Tuttavia, la quantità di ETH in circolazione è progressivamente diminuita da Settembre 2022, quando è avvenuto il Merge (ETH 2.0, passaggio da <em>POW</em>, Proof-of-Work a <em>POS</em>, Proof-of-Stake) come visibile dal grafico sotto.
                          </p>
                          
                          <p>
                            <a href="https://etherscan.io/chart/ethersupplygrowth" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://etherscan.io/chart/ethersupplygrowth</a>
                          </p>
                          
                          <div className="flex justify-center">
                            <Image 
                              src="/analizing3.png" 
                              alt="Ethereum Supply Growth Chart"
                              width={800}
                              height={400}
                              className="max-w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <Accordion buttonText="Controllare la Market Cap del Cryptoasset">
                              <div className="p-4 space-y-4 text-slate-900 dark:text-slate-200">
                                <p>
                                  Prima di tutto, bisogna vedere se la criptovaluta che si vuole analizzare sia completamente in circolazione, o se una parte della supply debba ancora essere immessa nel mercato.
                                </p>
                                
                                <p>
                                  Useremo il token di Liquity ($LQTY) nei nostri esempi (<a href="https://www.coingecko.com/it/monete/liquity" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.coingecko.com/it/monete/liquity</a>)
                                </p>
                                
                                <div className="flex justify-center">
                                  <Image 
                                    src="/analizing4.png" 
                                    alt="Liquity Token su CoinGecko"
                                    width={800}
                                    height={400}
                                    className="max-w-full h-auto rounded-lg shadow-md"
                                  />
                                </div>
                                
                                <p>
                                  Cliccando su "Max" in alto a destra potrete osservare la cronologia del prezzo del token desiderato, graficamente.
                                </p>
                                
                                <p>
                                  Come possiamo notare nel rettangolo in blu, la Cap. di Mercato (Market Cap) è più bassa della Valutaz. 100% diluita (FDV), il che significa che non tutti i token sono stati rilasciati.
                                </p>
                                
                                <p>
                                  Possiamo usare <a href="https://token.unlocks.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://token.unlocks.app/</a> per vedere quando verranno immessi nel mercato e come.
                                </p>
                                
                                <p>
                                  Come vedrete dal grafico del prezzo di $LQTY, sembrerebbe che il prezzo sia andato costantemente giù.
                                </p>
                                
                                <p>
                                  Tuttavia, se si considera che l'offerta iniziale era più bassa di quella di oggi, e che una parte delle emissioni (o tutte) sono andate a chi possedeva il token $LQTY (tramite Staking o di altro tipo), fare un'analisi usando solamente il prezzo sarebbe errato.
                                </p>
                                
                                <p>
                                  Visualizzando il grafico della Market Cap invece, potremmo notare un'interessante differenza. 👇🏻
                                </p>
                                
                                <div className="flex justify-center">
                                  <Image 
                                    src="/analizing5.png" 
                                    alt="Liquity Market Cap Chart"
                                    width={800}
                                    height={400}
                                    className="max-w-full h-auto rounded-lg shadow-md"
                                  />
                                </div>
                                
                                <p>
                                  Prima di tutto, che l'andamento è stato costantemente a rialzo sin dall'inizio, e secondo poi, che adesso siamo ai minimi storici per questa crypto.
                                </p>
                              </div>
                            </Accordion>
                            
                            <Accordion buttonText="Comparare la Market Cap con quella di progetti simili">
                              <p className="p-4 text-slate-900 dark:text-slate-200">
                                Confronta la Market Cap del progetto che stai analizzando con quella di progetti simili nel stesso settore. Ad esempio, se stai valutando un DEX, confrontalo con Uniswap, SushiSwap o altri exchange decentralizzati. Questo ti darà un'idea del potenziale di crescita relativo.
                              </p>
                            </Accordion>
                          </div>
                        </div>
                      </Accordion>
                    </div>
                  </Accordion>
                  
                </div>
              </Accordion>
              
              <Accordion
                buttonText={
                  <div>
                    <div className="text-lg md:text-xl">Calcolare il Rischio usando la Media del Prezzo</div>
                    <p className="mt-1 text-sm font-normal text-slate-400">Posizionamento rispetto alle medie e volatilità.</p>
                  </div>
                }
                className="mb-4"
              >
                <div className="p-5 space-y-4 text-slate-900 dark:text-slate-200">
                  <div className="flex justify-center">
                    <Image 
                      src="/analizing6.png" 
                      alt="Benjamin Cowen - Into The Cryptoverse"
                      width={800}
                      height={400}
                      className="max-w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-lg font-semibold mb-2">Benjamin Cowen</p>
                    <p className="mb-4">
                      You have just jumped into the cryptoverse, which provides high quality cryptocurrency education to those who want to dive deeper
                    </p>
                    <a 
                      href="https://www.youtube.com/@intothecryptoverse" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      https://www.youtube.com/@intothecryptoverse
                    </a>
                  </div>
                </div>
              </Accordion>
              
              <Accordion
                buttonText={
                  <div>
                    <div className="text-lg md:text-xl">TVL to Market Cap ratio</div>
                    <p className="mt-1 text-sm font-normal text-slate-400">Valuta se il protocollo è caro o economico rispetto all&apos;uso reale.</p>
                  </div>
                }
                className="mb-4"
              >
                <div className="p-5 space-y-4 text-slate-900 dark:text-slate-200">
                  <p>
                    Valore fondamentale del prodotto: per esempio, il TVL ("Total Value Locked") di un progetto rappresenta il valore in dollari dei token depositati nei suoi smart-contract.
                  </p>
                  
                  <p>
                    Se si prende la market cap (capitalizzazione di mercato = valore del progetto/azienda) e la si mette accanto al TVL, si ottiene un ratio tra le due, che ci permette di paragonarlo ad altri progetti nella stessa categoria, per capire se è sottovalutato o sopravvalutato rispetto ad essa, e se fosse sottovalutato, si può calcolare il potenziale apprezzamento (upside) calcolando il ratio tra quella sottovalutata e sopravvalutata.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-semibold text-blue-800 mb-3">Esempio pratico:</p>
                    
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border">
                        <p className="font-semibold text-green-700">AAVE (Leader nel Lending & Borrowing)</p>
                        <p><strong>TVL:</strong> $13 miliardi</p>
                        <p><strong>Market Cap:</strong> $1.5 miliardi</p>
                        <p><strong>Ratio TVL/Market Cap:</strong> 8.67x</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded border">
                        <p className="font-semibold text-orange-700">Liquity (Progetto sottovalutato)</p>
                        <p><strong>TVL:</strong> $700 milioni</p>
                        <p><strong>Market Cap:</strong> $100 milioni</p>
                        <p><strong>Ratio TVL/Market Cap:</strong> 7x</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-yellow-50 rounded border">
                      <p className="font-semibold text-yellow-800">Calcolo del Potenziale Apprezzamento:</p>
                      <p className="text-sm">
                        Se Liquity avesse lo stesso ratio di AAVE (8.67x), la sua Market Cap dovrebbe essere:
                      </p>
                      <p className="text-lg font-bold text-yellow-700">
                        $700M ÷ 8.67 = $80.7M (attuale) → $700M × 8.67 = $6.07B (potenziale)
                      </p>
                      <p className="text-sm mt-2">
                        <strong>Upside potenziale:</strong> Da $100M a $6.07B = <span className="text-green-600 font-bold">6,070% di crescita</span>
                      </p>
                    </div>
                  </div>
                  
                  <p>
                    Il potenziale apprezzamento della market cap di Liquity sarebbe da $100M a $1.5B, se si assume che il mercato eventualmente capirà il suo valore (per mercato si intende i partecipanti ad esso, ovvero gli "investitori").
                  </p>
                </div>
              </Accordion>
              
              <Accordion
                buttonText={
                  <div>
                    <div className="text-lg md:text-xl">Price Action (Analisi Tecnica)</div>
                    <p className="mt-1 text-sm font-normal text-slate-400">Trend, livelli chiave e execution plan.</p>
                  </div>
                }
                className="mb-4"
              >
                <div className="p-5 space-y-5 text-slate-900 dark:text-slate-200">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Trend</p>
                      <p className="mt-1 font-semibold text-white">Higher High / Lower Low</p>
                      <p className="mt-2 text-sm text-slate-300">Capisci se il mercato premia o distribuisce rischio.</p>
                    </div>
                    <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Livelli</p>
                      <p className="mt-1 font-semibold text-white">Supporti e resistenze</p>
                      <p className="mt-2 text-sm text-slate-300">Zone dove prezzo e liquidità reagiscono più spesso.</p>
                    </div>
                    <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Execution</p>
                      <p className="mt-1 font-semibold text-white">Entry + invalidazione</p>
                      <p className="mt-2 text-sm text-slate-300">Ogni trade deve avere stop logico e size coerente.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      "Non entrare in breakout estesi: preferisci retest o zone value.",
                      "Definisci prima rischio massimo per operazione (es. 0.5%-1% del capitale).",
                      "Se il setup cambia, esci: proteggere capitale è priorità.",
                      "Usa timeframe multipli: trend su HTF, timing su LTF.",
                    ].map((rule) => (
                      <div key={rule} className="rounded-xl border border-indigo-500/25 bg-slate-950/20 p-4">
                        <p className="text-sm text-slate-300">{rule}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                    <p className="font-semibold text-white">Template pratico</p>
                    <p className="mt-2 text-sm text-slate-300">
                      Tesi (perché entro) → Trigger (dove entro) → Invalidazione (dove sbaglio) → Target (dove prendo profitto) → Post-analisi.
                    </p>
                  </div>
                </div>
              </Accordion>
            </div>
          </div>

          <div id="sicurezza" className="manual-card scroll-mt-24 rounded-2xl border p-8 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              Gli NFT sono uno dei settori ancora meno sviluppati all&apos;interno del mondo Web3. Se ne è sentito molto parlare negli anni scorsi per via di progetti buoni che ancora esistono (come i Crypto Punk, i Pudgy Penguin, i Bored Ape..) ma anche per i molti scam che ci sono stati (come purtroppo accade in tutti i settori nascenti, anche non-Web3, quindi non preoccupatevi o per lo meno, prestate attenzione).
            </p>
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              Possono essere collezioni di PFP (profile pictures), arte digitale, arte tradizionale tokenizzata, o addirittura interi immobili, e molto altro ancora.
            </p>
            
              <Accordion
                buttonText="Come scegliere la propria community NFT"
                className="mb-4"
              >
                <div className="p-5 space-y-4 text-slate-900 dark:text-slate-200">
                  <p className="font-semibold text-lg mb-4">
                    Quando scegli una community NFT, considera i seguenti fattori:
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      {
                        title: "1. Visione e Valori",
                        text: "La community deve riflettere i tuoi interessi e obiettivi.",
                      },
                      {
                        title: "2. Engagement",
                        text: "Cerca una community attiva su piattaforme come Discord e Twitter.",
                      },
                      {
                        title: "3. Utilita",
                        text: "Valuta i benefici dell'NFT, come eventi esclusivi o ricompense previste per gli holders.",
                      },
                      {
                        title: "4. Team e Trasparenza",
                        text: "Assicurati che il team sia esperto e chiaro sui piani.",
                      },
                      {
                        title: "5. Prezzo della Collezione",
                        text: "Scegli NFT che puoi permetterti senza sovra-allocare il tuo portafoglio. Evita di impegnarti troppo, a meno che tu non voglia entrarci solo temporaneamente per esplorare la community.",
                      },
                    ].map((item) => (
                      <div key={item.title} className="rounded-xl border border-indigo-500/25 bg-slate-950/20 p-4">
                        <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-slate-300 text-sm">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Accordion>
            
            <div className="mt-4">
              <Link href="/nft">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Vai a NFT
                </div>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border p-8 mb-8 dark:bg-indigo-900/25 dark:border-indigo-500/20 bg-white border-slate-200 shadow-lg">
            <p className="text-slate-900 dark:text-slate-200 mb-6">
              È <span className="text-red-600 font-bold">importantissimo prestare molta attenzione</span> a non cadere in truffe di vario genere come <em>Phishing</em> o <em>Scam</em>. Ci sono diversi modi in cui si può perdere il proprio denaro cadendo vittima di truffe che purtroppo, sono presenti anche in questo lato del web. Seguendo i consigli che troverai nel manuale Anti Truffe qui sotto, sarai in grado di navigare questo mondo minimizzando i rischi.
            </p>
            
            <Accordion
              buttonText={
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Manuale per evitare truffe
                </div>
              }
              className="mb-4"
            >
              <div className="p-5 space-y-6">
                <p className="text-slate-900 dark:text-slate-200">
                  Il mondo delle criptovalute offre enormi opportunità, ma è anche terreno fertile per truffatori. Ecco una guida su come proteggerti dalle truffe, basata su consigli di esperti del settore.
                </p>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">1. Ricerca Approfondita</h4>
                  <p className="text-slate-900 dark:text-slate-200">
                    Prima di investire in qualsiasi criptovaluta o progetto, è fondamentale fare una ricerca approfondita. Leggi il whitepaper del progetto, verifica l&apos;identità del team dietro il progetto e cerca recensioni e analisi indipendenti. Progetti con team anonimi o senza documentazione chiara sono da considerare sospetti.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">2. Utilizza Solo Wallet Reputati</h4>
                  <p className="text-slate-900 dark:text-slate-200">
                    Assicurati che i wallet che scarichi provengano da fonti affidabili. Evita di installare wallet da link ricevuti via email o messaggi privati, poiché potrebbero essere falsi e progettati per rubare le tue criptovalute. Verifica sempre che il wallet sia ufficiale e controlla le recensioni degli utenti.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">3. Attenzione ai Link Malevoli</h4>
                  <p className="text-slate-900 dark:text-slate-200">
                    I link malevoli possono infettare il tuo dispositivo con malware o portarti su siti fasulli che possono drenare i tuoi fondi. Verifica sempre i link accedendo direttamente dal sito ufficiale o dai canali social ufficiali del progetto. Tratta ogni link ricevuto da sconosciuti con estrema cautela.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">4. Riconosci i Segnali di Allarme</h4>
                  <ul className="list-disc list-inside space-y-2 text-slate-900 dark:text-slate-200">
                    <li><strong>Promesse di Guadagni Elevati</strong>: Se un&apos;offerta sembra troppo bella per essere vera, probabilmente è una truffa. Nessuna piattaforma legittima garantisce rendimenti altissimi senza rischi.</li>
                    <li><strong>Mancanza di Trasparenza</strong>: Progetti che non forniscono informazioni chiare sul loro funzionamento, il team o i loro obiettivi sono sospetti.</li>
                    <li><strong>Senso di Urgenza</strong>: I truffatori spesso cercano di creare un senso di urgenza per farti agire senza riflettere. Le opportunità di investimento genuine non richiedono decisioni affrettate.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">5. Utilizza Exchange Reputati</h4>
                  <p className="text-slate-900 dark:text-slate-200">
                    Quando compri, vendi o scambi criptovalute, usa solo exchange ben conosciuti e con una buona reputazione. Verifica che l&apos;exchange rispetti le normative, abbia una storia di sicurezza solida e offra protezioni come l&apos;assicurazione sui depositi.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">6. Proteggi i Tuoi Wallet</h4>
                  <p className="text-slate-900 dark:text-slate-200">
                    Mantieni i tuoi software sempre aggiornati per proteggerti dalle vulnerabilità. Usa hardware wallet per conservare quantità significative di criptovalute e attiva l&apos;autenticazione a due fattori (2FA) dove possibile. Utilizza un &quot;burner&quot; wallet per le transazioni quotidiane, lasciando i fondi principali in un wallet separato e più sicuro.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3">7. Evita le Truffe dei Falsi Airdrop</h4>
                  <p className="text-slate-900 dark:text-slate-200">
                    I falsi airdrop sono una tattica comune per indurre le persone a rivelare le loro chiavi private o a firmare transazioni malevole. Partecipa solo a airdrop da fonti affidabili e verifica sempre l&apos;autenticità dell&apos;offerta tramite i canali ufficiali del progetto.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">
                    Seguendo questi consigli, puoi ridurre significativamente il rischio di cadere vittima di truffe nel mondo delle criptovalute e navigare questo spazio con maggiore sicurezza.
                  </p>
            </div>
        </div>
            </Accordion>
          </div>

            </div>
          </div>
        </div>
      </div>
      <footer className={`border-t py-4 text-center text-sm ${isDark ? "border-indigo-500/20 text-slate-500" : "border-slate-200 text-slate-600"}`}>
        ImparoDeFi © {new Date().getFullYear()}. All rights reserved.
      </footer>
    </div>
  );
}
