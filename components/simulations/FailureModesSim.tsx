"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

type FailureMode = "adhesive" | "cohesive-adh" | "cohesive-sub";

const MODE_INFO: Record<FailureMode, { title: string; desc: string; btnLabel: string; color: string }> = {
  adhesive: {
    title: "Adhesive Failure",
    desc: "Bond fails at the adhesive–substrate interface. Often caused by poor surface preparation.",
    btnLabel: "Simulate Adhesive Failure",
    color: "red",
  },
  "cohesive-adh": {
    title: "Cohesive Failure (Adhesive)",
    desc: "The adhesive itself fractures internally. The interface bond is stronger than the adhesive bulk.",
    btnLabel: "Simulate Cohesive (Adhesive) Failure",
    color: "blue",
  },
  "cohesive-sub": {
    title: "Cohesive Failure (Substrate)",
    desc: "The metal substrate fractures outside the joint. The adhesive bond is stronger than the material.",
    btnLabel: "Simulate Substrate Failure",
    color: "emerald",
  },
};

const RESULT_TEXT: Record<FailureMode, string> = {
  adhesive: "Adhesive failure detected. The bond separated cleanly at the interface — the adhesive stays on the bottom substrate, leaving the top bare. Usually undesirable.",
  "cohesive-adh": "Cohesive failure (adhesive). The joint fractured within the adhesive layer. Both substrates retain adhesive — the surface bond was strong, but adhesive bulk strength was the limiting factor.",
  "cohesive-sub": "Cohesive failure (substrate). The adhesive bond held perfectly — the aluminum substrate itself fractured under load. This is the theoretical maximum bond performance.",
};

