"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface WhatsNewCard {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  link?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function CosaCeDiNuovoPage() {
  const [cards, setCards] = useState<WhatsNewCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/api/whatsnew');
        if (response.ok) {
          const data = await response.json();
          setCards(data);
        }
      } catch (error) {
        console.error('Errore nel caricamento delle card:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
        {/* What's New Cards */}
        <section className="py-16">
          <div className="container-custom">
            {/* Title */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-primary-600 mb-4">Cosa c'è di nuovo su ImparoDeFi?</h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Scoprilo qui!
              </p>
            </div>
            {cards.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Nessuna novità al momento</h3>
                <p className="text-gray-600">Torna presto per scoprire le ultime novità su ImparoDeFi!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {cards.map((card) => (
                  <div key={card.id} className="bg-white rounded-lg shadow-md border border-gray-200 group hover:shadow-2xl transition-all duration-300">
                    <div className="p-8">
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                          {card.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(card.createdAt).toLocaleDateString('it-IT')}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {card.description}
                      </p>

                      {/* Image */}
                      {card.imageUrl && (
                        <div className="mb-6 rounded-xl overflow-hidden">
                          <Image
                            src={card.imageUrl}
                            alt={card.title}
                            width={400}
                            height={200}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      {/* Actions */}
                      {card.link && (
                        <div className="flex items-center justify-between">
                          <Link
                            href={card.link}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
                          >
                            <span>Esplora</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                          </Link>
                          
                          <Link
                            href={card.link}
                            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Vai alla sezione</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
    </div>
  );
}
