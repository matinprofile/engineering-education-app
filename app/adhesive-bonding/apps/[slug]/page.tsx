import { notFound } from "next/navigation";
import { AppToolFrame } from "@/components/apps/AppToolFrame";
import { adhesiveBondingTools, getAdhesiveTool } from "@/lib/apps";

type AdhesiveToolPageProps = {
  params: Promise<{ slug: string }>;
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

  return (
    <AppToolFrame
      title={tool.title}
      description={tool.description}
      backHref="/adhesive-bonding"
      backLabel="Back to Adhesive Bonding"
      iframeSrc={`/apps/${tool.fileName}`}
      iframeTitle={tool.title}
    />
  );
}
