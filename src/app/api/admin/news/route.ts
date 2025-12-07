import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { news } from '@/lib/db/schema';
import { eq, and, desc, sql, count } from 'drizzle-orm';
import { createNews } from '@/lib/news';

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

export async function GET(request: Request) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let query = db.select().from(news);
    const conditions = [];
    
    if (status) {
      conditions.push(eq(news.status, status));
    }
    if (category) {
      conditions.push(eq(news.category, category));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const allNews = await query
      .orderBy(desc(news.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    // Count total
    let countQuery = db.select({ count: count() }).from(news);
    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions));
    }
    const totalResult = await countQuery;
    const total = totalResult[0]?.count || 0;

    return NextResponse.json({
      news: allNews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Errore nel recupero news:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      );
    }
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'summary', 'content', 'category', 'author', 'authorEmail', 'readTime'];
    const missingFields = requiredFields.filter(field => !data[field] || (typeof data[field] === 'string' && data[field].trim() === ''));
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Campi obbligatori mancanti: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    const newsItem = await createNews({
      title: data.title,
      summary: data.summary,
      content: data.content,
      category: data.category,
      author: data.author,
      authorEmail: data.authorEmail,
      imageUrl: data.imageUrl,
      featured: data.featured || false,
      status: data.status || 'DRAFT',
      readTime: data.readTime,
      tags: data.tags || [],
    });

    return NextResponse.json(newsItem);
  } catch (error) {
    console.error('Errore nella creazione news:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
