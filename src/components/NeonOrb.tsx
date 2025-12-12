"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import type { Mesh } from "three";

type NeonOrbProps = {
  className?: string;
};

function Orb() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.35;
    meshRef.current.rotation.x = 0.3 + Math.sin(clock.getElapsedTime() * 0.2) * 0.08;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.15, 128, 128]} />
      <MeshDistortMaterial
        color="#6b5bff"
        attach="material"
        speed={2.2}
        distort={0.35}
        roughness={0.12}
        metalness={0.6}
        radius={1}
      />
    </mesh>
  );
}

export default function NeonOrb({ className = "" }: NeonOrbProps) {
  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 3.2], fov: 55 }} dpr={[1, 2]}>
        <color attach="background" args={["#050611"]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[2.5, 3, 4]} intensity={1.2} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Orb />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}



