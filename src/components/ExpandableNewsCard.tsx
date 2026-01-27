'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ExpandableNewsCardProps {
  article: {
    id: string;
    title: string;
    summary: string;
    content: string;
    category: string;
    author: string;
    publishedAt: string;
    readTime: string;
    imageUrl?: string;
    tags: string[];
    views?: number;
  };
  categoryConfig?: {
    name: string;
    color: string;
    bgColor: string;
    buttonColor: string;
  };
}

export default function ExpandableNewsCard({ 
  article, 
  categoryConfig = {
    name: article.category.replace('_', ' '),
    color: 'text-blue-800',
    bgColor: 'bg-blue-100',
    buttonColor: 'bg-blue-600 hover:bg-blue-700'
  }
}: ExpandableNewsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 ${
        isExpanded ? 'md:col-span-2' : ''
      }`}
    >
      <div className="p-6">
        {/* Immagine se presente */}
        {article.imageUrl && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={400}
              height={200}
              className={`w-full object-cover transition-all duration-300 ${
                isExpanded ? 'h-48' : 'h-32'
              }`}
            />
          </div>
        )}

        {/* Header articolo */}
        <div className="flex items-center justify-between mb-4">
          <span className={`${categoryConfig.bgColor} ${categoryConfig.color} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
            {categoryConfig.name}
          </span>
          <span className="text-gray-500 text-xs">
            {new Date(article.publishedAt).toLocaleDateString('it-IT')}
          </span>
        </div>
        
        <h2 className={`font-bold text-gray-900 mb-2 ${isExpanded ? 'text-2xl' : 'text-xl line-clamp-2'}`}>
          {article.title}
        </h2>
        
        <p className={`text-gray-700 text-sm mb-4 ${isExpanded ? 'text-base leading-relaxed' : 'line-clamp-3'}`}>
          {article.summary}
        </p>

        {/* Contenuto completo quando espanso */}
        {isExpanded && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div 
              className="text-gray-800 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: article.content.replace(/\n/g, '<br>') 
              }}
            />
          </div>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags && Array.isArray(article.tags) && article.tags.map((tag: string, index: number) => (
            <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
               {/* Footer */}
               <div className="flex items-center justify-end pt-4 border-t border-gray-200">
                 {/* Pulsante Leggi di più / Chiudi - SEMPRE PRESENTE */}
                 <button
                   onClick={() => setIsExpanded(!isExpanded)}
                   className={`${categoryConfig.buttonColor} text-white text-xs px-3 py-1.5 rounded-full transition-colors font-medium`}
                 >
                   {isExpanded ? 'Chiudi ✕' : 'Leggi di più →'}
                 </button>
               </div>
      </div>
    </div>
  );
}
