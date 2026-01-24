import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { ExploreWeb3 } from "@/components/ExploreWeb3";

export default function Transak() {
  return (
    <>
      <PageTitle description="On-ramp fiat-crypto che permette acquisti diretti con carta. Supporta oltre 155 paesi con integrazione facile.">
        Transak
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <p className="text-neutral-900 mb-6">
            Transak è una piattaforma che fornisce soluzioni di onboarding per il Web3, consentendo agli utenti di acquistare e vendere criptovalute utilizzando valute fiat. Transak integra metodi di pagamento locali, conformità e liquidità da tutto il mondo per semplificare l'accesso alle criptovalute per utenti e aziende.
          </p>

          <Accordion buttonText="On-Ramp e Off-Ramp Fiat-Crypto">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Transak permette agli utenti di acquistare criptovalute direttamente utilizzando valute fiat. Offre un servizio off-ramp che consente di convertire le criptovalute in fiat e di trasferirle direttamente sui conti bancari degli utenti, migliorando l'accessibilità e la semplicità delle transazioni.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Supporto Multi-Chain">
            <div className="space-y-3">
              <p className="text-neutral-900">
                La piattaforma supporta tutte le principali blockchain compatibili con EVM (Ethereum Virtual Machine), come Ethereum, Polygon, Arbitrum, Optimism e Binance Smart Chain. Altre blockchain possono essere aggiunte su richiesta, rendendo Transak una soluzione versatile per varie esigenze di criptovaluta.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Collaborazione con Visa">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Transak ha stretto una partnership con Visa per abilitare prelievi in tempo reale tramite Visa Direct, permettendo agli utenti di convertire rapidamente le criptovalute in valute fiat e spenderle presso oltre 130 milioni di punti vendita che accettano Visa.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Integrazione Facile">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Gli sviluppatori possono integrare Transak nelle loro applicazioni Web3 con poche righe di codice utilizzando l'SDK personalizzabile. Questo rende semplice per le piattaforme offrire funzionalità di acquisto e vendita di criptovalute direttamente all'interno delle loro app o siti web.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Esperienza Utente Migliorata">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Transak offre un'esperienza di onboarding simile al Web2 per gli utenti Web3, semplificando le interazioni con i contratti smart e le transazioni blockchain. La piattaforma supporta oltre 155 paesi, garantendo una copertura globale per gli utenti.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Tutorial">
            <div className="space-y-4">
              <p className="text-neutral-900 mb-4">
                Segui i nostri tutorial step-by-step per imparare come utilizzare Transak:
              </p>
              
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <h3 className="font-semibold mb-3">Tutorial Disponibili</h3>
                <List>
                  <li>Come creare un account su Transak</li>
                  <li>Come completare la verifica KYC</li>
                  <li>Come acquistare criptovalute con carta di credito</li>
                  <li>Come utilizzare i metodi di pagamento locali</li>
                  <li>Come convertire crypto in fiat (off-ramp)</li>
                  <li>Come utilizzare Visa Direct per prelievi</li>
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
