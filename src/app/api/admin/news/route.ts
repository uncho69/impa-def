import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { db, hasDatabase } from '@/lib/db';
import { news } from '@/lib/db/schema';
import { eq, and, desc, sql, count } from 'drizzle-orm';
import { createNews } from '@/lib/news';
import { FALLBACK_NEWS } from '@/lib/news-fallback';
import { isAdminEmail } from '@/lib/admin-emails';

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

async function checkAdmin() {
  try {
    const hasValidClerkKeys = Boolean(
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY &&
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_') &&
      process.env.CLERK_SECRET_KEY.startsWith('sk_')
    );
    if (!hasValidClerkKeys && process.env.NODE_ENV !== 'production') {
      return true;
    }

    const { userId } = await auth();
    
    if (!userId) {
      return false;
    }
    
    // Get user details including email
    const user = await currentUser();
    if (!user) {
      return false;
    }
    
    const userEmail = user.emailAddresses?.[0]?.emailAddress;
    if (!userEmail) {
      return false;
    }

    return isAdminEmail(userEmail);
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

    if (!hasDatabase || !db) {
      const base = FALLBACK_NEWS
        .filter((item) => (status ? item.status === status : true))
        .filter((item) => (category ? item.category === category : true));
      const paginated = base.slice((page - 1) * limit, page * limit);
      return NextResponse.json({
        news: paginated,
        pagination: {
          page,
          limit,
          total: base.length,
          pages: Math.ceil(base.length / limit),
        },
      });
    }

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

    // Parse tags from JSON string to array and convert featured to boolean
    const parsedNews = allNews.map(item => ({
      ...item,
      tags: parseTags(item.tags),
      featured: Boolean(item.featured),
    }));

    // Count total
    let countQuery = db.select({ count: count() }).from(news);
    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions));
    }
    const totalResult = await countQuery;
    const total = totalResult[0]?.count || 0;

    return NextResponse.json({
      news: parsedNews,
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
