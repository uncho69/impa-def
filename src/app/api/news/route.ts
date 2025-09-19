import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');

    let where: any = { status: 'PUBLISHED' };
    
    if (category) {
      where.category = category.toUpperCase();
    }
    
    if (featured === 'true') {
      where.featured = true;
    }

    const news = await prisma.news.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: limit
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error('Errore nel recupero news pubbliche:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
