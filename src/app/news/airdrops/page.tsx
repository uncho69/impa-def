"use client";

import Link from "next/link";
import Image from "next/image";
// import { PageLayout } from "@/components/PageLayout"; // Non più necessario
import { BackToHome } from "@/components/BackToHome";
import { useState, useEffect } from "react";
import imparoLogo from "@/assets/imparodefi-logo-nobg.webp";

export default function AirdropsNewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carica articoli Airdrops dal database
    fetch('/api/news?category=AIRDROPS&limit=20')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Errore caricamento articoli Airdrops:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-violet-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {/* Back button */}
          <div className="mb-6">
            <BackToHome href="/news" label="← Torna alle News" />
          </div>

          {/* Header categoria */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center mx-auto mb-4">
              <Image 
                src={imparoLogo} 
                alt="Hot Airdrops"
                width={32}
                height={32}
                className="w-8 h-8 brightness-0 invert"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hot Airdrops</h1>
            <p className="text-gray-600">I migliori airdrop e opportunità gratuite</p>
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
                <div key={article.id} className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    {/* Header articolo */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Hot Airdrops
                        </span>
                        <span className="text-gray-500 text-xs">{article.readTime}</span>
                      </div>
                      <span className="text-gray-500 text-xs">
                        {new Date(article.publishedAt).toLocaleDateString('it-IT')}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h2>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{article.summary}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags && article.tags.split(',').map((tag: string, index: number) => (
                        <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-xs text-gray-500">
                        di {article.author}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>👀 {article.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Image 
                  src={imparoLogo} 
                  alt="Hot Airdrops"
                  width={32}
                  height={32}
                  className="w-8 h-8 opacity-50"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nessun articolo Airdrops</h3>
              <p className="text-gray-600 mb-6">
                Non ci sono ancora articoli pubblicati nella categoria Hot Airdrops.
              </p>
              <Link 
                href="/news" 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Torna alle News
              </Link>
            </div>
          )}
        </div>
      </div>
  );
}