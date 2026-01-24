import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function MarginfiPage() {
  return (
    <>
      <PageTitle description="Protocollo di lending e borrowing su Solana">
        Marginfi
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">M</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Marginfi</h2>
              <p className="text-neutral-600">Solana • DeFi • Lending</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Marginfi</strong> è un protocollo di lending e borrowing decentralizzato costruito su Solana, che permette agli utenti di depositare asset per guadagnare interessi e prendere in prestito altri asset utilizzando i propri depositi come collateral. Marginfi offre bassi costi e transazioni veloci grazie alla blockchain Solana.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Marginfi</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Built on Solana">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Blockchain Solana</h4>
              <p className="text-neutral-600">
                Marginfi è costruito su Solana, sfruttando la velocità e i bassi costi della blockchain per offrire un&apos;esperienza DeFi più accessibile e conveniente rispetto alle soluzioni su Ethereum.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Lending e Borrowing">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Protocollo DeFi</h4>
              <p className="text-neutral-600">
                Marginfi permette agli utenti di depositare criptovalute per guadagnare interessi passivi e prendere in prestito altri asset utilizzando i propri depositi come garanzia, creando un ecosistema di finanza decentralizzata.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Governance Token">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">MRGN Token</h4>
              <p className="text-neutral-600">
                Il token MRGN è utilizzato per la governance del protocollo, permettendo ai holder di partecipare alle decisioni che riguardano lo sviluppo e le operazioni di Marginfi.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Multi-Asset Support">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Diversi Asset</h4>
              <p className="text-neutral-600">
                Marginfi supporta una vasta gamma di asset per lending e borrowing, inclusi SOL, USDC, USDT e altri token popolari su Solana, offrendo flessibilità agli utenti.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Sicurezza e Audit">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Sicurezza Garantita</h4>
              <p className="text-neutral-600">
                Marginfi è stato sottoposto a audit di sicurezza da parte di aziende leader nel settore, garantendo la sicurezza dei fondi degli utenti e l&apos;affidabilità del protocollo.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Asset Supportati</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Native Tokens</h4>
              <List>
                <li>SOL (Solana)</li>
                <li>USDC (USD Coin)</li>
                <li>USDT (Tether)</li>
                <li>WSOL (Wrapped SOL)</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Solana Ecosystem</h4>
              <List>
                <li>SRM (Serum)</li>
                <li>RAY (Raydium)</li>
                <li>ORCA (Orca)</li>
                <li>MNGO (Mango)</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Stablecoins</h4>
              <List>
                <li>USDC</li>
                <li>USDT</li>
                <li>DAI</li>
                <li>Altri stablecoin</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Altri</h4>
              <List>
                <li>Token di governance</li>
                <li>Utility tokens</li>
                <li>DeFi tokens</li>
                <li>Community tokens</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Attività di Lending</h4>
                <List>
                  <li>Deposita asset su Marginfi</li>
                  <li>Mantieni depositi per periodi significativi</li>
                  <li>Utilizza volumi consistenti</li>
                  <li>Partecipa a programmi di incentivazione</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Attività di Borrowing</h4>
                <List>
                  <li>Prendi in prestito asset dal protocollo</li>
                  <li>Mantieni posizioni di borrowing</li>
                  <li>Utilizza diverse tipologie di asset</li>
                  <li>Partecipa a strategie DeFi avanzate</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Governance e Community</h4>
                <List>
                  <li>Acquista e detieni token MRGN</li>
                  <li>Partecipa alle votazioni di governance</li>
                  <li>Contribuisci alle discussioni</li>
                  <li>Partecipa a eventi e AMA</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a Marginfi</h4>
                <List>
                  <li>Visita <a href="https://marginfi.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">marginfi.com</a></li>
                  <li>Connetti il tuo wallet Solana</li>
                  <li>Assicurati di avere SOL per gas</li>
                  <li>Esplora i mercati disponibili</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Lending di Asset</h4>
                <List>
                  <li>Seleziona l&apos;asset da depositare</li>
                  <li>Inserisci l&apos;importo</li>
                  <li>Conferma la transazione</li>
                  <li>Inizia a guadagnare interessi</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Borrowing di Asset</h4>
                <List>
                  <li>Assicurati di avere collateral sufficiente</li>
                  <li>Seleziona l&apos;asset da prendere in prestito</li>
                  <li>Inserisci l&apos;importo</li>
                  <li>Conferma la transazione</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Risorse Utili</SectionTitle>
        <SectionBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🌐</span>
              <a href="https://marginfi.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Marginfi
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/marginfi" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/marginfi" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.marginfi.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">📊</span>
              <a href="https://marginfi.com/analytics" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Analytics Dashboard
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
