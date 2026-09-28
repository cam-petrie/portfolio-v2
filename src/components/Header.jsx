export default function Header({ theme, onToggleTheme, resume }) {
  const dark = theme === "dark";
  return (
    <header className="header">
      <div className="wrap header__inner">
        <a href="#top" className="brand">
          <span className="brand__mark">CP</span>
          <span>Cameron Petrie</span>
        </a>
        <nav className="header__nav" aria-label="Sections">
          <a href="#work">Work</a>
          <a href="#blender">3D</a>
          <a href="#contact">Contact</a>
        </nav>
        <span className="header__status"><span className="dot" />Open to roles</span>
        <div className="header__tools">
          <button className="icon-btn" onClick={onToggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
            )}
          </button>
          <a className="btn-resume" href={resume} download="Cameron Petrie Resume.pdf">Résumé ↓</a>
        </div>
      </div>
    </header>
  );
}
