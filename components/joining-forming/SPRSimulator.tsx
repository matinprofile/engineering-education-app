"use client";

import { useEffect, useState } from "react";

type Case = {
  id: string;
  label: string;
  videoFile: string;
  interlock: string;
  bottomThickness: string;
  force: string;
};

type Parameter = {
  key: string;
  label: string;
  symbol: string;
  optimum: string;
  description: string;
  cases: Case[];
};

// Hotspot positions as % of /spr.png (1123x714), measured directly against a
// 5%-grid overlay of the schematic so each marker sits on its labeled
// dimension in the "Before Joining" panel. Marker text uses the exact symbol
// from SPR.xlsx column C (L, ld, Dc, t); the yield-strength row has no
// column-C symbol ("-" in the sheet), so it keeps a descriptive "σy" label.
const hotspots: { id: string; x: number; y: number; label: string }[] = [
  { id: "l",  x: 13.5, y: 18.0, label: "L" },  // L  — blank holder / rivet length arrow
  { id: "dd", x: 9.0 , y: 39.5, label: "ld" }, // ld — die depth arrow
  { id: "dc", x: 30.0, y: 39.5, label: "Dc" }, // Dc — die cavity diameter arrow
  { id: "ys", x: 33.0, y: 15.5, label: "Ys" }, // Rivet body — rivet material yield strength
  { id: "t",  x: 41.5, y: 19.0, label: "t" },  // t  — rivet leg thickness arrow
];

const parameters: Parameter[] = [
  {
    key: "l",
    label: "Rivet Length",
    symbol: "L",
    optimum: "4 mm",
    description:
      "Length of the semi-tubular rivet. A longer rivet penetrates deeper into the lower sheet, increasing interlock but reducing remaining bottom thickness.",
    cases: [
      { id: "min", label: "L = 4 mm",   videoFile: "spr/l_min", interlock: "0.112 mm", bottomThickness: "1.01 mm", force: "35.5 kN" },
      { id: "max", label: "L = 4.5 mm", videoFile: "spr/l_max", interlock: "0.198 mm", bottomThickness: "0.552 mm", force: "36.4 kN" },
    ],
  },
  {
    key: "dd",
    label: "Die Depth",
    symbol: "ld",
    optimum: "0.8 mm",
    description:
      "Depth of the die cavity. Controls how much material is pushed to flow radially around the rivet leg to form the interlock.",
    cases: [
      { id: "min", label: "ld = 0.6 mm", videoFile: "spr/dd_min", interlock: "0.165 mm", bottomThickness: "1.067 mm", force: "47.2 kN" },
      { id: "max", label: "ld = 1 mm",   videoFile: "spr/dd_max", interlock: "—",         bottomThickness: "—",        force: "23.2 kN" },
    ],
  },
  {
    key: "dc",
    label: "Die Cavity Diameter",
    symbol: "Dc",
    optimum: "8 mm",
    description:
      "Diameter of the die cavity. Governs the width over which material can flow to lock around the rivet leg during setting.",
    cases: [
      { id: "min", label: "Dc = 7 mm",  videoFile: "spr/dc_min", interlock: "0.119 mm",  bottomThickness: "1.01 mm",  force: "37.3 kN" },
      { id: "max", label: "Dc = 12 mm", videoFile: "spr/dc_max", interlock: "0.0613 mm", bottomThickness: "0.971 mm", force: "25.6 kN" },
    ],
  },
  {
    key: "ys",
    label: "Rivet Material Yield Strength",
    symbol: "—",
    optimum: "1520 MPa",
    description:
      "Yield strength of the rivet material. A stronger rivet resists leg splay and buckling, changing how it pierces and flares in the lower sheet.",
    cases: [
      { id: "min", label: "920 MPa",  videoFile: "spr/ys_min", interlock: "0.021 mm", bottomThickness: "1.539 mm", force: "31.1 kN" },
      { id: "max", label: "2120 MPa", videoFile: "spr/ys_max", interlock: "—",        bottomThickness: "—",        force: "34.4 kN" },
    ],
  },
  {
    key: "t",
    label: "Rivet Leg Thickness",
    symbol: "t",
    optimum: "0.65 mm",
    description:
      "Wall thickness of the rivet leg. Thicker legs resist buckling and increase interlock, but require more force to pierce and flare.",
    cases: [
      { id: "min", label: "t = 0.65 mm", videoFile: "spr/t_min", interlock: "0.142 mm", bottomThickness: "0.816 mm", force: "34.6 kN" },
      { id: "max", label: "t = 0.85 mm", videoFile: "spr/t_max", interlock: "0.196 mm", bottomThickness: "0.898 mm", force: "38 kN" },
    ],
  },
];

