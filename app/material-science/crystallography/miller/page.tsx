import { InteractiveToolFrame } from "@/components/material-science/InteractiveToolFrame";

export default function MillerPage() {
  return (
    <InteractiveToolFrame
      title="Crystallography: Miller Indices"
      description="Interactive Miller indices viewer for plane notation, intercepts, and crystal orientation analysis."
      backHref="/material-science/crystallography"
      backLabel="Back to Crystallography"
      iframeSrc="/src/cristalografia/miller/miller.html"
      iframeTitle="Crystallography Miller Indices"
      heightClassName="h-[82vh]"
      currentHref="/material-science/crystallography/miller"
    />
  );
}