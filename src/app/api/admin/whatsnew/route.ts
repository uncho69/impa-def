import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

// Lista degli admin autorizzati
const ADMIN_EMAILS = [
  "jeffben69zos@gmail.com",
  "admin@imparodefi.com", 
  "cofounder@imparodefi.com",
  "lordbaconf@gmail.com"
];

async function checkAdmin() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Errore auth:', error);
    return false;
  }
}

// GET - Recupera tutte le card delle novità
export async function GET() {
  try {
    const isAdmin = await checkAdmin();
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const cards = await prisma.whatsNewCard.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json(cards);
  } catch (error) {
    console.error('Errore nel recupero card novità:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

// POST - Crea una nuova card
export async function POST(request: Request) {
  try {
    const isAdmin = await checkAdmin();
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, category, imageUrl, link, isActive, showInLanding, order } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Titolo e descrizione sono obbligatori' }, { status: 400 });
    }

    const card = await prisma.whatsNewCard.create({
      data: {
        title,
        description,
        category: category || 'feature',
        imageUrl: null,
        link: link || null,
        isActive: isActive !== undefined ? isActive : true,
        showInLanding: showInLanding !== undefined ? showInLanding : false,
        order: order || 0
      }
    });

    return NextResponse.json(card, { status: 201 });
  } catch (error) {
    console.error('Errore nella creazione card novità:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
