export default function Floor() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -5, 0]} receiveShadow>
      <circleGeometry args={[10]} />
      <shadowMaterial transparent opacity={0.4} />
    </mesh>
  );
}
