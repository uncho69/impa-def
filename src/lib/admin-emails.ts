import "server-only";

/**
 * Lista admin da env e check email.
 * Valori supportati: ADMIN_EMAILS o admin_emails (comma-separated).
 * Nessun fallback hardcoded per evitare di esporre email nel repository.
 */
const ADMIN_EMAILS = (
  process.env.ADMIN_EMAILS ??
  process.env.admin_emails ??
  ""
)
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export { ADMIN_EMAILS };
