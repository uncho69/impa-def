import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Recupera tutte le card attive delle novità
export async function GET() {
  try {
    const cards = await prisma.whatsNewCard.findMany({
      where: {
        isActive: true
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json(cards);
  } catch (error) {
    console.error('Errore nel recupero card novità pubbliche:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
