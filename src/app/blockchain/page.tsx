import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
// import Image from "next/image";
// import VideoImage from "@/assets/Video.png";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function Blockchain() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Blockchain</SectionTitle>
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
          <Accordion buttonText="Cos’è una Blockchain?">
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
          <Accordion buttonText="Applicazioni e casi d’uso">
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
          <p></p>
        </Accordion>
        <Accordion buttonText="ZK-Rollups (Zero-Knowledge Rollups)">
          a
        </Accordion>
        <Accordion buttonText="State Channels">a</Accordion>
        <Accordion buttonText="Plasma">a</Accordion>
        <Accordion buttonText="Sidechains">a</Accordion>
        <Accordion buttonText="Confronto e Utilizzo">a</Accordion>
      </SectionBody>
    </MobileContainer>
  );
}
