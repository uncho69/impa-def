import { db } from '@/lib/db';
import { news } from '@/lib/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';

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
  return await db
    .select()
    .from(news)
    .orderBy(desc(news.createdAt));
}

export async function getPublishedNews() {
  return await db
    .select()
    .from(news)
    .where(eq(news.status, 'PUBLISHED'))
    .orderBy(desc(news.publishedAt));
}

export async function getNewsByCategory(category: string) {
  return await db
    .select()
    .from(news)
    .where(
      and(
        eq(news.category, category.toUpperCase()),
        eq(news.status, 'PUBLISHED')
      )
    )
    .orderBy(desc(news.publishedAt));
}

export async function getFeaturedNews() {
  return await db
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
}

export async function getNewsById(id: string) {
  const result = await db
    .select()
    .from(news)
    .where(eq(news.id, id))
    .limit(1);
  
  return result[0] || null;
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
  
  return result[0];
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
  
  return result[0] || null;
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

export const NEWS_CATEGORIES = [
  { value: 'GENERAL', label: 'General' },
  { value: 'DEFI', label: 'DeFi' },
  { value: 'AIRDROPS', label: 'Hot Airdrops' },
  { value: 'CRYPTO_AI', label: 'Crypto AI' },
  { value: 'STABLECOINS', label: 'Stablecoins' },
  { value: 'REGOLAMENTAZIONI', label: 'Regolamentazioni' },
  { value: 'GAMING', label: 'Gaming' },
  { value: 'MEMECOINS', label: 'Memecoins' }
];

export const NEWS_STATUSES = [
  { value: 'DRAFT', label: 'Bozza' },
  { value: 'PUBLISHED', label: 'Pubblicato' },
  { value: 'ARCHIVED', label: 'Archiviato' }
];

export function getCategoryLabel(category: string) {
  return NEWS_CATEGORIES.find(c => c.value === category)?.label || category;
}

export function getStatusLabel(status: string) {
  return NEWS_STATUSES.find(s => s.value === status)?.label || status;
}
