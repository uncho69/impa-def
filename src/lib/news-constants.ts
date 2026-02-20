/**
 * Client-safe news constants and helpers.
 * Use this in "use client" components. Do not import @/lib/news (it uses db/pg).
 */

export const NEWS_CATEGORIES = [
  { value: 'GENERAL', label: 'General' },
  { value: 'DEFI', label: 'DeFi' },
  { value: 'AIRDROPS', label: 'Hot Airdrops' },
  { value: 'CRYPTO_AI', label: 'Crypto AI' },
  { value: 'STABLECOINS', label: 'Stablecoins' },
  { value: 'REGOLAMENTAZIONI', label: 'Regolamentazioni' },
  { value: 'GAMING', label: 'Gaming' },
  { value: 'MEMECOINS', label: 'Memecoins' },
];

export const NEWS_STATUSES = [
  { value: 'DRAFT', label: 'Bozza' },
  { value: 'PUBLISHED', label: 'Pubblicato' },
  { value: 'ARCHIVED', label: 'Archiviato' },
];

export function getCategoryLabel(category: string) {
  return NEWS_CATEGORIES.find((c) => c.value === category)?.label ?? category;
}

export function getStatusLabel(status: string) {
  return NEWS_STATUSES.find((s) => s.value === status)?.label ?? status;
}
