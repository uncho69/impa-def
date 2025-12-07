import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { news } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { updateNews, getNewsById, deleteNews } from '@/lib/news';

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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      );
    }

    const newsItem = await getNewsById(params.id);

    if (!newsItem) {
      return NextResponse.json(
        { error: 'Articolo non trovato' },
        { status: 404 }
      );
    }

    return NextResponse.json(newsItem);
  } catch (error: any) {
    console.error('Errore nel recupero articolo:', error);
    return NextResponse.json(
      { error: error?.message || 'Errore interno del server' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.summary !== undefined) updateData.summary = data.summary;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.author !== undefined) updateData.author = data.author;
    if (data.authorEmail !== undefined) updateData.authorEmail = data.authorEmail;
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.featured !== undefined) updateData.featured = Boolean(data.featured); // Convert to boolean, updateNews will convert to 0/1
    if (data.status !== undefined) updateData.status = data.status;
    if (data.readTime !== undefined) updateData.readTime = data.readTime;
    if (data.tags !== undefined) updateData.tags = data.tags;

    // Se l'articolo viene pubblicato per la prima volta
    if (data.status === 'PUBLISHED') {
      const existing = await getNewsById(params.id);
      
      if (existing && existing.status !== 'PUBLISHED') {
        updateData.publishedAt = new Date();
      }
    }

    const newsItem = await updateNews(params.id, updateData);

    if (!newsItem) {
      return NextResponse.json(
        { error: 'Articolo non trovato' },
        { status: 404 }
      );
    }

    return NextResponse.json(newsItem);
  } catch (error: any) {
    console.error('Errore nell\'aggiornamento articolo:', error);
    return NextResponse.json(
      { error: error?.message || 'Errore interno del server' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      );
    }

    await deleteNews(params.id);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Errore nell\'eliminazione articolo:', error);
    return NextResponse.json(
      { error: error?.message || 'Errore interno del server' },
      { status: 500 }
    );
  }
}
