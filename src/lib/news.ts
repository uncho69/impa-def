import { db } from '@/lib/db';
import { news } from '@/lib/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';

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

export interface NewsData {
  id?: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  authorEmail: string;
  imageUrl?: string;
  featured?: boolean;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  readTime: string;
  tags: string[];
  publishedAt?: Date;
}

export async function getAllNews() {
  const result = await db
    .select()
    .from(news)
    .orderBy(desc(news.createdAt));
  
  // Parse tags from JSON string to array and convert featured to boolean
  return result.map(item => ({
    ...item,
    tags: parseTags(item.tags),
    featured: Boolean(item.featured),
  }));
}

export async function getPublishedNews() {
  const result = await db
    .select()
    .from(news)
    .where(eq(news.status, 'PUBLISHED'))
    .orderBy(desc(news.publishedAt));
  
  // Parse tags from JSON string to array and convert featured to boolean
  return result.map(item => ({
    ...item,
    tags: parseTags(item.tags),
    featured: Boolean(item.featured),
  }));
}

export async function getNewsByCategory(category: string) {
  const result = await db
    .select()
    .from(news)
    .where(
      and(
        eq(news.category, category.toUpperCase()),
        eq(news.status, 'PUBLISHED')
      )
    )
    .orderBy(desc(news.publishedAt));
  
  // Parse tags from JSON string to array and convert featured to boolean
  return result.map(item => ({
    ...item,
    tags: parseTags(item.tags),
    featured: Boolean(item.featured),
  }));
}

export async function getFeaturedNews() {
  const result = await db
    .select()
    .from(news)
    .where(
      and(
        eq(news.featured, 1),
        eq(news.status, 'PUBLISHED')
      )
    )
    .orderBy(desc(news.publishedAt))
    .limit(6);
  
  // Parse tags from JSON string to array and convert featured to boolean
  return result.map(item => ({
    ...item,
    tags: parseTags(item.tags),
    featured: Boolean(item.featured),
  }));
}

export async function getNewsById(id: string) {
  const result = await db
    .select()
    .from(news)
    .where(eq(news.id, id))
    .limit(1);
  
  if (!result[0]) {
    return null;
  }

  // Parse tags from JSON string to array and convert featured to boolean
  return {
    ...result[0],
    tags: parseTags(result[0].tags),
    featured: Boolean(result[0].featured),
  };
}

export async function createNews(data: NewsData) {
  const id = data.id || crypto.randomUUID();
  
  const insertData = {
    id,
    title: data.title,
    summary: data.summary,
    content: data.content,
    category: data.category.toUpperCase(),
    author: data.author,
    authorEmail: data.authorEmail,
    imageUrl: data.imageUrl || null,
    featured: data.featured ? 1 : 0,
    status: data.status || 'DRAFT',
    readTime: data.readTime,
    tags: JSON.stringify(data.tags || []),
    publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
  };

  const result = await db
    .insert(news)
    .values(insertData)
    .returning();
  
  // Parse tags from JSON string to array and convert featured to boolean
  return {
    ...result[0],
    tags: parseTags(result[0].tags),
    featured: Boolean(result[0].featured),
  };
}

export async function updateNews(id: string, data: Partial<NewsData>) {
  const updateData: any = {};
  
  if (data.title !== undefined) updateData.title = data.title;
  if (data.summary !== undefined) updateData.summary = data.summary;
  if (data.content !== undefined) updateData.content = data.content;
  if (data.category !== undefined) updateData.category = data.category.toUpperCase();
  if (data.author !== undefined) updateData.author = data.author;
  if (data.authorEmail !== undefined) updateData.authorEmail = data.authorEmail;
  if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl || null;
  if (data.featured !== undefined) updateData.featured = data.featured ? 1 : 0;
  if (data.status !== undefined) {
    updateData.status = data.status;
    if (data.status === 'PUBLISHED' && !data.publishedAt) {
      updateData.publishedAt = new Date();
    }
  }
  if (data.readTime !== undefined) updateData.readTime = data.readTime;
  if (data.tags !== undefined) updateData.tags = JSON.stringify(data.tags);
  if (data.publishedAt !== undefined) updateData.publishedAt = data.publishedAt;
  
  updateData.updatedAt = new Date();

  const result = await db
    .update(news)
    .set(updateData)
    .where(eq(news.id, id))
    .returning();
  
  if (!result[0]) {
    return null;
  }

  // Parse tags from JSON string to array and convert featured to boolean
  return {
    ...result[0],
    tags: parseTags(result[0].tags),
    featured: Boolean(result[0].featured),
  };
}

export async function deleteNews(id: string) {
  const result = await db
    .delete(news)
    .where(eq(news.id, id))
    .returning();
  
  return result[0] || null;
}

export async function incrementViews(id: string) {
  const result = await db
    .update(news)
    .set({
      views: sql`${news.views} + 1`,
      updatedAt: new Date(),
    })
    .where(eq(news.id, id))
    .returning();
  
  return result[0] || null;
}

export {
  NEWS_CATEGORIES,
  NEWS_STATUSES,
  getCategoryLabel,
  getStatusLabel,
} from '@/lib/news-constants';
