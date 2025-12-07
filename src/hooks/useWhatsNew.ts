"use client";

import { useState, useEffect } from "react";

export interface WhatsNewItem {
  id: string;
  title: string;
  description: string;
  category: 'feature' | 'fix' | 'improvement' | 'announcement';
  date: string;
  imageUrl?: string;
  link?: string;
  isNew?: boolean;
}

export function useWhatsNew() {
  const [items, setItems] = useState<WhatsNewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dati mock per le novità - in futuro potrebbero venire da un API
  const mockData: WhatsNewItem[] = [
    {
      id: '1',
      title: '🚀 Nuova Sezione Airdrops',
      description: 'Scopri le migliori opportunità di airdrop del momento con la nostra sezione dedicata. Aggiornamenti quotidiani e analisi approfondite.',
      category: 'feature',
      date: '2024-01-15',
      imageUrl: '/analizing.png',
      link: '/airdrops',
      isNew: true
    },
    {
      id: '2',
      title: '💳 Sezione Exchange Aggiornata',
      description: 'Nuove carte di credito crypto e exchange aggiunti. Confronta le migliori opzioni per comprare e vendere crypto.',
      category: 'feature',
      date: '2024-01-10',
      imageUrl: '/binancecard.png',
      link: '/compraevendicrypto',
      isNew: true
    },
    {
      id: '3',
      title: '🎮 Sezione Giochi Web3',
      description: 'Esplora il mondo dei giochi blockchain e Play-to-Earn. Scopri i migliori giochi Web3 del momento.',
      category: 'feature',
      date: '2024-01-08',
      imageUrl: '/analizing2.png',
      link: '/giochi',
      isNew: false
    },
    {
      id: '4',
      title: '🔧 Miglioramenti Performance',
      description: 'Ottimizzazioni del sito per caricamenti più veloci e migliore esperienza utente.',
      category: 'improvement',
      date: '2024-01-05',
      isNew: false
    },
    {
      id: '5',
      title: '📱 Design Mobile Migliorato',
      description: 'Interfaccia mobile completamente rinnovata per una migliore navigazione su smartphone e tablet.',
      category: 'improvement',
      date: '2024-01-03',
      isNew: false
    },
    {
      id: '6',
      title: '🛡️ Sicurezza Rafforzata',
      description: 'Nuove misure di sicurezza implementate per proteggere meglio i dati degli utenti.',
      category: 'fix',
      date: '2024-01-01',
      isNew: false
    }
  ];

  useEffect(() => {
    // Simula caricamento dati
    const loadData = async () => {
      setIsLoading(true);
      
      // Simula delay di caricamento
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setItems(mockData);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const getItemsByCategory = (category: WhatsNewItem['category']) => {
    return items.filter(item => item.category === category);
  };

  const getNewItems = () => {
    return items.filter(item => item.isNew);
  };

  const getRecentItems = (days: number = 7) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return items.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  };

  const getCategoryIcon = (category: WhatsNewItem['category']) => {
    switch (category) {
      case 'feature':
        return '🚀';
      case 'fix':
        return '🔧';
      case 'improvement':
        return '✨';
      case 'announcement':
        return '📢';
      default:
        return '📝';
    }
  };

  const getCategoryColor = (category: WhatsNewItem['category']) => {
    switch (category) {
      case 'feature':
        return 'from-blue-500 to-blue-600';
      case 'fix':
        return 'from-green-500 to-green-600';
      case 'improvement':
        return 'from-purple-500 to-purple-600';
      case 'announcement':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return {
    items,
    isLoading,
    getItemsByCategory,
    getNewItems,
    getRecentItems,
    getCategoryIcon,
    getCategoryColor
  };
}
