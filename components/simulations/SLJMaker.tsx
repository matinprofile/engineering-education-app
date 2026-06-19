"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ChevronLeft, ChevronRight, RefreshCw, AlertTriangle } from "lucide-react";

const SCALE = 0.5;

type StepState = {
  abraded: boolean;
  cleaned: boolean;
  snapped: boolean;
  mixed: boolean;
  adhesiveApplied: boolean;
  closed: boolean;
  cured: boolean;
};

const STEPS = [
  {
    title: "Step 1 — Prepare substrates",
    instruction:
      'Pick two steel substrates (2 mm × 25 mm × 120 mm). Abrade surfaces with crosshatch sandpaper, then clean with an acetone-soaked paper towel. Do NOT pass the towel twice over the same spot.',
  },
  {
    title: "Step 2 — Set mould & shims",
    instruction:
      "Place substrates in the mould with alignment pins and 0.2 mm spacer shims to create the bondline gap and 25 mm overlap.",
  },
  {
    title: "Step 3 — Mix adhesive",
    instruction:
      "Weigh 10 g resin (A) + 4 g hardener (B). Close container and mix in a centrifugal mixer for 10 seconds.",
  },
  {
    title: "Step 4 — Apply adhesive & assemble",
    instruction:
      "Apply the adhesive to the bottom substrate in the overlap region using a spatula. Lower the top substrate one side first, then the other to allow air to escape. Close the mould.",
  },
  {
    title: "Step 5 — Cure & finish",
    instruction:
      "Cure at room temperature for 24 hours (or use elevated temperature to accelerate). Once cured, remove from mould and trim any excess adhesive.",
  },
];

