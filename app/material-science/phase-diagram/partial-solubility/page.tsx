import { InteractiveToolFrame } from "@/components/material-science/InteractiveToolFrame";

export default function PartialSolubilityPage() {
  return (
    <InteractiveToolFrame
      title="Phase Diagram: Partial Solubility"
      description="Interactive viewer for alloy systems with limited mutual solubility and mixed-phase regions."
      backHref="/material-science/phase-diagram"
      backLabel="Back to Phase Diagram"
      iframeSrc="/src/diagramaFases/fases.html"
      iframeTitle="Phase Diagram Partial Solubility"
    />
  );
}