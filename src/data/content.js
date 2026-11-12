// Site content. Edit copy, stats, and projects here.
export const content = {
  name: "Cameron Petrie",
  sub: "Software Engineer. Building some cool things with the team over at CTS.",
  ctsLink: "https://www.cognitivetalentsolutions.com/",
  resume: "/resources/Cameron Petrie_Software_Resume.pdf",
  linkedin: "https://www.linkedin.com/in/cameron-petrie-4b00aa148/",
  github: "https://github.com/cam-petrie",
  disciplines: {
    back:  { label: "Backend",   color: "#1E2761" },
    front: { label: "Frontend",  color: "#9ED6CC" },
    full:  { label: "Full-stack", color: "#9ED6CC" },
    ai:    { label: "AI & Data", color: "#B79CE8" },
    web3:  { label: "Web3",      color: "#F4B58A" },
    vibes: { label: "Vibes",     color: "#9ED6CC" }
  },
  metrics: [
    { n: "390K+", l: "nodes analyzed" },
    { n: "6.92M+", l: "connections mapped" },
    { n: "78", l: "participant countries" },
    { n: "5", l: "survey languages" }
  ],
  cases: [
    {
      code: "CS-01", slug: "cta", award: true, stats: "metrics",
      title: "Cognitive Talent Analyzer™",
      summary: "An AI-driven organizational network analysis platform: survey campaigns in five languages and the 2025 HR Tech Award for Best Innovative Talent Analytics.",
      tags: ["back", "front", "ai"],
      img: "/images/cts.png", imgFit: "cover",
      context: "Enterprise people-analytics platform for survey creation, response tracking, ActiveONA network analysis, participant management, report generation, and AI-assisted insights.",
      role: "Full-stack lead (now CTO) — end-to-end ownership from survey and graph data pipelines to causal analytics and generative-AI experiences in the browser.",
      built: [
        "Scalable ONA + survey backend (Fastify, Drizzle, Postgres, Neo4j, async email campaigns) with secure multi-tenant access",
        "Network graphs, results dashboards, PDF reporting, and E2E-tested release quality",
        "Cogni generative assistant and structured LLM tooling for onboarding and insights",
        "Causal AI dashboards (LiNGAM), retention playbooks, and enterprise ServiceNow integration paths"
      ],
      outcome: "Survey campaigns at five-language scale. Platform named 2025 HR Tech Award winner — Best Innovative Talent Analytics.",
      stack: ["React", "TypeScript", "Zustand", "React Query", "Bun", "Fastify", "PostgreSQL", "Drizzle ORM", "Redis", "Neo4j", "i18next", "OpenAI API"]
    },
    {
      code: "CS-02", slug: "meridian",
      title: "Causal retention · Meridian Network Study 2026",
      summary: "Led a causal retention experience across 69,506 participants — a LiNGAM model surfacing 64 edges and 16 intervention programs, with generative Cogni summaries and playbook-style decision support.",
      tags: ["ai", "front"],
      img: "/images/cogni3.png", imgFit: "cover",
      context: "Turn a large organizational network study into decisions leaders can act on — which interventions move retention, and why.",
      role: "Lead on the causal retention experience — model integration through the decision-support UI.",
      built: [
        "648-row LiNGAM causal model surfacing 64 edges across 16 intervention programs",
        "Generative Cogni summaries and playbook-style decision support",
        "ServiceNow-embeddable five-component dashboard"
      ],
      outcome: "Causal findings for 69,506 participants delivered inside the tools customers already use.",
      stack: ["LiNGAM", "OpenAI API", "LangChain", "Prompt Engineering", "React", "TypeScript", "ServiceNow"]
    },
    {
      code: "CS-03", slug: "ona",
      title: "ActiveONA dashboard & Passive ONA pipeline",
      summary: "An interactive 2D/3D organizational network explorer, fed by pipelines that turn communication and collaboration data into workforce insight.",
      tags: ["front", "back"],
      img: "/images/passive.png", imgFit: "cover",
      context: "Organizational network analysis needs both a data pipeline that respects privacy and an explorer that makes thousands of relationships legible.",
      role: "Built the dashboard frontend and the ONA data pipeline.",
      built: [
        "2D/3D graph visualization with searchable name and manager filters, resizable data drawers, and detail popouts",
        "Privacy-aware name masking and an embedded Cogni assistant that highlights and filters people from chatbot responses",
        "ETL from Microsoft Graph API through Redis/Bull queues into PostgreSQL and Neo4j"
      ],
      outcome: "Collaboration data becomes a navigable network that the assistant can query and filter in place.",
      stack: ["React Force Graph", "D3", "Zustand", "Ant Design", "Fastify", "Redis", "Bull", "Neo4j", "Microsoft Graph API"]
    },
    {
      code: "CS-04", slug: "network-first",
      title: "Network First Platform",
      summary: "Built a collaboration platform where members discover shared interests, vote on proposals, and turn supported ideas into projects they can join.",
      tags: ["full"],
      img: "/images/network-first.png", imgFit: "contain",
      link: "https://network.cognitivetalentsolutions.com/",
      context: "A community needed a way to see who was working on what, find shared interests, and turn ideas into projects with a clear path from proposal to participation.",
      role: "Full-stack development across the network explorer, proposal and project workflows, and production rollout.",
      built: [
        "An interactive map of people and projects built from visible memberships. A deterministic layout keeps the graph stable while members drag nodes.",
        "A workflow from private proposal drafts to ratification and project formation. A database constraint prevents duplicate votes, and project creation is safe to retry.",
        "Member-only workspaces with join approvals, project chat and discussion threads, and controls for project leads to manage membership and hand over responsibility.",
        "A Kubernetes deployment backed by PostgreSQL and a separate identity service, with SQLite retained for local development. Governance tests cover both storage paths."
      ],
      outcome: "Shipped a hosted workspace that brings discovery, proposal voting, and project collaboration together. Production checks confirmed PostgreSQL readiness and the new controls for project leads.",
      stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "SQLite", "Docker", "Kubernetes"]
    }
  ],
  vibes: [
    {
      title: "hive.", tag: "vibes", img: "/images/hive.png", link: "https://hive-one-lac.vercel.app/",
      desc: "A personal food journal for tracking experiences, exploring possible triggers, and comparing ingredients and alternatives. Available on the web, with an iOS app in production.",
      stack: ["Next.js", "TypeScript", "Supabase", "Capacitor", "iOS"]
    },
    {
      title: "Rolecraft", tag: "vibes", img: "/images/rolecraft.png", link: "https://cam-petrie.github.io/rolecraft/",
      desc: "An AI-assisted resume and interview workspace: review role fit, refine your resume with suggestions you approve, save versions, and prepare for interviews.",
      stack: ["React", "OpenAI API", "Cloudflare Workers", "DOCX", "PDF.js"]
    }
  ],
  other: [
    {
      title: "Standalone Project Chat", tag: "full", img: "/images/standalone-project-chat.svg",
      link: "https://github.com/cam-petrie/standalone-project-chat", linkLabel: "GitHub",
      desc: "An embeddable chat component with discussion rooms, threaded replies, per-room drafts, and moderation controls. Includes a runnable reference backend.",
      stack: ["React", "TypeScript", "Node.js", "Vite"]
    },
    { title: "Survey Creation and Management UI", tag: "front", img: "/images/survey.jpg", link: false, desc: "Self-service survey creation with multi-step modals, participant uploads, test delivery, QR/link previews, and localized templates.", stack: ["React", "TypeScript", "Ant Design", "i18next"] },
    { title: "Survey Automation & Response Processing API", tag: "back", img: "/images/telemetry-pipeline.svg", link: false, desc: "Backend workflows for creating, distributing, and tracking organizational surveys.", stack: ["Fastify", "PostgreSQL", "Drizzle ORM", "Mailgun", "JWT"] },
    { title: "DAO Web3 Platform", tag: "web3", img: "/images/dao.jpg", link: false, desc: "Next.js landing page and DAO interface for the Network-First Manifesto — embedded wallet onboarding, governance UI, proposal workflows on Base.", stack: ["Next.js", "Privy SDK", "Base Network", "Framer Motion"] },
    { title: "Publication Source Lineage Provider", tag: "ai", img: "/images/neo4j_example.png", link: false, desc: "Citation lineage tracking with a web scraper, sentiment analysis, and text classification.", stack: ["Python", "Neo4j", "Prometheus", "Grafana"] },
    { title: "Predictive Modeling for Soccer Season Outcomes", tag: "ai", img: "/images/premier_league.png", link: false, desc: "Random Forest and Linear Regression tuned with Bayesian optimization — 60% accuracy across the 2021 Premier League season.", stack: ["Python", "ML", "Bayesian optimization"] },
    { title: "Blockchain Creator", tag: "back", img: "/images/blockchain.png", link: "https://github.com/Peach97/blockchain-creator", desc: "Proof-of-work consensus, node communication, transaction validation, and block generation.", stack: ["Java", "Kotlin"] },
    { title: "MongoDB Post Storage System / REST API", tag: "back", img: "/images/mongodb.png", link: false, desc: "Blog management platform with REST APIs for creating, storing, and managing content.", stack: ["MongoDB", "Node", "Express"] },
    { title: "Portfolio v1", tag: "front", img: "/images/portfolio-homepage.png", link: "https://cam-petrie.vercel.app/", desc: "Interactive Three.js experience with Blender models and GSAP scroll triggers.", stack: ["Three.js", "WebGL", "Next.js", "Blender"] },
    { title: "Mobile Detailing Service Frontend", tag: "front", img: "/images/slicknspan.png", link: "https://slicknspan.netlify.app/", desc: "Design and build for a mobile detailing business.", stack: ["React", "Bootstrap", "Framer Motion"] }
  ]
};
