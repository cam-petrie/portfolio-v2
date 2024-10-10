import React, { useRef, forwardRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import textureImage from "../../../images/me6.jpeg";

const modelPath = "/models/laptop.glb"; // Path to the new GLTF model

function Model(props) {
  // Load the texture using TextureLoader
  const texture = useLoader(TextureLoader, textureImage);
  texture.flipY = false;
  texture.generateMipmaps = false; // Disable mipmaps to maintain texture clarity

  // Load the GLTF model
  const { nodes, materials } = useGLTF(modelPath);

  // Refs for model and light
  const laptopRef = useRef();
  const lightRef = useRef();

  // Define colors for the background and keys
  const backgroundColor = new THREE.Color("#dceaff"); // Background color
  const keysColor = new THREE.Color("#1d3557"); // Keys color
  const multiplier = 0.9; // Scale multiplier for adjustments

  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={1} />
      <directionalLight
        ref={lightRef}
        castShadow
        position={[0, 10, 0]}
        intensity={2}
      />

      {/* Main model group */}
      <group ref={laptopRef} {...props} dispose={null} position={[0, -2.5, 0]}>
      <group
          castShadow
          scale={[
            4.175 * multiplier,
            0.109375 * multiplier,
            3.109375 * multiplier,
          ]}
          rotation={[0, 0.5, 0]}
        >
          {/* First mesh with texture */}
          <mesh castShadow geometry={nodes.Cube001.geometry}>
            <meshBasicMaterial side={THREE.DoubleSide} map={texture} />
          </mesh>

          {/* Second mesh with solid background color */}
          <mesh
            castShadow
            geometry={nodes.Cube001_1.geometry}
            material={new THREE.MeshStandardMaterial({ color: backgroundColor })}
          />

          {/* Third mesh with different color/material */}
          <mesh
            castShadow
            geometry={nodes.Cube001_2.geometry}
            material={new THREE.MeshStandardMaterial({ color: keysColor })}
          />
        </group>
      </group>
    </>
  );
};

// Preload the GLTF model for better performance
useGLTF.preload(modelPath);

export default forwardRef(Model);
