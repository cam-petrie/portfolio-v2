import React, { useMemo, useRef, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import textureImage from "../../../images/me9.jpg";

const modelPath = "/models/laptop8.glb";
const backgroundColor = "#dceaff";
const keysColor = "#1d3557";
const screenGlowColor = "#a8dadc";
const closedScreenRotation = 1.7365442718611015;
const openScreenRotation = 0;
const animationDuration = 0.9;
const screenHingeOffset = [0, 0.01, 0.04];

function Model(props) {
  const laptopRef = useRef();
  const lightRef = useRef();
  const screenRef = useRef();
  const animationStartRef = useRef();
  const animationFromRef = useRef(closedScreenRotation);
  const animationToRef = useRef(openScreenRotation);
  const isOpenRef = useRef(false);

  const texture = useLoader(TextureLoader, textureImage);
  texture.flipY = false;
  texture.generateMipmaps = false;
  texture.colorSpace = THREE.SRGBColorSpace;

  const { scene } = useGLTF(modelPath);

  const laptopScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!child.isMesh) {
        return;
      }

      child.castShadow = true;
      child.receiveShadow = true;

      if (child.name === "Cube002") {
        child.material = new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
          map: texture,
          color: new THREE.Color("#ffffff"),
          toneMapped: false,
        });
      } else if (child.name === "Cube001_1") {
        child.material = new THREE.MeshStandardMaterial({ color: keysColor });
      } else {
        child.material = new THREE.MeshStandardMaterial({
          color: backgroundColor,
          roughness: 0.45,
          metalness: 0.08,
        });
      }
    });

    const screen = clone.getObjectByName("Laptop001");

    if (screen) {
      screen.position.x += screenHingeOffset[0];
      screen.position.y += screenHingeOffset[1];
      screen.position.z += screenHingeOffset[2];
      screen.rotation.x = closedScreenRotation;

      const screenGlow = new THREE.PointLight(screenGlowColor, 6, 6.5, 1.25);
      screenGlow.position.set(0, 24, 0.25);
      screen.add(screenGlow);
    }

    return clone;
  }, [scene, texture]);

  useFrame((state) => {
    if (!screenRef.current) {
      screenRef.current = laptopScene.getObjectByName("Laptop001");
    }

    if (!screenRef.current) {
      return;
    }

    if (animationStartRef.current === undefined) {
      animationStartRef.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - animationStartRef.current;
    const progress = THREE.MathUtils.clamp(elapsed / animationDuration, 0, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    screenRef.current.rotation.x = THREE.MathUtils.lerp(
      animationFromRef.current,
      animationToRef.current,
      easedProgress
    );

    if (progress === 1) {
      isOpenRef.current = animationToRef.current === openScreenRotation;
    }
  });

  const toggleScreen = (event) => {
    event.stopPropagation();

    if (!screenRef.current) {
      screenRef.current = laptopScene.getObjectByName("Laptop001");
    }

    animationFromRef.current =
      screenRef.current?.rotation.x ??
      (isOpenRef.current ? openScreenRotation : closedScreenRotation);
    animationToRef.current = isOpenRef.current
      ? closedScreenRotation
      : openScreenRotation;
    animationStartRef.current = undefined;
    isOpenRef.current = !isOpenRef.current;
  };

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight
        ref={lightRef}
        castShadow
        position={[2.5, 10, -6]}
        intensity={2}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <group
        ref={laptopRef}
        {...props}
        dispose={null}
        position={[0, -2.75, 0]}
        rotation={[0, 0.5, 0]}
        scale={1.45}
        onClick={toggleScreen}
      >
        <primitive object={laptopScene} />
      </group>

      <mesh
        receiveShadow
        rotation-x={-Math.PI / 2}
        position={[0, -3.72, 0]}
      >
        <circleGeometry args={[7, 64]} />
        <shadowMaterial transparent opacity={0.35} />
      </mesh>
    </>
  );
}

// Preload the GLTF model for better performance
useGLTF.preload(modelPath);

export default forwardRef(Model);
