import { PerspectiveTool } from "@/components/technical-drawing/PerspectiveTool";
import { TechnicalDrawingShell } from "@/components/technical-drawing/TechnicalDrawingShell";

export default function PerspectivePage() {
  return (
    <TechnicalDrawingShell
      title="Technical Drawing: 3D Perspective"
      description="Inspect the 3D model directly while selecting surfaces from the orthographic views to see how each face maps across representations."
      backHref="/technical-drawing"
      backLabel="Back to Technical Drawing"
      currentHref="/technical-drawing/3d-perspective"
    >
      <PerspectiveTool />
    </TechnicalDrawingShell>
  );
}