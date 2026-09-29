import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { mountAimTrainer, ROUND_MS } from "../game/aimTrainer.js";

const BEST_KEY = "cp-aim-best";
const COUNTDOWN_FROM = 3;
const COUNTDOWN_STEP_MS = 650;
const SCROLL_KEYS = new Set([" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"]);

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch (e) {
    return 0;
  }
};
const saveBest = (score) => {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch (e) {}
};
const formatSeconds = (ms) => (ms / 1000).toFixed(1);
const formatPercent = (ratio) => `${Math.round(ratio * 100)}%`;
const formatReaction = (ms) => (ms ? `${Math.round(ms)}ms` : "—");

const HudStat = ({ label, value, optional = false }) => (
  <span className={"hud__stat" + (optional ? " hud__stat--optional" : "")}>
    <span className="hud__label">{label}</span>
    <span className="hud__value">{value}</span>
  </span>
);

// Full-screen aim trainer overlay; the scoreboard renders into the header's #game-hud slot.
export default function AimTrainer({ onExit }) {
  const overlayRef = useRef(null);
  const canvasRef = useRef(null);
  const startRef = useRef(null);
  const againRef = useRef(null);
  const engine = useRef(null);
  const bestRef = useRef(readBest());
  const [phase, setPhase] = useState("ready");
  const [count, setCount] = useState(COUNTDOWN_FROM);
  const [stats, setStats] = useState(null);
  const [best, setBest] = useState(bestRef.current);
  const [isNewBest, setIsNewBest] = useState(false);
  const [hudTarget, setHudTarget] = useState(null);

  useEffect(() => {
    setHudTarget(document.getElementById("game-hud"));
    const root = document.documentElement;
    const previousFocus = document.activeElement;
    root.classList.add("game-open");
    startRef.current?.focus();

    const handleEnd = (final) => {
      setStats(final);
      const record = final.score > bestRef.current;
      if (record) {
        bestRef.current = final.score;
        saveBest(final.score);
        setBest(final.score);
      }
      setIsNewBest(record);
      setPhase("results");
    };

    const topInset = document.querySelector(".header")?.offsetHeight ?? 0;
    engine.current = mountAimTrainer(canvasRef.current, { topInset, onStats: setStats, onEnd: handleEnd });

    return () => {
      engine.current.dispose();
      root.classList.remove("game-open");
      const returnFocus = previousFocus && previousFocus !== document.body ? previousFocus : document.querySelector(".game-toggle");
      returnFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onExit();
        return;
      }
      if (SCROLL_KEYS.has(e.key) && !e.target.closest?.("button, a, input, textarea")) e.preventDefault();
    };
    overlay.addEventListener("wheel", handleWheel, { passive: false });
    overlay.addEventListener("touchmove", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      overlay.removeEventListener("wheel", handleWheel);
      overlay.removeEventListener("touchmove", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onExit]);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (count === 0) {
      setPhase("playing");
      engine.current.start();
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), COUNTDOWN_STEP_MS);
    return () => clearTimeout(timer);
  }, [phase, count]);

  useEffect(() => {
    if (phase === "results") againRef.current?.focus();
  }, [phase]);

  const handleStart = () => {
    setStats(null);
    setIsNewBest(false);
    setCount(COUNTDOWN_FROM);
    setPhase("countdown");
  };

  return (
    <div ref={overlayRef} className="game" role="dialog" aria-modal="true" aria-label="Aim trainer game">
      <canvas ref={canvasRef} className="game__canvas" aria-hidden="true" />

      {phase === "ready" && (
        <div className="game__panel">
          <span className="eyebrow">Game mode</span>
          <h2 className="game__title">Aim trainer</h2>
          <p className="muted game__copy">
            Hit as many targets as you can in 30 seconds. Center hits score more, and every hit in a row adds a streak bonus.
          </p>
          <div className="game__legend" aria-hidden="true">
            <span><i className="game__ring game__ring--outer" />50</span>
            <span><i className="game__ring game__ring--middle" />75</span>
            <span><i className="game__ring game__ring--center" />100</span>
          </div>
          <div className="game__actions">
            <button ref={startRef} type="button" className="btn btn--accent" onClick={handleStart}>Start</button>
            <button type="button" className="btn btn--outline" onClick={onExit}>Exit</button>
          </div>
          <span className="xsmall muted">Best score: {best} · Press Esc to exit</span>
        </div>
      )}

      {phase === "countdown" && count > 0 && (
        <div key={count} className="game__count" aria-live="assertive">{count}</div>
      )}

      {phase === "results" && stats && (
        <div className="game__panel" aria-live="polite">
          <span className="eyebrow">Time!</span>
          <h2 className="game__title">{stats.score.toLocaleString()}</h2>
          {isNewBest ? <span className="game__badge">New best</span> : <span className="xsmall muted">Best score: {best}</span>}
          <dl className="game__stats">
            <div><dt>Accuracy</dt><dd>{formatPercent(stats.accuracy)}</dd></div>
            <div><dt>Avg reaction</dt><dd>{formatReaction(stats.avgReaction)}</dd></div>
            <div><dt>Hits</dt><dd>{stats.hits}<span className="muted small"> / {stats.hits + stats.expired}</span></dd></div>
            <div><dt>Best streak</dt><dd>{stats.bestStreak}</dd></div>
          </dl>
          <div className="game__actions">
            <button ref={againRef} type="button" className="btn btn--accent" onClick={handleStart}>Play again</button>
            <button type="button" className="btn btn--outline" onClick={onExit}>Exit</button>
          </div>
        </div>
      )}

      {hudTarget &&
        createPortal(
          <>
            <HudStat label="Score" value={(stats?.score ?? 0).toLocaleString()} />
            <HudStat label="Time" value={formatSeconds(stats?.timeLeft ?? ROUND_MS)} />
            <HudStat label="Streak" value={`×${stats?.streak ?? 0}`} />
            <HudStat label="Accuracy" value={formatPercent(stats?.accuracy ?? 0)} optional />
            <HudStat label="Best" value={best.toLocaleString()} optional />
          </>,
          hudTarget
        )}
    </div>
  );
}
