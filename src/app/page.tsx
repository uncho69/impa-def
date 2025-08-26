"use client";

import Link from "next/link";
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const videoRef = useVideoAutoplay();
  const { t } = useLanguage();
  
  return (
    <div className="w-full">
      {/* Hero Section - Enhanced with 3D Effects */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-background py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <h1 className="animate-slide-down mb-6 tracking-tight">
                <span className="gradient-text text-4xl md:text-5xl lg:text-6xl">
                  {t('home.title')}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-neutral-700 mb-8 animate-slide-down [animation-delay:200ms]">
                {t('home.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up [animation-delay:400ms]">
                <Link href="/registrati?next=/manuale" className="btn-primary transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {t('home.startNow')}
                </Link>
              </div>
            </div>
            
            <div className="animate-fade-in [animation-delay:600ms] group">
              <div className="relative overflow-hidden rounded-2xl shadow-hard transition-all duration-700">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-30 animate-pulse-slow group-hover:opacity-50 transition-opacity"></div>
                <div className="relative rounded-2xl overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 cursor-pointer"
                    controls={false}
                    autoPlay={true}
                    muted
                    loop
                    playsInline
                    preload="auto"
                  >
                    <source src="/videos/imparodefividlanding.mp4" type="video/mp4" />
                    Il tuo browser non supporta il tag video.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Perché ImparoDeFi Section - Enhanced with 3D Cards and Animations */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Enhanced Background Pattern with Moving Gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05)_0%,transparent_50%)] animate-pulse-slow"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-primary-50/20 to-transparent animate-pulse-slow opacity-30"></div>
        </div>
        
        <div className="container-custom relative z-10">
          {/* Header with Enhanced Animation */}
          <div className="text-center mb-16">
            <h2 className="gradient-text text-5xl font-bold mb-6">
              {t('home.whyImparoDefi')}
            </h2>
          </div>

          {/* Main Content - Enhanced 3D Layout */}
          <div className="max-w-6xl mx-auto">
            {/* Introduzione - Enhanced 3D Card */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-10 mb-16 border border-primary-100 relative group">
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 opacity-0"></div>
              <div className="absolute inset-[2px] rounded-3xl bg-gradient-to-br from-primary-50 to-secondary-50"></div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-6 text-primary-700 group-hover:text-primary-800 transition-colors">{t('home.introduction')}</h3>
                    <div className="space-y-4 text-neutral-700 leading-relaxed text-lg">
                      <p>{t('home.introductionText1')}</p>
                      <p>{t('home.introductionText2')}</p>
                      <p>{t('home.introductionText3')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Il Problema e La Soluzione - Enhanced Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Il Problema - Enhanced 3D Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-red-100 group relative">
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-400 to-red-600 opacity-0"></div>
                <div className="absolute inset-[2px] rounded-3xl bg-white"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-red-600 group-hover:text-red-700 transition-colors">{t('home.theProblem')}</h3>
                  </div>
                  <div className="space-y-4 text-neutral-700 leading-relaxed">
                    <p>{t('home.theProblemText')}</p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>{t('home.problem1')}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>{t('home.problem2')}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>{t('home.problem3')}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>{t('home.problem4')}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>{t('home.problem5')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* La Nostra Soluzione - Enhanced 3D Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100 group relative">
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400 to-green-600 opacity-0"></div>
                <div className="absolute inset-[2px] rounded-3xl bg-white"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors">{t('home.ourSolution')}</h3>
                  </div>
                  <div className="space-y-4 text-neutral-700 leading-relaxed">
                    <p>{t('home.solutionText1')}</p>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-green-800 font-semibold text-center">
                        {t('home.curationText')}
                      </p>
                    </div>
                    <p>{t('home.solutionText2')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Governance e Tokenomics - Enhanced Full Width */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-10 border border-blue-100 relative group">
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 opacity-0"></div>
              <div className="absolute inset-[2px] rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-blue-700 group-hover:text-blue-800 transition-colors">{t('home.governance')}</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4 text-neutral-700 leading-relaxed">
                    <p>{t('home.governanceText1')}</p>
                    <p>{t('home.governanceText2')}</p>
                  </div>
                  <div className="space-y-4 text-neutral-700 leading-relaxed">
                    <p>{t('home.governanceText3')}</p>
                    <p>{t('home.governanceText4')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
    </div>
  );
}