export function SLJMaker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const animIdRef = useRef<number>(0);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const bottomRef = useRef<THREE.Mesh | null>(null);
  const topRef = useRef<THREE.Mesh | null>(null);
  const adhesiveGroupRef = useRef<THREE.Group | null>(null);
  const shimRef = useRef<THREE.Mesh | null>(null);
  const cureBarRef = useRef<number>(0);

  const [step, setStep] = useState(0);
  const [state, setState] = useState<StepState>({
    abraded: false, cleaned: false, snapped: false,
    mixed: false, adhesiveApplied: false, closed: false, cured: false,
  });
  const [log, setLog] = useState<string[]>(["Simulation started."]);
  const [showLog, setShowLog] = useState(false);
  const [mixing, setMixing] = useState(false);
  const [mixProgress, setMixProgress] = useState(0);
  const [cureProgress, setCureProgress] = useState(0);
  const [curing, setCuring] = useState(false);

  const addLog = useCallback((msg: string) => {
    setLog((prev) => [msg, ...prev.slice(0, 19)]);
  }, []);

  // 3D actions
  const abrade = useCallback(() => {
    const bot = bottomRef.current;
    const top = topRef.current;
    if (!bot || !top) return;
    const mat1 = bot.material as THREE.MeshStandardMaterial;
    const mat2 = top.material as THREE.MeshStandardMaterial;
    mat1.roughness = 0.9; mat1.metalness = 0.2; mat1.needsUpdate = true;
    mat2.roughness = 0.9; mat2.metalness = 0.2; mat2.needsUpdate = true;
    setState((s) => ({ ...s, abraded: true }));
    addLog("Crosshatch abrasion complete. Surfaces roughened.");
  }, [addLog]);

  const clean = useCallback(() => {
    setState((s) => ({ ...s, cleaned: true }));
    addLog("Acetone cleaning complete. Surfaces degreased.");
  }, [addLog]);

  const snapIntoMould = useCallback(() => {
    const bot = bottomRef.current;
    const top = topRef.current;
    const shim = shimRef.current;
    if (!bot || !top) return;
    bot.position.set(-25 * SCALE, 0, 0);
    top.position.set(25 * SCALE, (2 * SCALE + 0.2 * SCALE), 0);
    if (shim) shim.position.set(0, 1.1 * SCALE, 18 * SCALE);
    setState((s) => ({ ...s, snapped: true }));
    addLog("Substrates snapped into mould. 25 mm overlap set.");
  }, [addLog]);

  const removeTopSub = useCallback(() => {
    const top = topRef.current;
    if (!top) return;
    top.position.y += 30 * SCALE;
    addLog("Top substrate removed — ready for adhesive application.");
  }, [addLog]);

  const startMix = useCallback(() => {
    if (mixing) return;
    setMixing(true);
    setMixProgress(0);
    addLog("Centrifugal mixer: 10 s mixing in progress…");
    let t = 0;
    const iv = setInterval(() => {
      t += 1;
      setMixProgress(t * 10);
      if (t >= 10) {
        clearInterval(iv);
        setMixing(false);
        setState((s) => ({ ...s, mixed: true }));
        addLog("Mixing complete — adhesive ready.");
      }
    }, 1000);
  }, [mixing, addLog]);

  const applyAdhesive = useCallback(() => {
    const scene = sceneRef.current;
    const bot = bottomRef.current;
    if (!scene || !bot) return;
    const group = adhesiveGroupRef.current ?? new THREE.Group();
    if (!adhesiveGroupRef.current) {
      scene.add(group);
      adhesiveGroupRef.current = group;
    }
    // Clear previous
    while (group.children.length) {
      const c = group.children[0] as THREE.Mesh;
      c.geometry?.dispose();
      (c.material as THREE.Material)?.dispose();
      group.remove(c);
    }
    // Draw adhesive bead in overlap region
    const r = 1.2 * SCALE;
    const mat = new THREE.MeshStandardMaterial({ color: 0xff7b7b, roughness: 0.6 });
    for (let i = -3; i <= 3; i++) {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.2 * SCALE, 12), mat);
      m.rotation.x = Math.PI / 2;
      m.position.set(i * 2.5 * SCALE, (2 * SCALE + 0.15 * SCALE), 0);
      group.add(m);
    }
    setState((s) => ({ ...s, adhesiveApplied: true }));
    addLog("Adhesive applied on bottom substrate in overlap region.");
  }, [addLog]);

  const lowerTop = useCallback(() => {
    const top = topRef.current;
    if (!top) return;
    top.position.set(25 * SCALE, (2 * SCALE + 0.2 * SCALE), 0);
    addLog("Top substrate lowered. Air escaped from one side first.");
  }, [addLog]);

  const closeMould = useCallback(() => {
    setState((s) => ({ ...s, closed: true }));
    addLog("Mould closed. Curing can begin.");
  }, [addLog]);

  const startCure = useCallback(() => {
    if (curing) return;
    setCuring(true);
    setCureProgress(0);
    addLog("Curing started…");
    let t = 0;
    const iv = setInterval(() => {
      t += 5;
      setCureProgress(Math.min(t, 100));
      if (t >= 100) {
        clearInterval(iv);
        setCuring(false);
        setState((s) => ({ ...s, cured: true }));
        addLog("Joint fully cured! Remove from mould.");
      }
    }, 200);
  }, [curing, addLog]);

  const resetAll = useCallback(() => {
    const bot = bottomRef.current;
    const top = topRef.current;
    const group = adhesiveGroupRef.current;
    const scene = sceneRef.current;
    if (bot) {
      bot.position.set(0, 0, 0);
      (bot.material as THREE.MeshStandardMaterial).roughness = 0.4;
      (bot.material as THREE.MeshStandardMaterial).metalness = 0.8;
      (bot.material as THREE.MeshStandardMaterial).needsUpdate = true;
    }
    if (top) {
      top.position.set(0, (8 * SCALE + 0.2 * SCALE), 0);
      (top.material as THREE.MeshStandardMaterial).roughness = 0.4;
      (top.material as THREE.MeshStandardMaterial).metalness = 0.8;
      (top.material as THREE.MeshStandardMaterial).needsUpdate = true;
    }
    if (group && scene) {
      scene.remove(group);
      adhesiveGroupRef.current = null;
    }
    setStep(0);
    setState({ abraded: false, cleaned: false, snapped: false, mixed: false, adhesiveApplied: false, closed: false, cured: false });
    setLog(["Simulation reset."]);
    setMixProgress(0);
    setCureProgress(0);
    setCuring(false);
    setMixing(false);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x071028);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / Math.max(container.clientHeight, 1), 0.1, 2000);
    camera.position.set(0, 80, 260);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x071028);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.domElement.style.touchAction = "none";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    scene.add(new THREE.DirectionalLight(0xffffff, 1).position.set(50, 100, 50) && new THREE.DirectionalLight(0xffffff, 1));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(50, 100, 50);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    // Floor
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(600, 400), new THREE.MeshStandardMaterial({ color: 0x031528, side: THREE.DoubleSide }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    scene.add(floor);

    // Substrates
    const subMat = () => new THREE.MeshStandardMaterial({ color: 0x8b949e, metalness: 0.8, roughness: 0.4 });
    const W = 25 * SCALE, L = 120 * SCALE, T = 2 * SCALE;
    const subGeo = new THREE.BoxGeometry(L, T, W);

    const bottom = new THREE.Mesh(subGeo, subMat());
    bottom.rotation.x = Math.PI / 2;
    bottom.position.set(0, 0, 0);
    scene.add(bottom);
    bottomRef.current = bottom;

    const top = new THREE.Mesh(subGeo, subMat());
    top.rotation.x = Math.PI / 2;
    top.position.set(0, 8 * SCALE + 0.2 * SCALE, 0);
    scene.add(top);
    topRef.current = top;

    // Mould
    const mouldMat = new THREE.MeshStandardMaterial({ color: 0x0b2a3a, metalness: 0.2, roughness: 0.6 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(160 * SCALE, 6 * SCALE, 80 * SCALE), mouldMat);
    base.position.y = -3 * SCALE;
    scene.add(base);

    const pinMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db });
    const addPin = (x: number, z: number) => {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(1.5 * SCALE, 1.5 * SCALE, 18 * SCALE, 12), pinMat);
      p.rotation.x = Math.PI / 2;
      p.position.set(x, 2 * SCALE, z);
      scene.add(p);
    };
    addPin(-40 * SCALE, -12 * SCALE);
    addPin(-40 * SCALE, 12 * SCALE);
    addPin(40 * SCALE, -12 * SCALE);
    addPin(40 * SCALE, 12 * SCALE);

    // Shim
    const shim = new THREE.Mesh(new THREE.BoxGeometry(10 * SCALE, 0.2 * SCALE, 6 * SCALE), new THREE.MeshStandardMaterial({ color: 0xffcc66 }));
    shim.position.set(0, 2 * SCALE + 0.1 * SCALE, 18 * SCALE);
    scene.add(shim);
    shimRef.current = shim;

    // Spatula
    const spatula = new THREE.Mesh(new THREE.BoxGeometry(6 * SCALE, 1 * SCALE, 28 * SCALE), new THREE.MeshStandardMaterial({ color: 0x997a5a }));
    spatula.position.set(-90 * SCALE, 30 * SCALE, -40 * SCALE);
    scene.add(spatula);

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

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goTo = (n: number) => setStep(Math.max(0, Math.min(4, n)));

  return (
    <div className="mx-auto w-full max-w-7xl px-0 pt-0">
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", height: isMobile ? "auto" : "82vh", position: "relative" }}>
        {/* Sidebar */}
        <div style={{ width: isMobile ? "100%" : 360, flexShrink: 0, background: "#071028", borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.06)", borderTop: isMobile ? "1px solid rgba(255,255,255,0.06)" : "none", display: "flex", flexDirection: "column", padding: isMobile ? "16px 16px 28px" : 16, overflowY: isMobile ? "visible" : "auto", order: isMobile ? 1 : undefined }}>
          <h2 style={{ color: "#e6eef8", fontSize: isMobile ? 17 : 16, fontWeight: 700, margin: "0 0 4px" }}>Single-Lap Joint — Step by Step</h2>
          <p style={{ color: "#6b7280", fontSize: isMobile ? 13 : 12, margin: "0 0 12px" }}>Assemble an adhesive single-lap joint (steel substrates).</p>

          {/* Steps list */}
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px" }}>
            {STEPS.map((s, i) => (
              <li key={i} onClick={() => goTo(i)}
                style={{ padding: "10px 12px", minHeight: 44, borderRadius: 8, marginBottom: 6, cursor: "pointer", touchAction: "manipulation",
                  background: i === step ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.02)",
                  border: i === step ? "1px solid rgba(37,99,235,0.3)" : "1px solid transparent",
                  display: "flex", alignItems: "center" }}>
                <div style={{ color: "#e6eef8", fontSize: 13, fontWeight: 600 }}>{s.title}</div>
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <button onClick={() => goTo(step - 1)} disabled={step === 0}
              style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)", color: "#9ca3af", padding: isMobile ? "10px 14px" : "6px 10px", minHeight: 44, borderRadius: 8, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, touchAction: "manipulation" }}>
              <ChevronLeft size={14} /> Prev
            </button>
            <button onClick={() => goTo(step + 1)} disabled={step === 4}
              style={{ flex: 1, background: "#2563eb", border: "none", color: "white", padding: isMobile ? "10px 14px" : "6px 10px", minHeight: 44, borderRadius: 8, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, touchAction: "manipulation" }}>
              Next <ChevronRight size={14} />
            </button>
            <button onClick={resetAll}
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)", color: "#9ca3af", padding: isMobile ? "10px 14px" : "6px 10px", minHeight: 44, minWidth: 44, borderRadius: 8, cursor: "pointer", fontSize: 13, touchAction: "manipulation" }}>
              <RefreshCw size={14} />
            </button>
          </div>

          {/* Step content */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ color: "#e6eef8", fontSize: isMobile ? 14 : 13, fontWeight: 600, marginBottom: 4 }}>{STEPS[step].title}</div>
            <div style={{ color: "#cbd5e1", fontSize: isMobile ? 13 : 12, background: "rgba(255,255,255,0.02)", padding: 8, borderRadius: 6, maxHeight: isMobile ? undefined : 140, overflowY: isMobile ? "visible" : "auto", lineHeight: 1.7 }}>
              {STEPS[step].instruction}
            </div>
          </div>

          {/* Step-specific actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
            {step === 0 && (
              <>
                <ActionBtn onClick={abrade} done={state.abraded} label="Start crosshatch abrasion" />
                <ActionBtn onClick={clean} done={state.cleaned} label="Use acetone towel" ghost />
                {state.cleaned && <div style={{ color: "#9ae6b4", fontSize: 12 }}>Both surfaces ready.</div>}
              </>
            )}
            {step === 1 && (
              <>
                <ActionBtn onClick={snapIntoMould} done={state.snapped} label="Snap substrates into mould" />
                <ActionBtn onClick={removeTopSub} done={false} label="Remove top substrate" ghost />
              </>
            )}
            {step === 2 && (
              <>
                <ActionBtn onClick={startMix} done={state.mixed} disabled={mixing} label={mixing ? `Mixing… ${mixProgress}%` : "Mix adhesive (10 s)"} />
                {(mixing || state.mixed) && (
                  <div style={{ background: "#05203a", borderRadius: 6, overflow: "hidden", height: 8 }}>
                    <div style={{ height: "100%", background: "linear-gradient(90deg,#34d399,#60a5fa)", width: `${mixProgress}%`, transition: "width 0.3s" }} />
                  </div>
                )}
              </>
            )}
            {step === 3 && (
              <>
                <ActionBtn onClick={applyAdhesive} done={state.adhesiveApplied} label="Apply adhesive (paint on substrate)" />
                <ActionBtn onClick={lowerTop} done={false} label="Lower top substrate" ghost />
                <ActionBtn onClick={closeMould} done={state.closed} label="Close mould (start cure)" />
              </>
            )}
            {step === 4 && (
              <>
                <ActionBtn onClick={startCure} done={state.cured} disabled={curing} label={curing ? `Curing… ${cureProgress}%` : "Start curing simulation"} />
                {(curing || state.cured) && (
                  <div style={{ background: "#05203a", borderRadius: 6, overflow: "hidden", height: 8 }}>
                    <div style={{ height: "100%", background: "linear-gradient(90deg,#34d399,#60a5fa)", width: `${cureProgress}%`, transition: "width 0.1s" }} />
                  </div>
                )}
                {state.cured && <div style={{ color: "#9ae6b4", fontSize: 12 }}>Joint cured — finished!</div>}
              </>
            )}
          </div>

          {/* Adhesive mix info */}
          <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>
            <div style={{ marginBottom: 4, fontWeight: 600 }}>Adhesive mix</div>
            <div>Resin A: <strong style={{ color: "#e6eef8" }}>10 g</strong></div>
            <div>Hardener B: <strong style={{ color: "#e6eef8" }}>4 g</strong></div>
          </div>

          {/* Log */}
          <div style={{ fontSize: 12, color: "#9ca3af" }}>
            <button onClick={() => setShowLog((v) => !v)}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#9ca3af", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0, marginBottom: 4 }}>
              Simulation log
              <span style={{ fontSize: 10 }}>{showLog ? "▲" : "▼"}</span>
            </button>
            {(!isMobile || showLog) && (
              <div style={{ fontSize: 11, color: "#cbd5e1", maxHeight: 120, overflowY: "auto", background: "rgba(255,255,255,0.02)", borderRadius: 6, padding: 8 }}>
                {log.map((entry, i) => <div key={i} style={{ marginBottom: 4 }}>{entry}</div>)}
              </div>
            )}
          </div>

          <div style={{ marginTop: "auto", paddingTop: 8, fontSize: 11, color: "#6b7280", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            This is a simulation — not a substitute for lab training. Handle acetone and adhesives safely (ventilation, PPE).
          </div>
        </div>

        {/* 3D Canvas */}
        <div ref={containerRef} style={{ flex: 1, height: isMobile ? 280 : undefined, minHeight: isMobile ? 280 : undefined, position: "relative", touchAction: "none", order: isMobile ? 0 : undefined }}>
          <div style={{ position: "absolute", left: 12, bottom: 12, background: "rgba(3,7,18,0.7)", padding: 10, borderRadius: 8, fontSize: 12, color: "#cbd5e1", zIndex: 10 }}>
            {isMobile ? "Drag to rotate · Pinch to zoom" : "Rotate / Zoom: mouse. Use action buttons in the sidebar."}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ onClick, done, label, ghost, disabled }: { onClick: () => void; done: boolean; label: string; ghost?: boolean; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={done || disabled}
      style={{
        background: done ? "rgba(34,197,94,0.15)" : ghost ? "transparent" : "#2563eb",
        border: done ? "1px solid rgba(34,197,94,0.3)" : ghost ? "1px solid rgba(255,255,255,0.06)" : "none",
        color: done ? "#9ae6b4" : ghost ? "#9ca3af" : "white",
        padding: "10px 14px", minHeight: 44, borderRadius: 8, cursor: done || disabled ? "default" : "pointer",
        fontSize: 13, textAlign: "left", opacity: disabled && !done ? 0.7 : 1,
        display: "flex", alignItems: "center", gap: 6, touchAction: "manipulation",
      }}>
      {done && <span>✓</span>}
      {label}
    </button>
  );
}
