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
          <h1 className="font-bold text-4xl">Sanko</h1>
          <p>
            SANKO 2000: The Dream Machine è una console di gioco e un arcade
            basati su blockchain, costruiti nativamente su Arbitrum, per giochi
            basati su NFT e token e social networking. Alimentata da Sanko
            GameCorp ©, The Dream Machine sarà la fonte di una vasta libreria di
            esperienze di gioco uniche.
          </p>

          <Accordion buttonText="Cos’è Sanko">
            <List ordered={true}>
              <li>
                <strong>SANKO GAMECORP ©</strong>
                <List>
                  <li>
                    Sanko GameCorp © è un editore di giochi noto per la
                    pubblicazione di serie di giochi NFT su Ethereum, come
                    Sakura Park e Streets of Milady. Con il prossimo lancio
                    della piattaforma Dream Machine su Arbitrum, tutte le future
                    uscite saranno programmate per Arbitrum. I possessori di NFT
                    Sanko avranno privilegi e ricompense uniche quando si
                    connettono alla piattaforma Dream Machine.
                  </li>
                </List>
              </li>
              <li>
                <strong>DMT (il token)</strong>
                <List>
                  <li>
                    Il Dream Machine Token ($DMT) è il token nativo fungibile e
                    crittograficamente sicuro della piattaforma Dream Machine,
                    progettato per essere utilizzato esclusivamente come token
                    di utilità interoperabile all&apos;interno della
                    piattaforma. $DMT funge da mezzo di scambio tra i
                    partecipanti in modo decentralizzato, facilitando pagamenti
                    e regolamenti sicuri senza intermediari. Non rappresenta
                    partecipazioni o diritti in alcuna azienda e non è
                    progettato per essere utilizzato come pagamento per beni o
                    servizi al di fuori della piattaforma. $DMT incentiva la
                    partecipazione attiva all&apos;ecosistema Dream Machine, con
                    ricompense distribuite in base all&apos;uso e
                    all&apos;attività sulla piattaforma.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Progetti su Sanko">
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
        </div>
        <SectionTutorial
          video={
            "https://www.youtube.com/embed/K4TOrB7at0Y?si=vOBf2_Kw_RkdMPph"
          }
          tutorialLink="./sanko/tutorial"
          
        />
      </SectionBody>
    </MobileContainer>
  );
}
