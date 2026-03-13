"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_SITE_SETTINGS, type FooterLink, type SiteSettings } from "@/lib/site-settings-shared";

type SiteFooterProps = {
  isDark: boolean;
  className?: string;
};

function iconFor(linkId: FooterLink["id"]) {
  if (linkId === "discord") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
      </svg>
    );
  }
  if (linkId === "twitter") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (linkId === "youtube") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 5h18v14H3z" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function isExternalLink(href: string): boolean {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:");
}

export function SiteFooter({ isDark, className }: SiteFooterProps) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/api/site-settings", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data?.settings) {
          setSettings(data.settings as SiteSettings);
        }
      } catch {
        // Keep defaults when the endpoint is unavailable.
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const year = new Date().getFullYear();
  const socialLinks = useMemo(
    () => settings.footer.links.filter((link) => link.href.trim().length > 0),
    [settings.footer.links],
  );

  return (
    <footer
      className={`w-full border-t ${isDark ? "border-indigo-500/20 bg-indigo-950/35" : "border-slate-200 bg-white/85"} ${className ?? ""}`}
    >
      <div className="px-4 sm:px-6 py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-700"}`}>
            {settings.footer.brandText} {year}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {socialLinks.map((link) => {
              const external = isExternalLink(link.href);
              const classes = `inline-flex items-center gap-1.5 text-sm ${isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"} transition-colors`;
              if (external) {
                return (
                  <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" className={classes}>
                    {iconFor(link.id)}
                    {link.label}
                  </a>
                );
              }
              return (
                <Link key={link.id} href={link.href} className={classes}>
                  {iconFor(link.id)}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className={`mt-3 flex flex-wrap items-center gap-4 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          <Link href={settings.footer.privacyPolicyHref} className="hover:underline">
            Privacy Policy
          </Link>
          <Link href={settings.footer.termsHref} className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
