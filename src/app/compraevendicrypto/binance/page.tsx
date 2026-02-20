import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { ExploreWeb3 } from "@/components/ExploreWeb3";
import Image from "next/image";

export default function Binance() {
  return (
    <>
      <PageTitle description="La più grande exchange al mondo per volume di trading. Offre trading spot, futures e servizi DeFi.">
        Binance
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <p className="text-neutral-900 mb-6">
            Binance è uno dei più grandi e completi exchange di criptovalute al mondo, fondato da Changpeng Zhao (CZ) nel 2017. Binance offre una vasta gamma di servizi per soddisfare le esigenze di trader individuali e istituzionali, con un focus su sicurezza, trasparenza e innovazione.
          </p>

          <Accordion buttonText="Exchange di Criptovalute">
            <div className="space-y-3">
              <p className="text-neutral-900">
                <strong>Trading Spot e Derivati:</strong> Binance permette il trading di oltre 350 criptovalute diverse, offrendo mercati spot, margin trading, futures e opzioni. La piattaforma supporta anche il trading di criptovalute contro valute fiat.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Binance Earn">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Gli utenti possono guadagnare interessi sulle criptovalute detenute tramite diversi prodotti, come risparmi flessibili e staking. Offre opportunità di rendimento su oltre 180 criptovalute.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Binance Launchpad">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Piattaforma che consente agli utenti di partecipare a nuove emissioni di token (ICO) e ottenere accesso anticipato a nuovi progetti di criptovalute lanciate sull'exchange di Binance.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Binance NFT">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Binance offre un mercato dedicato agli NFT (token non fungibili), permettendo agli utenti di comprare, vendere e scambiare opere d'arte digitali e altri oggetti da collezione.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Sicurezza e Supporto">
            <div className="space-y-3">
              <p className="text-neutral-900">
                <strong>Misure di Sicurezza:</strong> Binance implementa rigide misure di sicurezza, tra cui autenticazione a due fattori (2FA), archiviazione a freddo per la maggior parte dei fondi degli utenti, e conformità alle normative internazionali.
              </p>
              <p className="text-neutral-900">
                <strong>Supporto 24/7:</strong> Assistenza clienti disponibile 24 ore su 24 tramite chat live e supporto telefonico per risolvere qualsiasi problema o domanda.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Binance Card">
            <div className="space-y-3">
              <div className="mb-6 flex justify-center">
                <Image
                  src="/binancecard.png"
                  alt="Binance Card"
                  width={400}
                  height={250}
                  className="rounded-lg shadow-lg"
                />
              </div>
              
              <p className="text-neutral-900">
                La Binance Card consente di spendere criptovalute in oltre 60 milioni di negozi online e fisici che accettano Visa. Gli utenti possono guadagnare fino all'8% di cashback sugli acquisti, in base alla quantità di BNB posseduta.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Binance Academy">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Una piattaforma educativa gratuita che offre guide, articoli e corsi su blockchain, criptovalute e trading, disponibili in oltre 10 lingue.
              </p>
              <p className="text-neutral-900">
                <strong>Link al sito:</strong> <a href="https://academy.binance.com/it" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">https://academy.binance.com/it</a>
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Binance Charity">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Binance Charity utilizza la tecnologia blockchain per rendere la beneficenza più trasparente ed efficiente, supportando vari progetti umanitari globali.
              </p>
              <p className="text-neutral-900">
                <strong>Link al sito:</strong> <a href="https://www.binance.charity/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">https://www.binance.charity/</a>
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Tutorial">
            <div className="space-y-4">
              <p className="text-neutral-900 mb-4">
                Segui i nostri tutorial step-by-step per imparare come utilizzare Binance:
              </p>
              
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <h3 className="font-semibold mb-3">Tutorial Disponibili</h3>
                <List>
                  <li>Come creare un account su Binance</li>
                  <li>Come completare la verifica KYC</li>
                  <li>Come acquistare la prima criptovaluta</li>
                  <li>Come fare trading spot su Binance</li>
                  <li>Come utilizzare Binance Earn per guadagnare interessi</li>
                  <li>Come utilizzare la Binance Card</li>
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
