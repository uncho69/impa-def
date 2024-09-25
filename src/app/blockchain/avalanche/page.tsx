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
          <h1 className="font-bold text-4xl">Avalanche</h1>
          <p>
            Avalanche è una piattaforma blockchain innovativa progettata per
            offrire alta scalabilità, velocità e sicurezza, con l&apos;obiettivo
            di supportare applicazioni decentralizzate (dApp), contratti
            intelligenti e la creazione di asset digitali. Lanciata nel 2020,
            Avalanche si distingue per il suo meccanismo di consenso unico, che
            permette di elaborare migliaia di transazioni al secondo con tempi
            di finalizzazione quasi istantanei. La piattaforma è compatibile con
            Ethereum, consentendo agli sviluppatori di migrare facilmente le
            proprie dApp e smart contract da Ethereum ad Avalanche.
          </p>
          <Accordion buttonText="Caratteristiche principali di Avalanche">
            <List ordered={true}>
              <li>
                <strong>Scalabilità:</strong> Capacità di elaborare oltre 4.500
                transazioni al secondo, superando di gran lunga molte altre
                blockchain.
              </li>
              <li>
                <strong>Bassi Costi di Transazione:</strong> Le fee su Avalanche
                sono significativamente inferiori rispetto a quelle di altre
                blockchain, rendendo la rete accessibile per un&apos;ampia gamma
                di utenti.
              </li>
              <li>
                <strong>Sicurezza e Decentralizzazione:</strong> Grazie al suo
                protocollo di consenso innovativo, Avalanche mantiene un elevato
                grado di sicurezza e decentralizzazione, rendendo difficile
                qualsiasi tentativo di attacco.
              </li>
              <li>
                <strong>Compatibilità con Ethereum (EVM):</strong> Avalanche è
                compatibile con la Ethereum Virtual Machine (EVM), il che
                permette l’esecuzione di smart contract e applicazioni già
                esistenti su Ethereum, migliorando la portabilità.
              </li>
              <li>
                <strong>Subnet:</strong> Permette la creazione di reti
                blockchain personalizzate all&apos;interno della piattaforma,
                consentendo agli sviluppatori di creare ecosistemi indipendenti
                con regole e governance proprie.
              </li>
              <li>
                <strong>Finalità Immediata:</strong> Le transazioni su Avalanche
                sono confermate in meno di un secondo, offrendo tempi di
                finalizzazione quasi istantanei.
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Progetti su">
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
          tutorialLink="./fantom/tutorial"
          faq={[
            { title: "domanda frequente 1", content: "risposta frequente 1" },
          ]}
        />
      </SectionBody>
    </MobileContainer>
  );
}
