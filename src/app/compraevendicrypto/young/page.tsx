import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { ExploreWeb3 } from "@/components/ExploreWeb3";

export default function Young() {
  return (
    <ProtectedRoute title="Young Platform">
      <PageTitle description="Exchange italiana user-friendly con servizi educativi. Ideale per principianti con Academy e Step per guadagnare crypto.">
        Young Platform
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <p className="text-neutral-900 mb-6">
            Young Platform è una piattaforma italiana di criptovalute che offre una gamma di servizi per utenti di tutti i livelli, dai principianti agli esperti. Fondata con l'obiettivo di rendere il mondo delle criptovalute più accessibile e intuitivo, Young Platform fornisce strumenti educativi, opportunità di guadagno e un'esperienza di trading semplificata.
          </p>

          <Accordion buttonText="Young Platform Exchange">
            <div className="space-y-3">
              <p className="text-neutral-900">
                L'exchange di Young Platform è progettato per essere facile da usare, permettendo agli utenti di acquistare e vendere criptovalute con pochi clic. Supporta una varietà di criptovalute e offre una piattaforma user-friendly adatta anche ai principianti.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Young Platform Pro">
            <div className="space-y-3">
              <p className="text-neutral-900">
                <strong>Trading Avanzato Senza Commissioni:</strong> Questa piattaforma è rivolta ai trader più esperti, offrendo strumenti di trading avanzati e la possibilità di fare trading senza commissioni. È ideale per chi cerca funzionalità avanzate e un'esperienza di trading professionale.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Young Platform Step">
            <div className="space-y-3">
              <p className="text-neutral-900">
                <strong>Guadagno Attraverso Attività Quotidiane:</strong> Young Platform Step permette agli utenti di guadagnare criptovalute camminando, giocando e partecipando a quiz. Questo rende l'apprendimento e l'interazione con le criptovalute un'attività divertente e remunerativa.
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Young Platform Academy">
            <div className="space-y-3">
              <p className="text-neutral-900">
                La Young Platform Academy offre guide, articoli e corsi su criptovalute e blockchain, rendendo più facile per i nuovi utenti comprendere questi concetti complessi. Le risorse sono disponibili in diverse lingue e sono progettate per tutti i livelli di conoscenza.
              </p>
              <p className="text-neutral-900">
                <strong>Link al sito:</strong> <a href="https://academy.youngplatform.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">https://academy.youngplatform.com/</a>
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Tax Reporting">
            <div className="space-y-3">
              <p className="text-neutral-900">
                <strong>Gestione Fiscale Completa:</strong> Young Platform offre un servizio di report fiscale per aiutare gli utenti a gestire le loro dichiarazioni fiscali relative alle criptovalute. Questo servizio include report dettagliati delle transazioni e delle posizioni di portafoglio, rendendo più semplice la conformità fiscale.
              </p>
              <p className="text-neutral-900">
                <strong>Link al sito:</strong> <a href="https://support.youngplatform.com/hc/en-us/articles/18845883747090-Young-Platform-Tax-Report-Guide" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">https://support.youngplatform.com/hc/en-us/articles/18845883747090-Young-Platform-Tax-Report-Guide</a>
              </p>
            </div>
          </Accordion>

          <Accordion buttonText="Tutorial">
            <div className="space-y-4">
              <p className="text-neutral-900 mb-4">
                Segui i nostri tutorial step-by-step per imparare come utilizzare Young Platform:
              </p>
              
              <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                <h3 className="font-semibold mb-3">Tutorial Disponibili</h3>
                <List>
                  <li>Come creare un account su Young Platform</li>
                  <li>Come completare la verifica KYC</li>
                  <li>Come acquistare la prima criptovaluta</li>
                  <li>Come utilizzare Young Platform Pro per trading avanzato</li>
                  <li>Come guadagnare crypto con Young Platform Step</li>
                  <li>Come utilizzare Young Platform Academy</li>
                  <li>Come gestire il report fiscale</li>
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
