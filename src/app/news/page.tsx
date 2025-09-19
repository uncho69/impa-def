"use client";

import Link from "next/link";
import Image from "next/image";
// import { PageLayout } from "@/components/PageLayout"; // Non necessario, usiamo layout custom
import { useState, useEffect } from "react";

// Icone per le categorie (usando assets esistenti)
import bitcoinIcon from "@/assets/bitcoin-icon.svg";
import ethereumIcon from "@/assets/ethereum-icon.svg";
import degenIcon from "@/assets/degen-icon.png";
import imparoLogo from "@/assets/imparodefi-logo-nobg.webp";

export default function NewsPage() {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carica articoli in evidenza dal database
    fetch('/api/news?featured=true&limit=6')
      .then(res => res.json())
      .then(articles => {
        setFeaturedArticles(articles);
        setLoading(false);
      })
      .catch(err => {
        console.error('Errore caricamento articoli:', err);
        setLoading(false);
      });
  }, []);

  const newsCategories = [
    {
      id: "general",
      title: "General",
      description: "Notizie generali dal mondo crypto e Web3",
      icon: imparoLogo,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "defi",
      title: "DeFi",
      description: "Finanza decentralizzata e protocolli innovativi",
      icon: ethereumIcon,
      color: "from-green-500 to-emerald-600"
    },
    {
      id: "airdrops",
      title: "Hot Airdrops",
      description: "I migliori airdrop e opportunità gratuite",
      icon: imparoLogo,
      color: "from-purple-500 to-violet-600"
    },
    {
      id: "crypto-ai",
      title: "Crypto AI",
      description: "Intelligenza artificiale e blockchain unite",
      icon: imparoLogo,
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: "stablecoins",
      title: "Stablecoins",
      description: "USDC, USDT, PYUSD e il futuro dei pagamenti",
      icon: imparoLogo,
      color: "from-emerald-500 to-green-600"
    },
    {
      id: "regolamentazioni",
      title: "Regolamentazioni",
      description: "Normative, MiCA Europa e compliance crypto",
      icon: imparoLogo,
      color: "from-red-500 to-pink-600"
    },
    {
      id: "gaming",
      title: "Gaming",
      description: "GameFi, P2E e l'evoluzione del gaming blockchain",
      icon: imparoLogo,
      color: "from-violet-500 to-purple-600"
    },
    {
      id: "memecoins",
      title: "Memecoins",
      description: "DOGE, SHIB, PEPE e le ultime meme sensation",
      icon: degenIcon,
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
        {/* Header compatto */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight py-2">
              News Crypto & Web3
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Le ultime notizie dal mondo crypto, sempre aggiornate
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Grid delle categorie - più compatto */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {newsCategories.map((category) => (
              <Link 
                key={category.id}
                href={`/news/${category.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden border border-gray-100 h-full">
                  <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mr-3">
                        <Image 
                          src={category.icon} 
                          alt={category.title}
                          width={20}
                          height={20}
                          className="w-5 h-5"
                        />
                      </div>
                      <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        Categoria
                      </span>
                      <div className="text-blue-600 text-xs font-medium group-hover:text-blue-700 flex items-center">
                        Leggi <span className="ml-1">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Sezione articoli in evidenza */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2">
              🔥 <span>Articoli in Evidenza</span>
            </h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Loading skeleton */}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-2xl p-5 animate-pulse">
                    <div className="h-4 bg-gray-300 rounded mb-3"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            ) : featuredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article: any) => {
                  const categoryColors = {
                    'GENERAL': { bg: 'from-blue-50 to-blue-100', badge: 'bg-blue-500', text: 'text-blue-600' },
                    'DEFI': { bg: 'from-green-50 to-green-100', badge: 'bg-green-500', text: 'text-green-600' },
                    'AIRDROPS': { bg: 'from-purple-50 to-purple-100', badge: 'bg-purple-500', text: 'text-purple-600' },
                    'CRYPTO_AI': { bg: 'from-cyan-50 to-cyan-100', badge: 'bg-cyan-500', text: 'text-cyan-600' },
                    'STABLECOINS': { bg: 'from-emerald-50 to-emerald-100', badge: 'bg-emerald-500', text: 'text-emerald-600' },
                    'REGOLAMENTAZIONI': { bg: 'from-red-50 to-red-100', badge: 'bg-red-500', text: 'text-red-600' },
                    'GAMING': { bg: 'from-violet-50 to-violet-100', badge: 'bg-violet-500', text: 'text-violet-600' },
                    'MEMECOINS': { bg: 'from-yellow-50 to-yellow-100', badge: 'bg-yellow-500', text: 'text-yellow-600' }
                  };
                  const colors = categoryColors[article.category as keyof typeof categoryColors] || categoryColors.GENERAL;
                  
                  return (
                    <div key={article.id} className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`${colors.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                          {article.category.replace('_', ' ')}
                        </span>
                        <span className={`${colors.text} text-xs font-medium`}>{article.readTime}</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(article.publishedAt).toLocaleDateString('it-IT')}
                        </span>
                        <Link 
                          href={`/news/${article.category.toLowerCase().replace('_', '-')}`} 
                          className={`${colors.badge} text-white px-3 py-1 rounded-full text-xs font-medium hover:opacity-80 transition-opacity`}
                        >
                          Leggi →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">Nessun articolo in evidenza al momento</p>
                <p className="text-gray-500 text-sm">Gli articoli pubblicati e contrassegnati come "in evidenza" appariranno qui</p>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}