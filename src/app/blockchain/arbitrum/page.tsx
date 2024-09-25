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
          <h1 className="font-bold text-4xl">Arbitrum</h1>
          <p>
            <strong>Arbitrum</strong> è una suite di soluzioni di scaling per
            Ethereum, progettata per aumentare la scalabilità e ridurre i costi
            di transazione mantenendo la sicurezza della blockchain di Ethereum.
            Arbitrum offre diverse tecnologie e reti Layer 2, come Arbitrum One
            e Arbitrum Nova, per supportare vari casi d&apos;uso nel mondo delle
            applicazioni decentralizzate (dApp).
          </p>
          <Accordion buttonText="Caratteristiche Principali di Arbitrum">
            <List ordered={true}>
              <li>
                <strong>Tecnologia Nitro:</strong>
                <List>
                  <li>
                    <strong>Nitro Stack:</strong> La tecnologia Nitro alimenta
                    tutte le catene Arbitrum, offrendo un throughput elevato e
                    costi di transazione bassi. Nitro utilizza una combinazione
                    di compressione avanzata dei dati, contesti separati per
                    l&apos;esecuzione comune e la prova dei fault, e
                    compatibilità con il gas di Ethereum L1 per ottimizzare le
                    prestazioni.
                  </li>
                </List>
              </li>
              <li>
                <strong>Catene Arbitrum:</strong>
                <List>
                  <li>
                    <strong>Arbitrum One:</strong> Un rollup ottimistico che
                    implementa il protocollo Arbitrum Rollup e si collega alla
                    blockchain di Ethereum. È ideale per applicazioni
                    decentralizzate che richiedono sicurezza simile a quella di
                    Ethereum, ma con costi di transazione ridotti.
                  </li>
                  <li>
                    <strong>Arbitrum Nova:</strong> Utilizza il protocollo
                    AnyTrust, che introduce un comitato di disponibilità dei
                    dati per ridurre ulteriormente i costi di transazione,
                    mantenendo un alto livello di sicurezza. Nova è adatta per
                    applicazioni che richiedono throughput elevato come il
                    gaming e le applicazioni social.
                  </li>
                </List>
              </li>
              <li>
                <strong>Compatibilità e Flessibilità:</strong>
                <List>
                  <li>
                    <strong>Compatibilità con Ethereum:</strong> Arbitrum è
                    progettato per essere altamente compatibile con Ethereum,
                    permettendo agli sviluppatori di utilizzare gli stessi
                    strumenti e librerie. Questo rende facile il deployment di
                    contratti smart e dApp su Arbitrum.
                  </li>
                  <li>
                    <strong>Stylus:</strong> Permette agli sviluppatori di
                    scrivere contratti smart ad alte prestazioni utilizzando
                    linguaggi come Rust, C++, mantenendo la compatibilità con
                    l&apos;Ethereum Virtual Machine (EVM).
                  </li>
                </List>
              </li>
              <li>
                <strong>Sicurezza:</strong>
                <List>
                  <li>
                    <strong>Prove di Frode:</strong> Arbitrum utilizza un
                    sistema di prove di frode per garantire che le transazioni
                    siano sicure e verificate. Questo meccanismo consente di
                    rilevare e dimostrare il comportamento fraudolento,
                    mantenendo la sicurezza del sistema.
                  </li>
                </List>
              </li>
              <li>
                <strong>Economia delle Commissioni:</strong>
                <List>
                  <li>
                    <strong>Commissioni Basse:</strong> Le transazioni su
                    Arbitrum sono più economiche grazie al batch delle
                    transazioni e alla compressione dei dati, riducendo
                    significativamente il costo rispetto alle transazioni su
                    Ethereum.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Progetti su Arbitrum">
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
          tutorialLink="./arbitrum/tutorial"
        />
      </SectionBody>
    </MobileContainer>
  );
}
