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
          <h1 className="font-bold text-4xl">Blast</h1>
          <p>
            <strong>Blast</strong> è una soluzione di Layer 2 per Ethereum,
            sviluppata per migliorare la scalabilità e l&apos;efficienza delle
            transazioni. Utilizza un rollup ottimistico (Optimistic Rollup) per
            ridurre i costi di gas e aumentare il throughput delle transazioni,
            mantenendo al contempo la sicurezza e la decentralizzazione della
            rete Ethereum. Uno degli aspetti distintivi di Blast è la sua
            capacità di offrire rendimenti nativi (native yield) su ETH e
            stablecoin direttamente sulla rete.
          </p>
          <br />
          <Accordion buttonText="Caratteristiche principali di Blast">
            <List ordered={true}>
              <li>
                <strong>Rendimenti Nativi:</strong>
                <List>
                  <li>
                    <strong>ETH Staking:</strong> Blast offre rendimenti nativi
                    per ETH attraverso lo staking su Lido. Gli ETH depositati
                    vengono automaticamente convertiti in token rimborsabili su
                    Blast, che generano rendimenti periodici.
                  </li>
                  <li>
                    <strong>T-Bill Yield per Stablecoin:</strong> Le stablecoin
                    depositate su Blast vengono convertite in USDB, un token
                    stabile che guadagna interessi attraverso il protocollo
                    T-Bill di MakerDAO. Questo permette agli utenti di
                    guadagnare un rendimento annuo su stablecoin senza la
                    necessità di staking separato.
                  </li>
                </List>
              </li>
              <li>
                <strong>Compatibilità EVM:</strong>
                <List>
                  <li>
                    Blast è completamente compatibile con l&apos;Ethereum
                    Virtual Machine (EVM), il che significa che gli sviluppatori
                    possono facilmente migrare le loro dApp esistenti su Blast
                    senza necessità di modifiche significative.
                  </li>
                </List>
              </li>
              <li>
                <strong>Rebasing Automatica:</strong>
                <List>
                  <li>
                    ETH e USDB su Blast utilizzano un meccanismo di rebasing
                    automatica, che aggiorna periodicamente il saldo degli
                    utenti per riflettere i rendimenti guadagnati. Questo
                    sistema rende più semplice e trasparente per gli utenti
                    vedere i loro guadagni.
                  </li>
                </List>
              </li>
              <li>
                <strong>Condivisione dei Ricavi del Gas:</strong>
                <List>
                  <li>
                    A differenza di altre soluzioni Layer 2, Blast restituisce i
                    ricavi netti delle commissioni di gas ai sviluppatori delle
                    dApp, che possono scegliere di trattenere questi ricavi o di
                    utilizzarli per sovvenzionare le commissioni di gas per gli
                    utenti finali.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
        </div>
        <SectionTutorial tutorialLink="./blast/tutorial" />
      </SectionBody>
    </MobileContainer>
  );
}
