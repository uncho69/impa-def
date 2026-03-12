export type FooterLinkId = "discord" | "twitter" | "youtube" | "contact";

export type FooterLink = {
  id: FooterLinkId;
  label: string;
  href: string;
};

export type SiteSettings = {
  footer: {
    brandText: string;
    links: FooterLink[];
    privacyPolicyHref: string;
    termsHref: string;
  };
  legal: {
    privacyPolicyTitle: string;
    privacyPolicyContent: string;
    termsTitle: string;
    termsContent: string;
  };
};

const FOOTER_LINK_ORDER: FooterLinkId[] = ["discord", "twitter", "youtube", "contact"];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  footer: {
    brandText: "ImparoDeFi",
    links: [
      { id: "discord", label: "Discord", href: "https://discord.gg/eRpURHGv2U" },
      { id: "twitter", label: "Twitter", href: "https://x.com/imparodefi" },
      { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@imparodefi" },
      { id: "contact", label: "Contact Us", href: "mailto:info@imparodefi.xyz" },
    ],
    privacyPolicyHref: "/privacy-policy",
    termsHref: "/terms-of-service",
  },
  legal: {
    privacyPolicyTitle: "Privacy Policy",
    privacyPolicyContent:
      "Aggiorna questa pagina dal pannello admin.\n\nRaccogliamo solo i dati necessari per fornire il servizio, migliorare l'esperienza utente e mantenere la sicurezza della piattaforma.",
    termsTitle: "Terms of Service",
    termsContent:
      "Aggiorna questa pagina dal pannello admin.\n\nUsando ImparoDeFi accetti di utilizzare la piattaforma in modo lecito, responsabile e nel rispetto delle regole della community.",
  },
};

function sanitizeString(value: unknown, fallback: string): string {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized || fallback;
}

function sanitizeOptionalString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeFooterLink(raw: unknown, fallback: FooterLink): FooterLink {
  if (!raw || typeof raw !== "object") return fallback;
  const source = raw as Partial<FooterLink>;
  const hasHrefField = Object.prototype.hasOwnProperty.call(source, "href");
  const normalizedHref = hasHrefField
    ? sanitizeOptionalString(source.href)
    : fallback.href;
  return {
    id: fallback.id,
    label: sanitizeString(source.label, fallback.label),
    href: normalizedHref,
  };
}

export function normalizeSiteSettings(raw: unknown): SiteSettings {
  const source = raw && typeof raw === "object" ? (raw as Partial<SiteSettings>) : {};
  const footerSource = source.footer && typeof source.footer === "object" ? source.footer : {};
  const legalSource = source.legal && typeof source.legal === "object" ? source.legal : {};
  const linksSource =
    footerSource && Array.isArray((footerSource as { links?: unknown }).links)
      ? ((footerSource as { links: unknown[] }).links ?? [])
      : [];

  const links = FOOTER_LINK_ORDER.map((id) => {
    const fallback = DEFAULT_SITE_SETTINGS.footer.links.find((item) => item.id === id)!;
    const existing = linksSource.find((item) => {
      if (!item || typeof item !== "object") return false;
      return (item as { id?: unknown }).id === id;
    });
    return normalizeFooterLink(existing, fallback);
  });

  return {
    footer: {
      brandText: sanitizeString(
        (footerSource as { brandText?: unknown }).brandText,
        DEFAULT_SITE_SETTINGS.footer.brandText,
      ),
      links,
      privacyPolicyHref: sanitizeString(
        (footerSource as { privacyPolicyHref?: unknown }).privacyPolicyHref,
        DEFAULT_SITE_SETTINGS.footer.privacyPolicyHref,
      ),
      termsHref: sanitizeString(
        (footerSource as { termsHref?: unknown }).termsHref,
        DEFAULT_SITE_SETTINGS.footer.termsHref,
      ),
    },
    legal: {
      privacyPolicyTitle: sanitizeString(
        (legalSource as { privacyPolicyTitle?: unknown }).privacyPolicyTitle,
        DEFAULT_SITE_SETTINGS.legal.privacyPolicyTitle,
      ),
      privacyPolicyContent: sanitizeString(
        (legalSource as { privacyPolicyContent?: unknown }).privacyPolicyContent,
        DEFAULT_SITE_SETTINGS.legal.privacyPolicyContent,
      ),
      termsTitle: sanitizeString(
        (legalSource as { termsTitle?: unknown }).termsTitle,
        DEFAULT_SITE_SETTINGS.legal.termsTitle,
      ),
      termsContent: sanitizeString(
        (legalSource as { termsContent?: unknown }).termsContent,
        DEFAULT_SITE_SETTINGS.legal.termsContent,
      ),
    },
  };
}
