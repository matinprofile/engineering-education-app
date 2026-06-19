import React from "react";
import Link from "next/link";
import { TopicIcon } from "@/components/ui/TopicIcon";
import { adhesiveBondingTools } from "@/lib/apps";
import { ModuleLearningPath } from "@/components/path/ModuleLearningPath";
import { learningPaths } from "@/lib/paths";

const TOOL_ICONS: Record<string, React.ReactNode> = {
  "failure-modes": (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3.5" width="20" height="4.5" rx="1" />
      <rect x="2" y="16" width="20" height="4.5" rx="1" />
      <polyline points="2,12 5.5,9.5 9,13.5 13,9.5 17,13.5 20.5,11 22,12" strokeWidth="1.8" />
    </svg>
  ),
  "surfaceprep-v2": (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="14" width="20" height="5" rx="1" />
      <path d="M4 14 Q5 10 7 12 Q9 8 11 11 Q13 7 15 11 Q17 9 19 12 Q21 10 22 14" />
      <path d="M7 8 L7 6M12 7 L12 5M17 8 L17 6" strokeWidth="1.4" />
    </svg>
  ),
  "plasma-treatment": (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 L9 10 L13 10 L11 22 L15 13 L11 13 Z" />
      <path d="M5 8 Q3 12 5 16M19 8 Q21 12 19 16" strokeWidth="1.4" />
    </svg>
  ),
  "slj-maker": (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="9" width="12" height="6" rx="1" />
      <rect x="10" y="9" width="12" height="6" rx="1" />
      <path d="M10 9 L10 15" strokeWidth="1" strokeDasharray="2 1.5" />
    </svg>
  ),
  "nr613-tutorial": (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <polyline points="9 15 11 17 15 13" strokeWidth="2" />
    </svg>
  ),
  "slj-manufacturing-guide": (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polygon points="10 9 10 15 16 12" fill="currentColor" stroke="none" />
    </svg>
  ),
};

const CATEGORIES = [
  {
    id: "surface-preparation",
    title: "Surface Preparation",
    description: "Simulate and evaluate surface treatment processes before bonding.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11" />
      </svg>
    ),
    slugs: ["surfaceprep-v2", "plasma-treatment"],
  },
  {
    id: "joint-manufacturing",
    title: "Joint Manufacturing & Design",
    description: "Step through joint fabrication workflows, design guidelines, and process videos.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="8" rx="2" />
        <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 16v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" />
      </svg>
    ),
    slugs: ["slj-maker", "slj-manufacturing-guide", "nr613-tutorial"],
  },
  {
    id: "failure-analysis",
    title: "Failure Analysis",
    description: "Identify and understand adhesive, cohesive, and substrate failure mechanisms.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    slugs: ["failure-modes"],
  },
];

const toolMap = Object.fromEntries(adhesiveBondingTools.map((t) => [t.slug, t]));

export default function AdhesiveBondingPage() {
  return (
    <div className="w-full pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[color:var(--border)] bg-primary/55">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(140,45,25,0.14),transparent_50%),radial-gradient(circle_at_90%_10%,rgba(247,218,211,0.42),transparent_52%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-accent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Back to Home
            </Link>
            <p className="inline-flex rounded-full border border-accent/50 bg-accent/10 px-4 py-1 text-xs uppercase tracking-[0.22em] text-accent">
              Engineering Education
            </p>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="font-heading text-4xl font-bold leading-tight text-text sm:text-5xl lg:text-6xl">
                Adhesive Bonding
              </h1>
              <p className="mt-4 text-lg font-medium text-accent/80">
                Interactive process, design, and failure simulations
              </p>
            </div>
            <div className="text-accent">
              <TopicIcon name="adhesive-bonding" className="h-20 w-20 sm:h-24 sm:w-24" />
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            Follow the bonded joint production workflow — from surface treatment through joint
            manufacturing to failure analysis — using six interactive simulations.
          </p>

          {/* Workflow stepper */}
          <div className="mt-10 flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
            {CATEGORIES.map((cat, i) => (
              <span key={cat.id} className="flex items-center gap-2">
                <a
                  href={`#${cat.id}`}
                  className="flex items-center gap-1.5 rounded-full border border-[color:var(--border)] bg-white/60 px-3 py-1 transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <span className="text-accent">{cat.icon}</span>
                  {cat.title}
                </a>
                {i < CATEGORIES.length - 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ModuleLearningPath path={learningPaths["adhesive-bonding"]} />

      {/* Category sections */}
      <div className="mx-auto w-full max-w-7xl space-y-16 px-4 pt-0 sm:px-6 lg:px-8">
        {CATEGORIES.map((cat, i) => {
          const tools = cat.slugs.map((s) => toolMap[s]).filter(Boolean);
          return (
            <section key={cat.id} id={cat.id}>
              {/* Category header */}
              <div className="mb-6 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  {cat.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent/70">
                      Step {i + 1}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-text">{cat.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted">{cat.description}</p>
                </div>
              </div>

              {/* Tool cards */}
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/adhesive-bonding/apps/${tool.slug}`}
                    className="group rounded-2xl border border-[color:var(--border)] bg-white p-6 shadow-[0_16px_40px_rgba(48,54,44,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_40px_rgba(140,45,25,0.14)]"
                  >
                    {TOOL_ICONS[tool.slug] && (
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/8 text-accent transition-colors group-hover:border-accent/40 group-hover:bg-accent/15">
                        {TOOL_ICONS[tool.slug]}
                      </div>
                    )}
                    <h3 className="font-heading text-xl font-semibold text-text">{tool.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{tool.description}</p>
                    <div className="mt-5 flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      Open simulation
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
