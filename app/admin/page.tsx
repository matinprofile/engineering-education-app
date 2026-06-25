"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { mainCategories } from "@/lib/topics";
import { learningPaths } from "@/lib/paths";

// ── Types ─────────────────────────────────────────────────────────────────────

type StepConfig = { title: string; href: string; duration: string };

type PathConfig = { module: string; steps: StepConfig[] };

type ModuleConfig = {
  slug: string;
  title: string;
  summary: string;
  highlight: string;
  visible: boolean;
};

type AdminConfig = {
  modules: ModuleConfig[];
  paths: PathConfig[];
  lastModified: string;
};

const STORAGE_KEY = "ee-admin-config";

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildDefaultConfig(): AdminConfig {
  const modules: ModuleConfig[] = mainCategories.map((c) => ({
    slug: c.slug,
    title: c.title,
    summary: c.summary,
    highlight: c.highlight,
    visible: true,
  }));

  const paths: PathConfig[] = Object.values(learningPaths).map((p) => ({
    module: p.module,
    steps: p.steps.map((s) => ({ title: s.title, href: s.href, duration: s.duration })),
  }));

  return { modules, paths, lastModified: new Date().toISOString() };
}

function loadConfig(): AdminConfig {
  if (typeof window === "undefined") return buildDefaultConfig();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AdminConfig;
  } catch {
    // ignore
  }
  return buildDefaultConfig();
}

