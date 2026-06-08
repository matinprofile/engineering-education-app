import Link from "next/link";
import { TopicIcon } from "@/components/ui/TopicIcon";
import type { TopicPageData } from "@/lib/topics";

type TopicPageProps = TopicPageData;

export function TopicPage({ heading, tagline, intro, icon, bullets, keyTopics, applications }: TopicPageProps) {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-[color:var(--border)] bg-primary/55">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(140,45,25,0.14),transparent_50%),radial-gradient(circle_at_90%_10%,rgba(247,218,211,0.42),transparent_52%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-accent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              Back to Home
            </Link>
            <p className="inline-flex rounded-full border border-accent/50 bg-accent/10 px-4 py-1 text-xs uppercase tracking-[0.22em] text-accent">
              Engineering Education
            </p>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="font-heading text-4xl font-bold leading-tight text-text sm:text-5xl lg:text-6xl">
                {heading}
              </h1>
              <p className="mt-4 text-lg font-medium text-accent/80">{tagline}</p>
            </div>
            <div className="text-accent">
              <TopicIcon name={icon} className="h-20 w-20 sm:h-24 sm:w-24" />
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            {intro}
          </p>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <header className="mb-8 space-y-2">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Learning Outcomes
          </h2>
          <p className="max-w-2xl text-muted">
            Core competencies developed through the study of this subject area.
          </p>
        </header>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {bullets.map((point) => (
            <article
              key={point}
              className="flex items-start gap-3 rounded-xl border border-[color:var(--border)] bg-white p-5 text-sm leading-7 text-muted transition-all duration-300 hover:border-accent/40 hover:bg-primary/40 hover:text-text"
            >
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent/70" />
              <span>{point}</span>
            </article>
          ))}
        </div>
      </section>

      {/* Key Topics */}
      <section className="border-y border-[color:var(--border)] bg-primary/35">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <header className="mb-8 space-y-2">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              Key Topics
            </h2>
            <p className="max-w-2xl text-muted">
              In-depth subject areas covered within this engineering module.
            </p>
          </header>
          <div className="grid gap-5 md:grid-cols-2">
            {keyTopics.map((topic) => (
              <article
                key={topic.title}
                className="rounded-2xl border border-[color:var(--border)] bg-white p-6 shadow-[0_16px_40px_rgba(48,54,44,0.08)] transition-all duration-300 hover:border-accent/40 hover:shadow-[0_18px_42px_rgba(140,45,25,0.12)]"
              >
                <h3 className="font-heading text-xl font-semibold text-text">{topic.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{topic.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <header className="mb-8 space-y-2">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Industrial Applications
          </h2>
          <p className="max-w-2xl text-muted">
            Sectors and use cases where this knowledge drives real-world engineering value.
          </p>
        </header>
        <div className="flex flex-wrap gap-3">
          {applications.map((app) => (
            <span
              key={app}
              className="rounded-full border border-accent/20 bg-accent/8 px-5 py-2 text-sm font-medium text-text/80 transition-colors duration-300 hover:border-accent/50 hover:text-accent"
            >
              {app}
            </span>
          ))}
        </div>
      </section>


    </div>
  );
}
