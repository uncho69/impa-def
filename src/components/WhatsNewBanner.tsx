"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles, ArrowRight } from "lucide-react";

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

interface WhatsNewBannerProps {
  className?: string;
}

export function WhatsNewBanner({ className = "" }: WhatsNewBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [card, setCard] = useState<WhatsNewCard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCard();
  }, []);

  const fetchCard = async () => {
    try {
      const response = await fetch('/api/whatsnew/banner');
      if (response.ok) {
        const cards = await response.json();
        if (cards.length > 0) {
          setCard(cards[0]);
          
          // TEMPORANEO: Mostra sempre il banner per debug
          // TODO: Ripristinare controllo localStorage in produzione
          setIsVisible(true);
        }
      }
    } catch (error) {
      console.error('Errore nel caricamento della card:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    
    // Chiusura temporanea - non salva nulla nel localStorage
    // Il banner riapparirà al prossimo visit della landing page
    
    // Dopo l'animazione di chiusura, nascondi il banner
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (loading) return null;
  if (!isVisible || !card) return null;

  return (
    <div className={`fixed top-20 right-4 z-50 max-w-xs ${className} ${isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
      <div className="relative group">
        {/* Glassmorphism Background */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Main Card */}
        <div className="relative bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:scale-105">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 z-10"
            aria-label="Chiudi banner"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          {/* Content */}
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">Cosa c'è di nuovo</h3>
                <p className="text-xs text-gray-600">su ImparoDeFi</p>
              </div>
              <div className="ml-auto">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-white animate-pulse">
                  NEW
                </span>
              </div>
            </div>

                    {/* Preview Text */}
                    <div className="space-y-1">
                      <p className="text-xs text-gray-700 leading-relaxed">
                        <strong>{card.title}</strong> - {card.description.substring(0, 100)}{card.description.length > 100 ? '...' : ''}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(card.createdAt).toLocaleDateString('it-IT')}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href="/cosa-ce-di-nuovo"
                      onClick={() => {
                        // Dismissal definitivo - salva nel localStorage
                        localStorage.setItem('whatsnew-banner-dismissed', 'true');
                      }}
                      className="inline-flex items-center gap-2 w-full justify-center px-3 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 shadow-lg hover:shadow-xl group/btn text-sm"
                    >
                      <span>Scopri di più</span>
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
