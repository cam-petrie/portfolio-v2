import { useTypewriter } from "../hooks.js";
import ModelViewport from "./ModelViewport.jsx";
import { mountLaptop } from "../three/laptop.js";

export default function Hero({ content, laptopOptions, onLaptopReady }) {
  const { head, sub, headDone, subDone } = useTypewriter(content.name, content.sub);
  const [first, ...rest] = head.split(" ");
  const linkAt = content.sub.lastIndexOf("CTS.");

  return (
    <>
      <section className="hero">
        <a href="#work" className="award-pill">
          <span className="award-pill__tag">★ 2025 Winner</span>
          HR Tech Awards · Best Innovative Talent Analytics
        </a>
        <h1 className="hero__name" aria-label={content.name}>
          <span aria-hidden="true">
            {first}<br />{rest.join(" ")}
            {!headDone && <span className="caret">▌</span>}
          </span>
        </h1>
        <p className="hero__sub">
          {sub.slice(0, linkAt)}
          {sub.length > linkAt && <a href={content.ctsLink} target="_blank" rel="noreferrer">{sub.slice(linkAt)}</a>}
          {headDone && !subDone && <span className="caret caret--sub">▌</span>}
        </p>
        <div className="hero__ctas">
          <a href="#work" className="btn btn--accent">View case studies →</a>
          <a href="#contact" className="btn btn--outline">Contact me</a>
        </div>
      </section>
      <ModelViewport
        className="viewport--hero"
        mount={mountLaptop}
        options={laptopOptions}
        onReady={onLaptopReady}
        label="3D laptop modeled in Blender. Click to open or close the screen."
        caption="Fig. 1 — Laptop, modeled in Blender · click to open"
      />
    </>
  );
}
