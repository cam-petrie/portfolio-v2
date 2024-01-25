import { useThree } from "@react-three/fiber";

function ModelResizer({ children }) {
  const { size } = useThree();
  const scale = size.width > 600 ? 1 : size.width / 600;

  return <group scale={[scale, scale, scale]}>{children}</group>;
}

export default ModelResizer;
