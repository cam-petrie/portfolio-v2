import React, { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import {animated, useSpring} from "@react-spring/three";
const model = "/models/desk-chairs.glb";

export function Desk(props) {
  
  const { nodes, materials } = useGLTF(model);
  
  const desk = useRef();

  const easeOutCirc = (t) => 1 - Math.pow(1 - t, 4); // Similar to your easing function

  // React-spring hook for animating the camera rotation
  const { rotation } = useSpring({
    from: { rotation: [0, 0, 0] },
    to: async (next) => {
      // First stage: fast spins (equivalent to initial rapid camera movement)
      await next({
        rotation: [0, Math.PI * 6, 0], // 3 full rotations
        config: { duration: 600 }, // Fast
      });

      // Second stage: Gradual easing into the final position
      await next({
        rotation: [0, Math.PI * 8.1, 0], // Just over 5 full rotations
        config: {
          tension: 50,
          friction: 80,
          duration: 1200,
          easing: easeOutCirc, // Smoother slow-down
        },
      });
    },
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        castShadow
        position={[0, 10, 3]}
        intensity={2}
      />
        <group castShadow ref={desk} {...props} dispose={null}>
        <group
          castShadow
          position={[0, 3, 0]}
          rotation={[0, 1.557, 0]}
          scale={3}
        >
          <animated.group ref={desk} rotation={rotation} dispose={null}>

          
          <mesh
            castShadow
            geometry={nodes.Cube001.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            castShadow
            geometry={nodes.Cube001_1.geometry}
            material={materials["Base Orange"]}
          />
          <mesh
            castShadow
            geometry={nodes.Cube001_2.geometry}
            material={materials.Spotify}
          />
          <mesh
            castShadow
            geometry={nodes.Cube001_3.geometry}
            material={materials.Code}
          />
          <mesh
            castShadow
            geometry={nodes.Cube001_4.geometry}
            material={materials.Floor}
          />
          <mesh
            castShadow
            geometry={nodes.Cube001_5.geometry}
            material={materials["Peach Base"]}
          />
          <mesh
            castShadow
            geometry={nodes.Cube001_6.geometry}
            material={materials["Normal Keys"]}
          />
          <mesh
            castShadow
            geometry={nodes.Cube001_7.geometry}
            material={materials["Keyboard Container"]}
          />
          <mesh
            castShadow
            geometry={nodes.Cube001_8.geometry}
            material={nodes.Cube001_8.material}
          />
          <mesh
            castShadow
            geometry={nodes.Cube001_9.geometry}
            material={materials.Walls}
          />
          </animated.group>
        </group>
        </group>
      <mesh
        rotation-x={-Math.PI / 2}
        position={[0, -5, 0]}
        scale={[1, 1, 1]}
        receiveShadow
        >
        <circleGeometry args={[10]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
    </>
  );
}

useGLTF.preload(model);
export default forwardRef(Desk);
