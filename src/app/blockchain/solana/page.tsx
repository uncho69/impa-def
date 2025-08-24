import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionTutorial } from "@/components/SectionTutorial";
import { SimpleCard } from "@/components/SimpleCard";
import Placeholder from "@/assets/placeholder.svg";
import { CardContainer } from "@/components/CardContainer";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle>Blockchain</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Solana</h1>
          <p>
            <strong>Solana</strong> è una blockchain ad alte prestazioni
            progettata per supportare applicazioni decentralizzate e
            criptovalute su larga scala. Lanciata nel 2020 da Anatoly Yakovenko,
            Solana si distingue per la sua capacità di gestire un elevato numero
            di transazioni al secondo (TPS) con costi di transazione molto
            bassi, rendendola una delle piattaforme blockchain più rapide e
            scalabili attualmente disponibili.
          </p>
          <Accordion buttonText="Introduzione a Solana">
            <List ordered={true}>
              <li>
                <strong>Alta Scalabilità:</strong>
                <List>
                  <li>
                    <strong>Velocità delle Transazioni:</strong> Solana può
                    gestire fino a 65.000 transazioni al secondo, grazie alla
                    sua architettura unica e al meccanismo di consenso Proof of
                    History (PoH) combinato con il Proof of Stake (PoS).
                  </li>
                  <li>
                    <strong>Bassi Costi di Transazione:</strong> Le commissioni
                    su Solana sono estremamente basse, solitamente frazioni di
                    centesimi, rendendola ideale per applicazioni che richiedono
                    un alto volume di transazioni.
                  </li>
                </List>
              </li>
              <li>
                <strong>Proof of History (PoH):</strong>
                <List>
                  <li>
                    <strong>Innovazione Unica:</strong> PoH è un algoritmo che
                    crea una cronologia storica delle transazioni, garantendo
                    che gli eventi siano registrati in un ordine specifico e
                    verificabile. Questo riduce significativamente il tempo
                    necessario per verificare le transazioni.
                  </li>
                  <li>
                    <strong>Efficienza:</strong> PoH consente di verificare le
                    transazioni in parallelo, migliorando la velocità e
                    l&apos;efficienza della rete.
                  </li>
                </List>
              </li>
              <li>
                <strong>Ecosistema in Crescita:</strong>
                <List>
                  <li>
                    <strong>dApp e Protocolli DeFi:</strong> Solana supporta
                    un&apos;ampia gamma di applicazioni decentralizzate (dApp),
                    inclusi protocolli di finanza decentralizzata (DeFi) come
                    Serum, Raydium e Solend.
                  </li>
                  <li>
                    <strong>Marketplace NFT:</strong> Solana è anche un punto
                    focale per i marketplace di token non fungibili (NFT), con
                    piattaforme popolari come Solanart e Magic Eden.
                  </li>
                </List>
              </li>
              <li>
                <strong>Solana Labs e Solana Foundation:</strong>
                <List>
                  <li>
                    <strong>Sviluppo e Supporto:</strong> Solana Labs è la
                    principale entità di sviluppo dietro Solana, mentre la
                    Solana Foundation supporta l&apos;ecosistema attraverso
                    finanziamenti, eventi e iniziative educative.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Tecnologia di Solana">
            <List ordered={true}>
              <li>
                <strong>Tower BFT:</strong>
                <List>
                  <li>
                    <strong>Consenso Rapido:</strong> Tower Byzantine Fault
                    Tolerance (BFT) è un meccanismo di consenso che sfrutta PoH
                    come orologio decentralizzato, permettendo alla rete di
                    raggiungere rapidamente il consenso.
                  </li>
                </List>
              </li>
              <li>
                <strong>Turbine:</strong>
                <List>
                  <li>
                    <strong>Propagazione Efficiente:</strong> Turbine è un
                    protocollo di propagazione dei dati che scompone le
                    informazioni in pacchetti più piccoli, facilitando una
                    trasmissione più rapida e affidabile attraverso la rete.
                  </li>
                </List>
              </li>
              <li>
                <strong>Gulf Stream:</strong>
                <List>
                  <li>
                    <strong>Ottimizzazione della Mempool:</strong> Questo
                    protocollo riduce la pressione sulla mempool della rete
                    pre-instradando le transazioni agli edge validators,
                    permettendo una convalida più rapida delle transazioni.
                  </li>
                </List>
              </li>
              <li>
                <strong>Sealevel:</strong>
                <List>
                  <li>
                    <strong>Esecuzione Parallela:</strong> Sealevel è un motore
                    di esecuzione di transazioni parallele che consente
                    l&apos;elaborazione simultanea di migliaia di contratti
                    intelligenti, migliorando notevolmente la velocità e
                    l&apos;efficienza.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Vantaggi di Solana">
            <List ordered={false}>
              <li>
                <strong>Velocità:</strong> La capacità di Solana di gestire
                migliaia di transazioni al secondo la rende ideale per
                applicazioni che richiedono alta velocità e throughput.
              </li>
              <li>
                <strong>Costi Bassi:</strong> Le basse commissioni di
                transazione rendono Solana una scelta conveniente per
                sviluppatori e utenti.
              </li>
              <li>
                <strong>Robustezza:</strong> L&apos;architettura di Solana è
                progettata per essere altamente resiliente e scalabile,
                supportando un ecosistema in rapida crescita.
              </li>
            </List>
          </Accordion>
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
          <Accordion buttonText="Applicazioni su Solana">
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
          <Accordion buttonText="Memecoin su Solana">
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
          tutorialLink="./solana/tutorial"
        />
      </SectionBody>
    </MobileContainer>
  );
}
