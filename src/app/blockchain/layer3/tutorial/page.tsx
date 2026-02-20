import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle>Layer3</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <br />
          <List ordered={true}>
            <li>
              <strong>Creazione di un Account:</strong>
              <List>
                <li>
                  Visita{" "}
                  <Link
                    href={"https://layer3.xyz/"}
                    target="_blank"
                    className="underline"
                  >
                    Layer3
                  </Link>{" "}
                  e connetti il tuo portafoglio cripto, come MetaMask. Segui le
                  istruzioni per completare la configurazione del tuo profilo.
                </li>
              </List>
            </li>
            <li>
              <strong>Partecipazione ai Quests:</strong>
              <List>
                <li>
                  Accedi alla sezione &quot;Quests&quot; su{" "}
                  <Link
                    href={"https://app.layer3.xyz/quests"}
                    target="_blank"
                    className="underline"
                  >
                    app.layer3.xyz/quests
                  </Link>{" "}
                  e scegli un&apos;attività che ti interessa. Completa i
                  passaggi richiesti per guadagnare XP, token e altre
                  ricompense.
                </li>
              </List>
            </li>
            <li>
              <strong>Utilizzo delle Funzionalità di Bridge e Swap:</strong>
              <List>
                <li>
                  Utilizza le funzionalità di bridge e swap per trasferire e
                  scambiare token tra diverse blockchain. Segui le istruzioni
                  sulla piattaforma per completare le transazioni in modo sicuro
                  e efficiente.
                </li>
              </List>
            </li>
            <li>
              <strong>Guadagno di Ricompense:</strong>
              <List>
                <li>
                  Accumula XP e altre ricompense partecipando ai Quests e altre
                  attività su Layer3. Controlla il tuo profilo per monitorare i
                  progressi e riscattare le ricompense.
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
