"use client";

import { useEffect, useState } from "react";
import { CrystalLattice } from "@/components/hero/CrystalLattice";
import { FEMTriangularMesh } from "@/components/hero/FEMTriangularMesh";
import { PolygonSphere } from "@/components/hero/PolygonSphere";
import { StressNetwork } from "@/components/hero/StressNetwork";
import { WavePlateMesh } from "@/components/hero/WavePlateMesh";
import { WeldBead } from "@/components/hero/WeldBead";
import { LogoMesh } from "@/components/hero/LogoMesh";
import { Logo3D } from "@/components/hero/Logo3D";

const OPTIONS = [
  {
    id: "wave",
    label: "Wave Mesh",
    description: "Perspective-projected waving structural plate in olive tones",
    Component: WavePlateMesh,
  },
  {
    id: "network",
    label: "Stress Network",
    description: "Particle nodes that connect and react to mouse movement",
    Component: StressNetwork,
  },
  {
    id: "sphere",
    label: "Polygon Sphere",
    description: "Rotating wireframe globe with ambient spark particles",
    Component: PolygonSphere,
  },
  {
    id: "fem",
    label: "FEM Mesh",
    description: "Triangulated plate with animated von-Mises stress colour field",
    Component: FEMTriangularMesh,
  },
  {
    id: "crystal",
    label: "Crystal Lattice",
    description: "BCC atomic lattice slowly rotating in 3-D perspective",
    Component: CrystalLattice,
  },
  {
    id: "weld",
    label: "Weld Bead",
    description: "Weaving weld torch with molten pool, heat isotherms and spatter",
    Component: WeldBead,
  },
  {
    id: "logo",
    label: "Logo Mesh",
    description: "3-D logo mesh — fan strokes separate with tension contour from olive to accent red",
    Component: LogoMesh,
  },
  {
    id: "logo3d",
    label: "Logo 3D",
    description: "Actual 3-D GLTF model of the Lucas Group logo with edge wireframe and slow rotation",
    Component: Logo3D,
  },
];

export default function HeroDemoPage() {
  const [active, setActive] = useState(0);

  // Arrow-key navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % OPTIONS.length);
      if (e.key === "ArrowLeft")  setActive((a) => (a - 1 + OPTIONS.length) % OPTIONS.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const { Component, label, description } = OPTIONS[active];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">

      {/* ── Background area ─────────────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">

        {/* Canvas — remounts on key change, triggering fade-in */}
        <div
          key={active}
          className="absolute inset-0"
          style={{ animation: "heroBgFadeIn 400ms ease forwards" }}
        >
          <Component />
        </div>

        {/* Vignette overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_22%,rgba(140,45,25,0.10),transparent_44%),radial-gradient(ellipse_at_86%_16%,rgba(255,255,255,0.72),transparent_52%)]" />
        {/* Grid texture */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(48,54,44,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(48,54,44,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Current option info — bottom-left */}
        <div className="absolute bottom-8 left-8 z-10">
          <p className="text-xs font-medium uppercase tracking-widest text-muted/50">
            Option {active + 1} of {OPTIONS.length}
          </p>
          <h2 className="mt-1 font-heading text-3xl font-bold text-text">
            {label}
          </h2>
          <p className="mt-1 max-w-xs text-sm text-muted">{description}</p>
        </div>

        {/* Arrow buttons — bottom-right */}
        <div className="absolute bottom-8 right-8 z-10 flex gap-2">
          <button
            onClick={() => setActive((a) => (a - 1 + OPTIONS.length) % OPTIONS.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-white/80 text-muted transition hover:border-accent/40 hover:text-text"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={() => setActive((a) => (a + 1) % OPTIONS.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-white/80 text-muted transition hover:border-accent/40 hover:text-text"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      {/* ── Switcher strip ───────────────────────────────────────────── */}
      <div className="border-t border-[color:var(--border)] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl gap-2 px-6 py-4">
          {OPTIONS.map((opt, i) => (
            <button
              key={opt.id}
              onClick={() => setActive(i)}
              className={`flex flex-1 flex-col items-center gap-1 rounded-xl border px-3 py-3 text-center transition-all duration-200 ${
                i === active
                  ? "border-accent bg-accent text-white"
                  : "border-[color:var(--border)] text-muted hover:border-accent/40 hover:bg-accent/5 hover:text-text"
              }`}
            >
              <span className="text-xs font-medium uppercase tracking-wider opacity-60">
                {i + 1}
              </span>
              <span className="text-sm font-semibold leading-tight">{opt.label}</span>
            </button>
          ))}
        </div>
        <p className="pb-3 text-center text-xs text-muted/35">
          Click a card or use ← → arrow keys
        </p>
      </div>
    </div>
  );
}
