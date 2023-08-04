import React, { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";

const model = "/models/iphone.glb";

function Phone(props) {
  const { nodes, materials } = useGLTF(model);
  const phone = useRef();
  const multiplier = 5.5;

  return (
    <group castShadow receiveShadow {...props} ref={phone} dispose={null}>
      <group
        castShadow
        rotation={[1.6, -0.034, 2.466]}
        scale={[0.342 * multiplier, 0.311 * multiplier, 0.7 * multiplier]}
      >
        <mesh
          castShadow
          geometry={nodes.Plane.geometry}
          material={materials["Material.001"]}
        />
        <mesh geometry={nodes.Plane_1.geometry} material={materials.hardware} />
        <mesh
          castShadow
          geometry={nodes.Plane_2.geometry}
          material={materials["phone main color"]}
        />
        <mesh geometry={nodes.Plane_3.geometry} material={materials.buttons} />
        <mesh
          castShadow
          geometry={nodes.Plane_4.geometry}
          material={materials["camera outline"]}
        />
        <mesh
          castShadow
          geometry={nodes.Plane_5.geometry}
          material={materials["camera lens"]}
        />
        <mesh geometry={nodes.Plane_6.geometry} material={materials.flash} />
        <mesh geometry={nodes.Plane_7.geometry} material={materials.Material} />
      </group>
    </group>
  );
}

useGLTF.preload(model);
export default forwardRef(Phone);
