"use client";

import { useEffect, useRef } from "react";

// Joint geometry constants (absolute 3-D px, scaled at draw time)
const JOINT_CX = 0.66;   // joint centre at 66 % of canvas width
const JOINT_CY = 0.50;

type ElType = "line" | "circle" | "cross" | "arc";

type SchematicEl = {
  type: ElType;
  x: number; y: number;
  size: number;
  vx: number;
  angle: number;
  life: number; maxLife: number;
};

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
};

const EL_TYPES: ElType[] = ["line", "circle", "cross", "arc"];

function randomEl(W: number, H: number): SchematicEl {
  return {
    type: EL_TYPES[Math.floor(Math.random() * EL_TYPES.length)],
    x: Math.random() * W * 0.42,
    y: H * 0.12 + Math.random() * H * 0.76,
    size: 14 + Math.random() * 38,
    vx: 16 + Math.random() * 22,
    angle: Math.random() * Math.PI * 2,
    life: 0,
    maxLife: 3.5 + Math.random() * 3,
  };
}

function randomParticle(W: number, H: number): Particle {
  return {
    x: Math.random() * W * 0.38,
    y: H * 0.18 + Math.random() * H * 0.64,
    vx: 55 + Math.random() * 70,
    vy: (Math.random() - 0.5) * 18,
    life: 0,
    maxLife: 1.8 + Math.random() * 1.8,
  };
}

