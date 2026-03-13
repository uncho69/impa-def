import { db } from '@/lib/db';
import { authAccounts, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { isModeratorOrAdmin } from '@/lib/auth/permissions';
import { isAdminEmail } from '@/lib/admin-emails';

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
  if (email && isAdminEmail(email)) return true;

  const linkedAccounts = await db
    .select({ email: authAccounts.email })
    .from(authAccounts)
    .where(eq(authAccounts.userId, userId));
  for (const account of linkedAccounts) {
    const linkedEmail = account.email?.trim().toLowerCase();
    if (linkedEmail && isAdminEmail(linkedEmail)) {
      return true;
    }
  }

  return false;
}
