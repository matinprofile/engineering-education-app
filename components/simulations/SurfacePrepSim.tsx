"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Flame, Sliders } from "lucide-react";

type JointType = "singleV" | "doubleV" | "singleU" | "doubleU" | "square";

const JOINT_CONFIG: Record<JointType, { label: string; description: string; params: string[] }> = {
  singleV: {
    label: "Single V",
    description: "Open V-groove from one side. Used for medium thickness with top-side access.",
    params: ["thickness", "angle", "rootGap", "length"],
  },
  doubleV: {
    label: "Double V (X)",
    description: "X-groove from both sides. Reduces fill volume for thick plates.",
    params: ["thickness", "angle", "rootGap", "length"],
  },
  singleU: {
    label: "Single U",
    description: "Rounded root. Requires less filler metal than V for the same thickness.",
    params: ["thickness", "radius", "length"],
  },
  doubleU: {
    label: "Double U",
    description: "Symmetric U from both sides. For thick plates and costly materials.",
    params: ["thickness", "radius", "length"],
  },
  square: {
    label: "Square (no bevel)",
    description: "Straight faces with root gap. Suitable only for thin plates.",
    params: ["thickness", "rootGap", "length"],
  },
};

function shoelaceArea(pts: THREE.Vector2[]): number {
  let area = 0;
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += pts[i].x * pts[j].y - pts[j].x * pts[i].y;
  }
  return Math.abs(area / 2);
}

function buildJointShapes(
  type: JointType,
  T: number,
  angle: number,
  rootGap: number,
  radius: number
): { shapes: THREE.Shape[]; areaMm2: number } {
  const shapes: THREE.Shape[] = [];
  let areaMm2 = 0;
  const segs = 48;

  if (type === "singleV") {
    const g = Math.max(rootGap, 0.1);
    const alpha = (angle * Math.PI) / 180;
    const wTop = g + 2 * T * Math.tan(alpha / 2);
    const s = new THREE.Shape();
    s.moveTo(-wTop / 2, T);
    s.lineTo(wTop / 2, T);
    s.lineTo(g / 2, 0);
    s.lineTo(-g / 2, 0);
    s.closePath();
    shapes.push(s);
    areaMm2 = (T * (wTop + g)) / 2;
  } else if (type === "doubleV") {
    const g = Math.max(rootGap, 0.1);
    const h = T / 2;
    const alpha = (angle * Math.PI) / 180;
    const wMid = g + 2 * h * Math.tan(alpha / 2);
    const sTop = new THREE.Shape();
    sTop.moveTo(-g / 2, T); sTop.lineTo(g / 2, T);
    sTop.lineTo(wMid / 2, h); sTop.lineTo(-wMid / 2, h);
    sTop.closePath();
    const sBot = new THREE.Shape();
    sBot.moveTo(-wMid / 2, h); sBot.lineTo(wMid / 2, h);
    sBot.lineTo(g / 2, 0); sBot.lineTo(-g / 2, 0);
    sBot.closePath();
    shapes.push(sTop, sBot);
    areaMm2 = h * (g + wMid) / 2 * 2;
  } else if (type === "singleU") {
    const R = Math.min(radius, T - 1);
    const s = new THREE.Shape();
    s.moveTo(-R, T);
    s.lineTo(R, T);
    s.lineTo(R, 0);
    for (let i = 1; i <= segs; i++) {
      const theta = (i / segs) * Math.PI;
      s.lineTo(R * Math.cos(theta), R * Math.sin(theta));
    }
    s.lineTo(-R, 0);
    s.closePath();
    shapes.push(s);
    areaMm2 = shoelaceArea(s.getPoints(segs));
  } else if (type === "doubleU") {
    const maxR = T / 2 - 0.5;
    const R = Math.min(radius, maxR > 0 ? maxR : 0.5);
    const topCY = T - R;
    const botCY = R;
    const s = new THREE.Shape();
    s.moveTo(-R, topCY);
    for (let i = 0; i <= segs; i++) {
      const theta = Math.PI - (i / segs) * Math.PI;
      s.lineTo(R * Math.cos(theta), topCY + R * Math.sin(theta));
    }
    s.lineTo(R, botCY);
    for (let i = 0; i <= segs; i++) {
      const theta = (i / segs) * Math.PI;
      s.lineTo(R * Math.cos(theta), botCY + R * Math.sin(theta));
    }
    s.lineTo(-R, topCY);
    s.closePath();
    shapes.push(s);
    areaMm2 = shoelaceArea(s.getPoints(segs * 2));
  } else {
    const g = Math.max(rootGap, 0.1);
    const s = new THREE.Shape();
    s.moveTo(-g / 2, 0); s.lineTo(g / 2, 0);
    s.lineTo(g / 2, T); s.lineTo(-g / 2, T);
    s.closePath();
    shapes.push(s);
    areaMm2 = g * T;
  }

  return { shapes, areaMm2 };
}

