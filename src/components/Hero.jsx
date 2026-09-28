import { useEffect, useRef, useState } from "react";
import { useTypewriter } from "../hooks.js";
import ModelViewport from "./ModelViewport.jsx";
import { mountLaptop } from "../three/laptop.js";

const EASTER_EGG = "KAM1196A";

export default function Hero({ content, laptopOptions, onLaptopReady }) {
  const { head, sub, headDone, subDone } = useTypewriter(content.name, content.sub);
  const [first, ...rest] = head.split(" ");
  const linkAt = content.sub.lastIndexOf("CTS.");
  const firstNameRef = useRef(null);
  const eggTextRef = useRef(null);
  const [eggSelection, setEggSelection] = useState(null);

  useEffect(() => {
    if (!headDone) return;
    const firstName = firstNameRef.current;
    const eggText = eggTextRef.current;
    const fitEggToName = () => {
      eggText.style.transform = `scaleX(${firstName.offsetWidth / eggText.scrollWidth})`;
    };
    const ro = new ResizeObserver(fitEggToName);
    ro.observe(firstName);
    fitEggToName();
    return () => ro.disconnect();
  }, [headDone]);

  useEffect(() => {
    if (!headDone) return;
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const textNode = firstNameRef.current.firstChild;
      if (!selection || selection.isCollapsed || !selection.rangeCount || !selection.getRangeAt(0).intersectsNode(textNode)) {
        setEggSelection(null);
        return;
      }
      const range = selection.getRangeAt(0);
      const selectedPart = document.createRange();
      selectedPart.selectNodeContents(textNode);
      if (range.compareBoundaryPoints(Range.START_TO_START, selectedPart) > 0) selectedPart.setStart(range.startContainer, range.startOffset);
      if (range.compareBoundaryPoints(Range.END_TO_END, selectedPart) < 0) selectedPart.setEnd(range.endContainer, range.endOffset);
      const nameBox = firstNameRef.current.getBoundingClientRect();
      const partBox = selectedPart.getBoundingClientRect();
      if (partBox.width === 0) { setEggSelection(null); return; }
      setEggSelection({
        left: partBox.left - nameBox.left,
        right: nameBox.right - partBox.right,
        start: selectedPart.startOffset,
        end: selectedPart.endOffset,
        length: textNode.length,
      });
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, [headDone]);

  const handleCopy = (e) => {
    if (!eggSelection) return;
    const { start, end, length } = eggSelection;
    const toEggIndex = (i) => Math.round((i / length) * EASTER_EGG.length);
    const selected = window.getSelection().toString();
    const nameIndex = selected.toLowerCase().indexOf(content.name.split(" ")[0].slice(start, end).toLowerCase());
    if (nameIndex < 0) return;
    e.preventDefault();
    const eggPart = EASTER_EGG.slice(toEggIndex(start), toEggIndex(end));
    e.clipboardData.setData("text/plain", selected.slice(0, nameIndex) + eggPart + selected.slice(nameIndex + end - start));
  };

  return (
    <div className="hero-layout">
      <section className="hero">
        <a href="#work" className="award-pill">
          <span className="award-pill__tag">★ 2025 Winner</span>
          HR Tech Awards · Best Innovative Talent Analytics
        </a>
        <h1 className="hero__name" aria-label={content.name} onCopy={handleCopy}>
          <span aria-hidden="true">
            <span ref={firstNameRef} className={"hero__first" + (headDone ? " has-egg" : "")}>
              {first}
              {headDone && (
                <span
                  className="hero__egg"
                  style={{ clipPath: eggSelection ? `inset(0 ${eggSelection.right}px 0 ${eggSelection.left}px)` : "inset(0 100% 0 0)" }}
                >
                  <span ref={eggTextRef} className="hero__egg-text">{EASTER_EGG}</span>
                </span>
              )}
            </span>
            <br />{rest.join(" ")}
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
    </div>
  );
}
