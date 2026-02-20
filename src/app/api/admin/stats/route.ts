import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { news } from '@/lib/db/schema';
import { eq, sql, count } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

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

export async function GET() {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Non autorizzato' },
        { status: 401 }
      );
    }
    
    // Statistiche totali
    const totalResult = await db.select({ count: count() }).from(news);
    const total = totalResult[0]?.count || 0;
    
    const publishedResult = await db
      .select({ count: count() })
      .from(news)
      .where(eq(news.status, 'PUBLISHED'));
    const published = publishedResult[0]?.count || 0;
    
    const draftsResult = await db
      .select({ count: count() })
      .from(news)
      .where(eq(news.status, 'DRAFT'));
    const drafts = draftsResult[0]?.count || 0;
    
    // Somma delle visualizzazioni
    const viewsResult = await db
      .select({ totalViews: sql<number>`COALESCE(SUM(${news.views}), 0)` })
      .from(news);
    const views = Number(viewsResult[0]?.totalViews || 0);

    // Articoli per categoria
    const categoryCounts = await db
      .select({
        category: news.category,
        count: count(),
      })
      .from(news)
      .groupBy(news.category);

    const byCategory: { [key: string]: number } = {};
    categoryCounts.forEach((item) => {
      byCategory[item.category] = item.count;
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
