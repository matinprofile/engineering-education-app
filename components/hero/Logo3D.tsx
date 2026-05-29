"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Bar configs ───────────────────────────────────────────────────────────────
const BARS = [
  { x: -0.295, h: 0.220 },
  { x: -0.177, h: 0.300 },
  { x: -0.059, h: 0.392 },
  { x:  0.059, h: 0.480 },
  { x:  0.177, h: 0.585 },
  { x:  0.295, h: 0.700 },
];

const BAR_W    = 0.074;
const BAR_D    = 0.124;
const BAR_LEAN = -Math.PI / 6;
const BASE_Y   = -0.255;

// ── Seeded pseudo-random (deterministic, no Math.random at module level) ──────
function rng(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// ── Floating patch configs ────────────────────────────────────────────────────
const PATCH_COUNT = 22;
const PATCH_CONFIGS = Array.from({ length: PATCH_COUNT }, (_, i) => ({
  x:         (rng(i * 3)      - 0.5) * 1.9,
  y:         (rng(i * 3 + 1)  - 0.5) * 1.5,
  z:         (rng(i * 3 + 2)  - 0.5) * 1.1,
  size:      0.035 + rng(i * 7)  * 0.095,
  segs:      rng(i * 11) < 0.45 ? 2 : 3,
  tension:   rng(i * 5),
  rx:        (rng(i * 13) - 0.5) * 0.55,
  ry:        (rng(i * 17) - 0.5) * 0.55,
  rz:        (rng(i * 19) - 0.5) * 0.45,
  phase:     rng(i * 23) * Math.PI * 2,
  driftAmp:  0.018 + rng(i * 29) * 0.032,
  driftFreq: 0.22  + rng(i * 31) * 0.44,
}));

// ── Tension colormap: dark olive → amber → accent red ────────────────────────
function tensionHex(t: number): string {
  const s = Math.max(0, Math.min(1, t));
  let r, g, b: number;
  if (s < 0.5) {
    const f = s * 2;
    r = Math.round(48  + (185 - 48)  * f);
    g = Math.round(68  + (90  - 68)  * f);
    b = Math.round(44  + (28  - 44)  * f);
  } else {
    const f = (s - 0.5) * 2;
    r = Math.round(185 + (245 - 185) * f);
    g = Math.round(90  + (45  - 90)  * f);
    b = Math.round(28  + (18  - 28)  * f);
  }
  return `rgb(${r},${g},${b})`;
}


// ── FEM box: vertex-color gradient fill + WireframeGeometry triangle grid ─────
function FEMBox({ w, h, d, barTension, color, segsY = 6 }: {
  w: number; h: number; d: number;
  barTension: number; color?: string; segsY?: number;
}) {
  const { meshGeo, wireGeo } = useMemo(() => {
    const geo = new THREE.BoxGeometry(w, h, d, 2, segsY, 2);
    return { meshGeo: geo, wireGeo: new THREE.WireframeGeometry(geo) };
  }, [w, h, d, segsY]);

  const col = color ?? tensionHex(barTension);

  return (
    <>
      <mesh geometry={meshGeo}>
        <meshStandardMaterial
          color={col}
          transparent opacity={0.55}
          depthWrite={false} side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments geometry={wireGeo}>
        <lineBasicMaterial color={col} transparent opacity={0.44} />
      </lineSegments>
    </>
  );
}

// ── FEM tube: fill + WireframeGeometry triangle grid ─────────────────────────
function FEMTube({ curve, color }: {
  curve: THREE.CatmullRomCurve3;
  color: string;
}) {
  const { meshGeo, wireGeo } = useMemo(() => {
    const geo = new THREE.TubeGeometry(curve, 100, 0.042, 20, false);
    return { meshGeo: geo, wireGeo: new THREE.WireframeGeometry(geo) };
  }, [curve]);

  return (
    <>
      <mesh geometry={meshGeo}>
        <meshStandardMaterial
          color={color} transparent opacity={0.55}
          depthWrite={false} side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments geometry={wireGeo}>
        <lineBasicMaterial color={color} transparent opacity={0.34} />
      </lineSegments>
    </>
  );
}

// ── Floating mesh patches ─────────────────────────────────────────────────────
function FloatingPatches() {
  const refs = useRef<(THREE.Group | null)[]>([]);

  const geos = useMemo(() =>
    PATCH_CONFIGS.map(cfg => {
      const geo = new THREE.PlaneGeometry(cfg.size, cfg.size, cfg.segs, cfg.segs);
      return { meshGeo: geo, wireGeo: new THREE.WireframeGeometry(geo) };
    }),
  []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    for (let i = 0; i < PATCH_COUNT; i++) {
      const g = refs.current[i];
      if (!g) continue;
      const cfg = PATCH_CONFIGS[i];
      g.rotation.x = cfg.rx * t + cfg.phase;
      g.rotation.y = cfg.ry * t + cfg.phase * 0.5;
      g.rotation.z = cfg.rz * t;
      g.position.y = cfg.y + Math.sin(t * cfg.driftFreq + cfg.phase) * cfg.driftAmp;
    }
  });

  return (
    <>
      {PATCH_CONFIGS.map((cfg, i) => (
        <group
          key={i}
          ref={(el: THREE.Group | null) => { refs.current[i] = el; }}
          position={[cfg.x, cfg.y, cfg.z]}
        >
          <mesh geometry={geos[i].meshGeo}>
            <meshStandardMaterial
              color={tensionHex(cfg.tension)}
              transparent opacity={0.07}
              depthWrite={false} side={THREE.DoubleSide}
            />
          </mesh>
          <lineSegments geometry={geos[i].wireGeo}>
            <lineBasicMaterial
              color={tensionHex(cfg.tension)}
              transparent opacity={0.30}
            />
          </lineSegments>
        </group>
      ))}
    </>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function LogoModel() {
  const groupRef = useRef<THREE.Group>(null!);

  const arcCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3( 0.32,  0.38, 0),
    new THREE.Vector3( 0.12,  0.20, 0),
    new THREE.Vector3(-0.08,  0.09, 0),
    new THREE.Vector3(-0.28,  0.02, 0),
    new THREE.Vector3(-0.46, -0.04, 0),
  ]), []);

  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.18;
    groupRef.current.rotation.x = -0.12 + Math.sin(t * 0.14) * 0.06;
    camera.position.z = 1.80 + Math.sin(t * 0.35) * 0.55;
  });

  return (
    <group ref={groupRef}>

      {/* ── Base plate ───────────────────────────────────────────────────── */}
      <group position={[0, -0.281, 0]}>
        <FEMBox w={0.88} h={0.050} d={0.19} barTension={0.08} color="#000000" segsY={20} />
      </group>

      {/* ── 6 fan bars — tension colormap shortest→tallest ───────────────── */}
      {BARS.map(({ x, h }, i) => {
        const tension = i / (BARS.length - 1);
        const segsY   = Math.max(3, Math.round(h * 150));
        return (
          <group key={i} position={[x, BASE_Y, 0]} rotation={[0, 0, BAR_LEAN]}>
            <group position={[0, h / 2, 0]}>
              <FEMBox w={BAR_W} h={h} d={BAR_D} barTension={tension} color="#8c2d19" segsY={segsY} />
            </group>
          </group>
        );
      })}

      {/* ── Sweep arc ────────────────────────────────────────────────────── */}
      <FEMTube curve={arcCurve} color="#000000" />

    </group>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export function Logo3D() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
      <Canvas
        camera={{ position: [-0.50, 0.10, 1.80], fov: 46 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[ 3,  5,  4]} intensity={1.4} />
        <directionalLight position={[-2,  2, -1]} intensity={0.40} />
        <FloatingPatches />
        <LogoModel />
      </Canvas>
    </div>
  );
}
