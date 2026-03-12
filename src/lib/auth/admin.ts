import { db } from '@/lib/db';
import { authAccounts, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { isModeratorOrAdmin } from '@/lib/auth/permissions';
import { isAdminEmail } from '@/lib/admin-emails';

const ADMIN_EMAILS_RAW = process.env.ADMIN_EMAILS ?? process.env.admin_emails ?? '';
const ADMIN_EMAILS_SET = new Set(
  ADMIN_EMAILS_RAW.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
);

export async function canManageAdmin(userId: string): Promise<boolean> {
  if (!userId) return false;
  if (!db) return false;

  try {
    if (await isModeratorOrAdmin(userId)) return true;
  } catch {
    // Continue with email-based checks below if role table lookup fails.
  }

  const row = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  const email = row[0]?.email?.trim().toLowerCase();
  if (email && (ADMIN_EMAILS_SET.has(email) || isAdminEmail(email))) return true;

  const linkedAccounts = await db
    .select({ email: authAccounts.email })
    .from(authAccounts)
    .where(eq(authAccounts.userId, userId));
  for (const account of linkedAccounts) {
    const linkedEmail = account.email?.trim().toLowerCase();
    if (linkedEmail && (ADMIN_EMAILS_SET.has(linkedEmail) || isAdminEmail(linkedEmail))) {
      return true;
    }
  }

  return false;
}
