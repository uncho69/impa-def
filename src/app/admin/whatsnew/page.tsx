"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface WhatsNewCard {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  link?: string;
  isActive: boolean;
  showInLanding: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminWhatsNewPage() {
  const [cards, setCards] = useState<WhatsNewCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch('/api/admin/whatsnew');
      if (response.ok) {
        const data = await response.json();
        setCards(data);
      }
    } catch (error) {
      console.error('Errore nel caricamento delle card:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/whatsnew/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (response.ok) {
        setCards(cards.map(card => 
          card.id === id ? { ...card, isActive: !isActive } : card
        ));
      }
    } catch (error) {
      console.error('Errore nell\'aggiornamento:', error);
    }
  };

  const deleteCard = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa card?')) return;

    try {
      const response = await fetch(`/api/admin/whatsnew/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCards(cards.filter(card => card.id !== id));
      }
    } catch (error) {
      console.error('Errore nell\'eliminazione:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Caricamento card...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestisci Cosa c'è di nuovo</h1>
          <p className="text-gray-600 mt-2">Crea e modifica le card delle novità</p>
        </div>
        <Link
          href="/admin/whatsnew/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nuova Card
        </Link>
      </div>

      {/* Cards List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        {cards.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nessuna card creata</h3>
            <p className="text-gray-600 mb-6">Inizia creando la tua prima card delle novità</p>
            <Link
              href="/admin/whatsnew/new"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Crea Prima Card
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {cards.map((card) => (
              <div key={card.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        card.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {card.isActive ? 'Attiva' : 'Inattiva'}
                      </span>
                      {card.showInLanding && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          Landing
                        </span>
                      )}
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {card.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{card.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Ordine: {card.order}</span>
                      <span>Creato: {new Date(card.createdAt).toLocaleDateString('it-IT')}</span>
                      {card.link && (
                        <span className="text-blue-600">Link: {card.link}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => toggleActive(card.id, card.isActive)}
                      className={`p-2 rounded-lg transition-colors ${
                        card.isActive
                          ? 'text-gray-600 hover:bg-gray-100'
                          : 'text-green-600 hover:bg-green-100'
                      }`}
                      title={card.isActive ? 'Disattiva' : 'Attiva'}
                    >
                      {card.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    
                    <Link
                      href={`/admin/whatsnew/${card.id}/edit`}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Modifica"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    
                    <button
                      onClick={() => deleteCard(card.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Elimina"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
