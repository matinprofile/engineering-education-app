"use client";

import { useEffect, useRef } from "react";

type Vec3 = {
  x: number;
  y: number;
  z: number;
};

type NodePoint = Vec3 & {
  baseRadius: number;
  twinkleSeed: number;
};

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
};

const RING_COUNT = 18;
const SEGMENTS_PER_RING = 28;
const SPHERE_RADIUS = 220;
const FOCAL_LENGTH = 740;
const CAMERA_Z = 480;
const SPARK_COUNT = 120;

function rotateY(p: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return {
    x: p.x * c + p.z * s,
    y: p.y,
    z: -p.x * s + p.z * c,
  };
}

function rotateX(p: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return {
    x: p.x,
    y: p.y * c - p.z * s,
    z: p.y * s + p.z * c,
  };
}

function makeSpherePoints(): NodePoint[] {
  const points: NodePoint[] = [];

  for (let ring = 0; ring < RING_COUNT; ring++) {
    const v = ring / (RING_COUNT - 1);
    const theta = v * Math.PI;
    const ringRadius = Math.sin(theta) * SPHERE_RADIUS;
    const y = Math.cos(theta) * SPHERE_RADIUS;

    const segmentOffset = ring % 2 === 0 ? 0 : Math.PI / SEGMENTS_PER_RING;
    for (let seg = 0; seg < SEGMENTS_PER_RING; seg++) {
      const phi = (seg / SEGMENTS_PER_RING) * Math.PI * 2 + segmentOffset;
      points.push({
        x: Math.cos(phi) * ringRadius,
        y,
        z: Math.sin(phi) * ringRadius,
        baseRadius: 1.2 + Math.random() * 1.6,
        twinkleSeed: Math.random() * Math.PI * 2,
      });
    }
  }

  return points;
}

function makeSparks(w: number, h: number): Spark[] {
  return Array.from({ length: SPARK_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.08,
    vy: (Math.random() - 0.5) * 0.08,
    size: 0.7 + Math.random() * 1.8,
    alpha: 0.16 + Math.random() * 0.32,
  }));
}

export function PolygonSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasNode = canvasRef.current;
    if (!canvasNode) return;
    const canvas: HTMLCanvasElement = canvasNode;
    const host = canvas.parentElement;
    if (!host) return;
    const hostEl: HTMLElement = host;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    const sphere = makeSpherePoints();
    let sparks: Spark[] = [];

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
      sparks = makeSparks(W, H);
    }

    function draw(now: number) {
      const t = now * 0.001;
      ctx.clearRect(0, 0, W, H);

      const cx = W * 0.72;
      const cy = H * 0.52;
      const rotY = t * 0.35;
      const rotX = -0.36 + Math.sin(t * 0.45) * 0.08;

      const projected = sphere.map((p) => {
        let q = rotateY(p, rotY);
        q = rotateX(q, rotX);

        const perspective = FOCAL_LENGTH / (FOCAL_LENGTH + q.z + CAMERA_Z);
        return {
          x: cx + q.x * perspective,
          y: cy + q.y * perspective,
          z: q.z,
          perspective,
          radius: p.baseRadius,
          twinkleSeed: p.twinkleSeed,
        };
      });

      const glow = ctx.createRadialGradient(cx, cy, 30, cx, cy, SPHERE_RADIUS * 1.5);
      glow.addColorStop(0, "rgba(200,80,40,0.20)");
      glow.addColorStop(0.5, "rgba(140,45,25,0.12)");
      glow.addColorStop(1, "rgba(70,20,10,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, SPHERE_RADIUS * 1.3, 0, Math.PI * 2);
      ctx.fill();

      for (let ring = 0; ring < RING_COUNT; ring++) {
        const ringStart = ring * SEGMENTS_PER_RING;
        for (let seg = 0; seg < SEGMENTS_PER_RING; seg++) {
          const a = projected[ringStart + seg];
          const b = projected[ringStart + ((seg + 1) % SEGMENTS_PER_RING)];
          const linkAlpha = 0.12 + Math.max(0, a.perspective - 0.45) * 0.5;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(180,70,40,${Math.min(linkAlpha, 0.55)})`;
          ctx.lineWidth = 0.5 + a.perspective * 0.9;
          ctx.stroke();

          if (ring < RING_COUNT - 1) {
            const c = projected[ringStart + SEGMENTS_PER_RING + seg];
            const meridianAlpha = 0.09 + Math.max(0, a.perspective - 0.4) * 0.42;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(c.x, c.y);
            ctx.strokeStyle = `rgba(160,60,30,${Math.min(meridianAlpha, 0.48)})`;
            ctx.lineWidth = 0.5 + a.perspective * 0.75;
            ctx.stroke();
          }
        }
      }

      projected.sort((a, b) => a.z - b.z);
      for (const p of projected) {
        const twinkle = (Math.sin(t * 2.2 + p.twinkleSeed) + 1) * 0.5;
        const alpha = 0.28 + p.perspective * 0.45 + twinkle * 0.18;
        const radius = p.radius + p.perspective * 1.6 + twinkle * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,100,60,${Math.min(alpha, 0.95)})`;
        ctx.fill();
      }

      for (const s of sparks) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -4) s.x = W + 4;
        if (s.x > W + 4) s.x = -4;
        if (s.y < -4) s.y = H + 4;
        if (s.y > H + 4) s.y = -4;

        const pulse = 0.7 + Math.sin(t * 1.4 + s.x * 0.012 + s.y * 0.01) * 0.3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,70,40,${s.alpha * pulse})`;
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