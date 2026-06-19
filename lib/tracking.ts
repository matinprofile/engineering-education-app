import { learningPaths } from "@/lib/paths";

export type VisitRecord = {
  href: string;
  module: string;
  title: string;
  visitedAt: number;
  timeSpentSec: number;
  sessionId: string;
};

type TrackingData = {
  version: 2;
  visits: VisitRecord[];
};

const STORAGE_KEY = "ee-tracking-v2";
const LEGACY_KEY = "ee-path-visited";
const SESSION_KEY = "ee-session-id";

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = makeId();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return makeId();
  }
}

export function getTrackingData(): TrackingData {
  if (typeof window === "undefined") return { version: 2, visits: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as TrackingData;
  } catch { /* ignore */ }
  return { version: 2, visits: [] };
}

function saveTrackingData(data: TrackingData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

export function getVisitedHrefs(): string[] {
  const data = getTrackingData();
  const hrefs = new Set(data.visits.map((v) => v.href));
  try {
    if (typeof window !== "undefined") {
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy) {
        const arr: string[] = JSON.parse(legacy);
        arr.forEach((h) => hrefs.add(h));
      }
    }
  } catch { /* ignore */ }
  return [...hrefs];
}

export function recordVisit(href: string, module: string, title: string): void {
  const data = getTrackingData();
  data.visits.push({
    href,
    module,
    title,
    visitedAt: Date.now(),
    timeSpentSec: 0,
    sessionId: getSessionId(),
  });
  saveTrackingData(data);
  // keep legacy key in sync so existing ModuleLearningPath reads still work
  try {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(LEGACY_KEY);
      const arr: string[] = raw ? JSON.parse(raw) : [];
      if (!arr.includes(href)) {
        arr.push(href);
        localStorage.setItem(LEGACY_KEY, JSON.stringify(arr));
      }
    }
  } catch { /* ignore */ }
}

export function updateTimeSpent(href: string, seconds: number): void {
  if (seconds < 2) return;
  const data = getTrackingData();
  for (let i = data.visits.length - 1; i >= 0; i--) {
    if (data.visits[i].href === href) {
      data.visits[i].timeSpentSec = Math.max(data.visits[i].timeSpentSec, Math.round(seconds));
      break;
    }
  }
  saveTrackingData(data);
}

export function clearTracking(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_KEY);
  } catch { /* ignore */ }
}

export function exportAsJson(): string {
  return JSON.stringify(getTrackingData(), null, 2);
}

// ---- Stats ----

export type ModuleStats = {
  module: string;
  title: string;
  totalSteps: number;
  visitedSteps: number;
  completionPct: number;
  visitCount: number;
  timeSpentMin: number;
  nextUnvisitedHref: string | null;
};

export type OverallStats = {
  totalTools: number;
  visitedTools: number;
  modulesStarted: number;
  modulesComplete: number;
  totalVisits: number;
  totalTimeMin: number;
};

export type ToolVisitCount = {
  href: string;
  title: string;
  module: string;
  count: number;
  timeSpentMin: number;
};

export function getModuleStats(): ModuleStats[] {
  const visited = new Set(getVisitedHrefs());
  const data = getTrackingData();
  return Object.values(learningPaths).map((path) => {
    const visitedSteps = path.steps.filter((s) => visited.has(s.href)).length;
    const moduleVisits = data.visits.filter((v) => v.module === path.module);
    const timeSpentSec = moduleVisits.reduce((sum, v) => sum + v.timeSpentSec, 0);
    const nextUnvisited = path.steps.find((s) => !visited.has(s.href));
    return {
      module: path.module,
      title: path.title,
      totalSteps: path.steps.length,
      visitedSteps,
      completionPct: path.steps.length > 0 ? Math.round((visitedSteps / path.steps.length) * 100) : 0,
      visitCount: moduleVisits.length,
      timeSpentMin: Math.round(timeSpentSec / 60),
      nextUnvisitedHref: nextUnvisited?.href ?? null,
    };
  });
}

export function getOverallStats(): OverallStats {
  const data = getTrackingData();
  const visited = new Set(getVisitedHrefs());
  const allSteps = Object.values(learningPaths).flatMap((p) => p.steps);
  const moduleStats = getModuleStats();
  return {
    totalTools: allSteps.length,
    visitedTools: allSteps.filter((s) => visited.has(s.href)).length,
    modulesStarted: moduleStats.filter((m) => m.visitedSteps > 0).length,
    modulesComplete: moduleStats.filter((m) => m.visitedSteps === m.totalSteps && m.totalSteps > 0).length,
    totalVisits: data.visits.length,
    totalTimeMin: Math.round(data.visits.reduce((sum, v) => sum + v.timeSpentSec, 0) / 60),
  };
}

export function getMostVisited(limit = 10): ToolVisitCount[] {
  const data = getTrackingData();
  const map = new Map<string, ToolVisitCount>();
  for (const v of data.visits) {
    const ex = map.get(v.href);
    if (ex) {
      ex.count++;
      ex.timeSpentMin += v.timeSpentSec / 60;
    } else {
      map.set(v.href, {
        href: v.href,
        title: v.title,
        module: v.module,
        count: 1,
        timeSpentMin: v.timeSpentSec / 60,
      });
    }
  }
  return [...map.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map((t) => ({ ...t, timeSpentMin: Math.round(t.timeSpentMin) }));
}

export function getRecentActivity(limit = 20): VisitRecord[] {
  const data = getTrackingData();
  return [...data.visits].sort((a, b) => b.visitedAt - a.visitedAt).slice(0, limit);
}

// ---- Quiz Scores ----

export type QuizScore = {
  quizId: string;
  score: number;
  total: number;
  attemptedAt: number;
  sessionId: string;
};

const QUIZ_KEY = "ee-quiz-scores-v1";

function getQuizData(): QuizScore[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(QUIZ_KEY);
    if (raw) return JSON.parse(raw) as QuizScore[];
  } catch { /* ignore */ }
  return [];
}

export function recordQuizScore(quizId: string, score: number, total: number): void {
  if (typeof window === "undefined") return;
  try {
    const data = getQuizData();
    data.push({ quizId, score, total, attemptedAt: Date.now(), sessionId: getSessionId() });
    localStorage.setItem(QUIZ_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

export function getQuizScores(): QuizScore[] {
  return getQuizData();
}

export function getBestScore(quizId: string): QuizScore | null {
  const scores = getQuizData().filter((s) => s.quizId === quizId);
  if (!scores.length) return null;
  return scores.reduce((best, s) => (s.score > best.score ? s : best), scores[0]);
}

export function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
