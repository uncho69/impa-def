"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_SITE_SETTINGS, type FooterLink, type SiteSettings } from "@/lib/site-settings-shared";

type FooterLinkId = FooterLink["id"];

const LINK_IDS: FooterLinkId[] = ["discord", "twitter", "youtube", "contact"];

function updateLink(
  links: FooterLink[],
  id: FooterLinkId,
  field: "label" | "href",
  value: string,
): FooterLink[] {
  return links.map((item) => (item.id === id ? { ...item, [field]: value } : item));
}

function displayHref(id: FooterLinkId, href: string): string {
  if (id !== "contact") return href;
  return href.replace(/^mailto:/i, "");
}

function normalizeHrefForSave(id: FooterLinkId, href: string): string {
  const value = href.trim();
  if (id !== "contact") return value;
  if (!value) return "";
  if (/^mailto:/i.test(value)) return value;
  return `mailto:${value}`;
}

export default function AdminSiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/admin/site-settings", { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (!cancelled && data?.settings) {
          setSettings(data.settings as SiteSettings);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const linksById = useMemo(() => {
    const map = new Map<FooterLinkId, FooterLink>();
    for (const id of LINK_IDS) {
      const found = settings.footer.links.find((item) => item.id === id);
      if (found) map.set(id, found);
    }
    return map;
  }, [settings.footer.links]);

  const saveSettings = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const normalizedSettings: SiteSettings = {
        ...settings,
        footer: {
          ...settings.footer,
          links: settings.footer.links.map((link) => ({
            ...link,
            href: normalizeHrefForSave(link.id, link.href),
          })),
        },
      };

      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: normalizedSettings }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data?.error ? String(data.error) : "Salvataggio non riuscito.");
        return;
      }
      if (data?.settings) {
        setSettings(data.settings as SiteSettings);
      }
      setMessage("Impostazioni salvate.");
    } catch {
      setMessage("Errore di rete durante il salvataggio.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-900/25 p-6">
        <h1 className="text-xl font-bold text-white">Footer e pagine legali</h1>
        <p className="mt-2 text-sm text-slate-300">
          Gestisci link del footer e contenuti di Privacy Policy / Terms of Service.
        </p>
      </div>

      <div className="rounded-xl border border-indigo-500/20 bg-indigo-900/25 p-6">
        <h2 className="text-lg font-semibold text-white">Link footer</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm text-slate-300">Brand text</span>
            <input
              value={settings.footer.brandText}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, brandText: e.target.value },
                }))
              }
              className="mt-1 w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
            />
          </label>

          {LINK_IDS.map((id) => {
            const current = linksById.get(id) ?? { id, label: id, href: "" };
            return (
              <div key={id} className="grid grid-cols-1 gap-2 rounded-lg border border-indigo-500/20 p-3">
                <input
                  value={current.label}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        links: updateLink(prev.footer.links, id, "label", e.target.value),
                      },
                    }))
                  }
                  placeholder={`${id} label`}
                  className="w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
                />
                <input
                  value={displayHref(id, current.href)}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        links: updateLink(prev.footer.links, id, "href", e.target.value),
                      },
                    }))
                  }
                  placeholder={`${id} url`}
                  className="w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
                />
              </div>
            );
          })}

          <label className="block">
            <span className="text-sm text-slate-300">Privacy Policy link</span>
            <input
              value={settings.footer.privacyPolicyHref}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, privacyPolicyHref: e.target.value },
                }))
              }
              className="mt-1 w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Terms link</span>
            <input
              value={settings.footer.termsHref}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  footer: { ...prev.footer, termsHref: e.target.value },
                }))
              }
              className="mt-1 w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
            />
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-indigo-500/20 bg-indigo-900/25 p-6">
        <h2 className="text-lg font-semibold text-white">Privacy Policy</h2>
        <div className="mt-4 space-y-3">
          <input
            value={settings.legal.privacyPolicyTitle}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                legal: { ...prev.legal, privacyPolicyTitle: e.target.value },
              }))
            }
            className="w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
            placeholder="Titolo pagina privacy"
          />
          <textarea
            value={settings.legal.privacyPolicyContent}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                legal: { ...prev.legal, privacyPolicyContent: e.target.value },
              }))
            }
            rows={10}
            className="w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
          />
        </div>
      </div>

      <div className="rounded-xl border border-indigo-500/20 bg-indigo-900/25 p-6">
        <h2 className="text-lg font-semibold text-white">Terms of Service</h2>
        <div className="mt-4 space-y-3">
          <input
            value={settings.legal.termsTitle}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                legal: { ...prev.legal, termsTitle: e.target.value },
              }))
            }
            className="w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
            placeholder="Titolo pagina ToS"
          />
          <textarea
            value={settings.legal.termsContent}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                legal: { ...prev.legal, termsContent: e.target.value },
              }))
            }
            rows={10}
            className="w-full rounded-lg border border-indigo-500/30 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={saveSettings}
          disabled={loading || saving}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:opacity-60"
        >
          {saving ? "Salvataggio..." : "Salva impostazioni"}
        </button>
        {message ? <p className="text-sm text-slate-300">{message}</p> : null}
      </div>
    </div>
  );
}
