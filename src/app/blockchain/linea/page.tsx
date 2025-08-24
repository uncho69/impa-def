import { Accordion } from "@/components/Accordion";
import { CardContainer } from "@/components/CardContainer";
import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionTutorial } from "@/components/SectionTutorial";
import { SimpleCard } from "@/components/SimpleCard";
import Placeholder from "@/assets/placeholder.svg";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle>Blockchain</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Linea</h1>
          <p>
            <strong>Linea</strong> è una rete zkEVM (Zero-Knowledge Ethereum
            Virtual Machine) progettata per migliorare la scalabilità e
            l&apos;efficienza delle applicazioni decentralizzate (dApps)
            all&apos;interno dell&apos;ecosistema Ethereum. Linea è supportata
            da Consensys e sfrutta la tecnologia zk-rollup per offrire
            transazioni rapide, economiche e sicure. Lanciata nel 2023, Linea è
            compatibile con la EVM, il che significa che gli sviluppatori
            possono facilmente migrare le loro applicazioni Ethereum esistenti o
            crearne di nuove senza dover imparare nuove competenze tecniche.
          </p>
          <Accordion buttonText="Funzionalità di Linea">
            <List ordered={true}>
              <li>
                <strong>zkEVM Compatibile:</strong>
                <List>
                  <li>
                    Linea offre piena compatibilità con la EVM, permettendo agli
                    sviluppatori di utilizzare gli stessi strumenti e framework
                    di sviluppo già noti su Ethereum. Questo include il supporto
                    per Solidity, il linguaggio di programmazione di Ethereum, e
                    per i principali tool di sviluppo come Truffle e Hardhat.
                  </li>
                </List>
              </li>
              <li>
                <strong>Transazioni Veloci e Basse Commissioni:</strong>
                <List>
                  <li>
                    La tecnologia zk-rollup utilizzata da Linea consente di
                    raggruppare molte transazioni in un&apos;unica prova di
                    conoscenza zero, riducendo i costi di gas e migliorando la
                    velocità delle transazioni. Questo la rende ideale per
                    applicazioni DeFi ad alta frequenza e giochi blockchain che
                    richiedono transazioni rapide e a basso costo.
                  </li>
                </List>
              </li>
              <li>
                <strong>Sicurezza Avanzata:</strong>
                <List>
                  <li>
                    Linea impiega la crittografia basata su reticolo e zkSNARKs
                    (Zero-Knowledge Succinct Non-Interactive Arguments of
                    Knowledge) per garantire la sicurezza e la privacy delle
                    transazioni. Inoltre, collabora con oltre 20 partner di
                    sicurezza per monitorare le minacce in tempo reale e
                    proteggere gli utenti.
                  </li>
                </List>
              </li>
              <li>
                <strong>Esperienza Utente Migliorata:</strong>
                <List>
                  <li>
                    Gli utenti possono pagare le commissioni di transazione in
                    stablecoin, semplificando l&apos;esperienza e riducendo le
                    barriere tecniche all&apos;ingresso. Linea supporta anche
                    l&apos;astrazione degli account, che permette una gestione
                    più facile delle transazioni.
                  </li>
                </List>
              </li>
              <li>
                <strong>Integrazione con MetaMask:</strong>
                <List>
                  <li>
                    Linea è strettamente integrata con MetaMask, il portafoglio
                    web3 più popolare, permettendo agli utenti di connettersi
                    facilmente e gestire le loro risorse sulla rete Linea.
                    Questa integrazione facilita l&apos;adozione e
                    l&apos;interazione con le dApp costruite su Linea.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Progetti su Linea">
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
        <SectionTutorial tutorialLink="./linea/tutorial" />
      </SectionBody>
    </MobileContainer>
  );
}
