import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Linea</SectionTitle>
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
                    href={"https://linea.build/"}
                    target="_blank"
                    className="underline"
                  >
                    Linea
                  </Link>{" "}
                  e clicca su &quot;Connect Wallet&quot;.
                </li>
                <li>
                  Scegli il tuo portafoglio cripto (ad es. MetaMask) e
                  connettilo alla piattaforma.
                </li>
              </List>
            </li>
            <li>
              <strong>Bridge dei Fondi:</strong>
              <List>
                <li>
                  Utilizza il bridge di Linea per trasferire i tuoi asset da
                  Ethereum o altre reti compatibili a Linea. Segui le istruzioni
                  fornite sulla piattaforma per completare il processo.
                </li>
              </List>
            </li>
            <li>
              <strong>Sviluppo e Distribuzione di Smart Contract:</strong>
              <List>
                <li>
                  Usa gli strumenti di sviluppo compatibili con EVM come Truffle
                  o Hardhat per sviluppare e distribuire smart contract su
                  Linea. Consulta la documentazione per guide dettagliate e
                  esempi di codice.
                </li>
              </List>
            </li>
            <li>
              <strong>Partecipazione al Programma Linea Voyage:</strong>
              <List>
                <li>
                  Partecipa al programma Linea Voyage per esplorare le
                  funzionalità DeFi e guadagnare token XP non trasferibili che
                  rappresentano i tuoi contributi all&apos;ecosistema.
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
