import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

async function checkAdmin() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Non autenticato');
  }
  
  return true;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await checkAdmin();
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
  } catch (error) {
    console.error('Errore nel recupero articolo:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await checkAdmin();
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
  } catch (error) {
    console.error('Errore nell\'aggiornamento articolo:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await checkAdmin();
    await prisma.news.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Errore nell\'eliminazione articolo:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
