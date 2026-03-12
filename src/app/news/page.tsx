"use client";

import Link from "next/link";
// import { PageLayout } from "@/components/PageLayout"; // Non necessario, usiamo layout custom
import { useState, useEffect } from "react";
import { BookmarkButton } from "@/components/bookmarks/BookmarkButton";
import { useLanguage } from "@/contexts/LanguageContext";

type FeaturedArticle = {
  id: number | string;
  category: string;
  title: string;
  summary: string;
  publishedAt: string;
};

export default function NewsPage() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [featuredArticles, setFeaturedArticles] = useState<FeaturedArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carica articoli in evidenza dal database
    fetch('/api/news?featured=true&limit=6')
      .then(res => res.json())
      .then((articles: unknown) => {
        setFeaturedArticles(Array.isArray(articles) ? (articles as FeaturedArticle[]) : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading articles:", err);
        setLoading(false);
      });
  }, []);

  const newsCategories = [
    {
      id: "general",
      title: "General",
      description: isEnglish ? "General news from the crypto and Web3 world" : "Notizie generali dal mondo crypto e Web3",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "defi",
      title: "DeFi",
      description: isEnglish ? "Decentralized finance and innovative protocols" : "Finanza decentralizzata e protocolli innovativi",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: "airdrops",
      title: "Hot Airdrops",
      description: isEnglish ? "Top airdrops and free opportunities" : "I migliori airdrop e opportunità gratuite",
      color: "from-purple-500 to-violet-600"
    },
    {
      id: "crypto-ai",
      title: "Crypto AI",
      description: isEnglish ? "Artificial intelligence and blockchain together" : "Intelligenza artificiale e blockchain unite",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: "stablecoins",
      title: "Stablecoins",
      description: isEnglish ? "USDC, USDT, PYUSD and the future of payments" : "USDC, USDT, PYUSD e il futuro dei pagamenti",
      color: "from-emerald-500 to-green-600"
    },
    {
      id: "regolamentazioni",
      title: "Regolamentazioni",
      description: isEnglish ? "Regulations, MiCA Europe and crypto compliance" : "Normative, MiCA Europa e compliance crypto",
      color: "from-red-500 to-pink-600"
    },
    {
      id: "gaming",
      title: "Gaming",
      description: isEnglish ? "Games, prediction markets, P2E and blockchain gaming evolution" : "Giochi & Mercati di Predizione, P2E e l'evoluzione del gaming blockchain",
      color: "from-violet-500 to-purple-600"
    },
    {
      id: "memecoins",
      title: "Memecoins",
      description: isEnglish ? "DOGE, SHIB, PEPE and the latest meme trends" : "DOGE, SHIB, PEPE e le ultime meme sensation",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="relative z-10 min-h-screen">
        {/* Header compatto */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight py-2">
              News Crypto & Web3
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {isEnglish ? "Latest crypto news, always updated" : "Le ultime notizie dal mondo crypto, sempre aggiornate"}
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
                <div className="bg-white dark:bg-indigo-900/25 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden border border-slate-200 dark:border-indigo-500/20 h-full">
                  <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                  <div className="p-5">
                    <div className="text-center mb-3">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-indigo-300 transition-colors">
                        {category.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mb-3 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-indigo-800/40 px-2 py-1 rounded-full">
                        {isEnglish ? "Category" : "Categoria"}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="text-blue-600 dark:text-indigo-300 text-xs font-medium group-hover:text-blue-700 dark:group-hover:text-indigo-200 flex items-center">
                          {isEnglish ? "Read" : "Leggi"} <span className="ml-1">→</span>
                        </div>
                        <span onClick={(e) => e.preventDefault()}>
                          <BookmarkButton
                            url={`/news/${category.id}`}
                            title={`${category.title} - ${isEnglish ? "News category" : "Categoria news"}`}
                            type="page"
                            projectId={`news-${category.id}`}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Sezione articoli in evidenza */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
              {isEnglish ? "Featured news" : "News in evidenza"}
            </h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Loading skeleton */}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-slate-200 dark:bg-indigo-900/25 border border-slate-300 dark:border-indigo-500/20 rounded-2xl p-5 animate-pulse">
                    <div className="h-4 bg-slate-300 dark:bg-indigo-700/60 rounded mb-3"></div>
                    <div className="h-6 bg-slate-300 dark:bg-indigo-700/60 rounded mb-2"></div>
                    <div className="h-4 bg-slate-300 dark:bg-indigo-700/60 rounded mb-4"></div>
                    <div className="h-3 bg-slate-300 dark:bg-indigo-700/60 rounded"></div>
                  </div>
                ))}
              </div>
            ) : featuredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredArticles.map((article) => {
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
                    <div key={article.id} className={`bg-gradient-to-br ${colors.bg} dark:from-indigo-900/35 dark:to-indigo-800/25 rounded-2xl border border-slate-200 dark:border-indigo-500/20 p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                   <div className="flex items-center justify-between mb-3">
                     <span className={`${colors.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                       {article.category.replace('_', ' ')}
                     </span>
                   </div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 text-sm mb-4 line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {new Date(article.publishedAt).toLocaleDateString(isEnglish ? "en-GB" : "it-IT")}
                        </span>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/news/${article.category.toLowerCase().replace('_', '-')}`}
                            className={`${colors.badge} text-white px-3 py-1 rounded-full text-xs font-medium hover:opacity-80 transition-opacity`}
                          >
                            {isEnglish ? "Read →" : "Leggi →"}
                          </Link>
                          <BookmarkButton
                            url={`/news/${article.category.toLowerCase().replace('_', '-')}`}
                            title={article.title}
                            type="page"
                            projectId={`news-article-${article.id}`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">
                  {isEnglish ? "No featured articles at the moment" : "Nessun articolo in evidenza al momento"}
                </p>
                <p className="text-slate-500 dark:text-slate-500 text-sm">
                  {isEnglish
                    ? 'Published articles marked as "featured" will appear here'
                    : 'Gli articoli pubblicati e contrassegnati come "in evidenza" appariranno qui'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}