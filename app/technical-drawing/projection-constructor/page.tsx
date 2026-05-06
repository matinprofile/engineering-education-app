import { ProjectionConstructorTool } from "@/components/technical-drawing/ProjectionConstructorTool";
import { TechnicalDrawingShell } from "@/components/technical-drawing/TechnicalDrawingShell";

export default function ProjectionConstructorPage() {
  return (
    <TechnicalDrawingShell
      title="Technical Drawing: Projection Constructor"
      description="Choose the correct observation direction and build the 3D interpretation step by step from the orthographic information."
      backHref="/technical-drawing"
      backLabel="Back to Technical Drawing"
    >
      <ProjectionConstructorTool />
    </TechnicalDrawingShell>
  );
}