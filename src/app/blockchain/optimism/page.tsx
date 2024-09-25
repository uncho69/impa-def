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
          <h1 className="font-bold text-4xl">Opimism</h1>
          <p>
            Optimism è una soluzione di scalabilità Layer 2 per Ethereum,
            progettata per aumentare il throughput delle transazioni e ridurre i
            costi, mantenendo al contempo la sicurezza della blockchain di
            Ethereum. Utilizza la tecnologia degli Optimistic Rollup per
            aggregare molte transazioni in un&apos;unica transazione su
            Ethereum, migliorando l&apos;efficienza e riducendo i costi.
          </p>

          <Accordion buttonText="Caratteristiche Principali">
            <List ordered={true}>
              <li>
                <strong>Optimistic Rollup:</strong>
                <List>
                  <li>
                    <strong>Tecnologia:</strong> Gli Optimistic Rollup aggregano
                    transazioni off-chain e le pubblicano come una singola
                    transazione su Ethereum, riducendo significativamente i
                    costi e aumentando la velocità.
                  </li>
                  <li>
                    <strong>Sicurezza:</strong> Le transazioni sono considerate
                    valide a meno che non venga dimostrata una frode. Un sistema
                    di prove di frode garantisce la correzione di comportamenti
                    malevoli.
                  </li>
                </List>
              </li>
              <li>
                <strong>Superchain</strong>
                <List>
                  <li>
                    <strong>Scalabilità orizzontale:</strong> La Superchain crea
                    una rete di blockchain Layer 2 interoperabili basate su OP
                    Stack, facilitando applicazioni su larga scala.
                  </li>
                  <li>
                    <strong>Composizione e interoperabilità:</strong> Le catene
                    condividono sicurezza e tecnologia, permettendo applicazioni
                    cross-chain senza alti costi.
                  </li>
                </List>
              </li>
              <li>
                <strong>OP Stack:</strong>
                <List>
                  <li>
                    <strong>Framework open-source:</strong> Set modulare di
                    componenti per creare catene Layer 2.
                  </li>
                  <li>
                    <strong>Facilità di implementazione:</strong> Fornisce
                    strumenti standardizzati per lanciare catene Layer 2.
                  </li>
                </List>
              </li>
              <li>
                <strong>Governance decentralizzata:</strong>
                <List>
                  <li>
                    <strong>Optimism Collective:</strong> La governance è
                    gestita da un collettivo di aziende e comunità che
                    supportano beni pubblici.
                  </li>
                  <li>
                    <strong>
                      RetroPGF (Retroactive Public Goods Funding):
                    </strong>{" "}
                    Finanziamenti retroattivi per progetti che portano benefici
                    alla community.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Progetti su Oprimism">
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
          tutorialLink="./optimism/tutorial"
        />
      </SectionBody>
    </MobileContainer>
  );
}
