import { TEAMS } from "./graph.js";

const REPULSION = 700;
const SPRING = 0.05;
const TEAM_TIE_LENGTH = 34;
const CROSS_TIE_LENGTH = 90;
const GRAVITY = 0.012;
const FRICTION = 0.6;
const ALPHA_MIN = 0.004;
const VIEW_PADDING = 28;
const HIT_SLOP = 6;
const DRAG_THRESHOLD = 4;

const nodeRadius = (n) => 3 + (n.brokerScore / 100) * 7;

export function mountNetworkCanvas(canvas, network, { getView, onHover, onSelect }) {
  const ctx = canvas.getContext("2d");
  const { nodes, edges } = network;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width = 1, height = 1;
  let alpha = 0, alphaTarget = 0;
  let view = null;
  let raf = 0;
  let visible = false;
  let started = false;
  let drag = null;
  let hoveredId = null;

  const tick = () => {
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d2 = dx * dx + dy * dy + 0.01;
        if (d2 > 160000) continue;
        const d = Math.sqrt(d2);
        const f = (REPULSION * alpha) / d2;
        const fx = (dx / d) * f, fy = (dy / d) * f;
        a.vx -= fx; a.vy -= fy;
        b.vx += fx; b.vy += fy;
      }
    }
    edges.forEach(({ source: a, target: b, crossTeam }) => {
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const f = (d - (crossTeam ? CROSS_TIE_LENGTH : TEAM_TIE_LENGTH)) * SPRING * alpha;
      const fx = (dx / d) * f, fy = (dy / d) * f;
      a.vx += fx; a.vy += fy;
      b.vx -= fx; b.vy -= fy;
    });
    nodes.forEach((n) => {
      if (n.fx !== null) { n.x = n.fx; n.y = n.fy; n.vx = n.vy = 0; return; }
      n.vx = (n.vx - n.x * GRAVITY * alpha) * FRICTION;
      n.vy = (n.vy - n.y * GRAVITY * alpha) * FRICTION;
      n.x += n.vx;
      n.y += n.vy;
    });
    alpha += (alphaTarget - alpha) * 0.02;
  };

  const fitView = () => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    nodes.forEach((n) => {
      minX = Math.min(minX, n.x); maxX = Math.max(maxX, n.x);
      minY = Math.min(minY, n.y); maxY = Math.max(maxY, n.y);
    });
    const s = Math.min(2.4, (width - VIEW_PADDING * 2) / (maxX - minX || 1), (height - VIEW_PADDING * 2) / (maxY - minY || 1));
    return { s, x: width / 2 - ((minX + maxX) / 2) * s, y: height / 2 - ((minY + maxY) / 2) * s };
  };

  const easeView = (snap) => {
    const target = fitView();
    if (!view || snap) { view = target; return false; }
    if (drag) return false;
    view.s += (target.s - view.s) * 0.12;
    view.x += (target.x - view.x) * 0.12;
    view.y += (target.y - view.y) * 0.12;
    return Math.abs(target.s - view.s) > 0.001 || Math.abs(target.x - view.x) > 0.3 || Math.abs(target.y - view.y) > 0.3;
  };

  const draw = () => {
    if (!view) return;
    const css = getComputedStyle(document.documentElement);
    const muted = css.getPropertyValue("--muted").trim();
    const ink = css.getPropertyValue("--ink").trim();
    const highlight = css.getPropertyValue("--accent-text").trim();
    const { colorBy, selectedId } = getView();
    const focusId = hoveredId ?? selectedId;
    const focus = focusId === null ? null : nodes[focusId];
    const inFocus = (n) => !focus || n === focus || focus.neighbors.includes(n.id);
    const sx = (n) => n.x * view.s + view.x;
    const sy = (n) => n.y * view.s + view.y;

    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    ctx.clearRect(0, 0, width, height);

    ctx.lineWidth = 1;
    edges.forEach((e) => {
      const touchesFocus = focus && (e.source === focus || e.target === focus);
      ctx.strokeStyle = touchesFocus ? highlight : muted;
      ctx.globalAlpha = touchesFocus ? 0.9 : focus ? 0.05 : e.crossTeam ? 0.28 : 0.16;
      ctx.beginPath();
      ctx.moveTo(sx(e.source), sy(e.source));
      ctx.lineTo(sx(e.target), sy(e.target));
      ctx.stroke();
    });

    nodes.forEach((n) => {
      const isBroker = n.brokerScore >= 35;
      ctx.globalAlpha = inFocus(n) ? (colorBy === "team" || isBroker ? 1 : 0.45) : 0.12;
      ctx.fillStyle = colorBy === "team" ? TEAMS[n.team].color : isBroker ? highlight : muted;
      ctx.beginPath();
      ctx.arc(sx(n), sy(n), nodeRadius(n), 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    if (focus) {
      ctx.strokeStyle = ink;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(sx(focus), sy(focus), nodeRadius(focus) + 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = ink;
      ctx.font = "700 12px Archivo, system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      const labelX = Math.min(sx(focus) + nodeRadius(focus) + 8, width - 90);
      ctx.fillText(focus.label.replace("Employee ", ""), labelX, sy(focus));
    }
  };

  const frame = () => {
    raf = 0;
    const simulating = alpha > ALPHA_MIN || alphaTarget > 0;
    if (simulating) tick();
    const easing = easeView(false);
    draw();
    if (visible && (simulating || easing || drag)) raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (visible && !raf) raf = requestAnimationFrame(frame); };

  const start = () => {
    started = true;
    if (reduceMotion) {
      alpha = 1;
      for (let i = 0; i < 400; i++) { tick(); alpha *= 0.985; }
      alpha = 0;
      easeView(true);
      draw();
      return;
    }
    alpha = 1;
    easeView(true);
    kick();
  };

  const resize = () => {
    width = canvas.clientWidth || 1;
    height = canvas.clientHeight || 1;
    canvas.width = Math.round(width * devicePixelRatio);
    canvas.height = Math.round(height * devicePixelRatio);
    if (!started) return;
    easeView(true);
    draw();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) return;
    if (!started) start();
    else kick();
  }, { threshold: 0.25 });
  io.observe(canvas);

  const pointerPosition = (e) => {
    const rect = canvas.getBoundingClientRect();
    return { px: e.clientX - rect.left, py: e.clientY - rect.top };
  };
  const nodeAt = (px, py) => {
    if (!view) return null;
    let best = null, bestDistance = Infinity;
    nodes.forEach((n) => {
      const d = Math.hypot(n.x * view.s + view.x - px, n.y * view.s + view.y - py);
      if (d < nodeRadius(n) + HIT_SLOP && d < bestDistance) { best = n; bestDistance = d; }
    });
    return best;
  };
  const setHovered = (id) => {
    if (id === hoveredId) return;
    hoveredId = id;
    canvas.style.cursor = id === null ? "default" : "pointer";
    onHover(id);
    draw();
  };

  const handlePointerDown = (e) => {
    const { px, py } = pointerPosition(e);
    const node = nodeAt(px, py);
    if (!node) return;
    drag = { node, startX: px, startY: py, moved: false };
    node.fx = node.x;
    node.fy = node.y;
    canvas.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e) => {
    const { px, py } = pointerPosition(e);
    if (!drag) { setHovered(nodeAt(px, py)?.id ?? null); return; }
    if (!drag.moved && Math.hypot(px - drag.startX, py - drag.startY) < DRAG_THRESHOLD) return;
    if (!drag.moved) { drag.moved = true; alphaTarget = 0.25; canvas.style.cursor = "grabbing"; }
    drag.node.fx = (px - view.x) / view.s;
    drag.node.fy = (py - view.y) / view.s;
    kick();
  };
  const handlePointerUp = (e) => {
    if (!drag) {
      const { px, py } = pointerPosition(e);
      if (!nodeAt(px, py)) onSelect(null);
      return;
    }
    const { node, moved } = drag;
    node.fx = node.fy = null;
    drag = null;
    alphaTarget = 0;
    canvas.style.cursor = "pointer";
    if (!moved) onSelect(node.id);
    kick();
  };
  const handlePointerLeave = () => { if (!drag) setHovered(null); };

  canvas.addEventListener("pointerdown", handlePointerDown);
  canvas.addEventListener("pointermove", handlePointerMove);
  canvas.addEventListener("pointerup", handlePointerUp);
  canvas.addEventListener("pointerleave", handlePointerLeave);

  const themeObserver = new MutationObserver(draw);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  return {
    redraw: draw,
    setHovered,
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    },
  };
}
