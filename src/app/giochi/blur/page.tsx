import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Blur() {
  return (
    <ProtectedRoute title="Blur">
      <PageTitle description="Marketplace NFT per trader professionali">
        Blur
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <div className="space-y-6">
            <p className="text-neutral-700">
              Contenuto della pagina Blur in arrivo...
            </p>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
