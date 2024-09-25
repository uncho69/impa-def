import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Polygon zkEVM</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <br />
          <List ordered={true}>
            <li>
              <strong>Connessione del Portafoglio:</strong>
              <List>
                <li>
                  Per iniziare a utilizzare Polygon zkEVM, devi prima
                  configurare il tuo portafoglio cripto (ad esempio, MetaMask)
                  per connetterti alla rete zkEVM. Aggiungi la rete Polygon
                  zkEVM alle impostazioni del tuo portafoglio utilizzando
                  l&apos;RPC fornito dalla documentazione ufficiale.
                </li>
              </List>
            </li>
            <li>
              <strong>Migrazione delle dApps:</strong>
              <List>
                <li>
                  Gli sviluppatori possono migrare le loro applicazioni Ethereum
                  su Polygon zkEVM senza modifiche al codice, grazie alla
                  compatibilità EVM. Utilizza gli stessi strumenti di sviluppo
                  che utilizzi su Ethereum per distribuire i contratti smart su
                  zkEVM.
                </li>
              </List>
            </li>
            <li>
              <strong>Interazione con le dApps:</strong>
              <List>
                <li>
                  Gli utenti possono interagire con le dApps su Polygon zkEVM
                  come farebbero su Ethereum, beneficiando di commissioni di gas
                  ridotte e transazioni più rapide. Cerca le dApps che
                  supportano zkEVM e inizia a utilizzarle con il tuo portafoglio
                  connesso.
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
