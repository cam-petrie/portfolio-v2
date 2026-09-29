import { useEffect, useRef } from "react";
import { content } from "./data/content.js";
import { useSmoothScroll, useTheme } from "./hooks.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import CaseStudies from "./components/CaseStudies.jsx";
import NetworkExplorer from "./components/NetworkExplorer.jsx";
import MoreWork from "./components/MoreWork.jsx";
import Blender from "./components/Blender.jsx";
import Contact from "./components/Contact.jsx";
import PaintTrail from "./components/PaintTrail.jsx";
import CustomCursor from "./components/CustomCursor.jsx";

const LAPTOP_COLORS = {
  dark: { body: "#d2d4d0", keys: "#0e0e0e", screen: "/images/me-light-shirt.png" },
  light: { body: "#e6e3dc", keys: "#0e0e0e", screen: "/images/me-dark-shirt.png" },
};

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const laptop = useRef(null);
  useSmoothScroll();

  useEffect(() => { laptop.current?.setColors(LAPTOP_COLORS[theme]); }, [theme]);

  return (
    <>
      <PaintTrail />
      <CustomCursor />
      <a className="skip" href="#work">Skip to case studies</a>
      <Header theme={theme} onToggleTheme={toggleTheme} resume={content.resume} />
      <main id="top" className="wrap">
        <Hero
          content={content}
          laptopOptions={{ bodyColor: LAPTOP_COLORS[theme].body, keysColor: LAPTOP_COLORS[theme].keys, screenImage: LAPTOP_COLORS[theme].screen }}
          onLaptopReady={(api) => { laptop.current = api; }}
        />
        <CaseStudies cases={content.cases} metrics={content.metrics} disciplines={content.disciplines} />
        <NetworkExplorer />
        <MoreWork items={content.other} disciplines={content.disciplines} />
        <Blender />
        <Contact content={content} />
      </main>
      <footer className="wrap footer">
        <span>© {new Date().getFullYear()} Cameron Petrie</span>
        <span>MS Computer Science · University of Colorado Boulder</span>
      </footer>
    </>
  );
}
