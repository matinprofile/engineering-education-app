"use client";

import { useEffect, useRef } from "react";

// ── Coordinate transform ─────────────────────────────────────────────────────
const CX_SVG   = 390;
const CY_SVG   = 300;
const SCALE    = 1.40;      // reduced from 2.05 → smaller mesh
const FOCAL    = 1024;
const CAMERA_Z = 750;
const MAX_SEP  = 28;        // max separation amplitude (3-D units)

// Perpendicular-to-stroke direction in 3-D space.
// Stroke direction SVG ≈ (−0.5, −0.866); rotate 90° CW → (−0.866, +0.5) in SVG.
// After y-flip in svgTo3d: perpY sign flips → perp3d ≈ (0.866, +0.500).
const PERP_X = 0.866;
const PERP_Y = 0.500;

// ── Subdivision counts ────────────────────────────────────────────────────────
const STROKE_NU = 2;
const STROKE_NV = 10;
const ARC_N     = 14;
const BAR_NU    = 22;
const BAR_NV    = 2;

type P2 = [number, number];

// ── 6 parallelogram strokes ──────────────────────────────────────────────────
const STROKES: [P2, P2, P2, P2, number][] = [
  [[285.85,375.41],[246.94,308.01],[265.48,297.27],[304.39,364.67], 22],
  [[327.86,375.41],[282.11,296.17],[300.65,285.43],[346.40,364.67], 32],
  [[369.86,375.41],[317.72,285.11],[336.26,274.37],[388.40,364.67], 42],
  [[411.86,375.41],[353.63,274.56],[372.17,263.82],[430.40,364.67], 52],
  [[453.86,375.41],[382.12,251.16],[400.66,240.42],[472.40,364.67], 65],
  [[495.88,375.41],[404.38,216.94],[422.92,206.20],[514.42,364.67], 80],
];

// ── Cubic bezier helper ───────────────────────────────────────────────────────
function bez3(p0: P2, p1: P2, p2: P2, p3: P2, t: number): P2 {
  const u = 1 - t;
  return [
    u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0],
    u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1],
  ];
}

// ── Sample the sweep arc ──────────────────────────────────────────────────────
function sampleArcEdge(outer: boolean, N: number): P2[] {
  const pts: P2[] = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    if (outer) {
      if (t <= 0.5) {
        pts.push(bez3([510.89,125.20],[475.93,199.67],[420.11,253.28],[349.94,288.89], t / 0.5));
      } else {
        pts.push(bez3([349.94,288.89],[274.45,327.21],[182.54,344.53],[82.44,344.53], (t - 0.5) / 0.5));
      }
    } else {
      if (t <= 0.5) {
        pts.push(bez3([483.00,112.15],[451.17,179.91],[400.19,228.78],[336.04,261.34], t / 0.5));
      } else {
        pts.push(bez3([336.04,261.34],[265.14,297.33],[177.95,313.60],[82.44,313.60], (t - 0.5) / 0.5));
      }
    }
  }
  return pts;
}

// ── Geometry types ────────────────────────────────────────────────────────────
type Vert3    = { x: number; y: number; z: number };
type Tri      = { a: number; b: number; c: number };
type Edge     = { a: number; b: number; tension: number };
// strokeIdx 0-5 = fan stroke, -1 = arc, -2 = bar
type VertMeta = { strokeIdx: number; vParam: number; baseTension: number };

