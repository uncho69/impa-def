import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import bitcoinIcon from "@/assets/bitcoin-icon.svg";

export default function Bitcoin() {
  return (
    <ProtectedRoute title="Bitcoin">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={bitcoinIcon} alt="Bitcoin" width={64} height={64} />
          <div>
            <SectionTitle>Bitcoin</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                Blockchain
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                PoW
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Store of Value
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Bitcoin</strong> è la prima e più famosa criptovaluta, introdotta nel 2009 da Satoshi Nakamoto. 
          La blockchain di Bitcoin è la tecnologia rivoluzionaria che sta alla base di questa criptovaluta, 
          aprendo la strada all'era delle criptovalute e delle applicazioni decentralizzate.
        </SectionBody>
        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Cos'è la Blockchain di Bitcoin?" defaultOpen={true}>
            <List>
              <li>
                <strong>Registro Decentralizzato</strong>: La blockchain di Bitcoin è un registro digitale decentralizzato che memorizza tutte le transazioni in modo permanente e immutabile.
              </li>
              <li>
                <strong>Libro Mastro Distribuito</strong>: Funziona come un libro mastro distribuito, mantenuto da una rete di nodi che verificano e registrano le transazioni senza autorità centrale.
              </li>
              <li>
                <strong>Trasparenza Totale</strong>: Ogni transazione è pubblicamente visibile e verificabile da chiunque.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Meccanismo di Consenso">
            <List>
              <li>
                <strong>Proof of Work (PoW)</strong>: Bitcoin utilizza il meccanismo di consenso Proof of Work, dove i minatori risolvono complessi problemi matematici per aggiungere nuovi blocchi.
              </li>
              <li>
                <strong>Mining</strong>: I minatori competono per risolvere il problema matematico. Il primo che trova la soluzione valida aggiunge il blocco e riceve una ricompensa in Bitcoin.
              </li>
              <li>
                <strong>Sicurezza</strong>: Il PoW rende estremamente costoso e difficile attaccare la rete Bitcoin.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Struttura della Blockchain">
            <List>
              <li>
                <strong>Blocchi</strong>: Le transazioni vengono raccolte in blocchi che vengono aggiunti alla catena in ordine cronologico.
              </li>
              <li>
                <strong>Hash Crittografico</strong>: Ogni blocco contiene un riferimento crittografico al blocco precedente, creando una catena continua e immutabile.
              </li>
              <li>
                <strong>Immutabilità</strong>: Una volta aggiunto alla blockchain, un blocco non può essere modificato senza invalidare tutti i blocchi successivi.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Commissioni di Transazione">
            <List>
              <li>
                <strong>Commissioni di Rete</strong>: Le commissioni di transazione incentivano i minatori a includere le transazioni nei blocchi.
              </li>
              <li>
                <strong>Priorità</strong>: Commissioni più alte garantiscono priorità più alta nell'elaborazione delle transazioni.
              </li>
              <li>
                <strong>Variabilità</strong>: Le commissioni variano in base alla congestione della rete e alla domanda.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Vantaggi di Bitcoin</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Sicurezza e Decentralizzazione">
            <List>
              <li>
                <strong>Resistenza alla Censura</strong>: Nessuna autorità centrale può bloccare o censurare le transazioni Bitcoin.
              </li>
              <li>
                <strong>Sicurezza Crittografica</strong>: L'uso di crittografia avanzata rende Bitcoin estremamente sicuro.
              </li>
              <li>
                <strong>Rete Distribuita</strong>: La rete è mantenuta da migliaia di nodi in tutto il mondo.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="Store of Value">
            <List>
              <li>
                <strong>Scarsità Digitale</strong>: Bitcoin ha un limite massimo di 21 milioni di unità, garantendo scarsità.
              </li>
              <li>
                <strong>Riserva di Valore</strong>: Molti considerano Bitcoin come "oro digitale" per preservare il valore nel tempo.
              </li>
              <li>
                <strong>Indipendenza Monetaria</strong>: Bitcoin non dipende da banche centrali o governi.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Video Tutorial">
            <div className="w-full max-w-2xl mx-auto">
              <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/K4TOrB7at0Y?si=vOBf2_Kw_RkdMPph"
                title="Bitcoin Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Reti Supportate */}
              <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-3">Reti Supportate</h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Bitcoin opera sulla sua blockchain nativa, la prima e più sicura blockchain al mondo.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Image 
                    src={bitcoinIcon} 
                    alt="Bitcoin" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                </div>
              </div>

              {/* Link Utili */}
              <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-3">Link Utili</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600">🌐</span>
                    <a 
                      href="https://bitcoin.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Sito Web
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600">🐦</span>
                    <a 
                      href="https://x.com/bitcoin" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Twitter/X
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600">📊</span>
                    <a 
                      href="https://coinmarketcap.com/currencies/bitcoin/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Token BTC
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
