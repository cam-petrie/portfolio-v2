import { useEffect, useMemo, useRef, useState } from "react";
import { TEAMS, buildNetwork } from "../network/graph.js";
import { mountNetworkCanvas } from "../network/canvas.js";

const COLOR_MODES = [
  { id: "team", label: "Team" },
  { id: "broker", label: "Broker score" },
];

function Details({ node, stats }) {
  if (!node) {
    return (
      <div className="network__card" aria-live="polite">
        <div className="eyebrow"><span>Whole network</span><span>Hover or click a person</span></div>
        <dl className="network__stats">
          <div><dt>People</dt><dd>{stats.people}</dd></div>
          <div><dt>Working ties</dt><dd>{stats.ties}</dd></div>
          <div><dt>Teams</dt><dd>{stats.teams}</dd></div>
          <div><dt>Avg. connections</dt><dd>{stats.avgConnections}</dd></div>
        </dl>
        <div className="meter-row">
          <span className="muted xsmall">Density · {stats.density}%</span>
          <span className="meter"><span style={{ width: stats.density * 5 + "%" }} /></span>
        </div>
      </div>
    );
  }
  const team = TEAMS[node.team];
  return (
    <div className="network__card" aria-live="polite">
      <div className="eyebrow"><span className="accent-text">{node.label}</span><span>{node.brokerScore >= 35 ? "Broker" : "Team member"}</span></div>
      <dl className="network__stats">
        <div><dt>Team</dt><dd className="network__team"><span className="swatch" style={{ background: team.color }} />{team.name}</dd></div>
        <div><dt>Connections</dt><dd>{node.degree}</dd></div>
        <div><dt>Cross-team ties</dt><dd>{node.crossTeamTies}</dd></div>
        <div><dt>Broker score</dt><dd>{node.brokerScore}</dd></div>
      </dl>
      <div className="meter-row">
        <span className="muted xsmall">Bridges teams · {node.brokerScore}/100</span>
        <span className="meter"><span style={{ width: node.brokerScore + "%" }} /></span>
      </div>
    </div>
  );
}

export default function NetworkExplorer() {
  const network = useMemo(() => buildNetwork(), []);
  const canvasRef = useRef(null);
  const apiRef = useRef(null);
  const [colorBy, setColorBy] = useState("team");
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const viewRef = useRef({ colorBy, selectedId });
  viewRef.current = { colorBy, selectedId };

  useEffect(() => {
    const api = mountNetworkCanvas(canvasRef.current, network, {
      getView: () => viewRef.current,
      onHover: setHoveredId,
      onSelect: (id) => setSelectedId((current) => (id === null || current === id ? null : id)),
    });
    apiRef.current = api;
    return () => api.dispose();
  }, [network]);

  useEffect(() => { apiRef.current?.redraw(); }, [colorBy, selectedId]);

  const handleBrokerSelect = (id) => setSelectedId((current) => (current === id ? null : id));
  const focusId = hoveredId ?? selectedId;
  const focusNode = focusId === null ? null : network.nodes[focusId];

  return (
    <section id="network" className="section">
      <div className="section__head">
        <h2 className="section__title">Network explorer</h2>
        <span className="muted small">Interactive · synthetic company, computed in your browser</span>
      </div>
      <div className="network">
        <div className="network__panel">
          <p className="lede">Organizational network analysis, <b className="accent-text">live</b>.</p>
          <p className="muted">
            A {network.stats.people}-person company generated on the spot. Each dot is a person and each line a working relationship.
            Brokers, the people who bridge teams, are the ones an organization can least afford to lose. Finding them is the core
            idea behind ActiveONA and the Cognitive Talent Analyzer.
          </p>
          <div className="segmented" role="group" aria-label="Color people by">
            {COLOR_MODES.map((mode) => (
              <button key={mode.id} type="button" aria-pressed={colorBy === mode.id} onClick={() => setColorBy(mode.id)}>
                {mode.label}
              </button>
            ))}
          </div>
          <Details node={focusNode} stats={network.stats} />
          {colorBy === "team" ? (
            <ul className="legend" aria-label="Teams">
              {TEAMS.map((team) => (
                <li key={team.name}><span className="swatch" style={{ background: team.color }} />{team.name}</li>
              ))}
            </ul>
          ) : (
            <p className="muted xsmall network__note">Highlighted people score 35+ on betweenness centrality: they sit on the most shortest paths between colleagues.</p>
          )}
          <div>
            <div className="eyebrow network__brokers-head"><span>Top brokers</span><span>Score</span></div>
            <ul className="network__brokers">
              {network.topBrokers.map((node) => (
                <li key={node.id}>
                  <button
                    type="button"
                    aria-pressed={selectedId === node.id}
                    onClick={() => handleBrokerSelect(node.id)}
                    onMouseEnter={() => apiRef.current?.setHovered(node.id)}
                    onMouseLeave={() => apiRef.current?.setHovered(null)}
                    onFocus={() => apiRef.current?.setHovered(node.id)}
                    onBlur={() => apiRef.current?.setHovered(null)}
                  >
                    <span>{node.label.replace("Employee ", "")} · {TEAMS[node.team].name}</span>
                    <span className="strong">{node.brokerScore}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="network__stage card">
          <canvas
            ref={canvasRef}
            className="network__canvas"
            role="img"
            aria-label={`Interactive network of ${network.stats.people} people across ${network.stats.teams} teams. Use the Top brokers list to explore it with a keyboard.`}
          />
          <span className="network__hint">Drag to rearrange · hover to trace ties · click to inspect</span>
        </div>
      </div>
    </section>
  );
}
