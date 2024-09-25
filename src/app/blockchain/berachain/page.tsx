import { Accordion } from "@/components/Accordion";
import { CardContainer } from "@/components/CardContainer";
import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionTutorial } from "@/components/SectionTutorial";
import { SimpleCard } from "@/components/SimpleCard";
import Link from "next/link";
import Placeholder from "@/assets/placeholder.svg";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Blockchain</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Berachain</h1>
          <p>
            <strong>Berachain</strong> è una blockchain Layer 1 ad alte
            prestazioni, compatibile con Ethereum Virtual Machine (EVM) e
            costruita utilizzando il meccanismo di consenso Proof-of-Liquidity
            (PoL). Progettata per migliorare la liquidità e la sicurezza della
            rete, Berachain punta a rivoluzionare l&apos;ecosistema DeFi
            fornendo una piattaforma scalabile e a basso costo per le
            applicazioni decentralizzate.
          </p>
          <Accordion buttonText="Caratteristiche Principali di Berachain">
            <List ordered={true}>
              <li>
                <strong>Proof-of-Liquidity (PoL):</strong>
                <List>
                  <li>
                    <strong>Meccanismo di Consenso:</strong> PoL premia i
                    fornitori di liquidità sulla rete con token di staking non
                    trasferibili, che migliorano sia la sicurezza che la
                    liquidità della blockchain. Questo approccio incentiva una
                    profonda liquidità DeFi, essenziale per un ecosistema
                    blockchain ricco e funzionale.
                  </li>
                  <li>
                    <strong>Obiettivi:</strong> Integrare gli incentivi della
                    rete con la liquidità dell&apos;ecosistema, decentralizzare
                    lo stake per evitare manipolazioni e allineare gli interessi
                    dei principali stakeholder come validatori, protocolli e
                    utenti (
                    <Link
                      href={
                        "https://nextrope.com/what-is-berachain-%F0%9F%90%BB-%E2%9B%93%EF%B8%8F-proof-of-liquidity-explained/"
                      }
                      target="_blank"
                      className="underline"
                    >
                      Nextrope
                    </Link>
                    ) (
                    <Link
                      href={
                        "https://www.gate.io/learn/articles/an-in-depth-look-at-berachain-exploring-its-layer-1-blockchain-technology-and-its-potential-impact/1642"
                      }
                      target="_blank"
                      className="underline"
                    >
                      Gate.io
                    </Link>
                    ).
                  </li>
                </List>
              </li>
              <li>
                <strong>Architettura Tecnologica:</strong>
                <List>
                  <li>
                    <strong>Compatibilità EVM:</strong> Berachain è
                    completamente identica all&apos;EVM, il che facilita la
                    migrazione delle applicazioni e degli smart contract
                    esistenti da Ethereum a Berachain senza modifiche
                    significative.
                  </li>
                  <li>
                    <strong>BeaconKit:</strong> Un framework modulare utilizzato
                    per sviluppare la blockchain, che sfrutta l&apos;algoritmo
                    di consenso CometBFT per separare il livello di consenso e
                    supportare i client di esecuzione Ethereum (
                    <Link
                      href={"https://docs.berachain.com/learn/index"}
                      target="_blank"
                      className="underline"
                    >
                      Berachain
                    </Link>
                    ).
                  </li>
                </List>
              </li>
              <li>
                <strong>Token Nativi:</strong>
                <List>
                  <li>
                    <strong>$BERA:</strong> Il token principale utilizzato per
                    le transazioni e come bond di attivazione per i validatori.
                  </li>
                  <li>
                    <strong>$BGT:</strong> Il token di governance che viene
                    assegnato ai delegatori e ai fornitori di liquidità,
                    utilizzato nelle proposte di governance e può essere
                    bruciato per ottenere $BERA.
                  </li>
                  <li>
                    <strong>$HONEY:</strong> La stablecoin nativa di Berachain,
                    utilizzata principalmente nelle dApp native della rete (
                    <Link
                      href={"https://docs.berachain.com/learn/index"}
                      target="_blank"
                      className="underline"
                    >
                      Berachain
                    </Link>
                    ).
                  </li>
                </List>
              </li>
              <li>
                <strong>dApp Native:</strong>
                <List>
                  <li>
                    <strong>BEX:</strong> Un exchange decentralizzato nativo.
                  </li>
                  <li>
                    <strong>Bend:</strong> Una piattaforma di lending e
                    borrowing.
                  </li>
                  <li>
                    <strong>Berps:</strong> Un protocollo per i derivati
                    perpetui.
                  </li>
                  <li>
                    <strong>Honey Swap:</strong> Uno strumento per lo scambio di
                    $HONEY con altre stablecoin (
                    <Link
                      href={"https://docs.berachain.com/learn/index"}
                      target="_blank"
                      className="underline"
                    >
                      Berachain
                    </Link>
                    ).
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Progetti su Berachain">
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
          tutorialLink="./berachain/tutorial"
        />
      </SectionBody>
    </MobileContainer>
  );
}
