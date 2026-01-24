import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function PolymarketPage() {
  return (
    <>
      <PageTitle description="Piattaforma di mercato di previsione decentralizzato">
        Polymarket
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">P</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Polymarket</h2>
              <p className="text-neutral-600">Prediction Markets • Scommesse • Polygon</p>
            </div>
          </div>
          
          <div className="gradient-text text-lg leading-relaxed mb-6">
            <strong>Polymarket</strong> è una piattaforma di mercato di previsione basata sulla blockchain di Polygon. Su Polymarket, gli utenti possono scommettere su vari eventi futuri, come elezioni politiche, risultati sportivi, o qualsiasi altro evento di interesse pubblico, e guadagnare denaro in base alle loro previsioni.
          </div>
        </SectionBody>

        <SectionTitle>Cosa offre Polymarket?</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Mercati di Previsione">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Creazione e Partecipazione</h4>
              <p className="text-neutral-600">
                Gli utenti possono creare o partecipare a mercati di previsione su qualsiasi evento. Ogni mercato ha due o più possibili risultati su cui gli utenti possono scommettere.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="Scommesse in Criptovaluta">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">USDC come Valuta</h4>
              <p className="text-neutral-600">
                Le scommesse sono effettuate utilizzando criptovalute, principalmente USDC (una stablecoin legata al dollaro americano), garantendo stabilità di valore.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="Decentralizzazione">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Blockchain di Polygon</h4>
              <p className="text-neutral-600">
                Polymarket è costruito sulla blockchain di Polygon, il che significa che è decentralizzato e non c&apos;è un&apos;autorità centrale che controlla la piattaforma. Le transazioni e le scommesse sono trasparenti e sicure grazie alla tecnologia blockchain.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="Liquidità e Scambi">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Flessibilità di Trading</h4>
              <p className="text-neutral-600">
                Gli utenti possono comprare e vendere le loro posizioni nei mercati in qualsiasi momento prima che l&apos;evento si concluda, offrendo flessibilità e la possibilità di gestire i rischi.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="Risultati Verificati">
            <div className="space-y-3">
              <h4 className="font-semibold text-neutral-900">Oracoli Decentralizzati</h4>
              <p className="text-neutral-600">
                Una volta che l&apos;evento è concluso, il risultato viene verificato in modo decentralizzato tramite oracoli, che forniscono dati affidabili e non manipolabili alla piattaforma per determinare il risultato del mercato.
              </p>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Categorie di Mercati</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Politica</h4>
              <List>
                <li>Elezioni presidenziali</li>
                <li>Referendum</li>
                <li>Politiche pubbliche</li>
                <li>Risultati elettorali</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Sport</h4>
              <List>
                <li>Campionati di calcio</li>
                <li>Olimpiadi</li>
                <li>Eventi sportivi</li>
                <li>Risultati atletici</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Economia</h4>
              <List>
                <li>Indici di mercato</li>
                <li>Tassi di interesse</li>
                <li>Inflazione</li>
                <li>PIL e indicatori</li>
              </List>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Crypto & Tech</h4>
              <List>
                <li>Prezzi delle criptovalute</li>
                <li>Lancio di prodotti tech</li>
                <li>Adozione blockchain</li>
                <li>Regolamentazioni</li>
              </List>
            </div>
          </div>
        </SectionBody>

        <SectionTitle>Come Partecipare all&apos;Airdrop</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Strategie di Base">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Attività di Trading</h4>
                <List>
                  <li>Partecipa regolarmente ai mercati di previsione</li>
                  <li>Effettua scommesse su diversi eventi</li>
                  <li>Mantieni posizioni per periodi significativi</li>
                  <li>Partecipa a mercati ad alto volume</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Volume e Frequenza</h4>
                <List>
                  <li>Mantieni un volume di trading consistente</li>
                  <li>Effettua transazioni regolari nel tempo</li>
                  <li>Partecipa a diverse categorie di mercati</li>
                  <li>Interagisci con la community</li>
                </List>
              </div>
            </div>
          </Accordion>
          
          <Accordion buttonText="Tutorial di Utilizzo">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Accesso a Polymarket</h4>
                <List>
                  <li>Visita <a href="https://polymarket.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">polymarket.com</a></li>
                  <li>Clicca su &quot;Connect Wallet&quot; per collegare MetaMask</li>
                  <li>Assicurati di essere sulla rete Polygon</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Deposito di Fondi</h4>
                <List>
                  <li>Clicca su &quot;Deposit&quot; in alto a destra</li>
                  <li>Deposita USDC sulla rete Polygon</li>
                  <li>Attendi la conferma della transazione</li>
                  <li>Verifica i fondi disponibili</li>
                </List>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Partecipazione ai Mercati</h4>
                <List>
                  <li>Naviga tra le categorie o clicca su &quot;All&quot;</li>
                  <li>Scegli un mercato di tuo interesse</li>
                  <li>Analizza le probabilità e le informazioni</li>
                  <li>Clicca su &quot;Buy&quot; o &quot;Sell&quot; per partecipare</li>
                  <li>Firma la transazione in MetaMask</li>
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
              <a href="https://polymarket.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Sito Ufficiale Polymarket
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-blue-600">🐦</span>
              <a href="https://x.com/Polymarket" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Twitter/X Ufficiale
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-green-600">📊</span>
              <a href="https://polymarket.com/markets" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Mercati Attivi
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-600">📈</span>
              <a href="https://polymarket.com/portfolio" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Portfolio Dashboard
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-orange-600">📚</span>
              <a href="https://docs.polymarket.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-800 underline">
                Documentazione
              </a>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
