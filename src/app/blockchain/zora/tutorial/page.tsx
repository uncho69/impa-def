import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle>Zora</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <br />
          <List ordered={true}>
            <li>
              <strong>Creazione di un Account:</strong>
              <List>
                <li>
                  Visita Zora e connetti il tuo portafoglio cripto (come
                  MetaMask). Segui le istruzioni per configurare il tuo profilo
                  e iniziare a esplorare la piattaforma.
                </li>
              </List>
            </li>
            <li>
              <strong>Minting di NFT:</strong>
              <List>
                <li>
                  Clicca sul pulsante “+” nell&apos;angolo in alto a destra per
                  iniziare a creare la tua collezione. Carica il tuo file
                  multimediale, configura i dettagli del token e imposta il
                  prezzo di minting. Dopo aver completato la configurazione,
                  conferma la transazione e la tua collezione sarà pronta per la
                  condivisione.
                </li>
              </List>
            </li>
            <li>
              <strong>Acquisto di NFT:</strong>
              <List>
                <li>
                  Per acquistare un NFT su Zora, puoi partecipare a un&apos;asta
                  con riserva, acquistare direttamente con il prezzo di acquisto
                  immediato, o fare un&apos;offerta aperta su NFT non listati.
                  Approva la transazione tramite il tuo portafoglio e completa
                  l&apos;acquisto.
                </li>
              </List>
            </li>
            <li>
              <strong>Partecipazione alla Governance:</strong>
              <List>
                <li>
                  Se possiedi token della Zora DAO, puoi partecipare alle
                  votazioni sulle proposte del protocollo. Visita la sezione
                  governance della piattaforma per visualizzare le proposte
                  attuali e votare.
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
