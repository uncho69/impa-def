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
        <div>
          <h1 className="font-bold text-4xl">Zora</h1>
          <p>
            Zora è una piattaforma innovativa che combina un marketplace di NFT
            e una soluzione di Layer 2 sulla blockchain di Ethereum. La missione
            di Zora è di rendere la creazione su internet libera e preziosa,
            permettendo agli artisti e ai creatori di monetizzare il loro lavoro
            senza intermediari. La piattaforma è progettata per essere un hub
            per l&apos;immaginazione, consentendo agli utenti di mintare,
            comprare e vendere NFT in modo efficiente e decentralizzato.
          </p>

          <Accordion buttonText="Caratteristiche principali di Zora">
            <List ordered={true}>
              <li>
                <strong>Minting e Vendita di NFT:</strong>
                <List>
                  <li>
                    Zora permette ai creatori di mintare NFT utilizzando il suo
                    toolkit per creatori. La piattaforma supporta diversi
                    formati di media, tra cui video, GIF, audio, immagini 3D e
                    altro. I creatori possono stabilire prezzi fissi o
                    utilizzare meccanismi di asta per vendere le loro opere.
                  </li>
                </List>
              </li>
              <li>
                <strong>Zora Network:</strong>
                <List>
                  <li>
                    Zora ha lanciato il suo Layer 2 chiamato Zora Network,
                    basato sull&apos;OP Stack, che offre transazioni più rapide,
                    costi ridotti e una scalabilità maggiore, specificamente
                    ottimizzato per il supporto di media e NFT. La rete è
                    EVM-compatibile, permettendo una facile integrazione con
                    altre applicazioni e contratti smart su Ethereum.
                  </li>
                </List>
              </li>
              <li>
                <strong>Governance Decentralizzata con Zora DAO:</strong>
                <List>
                  <li>
                    La piattaforma è governata dalla comunità tramite Zora DAO,
                    che gestisce i diritti di protocollo e le commissioni di
                    minting. I partecipanti possono influenzare le decisioni
                    chiave del protocollo attraverso votazioni decentralizzate.
                  </li>
                </List>
              </li>
              <li>
                <strong>Esperienze di Minting e Vendita:</strong>
                <List>
                  <li>
                    Zora offre diversi metodi per l&apos;acquisto di NFT: aste
                    con riserva, acquisti diretti e offerte aperte. I creatori
                    possono scegliere tra collezioni con pezzi unici (Drops) o
                    collezioni di edizioni multiple (Editions), ciascuna con
                    diverse opzioni di configurazione.
                  </li>
                </List>
              </li>
              <li>
                <strong>Strumenti per Sviluppatori:</strong>
                <List>
                  <li>
                    La Zora API e il Zora Dev Kit (ZDK) facilitano lo sviluppo
                    di applicazioni che interagiscono con i dati NFT, monitorano
                    eventi on-chain e analizzano l&apos;attività di vendita.
                    Questi strumenti rendono accessibile la creazione e gestione
                    di marketplace e altre applicazioni basate su NFT.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Progetti su Zora">
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
            </CardContainer>
          </Accordion>
        </div>
        <SectionTutorial
          video={
            "https://www.youtube.com/embed/K4TOrB7at0Y?si=vOBf2_Kw_RkdMPph"
          }
          tutorialLink="./zora/tutorial"
        />
      </SectionBody>
    </MobileContainer>
  );
}
