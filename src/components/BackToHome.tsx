import Link from "next/link";

export function BackToHome() {
  return (
    <Link 
      href="/"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all duration-200 group"
    >
      <svg 
        className="w-5 h-5 text-primary-600 group-hover:text-primary-700 transition-colors" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
      </svg>
      <span className="gradient-text font-semibold text-sm hover:opacity-80 transition-opacity">
        Torna alla Homepage
      </span>
    </Link>
  );
}
