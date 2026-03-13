"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useAppAuth } from "@/lib/auth/useAppAuth";
import { usePrivy } from "@privy-io/react-auth";
import { useLanguage } from "@/contexts/LanguageContext";

type CryptoLevel = "zero" | "beginner" | "intermediate" | "advanced";
type SocialProvider = "x" | "instagram";

const PROFESSIONS = [
  { value: "Studente", it: "Studente", en: "Student" },
  { value: "Impiegato", it: "Impiegato", en: "Office worker" },
  { value: "Operaio", it: "Operaio", en: "Worker" },
  { value: "Libero professionista", it: "Libero professionista", en: "Freelancer" },
  { value: "Imprenditore", it: "Imprenditore", en: "Entrepreneur" },
  { value: "Professore", it: "Professore", en: "Teacher/Professor" },
  { value: "Infermiere", it: "Infermiere", en: "Nurse" },
  { value: "Medico", it: "Medico", en: "Doctor" },
  { value: "Artista", it: "Artista", en: "Artist" },
  { value: "Attore", it: "Attore", en: "Actor" },
  { value: "Content creator", it: "Content creator", en: "Content creator" },
  { value: "Mamma/Papa casalingo", it: "Mamma/Papa casalingo", en: "Stay-at-home parent" },
] as const;

const GOALS = [
  { value: "Capire le basi senza fuffa", it: "Capire le basi senza fuffa", en: "Understand the basics clearly" },
  { value: "Imparare a usare wallet in sicurezza", it: "Imparare a usare wallet in sicurezza", en: "Learn wallet security best practices" },
  { value: "Scoprire opportunita reali in DeFi", it: "Scoprire opportunita reali in DeFi", en: "Explore real DeFi opportunities" },
  { value: "Fare networking con community serie", it: "Fare networking con community serie", en: "Network with high-quality communities" },
  { value: "Creare contenuti/progetti nel Web3", it: "Creare contenuti/progetti nel Web3", en: "Build content/projects in Web3" },
] as const;

const CRYPTO_LEVEL_OPTIONS: Array<{ id: CryptoLevel; itTitle: string; itDescription: string; enTitle: string; enDescription: string }> = [
  {
    id: "zero",
    itTitle: "Zero",
    itDescription: "Parto da zero: conosco poco o nulla e voglio un percorso semplice.",
    enTitle: "Zero",
    enDescription: "Starting from scratch: I know little or nothing and need a simple path.",
  },
  {
    id: "beginner",
    itTitle: "Principiante",
    itDescription: "Ho qualche crypto su exchange ma non uso wallet in autonomia.",
    enTitle: "Beginner",
    enDescription: "I hold some crypto on exchanges but do not use wallets independently.",
  },
  {
    id: "intermediate",
    itTitle: "Intermedio",
    itDescription: "Uso wallet, provo NFT/memecoin e voglio migliorare strategia e sicurezza.",
    enTitle: "Intermediate",
    enDescription: "I use wallets, try NFTs/memecoins, and want to improve strategy and safety.",
  },
  {
    id: "advanced",
    itTitle: "Avanzato",
    itDescription: "Navigo la DeFi, seguo airdrop e cerco strumenti/insight di livello superiore.",
    enTitle: "Advanced",
    enDescription: "I navigate DeFi, follow airdrops, and look for advanced tools/insights.",
  },
];

type ExistingRequest = {
  status: "pending" | "approved" | "rejected";
  socialProvider: SocialProvider;
  socialUrl: string;
  professions: string[];
  cryptoLevel: CryptoLevel;
  goals: string[];
  concerns: string | null;
  weeklyTime: string | null;
  previousExperience: string | null;
  adminReviewNotes: string | null;
  createdAt: string;
};

type SocialAccount = {
  provider: string;
  providerUserId: string | null;
  status: string;
};

