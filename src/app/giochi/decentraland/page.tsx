import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";

export default function Decentraland() {
  return (
    <>
      <PageTitle description="Metaverso decentralizzato basato su blockchain">
        Decentraland
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <div className="space-y-6">
            <p className="text-neutral-700">
              Contenuto della pagina Decentraland in arrivo...
            </p>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
