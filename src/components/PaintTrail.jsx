import { useEffect, useRef } from "react";

const STROKE_LIFE_MS = 1400;
const DROPLET_LIFE_MS = 1100;
const BRUSH_EASE = 0.22;
const MIN_BRUSH = 60;
const MAX_BRUSH = 180;
const FAST_SPEED = 60;
const CORE_SCALE = 0.28;
const SPRITE_SIZE = 128;
const PALETTE_STEPS = 48;
const COLOR_CYCLE_PX = 900;
const SPLATTER_SPEED = 34;
const SPLATTER_CHANCE = 0.3;
const CLICK_DROPLETS = 16;
const THEMES = {
  dark: { colors: ["#4dffa6", "#3ad8ff"], glowAlpha: 0.035, coreAlpha: 0.12, dropletAlpha: 0.55, blend: "lighter" },
  light: { colors: ["#1fc79a", "#1f8fff"], glowAlpha: 0.08, coreAlpha: 0.22, dropletAlpha: 0.5, blend: "source-over" },
};

const hexToRgb = (hex) => {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const mixColors = (stops, t) => {
  const scaled = t * (stops.length - 1);
  const index = Math.min(Math.floor(scaled), stops.length - 2);
  const local = scaled - index;
  return stops[index].map((channel, i) => Math.round(channel + (stops[index + 1][i] - channel) * local));
};

const makeSprite = ([r, g, b], stops) => {
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = SPRITE_SIZE;
  const ctx = sprite.getContext("2d");
  const radius = SPRITE_SIZE / 2;
  const gradient = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
  stops.forEach(([offset, alpha]) => gradient.addColorStop(offset, `rgba(${r}, ${g}, ${b}, ${alpha})`));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
  return sprite;
};

const buildPalette = (accent, theme) => {
  const stops = [accent, ...theme.colors].map(hexToRgb);
  return Array.from({ length: PALETTE_STEPS }, (_, i) => {
    const rgb = mixColors(stops, i / (PALETTE_STEPS - 1));
    return {
      css: `rgb(${rgb.join(", ")})`,
      glow: makeSprite(rgb, [[0, 1], [0.4, 0.6], [1, 0]]),
      core: makeSprite(rgb, [[0, 1], [0.35, 0.9], [1, 0]]),
    };
  });
};

// Neon paint brush that follows the mouse across the page background, shifting color and spraying droplets.
export default function PaintTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let theme = THEMES.dark;
    let palette = [];
    let pointer = null;
    let brush = null;
    let travelled = 0;
    let stamps = [];
    let droplets = [];
    let raf = 0;

    const colorIndexAt = (distance) => {
      const phase = (distance / COLOR_CYCLE_PX) % 2;
      const pingPong = phase > 1 ? 2 - phase : phase;
      return Math.round(pingPong * (PALETTE_STEPS - 1));
    };

    const loadTheme = () => {
      const root = document.documentElement;
      theme = THEMES[root.dataset.theme] ?? THEMES.dark;
      palette = buildPalette(getComputedStyle(root).getPropertyValue("--accent").trim(), theme);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const scheduleFrame = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const sprayDroplets = (x, y, baseAngle, spread, count, speed, born) => {
      for (let i = 0; i < count; i++) {
        const angle = baseAngle + (Math.random() - 0.5) * spread;
        const velocity = speed * (0.35 + Math.random() * 0.65);
        droplets.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          radius: 1.5 + Math.random() * 4.5,
          color: palette[colorIndexAt(travelled + Math.random() * 200)].css,
          born,
        });
      }
    };

    const addStampsAlong = (fromX, fromY, toX, toY, born) => {
      const distance = Math.hypot(toX - fromX, toY - fromY);
      const size = MIN_BRUSH + (Math.min(distance, FAST_SPEED) / FAST_SPEED) * (MAX_BRUSH - MIN_BRUSH);
      const step = Math.max(4, size * 0.1);
      const count = Math.max(1, Math.ceil(distance / step));
      for (let i = 1; i <= count; i++) {
        const t = i / count;
        stamps.push({
          x: fromX + (toX - fromX) * t,
          y: fromY + (toY - fromY) * t,
          size,
          color: colorIndexAt(travelled + distance * t),
          born,
        });
      }
      travelled += distance;

      if (distance > SPLATTER_SPEED && Math.random() < SPLATTER_CHANCE) {
        const heading = Math.atan2(toY - fromY, toX - fromX);
        sprayDroplets(toX, toY, heading, 1.6, 1 + Math.floor(Math.random() * 3), distance * 0.45, born);
      }
    };

    const drawStamps = (now) => {
      ctx.globalCompositeOperation = theme.blend;
      stamps.forEach((s) => {
        const life = 1 - (now - s.born) / STROKE_LIFE_MS;
        const fade = life * Math.sqrt(life);
        const { glow, core } = palette[s.color];
        ctx.globalAlpha = theme.glowAlpha * fade;
        ctx.drawImage(glow, s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
        const coreSize = s.size * CORE_SCALE;
        ctx.globalAlpha = theme.coreAlpha * fade;
        ctx.drawImage(core, s.x - coreSize / 2, s.y - coreSize / 2, coreSize, coreSize);
      });
    };

    const drawDroplets = (now) => {
      ctx.globalCompositeOperation = "source-over";
      droplets.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.88;
        d.vy *= 0.88;
        const life = 1 - (now - d.born) / DROPLET_LIFE_MS;
        ctx.globalAlpha = theme.dropletAlpha * life;
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const frame = (now) => {
      raf = 0;
      let brushMoving = false;
      if (pointer && brush) {
        const fromX = brush.x, fromY = brush.y;
        brush.x += (pointer.x - brush.x) * BRUSH_EASE;
        brush.y += (pointer.y - brush.y) * BRUSH_EASE;
        brushMoving = Math.hypot(brush.x - fromX, brush.y - fromY) > 0.5;
        if (brushMoving) addStampsAlong(fromX, fromY, brush.x, brush.y, now);
      }

      stamps = stamps.filter((s) => now - s.born < STROKE_LIFE_MS);
      droplets = droplets.filter((d) => now - d.born < DROPLET_LIFE_MS);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawStamps(now);
      drawDroplets(now);
      ctx.globalAlpha = 1;

      if (brushMoving || stamps.length || droplets.length) scheduleFrame();
    };

    const handlePointerMove = (e) => {
      if (e.pointerType !== "mouse") return;
      pointer = { x: e.clientX, y: e.clientY };
      if (!brush) brush = { ...pointer };
      scheduleFrame();
    };
    const handlePointerDown = (e) => {
      if (e.pointerType !== "mouse") return;
      sprayDroplets(e.clientX, e.clientY, 0, Math.PI * 2, CLICK_DROPLETS, 16, performance.now());
      scheduleFrame();
    };
    const handlePointerOut = (e) => {
      if (e.relatedTarget) return;
      pointer = null;
      brush = null;
    };

    loadTheme();
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("pointerout", handlePointerOut);
    const themeObserver = new MutationObserver(loadTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerout", handlePointerOut);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="paint-trail" aria-hidden="true" />;
}
