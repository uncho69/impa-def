"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { NEWS_CATEGORIES } from '@/lib/news';

export default function NewNewsPage() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'GENERAL',
    imageUrl: '',
    featured: false,
    status: 'DRAFT',
    readTime: '5 min',
    tags: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          author: user.firstName || user.emailAddresses[0]?.emailAddress || 'Admin',
          authorEmail: user.emailAddresses[0]?.emailAddress || '',
          tags: tagsArray
        })
      });

      if (response.ok) {
        router.push('/admin/news');
      } else {
        alert('Errore nella creazione dell\'articolo');
      }
    } catch (error) {
      console.error('Errore:', error);
      alert('Errore nella creazione dell\'articolo');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nuovo Articolo</h1>
        <p className="text-gray-600 mt-2">Crea un nuovo articolo per il sito</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informazioni Base */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Informazioni Base</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titolo *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Inserisci il titolo dell'articolo"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Riassunto *
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                required
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Breve riassunto dell'articolo (apparirà nelle anteprime)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {NEWS_CATEGORIES.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempo di Lettura
              </label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="es. 5 min"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Immagine
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://esempio.com/immagine.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tag (separate da virgola)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Bitcoin, DeFi, Trading"
              />
            </div>
          </div>
        </div>

        {/* Contenuto */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contenuto</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenuto Articolo *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={20}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="Scrivi qui il contenuto dell'articolo. Puoi usare Markdown per la formattazione."
            />
            <p className="text-sm text-gray-500 mt-2">
              💡 Puoi usare Markdown per formattare il testo (# per titoli, **grassetto**, *corsivo*, etc.)
            </p>
          </div>
        </div>

        {/* Opzioni */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Opzioni</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stato
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="DRAFT">Bozza</option>
                <option value="PUBLISHED">Pubblicato</option>
              </select>
            </div>

            <div className="flex items-center space-x-3 pt-8">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                ⭐ Articolo in evidenza
              </label>
            </div>
          </div>
        </div>

        {/* Azioni */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annulla
          </button>
          
          <div className="space-x-3">
            <button
              type="submit"
              disabled={loading}
              onClick={() => setFormData(prev => ({ ...prev, status: 'DRAFT' }))}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Salvando...' : 'Salva Bozza'}
            </button>
            <button
              type="submit"
              disabled={loading}
              onClick={() => setFormData(prev => ({ ...prev, status: 'PUBLISHED' }))}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Pubblicando...' : 'Pubblica'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
