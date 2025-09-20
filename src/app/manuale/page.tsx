import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { PageLayout } from "@/components/PageLayout";
import Link from "next/link";
import Image from "next/image";
// Removed unused imports

export default function manuale() {
  return (
    <PageLayout 
      title="Manuale A-Z" 
      description="Guida completa al mondo Web3, crypto e DeFi dalla A alla Z"
    >
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
              <p className="text-neutral-900 mb-6">
                Cosa sono le criptovalute? Cos&apos;è il metaverso, il mondo Web3, la DeFi e l&apos;economia digitale?
              </p>
              <p className="text-neutral-900 mb-6">
                Per iniziare, dovete sapere che a noi interessa usare questo mondo digitale per gli enormi vantaggi e benefici che comporta, come ad esempio:
              </p>
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 mb-8">
                <List>
                  <li><b>Conservare il denaro</b> in maniera sicura ed incensurabile</li>
                  <li><b>Inviare denaro istantaneamente</b> a costo quasi zero</li>
                  <li><b>Ottenere rendimenti più alti</b> sui propri risparmi in totale autonomia e sicurezza</li>
                </List>
              </div>
              <p className="text-neutral-900 mb-6">
                Ci sono diverse Blockchain, ognuna per un caso specifico. Ma non spaventatevi, perché a noi interessano al massimo una dozzina di queste, tra cui alcune Layer2 di Ethereum ed i loro ecosistemi di progetti.
              </p>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-blue-600 font-medium">💡 Clicca per espandere</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
                <Accordion buttonText={"Cos'è una Blockchain?"} className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
                <p className="p-5 text-neutral-900">
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
              </div>
              
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
            <p className="text-neutral-900 mb-6">
              Ogni Blockchain ha il proprio ecosistema di applicazioni, ed è importante saper riconoscere quali sono le migliori per poter gestire al meglio le proprio risorse (tempo e denaro).
            </p>
            
            <Accordion
              buttonText={"Cosa sono le applicazioni decentralizzate (DeFi)"}
              className="mb-4"
            >
              <p className="p-5 text-neutral-900">
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
            <p className="text-neutral-900 mb-6">
              Per accedere a queste applicazioni, bisogna avere un portafogli (wallet) non-custodial, che si trova sotto forma di app su dispositivi mobile oppure come estensione chrome per il computer.
            </p>
            
            <Accordion
              buttonText={"Cosa sono i wallet non-custodial"}
              className="mb-4"
            >
              <p className="p-5 text-neutral-900">
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
            <p className="text-neutral-900 mb-6">
              Per ottenere le criptovalute da mandare al proprio wallet non-custodial, sarà necessario ottenerle tramite un exchange centralizzata (come Coinbase o Binance), altrimenti utilizzando un on-ramp (come Transak o Moonpay).
            </p>
            <p className="text-neutral-900 mb-6">
              Una volta acquistate le criptovalute con la propria carta o facendo un bonifico, si potranno inviare al proprio wallet non-custodial, dove saranno al sicuro da rischi esterni e sotto al vostro esclusivo controllo.
            </p>
            
            <Accordion
              buttonText={"Come accedere al mondo Web3"}
              className="mb-4"
            >
              <p className="p-5 text-neutral-900">
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
            <p className="text-neutral-900 mb-6">
              Adesso che siamo riusciti ad accedere al mondo Web3, e abbiamo visto quali sono le applicazioni migliori che fanno al caso nostro, possiamo iniziare ad intraprendere le seguenti strade:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-neutral-900">
                  Assistere/Partecipare allo sviluppo dei progetti e/o delle community che ci interessano seguendo i canali social e le discussioni sulla governance (sui forum ufficiali e su discord).
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-neutral-900">
                  Acquistare Ethereum (ETH) ed inviarlo al proprio wallet non-custodial, per poi accedere alla DeFi
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-neutral-900">
                  Acquistare un NFT ed accedere ad una community internazionale di gente pronta a supportare altri membri della propria community
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
            <p className="text-neutral-900 mb-6">
              Esistono molti strumenti diversi che possiamo utilizzare per analizzare i progetti. Dai più semplici Navigatori di Blockchain ("blockchain explorers"), alle piattaforme di analisi e visualizzazione dei dati; saper utilizzare questi strumenti può offrire una marcia in più nella valutazione dei propri acquisti nel mondo Web3.
            </p>
            
            <div className="mt-4">
              <Link href="/strumentiutili">
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
                <div className="p-5 space-y-6">
                  <div className="space-y-4">
                    <p className="text-neutral-900 leading-relaxed">
                      Prima di tutto bisogna sapere che il prezzo di una criptovaluta è dettato dall'offerta della criptovaluta e la valutazione del progetto della criptovaluta (la capitalizzazione di mercato, o market cap).
                    </p>
                    <p className="text-neutral-900 leading-relaxed">
                      Inversamente, si può dire che la market cap della criptovaluta sia determinata dall'offerta moltiplicata per il prezzo della criptovaluta.
                    </p>
                    <p className="text-neutral-900 leading-relaxed">
                      Gli investitori ragionano con la market cap per poter determinare il potenziale di crescita di una criptovaluta rispetto ad un'altra.
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <Image 
                      src="/analizing.png" 
                      alt="Analisi Market Cap Bitcoin su CoinGecko"
                      width={800}
                      height={600}
                      className="max-w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  <Accordion
                    buttonText="Come funziona"
                    className="mb-3"
                  >
                    <div className="p-4 space-y-4 text-neutral-900">
                      <p className="mb-4">
                        La schermata sopra (accessibile da <a href="https://www.coingecko.com/it/monete/bitcoin" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.coingecko.com/it/monete/bitcoin</a>) mostra nei rettangoli evidenziati in blu le seguenti:
                      </p>
                      
                             <Accordion buttonText="1. Capitalizzazione di Mercato (Market Cap)">
                               <div className="p-4 space-y-4 text-neutral-900">
                                 <p>
                                   La capitalizzazione di mercato di un criptoasset si calcola usando la seguente formula:
                                 </p>
                                 
                                 <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                                   <p className="font-semibold mb-2">Consideriamo che:</p>
                                   <p><strong>A = Prezzo attuale dei criptoasset in USD</strong></p>
                                   <p><strong>B = Offerta in circolazione del criptoasset</strong></p>
                                   <div className="mt-3 p-3 bg-white rounded border">
                                     <p className="text-lg font-bold text-blue-700">
                                       Capitalizzazione di mercato = A × B
                                     </p>
                                   </div>
                                 </div>
                                 
                                 <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                   <p className="font-semibold mb-2">Esempio pratico con Bitcoin:</p>
                                   <p>
                                     Ad esempio, la capitalizzazione di mercato di Bitcoin viene calcolata moltiplicando l'Offerta disponibile di BTC per il suo prezzo. Vedendo che l'Offerta disponibile di BTC sia <strong>19.712.371</strong> e che il prezzo di BTC sia <strong>USD $66.147,70</strong>, la capitalizzazione di mercato viene quindi calcolata come:
                                   </p>
                                   <div className="mt-3 p-3 bg-white rounded border">
                                     <p className="text-lg font-bold text-green-700">
                                       19.712.371 × USD $66.147,70 = <span className="text-xl">USD 1.303.928.022.909</span>
                                     </p>
                                   </div>
                                 </div>
                               </div>
                             </Accordion>
                      
                      <Accordion buttonText="2. Valutazione 100% diluita (Fully diluted valuation, o FDV)">
                        <p className="p-4 text-neutral-900">
                          La FDV rappresenta la capitalizzazione di mercato se tutti i token fossero già in circolazione. È importante per capire il potenziale di inflazione futura e il vero valore del progetto.
                        </p>
                      </Accordion>
                      
                      <Accordion buttonText="3. Offerta in Circolazione (Circulating Supply)">
                        <p className="p-4 text-neutral-900">
                          La quantità di valute che circolano sul mercato e sono scambiabili dal pubblico. È paragonabile a guardare le azioni prontamente disponibili sul mercato (non detenute e bloccate dagli addetti ai lavori, dalle autorità governative).
                        </p>
                      </Accordion>
                      
                      <Accordion buttonText="4. Offerta totale">
                        <p className="p-4 text-neutral-900">
                          Le quantità di valute che sono già state create, meno le valute che sono state bruciate (rimosse dalla circolazione). È paragonabile alle azioni in circolazione nel mercato azionario.
                        </p>
                      </Accordion>
                      
                      <Accordion buttonText="5. Offerta Massima (Max Supply)">
                        <div className="p-4 space-y-4 text-neutral-900">
                          <p>
                            Il numero massimo di valute codificate per esistere nel periodo di vita della criptovaluta. È paragonabile al numero massimo di azioni emettibili nel mercato azionario.
                          </p>
                          
                          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <p className="font-semibold text-blue-800">
                              Offerta massima = massimo teorico programmato
                            </p>
                          </div>
                          
                          <p>
                            Ethereum (ETH) non ha un offerta massima per esempio, come puoi vedere sotto dal simbolo dell'infinito accanto all'offerta massima. (<a href="https://www.coingecko.com/it/monete/ethereum" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.coingecko.com/it/monete/ethereum</a>)
                          </p>
                          
                          <div className="flex justify-center">
                            <Image 
                              src="/analizing2.png" 
                              alt="Ethereum Max Supply su CoinGecko"
                              width={800}
                              height={400}
                              className="max-w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                          
                          <p>
                            Tuttavia, la quantità di ETH in circolazione è progressivamente diminuita da Settembre 2022, quando è avvenuto il Merge (ETH 2.0, passaggio da <em>POW</em>, Proof-of-Work a <em>POS</em>, Proof-of-Stake) come visibile dal grafico sotto.
                          </p>
                          
                          <p>
                            <a href="https://etherscan.io/chart/ethersupplygrowth" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://etherscan.io/chart/ethersupplygrowth</a>
                          </p>
                          
                          <div className="flex justify-center">
                            <Image 
                              src="/analizing3.png" 
                              alt="Ethereum Supply Growth Chart"
                              width={800}
                              height={400}
                              className="max-w-full h-auto rounded-lg shadow-md"
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <Accordion buttonText="Controllare la Market Cap del Cryptoasset">
                              <div className="p-4 space-y-4 text-neutral-900">
                                <p>
                                  Prima di tutto, bisogna vedere se la criptovaluta che si vuole analizzare sia completamente in circolazione, o se una parte della supply debba ancora essere immessa nel mercato.
                                </p>
                                
                                <p>
                                  Useremo il token di Liquity ($LQTY) nei nostri esempi (<a href="https://www.coingecko.com/it/monete/liquity" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.coingecko.com/it/monete/liquity</a>)
                                </p>
                                
                                <div className="flex justify-center">
                                  <Image 
                                    src="/analizing4.png" 
                                    alt="Liquity Token su CoinGecko"
                                    width={800}
                                    height={400}
                                    className="max-w-full h-auto rounded-lg shadow-md"
                                  />
                                </div>
                                
                                <p>
                                  Cliccando su "Max" in alto a destra potrete osservare la cronologia del prezzo del token desiderato, graficamente.
                                </p>
                                
                                <p>
                                  Come possiamo notare nel rettangolo in blu, la Cap. di Mercato (Market Cap) è più bassa della Valutaz. 100% diluita (FDV), il che significa che non tutti i token sono stati rilasciati.
                                </p>
                                
                                <p>
                                  Possiamo usare <a href="https://token.unlocks.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://token.unlocks.app/</a> per vedere quando verranno immessi nel mercato e come.
                                </p>
                                
                                <p>
                                  Come vedrete dal grafico del prezzo di $LQTY, sembrerebbe che il prezzo sia andato costantemente giù.
                                </p>
                                
                                <p>
                                  Tuttavia, se si considera che l'offerta iniziale era più bassa di quella di oggi, e che una parte delle emissioni (o tutte) sono andate a chi possedeva il token $LQTY (tramite Staking o di altro tipo), fare un'analisi usando solamente il prezzo sarebbe errato.
                                </p>
                                
                                <p>
                                  Visualizzando il grafico della Market Cap invece, potremmo notare un'interessante differenza. 👇🏻
                                </p>
                                
                                <div className="flex justify-center">
                                  <Image 
                                    src="/analizing5.png" 
                                    alt="Liquity Market Cap Chart"
                                    width={800}
                                    height={400}
                                    className="max-w-full h-auto rounded-lg shadow-md"
                                  />
                                </div>
                                
                                <p>
                                  Prima di tutto, che l'andamento è stato costantemente a rialzo sin dall'inizio, e secondo poi, che adesso siamo ai minimi storici per questa crypto.
                                </p>
                              </div>
                            </Accordion>
                            
                            <Accordion buttonText="Comparare la Market Cap con quella di progetti simili">
                              <p className="p-4 text-neutral-900">
                                Confronta la Market Cap del progetto che stai analizzando con quella di progetti simili nel stesso settore. Ad esempio, se stai valutando un DEX, confrontalo con Uniswap, SushiSwap o altri exchange decentralizzati. Questo ti darà un'idea del potenziale di crescita relativo.
                              </p>
                            </Accordion>
                          </div>
                        </div>
                      </Accordion>
                    </div>
                  </Accordion>
                  
                </div>
              </Accordion>
              
              <Accordion
                buttonText="Calcolare il Rischio di un Cryptoasset usando la Media del Prezzo"
                className="mb-4"
              >
                <div className="p-5 space-y-4 text-neutral-900">
                  <div className="flex justify-center">
                    <Image 
                      src="/analizing6.png" 
                      alt="Benjamin Cowen - Into The Cryptoverse"
                      width={800}
                      height={400}
                      className="max-w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-lg font-semibold mb-2">Benjamin Cowen</p>
                    <p className="mb-4">
                      You have just jumped into the cryptoverse, which provides high quality cryptocurrency education to those who want to dive deeper
                    </p>
                    <a 
                      href="https://www.youtube.com/@intothecryptoverse" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      https://www.youtube.com/@intothecryptoverse
                    </a>
                  </div>
                </div>
              </Accordion>
              
              <Accordion
                buttonText="TVL to Market Cap ratio (rapporto tra valore depositato e capitalizzazione)"
                className="mb-4"
              >
                <div className="p-5 space-y-4 text-neutral-900">
                  <p>
                    Valore fondamentale del prodotto: per esempio, il TVL ("Total Value Locked") di un progetto rappresenta il valore in dollari dei token depositati nei suoi smart-contract.
                  </p>
                  
                  <p>
                    Se si prende la market cap (capitalizzazione di mercato = valore del progetto/azienda) e la si mette accanto al TVL, si ottiene un ratio tra le due, che ci permette di paragonarlo ad altri progetti nella stessa categoria, per capire se è sottovalutato o sopravvalutato rispetto ad essa, e se fosse sottovalutato, si può calcolare il potenziale apprezzamento (upside) calcolando il ratio tra quella sottovalutata e sopravvalutata.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="font-semibold text-blue-800 mb-3">Esempio pratico:</p>
                    
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border">
                        <p className="font-semibold text-green-700">AAVE (Leader nel Lending & Borrowing)</p>
                        <p><strong>TVL:</strong> $13 miliardi</p>
                        <p><strong>Market Cap:</strong> $1.5 miliardi</p>
                        <p><strong>Ratio TVL/Market Cap:</strong> 8.67x</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded border">
                        <p className="font-semibold text-orange-700">Liquity (Progetto sottovalutato)</p>
                        <p><strong>TVL:</strong> $700 milioni</p>
                        <p><strong>Market Cap:</strong> $100 milioni</p>
                        <p><strong>Ratio TVL/Market Cap:</strong> 7x</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-yellow-50 rounded border">
                      <p className="font-semibold text-yellow-800">Calcolo del Potenziale Apprezzamento:</p>
                      <p className="text-sm">
                        Se Liquity avesse lo stesso ratio di AAVE (8.67x), la sua Market Cap dovrebbe essere:
                      </p>
                      <p className="text-lg font-bold text-yellow-700">
                        $700M ÷ 8.67 = $80.7M (attuale) → $700M × 8.67 = $6.07B (potenziale)
                      </p>
                      <p className="text-sm mt-2">
                        <strong>Upside potenziale:</strong> Da $100M a $6.07B = <span className="text-green-600 font-bold">6,070% di crescita</span>
                      </p>
                    </div>
                  </div>
                  
                  <p>
                    Il potenziale apprezzamento della market cap di Liquity sarebbe da $100M a $1.5B, se si assume che il mercato eventualmente capirà il suo valore (per mercato si intende i partecipanti ad esso, ovvero gli "investitori").
                  </p>
                </div>
              </Accordion>
              
              <Accordion
                buttonText="Price Action (Analisi Tecnica)"
                className="mb-4"
              >
                <p className="p-5 text-neutral-900">
                  [Contenuto da aggiungere]
                </p>
              </Accordion>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
            <p className="text-neutral-900 mb-6">
              Gli NFT sono uno dei settori ancora meno sviluppati all&apos;interno del mondo Web3. Se ne è sentito molto parlare negli anni scorsi per via di progetti buoni che ancora esistono (come i Crypto Punk, i Pudgy Penguin, i Bored Ape..) ma anche per i molti scam che ci sono stati (come purtroppo accade in tutti i settori nascenti, anche non-Web3, quindi non preoccupatevi o per lo meno, prestate attenzione).
            </p>
            <p className="text-neutral-900 mb-6">
              Possono essere collezioni di PFP (profile pictures), arte digitale, arte tradizionale tokenizzata, o addirittura interi immobili, e molto altro ancora.
            </p>
            
              <Accordion
                buttonText="Come scegliere la propria community NFT"
                className="mb-4"
              >
                <div className="p-5 space-y-4 text-neutral-900">
                  <p className="font-semibold text-lg mb-4">
                    Quando scegli una community NFT, considera i seguenti fattori:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-bold text-blue-800 mb-2">1. Visione e Valori</h4>
                      <p className="text-blue-700">
                        La community deve riflettere i tuoi interessi e obiettivi.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-bold text-green-800 mb-2">2. Engagement</h4>
                      <p className="text-green-700">
                        Cerca una community attiva su piattaforme come Discord e Twitter.
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-bold text-purple-800 mb-2">3. Utilità</h4>
                      <p className="text-purple-700">
                        Valuta i benefici dell'NFT, come eventi esclusivi o ricompense previste per gli holders.
                      </p>
                    </div>
                    
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-bold text-orange-800 mb-2">4. Team e Trasparenza</h4>
                      <p className="text-orange-700">
                        Assicurati che il team sia esperto e chiaro sui piani.
                      </p>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-bold text-red-800 mb-2">5. Prezzo della Collezione</h4>
                      <p className="text-red-700">
                        Scegli NFT che puoi permetterti senza sovra-allocare il tuo portafoglio. Evita di impegnarti troppo, a meno che tu non voglia entrarci solo temporaneamente per esplorare la community.
                      </p>
                    </div>
                  </div>
                </div>
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
            <p className="text-neutral-900 mb-6">
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
                <p className="text-neutral-900">
                  Il mondo delle criptovalute offre enormi opportunità, ma è anche terreno fertile per truffatori. Ecco una guida su come proteggerti dalle truffe, basata su consigli di esperti del settore.
                </p>

                <div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-3">1. Ricerca Approfondita</h4>
                  <p className="text-neutral-900">
                    Prima di investire in qualsiasi criptovaluta o progetto, è fondamentale fare una ricerca approfondita. Leggi il whitepaper del progetto, verifica l&apos;identità del team dietro il progetto e cerca recensioni e analisi indipendenti. Progetti con team anonimi o senza documentazione chiara sono da considerare sospetti.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-3">2. Utilizza Solo Wallet Reputati</h4>
                  <p className="text-neutral-900">
                    Assicurati che i wallet che scarichi provengano da fonti affidabili. Evita di installare wallet da link ricevuti via email o messaggi privati, poiché potrebbero essere falsi e progettati per rubare le tue criptovalute. Verifica sempre che il wallet sia ufficiale e controlla le recensioni degli utenti.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-3">3. Attenzione ai Link Malevoli</h4>
                  <p className="text-neutral-900">
                    I link malevoli possono infettare il tuo dispositivo con malware o portarti su siti fasulli che possono drenare i tuoi fondi. Verifica sempre i link accedendo direttamente dal sito ufficiale o dai canali social ufficiali del progetto. Tratta ogni link ricevuto da sconosciuti con estrema cautela.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-3">4. Riconosci i Segnali di Allarme</h4>
                  <ul className="list-disc list-inside space-y-2 text-neutral-900">
                    <li><strong>Promesse di Guadagni Elevati</strong>: Se un&apos;offerta sembra troppo bella per essere vera, probabilmente è una truffa. Nessuna piattaforma legittima garantisce rendimenti altissimi senza rischi.</li>
                    <li><strong>Mancanza di Trasparenza</strong>: Progetti che non forniscono informazioni chiare sul loro funzionamento, il team o i loro obiettivi sono sospetti.</li>
                    <li><strong>Senso di Urgenza</strong>: I truffatori spesso cercano di creare un senso di urgenza per farti agire senza riflettere. Le opportunità di investimento genuine non richiedono decisioni affrettate.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-3">5. Utilizza Exchange Reputati</h4>
                  <p className="text-neutral-900">
                    Quando compri, vendi o scambi criptovalute, usa solo exchange ben conosciuti e con una buona reputazione. Verifica che l&apos;exchange rispetti le normative, abbia una storia di sicurezza solida e offra protezioni come l&apos;assicurazione sui depositi.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-3">6. Proteggi i Tuoi Wallet</h4>
                  <p className="text-neutral-900">
                    Mantieni i tuoi software sempre aggiornati per proteggerti dalle vulnerabilità. Usa hardware wallet per conservare quantità significative di criptovalute e attiva l&apos;autenticazione a due fattori (2FA) dove possibile. Utilizza un &quot;burner&quot; wallet per le transazioni quotidiane, lasciando i fondi principali in un wallet separato e più sicuro.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-3">7. Evita le Truffe dei Falsi Airdrop</h4>
                  <p className="text-neutral-900">
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
