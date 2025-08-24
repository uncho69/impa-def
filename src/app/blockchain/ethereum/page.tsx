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
      <SectionTitle>Blockchain</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Ethereum</h1>
          <p>
            Ethereum è una blockchain che consente la creazione e
            l&apos;esecuzione di smart contract e applicazioni decentralizzate
            (dApp) senza alcuna interruzione, frode, controllo o interferenza da
            parte di terzi. Fondata da Vitalik Buterin nel 2015, Ethereum ha
            rivoluzionato il mondo delle criptovalute e della blockchain,
            andando oltre il semplice trasferimento di valore per abilitare
            un&apos;intera economia di applicazioni decentralizzate.
          </p>
          <Accordion buttonText="Introduzione ad Ethereum">
            <List ordered={false}>
              <li>
                <strong>Ether (ETH)</strong>
                <List>
                  <li>
                    Ether è la criptovaluta nativa di Ethereum e viene
                    utilizzata per pagare le commissioni di transazione (gas) e
                    compensare i minatori e, successivamente, i validatori per
                    il loro lavoro di mantenimento della rete. Oltre a essere
                    utilizzato per le transazioni, ETH funge da combustibile per
                    eseguire smart contract e dApp sulla piattaforma
                  </li>
                </List>
              </li>
              <li>
                <strong>Smart Contracts</strong>
                <List>
                  <li>
                    Gli smart contract sono programmi informatici autoeseguibili
                    con i termini dell&apos;accordo direttamente scritti nel
                    codice. Eseguono automaticamente le condizioni definite al
                    loro interno quando vengono soddisfatti i requisiti
                    specificati.
                    <br />
                    <strong>Esempi di Uso:</strong> Utilizzati per creare
                    contratti finanziari, gestione della supply chain,
                    applicazioni di voto e molto altro.
                  </li>
                </List>
              </li>
              <li>
                <strong>dApp (Applicazioni Decentralizzate)</strong>
                <List>
                  <li>
                    Le dApp sono applicazioni che funzionano su una rete di
                    computer decentralizzati anziché su un server centralizzato.
                    Utilizzano smart contract per gestire la logica di business
                    sulla blockchain. Applicazioni DeFi (Finanza
                    Decentralizzata), giochi basati su blockchain, mercati NFT
                    (token non fungibili) e molto altro.
                  </li>
                </List>
              </li>
              <li>
                <strong>Ethereum Virtual Machine (EVM)</strong>
                <List>
                  <li>
                    La EVM è l’ambiente di programmazione che esegue gli smart
                    contract su Ethereum. Fornisce un sistema sicuro e isolato
                    per eseguire il codice, garantendo che le transazioni siano
                    verificate e immutabili. <br />{" "}
                    <strong>Funzionalità:</strong> Permette agli sviluppatori di
                    creare e distribuire applicazioni decentralizzate in modo
                    affidabile. Tutte le Layer2 come Optimism, Arbitrum, Polygon
                    etc sono basate su EVM.
                  </li>
                </List>
              </li>
              <li>
                <strong>Decentralizzazione</strong>
                <List>
                  <li>
                    <strong>Rete di Nodi:</strong> Ethereum è mantenuto da una
                    rete globale di nodi, ognuno dei quali conserva una copia
                    della blockchain e verifica le transazioni, garantendo la
                    sicurezza e l&apos;integrità del sistema.
                  </li>
                  <li>
                    <strong>Consenso:</strong> Attualmente utilizza il
                    meccanismo di consenso Proof of Stake (PoS), che sostituisce
                    il precedente Proof of Work (PoW) per migliorare
                    l&apos;efficienza energetica e la scalabilità.
                  </li>
                </List>
              </li>
              <li>
                <strong>Ethereum 2.0 (Eth2)</strong>
                <List ordered={true}>
                  Ethereum 2.0, noto anche come Eth2 o Serenity, è un
                  aggiornamento importante alla rete Ethereum che mira a
                  migliorare la scalabilità, la sicurezza e la sostenibilità
                  della rete. Questo aggiornamento è stato implementato in
                  diverse fasi: <br />
                  <li>
                    <strong>Beacon Chain:</strong> <br />
                    Lanciata a dicembre 2020, la Beacon Chain introduce il
                    consenso Proof of Stake (PoS) alla rete Ethereum.
                  </li>
                  <li>
                    <strong>The Merge:</strong> <br />
                    Completato a settembre 2022, The Merge ha integrato la
                    Beacon Chain con la mainnet di Ethereum, completando la
                    transizione dal Proof of Work (PoW) al Proof of Stake (PoS).
                  </li>
                  <li>
                    <strong>Shard Chains</strong> (Futuro): <br />
                    Miglioreranno la scalabilità di Ethereum dividendo il carico
                    di lavoro su 64 nuove catene parallele, permettendo un
                    maggiore numero di transazioni al secondo.
                  </li>
                </List>
              </li>
              <li>
                <strong>Vantaggi di Ethereum</strong>
                <List>
                  <li>
                    <strong>Flessibilità:</strong> La capacità di creare smart
                    contract consente a Ethereum di supportare una vasta gamma
                    di applicazioni decentralizzate.
                  </li>
                  <li>
                    <strong>Sicurezza:</strong> La natura decentralizzata di
                    Ethereum e il suo robusto meccanismo di consenso rendono la
                    rete altamente sicura.
                  </li>
                  <li>
                    <strong>Innovazione Continua:</strong> Ethereum ha una
                    comunità di sviluppatori attiva che continua a migliorare la
                    piattaforma e a creare nuove applicazioni.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Portafogli (”Wallet”) Supportati">
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
          <Accordion buttonText="Applicazioni su Ethereum">
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
          <Accordion buttonText="NFT su Ethereum">
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
          <Accordion buttonText="Memecoin su Ethereum">
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
          tutorialLink="./ethereum/tutorial"
        />
      </SectionBody>
    </MobileContainer>
  );
}
