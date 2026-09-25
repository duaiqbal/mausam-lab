import { Link } from "react-router-dom";
import PageMeta from "./PageMeta";

const CATEGORIES = [
  { label: "Internships",          desc: "Research and professional learning opportunities for students and early-career researchers." },
  { label: "Fellowships",          desc: "Structured opportunities focused on research, leadership, policy, and climate practice." },
  { label: "Research Programs",    desc: "Collaborative research initiatives addressing climate and sustainability challenges." },
  { label: "Training & Workshops", desc: "Practical learning opportunities in research, policy, communication, and climate practice." },
  { label: "Community Initiatives",desc: "Locally grounded initiatives connecting climate knowledge with community needs." },
  { label: "Climate Projects",     desc: "Research and practical projects developed around specific climate and sustainability challenges." },
  { label: "Youth Programs",       desc: "Opportunities for young people to engage in climate research, policy, leadership, and action." },
];

export default function Programs() {
  return (
    <>
      <PageMeta title="Programs" description="Mausam Lab programs and initiatives connecting research, skills, policy, and climate practice." />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Programs &amp; Initiatives</span>
          <h1>From knowledge to practice.</h1>
          <p>
            Mausam Lab develops programs and initiatives that connect research, skills, policy, and climate
            practice. Explore our current and past work across research, learning, youth engagement, and climate action.
          </p>
        </div>
      </section>

      {/* Current Program */}
      <section className="section section-alt">
        <div className="container">
          <div style={s.currentBand}>
            <span style={s.currentLabel}>Current Program</span>
            <div style={s.currentInner}>
              <div style={{ flex: 1 }}>
                <h2 style={s.currentTitle}>Research Internship Programme</h2>
                <p style={s.currentSubtitle}>Mausam Lab × Rethinking Economics Islamabad</p>
                <p style={s.currentDesc}>
                  A six-week interdisciplinary research internship connecting economics, climate,
                  sustainability, policy, and public communication.
                </p>
                <div style={s.metaRow}>
                  <span className="tag">6 Weeks</span>
                  <span className="tag">Online</span>
                  <span className="tag tag-open">Applications Open</span>
                </div>
              </div>
              <div style={s.currentCta}>
                <Link to="/programs/rei" className="btn btn-primary">View Programme</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <span className="eyebrow">Our Programs &amp; Initiatives</span>
            <h2>Programs &amp; Initiatives</h2>
          </div>
          <div className="grid grid-4">
            {CATEGORIES.map(cat => (
              <div key={cat.label} style={s.catCard}>
                <h3 style={s.catTitle}>{cat.label}</h3>
                <p style={s.catDesc}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={s.ctaBand}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow">Explore Our Work</span>
          <h2 style={s.ctaH2}>Explore Our Work</h2>
          <p style={s.ctaP}>
            From research internships to collaborative climate initiatives, our programs are
            designed to move knowledge beyond the page and into practice.
          </p>
          <Link to="/get-involved" className="btn btn-primary">View All Programs</Link>
        </div>
      </section>
    </>
  );
}

const s = {
  currentBand: {
    border: "1.5px solid var(--color-border)", borderRadius: "var(--radius)",
    background: "var(--color-surface)", padding: 36, boxShadow: "var(--shadow-md)",
  },
  currentLabel: {
    fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
    color: "var(--color-accent)", display: "block", marginBottom: 14,
  },
  currentInner:    { display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" },
  currentTitle:    { color: "var(--color-primary)", marginBottom: 6 },
  currentSubtitle: { color: "var(--color-accent)", fontWeight: 600, fontSize: 15, marginBottom: 12 },
  currentDesc:     { color: "var(--color-text-muted)", fontSize: 15, lineHeight: 1.6, marginBottom: 16 },
  metaRow:         { display: "flex", gap: 8, flexWrap: "wrap" },
  currentCta:      { display: "flex", alignItems: "center", paddingTop: 8 },
  catCard: {
    background: "var(--color-surface)", border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", padding: 24,
    borderTop: "3px solid var(--color-primary)",
  },
  catTitle: { fontWeight: 600, color: "var(--color-primary)", fontSize: 15, marginBottom: 8 },
  catDesc:  { color: "var(--color-text-muted)", fontSize: 14, lineHeight: 1.5, margin: 0 },
  ctaBand:  { background: "var(--color-neutral-light)", padding: "var(--space-6) 0", borderTop: "1px solid var(--color-border)" },
  ctaH2:    { color: "var(--color-primary)", marginBottom: 16 },
  ctaP:     { color: "var(--color-text-muted)", maxWidth: 580, margin: "0 auto 32px", fontSize: 16 },
};
