import { notFound } from "next/navigation";
import { AppToolFrame } from "@/components/apps/AppToolFrame";
import { getWeldingTool, weldingTools } from "@/lib/apps";

type WeldingToolPageProps = {
  params: Promise<{ slug: string }>;
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
