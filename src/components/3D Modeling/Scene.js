import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

export default function Scene({ children, controls, depth }) {
  const main = React.useRef();
  const cameraRef = React.useRef();
  return (
    <>
      <Canvas
        ref={main}
        shadows={true}
        style={{ height: "inherit", width: "inherit" }}
        flat
        orthographic
        camera={{
          zoom: 40,
          position: [0, 25, 100],
          ref: cameraRef,
          fov: 75,
          attach: "camera",
          args: [-10, 10, 10, -10],
        }}
      >
        {controls}

        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </>
  );
}
