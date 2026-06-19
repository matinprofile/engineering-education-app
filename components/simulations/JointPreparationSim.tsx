"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Layers, Settings2, RotateCcw } from "lucide-react";

type JointShape = "V" | "X" | "U" | "DU";

interface Params {
  T: number;  // Thickness
  b: number;  // Gap
  c: number;  // Land/Root Face
  a: number;  // Angle (degrees)
  r: number;  // Radius (for U)
}

export function JointPreparationSim() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const [currentShape, setCurrentShape] = useState<JointShape>("V");
  const [params, setParams] = useState<Params>({
    T: 10,
    b: 2,
    c: 2,
    a: 30,
    r: 6,
  });
  const [area, setArea] = useState(0);
  const [weight, setWeight] = useState(0);

  // Handle parameter changes
  const updateParam = (key: keyof Params, value: number) => {
    setParams((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === "c" && updated.c > updated.T) {
        updated.c = updated.T;
      }
      return updated;
    });
  };

  // Calculate weld volume and weight
  const calculateArea = () => {
    const t = params.T;
    const b = params.b;
    const c = params.c;
    const rad = params.a * (Math.PI / 180);
    let calculatedArea = 0;

    if (currentShape === "V") {
      const rectArea = b * t;
      const h_tri = Math.max(0, t - c);
      const w_tri = h_tri * Math.tan(rad);
      calculatedArea = rectArea + h_tri * w_tri;
    } else if (currentShape === "X") {
      const rectArea = b * t;
      const h_tri = Math.max(0, t / 2 - c / 2);
      const w_tri = h_tri * Math.tan(rad);
      calculatedArea = rectArea + 2 * w_tri * h_tri;
    } else if (currentShape === "U" || currentShape === "DU") {
      const R = params.r;
      const rectArea = b * t;
      const cornerArea = R * R - (Math.PI * R * R) / 4;
      const flareHeight = Math.max(0, t - c - R);
      const rectExtensionArea = 2 * (R * flareHeight);
      const bevelArea = flareHeight * (flareHeight * Math.tan(rad));

      calculatedArea = rectArea + cornerArea + rectExtensionArea + bevelArea;

      if (currentShape === "DU") {
        const halfT = t / 2;
        const halfC = c / 2;
        const h_f = Math.max(0, halfT - halfC - R);
        const cArea = 2 * (R * R - (Math.PI * R * R) / 4);
        const rExt = 2 * (R * h_f);
        const bArea = h_f * (h_f * Math.tan(rad));
        calculatedArea = b * t + 2 * (cArea + rExt + bArea);
      }
    }

    setArea(calculatedArea);
    const calculatedWeight = (calculatedArea * 7.85) / 1000;
    setWeight(calculatedWeight);
  };

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e293b);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      1000
    );
    camera.position.set(0, 5, 40);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 20);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(-10, 10, -20);
    scene.add(backLight);

    // Grid helper
    const gridHelper = new THREE.GridHelper(100, 50, 0x334155, 0x1e293b);
    gridHelper.position.y = -10;
    scene.add(gridHelper);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const width = container.clientWidth;
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  // Update geometry when parameters change
  useEffect(() => {
    calculateArea();
    updateGeometry();
  }, [currentShape, params]);

  // Update 3D geometry
  const updateGeometry = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

    const scene = sceneRef.current;

    // Clear previous meshes
    scene.children = scene.children.filter(
      (child) => !(child instanceof THREE.Mesh || child instanceof THREE.Group)
    );

    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.4,
      metalness: 0.6,
      side: THREE.DoubleSide,
    });

    const weldMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.5,
      emissive: 0xf97316,
      emissiveIntensity: 0.2,
      side: THREE.DoubleSide,
    });

    const width = 20;
    const length = 40;
    const halfGap = params.b / 2;
    const t = params.T;
    const land = Math.min(params.c, t);
    const angleRad = params.a * (Math.PI / 180);

    // Create weld and steel shapes
    const shape = new THREE.Shape();
    const weldShape = new THREE.Shape();

    if (currentShape === "V") {
      shape.moveTo(halfGap, 0);
      shape.lineTo(halfGap, land);
      const topX = halfGap + (t - land) * Math.tan(angleRad);
      shape.lineTo(topX, t);
      shape.lineTo(width + halfGap, t);
      shape.lineTo(width + halfGap, 0);
      shape.lineTo(halfGap, 0);

      weldShape.moveTo(0, 0);
      weldShape.lineTo(halfGap, 0);
      weldShape.lineTo(halfGap, land);
      weldShape.lineTo(topX, t);
      weldShape.lineTo(0, t);
      weldShape.lineTo(0, 0);
    } else if (currentShape === "X") {
      const mid = t / 2;
      const halfLand = land / 2;

      shape.moveTo(halfGap, mid - halfLand);
      const topX = halfGap + (mid - halfLand) * Math.tan(angleRad);
      shape.lineTo(topX, t);
      shape.lineTo(width + halfGap, t);
      shape.lineTo(width + halfGap, 0);
      shape.lineTo(topX, 0);
      shape.lineTo(halfGap, mid + halfLand);
      shape.lineTo(halfGap, mid - halfLand);

      weldShape.moveTo(0, 0);
      weldShape.lineTo(topX, 0);
      weldShape.lineTo(halfGap, mid + halfLand);
      weldShape.lineTo(halfGap, mid - halfLand);
      weldShape.lineTo(topX, t);
      weldShape.lineTo(0, t);
      weldShape.lineTo(0, 0);
    } else if (currentShape === "U" || currentShape === "DU") {
      const R = params.r;

      if (currentShape === "U") {
        const endRy = land + R;
        const endRx = halfGap + R;

        shape.moveTo(halfGap, 0);
        shape.lineTo(halfGap, land);
        shape.bezierCurveTo(
          halfGap,
          land + R * 0.5,
          halfGap + R * 0.5,
          endRy,
          endRx,
          endRy
        );

        const hRemaining = t - endRy;
        if (hRemaining > 0) {
          const dx = hRemaining * Math.tan(angleRad);
          shape.lineTo(endRx + dx, t);
        }

        shape.lineTo(width + halfGap, t);
        shape.lineTo(width + halfGap, 0);
        shape.lineTo(halfGap, 0);

        weldShape.moveTo(0, 0);
        weldShape.lineTo(halfGap, 0);
        weldShape.lineTo(halfGap, land);
        weldShape.bezierCurveTo(
          halfGap,
          land + R * 0.5,
          halfGap + R * 0.5,
          endRy,
          endRx,
          endRy
        );
        if (hRemaining > 0) {
          const dx = hRemaining * Math.tan(angleRad);
          weldShape.lineTo(endRx + dx, t);
        }
        weldShape.lineTo(0, t);
        weldShape.lineTo(0, 0);
      } else {
        // DU (Double U)
        const mid = t / 2;
        const halfLand = land / 2;
        const endRy = mid + halfLand + R;
        const endRx = halfGap + R;

        shape.moveTo(halfGap, mid - halfLand);
        shape.bezierCurveTo(
          halfGap,
          mid + halfLand + R * 0.5,
          halfGap + R * 0.5,
          endRy,
          endRx,
          endRy
        );

        const hRemTop = t - endRy;
        if (hRemTop > 0) {
          shape.lineTo(endRx + hRemTop * Math.tan(angleRad), t);
        }

        shape.lineTo(width + halfGap, t);
        shape.lineTo(width + halfGap, 0);

        const endRyBot = mid - halfLand - R;
        const hRemBot = endRyBot;
        if (hRemBot > 0) {
          shape.lineTo(endRx + hRemBot * Math.tan(angleRad), 0);
        }

        shape.lineTo(endRx, endRyBot);
        shape.bezierCurveTo(
          endRx,
          endRyBot,
          halfGap + R * 0.5,
          mid - halfLand - R,
          halfGap,
          mid - halfLand
        );

        weldShape.moveTo(0, 0);
        if (hRemBot > 0) {
          weldShape.lineTo(endRx + hRemBot * Math.tan(angleRad), 0);
        }
        weldShape.lineTo(endRx, endRyBot);
        weldShape.bezierCurveTo(
          endRx,
          endRyBot,
          halfGap + R * 0.5,
          mid - halfLand - R,
          halfGap,
          mid - halfLand
        );
        weldShape.lineTo(halfGap, mid + halfLand);
        weldShape.bezierCurveTo(
          halfGap,
          mid + halfLand + R * 0.5,
          halfGap + R * 0.5,
          endRy,
          endRx,
          endRy
        );
        if (hRemTop > 0) {
          weldShape.lineTo(endRx + hRemTop * Math.tan(angleRad), t);
        }
        weldShape.lineTo(0, t);
      }
    }

    const extrudeSettings = { steps: 1, depth: length, bevelEnabled: false };

    // Create right plate
    const rightGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const rightPlate = new THREE.Mesh(rightGeo, steelMat);
    rightPlate.position.z = -length / 2;
    scene.add(rightPlate);

    // Create left plate (mirrored)
    const leftGeo = rightGeo.clone();
    const leftPlate = new THREE.Mesh(leftGeo, steelMat);
    leftPlate.scale.x = -1;
    leftPlate.position.z = -length / 2;
    scene.add(leftPlate);

    // Create weld volume
    const weldGeo = new THREE.ExtrudeGeometry(weldShape, extrudeSettings);
    const volRight = new THREE.Mesh(weldGeo, weldMat);
    volRight.position.z = -length / 2;

    const volLeft = volRight.clone();
    volLeft.scale.x = -1;

    const weldVolume = new THREE.Group();
    weldVolume.add(volRight);
    weldVolume.add(volLeft);
    scene.add(weldVolume);

    // Center geometry
    const yOffset = -t / 2;
    rightPlate.position.y = yOffset;
    leftPlate.position.y = yOffset;
    weldVolume.position.y = yOffset;
  };

  const resetCamera = (view: "front" | "iso") => {
    if (!cameraRef.current || !controlsRef.current) return;
    if (view === "front") {
      cameraRef.current.position.set(0, 0, 50);
    } else {
      cameraRef.current.position.set(25, 25, 40);
    }
    cameraRef.current.lookAt(0, 0, 0);
    controlsRef.current.reset();
  };

  return (
    <div className="w-full h-auto lg:h-[700px] flex flex-col lg:grid lg:grid-cols-3 gap-6">
      {/* 3D Visualization */}
      <div className="lg:col-span-2 bg-black rounded-xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col relative h-[400px] sm:h-[500px] lg:h-full">
        <div ref={containerRef} className="flex-1 relative w-full">
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex gap-2 z-10">
            <button
              onClick={() => resetCamera("front")}
              className="bg-slate-700/80 hover:bg-slate-600 p-2 rounded text-xs text-white backdrop-blur transition-colors"
            >
              Front View
            </button>
            <button
              onClick={() => resetCamera("iso")}
              className="bg-slate-700/80 hover:bg-slate-600 p-2 rounded text-xs text-white backdrop-blur transition-colors"
            >
              Perspective
            </button>
          </div>
        </div>

        <div className="bg-slate-900 p-2 flex justify-between px-3 sm:px-4 text-xs font-mono text-slate-500 border-t border-slate-800 overflow-x-auto">
          <span className="whitespace-nowrap">Material: Carbon Steel</span>
          <span className="whitespace-nowrap">Density: 7.85 g/cm³</span>
        </div>
      </div>

      {/* Controls Panel */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        {/* Joint Type Selection */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 sm:p-5 shadow-lg">
          <h3 className="text-blue-400 font-bold mb-3 sm:mb-4 flex items-center gap-2 border-b border-slate-700 pb-2 text-sm sm:text-base">
            <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            Joint Type
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {["V", "X", "U", "DU"].map((type) => (
              <button
                key={type}
                onClick={() => setCurrentShape(type as JointShape)}
                className={`p-2 sm:p-3 rounded font-bold border transition-all text-sm sm:text-base ${
                  currentShape === type
                    ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                    : "bg-slate-700 text-slate-400 border-slate-600 hover:bg-slate-600"
                }`}
              >
                {type === "DU" ? "Double U" : `${type} Joint`}
              </button>
            ))}
          </div>
        </div>

        {/* Parameters */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 sm:p-5 shadow-lg flex-grow overflow-y-auto">
          <h3 className="text-orange-400 font-bold mb-3 sm:mb-4 flex items-center gap-2 border-b border-slate-700 pb-2 text-sm sm:text-base">
            <Settings2 className="w-4 h-4 sm:w-5 sm:h-5" />
            Geometric Parameters
          </h3>

          <div className="space-y-4 sm:space-y-5">
            {/* Thickness */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs sm:text-sm font-semibold text-slate-300">
                  Plate Thickness (T)
                </label>
                <span className="text-xs sm:text-sm font-mono text-orange-400">
                  {params.T.toFixed(1)} mm
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={params.T}
                onChange={(e) => updateParam("T", parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg accent-orange-500 cursor-pointer"
              />
            </div>

            {/* Gap */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs sm:text-sm font-semibold text-slate-300">
                  Root Gap (b)
                </label>
                <span className="text-xs sm:text-sm font-mono text-orange-400">
                  {params.b.toFixed(1)} mm
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={params.b}
                onChange={(e) => updateParam("b", parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg accent-orange-500 cursor-pointer"
              />
            </div>

            {/* Land */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs sm:text-sm font-semibold text-slate-300">
                  Root Face (c)
                </label>
                <span className="text-xs sm:text-sm font-mono text-orange-400">
                  {params.c.toFixed(1)} mm
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={params.c}
                onChange={(e) => updateParam("c", parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg accent-orange-500 cursor-pointer"
              />
            </div>

            {/* Angle */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs sm:text-sm font-semibold text-slate-300">
                  Bevel Angle (α)
                </label>
                <span className="text-xs sm:text-sm font-mono text-orange-400">
                  {params.a.toFixed(0)}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="1"
                value={params.a}
                onChange={(e) => updateParam("a", parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg accent-orange-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-500 text-right mt-1">
                *Angle per side (Total = 2α)
              </p>
            </div>

            {/* Radius (only for U and DU) */}
            {(currentShape === "U" || currentShape === "DU") && (
              <div className="opacity-100 transition-all">
                <div className="flex justify-between mb-1">
                  <label className="text-xs sm:text-sm font-semibold text-slate-300">
                    Curve Radius (R)
                  </label>
                  <span className="text-xs sm:text-sm font-mono text-orange-400">
                    {params.r.toFixed(1)} mm
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="15"
                  step="0.5"
                  value={params.r}
                  onChange={(e) => updateParam("r", parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg accent-orange-500 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl border border-blue-900/50 p-4 sm:p-5 shadow-lg">
          <h3 className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3">
            Volume Calculation
          </h3>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
              <p className="text-[10px] text-slate-400 uppercase">Cross-sectional Area</p>
              <p className="text-xl sm:text-2xl font-bold text-white">
                {area.toFixed(1)} <span className="text-xs sm:text-sm font-normal text-slate-500">mm²</span>
              </p>
            </div>
            <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
              <p className="text-[10px] text-slate-400 uppercase">Estimated Weight (1m)</p>
              <p className="text-xl sm:text-2xl font-bold text-green-400">
                {weight.toFixed(2)} <span className="text-xs sm:text-sm font-normal text-slate-500">kg</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
