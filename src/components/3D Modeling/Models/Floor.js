export default function Floor(depth) {
  console.log(depth);
  return (
    <mesh
      rotation-x={-Math.PI / 2}
      position={[0, -5, 0]}
      scale={[1, 1, 1]}
      receiveShadow
    >
      <circleGeometry args={[10]} />
      <shadowMaterial transparent opacity={0.4} />
    </mesh>
  );
}
