import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionTutorial } from "@/components/SectionTutorial";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle main={true}>Blockchain</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold text-4xl">Degen</h1>
          <p>
            <strong>DEGEN Chain</strong> è una blockchain di layer 3 costruita
            sopra Base, progettata per supportare applicazioni decentralizzate
            (dApp) e integrare DEGEN come token nativo per il pagamento delle
            commissioni di gas. Utilizza l&apos;architettura di Arbitrum Orbit
            per migliorare la scalabilità e l&apos;efficienza.
          </p>
          <br />
          <p>
            <strong>DEGEN</strong> è un memecoin costruito sulla blockchain di
            Base, un layer 2 di Ethereum sviluppato da Coinbase. Inizialmente
            concepito come un token di ricompensa per la comunità di Farcaster,
            una piattaforma di social media decentralizzata, DEGEN ha
            rapidamente guadagnato popolarità e si è evoluto in un token con
            vari usi all&apos;interno dell&apos;ecosistema Base.
          </p>
          <Accordion buttonText="Caratteristiche principali di DEGEN">
            <List ordered={true}>
              <li>
                <strong>Origini e Scopo:</strong>
                <List>
                  <li>
                    Lanciato nel gennaio 2024, DEGEN è nato come un token di
                    ricompensa per gli utenti attivi del canale Degen su
                    Farcaster. Il termine &quot;Degen&quot; viene dal gergo
                    cripto per descrivere persone con alta tolleranza al
                    rischio. Il token è stato distribuito inizialmente tramite
                    airdrop agli utenti attivi, con piani di distribuire il 70%
                    della fornitura totale in futuro.
                  </li>
                </List>
              </li>
              <li>
                <strong>DEGEN Chain:</strong>
                <List>
                  <li>
                    DEGEN Chain è una blockchain di layer 3 costruita sopra
                    Base, progettata per supportare applicazioni decentralizzate
                    (dApp) e integrare DEGEN come token nativo per il pagamento
                    delle commissioni di gas. Utilizza l&apos;architettura di
                    Arbitrum Orbit per migliorare la scalabilità e
                    l&apos;efficienza.
                  </li>
                </List>
              </li>
              <li>
                <strong>Tokenomics</strong>
                <List>
                  <li>
                    La fornitura totale di DEGEN è di 37 miliardi di token,
                    distribuiti come segue: 70% per la comunità, 15% per il pool
                    di liquidità, e 15% per l&apos;ecosistema. Inoltre, c&apos;è
                    un tasso di inflazione dell&apos;1% che inizierà nel 2028.
                  </li>
                </List>
              </li>
              <li>
                <strong>Potenziali</strong>
                <List>
                  <li>
                    <strong>Finanza Decentralizzata</strong> (DeFi): DEGEN può
                    essere utilizzato per la governance nei protocolli DeFi, lo
                    staking e la fornitura di liquidità.
                  </li>
                  <li>
                    <strong>Integrazione nei Social Media</strong>: DEGEN può
                    servire come token di accesso a comunità esclusive o per
                    ottenere diritti di governance all&apos;interno di
                    piattaforme sociali su Base.
                  </li>
                  <li>
                    <strong>Gaming e Metaverso</strong>: DEGEN può essere
                    utilizzato come valuta in-game per acquistare oggetti,
                    accedere a funzionalità premium, o partecipare a eventi
                    esclusivi.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
        </div>
        <SectionTutorial tutorialLink="./degen/tutorial" />
      </SectionBody>
    </MobileContainer>
  );
}
