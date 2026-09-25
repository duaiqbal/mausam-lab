import { Link } from "react-router-dom";
import PageMeta from "./PageMeta";

const SKILLS = [
  {
    icon: "🔍",
    title: "Research Skills",
    desc: "Build the skills to ask better questions, conduct stronger research, and work with evidence.",
    tags: ["Literature Reviews", "Research Questions", "Interviews", "Surveys", "Field Research", "Referencing & Citations"],
    link: "#research-skills",
  },
  {
    icon: "📋",
    title: "Policy Skills",
    desc: "Learn how to understand policy, communicate evidence, and develop practical recommendations.",
    tags: ["Policy Brief Writing", "Policy Analysis", "Stakeholder Mapping", "Policy Recommendations", "Policy Research"],
    link: "#policy-skills",
  },
  {
    icon: "📣",
    title: "Communication Skills",
    desc: "Learn how to turn complex research and climate issues into clear, accessible communication.",
    tags: ["Climate Communication", "Writing for Public Audiences", "Research Storytelling", "Visual Communication", "Science & Research Communication"],
    link: "#communication-skills",
  },
  {
    icon: "💼",
    title: "Career Skills",
    desc: "Practical resources for navigating opportunities in research, policy, climate, and development.",
    tags: ["CV & Profile Building", "Scholarship Applications", "Research Opportunities", "Conference Applications", "Professional Networking"],
    link: "#career-skills",
  },
  {
    icon: "🌍",
    title: "Climate Knowledge",
    desc: "Build a stronger understanding of the ideas and systems shaping climate policy and action.",
    tags: ["Climate Governance", "Climate Finance", "Adaptation & Resilience", "Disaster Risk Reduction", "Environmental Security", "Climate & Development"],
    link: "#climate-knowledge",
  },
];

const FEATURED = [
  {
    icon: "📄",
    title: "How to Write a Policy Brief",
    desc: "Understand the purpose, structure, and key elements of an effective policy brief.",
    meta: "5–10 min read · Policy Skills",
  },
  {
    icon: "📚",
    title: "How to Conduct a Literature Review",
    desc: "A practical introduction to finding, organizing, evaluating, and synthesizing existing research.",
    meta: "10 min read · Research Skills",
  },
  {
    icon: "🌡",
    title: "Understanding Climate Adaptation",
    desc: "A practical introduction to adaptation, why it matters, and how it connects to resilience.",
    meta: "8 min read · Climate Knowledge",
  },
];

const FORMATS = ["Guides", "Examples", "Templates", "Checklists", "Worksheets", "Further Reading"];

export default function MausamSkills() {
  return (
    <>
      <PageMeta
        title="Mausam Skills"
        description="Practical learning resources for students, young researchers, and emerging climate professionals."
      />

      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Mausam Skills</span>
          <h1>Learn it. Apply it. Use it.</h1>
          <p>
            Mausam Skills is a practical learning space for students, young researchers, and emerging
            climate professionals. We break down the skills needed to research, write, communicate,
            and work on climate and policy issues — with resources you can actually use.
          </p>
        </div>
      </section>

      {/* ── Skill Categories ── */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <span className="eyebrow">Explore Skills</span>
            <h2>Explore Skills</h2>
          </div>
          {SKILLS.map((skill, i) => (
            <div key={skill.title} style={{ ...s.skillRow, background: i % 2 === 0 ? "#fff" : "var(--color-neutral-light)" }}>
              <div style={s.skillLeft}>
                <span style={s.skillIcon}>{skill.icon}</span>
                <div>
                  <h3 style={s.skillTitle}>{skill.title}</h3>
                  <p style={s.skillDesc}>{skill.desc}</p>
                  <div style={s.tagRow}>
                    {skill.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={s.skillRight}>
                <a href={skill.link} className="btn btn-secondary">Explore {skill.title} →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Resources ── */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <span className="eyebrow">Featured Resources</span>
            <h2>Featured Resources</h2>
          </div>
          <div className="grid grid-3">
            {FEATURED.map(r => (
              <div key={r.title} style={s.resourceCard}>
                <span style={s.resourceIcon}>{r.icon}</span>
                <h3 style={s.resourceTitle}>{r.title}</h3>
                <p style={s.resourceMeta}>{r.meta}</p>
                <p style={s.resourceDesc}>{r.desc}</p>
                <a href="#" style={s.learnMore}>Learn More →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Practical CTA ── */}
      <section style={s.ctaBand}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={s.ctaH2}>Practical, not just theoretical.</h2>
          <p style={s.ctaP}>
            Mausam Skills is designed to help you move from understanding a concept to using it.
          </p>
          <div style={s.formatPills}>
            {FORMATS.map(f => (
              <span key={f} className="tag">{f}</span>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <Link to="/get-involved" className="btn btn-primary">Explore All Resources →</Link>
          </div>
        </div>
      </section>
    </>
  );
}

const s = {
  skillRow: {
    display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap",
    padding: "32px 24px", borderRadius: "var(--radius)",
    marginBottom: 8, border: "1px solid var(--color-border)",
  },
  skillLeft:  { display: "flex", gap: 20, flex: 1, alignItems: "flex-start" },
  skillIcon:  { fontSize: "2rem", flexShrink: 0, marginTop: 4 },
  skillTitle: { color: "var(--color-primary)", fontWeight: 600, fontSize: 18, marginBottom: 6 },
  skillDesc:  { color: "var(--color-text-muted)", fontSize: 15, lineHeight: 1.5, marginBottom: 12 },
  tagRow:     { display: "flex", flexWrap: "wrap", gap: 6 },
  skillRight: { flexShrink: 0 },
  resourceCard: {
    background: "var(--color-surface)", border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", padding: 24,
    display: "flex", flexDirection: "column", gap: 8,
  },
  resourceIcon:  { fontSize: "1.6rem" },
  resourceTitle: { color: "var(--color-primary)", fontWeight: 600, fontSize: 16, margin: 0 },
  resourceMeta:  { fontSize: 13, color: "var(--color-text-muted)", margin: 0 },
  resourceDesc:  { fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0, flex: 1 },
  learnMore:     { fontSize: 14, fontWeight: 600, color: "var(--color-accent)", textDecoration: "none" },
  ctaBand:      { background: "var(--color-neutral-light)", padding: "var(--space-6) 0", borderTop: "1px solid var(--color-border)" },
  ctaH2:        { color: "var(--color-primary)", marginBottom: 12 },
  ctaP:         { color: "var(--color-text-muted)", maxWidth: 520, margin: "0 auto 20px", fontSize: 16 },
  formatPills:  { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" },
};
