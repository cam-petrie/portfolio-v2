import * as THREE from "three";

// Shared stage — ports Scene.js + Camera.js + Controller.js + ModelResizer.js from portfolio-v2.
// Orthographic camera (zoom 40, position [0,25,100]), transparent canvas, mouse-follow orbit
// clamped to azimuth ±10° / polar 60–65°.
const rad = (d) => (Math.PI / 180) * d;

export function createStage(container, { fitWidth = 600 } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = "stage-canvas";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
  camera.zoom = 40;
  const radius = Math.hypot(25, 100);
  const root = new THREE.Group();
  scene.add(root);

  const mouse = { x: 0, y: 0 };
  const cur = { az: 0, po: rad(62) };
  const onMove = (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
  };
  window.addEventListener("pointermove", onMove);

  const resize = () => {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.left = -w / 2; camera.right = w / 2; camera.top = h / 2; camera.bottom = -h / 2;
    camera.updateProjectionMatrix();
    root.scale.setScalar(w > fitWidth ? 1 : w / fitWidth);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const frameFns = new Set();
  let raf = 0;
  let visible = true;
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) raf = requestAnimationFrame(tick);
  });
  io.observe(container);

  function tick(now) {
    raf = 0;
    frameFns.forEach((fn) => fn(now));
    const az = reduceMotion ? 0 : Math.max(rad(-10), Math.min(rad(10), -mouse.x * rad(50)));
    const po = reduceMotion ? rad(62) : Math.max(rad(60), Math.min(rad(65), (mouse.y + 1) * rad(60)));
    cur.az += (az - cur.az) * 0.08;
    cur.po += (po - cur.po) * 0.08;
    camera.position.set(
      radius * Math.sin(cur.po) * Math.sin(cur.az),
      radius * Math.cos(cur.po),
      radius * Math.sin(cur.po) * Math.cos(cur.az)
    );
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    if (visible) raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  return {
    THREE, scene, root, renderer,
    onFrame: (fn) => frameFns.add(fn),
    dispose() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
