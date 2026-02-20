import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { ExploreWeb3 } from "@/components/ExploreWeb3";
import Image from "next/image";

export default function Holyheld() {
  return (
    <>
      <PageTitle description="Banca digitale Web3 con carta di debito per spendere crypto nel mondo reale. Sicurezza avanzata e cashback.">
        Holyheld
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <p className="text-neutral-900 mb-6">
            Holyheld è una piattaforma finanziaria basata su Web3 che offre una carta di debito progettata per permettere agli utenti di spendere criptovalute e valute fiat in modo semplice e sicuro, sia online che offline.
          </p>

          <Accordion buttonText="Carta di Debito Web3">
            <div className="space-y-3">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/hheldcard.png"
                  alt="Holyheld Card"
                  width={400}
                  height={250}
                  className="rounded-lg shadow-lg"
                />
              </div>
              
              <p className="text-neutral-900">
                <strong>Compatibilità Universale:</strong> La carta di debito Holyheld è compatibile con le principali reti blockchain come Ethereum e Polygon, supportando diverse criptovalute senza necessità di bridging o lunghi tempi di attesa.
              </p>
              <p className="text-neutral-900">
                <strong>IBAN Personale:</strong> Fornisce un IBAN personale, consentendo agli utenti di inviare e ricevere pagamenti SEPA, pagando affitti o effettuando trasferimenti a familiari e amici.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Gestione della Sicurezza">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Holyheld permette agli utenti di utilizzare il proprio portafoglio non-custodial, garantendo che le chiavi private rimangano sempre sotto il controllo dell'utente. Le transazioni sono protette e godono di assicurazione on-chain fino a $50,000.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Integrazione con Apple Pay e Google Pay">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Gli utenti possono collegare la loro carta Holyheld a Apple Pay e Google Pay per pagamenti rapidi e sicuri direttamente dal proprio smartphone.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Cashback e Ricompense">
            <div className="space-y-3">
              <p className="text-neutral-900">
                <strong>Cashback Istantaneo:</strong> Gli utenti possono guadagnare fino all'1% di cashback in USDC su ogni acquisto effettuato con la carta, con opzioni per richiedere le ricompense in qualsiasi momento.
              </p>
              <p className="text-neutral-900">
                <strong>Programma di Inviti:</strong> Holyheld premia gli utenti per l'invito di nuovi iscritti, con ulteriori ricompense per ogni successivo invito effettuato dai loro amici.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Transazioni senza Gas">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Gli utenti possono approvare transazioni senza dover pagare commissioni di gas, utilizzando il proprio portafoglio esterno.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Utilizzi nel Mondo Reale">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Holyheld collabora con vari protocolli DeFi per offrire servizi come generazione di rendimenti, prestiti, streaming di pagamenti e gestione di NFT, permettendo agli utenti di usufruire di queste funzionalità direttamente tramite la carta.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Privacy e Sicurezza">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Holyheld valorizza la privacy degli utenti e sviluppa prodotti che rispettano la riservatezza delle informazioni. La piattaforma si basa su codici open-source e audit regolari per garantire la sicurezza degli utenti.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Tutorial">
            <div className="space-y-4">
              <p className="text-neutral-900 mb-4">
                Segui i nostri tutorial step-by-step per imparare come utilizzare Holyheld:
              </p>
              
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <h3 className="font-semibold mb-3">Tutorial Disponibili</h3>
                <List>
                  <li>Come creare un account su Holyheld</li>
                  <li>Come collegare il proprio wallet non-custodial</li>
                  <li>Come richiedere la carta di debito Holyheld</li>
                  <li>Come collegare Apple Pay e Google Pay</li>
                  <li>Come guadagnare cashback con gli acquisti</li>
                  <li>Come utilizzare l'IBAN personale</li>
                  <li>Sicurezza e best practices per le transazioni</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>
        <ExploreWeb3 />
      </MobileContainer>
    </>
  );
}
