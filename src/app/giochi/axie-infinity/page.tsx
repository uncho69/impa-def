import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AxieInfinity() {
  return (
    <ProtectedRoute title="Axie Infinity">
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
    </ProtectedRoute>
  );
}
