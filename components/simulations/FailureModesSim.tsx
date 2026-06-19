"use client";

import { useEffect, useRef, useReducer, useCallback, type Dispatch } from "react";
import * as THREE from "three";
import { Layers } from "lucide-react";
import { setupOrbitControls } from "@/lib/useThreeOrbitControls";

// ─── Types ───────────────────────────────────────────────────────────────────

type FailureMode = "adhesive" | "cohesive-adh" | "cohesive-sub";

type SimObjects = {
  bottomSub: THREE.Mesh | null;
  topSubFull: THREE.Mesh | null;
  topSubBrokenBase: THREE.Group | null;
  topSubBrokenFly: THREE.Group | null;
  adhesiveFull: THREE.Mesh | null;
  adhesiveTopHalf: THREE.Mesh | null;
  adhesiveBottomHalf: THREE.Mesh | null;
};

type State = {
  selectedMode: FailureMode | null;
  isSimulating: boolean;
  result: string | null;
  hasInteracted: boolean;
};

type Action =
  | { type: "SELECT"; mode: FailureMode }
  | { type: "SIM_START" }
  | { type: "SIM_DONE"; text: string }
  | { type: "RESET" }
  | { type: "INTERACT" };

// ─── Static data ─────────────────────────────────────────────────────────────

const MODE_INFO: Record<
  FailureMode,
  { title: string; desc: string; btnLabel: string; sub: string; badgeLabel: string; cls: Record<string, string> }
> = {
  adhesive: {
    title: "Adhesive Failure",
    desc: "Bond fails at the adhesive–substrate interface. Often caused by poor surface preparation.",
    btnLabel: "Simulate Adhesive Failure",
    sub: "Interfacial separation",
    badgeLabel: "A",
    cls: {
      btn: "bg-red-600 hover:bg-red-700 active:bg-red-800",
      ring: "ring-red-500",
      box: "bg-red-50 border-red-400",
      text: "text-red-700",
      badge: "bg-red-100 text-red-600",
    },
  },
  "cohesive-adh": {
    title: "Cohesive Failure (Adhesive)",
    desc: "The adhesive itself fractures internally. The interface bond is stronger than the adhesive bulk.",
    btnLabel: "Simulate Cohesive (Adhesive) Failure",
    sub: "Internal adhesive fracture",
    badgeLabel: "C1",
    cls: {
      btn: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
      ring: "ring-blue-500",
      box: "bg-blue-50 border-blue-400",
      text: "text-blue-700",
      badge: "bg-blue-100 text-blue-600",
    },
  },
  "cohesive-sub": {
    title: "Cohesive Failure (Substrate)",
    desc: "The metal substrate fractures outside the joint. The adhesive bond is stronger than the material.",
    btnLabel: "Simulate Substrate Failure",
    sub: "Substrate material fracture",
    badgeLabel: "C2",
    cls: {
      btn: "bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800",
      ring: "ring-emerald-500",
      box: "bg-emerald-50 border-emerald-400",
      text: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-600",
    },
  },
};

const RESULT_TEXT: Record<FailureMode, string> = {
  adhesive:
    "Adhesive failure detected. The bond separated cleanly at the interface — the adhesive stays on the bottom substrate, leaving the top bare. Usually undesirable.",
  "cohesive-adh":
    "Cohesive failure (adhesive). The joint fractured within the adhesive layer. Both substrates retain adhesive — the surface bond was strong, but adhesive bulk strength was the limiting factor.",
  "cohesive-sub":
    "Cohesive failure (substrate). The adhesive bond held perfectly — the aluminum substrate itself fractured under load. This is the theoretical maximum bond performance.",
};

const ANIM_SPEED = 0.08;
const ANIM_LIMIT = 4.0;

// ─── Reducer ─────────────────────────────────────────────────────────────────

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "SELECT":
      return { ...s, selectedMode: a.mode, isSimulating: false, result: null, hasInteracted: true };
    case "SIM_START":
      return { ...s, isSimulating: true };
    case "SIM_DONE":
      // isSimulating intentionally stays true — user must Reset before re-simulating
      return { ...s, result: a.text };
    case "RESET":
      return { ...s, isSimulating: false, result: null };
    case "INTERACT":
      return { ...s, hasInteracted: true };
    default:
      return s;
  }
}

// ─── Sub-component ───────────────────────────────────────────────────────────

