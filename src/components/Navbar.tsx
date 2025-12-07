"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/imparodefi-logo-nobg.webp";
import { MobileMenu } from "./MobileMenu";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

import { ClerkAuthStatus } from "./ClerkAuthStatus";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-neutral-200">
      <div className="w-full px-4 md:px-8 lg:px-12 mx-auto">
        <nav className="flex items-center justify-between h-16 lg:h-20 py-2">
          <Link href="/" className="group flex items-center">
            <div className="flex items-center">
              <Image 
                src={logo} 
                alt="ImparoDeFi Logo" 
                width={48}
                height={48}
                className="h-10 w-10 lg:h-12 lg:w-12 transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="ml-2 flex flex-col">
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight leading-none text-center">
                  <span className="gradient-text">ImparoDeFi</span>
                </h1>
                <span className="gradient-text text-xs lg:text-sm font-medium self-center">
                  BETA
                </span>
              </div>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link href="/manuale" className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                {t('nav.manuale')}
              </Link>
              <Link href="/blockchain" className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                {t('nav.blockchain')}
              </Link>
              <Link href="/defi" className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                {t('nav.defi')}
              </Link>
              <Link href="/nft" className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                {t('nav.nft')}
              </Link>
              <Link href="/giochi" className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                {t('nav.giochi')}
              </Link>
              <Link href="/wallet" className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                {t('nav.wallet')}
              </Link>
              <Link href="/leaderboards/global" className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                {t('nav.leaderboards')}
              </Link>
              <Link href="/supporto" className="gradient-text hover:opacity-80 transition-opacity font-bold text-sm">
                {t('nav.supporto')}
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <LanguageToggle />
              <ClerkAuthStatus />
            </div>
          </div>
          
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
