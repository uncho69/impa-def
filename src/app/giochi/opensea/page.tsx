import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";

export default function OpenSea() {
  return (
    <>
      <PageTitle description="Il più grande marketplace di NFT">
        OpenSea
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <div className="space-y-6">
            <p className="text-neutral-700">
              Contenuto della pagina OpenSea in arrivo...
            </p>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
