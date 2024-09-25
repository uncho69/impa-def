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
      <SectionTitle main={true}>Blockchain</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Scroll</h1>
          <p>
            <strong>Scroll</strong> è una soluzione Layer 2 per Ethereum che
            utilizza la tecnologia zkEVM per migliorare la scalabilità, ridurre
            i costi di transazione e mantenere la sicurezza della blockchain di
            Ethereum. Scroll è progettato per essere completamente compatibile
            con l&apos;Ethereum Virtual Machine (EVM), facilitando la migrazione
            delle applicazioni esistenti su Scroll senza modifiche
            significative.
          </p>
          <Accordion buttonText="Caratteristiche Principali di Scroll">
            <List ordered={true}>
              <li>
                <strong>Tecnologia zkEVM:</strong>
                <List>
                  <li>
                    <strong>zkEVM:</strong> Scroll utilizza una zkEVM
                    (Zero-Knowledge Ethereum Virtual Machine) per generare prove
                    crittografiche che attestano la validità delle transazioni
                    eseguite. Questo approccio migliora la sicurezza e riduce i
                    costi, mantenendo la compatibilità con l&apos;EVM.
                  </li>
                </List>
              </li>
              <li>
                <strong>Architettura di Scroll:</strong>
                <List>
                  <li>
                    <strong>Settlement Layer:</strong> Utilizza Ethereum come
                    livello di settlement per garantire la disponibilità dei
                    dati e l&apos;ordinamento delle transazioni. Questo livello
                    verifica le prove di validità e consente agli utenti e alle
                    dApp di inviare messaggi e asset tra Ethereum e Scroll.
                  </li>
                  <li>
                    <strong>Sequencing Layer:</strong> Include un Execution Node
                    che esegue le transazioni e un Rollup Node che aggrega le
                    transazioni in batch e le invia a Ethereum per la
                    finalizzazione.
                  </li>
                  <li>
                    <strong>Proving Layer:</strong> Comprende un pool di prover
                    responsabili della generazione delle prove di validità zkEVM
                    e un coordinatore che gestisce queste prove e le invia al
                    Rollup Node per la finalizzazione.
                  </li>
                </List>
              </li>
              <li>
                <strong>Costi di Transazione:</strong>
                <List>
                  <li>
                    <strong>L2 Fee:</strong> Le transazioni su Scroll devono
                    pagare una commissione per l&apos;esecuzione delle
                    operazioni e la memorizzazione dei dati, calcolata in modo
                    simile alle transazioni su Ethereum.
                  </li>
                  <li>
                    <strong>L1 Fee:</strong> Le transazioni devono anche pagare
                    una commissione per la memorizzazione dei dati su Ethereum,
                    che viene calcolata in base al numero di byte zero e non
                    zero nella transazione RLP-encoded.
                  </li>
                </List>
              </li>
              <li>
                <strong>Pre-Alpha Testnet:</strong>
                <List>
                  <li>
                    <strong>Testnet:</strong> Scroll ha lanciato una pre-alpha
                    testnet che supporta il deployment di smart contract,
                    permettendo agli sviluppatori di testare e sperimentare con
                    la piattaforma prima del lancio ufficiale.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Progetti su Scroll">
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
        <SectionTutorial
          video={
            "https://www.youtube.com/embed/K4TOrB7at0Y?si=vOBf2_Kw_RkdMPph"
          }
          tutorialLink="./scroll/tutorial"
        />
      </SectionBody>
    </MobileContainer>
  );
}
