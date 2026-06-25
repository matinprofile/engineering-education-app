"use client";

import { useEffect, useState } from "react";

type Case = {
  id: string;
  label: string;
  videoFile: string;
};

type Parameter = {
  key: string;
  label: string;
  description: string;
  cases: Case[];
};

// Hotspot positions relative to the rendered image width (~520 px at xl breakpoint).
// x/y are in px from top-left of the image element.
const hotspots: { id: string; x: number; y: number }[] = [
  { id: "dc",       x: 280, y:  60 },
  { id: "rf",       x: 420, y: 155 },
  { id: "l",        x:  80, y: 185 },
  { id: "friction", x: 200, y: 290 },
  { id: "material", x: 350, y: 290 },
];

const parameters: Parameter[] = [
  {
    key: "dc",
    label: "Diameter (Dc)",
    description: "Collar/connector outer diameter. A larger Dc increases the contact area and pull-out strength but requires higher expansion force during assembly.",
    cases: [
      { id: "d58", label: "Dc = 58 mm",  videoFile: "tube-fit/dc_d58" },
      { id: "d59", label: "Dc = 59 mm",  videoFile: "tube-fit/dc_d59" },
      { id: "d60", label: "Dc = 60 mm",  videoFile: "tube-fit/dc_d60" },
    ],
  },
  {
    key: "rf",
    label: "Forming Radius (Rf)",
    description: "Radius of the forming punch tip. Controls material flow at the flare and governs the residual stress profile in the deformed zone.",
    cases: [
      { id: "r05", label: "Rf = 0.5 mm", videoFile: "tube-fit/rf_r05" },
      { id: "r1",  label: "Rf = 1.0 mm", videoFile: "tube-fit/rf_r1"  },
      { id: "r2",  label: "Rf = 2.0 mm", videoFile: "tube-fit/rf_r2"  },
    ],
  },
  {
    key: "l",
    label: "Engagement Length (L)",
    description: "Axial length over which the tube contacts the collar wall. Longer engagement increases pull-out force and joint stiffness.",
    cases: [
      { id: "l09", label: "L = 9 mm",  videoFile: "tube-fit/l_l09" },
      { id: "l10", label: "L = 10 mm", videoFile: "tube-fit/l_l10" },
      { id: "l11", label: "L = 11 mm", videoFile: "tube-fit/l_l11" },
    ],
  },
  {
    key: "friction",
    label: "Friction Coefficient (μ)",
    description: "Interface friction between tube and collar. Higher friction improves pull-out resistance but increases assembly force and tool wear.",
    cases: [
      { id: "f01", label: "μ = 0.1", videoFile: "tube-fit/fr_f01" },
      { id: "f02", label: "μ = 0.2", videoFile: "tube-fit/fr_f02" },
      { id: "f03", label: "μ = 0.3", videoFile: "tube-fit/fr_f03" },
    ],
  },
  {
    key: "material",
    label: "Material",
    description: "Connector and terminal material combination. Material pair determines yield strength, springback, and the quality of the mechanical lock formed.",
    cases: [
      { id: "aa1050_cu", label: "AA1050 + CU-ETP", videoFile: "tube-fit/mat_aa1050_cu"  },
      { id: "aa6082",    label: "AA6082-T4",        videoFile: "tube-fit/mat_aa6082"      },
      { id: "aa2024",    label: "AA2024-T351",       videoFile: "tube-fit/mat_aa2024"      },
      { id: "aa1050t",   label: "AA1050 Terminal",   videoFile: "tube-fit/mat_aa1050t"     },
    ],
  },
];

export function TubeFitSimulator() {
  const [selectedParamKey, setSelectedParamKey] = useState<string>();
  const [selectedCaseId, setSelectedCaseId] = useState<string>();
  const [compareList, setCompareList] = useState<string[]>([]);

  const activeParam = parameters.find((p) => p.key === selectedParamKey);
  const activeCase  = activeParam?.cases.find((c) => c.id === selectedCaseId);

  const videoUrl = activeCase ? `/videos/${activeCase.videoFile}.mp4` : undefined;
  const videoKey = activeCase?.videoFile ?? "none";

  useEffect(() => {
    const video = document.getElementById("tubefit-video") as HTMLVideoElement | null;
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
    (document.querySelectorAll(".compare-video-tf") as NodeListOf<HTMLVideoElement>)
      .forEach((v) => void v.play().catch(() => {}));
  }

  function pauseAll() {
    (document.querySelectorAll(".compare-video-tf") as NodeListOf<HTMLVideoElement>)
      .forEach((v) => v.pause());
  }

  return (
    <div className="space-y-10">
      <section className="grid gap-8 xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
        {/* Schematic + controls */}
        <div className="relative">
          <img
            src="/tube-fit.jpg"
            alt="Tube fit joining cross-section with interactive parameter hotspots"
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
                className={`absolute rounded-full border border-white px-2 py-1 text-[10px] font-bold text-white shadow transition-colors ${isActive ? "bg-emerald-600" : "bg-accent/90 hover:bg-accent"}`}
                style={{ left: spot.x, top: spot.y }}
                onClick={() => selectParam(spot.id)}
              >
                {spot.id === "friction" ? "μ" : spot.id === "material" ? "Mat" : spot.id.toUpperCase()}
              </button>
            );
          })}

          {activeParam ? (
            <div className="mt-6 rounded-xl border border-[color:var(--border)] bg-white p-5">
              <h3 className="font-heading text-lg font-semibold text-text">
                {activeParam.label}
              </h3>
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
              id="tubefit-video"
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
                    <th className="border-b border-[color:var(--border)] px-3 py-2 text-left">Current Case</th>
                  </tr>
                </thead>
                <tbody>
                  {parameters.map((p) => {
                    const isActive = p.key === selectedParamKey;
                    const dispCase = isActive && activeCase ? activeCase.label : p.cases[0]?.label ?? "—";
                    return (
                      <tr key={p.key} className={isActive ? "bg-accent/10" : ""}>
                        <td className="border-b border-[color:var(--border)] px-3 py-2 font-medium">{p.label}</td>
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
                .flatMap((p) => p.cases.map((c) => ({ file: p.key + "/" + c.id, label: `${p.label} — ${c.label}`, videoFile: c.videoFile })))
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
                  <video src={`/videos/${file}.mp4`} className="compare-video-tf w-full rounded border border-[color:var(--border)]" controls />
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
