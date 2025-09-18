import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { PageLayout } from "@/components/PageLayout";
import Link from "next/link";
// Removed unused imports

export default function manuale() {
  return (
    <PageLayout 
      title="Manuale A-Z" 
      description="Guida completa al mondo Web3, crypto e DeFi dalla A alla Z"
    >
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
              <p className="text-neutral-700 mb-6">
                Cosa sono le criptovalute? Cos&apos;è il metaverso, il mondo Web3, la DeFi e l&apos;economia digitale?
              </p>
              <p className="text-neutral-700 mb-6">
                Per iniziare, dovete sapere che a noi interessa usare questo mondo digitale per gli enormi vantaggi e benefici che comporta, come ad esempio:
              </p>
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 mb-8">
                <List>
                  <li><b>Conservare il denaro</b> in maniera sicura ed incensurabile</li>
                  <li><b>Inviare denaro istantaneamente</b> a costo quasi zero</li>
                  <li><b>Ottenere rendimenti più alti</b> sui propri risparmi in totale autonomia e sicurezza</li>
                </List>
              </div>
              <p className="text-neutral-700 mb-6">
                Ci sono diverse Blockchain, ognuna per un caso specifico. Ma non spaventatevi, perché a noi interessano al massimo una dozzina di queste, tra cui alcune Layer2 di Ethereum ed i loro ecosistemi di progetti.
              </p>
              
              <Accordion buttonText={"Cos'è una Blockchain?"} className="mb-4">
                <p className="p-5">
                  Una blockchain è una tecnologia che funziona come un registro
                  digitale distribuito su una rete di computer. Ogni dato o
                  transazione inserito viene organizzato in blocchi collegati tra loro
                  in ordine cronologico tramite crittografia, garantendo
                  l&apos;immutabilità dei dati.
                  <br />
                  <br />
                  Le blockchain sono decentralizzate, il che significa che non
                  c&apos;è un&apos;autorità centrale che gestisce le informazioni,
                  rendendo i dati sicuri, trasparenti e resistenti alla manipolazione.
                  Questo è uno dei motivi per cui la blockchain è alla base di molte
                  criptovalute, come Bitcoin, che garantiscono sovranità monetaria:
                  permettono a chiunque di possedere, trasferire e gestire il proprio
                  denaro senza bisogno di banche o intermediari, offrendo una forma di
                  libertà economica indipendente da governi o istituzioni.
                  <br />
                  <br />
                  Oltre alla funzione monetaria, la blockchain è anche una piattaforma
                  per creare applicazioni decentralizzate (dApp) grazie a reti come
                  Ethereum. Le dApp operano su contratti intelligenti, ovvero
                  programmi autoeseguibili che funzionano su blockchain senza il
                  bisogno di intermediari. Ethereum, ad esempio, consente agli
                  sviluppatori di creare soluzioni decentralizzate che spaziano dalla
                  finanza alla gestione di identità digitali, garantendo trasparenza e
                  sicurezza senza l&apos;intervento di un&apos;autorità centrale.
                  Questa tecnologia sta trasformando settori come quello finanziario,
                  legale e artistico, aprendo la strada a nuovi modelli di governance,
                  economia e innovazione.
                  <br />
                </p>
              </Accordion>
              
              <div className="mt-4">
                <Link href="/blockchain">
                  <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    Vai a Blockchain
                  </div>
                </Link>
              </div>
            </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
            <p className="text-neutral-700 mb-6">
              Ogni Blockchain ha il proprio ecosistema di applicazioni, ed è importante saper riconoscere quali sono le migliori per poter gestire al meglio le proprio risorse (tempo e denaro).
            </p>
            
            <Accordion
              buttonText={"Cosa sono le applicazioni decentralizzate (DeFi)"}
              className="mb-4"
            >
              <p className="p-5">
                Le applicazioni decentralizzate (o dApp) sono programmi che
                funzionano su una rete blockchain, invece che su server
                centralizzati. A differenza delle applicazioni tradizionali, che
                dipendono da un&apos;entità centrale (come una società o un server),
                le dApp operano su reti distribuite, rendendole più sicure,
                trasparenti e resistenti alla censura. Le dApp utilizzano smart
                contract, che sono contratti programmabili auto-eseguibili su
                blockchain. Una volta impostati, questi contratti funzionano
                autonomamente secondo le regole stabilite nel codice, senza bisogno
                di intermediari per far rispettare gli accordi. Un esempio noto di
                dApp è Uniswap, un exchange decentralizzato che permette agli utenti
                di scambiare criptovalute direttamente tra di loro, senza bisogno di
                piattaforme centralizzate. Altri esempi includono applicazioni per
                la finanza decentralizzata (DeFi), giochi blockchain, marketplace
                NFT e molto altro.
              </p>
            </Accordion>
            
            <div className="mt-4">
              <Link href="/defi">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Vai a DeFi
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
            <p className="text-neutral-700 mb-6">
              Per accedere a queste applicazioni, bisogna avere un portafogli (wallet) non-custodial, che si trova sotto forma di app su dispositivi mobile oppure come estensione chrome per il computer.
            </p>
            
            <Accordion
              buttonText={"Cosa sono i wallet non-custodial"}
              className="mb-4"
            >
              <p className="p-5">
                Il portafoglio ("wallet") non-custodial è un portafoglio virtuale utilizzato per ricevere, inviare, e conservare le criptovalute. Viene indicato anche come "self-custody wallet", che significa "a custodia personale".
                <br />
                <br />
                A differenza degli exchange, o delle banche, dove l'intestatario del conto può vedersi il conto bloccato/congelato, o dove la banca/exchange può andare fallita e l'utente perdere i propri risparmi, il wallet non-custodial offre all'utente il <b>pieno controllo delle chiavi private e dei fondi in esso custoditi</b>, senza coinvolgere soggetti esterni.
                <br />
                <br />
                Con il wallet non-custodial, è l'utente stesso ad avere la piena responsabilità delle proprie chiavi private e pertanto deve prendere le precauzioni necessarie per non perdere irrimediabilmente la possibilità di accedere alle proprie monete.
              </p>
            </Accordion>
            
            <div className="mt-4">
              <Link href="/wallet">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Vai a Wallet
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
            <p className="text-neutral-700 mb-6">
              Per ottenere le criptovalute da mandare al proprio wallet non-custodial, sarà necessario ottenerle tramite un exchange centralizzata (come Coinbase o Binance), altrimenti utilizzando un on-ramp (come Transak o Moonpay).
            </p>
            <p className="text-neutral-700 mb-6">
              Una volta acquistate le criptovalute con la propria carta o facendo un bonifico, si potranno inviare al proprio wallet non-custodial, dove saranno al sicuro da rischi esterni e sotto al vostro esclusivo controllo.
            </p>
            
            <Accordion
              buttonText={"Come accedere al mondo Web3"}
              className="mb-4"
            >
              <p className="p-5">
                <b>1. CEX (Centralized Exchanges)</b>
                <br />
                <br />
                Gli exchange centralizzati (CEX) permettono di inviare fondi dal proprio conto bancario o carta di debito per convertirli nella criptovaluta scelta. Gli exchange permettono anche di fare trading di criptovalute, cosa che sconsigliamo. Una volta convertiti i fondi, inviateli al vostro wallet non-custodial sulla blockchain della criptovaluta scelta.
                <br />
                <br />
                <b>2. On-Ramp</b>
                <br />
                <br />
                Gli On-Ramp sono servizi che permettono di acquistare criptovalute direttamente con la propria carta e riceverle immediatamente nel proprio wallet non-custodial (chiamato anche "wallet web3"). Il wallet non-custodial vi dà il controllo completo dei vostri fondi tramite le chiavi private, che dovrete tenere al sicuro per riaccedere ai vostri fondi in caso di smarrimento del dispositivo o dimenticanza della password.
              </p>
            </Accordion>
            
            <div className="mt-4">
              <Link href="/compraevendicrypto">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Vai a Compra e vendi crypto
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
            <p className="text-neutral-700 mb-6">
              Adesso che siamo riusciti ad accedere al mondo Web3, e abbiamo visto quali sono le applicazioni migliori che fanno al caso nostro, possiamo iniziare ad intraprendere le seguenti strade:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-neutral-700">
                  Assistere/Partecipare allo sviluppo dei progetti e/o delle community che ci interessano seguendo i canali social e le discussioni sulla governance (sui forum ufficiali e su discord).
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-neutral-700">
                  Acquistare Ethereum (ETH) ed inviarlo al proprio wallet non-custodial, per poi accedere alla DeFi
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-neutral-700">
                  Acquistare un NFT ed accedere ad una community internazionale di gente pronta a supportare altri membri della propria community
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
            <p className="text-neutral-700 mb-6">
              Esistono molti strumenti diversi che possiamo utilizzare per analizzare i progetti. Dai più semplici Navigatori di Blockchain ("blockchain explorers"), alle piattaforme di analisi e visualizzazione dei dati; saper utilizzare questi strumenti può offrire una marcia in più nella valutazione dei propri acquisti nel mondo Web3.
            </p>
            
            <div className="mt-4">
              <Link href="/strumenti-utili">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Vai a Strumenti Utili
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
            <h3 className="text-2xl font-bold text-neutral-800 mb-6">Valutazione dei progetti</h3>
            
            <div className="space-y-4">
              <Accordion
                buttonText="Analizzare un Cryptoasset dalla Market Cap"
                className="mb-4"
              >
                <p className="p-5">
                  [Contenuto da aggiungere]
                </p>
              </Accordion>
              
              <Accordion
                buttonText="Calcolare il Rischio di un Cryptoasset usando la Media del Prezzo"
                className="mb-4"
              >
                <p className="p-5">
                  [Contenuto da aggiungere]
                </p>
              </Accordion>
              
              <Accordion
                buttonText="TVL to Market Cap ratio (rapporto tra valore depositato e capitalizzazione)"
                className="mb-4"
              >
                <p className="p-5">
                  [Contenuto da aggiungere]
                </p>
              </Accordion>
              
              <Accordion
                buttonText="Price Action (Analisi Tecnica)"
                className="mb-4"
              >
                <p className="p-5">
                  [Contenuto da aggiungere]
                </p>
              </Accordion>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
            <p className="text-neutral-700 mb-6">
              Gli NFT sono uno dei settori ancora meno sviluppati all&apos;interno del mondo Web3. Se ne è sentito molto parlare negli anni scorsi per via di progetti buoni che ancora esistono (come i Crypto Punk, i Pudgy Penguin, i Bored Ape..) ma anche per i molti scam che ci sono stati (come purtroppo accade in tutti i settori nascenti, anche non-Web3, quindi non preoccupatevi o per lo meno, prestate attenzione).
            </p>
            <p className="text-neutral-700 mb-6">
              Possono essere collezioni di PFP (profile pictures), arte digitale, arte tradizionale tokenizzata, o addirittura interi immobili, e molto altro ancora.
            </p>
            
            <Accordion
              buttonText="Come scegliere la propria community NFT"
              className="mb-4"
            >
              <p className="p-5">
                [Contenuto da aggiungere]
              </p>
            </Accordion>
            
            <div className="mt-4">
              <Link href="/nft">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Vai a NFT
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
            <p className="text-neutral-700 mb-6">
              È <span className="text-red-600 font-bold">importantissimo prestare molta attenzione</span> a non cadere in truffe di vario genere come <em>Phishing</em> o <em>Scam</em>. Ci sono diversi modi in cui si può perdere il proprio denaro cadendo vittima di truffe che purtroppo, sono presenti anche in questo lato del web. Seguendo i consigli che troverai nel manuale Anti Truffe qui sotto, sarai in grado di navigare questo mondo minimizzando i rischi.
            </p>
            
            <Accordion
              buttonText={
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Manuale per evitare truffe
                </div>
              }
              className="mb-4"
            >
              <div className="p-5 space-y-6">
                <p className="text-neutral-700">
                  Il mondo delle criptovalute offre enormi opportunità, ma è anche terreno fertile per truffatori. Ecco una guida su come proteggerti dalle truffe, basata su consigli di esperti del settore.
                </p>

                <div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-3">1. Ricerca Approfondita</h4>
                  <p className="text-neutral-700">
                    Prima di investire in qualsiasi criptovaluta o progetto, è fondamentale fare una ricerca approfondita. Leggi il whitepaper del progetto, verifica l&apos;identità del team dietro il progetto e cerca recensioni e analisi indipendenti. Progetti con team anonimi o senza documentazione chiara sono da considerare sospetti.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-3">2. Utilizza Solo Wallet Reputati</h4>
                  <p className="text-neutral-700">
                    Assicurati che i wallet che scarichi provengano da fonti affidabili. Evita di installare wallet da link ricevuti via email o messaggi privati, poiché potrebbero essere falsi e progettati per rubare le tue criptovalute. Verifica sempre che il wallet sia ufficiale e controlla le recensioni degli utenti.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-3">3. Attenzione ai Link Malevoli</h4>
                  <p className="text-neutral-700">
                    I link malevoli possono infettare il tuo dispositivo con malware o portarti su siti fasulli che possono drenare i tuoi fondi. Verifica sempre i link accedendo direttamente dal sito ufficiale o dai canali social ufficiali del progetto. Tratta ogni link ricevuto da sconosciuti con estrema cautela.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-3">4. Riconosci i Segnali di Allarme</h4>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700">
                    <li><strong>Promesse di Guadagni Elevati</strong>: Se un&apos;offerta sembra troppo bella per essere vera, probabilmente è una truffa. Nessuna piattaforma legittima garantisce rendimenti altissimi senza rischi.</li>
                    <li><strong>Mancanza di Trasparenza</strong>: Progetti che non forniscono informazioni chiare sul loro funzionamento, il team o i loro obiettivi sono sospetti.</li>
                    <li><strong>Senso di Urgenza</strong>: I truffatori spesso cercano di creare un senso di urgenza per farti agire senza riflettere. Le opportunità di investimento genuine non richiedono decisioni affrettate.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-3">5. Utilizza Exchange Reputati</h4>
                  <p className="text-neutral-700">
                    Quando compri, vendi o scambi criptovalute, usa solo exchange ben conosciuti e con una buona reputazione. Verifica che l&apos;exchange rispetti le normative, abbia una storia di sicurezza solida e offra protezioni come l&apos;assicurazione sui depositi.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-3">6. Proteggi i Tuoi Wallet</h4>
                  <p className="text-neutral-700">
                    Mantieni i tuoi software sempre aggiornati per proteggerti dalle vulnerabilità. Usa hardware wallet per conservare quantità significative di criptovalute e attiva l&apos;autenticazione a due fattori (2FA) dove possibile. Utilizza un &quot;burner&quot; wallet per le transazioni quotidiane, lasciando i fondi principali in un wallet separato e più sicuro.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-3">7. Evita le Truffe dei Falsi Airdrop</h4>
                  <p className="text-neutral-700">
                    I falsi airdrop sono una tattica comune per indurre le persone a rivelare le loro chiavi private o a firmare transazioni malevole. Partecipa solo a airdrop da fonti affidabili e verifica sempre l&apos;autenticità dell&apos;offerta tramite i canali ufficiali del progetto.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">
                    Seguendo questi consigli, puoi ridurre significativamente il rischio di cadere vittima di truffe nel mondo delle criptovalute e navigare questo spazio con maggiore sicurezza.
                  </p>
                </div>
              </div>
            </Accordion>
          </div>

    </PageLayout>
  );
}
