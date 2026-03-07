import { NextResponse } from 'next/server';
import { db, hasDatabase } from '@/lib/db';
import { news } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { FALLBACK_NEWS } from '@/lib/news-fallback';

export const dynamic = 'force-dynamic';

// Helper function to safely parse tags from JSON string
function parseTags(tags: string | null | undefined): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  try {
    const parsed = JSON.parse(tags);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!hasDatabase || !db) {
      const filtered = FALLBACK_NEWS
        .filter((item) => (category ? item.category === category.toUpperCase() : true))
        .filter((item) => (featured === 'true' ? item.featured : true))
        .slice(0, limit);
      return NextResponse.json(filtered);
    }

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

    // Parse tags from JSON string to array and convert featured to boolean
    const parsedNews = newsItems.map(item => ({
      ...item,
      tags: parseTags(item.tags),
      featured: Boolean(item.featured),
    }));

    return NextResponse.json(parsedNews);
  } catch (error) {
    console.error('Errore nel recupero news pubbliche:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
