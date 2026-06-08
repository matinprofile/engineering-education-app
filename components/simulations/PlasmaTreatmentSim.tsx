"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Zap, Activity, Microscope } from "lucide-react";

const GRID = 64;
const BASE_ENERGY = 32;
const MAX_ENERGY = 72;
const DECAY = 0.0015;
const TREAT_RATE = 0.13;
const PLASMA_R = 3;

export function PlasmaTreatmentSim() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animIdRef = useRef<number>(0);
  const isTreatingRef = useRef(false);

  const [dyneValue, setDyneValue] = useState(BASE_ENERGY);
  const [plasmaActive, setPlasmaActive] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    scene.fog = new THREE.FogExp2(0x0f172a, 0.03);

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / Math.max(container.clientHeight, 1), 0.1, 100);
    camera.position.set(0, 15, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 10, 5);
    dir.castShadow = true;
    scene.add(dir);

    const plasmaLight = new THREE.PointLight(0x8b5cf6, 0, 10, 2);
    scene.add(plasmaLight);

    // HDPE plate with canvas texture
    const plateCanvas = document.createElement("canvas");
    plateCanvas.width = GRID;
    plateCanvas.height = GRID;
    const ctx = plateCanvas.getContext("2d")!;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, GRID, GRID);

    const plateTexture = new THREE.CanvasTexture(plateCanvas);
    plateTexture.magFilter = THREE.LinearFilter;
    plateTexture.minFilter = THREE.LinearFilter;

    const plate = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.2,
        metalness: 0.1,
        emissiveMap: plateTexture,
        emissive: 0xffffff,
        emissiveIntensity: 1,
      })
    );
    plate.rotation.x = -Math.PI / 2;
    plate.receiveShadow = true;
    scene.add(plate);

    // Torch
    const torchGroup = new THREE.Group();
    const torchBody = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 4, 16), new THREE.MeshStandardMaterial({ color: 0x64748b }));
    torchBody.position.y = 2;
    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 1, 16), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
    nozzle.position.y = -0.5;
    torchGroup.add(torchBody, nozzle);
    torchGroup.rotation.x = Math.PI / 6;
    scene.add(torchGroup);

    // Plasma particles
    const particleCount = 200;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 0.5;
      pPos[i * 3 + 1] = Math.random() * -2;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pPoints = new THREE.Points(pGeom, new THREE.PointsMaterial({
      color: 0xa78bfa, size: 0.15, transparent: true, opacity: 0.8,
      blending: THREE.AdditiveBlending,
    }));
    pPoints.visible = false;
    scene.add(pPoints);

    // Energy grid
    const energyGrid = new Float32Array(GRID * GRID).fill(0);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObject(plate);
      if (hits.length > 0) {
        const pt = hits[0].point;
        torchGroup.position.set(pt.x, pt.y + 3, pt.z + 1);
        plasmaLight.position.set(pt.x, pt.y + 0.5, pt.z);
        pPoints.position.copy(torchGroup.position);
        pPoints.position.y -= 1.0;

        if (isTreatingRef.current && hits[0].uv) {
          const cx = Math.floor(hits[0].uv.x * GRID);
          const cy = Math.floor(hits[0].uv.y * GRID);
          for (let dx = -PLASMA_R; dx <= PLASMA_R; dx++) {
            for (let dy = -PLASMA_R; dy <= PLASMA_R; dy++) {
              if (dx * dx + dy * dy <= PLASMA_R * PLASMA_R) {
                const gx = cx + dx;
                const gy = cy + dy;
                if (gx >= 0 && gx < GRID && gy >= 0 && gy < GRID) {
                  const idx = (GRID - 1 - gy) * GRID + gx;
                  energyGrid[idx] = Math.min(1, energyGrid[idx] + TREAT_RATE * 0.05);
                }
              }
            }
          }
        }

        if (hits[0].uv) {
          const cx = Math.floor(hits[0].uv.x * GRID);
          const cy = Math.floor(hits[0].uv.y * GRID);
          const idx = (GRID - 1 - cy) * GRID + cx;
          const raw = energyGrid[idx] || 0;
          const dynes = Math.round(BASE_ENERGY + raw * (MAX_ENERGY - BASE_ENERGY));
          setDyneValue(dynes);
          setEnergyLevel(raw);
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onMouseDown = () => { isTreatingRef.current = true; setPlasmaActive(true); setHasInteracted(true); };
    const onMouseUp = () => { isTreatingRef.current = false; setPlasmaActive(false); };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      isTreatingRef.current = true;
      setPlasmaActive(true);
      setHasInteracted(true);
      if (e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => { isTreatingRef.current = false; setPlasmaActive(false); };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      animIdRef.current = requestAnimationFrame(animate);

      if (isTreatingRef.current) {
        plasmaLight.intensity = Math.random() * 2 + 3;
        pPoints.visible = true;
        const pos = pGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3 + 1] -= 0.2;
          if (pos[i * 3 + 1] < -2) pos[i * 3 + 1] = 0;
        }
        pGeom.attributes.position.needsUpdate = true;
      } else {
        plasmaLight.intensity = 0;
        pPoints.visible = false;
      }

      // Decay
      for (let i = 0; i < energyGrid.length; i++) {
        if (energyGrid[i] > 0) { energyGrid[i] -= DECAY; if (energyGrid[i] < 0) energyGrid[i] = 0; }
      }

      // Update texture
      const imgData = ctx.createImageData(GRID, GRID);
      for (let i = 0; i < energyGrid.length; i++) {
        const e = energyGrid[i];
        const pi = i * 4;
        imgData.data[pi] = 0;
        imgData.data[pi + 1] = Math.floor(e * 255);
        imgData.data[pi + 2] = Math.floor(e * 150);
        imgData.data[pi + 3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);
      plateTexture.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  const isFunctionalized = energyLevel >= 0.3;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-8 pb-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[650px]">
        {/* 3D Viewport */}
        <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col relative group min-h-[300px] sm:min-h-[400px] lg:min-h-0">
          <div ref={containerRef} className="flex-1 relative" style={{ cursor: "none", background: "#0f172a", touchAction: "none" }}>
            {plasmaActive && (
              <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-black/60 backdrop-blur px-5 py-1.5 rounded-full border border-violet-500/30">
                <span className="font-bold text-violet-400 tracking-wider flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 fill-current" /> PLASMA ACTIVE
                </span>
              </div>
            )}
            {!hasInteracted && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 pointer-events-none z-10">
                <div className="text-center">
                  <Zap className="w-12 h-12 mx-auto mb-2 text-violet-500 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white">Manual Control</h3>
                  <p className="text-slate-300 text-sm">Press and drag to activate the plasma jet.</p>
                </div>
              </div>
            )}
          </div>
          <div className="bg-slate-950 px-5 py-2 flex justify-between text-xs font-mono text-slate-500 border-t border-slate-800">
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" /> Untreated (Hydrophobic)</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] inline-block" /> Activated (Hydrophilic)</span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4 overflow-y-auto">
          {/* Energy meter */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 shadow-lg">
            <h3 className="text-violet-400 font-bold mb-3 flex items-center gap-2 border-b border-slate-700 pb-2 text-sm">
              <Activity className="w-4 h-4" /> Surface Energy
            </h3>
            <div className="flex justify-between items-end mb-1">
              <span className="text-xs text-slate-400">Current Level (Dyne/cm)</span>
              <span className="text-3xl font-mono font-bold text-white">{dyneValue}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 mb-1 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full transition-all duration-100"
                style={{ width: `${((dyneValue - BASE_ENERGY) / (MAX_ENERGY - BASE_ENERGY)) * 100}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>32 Dyne (Native HDPE)</span>
              <span>72 Dyne (Water)</span>
            </div>
            <div className="mt-3 bg-slate-900/50 p-2.5 rounded border border-slate-700/50 text-xs">
              <p className="mb-1"><strong className="text-orange-400">Hydrophobic Recovery:</strong></p>
              <p className="text-slate-400">When plasma stops, polymer chains rotate and polar groups hide, lowering surface energy.</p>
            </div>
          </div>

          {/* Molecule view */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 shadow-lg flex-grow flex flex-col">
            <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2 border-b border-slate-700 pb-2 text-sm">
              <Microscope className="w-4 h-4" /> Surface Chemistry
            </h3>
            <div className="flex-grow bg-slate-900 rounded-lg p-4 flex flex-col items-center justify-center border border-slate-700">
              {!isFunctionalized ? (
                <div className="flex items-center gap-1 opacity-50 grayscale mb-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-white mb-1" />
                      <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-500 flex items-center justify-center font-bold text-[10px]">C</div>
                      <div className="w-2 h-2 rounded-full bg-white mt-1" />
                      {i < 2 && <div className="absolute w-4 h-1 bg-slate-600 translate-x-5" />}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 animate-pulse mb-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-white mb-1" />
                    <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-500 flex items-center justify-center font-bold text-[10px]">C</div>
                    <div className="w-2 h-2 rounded-full bg-white mt-1" />
                  </div>
                  <div className="w-4 h-0.5 bg-slate-600" />
                  <div className="flex flex-col items-center relative">
                    <div className="flex flex-col items-center animate-bounce absolute -top-7">
                      <div className="w-5 h-5 rounded-full bg-red-600 border border-red-400 flex items-center justify-center text-[8px] font-bold">O</div>
                      <div className="h-3 w-0.5 bg-red-500" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-white mb-1 mt-7" />
                    <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-green-500 flex items-center justify-center font-bold text-[10px] text-green-400">C*</div>
                    <div className="w-2 h-2 rounded-full bg-white mt-1" />
                  </div>
                  <div className="w-4 h-0.5 bg-slate-600" />
                  <div className="flex flex-col items-center relative">
                    <div className="w-2 h-2 rounded-full bg-white mb-1" />
                    <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-green-500 flex items-center justify-center font-bold text-[10px] text-green-400">C*</div>
                    <div className="flex flex-col items-center mt-1">
                      <div className="h-3 w-0.5 bg-red-500" />
                      <div className="flex items-center bg-red-900/50 rounded px-1 border border-red-500">
                        <span className="w-2 h-2 bg-red-600 rounded-full mr-1 inline-block" />
                        <span className="text-[8px]">OH</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <h4 className={`text-base font-bold ${isFunctionalized ? "text-green-400" : "text-slate-400"}`}>
                {isFunctionalized ? "Functionalized Surface" : "Inert Polymer"}
              </h4>
              <p className="text-xs text-slate-400 mt-1 text-center">
                {isFunctionalized ? "Bombardment creates radicals. Oxygen binds, forming C=O and –OH groups." : "Non-polar surface — only C–H and C–C bonds. Low adhesion."}
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-slate-500 text-center">
              {[["⚪", "Hydrogen"], ["⚫", "Carbon"], ["🔴", "Oxygen (Plasma)"], ["⚡", "Free Electron"]].map(([icon, name]) => (
                <div key={name} className="bg-slate-700/30 p-1.5 rounded">
                  <span className="block text-lg mb-0.5">{icon}</span>{name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
