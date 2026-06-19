"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getModuleStats,
  getOverallStats,
  getMostVisited,
  getRecentActivity,
  clearTracking,
  exportAsJson,
  formatTimeAgo,
  type ModuleStats,
  type OverallStats,
  type ToolVisitCount,
  type VisitRecord,
} from "@/lib/tracking";

export default function DashboardPage() {
  const [modules, setModules] = useState<ModuleStats[]>([]);
  const [overall, setOverall] = useState<OverallStats | null>(null);
  const [topTools, setTopTools] = useState<ToolVisitCount[]>([]);
  const [recent, setRecent] = useState<VisitRecord[]>([]);

  function load() {
    setModules(getModuleStats());
    setOverall(getOverallStats());
    setTopTools(getMostVisited(10));
    setRecent(getRecentActivity(15));
  }

  useEffect(() => { load(); }, []);

  function handleExport() {
    const json = exportAsJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ee-usage-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleClear() {
    if (confirm("Clear all usage data? This cannot be undone.")) {
      clearTracking();
      load();
    }
  }

  const maxVisits = topTools[0]?.count ?? 1;

  const moduleColors: Record<string, string> = {
    "adhesive-bonding": "bg-red-500",
    "welding": "bg-orange-500",
    "material-science": "bg-blue-500",
    "technical-drawing": "bg-purple-500",
    "joining-forming": "bg-emerald-500",
  };

  const moduleLabels: Record<string, string> = {
    "adhesive-bonding": "AB",
    "welding": "WL",
    "material-science": "MS",
    "technical-drawing": "TD",
    "joining-forming": "JF",
  };

  return (
    <main className="min-h-screen bg-primary/40">
      {/* Header */}
      <div className="border-b border-[color:var(--border)] bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/progress"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            My Progress
          </Link>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">Usage Analytics</span>
              </div>
              <h1 className="font-heading text-3xl font-bold text-text sm:text-4xl">Dashboard</h1>
              <p className="mt-2 text-sm text-muted">
                Engineering Education Platform · Session Analytics
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-white px-4 py-2 text-xs font-semibold text-accent transition-all hover:bg-accent/5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export JSON
              </button>
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 transition-all hover:bg-red-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                Clear Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">

        {/* Stat cards */}
        {overall && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <DashCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>}
              value={overall.totalVisits}
              label="Total Visits"
            />
            <DashCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>}
              value={overall.visitedTools}
              label="Tools Explored"
              sub={`of ${overall.totalTools}`}
            />
            <DashCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 10h16M4 14h10M4 18h6"/></svg>}
              value={overall.modulesStarted}
              label="Modules Active"
              sub={`of 5`}
            />
            <DashCard
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
              value={overall.totalTimeMin}
              label="Minutes on Platform"
            />
          </div>
        )}

        {/* Module completion table */}
        <div className="rounded-2xl border border-[color:var(--border)] bg-white overflow-hidden">
          <div className="border-b border-[color:var(--border)] px-6 py-4">
            <h2 className="font-heading text-lg font-bold text-text">Module Completion</h2>
          </div>
          <div className="divide-y divide-[color:var(--border)]">
            {modules.map((m) => (
              <div key={m.module} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="w-full sm:w-44">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex h-6 w-8 items-center justify-center rounded text-[10px] font-bold text-white ${moduleColors[m.module] ?? "bg-muted"}`}>
                      {moduleLabels[m.module] ?? "??"}
                    </span>
                    <Link href={`/${m.module}`} className="text-sm font-semibold text-text hover:text-accent transition-colors">
                      {m.title}
                    </Link>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-accent/10">
                      <div
                        className="h-full rounded-full bg-accent transition-all duration-700"
                        style={{ width: `${m.completionPct}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-xs font-bold text-accent">{m.completionPct}%</span>
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    {m.visitedSteps}/{m.totalSteps} steps
                  </div>
                </div>
                <div className="flex items-center gap-6 text-center sm:flex-row">
                  <div>
                    <div className="text-sm font-bold text-text">{m.visitCount}</div>
                    <div className="text-xs text-muted">visits</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-text">{m.timeSpentMin}</div>
                    <div className="text-xs text-muted">min</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Most visited tools */}
          <div className="rounded-2xl border border-[color:var(--border)] bg-white overflow-hidden">
            <div className="border-b border-[color:var(--border)] px-6 py-4">
              <h2 className="font-heading text-lg font-bold text-text">Most Visited Tools</h2>
            </div>
            {topTools.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-muted">No tool visits recorded yet.</div>
            ) : (
              <div className="divide-y divide-[color:var(--border)]">
                {topTools.map((t) => (
                  <div key={t.href} className="px-6 py-3">
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex h-5 w-7 items-center justify-center rounded text-[9px] font-bold text-white ${moduleColors[t.module] ?? "bg-muted"}`}>
                          {moduleLabels[t.module] ?? "??"}
                        </span>
                        <Link href={t.href} className="text-sm font-medium text-text hover:text-accent transition-colors truncate max-w-[180px]">
                          {t.title}
                        </Link>
                      </div>
                      <span className="text-xs font-bold text-accent shrink-0 ml-2">{t.count}×</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-accent/10">
                      <div
                        className="h-full rounded-full bg-accent/60 transition-all duration-700"
                        style={{ width: `${(t.count / maxVisits) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent activity */}
          <div className="rounded-2xl border border-[color:var(--border)] bg-white overflow-hidden">
            <div className="border-b border-[color:var(--border)] px-6 py-4">
              <h2 className="font-heading text-lg font-bold text-text">Recent Activity</h2>
            </div>
            {recent.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-muted">No activity recorded yet.</div>
            ) : (
              <div className="divide-y divide-[color:var(--border)] max-h-[480px] overflow-y-auto">
                {recent.map((v, i) => (
                  <div key={i} className="flex items-start gap-3 px-6 py-3">
                    <span className={`mt-0.5 inline-flex h-6 w-8 shrink-0 items-center justify-center rounded text-[9px] font-bold text-white ${moduleColors[v.module] ?? "bg-muted"}`}>
                      {moduleLabels[v.module] ?? "??"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <Link href={v.href} className="block truncate text-sm font-medium text-text hover:text-accent transition-colors">
                        {v.title}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <span>{formatTimeAgo(v.visitedAt)}</span>
                        {v.timeSpentSec > 0 && (
                          <>
                            <span>·</span>
                            <span>{v.timeSpentSec < 60 ? `${v.timeSpentSec}s` : `${Math.round(v.timeSpentSec / 60)}m`}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted pb-4">
          Data stored locally in your browser · Export JSON to archive session data for research
        </p>
      </div>
    </main>
  );
}

function DashCard({
  icon,
  value,
  label,
  sub,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
        {icon}
      </div>
      <div className="font-heading text-3xl font-bold text-text">
        {value}
        {sub && <span className="ml-1 text-base font-normal text-muted/60">{sub}</span>}
      </div>
      <div className="mt-1 text-xs font-medium text-muted">{label}</div>
    </div>
  );
}
