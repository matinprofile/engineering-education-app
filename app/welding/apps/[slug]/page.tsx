import { notFound } from "next/navigation";
import { AppToolFrame } from "@/components/apps/AppToolFrame";
import { getWeldingTool, weldingTools } from "@/lib/apps";
import { LaserQuiz } from "@/components/simulations/LaserQuiz";
import { FSWQuiz } from "@/components/simulations/FSWQuiz";
import { RadiographySim } from "@/components/simulations/RadiographySim";
import { UltrasoundAScan } from "@/components/simulations/UltrasoundAScan";
import { MAGWeldingSim } from "@/components/simulations/MAGWeldingSim";
import { WeldingModuleQuiz } from "@/components/simulations/WeldingModuleQuiz";
import { JointPreparationSim } from "@/components/simulations/JointPreparationSim";
import type { ComponentType } from "react";

type WeldingToolPageProps = {
  params: Promise<{ slug: string }>;
};

const nativeComponents: Partial<Record<string, ComponentType>> = {
  "mag-welding-sim": MAGWeldingSim,
  "laser-quiz": LaserQuiz,
  "fsw-quiz": FSWQuiz,
  "welding-module-quiz": WeldingModuleQuiz,
  "radiography-sim": RadiographySim,
  "ultrasound-a-scan": UltrasoundAScan,
  "joint-preparation-sim": JointPreparationSim,
};

export async function generateStaticParams() {
  return weldingTools.map((tool) => ({ slug: tool.slug }));
}

export default async function WeldingToolPage({ params }: WeldingToolPageProps) {
  const { slug } = await params;
  const tool = getWeldingTool(slug);

  if (!tool) {
    notFound();
  }

  const NativeComponent = nativeComponents[slug];
  const currentHref = `/welding/apps/${slug}`;

  if (NativeComponent) {
    return (
      <AppToolFrame
        title={tool.title}
        description={tool.description}
        backHref="/welding"
        backLabel="Back to Welding"
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
      backHref="/welding"
      backLabel="Back to Welding"
      currentHref={currentHref}
      iframeSrc={`/apps/${tool.fileName}`}
      iframeTitle={tool.title}
    />
  );
}
