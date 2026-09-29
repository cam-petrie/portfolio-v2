export const ROUND_MS = 30000;

const START_LIFE_MS = 2100;
const END_LIFE_MS = 1300;
const GROW_PORTION = 0.12;
const SPAWN_GAP_MS = 380;
const MAX_TARGETS = 3;
const MIN_RADIUS = 28;
const MAX_RADIUS = 44;
const HIT_SLOP = 6;
const STREAK_STEP = 0.1;
const MAX_STREAK_BONUS = 1;
const RING_POINTS = [
  [0.38, 100],
  [0.7, 75],
  [1, 50],
];
const BURST_MS = 700;
const MISS_MS = 260;
const PARTICLES = 10;

const freshStats = () => ({ score: 0, hits: 0, shots: 0, expired: 0, streak: 0, bestStreak: 0, reactionTotal: 0 });

// Canvas aim trainer: targets grow in then shrink away; hits score by ring, streaks multiply.
export function mountAimTrainer(canvas, { topInset = 0, onStats, onEnd }) {
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let colors = null;
  let stats = freshStats();
  let targets = [];
  let bursts = [];
  let misses = [];
  let elapsed = 0;
  let lastSpawn = -Infinity;
  let lastNow = null;
  let lastTenth = null;
  let running = false;
  let raf = 0;

  const readColors = () => {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    colors = {
      ring: style.getPropertyValue("--cursor").trim(),
      accent: style.getPropertyValue("--accent").trim(),
      muted: style.getPropertyValue("--muted").trim(),
      dark: root.dataset.theme !== "light",
    };
    draw(performance.now());
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(performance.now());
  };

  const snapshot = () => ({
    score: stats.score,
    hits: stats.hits,
    shots: stats.shots,
    expired: stats.expired,
    streak: stats.streak,
    bestStreak: stats.bestStreak,
    accuracy: stats.shots ? stats.hits / stats.shots : 0,
    avgReaction: stats.hits ? stats.reactionTotal / stats.hits : 0,
    timeLeft: Math.max(0, ROUND_MS - elapsed),
  });
  const emitStats = () => onStats?.(snapshot());

  const progress = () => Math.min(1, elapsed / ROUND_MS);
  const maxRadius = () => Math.max(MIN_RADIUS, Math.min(MAX_RADIUS, Math.min(width, height) * 0.06));

  const radiusOf = (target) => {
    const age = (elapsed - target.born) / target.life;
    const scale = age < GROW_PORTION ? age / GROW_PORTION : 1 - (age - GROW_PORTION) / (1 - GROW_PORTION);
    return target.maxR * Math.max(0, scale);
  };

  const spawnTarget = () => {
    const maxR = maxRadius();
    const margin = maxR + 12;
    let x = width / 2;
    let y = (height + topInset) / 2;
    for (let tries = 0; tries < 12; tries++) {
      x = margin + Math.random() * (width - margin * 2);
      y = topInset + margin + Math.random() * (height - topInset - margin * 2);
      if (targets.every((t) => Math.hypot(t.x - x, t.y - y) > maxR * 2.6)) break;
    }
    targets.push({ x, y, maxR, born: elapsed, life: START_LIFE_MS + (END_LIFE_MS - START_LIFE_MS) * progress() });
    lastSpawn = elapsed;
  };

  const makeParticles = () =>
    reduceMotion
      ? []
      : Array.from({ length: PARTICLES }, (_, i) => ({
          angle: (i / PARTICLES) * Math.PI * 2 + Math.random() * 0.4,
          distance: 28 + Math.random() * 26,
          size: 1.5 + Math.random() * 2,
        }));

  const scheduleFrame = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };

  const handlePointerDown = (e) => {
    if (!running || e.button > 0) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();
    stats.shots += 1;

    let hit = null;
    let hitRatio = 1;
    for (let i = targets.length - 1; i >= 0; i--) {
      const radius = radiusOf(targets[i]);
      const distance = Math.hypot(targets[i].x - x, targets[i].y - y);
      if (radius > 0 && distance <= radius + HIT_SLOP) {
        hit = targets[i];
        hitRatio = Math.min(1, distance / radius);
        break;
      }
    }

    if (!hit) {
      stats.streak = 0;
      misses.push({ x, y, born: now });
      emitStats();
      scheduleFrame();
      return;
    }

    const radius = radiusOf(hit);
    targets = targets.filter((t) => t !== hit);
    stats.hits += 1;
    stats.streak += 1;
    stats.bestStreak = Math.max(stats.bestStreak, stats.streak);
    stats.reactionTotal += elapsed - hit.born;
    const base = RING_POINTS.find(([limit]) => hitRatio <= limit)[1];
    const multiplier = 1 + Math.min(MAX_STREAK_BONUS, (stats.streak - 1) * STREAK_STEP);
    const points = Math.round(base * multiplier);
    stats.score += points;
    bursts.push({ x: hit.x, y: hit.y, radius, born: now, label: `+${points}`, bullseye: base === 100, particles: makeParticles() });
    emitStats();
    scheduleFrame();
  };

  const circle = (x, y, r) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
  };

  const drawTarget = (target) => {
    const r = radiusOf(target);
    if (r <= 0.5) return;
    ctx.lineWidth = 2;
    ctx.strokeStyle = colors.ring;
    ctx.fillStyle = colors.ring;
    circle(target.x, target.y, r);
    ctx.globalAlpha = 0.12;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.stroke();
    circle(target.x, target.y, r * 0.66);
    ctx.stroke();
    circle(target.x, target.y, r * 0.33);
    ctx.fillStyle = colors.accent;
    ctx.fill();
    if (!colors.dark) ctx.stroke();
  };

  const drawBurst = (burst, now) => {
    const t = Math.min(1, (now - burst.born) / BURST_MS);
    const ease = 1 - Math.pow(1 - t, 3);
    const fade = 1 - t;

    ctx.globalAlpha = fade;
    ctx.lineWidth = 2;
    ctx.strokeStyle = colors.ring;
    circle(burst.x, burst.y, burst.radius + ease * 30);
    ctx.stroke();

    ctx.fillStyle = colors.dark ? colors.accent : colors.ring;
    burst.particles.forEach((p) => {
      circle(burst.x + Math.cos(p.angle) * p.distance * ease, burst.y + Math.sin(p.angle) * p.distance * ease, p.size * fade + 0.5);
      ctx.fill();
    });

    ctx.font = `800 ${burst.bullseye ? 20 : 16}px Archivo, system-ui, sans-serif`;
    ctx.fontStretch = "expanded";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = colors.ring;
    ctx.fillText(burst.bullseye ? `BULLSEYE ${burst.label}` : burst.label, burst.x, burst.y - burst.radius - 10 - ease * 26);
    ctx.globalAlpha = 1;
  };

  const drawMiss = (miss, now) => {
    const t = Math.min(1, (now - miss.born) / MISS_MS);
    const size = 5 + t * 4;
    ctx.globalAlpha = 1 - t;
    ctx.lineWidth = 2;
    ctx.strokeStyle = colors.muted;
    ctx.beginPath();
    ctx.moveTo(miss.x - size, miss.y - size);
    ctx.lineTo(miss.x + size, miss.y + size);
    ctx.moveTo(miss.x + size, miss.y - size);
    ctx.lineTo(miss.x - size, miss.y + size);
    ctx.stroke();
    ctx.globalAlpha = 1;
  };

  function draw(now) {
    if (!colors) return;
    ctx.clearRect(0, 0, width, height);
    targets.forEach(drawTarget);
    bursts.forEach((b) => drawBurst(b, now));
    misses.forEach((m) => drawMiss(m, now));
  }

  function frame(now) {
    raf = 0;
    const dt = lastNow === null ? 0 : Math.min(50, now - lastNow);
    lastNow = now;

    if (running) {
      elapsed += dt;
      const alive = targets.filter((t) => elapsed - t.born < t.life);
      if (alive.length < targets.length) {
        stats.expired += targets.length - alive.length;
        stats.streak = 0;
        targets = alive;
        emitStats();
      }
      const allowed = Math.min(MAX_TARGETS, 1 + Math.floor(progress() * 2.5));
      if (targets.length < allowed && elapsed - lastSpawn >= SPAWN_GAP_MS) spawnTarget();

      const tenth = Math.ceil((ROUND_MS - elapsed) / 100);
      if (tenth !== lastTenth) {
        lastTenth = tenth;
        emitStats();
      }
      if (elapsed >= ROUND_MS) {
        running = false;
        targets = [];
        onEnd?.(snapshot());
      }
    }

    bursts = bursts.filter((b) => now - b.born < BURST_MS);
    misses = misses.filter((m) => now - m.born < MISS_MS);
    draw(now);
    if (running || bursts.length || misses.length) scheduleFrame();
  }

  const handleVisibility = () => {
    lastNow = null;
  };

  readColors();
  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", handleVisibility);
  canvas.addEventListener("pointerdown", handlePointerDown);
  const themeObserver = new MutationObserver(readColors);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  return {
    start() {
      stats = freshStats();
      targets = [];
      elapsed = 0;
      lastSpawn = -Infinity;
      lastNow = null;
      lastTenth = null;
      running = true;
      emitStats();
      spawnTarget();
      scheduleFrame();
    },
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      themeObserver.disconnect();
    },
  };
}
