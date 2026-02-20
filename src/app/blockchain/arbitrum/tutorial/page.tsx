import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle>Arbitrum</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <br />
          <List ordered={false}>
            <li>
              <strong>Utilizzo del Bridge di Arbitrum</strong>
              <List>
                <li>
                  Bridge: Vai alla sezione del bridge su{" "}
                  <Link
                    href={"https://bridge.arbitrum.io/"}
                    target="_blank"
                    className="underline"
                  >
                    Arbitrum Bridge
                  </Link>{" "}
                  per trasferire ETH e token ERC-20 tra Ethereum e Arbitrum.
                  Segui le istruzioni per completare il trasferimento (
                  <Link
                    href={"https://docs.arbitrum.io/"}
                    target="_blank"
                    className="underline"
                  >
                    Arbitrum Docs
                  </Link>
                  ).
                </li>
              </List>
            </li>
            <li>
              <strong>Interazione con dApp su Arbitrum:</strong>
              <List>
                <li>
                  Arbitrum Portal: Visita il{" "}
                  <Link
                    href={"https://portal.arbitrum.io/"}
                    target="_blank"
                    className="underline"
                  >
                    Portale di Arbitrum
                  </Link>{" "}
                  per esplorare le dApp disponibili sulla rete Arbitrum. Puoi
                  interagire con queste applicazioni direttamente tramite il tuo
                  portafoglio MetaMask (
                  <Link
                    href={"https://docs.arbitrum.io/"}
                    target="_blank"
                    className="underline"
                  >
                    Arbitrum Docs
                  </Link>
                  ).
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
