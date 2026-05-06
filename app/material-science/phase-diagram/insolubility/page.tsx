import { InteractiveToolFrame } from "@/components/material-science/InteractiveToolFrame";

export default function InsolubilityPage() {
  return (
    <InteractiveToolFrame
      title="Phase Diagram: Insolubility"
      description="Interactive viewer for binary systems that remain phase-separated and do not dissolve into each other."
      backHref="/material-science/phase-diagram"
      backLabel="Back to Phase Diagram"
      iframeSrc="/src/diagramaFases/fases.html"
      iframeTitle="Phase Diagram Insolubility"
    />
  );
}