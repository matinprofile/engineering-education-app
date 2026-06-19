"use client";

import { useEffect, useRef, useState } from "react";
import { Scan, Activity, List, MousePointer2 } from "lucide-react";

type Defect = {
  id: string;
  centerX: number;
  reflectionTime: number;
  maxAmplitude: number;
  spread: number;
  peakWidth: number;
  color: string;
  label: string;
  desc: string;
};

const DEFECTS: Defect[] = [
  {
    id: "lof",
    centerX: 30,
    reflectionTime: 0.3,
    maxAmplitude: 0.7,
    spread: 12,
    peakWidth: 0.06,
    color: "#f87171",
    label: "POS: 30% (Lack of Fusion)",
    desc: "Medium-high amplitude. Moderately wide echo base.",
  },
  {
    id: "crack",
    centerX: 65,
    reflectionTime: 0.5,
    maxAmplitude: 0.95,
    spread: 8,
    peakWidth: 0.03,
    color: "#fca5a5",
    label: "POS: 50% (Crack)",
    desc: "Critical amplitude (Very High). Very sharp and fine echo.",
  },
  {
    id: "porosity",
    centerX: 85,
    reflectionTime: 0.8,
    maxAmplitude: 0.4,
    spread: 20,
    peakWidth: 0.1,
    color: "#fde047",
    label: "POS: 80% (Porosity)",
    desc: "Low amplitude. Thick and irregular echo (volumetric noise).",
  },
];

const BACKWALL_TIME = 0.95;

