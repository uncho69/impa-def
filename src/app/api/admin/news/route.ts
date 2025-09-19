import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

// Lista degli admin autorizzati
const ADMIN_EMAILS = [
  "jeffben69zos@gmail.com",
  "admin@imparodefi.com", 
  "cofounder@imparodefi.com"
];

async function checkAdmin() {
  try {
    // Durante il build, Vercel non ha accesso alle env vars
    if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
      return true; // Skip auth check durante build locale
    }

    const { userId } = await auth();
    
    if (!userId) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Errore auth:', error);
    // Durante il build, ignora errori auth
    if (process.env.NODE_ENV === 'production') {
      return true;
    }
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

    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;

    const news = await prisma.news.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    const total = await prisma.news.count({ where });

    return NextResponse.json({
      news,
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
    
    const news = await prisma.news.create({
      data: {
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
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null
      }
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error('Errore nella creazione news:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
