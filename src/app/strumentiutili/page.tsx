import Link from "next/link";
import Image from "next/image";
import { PageTitle } from "@/components/PageTitle";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { getProjectLogo } from "@/lib/project-logos";
import { BookmarkButton } from "@/components/bookmarks/BookmarkButton";
import placeholder from "@/assets/placeholder.svg";

type ToolItem = {
  name: string;
  slug: string;
  description: string;
  website: string;
  xProfile: string;
};

const TOOL_CATEGORIES: Array<{
  title: string;
  subtitle: string;
  intro: string;
  items: ToolItem[];
}> = [
  {
    title: "Blockchain Explorers",
    subtitle: "Audit e verifica on-chain",
    intro:
      "Strumenti per validare transazioni, smart contract e bridge execution con evidenza on-chain verificabile.",
    items: [
      {
        name: "Etherscan",
        slug: "etherscan",
        description: "Explorer Ethereum di riferimento per tx e contract.",
        website: "https://etherscan.io",
        xProfile: "https://x.com/etherscan",
      },
      {
        name: "Relay Transaction Scanner",
        slug: "relay-transactions",
        description: "Tracking cross-chain per transazioni Relay.",
        website: "https://relay.link/transactions",
        xProfile: "https://x.com/relayprotocol",
      },
      {
        name: "LayerZeroScan",
        slug: "layerzeroscan",
        description: "Monitoraggio messaggi e delivery LayerZero.",
        website: "https://layerzeroscan.com/",
        xProfile: "https://x.com/LayerZero_Labs",
      },
    ],
  },
  {
    title: "Portfolio Tracker",
    subtitle: "Monitoraggio portfolio professionale",
    intro:
      "Dashboard per PnL, allocazione e performance wallet multi-chain con workflow operativo da analyst.",
    items: [
      {
        name: "DeBank",
        slug: "debank",
        description: "Portfolio DeFi multichain con focus su wallet intelligence.",
        website: "https://debank.com",
        xProfile: "https://x.com/DebankDeFi",
      },
      {
        name: "Zerion",
        slug: "zerion",
        description: "Portfolio tracking con UX semplice e monitoring continuo.",
        website: "https://zerion.io",
        xProfile: "https://x.com/zerion",
      },
    ],
  },
  {
    title: "Analisi e Ricerca",
    subtitle: "Data stack per decisioni ad alta qualita",
    intro:
      "Analytics ad alto segnale per fondamentali, revenue, smart money e discovery opportunita.",
    items: [
      {
        name: "DeFiLlama",
        slug: "defillama",
        description: "TVL, fee e metriche DeFi cross-chain standard di mercato.",
        website: "https://defillama.com",
        xProfile: "https://x.com/DefiLlama",
      },
      {
        name: "Token Terminal",
        slug: "token-terminal",
        description: "Fundamental analysis crypto in stile equity research.",
        website: "https://tokenterminal.com",
        xProfile: "https://x.com/tokenterminal",
      },
      {
        name: "Dune",
        slug: "dune",
        description: "Dashboard SQL custom per analisi on-chain avanzate.",
        website: "https://dune.com",
        xProfile: "https://x.com/Dune",
      },
      {
        name: "Nansen",
        slug: "nansen",
        description: "Wallet intelligence e smart money tracking.",
        website: "https://www.nansen.ai",
        xProfile: "https://x.com/nansen_ai",
      },
    ],
  },
  {
    title: "Sicurezza e Privacy",
    subtitle: "Privacy-focused protocols",
    intro:
      "Protocolli privacy rilevanti per shielding, anonimizzazione e protezione operativa on-chain.",
    items: [
      {
        name: "Tornado Cash",
        slug: "tornado",
        description: "Protocollo privacy on-chain (attenzione a compliance/normative).",
        website: "https://tornado.cash",
        xProfile: "https://x.com/TornadoCash",
      },
      {
        name: "RAILGUN",
        slug: "railgun",
        description: "Privacy wallet layer per utilizzo DeFi shielded.",
        website: "https://railgun.org",
        xProfile: "https://x.com/RailgunProject",
      },
      {
        name: "Zcash",
        slug: "zcash",
        description: "Network privacy-first con transazioni shielded.",
        website: "https://z.cash",
        xProfile: "https://x.com/zcash",
      },
    ],
  },
];

function getToolLogo(slug: string) {
  const normalized = slug.toLowerCase();
  if (normalized === "relay-transactions") return getProjectLogo("relay-bridge") ?? placeholder;
  if (normalized === "layerzeroscan") return getProjectLogo("layerzero") ?? placeholder;
  return getProjectLogo(normalized) ?? placeholder;
}

export default function StrumentiUtiliPage() {
  return (
    <MobileContainer>
      <PageTitle>Strumenti Utili</PageTitle>
      <SectionBody>
        <div className="rounded-2xl border border-indigo-500/25 bg-gradient-to-r from-indigo-900/30 to-slate-900/30 p-3 md:p-4">
          <p className="text-sm text-slate-900 dark:text-slate-200">
            Operating stack professionale per Web3 research. Ogni tool apre una pagina interna nello stesso livello
            delle pagine progetto (overview, workflow operativo, rischi, link utili, contenuti).
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-indigo-400/25 bg-white/70 dark:bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-600 dark:text-slate-300">
              Verification
            </span>
            <span className="rounded-full border border-indigo-400/25 bg-white/70 dark:bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-600 dark:text-slate-300">
              Research
            </span>
            <span className="rounded-full border border-indigo-400/25 bg-white/70 dark:bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-600 dark:text-slate-300">
              Privacy
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOOL_CATEGORIES.map((category) => (
            <section
              key={category.title}
              className="rounded-2xl border border-indigo-500/25 bg-indigo-900/20 p-5 md:p-6"
            >
              <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{category.title}</h2>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">{category.subtitle}</p>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">{category.items.length} tool</span>
              </div>
              <p className="text-slate-800 dark:text-slate-300 mb-4">{category.intro}</p>
              <div className="grid grid-cols-1 gap-3">
                {category.items.map((tool) => (
                  <div
                    key={`${category.title}-${tool.slug}-${tool.name}`}
                    className="rounded-xl border border-slate-300/70 dark:border-indigo-500/25 bg-white/85 dark:bg-indigo-900/25 p-4 hover:border-indigo-400 dark:hover:border-indigo-400/60 transition-colors"
                  >
                    <Link href={`/strumentiutili/${tool.slug}`} className="block">
                      <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-indigo-800/40 flex items-center justify-center overflow-hidden shrink-0">
                            <Image src={getToolLogo(tool.slug)} alt={tool.name} width={32} height={32} className="object-contain" />
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white truncate">{tool.name}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">{tool.description}</p>
                    </Link>
                    <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-200 dark:border-slate-600">
                      <a
                        href={tool.xProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors"
                        title="X (Twitter)"
                        aria-label={`${tool.name} su X`}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors"
                        title="Sito web"
                        aria-label={`Sito ufficiale di ${tool.name}`}
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      </a>
                      <BookmarkButton
                        url={`/strumentiutili/${tool.slug}`}
                        title={`${tool.name} - Tool Web3`}
                        type="page"
                        projectId={tool.slug}
                        className="ml-auto"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
