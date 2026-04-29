"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
};

const OLIVE = { r: 107, g: 119, b: 80 };
const NODE_DENSITY = 16000;
const MIN_NODES = 55;
const MAX_NODES = 90;
const CONNECT_DIST = 148;
const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
const MOUSE_RADIUS = 210;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
const REPEL_STRENGTH = 0.055;
const FRICTION = 0.90;
const MAX_SPEED = 2.4;

function clamp(v: number, lo: number, hi: number) {
  return v < lo ? lo : v > hi ? hi : v;
}

function makeParticles(w: number, h: number): Particle[] {
  const count = clamp(Math.round((w * h) / NODE_DENSITY), MIN_NODES, MAX_NODES);
  return Array.from({ length: count }, () => {
    const vx = (Math.random() - 0.5) * 0.5;
    const vy = (Math.random() - 0.5) * 0.5;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx,
      vy,
      baseVx: vx,
      baseVy: vy,
      radius: 2 + Math.random() * 1.5,
    };
  });
}

export function StressNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999, inside: false };

    function resize() {
      const rect = parent!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);
      particles = makeParticles(W, H);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = parent!.getBoundingClientRect();
      mouse.inside =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom;
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouse.inside = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      // update
      for (const p of particles) {
        // gentle drift back to base velocity
        p.vx += (p.baseVx - p.vx) * 0.008;
        p.vy += (p.baseVy - p.vy) * 0.008;

        // mouse repulsion
        if (mouse.inside) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < MOUSE_RADIUS_SQ && dSq > 0.01) {
            const d = Math.sqrt(dSq);
            const force = (1 - d / MOUSE_RADIUS) * REPEL_STRENGTH;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }

        p.vx *= FRICTION;
        p.vy *= FRICTION;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > MAX_SPEED) {
          p.vx = (p.vx / spd) * MAX_SPEED;
          p.vy = (p.vy / spd) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0)  { p.x = 0;  p.vx *= -0.7; }
        if (p.x > W)  { p.x = W;  p.vx *= -0.7; }
        if (p.y < 0)  { p.y = 0;  p.vy *= -0.7; }
        if (p.y > H)  { p.y = H;  p.vy *= -0.7; }
      }

      // draw edges
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dSq = dx * dx + dy * dy;
          if (dSq > CONNECT_DIST_SQ) continue;

          const t = 1 - Math.sqrt(dSq) / CONNECT_DIST;   // 0 → 1 as closer
          let op = 0.06 + t * 0.22;
          let lw = 0.5 + t * 0.8;

          if (mouse.inside) {
            const mda = Math.hypot(a.x - mouse.x, a.y - mouse.y);
            const mdb = Math.hypot(b.x - mouse.x, b.y - mouse.y);
            const mf  = Math.max(0, 1 - Math.min(mda, mdb) / MOUSE_RADIUS);
            op += mf * 0.48;
            lw += mf * 1.6;
          }

          op = clamp(op, 0.04, 0.72);
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.strokeStyle = `rgba(${OLIVE.r},${OLIVE.g},${OLIVE.b},${op})`;
          ctx!.lineWidth = lw;
          ctx!.stroke();
        }
      }

      // draw nodes
      for (const p of particles) {
        let op = 0.28;
        let r  = p.radius;
        if (mouse.inside) {
          const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (md < MOUSE_RADIUS) {
            const mf = 1 - md / MOUSE_RADIUS;
            op += mf * 0.44;
            r  += mf * 1.8;
          }
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, clamp(r, 1, 5.5), 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${OLIVE.r},${OLIVE.g},${OLIVE.b},${clamp(op, 0.2, 0.75)})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
}
