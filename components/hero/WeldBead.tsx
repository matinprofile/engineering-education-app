"use client";

import { useEffect, useRef } from "react";

// Molten pool dimensions (3-D top-down view)
const POOL_RX = 52;   // half-length (behind torch)
const POOL_RY = 24;   // half-width
const RING_COUNT = 8; // isotherm rings
const SPATTER_N = 30;

type Spatter = {
  ox: number; oy: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number;
};

function newSpatter(): Spatter {
  const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 1.6;
  const speed = 25 + Math.random() * 85;
  return {
    ox: (Math.random() - 0.5) * 8,
    oy: (Math.random() - 0.5) * 8,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: Math.random() * 0.9,  // stagger initial positions
    maxLife: 0.45 + Math.random() * 0.75,
    size: 1.0 + Math.random() * 2.2,
  };
}

export function WeldBead() {
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

    const spatters: Spatter[] = Array.from({ length: SPATTER_N }, newSpatter);

    let W = 0, H = 0, dpr = 1, raf = 0, lastT = 0;

    // Torch traverses left → right with a sinusoidal weave (oscillating weld bead)
    function torchPos(prog: number): [number, number] {
      const x = W * 0.13 + prog * W * 0.74;
      const y = H * 0.50 + Math.sin(prog * Math.PI * 12) * 27;
      return [x, y];
    }

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
      const dt = Math.min((now - lastT) * 0.001, 0.05);
      lastT = now;
      const t = now * 0.001;
      ctx.clearRect(0, 0, W, H);

      const progress = (t * 0.068) % 1;
      const [tx, ty] = torchPos(progress);
      const pulse = 0.5 + 0.5 * Math.sin(t * 4.4); // 0..1

      // ── 1. HAZ background glow ────────────────────────────────────────
      const hazCx = tx - POOL_RX * 0.5;
      const hazGrd = ctx.createRadialGradient(hazCx, ty, 28, hazCx, ty, 250);
      hazGrd.addColorStop(0,   "rgba(200,55,12,0.13)");
      hazGrd.addColorStop(0.45,"rgba(160,35,8,0.06)");
      hazGrd.addColorStop(1,   "rgba(120,20,5,0)");
      ctx.beginPath();
      ctx.ellipse(hazCx, ty, 290, 185, 0, 0, Math.PI * 2);
      ctx.fillStyle = hazGrd;
      ctx.fill();

      // ── 2. Isotherm rings (pulsing) ───────────────────────────────────
      const ringScale = 1 + pulse * 0.09;
      for (let i = RING_COUNT; i >= 1; i--) {
        const rx = (POOL_RX + i * 30) * ringScale;
        const ry = (POOL_RY + i * 15) * ringScale;
        const alpha = Math.max(0, 0.19 - (i - 1) * 0.020);
        ctx.beginPath();
        ctx.ellipse(tx - POOL_RX * 0.45, ty, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(178,46,10,${alpha.toFixed(3)})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // ── 3. Solidified weld bead (trail) ──────────────────────────────
      const STEPS = 110;
      if (progress > 0.008) {
        // Shadow layer
        ctx.beginPath();
        for (let i = 0; i <= STEPS; i++) {
          const p = (i / STEPS) * progress;
          const [px, py] = torchPos(p);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = "rgba(80,55,40,0.26)";
        ctx.lineWidth = 8;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        // Surface highlight cap
        ctx.beginPath();
        for (let i = 0; i <= STEPS; i++) {
          const p = (i / STEPS) * progress;
          const [px, py] = torchPos(p);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = "rgba(152,112,82,0.14)";
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      // ── 4. Molten pool ────────────────────────────────────────────────
      const poolGrd = ctx.createRadialGradient(
        tx, ty, 0,
        tx - POOL_RX * 0.38, ty, POOL_RX
      );
      poolGrd.addColorStop(0,    "rgba(255,255,215,0.96)");
      poolGrd.addColorStop(0.18, "rgba(255,185,60,0.92)");
      poolGrd.addColorStop(0.55, "rgba(224,68,14,0.84)");
      poolGrd.addColorStop(1,    "rgba(140,28,5,0)");
      ctx.beginPath();
      ctx.ellipse(tx - POOL_RX * 0.5, ty, POOL_RX, POOL_RY, 0, 0, Math.PI * 2);
      ctx.fillStyle = poolGrd;
      ctx.fill();

      // ── 5. Arc flash (torch tip) ──────────────────────────────────────
      const arcR = 17 + pulse * 7;
      const arcGrd = ctx.createRadialGradient(tx, ty, 0, tx, ty, arcR);
      arcGrd.addColorStop(0,    "rgba(255,255,225,0.98)");
      arcGrd.addColorStop(0.30, "rgba(255,195,55,0.82)");
      arcGrd.addColorStop(1,    "rgba(255,85,10,0)");
      ctx.beginPath();
      ctx.arc(tx, ty, arcR, 0, Math.PI * 2);
      ctx.fillStyle = arcGrd;
      ctx.fill();

      // White-hot core
      ctx.beginPath();
      ctx.arc(tx, ty, 3.5 + pulse * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,248,1)";
      ctx.fill();

      // ── 6. Spatter particles ──────────────────────────────────────────
      for (const s of spatters) {
        s.life += dt;
        if (s.life >= s.maxLife) {
          const fresh = newSpatter();
          s.ox = fresh.ox; s.oy = fresh.oy;
          s.vx = fresh.vx; s.vy = fresh.vy;
          s.maxLife = fresh.maxLife; s.size = fresh.size;
          s.life = 0;
        }
        const age = s.life / s.maxLife;
        const sx = tx + s.ox + s.vx * s.life;
        const sy = ty + s.oy + s.vy * s.life + 55 * s.life * s.life; // gravity
        const alpha = (1 - age) * 0.78;
        const sr = Math.max(s.size * (1 - age * 0.5), 0.4);
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        const g = Math.round(120 + age * 110);
        ctx.fillStyle = `rgba(255,${g},${Math.round(age * 30)},${alpha.toFixed(3)})`;
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
