import Link from "next/link";
import { TopicIcon } from "@/components/ui/TopicIcon";
import { weldingTools } from "@/lib/apps";

const CATEGORIES = [
  {
    id: "process-simulators",
    title: "Process Simulators",
    description: "Simulate and control welding processes — parameters, geometry, and technique.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    slugs: ["mag-welding-sim", "fsw-quality-sim", "joint-preparation-sim"],
  },
  {
    id: "ndt-inspection",
    title: "NDT & Inspection",
    description: "Apply non-destructive testing techniques to detect and interpret weld defects.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
    slugs: ["ultrasound-a-scan", "radiography-sim"],
  },
  {
    id: "knowledge-checks",
    title: "Knowledge Checks",
    description: "Test understanding of laser welding and friction stir welding principles.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    slugs: ["laser-quiz", "fsw-quiz"],
  },
];

const toolMap = Object.fromEntries(weldingTools.map((t) => [t.slug, t]));

export default function WeldingPage() {
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
                Welding
              </h1>
              <p className="mt-4 text-lg font-medium text-accent/80">
                Process, quality, and NDT simulations
              </p>
            </div>
            <div className="text-accent">
              <TopicIcon name="welding" className="h-20 w-20 sm:h-24 sm:w-24" />
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            Follow the welding learning path — from process control and joint preparation through
            non-destructive testing to knowledge validation — using seven interactive tools.
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

      {/* Category sections */}
      <div className="mx-auto w-full max-w-7xl space-y-16 px-4 pt-16 sm:px-6 lg:px-8">
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
                    href={`/welding/apps/${tool.slug}`}
                    className="group rounded-2xl border border-[color:var(--border)] bg-white p-6 shadow-[0_16px_40px_rgba(48,54,44,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_40px_rgba(140,45,25,0.14)]"
                  >
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
