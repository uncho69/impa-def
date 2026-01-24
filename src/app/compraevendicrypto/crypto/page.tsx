import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { ExploreWeb3 } from "@/components/ExploreWeb3";
import Image from "next/image";

export default function Crypto() {
  return (
    <>
      <PageTitle description="Piattaforma completa con exchange, carte di debito e servizi DeFi. Supporta oltre 250 criptovalute.">
        Crypto.com
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <p className="text-neutral-900 mb-6">
            Crypto.com offre una vasta gamma di servizi che vanno dall'acquisto e il trading di criptovalute, all'uso di carte di debito, fino alla gestione di portafogli digitali. Crypto.com offre una piattaforma sicura e di facile utilizzo per utenti di tutti i livelli di esperienza.
          </p>

          <Accordion buttonText="Exchange di Criptovalute">
            <div className="space-y-3">
              <p className="text-neutral-900">
                <strong>Trading Spot e Derivati:</strong> Crypto.com offre un exchange di criptovalute completo con trading spot e derivati, consentendo agli utenti di negoziare un'ampia varietà di criptovalute con basse commissioni.
              </p>
              <p className="text-neutral-900">
                <strong>App di Trading:</strong> L'app Crypto.com consente di acquistare, vendere e gestire criptovalute direttamente dal proprio smartphone.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Crypto Earn">
            <div className="space-y-3">
              <p className="text-neutral-900">
                <strong>Guadagno di Interessi:</strong> Con Crypto Earn, gli utenti possono guadagnare interessi sulle loro criptovalute depositate, scegliendo tra varie opzioni di deposito a termine e flessibili.
              </p>
              <p className="text-neutral-900">
                <strong>Supporto per Varie Criptovalute:</strong> Supporta un'ampia gamma di criptovalute, offrendo diverse opzioni di rendimento.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Crypto Credit">
            <div className="space-y-3">
              <p className="text-neutral-900">
                <strong>Prestiti Garantiti da Cripto:</strong> Gli utenti possono ottenere prestiti utilizzando le loro criptovalute come garanzia, senza dover vendere i loro asset.
              </p>
              <p className="text-neutral-900">
                <strong>Flessibilità:</strong> Tassi di interesse competitivi e opzioni di rimborso flessibili.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="NFT Marketplace">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Crypto.com offre una piattaforma per l'acquisto e la vendita di token non fungibili (NFT), consentendo agli artisti e ai collezionisti di entrare nel mercato emergente degli NFT.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Carta di Debito Crypto.com">
            <div className="space-y-3">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/cryptocomcard.png"
                  alt="Crypto.com Card"
                  width={400}
                  height={250}
                  className="rounded-lg shadow-lg"
                />
              </div>
              
              <p className="text-neutral-900">
                La Carta di Debito Crypto.com permette agli utenti di spendere le proprie criptovalute nel mondo reale. Può essere finanziata tramite criptovalute e fiat.
              </p>
              <p className="text-neutral-900">
                <strong>Cashback:</strong> Gli utenti possono guadagnare fino all'8% di cashback su tutti gli acquisti effettuati con la carta di debito Crypto.com, che può essere utilizzata ovunque sia accettata Visa.
              </p>
              <p className="text-neutral-900">
                <strong>Senza Commissioni:</strong> Nessuna commissione annuale o spese di mantenimento per la carta di debito.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Pagamenti Crypto.com Pay">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Crypto.com Pay permette agli utenti di effettuare pagamenti con criptovalute in negozi online e fisici, offrendo anche cashback e ricompense.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Tutorial">
            <div className="space-y-4">
              <p className="text-neutral-900 mb-4">
                Segui i nostri tutorial step-by-step per imparare come utilizzare Crypto.com:
              </p>
              
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <h3 className="font-semibold mb-3">Tutorial Disponibili</h3>
                <List>
                  <li>Come creare un account su Crypto.com</li>
                  <li>Come completare la verifica KYC</li>
                  <li>Come acquistare la prima criptovaluta</li>
                  <li>Come utilizzare Crypto Earn per guadagnare interessi</li>
                  <li>Come richiedere la Carta di Debito Crypto.com</li>
                  <li>Come utilizzare Crypto.com Pay</li>
                  <li>Sicurezza e best practices per il trading</li>
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
