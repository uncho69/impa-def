import { Accordion } from "@/components/Accordion";
import { CardContainer } from "@/components/CardContainer";
import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionTutorial } from "@/components/SectionTutorial";
import Placeholder from "@/assets/placeholder.svg";
import { SimpleCard } from "@/components/SimpleCard";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Blockchain</SectionTitle>
      <SectionBody>
        <h1 className="font-bold text-4xl">Polygon zkEVM</h1>
        <p>
          <strong>Polygon zkEVM</strong> è una soluzione di scaling Layer 2 per
          la blockchain di Ethereum, sviluppata da Polygon. Utilizza la
          tecnologia zero-knowledge rollup (zk-rollup) per migliorare la
          scalabilità e ridurre le commissioni di gas, mantenendo al contempo la
          sicurezza e la decentralizzazione di Ethereum.
        </p>
        <Accordion buttonText="Caratteristiche principali di Polygon zkEVM">
          <List ordered={true}>
            <li>
              <strong>Zero-Knowledge Rollup (zk-Rollup):</strong>
              <List>
                <li>
                  zkEVM utilizza la tecnologia zk-rollup, che consente di
                  raggruppare molte transazioni off-chain e inviarle come una
                  singola transazione alla rete principale di Ethereum. Questo
                  processo riduce significativamente le commissioni di gas e
                  aumenta la velocità delle transazioni.
                </li>
              </List>
            </li>
            <li>
              <strong>Compatibilità EVM (Ethereum Virtual Machine):</strong>
              <List>
                <li>
                  Polygon zkEVM è completamente compatibile con la Ethereum
                  Virtual Machine, il che significa che gli sviluppatori possono
                  eseguire contratti smart e applicazioni decentralizzate
                  (dApps) sviluppate per Ethereum senza bisogno di modifiche.
                  Questa compatibilità facilita la migrazione delle dApps
                  esistenti su Polygon zkEVM.
                </li>
              </List>
            </li>
            <li>
              <strong>Sicurezza e Decentralizzazione:</strong>
              <List>
                <li>
                  Le transazioni su zkEVM ereditano la sicurezza della rete
                  Ethereum, poiché le prove di validità zero-knowledge vengono
                  inviate alla rete principale di Ethereum per la verifica.
                  Questo garantisce che le transazioni siano sicure e resistenti
                  alla censura.
                </li>
              </List>
            </li>
            <li>
              <strong>Costo Ridotto e Maggiore Scalabilità:</strong>
              <List>
                <li>
                  Utilizzando zk-rollup, Polygon zkEVM riduce le commissioni di
                  gas e aumenta il throughput delle transazioni, rendendo le
                  dApps più economiche e scalabili rispetto all&apos;esecuzione
                  diretta su Ethereum.
                </li>
              </List>
            </li>
            <li>
              <strong>Facilità di Sviluppo:</strong>
              <List>
                <li>
                  Gli sviluppatori possono utilizzare gli strumenti e i
                  framework di sviluppo Ethereum esistenti, come Solidity,
                  Truffle e Hardhat, per creare e distribuire contratti smart su
                  Polygon zkEVM. Questo abbassa la barriera d&apos;ingresso e
                  accelera il processo di sviluppo.
                </li>
              </List>
            </li>
          </List>
        </Accordion>
        <Accordion buttonText="Progetti su Polygon zkEVM">
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
          </CardContainer>
        </Accordion>
        <SectionTutorial tutorialLink="./polygon_zkEVM/tutorial" />
      </SectionBody>
    </MobileContainer>
  );
}
