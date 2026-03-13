"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translateItalianToEnglish } from "@/lib/i18n/translate-it-to-en";
import { usePathname } from "next/navigation";

function shouldSkipTextNode(node: Text): boolean {
  const parent = node.parentElement;
  if (!parent) return true;
  if (!node.nodeValue || !node.nodeValue.trim()) return true;
  if (parent.closest("[data-no-auto-translate], script, style, noscript, textarea")) return true;
  const tagName = parent.tagName;
  if (tagName === "INPUT" || tagName === "OPTION") return true;
  return false;
}

export function LanguageAutoTranslate() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const originalTextRef = useRef<Map<Text, string>>(new Map());
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.getElementById("app-content-root");
    if (!root) return;

    const applyToTree = (root: Node) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let current = walker.nextNode();
      while (current) {
        const textNode = current as Text;
        if (!shouldSkipTextNode(textNode)) {
          if (!originalTextRef.current.has(textNode)) {
            originalTextRef.current.set(textNode, textNode.nodeValue || "");
          }
          const original = originalTextRef.current.get(textNode) || "";
          textNode.nodeValue = language === "en" ? translateItalianToEnglish(original) : original;
        }
        current = walker.nextNode();
      }
    };

    const restoreAll = () => {
      originalTextRef.current.forEach((original, node) => {
        if (node.isConnected) node.nodeValue = original;
      });
    };

    if (language !== "en") {
      restoreAll();
      return;
    }

    applyToTree(root);
    const raf1 = window.requestAnimationFrame(() => applyToTree(root));
    const raf2 = window.setTimeout(() => applyToTree(root), 120);

    // Observe only for a short hydration window to avoid
    // keeping an expensive observer alive for the whole session.
    const pending = new Set<Node>();
    const flushPending = () => {
      frameRef.current = null;
      pending.forEach((node) => applyToTree(node));
      pending.clear();
    };
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((added) => {
          pending.add(added);
        });
      });
      if (frameRef.current == null) {
        frameRef.current = window.requestAnimationFrame(flushPending);
      }
    });

    observer.observe(root, { subtree: true, childList: true });
    const stopObserver = window.setTimeout(() => observer.disconnect(), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(stopObserver);
      window.cancelAnimationFrame(raf1);
      window.clearTimeout(raf2);
      if (frameRef.current != null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [language, pathname]);

  return null;
}