export function ConceptToJoint() {
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

    let W = 0, H = 0, dpr = 1, raf = 0, lastT = 0;
    let elements: SchematicEl[] = [];
    let particles: Particle[] = [];

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

      elements = Array.from({ length: 28 }, () => {
        const el = randomEl(W, H);
        el.life = Math.random() * el.maxLife;
        return el;
      });
      particles = Array.from({ length: 42 }, () => {
        const p = randomParticle(W, H);
        p.life = Math.random() * p.maxLife;
        return p;
      });
    }

    // ── Schematic element helpers ────────────────────────────────────────
    function elAlpha(el: SchematicEl): number {
      const age = el.life / el.maxLife;
      if (age < 0.18) return (age / 0.18) * 0.26;
      if (age > 0.82) return ((1 - age) / 0.18) * 0.26;
      return 0.26;
    }

    function drawEl(el: SchematicEl) {
      const a = elAlpha(el);
      if (a <= 0) return;
      ctx.strokeStyle = `rgba(78,88,60,${a.toFixed(3)})`;
      ctx.lineWidth = 0.9;
      const prog = Math.min(el.life / (el.maxLife * 0.45), 1);

      switch (el.type) {
        case "line": {
          ctx.setLineDash([5, 4]);
          ctx.beginPath();
          ctx.moveTo(el.x, el.y);
          ctx.lineTo(
            el.x + Math.cos(el.angle) * el.size * prog,
            el.y + Math.sin(el.angle) * el.size * prog * 0.5,
          );
          ctx.stroke();
          ctx.setLineDash([]);
          break;
        }
        case "circle": {
          const r = el.size * 0.45;
          ctx.beginPath();
          ctx.arc(el.x, el.y, r, 0, Math.PI * 2 * prog);
          ctx.stroke();
          // Centre mark
          ctx.beginPath();
          ctx.moveTo(el.x - 5, el.y); ctx.lineTo(el.x + 5, el.y);
          ctx.moveTo(el.x, el.y - 5); ctx.lineTo(el.x, el.y + 5);
          ctx.stroke();
          break;
        }
        case "cross": {
          const s = el.size * 0.32 * prog;
          ctx.beginPath();
          ctx.moveTo(el.x - s, el.y); ctx.lineTo(el.x + s, el.y);
          ctx.moveTo(el.x, el.y - s); ctx.lineTo(el.x, el.y + s);
          ctx.stroke();
          break;
        }
        case "arc": {
          ctx.setLineDash([4, 3]);
          ctx.beginPath();
          ctx.arc(el.x, el.y, el.size * 0.55, el.angle, el.angle + Math.PI * 1.4 * prog);
          ctx.stroke();
          ctx.setLineDash([]);
          break;
        }
      }
    }

    // ── Lap joint drawing ────────────────────────────────────────────────
    function drawJoint(t: number) {
      const jx = W * JOINT_CX;
      const jy = H * JOINT_CY;

      const pW = Math.min(240, W * 0.20);  // plate half-length
      const pH = Math.max(32, H * 0.075);  // plate thickness
      const ov = Math.min(110, W * 0.09);  // overlap length
      const gap = Math.max(10, H * 0.024); // adhesive thickness

      const pulse = 0.5 + 0.5 * Math.sin(t * 1.8);

      // ─ Plate 1 (top) extends LEFT from overlap zone
      const p1 = { x: jx - pW - ov * 0.5, y: jy - pH - gap * 0.5, w: pW + ov * 0.5, h: pH };
      // ─ Plate 2 (bottom) extends RIGHT from overlap zone
      const p2 = { x: jx - ov * 0.5, y: jy + gap * 0.5, w: pW + ov * 0.5, h: pH };

      // Drop shadow
      ctx.save();
      ctx.shadowColor = "rgba(30,36,28,0.15)";
      ctx.shadowBlur = 16;
      ctx.shadowOffsetY = 5;

      // Plate fill
      ctx.fillStyle = "rgba(238,241,230,0.94)";
      ctx.strokeStyle = "rgba(48,54,44,0.55)";
      ctx.lineWidth = 1.4;

      ctx.beginPath(); ctx.rect(p1.x, p1.y, p1.w, p1.h); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(p2.x, p2.y, p2.w, p2.h); ctx.fill(); ctx.stroke();

      ctx.restore();

      // Hatching on plate faces (engineering drawing convention)
      ctx.save();
      ctx.strokeStyle = "rgba(48,54,44,0.18)";
      ctx.lineWidth = 0.7;
      for (let i = 0; i < p1.w; i += 10) {
        ctx.beginPath();
        ctx.moveTo(p1.x + i, p1.y);
        ctx.lineTo(p1.x + i + pH, p1.y + pH);
        ctx.stroke();
      }
      for (let i = 0; i < p2.w; i += 10) {
        ctx.beginPath();
        ctx.moveTo(p2.x + i, p2.y);
        ctx.lineTo(p2.x + i + pH, p2.y + pH);
        ctx.stroke();
      }
      ctx.restore();

      // Adhesive layer (accent colour, pulsing)
      const adhesiveAlpha = 0.55 + pulse * 0.22;
      ctx.fillStyle = `rgba(140,45,25,${adhesiveAlpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.rect(jx - ov * 0.5, jy - gap * 0.5, ov, gap);
      ctx.fill();

      // Adhesive glow
      const glowGrd = ctx.createRadialGradient(jx, jy, 0, jx, jy, ov * 0.9);
      glowGrd.addColorStop(0, `rgba(140,45,25,${(0.10 + pulse * 0.08).toFixed(3)})`);
      glowGrd.addColorStop(1, "rgba(140,45,25,0)");
      ctx.fillStyle = glowGrd;
      ctx.beginPath();
      ctx.ellipse(jx, jy, ov * 0.9, (pH + gap) * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();

      // ─ Force arrows (shear loading)
      const arrowA = (0.40 + pulse * 0.14).toFixed(3);
      ctx.strokeStyle = `rgba(78,88,60,${arrowA})`;
      ctx.fillStyle   = `rgba(78,88,60,${arrowA})`;
      ctx.lineWidth = 1.8;

      function arrow(x1: number, y1: number, x2: number, y2: number) {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        const ang = Math.atan2(y2 - y1, x2 - x1);
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - 9 * Math.cos(ang - 0.38), y2 - 9 * Math.sin(ang - 0.38));
        ctx.lineTo(x2 - 9 * Math.cos(ang + 0.38), y2 - 9 * Math.sin(ang + 0.38));
        ctx.closePath();
        ctx.fill();
      }

      arrow(p1.x - 16, p1.y + pH * 0.5, p1.x - 52, p1.y + pH * 0.5); // ← top
      arrow(p2.x + p2.w + 16, p2.y + pH * 0.5, p2.x + p2.w + 52, p2.y + pH * 0.5); // → bottom

      // ─ "ADHESIVE" label
      ctx.font = `bold 9px ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.fillStyle = `rgba(140,45,25,${(0.55 + pulse * 0.20).toFixed(3)})`;
      ctx.fillText("ADHESIVE", jx, p1.y - 7);

      // ─ Dimension tick for adhesive thickness
      ctx.strokeStyle = "rgba(48,54,44,0.22)";
      ctx.lineWidth = 0.7;
      ctx.setLineDash([3, 3]);
      const tx = jx + ov * 0.5 + 16;
      ctx.beginPath();
      ctx.moveTo(tx, jy - gap * 0.5);
      ctx.lineTo(tx, jy + gap * 0.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(tx - 4, jy - gap * 0.5); ctx.lineTo(tx + 4, jy - gap * 0.5);
      ctx.moveTo(tx - 4, jy + gap * 0.5); ctx.lineTo(tx + 4, jy + gap * 0.5);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // ── Main render loop ─────────────────────────────────────────────────
    function draw(now: number) {
      const dt = Math.min((now - lastT) * 0.001, 0.05);
      lastT = now;
      const t = now * 0.001;
      ctx.clearRect(0, 0, W, H);

      const cutoff = W * JOINT_CX - 30;

      // Schematic elements
      for (const el of elements) {
        el.life += dt;
        el.x    += el.vx * dt;
        if (el.life > el.maxLife || el.x > cutoff) {
          const fresh = randomEl(W, H);
          el.type = fresh.type; el.x = fresh.x; el.y = fresh.y;
          el.size = fresh.size; el.vx = fresh.vx;
          el.angle = fresh.angle; el.life = 0; el.maxLife = fresh.maxLife;
        }
        drawEl(el);
      }

      // Particles (olive → accent as they approach the joint)
      for (const p of particles) {
        p.life += dt;
        p.x    += p.vx * dt;
        p.y    += p.vy * dt;

        if (p.life > p.maxLife || p.x > cutoff + 20) {
          const fresh = randomParticle(W, H);
          p.x = fresh.x; p.y = fresh.y;
          p.vx = fresh.vx; p.vy = fresh.vy;
          p.life = 0; p.maxLife = fresh.maxLife;
        }

        const age   = p.life / p.maxLife;
        const alpha = age < 0.15 ? (age / 0.15) * 0.60 : (1 - age) * 0.60;
        if (alpha <= 0) continue;

        const prog = Math.max(0, Math.min(1, (p.x - W * 0.08) / (cutoff - W * 0.08)));
        const r = Math.round(107 + (140 - 107) * prog);
        const g = Math.round(119 + ( 45 - 119) * prog);
        const b = Math.round( 80 + ( 25 -  80) * prog);

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4 + (1 - age) * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
        ctx.fill();
      }

      drawJoint(t);

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
