import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0E0E0E" : "#F2F0EB");
    try { localStorage.setItem("cp-theme", theme); } catch (e) {}
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

// Types `heading` then `sub`, mirroring the portfolio-v2 About typewriter.
export function useTypewriter(heading, sub, { headMs = 55, subMs = 18 } = {}) {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [h, setH] = useState(reduce ? heading.length : 0);
  const [s, setS] = useState(reduce ? sub.length : 0);
  useEffect(() => {
    if (h < heading.length) { const t = setTimeout(() => setH(h + 1), headMs); return () => clearTimeout(t); }
    if (s < sub.length) { const t = setTimeout(() => setS(s + 1), subMs); return () => clearTimeout(t); }
  }, [h, s, heading, sub, headMs, subMs]);
  return { head: heading.slice(0, h), sub: sub.slice(0, s), headDone: h >= heading.length, subDone: s >= sub.length };
}
