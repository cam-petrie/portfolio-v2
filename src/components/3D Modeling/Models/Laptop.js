import React, { useRef, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import page from "../../../images/me3.jpg";
import * as THREE from "three";
import { TextureLoader } from "three";

const model = "/models/laptop.glb";

function Model(props) {
  const texture = useLoader(TextureLoader, page);
  texture.flipY = false;
  texture.generateMipmaps = false;
  const { nodes } = useGLTF(model);
  const laptop = useRef();
  const light = useRef();
  const backgroundColor = new THREE.Color("#dceaff"); // Replace #D1D6DD'#123456' with your background color
  const multiplier = 0.9;
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        ref={light}
        castShadow
        position={[0, 10, 0]}
        intensity={2}
      />
      <group
        castShadow
        {...props}
        ref={laptop}
        dispose={null}
        position={[0, -2.5, 0]}
      >
        <group
          castShadow
          scale={[
            4.175 * multiplier,
            0.109375 * multiplier,
            3.109375 * multiplier,
          ]}
          rotation={[0, 0.5, 0]}
        >
          <mesh castShadow geometry={nodes.Cube.geometry}>
            <meshBasicMaterial side={THREE.DoubleSide} map={texture} />
          </mesh>
          <mesh
            castShadow
            geometry={nodes.Cube_1.geometry}
            //   material={materials.laptop}
            material={
              new THREE.MeshStandardMaterial({ color: backgroundColor })
            }
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload(model);
export default forwardRef(Model);
