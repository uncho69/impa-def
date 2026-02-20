/**
 * OAuth Token Management
 * Handles token expiration detection and user re-authentication requests
 */

import { db } from '@/lib/db';
import { authAccounts, users } from '@/lib/db/schema';
import { eq, and, isNotNull } from 'drizzle-orm';

export interface TokenStatus {
  userId: string;
  twitterUserId: string | null;
  isExpired: boolean;
  expiresAt: Date | null;
  needsReauth: boolean;
}

/**
 * Check token expiration status for all users with Twitter authentication
 */
export async function checkTokenStatuses(): Promise<TokenStatus[]> {
  const authRecords = await db
    .select({
      userId: authAccounts.userId,
      twitterUserId: users.twitterId,
      expiresAt: authAccounts.expiresAt,
    })
    .from(authAccounts)
    .innerJoin(users, eq(authAccounts.userId, users.id))
    .where(
      and(
        eq(authAccounts.provider, 'twitter'),
        eq(authAccounts.isActive, 1),
        isNotNull(authAccounts.accessToken),
        eq(users.isActive, 1)
      )
    );

  const now = new Date();

  return authRecords.map((record) => {
    const isExpired = record.expiresAt ? record.expiresAt < now : false;
    const needsReauth = isExpired;

    return {
      userId: record.userId,
      twitterUserId: record.twitterUserId,
      isExpired,
      expiresAt: record.expiresAt,
      needsReauth,
    };
  });
}

/**
 * Get users who need re-authentication
 */
export async function getUsersNeedingReauth(): Promise<TokenStatus[]> {
  const allStatuses = await checkTokenStatuses();
  return allStatuses.filter((status) => status.needsReauth);
}

/**
 * Mark a user as needing re-authentication
 * This could be used to send notifications or show UI prompts
 */
export async function markUserNeedsReauth(userId: string): Promise<void> {
  // You could add a field to the users table to track this
  // For now, we'll just log it - the system will skip them automatically
  console.log(`User ${userId} needs to re-authenticate their Twitter account`);
  
  // Optionally, you could:
  // 1. Add a notification to the user
  // 2. Set a flag in the database
  // 3. Send an email notification
  // 4. Show a banner in the UI
}

/**
 * Check if a user's token is expired
 */
export async function isTokenExpired(userId: string): Promise<boolean> {
  const authAccount = await db
    .select({
      expiresAt: authAccounts.expiresAt,
    })
    .from(authAccounts)
    .where(
      and(
        eq(authAccounts.userId, userId),
        eq(authAccounts.provider, 'twitter'),
        eq(authAccounts.isActive, 1)
      )
    )
    .limit(1);

  if (authAccount.length === 0 || !authAccount[0].expiresAt) {
    return true; // No token or no expiration date = consider expired
  }

  return authAccount[0].expiresAt < new Date();
}

/**
 * API endpoint helper: Check if current user needs re-authentication
 * This can be called from the frontend to show re-auth prompts
 */
export async function checkUserTokenStatus(userId: string): Promise<{
  needsReauth: boolean;
  expiresAt: Date | null;
  isExpired: boolean;
}> {
  const authAccount = await db
    .select({
      expiresAt: authAccounts.expiresAt,
    })
    .from(authAccounts)
    .where(
      and(
        eq(authAccounts.userId, userId),
        eq(authAccounts.provider, 'twitter'),
        eq(authAccounts.isActive, 1)
      )
    )
    .limit(1);

  if (authAccount.length === 0 || !authAccount[0].expiresAt) {
    return {
      needsReauth: true,
      expiresAt: null,
      isExpired: true,
    };
  }

  const isExpired = authAccount[0].expiresAt < new Date();

  return {
    needsReauth: isExpired,
    expiresAt: authAccount[0].expiresAt,
    isExpired,
  };
}

