import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createStage } from "./stage.js";

// Port of portfolio-v2 Models/Laptop.js — click toggles the screen hinge.
const CLOSED = 1.7365442718611015;
const OPEN = 0;
const DURATION = 0.9;
const HINGE = [0, 0.01, 0.04];

export function mountLaptop(container, { bodyColor = "#dceaff", keysColor = "#1d3557", glowColor = "#a8dadc", screenImage = "/images/me9.jpg" } = {}) {
  const stage = createStage(container);
  const { THREE, scene, root, renderer } = stage;

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dl = new THREE.DirectionalLight(0xffffff, 2);
  dl.position.set(2.5, 10, -6);
  dl.castShadow = true;
  dl.shadow.mapSize.set(2048, 2048);
  Object.assign(dl.shadow.camera, { near: 1, far: 30, left: -10, right: 10, top: 10, bottom: -10 });
  scene.add(dl);

  const group = new THREE.Group();
  group.position.set(0, -2.75, 0);
  group.rotation.set(0, 0.5, 0);
  group.scale.setScalar(1.45);
  root.add(group);

  const floor = new THREE.Mesh(new THREE.CircleGeometry(7, 64), new THREE.ShadowMaterial({ transparent: true, opacity: 0.35 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -3.72;
  floor.receiveShadow = true;
  root.add(floor);

  const bodyMats = [];
  const keyMats = [];
  let glow = null;
  let screen = null;
  let screenMat = null;
  let t0 = null, from = CLOSED, to = OPEN, isOpen = false;

  const textureLoader = new THREE.TextureLoader();
  const screenTextures = new Map();
  const getScreenTexture = (url) => {
    if (screenTextures.has(url)) return screenTextures.get(url);
    const tex = textureLoader.load(url);
    tex.flipY = false;
    tex.generateMipmaps = false;
    tex.colorSpace = THREE.SRGBColorSpace;
    screenTextures.set(url, tex);
    return tex;
  };
  const texture = getScreenTexture(screenImage);

  new GLTFLoader().load("/models/laptop8.glb", (gltf) => {
    const model = gltf.scene;
    model.traverse((c) => {
      if (!c.isMesh) return;
      c.castShadow = true;
      c.receiveShadow = true;
      if (c.name === "Cube002") {
        c.material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture, color: 0xffffff, toneMapped: false });
        screenMat = c.material;
      } else if (c.name === "Cube001_1") {
        c.material = new THREE.MeshStandardMaterial({ color: keysColor });
        keyMats.push(c.material);
      } else {
        c.material = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.45, metalness: 0.08 });
        bodyMats.push(c.material);
      }
    });
    screen = model.getObjectByName("Laptop001");
    if (screen) {
      screen.position.x += HINGE[0];
      screen.position.y += HINGE[1];
      screen.position.z += HINGE[2];
      screen.rotation.x = CLOSED;
      glow = new THREE.PointLight(glowColor, 6, 6.5, 1.25);
      glow.position.set(0, 24, 0.25);
      screen.add(glow);
    }
    group.add(model);
  });

  const onClick = () => {
    if (!screen) return;
    from = screen.rotation.x;
    to = isOpen ? CLOSED : OPEN;
    t0 = null;
    isOpen = !isOpen;
  };
  renderer.domElement.addEventListener("click", onClick);

  stage.onFrame((now) => {
    if (!screen) return;
    const t = now / 1000;
    if (t0 === null) t0 = t;
    const p = Math.min(1, Math.max(0, (t - t0) / DURATION));
    const e = 1 - Math.pow(1 - p, 3);
    screen.rotation.x = from + (to - from) * e;
    if (p === 1) isOpen = to === OPEN;
  });

  return {
    setColors({ body, keys, glow: g, screen: screenUrl }) {
      if (body) bodyMats.forEach((m) => m.color.set(body));
      if (keys) keyMats.forEach((m) => m.color.set(keys));
      if (g && glow) glow.color.set(g);
      if (screenUrl && screenMat) screenMat.map = getScreenTexture(screenUrl);
    },
    dispose() {
      renderer.domElement.removeEventListener("click", onClick);
      screenTextures.forEach((tex) => tex.dispose());
      stage.dispose();
    },
  };
}
