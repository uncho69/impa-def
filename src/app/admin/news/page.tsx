"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NEWS_CATEGORIES, NEWS_STATUSES, getCategoryLabel, getStatusLabel } from '@/lib/news-constants';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  status: string;
  views: number;
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminNewsList() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: '',
    category: '',
    page: 1
  });

  useEffect(() => {
    fetchNews();
  }, [filter]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.status) params.append('status', filter.status);
      if (filter.category) params.append('category', filter.category);
      params.append('page', filter.page.toString());
      params.append('limit', '20');

      const response = await fetch(`/api/admin/news?${params}`);
      const data = await response.json();
      setNews(data.news || []);
    } catch (error) {
      console.error('Errore nel caricamento news:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo articolo?')) return;

    try {
      await fetch(`/api/admin/news/${id}`, { method: 'DELETE' });
      fetchNews(); // Ricarica la lista
    } catch (error) {
      console.error('Errore nell\'eliminazione:', error);
      alert('Errore nell\'eliminazione dell\'articolo');
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      DRAFT: 'bg-yellow-100 text-yellow-800',
      PUBLISHED: 'bg-green-100 text-green-800',
      ARCHIVED: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestione News</h1>
          <p className="text-gray-600 mt-2">Gestisci tutti gli articoli del sito</p>
        </div>
        <Link
          href="/admin/news/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          ➕ Nuovo Articolo
        </Link>
      </div>

      {/* Filtri */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stato
            </label>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value, page: 1 })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tutti gli stati</option>
              {NEWS_STATUSES.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value, page: 1 })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tutte le categorie</option>
              {NEWS_CATEGORIES.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilter({ status: '', category: '', page: 1 })}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Azzera Filtri
            </button>
          </div>
        </div>
      </div>

      {/* Lista News */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento articoli...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {news.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg">Nessun articolo trovato</p>
              <Link
                href="/admin/news/new"
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Crea il primo articolo
              </Link>
            </div>
          ) : (
            news.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {article.title}
                      </h3>
                      {article.featured && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                          ⭐ In Evidenza
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {article.summary}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(article.status)}`}>
                        {getStatusLabel(article.status)}
                      </span>
                      <span>
                        📂 {getCategoryLabel(article.category)}
                      </span>
                      <span>
                        👤 {article.author}
                      </span>
                      <span>
                        👀 {article.views} visualizzazioni
                      </span>
                      <span>
                        📅 {new Date(article.createdAt).toLocaleDateString('it-IT')}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Link
                      href={`/admin/news/${article.id}`}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                    >
                      ✏️ Modifica
                    </Link>
                    <button
                      onClick={() => deleteNews(article.id)}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                    >
                      🗑️ Elimina
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