export default function BetaAccessPage() {
  const { isLoaded, isSignedIn, login } = useAppAuth();
  const { linkTwitter } = usePrivy();
  const { language } = useLanguage();
  const isEnglish = language === "en";

  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [customProfession, setCustomProfession] = useState("");
  const [cryptoLevel, setCryptoLevel] = useState<CryptoLevel>("zero");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [concerns, setConcerns] = useState("");
  const [weeklyTime, setWeeklyTime] = useState("");
  const [previousExperience, setPreviousExperience] = useState("");
  const [socialProvider, setSocialProvider] = useState<SocialProvider>("x");
  const [socialUrl, setSocialUrl] = useState("");
  const [socialHandle, setSocialHandle] = useState("");

  const [existingRequest, setExistingRequest] = useState<ExistingRequest | null>(null);
  const [submissionPosition, setSubmissionPosition] = useState<number | null>(null);
  const [eligibleFirst30, setEligibleFirst30] = useState(false);
  const [xConnected, setXConnected] = useState(false);
  const [linkingX, setLinkingX] = useState(false);
  const [socialLinkError, setSocialLinkError] = useState<string | null>(null);
  const [professionPickerOpen, setProfessionPickerOpen] = useState(false);
  const professionPickerRef = useRef<HTMLDivElement | null>(null);

  const [loadingRequest, setLoadingRequest] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const copy = useMemo(
    () => ({
      heroTitle: isEnglish ? "Early Access ImparoDeFi" : "Early Access ImparoDeFi",
      heroSubtitle: isEnglish
        ? "We are building a tailor-made path to help newcomers enter Web3 with clarity, practicality, and safety."
        : "Stiamo costruendo un percorso tailor-made per aiutare i normies a entrare nel Web3 in modo chiaro, pratico e sicuro.",
      loginRequired: isEnglish ? "You must log in to complete the form." : "Per compilare il form devi fare login.",
      loginButton: isEnglish ? "Login" : "Accedi",
      professionTitle: isEnglish ? "1) Profession" : "1) Professione",
      professionHint: isEnglish
        ? "Select one or more professions to help us personalize your path."
        : "Seleziona una o piu professioni per aiutarci a personalizzare il percorso.",
      professionPlaceholder: isEnglish ? "Select an option or create one" : "Seleziona un opzione o crea",
      emptyProfession: isEnglish ? "No profession selected" : "Nessuna professione selezionata",
      pickerHint: isEnglish ? "Select an option or create one" : "Seleziona un'opzione o creane una",
      create: isEnglish ? "Create" : "Crea",
      submit: isEnglish ? "Submit request" : "Invia richiesta",
      update: isEnglish ? "Update request" : "Aggiorna richiesta",
      submitting: isEnglish ? "Submitting..." : "Invio...",
      status: isEnglish ? "Request status" : "Stato richiesta",
      position: isEnglish ? "Submission position" : "Posizione invio",
      notes: isEnglish ? "Admin notes" : "Note admin",
    }),
    [isEnglish],
  );

  const professionLabel = (value: string): string => {
    const found = PROFESSIONS.find((item) => item.value === value);
    if (!found) return value;
    return isEnglish ? found.en : found.it;
  };

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    let cancelled = false;

    const load = async () => {
      setLoadingRequest(true);
      try {
        const [requestRes, socialRes] = await Promise.all([
          fetch("/api/access-requests", { cache: "no-store" }),
          fetch("/api/social-accounts/me", { cache: "no-store" }),
        ]);

        const requestData = await requestRes.json().catch(() => ({}));
        if (!cancelled && requestRes.ok) {
          setExistingRequest((requestData?.request as ExistingRequest | null) ?? null);
          setSubmissionPosition(typeof requestData?.submissionPosition === "number" ? requestData.submissionPosition : null);
          setEligibleFirst30(Boolean(requestData?.eligibleFirst30));
        }

        const socialData = await socialRes.json().catch(() => ({}));
        const accounts = (socialData?.accounts ?? []) as SocialAccount[];
        const hasVerifiedX = accounts.some((account) => account.provider === "x" && account.status === "verified");
        if (!cancelled) {
          setXConnected(hasVerifiedX);
        }
      } finally {
        if (!cancelled) setLoadingRequest(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn]);

  const statusLabel = useMemo(() => {
    if (!existingRequest) return null;
    if (existingRequest.status === "approved") return isEnglish ? "Approved (beta access active)" : "Approvato (accesso beta attivo)";
    if (existingRequest.status === "rejected") return isEnglish ? "Not approved" : "Non approvato";
    return isEnglish ? "Under review" : "In revisione";
  }, [existingRequest, isEnglish]);

  const toggleValue = (value: string, current: string[], setState: (next: string[]) => void) => {
    if (current.includes(value)) {
      setState(current.filter((item) => item !== value));
      return;
    }
    setState([...current, value]);
  };

  const handleAddProfession = () => {
    const value = customProfession.trim();
    if (!value) return;
    if (!selectedProfessions.includes(value)) {
      setSelectedProfessions([...selectedProfessions, value]);
    }
    setCustomProfession("");
  };

  const removeProfession = (value: string) => {
    setSelectedProfessions((prev) => prev.filter((item) => item !== value));
  };

  useEffect(() => {
    if (!professionPickerOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      const node = professionPickerRef.current;
      if (!node) return;
      if (!node.contains(event.target as Node)) {
        setProfessionPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [professionPickerOpen]);

  const handleLinkX = async () => {
    setSocialLinkError(null);
    setLinkingX(true);
    try {
      await linkTwitter();
      const socialRes = await fetch("/api/social-accounts/me", { cache: "no-store" });
      const socialData = await socialRes.json().catch(() => ({}));
      const accounts = (socialData?.accounts ?? []) as SocialAccount[];
      const hasVerifiedX = accounts.some((account) => account.provider === "x" && account.status === "verified");
      setXConnected(hasVerifiedX);
    } catch (error) {
      setSocialLinkError(error instanceof Error && error.message ? error.message : "Impossibile collegare X. Riprova.");
    } finally {
      setLinkingX(false);
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/access-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          professions: selectedProfessions,
          cryptoLevel,
          goals: selectedGoals,
          concerns,
          weeklyTime,
          previousExperience,
          socialProvider,
          socialUrl,
          socialHandle,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(String(data?.error ?? (isEnglish ? "Submission failed. Please retry." : "Invio non riuscito. Riprova.")));
        return;
      }
      setExistingRequest((data?.request as ExistingRequest | null) ?? null);
      setSubmissionPosition(typeof data?.submissionPosition === "number" ? data.submissionPosition : null);
      setEligibleFirst30(Boolean(data?.eligibleFirst30));
      setMessage(isEnglish ? "Request sent successfully. We will update you after admin review." : "Richiesta inviata con successo. Ti aggiorneremo dopo revisione admin.");
    } catch {
      setMessage(isEnglish ? "Network error during submission." : "Errore di rete durante l'invio.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-2xl border border-indigo-500/20 bg-indigo-900/25 p-6">
        <h1 className="text-3xl font-bold text-white">{copy.heroTitle}</h1>
        <p className="mt-2 text-slate-300">{copy.heroSubtitle}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
            <p className="text-sm font-semibold text-emerald-200">{isEnglish ? "10 USDC for first 30" : "10 USDC ai primi 30"}</p>
            <p className="mt-1 text-xs text-emerald-100/90">
              {isEnglish
                ? "The first 30 users who submit the form and get approved receive the prize and beta platform access."
                : "I primi 30 che compilano il form e vengono approvati ricevono il premio e ricevono accesso alla piattaforma in beta."}
            </p>
          </div>
          <div className="rounded-xl border border-indigo-400/30 bg-indigo-500/10 p-4">
            <p className="text-sm font-semibold text-indigo-200">{isEnglish ? "50 USDC extra (3 random)" : "50 USDC extra (3 random)"}</p>
            <p className="mt-1 text-xs text-indigo-100/90">
              {isEnglish
                ? "3 participants will be randomly selected for a 50 USDC prize each (and will get beta access)."
                : "Verranno estratti 3 partecipanti per un premio da 50 USDC ciascuno (e riceveranno accesso alla piattaforma in beta)."}
            </p>
          </div>
          <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4">
            <p className="text-sm font-semibold text-amber-200">{isEnglish ? "Invite-only access" : "Accesso a invito"}</p>
            <p className="mt-1 text-xs text-amber-100/90">
              {isEnglish
                ? "If you are not in the first 30, you remain on a priority waitlist. You will be notified by email once admitted."
                : "Chi non rientra nei primi 30 resta in waitlist prioritarià per l'accesso. Verrai notificato per email appena lo ottieni."}
            </p>
          </div>
        </div>
      </section>

      {!isLoaded ? (
        <section className="rounded-2xl border border-indigo-500/20 bg-indigo-900/25 p-6 text-slate-300">{isEnglish ? "Loading..." : "Caricamento..."}</section>
      ) : !isSignedIn ? (
        <section className="rounded-2xl border border-indigo-500/20 bg-indigo-900/25 p-6">
          <p className="text-slate-200">{copy.loginRequired}</p>
          <button
            type="button"
            onClick={() => login()}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            {copy.loginButton}
          </button>
        </section>
      ) : (
        <>
          {existingRequest ? (
            <section className="rounded-2xl border border-indigo-500/20 bg-indigo-900/25 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-300">{copy.status}</p>
                  <p className="text-lg font-semibold text-white">{statusLabel}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">{copy.position}</p>
                  <p className="text-sm font-medium text-slate-200">{submissionPosition ?? "-"}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-300">
                {eligibleFirst30
                  ? (isEnglish ? "You are within the first 30 submissions." : "Sei nella fascia dei primi 30 invii.")
                  : (isEnglish
                    ? "You are currently outside the first-30 range (waitlist until approval)."
                    : "Al momento sei fuori dalla fascia primi 30 (resti in waitlist finché non approvato).")}
              </p>
              {existingRequest.adminReviewNotes ? (
                <div className="mt-3 rounded-lg border border-indigo-400/25 bg-indigo-950/35 p-3 text-sm text-slate-200">
                  <p className="font-medium text-white">{copy.notes}</p>
                  <p className="mt-1">{existingRequest.adminReviewNotes}</p>
                </div>
              ) : null}
            </section>
          ) : null}

          <form onSubmit={submit} className="space-y-6 rounded-2xl border border-indigo-500/20 bg-indigo-900/25 p-6">
            <section>
              <h2 className="text-xl font-semibold text-white">{copy.professionTitle}</h2>
              <p className="mt-1 text-sm text-slate-300">{copy.professionHint}</p>
              <div ref={professionPickerRef} className="mt-3 rounded-lg border border-indigo-500/25 bg-indigo-950/35 p-2">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedProfessions.map((profession) => (
                    <button
                      key={profession}
                      type="button"
                      onClick={() => removeProfession(profession)}
                      className="rounded-md border border-amber-300/55 bg-amber-400/20 px-3 py-1 text-sm text-amber-100 hover:bg-amber-400/30"
                      title="Rimuovi professione"
                    >
                      {professionLabel(profession)} ×
                    </button>
                  ))}
                  <input
                    value={customProfession}
                    onChange={(e) => setCustomProfession(e.target.value)}
                    onFocus={() => setProfessionPickerOpen(true)}
                    onClick={() => setProfessionPickerOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddProfession();
                      }
                    }}
                    placeholder={copy.professionPlaceholder}
                    className="min-w-[240px] flex-1 bg-transparent px-2 py-1.5 text-sm text-white outline-none placeholder:text-slate-400"
                  />
                </div>
                {professionPickerOpen ? (
                  <div className="mt-2 rounded-md border border-indigo-400/25 bg-slate-950/45 p-2">
                    <p className="mb-2 text-xs text-slate-400">{copy.pickerHint}</p>
                    <div className="flex flex-wrap gap-2">
                      {PROFESSIONS.filter((profession) => !selectedProfessions.includes(profession.value)).map((profession) => (
                        <button
                          key={profession.value}
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => toggleValue(profession.value, selectedProfessions, setSelectedProfessions)}
                          className="rounded-md border border-indigo-400/30 bg-indigo-950/35 px-3 py-1.5 text-sm text-slate-200 transition-colors hover:bg-indigo-800/40"
                        >
                          {isEnglish ? profession.en : profession.it}
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={handleAddProfession}
                        className="rounded-md border border-indigo-400/35 px-2.5 py-1 text-xs text-indigo-100 hover:bg-indigo-500/15"
                      >
                        {copy.create}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">{isEnglish ? "2) Crypto experience" : "2) Esperienza crypto"}</h2>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {CRYPTO_LEVEL_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setCryptoLevel(option.id)}
                    className={`rounded-xl border p-4 text-left transition-colors ${
                      cryptoLevel === option.id
                        ? "border-indigo-300/60 bg-indigo-500/20"
                        : "border-indigo-500/25 bg-indigo-900/20 hover:bg-indigo-800/30"
                    }`}
                  >
                    <p className="font-semibold text-white">{isEnglish ? option.enTitle : option.itTitle}</p>
                    <p className="mt-1 text-sm text-slate-300">{isEnglish ? option.enDescription : option.itDescription}</p>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white">{isEnglish ? "3) Main goals" : "3) Obiettivi principali"}</h2>
              <p className="mt-1 text-sm text-slate-300">{isEnglish ? "What do you want from this beta?" : "Cosa vuoi ottenere in questa beta?"}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {GOALS.map((goal) => (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => toggleValue(goal.value, selectedGoals, setSelectedGoals)}
                    className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                      selectedGoals.includes(goal.value)
                        ? "border-emerald-300/60 bg-emerald-500/20 text-emerald-100"
                        : "border-indigo-400/30 bg-indigo-950/35 text-slate-200 hover:bg-indigo-800/40"
                    }`}
                  >
                    {isEnglish ? goal.en : goal.it}
                  </button>
                ))}
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm text-slate-300">{isEnglish ? "How much time per week can you dedicate?" : "Quanto tempo a settimana puoi dedicare?"}</span>
                <input
                  value={weeklyTime}
                  onChange={(e) => setWeeklyTime(e.target.value)}
                  placeholder={isEnglish ? "e.g. 2-4 hours" : "es. 2-4 ore"}
                  className="mt-1 w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
                />
              </label>
              <label className="block">
                <span className="text-sm text-slate-300">{isEnglish ? "Concerns / bad experiences (optional)" : "Esperienze negative/preoccupazioni (opzionale)"}</span>
                <input
                  value={concerns}
                  onChange={(e) => setConcerns(e.target.value)}
                  placeholder={isEnglish ? "e.g. scam fear, seed phrase handling" : "es. paura scam, gestione seed phrase"}
                  className="mt-1 w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
                />
              </label>
            </section>

            <label className="block">
              <span className="text-sm text-slate-300">{isEnglish ? "Briefly tell us your context (optional)" : "Raccontaci brevemente il tuo contesto (opzionale)"}</span>
              <textarea
                value={previousExperience}
                onChange={(e) => setPreviousExperience(e.target.value)}
                rows={4}
                placeholder={isEnglish ? "Why are you learning crypto/DeFi, what have you tried, what do you want to avoid..." : "Perche vuoi imparare crypto/DeFi, cosa hai gia provato, cosa vuoi evitare..."}
                className="mt-1 w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
              />
            </label>

            <section className="rounded-xl border border-indigo-500/25 bg-indigo-950/35 p-4">
              <h2 className="text-xl font-semibold text-white">{isEnglish ? "4) Required social (anti-bot)" : "4) Social richiesto (anti-bot)"}</h2>
              <p className="mt-1 text-sm text-slate-300">
                {isEnglish
                  ? "You must provide at least one social account: X or Instagram. Instagram direct connect will be enabled soon in Privy."
                  : "Devi collegare almeno un social: X o Instagram. Instagram connect arrivera presto su Privy, intanto puoi inserire il tuo profilo."}
              </p>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setSocialProvider("x")}
                  className={`rounded-lg border p-3 text-left ${
                    socialProvider === "x" ? "border-indigo-300/60 bg-indigo-500/20" : "border-indigo-500/25 bg-indigo-900/20"
                  }`}
                >
                  <p className="font-semibold text-white">X</p>
                  <p className="mt-1 text-xs text-slate-300">{xConnected ? (isEnglish ? "Connected" : "Collegato") : (isEnglish ? "Not connected" : "Non collegato")}</p>
                </button>
                <button
                  type="button"
                  onClick={() => setSocialProvider("instagram")}
                  className={`rounded-lg border p-3 text-left ${
                    socialProvider === "instagram" ? "border-indigo-300/60 bg-indigo-500/20" : "border-indigo-500/25 bg-indigo-900/20"
                  }`}
                >
                  <p className="font-semibold text-white">Instagram</p>
                  <p className="mt-1 text-xs text-slate-300">{isEnglish ? "Insert profile URL (manual admin verification)" : "Inserisci il profilo (verifica manuale admin)"}</p>
                </button>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <input
                  value={socialUrl}
                  onChange={(e) => setSocialUrl(e.target.value)}
                    placeholder={socialProvider === "x" ? "https://x.com/yourprofile" : "https://instagram.com/yourprofile"}
                  className="w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
                />
                <input
                  value={socialHandle}
                  onChange={(e) => setSocialHandle(e.target.value)}
                    placeholder={socialProvider === "x" ? (isEnglish ? "@x_handle (optional)" : "@handle_x (opzionale)") : (isEnglish ? "@instagram_handle (optional)" : "@handle_instagram (opzionale)")}
                  className="w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
                />
              </div>

              {!xConnected && socialProvider === "x" ? (
                <div className="mt-2 rounded-lg border border-amber-400/35 bg-amber-500/10 p-3">
                  <p className="text-xs text-amber-100">{isEnglish ? "X is not connected. Connect it directly from this form." : "X non risulta collegato. Collegalo direttamente da questo form."}</p>
                  <button
                    type="button"
                    onClick={handleLinkX}
                    disabled={linkingX}
                    className="mt-2 rounded-lg border border-amber-300/45 px-3 py-1.5 text-xs text-amber-100 hover:bg-amber-500/15 disabled:opacity-60"
                  >
                    {linkingX ? (isEnglish ? "Connecting X..." : "Collegamento X...") : (isEnglish ? "Connect X now" : "Collega X ora")}
                  </button>
                  {socialLinkError ? <p className="mt-2 text-xs text-rose-200">{socialLinkError}</p> : null}
                </div>
              ) : null}
            </section>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting || loadingRequest}
                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
              >
                {submitting ? copy.submitting : existingRequest ? copy.update : copy.submit}
              </button>
              {message ? <p className="text-sm text-slate-300">{message}</p> : null}
            </div>
          </form>
        </>
      )}
    </div>
  );
}
