import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { ExploreWeb3 } from "@/components/ExploreWeb3";

export default function Wirex() {
  return (
    <ProtectedRoute title="Wirex">
      <PageTitle description="Piattaforma di pagamenti digitali con carta di debito. Supporta oltre 37 criptovalute con ricompense Cryptoback™.">
        Wirex
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <p className="text-neutral-900 mb-6">
            Wirex è una piattaforma di pagamenti digitali che integra servizi di criptovaluta e valuta tradizionale, consentendo agli utenti di acquistare, scambiare, conservare e spendere criptovalute e valute fiat con facilità. Fondata per rendere più accessibili le criptovalute, Wirex offre una gamma di prodotti finanziari innovativi, inclusa una carta di debito che può essere utilizzata in oltre 61 milioni di punti vendita globali.
          </p>

          <Accordion buttonText="Carta di Debito Wirex">
            <div className="space-y-3">
              <p className="text-neutral-900">
                La carta Wirex permette agli utenti di spendere criptovalute e valute fiat direttamente dal proprio account Wirex. La carta offre fino all'8% di ricompense Cryptoback™ su tutti gli acquisti, sia online che in negozio.
              </p>
              <p className="text-neutral-900">
                Inoltre, non ci sono commissioni su prelievi ATM fino a 200 USD al mese e nessuna commissione di cambio valuta.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Piattaforma Multi-Currency">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Wirex supporta oltre 37 criptovalute, inclusi Bitcoin, Ethereum, Litecoin e altre. Gli utenti possono facilmente acquistare, scambiare e conservare queste criptovalute attraverso l'app Wirex, che fornisce tassi OTC in tempo reale per tutte le transazioni.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Integrazione Fiat-Crypto">
            <div className="space-y-3">
              <p className="text-neutral-900">
                La piattaforma consente di convertire facilmente valute tradizionali in criptovalute e viceversa, utilizzando la funzione di scambio integrata nell'app Wirex. Questo rende semplice per gli utenti gestire sia criptovalute che valute fiat in un'unica interfaccia.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Sicurezza Avanzata">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Wirex adotta misure di sicurezza avanzate, tra cui l'autenticazione a due fattori (2FA) e il congelamento immediato della carta, per proteggere i fondi degli utenti. Inoltre, utilizza la tecnologia di cold storage per conservare le criptovalute, aumentando la sicurezza contro gli attacchi informatici.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Ricompense e Promozioni">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Gli utenti di Wirex possono beneficiare di varie promozioni e offerte esclusive, incluse le ricompense Cryptoback™ che vengono accreditate istantaneamente sull'account Wirex per ogni acquisto effettuato con la carta.
              </p>
              <p className="text-neutral-900">
                Wirex offre anche programmi di referral e bonus per gli utenti che invitano amici e familiari a unirsi alla piattaforma.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Tutorial">
            <div className="space-y-4">
              <p className="text-neutral-900 mb-4">
                Segui i nostri tutorial step-by-step per imparare come utilizzare Wirex:
              </p>
              
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <h3 className="font-semibold mb-3">Tutorial Disponibili</h3>
                <List>
                  <li>Come creare un account su Wirex</li>
                  <li>Come completare la verifica dell'identità</li>
                  <li>Come acquistare criptovalute</li>
                  <li>Come richiedere la carta di debito Wirex</li>
                  <li>Come guadagnare ricompense Cryptoback™</li>
                  <li>Come utilizzare l'app Wirex</li>
                  <li>Sicurezza e best practices per i pagamenti</li>
                </List>
              </div>
            </div>
          </Accordion>
        </SectionBody>
        <ExploreWeb3 />
      </MobileContainer>
    </ProtectedRoute>
  );
}
