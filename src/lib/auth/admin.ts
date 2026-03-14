import { db } from '@/lib/db';
import { authAccounts, users } from '@/lib/db/schema';
import { and, eq, inArray } from 'drizzle-orm';
import { isModeratorOrAdmin } from '@/lib/auth/permissions';
import { isAdminEmail } from '@/lib/admin-emails';

export async function canManageAdmin(userId: string): Promise<boolean> {
  if (!userId) return false;
  if (!db) return false;

  const candidateUserIds = new Set<string>([userId]);
  const candidateEmails = new Set<string>();

  try {
    if (await isModeratorOrAdmin(userId)) return true;
  } catch {
    // Continue with email-based checks below if role table lookup fails.
  }

  const directUserRows = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  for (const row of directUserRows) {
    if (row.id) candidateUserIds.add(row.id);
    if (row.email) candidateEmails.add(row.email);
  }

  // Fallback: some sessions can still carry Privy user id while DB rows are keyed by canonical app user id.
  const privyMappedUsers = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.privyId, userId))
    .limit(3);
  for (const row of privyMappedUsers) {
    if (row.id) candidateUserIds.add(row.id);
    if (row.email) candidateEmails.add(row.email);
  }

  const privyLinkedAccounts = await db
    .select({ userId: authAccounts.userId, email: authAccounts.email })
    .from(authAccounts)
    .where(and(eq(authAccounts.provider, 'privy'), eq(authAccounts.providerAccountId, userId)))
    .limit(3);
  for (const account of privyLinkedAccounts) {
    if (account.userId) candidateUserIds.add(account.userId);
    if (account.email) candidateEmails.add(account.email);
  }

  for (const email of candidateEmails) {
    if (isAdminEmail(email)) {
      return true;
    }
  }

  const userIdList = Array.from(candidateUserIds).filter(Boolean);
  if (userIdList.length > 0) {
    // Role fallback on all mapped user ids.
    for (const candidateId of userIdList) {
      try {
        if (await isModeratorOrAdmin(candidateId)) return true;
      } catch {
        // Ignore and continue on next candidate.
      }
    }

    const linkedAccounts = await db
      .select({ email: authAccounts.email })
      .from(authAccounts)
      .where(inArray(authAccounts.userId, userIdList));
    for (const account of linkedAccounts) {
      if (account.email && isAdminEmail(account.email)) {
        return true;
      }
    }
  }

  return false;
}
