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
          <h1 className="font-bold text-4xl">zkSync</h1>
          <p>
            zkSync è una soluzione Layer 2 per Ethereum che utilizza la
            tecnologia di zero-knowledge rollups (zk-rollups) per migliorare la
            scalabilità della blockchain, riducendo significativamente i costi
            di transazione e aumentando la velocità delle operazioni mantenendo
            la sicurezza di Ethereum.
          </p>
          <Accordion buttonText="Caratteristiche Principali di zkSync">
            <List ordered={true}>
              <li>
                <strong>Tecnologia zk-Rollup:</strong>
                <List>
                  <li>
                    <strong>Zero-Knowledge Proofs:</strong> zkSync utilizza
                    zk-rollups per aggregare migliaia di transazioni in
                    un&apos;unica transazione su Ethereum, generando una prova
                    zero-knowledge che verifica la validità di tutte le
                    transazioni aggregate. Questo approccio consente di
                    mantenere la sicurezza di Ethereum mentre migliora
                    l&apos;efficienza.
                  </li>
                  <li>
                    <strong>Scalabilità e Costi:</strong> Le transazioni su
                    zkSync sono significativamente più economiche rispetto a
                    quelle su Ethereum Layer 1, con commissioni che possono
                    essere ridotte di oltre il 90%.
                  </li>
                </List>
              </li>
              <li>
                <strong>Compatibilità EVM:</strong>
                <List>
                  <li>
                    <strong>EVM-Compatible:</strong> zkSync è completamente
                    compatibile con Ethereum Virtual Machine (EVM), il che
                    significa che gli sviluppatori possono migrare facilmente i
                    loro smart contract e dApp da Ethereum senza doverli
                    riscrivere. Questa compatibilità semplifica notevolmente lo
                    sviluppo e la scalabilità delle applicazioni.
                  </li>
                </List>
              </li>
              <li>
                <strong>Sicurezza e Finalità:</strong>
                <List>
                  <li>
                    <strong>Sicurezza Integrata:</strong> zkSync garantisce la
                    sicurezza delle transazioni grazie alla sicurezza intrinseca
                    di Ethereum, utilizzando la crittografia zero-knowledge per
                    convalidare le transazioni senza esporre i dati sensibili.
                  </li>
                  <li>
                    <strong>Finalità delle Transazioni:</strong> Le transazioni
                    su zkSync sono finali e non reversibili, aumentando la
                    sicurezza e la trasparenza del sistema.
                  </li>
                </List>
              </li>
              <li>
                <strong>Sviluppo e Innovazione:</strong>
                <List>
                  <li>
                    <strong>Sviluppo Continuo:</strong> zkSync continua a
                    innovare con nuove funzionalità e miglioramenti, come zkSync
                    2.0, che mira a integrare ulteriormente la scalabilità e le
                    funzionalità di Ethereum, offrendo una soluzione ancora più
                    potente e integrata .
                  </li>
                </List>
              </li>
              <li>
                <strong>Integrazione con dApps:</strong>
                <List>
                  <li>
                    <strong>dApps Su zkSync:</strong> zkSync supporta una vasta
                    gamma di applicazioni decentralizzate, dalle piattaforme di
                    scambio decentralizzato (DEX) alle applicazioni di finanza
                    decentralizzata (DeFi), offrendo una soluzione scalabile per
                    una vasta gamma di use case.
                  </li>
                </List>
              </li>
            </List>
          </Accordion>
          <Accordion buttonText="Progetti su zkSync">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
            maxime velit hic repellendus a sapiente modi. Praesentium sapiente
            asperiores eius, fuga, suscipit, nulla rerum natus quibusdam ipsam
            cupiditate perferendis sed?
          </Accordion>
        </div>
        <SectionTutorial tutorialLink="./zksync/tutorial" />
      </SectionBody>
    </MobileContainer>
  );
}
