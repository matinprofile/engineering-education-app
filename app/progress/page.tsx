"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getModuleStats,
  getOverallStats,
  clearTracking,
  type ModuleStats,
  type OverallStats,
} from "@/lib/tracking";
import { learningPaths } from "@/lib/paths";

export default function ProgressPage() {
  const [modules, setModules] = useState<ModuleStats[]>([]);
  const [overall, setOverall] = useState<OverallStats | null>(null);

  function load() {
    setModules(getModuleStats());
    setOverall(getOverallStats());
  }

  useEffect(() => { load(); }, []);

  function handleClear() {
    if (confirm("Reset all your learning progress? This cannot be undone.")) {
      clearTracking();
      load();
    }
  }

  const allStepsCount = Object.values(learningPaths).reduce((s, p) => s + p.steps.length, 0);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-[color:var(--border)] bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            Back to Home
          </Link>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">Learning Progress</span>
              </div>
              <h1 className="font-heading text-3xl font-bold text-text sm:text-4xl">Your Progress</h1>
              {overall && (
                <p className="mt-2 text-sm text-muted">
                  {overall.visitedTools} of {overall.totalTools} tools explored
                  {overall.totalTimeMin > 0 && <> · {overall.totalTimeMin} min on platform</>}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/8 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-accent transition-all hover:bg-accent/14"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Overall stat cards */}
        {overall && (
          <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={overall.visitedTools} label="Tools Visited" total={overall.totalTools} />
            <StatCard value={overall.modulesStarted} label="Modules Started" total={5} />
            <StatCard value={overall.modulesComplete} label="Modules Complete" total={5} />
            <StatCard value={overall.totalTimeMin} label="Minutes on Platform" />
          </div>
        )}

        {/* Overall progress bar */}
        {overall && overall.visitedTools > 0 && (
          <div className="mb-10 rounded-2xl border border-[color:var(--border)] bg-white p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-text">Overall Completion</span>
              <span className="text-sm font-bold text-accent">
                {Math.round((overall.visitedTools / allStepsCount) * 100)}%
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-accent/10">
              <div
                className="h-full rounded-full bg-accent transition-all duration-700"
                style={{ width: `${(overall.visitedTools / allStepsCount) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted">
              {overall.visitedTools} of {allStepsCount} interactive tools completed across all modules
            </p>
          </div>
        )}

        {/* Module cards */}
        <h2 className="mb-5 font-heading text-xl font-bold text-text">Modules</h2>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-1">
          {modules.map((m) => (
            <ModuleCard key={m.module} stat={m} />
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--border)] pt-8">
          <p className="text-xs text-muted">
            Progress is saved locally in your browser.
          </p>
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:border-red-400 hover:bg-red-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            Clear Progress
          </button>
        </div>
      </div>
    </main>
  );
}

function StatCard({ value, label, total }: { value: number; label: string; total?: number }) {
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5">
      <div className="font-heading text-3xl font-bold text-accent">
        {value}
        {total !== undefined && <span className="text-lg text-muted/50">/{total}</span>}
      </div>
      <div className="mt-1 text-xs font-medium text-muted">{label}</div>
    </div>
  );
}

function ModuleCard({ stat }: { stat: ModuleStats }) {
  const isEmpty = stat.visitedSteps === 0;
  const isComplete = stat.visitedSteps === stat.totalSteps;
  const ctaHref = stat.nextUnvisitedHref ?? `/${stat.module}`;
  const ctaLabel = isEmpty ? "Start Module" : isComplete ? "Review Module" : `Continue`;

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-white p-6 transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-3">
            <h3 className="font-heading text-lg font-bold text-text">{stat.title}</h3>
            {isComplete && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Complete
              </span>
            )}
          </div>
          <p className="text-sm text-muted">
            {stat.visitedSteps} of {stat.totalSteps} steps
            {stat.timeSpentMin > 0 && <> · {stat.timeSpentMin} min spent</>}
            {isEmpty && <> · Not started</>}
          </p>

          {/* Progress bar */}
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-accent/10">
            <div
              className={`h-full rounded-full transition-all duration-700 ${isComplete ? "bg-accent" : "bg-accent/70"}`}
              style={{ width: `${stat.completionPct}%` }}
            />
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-muted/70">
              {isEmpty ? "0%" : `${stat.completionPct}%`}
            </span>
            {!isEmpty && !isComplete && (
              <span className="text-xs text-accent/80">
                {stat.totalSteps - stat.visitedSteps} step{stat.totalSteps - stat.visitedSteps !== 1 ? "s" : ""} remaining
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md"
          >
            {ctaLabel}
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </Link>
          <Link
            href={`/${stat.module}`}
            className="text-xs text-muted transition-colors hover:text-accent"
          >
            View module →
          </Link>
        </div>
      </div>
    </div>
  );
}
