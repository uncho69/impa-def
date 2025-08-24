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
          <h1 className="font-bold text-4xl">Layer3</h1>
          <p>
            <strong>Layer3</strong> è una piattaforma che facilita
            l&apos;esplorazione, il guadagno e il trading nel mondo delle
            criptovalute attraverso esperienze interattive e cross-chain. La
            missione di Layer3 è quella di semplificare l&apos;adozione delle
            criptovalute offrendo strumenti e infrastrutture che riducono la
            frammentazione e migliorano l&apos;esperienza utente.
          </p>

          <Accordion buttonText="Caratteristiche principali di Layer3">
            <List ordered={true}>
              <li>
                <strong>Esperienze Interattive (Quests):</strong>
                <List>
                  <li>
                    Layer3 offre &quot;Quests&quot;, che sono esperienze
                    on-chain interattive che permettono agli utenti di esplorare
                    varie tecnologie cripto e guadagnare ricompense. Questi
                    Quests sono progettati per essere accessibili a tutti,
                    indipendentemente dal livello di abilità.
                  </li>
                </List>
              </li>
              <li>
                <strong>Identità Omnichain:</strong>
                <List>
                  <li>
                    La piattaforma permette di aggregare risultati cross-chain,
                    creando un&apos;identità unica che può essere utilizzata su
                    diverse blockchain. Questo semplifica la gestione delle
                    credenziali e delle attività on-chain degli utenti.
                  </li>
                </List>
              </li>
              <li>
                <strong>Distribuzione degli Incentivi Modulari:</strong>
                <List>
                  <li>
                    Layer3 utilizza un&apos;infrastruttura modulare per
                    distribuire incentivi in modo efficiente. Gli utenti possono
                    guadagnare token, punti esperienza (XP), e altre ricompense
                    partecipando ai Quests e completando attività sulla
                    piattaforma.
                  </li>
                </List>
              </li>
              <li>
                <strong>Bridge e Swap di Token:</strong>
                <List>
                  <li>
                    Layer3 include funzionalità di bridge e swap, permettendo
                    agli utenti di trasferire e scambiare token tra diverse
                    blockchain in modo semplice e sicuro. Questo è reso
                    possibile grazie all&apos;integrazione con i migliori
                    aggregatori di liquidità.
                  </li>
                </List>
              </li>
              <li>
                <strong>Comunità e Ricompense:</strong>
                <List>
                  <li>
                    Gli utenti possono guadagnare $LAYER e punti perpetuamente
                    riscattabili completando attività e partecipando alla
                    comunità. Questo sistema di ricompense incentiva la
                    partecipazione continua e l&apos;impegno nella piattaforma.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
        </div>
        <SectionTutorial tutorialLink="./layer3/tutorial" />
      </SectionBody>
    </MobileContainer>
  );
}
