import { lightBlue } from "@mui/material/colors";
import { Text3D, useMatcapTexture } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

extend({ Material: THREE.MeshStandardMaterial });

const Text3DContent = ({
  scale = 1,
  onClick,
}: {
  scale?: number;
  onClick?: (e: any) => void;
}) => {
  const [responsiveScale, setResponsiveScale] = useState(scale);
  const [matcapTexture] = useMatcapTexture("161B1F_C7E0EC_90A5B3_7B8C9B", 256);

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    return () => {
      matcapTexture.dispose();
    };
  }, [matcapTexture]);

  const materialRef = useRef<THREE.MeshMatcapMaterial>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const timeAccumulator = useRef(0);

  useFrame((state, delta) => {
    if (Math.floor(state.clock.elapsedTime * 10) % 0.5 !== 0) return;
    timeAccumulator.current += delta;

    if (textRef.current) {
      textRef.current.rotation.x =
        Math.sin(timeAccumulator.current) * 0.07 - 0.03;
      textRef.current.rotation.y =
        Math.sin(timeAccumulator.current) * 0.03 + 0.08;
      textRef.current.rotation.z =
        Math.sin(timeAccumulator.current) * 0.02 + 0.02;
    }
  });
  const { viewport } = useThree();

  useEffect(() => {
    let baseScale = viewport.width / 40;
    // Make the text smaller on screens 900px and below
    if (window.innerWidth <= 900) {
      baseScale = viewport.width / 60;
    }
    setResponsiveScale(baseScale * scale);
  }, [viewport.width, scale]);

  const textConfig = useMemo(
    () => ({
      font: "/fonts/Limelight_Regular.json",
      size: 2.5,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 3,
      position: new THREE.Vector3(-2.2, -0.8, 3),
    }),
    [],
  );
  return (
    <>
      <Text3D
        ref={textRef}
        {...textConfig}
        scale={[responsiveScale, responsiveScale, responsiveScale]}
        onClick={onClick}
      >
        <meshMatcapMaterial
          ref={materialRef}
          matcap={matcapTexture}
          color="lightblue"
        />
        BCard
      </Text3D>
    </>
  );
};

const Text3DContentMemo = React.memo(Text3DContent);

const BrandText = ({ onClick }: { onClick?: (e: any) => void }) => {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: new THREE.Vector3(0, -0.3, 4.5) }}
      dpr={[1, 2]}
    >
      <Suspense fallback={<FallbackContent />}>
        <Text3DContent onClick={onClick} />
      </Suspense>
    </Canvas>
  );
};

const FallbackContent = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={lightBlue} />
    </mesh>
  );
};
export default BrandText;
