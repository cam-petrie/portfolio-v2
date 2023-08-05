import React, { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";

const model = "/models/desk-chairs.glb";

export function Desk(props) {
  const { nodes, materials } = useGLTF(model);
  const desk = useRef();
  return (
    <group ref={desk} {...props} dispose={null}>
      <group position={[0, 3, 0]} rotation={[0, 1.557, 0]} scale={3}>
        <mesh
          geometry={nodes.Cube001.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          geometry={nodes.Cube001_1.geometry}
          material={materials["Base Orange"]}
        />
        <mesh
          geometry={nodes.Cube001_2.geometry}
          material={materials.Spotify}
        />
        <mesh geometry={nodes.Cube001_3.geometry} material={materials.Code} />
        <mesh geometry={nodes.Cube001_4.geometry} material={materials.Floor} />
        <mesh
          geometry={nodes.Cube001_5.geometry}
          material={materials["Peach Base"]}
        />
        <mesh
          geometry={nodes.Cube001_6.geometry}
          material={materials["Normal Keys"]}
        />
        <mesh
          geometry={nodes.Cube001_7.geometry}
          material={materials["Keyboard Container"]}
        />
        <mesh
          geometry={nodes.Cube001_8.geometry}
          material={nodes.Cube001_8.material}
        />
        <mesh geometry={nodes.Cube001_9.geometry} material={materials.Walls} />
      </group>
    </group>
  );
}

useGLTF.preload(model);
export default forwardRef(Desk);
