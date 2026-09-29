import { useEffect, useRef } from "react";

const FRAME_SIZE = 34;
const FRAME_EASE = 0.16;
const LOCK_EASE = 0.24;
const GAME_EASE = 0.45;
const LOCK_PADDING = 6;
const LOCK_TARGETS =
  'a[href], button:not(:disabled), [role="button"], summary, select, label[for], input[type="submit"], input[type="button"], input[type="checkbox"], input[type="radio"], [data-cursor-target]';
const TEXT_FIELD = 'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';

// Replaces the mouse pointer with a dot and a trailing square that snaps to the corners of clickable elements.
export default function CustomCursor() {
  const dotRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const dot = dotRef.current;
    const frame = frameRef.current;
    let pointer = null;
    let box = null;
    let target = null;
    let raf = 0;

    const setVisible = (visible) => {
      dot.classList.toggle("is-visible", visible);
      frame.classList.toggle("is-visible", visible);
    };

    const targetBox = () => {
      if (!target || !target.isConnected) {
        return { x: pointer.x, y: pointer.y, w: FRAME_SIZE, h: FRAME_SIZE };
      }
      const rect = target.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        w: rect.width + LOCK_PADDING * 2,
        h: rect.height + LOCK_PADDING * 2,
      };
    };

    const render = () => {
      raf = 0;
      if (!pointer) return;
      const goal = targetBox();
      const ease = reduceMotion ? 1 : target ? LOCK_EASE : root.classList.contains("game-open") ? GAME_EASE : FRAME_EASE;
      box = box ?? { ...goal };
      box.x += (goal.x - box.x) * ease;
      box.y += (goal.y - box.y) * ease;
      box.w += (goal.w - box.w) * ease;
      box.h += (goal.h - box.h) * ease;

      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      frame.style.transform = `translate3d(${box.x - box.w / 2}px, ${box.y - box.h / 2}px, 0)`;
      frame.style.width = `${box.w}px`;
      frame.style.height = `${box.h}px`;

      const settled = Math.abs(goal.x - box.x) + Math.abs(goal.y - box.y) + Math.abs(goal.w - box.w) + Math.abs(goal.h - box.h) < 0.3;
      if (!settled || target) raf = requestAnimationFrame(render);
    };

    const scheduleRender = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const handlePointerMove = (e) => {
      if (e.pointerType !== "mouse") return;
      pointer = { x: e.clientX, y: e.clientY };
      root.classList.add("has-custom-cursor");
      setVisible(!e.target.closest?.(TEXT_FIELD));
      scheduleRender();
    };

    const handlePointerOver = (e) => {
      const lockTarget = e.target.closest?.(LOCK_TARGETS) ?? null;
      if (lockTarget === target) return;
      target = lockTarget;
      frame.classList.toggle("is-locked", Boolean(target));
      dot.classList.toggle("is-locked", Boolean(target));
      scheduleRender();
    };

    const handlePointerOut = (e) => {
      if (e.relatedTarget) return;
      setVisible(false);
    };

    const handlePointerDown = () => frame.classList.add("is-pressed");
    const handlePointerUp = () => frame.classList.remove("is-pressed");

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", scheduleRender, { passive: true });
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", scheduleRender);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={frameRef} className="cursor__frame">
        <span className="cursor__corner cursor__corner--tl" />
        <span className="cursor__corner cursor__corner--tr" />
        <span className="cursor__corner cursor__corner--bl" />
        <span className="cursor__corner cursor__corner--br" />
      </div>
      <div ref={dotRef} className="cursor__dot" />
    </div>
  );
}
