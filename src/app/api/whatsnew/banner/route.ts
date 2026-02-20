import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { whatsNewCard } from '@/lib/db/schema';
import { eq, and, asc, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

// GET - Recupera solo le card per il banner (showInLanding: true)
export async function GET() {
  try {
    const cards = await db
      .select()
      .from(whatsNewCard)
      .where(
        and(
          eq(whatsNewCard.isActive, 1),
          eq(whatsNewCard.showInLanding, 1)
        )
      )
      .orderBy(asc(whatsNewCard.order), desc(whatsNewCard.createdAt));

    // Convert smallint to boolean for isActive and showInLanding
    const parsedCards = cards.map(card => ({
      ...card,
      isActive: Boolean(card.isActive),
      showInLanding: Boolean(card.showInLanding),
    }));

    return NextResponse.json(parsedCards);
  } catch (error) {
    console.error('Errore nel recupero card banner:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