function saveConfig(cfg: AdminConfig) {
  cfg.lastModified = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [config, setConfig] = useState<AdminConfig | null>(null);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [newStep, setNewStep] = useState<{ module: string; title: string; href: string; duration: string } | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setAuthLoading(false);
      setConfig(loadConfig());
      return;
    }
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/auth/login");
        return;
      }
      setUser(data.user);
      setAuthLoading(false);
      setConfig(loadConfig());
    });
  }, [router]);

  const persist = useCallback((next: AdminConfig) => {
    saveConfig(next);
    setConfig({ ...next });
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }, []);

  function handleModuleField(slug: string, field: keyof ModuleConfig, value: string | boolean) {
    if (!config) return;
    const modules = config.modules.map((m) =>
      m.slug === slug ? { ...m, [field]: value } : m
    );
    persist({ ...config, modules });
  }

  function handleStepField(module: string, idx: number, field: keyof StepConfig, value: string) {
    if (!config) return;
    const paths = config.paths.map((p) => {
      if (p.module !== module) return p;
      const steps = p.steps.map((s, i) => (i === idx ? { ...s, [field]: value } : s));
      return { ...p, steps };
    });
    persist({ ...config, paths });
  }

  function moveStep(module: string, idx: number, dir: -1 | 1) {
    if (!config) return;
    const paths = config.paths.map((p) => {
      if (p.module !== module) return p;
      const steps = [...p.steps];
      const target = idx + dir;
      if (target < 0 || target >= steps.length) return p;
      [steps[idx], steps[target]] = [steps[target], steps[idx]];
      return { ...p, steps };
    });
    persist({ ...config, paths });
  }

  function deleteStep(module: string, idx: number) {
    if (!config) return;
    const paths = config.paths.map((p) => {
      if (p.module !== module) return p;
      return { ...p, steps: p.steps.filter((_, i) => i !== idx) };
    });
    persist({ ...config, paths });
  }

  function addStep(module: string) {
    if (!config || !newStep || newStep.module !== module) return;
    if (!newStep.title.trim() || !newStep.href.trim()) return;
    const paths = config.paths.map((p) => {
      if (p.module !== module) return p;
      return {
        ...p,
        steps: [
          ...p.steps,
          { title: newStep.title.trim(), href: newStep.href.trim(), duration: newStep.duration.trim() || "10 min" },
        ],
      };
    });
    persist({ ...config, paths });
    setNewStep(null);
  }

  function handleReset() {
    if (!confirm("Reset all changes to the original static configuration?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setConfig(buildDefaultConfig());
  }

  function handleExport() {
    if (!config) return;
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ee-admin-config-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target?.result as string) as AdminConfig;
        persist(imported);
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  if (authLoading || !config) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary/40">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  const getPathForModule = (slug: string) =>
    config.paths.find((p) => p.module === slug);

  return (
    <main className="min-h-screen bg-primary/40">
      {/* Header */}
      <div className="border-b border-[color:var(--border)] bg-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            Home
          </Link>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">Instructor Panel</span>
              </div>
              <h1 className="font-heading text-3xl font-bold text-text sm:text-4xl">Authoring Mode</h1>
              <p className="mt-2 text-sm text-muted">
                Signed in as <span className="font-medium text-text">{user?.email}</span>
                {config.lastModified && (
                  <> · Last saved {new Date(config.lastModified).toLocaleTimeString()}</>
                )}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {saved && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Saved
                </span>
              )}
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-white px-4 py-2 text-xs font-semibold text-accent transition-all hover:bg-accent/5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export JSON
              </button>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[color:var(--border)] bg-white px-4 py-2 text-xs font-semibold text-muted transition-all hover:border-accent/30 hover:text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Import JSON
                <input type="file" accept=".json" className="hidden" onChange={handleImport} />
              </label>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-500 transition-all hover:bg-red-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
                Reset Defaults
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-4">

        {/* Info banner */}
        <div className="rounded-xl border border-accent/20 bg-accent/5 px-5 py-3 text-xs text-accent/80">
          Changes are saved in your browser. Use <strong>Export JSON</strong> to download the configuration for permanent deployment, or import a previously exported config.
        </div>

        {/* Module list */}
        {config.modules.map((mod) => {
          const path = getPathForModule(mod.slug);
          const isOpen = activeModule === mod.slug;

          return (
            <div key={mod.slug} className="rounded-2xl border border-[color:var(--border)] bg-white overflow-hidden">
              {/* Module header */}
              <button
                type="button"
                onClick={() => setActiveModule(isOpen ? null : mod.slug)}
                className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-primary/20"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <label
                    className="relative inline-flex cursor-pointer items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={mod.visible}
                      onChange={(e) => handleModuleField(mod.slug, "visible", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="h-5 w-9 rounded-full bg-muted/30 transition-colors peer-checked:bg-accent after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
                  </label>
                  <div className="min-w-0 text-left">
                    <p className="font-heading text-sm font-bold text-text">{mod.title}</p>
                    <p className="text-xs text-muted truncate max-w-xs">{mod.highlight}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-xs text-muted">{path?.steps.length ?? 0} steps</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-[color:var(--border)] px-6 pb-6 pt-5 space-y-6">
                  {/* Module metadata */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-xs font-semibold text-muted uppercase tracking-widest">Title</label>
                      <input
                        value={mod.title}
                        onChange={(e) => handleModuleField(mod.slug, "title", e.target.value)}
                        className="w-full rounded-lg border border-[color:var(--border)] px-3 py-2 text-sm text-text focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-muted uppercase tracking-widest">Highlight Tag</label>
                      <input
                        value={mod.highlight}
                        onChange={(e) => handleModuleField(mod.slug, "highlight", e.target.value)}
                        className="w-full rounded-lg border border-[color:var(--border)] px-3 py-2 text-sm text-text focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-xs font-semibold text-muted uppercase tracking-widest">Summary</label>
                      <textarea
                        value={mod.summary}
                        rows={3}
                        onChange={(e) => handleModuleField(mod.slug, "summary", e.target.value)}
                        className="w-full rounded-lg border border-[color:var(--border)] px-3 py-2 text-sm text-text focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                      />
                    </div>
                  </div>

                  {/* Learning path steps */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">Learning Path Steps</h3>
                      <button
                        type="button"
                        onClick={() =>
                          setNewStep({ module: mod.slug, title: "", href: "", duration: "10 min" })
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/5"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Add Step
                      </button>
                    </div>

                    <div className="space-y-2">
                      {path?.steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3 rounded-xl border border-[color:var(--border)] bg-primary/20 p-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                            {idx + 1}
                          </span>
                          <div className="flex flex-1 flex-col gap-2 min-w-0 sm:flex-row">
                            <input
                              value={step.title}
                              onChange={(e) => handleStepField(mod.slug, idx, "title", e.target.value)}
                              placeholder="Step title"
                              className="flex-1 rounded-lg border border-[color:var(--border)] bg-white px-2.5 py-1.5 text-xs text-text focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                            />
                            <input
                              value={step.href}
                              onChange={(e) => handleStepField(mod.slug, idx, "href", e.target.value)}
                              placeholder="/path/to/step"
                              className="flex-1 rounded-lg border border-[color:var(--border)] bg-white px-2.5 py-1.5 text-xs font-mono text-muted focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                            />
                            <input
                              value={step.duration}
                              onChange={(e) => handleStepField(mod.slug, idx, "duration", e.target.value)}
                              placeholder="10 min"
                              className="w-20 rounded-lg border border-[color:var(--border)] bg-white px-2.5 py-1.5 text-xs text-muted focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                            />
                          </div>
                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              type="button"
                              onClick={() => moveStep(mod.slug, idx, -1)}
                              disabled={idx === 0}
                              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white hover:text-accent disabled:opacity-30"
                              title="Move up"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => moveStep(mod.slug, idx, 1)}
                              disabled={!path || idx === path.steps.length - 1}
                              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white hover:text-accent disabled:opacity-30"
                              title="Move down"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete step "${step.title}"?`)) deleteStep(mod.slug, idx);
                              }}
                              className="flex h-7 w-7 items-center justify-center rounded-lg text-red-400 transition-colors hover:bg-red-50"
                              title="Delete step"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* New step form */}
                      {newStep?.module === mod.slug && (
                        <div className="flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/5 p-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                            +
                          </span>
                          <div className="flex flex-1 flex-col gap-2 min-w-0 sm:flex-row">
                            <input
                              autoFocus
                              value={newStep.title}
                              onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
                              placeholder="Step title"
                              className="flex-1 rounded-lg border border-[color:var(--border)] bg-white px-2.5 py-1.5 text-xs text-text focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                            />
                            <input
                              value={newStep.href}
                              onChange={(e) => setNewStep({ ...newStep, href: e.target.value })}
                              placeholder="/path/to/step"
                              className="flex-1 rounded-lg border border-[color:var(--border)] bg-white px-2.5 py-1.5 text-xs font-mono text-muted focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                            />
                            <input
                              value={newStep.duration}
                              onChange={(e) => setNewStep({ ...newStep, duration: e.target.value })}
                              placeholder="10 min"
                              className="w-20 rounded-lg border border-[color:var(--border)] bg-white px-2.5 py-1.5 text-xs text-muted focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                            />
                          </div>
                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              type="button"
                              onClick={() => addStep(mod.slug)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white transition-colors hover:bg-accent/80"
                              title="Add"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => setNewStep(null)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white"
                              title="Cancel"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* JSON preview */}
        <details className="rounded-2xl border border-[color:var(--border)] bg-white overflow-hidden">
          <summary className="cursor-pointer px-6 py-4 text-sm font-semibold text-text hover:bg-primary/20">
            Configuration Preview (JSON)
          </summary>
          <div className="border-t border-[color:var(--border)] p-4">
            <pre className="overflow-x-auto rounded-xl bg-primary/30 p-4 text-xs text-muted font-mono max-h-64">
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>
        </details>

        <p className="text-center text-xs text-muted pb-4">
          Instructor Authoring Mode · Engineering Education Platform · Changes stored in browser
        </p>
      </div>
    </main>
  );
}
