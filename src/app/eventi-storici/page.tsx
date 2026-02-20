import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";
import { ClerkProtectedRoute } from "@/components/ClerkProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { ExploreWeb3 } from "@/components/ExploreWeb3";
import Link from "next/link";

export default function EventiStorici() {
  return (
    <ClerkProtectedRoute title="Eventi Storici">
      <PageTitle description="I momenti che hanno definito l'evoluzione del Web3">
        Eventi Storici
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
            <div className="space-y-4">
              <Accordion buttonText="1. Lancio di Bitcoin (2009)">
                <div className="p-5 space-y-4 text-neutral-900">
                  <ul className="list-disc list-inside space-y-3">
                    <li>
                      <strong>Descrizione:</strong> Bitcoin, creato da un individuo o un gruppo sotto lo pseudonimo di Satoshi Nakamoto, è stato il primo esempio di una criptovaluta basata su una blockchain decentralizzata.
                    </li>
                    <li>
                      <strong>Impatto:</strong> Ha dato origine all'intero settore delle criptovalute e della blockchain, ponendo le basi per il futuro sviluppo del web3.
                    </li>
                  </ul>
                  
                  <Accordion buttonText="Articoli rilevanti">
                    <div className="p-4">
                      <ul className="list-disc list-inside space-y-2">
                        <li>
                          <Link 
                            href="https://news.bitcoin.com/13-years-ago-today-satoshi-nakamoto-published-the-first-forum-post-introducing-bitcoin/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            13 Years Ago Today, Satoshi Nakamoto Published the First Forum Post Introducing Bitcoin
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Accordion>
                </div>
              </Accordion>
              
              <Accordion buttonText="2. Creazione di Ethereum (2015)">
                <div className="p-5 space-y-4 text-neutral-900">
                  <ul className="list-disc list-inside space-y-3">
                    <li>
                      <strong>Descrizione:</strong> Ethereum, fondato da Vitalik Buterin e altri co-fondatori, ha introdotto il concetto di smart contract e una piattaforma per applicazioni decentralizzate (dApp).
                    </li>
                    <li>
                      <strong>Impatto:</strong> Ethereum ha ampliato enormemente le possibilità della tecnologia blockchain, permettendo la creazione di nuove tipologie di applicazioni decentralizzate e contribuendo all'evoluzione del web3.
                    </li>
                  </ul>
                  
                  <Accordion buttonText="Articoli rilevanti">
                    <div className="p-4">
                      <ul className="list-disc list-inside space-y-2">
                        <li>
                          <Link 
                            href="https://blog.ethereum.org/2015/07/30/ethereum-launches"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Ethereum Launches - Blog ufficiale Ethereum Foundation
                          </Link>
                        </li>
                        <li>
                          <Link 
                            href="https://cointelegraph.com/news/ethereum-announces-official-launch-date"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Ethereum Announces Official Launch Date - Cointelegraph
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Accordion>
                </div>
              </Accordion>
              
              <Accordion buttonText="3. ICO Boom (2017)">
                <div className="p-5 space-y-4 text-neutral-900">
                  <ul className="list-disc list-inside space-y-3">
                    <li>
                      <strong>Descrizione:</strong> L'Initial Coin Offering (ICO) è diventato un metodo popolare per raccogliere fondi per nuovi progetti blockchain e criptovalute.
                    </li>
                    <li>
                      <strong>Impatto:</strong> Ha portato a un'enorme crescita nel numero di progetti blockchain, sebbene molti fossero truffe o fallissero, evidenziando la necessità di regolamentazione e due diligence.
                    </li>
                  </ul>
                </div>
              </Accordion>
              
              <Accordion buttonText="4. DeFi Summer (2020)">
                <div className="p-5 space-y-4 text-neutral-900">
                  <ul className="list-disc list-inside space-y-3">
                    <li>
                      <strong>Descrizione:</strong> L'estate del 2020 ha visto un'esplosione di interesse per le applicazioni di Finanza Decentralizzata (DeFi) come Uniswap, Compound e Aave.
                    </li>
                    <li>
                      <strong>Impatto:</strong> La DeFi ha rivoluzionato il settore finanziario, offrendo prestiti, scambi e altri servizi finanziari senza intermediari centralizzati.
                    </li>
                  </ul>
                </div>
              </Accordion>
              
              <Accordion buttonText="5. NFT Boom (2021)">
                <div className="p-5 space-y-4 text-neutral-900">
                  <ul className="list-disc list-inside space-y-3">
                    <li>
                      <strong>Descrizione:</strong> Gli NFT (Non-Fungible Tokens) sono diventati estremamente popolari, con vendite multimilionarie di opere d'arte digitale e collezionabili.
                    </li>
                    <li>
                      <strong>Impatto:</strong> Gli NFT hanno aperto nuove opportunità per artisti, creatori di contenuti e collezionisti, portando alla mainstream la tecnologia blockchain.
                    </li>
                  </ul>
                </div>
              </Accordion>
              
              <Accordion buttonText="6. Adozione di Bitcoin come Moneta Legale in El Salvador (2021)">
                <div className="p-5 space-y-4 text-neutral-900">
                  <ul className="list-disc list-inside space-y-3">
                    <li>
                      <strong>Descrizione:</strong> El Salvador è diventato il primo paese al mondo a adottare Bitcoin come moneta legale.
                    </li>
                    <li>
                      <strong>Impatto:</strong> Questo ha segnato un importante passo verso l'adozione mainstream delle criptovalute da parte degli stati nazionali.
                    </li>
                  </ul>
                </div>
              </Accordion>
              
              <Accordion buttonText="7. Lancio di Ethereum 2.0 (The Merge) (2022)">
                <div className="p-5 space-y-4 text-neutral-900">
                  <ul className="list-disc list-inside space-y-3">
                    <li>
                      <strong>Descrizione:</strong> Ethereum ha completato il passaggio da un meccanismo di consenso Proof-of-Work (PoW) a Proof-of-Stake (PoS), noto come "The Merge".
                    </li>
                    <li>
                      <strong>Impatto:</strong> Ha migliorato l'efficienza energetica e la scalabilità di Ethereum, segnando una pietra miliare importante nell'evoluzione della rete.
                    </li>
                  </ul>
                </div>
              </Accordion>
              
              <Accordion buttonText="8. Crescita degli Ecosistemi Layer 2 (2022-2023)">
                <div className="p-5 space-y-4 text-neutral-900">
                  <ul className="list-disc list-inside space-y-3">
                    <li>
                      <strong>Descrizione:</strong> Soluzioni Layer 2 come Arbitrum, Optimism e zk-Rollups hanno guadagnato popolarità per migliorare la scalabilità di Ethereum.
                    </li>
                    <li>
                      <strong>Impatto:</strong> Hanno consentito transazioni più veloci e meno costose, facilitando una maggiore adozione delle dApp e della DeFi.
                    </li>
                  </ul>
                </div>
              </Accordion>
              
              <Accordion buttonText="9. Crollo di FTX (Novembre 2022)">
                <div className="p-5 space-y-4 text-neutral-900">
                  <ul className="list-disc list-inside space-y-3">
                    <li>
                      <strong>Descrizione:</strong> A novembre 2022, l'exchange di criptovalute FTX, uno dei più grandi e rispettati al mondo, ha dichiarato bancarotta a seguito di gravi problemi di liquidità e accuse di gestione fraudolenta dei fondi dei clienti.
                    </li>
                    <li>
                      <strong>Impatto:</strong> Il crollo di FTX ha avuto un impatto devastante sul mercato delle criptovalute, causando una perdita di fiducia significativa tra gli investitori e portando a un aumento della regolamentazione nel settore. Molti investitori hanno perso fondi significativi, e l'evento ha messo in luce la necessità di una maggiore trasparenza e supervisione nelle operazioni degli exchange di criptovalute.
                    </li>
                  </ul>
                </div>
              </Accordion>
              
              <Accordion buttonText="10. Lancio di Decentralised Social Media (Lens Protocol, 2023)">
                <div className="p-5 space-y-4 text-neutral-900">
                  <ul className="list-disc list-inside space-y-3">
                    <li>
                      <strong>Descrizione:</strong> Il lancio di piattaforme di social media decentralizzate, come Lens Protocol, ha introdotto nuovi modelli per la gestione e la monetizzazione dei contenuti online.
                    </li>
                    <li>
                      <strong>Impatto:</strong> Ha iniziato a sfidare i modelli tradizionali dei social media centralizzati, dando più potere agli utenti.
                    </li>
                  </ul>
                </div>
              </Accordion>
              
              <Accordion buttonText="11. Adozione di Soluzioni di Interoperabilità (LayerZero, 2023)">
                <div className="p-5 space-y-4 text-neutral-900">
                  <ul className="list-disc list-inside space-y-3">
                    <li>
                      <strong>Descrizione:</strong> Soluzioni come LayerZero hanno facilitato la comunicazione e il trasferimento di asset tra diverse blockchain.
                    </li>
                    <li>
                      <strong>Impatto:</strong> Hanno migliorato l'interoperabilità nel mondo delle blockchain, permettendo una maggiore collaborazione e integrazione tra vari ecosistemi.
                    </li>
                  </ul>
                </div>
              </Accordion>
              
              <Accordion buttonText="12. Approvazione del Bitcoin ETF (Gennaio 2024)">
                <div className="p-5 space-y-4 text-neutral-900">
                  <ul className="list-disc list-inside space-y-3">
                    <li>
                      <strong>Descrizione:</strong> A gennaio 2024, la Securities and Exchange Commission (SEC) degli Stati Uniti ha approvato il primo ETF (Exchange-Traded Fund) basato su Bitcoin.
                    </li>
                    <li>
                      <strong>Impatto:</strong> L'approvazione del Bitcoin ETF ha segnato un importante passo avanti per l'adozione mainstream delle criptovalute, offrendo agli investitori tradizionali un modo più sicuro e regolamentato per investire in Bitcoin. Ha inoltre contribuito a legittimare ulteriormente il mercato delle criptovalute agli occhi del pubblico e degli istituti finanziari.
                    </li>
                  </ul>
                </div>
              </Accordion>
              
              <Accordion buttonText="13. Celebrità lanciano Token o supportano progetti Cripto (2023-2024)">
                <div className="p-5 space-y-4 text-neutral-900">
                  <ul className="list-disc list-inside space-y-3">
                    <li>
                      <strong>Descrizione:</strong> Tra il 2023 e il 2024, molte celebrità hanno iniziato a lanciare i propri token criptati o a supportare attivamente progetti esistenti nel mondo cripto. Figure come Donald Trump, Snoop Dogg, Kylie Jenner, Floyd Mayweather, Lindsay Lohan, ed atleti di alto profilo hanno partecipato a questo trend, promuovendo criptovalute e NFT sui social media e in altre piattaforme pubbliche.
                    </li>
                    <li>
                      <strong>Impatto:</strong> Questo movimento ha contribuito a una maggiore visibilità e adozione delle criptovalute tra il pubblico generale. Tuttavia, ha anche sollevato preoccupazioni riguardo alla sicurezza e alla legittimità di alcuni progetti promossi, aumentando la necessità di educazione e vigilanza contro le truffe nel settore delle criptovalute.
                    </li>
                  </ul>
                </div>
              </Accordion>
            </div>
          </div>
        </SectionBody>
        
        <ExploreWeb3 />
      </MobileContainer>
    </ClerkProtectedRoute>
  );
}
