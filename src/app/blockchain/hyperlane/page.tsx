import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionTutorial } from "@/components/SectionTutorial";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle>Blockchain</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Hyperlane</h1>
          <p>
            <strong>Hyperlane</strong> è una piattaforma di interoperabilità
            permissionless che consente di connettere qualsiasi blockchain senza
            bisogno di autorizzazioni, fornendo un&apos;interfaccia di
            comunicazione interchain. È stata progettata per facilitare la
            creazione di blockchain modulari, garantendo che possano interagire
            senza problemi con altre reti esistenti.
          </p>
          <Accordion buttonText="Caratteristiche principali di Hyperlane">
            <List ordered={true}>
              <li>
                <strong>Interoperabilità Permissionless:</strong>
                <List>
                  <li>
                    Hyperlane consente di implementare l&apos;interoperabilità
                    su qualsiasi blockchain senza dover passare attraverso
                    piattaforme autorizzate. Questo rende l&apos;integrazione
                    semplice e veloce, permettendo una comunicazione interchain
                    immediata e senza ostacoli.
                  </li>
                </List>
              </li>
              <li>
                <strong>Modularità:</strong>
                <List>
                  <li>
                    <strong>
                      La piattaforma supporta una struttura modulare che
                      permette agli sviluppatori di aggiungere e configurare
                      componenti di sicurezza secondo le esigenze specifiche dei
                      loro protocolli. Questo include l&apos;uso di vari moduli
                      di sicurezza interchain (ISMs) che possono essere mixati e
                      combinati per ottenere la massima protezione.
                    </strong>
                  </li>
                </List>
              </li>
              <li>
                <strong>Economic Security:</strong>
                <List>
                  <li>
                    <strong>
                      Hyperlane utilizza asset economici per garantire la
                      sicurezza della comunicazione interchain, supportando
                      l&apos;uso di asset principali come ETH o token nativi per
                      la sicurezza delle transazioni.
                    </strong>
                  </li>
                </List>
              </li>
              <li>
                <strong>Warp Routes:</strong>
                <List>
                  <li>
                    <strong>
                      Permette di collegare qualsiasi token a qualsiasi catena
                      senza la necessità di liste di permessi, semplificando la
                      creazione e il trasferimento di asset interchain-native
                      fin dal primo giorno.
                    </strong>
                  </li>
                </List>
              </li>
              <li>
                <strong>Relayer Privato:</strong>
                <List>
                  <li>
                    <strong>
                      Il sistema di relayer di Hyperlane invia transazioni alla
                      blockchain per conto degli utenti, migliorando
                      l&apos;esperienza dell&apos;utente riducendo i costi e
                      velocizzando l&apos;esecuzione delle transazioni. Questo
                      relayer protegge anche dagli attacchi MEV (Miner
                      Extractable Value), garantendo transazioni sicure e
                      private.
                    </strong>
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Quests per potenziale Airdrop">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit nemo
            ipsam minima doloribus cum quos, incidunt fuga est voluptate quia
            excepturi. Quas ducimus voluptatibus rerum natus nesciunt neque
            placeat alias.
          </Accordion>
        </div>
        <SectionTutorial tutorialLink="./hyperlane/tutorial" />
      </SectionBody>
    </MobileContainer>
  );
}
