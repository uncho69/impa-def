import "server-only";

/**
 * Lista admin da env e check email.
 * Valori supportati: ADMIN_EMAILS o admin_emails (comma-separated).
 * Nessun fallback hardcoded per evitare di esporre email nel repository.
 */
function normalizeEmail(raw: string | null | undefined): string {
  if (typeof raw !== "string") return "";
  const base = raw.trim().toLowerCase();
  const atIndex = base.indexOf("@");
  if (atIndex <= 0 || atIndex === base.length - 1) return base;

  let local = base.slice(0, atIndex);
  let domain = base.slice(atIndex + 1);

  // Canonicalize Gmail aliases: googlemail.com -> gmail.com,
  // remove dots and plus-tag from local part.
  if (domain === "googlemail.com") domain = "gmail.com";
  if (domain === "gmail.com") {
    const plusIndex = local.indexOf("+");
    if (plusIndex >= 0) local = local.slice(0, plusIndex);
    local = local.replace(/\./g, "");
  }

  return `${local}@${domain}`;
}

const ADMIN_EMAILS = (
  process.env.ADMIN_EMAILS ??
  process.env.admin_emails ??
  ""
)
  .split(",")
  .map((email) => normalizeEmail(email))
  .filter(Boolean);

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(normalizeEmail(email));
}

export { ADMIN_EMAILS, normalizeEmail };