export function SPRSimulator() {
  const [selectedParamKey, setSelectedParamKey] = useState<string>();
  const [selectedCaseId, setSelectedCaseId] = useState<string>();
  const [compareList, setCompareList] = useState<string[]>([]);

  const activeParam = parameters.find((p) => p.key === selectedParamKey);
  const activeCase = activeParam?.cases.find((c) => c.id === selectedCaseId);

  const videoUrl = activeCase ? `/videos/${activeCase.videoFile}.mp4` : undefined;
  const videoKey = activeCase?.videoFile ?? "none";

  useEffect(() => {
    const video = document.getElementById("spr-video") as HTMLVideoElement | null;
    if (video) {
      video.load();
      void video.play().catch(() => {});
    }
  }, [videoUrl]);

  function selectParam(key: string) {
    setSelectedParamKey(key);
    const param = parameters.find((p) => p.key === key);
    setSelectedCaseId(param?.cases[0]?.id);
  }

  function addToCompare() {
    if (!activeCase) return;
    if (!compareList.includes(activeCase.videoFile)) {
      setCompareList((prev) => [...prev, activeCase.videoFile]);
    }
  }

  function removeFromCompare(file: string) {
    setCompareList((prev) => prev.filter((f) => f !== file));
  }

  function playAll() {
    (document.querySelectorAll(".compare-video-spr") as NodeListOf<HTMLVideoElement>)
      .forEach((v) => void v.play().catch(() => {}));
  }

  function pauseAll() {
    (document.querySelectorAll(".compare-video-spr") as NodeListOf<HTMLVideoElement>)
      .forEach((v) => v.pause());
  }

  return (
    <div className="space-y-10">
      <section className="grid gap-8 xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
        {/* Schematic + controls */}
        <div className="relative">
          <img
            src="/spr.png"
            alt="Self-piercing rivet (SPR) joint cross-section, before and after joining, with interactive parameter hotspots"
            className="w-full rounded-2xl border border-[color:var(--border)] bg-white shadow-[0_16px_40px_rgba(48,54,44,0.08)]"
          />

          {hotspots.map((spot) => {
            const param = parameters.find((p) => p.key === spot.id);
            const isActive = spot.id === selectedParamKey;
            return (
              <button
                key={spot.id}
                type="button"
                title={param?.label}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white px-2 py-1 text-[10px] font-bold text-white shadow transition-colors ${isActive ? "bg-emerald-600" : "bg-accent/90 hover:bg-accent"}`}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                onClick={() => selectParam(spot.id)}
              >
                {spot.label}
              </button>
            );
          })}

          {activeParam ? (
            <div className="mt-6 rounded-xl border border-[color:var(--border)] bg-white p-5">
              <h3 className="font-heading text-lg font-semibold text-text">
                {activeParam.label} {activeParam.symbol !== "—" ? `(${activeParam.symbol})` : ""}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted">Optimum: {activeParam.optimum}</p>
              <p className="mt-2 text-sm leading-7 text-muted">{activeParam.description}</p>

              <div className="mt-4 flex flex-wrap gap-3">
                {activeParam.cases.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`rounded-lg border px-4 py-2 text-sm font-medium ${c.id === selectedCaseId ? "border-accent bg-accent text-white" : "border-[color:var(--border)] bg-white text-text hover:border-accent"}`}
                    onClick={() => setSelectedCaseId(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {activeCase ? (
                <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="rounded-lg bg-primary/35 p-2">
                    <div className="font-semibold text-text">{activeCase.interlock}</div>
                    <div className="text-muted">Interlock (f)</div>
                  </div>
                  <div className="rounded-lg bg-primary/35 p-2">
                    <div className="font-semibold text-text">{activeCase.bottomThickness}</div>
                    <div className="text-muted">Bottom thickness (tr)</div>
                  </div>
                  <div className="rounded-lg bg-primary/35 p-2">
                    <div className="font-semibold text-text">{activeCase.force}</div>
                    <div className="text-muted">Joining force (F)</div>
                  </div>
                </div>
              ) : null}

              <button
                type="button"
                onClick={addToCompare}
                disabled={!activeCase}
                className="mt-4 rounded-lg border border-accent bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
              >
                Add to Compare
              </button>
            </div>
          ) : null}
        </div>

        {/* Video + parameter table */}
        <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 shadow-[0_16px_40px_rgba(48,54,44,0.08)]">
          <h2 className="font-heading text-2xl font-semibold text-text">Simulation Video</h2>

          {videoUrl ? (
            <video
              id="spr-video"
              key={videoKey}
              controls
              autoPlay
              className="mt-4 w-full rounded-xl border border-[color:var(--border)]"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="mt-4 flex h-[200px] sm:h-[280px] items-center justify-center rounded-xl border border-[color:var(--border)] bg-primary/35 px-6 text-center text-sm text-muted">
              Click a parameter hotspot on the schematic to load a simulation.
            </div>
          )}

          <div className="mt-6">
            <h3 className="font-heading text-lg font-semibold text-text">Parameters</h3>
            <div className="mt-3 overflow-hidden rounded-xl border border-[color:var(--border)]">
              <table className="w-full text-sm">
                <thead className="bg-primary/45">
                  <tr>
                    <th className="border-b border-[color:var(--border)] px-3 py-2 text-left">Parameter</th>
                    <th className="border-b border-[color:var(--border)] px-3 py-2 text-left">Optimum</th>
                    <th className="border-b border-[color:var(--border)] px-3 py-2 text-left">Current Case</th>
                  </tr>
                </thead>
                <tbody>
                  {parameters.map((p) => {
                    const isActive = p.key === selectedParamKey;
                    const dispCase = isActive && activeCase ? activeCase.label : "—";
                    return (
                      <tr key={p.key} className={isActive ? "bg-accent/10" : ""}>
                        <td className="border-b border-[color:var(--border)] px-3 py-2 font-medium">{p.label}</td>
                        <td className="border-b border-[color:var(--border)] px-3 py-2 text-muted">{p.optimum}</td>
                        <td className="border-b border-[color:var(--border)] px-3 py-2 text-muted">{dispCase}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison panel */}
      <section className="rounded-2xl border border-[color:var(--border)] bg-white p-5 shadow-[0_16px_40px_rgba(48,54,44,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-semibold text-text">Comparison Panel</h2>
          <div className="flex gap-2">
            <button type="button" onClick={playAll} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Play All</button>
            <button type="button" onClick={pauseAll} className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white">Pause All</button>
          </div>
        </div>

        {compareList.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No simulations added yet. Select a parameter and case, then click Add to Compare.</p>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {compareList.map((file) => {
              const label = parameters
                .flatMap((p) => p.cases.map((c) => ({ label: `${p.label} — ${c.label}`, videoFile: c.videoFile })))
                .find((entry) => entry.videoFile === file)?.label ?? file;
              return (
                <article key={file} className="relative rounded-xl border border-[color:var(--border)] bg-primary/20 p-3">
                  <button
                    type="button"
                    className="absolute right-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white"
                    onClick={() => removeFromCompare(file)}
                  >
                    Remove
                  </button>
                  <video src={`/videos/${file}.mp4`} className="compare-video-spr w-full rounded border border-[color:var(--border)]" controls />
                  <p className="mt-2 text-xs text-muted">{label}</p>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
