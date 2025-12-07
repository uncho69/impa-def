import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { news } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');

    const conditions = [eq(news.status, 'PUBLISHED')];
    
    if (category) {
      conditions.push(eq(news.category, category.toUpperCase()));
    }
    
    if (featured === 'true') {
      conditions.push(eq(news.featured, 1));
    }

    const newsItems = await db
      .select()
      .from(news)
      .where(and(...conditions))
      .orderBy(desc(news.publishedAt))
      .limit(limit);

    return NextResponse.json(newsItems);
  } catch (error) {
    console.error('Errore nel recupero news pubbliche:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
