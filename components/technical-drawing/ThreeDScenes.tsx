"use client";

import { Canvas } from "@react-three/fiber";
import { Edges, Environment, GizmoHelper, GizmoViewport, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import type { GLTF } from "three-stdlib";
import type { DrawingSelection } from "./types";
import type { Mesh, BufferGeometry } from "three";

type MeshNodes = Record<string, Mesh<BufferGeometry>>;
type GLTFWithNodes = GLTF & { nodes: MeshNodes };

const selectedColor = "#f24c3d";
const defaultColor = "#dddddd";
const alternateRotation: [number, number, number] = [0.5, -0.7, 0];
const defaultRotation: [number, number, number] = [0.5, 0.5, 0];

function modelMesh(nodes: MeshNodes, key: string) {
  return nodes[key];
}

function HighlightModel({ actives, second }: { actives?: DrawingSelection; second?: boolean }) {
  const { nodes } = useGLTF("/last3d.gltf") as unknown as GLTFWithNodes;
  const surfaces: Array<[string, keyof DrawingSelection | undefined]> = [
    ["mesh_0", "otherSide"],
    ["mesh_1", "bottomRightCut"],
    ["mesh_2", "side"],
    ["mesh_3", "rightEdge"],
    ["mesh_4", "rightMiddle"],
    ["mesh_5", "middleEdge"],
    ["mesh_6", "bottomCutTop"],
    ["mesh_7", "bottomCut"],
    ["mesh_8", "rightMiddleBottom"],
    ["mesh_9", "behind"],
    ["mesh_10", "rightMiddleTop"],
    ["mesh_11", "leftEdge"],
    ["mesh_12", "top"],
    ["mesh_13", undefined],
    ["mesh_14", "rightEdge"],
  ];

  return (
    <group rotation={second ? alternateRotation : defaultRotation}>
      {surfaces.map(([meshKey, activeKey]) => (
        <mesh key={meshKey} geometry={modelMesh(nodes, meshKey).geometry}>
          <meshStandardMaterial
            polygonOffsetFactor={1}
            polygonOffset
            transparent
            color={activeKey && actives?.[activeKey] ? selectedColor : defaultColor}
          />
          <Edges />
        </mesh>
      ))}
    </group>
  );
}

function SimpleModel({ assetPath, meshKeys, second }: { assetPath: string; meshKeys: string[]; second: boolean }) {
  const { nodes } = useGLTF(assetPath) as unknown as GLTFWithNodes;

  return (
    <group rotation={second ? alternateRotation : defaultRotation}>
      {meshKeys.map((meshKey) => (
        <mesh key={meshKey} geometry={modelMesh(nodes, meshKey).geometry}>
          <meshStandardMaterial transparent polygonOffsetFactor={1} polygonOffset color={defaultColor} />
          <Edges />
        </mesh>
      ))}
    </group>
  );
}

function SharedCanvas({ children, withControls }: { children: React.ReactNode; withControls?: boolean }) {
  return (
    <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-muted">Loading 3D model...</div>}>
      <Canvas camera={{ position: [0, 0, 1], zoom: 500, far: 100 }} orthographic>
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.5} angle={0.2} penumbra={1} position={[10, 15, 10]} />
        {children}
        <Environment preset="city" />
        {withControls ? (
          <>
            <OrbitControls rotateSpeed={5} />
            <GizmoHelper alignment="bottom-right" margin={[50, 50]}>
              <GizmoViewport labelColor="white" axisHeadScale={1} />
            </GizmoHelper>
          </>
        ) : null}
      </Canvas>
    </Suspense>
  );
}

export function InteractiveThreeDView({ actives }: { actives?: DrawingSelection }) {
  return (
    <SharedCanvas withControls>
      <HighlightModel actives={actives} />
    </SharedCanvas>
  );
}

export function ConstructorThreeDView({ count, activeView }: { count: number; activeView: "first" | "second" }) {
  const second = activeView === "second";

  return (
    <SharedCanvas>
      {count === 1 ? <SimpleModel assetPath="/3d-cube.gltf" meshKeys={["mesh_0", "mesh_1"]} second={second} /> : null}
      {count === 2 ? <SimpleModel assetPath="/3D-second.gltf" meshKeys={["mesh_0", "mesh_1", "mesh_2"]} second={second} /> : null}
      {count === 3 ? <SimpleModel assetPath="/3D-third.gltf" meshKeys={["mesh_0", "mesh_1", "mesh_2"]} second={second} /> : null}
      {count === 4 ? <HighlightModel second={second} /> : null}
      {count === 5 ? <SimpleModel assetPath="/behindonly.gltf" meshKeys={["mesh_0", "mesh_1"]} second={second} /> : null}
      {count === 6 ? <SimpleModel assetPath="/behind-side.gltf" meshKeys={["mesh_0", "mesh_1"]} second={second} /> : null}
      {count === 7 ? <SimpleModel assetPath="/onlySide.gltf" meshKeys={["mesh_0", "mesh_1"]} second={second} /> : null}
      {count === 8 ? <SimpleModel assetPath="/top-behind.gltf" meshKeys={["mesh_0", "mesh_1", "mesh_2"]} second={second} /> : null}
    </SharedCanvas>
  );
}

[
  "/last3d.gltf",
  "/3d-cube.gltf",
  "/3D-second.gltf",
  "/3D-third.gltf",
  "/behindonly.gltf",
  "/behind-side.gltf",
  "/onlySide.gltf",
  "/top-behind.gltf",
].forEach((assetPath) => {
  useGLTF.preload(assetPath);
});