import Media from "./Media.jsx";

export default function MoreWork({ items, disciplines }) {
  return (
    <section className="section">
      <div className="section__head">
        <h2 className="section__title">More work</h2>
        <span className="muted small">{items.length} projects</span>
      </div>
      <div className="work-grid dim-group">
        {items.map((o) => {
          const Tag = o.link ? "a" : "div";
          const linkProps = o.link ? { href: o.link, target: "_blank", rel: "noreferrer" } : {};
          return (
            <Tag key={o.title} className={"card work" + (o.link ? " work--link" : "")} data-cursor-target {...linkProps}>
              <Media className="work__media" src={o.img} />
              <span className="work__body">
                <span className="eyebrow"><span>{disciplines[o.tag].label}</span>{o.link && <span className="accent-text">Live ↗</span>}</span>
                <span className="work__title">{o.title}</span>
                <span className="muted small">{o.desc}</span>
                <span className="muted xsmall work__stack">{o.stack.join(" · ")}</span>
              </span>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
