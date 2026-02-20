import { db } from '@/lib/db';
import { userRoles, users } from '@/lib/db/schema';
import { eq, and, inArray, sql } from 'drizzle-orm';

export type UserRole = 'admin' | 'moderator' | 'participant' | 'base_user';

export async function hasRole(userId: string, role: UserRole): Promise<boolean> {
  if (!userId) return false;

  const result = await db
    .select()
    .from(userRoles)
    .where(and(eq(userRoles.userId, userId), eq(userRoles.role, role)))
    .limit(1);

  return result.length > 0;
}

export async function hasAnyRole(userId: string, roles: UserRole[]): Promise<boolean> {
  if (!userId || roles.length === 0) return false;

  const result = await db
    .select()
    .from(userRoles)
    .where(and(eq(userRoles.userId, userId), inArray(userRoles.role, roles)))
    .limit(1);

  return result.length > 0;
}

export async function getUserRoles(userId: string): Promise<UserRole[]> {
  if (!userId) return [];

  const result = await db
    .select({ role: userRoles.role })
    .from(userRoles)
    .where(eq(userRoles.userId, userId));

  return result.map((r) => r.role as UserRole);
}

export async function canAddTweetsToCampaign(userId: string): Promise<boolean> {
  // All registered users can add tweets
  // Just check if userId exists (user is registered)
  if (!userId) return false;
  
  // Check if user exists in the database
  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(
      and(
        eq(users.id, userId),
        eq(users.isActive, 1),
        sql`${users.deletedAt} IS NULL`
      )
    )
    .limit(1);
  
  return user.length > 0;
}

export async function isAdmin(userId: string): Promise<boolean> {
  return hasRole(userId, 'admin');
}

export async function isModeratorOrAdmin(userId: string): Promise<boolean> {
  return hasAnyRole(userId, ['admin', 'moderator']);
}

