"use client";

import Link from "next/link";
import Image from "next/image";
// import { PageLayout } from "@/components/PageLayout"; // Non più necessario
import { BackToHome } from "@/components/BackToHome";
import { useState, useEffect } from "react";
import imparoLogo from "@/assets/imparodefi-logo-nobg.webp";
import ExpandableNewsCard from "@/components/ExpandableNewsCard";

export default function StablecoinsNewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carica articoli Stablecoins dal database
    fetch('/api/news?category=STABLECOINS&limit=20')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Errore caricamento articoli Stablecoins:', err);
        setLoading(false);
      });
  }, []);

  return (
    
      <div className="bg-gradient-to-br from-emerald-50 via-white to-green-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {/* Back button */}
          <div className="mb-6">
            <BackToHome href="/news" label="Torna alle News" />
          </div>

          {/* Header categoria */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Stablecoins News</h1>
            <p className="text-gray-600">USDC, USDT, PYUSD e il futuro dei pagamenti</p>
          </div>

          {/* Lista articoli */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Loading skeleton */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 animate-pulse">
                  <div className="h-4 bg-gray-300 rounded mb-3"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article: any) => (
                <ExpandableNewsCard
                  key={article.id}
                  article={article}
                  categoryConfig={{
                    name: 'Stablecoins',
                    color: 'text-emerald-800',
                    bgColor: 'bg-emerald-100',
                    buttonColor: 'bg-emerald-600 hover:bg-emerald-700'
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Image 
                  src={imparoLogo} 
                  alt="Stablecoins"
                  width={32}
                  height={32}
                  className="w-8 h-8 opacity-50"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nessun articolo Stablecoins</h3>
              <p className="text-gray-600 mb-6">
                Non ci sono ancora articoli pubblicati nella categoria Stablecoins.
              </p>
              <Link 
                href="/news" 
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Torna alle News
              </Link>
            </div>
          )}
        </div>
      </div>
    
  );
}