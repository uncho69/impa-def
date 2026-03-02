import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { isModeratorOrAdmin } from '@/lib/auth/permissions';

const ADMIN_EMAILS_RAW = process.env.ADMIN_EMAILS ?? process.env.admin_emails ?? '';
const ADMIN_EMAILS_SET = new Set(
  ADMIN_EMAILS_RAW.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean)
);

export async function canManageAdmin(userId: string): Promise<boolean> {
  if (!userId) return false;
  if (await isModeratorOrAdmin(userId)) return true;
  if (ADMIN_EMAILS_SET.size === 0) return false;
  const row = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  const email = row[0]?.email?.trim().toLowerCase();
  return !!email && ADMIN_EMAILS_SET.has(email);
}
