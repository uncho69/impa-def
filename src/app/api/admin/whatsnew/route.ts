import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { whatsNewCard } from '@/lib/db/schema';
import { asc, desc } from 'drizzle-orm';

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

    const cards = await db
      .select()
      .from(whatsNewCard)
      .orderBy(asc(whatsNewCard.order), desc(whatsNewCard.createdAt));

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

    const id = crypto.randomUUID();
    const card = await db
      .insert(whatsNewCard)
      .values({
        id,
        title,
        description,
        category: category || 'feature',
        imageUrl: imageUrl || null,
        link: link || null,
        isActive: isActive !== undefined ? (isActive ? 1 : 0) : 1,
        showInLanding: showInLanding !== undefined ? (showInLanding ? 1 : 0) : 0,
        order: order || 0,
      })
      .returning();

    return NextResponse.json(card[0], { status: 201 });
  } catch (error) {
    console.error('Errore nella creazione card novità:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
