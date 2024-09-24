import { Accordion } from "@/components/Accordion";
import { MobileContainer } from "@/components/MobileContainer";
import { SectionBody } from "@/components/SectionBody";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionTutorial } from "@/components/SectionTutorial";

export default function manuale() {
  return (
    <MobileContainer>
      <SectionTitle>Blockchains</SectionTitle>
      <SectionBody>
        <div>
          <h1 className="font-bold">Ethereum</h1>
          <p>
            Ethereum è una blockchain programmabile che consente la creazione e
            l&apos;esecuzione di smart contract e applicazioni decentralizzate
            (dApp) senza intermediari. Fondata da Vitalik Buterin nel 2015,
            Ethereum ha rivoluzionato il settore, superando il semplice
            trasferimento di valore per abilitare un’intera economia digitale
            decentralizzata.
          </p>
          <br />
          <p>
            Ethereum permette agli sviluppatori di costruire e distribuire
            applicazioni sicure e trasparenti su una rete globale, grazie agli
            smart contract, che eseguono automaticamente accordi senza rischio
            di frode o censura. Ciò ha reso Ethereum la base della finanza
            decentralizzata (DeFi), degli NFT e di molte altre innovazioni. Con
            la recente transizione a Proof of Stake (Ethereum 2.0), la rete
            punta a essere più scalabile e sostenibile per il futuro delle dApp
            e della blockchain.
          </p>
          <Accordion buttonText="Introduzione ad Ethereum">a</Accordion>
          <Accordion buttonText="Portafogli (”Wallet”) Supportati">a</Accordion>
          <Accordion buttonText="Applicazioni su Ethereum">a</Accordion>
          <Accordion buttonText="NFT su Ethereum">a</Accordion>
          <Accordion buttonText="Memecoin su Ethereum">a</Accordion>
        </div>
        <SectionTutorial
          video={
            "https://www.youtube.com/embed/DQFUUjlGFkU?si=de5KjASE23Yr-gts"
          }
          tutorialLink="./tutorial"
          faq={[
            { title: "domanda frequente 1", content: "risposta frequente 1" },
          ]}
        />
      </SectionBody>
    </MobileContainer>
  );
}
