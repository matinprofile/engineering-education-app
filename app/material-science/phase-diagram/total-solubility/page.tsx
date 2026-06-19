import { InteractiveToolFrame } from "@/components/material-science/InteractiveToolFrame";

export default function TotalSolubilityPage() {
  return (
    <InteractiveToolFrame
      title="Phase Diagram: Total Solubility"
      description="Interactive viewer for binary systems with complete mutual solubility across the composition range."
      backHref="/material-science/phase-diagram"
      backLabel="Back to Phase Diagram"
      iframeSrc="/src/diagramaFases/fases.html"
      iframeTitle="Phase Diagram Total Solubility"
      currentHref="/material-science/phase-diagram/total-solubility"
    />
  );
}