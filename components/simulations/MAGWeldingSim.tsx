"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Flame, Sliders, RefreshCw, MousePointer2, CheckCircle, ZapOff, Thermometer } from "lucide-react";

type TransferMode = "short" | "spray";
type FeedbackStatus = "idle" | "ok" | "fast" | "slow";

const MODE_DESCS: Record<TransferMode, string> = {
  short:
    "Suitable for thin sheets and root passes. Lower heat input, unstable arc, risk of lack of fusion.",
  spray:
    "High deposition for thick plates. Stable arc, high heat, fluid weld pool (flat position only).",
};

const FEEDBACK_CONFIG: Record<FeedbackStatus, { text: string; colorClass: string }> = {
  idle:  { text: "",              colorClass: "" },
  ok:    { text: "IDEAL SPEED",   colorClass: "text-emerald-400" },
  fast:  { text: "TOO FAST",      colorClass: "text-red-400" },
  slow:  { text: "TOO SLOW",      colorClass: "text-yellow-400" },
};

export function MAGWeldingSim() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [amperage, setAmperage] = useState(180);
  const [transferMode, setTransferMode] = useState<TransferMode>("short");
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>("idle");
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const amperageRef = useRef(amperage);
  const transferModeRef = useRef(transferMode);
  const resetRef = useRef<() => void>(() => {});

  useEffect(() => { amperageRef.current = amperage; }, [amperage]);
  useEffect(() => { transferModeRef.current = transferMode; }, [transferMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f4f6);
    scene.fog = new THREE.FogExp2(0xf3f4f6, 0.02);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      1000
    );
    camera.position.set(0, 20, 20);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0x404040, 1.5));

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const arcLight = new THREE.PointLight(0x3b82f6, 0, 15, 2);
    scene.add(arcLight);

    // Table
    const table = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 })
    );
    table.rotation.x = -Math.PI / 2;
    table.position.y = -0.5;
    table.receiveShadow = true;
    scene.add(table);

    // Metal plate
    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(40, 1, 20),
      new THREE.MeshStandardMaterial({ color: 0x777777, roughness: 0.4, metalness: 0.8 })
    );
    plate.receiveShadow = true;
    plate.castShadow = true;
    scene.add(plate);

    // Groove guide line
    const guideLine = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 0.2),
      new THREE.MeshBasicMaterial({ color: 0x333333 })
    );
    guideLine.rotation.x = -Math.PI / 2;
    guideLine.position.y = 0.51;
    scene.add(guideLine);

    // Torch
    const nozzle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 1.2, 4, 16),
      new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.5, roughness: 0.5 })
    );
    nozzle.castShadow = true;
    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 6, 16),
      new THREE.MeshStandardMaterial({ color: 0x111111 })
    );
    neck.position.y = 5;
    neck.castShadow = true;
    const torch = new THREE.Group();
    torch.add(nozzle, neck);
    torch.rotation.x = Math.PI / 8;
    scene.add(torch);

    // Spark particle system
    const PARTICLE_COUNT = 100;
    const sparkPositions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities: Array<{ x: number; y: number; z: number; life: number }> = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      sparkPositions[i * 3] = sparkPositions[i * 3 + 1] = sparkPositions[i * 3 + 2] = 0;
      velocities.push({ x: 0, y: 0, z: 0, life: 0 });
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPositions, 3));
    const sparkSystem = new THREE.Points(
      sparkGeo,
      new THREE.PointsMaterial({ color: 0xff4500, size: 0.3, transparent: true, opacity: 0.9 })
    );
    sparkSystem.visible = false;
    scene.add(sparkSystem);

    // Simulation state
    const beads: Array<{ mesh: THREE.Mesh; birth: number }> = [];
    let isWelding = false;
    let lastWeldTime = 0;
    let lastWeldPos: THREE.Vector3 | null = null;
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function animateSparks() {
      sparkSystem.visible = true;
      const mode = transferModeRef.current;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        if (velocities[i].life <= 0) {
          sparkPositions[i * 3] = sparkPositions[i * 3 + 1] = sparkPositions[i * 3 + 2] = 0;
          const spread = mode === "spray" ? 0.05 : 0.15;
          velocities[i].x = (Math.random() - 0.5) * spread;
          velocities[i].y = Math.random() * 0.2 + 0.1;
          velocities[i].z = (Math.random() - 0.5) * spread;
          velocities[i].life = Math.random() * 10 + 5;
        } else {
          sparkPositions[i * 3] += velocities[i].x;
          sparkPositions[i * 3 + 1] += velocities[i].y;
          sparkPositions[i * 3 + 2] += velocities[i].z;
          velocities[i].y -= 0.02;
          velocities[i].life--;
        }
      }
      (sparkSystem.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }

    function depositBead(pos: THREE.Vector3, speed: number) {
      const amps = amperageRef.current;
      const mode = transferModeRef.current;

      const idealSpeed =
        1.5 + ((amps - 100) / 200) * (3.0 - 1.5);
      const speedTooFast = idealSpeed * 1.4;
      const speedTooSlow = idealSpeed * 0.6;

      let size = (amps / 300) * 0.6 + 0.2;
      let status: FeedbackStatus = "ok";

      if (lastWeldPos) {
        if (speed > speedTooFast) {
          status = "fast";
          size *= 0.5;
          if (Math.random() > 0.6) return;
        } else if (speed < speedTooSlow) {
          status = "slow";
          size *= 1.8;
        }
      }

      setFeedbackStatus(status);
      setFeedbackVisible(true);

      const bead = new THREE.Mesh(
        new THREE.SphereGeometry(size, 8, 8),
        new THREE.MeshStandardMaterial({
          color: 0x333333,
          emissive: new THREE.Color(0xff3300),
          emissiveIntensity: 2,
          roughness: 0.7,
          metalness: 0.9,
        })
      );
      bead.rotation.set(Math.random(), Math.random(), Math.random());
      bead.position.set(pos.x, 0.5 + size * 0.4, pos.z);

      if (mode === "spray" || speed < speedTooSlow) {
        bead.scale.set(1.4, 0.6, 1.4);
      }

      scene.add(bead);
      beads.push({ mesh: bead, birth: Date.now() });
    }

    function performWeld(point: THREE.Vector3) {
      const now = Date.now();
      const amps = amperageRef.current;
      arcLight.intensity = (Math.random() * 2 + 3) * (amps / 200);

      let speed = 0;
      if (lastWeldPos) {
        const dx = point.x - lastWeldPos.x;
        const dz = point.z - lastWeldPos.z;
        const dt = now - lastWeldTime;
        if (dt > 0) speed = (Math.sqrt(dx * dx + dz * dz) / dt) * 100;
      }

      if (!lastWeldPos || now - lastWeldTime > 30) {
        depositBead(point, speed);
        lastWeldPos = point.clone();
        lastWeldTime = now;
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObject(plate);
      if (hits.length > 0) {
        const pt = hits[0].point;
        torch.position.set(pt.x, pt.y + 4, pt.z);
        arcLight.position.set(pt.x, pt.y + 1, pt.z);
        sparkSystem.position.set(pt.x, pt.y + 0.5, pt.z);

        if (isWelding) {
          performWeld(pt);
          animateSparks();
        } else {
          sparkSystem.visible = false;
          lastWeldPos = null;
        }
      }
    }

    function onMouseDown() {
      isWelding = true;
      setShowHint(false);
    }

    function onMouseUp() {
      isWelding = false;
      arcLight.intensity = 0;
      setFeedbackVisible(false);
    }

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", onResize);

    resetRef.current = () => {
      beads.forEach((b) => scene.remove(b.mesh));
      beads.length = 0;
    };

    let rafId: number;
    function animate() {
      rafId = requestAnimationFrame(animate);
      const now = Date.now();
      for (const b of beads) {
        const age = now - b.birth;
        if (age < 3000) {
          const mat = b.mesh.material as THREE.MeshStandardMaterial;
          const heat = Math.max(0, 2 - age / 1000);
          mat.emissiveIntensity = heat;
          if (heat < 0.1) mat.emissive.setHex(0x000000);
        }
      }
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const feedback = FEEDBACK_CONFIG[feedbackStatus];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="w-full border-b border-zinc-800 px-4 py-6 sm:px-6 bg-zinc-900">
        <div className="mx-auto max-w-7xl">
          <h2 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-amber-400 md:text-3xl">
            <Flame className="h-8 w-8 shrink-0" />
            MAG Welding Simulator
          </h2>
          <p className="mt-1 text-zinc-400">Virtual MAG/GMAW process trainer</p>
          <p className="mt-0.5 text-sm text-zinc-500">
            Control the torch, adjust amperage, and maintain a steady travel speed.
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6">
        {/* 3D Viewport */}
        <div className="lg:col-span-2 flex flex-col rounded-xl border border-zinc-700 shadow-2xl overflow-hidden">
          <div
            ref={containerRef}
            className="relative flex-1 min-h-[400px] cursor-none"
            style={{ background: "#f3f4f6" }}
          >
            {/* Feedback overlay */}
            {feedbackVisible && feedbackStatus !== "idle" && (
              <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur px-5 py-2 rounded-full border border-zinc-600/40 pointer-events-none z-10 shadow-lg">
                <span className={`font-bold text-xl tracking-widest uppercase ${feedback.colorClass}`}>
                  {feedback.text}
                </span>
              </div>
            )}

            {/* Interaction hint */}
            {showHint && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/65 backdrop-blur-sm pointer-events-none z-10">
                <div className="text-center">
                  <MousePointer2 className="w-12 h-12 mx-auto mb-3 text-amber-400 animate-bounce" />
                  <h3 className="text-2xl font-bold text-white">Click &amp; Drag to Weld</h3>
                  <p className="text-zinc-300 mt-1">Hold the mouse button and move to deposit the bead.</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-zinc-900 px-4 py-2 flex justify-between text-xs font-mono text-zinc-400 border-t border-zinc-700">
            <span>Gas: Ar/CO₂ (82/18)</span>
            <span>Wire: ER70S-6 Ø1.0 mm</span>
          </div>
        </div>

        {/* Controls */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          {/* WPS Parameters */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6 shadow-lg">
            <h3 className="text-amber-400 font-bold mb-5 flex items-center gap-2 border-b border-zinc-700 pb-3">
              <Sliders className="w-5 h-5" />
              WPS Parameters
            </h3>

            {/* Amperage */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-zinc-300">Current (Amperes)</label>
                <span className="text-sm font-mono font-bold text-amber-400">{amperage} A</span>
              </div>
              <input
                type="range"
                min={100}
                max={300}
                value={amperage}
                onChange={(e) => setAmperage(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>100 A — Cold</span>
                <span>300 A — Hot</span>
              </div>
            </div>

            {/* Transfer mode */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-zinc-300 mb-2 block">
                Transfer Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(["short", "spray"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setTransferMode(mode)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      transferMode === mode
                        ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-md shadow-amber-500/20"
                        : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    {mode === "short" ? "Short-Circuit" : "Spray Arc"}
                  </button>
                ))}
              </div>
              <p className="text-xs text-zinc-400 mt-2 italic leading-relaxed">{MODE_DESCS[transferMode]}</p>
            </div>

            {/* Reset */}
            <div className="pt-4 border-t border-zinc-700">
              <button
                onClick={() => resetRef.current()}
                className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-3 rounded-lg transition-colors font-semibold border border-zinc-700 hover:border-zinc-600"
              >
                <RefreshCw className="w-4 h-4" />
                Clear Plate / New Weld
              </button>
            </div>
          </div>

          {/* Bead analysis legend */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-700 p-6 shadow-lg flex-grow">
            <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4">
              Bead Quality Guide
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 mt-0.5">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-100">Ideal speed</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed">
                    Travel speed proportional to current. Uniform, well-fused bead.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-red-500/15 flex items-center justify-center text-red-400 mt-0.5">
                  <ZapOff className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-100">Too fast</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed">
                    Narrow bead, risk of lack of fusion and undercut defects.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-yellow-500/15 flex items-center justify-center text-yellow-400 mt-0.5">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-100">Too slow</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed">
                    Excessive penetration, wide bead, and overheating.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
