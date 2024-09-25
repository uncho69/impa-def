import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Ethereum</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <br />
          <Accordion buttonText="Passo 1: Installa MetaMask" defaultOpen={true}>
            <List ordered={true}>
              <li>
                <strong>Scarica MetaMask:</strong>
                <List>
                  <li>
                    Vai al sito{" "}
                    <Link
                      href={"https://metamask.io/"}
                      target="_blank"
                      className="underline"
                    >
                      MetaMask
                    </Link>{" "}
                    e scarica l&apos;estensione per il tuo browser preferito
                    (Chrome, Firefox, Brave o Edge).
                  </li>
                  <li>
                    Segui le istruzioni per aggiungere l&apos;estensione
                    MetaMask al tuo browser.
                  </li>
                </List>
              </li>
              <li>
                <strong>Crea un Nuovo Wallet:</strong>
                <List>
                  <li>
                    Apri l&apos;estensione MetaMask e clicca su
                    &quot;Inizia&quot;.
                  </li>
                  <li>Scegli &quot;Crea un portafoglio&quot;.</li>
                  <li>
                    Imposta una password sicura e clicca su &quot;Crea&quot;.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Passo 2: Salva la Tua Chiave Privata e la Frase Seed">
            <List ordered={true}>
              <li>
                <strong>Backup della Frase Seed:</strong>
                <List>
                  <li>
                    MetaMask genererà una frase seed di 12 parole. Scrivila su
                    carta e conservala in un luogo sicuro. Questa frase è
                    cruciale per recuperare il tuo wallet se perdi
                    l&apos;accesso.
                  </li>
                  <li>
                    Conferma la tua frase seed selezionando le parole
                    nell&apos;ordine corretto.
                  </li>
                </List>
              </li>
              <li>
                <strong>Salva la Tua Chiave Privata:</strong>
                <List>
                  <li>
                    In MetaMask, clicca sull&apos;icona dell&apos;account e
                    seleziona &quot;Dettagli Account&quot;.
                  </li>
                  <li>
                    Clicca su &quot;Esporta chiave privata&quot;. Inserisci la
                    tua password e prendi nota della tua chiave privata.
                    Conservala in un luogo sicuro e non condividerla con
                    nessuno.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Passo 3: Carica Fondi nel Tuo Wallet">
            <List ordered={true}>
              <li>
                <strong>Acquista Ethereum:</strong>
                <List>
                  <li>
                    Puoi acquistare Ethereum su un exchange di criptovalute come
                    Coinbase, Binance o Kraken. Segui le istruzioni
                    dell&apos;exchange per acquistare Ethereum utilizzando
                    valuta fiat (USD, EUR, ecc.).
                  </li>
                </List>
              </li>
              <li>
                <strong>Invia Ethereum a MetaMask:</strong>
                <List>
                  <li>
                    Una volta acquistato Ethereum, vai al tuo account MetaMask e
                    copia il tuo indirizzo pubblico (inizia con &quot;0x&quot;).
                  </li>
                  <li>
                    Nell&apos;exchange, seleziona l&apos;opzione per inviare
                    Ethereum e incolla il tuo indirizzo MetaMask come
                    destinatario.
                  </li>
                  <li>
                    Conferma la transazione e attendi che i fondi appaiano nel
                    tuo wallet MetaMask.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Passo 4: Connettiti alle Applicazioni Decentralizzate (DApps)">
            <List ordered={true}>
              <li>
                <strong>Accedi alle DApps:</strong>
                <List>
                  <li>
                    Visita una DApp che desideri utilizzare, come{" "}
                    <Link
                      href={"https://uniswap.org/"}
                      target="_blank"
                      className="underline"
                    >
                      Uniswap
                    </Link>
                    ,{" "}
                    <Link
                      href={"https://aave.com/"}
                      target="_blank"
                      className="underline"
                    >
                      Aave
                    </Link>{" "}
                    o{" "}
                    <Link
                      href={"https://opensea.io/"}
                      target="_blank"
                      className="underline"
                    >
                      OpenSea
                    </Link>
                    .
                  </li>
                  <li>
                    Clicca sul pulsante per connettere il tuo wallet. Questo
                    pulsante potrebbe essere etichettato come &quot;Connetti
                    Wallet&quot; o qualcosa di simile.
                  </li>
                </List>
              </li>
              <li>
                <strong>Autorizza la Connessione:</strong>
                <List>
                  <li>
                    MetaMask si aprirà automaticamente e ti chiederà di
                    autorizzare la connessione della DApp al tuo wallet.
                  </li>
                  <li>Clicca su &quot;Connetti&quot; per autorizzare.</li>
                </List>
              </li>
              <li>
                <strong>Interagisci con la DApp:</strong>
                <List>
                  <li>
                    Una volta connesso, puoi iniziare a interagire con la DApp.
                    Ad esempio, su Uniswap, puoi scambiare token; su Aave, puoi
                    depositare e prendere in prestito criptovalute; su OpenSea,
                    puoi acquistare e vendere NFT.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Passo 5: Sicurezza">
            <List ordered={true}>
              <li>
                <strong>Usa Autenticazione a Due Fattori (2FA):</strong>
                <List>
                  <li>
                    Se l&apos;exchange che utilizzi supporta
                    l&apos;autenticazione a due fattori, attivala per una
                    maggiore sicurezza.
                  </li>
                </List>
              </li>
              <li>
                <strong>Mantieni Aggiornato il Tuo Software:</strong>
                <List>
                  <li>
                    Assicurati che il tuo browser e l&apos;estensione MetaMask
                    siano sempre aggiornati all&apos;ultima versione (gli le
                    estensioni avvengono in automatico a meno che non si hanno
                    disabilitati gli aggiornamenti in automatico sul proprio
                    browser).
                  </li>
                </List>
              </li>
              <li>
                <strong>Diffida dei Link Sospetti:</strong>
                <List>
                  <li>
                    Non cliccare su link sospetti o fornire la tua chiave
                    privata o frase seed a nessuno. MetaMask e le DApp legittime
                    non ti chiederanno mai queste informazioni.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
