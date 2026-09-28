import ModelViewport from "./ModelViewport.jsx";
import { mountDesk } from "../three/desk.js";

export default function Blender() {
  return (
    <section id="blender" className="section">
      <div className="section__head">
        <h2 className="section__title">Built in Blender</h2>
        <span className="muted small">3D modeling · wireframe to implementation</span>
      </div>
      <div className="blender">
        <div className="blender__text">
          <p className="lede">I love bringing the web to life through the use of <b>3D models</b> and <b className="accent-text">animations</b>.</p>
          <p className="muted">I have crafted over a hundred models from wireframe to implementation. I ensure that any models I use in a finished project are compressed and cleaned for minimal latency.</p>
          <ul className="ledger">
            <li><b>Fig. 1 · Laptop</b><span className="muted">laptop8.glb · hinge animation, custom screen texture</span></li>
            <li><b>Fig. 2 · Desk &amp; chairs</b><span className="muted">desk-chairs.glb · 10 materials</span></li>
          </ul>
        </div>
        <ModelViewport
          className="viewport--desk"
          mount={mountDesk}
          label="3D desk and chairs modeled in Blender. Click to spin."
          caption="Fig. 2 — Desk & chairs · click to spin"
        />
      </div>
    </section>
  );
}