export function FailureModesSim() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animIdRef = useRef<number>(0);

  const isSimulatingRef = useRef(false);
  const currentModeRef = useRef<FailureMode | null>(null);

  const objectsRef = useRef<{
    bottomSub: THREE.Mesh | null;
    topSubFull: THREE.Mesh | null;
    topSubBrokenBase: THREE.Group | null;
    topSubBrokenFly: THREE.Group | null;
    adhesiveFull: THREE.Mesh | null;
    adhesiveTopHalf: THREE.Mesh | null;
    adhesiveBottomHalf: THREE.Mesh | null;
  }>({
    bottomSub: null, topSubFull: null, topSubBrokenBase: null, topSubBrokenFly: null,
    adhesiveFull: null, adhesiveTopHalf: null, adhesiveBottomHalf: null,
  });

  const [selectedMode, setSelectedMode] = useState<FailureMode | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const resetScene = useCallback(() => {
    isSimulatingRef.current = false;
    setIsSimulating(false);
    setResult(null);
    const o = objectsRef.current;
    if (o.topSubFull) { o.topSubFull.position.set(2.5, 0.7, 0); o.topSubFull.rotation.set(0, 0, 0); }
    if (o.adhesiveTopHalf) o.adhesiveTopHalf.position.set(0, 0.4, 0);
    if (o.topSubBrokenFly) o.topSubBrokenFly.position.set(4.5, 0.7, 0);
    if (o.bottomSub) o.bottomSub.visible = true;
    if (o.topSubFull) o.topSubFull.visible = true;
    if (o.adhesiveFull) o.adhesiveFull.visible = true;
    if (o.adhesiveTopHalf) o.adhesiveTopHalf.visible = false;
    if (o.adhesiveBottomHalf) o.adhesiveBottomHalf.visible = false;
    if (o.topSubBrokenBase) o.topSubBrokenBase.visible = false;
    if (o.topSubBrokenFly) o.topSubBrokenFly.visible = false;
  }, []);

  const triggerFailure = useCallback(() => {
    if (!currentModeRef.current || isSimulatingRef.current) return;
    const o = objectsRef.current;

    // Hide all, then show what's needed
    if (o.topSubFull) o.topSubFull.visible = false;
    if (o.adhesiveFull) o.adhesiveFull.visible = false;
    if (o.adhesiveTopHalf) o.adhesiveTopHalf.visible = false;
    if (o.adhesiveBottomHalf) o.adhesiveBottomHalf.visible = false;
    if (o.topSubBrokenBase) o.topSubBrokenBase.visible = false;
    if (o.topSubBrokenFly) o.topSubBrokenFly.visible = false;

    const mode = currentModeRef.current;
    if (mode === "adhesive") {
      if (o.topSubFull) o.topSubFull.visible = true;
      if (o.adhesiveFull) o.adhesiveFull.visible = true;
    } else if (mode === "cohesive-adh") {
      if (o.topSubFull) o.topSubFull.visible = true;
      if (o.adhesiveTopHalf) o.adhesiveTopHalf.visible = true;
      if (o.adhesiveBottomHalf) o.adhesiveBottomHalf.visible = true;
    } else if (mode === "cohesive-sub") {
      if (o.adhesiveFull) o.adhesiveFull.visible = true;
      if (o.topSubBrokenBase) o.topSubBrokenBase.visible = true;
      if (o.topSubBrokenFly) o.topSubBrokenFly.visible = true;
    }

    isSimulatingRef.current = true;
    setIsSimulating(true);

    setTimeout(() => {
      setResult(RESULT_TEXT[mode]);
    }, 1500);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f4f6);
    scene.fog = new THREE.Fog(0xf3f4f6, 15, 60);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / Math.max(container.clientHeight, 1), 0.1, 100);
    camera.position.set(15, 10, 15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 10, 5);
    dir.castShadow = true;
    scene.add(dir);
    const back = new THREE.DirectionalLight(0xffffff, 0.4);
    back.position.set(-5, 2, -5);
    scene.add(back);

    const matMetal = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4, metalness: 0.8 });
    const matAdh = new THREE.MeshPhysicalMaterial({ color: 0x2563eb, roughness: 0.2, transmission: 0.2, opacity: 0.9, transparent: true });
    const matFractureAdh = new THREE.MeshStandardMaterial({ color: 0x60a5fa, roughness: 1.0 });
    const matFractureMetal = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.9, metalness: 0.3 });

    const subGeo = new THREE.BoxGeometry(8, 0.5, 4);
    const adhGeo = new THREE.BoxGeometry(3, 0.2, 4);
    const adhHalfGeo = new THREE.BoxGeometry(3, 0.1, 4);

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

    // Broken pieces
    const brokenBaseGroup = new THREE.Group();
    const brokenBase = new THREE.Mesh(new THREE.BoxGeometry(4, 0.5, 4), matMetal);
    brokenBaseGroup.add(brokenBase);
    const fracGeo = new THREE.PlaneGeometry(4, 0.5);
    fracGeo.rotateY(Math.PI / 2);
    const fracMesh1 = new THREE.Mesh(fracGeo, matFractureMetal);
    fracMesh1.position.set(2, 0, 0);
    brokenBaseGroup.add(fracMesh1);
    brokenBaseGroup.position.set(0.5, 0.7, 0);
    brokenBaseGroup.visible = false;
    scene.add(brokenBaseGroup);

    const brokenFlyGroup = new THREE.Group();
    const brokenFly = new THREE.Mesh(new THREE.BoxGeometry(4, 0.5, 4), matMetal);
    brokenFlyGroup.add(brokenFly);
    const fracMesh2 = new THREE.Mesh(fracGeo, matFractureMetal);
    fracMesh2.position.set(-2, 0, 0);
    fracMesh2.rotation.y = Math.PI;
    brokenFlyGroup.add(fracMesh2);
    brokenFlyGroup.position.set(4.5, 0.7, 0);
    brokenFlyGroup.visible = false;
    scene.add(brokenFlyGroup);

    objectsRef.current = {
      bottomSub, topSubFull, topSubBrokenBase: brokenBaseGroup, topSubBrokenFly: brokenFlyGroup,
      adhesiveFull, adhesiveTopHalf, adhesiveBottomHalf,
    };

    // Manual orbit controls
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const spherical = new THREE.Spherical();
    const target = new THREE.Vector3(0, 0, 0);
    const v = new THREE.Vector3().copy(camera.position).sub(target);
    spherical.setFromVector3(v);

    const onMouseDown = () => { isDragging = true; };
    const onMouseUp = () => { isDragging = false; };
    const onMouseMove = (e: MouseEvent) => {
      const dx = e.offsetX - prevMouse.x;
      const dy = e.offsetY - prevMouse.y;
      if (isDragging) {
        spherical.theta -= dx * 0.01;
        spherical.phi -= dy * 0.01;
        spherical.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.1, spherical.phi));
        const nv = new THREE.Vector3().setFromSpherical(spherical);
        camera.position.copy(target).add(nv);
        camera.lookAt(target);
      }
      prevMouse = { x: e.offsetX, y: e.offsetY };
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const cv = new THREE.Vector3().copy(camera.position).sub(target);
      let dist = cv.length() + e.deltaY * 0.01;
      dist = Math.max(5, Math.min(30, dist));
      cv.normalize().multiplyScalar(dist);
      camera.position.copy(target).add(cv);
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });

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
      const speed = 0.08;
      const limit = 4.0;
      if (isSimulatingRef.current) {
        const mode = currentModeRef.current;
        const o = objectsRef.current;
        if (mode === "adhesive" && o.topSubFull && o.topSubFull.position.x < 2.5 + limit) {
          o.topSubFull.position.x += speed;
          o.topSubFull.rotation.z = Math.min(0.1, o.topSubFull.rotation.z + 0.002);
        } else if (mode === "cohesive-adh" && o.topSubFull && o.topSubFull.position.x < 2.5 + limit) {
          o.topSubFull.position.x += speed;
          if (o.adhesiveTopHalf) o.adhesiveTopHalf.position.x += speed;
        } else if (mode === "cohesive-sub" && o.topSubBrokenFly && o.topSubBrokenFly.position.x < 4.5 + limit) {
          o.topSubBrokenFly.position.x += speed;
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      renderer.domElement.removeEventListener("mouseup", onMouseUp);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("wheel", onWheel);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  const handleSelectMode = (mode: FailureMode) => {
    currentModeRef.current = mode;
    setSelectedMode(mode);
    resetScene();
  };

  const colorMap = { red: { btn: "bg-red-600 hover:bg-red-700", ring: "ring-red-500", box: "bg-red-50 border-red-400", text: "text-red-700", result: "text-red-600" }, blue: { btn: "bg-blue-600 hover:bg-blue-700", ring: "ring-blue-500", box: "bg-blue-50 border-blue-400", text: "text-blue-700", result: "text-blue-600" }, emerald: { btn: "bg-emerald-600 hover:bg-emerald-700", ring: "ring-emerald-500", box: "bg-emerald-50 border-emerald-400", text: "text-emerald-700", result: "text-emerald-600" } };

  return (
    <div className="mx-auto w-full max-w-7xl px-0 pt-0">
      <div className="absolute inset-0 pointer-events-none flex flex-col md:flex-row" style={{ position: "relative", height: "82vh" }}>
        {/* Sidebar */}
        <div className="pointer-events-auto w-full md:w-80 bg-white/95 backdrop-blur border-r border-slate-200 flex flex-col p-5 overflow-y-auto shadow-xl">
          <h2 className="text-xl font-bold text-slate-800 mb-1">Joint Failure Modes</h2>
          <p className="text-xs text-slate-500 mb-4">Select a failure mode to visualize how the bond breaks under tension.</p>

          {selectedMode && (
            <div className={`mb-4 pl-4 border-l-4 p-3 rounded-r ${colorMap[MODE_INFO[selectedMode].color as keyof typeof colorMap].box}`}>
              <p className={`text-sm font-semibold ${colorMap[MODE_INFO[selectedMode].color as keyof typeof colorMap].text}`}>{MODE_INFO[selectedMode].title}</p>
              <p className="text-xs text-slate-600 mt-1">{MODE_INFO[selectedMode].desc}</p>
            </div>
          )}
          {!selectedMode && (
            <div className="mb-4 pl-4 border-l-4 border-blue-400 bg-blue-50 p-3 rounded-r">
              <p className="text-sm font-semibold text-blue-800">Ready to Test</p>
              <p className="text-xs text-blue-700 mt-1">Select a failure mode below to visualize how the bond breaks under tension.</p>
            </div>
          )}

          <div className="space-y-2 mb-4">
            {(Object.keys(MODE_INFO) as FailureMode[]).map((mode) => {
              const info = MODE_INFO[mode];
              const c = colorMap[info.color as keyof typeof colorMap];
              return (
                <button key={mode} onClick={() => handleSelectMode(mode)}
                  className={`w-full flex items-center p-3 border rounded-lg transition text-left bg-white shadow-sm hover:shadow ${selectedMode === mode ? `ring-2 ring-offset-1 ${c.ring}` : "border-slate-200 hover:border-slate-300"}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 text-sm font-bold ${info.color === "red" ? "bg-red-100 text-red-600" : info.color === "blue" ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"}`}>
                    {mode === "adhesive" ? "A" : mode === "cohesive-adh" ? "C1" : "C2"}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{info.title}</div>
                    <div className="text-xs text-slate-500">{mode === "adhesive" ? "Interfacial separation" : mode === "cohesive-adh" ? "Internal adhesive fracture" : "Substrate material fracture"}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-100 p-3 rounded-lg">
            <button onClick={triggerFailure} disabled={!selectedMode || isSimulating}
              className={`w-full py-2.5 font-bold rounded-lg shadow text-white text-sm transition ${selectedMode && !isSimulating ? `${colorMap[MODE_INFO[selectedMode!].color as keyof typeof colorMap].btn} active:scale-95` : "bg-slate-400 cursor-not-allowed"}`}>
              {isSimulating ? "Simulating…" : selectedMode ? MODE_INFO[selectedMode].btnLabel : "Select a Mode First"}
            </button>
            <button onClick={resetScene} className="w-full mt-2 py-1.5 text-slate-500 hover:text-slate-700 text-xs">Reset Joint</button>
          </div>

          {result && (
            <div className="mt-4 border-t pt-4">
              <h4 className="font-bold text-slate-800 text-sm mb-1">Failure Analysis</h4>
              <p className="text-xs text-slate-600">{result}</p>
            </div>
          )}
        </div>

        {/* 3D Canvas */}
        <div ref={containerRef} className="pointer-events-auto flex-1 relative" style={{ minHeight: 400 }} />

        {/* Legend */}
        <div className="pointer-events-none absolute bottom-3 right-3 bg-black/60 backdrop-blur text-white p-3 rounded-lg text-xs max-w-48 border border-white/10">
          <h4 className="font-bold border-b border-white/20 pb-1 mb-2">Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center"><span className="w-3 h-3 rounded-sm bg-slate-400 mr-2 shrink-0" />Substrates (Al)</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-sm bg-blue-600 mr-2 shrink-0" />Adhesive Layer</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-sm bg-white border border-gray-500 mr-2 shrink-0" />Fracture Surface</div>
          </div>
          <div className="mt-2 pt-2 border-t border-white/20">
            <p>Mouse: Left=Rotate, Scroll=Zoom</p>
          </div>
        </div>
      </div>
    </div>
  );
}
