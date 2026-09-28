import { useEffect, useRef, useState } from "react";
import Media from "./Media.jsx";

// Must match the .case__panel / .case__stage transition durations in styles.css.
const RISE_MS = 380;
const GROW_MS = 420;

function AwardRibbon() {
  const ribbonRef = useRef(null);
  const [wrapped, setWrapped] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setWrapped(true);
      io.disconnect();
    }, { threshold: 0.6 });
    io.observe(ribbonRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ribbonRef} className={"award-flag" + (wrapped ? " is-wrapped" : "")}>
      <div className="award-flag__band">
        <span className="award-flag__icon"><img src="/images/award-icon.png" alt="" /></span>
        <span className="award-flag__tag">2025 Winner</span>
        <span>HR Tech Awards — Best Innovative Talent Analytics, for Cognitive Talent Analyzer™</span>
      </div>
    </div>
  );
}

function CaseCard({ c, index, metrics, disciplines }) {
  const [phase, setPhase] = useState("closed");
  const stageRef = useRef(null);
  const innerRef = useRef(null);
  const closedHeight = useRef(0);
  const timer = useRef(0);
  const flagship = index === 0;
  const id = "case-" + c.slug;
  const open = phase === "rising" || phase === "open";

  const later = (fn, ms) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(fn, ms);
  };
  const expandedHeight = () => Math.max(closedHeight.current, innerRef.current.offsetHeight);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (phase !== "open") return;
    const ro = new ResizeObserver(() => { stageRef.current.style.height = expandedHeight() + "px"; });
    ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, [phase]);

  const handleOpen = () => {
    const stage = stageRef.current;
    if (phase === "closed") closedHeight.current = stage.offsetHeight;
    stage.style.height = stage.offsetHeight + "px";
    setPhase("rising");
    later(() => {
      stage.style.height = expandedHeight() + "px";
      setPhase("open");
    }, RISE_MS);
  };

  const handleClose = () => {
    const stage = stageRef.current;
    stage.style.height = closedHeight.current + "px";
    setPhase("collapsing");
    later(() => {
      setPhase("falling");
      later(() => {
        stage.style.height = "";
        setPhase("closed");
      }, RISE_MS);
    }, GROW_MS);
  };

  const handleToggle = () => (open ? handleClose() : handleOpen());

  return (
    <article className={"card case" + (flagship ? " case--flagship" : "")}>
      {c.award && <AwardRibbon />}
      <div className="case__body">
        <div className="case__text">
          <div className="eyebrow">
            <span className="accent-text">Case {String(index + 1).padStart(2, "0")}</span>
            <span>{c.tags.map((t) => disciplines[t].label).join(" / ")}</span>
          </div>
          <h3 className="case__title">{c.title}</h3>
          <p className="muted">{c.summary}</p>
          <ul className="chips">
            {c.stack.slice(0, flagship ? 8 : 5).map((s) => <li key={s}>{s}</li>)}
          </ul>
          <button className="btn btn--outline btn--sm" aria-expanded={open} aria-controls={id} onClick={handleToggle}>
            {open ? "Close case study" : "Read case study"} <span aria-hidden="true">{open ? "−" : "+"}</span>
          </button>
        </div>
        <div className="case__stage" ref={stageRef}>
          <Media className="case__media" src={c.img} alt={c.title} />
          <div className="case__panel" data-phase={phase} id={id} aria-hidden={!open} inert={open ? undefined : ""}>
            <div className="case__panel-inner" ref={innerRef}>
              <div className="case__panel-head">
                <span className="eyebrow"><span className="accent-text">Case study</span></span>
                <button type="button" className="icon-btn" aria-label="Close case study" onClick={handleClose}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"><path d="M5 5l14 14M19 5L5 19" /></svg>
                </button>
              </div>
              <dl className="spec">
                <dt>Context</dt><dd>{c.context}</dd>
                <dt>My role</dt><dd>{c.role}</dd>
                <dt>What I built</dt>
                <dd><ul className="dash">{c.built.map((b) => <li key={b}>{b}</li>)}</ul></dd>
                <dt className="accent-text">Outcome</dt><dd className="strong">{c.outcome}</dd>
                <dt>Stack</dt><dd>{c.stack.join(" · ")}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      {c.stats && (
        <dl className="stats">
          {metrics.map((m) => (
            <div key={m.l}><dt>{m.l}</dt><dd>{m.n}</dd></div>
          ))}
        </dl>
      )}
    </article>
  );
}

export default function CaseStudies({ cases, metrics, disciplines }) {
  return (
    <section id="work" className="section">
      <div className="section__head">
        <h2 className="section__title">Case studies</h2>
        <span className="muted small">0{cases.length} selected · context, role, build, outcome</span>
      </div>
      <div className="case-grid dim-group">
        {cases.map((c, i) => <CaseCard key={c.slug} c={c} index={i} metrics={metrics} disciplines={disciplines} />)}
      </div>
    </section>
  );
}
