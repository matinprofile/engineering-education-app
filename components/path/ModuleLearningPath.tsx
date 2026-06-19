"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { LearningPath } from "@/lib/paths";
import { getVisitedHrefs } from "@/lib/tracking";

type Props = { path: LearningPath };

function getTotalMinutes(path: LearningPath): number {
  return path.steps.reduce((sum, s) => {
    const m = parseInt(s.duration);
    return sum + (isNaN(m) ? 0 : m);
  }, 0);
}

export function ModuleLearningPath({ path }: Props) {
  const [visited, setVisited] = useState<string[]>([]);

  useEffect(() => {
    setVisited(getVisitedHrefs());
  }, []);

  const visitedCount = path.steps.filter((s) => visited.includes(s.href)).length;
  const nextUnvisited = path.steps.find((s) => !visited.includes(s.href));
  const ctaHref = nextUnvisited?.href ?? path.steps[0].href;
  const isComplete = visitedCount === path.steps.length;
  const ctaLabel = visitedCount === 0
    ? "Start Learning Path"
    : isComplete
    ? "Review Path"
    : `Continue: ${nextUnvisited?.title}`;

  const totalMinutes = getTotalMinutes(path);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
        {/* Header row */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
              >
                <path d="M4 6h16M4 10h16M4 14h10M4 18h6" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Guided Learning Path
              </span>
            </div>
            <h2 className="font-heading text-2xl font-bold text-text">{path.title}</h2>
            <p className="mt-1 text-sm text-muted">
              {path.steps.length} interactive {path.steps.length === 1 ? "module" : "modules"} ·{" "}
              ~{totalMinutes} min total
              {visitedCount > 0 && !isComplete && (
                <> · <span className="text-accent">{visitedCount}/{path.steps.length} completed</span></>
              )}
              {isComplete && (
                <> · <span className="font-medium text-accent">All steps completed!</span></>
              )}
            </p>
          </div>

          <Link
            href={ctaHref}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md"
          >
            {ctaLabel}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>

        {/* Progress bar */}
        {visitedCount > 0 && (
          <div className="mb-6">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-accent/15">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${(visitedCount / path.steps.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Steps grid */}
        <div className={`grid gap-3 ${path.steps.length <= 3 ? "sm:grid-cols-3" : path.steps.length <= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {path.steps.map((step, i) => {
            const isVisited = visited.includes(step.href);
            const isCurrent = !isComplete && step.href === nextUnvisited?.href && visitedCount > 0;
            return (
              <Link
                key={step.href}
                href={step.href}
                className={`flex items-start gap-3 rounded-xl border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  isVisited
                    ? "border-accent/30 bg-white hover:border-accent/50"
                    : isCurrent
                    ? "border-accent/40 bg-white ring-2 ring-accent/20 hover:border-accent/60"
                    : "border-[color:var(--border)] bg-white/60 hover:border-accent/40 hover:bg-white"
                }`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isVisited
                      ? "bg-accent text-white"
                      : isCurrent
                      ? "border-2 border-accent bg-white text-accent"
                      : "border border-accent/40 bg-white text-accent/60"
                  }`}
                >
                  {isVisited ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-text">{step.title}</div>
                  <div className="text-xs text-muted/70">{step.duration}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
