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
      <SectionTitle main={true}>Blockchain</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Base</h1>
          <p>
            Base è una soluzione Layer 2 per Ethereum sviluppata da Coinbase,
            progettata per offrire una piattaforma sicura, scalabile e
            conveniente per le applicazioni decentralizzate (dApp). Utilizzando
            l&apos;OP Stack di Optimism, Base mira a combinare la sicurezza
            della blockchain di Ethereum con una maggiore efficienza e costi di
            transazione ridotti.
          </p>

          <Accordion buttonText="Caratteristiche Principali di Base">
            <List ordered={true}>
              <li>
                <strong>Tecnologia di Scalabilità:</strong>
                <List>
                  <li>
                    OP Stack di Optimism: Base è alimentata dall&apos;OP Stack
                    di Optimism, una tecnologia che utilizza i rollup
                    ottimistici per aggregare transazioni fuori catena e
                    pubblicarle in batch su Ethereum. Questo approccio riduce
                    significativamente i costi di transazione e aumenta la
                    velocità senza compromettere la sicurezza.
                  </li>
                </List>
              </li>
              <li>
                <strong>Sicurezza e Affidabilità:</strong>
                <List>
                  <li>
                    Supporto di Coinbase: Essendo sviluppata da Coinbase, Base
                    beneficia dell&apos;infrastruttura sicura e affidabile di
                    uno degli exchange di criptovalute più grandi e rispettati
                    al mondo. Questo include l&apos;utilizzo dei nodi di
                    Coinbase per garantire la resilienza della rete.
                  </li>
                </List>
              </li>
              <li>
                <strong>Ecosistema e Integrazioni:</strong>
                <List>
                  <li>
                    Ampio Ecosistema: Base supporta una vasta gamma di dApp e
                    protocolli DeFi, grazie alla sua compatibilità con
                    l&apos;Ethereum Virtual Machine (EVM). Gli sviluppatori
                    possono facilmente migrare le loro applicazioni esistenti su
                    Base per sfruttare costi inferiori e maggiore scalabilità.
                  </li>
                  <li>
                    Strumenti per Sviluppatori: Base offre una serie di
                    strumenti e risorse per sviluppatori, tra cui il Base SDK e
                    documentazione dettagliata, per facilitare lo sviluppo e il
                    deployment di smart contract e dApp sulla piattaforma.
                  </li>
                </List>
              </li>
              <li>
                <strong>Accessibilità e Facilità d&apos;Uso:</strong>
                <List>
                  <li>
                    Compatibilità con Ethereum: Base è progettata per essere
                    completamente compatibile con Ethereum, il che significa che
                    gli sviluppatori possono utilizzare gli stessi strumenti e
                    librerie che già conoscono, riducendo la curva di
                    apprendimento e accelerando lo sviluppo.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Applicazioni su Base">
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
          tutorialLink="./base/tutorial"
        />
      </SectionBody>
    </MobileContainer>
  );
}
