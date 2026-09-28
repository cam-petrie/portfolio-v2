import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createStage } from "./stage.js";

// Port of portfolio-v2 Models/Desk.js. Renders the ten Cube001* node geometries with their
// original materials (the stray "Cube" mesh in the .glb is intentionally skipped, as before).
// Spin: 3 fast turns in 600ms, then eases out to 8.1π over 1200ms. Plays when scrolled into view; click replays.
const easeOut = (t) => 1 - Math.pow(1 - t, 4);
const S1 = Math.PI * 6;
const S2 = Math.PI * 8.1;

export function mountDesk(container) {
  const stage = createStage(container);
  const { THREE, scene, root, renderer } = stage;

  scene.add(new THREE.AmbientLight(0xffffff, 1));
  const dl = new THREE.DirectionalLight(0xffffff, 2);
  dl.position.set(0, 10, 3);
  dl.castShadow = true;
  scene.add(dl);

  const outer = new THREE.Group();
  outer.position.set(0, 3, 0);
  outer.rotation.y = 1.557;
  outer.scale.setScalar(3);
  root.add(outer);
  const spin = new THREE.Group();
  outer.add(spin);

  const floor = new THREE.Mesh(new THREE.CircleGeometry(10), new THREE.ShadowMaterial({ transparent: true, opacity: 0.4 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -5;
  floor.receiveShadow = true;
  root.add(floor);

  let spinStart = null, spinFrom = 0, loaded = false, seen = false, played = false;
  const play = () => { spinFrom = spin.rotation.y % (Math.PI * 2); spinStart = performance.now(); played = true; };

  new GLTFLoader().load("/models/desk-chairs.glb", (gltf) => {
    gltf.scene.traverse((c) => {
      if (c.isMesh && /^Cube001(_\d)?$/.test(c.name)) {
        const m = new THREE.Mesh(c.geometry, c.material);
        m.castShadow = true;
        spin.add(m);
      }
    });
    loaded = true;
    if (seen && !played) play();
  });

  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { seen = true; if (loaded && !played) play(); }
  }, { threshold: 0.35 });
  io.observe(container);
  renderer.domElement.addEventListener("click", play);

  stage.onFrame((now) => {
    if (spinStart === null) return;
    const t = now - spinStart;
    if (t < 600) spin.rotation.y = spinFrom + (S1 * t) / 600;
    else if (t < 1800) spin.rotation.y = spinFrom + S1 + (S2 - S1) * easeOut((t - 600) / 1200);
    else { spin.rotation.y = spinFrom + S2; spinStart = null; }
  });

  return {
    dispose() {
      io.disconnect();
      renderer.domElement.removeEventListener("click", play);
      stage.dispose();
    },
  };
}
