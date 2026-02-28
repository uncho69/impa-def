import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { users, authAccounts, userRoles } from '@/lib/db/schema';
import { eq, and, or, sql } from 'drizzle-orm';

interface ClerkEmailAddress {
  id: string;
  email_address: string;
}

interface ClerkExternalAccount {
  id: string;
  provider: string;
  provider_user_id?: string;
  username?: string | null;
  verified?: boolean;
}

interface ClerkWebhookData {
  id: string;
  email_addresses?: ClerkEmailAddress[];
  primary_email_address_id?: string;
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  external_accounts?: ClerkExternalAccount[];
}

interface ClerkWebhookEvent {
  type: string;
  data: ClerkWebhookData;
}

function getWebhookSecret(): string {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('CLERK_WEBHOOK_SECRET is not set');
  }
  if (!webhookSecret.startsWith('whsec_')) {
    throw new Error('CLERK_WEBHOOK_SECRET must start with "whsec_" (invalid format)');
  }
  return webhookSecret;
}

export async function POST(request: NextRequest) {
  console.log('🔔 Webhook received at:', new Date().toISOString());
  
  try {
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    console.log('📋 Webhook headers:', {
      hasSvixId: !!svix_id,
      hasSvixTimestamp: !!svix_timestamp,
      hasSvixSignature: !!svix_signature,
    });

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('❌ Missing svix headers');
      return NextResponse.json(
        { error: 'Error occurred -- no svix headers' },
        { status: 400 }
      );
    }

    const payload = await request.text();
    console.log('📦 Payload length:', payload.length, 'bytes');

    let webhookSecret: string;
    let wh: Webhook;
    
    try {
      webhookSecret = getWebhookSecret();
      wh = new Webhook(webhookSecret);
    } catch (error) {
      console.error('Error initializing webhook:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return NextResponse.json(
        { error: 'Webhook configuration error', details: errorMessage },
        { status: 500 }
      );
    }

    let evt: ClerkWebhookEvent;

    try {
      const svixHeaders = {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      };

      const verifiedPayload = wh.verify(payload, svixHeaders);
      
      if (!verifiedPayload) {
        console.error('Webhook verification returned undefined');
        return NextResponse.json(
          { error: 'Error occurred -- webhook verification failed' },
          { status: 400 }
        );
      }

      evt = verifiedPayload as ClerkWebhookEvent;

      if (!evt || !evt.type || !evt.data) {
        console.error('Invalid webhook payload structure:', evt);
        return NextResponse.json(
          { error: 'Error occurred -- invalid webhook payload' },
          { status: 400 }
        );
      }
    } catch (err) {
      console.error('Error verifying webhook:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      return NextResponse.json(
        { error: 'Error occurred -- could not verify webhook', details: errorMessage },
        { status: 400 }
      );
    }

    const eventType = evt.type;
    console.log(`📨 Event type: ${eventType}`);

    if (eventType === 'user.created') {
      console.log('👤 Processing user.created event...');
      const { id: clerkId, email_addresses, username, external_accounts } = evt.data;

      const existingAuthAccount = await db
        .select({ userId: authAccounts.userId })
        .from(authAccounts)
        .where(
          and(
            eq(authAccounts.provider, 'clerk'),
            eq(authAccounts.providerAccountId, clerkId)
          )
        )
        .limit(1);

      if (existingAuthAccount.length > 0) {
        return NextResponse.json(
          { message: 'User already exists', userId: existingAuthAccount[0].userId },
          { status: 200 }
        );
      }

      const primaryEmail = email_addresses?.find((email) => email.id === evt.data.primary_email_address_id);
      const email = primaryEmail?.email_address || email_addresses?.[0]?.email_address;

      // Extract Twitter ID from external_accounts if user signed in with Twitter/X (Clerk can send 'oauth_twitter', 'twitter', or 'x')
      const twitterAccount = external_accounts?.find(
        (account) =>
          account.provider === 'oauth_twitter' || account.provider === 'twitter' || account.provider === 'x'
      );
      const twitterId = twitterAccount?.provider_user_id || null;

      const userId = clerkId;

      // Check if user exists (including soft-deleted)
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (existingUser.length > 0) {
        // User exists - check if soft-deleted
        const user = existingUser[0];
        if (user.deletedAt || user.isActive === 0) {
          // User is soft-deleted - restore/reactivate them
          console.log(`♻️  Restoring soft-deleted user: ${userId}`);
          await db
            .update(users)
            .set({
              email: email || user.email,
              twitterId: twitterId || user.twitterId,
              username: username || user.username,
              isActive: 1,
              deletedAt: null,
              updatedAt: new Date(),
            })
            .where(eq(users.id, userId));

          // Check if authAccount exists, if not create it
          const existingAuth = await db
            .select()
            .from(authAccounts)
            .where(
              and(
                eq(authAccounts.userId, userId),
                eq(authAccounts.provider, 'clerk'),
                eq(authAccounts.providerAccountId, clerkId)
              )
            )
            .limit(1);

          if (existingAuth.length === 0) {
            await db.insert(authAccounts).values({
              userId: userId,
              provider: 'clerk',
              providerAccountId: clerkId,
              providerUserId: clerkId,
              email: email || null,
              isActive: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }

          // Check if userRoles exist, if not create base_user role
          const existingRoles = await db
            .select()
            .from(userRoles)
            .where(eq(userRoles.userId, userId))
            .limit(1);

          if (existingRoles.length === 0) {
            await db.insert(userRoles).values({
              userId: userId,
              role: 'base_user',
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }

          console.log(`✅ Soft-deleted user restored: ${userId} (${email || 'no email'})`);
          return NextResponse.json(
            { message: 'User restored successfully', userId },
            { status: 200 }
          );
        } else {
          // User exists and is active
          console.log(`✅ User ${userId} already exists in database`);
          return NextResponse.json(
            { message: 'User already exists', userId },
            { status: 200 }
          );
        }
      }

      // User doesn't exist - create new user
      try {
        await db.insert(users).values({
          id: userId,
          email: email || null,
          twitterId: twitterId,
          username: username || null,
          isActive: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await db.insert(authAccounts).values({
          userId: userId,
          provider: 'clerk',
          providerAccountId: clerkId,
          providerUserId: clerkId,
          email: email || null,
          isActive: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await db.insert(userRoles).values({
          userId: userId,
          role: 'base_user',
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        console.log(`✅ User created successfully via webhook: ${userId} (${email || 'no email'})`);
        return NextResponse.json(
          { message: 'User created successfully', userId },
          { status: 201 }
        );
      } catch (dbError: any) {
        console.error('❌ Database error creating user:', dbError);
        // Check if it's a unique constraint violation (email, twitterId, or username)
        if (dbError?.code === '23505' || dbError?.message?.includes('unique')) {
          console.log(`⚠️  Unique constraint violation, checking for soft-deleted user...`);
          
          // Try to find soft-deleted user by email, twitterId, or username
          const softDeletedUser = await db
            .select()
            .from(users)
            .where(
              and(
                or(
                  email ? eq(users.email, email) : undefined,
                  twitterId ? eq(users.twitterId, twitterId) : undefined,
                  username ? eq(users.username, username) : undefined
                ),
                or(
                  sql`${users.deletedAt} IS NOT NULL`,
                  eq(users.isActive, 0)
                )
              )
            )
            .limit(1);

          if (softDeletedUser.length > 0) {
            const user = softDeletedUser[0];
            console.log(`♻️  Found soft-deleted user with same email/twitterId/username, restoring: ${user.id}`);
            
            // Restore the soft-deleted user (keep existing ID, can't change primary key)
            await db
              .update(users)
              .set({
                email: email || user.email,
                twitterId: twitterId || user.twitterId,
                username: username || user.username,
                isActive: 1,
                deletedAt: null,
                updatedAt: new Date(),
              })
              .where(eq(users.id, user.id));

            // Create authAccount linking new Clerk ID to the restored user
            // Check if authAccount already exists for this Clerk ID
            const existingAuthForClerk = await db
              .select()
              .from(authAccounts)
              .where(
                and(
                  eq(authAccounts.provider, 'clerk'),
                  eq(authAccounts.providerAccountId, clerkId)
                )
              )
              .limit(1);

            if (existingAuthForClerk.length === 0) {
              await db.insert(authAccounts).values({
                userId: user.id, // Use the restored user's ID
                provider: 'clerk',
                providerAccountId: clerkId,
                providerUserId: clerkId,
                email: email || null,
                isActive: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            }

            // Ensure base_user role exists
            const existingRoles = await db
              .select()
              .from(userRoles)
              .where(eq(userRoles.userId, user.id))
              .limit(1);

            if (existingRoles.length === 0) {
              await db.insert(userRoles).values({
                userId: user.id,
                role: 'base_user',
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            }

            console.log(`✅ Soft-deleted user restored: ${user.id} (linked to Clerk ID: ${clerkId})`);
            return NextResponse.json(
              { message: 'User restored successfully', userId: user.id },
              { status: 200 }
            );
          }
        }
        throw dbError; // Re-throw to be caught by outer try-catch
      }
    }

    if (eventType === 'user.updated') {
      const { id: clerkId, email_addresses, username, external_accounts } = evt.data;

      const existingAuthAccount = await db
        .select({ userId: authAccounts.userId })
        .from(authAccounts)
        .where(
          and(
            eq(authAccounts.provider, 'clerk'),
            eq(authAccounts.providerAccountId, clerkId)
          )
        )
        .limit(1);

      if (existingAuthAccount.length === 0) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      const userId = existingAuthAccount[0].userId;
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (existingUser.length === 0) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      const primaryEmail = email_addresses?.find((email) => email.id === evt.data.primary_email_address_id);
      const email = primaryEmail?.email_address || email_addresses?.[0]?.email_address;

      // Extract Twitter ID from external_accounts if user signed in with Twitter/X (Clerk can send 'oauth_twitter', 'twitter', or 'x')
      const twitterAccount = external_accounts?.find(
        (account) =>
          account.provider === 'oauth_twitter' || account.provider === 'twitter' || account.provider === 'x'
      );
      const twitterId = twitterAccount?.provider_user_id || existingUser[0].twitterId || null;

      await db
        .update(users)
        .set({
          email: email || existingUser[0].email,
          twitterId: twitterId,
          username: username || existingUser[0].username,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));

      return NextResponse.json(
        { message: 'User updated successfully', userId },
        { status: 200 }
      );
    }

    if (eventType === 'user.deleted') {
      const { id: clerkId } = evt.data;

      // Find user via authAccounts
      const existingAuthAccount = await db
        .select({ userId: authAccounts.userId })
        .from(authAccounts)
        .where(
          and(
            eq(authAccounts.provider, 'clerk'),
            eq(authAccounts.providerAccountId, clerkId)
          )
        )
        .limit(1);

      if (existingAuthAccount.length === 0) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 200 }
        );
      }

      const userId = existingAuthAccount[0].userId;

      await db
        .update(users)
        .set({
          deletedAt: new Date(),
          isActive: 0,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));

      return NextResponse.json(
        { message: 'User deleted successfully', userId },
        { status: 200 }
      );
    }

    console.log(`ℹ️  Unhandled event type: ${eventType}`);
    return NextResponse.json(
      { message: 'Webhook received', eventType },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    if (error instanceof Error) {
      console.error('   Error message:', error.message);
      console.error('   Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

