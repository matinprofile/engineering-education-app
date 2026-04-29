"use client";

import { useEffect, useRef } from "react";

type Point3D = {
  x: number;
  y: number;
};

const GRID_X = 50;
const GRID_Y = 50;
const PLATE_WIDTH = 2048;
const PLATE_HEIGHT = 560;
const CAMERA_Z = 780;
const FOCAL_LENGTH = 1024;

function rotateX(y: number, z: number, angle: number) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return {
    y: y * c - z * s,
    z: y * s + z * c,
  };
}

function rotateY(x: number, z: number, angle: number) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return {
    x: x * c + z * s,
    z: -x * s + z * c,
  };
}

export function WavePlateMesh() {
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

    const points: Point3D[] = [];
    for (let j = 0; j < GRID_Y; j++) {
      for (let i = 0; i < GRID_X; i++) {
        const px = (i / (GRID_X - 1) - 0.5) * PLATE_WIDTH;
        const py = (j / (GRID_Y - 1) - 0.5) * PLATE_HEIGHT;
        points.push({ x: px, y: py });
      }
    }

    let raf = 0;
    let W = 0;
    let H = 0;
    let dpr = 1;

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

      const centerX = W * 0.63;
      const centerY = H * 0.5;
      const rotX = -0.88;
      const rotY = -0.48;
      const amp = 32;

      const projected = new Array(points.length);
      for (let idx = 0; idx < points.length; idx++) {
        const p = points[idx];

        const zWave =
          Math.sin(p.x * 0.018 + t * 1.9) * amp +
          Math.cos(p.y * 0.029 - t * 1.5) * amp * 0.72;

        let x = p.x;
        let y = p.y;
        let z = zWave;

        const r1 = rotateX(y, z, rotX);
        y = r1.y;
        z = r1.z;

        const r2 = rotateY(x, z, rotY);
        x = r2.x;
        z = r2.z;

        const depth = FOCAL_LENGTH / (FOCAL_LENGTH + z + CAMERA_Z);
        const sx = centerX + x * depth;
        const sy = centerY + y * depth;

        projected[idx] = { x: sx, y: sy, depth, z };
      }

      // Draw a faint plate shadow to sell the metal sheet silhouette.
      const g = ctx.createRadialGradient(centerX + 24, centerY + 140, 80, centerX + 24, centerY + 140, 380);
      g.addColorStop(0, "rgba(48,54,44,0.14)");
      g.addColorStop(1, "rgba(48,54,44,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(centerX + 24, centerY + 140, 320, 98, -0.14, 0, Math.PI * 2);
      ctx.fill();

      for (let j = 0; j < GRID_Y; j++) {
        for (let i = 0; i < GRID_X; i++) {
          const a = j * GRID_X + i;
          const p0 = projected[a];
          if (!p0) continue;

          if (i < GRID_X - 1) {
            const p1 = projected[a + 1];
            const depthMix = (p0.depth + p1.depth) * 0.5;
            const waveEnergy = Math.min(Math.abs((p0.z + p1.z) * 0.013), 1);
            ctx.strokeStyle = `rgba(107,119,80,${0.22 + depthMix * 0.24 + waveEnergy * 0.18})`;
            ctx.lineWidth = 0.7 + depthMix * 1.3;
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
          }

          if (j < GRID_Y - 1) {
            const p2 = projected[a + GRID_X];
            const depthMix = (p0.depth + p2.depth) * 0.5;
            const waveEnergy = Math.min(Math.abs((p0.z + p2.z) * 0.013), 1);
            ctx.strokeStyle = `rgba(77,88,58,${0.18 + depthMix * 0.2 + waveEnergy * 0.15})`;
            ctx.lineWidth = 0.6 + depthMix * 1.1;
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
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