import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle>nome blockchain</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Tutorial</h1>
          <br />
          <List ordered={true}>
            <li>
              <strong>Acquisto di DEGEN</strong>
              <List>
                <li>
                  Puoi acquistare DEGEN su vari exchange decentralizzati come
                  Uniswap v3. Assicurati di avere ETH sulla rete Base nel tuo
                  portafoglio per scambiare con DEGEN.
                </li>
              </List>
            </li>
            <li>
              <strong>Uso di DEGEN:</strong>
              <List>
                <li>
                  Puoi utilizzare DEGEN per partecipare a progetti DeFi, giocare
                  a giochi nel metaverso, o interagire con applicazioni sociali
                  su Base. Inoltre, puoi partecipare alla governance dei
                  protocolli che utilizzano DEGEN come token di voto.
                  <List>
                    <li>
                      L’uso principale di DEGEN è su Warpcast (client di
                      Farcaster), dove gli utenti del social Web3 possono
                      “tippare” DEGEN ad altri utenti della piattaforma.
                    </li>
                  </List>
                </li>
              </List>
            </li>
            <li>
              <strong>Partecipazione alla Comunità:</strong>
              <List>
                <li>
                  Coinvolgiti con la comunità di DEGEN su Farcaster e altre
                  piattaforme sociali per rimanere aggiornato sulle novità e
                  partecipare agli airdrop futuri.
                </li>
              </List>
            </li>
          </List>
        </div>
      </SectionBody>
    </MobileContainer>
  );
}
