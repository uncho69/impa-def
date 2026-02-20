import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";

export default function AxieInfinity() {
  return (
    <>
      <PageTitle description="Gioco Play-to-Earn basato su NFT">
        Axie Infinity
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <div className="space-y-6">
            <p className="text-neutral-700">
              Contenuto della pagina Axie Infinity in arrivo...
            </p>
          </div>
        </SectionBody>
      </MobileContainer>
    </>
  );
}
