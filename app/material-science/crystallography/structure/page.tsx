import { InteractiveToolFrame } from "@/components/material-science/InteractiveToolFrame";

export default function StructurePage() {
  return (
    <InteractiveToolFrame
      title="Crystallography: Structure"
      description="Interactive structure viewer for unit cells, atomic arrangements, and crystal lattice systems."
      backHref="/material-science/crystallography"
      backLabel="Back to Crystallography"
      iframeSrc="/src/cristalografia/structures/structures.html"
      iframeTitle="Crystallography Structure"
    />
  );
}