function ModeButton({
  mode,
  selected,
  onSelect,
}: {
  mode: FailureMode;
  selected: boolean;
  onSelect: () => void;
}) {
  const info = MODE_INFO[mode];
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center p-3 border rounded-lg transition text-left bg-white shadow-sm hover:shadow min-h-[52px] ${
        selected
          ? `ring-2 ring-offset-1 ${info.cls.ring}`
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 text-sm font-bold shrink-0 ${info.cls.badge}`}
      >
        {info.badgeLabel}
      </div>
      <div>
        <div className="text-sm font-bold text-slate-800">{info.title}</div>
        <div className="text-xs text-slate-500">{info.sub}</div>
      </div>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function FailureModesSim() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animIdRef = useRef<number>(0);
  const isSimulatingRef = useRef(false);
  const currentModeRef = useRef<FailureMode | null>(null);
  const objectsRef = useRef<SimObjects>({
    bottomSub: null,
    topSubFull: null,
    topSubBrokenBase: null,
    topSubBrokenFly: null,
    adhesiveFull: null,
    adhesiveTopHalf: null,
    adhesiveBottomHalf: null,
  });
  const dispatchRef = useRef<Dispatch<Action> | null>(null);

  const [state, dispatch] = useReducer(reducer, {
    selectedMode: null,
    isSimulating: false,
    result: null,
    hasInteracted: false,
  });

  // Keep dispatchRef current so the useEffect closure can dispatch without going stale
  dispatchRef.current = dispatch;

  // ── 3D object reset (no dispatch — caller handles state) ──────────────────
  const reset3DObjects = useCallback(() => {
    isSimulatingRef.current = false;
    const o = objectsRef.current;
    const vis = (m: THREE.Object3D | null, v: boolean) => { if (m) m.visible = v; };

    if (o.topSubFull) { o.topSubFull.position.set(2.5, 0.7, 0); o.topSubFull.rotation.set(0, 0, 0); }
    if (o.adhesiveTopHalf) o.adhesiveTopHalf.position.set(0, 0.4, 0);
    if (o.topSubBrokenFly) o.topSubBrokenFly.position.set(4.5, 0.7, 0);

    vis(o.bottomSub, true);
    vis(o.topSubFull, true);
    vis(o.adhesiveFull, true);
    vis(o.adhesiveTopHalf, false);
    vis(o.adhesiveBottomHalf, false);
    vis(o.topSubBrokenBase, false);
    vis(o.topSubBrokenFly, false);
  }, []);

  const resetScene = useCallback(() => {
    dispatch({ type: "RESET" });
    reset3DObjects();
  }, [reset3DObjects]);

  const triggerFailure = useCallback(() => {
    if (!currentModeRef.current || isSimulatingRef.current) return;
    const o = objectsRef.current;
    const vis = (m: THREE.Object3D | null, v: boolean) => { if (m) m.visible = v; };

    vis(o.topSubFull, false);
    vis(o.adhesiveFull, false);
    vis(o.adhesiveTopHalf, false);
    vis(o.adhesiveBottomHalf, false);
    vis(o.topSubBrokenBase, false);
    vis(o.topSubBrokenFly, false);

    const mode = currentModeRef.current;
    if (mode === "adhesive") {
      vis(o.topSubFull, true);
      vis(o.adhesiveFull, true);
    } else if (mode === "cohesive-adh") {
      vis(o.topSubFull, true);
      vis(o.adhesiveTopHalf, true);
      vis(o.adhesiveBottomHalf, true);
    } else {
      vis(o.adhesiveFull, true);
      vis(o.topSubBrokenBase, true);
      vis(o.topSubBrokenFly, true);
    }

    isSimulatingRef.current = true;
    dispatch({ type: "SIM_START" });
    setTimeout(() => dispatchRef.current?.({ type: "SIM_DONE", text: RESULT_TEXT[mode] }), 1500);
  }, []);

  // ── Three.js scene setup ──────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f4f6);
    scene.fog = new THREE.Fog(0xf3f4f6, 15, 60);

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(15, 10, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.domElement.style.touchAction = "none";
    container.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 10, 5);
    dir.castShadow = true;
    scene.add(dir);
    const back = new THREE.DirectionalLight(0xffffff, 0.4);
    back.position.set(-5, 2, -5);
    scene.add(back);

    // Materials
    const matMetal = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4, metalness: 0.8 });
    const matAdh = new THREE.MeshPhysicalMaterial({
      color: 0x2563eb, roughness: 0.2, transmission: 0.2, opacity: 0.9, transparent: true,
    });
    const matFractureAdh = new THREE.MeshStandardMaterial({ color: 0x60a5fa, roughness: 1.0 });
    const matFractureMetal = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.9, metalness: 0.3 });

    // Geometry
    const subGeo = new THREE.BoxGeometry(8, 0.5, 4);
    const adhGeo = new THREE.BoxGeometry(3, 0.2, 4);
    const adhHalfGeo = new THREE.BoxGeometry(3, 0.1, 4);
    const fracGeo = new THREE.PlaneGeometry(4, 0.5);
    fracGeo.rotateY(Math.PI / 2);

    const bottomSub = new THREE.Mesh(subGeo, matMetal);
    bottomSub.position.set(-2.5, 0, 0);
    bottomSub.castShadow = true;
    scene.add(bottomSub);

    const adhesiveFull = new THREE.Mesh(adhGeo, matAdh);
    adhesiveFull.position.set(0, 0.35, 0);
    adhesiveFull.castShadow = true;
    scene.add(adhesiveFull);

    const adhesiveBottomHalf = new THREE.Mesh(adhHalfGeo, matFractureAdh);
    adhesiveBottomHalf.position.set(0, 0.3, 0);
    adhesiveBottomHalf.visible = false;
    scene.add(adhesiveBottomHalf);

    const adhesiveTopHalf = new THREE.Mesh(adhHalfGeo, matFractureAdh);
    adhesiveTopHalf.position.set(0, 0.4, 0);
    adhesiveTopHalf.visible = false;
    scene.add(adhesiveTopHalf);

    const topSubFull = new THREE.Mesh(subGeo, matMetal);
    topSubFull.position.set(2.5, 0.7, 0);
    topSubFull.castShadow = true;
    scene.add(topSubFull);

    // Broken substrate pieces (cohesive-sub mode)
    const brokenBaseGroup = new THREE.Group();
    const frac1 = new THREE.Mesh(fracGeo, matFractureMetal);
    frac1.position.set(2, 0, 0);
    brokenBaseGroup.add(new THREE.Mesh(new THREE.BoxGeometry(4, 0.5, 4), matMetal), frac1);
    brokenBaseGroup.position.set(0.5, 0.7, 0);
    brokenBaseGroup.visible = false;
    scene.add(brokenBaseGroup);

    const brokenFlyGroup = new THREE.Group();
    const frac2 = new THREE.Mesh(fracGeo, matFractureMetal);
    frac2.position.set(-2, 0, 0);
    frac2.rotation.y = Math.PI;
    brokenFlyGroup.add(new THREE.Mesh(new THREE.BoxGeometry(4, 0.5, 4), matMetal), frac2);
    brokenFlyGroup.position.set(4.5, 0.7, 0);
    brokenFlyGroup.visible = false;
    scene.add(brokenFlyGroup);

    objectsRef.current = {
      bottomSub, topSubFull, topSubBrokenBase: brokenBaseGroup, topSubBrokenFly: brokenFlyGroup,
      adhesiveFull, adhesiveTopHalf, adhesiveBottomHalf,
    };

    // Orbit + touch controls (shared utility)
    const cleanupOrbit = setupOrbitControls(renderer.domElement, camera);

    // Dismiss hint on first canvas interaction
    const onFirstInteract = () => {
      dispatchRef.current?.({ type: "INTERACT" });
      renderer.domElement.removeEventListener("mousedown", onFirstInteract);
      renderer.domElement.removeEventListener("touchstart", onFirstInteract);
    };
    renderer.domElement.addEventListener("mousedown", onFirstInteract);
    renderer.domElement.addEventListener("touchstart", onFirstInteract, { passive: true });

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
      if (isSimulatingRef.current) {
        const mode = currentModeRef.current;
        const o = objectsRef.current;
        if (mode === "adhesive" && o.topSubFull && o.topSubFull.position.x < 2.5 + ANIM_LIMIT) {
          o.topSubFull.position.x += ANIM_SPEED;
          o.topSubFull.rotation.z = Math.min(0.1, o.topSubFull.rotation.z + 0.002);
        } else if (mode === "cohesive-adh" && o.topSubFull && o.topSubFull.position.x < 2.5 + ANIM_LIMIT) {
          o.topSubFull.position.x += ANIM_SPEED;
          if (o.adhesiveTopHalf) o.adhesiveTopHalf.position.x += ANIM_SPEED;
        } else if (mode === "cohesive-sub" && o.topSubBrokenFly && o.topSubBrokenFly.position.x < 4.5 + ANIM_LIMIT) {
          o.topSubBrokenFly.position.x += ANIM_SPEED;
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("mousedown", onFirstInteract);
      renderer.domElement.removeEventListener("touchstart", onFirstInteract);
      cleanupOrbit();
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  const handleSelectMode = (mode: FailureMode) => {
    currentModeRef.current = mode;
    dispatch({ type: "SELECT", mode });
    reset3DObjects();
  };

  const { selectedMode, isSimulating, result, hasInteracted } = state;
  const modeInfo = selectedMode ? MODE_INFO[selectedMode] : null;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-8 pb-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[650px]">

        {/* 3D Viewport */}
        <div className="lg:col-span-2 bg-gray-100 rounded-xl border border-slate-200 shadow-xl overflow-hidden flex flex-col min-h-[300px] sm:min-h-[400px] lg:min-h-0">
          <div
            ref={containerRef}
            className="flex-1 relative"
            style={{ touchAction: "none" }}
          >
            {!hasInteracted && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none z-10">
                <div className="text-center px-4">
                  <Layers className="w-12 h-12 mx-auto mb-2 text-white animate-pulse" />
                  <h3 className="text-xl font-bold text-white">Joint Failure Simulator</h3>
                  <p className="text-slate-200 text-sm mt-1">Drag to rotate · Pinch or scroll to zoom</p>
                </div>
              </div>
            )}
          </div>

          {/* Legend bar */}
          <div className="bg-white/90 px-4 py-2 flex flex-wrap justify-between gap-x-4 text-xs font-mono text-slate-500 border-t border-slate-200">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-400 inline-block" /> Substrates (Al)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-600 inline-block" /> Adhesive Layer
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 border border-slate-400 inline-block" /> Fracture Surface
            </span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4 overflow-y-auto">

          {/* Mode info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-lg">
            <h2 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
              <Layers className="w-5 h-5 text-slate-400" /> Joint Failure Modes
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Select a failure mode to visualize how the bond breaks under tension.
            </p>
            {modeInfo ? (
              <div className={`pl-4 border-l-4 p-3 rounded-r ${modeInfo.cls.box}`}>
                <p className={`text-sm font-semibold ${modeInfo.cls.text}`}>{modeInfo.title}</p>
                <p className="text-xs text-slate-600 mt-1">{modeInfo.desc}</p>
              </div>
            ) : (
              <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 p-3 rounded-r">
                <p className="text-sm font-semibold text-blue-800">Ready to Test</p>
                <p className="text-xs text-blue-700 mt-1">
                  Select a failure mode below to visualize how the bond breaks under tension.
                </p>
              </div>
            )}
          </div>

          {/* Mode selection + action buttons */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-lg">
            <div className="space-y-2 mb-4">
              {(Object.keys(MODE_INFO) as FailureMode[]).map((mode) => (
                <ModeButton
                  key={mode}
                  mode={mode}
                  selected={selectedMode === mode}
                  onSelect={() => handleSelectMode(mode)}
                />
              ))}
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <button
                onClick={triggerFailure}
                disabled={!selectedMode || isSimulating}
                className={`w-full py-3 font-bold rounded-lg shadow text-white text-sm transition min-h-[44px] ${
                  selectedMode && !isSimulating
                    ? `${modeInfo!.cls.btn} active:scale-95`
                    : "bg-slate-400 cursor-not-allowed"
                }`}
              >
                {isSimulating
                  ? "Simulating…"
                  : selectedMode
                  ? modeInfo!.btnLabel
                  : "Select a Mode First"}
              </button>
              <button
                onClick={resetScene}
                className="w-full mt-2 py-2 text-slate-500 hover:text-slate-700 text-xs min-h-[40px]"
              >
                Reset Joint
              </button>
            </div>
          </div>

          {/* Failure analysis result */}
          {result && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-lg">
              <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-400" /> Failure Analysis
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">{result}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
