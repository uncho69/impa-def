import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function MoonwellPage() {
  return (
    <ProtectedRoute title="Moonwell - Airdrop">
      <PageTitle description="Protocollo di lending e borrowing su Base">
        Moonwell
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">M</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Moonwell</h2>
              <p className="text-neutral-600">DeFi • Lending • Base</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Moonwell</strong> è un protocollo di lending e borrowing decentralizzato costruito su Base, il Layer 2 di Coinbase. Moonwell permette agli utenti di depositare asset per guadagnare interessi e prendere in prestito altri asset utilizzando i propri depositi come collateral.
          </div>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali di Moonwell</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Lending e Borrowing">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Protocollo DeFi</h4>
              <p className="text-neutral-600">
                Moonwell permette agli utenti di depositare criptovalute per guadagnare interessi passivi e prendere in prestito altri asset utilizzando i propri depositi come garanzia, creando un ecosistema di finanza decentralizzata.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="2. Built on Base">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Layer 2 Integration</h4>
              <p className="text-neutral-600">
                Moonwell è costruito su Base, il Layer 2 di Coinbase, sfruttando i bassi costi delle transazioni e la velocità della rete per offrire un&apos;esperienza DeFi più accessibile e conveniente.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="3. Governance Token">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">WELL Token</h4>
              <p className="text-neutral-600">
                Il token WELL è utilizzato per la governance del protocollo, permettendo ai holder di partecipare alle decisioni che riguardano lo sviluppo e le operazioni di Moonwell.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="4. Multi-Asset Support">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Diversi Asset</h4>
              <p className="text-neutral-600">
                Moonwell supporta una vasta gamma di asset per lending e borrowing, inclusi ETH, USDC, USDT e altri token popolari, offrendo flessibilità agli utenti.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="5. Sicurezza e Audit">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Sicurezza Garantita</h4>
              <p className="text-neutral-600">
                Moonwell è stato sottoposto a audit di sicurezza da parte di aziende leader nel settore, garantendo la sicurezza dei fondi degli utenti e l&apos;affidabilità del protocollo.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Asset Supportati</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Crypto Assets</h4>
              <List>
                <li>ETH (Ethereum)</li>
                <li>USDC (USD Coin)</li>
                <li>USDT (Tether)</li>
                <li>WETH (Wrapped ETH)</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Base Ecosystem</h4>
              <List>
                <li>Base native tokens</li>
                <li>Bridged assets</li>
                <li>Layer 2 tokens</li>
                <li>Community tokens</li>
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
                  <li>Deposita asset su Moonwell</li>
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
                  <li>Acquista e detieni token WELL</li>
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
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a Moonwell</h4>
                <List>
                  <li>Visita <a href="https://moonwell.fi/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">moonwell.fi</a></li>
                  <li>Connetti il tuo wallet Base</li>
                  <li>Assicurati di avere ETH per gas</li>
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
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">4. Gestione Posizioni</h4>
                <List>
                  <li>Monitora il tuo health factor</li>
                  <li>Gestisci i rischi di liquidazione</li>
                  <li>Ottimizza i rendimenti</li>
                  <li>Partecipa alla governance</li>
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
              <a href="https://moonwell.fi/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Moonwell
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/MoonwellFi" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">💬</span>
              <a href="https://discord.gg/moonwell" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Discord Community
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📚</span>
              <a href="https://docs.moonwell.fi/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">📊</span>
              <a href="https://moonwell.fi/analytics" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Analytics Dashboard
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
