"use client";

import Link from "next/link";
import Image from "next/image";
// import { PageLayout } from "@/components/PageLayout"; // Non più necessario
import { BackToHome } from "@/components/BackToHome";
import { useState, useEffect } from "react";
import imparoLogo from "@/assets/imparodefi-logo-nobg.webp";
import ExpandableNewsCard from "@/components/ExpandableNewsCard";

export default function GamingNewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carica articoli Gaming dal database
    fetch('/api/news?category=GAMING&limit=20')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Errore caricamento articoli Gaming:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <BackToHome href="/news" label="Torna alle News" />
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
            <Image
              src={imparoLogo}
              alt="Gaming"
              width={28}
              height={28}
              className="w-7 h-7 brightness-0 invert"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gaming News</h1>
            <p className="text-slate-600 dark:text-slate-400">Giochi & Mercati di Predizione, P2E e l'evoluzione del gaming blockchain</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 p-5 animate-pulse">
                <div className="h-4 bg-slate-300 dark:bg-indigo-700/60 rounded mb-3"></div>
                <div className="h-6 bg-slate-300 dark:bg-indigo-700/60 rounded mb-2"></div>
                <div className="h-4 bg-slate-300 dark:bg-indigo-700/60 rounded mb-4"></div>
                <div className="h-3 bg-slate-300 dark:bg-indigo-700/60 rounded"></div>
              </div>
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {articles.map((article: any) => (
              <ExpandableNewsCard
                key={article.id}
                article={article}
                categoryConfig={{
                  name: 'Gaming',
                  color: 'text-violet-800',
                  bgColor: 'bg-violet-100',
                  buttonColor: 'bg-violet-600 hover:bg-violet-700'
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-indigo-800/40 flex items-center justify-center mx-auto mb-4">
              <Image
                src={imparoLogo}
                alt="Gaming"
                width={32}
                height={32}
                className="w-8 h-8 opacity-50"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Nessun articolo Gaming</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Non ci sono ancora articoli pubblicati nella categoria Gaming.
            </p>
            <Link
              href="/news"
              className="inline-flex bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors font-medium"
            >
              Torna alle News
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}