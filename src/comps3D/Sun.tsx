import { useTexture } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as THREE from "three";
import { initTheme, setMode } from "../slices/modeSlice";
extend({
  Mesh: THREE.Mesh,
  SphereGeometry: THREE.SphereGeometry,
  Material: THREE.MeshStandardMaterial,
});

const SunContent = () => {
  const dispatch = useDispatch();
  const sunTexture = useTexture("/textures/8k_sun.jpg");
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const coronaRef = useRef<THREE.Mesh | null>(null);
  // const lightRef = useRef<THREE.DirectionalLight | null>(null);
  const [hovered, setHovered] = useState(false);
  const handleThemeToggle = () => {
    const newMode =
      localStorage.getItem("color-theme") === "dark" ? "light" : "dark";
    dispatch(setMode(newMode));
  };

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      const scaleFactor = 1 + Math.sin(t * 0.5) * 0.06;

      meshRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
      if (materialRef.current) {
        materialRef.current.emissiveIntensity = 1 + Math.sin(t * 0.6) * 0.2;
      }

      if (coronaRef.current) {
        coronaRef.current.scale.setScalar(1.0 + Math.sin(t * 0.9) * 0.05);
        coronaRef.current.rotation.z += 0.001;
        coronaRef.current.rotation.y -= 0.002;
      }
    }
  });
  return (
    <>
      <mesh
        onClick={handleThemeToggle}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        ref={meshRef}
        position={[0, 0, 2]}
      >
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshStandardMaterial
          map={sunTexture}
          ref={materialRef}
          emissive="#ff7b00"
          emissiveIntensity={0.6}
          color="#ffffff"
          roughness={1}
          metalness={0.1}
        />
      </mesh>

      <mesh ref={coronaRef} position={[0, 0, 2]}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshStandardMaterial
          color="#ff9900"
          transparent={true}
          opacity={0.25}
          emissive="#ff0000"
          emissiveIntensity={1}
        />
      </mesh>
      <directionalLight position={[5, 5, 5]} intensity={5} color="#ffffff" />
    </>
  );
};

const Sun = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <SunContent />
    </Canvas>
  );
};

export default Sun;
