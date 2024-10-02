import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Camera from "./Camera";
import ModelResizer from "./ModelResizer";

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
      >
        <Camera zoom={40} ref={cameraRef} position={[0, 25, 100]} fov={75} />
        {controls}
        <Suspense fallback={null}>
          <ModelResizer>{children}</ModelResizer>
        </Suspense>
      </Canvas>
    </>
  );
}
