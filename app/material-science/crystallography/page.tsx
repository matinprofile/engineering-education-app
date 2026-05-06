import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const tools = [
  {
    title: "Structure",
    href: "/material-science/crystallography/structure",
    description:
      "Explore crystal structures, unit cells, and lattice geometry in the embedded visualization tool.",
  },
  {
    title: "Miller Indices",
    href: "/material-science/crystallography/miller",
    description:
      "Study plane notation, intercepts, and orientation analysis with the Miller indices viewer.",
  },
];

export default function CrystallographyPage() {
  return (
    <div className="w-full pb-10">
      <section className="relative overflow-hidden border-b border-[color:var(--border)] bg-primary/45">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(140,45,25,0.12),transparent_48%),radial-gradient(circle_at_90%_10%,rgba(247,218,211,0.38),transparent_52%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link
            href="/material-science"
            className="mb-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            Material Science
          </Link>
          <h1 className="font-heading text-4xl font-bold text-text sm:text-5xl">Crystallography</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            Launch the crystallography tools inside the current project template without bringing over the sibling app&apos;s layout or multilingual shell.
          </p>
        </div>
      </section>

      <SectionWrapper
        title="Interactive Views"
        subtitle="Select a crystallography activity to open the embedded tool."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-[color:var(--border)] bg-white p-6 shadow-[0_16px_40px_rgba(48,54,44,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_40px_rgba(140,45,25,0.14)]"
            >
              <h2 className="font-heading text-xl font-semibold text-text">{tool.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{tool.description}</p>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}