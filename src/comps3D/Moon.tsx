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

const MoonContent = () => {
  const dispatch = useDispatch();

  const moonTexture = useTexture("/textures/06_moonmap4k.jpg");
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const lightRef = useRef<THREE.DirectionalLight | null>(null);
  const [hovered, setHovered] = useState(false);
  const handleThemeToggle = () => {
    const newMode =
      localStorage.getItem("color-theme") === "dark" ? "light" : "dark";
    dispatch(setMode(newMode));
  };
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      lightRef?.current?.lookAt(meshRef.current.position);
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
        <meshStandardMaterial map={moonTexture} ref={materialRef} />
      </mesh>
      <directionalLight ref={lightRef} intensity={5} position={[3, 1.3, 0.4]} />
    </>
  );
};

const Moon = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <MoonContent />
    </Canvas>
  );
};

export default Moon;
