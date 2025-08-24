import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle>Blast</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <br />
          <List ordered={true}>
            <li>
              <strong>Connessione del Portafoglio:</strong>
              <List>
                <li>
                  Vai su{" "}
                  <Link
                    href={"https://blast.io/"}
                    target="_blank"
                    className="underline"
                  >
                    Blast
                  </Link>{" "}
                  e connetti il tuo portafoglio Ethereum (come MetaMask). Segui
                  le istruzioni per configurare il tuo account e iniziare a
                  utilizzare la piattaforma.
                </li>
              </List>
            </li>
            <li>
              <strong>Bridging di Token:</strong>
              <List>
                <li>
                  Usa il bridge di Blast per trasferire ETH o stablecoin dalla
                  rete Ethereum a Blast. I token bridged inizieranno
                  automaticamente a guadagnare rendimenti nativi.
                </li>
              </List>
            </li>
            <li>
              <strong>Interazione con dApp su Blast:</strong>
              <List>
                <li>
                  Una volta trasferiti i token su Blast, puoi utilizzare le dApp
                  compatibili per sfruttare le funzionalità di rendimenti nativi
                  e godere di transazioni a basso costo e ad alta velocità.
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
