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

// GET - Recupera una card specifica
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await checkAdmin();
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    const card = await prisma.whatsNewCard.findUnique({
      where: { id: params.id }
    });

    if (!card) {
      return NextResponse.json({ error: 'Card non trovata' }, { status: 404 });
    }

    return NextResponse.json(card);
  } catch (error) {
    console.error('Errore nel recupero card novità:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

// PUT - Aggiorna una card
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const card = await prisma.whatsNewCard.update({
      where: { id: params.id },
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

    return NextResponse.json(card);
  } catch (error) {
    console.error('Errore nell\'aggiornamento card novità:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}

// DELETE - Elimina una card
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await checkAdmin();
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    await prisma.whatsNewCard.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Card eliminata con successo' });
  } catch (error) {
    console.error('Errore nell\'eliminazione card novità:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
