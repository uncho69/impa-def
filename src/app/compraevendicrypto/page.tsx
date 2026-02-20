import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { ExchangeCardList } from "@/components/ExchangeCardList";
import { ExploreWeb3 } from "@/components/ExploreWeb3";

export default function Exchange() {
  return (
    <>
      <PageTitle description="Scopri come acquistare e vendere criptovalute in modo sicuro e conveniente">
        Compra e Vendi Crypto
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <p className="text-neutral-900 mb-6">
            Ci sono due modi principali per comprare e vendere le cripto:
          </p>
          
          <Accordion buttonText="Exchange Centralizzate (CEX)">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Le exchange centralizzate (CEX sta per centralized exchanges), ti permettono di inviare fondi dal tuo conto in banca o usando la carta di debito, per poi convertirli nella tua criptovaluta prescelta. Ti permettono inoltre di fare trading di criptovalute, cosa che noi sconsigliamo.
              </p>
              <p className="text-neutral-900">
                Una volta convertiti i fondi nella criptovaluta prescelta, si procede ad inviarli al proprio wallet non-custodial sulla blockchain della criptovaluta.
              </p>
            </div>
          </Accordion>
          
          <Accordion buttonText="On/Off-Ramps">
            <div className="space-y-3">
              <p className="text-neutral-900">
                Le On/Off-Ramps ti permettono di acquistare le criptovalute usando la tua carta e riceverle immediatamente sul tuo wallet non-custodial (nome del tuo wallet "web3" che ti da completo controllo sui tuoi fondi grazie all'utilizzo delle chiavi private, che dovrai tenere al sicuro per poter accedere ai tuoi fondi in caso perdi accesso al dispositivo o ti dimentichi la password). Servirà fare KYC una volta sola e una volta fatto e connesso alla propria email si potrà riutilizzarlo quando si desidera.
              </p>
              <p className="text-neutral-900">
                Queste exchange ed on-ramps agiscono da intermediari tra il mondo delle banche ed il mondo Web3 (Crypto).
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Lista Exchange e On-ramp">
            <div className="space-y-4">
              <p className="text-neutral-900 mb-4">
                Ecco una lista delle principali piattaforme per acquistare e vendere criptovalute:
              </p>
              
              <ExchangeCardList />
            </div>
          </Accordion>

          <Accordion buttonText="Tutorial">
            <div className="space-y-4">
              <p className="text-neutral-900 mb-4">
                Segui i nostri tutorial step-by-step per imparare come acquistare e vendere criptovalute in modo sicuro:
              </p>
              
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <h3 className="font-semibold mb-3">Tutorial Disponibili</h3>
                <List>
                  <li>Come creare un account su un exchange centralizzato</li>
                  <li>Come fare KYC e verificare la propria identità</li>
                  <li>Come acquistare la prima criptovaluta</li>
                  <li>Come trasferire crypto dal exchange al wallet</li>
                  <li>Come utilizzare gli on-ramps per acquisti diretti</li>
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
