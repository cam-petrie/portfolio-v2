// Synthetic organizational network. Seeded so every visitor sees the same company.
export const TEAMS = [
  { name: "Engineering", size: 34, color: "#4f9dde" },
  { name: "Product", size: 18, color: "#8f6bd6" },
  { name: "Sales", size: 28, color: "#e0873f" },
  { name: "Marketing", size: 20, color: "#d9577a" },
  { name: "People", size: 16, color: "#2fa58f" },
  { name: "Finance", size: 14, color: "#c9a227" },
];

const WITHIN_TEAM_TIE_CHANCE = 0.14;
const BROKER_COUNT = 8;
const RANDOM_CROSS_TIES = 20;

function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Brandes' algorithm: how often a person sits on the shortest path between two others.
function betweenness(adj) {
  const n = adj.length;
  const scores = new Float64Array(n);
  for (let s = 0; s < n; s++) {
    const stack = [];
    const pred = Array.from({ length: n }, () => []);
    const sigma = new Float64Array(n);
    const dist = new Int32Array(n).fill(-1);
    sigma[s] = 1;
    dist[s] = 0;
    const queue = [s];
    for (let qi = 0; qi < queue.length; qi++) {
      const v = queue[qi];
      stack.push(v);
      for (const w of adj[v]) {
        if (dist[w] < 0) { dist[w] = dist[v] + 1; queue.push(w); }
        if (dist[w] === dist[v] + 1) { sigma[w] += sigma[v]; pred[w].push(v); }
      }
    }
    const delta = new Float64Array(n);
    while (stack.length) {
      const w = stack.pop();
      for (const v of pred[w]) delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]);
      if (w !== s) scores[w] += delta[w];
    }
  }
  return scores;
}

export function buildNetwork(seed = 20250) {
  const rand = mulberry32(seed);
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];

  const nodes = [];
  TEAMS.forEach((team, teamIndex) => {
    const angle = (teamIndex / TEAMS.length) * Math.PI * 2;
    for (let i = 0; i < team.size; i++) {
      const id = nodes.length;
      nodes.push({
        id,
        team: teamIndex,
        label: "Employee #" + String(id + 1).padStart(3, "0"),
        x: Math.cos(angle) * 180 + (rand() - 0.5) * 80,
        y: Math.sin(angle) * 180 + (rand() - 0.5) * 80,
        vx: 0, vy: 0, fx: null, fy: null,
      });
    }
  });

  const tieKeys = new Set();
  const edges = [];
  const addTie = (a, b) => {
    if (a === b) return;
    const key = a < b ? a + "-" + b : b + "-" + a;
    if (tieKeys.has(key)) return;
    tieKeys.add(key);
    edges.push({ source: nodes[a], target: nodes[b], crossTeam: nodes[a].team !== nodes[b].team });
  };

  const members = TEAMS.map((_, t) => nodes.filter((n) => n.team === t).map((n) => n.id));
  members.forEach((ids) => {
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) if (rand() < WITHIN_TEAM_TIE_CHANCE) addTie(ids[i], ids[j]);
    }
  });

  const hasTie = (id) => edges.some((e) => e.source.id === id || e.target.id === id);
  nodes.forEach((n) => { if (!hasTie(n.id)) addTie(n.id, pick(members[n.team])); });

  for (let b = 0; b < BROKER_COUNT; b++) {
    const broker = pick(nodes);
    const reach = 4 + Math.floor(rand() * 4);
    for (let k = 0; k < reach; k++) {
      const other = pick(nodes);
      if (other.team !== broker.team) addTie(broker.id, other.id);
    }
  }
  for (let k = 0; k < RANDOM_CROSS_TIES; k++) {
    const a = pick(nodes), b = pick(nodes);
    if (a.team !== b.team) addTie(a.id, b.id);
  }

  const adj = nodes.map(() => []);
  edges.forEach((e) => { adj[e.source.id].push(e.target.id); adj[e.target.id].push(e.source.id); });
  const raw = betweenness(adj);
  const maxRaw = Math.max(...raw) || 1;

  nodes.forEach((n) => {
    n.neighbors = adj[n.id];
    n.degree = adj[n.id].length;
    n.crossTeamTies = adj[n.id].filter((id) => nodes[id].team !== n.team).length;
    n.brokerScore = Math.round((raw[n.id] / maxRaw) * 100);
  });

  const possibleTies = (nodes.length * (nodes.length - 1)) / 2;
  return {
    nodes,
    edges,
    stats: {
      people: nodes.length,
      ties: edges.length,
      teams: TEAMS.length,
      avgConnections: ((edges.length * 2) / nodes.length).toFixed(1),
      density: Math.round((edges.length / possibleTies) * 1000) / 10,
    },
    topBrokers: [...nodes].sort((a, b) => b.brokerScore - a.brokerScore).slice(0, 5),
  };
}
