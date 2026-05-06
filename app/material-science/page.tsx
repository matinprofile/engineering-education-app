import Link from "next/link";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TopicIcon } from "@/components/ui/TopicIcon";

const interactiveModules = [
  {
    title: "Phase Diagram",
    href: "/material-science/phase-diagram",
    description:
      "Study total solubility, partial solubility, and insolubility using interactive phase-diagram tools.",
  },
  {
    title: "Crystallography",
    href: "/material-science/crystallography",
    description:
      "Explore crystal structures and Miller indices through embedded visualization tools.",
  },
];

const focusAreas = [
  "Binary alloy equilibrium and phase fields",
  "Microstructure development during cooling",
  "Unit cells and crystal lattice systems",
  "Crystal planes and Miller index notation",
];

export default function MaterialSciencePage() {
  return (
    <div className="w-full pb-10">
      <section className="relative overflow-hidden border-b border-[color:var(--border)] bg-primary/55">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(140,45,25,0.14),transparent_50%),radial-gradient(circle_at_90%_10%,rgba(247,218,211,0.42),transparent_52%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            Back to Home
          </Link>
          <p className="mb-5 inline-flex rounded-full border border-accent/50 bg-accent/10 px-4 py-1 text-xs uppercase tracking-[0.22em] text-accent">
            Engineering Education
          </p>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="font-heading text-4xl font-bold leading-tight text-text sm:text-5xl lg:text-6xl">
                Material Science
              </h1>
              <p className="mt-4 text-lg font-medium text-accent/80">
                Interactive tools for phase diagrams and crystallography
              </p>
            </div>
            <div className="text-accent">
              <TopicIcon name="material-science" className="h-20 w-20 sm:h-24 sm:w-24" />
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            This module extends the material-science section with local interactive tools adapted from the virtual learning platform while preserving this project&apos;s layout, navigation, and visual language.
          </p>
        </div>
      </section>

      <SectionWrapper
        title="Interactive Modules"
        subtitle="Choose a toolset to explore material behavior and crystal geometry."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {interactiveModules.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-[color:var(--border)] bg-white p-6 shadow-[0_16px_40px_rgba(48,54,44,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_40px_rgba(140,45,25,0.14)]"
            >
              <h2 className="font-heading text-2xl font-semibold text-text">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="Learning Focus"
        subtitle="Core concepts covered by the interactive material-science activities."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area) => (
            <article
              key={area}
              className="flex items-start gap-3 rounded-xl border border-[color:var(--border)] bg-white p-5 text-sm leading-7 text-muted transition-all duration-300 hover:border-accent/40 hover:bg-primary/40 hover:text-text"
            >
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent/70" />
              <span>{area}</span>
            </article>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
