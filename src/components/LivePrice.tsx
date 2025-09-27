'use client';

import { useState, useEffect } from 'react';

interface LivePriceProps {
  slug: string;
  name: string;
}

interface PriceData {
  price: number;
  volume_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export function LivePrice({ slug, name }: LivePriceProps) {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Usa l'API Snowflake esistente
        const response = await fetch(`/api/coin/${slug}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch price data');
        }
        
        const data = await response.json();
        
        if (data && data.price) {
          setPriceData({
            price: data.price,
            volume_24h: data.volume_24h || 0,
            price_change_percentage_24h: data.price_change_percentage_24h || 0,
            market_cap: data.market_cap || 0,
          });
        }
      } catch (err) {
        setError('Errore nel caricamento dei dati');
        console.error('Error fetching price data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();
    
    // Aggiorna i dati ogni 30 secondi
    const interval = setInterval(fetchPriceData, 30000);
    
    return () => clearInterval(interval);
  }, [slug]);

  const formatNumber = (num: number) => {
    if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(1)}B`;
    } else if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(1)}M`;
    } else if (num >= 1e3) {
      return `$${(num / 1e3).toFixed(1)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    } else if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 w-64">
        <div className="text-sm text-gray-500 mb-2">PREZZO LIVE</div>
        <div className="text-lg font-bold text-gray-400">Caricamento...</div>
      </div>
    );
  }

  if (error || !priceData) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 w-64">
        <div className="text-sm text-gray-500 mb-2">PREZZO LIVE</div>
        <div className="text-lg font-bold text-gray-400">Dati non disponibili</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg p-4 w-64">
      <div className="text-sm text-gray-500 mb-2">PREZZO LIVE</div>
      <div className="text-2xl font-bold text-gray-900 mb-1">
        {formatPrice(priceData.price)}
        <span className="text-sm font-normal text-gray-600 ml-1">{name.toUpperCase()}</span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className={`flex items-center gap-1 ${priceData.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <span className="text-sm">
            {priceData.price_change_percentage_24h >= 0 ? '↗' : '↘'}
          </span>
          <span className="text-sm font-medium">
            {priceData.price_change_percentage_24h >= 0 ? '+' : ''}{priceData.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
        <span className="text-xs text-gray-500">24h</span>
      </div>
      <div className="space-y-1 text-xs text-gray-600">
        <div>Volume 24h {formatNumber(priceData.volume_24h)}</div>
        <div>Market Cap {formatNumber(priceData.market_cap)}</div>
      </div>
    </div>
  );
}
