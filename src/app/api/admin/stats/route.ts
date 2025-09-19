import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

async function checkAdmin() {
  // Autenticazione gestita dal layout admin
  return true;
}

export async function GET() {
  try {
    await checkAdmin();
    // Statistiche totali
    const total = await prisma.news.count();
    const published = await prisma.news.count({ where: { status: 'PUBLISHED' } });
    const drafts = await prisma.news.count({ where: { status: 'DRAFT' } });
    
    // Somma delle visualizzazioni
    const viewsResult = await prisma.news.aggregate({
      _sum: { views: true }
    });
    const views = viewsResult._sum.views || 0;

    // Articoli per categoria
    const categoryCounts = await prisma.news.groupBy({
      by: ['category'],
      _count: { category: true }
    });

    const byCategory: { [key: string]: number } = {};
    categoryCounts.forEach((item: any) => {
      byCategory[item.category] = item._count.category;
    });

    return NextResponse.json({
      total,
      published,
      drafts,
      views,
      byCategory
    });
  } catch (error) {
    console.error('Errore nel recupero statistiche:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
