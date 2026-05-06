"use client";

import { useEffect, useMemo, useState } from "react";

type Parameter = {
  label: string;
  key: string;
  min: number;
  max: number;
  optimum: number;
  unit: string;
};

const hotspots = [
  { id: "Rp", x: 330, y: 210 },
  { id: "rc", x: 150, y: 270 },
  { id: "C", x: 165, y: 100 },
  { id: "Pi", x: 390, y: 130 },
  { id: "Dd", x: 240, y: 260 },
];

const parameters: Parameter[] = [
  { label: "Cavity Radius", key: "rc", min: 0.8, max: 1, optimum: 1, unit: "mm" },
  { label: "Die Depth", key: "Dd", min: 1.8, max: 2.4, optimum: 2, unit: "mm" },
  { label: "Die Radius", key: "Rd", min: 0, max: 0, optimum: 7, unit: "mm" },
  { label: "Clearance", key: "C", min: 1.8, max: 2.2, optimum: 2, unit: "mm" },
  { label: "Punch Radius", key: "Rp", min: 0, max: 0, optimum: 5, unit: "mm" },
  { label: "Punch Fillet Radius", key: "rp", min: 0.5, max: 1, optimum: 1, unit: "mm" },
  { label: "Punch Inclination", key: "Pi", min: 0, max: 5, optimum: 1.5, unit: "deg" },
];

const descriptions: Record<string, string> = {
  Dd: "Die Depth: The depth of the die cavity, influencing material flow.",
  C: "Clearance: Gap between punch and die affecting clinch formation.",
  Pi: "Punch Inclination: Angle of punch relative to vertical axis.",
  Rp: "Punch Fillet Radius: Radius at punch corner controlling flow.",
  rc: "Cavity Radius: Radius of cavity.",
};

export function ClinchingSimulator() {
  const [selectedParam, setSelectedParam] = useState<string>();
  const [selectedVideo, setSelectedVideo] = useState<"min" | "max">("min");
  const [compareList, setCompareList] = useState<string[]>([]);

  const activeParam = useMemo(
    () => parameters.find((parameter) => parameter.key === selectedParam),
    [selectedParam],
  );

  const videoKey = `${selectedParam ?? "none"}-${selectedVideo}`;
  const videoUrl = selectedParam ? `/videos/${selectedParam.toLowerCase()}_${selectedVideo}.mp4` : undefined;
  const activeDescription = selectedParam ? descriptions[selectedParam] : "";

  useEffect(() => {
    const video = document.getElementById("clinching-video") as HTMLVideoElement | null;
    if (video) {
      video.load();
      void video.play().catch(() => {});
    }
  }, [selectedVideo, selectedParam]);

  function addToCompare() {
    if (!selectedParam) {
      return;
    }

    const key = `${selectedParam}_${selectedVideo}`;
    if (!compareList.includes(key)) {
      setCompareList((previous) => [...previous, key]);
    }
  }

  function removeFromCompare(key: string) {
    setCompareList((previous) => previous.filter((entry) => entry !== key));
  }

  function playAll() {
    const videos = document.querySelectorAll(".compare-video") as NodeListOf<HTMLVideoElement>;
    videos.forEach((video) => {
      void video.play().catch(() => {});
    });
  }

  function pauseAll() {
    const videos = document.querySelectorAll(".compare-video") as NodeListOf<HTMLVideoElement>;
    videos.forEach((video) => video.pause());
  }

  return (
    <div className="space-y-10">
      <section className="grid gap-8 xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
        <div className="relative">
          <img src="/clinching.png" alt="Clinching geometry with interactive parameter hotspots" className="w-full rounded-2xl border border-[color:var(--border)] bg-white shadow-[0_16px_40px_rgba(48,54,44,0.08)]" />

          {hotspots.map((spot) => (
            <button
              key={spot.id}
              type="button"
              className="absolute h-8 w-8 rounded-full border border-white bg-accent/90 text-[11px] font-bold text-white shadow"
              style={{ left: spot.x, top: spot.y }}
              onClick={() => setSelectedParam(spot.id)}
            >
              {spot.id}
            </button>
          ))}

          {activeDescription ? (
            <div className="mt-6 rounded-xl border border-[color:var(--border)] bg-white p-5">
              <h3 className="font-heading text-lg font-semibold text-text">Parameter Definition ({activeParam?.key})</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{activeDescription}</p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  className={`rounded-lg border px-4 py-2 text-sm font-medium ${selectedVideo === "min" ? "border-accent bg-accent text-white" : "border-[color:var(--border)] bg-white text-text"}`}
                  onClick={() => setSelectedVideo("min")}
                >
                  Min ({activeParam?.min} {activeParam?.unit})
                </button>
                <button
                  type="button"
                  className={`rounded-lg border px-4 py-2 text-sm font-medium ${selectedVideo === "max" ? "border-accent bg-accent text-white" : "border-[color:var(--border)] bg-white text-text"}`}
                  onClick={() => setSelectedVideo("max")}
                >
                  Max ({activeParam?.max} {activeParam?.unit})
                </button>
              </div>

              <button
                type="button"
                onClick={addToCompare}
                className="mt-4 rounded-lg border border-accent bg-accent px-4 py-2 text-sm font-semibold text-white"
              >
                Add to Compare
              </button>
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-[color:var(--border)] bg-white p-5 shadow-[0_16px_40px_rgba(48,54,44,0.08)]">
          <h2 className="font-heading text-2xl font-semibold text-text">Simulation Video</h2>

          {videoUrl ? (
            <video id="clinching-video" key={videoKey} controls autoPlay className="mt-4 w-full rounded-xl border border-[color:var(--border)]">
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="mt-4 flex h-[280px] items-center justify-center rounded-xl border border-[color:var(--border)] bg-primary/35 px-6 text-center text-sm text-muted">
              Select a hotspot parameter on the clinching diagram to preview a simulation.
            </div>
          )}

          <div className="mt-6">
            <h3 className="font-heading text-lg font-semibold text-text">Parameter Table</h3>
            <div className="mt-3 overflow-hidden rounded-xl border border-[color:var(--border)]">
              <table className="w-full text-sm">
                <thead className="bg-primary/45">
                  <tr>
                    <th className="border-b border-[color:var(--border)] px-3 py-2 text-left">Parameter</th>
                    <th className="border-b border-[color:var(--border)] px-3 py-2 text-left">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {parameters.map((parameter) => (
                    <tr key={parameter.key} className={parameter.key === selectedParam ? "bg-accent/10" : ""}>
                      <td className="border-b border-[color:var(--border)] px-3 py-2">{parameter.label}</td>
                      <td className="border-b border-[color:var(--border)] px-3 py-2">
                        {parameter.key === selectedParam ? parameter[selectedVideo] : parameter.optimum} {parameter.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[color:var(--border)] bg-white p-5 shadow-[0_16px_40px_rgba(48,54,44,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-semibold text-text">Comparison Panel</h2>
          <div className="flex gap-2">
            <button type="button" onClick={playAll} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Play All</button>
            <button type="button" onClick={pauseAll} className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white">Pause All</button>
          </div>
        </div>

        {compareList.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No videos added to compare yet.</p>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {compareList.map((key) => (
              <article key={key} className="relative rounded-xl border border-[color:var(--border)] bg-primary/20 p-3">
                <button
                  type="button"
                  className="absolute right-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white"
                  onClick={() => removeFromCompare(key)}
                >
                  Remove
                </button>
                <video src={`/videos/${key.toLowerCase()}.mp4`} className="compare-video w-full rounded border border-[color:var(--border)]" controls />
                <p className="mt-2 font-mono text-xs text-muted">{key}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}