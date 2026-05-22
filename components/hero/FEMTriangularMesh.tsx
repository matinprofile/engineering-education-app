"use client";

import { useEffect, useRef } from "react";

const COLS = 26;
const ROWS = 12;
const PLATE_W = 1480;
const PLATE_H = 560;
const JITTER = 20;
const CAMERA_Z = 620;
const FOCAL_LENGTH = 940;

type Vec3 = { x: number; y: number; z: number };

const JET: [number, number, number][] = [
  [0,   0,   180],
  [0,  140,  230],
  [0,  210,  130],
  [200, 220,   0],
  [230,  90,   0],
  [180,   0,   0],
];

function jetColor(t: number, alpha: number): string {
  const s = Math.max(0, Math.min(1, t)) * (JET.length - 1);
  const lo = Math.floor(s);
  const hi = Math.min(lo + 1, JET.length - 1);
  const f = s - lo;
  const r = Math.round(JET[lo][0] + (JET[hi][0] - JET[lo][0]) * f);
  const g = Math.round(JET[lo][1] + (JET[hi][1] - JET[lo][1]) * f);
  const b = Math.round(JET[lo][2] + (JET[hi][2] - JET[lo][2]) * f);
  return `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
}

export function FEMTriangularMesh() {
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

    // Fixed per-node jitter so the mesh shape is stable across redraws
    const jitter = new Float32Array(COLS * ROWS * 2);
    for (let i = 0; i < jitter.length; i++) {
      jitter[i] = (Math.random() - 0.5) * 2;
    }

    // Triangulate the grid: each quad → 2 triangles
    type Tri = [number, number, number];
    const triangles: Tri[] = [];
    for (let row = 0; row < ROWS - 1; row++) {
      for (let col = 0; col < COLS - 1; col++) {
        const a = row * COLS + col;
        const b = a + 1;
        const c = a + COLS;
        const d = c + 1;
        triangles.push([a, b, d]);
        triangles.push([a, d, c]);
      }
    }

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

      const centerX = W * 0.64;
      const centerY = H * 0.52;
      const rotX = -0.80;
      const rotY = -0.44;
      const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);
      const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);

      type Proj = { x: number; y: number; z: number; depth: number; stress: number };
      const proj: Proj[] = new Array(COLS * ROWS);

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const idx = row * COLS + col;
          const jx = jitter[idx * 2] * JITTER;
          const jy = jitter[idx * 2 + 1] * JITTER;

          const bx = (col / (COLS - 1) - 0.5) * PLATE_W + jx;
          const by = (row / (ROWS - 1) - 0.5) * PLATE_H + jy;

          // Normalised position for stress/deformation formulas
          const nx = bx / PLATE_W;
          const ny = by / PLATE_H;

          // Animated von-Mises-style stress field, stays in 0..1
          const raw =
            0.5 +
            0.28 * Math.sin(nx * Math.PI * 4 + t * 0.65) *
                   Math.cos(ny * Math.PI * 3 - t * 0.50) +
            0.18 * Math.sin(Math.sqrt(nx * nx + ny * ny) * Math.PI * 5 - t * 1.10) +
            0.06 * Math.cos(nx * 9 - ny * 6 + t * 0.35);
          const stress = Math.max(0, Math.min(1, raw));

          // Small out-of-plane deformation (looks like bending)
          const zAmp = 22;
          const vz =
            Math.sin(nx * Math.PI * 2.5 + t * 0.85) * zAmp +
            Math.cos(ny * Math.PI * 2.0 - t * 0.65) * zAmp * 0.55;

          // rotateX
          let vx: number = bx;
          let vy: number = by * cosRX - vz  * sinRX;
          let vvz: number = by * sinRX + vz  * cosRX;

          // rotateY
          const vx2 = vx * cosRY + vvz * sinRY;
          const vz2 = -vx * sinRY + vvz * cosRY;

          const depth = FOCAL_LENGTH / (FOCAL_LENGTH + vz2 + CAMERA_Z);
          proj[idx] = {
            x: centerX + vx2 * depth,
            y: centerY + vy  * depth,
            z: vz2,
            depth,
            stress,
          };
        }
      }

      // Filled triangles
      for (const [ai, bi, ci] of triangles) {
        const pa = proj[ai], pb = proj[bi], pc = proj[ci];
        const avgStress = (pa.stress + pb.stress + pc.stress) / 3;
        const avgDepth  = (pa.depth  + pb.depth  + pc.depth)  / 3;
        const alpha = 0.18 + avgDepth * 0.24;

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.lineTo(pc.x, pc.y);
        ctx.closePath();
        ctx.fillStyle = jetColor(avgStress, alpha);
        ctx.fill();
      }

      // Wireframe — all edges in a single batched path for performance
      ctx.beginPath();
      ctx.strokeStyle = "rgba(20,28,18,0.085)";
      ctx.lineWidth = 0.55;
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const idx = row * COLS + col;
          const p = proj[idx];
          if (col < COLS - 1) {
            const q = proj[idx + 1];
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
          }
          if (row < ROWS - 1) {
            const q = proj[idx + COLS];
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
          }
          if (col < COLS - 1 && row < ROWS - 1) {
            const q = proj[idx + COLS + 1];
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
          }
        }
      }
      ctx.stroke();

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
