import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";

function Camera(props) {
  const ref = useRef();
  const { set, size } = useThree();

  useEffect(() => {
    ref.current.left = -size.width / 2;
    ref.current.right = size.width / 2;
    ref.current.top = size.height / 2;
    ref.current.bottom = -size.height / 2;
    ref.current.updateProjectionMatrix();
  }, [size]);

  useFrame(() => ref.current.updateProjectionMatrix());

  useEffect(() => void set({ camera: ref.current }), [set]);

  return <orthographicCamera ref={ref} {...props} />;
}

export default Camera;
