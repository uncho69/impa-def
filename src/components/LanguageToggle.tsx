"use client";

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <label className="relative inline-flex items-center">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as "it" | "en")}
        className="h-10 w-[52px] appearance-none rounded-md border border-indigo-400/35 bg-indigo-950/50 pl-2 pr-5 text-[15px] font-semibold text-white outline-none focus:border-indigo-300"
        title={language === 'it' ? 'Passa a Inglese' : 'Switch to Italian'}
        aria-label="Selettore lingua"
      >
        <option value="it">🇮🇹</option>
        <option value="en">🇬🇧</option>
      </select>
      <span className="pointer-events-none absolute right-2 top-[46%] -translate-y-1/2 text-white/90 leading-none">⌄</span>
    </label>
  );
};

export default LanguageToggle;
