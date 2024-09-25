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
          <h1 className="font-bold text-4xl">Polygon</h1>
          <p>
            <strong>Polygon</strong> è una soluzione di scalabilità per Ethereum
            che mira a trasformare Ethereum in un sistema multi-chain completo.
            Fondata nel 2017 come Matic Network, Polygon offre una serie di
            strumenti e tecnologie per migliorare la scalabilità, la velocità
            delle transazioni e ridurre i costi, mantenendo al contempo la
            sicurezza della blockchain di Ethereum.
          </p>
          <Accordion buttonText="Caratteristiche Principali di Polygon">
            <List ordered={true}>
              <li>
                <strong>Tecnologia di Scalabilità:</strong>
                <List>
                  <li>
                    <strong>Polygon PoS:</strong> La catena Polygon
                    Proof-of-Stake è una delle principali soluzioni di
                    scalabilità offerte da Polygon. Utilizza un meccanismo di
                    consenso PoS per fornire transazioni rapide e a basso costo
                    mantenendo l&apos;integrità e la sicurezza della rete
                    Ethereum.
                  </li>
                  <li>
                    <strong>Polygon zkEVM:</strong> Una soluzione zk-rollup che
                    offre compatibilità completa con l&apos;Ethereum Virtual
                    Machine (EVM). Questa tecnologia permette di eseguire
                    transazioni in modo rapido e sicuro, riducendo al contempo i
                    costi del gas.
                  </li>
                </List>
              </li>
              <li>
                <strong>Polygon 2.0:</strong>
                <List>
                  <li>
                    <strong>Scalabilità Illimitata:</strong> Polygon 2.0 mira a
                    creare un ambiente scalabile ed elastico per accedere ai
                    valori, definito come &quot;Value Layer of the
                    Internet&quot;. La proposta include diverse migliorie
                    architetturali per supportare la crescita del protocollo e
                    l&apos;integrazione di liquidità unificata.
                  </li>
                </List>
              </li>
              <li>
                <strong>Framework Modulari:</strong>
                <List>
                  <li>
                    <strong>Polygon SDK:</strong> Un kit di sviluppo modulare
                    che permette ai sviluppatori di creare e lanciare catene
                    Layer 2 sicure e indipendenti. Questo SDK supporta diverse
                    soluzioni di scalabilità come rollup ottimistici, zk-rollup,
                    validium e Plasma, permettendo una vasta gamma di opzioni
                    per lo sviluppo di infrastrutture blockchain.
                  </li>
                </List>
              </li>
              <li>
                <strong>Identità Decentralizzata:</strong>
                <List>
                  <li>
                    <strong>Polygon ID:</strong> Un sistema di identità
                    blockchain-native che offre relazioni sicure e fidate tra
                    utenti e dApp, seguendo i principi dell&apos;identità
                    autosovrana e della privacy per impostazione predefinita.
                  </li>
                </List>
              </li>
              <li>
                <strong>Ecosistema in Crescita:</strong>
                <List>
                  <li>
                    <strong>Progetti su Polygon:</strong> Numerosi progetti e
                    applicazioni sono costruiti su Polygon, inclusi giochi Web3,
                    piattaforme DeFi e soluzioni aziendali. Questo dimostra la
                    flessibilità e la robustezza della rete Polygon per
                    supportare diversi casi d&apos;uso.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Applicazioni su Polygon">
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
          <Accordion buttonText="NFT su Polygon">
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
          tutorialLink="./polygon/tutorial"
        />
      </SectionBody>
    </MobileContainer>
  );
}
