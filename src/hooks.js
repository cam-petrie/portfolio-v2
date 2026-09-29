import { useEffect, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Eased wheel/trackpad scrolling. Mouse clicks on in-page links glide too;
// keyboard activation (detail === 0) keeps the native jump so focus moves with it.
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });

    const handleAnchorClick = (e) => {
      if (e.detail === 0 || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = e.target.closest?.('a[href^="#"]');
      const target = link && link.hash.length > 1 && document.querySelector(link.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(link.hash === "#top" ? 0 : target);
      history.pushState(null, "", link.hash);
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);
}

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
