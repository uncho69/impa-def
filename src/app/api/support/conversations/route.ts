import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { supportConversations, supportMessages } from '@/lib/db/schema';
import { and, desc, eq, asc, or } from 'drizzle-orm';
import { getUserIdFromRequest } from '@/lib/auth/middleware';

export const dynamic = 'force-dynamic';

const ACTIVE_STATUSES = ['OPEN', 'IN_PROGRESS'] as const;

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Recupera l'eventuale conversazione attiva per l'utente
    const rows = await db
      .select()
      .from(supportConversations)
      .where(
        and(
          eq(supportConversations.userId, userId),
          or(
            eq(supportConversations.status, 'OPEN'),
            eq(supportConversations.status, 'IN_PROGRESS')
          )
        )
      )
      .orderBy(desc(supportConversations.lastMessageAt), desc(supportConversations.createdAt))
      .limit(1);

    const conversation = rows[0] ?? null;

    if (!conversation) {
      return NextResponse.json(
        {
          conversation: null,
          messages: [],
        },
        { status: 200 }
      );
    }

    const messages = await db
      .select()
      .from(supportMessages)
      .where(eq(supportMessages.conversationId, conversation.id))
      .orderBy(asc(supportMessages.createdAt))
      .limit(200);

    return NextResponse.json(
      {
        conversation,
        messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching support conversation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const reason = body?.reason as string | undefined;
    const message = body?.message as string | undefined;

    if (!reason || !message || !reason.trim() || !message.trim()) {
      return NextResponse.json(
        { error: 'Motivo e messaggio sono obbligatori' },
        { status: 400 }
      );
    }

    // Se esiste già una conversazione attiva, riusala
    const existingRows = await db
      .select()
      .from(supportConversations)
      .where(
        and(
          eq(supportConversations.userId, userId),
          or(
            eq(supportConversations.status, 'OPEN'),
            eq(supportConversations.status, 'IN_PROGRESS')
          )
        )
      )
      .orderBy(desc(supportConversations.lastMessageAt), desc(supportConversations.createdAt))
      .limit(1);

    const now = new Date();
    let conversation = existingRows[0] ?? null;

    if (!conversation) {
      const id = crypto.randomUUID();
      const insertRows = await db
        .insert(supportConversations)
        .values({
          id,
          userId,
          status: 'OPEN',
          reason,
          createdAt: now,
          updatedAt: now,
          lastMessageAt: now,
        })
        .returning();

      conversation = insertRows[0]!;
    } else {
      // Aggiorna i metadati della conversazione esistente
      const updatedRows = await db
        .update(supportConversations)
        .set({
          updatedAt: now,
          lastMessageAt: now,
        })
        .where(eq(supportConversations.id, conversation.id))
        .returning();
      conversation = updatedRows[0]!;
    }

    // Inserisci il primo (o nuovo) messaggio dell'utente
    const messageRows = await db
      .insert(supportMessages)
      .values({
        conversationId: conversation.id,
        senderType: 'USER',
        senderUserId: userId,
        content: message.trim(),
        createdAt: now,
      })
      .returning();

    const insertedMessage = messageRows[0]!;

    return NextResponse.json(
      {
        conversation,
        message: insertedMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating support conversation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

