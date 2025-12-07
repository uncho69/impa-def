import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function TheSandbox() {
  return (
    <ProtectedRoute title="The Sandbox">
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
    </ProtectedRoute>
  );
}
