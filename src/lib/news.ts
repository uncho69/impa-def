import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  return await prisma.news.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function getPublishedNews() {
  return await prisma.news.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' }
  });
}

export async function getNewsByCategory(category: string) {
  return await prisma.news.findMany({
    where: { 
      category: category.toUpperCase() as any,
      status: 'PUBLISHED'
    },
    orderBy: { publishedAt: 'desc' }
  });
}

export async function getFeaturedNews() {
  return await prisma.news.findMany({
    where: { 
      featured: true,
      status: 'PUBLISHED'
    },
    orderBy: { publishedAt: 'desc' },
    take: 6
  });
}

export async function getNewsById(id: string) {
  return await prisma.news.findUnique({
    where: { id }
  });
}

export async function createNews(data: NewsData) {
  return await prisma.news.create({
    data: {
      ...data,
      category: data.category.toUpperCase() as any,
      publishedAt: data.status === 'PUBLISHED' ? new Date() : null
    }
  });
}

export async function updateNews(id: string, data: Partial<NewsData>) {
  const updateData: any = { ...data };
  
  if (data.category) {
    updateData.category = data.category.toUpperCase();
  }
  
  if (data.status === 'PUBLISHED' && !updateData.publishedAt) {
    updateData.publishedAt = new Date();
  }

  return await prisma.news.update({
    where: { id },
    data: updateData
  });
}

export async function deleteNews(id: string) {
  return await prisma.news.delete({
    where: { id }
  });
}

export async function incrementViews(id: string) {
  return await prisma.news.update({
    where: { id },
    data: { views: { increment: 1 } }
  });
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