export function SurfacePrepSim() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const weldGroupRef = useRef<THREE.Group | null>(null);
  const animIdRef = useRef<number>(0);

  const [jointType, setJointType] = useState<JointType>("singleV");
  const [thickness, setThickness] = useState(12);
  const [angle, setAngle] = useState(60);
  const [rootGap, setRootGap] = useState(2);
  const [radius, setRadius] = useState(6);
  const [length, setLength] = useState(150);
  const [results, setResults] = useState({ type: "Single V", areaMm2: 0, volumeCm3: 0, massKg: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);

  const updateGeometry = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (weldGroupRef.current) {
      scene.remove(weldGroupRef.current);
      weldGroupRef.current.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
        const mat = (obj as THREE.Mesh).material;
        if (mat) Array.isArray(mat) ? mat.forEach((m) => m.dispose()) : mat.dispose();
      });
    }

    const group = new THREE.Group();
    const { shapes, areaMm2 } = buildJointShapes(jointType, thickness, angle, rootGap, radius);
    const mat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.9, metalness: 0.1, roughness: 0.3 });

    let totalArea = 0;
    shapes.forEach((shape) => {
      const extrudeSettings = { depth: length, bevelEnabled: false };
      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.translate(0, 0, -length / 2);
      const mesh = new THREE.Mesh(geom, mat);
      mesh.castShadow = true;
      group.add(mesh);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geom), new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.4, transparent: true }));
      group.add(edges);
    });
    totalArea = areaMm2;

    const S = 0.05;
    group.scale.set(S, S, S);
    group.position.y = 8;
    scene.add(group);
    weldGroupRef.current = group;

    const volumeCm3 = (totalArea * length) / 1000;
    const massKg = (volumeCm3 * 7.85) / 1000;
    setResults({ type: JOINT_CONFIG[jointType].label, areaMm2: totalArea, volumeCm3, massKg });
  }, [jointType, thickness, angle, rootGap, radius, length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / Math.max(container.clientHeight, 1), 0.1, 1000);
    camera.position.set(60, 50, 70);
    camera.lookAt(0, 10, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(30, 60, 40);
    dir.castShadow = true;
    scene.add(dir);
    scene.add(new THREE.HemisphereLight(0x64748b, 0x020617, 0.6));

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 }));
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);
    const grid = new THREE.GridHelper(200, 20, 0x334155, 0x1f2937);
    grid.position.y = 0.01;
    scene.add(grid);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 10, 0);
    controls.update();
    controlsRef.current = controls;

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
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", onResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => { updateGeometry(); }, [updateGeometry]);

  const clampedRadius = jointType === "doubleU" ? Math.min(radius, Math.max(0.5, thickness / 2 - 0.5)) : Math.min(radius, thickness - 1);
  const params = JOINT_CONFIG[jointType].params;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-8 pb-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[600px]">
        {/* 3D Viewport */}
        <div className="lg:col-span-2 bg-black rounded-xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col relative group min-h-[300px] sm:min-h-[400px] lg:min-h-0">
          <div
            ref={containerRef}
            className="flex-1 relative cursor-grab"
            style={{ background: "#020617", touchAction: "none" }}
            onPointerDown={() => setHasInteracted(true)}
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-black/60 backdrop-blur px-4 py-1.5 rounded-full border border-white/20">
              <span className="font-bold text-sm tracking-widest uppercase text-amber-400">{JOINT_CONFIG[jointType].label}</span>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center bg-black/70 pointer-events-none transition-opacity duration-500 z-10 ${hasInteracted ? "opacity-0" : "group-hover:opacity-0"}`}>
              <div className="text-center px-4">
                <Flame className="w-12 h-12 mx-auto mb-2 text-orange-500 animate-bounce" />
                <h3 className="text-2xl font-bold text-white">Drag to Rotate</h3>
                <p className="text-slate-300 text-sm">Pinch or scroll to zoom.</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 px-4 py-2 flex justify-between text-xs font-mono text-slate-500 border-t border-slate-800">
            <span>3D Cross-Section View</span>
            <span>Units: mm · mm² / cm²</span>
          </div>
        </div>

        {/* Controls + Results */}
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 shadow-lg">
            <h3 className="text-amber-400 font-bold mb-4 flex items-center gap-2 border-b border-slate-700 pb-2 text-sm">
              <Sliders className="w-4 h-4" />
              Joint Parameters
            </h3>

            <div className="mb-3">
              <label className="text-xs font-semibold text-slate-300 block mb-1">Groove Type</label>
              <select
                value={jointType}
                onChange={(e) => setJointType(e.target.value as JointType)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {(Object.keys(JOINT_CONFIG) as JointType[]).map((k) => (
                  <option key={k} value={k}>{JOINT_CONFIG[k].label}</option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 mt-1 italic">{JOINT_CONFIG[jointType].description}</p>
            </div>

            {params.includes("thickness") && (
              <SliderRow label="Plate Thickness" value={thickness} unit="mm" min={4} max={40}
                onChange={(v) => setThickness(v)} />
            )}
            {params.includes("angle") && (
              <SliderRow label="Opening Angle" value={angle} unit="°" min={30} max={90}
                onChange={(v) => setAngle(v)} />
            )}
            {params.includes("rootGap") && (
              <SliderRow label="Root Gap" value={rootGap} unit="mm" min={0} max={6}
                onChange={(v) => setRootGap(v)} />
            )}
            {params.includes("radius") && (
              <SliderRow label="Root Radius (U)" value={Math.min(radius, clampedRadius)} unit="mm"
                min={2} max={Math.floor(clampedRadius)}
                onChange={(v) => setRadius(v)} />
            )}
            {params.includes("length") && (
              <SliderRow label="Joint Length" value={length} unit="mm" min={50} max={300}
                onChange={(v) => setLength(v)} />
            )}
          </div>

          {/* Results */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 shadow-lg flex-grow">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Results</h3>
            <div className="space-y-3 text-sm">
              <ResultRow label="Groove type" value={results.type} color="sky" />
              <ResultRow label="Cross-section area" value={`${results.areaMm2.toFixed(0)} mm²  (${(results.areaMm2 / 100).toFixed(1)} cm²)`} color="emerald" />
              <ResultRow label="Weld metal volume" value={`${results.volumeCm3.toFixed(1)} cm³  for L = ${(length / 10).toFixed(0)} cm`} color="indigo" />
              <ResultRow label="Approx. deposited mass" value={`${results.massKg.toFixed(3)} kg  (steel, ρ = 7.85 g/cm³)`} color="yellow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderRow({ label, value, unit, min, max, onChange }: { label: string; value: number; unit: string; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <label className="text-xs font-semibold text-slate-300">{label}</label>
        <span className="text-xs font-mono text-amber-400">{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
      />
      <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

function ResultRow({ label, value, color }: { label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = { sky: "bg-sky-500/20 text-sky-400", emerald: "bg-emerald-500/20 text-emerald-400", indigo: "bg-indigo-500/20 text-indigo-400", yellow: "bg-yellow-500/20 text-yellow-400" };
  return (
    <div className="flex items-start gap-2">
      <div className={`w-6 h-6 mt-0.5 rounded shrink-0 flex items-center justify-center ${colorMap[color]}`}>
        <span className="text-[10px] font-bold">→</span>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-200">{label}</p>
        <p className="text-[11px] text-slate-400">{value}</p>
      </div>
    </div>
  );
}
