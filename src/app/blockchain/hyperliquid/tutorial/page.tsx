import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle>Hyperliquid</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <br />
          <List ordered={true}>
            <li>
              <strong>Accesso a Hyperliquid:</strong>
              <List>
                <li>
                  <strong>Visita il Sito di Hyperliquid:</strong> Vai su{" "}
                  <Link
                    href={"https://hyperliquid.xyz/"}
                    target="_blank"
                    className="underline"
                  >
                    Hyperliquid
                  </Link>{" "}
                  e clicca su &quot;Launch App&quot; per accedere
                  all&apos;interfaccia utente.
                </li>
                <li>
                  <strong>Collegamento del Portafoglio:</strong> Clicca su
                  &quot;Connect Wallet&quot; e seleziona MetaMask per collegare
                  il tuo portafoglio.
                </li>
              </List>
            </li>
            <li>
              <strong>Trading di Perpetual Futures:</strong>
              <List>
                <li>
                  <strong>Selezione del Mercato:</strong> Scegli il mercato di
                  futures desiderato (ad esempio, BTC/USDT).
                </li>
                <li>
                  <strong>Inserimento dell&apos;Ordine:</strong> Inserisci i
                  dettagli del tuo ordine, inclusi il tipo di ordine (market,
                  limit, TWAP) e la quantità.
                </li>
                <li>
                  <strong>Conferma dell&apos;Ordine:</strong> Conferma
                  l&apos;ordine e la transazione in MetaMask.
                </li>
              </List>
            </li>
            <li>
              <strong>Fornitura di Liquidità e Vaults:</strong>
              <List>
                <li>
                  <strong>Aggiunta di Liquidità:</strong> Vai alla sezione
                  &quot;Vaults&quot; e seleziona il vault di liquidità
                  desiderato. Deposita i tuoi asset per guadagnare interessi
                  passivi.
                </li>
                <li>
                  <strong>Gestione della Liquidità:</strong> Monitora i tuoi
                  depositi e guadagni nella dashboard di Hyperliquid.
                </li>
              </List>
            </li>
            <li>
              <strong>Monitoraggio e Gestione del Rischio:</strong>
              <List>
                <li>
                  <strong>Visualizzazione del Portafoglio:</strong> Visualizza i
                  tuoi saldi e posizioni attuali nella sezione
                  &quot;Portfolio&quot;.
                </li>
                <li>
                  <strong>Impostazione di Ordini TP/SL:</strong> Utilizza gli
                  ordini TP/SL per gestire automaticamente i rischi e
                  ottimizzare i profitti.
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
