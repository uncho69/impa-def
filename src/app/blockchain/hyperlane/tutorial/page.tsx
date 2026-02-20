import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle>Hyperlane</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <br />
          <List ordered={true}>
            <li>
              <strong>Connessione del Portafoglio:</strong>
              <List>
                <li>
                  Visita{" "}
                  <Link
                    href={"https://www.hyperlane.xyz/"}
                    target="_blank"
                    className="underline"
                  >
                    Hyperlane
                  </Link>{" "}
                  e clicca su &quot;Connect Wallet&quot; per collegare il tuo
                  portafoglio cripto, come MetaMask.
                </li>
              </List>
            </li>
            <li>
              <strong>Creazione di un Account Interchain:</strong>
              <List>
                <li>
                  Usa l&apos;API on-chain di Hyperlane per creare e controllare
                  account su reti remote senza bisogno di deployment su quelle
                  reti.
                </li>
              </List>
            </li>
            <li>
              <strong>Uso delle Warp Routes:</strong>
              <List>
                <li>
                  Configura le Warp Routes per collegare e trasferire i tuoi
                  token su diverse blockchain senza permessi, facilitando il
                  trading e lo spostamento di asset.
                </li>
              </List>
            </li>
            <li>
              <strong>Personalizzazione della Sicurezza:</strong>
              <List>
                <li>
                  Configura i moduli di sicurezza interchain (ISMs) per
                  proteggere le tue transazioni in base alle esigenze specifiche
                  del tuo protocollo. Puoi scegliere tra moduli preconfigurati o
                  crearne di nuovi per future esigenze di sicurezza.
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