export function UltrasoundAScan() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const amplitudesRef = useRef<Record<string, number>>(
    Object.fromEntries(DEFECTS.map((d) => [d.id, 0]))
  );
  const maxAmpRef = useRef(0);
  const rafRef = useRef(0);
  const [probeVisible, setProbeVisible] = useState(false);
  const [probeX, setProbeX] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function drawAScan() {
      const w = canvas!.width;
      const h = canvas!.height;
      const midH = h / 2;

      ctx!.fillStyle = "#020617";
      ctx!.fillRect(0, 0, w, h);

      // Grid
      ctx!.strokeStyle = "#1e293b";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(0, midH);
      ctx!.lineTo(w, midH);
      [0.25, 0.5, 0.75].forEach((t) => {
        ctx!.moveTo(w * t, 0);
        ctx!.lineTo(w * t, h);
      });
      ctx!.stroke();

      const INITIAL_PULSE_AMP = 0.9;
      const INITIAL_PULSE_TIME = 0.05;

      ctx!.strokeStyle = "#34d399";
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      ctx!.moveTo(0, midH);

      const NUM_POINTS = 250;
      const backwallIndex = Math.floor(BACKWALL_TIME * NUM_POINTS);
      let peakAmp = 0;
      let peakX = 0;
      let peakY = 0;
      let peakColor = "#34d399";

      for (let i = 1; i <= NUM_POINTS; i++) {
        const t = i / NUM_POINTS;
        let amplitude = 0;

        if (t <= INITIAL_PULSE_TIME) {
          amplitude = INITIAL_PULSE_AMP * Math.sin((t / INITIAL_PULSE_TIME) * Math.PI);
        }

        DEFECTS.forEach((defect) => {
          const defectIndex = Math.floor(defect.reflectionTime * NUM_POINTS);
          const halfWindow = defect.peakWidth * NUM_POINTS;
          if (i >= defectIndex - halfWindow && i <= defectIndex + halfWindow) {
            const sigma = halfWindow / 3;
            const val = i - defectIndex;
            const shape = Math.exp(-(val * val) / (2 * sigma * sigma));
            const dynAmp = amplitudesRef.current[defect.id];
            const thisAmp = dynAmp * shape;
            amplitude += thisAmp;
            if (thisAmp > 0.1 && thisAmp > peakAmp) {
              peakAmp = thisAmp;
              peakColor = defect.color;
              peakX = t * w;
              peakY = midH - amplitude * midH;
            }
          }
        });

        if (i >= backwallIndex - 10 && i <= backwallIndex + 10) {
          const sigma = 5;
          const val = i - backwallIndex;
          const shape = Math.exp(-(val * val) / (2 * sigma * sigma));
          amplitude += 0.8 * shape * (1 - maxAmpRef.current * 0.7);
        }

        amplitude += Math.random() * 0.02;
        amplitude = Math.min(1.2, Math.max(-0.2, amplitude));

        ctx!.lineTo(t * w, midH - amplitude * midH);
      }
      ctx!.stroke();

      if (peakAmp > 0.05) {
        ctx!.fillStyle = peakColor;
        ctx!.beginPath();
        ctx!.arc(peakX, peakY, 4, 0, Math.PI * 2);
        ctx!.fill();
      }

      rafRef.current = requestAnimationFrame(drawAScan);
    }

    rafRef.current = requestAnimationFrame(drawAScan);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function handleMove(clientX: number) {
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const x = clientX - rect.left;
    if (x < 0 || x > rect.width) return;

    setProbeX(x);
    const xPct = (x / rect.width) * 100;
    let maxAmplitude = 0;

    DEFECTS.forEach((defect) => {
      const distance = Math.abs(xPct - defect.centerX);
      const maxDist = defect.spread / 2;
      const proximity = distance < maxDist ? 1 - distance / maxDist : 0;
      const noise = Math.random() * 0.05;
      const amp = Math.min(1, Math.max(0, defect.maxAmplitude * proximity + (proximity > 0 ? noise : 0)));
      amplitudesRef.current[defect.id] = amp;
      if (amp > maxAmplitude) maxAmplitude = amp;
    });

    maxAmpRef.current = maxAmplitude;
  }

  function handleEnter() {
    setProbeVisible(true);
    setShowHint(false);
  }

  function handleLeave() {
    setProbeVisible(false);
    setShowHint(true);
    DEFECTS.forEach((d) => (amplitudesRef.current[d.id] = 0));
    maxAmpRef.current = 0;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="w-full border-b border-slate-800 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-emerald-400 md:text-3xl">
            <Scan className="h-8 w-8 shrink-0" />
            Ultrasound Analysis Simulator (A-Scan)
          </h2>
          <p className="mt-1 text-slate-400">Multi-defect interactive demonstration</p>
          <p className="mt-0.5 text-sm text-slate-500">
            Move the probe over the welded joint to visualize the response.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl overflow-hidden rounded-b-xl border border-t-0 border-slate-700 shadow-2xl md:mt-4 md:rounded-xl md:border-t">
        <div className="flex flex-col lg:flex-row">
          {/* Viewport — specimen */}
          <div
            ref={viewportRef}
            className="relative h-80 w-full cursor-none select-none overflow-hidden bg-black lg:h-auto lg:w-1/2"
            onMouseMove={(e) => handleMove(e.clientX)}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          >
            {/* Metal specimen */}
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-300">
              <div className="relative h-32 w-full border-y-4 border-neutral-400/50">
                <div className="absolute h-24 w-full bg-neutral-500/80 shadow-inner shadow-neutral-700" />
                {/* Defect markers */}
                {DEFECTS.map((d) => (
                  <div
                    key={d.id}
                    className="pointer-events-none absolute top-1/2 -translate-y-1/2"
                    style={{ left: `${d.centerX}%` }}
                  >
                    <div
                      className="h-1 w-16 -translate-x-1/2"
                      style={{
                        backgroundColor: d.color,
                        boxShadow: `0 0 8px 1px ${d.color}`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Probe indicator */}
            {probeVisible && (
              <div
                className="pointer-events-none absolute z-30 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border-2 border-emerald-400 bg-emerald-500/50"
                style={{ left: probeX, top: "50%" }}
              >
                <Activity className="h-8 w-8 text-white" />
              </div>
            )}

            {/* Hover prompt */}
            {showHint && (
              <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-black/70 px-6 py-3 text-sm text-white backdrop-blur-sm">
                <MousePointer2 className="h-4 w-4 animate-bounce" />
                <span className="font-medium">Move the cursor over the joint to inspect</span>
              </div>
            )}
          </div>

          {/* A-scan panel */}
          <div className="flex w-full flex-col border-l border-slate-700 bg-slate-900 p-6 lg:w-1/2">
            <div className="mb-4 border-b border-slate-800 pb-2">
              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
                <Activity className="h-4 w-4" /> Ultrasonic Sensor
              </h3>
            </div>

            <div className="flex-grow grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Canvas */}
              <div className="flex flex-col">
                <div className="relative min-h-[220px] flex-grow rounded-lg border border-slate-700 bg-slate-950 p-1 shadow-inner">
                  <canvas
                    ref={canvasRef}
                    width={300}
                    height={280}
                    className="h-full w-full rounded"
                  />
                  <div className="pointer-events-none absolute bottom-1 left-2 right-2 flex justify-between font-mono text-[10px] text-slate-500">
                    <span>0</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                </div>
                <div className="mt-2 flex justify-between px-1 font-mono text-xs text-slate-400">
                  <span>Surface</span>
                  <span>Back Wall (BW)</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-col justify-center">
                <div className="h-full rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-emerald-400">
                    <List className="h-4 w-4" />
                    Signal Legend
                  </h4>
                  <div className="space-y-4">
                    {DEFECTS.map((d) => (
                      <div
                        key={d.id}
                        className="border-l-2 pl-3"
                        style={{ borderColor: d.color }}
                      >
                        <p className="mb-1 text-xs font-bold" style={{ color: d.color }}>
                          {d.label}
                        </p>
                        <p className="text-xs leading-relaxed text-slate-300">{d.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-slate-700 pt-4">
                    <p className="text-[10px] italic text-slate-500">
                      * Defect signals cause back-wall echo loss (Attenuation).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