// ── Build geometry ────────────────────────────────────────────────────────────
function buildGeometry(): { verts: Vert3[]; tris: Tri[]; edges: Edge[]; meta: VertMeta[] } {
  const verts: Vert3[]   = [];
  const tris:  Tri[]     = [];
  const edges: Edge[]    = [];
  const meta:  VertMeta[] = [];
  const edgeSet = new Set<string>();

  function addEdge(a: number, b: number) {
    const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
    if (!edgeSet.has(key)) {
      edgeSet.add(key);
      edges.push({ a, b, tension: (meta[a].baseTension + meta[b].baseTension) * 0.5 });
    }
  }

  function svgTo3d(sx: number, sy: number, z: number): Vert3 {
    return { x: (sx - CX_SVG) * SCALE, y: -(sy - CY_SVG) * SCALE, z };
  }

  // ── 6 fan strokes ──────────────────────────────────────────────────────────
  for (let si = 0; si < STROKES.length; si++) {
    const [A, B, C, D, zTop] = STROKES[si];
    const base = verts.length;
    const W = STROKE_NU + 1;

    for (let iv = 0; iv <= STROKE_NV; iv++) {
      for (let iu = 0; iu <= STROKE_NU; iu++) {
        const u = iu / STROKE_NU;
        const v = iv / STROKE_NV;
        const sx = (1-v)*(1-u)*A[0] + (1-v)*u*D[0] + v*(1-u)*B[0] + v*u*C[0];
        const sy = (1-v)*(1-u)*A[1] + (1-v)*u*D[1] + v*(1-u)*B[1] + v*u*C[1];
        verts.push(svgTo3d(sx, sy, v * zTop));
        const distCenter = Math.abs(si - 2.5) / 2.5;
        meta.push({ strokeIdx: si, vParam: v, baseTension: v * 0.65 + distCenter * 0.35 });
      }
    }

    for (let iv = 0; iv < STROKE_NV; iv++) {
      for (let iu = 0; iu < STROKE_NU; iu++) {
        const a = base + iv * W + iu;
        const b = a + 1;
        const c = a + W;
        const d = c + 1;
        tris.push({ a, b, c: d }, { a, b: d, c });
        addEdge(a, b); addEdge(a, c); addEdge(b, d); addEdge(c, d); addEdge(a, d);
      }
    }
  }

  // ── Arc strip ──────────────────────────────────────────────────────────────
  const outerPts = sampleArcEdge(true, ARC_N);
  const innerPts = sampleArcEdge(false, ARC_N);
  const arcBase = verts.length;
  for (let i = 0; i < ARC_N; i++) {
    verts.push(svgTo3d(outerPts[i][0], outerPts[i][1], 4));
    meta.push({ strokeIdx: -1, vParam: 0, baseTension: 0.12 });
    verts.push(svgTo3d(innerPts[i][0], innerPts[i][1], 4));
    meta.push({ strokeIdx: -1, vParam: 0, baseTension: 0.12 });
  }
  for (let i = 0; i < ARC_N - 1; i++) {
    const o0 = arcBase + i * 2;
    const i0 = arcBase + i * 2 + 1;
    const o1 = arcBase + (i + 1) * 2;
    const i1 = arcBase + (i + 1) * 2 + 1;
    tris.push({ a: o0, b: o1, c: i1 }, { a: o0, b: i1, c: i0 });
    addEdge(o0, o1); addEdge(i0, i1); addEdge(o0, i0); addEdge(o1, i1); addEdge(o0, i1);
  }

  // ── Horizontal bar  M82.45,387.69 v−30.93 h447.11 ─────────────────────────
  const BAR_X0 = 82.45,  BAR_X1 = 529.56;
  const BAR_Y0 = 387.69, BAR_Y1 = 356.76;
  const barBase = verts.length;
  const BW = BAR_NU + 1;
  for (let iv = 0; iv <= BAR_NV; iv++) {
    for (let iu = 0; iu <= BAR_NU; iu++) {
      const u = iu / BAR_NU;
      const v = iv / BAR_NV;
      verts.push(svgTo3d(BAR_X0 + u * (BAR_X1 - BAR_X0), BAR_Y0 + v * (BAR_Y1 - BAR_Y0), 0));
      meta.push({ strokeIdx: -2, vParam: 0, baseTension: 0.04 });
    }
  }
  for (let iv = 0; iv < BAR_NV; iv++) {
    for (let iu = 0; iu < BAR_NU; iu++) {
      const a = barBase + iv * BW + iu;
      const b = a + 1;
      const c = a + BW;
      const d = c + 1;
      tris.push({ a, b, c: d }, { a, b: d, c });
      addEdge(a, b); addEdge(a, c); addEdge(b, d); addEdge(c, d); addEdge(a, d);
    }
  }

  return { verts, tris, edges, meta };
}

