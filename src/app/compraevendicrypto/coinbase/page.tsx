import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionTutorial } from "@/components/SectionTutorial";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageTitle } from "@/components/PageTitle";
import { ExploreWeb3 } from "@/components/ExploreWeb3";
import Image from "next/image";

export default function Coinbase() {
  return (
    <ProtectedRoute title="Coinbase">
      <PageTitle description="La più grande exchange di criptovalute quotata in borsa">
        Coinbase
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <div>
            <p>
              <strong>Coinbase</strong> è uno degli exchange più grandi del mondo e l'unico a essere quotato al Nasdaq. Questa caratteristica lo porta a essere relativamente stabile e regolamentato, garantendo maggior sicurezza al cliente rispetto ad altre exchange.
            </p>
            <br />
            <p>
              Fondata nel 2012, Coinbase ha costruito la sua reputazione sulla facilità d'uso e la sicurezza, rendendo l'accesso alle criptovalute semplice per milioni di utenti in tutto il mondo.
            </p>
            
            <Accordion buttonText="Caratteristiche principali di Coinbase">
              <List ordered={true}>
                <li className="text-neutral-900">
                  <strong>Exchange Regolamentata:</strong>
                  <List>
                    <li className="text-neutral-900">
                      Quotata al Nasdaq, garantendo trasparenza e stabilità finanziaria
                    </li>
                    <li className="text-neutral-900">
                      Conformità alle normative statunitensi e internazionali
                    </li>
                    <li className="text-neutral-900">
                      Assicurazione sui fondi degli utenti fino a $250.000
                    </li>
                  </List>
                </li>
                <li className="text-neutral-900">
                  <strong>Piattaforma di Trading:</strong>
                  <List>
                    <li className="text-neutral-900">
                      Supporta oltre 200 criptovalute diverse
                    </li>
                    <li className="text-neutral-900">
                      Trading spot e derivati per investitori di tutti i livelli
                    </li>
                    <li className="text-neutral-900">
                      App mobile user-friendly per trading on-the-go
                    </li>
                  </List>
                </li>
                <li className="text-neutral-900">
                  <strong>Servizi Aggiuntivi:</strong>
                  <List>
                    <li className="text-neutral-900">
                      Coinbase Earn per guadagnare interessi sulle criptovalute
                    </li>
                    <li className="text-neutral-900">
                      Coinbase Credit per prestiti garantiti da crypto
                    </li>
                    <li className="text-neutral-900">
                      Marketplace NFT integrato
                    </li>
                    <li className="text-neutral-900">
                      Carta di debito Visa per spendere crypto nel mondo reale
                    </li>
                  </List>
                </li>
                <li className="text-neutral-900">
                  <strong>Sicurezza:</strong>
                  <List>
                    <li className="text-neutral-900">
                      Cold storage per il 98% dei fondi degli utenti
                    </li>
                    <li className="text-neutral-900">
                      Autenticazione a due fattori (2FA) obbligatoria
                    </li>
                    <li className="text-neutral-900">
                      Assicurazione sui depositi fino a $250.000
                    </li>
                    <li className="text-neutral-900">
                      Monitoraggio 24/7 per attività sospette
                    </li>
                  </List>
                </li>
              </List>
            </Accordion>

            <Accordion buttonText="Coinbase Pro (Trading Avanzato)">
              <div className="space-y-3">
                <p className="text-neutral-900">
                  <strong>Coinbase Pro</strong> è una piattaforma di trading professionale offerta da Coinbase, caratterizzata da funzionalità avanzate e commissioni ridotte.
                </p>
                <p className="text-neutral-900">
                  <strong>Caratteristiche principali:</strong>
                </p>
                <List>
                  <li className="text-neutral-900"><strong>Strumenti di Trading Avanzati:</strong> Order book in tempo reale, strumenti di grafici, cronologia transazioni</li>
                  <li className="text-neutral-900"><strong>Commissioni Ridotte:</strong> Tariffe basate sul volume di trading, più convenienti rispetto alla piattaforma standard</li>
                  <li className="text-neutral-900"><strong>Tipi di Ordine Diversificati:</strong> Supporta ordini market, limit e stop per strategie diverse</li>
                  <li className="text-neutral-900"><strong>Accesso API:</strong> Permette agli sviluppatori di integrare funzionalità di trading in applicazioni personalizzate</li>
                  <li className="text-neutral-900"><strong>Sicurezza Avanzata:</strong> Autenticazione a due fattori e cold storage per asset digitali</li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText="Coinbase Wallet (Portafoglio Non-Custodial)">
              <div className="space-y-3">
                <p className="text-neutral-900">
                  <strong>Coinbase Wallet</strong> è un'app mobile e un'estensione browser che permette agli utenti di gestire le proprie criptovalute e interagire con applicazioni decentralizzate (dApp).
                </p>
                <p className="text-neutral-900">
                  <strong>Caratteristiche principali:</strong>
                </p>
                <List>
                  <li className="text-neutral-900"><strong>Gestione Criptovalute:</strong> Supporta una vasta gamma di criptovalute con invio, ricezione e storage sicuri</li>
                  <li className="text-neutral-900"><strong>Interazione dApp:</strong> Permette agli utenti di esplorare e interagire con dApp direttamente dall'app</li>
                  <li className="text-neutral-900"><strong>Sicurezza:</strong> Le chiavi private sono memorizzate sul dispositivo dell'utente con backup sicuri tramite frasi di recupero</li>
                  <li className="text-neutral-900"><strong>Estensione Browser:</strong> Fornisce accesso facile alle dApp direttamente dal browser</li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText="Coinbase Card (Carta di Debito)">
              <div className="space-y-3">
                <p className="text-neutral-900">
                  La <strong>Carta Coinbase</strong> è una carta di debito Visa che ti permette di spendere criptovalute e valute locali ovunque sia accettata Visa.
                </p>
                
                <div className="my-6 flex justify-center">
                  <Image
                    src="/coinbasecard.png"
                    alt="Coinbase Card"
                    width={400}
                    height={250}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                
                <p className="text-neutral-900">
                  <strong>Caratteristiche principali:</strong>
                </p>
                <List>
                  <li className="text-neutral-900"><strong>Spesa Universale:</strong> Usa la carta per acquisti e prelievi ATM in oltre 40 milioni di località che accettano Visa</li>
                  <li className="text-neutral-900"><strong>Nessuna Commissione Nascosta:</strong> La carta non ha commissioni di spesa e non richiede controlli del credito</li>
                  <li className="text-neutral-900"><strong>Ricompense Crypto:</strong> Guadagna ricompense crypto su ogni acquisto, con possibilità di scegliere e cambiare ricompense in qualsiasi momento</li>
                  <li className="text-neutral-900"><strong>Sicurezza Avanzata:</strong> Include blocco carta, cambio PIN e autenticazione a due fattori</li>
                </List>
              </div>
            </Accordion>
          </div>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <div className="space-y-4">
            <p className="text-neutral-900">
              Segui i nostri tutorial step-by-step per imparare come utilizzare Coinbase in modo sicuro ed efficace:
            </p>
            
            <Accordion buttonText="Come Creare un Account Coinbase">
              <div className="space-y-3">
                <List ordered={true}>
                  <li>Visita il sito ufficiale di Coinbase (<a href="https://coinbase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">coinbase.com</a>)</li>
                  <li>Clicca su "Registrati" e inserisci le tue informazioni personali</li>
                  <li>Verifica la tua email e crea una password sicura</li>
                  <li>Completa la verifica dell'identità (KYC) caricando un documento d'identità</li>
                  <li>Abilita l'autenticazione a due fattori (2FA) per maggiore sicurezza</li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText="Come Acquistare la Prima Criptovaluta">
              <div className="space-y-3">
                <List ordered={true}>
                  <li>Collega il tuo conto bancario o carta di debito</li>
                  <li>Vai alla sezione "Compra/Vendi"</li>
                  <li>Scegli la criptovaluta che vuoi acquistare (es. Bitcoin, Ethereum)</li>
                  <li>Inserisci l'importo in euro o in criptovaluta</li>
                  <li>Rivedi i dettagli e conferma l'acquisto</li>
                  <li>Le tue criptovalute appariranno nel tuo portafoglio Coinbase</li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText="Come Trasferire Crypto al Wallet Non-Custodial">
              <div className="space-y-3">
                <List ordered={true}>
                  <li>Installa un wallet non-custodial come MetaMask o Coinbase Wallet</li>
                  <li>Copia l'indirizzo del tuo wallet (inizia con 0x per Ethereum)</li>
                  <li>Su Coinbase, vai a "Invia" e seleziona la criptovaluta</li>
                  <li>Incolla l'indirizzo del wallet di destinazione</li>
                  <li>Inserisci l'importo da trasferire</li>
                  <li>Conferma la transazione e attendi la conferma sulla blockchain</li>
                </List>
              </div>
            </Accordion>

            <Accordion buttonText="Come Utilizzare Coinbase Pro">
              <div className="space-y-3">
                <List ordered={true}>
                  <li>Accedi a Coinbase Pro con le stesse credenziali di Coinbase</li>
                  <li>Deposita fondi dalla tua banca o da Coinbase</li>
                  <li>Scegli la coppia di trading (es. BTC/EUR)</li>
                  <li>Seleziona il tipo di ordine (Market, Limit, Stop)</li>
                  <li>Inserisci quantità e prezzo, poi conferma l'ordine</li>
                  <li>Monitora le tue posizioni aperte nella sezione "Ordini"</li>
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
