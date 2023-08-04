import React, { useRef, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

const model = "/models/eco-globe.glb";

function Globe(props, ref) {
  const { nodes, materials } = useGLTF(model);
  const globe = useRef();
  return (
    <group castShadow {...props} ref={globe} dispose={null}>
      <group castShadow rotation={[-0.043, 1.119, 0.088]} scale={3.113}>
        <mesh
          castShadow
          geometry={nodes.Sphere002.geometry}
          material={materials["Material.002"]}
        />
        <mesh
          castShadow
          geometry={nodes.Sphere002_1.geometry}
          material={materials["Material.001"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload(model);
export default forwardRef(Globe);
