import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function MagicEden() {
  return (
    <ProtectedRoute title="Magic Eden">
      <PageTitle description="Marketplace NFT leader su Solana">
        Magic Eden
      </PageTitle>
      <MobileContainer>
        <SectionBody>
          <div className="space-y-6">
            <p className="text-neutral-700">
              Contenuto della pagina Magic Eden in arrivo...
            </p>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
