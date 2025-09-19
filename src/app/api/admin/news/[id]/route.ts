import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

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

    const news = await prisma.news.findUnique({
      where: { id: params.id }
    });

    if (!news) {
      return NextResponse.json(
        { error: 'Articolo non trovato' },
        { status: 404 }
      );
    }

    return NextResponse.json(news);
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
    
    const updateData: any = {
      title: data.title,
      summary: data.summary,
      content: data.content,
      category: data.category,
      author: data.author,
      authorEmail: data.authorEmail,
      imageUrl: data.imageUrl,
      featured: data.featured,
      status: data.status,
      readTime: data.readTime,
      tags: data.tags || []
    };

    // Se l'articolo viene pubblicato per la prima volta
    if (data.status === 'PUBLISHED') {
      const existing = await prisma.news.findUnique({
        where: { id: params.id }
      });
      
      if (existing?.status !== 'PUBLISHED') {
        updateData.publishedAt = new Date();
      }
    }

    const news = await prisma.news.update({
      where: { id: params.id },
      data: updateData
    });

    return NextResponse.json(news);
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

    await prisma.news.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Errore nell\'eliminazione articolo:', error);
    return NextResponse.json(
      { error: error?.message || 'Errore interno del server' },
      { status: 500 }
    );
  }
}
