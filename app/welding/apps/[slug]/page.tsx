import { notFound } from "next/navigation";
import { AppToolFrame } from "@/components/apps/AppToolFrame";
import { getWeldingTool, weldingTools } from "@/lib/apps";
import { LaserQuiz } from "@/components/simulations/LaserQuiz";
import { FSWQuiz } from "@/components/simulations/FSWQuiz";
import { RadiographySim } from "@/components/simulations/RadiographySim";
import { UltrasoundAScan } from "@/components/simulations/UltrasoundAScan";
import { MAGWeldingSim } from "@/components/simulations/MAGWeldingSim";
import type { ComponentType } from "react";

type WeldingToolPageProps = {
  params: Promise<{ slug: string }>;
};

const nativeComponents: Partial<Record<string, ComponentType>> = {
  "mag-welding-sim": MAGWeldingSim,
  "laser-quiz": LaserQuiz,
  "fsw-quiz": FSWQuiz,
  "radiography-sim": RadiographySim,
  "ultrasound-a-scan": UltrasoundAScan,
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

  if (NativeComponent) {
    return (
      <AppToolFrame
        title={tool.title}
        description={tool.description}
        backHref="/welding"
        backLabel="Back to Welding"
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
      iframeSrc={`/apps/${tool.fileName}`}
      iframeTitle={tool.title}
    />
  );
}
