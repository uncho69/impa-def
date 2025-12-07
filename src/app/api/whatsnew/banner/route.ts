import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Recupera solo le card per il banner (showInLanding: true)
export async function GET() {
  try {
    const cards = await prisma.whatsNewCard.findMany({
      where: {
        isActive: true,
        showInLanding: true
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json(cards);
  } catch (error) {
    console.error('Errore nel recupero card banner:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
