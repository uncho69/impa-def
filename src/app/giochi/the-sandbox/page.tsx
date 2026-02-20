import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";

export default function TheSandbox() {
  return (
    <>
      <PageTitle description="Metaverso virtuale e piattaforma di creazione">
        The Sandbox
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <div className="space-y-6">
            <p className="text-neutral-700">
              Contenuto della pagina The Sandbox in arrivo...
            </p>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
