import { PerspectiveCamera, Text3D } from "@react-three/drei";
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import * as THREE from "three";
import type { RootState } from "../store/store";
import type {
  CapsuleContentProps,
  CapsuleLinkProps,
} from "../types/CapsuleProps";

function isElementInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= -rect.height &&
    rect.left >= -rect.width &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) +
        rect.height &&
    rect.right <=
      (window.innerWidth || document.documentElement.clientWidth) + rect.width
  );
}

extend({
  Material: THREE.MeshBasicMaterial,
  CapsuleGeometry: THREE.CapsuleGeometry,
  PlaneGeometry: THREE.PlaneGeometry,
  ShadowMaterial: THREE.ShadowMaterial,
});
const optimizedTextConfig = {
  curveSegments: 6,
  bevelEnabled: true,
  bevelSize: 0.02,
  bevelThickness: 0.02,
  bevelSegments: 2,
};

const CapsuleContent = ({
  text,
  children,
  onClick,
  resetCapsuleLength,
  imageUrl,
  transparent,
  opacity,
}: CapsuleContentProps & { resetCapsuleLength?: (len: number) => void }) => {
  const user = useSelector((state: RootState) => state.userSlice.user);

  const texture = useMemo(() => {
    if (!imageUrl) return undefined;
    return useLoader(THREE.TextureLoader, user.image.url);
  }, [imageUrl, user?.image.url]);

  useEffect(() => {
    return () => {
      if (texture) texture.dispose();
    };
  }, [texture]);

  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const [hovered, setHovered] = useState(false);
  const initialPosition = useRef(new THREE.Vector3(0, 1, -0.5));
  const textRef = useRef<any>(null);
  const [textOffsetX, setTextOffsetX] = useState(0);

  const [capsuleLength, setCapsuleLengthLocal] = useState(2);

  const animationParams = useMemo(
    () => ({
      wobbleAmount: 0.2 + Math.random() * 0.25,
      wobbleSpeed: 0.3 + Math.random() * 0.8,
      phaseOffset: Math.random() * Math.PI * 2,
      xAxisWeight: 0.6 + Math.random() * 0.7,
      yAxisWeight: 0.3 + Math.random() * 0.7,
    }),
    [],
  );

  const frameCount = useRef(0);
  const FRAME_SKIP = 2;

  useFrame((state, delta) => {
    frameCount.current += 1;
    if (frameCount.current % FRAME_SKIP !== 0) return;

    if (lightRef.current && meshRef.current) {
      lightRef.current.lookAt(meshRef.current.position);
      const elem = document.querySelector("canvas");
      if (elem && !isElementInViewport(elem)) return;

      const t = state.clock.getElapsedTime();
      const zPos = 0.1;
      meshRef.current.position.y =
        initialPosition.current.y +
        Math.sin(
          t * animationParams.wobbleSpeed + animationParams.phaseOffset,
        ) *
          animationParams.wobbleAmount *
          animationParams.yAxisWeight;

      meshRef.current.position.x =
        initialPosition.current.x +
        Math.sin(
          t * animationParams.wobbleSpeed + animationParams.phaseOffset,
        ) *
          animationParams.wobbleAmount *
          animationParams.xAxisWeight;

      meshRef.current.position.z =
        zPos +
        Math.sin(
          t * animationParams.wobbleSpeed * 0.3 +
            animationParams.phaseOffset * 0.8,
        ) *
          animationParams.wobbleAmount *
          0.2;
      // if (meshRef.current) {
      const forwardTilt =
        Math.sin(
          t * animationParams.wobbleSpeed * 0.6 +
            animationParams.phaseOffset * 1.2,
        ) * 0.18;

      meshRef.current.rotation.set(forwardTilt, 0, Math.PI / 2);
      // }
    }
  });

  const { viewport } = useThree();
  const capsuleScale = viewport.height / 7.5;

  useLayoutEffect(() => {
    if (textRef.current && textRef.current.geometry) {
      textRef.current.geometry.computeBoundingBox();
      const box = textRef.current.geometry.boundingBox;
      if (box) {
        const width = box.max.x - box.min.x;
        const newLength = Math.max(5, width);
        resetCapsuleLength?.(newLength);
        setCapsuleLengthLocal(newLength);
        setTextOffsetX(width / 2);
      }
    }
  }, [text]);

  const capsuleGeoArgs = useMemo(() => {
    // Reduce segments for smaller screens
    const radialSegments = viewport.width < 768 ? 16 : 32;
    const heightSegments = viewport.width < 768 ? 32 : 64;
    return [1.8, capsuleLength, radialSegments, heightSegments];
  }, [viewport.width, capsuleLength]);

  return (
    <>
      {/* Capsules */}
      <mesh
        scale={[capsuleScale, capsuleScale, capsuleScale]}
        ref={meshRef}
        rotation={[0, 0, Math.PI / 2]}
        position-x={-1}
        position-y={0}
        position-z={1}
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <meshStandardMaterial
          color={hovered ? "#FF83F9" : "#83F9F9"}
          metalness={0.3}
          roughness={0.2}
          transparent={transparent}
          opacity={opacity ?? 1}
        />
        <capsuleGeometry args={[1.8, capsuleLength, 32, 64]} />

        {imageUrl && texture && (
          <mesh
            rotation={[0, 0, -Math.PI / 2]}
            position-z={2}
            scale={[3, 3, 3]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={texture} transparent color="#ffffff" />
          </mesh>
        )}

        {text && (
          <Text3D
            ref={textRef}
            font="/fonts/Cinzel/Cinzel Medium_Regular.json"
            size={0.8}
            height={0.1}
            position-x={-0.5}
            position-y={textOffsetX}
            position-z={2}
            {...optimizedTextConfig}
            rotation={[0, 0, -Math.PI / 2]}
          >
            {text || ""}
            <meshBasicMaterial color="#ffffff" />
          </Text3D>
        )}
        {children}
      </mesh>

      <directionalLight
        intensity={2}
        ref={lightRef}
        position-y={2}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Shadows */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position-y={-0.7}
        position-z={3}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <shadowMaterial
          opacity={0.3}
          transparent={true}
          depthWrite={false}
          depthTest={true}
        />
      </mesh>
    </>
  );
};
const CapsuleContentMemo = React.memo(CapsuleContent);

const CapsuleLink = ({
  text,
  className,
  to,
  onClick,
  imageUrl,
  transparent,
  opacity,
}: CapsuleLinkProps) => {
  const [capsuleLength, setCapsuleLength] = useState(5);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setWindowWidth(window.innerWidth);
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleClick = () => {
    if (onClick) onClick();
    else window.location.href = to;
  };

  return (
    <Canvas
      shadows={true}
      style={{
        height: "auto",
        aspectRatio: "1.7/1",
        cursor: "pointer",
        transition: "width 0.2s",
        marginTop: "4vmin",
        marginLeft: "2vmin",
        zIndex: 10,
      }}
      dpr={[1, 1.5]}
    >
      <PerspectiveCamera makeDefault position-y={0.5} position-z={4} />

      <CapsuleContent
        text={text}
        onClick={handleClick}
        className={className}
        resetCapsuleLength={setCapsuleLength}
        imageUrl={imageUrl}
        transparent={transparent}
        opacity={opacity}
      />
    </Canvas>
  );
};
export default React.memo(CapsuleLink);
