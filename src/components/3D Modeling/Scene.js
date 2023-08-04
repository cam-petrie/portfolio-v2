import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Floor from "./Models/Floor";
import CircularProgress from "@mui/material/CircularProgress";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";

// function Handle({ load }) {
//   React.useEffect(() => {
//     load(false);
//     return () => load(true);
//   }, []);
// }

export default function Scene({ children, controls }) {
  const main = React.useRef();
  const cameraRef = React.useRef();
  const lightRef = React.useRef();
  // useHelper(lightRef, THREE.DirectionalLightHelper);
  console.log(cameraRef.current);
  return (
    <>
      <Canvas
        ref={main}
        shadows={true}
        style={{ height: "500px" }}
        flat
        orthographic
        camera={{
          zoom: 40,
          position: [0, 25, 100],
          ref: cameraRef,
          fov: 75,
        }}
      >
        {controls}
        <ambientLight intensity={2} />
        <directionalLight
          ref={lightRef}
          castShadow
          position={[0, 20, 0]}
          intensity={4}
        />
        <Suspense
          fallback={
            <CircularProgress
              sx={{ justifySelf: "center" }}
              color="secondary"
            />
          }
        >
          {children} <Floor />
        </Suspense>
      </Canvas>
    </>
  );
}
