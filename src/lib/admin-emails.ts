/**
 * Lista admin e check email. Modulo client-safe (nessun import server).
 * Usare questo file nei Client Component; usare admin-auth.ts solo nei Server Component/API.
 */
const ADMIN_EMAILS = [
  "jeffben69zos@gmail.com",
  "admin@imparodefi.com",
  "cofounder@imparodefi.com",
  "lordbaconf@gmail.com",
];

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export { ADMIN_EMAILS };
