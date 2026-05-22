"use client";

import { useEffect, useRef } from "react";

// BCC lattice: 3×3×3 unit cells
const CELLS = 3;
const CELL = 160;      // 3-D px between adjacent corner atoms
const FOCAL = 1024;
const CAMERA_Z = 780;

type RawAtom = { ox: number; oy: number; oz: number; isCenter: boolean };
type Bond = { a: number; b: number; isDiag: boolean };

function buildBCC(): { atoms: RawAtom[]; bonds: Bond[] } {
  const atoms: RawAtom[] = [];
  const lookup = new Map<string, number>();
  const bonds: Bond[] = [];
  const off = (CELLS / 2) * CELL;

  // Multiply coords by 10 before rounding to safely key half-integer centres
  function key(x: number, y: number, z: number) {
    return `${Math.round(x * 10)},${Math.round(y * 10)},${Math.round(z * 10)}`;
  }

  function add(x: number, y: number, z: number, isCenter: boolean): number {
    const k = key(x, y, z);
    let i = lookup.get(k);
    if (i !== undefined) return i;
    i = atoms.length;
    atoms.push({ ox: x - off, oy: y - off, oz: z - off, isCenter });
    lookup.set(k, i);
    return i;
  }

  for (let cx = 0; cx < CELLS; cx++) {
    for (let cy = 0; cy < CELLS; cy++) {
      for (let cz = 0; cz < CELLS; cz++) {
        const x0 = cx * CELL, y0 = cy * CELL, z0 = cz * CELL;
        const x1 = x0 + CELL, y1 = y0 + CELL, z1 = z0 + CELL;
        const corners = [
          add(x0, y0, z0, false), add(x1, y0, z0, false),
          add(x0, y1, z0, false), add(x1, y1, z0, false),
          add(x0, y0, z1, false), add(x1, y0, z1, false),
          add(x0, y1, z1, false), add(x1, y1, z1, false),
        ];
        // Body-centre atom
        const bc = add(x0 + CELL * 0.5, y0 + CELL * 0.5, z0 + CELL * 0.5, true);
        for (const c of corners) bonds.push({ a: bc, b: c, isDiag: true });
      }
    }
  }

  // Cube-edge bonds along +x, +y, +z only (avoids duplicates)
  for (let ix = 0; ix <= CELLS; ix++) {
    for (let iy = 0; iy <= CELLS; iy++) {
      for (let iz = 0; iz <= CELLS; iz++) {
        const x = ix * CELL, y = iy * CELL, z = iz * CELL;
        const ai = lookup.get(key(x, y, z));
        if (ai === undefined) continue;
        const neighbours: [number, number, number][] = [
          [x + CELL, y, z],
          [x, y + CELL, z],
          [x, y, z + CELL],
        ];
        for (const [nx, ny, nz] of neighbours) {
          const bi = lookup.get(key(nx, ny, nz));
          if (bi !== undefined) bonds.push({ a: ai, b: bi, isDiag: false });
        }
      }
    }
  }

  return { atoms, bonds };
}

export function CrystalLattice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasNode = canvasRef.current;
    if (!canvasNode) return;
    const host = canvasNode.parentElement;
    if (!host) return;
    const context = canvasNode.getContext("2d");
    if (!context) return;
    const canvas = canvasNode;
    const ctx = context;
    const hostEl = host;

    const { atoms, bonds } = buildBCC();

    let W = 0, H = 0, dpr = 1, raf = 0;

    function resize() {
      const rect = hostEl.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function draw(now: number) {
      const t = now * 0.001;
      ctx.clearRect(0, 0, W, H);

      const centerX = W * 0.65;
      const centerY = H * 0.50;

      // Slow Y rotation + gentle X wobble
      const rotY = t * 0.22;
      const rotX = -0.30 + Math.sin(t * 0.17) * 0.09;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      type Proj = { x: number; y: number; z: number; depth: number; isCenter: boolean };

      const proj: Proj[] = atoms.map(a => {
        // rotateY
        const vx  =  a.ox * cosY + a.oz * sinY;
        const vz1 = -a.ox * sinY + a.oz * cosY;
        // rotateX
        const vy  = a.oy * cosX - vz1 * sinX;
        const vz  = a.oy * sinX + vz1 * cosX;
        const depth = FOCAL / (FOCAL + vz + CAMERA_Z);
        return { x: centerX + vx * depth, y: centerY + vy * depth, z: vz, depth, isCenter: a.isCenter };
      });

      // Bonds — drawn before atoms so atoms sit on top
      for (const bond of bonds) {
        const pa = proj[bond.a], pb = proj[bond.b];
        const d = (pa.depth + pb.depth) * 0.5;
        if (bond.isDiag) {
          ctx.strokeStyle = `rgba(140,45,25,${(0.16 + d * 0.50).toFixed(3)})`;
          ctx.lineWidth = 0.7 + d * 1.8;
        } else {
          ctx.strokeStyle = `rgba(78,88,60,${(0.09 + d * 0.30).toFixed(3)})`;
          ctx.lineWidth = 0.5 + d * 1.0;
        }
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      // Atoms — painter's algorithm (back to front)
      const sorted = [...proj].sort((a, b) => a.z - b.z);
      for (const p of sorted) {
        const r = Math.max((p.isCenter ? 13 : 8.5) * p.depth, 1.5);
        const gx = p.x - r * 0.30;
        const gy = p.y - r * 0.30;
        const g = ctx.createRadialGradient(gx, gy, r * 0.04, p.x, p.y, r);
        const hi = Math.min(0.55 + p.depth * 0.40, 1.0).toFixed(3);
        const lo = (0.28 + p.depth * 0.20).toFixed(3);

        if (p.isCenter) {
          g.addColorStop(0,    `rgba(235,115,85,${hi})`);
          g.addColorStop(0.55, `rgba(140,45,25,${hi})`);
          g.addColorStop(1,    `rgba(65,14,6,${lo})`);
        } else {
          g.addColorStop(0,    `rgba(188,202,158,${hi})`);
          g.addColorStop(0.55, `rgba(107,119,80,${hi})`);
          g.addColorStop(1,    `rgba(50,58,34,${lo})`);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(hostEl);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
