"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useAppAuth } from "@/lib/auth/useAppAuth";
import { usePrivy } from "@privy-io/react-auth";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/imparodefi-logo-nobg.webp";
import LanguageToggle from "@/components/LanguageToggle";
import { SiteFooter } from "@/components/SiteFooter";

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
  const [socialProvider] = useState<SocialProvider>("x");
  const [socialUrl, setSocialUrl] = useState("");
  const [socialHandle, setSocialHandle] = useState("");
  const [contactEmail, setContactEmail] = useState("");

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
      emailTitle: isEnglish ? "Contact email" : "Email di contatto",
      emailHint: isEnglish
        ? "Use an email you check often. We will use it for approval updates."
        : "Usa un'email che controlli spesso. La useremo per aggiornarti sull'approvazione.",
      emailPlaceholder: isEnglish ? "name@email.com" : "nome@email.com",
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

  const buildXProfileUrlFromId = (xId: string | null | undefined): string => {
    const value = (xId ?? "").trim();
    if (!value) return "";
    if (/^\d+$/.test(value)) return `https://x.com/i/user/${value}`;
    return `https://x.com/${value.replace(/^@+/, "")}`;
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
        const verifiedXAccount = accounts.find(
          (account) => account.provider === "x" && account.status === "verified",
        );
        const hasVerifiedX = Boolean(verifiedXAccount);
        if (!cancelled) {
          setXConnected(hasVerifiedX);
          if (hasVerifiedX) {
            const xUrl = buildXProfileUrlFromId(verifiedXAccount?.providerUserId);
            setSocialUrl(xUrl);
            if (verifiedXAccount?.providerUserId) {
              setSocialHandle(`@${String(verifiedXAccount.providerUserId).replace(/^@+/, "")}`);
            }
          }
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
    if (!isSignedIn) {
      login();
      return;
    }
    setLinkingX(true);
    try {
      await linkTwitter();
      const socialRes = await fetch("/api/social-accounts/me", { cache: "no-store" });
      const socialData = await socialRes.json().catch(() => ({}));
      const accounts = (socialData?.accounts ?? []) as SocialAccount[];
      const verifiedXAccount = accounts.find(
        (account) => account.provider === "x" && account.status === "verified",
      );
      const hasVerifiedX = Boolean(verifiedXAccount);
      setXConnected(hasVerifiedX);
      if (hasVerifiedX) {
        const xUrl = buildXProfileUrlFromId(verifiedXAccount?.providerUserId);
        setSocialUrl(xUrl);
        if (verifiedXAccount?.providerUserId) {
          setSocialHandle(`@${String(verifiedXAccount.providerUserId).replace(/^@+/, "")}`);
        }
      } else {
        setSocialLinkError(
          isEnglish ? "X connection not found yet. Try again." : "Connessione X non rilevata ancora. Riprova.",
        );
      }
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
    if (!xConnected || !socialUrl.trim()) {
      setMessage(
        isEnglish
          ? "Please connect X before submitting the request."
          : "Collega X prima di inviare la richiesta.",
      );
      setSubmitting(false);
      return;
    }
    try {
      const res = await fetch("/api/access-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactEmail,
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-950 via-slate-900/95 to-indigo-950 text-white">
      <header className="sticky top-0 z-40 border-b border-indigo-500/20 bg-indigo-950/55 backdrop-blur">
        <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="ImparoDeFi Logo" width={38} height={38} className="h-9 w-9" priority />
            <span className="text-2xl font-bold tracking-tight">ImparoDeFi</span>
            <span className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-slate-300">BETA</span>
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-6">
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

      <>
          {isSignedIn && existingRequest ? (
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
              <h2 className="text-xl font-semibold text-white">{copy.emailTitle}</h2>
              <p className="mt-1 text-sm text-slate-300">{copy.emailHint}</p>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder={copy.emailPlaceholder}
                className="mt-3 w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
                required
              />
            </section>
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
                  ? "Connect at least one social account. X is active now, Instagram is shown here and will be enabled via Privy soon."
                  : "Collega almeno un social. X e attivo ora, Instagram e mostrato qui e verra abilitato su Privy a breve."}
              </p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div
                  className={`rounded-lg border p-3 text-left ${
                    xConnected ? "border-emerald-300/60 bg-emerald-500/20" : "border-indigo-500/25 bg-indigo-900/20"
                  }`}
                >
                  <p className="font-semibold text-white">X</p>
                  <p className="mt-1 text-xs text-slate-300">
                    {xConnected
                      ? (isEnglish ? "Connected" : "Collegato")
                      : (isEnglish ? "Not connected" : "Non collegato")}
                  </p>
                  <button
                    type="button"
                    onClick={handleLinkX}
                    disabled={linkingX}
                    className="mt-2 rounded-lg border border-amber-300/45 px-3 py-1.5 text-xs text-amber-100 hover:bg-amber-500/15 disabled:opacity-60"
                  >
                    {linkingX
                      ? (isEnglish ? "Connecting X..." : "Collegamento X...")
                      : !isSignedIn
                        ? (isEnglish ? "Login and connect X" : "Accedi e collega X")
                        : (isEnglish ? "Connect X now" : "Collega X ora")}
                  </button>
                </div>

                <div className="rounded-lg border border-indigo-500/25 bg-indigo-900/20 p-3 text-left">
                  <p className="font-semibold text-white">Instagram</p>
                  <p className="mt-1 text-xs text-slate-300">
                    {isEnglish ? "Not connected yet" : "Non collegato"}
                  </p>
                  <button
                    type="button"
                    disabled
                    className="mt-2 rounded-lg border border-indigo-300/35 px-3 py-1.5 text-xs text-slate-300 opacity-80"
                  >
                    {isEnglish ? "Coming soon on Privy" : "In arrivo su Privy"}
                  </button>
                </div>
              </div>

              {socialLinkError ? <p className="mt-2 text-xs text-rose-200">{socialLinkError}</p> : null}
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
    </div>
      </main>
      <div className="mt-auto">
        <SiteFooter isDark />
      </div>
    </div>
  );
}
