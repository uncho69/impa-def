import Link from "next/link";

export function BackToHome({ href = "/", label = "Torna alla Homepage" }: { href?: string; label?: string }) {
  return (
    <Link 
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-indigo-500/30 hover:bg-slate-50 dark:hover:bg-indigo-900/40 transition-all duration-200 group"
    >
      <svg 
        className="w-5 h-5 text-slate-500 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white transition-colors" 
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
      <span className="font-semibold text-sm text-slate-700 dark:text-slate-200 hover:opacity-90 transition-opacity">
        {label}
      </span>
    </Link>
  );
}
