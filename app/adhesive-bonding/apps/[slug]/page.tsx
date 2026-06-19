import { notFound } from "next/navigation";
import { AppToolFrame } from "@/components/apps/AppToolFrame";
import { adhesiveBondingTools, getAdhesiveTool } from "@/lib/apps";
import { NR613Tutorial } from "@/components/simulations/NR613Tutorial";
import { SurfacePrepSim } from "@/components/simulations/SurfacePrepSim";
import { FailureModesSim } from "@/components/simulations/FailureModesSim";
import { SLJMaker } from "@/components/simulations/SLJMaker";
import { PlasmaTreatmentSim } from "@/components/simulations/PlasmaTreatmentSim";
import { SLJManufacturingGuide } from "@/components/simulations/SLJManufacturingGuide";
import { AdhesiveBondingModuleQuiz } from "@/components/simulations/AdhesiveBondingModuleQuiz";
import type { ComponentType } from "react";

type AdhesiveToolPageProps = {
  params: Promise<{ slug: string }>;
};

const nativeComponents: Partial<Record<string, ComponentType>> = {
  "nr613-tutorial": NR613Tutorial,
  "surfaceprep-v2": SurfacePrepSim,
  "failure-modes": FailureModesSim,
  "slj-maker": SLJMaker,
  "plasma-treatment": PlasmaTreatmentSim,
  "slj-manufacturing-guide": SLJManufacturingGuide,
  "adhesive-bonding-quiz": AdhesiveBondingModuleQuiz,
};

export async function generateStaticParams() {
  return adhesiveBondingTools.map((tool) => ({ slug: tool.slug }));
}

export default async function AdhesiveToolPage({ params }: AdhesiveToolPageProps) {
  const { slug } = await params;
  const tool = getAdhesiveTool(slug);

  if (!tool) {
    notFound();
  }

  const NativeComponent = nativeComponents[slug];
  const currentHref = `/adhesive-bonding/apps/${slug}`;

  if (NativeComponent) {
    return (
      <AppToolFrame
        title={tool.title}
        description={tool.description}
        backHref="/adhesive-bonding"
        backLabel="Back to Adhesive Bonding"
        currentHref={currentHref}
      >
        <NativeComponent />
      </AppToolFrame>
    );
  }

  return (
    <AppToolFrame
      title={tool.title}
      description={tool.description}
      backHref="/adhesive-bonding"
      backLabel="Back to Adhesive Bonding"
      currentHref={currentHref}
      iframeSrc={`/apps/${tool.fileName}`}
      iframeTitle={tool.title}
    />
  );
}
