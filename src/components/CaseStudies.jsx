import { useState } from "react";
import Media from "./Media.jsx";

function CaseCard({ c, index, metrics, disciplines }) {
  const [open, setOpen] = useState(false);
  const flagship = index === 0;
  const id = "case-" + c.slug;
  return (
    <article className={"card case" + (flagship ? " case--flagship" : "")}>
      {c.award && (
        <div className="award-flag">
          <span className="award-flag__icon"><img src="/images/award-icon.png" alt="" /></span>
          <span className="award-flag__tag">2025 Winner</span>
          <span>HR Tech Awards — Best Innovative Talent Analytics, for Cognitive Talent Analyzer™</span>
        </div>
      )}
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
          <button className="btn btn--outline btn--sm" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
            {open ? "Close case study" : "Read case study"} <span aria-hidden="true">{open ? "−" : "+"}</span>
          </button>
        </div>
        <Media className="case__media" src={c.img} alt={c.title} />
      </div>
      {c.stats && (
        <dl className="stats">
          {metrics.map((m) => (
            <div key={m.l}><dt>{m.l}</dt><dd>{m.n}</dd></div>
          ))}
        </dl>
      )}
      {open && (
        <dl className="spec" id={id}>
          <dt>Context</dt><dd>{c.context}</dd>
          <dt>My role</dt><dd>{c.role}</dd>
          <dt>What I built</dt>
          <dd><ul className="dash">{c.built.map((b) => <li key={b}>{b}</li>)}</ul></dd>
          <dt className="accent-text">Outcome</dt><dd className="strong">{c.outcome}</dd>
          <dt>Stack</dt><dd>{c.stack.join(" · ")}</dd>
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