// ── Tension colormap: dark olive → amber → accent red ────────────────────────
function tensionRGB(t: number): [number, number, number] {
  const s = Math.max(0, Math.min(1, t));
  if (s < 0.5) {
    const f = s * 2;
    return [Math.round(48  + (185 - 48)  * f), Math.round(68  + (90  - 68)  * f), Math.round(44  + (28  - 44)  * f)];
  }
  const f = (s - 0.5) * 2;
  return [Math.round(185 + (245 - 185) * f), Math.round(90  + (45  - 90)  * f), Math.round(28  + (18  - 28)  * f)];
}

// ── Component ─────────────────────────────────────────────────────────────────
export function LogoMesh() {
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

    const { verts, tris, edges, meta } = buildGeometry();

    // Pre-split edges by tension band for batched drawing
    const loEdges = edges.filter(e => e.tension < 0.38);
    const midEdges = edges.filter(e => e.tension >= 0.38 && e.tension < 0.68);
    const hiEdges  = edges.filter(e => e.tension >= 0.68);

    let W = 0, H = 0, dpr = 1, raf = 0;

    function resize() {
      const rect = hostEl.getBoundingClientRect();
      W = rect.width; H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function draw(now: number) {
      const t = now * 0.001;
      ctx.clearRect(0, 0, W, H);

      const centerX = W * 0.62;
      const centerY = H * 0.50;

      // Separation oscillates 0 → MAX_SEP, period ≈ 11 s
      const sepAmp = MAX_SEP * (0.5 + 0.5 * Math.sin(t * 0.55));

      const rotY = t * 0.18;
      const rotX = -0.20 + Math.sin(t * 0.14) * 0.07;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      type Proj = { x: number; y: number; z: number; depth: number };
      const proj: Proj[] = verts.map((v, idx) => {
        const m = meta[idx];

        // Fan-stroke separation: pivot from base (scale by vParam)
        let ox = 0, oy = 0;
        if (m.strokeIdx >= 0) {
          const sep = (m.strokeIdx - 2.5) * sepAmp * m.vParam;
          ox = sep * PERP_X;
          oy = sep * PERP_Y;
        }

        const waveZ = v.z + 4 * Math.sin(v.x * 0.015 + t * 1.0) * Math.cos(v.y * 0.022 - t * 0.65);

        // rotateY
        const vx  =  (v.x + ox) * cosY + waveZ * sinY;
        const vz1 = -(v.x + ox) * sinY + waveZ * cosY;
        // rotateX
        const vy  = (v.y + oy) * cosX - vz1 * sinX;
        const vz  = (v.y + oy) * sinX + vz1 * cosX;

        const depth = FOCAL / (FOCAL + vz + CAMERA_Z);
        return { x: centerX + vx * depth, y: centerY + vy * depth, z: vz, depth };
      });

      // Painter's algorithm: sort triangles back→front
      const sorted = [...tris].sort((a, b) => {
        const za = (proj[a.a].z + proj[a.b].z + proj[a.c].z) / 3;
        const zb = (proj[b.a].z + proj[b.b].z + proj[b.c].z) / 3;
        return za - zb;
      });

      // Filled triangles — tension colormap
      for (const tri of sorted) {
        const pa = proj[tri.a], pb = proj[tri.b], pc = proj[tri.c];
        const avgT = (meta[tri.a].baseTension + meta[tri.b].baseTension + meta[tri.c].baseTension) / 3;
        const avgD = (pa.depth + pb.depth + pc.depth) / 3;
        const [r, g, b_] = tensionRGB(avgT);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.lineTo(pc.x, pc.y);
        ctx.closePath();
        ctx.fillStyle = `rgba(${r},${g},${b_},${(0.07 + avgD * 0.13).toFixed(3)})`;
        ctx.fill();
      }

      // Wireframe — three tension bands, batched
      function strokeEdges(list: Edge[], style: string, width: number) {
        ctx.beginPath();
        for (const e of list) {
          ctx.moveTo(proj[e.a].x, proj[e.a].y);
          ctx.lineTo(proj[e.b].x, proj[e.b].y);
        }
        ctx.strokeStyle = style;
        ctx.lineWidth   = width;
        ctx.stroke();
      }

      strokeEdges(loEdges,  "rgba(78,88,60,0.28)",   0.6);
      strokeEdges(midEdges, "rgba(185,78,24,0.36)",   0.7);
      strokeEdges(hiEdges,  "rgba(225,48,18,0.48)",   0.85);

      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(hostEl);
    resize();
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  );
}
