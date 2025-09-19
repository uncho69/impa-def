"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
// import { SimpleCard } from '@/components/SimpleCard'; // Non più necessario

interface NewsStats {
  total: number;
  published: number;
  drafts: number;
  views: number;
  byCategory: { [key: string]: number };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<NewsStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Errore nel caricamento statistiche:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Caricamento statistiche...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Panoramica del sistema di gestione news</p>
        </div>
        <Link
          href="/admin/news/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          ➕ Nuovo Articolo
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <span className="text-2xl">📰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Totale Articoli</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.total || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pubblicati</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.published || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <span className="text-2xl">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Bozze</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.drafts || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <span className="text-2xl">👀</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Visualizzazioni</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.views || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Actions */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Azioni Rapide</h2>
          <div className="space-y-3">
            <Link
              href="/admin/news/new"
              className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <span className="text-lg mr-3">➕</span>
                <div>
                  <p className="font-medium text-gray-900">Crea Nuovo Articolo</p>
                  <p className="text-sm text-gray-600">Scrivi e pubblica una nuova news</p>
                </div>
              </div>
            </Link>
            
            <Link
              href="/admin/news?status=draft"
              className="block p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <span className="text-lg mr-3">📝</span>
                <div>
                  <p className="font-medium text-gray-900">Gestisci Bozze</p>
                  <p className="text-sm text-gray-600">Completa e pubblica le bozze</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/news"
              className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <span className="text-lg mr-3">📋</span>
                <div>
                  <p className="font-medium text-gray-900">Tutti gli Articoli</p>
                  <p className="text-sm text-gray-600">Visualizza e modifica tutti gli articoli</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Stats by Category */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Articoli per Categoria</h2>
          <div className="space-y-3">
            {stats?.byCategory && Object.entries(stats.byCategory).map(([category, count]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-gray-700 capitalize">{category.toLowerCase()}</span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm font-medium">
                  {count}
                </span>
              </div>
            ))}
            {(!stats?.byCategory || Object.keys(stats.byCategory).length === 0) && (
              <p className="text-gray-500 text-center py-4">Nessun articolo ancora creato</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
