"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "imparodefi-sidebar-collapsed";

export type SidebarItem = { label: string; href: string; icon: string };

type CollapsibleSidebarProps = {
  items: SidebarItem[];
  isDark: boolean;
  /** Se non passata, usa pathname === href o pathname.startsWith(href+'/') e per href==='/' pathname==='/' */
  isItemActive?: (href: string) => boolean;
};

export function CollapsibleSidebar({
  items,
  isDark,
  isItemActive: isItemActiveProp,
}: CollapsibleSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false); // default aperta

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "true") setCollapsed(true);
  }, []);

  const toggle = () => {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  const isItemActive = isItemActiveProp ?? ((href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  });

  const baseLink =
    "flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200 overflow-hidden";
  const activeClasses = isDark
    ? "bg-indigo-600/90 text-white"
    : "bg-indigo-100 text-indigo-900";
  const inactiveClasses = isDark
    ? "text-slate-300 hover:bg-indigo-500/20 hover:text-white"
    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900";

  return (
    <aside
      className={`hidden lg:flex flex-shrink-0 self-start sticky top-4 backdrop-blur flex-col border-r transition-[width] duration-200 ease-in-out rounded-2xl mt-4 ml-4 min-h-0 h-[calc(100vh-6.5rem)] ${
        collapsed ? "w-[4.5rem]" : "w-56"
      } ${isDark ? "bg-indigo-950/70 border-indigo-500/20 shadow-[4px_0_20px_rgba(0,0,0,0.25)]" : "bg-white/80 border-slate-200 shadow-[4px_0_16px_rgba(0,0,0,0.06)]"}`}
      aria-label="Navigazione laterale"
    >
      <nav className="px-2 py-4 flex flex-col flex-1 min-h-0 overflow-y-auto">
        {/* Toggle in cima */}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Espandi sidebar" : "Comprimi sidebar"}
          className={`flex items-center justify-center gap-2 rounded-lg py-2.5 mb-2 transition-colors ${
            collapsed ? "px-2" : "px-3"
          } ${
            isDark
              ? "text-slate-400 hover:bg-indigo-500/20 hover:text-white"
              : "text-slate-500 hover:bg-slate-200 hover:text-slate-700"
          }`}
        >
          <svg
            className={`w-5 h-5 shrink-0 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7M18 19l-7-7 7-7"
            />
          </svg>
          {!collapsed && (
            <span className="text-sm font-medium truncate">Comprimi</span>
          )}
        </button>
        <div className="space-y-0.5">
          {items.map((item) => {
            const active = isItemActive(item.href);
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`${baseLink} ${active ? activeClasses : inactiveClasses} ${
                  collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
                } group/dock`}
              >
                <span
                  className={`inline-flex items-center justify-center shrink-0 transition-transform duration-150 ease-out text-lg ${
                    collapsed ? "group-hover/dock:scale-125" : "group-hover/dock:scale-110"
                  }`}
                  style={{ transformOrigin: "center center" }}
                >
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="truncate min-w-0">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
