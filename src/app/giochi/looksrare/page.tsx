import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function LooksRare() {
  return (
    <ProtectedRoute title="LooksRare">
      <PageTitle description="Marketplace NFT community-driven">
        LooksRare
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <div className="space-y-6">
            <p className="text-neutral-700">
              Contenuto della pagina LooksRare in arrivo...
            </p>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
