import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { users, authAccounts, userRoles } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

interface ClerkEmailAddress {
  id: string;
  email_address: string;
}

interface ClerkWebhookData {
  id: string;
  email_addresses?: ClerkEmailAddress[];
  primary_email_address_id?: string;
  username?: string | null;
  first_name?: string | null;
  last_name?: string | null;
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
  try {
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json(
        { error: 'Error occurred -- no svix headers' },
        { status: 400 }
      );
    }

    const payload = await request.text();

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

    if (eventType === 'user.created') {
      const { id: clerkId, email_addresses, username } = evt.data;

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

      const userId = clerkId;

      await db.insert(users).values({
        id: userId,
        email: email || null,
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

      return NextResponse.json(
        { message: 'User created successfully', userId },
        { status: 201 }
      );
    }

    if (eventType === 'user.updated') {
      const { id: clerkId, email_addresses, username } = evt.data;

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

      await db
        .update(users)
        .set({
          email: email || existingUser[0].email,
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

    return NextResponse.json(
      { message: 'Webhook received', eventType },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

