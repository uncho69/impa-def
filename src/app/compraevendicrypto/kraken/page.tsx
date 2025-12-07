import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionTutorial } from "@/components/SectionTutorial";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageTitle } from "@/components/PageTitle";
import { ExploreWeb3 } from "@/components/ExploreWeb3";

export default function Kraken() {
  return (
    <ProtectedRoute title="Kraken">
      <PageTitle description="Una delle exchange più rispettate e sicure al mondo">
        Kraken
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <div>
            <p>
              <strong>Kraken</strong> è una delle più grandi e rispettate exchange di criptovalute a livello globale, fondata nel 2011 da Jesse Powell. È nota per la sua sicurezza, affidabilità e varietà di servizi offerti.
            </p>
            <br />
            <p>
              Con oltre un decennio di esperienza nel settore, Kraken ha costruito la sua reputazione sulla trasparenza, la sicurezza e l'innovazione, diventando una scelta preferita sia per i trader principianti che per quelli esperti.
            </p>
            
            <Accordion buttonText="Caratteristiche principali di Kraken">
              <List ordered={true}>
                <li className="text-neutral-900">
                  <strong>Sicurezza e Affidabilità:</strong>
                  <List>
                    <li className="text-neutral-900">
                      Fondata nel 2011, una delle exchange più longeve del settore
                    </li>
                    <li className="text-neutral-900">
                      Cold storage per il 95% dei fondi degli utenti
                    </li>
                    <li className="text-neutral-900">
                      Mai subito un hack significativo nella sua storia
                    </li>
                    <li className="text-neutral-900">
                      Conformità alle normative internazionali
                    </li>
                  </List>
                </li>
                <li className="text-neutral-900">
                  <strong>Varietà di Servizi:</strong>
                  <List>
                    <li className="text-neutral-900">
                      Supporta oltre 230 criptovalute diverse
                    </li>
                    <li className="text-neutral-900">
                      Trading spot, margin e futures
                    </li>
                    <li className="text-neutral-900">
                      Servizi di custodia per investitori istituzionali
                    </li>
                    <li className="text-neutral-900">
                      Trading OTC per transazioni di grandi dimensioni
                    </li>
                  </List>
                </li>
                <li className="text-neutral-900">
                  <strong>Piattaforme di Trading:</strong>
                  <List>
                    <li className="text-neutral-900">
                      Kraken Pro per trader avanzati con strumenti professionali
                    </li>
                    <li className="text-neutral-900">
                      App mobile per iOS e Android
                    </li>
                    <li className="text-neutral-900">
                      Interfaccia web user-friendly per principianti
                    </li>
                    <li className="text-neutral-900">
                      API completa per trading programmatico
                    </li>
                  </List>
                </li>
                <li className="text-neutral-900">
                  <strong>Supporto Clienti:</strong>
                  <List>
                    <li className="text-neutral-900">
                      Supporto clienti disponibile 24/7
                    </li>
                    <li className="text-neutral-900">
                      Assistenza via chat live e telefono
                    </li>
                    <li className="text-neutral-900">
                      Centro di supporto con guide dettagliate
                    </li>
                    <li className="text-neutral-900">
                      Community attiva e forum di supporto
                    </li>
                  </List>
                </li>
              </List>
            </Accordion>

            <Accordion buttonText="Kraken Pro (Trading Avanzato)">
              <div className="space-y-3">
                <p className="text-neutral-900">
                  <strong>Kraken Pro</strong> è una piattaforma di trading avanzata che offre funzionalità professionali come ordini limit, stop, margin trading e futures, con commissioni ridotte e strumenti avanzati per trader esperti.
                </p>
                <p className="text-neutral-900">
                  <strong>Caratteristiche principali:</strong>
                </p>
                <List>
                  <li className="text-neutral-900"><strong>Strumenti di Trading Professionali:</strong> Order book in tempo reale, grafici avanzati, indicatori tecnici</li>
                  <li className="text-neutral-900"><strong>Commissioni Ridotte:</strong> Tariffe competitive basate sul volume di trading</li>
                  <li className="text-neutral-900"><strong>Tipi di Ordine Diversificati:</strong> Market, Limit, Stop Loss, Take Profit per strategie complesse</li>
                  <li className="text-neutral-900"><strong>Margin Trading:</strong> Trading con leva fino a 5x per massimizzare i profitti</li>
                  <li className="text-neutral-900"><strong>Futures Trading:</strong> Accesso ai mercati futures con leva fino a 50x</li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText="Margin Trading">
              <div className="space-y-3">
                <p className="text-neutral-900">
                  Il <strong>Margin Trading</strong> su Kraken permette agli utenti di fare trading con leva fino a 5x, aumentando sia i potenziali profitti che i rischi.
                </p>
                <p className="text-neutral-900">
                  <strong>Come funziona:</strong>
                </p>
                <List>
                  <li className="text-neutral-900"><strong>Attivazione:</strong> Abilita il margin trading nelle impostazioni dell'account</li>
                  <li className="text-neutral-900"><strong>Selezione Coppia:</strong> Scegli la coppia di trading desiderata (es. BTC/USD)</li>
                  <li className="text-neutral-900"><strong>Impostazione Leva:</strong> Seleziona il livello di leva (fino a 5x)</li>
                  <li className="text-neutral-900"><strong>Gestione Posizioni:</strong> Monitora posizioni aperte, prezzi di liquidazione e P&L</li>
                  <li className="text-neutral-900"><strong>Chiusura Posizione:</strong> Chiudi manualmente o imposta stop-loss/take-profit automatici</li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText="Servizi Aggiuntivi">
              <div className="space-y-3">
                <p className="text-neutral-900">
                  Kraken offre una gamma completa di servizi per soddisfare le esigenze di diversi tipi di utenti.
                </p>
                <List>
                  <li className="text-neutral-900"><strong>Custodia:</strong> Soluzioni di custodia sicure per investitori istituzionali</li>
                  <li className="text-neutral-900"><strong>Trading OTC:</strong> Servizi over-the-counter per transazioni di grandi dimensioni</li>
                  <li className="text-neutral-900"><strong>Futures Trading:</strong> Trading di contratti futures con leva fino a 50x</li>
                  <li className="text-neutral-900"><strong>Staking:</strong> Servizi di staking per guadagnare ricompense (limitato per clienti USA)</li>
                  <li className="text-neutral-900"><strong>API Trading:</strong> API completa per trading programmatico e bot</li>
                </List>
              </div>
            </Accordion>
          </div>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <div className="space-y-4">
            <p className="text-neutral-900">
              Segui i nostri tutorial step-by-step per imparare come utilizzare Kraken in modo sicuro ed efficace:
            </p>
            
            <Accordion buttonText="Come Creare un Account Kraken">
              <div className="space-y-3">
                <List ordered={true}>
                  <li>Visita il sito ufficiale di Kraken (kraken.com)</li>
                  <li>Clicca su "Crea Account" e inserisci le tue informazioni</li>
                  <li>Verifica la tua email e crea una password sicura</li>
                  <li>Completa la verifica dell'identità (KYC) con documento d'identità e prova di residenza</li>
                  <li>Abilita l'autenticazione a due fattori (2FA) per maggiore sicurezza</li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText="Come Acquistare Criptovalute su Kraken">
              <div className="space-y-3">
                <List ordered={true}>
                  <li>Vai alla sezione "Funding" e deposita fondi</li>
                  <li>Scegli il metodo di deposito (bonifico bancario, carta di credito, crypto)</li>
                  <li>Vai alla sezione "Trade" e seleziona la coppia di trading (es. BTC/EUR)</li>
                  <li>Scegli il tipo di ordine: Market (acquisto immediato) o Limit (prezzo specifico)</li>
                  <li>Inserisci l'importo e conferma l'acquisto</li>
                  <li>Le tue criptovalute appariranno nel tuo portafoglio Kraken</li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText="Come Vendere Criptovalute su Kraken">
              <div className="space-y-3">
                <List ordered={true}>
                  <li>Vai alla sezione "Trade" e seleziona la coppia di trading (es. BTC/EUR)</li>
                  <li>Scegli tra ordine Market (vendita immediata) o Limit (prezzo specifico)</li>
                  <li>Inserisci l'importo di criptovaluta che vuoi vendere</li>
                  <li>Conferma l'ordine di vendita</li>
                  <li>Una volta completata la vendita, vai a "Funding" per prelevare i fondi</li>
                  <li>Seleziona il metodo di prelievo (bonifico bancario, carta) e conferma</li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText="Come Utilizzare Kraken Pro">
              <div className="space-y-3">
                <List ordered={true}>
                  <li>Accedi a Kraken Pro tramite il dashboard principale</li>
                  <li>Scegli la coppia di trading desiderata dalla sezione mercati</li>
                  <li>Imposta il tuo ordine: Limit (prezzo specifico), Market (prezzo corrente), Stop Loss/Take Profit</li>
                  <li>Monitora e esegui i trade usando strumenti di grafici e indicatori</li>
                  <li>Gestisci gli ordini aperti nella scheda "Ordini"</li>
                  <li>Utilizza funzionalità avanzate come Margin Trading e Futures (opzionale)</li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText="Come Fare Margin Trading">
              <div className="space-y-3">
                <List ordered={true}>
                  <li>Abilita il margin trading nelle impostazioni dell'account</li>
                  <li>Accetta i termini e le condizioni per il margin trading</li>
                  <li>Vai alla piattaforma Kraken Pro e scegli la coppia di trading</li>
                  <li>Seleziona "Margin" dalle opzioni del tipo di ordine</li>
                  <li>Imposta il livello di leva (fino a 5x) e conferma l'ordine</li>
                  <li>Monitora le posizioni aperte e i prezzi di liquidazione</li>
                  <li>Chiudi la posizione manualmente o imposta stop-loss automatici</li>
                </List>
              </div>
            </Accordion>
          </div>
        </SectionBody>
        <ExploreWeb3 />
      </MobileContainer>
    </ProtectedRoute>
  );
}