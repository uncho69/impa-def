export type HacksScamsAlert = {
  id: string;
  title: string;
  description: string;
  severity: "warning" | "critical" | "info";
  isActive: boolean;
  order: number;
  link: string | null;
  createdAt: string;
  updatedAt: string;
};

const NOW = new Date().toISOString();

export const DEFAULT_HACKS_SCAMS_ALERTS: HacksScamsAlert[] = [
  {
    id: "hs-1",
    title: "CryptoScamX Protocol",
    description: "Sito di phishing ad alto rischio. Non interagire.",
    severity: "critical",
    isActive: true,
    order: 1,
    link: null,
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "hs-2",
    title: "FakeYieldFarm Project",
    description: "Avviso schema Ponzi. Clicca per i dettagli.",
    severity: "warning",
    isActive: true,
    order: 2,
    link: null,
    createdAt: NOW,
    updatedAt: NOW,
  },
];

export function toPublicAlert(alert: HacksScamsAlert): { name: string; desc: string; link: string | null } {
  return {
    name: alert.title,
    desc: alert.description,
    link: alert.link,
  };
}

