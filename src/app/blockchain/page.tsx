import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
// import Image from "next/image";
// import VideoImage from "@/assets/Video.png";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { BlockchainCardList } from "@/components/BlockchainCardList";

export default function Blockchain() {
  return (
    <ProtectedRoute title="Blockchain">
      <MobileContainer>
        <SectionTitle showBackToHome={true}>Blockchain</SectionTitle>
        <SectionBody>
          {/* <div className="flex items-center justify-center">
            <Image src={VideoImage} alt="" />
          </div> */}
          <div>
            <p>
              La <b>blockchain</b> è una tecnologia rivoluzionaria che sta
              trasformando il modo in cui memorizziamo e trasferiamo dati in
              internet. Originariamente sviluppata per supportare Bitcoin, la
              prima criptovaluta, oggi le blockchain hanno applicazioni ben oltre
              le valute digitali.
            </p>
            <Accordion buttonText="Cos'è una Blockchain?">
              La blockchain è un registro digitale distribuito e decentralizzato.
              Invece di essere conservata in un&apos;unica posizione, una copia
              del registro è mantenuta su numerosi computer (noti come nodi) in
              tutto il mondo. Questo rende la blockchain estremamente sicura e
              resistente alla manipolazione.
            </Accordion>
            <Accordion buttonText="Come funziona?">
              <List ordered={true}>
                <li>
                  <b>Blocchi di Dati:</b> Le informazioni sono memorizzate in
                  blocchi. Ogni blocco contiene un gruppo di transazioni.
                </li>
                <li>
                  <b>Catena di Blocchi:</b> Ogni blocco è collegato al blocco
                  precedente tramite un &quot;hash&quot; crittografico, formando
                  una catena continua.
                </li>
                <li>
                  <b>Decentralizzazione:</b> Non c&apos;è un&apos;autorità
                  centrale; la rete è mantenuta dai nodi che verificano e
                  approvano le transazioni attraverso un processo chiamato
                  consenso.
                </li>
                <li>
                  <b>Trasparenza e Immutabilità:</b> Una volta che un blocco è
                  aggiunto alla catena, le informazioni in esso contenute non
                  possono essere modificate. Tutte le transazioni sono visibili
                  pubblicamente e verificabili.
                </li>
              </List>
            </Accordion>
            <Accordion buttonText="Che vantaggi offre?">
              <List>
                <li>
                  <b>Sicurezza:</b> La decentralizzazione e la crittografia
                  rendono le blockchain altamente sicure.
                </li>
                <li>
                  <b>Trasparenza:</b> Tutte le transazioni sono registrate in modo
                  pubblico e immutabile.
                </li>
                <li>
                  <b>Efficienza:</b> Le transazioni possono essere processate più
                  velocemente e a costi ridotti rispetto ai sistemi tradizionali.
                </li>
                <li>
                  <b>Affidabilità:</b> La mancanza di un punto centrale di
                  controllo elimina il rischio di fallimento del sistema.
                </li>
              </List>
            </Accordion>
            <Accordion buttonText="Applicazioni e casi d'uso">
              Oltre alle criptovalute, la blockchain ha numerose applicazioni in
              vari settori:
              <List>
                <li>
                  <b>Finanza:</b> Pagamenti internazionali, smart contracts.
                </li>
                <li>
                  <b>Supply Chain:</b> Tracciabilità dei prodotti
                  dall&apos;origine al consumatore.
                </li>
                <li>
                  <b>Sanità:</b> Sicurezza e privacy dei dati sanitari.
                </li>
                <li>
                  <b>Governo:</b> Voto elettronico sicuro e trasparente.
                </li>
                <li>
                  <b>Tokenizzazione:</b> Qualsiasi bene che viene tokenizzato
                  sblocca una superiore efficienza del capitale
                </li>
                <li>
                  <b>NFT:</b> arte, biglietti per eventi, chiavi e molto altro
                  possono essere rappresentati come token non fungibili (NFT)
                </li>
              </List>
            </Accordion>
          </div>
        </SectionBody>
        <SectionTitle>Cosa sono le Layer2 (L2)</SectionTitle>
        <SectionBody>
          <p>
            <b>Layer 2</b> è un termine che si riferisce a soluzioni di
            scalabilità costruite sopra una blockchain Layer 1 come Ethereum.
            Queste soluzioni mirano a migliorare l&apos;efficienza della rete
            riducendo le commissioni di transazione e aumentando la velocità,
            senza compromettere la sicurezza e la decentralizzazione della
            blockchain principale. Ecco una panoramica delle principali soluzioni
            di scalabilità di Layer 2:
          </p>
          <Accordion buttonText="Optimistic Rollups">
            <p>
              <strong>Optimistic Rollups</strong> sono una tecnologia di
              scalabilità che consente di eseguire transazioni off-chain e
              registrarle periodicamente sulla chain principale (Layer 1). Ecco
              come funzionano:
            </p>
            <List ordered={true}>
              <li>
                <p>
                  <strong>Transazioni Off-Chain:</strong>
                </p>
                <List>
                  <li>
                    Le transazioni sono elaborate off-chain in un ambiente Layer
                    2, riducendo la congestione sulla chain principale e
                    abbassando le commissioni di gas.
                  </li>
                </List>
              </li>
              <li>
                <p>
                  <strong>Validazione e Sfida:</strong>
                </p>
                <List>
                  <li>
                    Le transazioni eseguite su un Optimistic Rollup sono
                    considerate valide per impostazione predefinita
                    (&quot;optimistic&quot;). I validatori inviano i risultati
                    delle transazioni al Layer 1, dove altri partecipanti possono
                    sfidare i risultati entro un certo periodo di tempo. Se viene
                    trovata una frode, viene applicata una penalità.
                  </li>
                </List>
              </li>
              <li>
                <p>
                  <strong>Benefici:</strong>
                </p>
                <List>
                  <li>
                    Elevata scalabilità con migliaia di transazioni al secondo
                    (TPS).
                  </li>
                  <li>Costi di transazione significativamente ridotti.</li>
                  <li>Sicurezza mantenuta dalla chain principale.</li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="ZK-Rollups (Zero-Knowledge Rollups)">
            <List>
              <li>
                Simili agli Optimistic Rollups, i ZK-Rollups eseguono transazioni
                off-chain, ma utilizzano prove crittografiche (Zero-Knowledge
                Proofs) per garantire che le transazioni siano valide.
              </li>
              <li>
                Offrono vantaggi in termini di sicurezza e efficienza poiché le
                transazioni vengono verificate in batch con una singola prova di
                validità.
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="State Channels">
            <List>
              <li>
                Permettono a due o più partecipanti di creare un canale privato
                per eseguire un numero illimitato di transazioni off-chain.
              </li>
              <li>
                Solo il saldo finale viene registrato sulla chain principale,
                riducendo il carico di lavoro e i costi di gas.
              </li>
              <li>
                Esempi: Lightning Network (per Bitcoin), Raiden Network (per
                Ethereum).
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Plasma">
            <List>
              <li>
                Consiste in una serie di child chains (sotto-reti) che operano
                indipendentemente dalla chain principale.
              </li>
              <li>
                Le transazioni sono processate su queste sotto-reti e
                periodicamente ancorate alla chain principale.
              </li>
              <li>
                Plasma è altamente scalabile ma più complesso da implementare
                rispetto ad altre soluzioni.
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Sidechains">
            <List>
              <li>
                Blockchain indipendenti che funzionano in parallelo alla chain
                principale.
              </li>
              <li>
                Consentono trasferimenti di asset tra la chain principale e la
                sidechain, migliorando la scalabilità senza sovraccaricare la
                chain principale.
              </li>
              <li>Esempi: Polygon (precedentemente Matic), xDai.</li>
            </List>
          </Accordion>
          <Accordion buttonText="Confronto e Utilizzo">
            <List>
              <li>
                <strong>Optimistic Rollups:</strong> Utilizzati da piattaforme
                come Optimism e Arbitrum, sono adatti per applicazioni che
                richiedono alta scalabilità e transazioni a basso costo.
              </li>
              <li>
                <strong>ZK-Rollups:</strong> Adatti per applicazioni che
                richiedono maggiore sicurezza e privacy, come i DEX (exchange
                decentralizzati).
              </li>
              <li>
                <strong>State Channels e Plasma:</strong> Ideali per
                microtransazioni e giochi blockchain.
              </li>
              <li>
                <strong>Sidechains:</strong> Utilizzati per espandere
                l&apos;ecosistema di applicazioni e dApps con esigenze specifiche.
              </li>
            </List>
          </Accordion>
        </SectionBody>
        <SectionTitle>Lista Blockchain</SectionTitle>
        <SectionBody>
          <BlockchainCardList />
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
