import { OrthographicViewsTool } from "@/components/technical-drawing/OrthographicViewsTool";
import { TechnicalDrawingShell } from "@/components/technical-drawing/TechnicalDrawingShell";

export default function OrthographicViewsPage() {
  return (
    <TechnicalDrawingShell
      title="Technical Drawing: Orthographic Views"
      description="Relate the highlighted surfaces in the top and side views to strengthen view correspondence and orthographic interpretation."
      backHref="/technical-drawing"
      backLabel="Back to Technical Drawing"
    >
      <OrthographicViewsTool />
    </TechnicalDrawingShell>
  );
}