import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { whatsNewCard } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

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
    
    // Get user details including email
    const user = await currentUser();
    if (!user) {
      return false;
    }
    
    // Check if user's email is in the admin list
    const userEmail = user.emailAddresses?.[0]?.emailAddress;
    if (!userEmail) {
      return false;
    }
    
    return ADMIN_EMAILS.includes(userEmail.toLowerCase());
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

    const result = await db
      .select()
      .from(whatsNewCard)
      .where(eq(whatsNewCard.id, params.id))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json({ error: 'Card non trovata' }, { status: 404 });
    }

    // Convert smallint to boolean for isActive and showInLanding
    const parsedCard = {
      ...result[0],
      isActive: Boolean(result[0].isActive),
      showInLanding: Boolean(result[0].showInLanding),
    };

    return NextResponse.json(parsedCard);
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

    const updateData: any = {
      title,
      description,
      category: category || 'feature',
      imageUrl: imageUrl || null,
      link: link || null,
      isActive: isActive !== undefined ? (isActive ? 1 : 0) : 1,
      showInLanding: showInLanding !== undefined ? (showInLanding ? 1 : 0) : 0,
      order: order || 0,
      updatedAt: new Date(),
    };

    const result = await db
      .update(whatsNewCard)
      .set(updateData)
      .where(eq(whatsNewCard.id, params.id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: 'Card non trovata' }, { status: 404 });
    }

    // Convert smallint to boolean for isActive and showInLanding
    const parsedCard = {
      ...result[0],
      isActive: Boolean(result[0].isActive),
      showInLanding: Boolean(result[0].showInLanding),
    };

    return NextResponse.json(parsedCard);
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

    await db
      .delete(whatsNewCard)
      .where(eq(whatsNewCard.id, params.id));

    return NextResponse.json({ message: 'Card eliminata con successo' });
  } catch (error) {
    console.error('Errore nell\'eliminazione card novità:', error);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
