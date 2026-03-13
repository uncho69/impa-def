"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translateItalianToEnglish } from "@/lib/i18n/translate-it-to-en";

const NON_TRANSLATABLE_PROPS = new Set([
  "className",
  "href",
  "src",
  "id",
  "htmlFor",
  "viewBox",
  "d",
  "fill",
  "stroke",
  "xmlns",
  "target",
  "rel",
  "type",
  "name",
  "value",
  "defaultValue",
  "style",
  "key",
]);

function shouldSkipElement(node: React.ReactElement): boolean {
  if (typeof node.type === "string" && (node.type === "script" || node.type === "style")) {
    return true;
  }
  const props = (node.props ?? {}) as Record<string, unknown>;
  return props["data-no-auto-translate"] === true;
}

function translateNode(node: React.ReactNode): React.ReactNode {
  if (node == null || typeof node === "boolean" || typeof node === "number") return node;
  if (typeof node === "string") return translateItalianToEnglish(node);
  if (Array.isArray(node)) return node.map((item) => translateNode(item));
  if (!React.isValidElement(node)) return node;
  if (shouldSkipElement(node)) return node;

  // Never mutate props of custom components:
  // changing non-visual props can break runtime logic (e.g. href, ids, keys).
  if (typeof node.type !== "string") {
    if (node.type === React.Fragment) {
      const fragmentProps = (node.props ?? {}) as Record<string, unknown>;
      const nextChildren = translateNode(fragmentProps.children as React.ReactNode);
      return <>{nextChildren}</>;
    }
    return node;
  }

  const originalProps = (node.props ?? {}) as Record<string, unknown>;
  const translatedProps: Record<string, unknown> = {};

  Object.entries(originalProps).forEach(([key, value]) => {
    if (key.startsWith("on")) {
      translatedProps[key] = value;
      return;
    }
    if (typeof value === "string") {
      translatedProps[key] = NON_TRANSLATABLE_PROPS.has(key) ? value : translateItalianToEnglish(value);
      return;
    }
    if (React.isValidElement(value) || Array.isArray(value)) {
      translatedProps[key] = translateNode(value);
      return;
    }
    translatedProps[key] = value;
  });

  return React.cloneElement(node, translatedProps);
}

export default function AutoTranslateText({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  if (language !== "en") return <>{children}</>;
  return <>{translateNode(children)}</>;
}
