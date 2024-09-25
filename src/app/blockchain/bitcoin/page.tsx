import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionTutorial } from "@/components/SectionTutorial";
import { SimpleCard } from "@/components/SimpleCard";
import Placeholder from "@/assets/placeholder.svg";
import { CardContainer } from "@/components/CardContainer";
import Link from "next/link";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Blockchain</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Bitcoin</h1>
          <p>
            La blockchain di Bitcoin è la tecnologia rivoluzionaria che sta alla
            base della prima e più famosa criptovaluta, Bitcoin (BTC).
            Introdotta nel 2009 da un individuo o gruppo di individui sotto lo
            pseudonimo di Satoshi Nakamoto, questa tecnologia ha aperto la
            strada all&apos;era delle criptovalute e delle applicazioni
            decentralizzate.
          </p>
          <Accordion buttonText="Cos'è la Blockchain di Bitcoin?">
            <p>
              La blockchain di Bitcoin è un registro digitale decentralizzato
              che memorizza tutte le transazioni di Bitcoin in modo permanente e
              immutabile. Funziona come un libro mastro distribuito, mantenuto
              da una rete di nodi (computer) che verificano e registrano le
              transazioni senza la necessità di un&apos;autorità centrale.
            </p>
          </Accordion>
          <Accordion buttonText="Caratteristiche Principali">
            <List ordered={true}>
              <li>
                <strong>Decentralizzazione:</strong>
                <List>
                  <li>
                    La blockchain di Bitcoin non è controllata da nessuna
                    singola entità. È mantenuta da una rete globale di nodi, che
                    verificano e registrano le transazioni, garantendo che il
                    sistema sia resistente alla censura e agli attacchi.
                  </li>
                </List>
              </li>
              <li>
                <strong>Trasparenza e Immutabilità:</strong>
                <List>
                  <li>
                    Ogni transazione effettuata sulla rete Bitcoin è registrata
                    pubblicamente e non può essere modificata o cancellata.
                    Questo garantisce un alto livello di trasparenza e
                    sicurezza.
                  </li>
                </List>
              </li>
              <li>
                <strong>Proof of Work (PoW):</strong>
                <List>
                  <li>
                    Il meccanismo di consenso utilizzato dalla blockchain di
                    Bitcoin è il Proof of Work. I minatori risolvono complessi
                    problemi matematici per aggiungere nuovi blocchi alla
                    catena, ricevendo in cambio nuove unità di Bitcoin come
                    ricompensa.
                  </li>
                </List>
              </li>
              <li>
                <strong>Blocco e Catena di Blocchi:</strong>
                <List>
                  <li>
                    Le transazioni vengono raccolte in blocchi, che vengono
                    aggiunti alla catena di blocchi (blockchain). Ogni blocco
                    contiene un riferimento crittografico al blocco precedente,
                    creando una catena continua che garantisce la sicurezza e
                    l&apos;integrità dei dati.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Funzionamento della Blockchain di Bitcoin">
            <List ordered={true}>
              <li>
                <strong>Transazioni:</strong>
                <List>
                  <li>
                    Gli utenti inviano Bitcoin ad altri utenti tramite
                    transazioni, che vengono trasmesse alla rete e raccolte nei
                    blocchi dai minatori.
                  </li>
                </List>
              </li>
              <li>
                <strong>Mining:</strong>
                <List>
                  <li>
                    I minatori competono per risolvere un problema matematico
                    complesso. Il primo minatore che trova la soluzione valida
                    aggiunge il blocco alla blockchain e riceve una ricompensa
                    in Bitcoin.
                  </li>
                </List>
              </li>
              <li>
                <strong>Verifica:</strong>
                <List>
                  <li>
                    I nodi della rete verificano che le transazioni siano valide
                    (es. nessuna doppia spesa) e che il blocco aggiunto sia
                    corretto.
                  </li>
                </List>
              </li>
              <li>
                <strong>Consenso:</strong>
                <List>
                  <li>
                    Il consenso viene raggiunto quando la maggior parte dei nodi
                    nella rete accetta il blocco aggiunto. Questo processo
                    garantisce che solo le transazioni valide siano registrate
                    nella blockchain.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Gas Fees (commissioni di transazione)">
            <p>
              Le gas fees, note anche come commissioni di transazione, sono i
              costi associati all&apos;elaborazione delle transazioni sulla rete
              Bitcoin. Queste commissioni vengono pagate dai mittenti delle
              transazioni e sono ricevute dai minatori come ricompensa per la
              verifica e l&apos;inclusione delle transazioni nei blocchi.
            </p>
            <p>
              <strong>Dettagli sulle Gas Fees:</strong>
            </p>
            <List ordered={false}>
              <li>
                <strong>Determinazione delle Commissioni:</strong>{" "}
                L&apos;ammontare delle gas fees può variare in base alla
                congestione della rete. Durante periodi di alta domanda, le
                commissioni possono aumentare significativamente, poiché gli
                utenti competono per far includere le loro transazioni nei
                prossimi blocchi.
              </li>
              <li>
                <strong>Incentivi per i Minatori:</strong> Le gas fees
                incentivano i minatori a verificare e aggiungere le transazioni
                alla blockchain. Oltre alla ricompensa del blocco, le
                commissioni di transazione rappresentano una parte significativa
                del guadagno dei minatori.
              </li>
              <li>
                <strong>Impatto sulle Transazioni:</strong> Gli utenti possono
                scegliere di pagare commissioni più alte per avere le loro
                transazioni processate più rapidamente. Le transazioni con
                commissioni più basse possono subire ritardi.
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Vantaggi della Blockchain di Bitcoin">
            <List ordered={false}>
              <li>
                <strong>Sicurezza:</strong> L&apos;uso di crittografia avanzata
                e il meccanismo di consenso PoW rendono la blockchain
                estremamente sicura.
              </li>
              <li>
                <strong>Trasparenza:</strong> Tutte le transazioni sono
                pubblicamente visibili, garantendo un elevato livello di
                trasparenza.
              </li>
              <li>
                <strong>Decentralizzazione:</strong> L&apos;assenza di
                un&apos;autorità centrale elimina il rischio di censura e
                manipolazione.
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Applicazioni della Blockchain di Bitcoin">
            <p>
              Oltre all&apos;uso come criptovaluta, la blockchain di Bitcoin ha
              ispirato lo sviluppo di molte altre blockchain e criptovalute, e
              ha aperto la strada a nuove tecnologie come gli smart contract e
              le applicazioni decentralizzate (dApp).
            </p>{" "}
            <br />
          </Accordion>
          <p className="font-bold p-3">
            Per ulteriori dettagli, puoi visitare{" "}
            <Link
              href={"https://bitcoin.org/"}
              target="_blank"
              className="underline"
            >
              Bitcoin.org
            </Link>
          </p>
          <Accordion buttonText="Portafogli (”Wallet”) Supportati">
            <CardContainer>
              <SimpleCard
                title={"Metamask"}
                subArray={[
                  { icon: Placeholder, text: "" },
                  { icon: Placeholder, text: "" },
                ]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[
                  { icon: Placeholder, text: "" },
                  { icon: Placeholder, text: "" },
                ]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
              <SimpleCard
                title={"Metamask"}
                subArray={[
                  { icon: Placeholder, text: "" },
                  { icon: Placeholder, text: "" },
                ]}
                subArrayTitle="Reti"
                externalLink="https://www.ciao.it"
                xPage="https://x.com/varpippo"
              />
            </CardContainer>
          </Accordion>
        </div>
        <SectionTutorial
          video={
            "https://www.youtube.com/embed/K4TOrB7at0Y?si=vOBf2_Kw_RkdMPph"
          }
          tutorialLink="./bitcoin/tutorial"
        />
      </SectionBody>
    </MobileContainer>
  );
}
