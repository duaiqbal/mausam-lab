import { Link } from "react-router-dom";
import PageMeta from "./PageMeta";
import SectionHeader from "../components/SectionHeader";
import { useCmsData } from "../lib/useCmsData";
import { opportunities as staticOpps } from "../data/opportunities";

const CATEGORIES = [
  { label: "Internships",           desc: "Research and professional learning opportunities for students and early-career researchers." },
  { label: "Fellowships",           desc: "Structured opportunities focused on research, leadership, policy, and climate practice." },
  { label: "Research Programs",     desc: "Collaborative research initiatives addressing climate and sustainability challenges." },
  { label: "Training & Workshops",  desc: "Practical learning opportunities in research, policy, communication, and climate practice." },
  { label: "Community Initiatives", desc: "Locally grounded initiatives connecting climate knowledge with community needs." },
  { label: "Climate Projects",      desc: "Research and practical projects developed around specific climate and sustainability challenges." },
  { label: "Youth Programs",        desc: "Opportunities for young people to engage in climate research, policy, leadership, and action." },
];

export default function Programs() {
  // Fetch all opportunities from Supabase (falls back to static if DB empty)
  const { data: allOpps, loading } = useCmsData("opportunities", staticOpps);

  // Show only open / coming soon opportunities as "current programs"
  const currentPrograms = allOpps.filter(o =>
    o.status === "Open" || o.status === "Closing soon" || o.status === "Coming soon"
  );

  return (
    <>
      <PageMeta title="Programs" description="Mausam Lab programs and initiatives." />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Programs &amp; Initiatives</span>
          <h1>From Knowledge to Practice</h1>
          <div className="hero-divider" />
          <p>
            Mausam Lab develops programs and initiatives that connect research, skills, policy, and
            climate practice. Explore our current and past work across research, learning, youth
            engagement, and climate action.
          </p>
        </div>
      </section>

      {/* Current Programs — fetched live from CMS */}
      {!loading && currentPrograms.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <SectionHeader eyebrow="Current Programs" title="Current Programs &amp; Opportunities" />
            <div style={s.oppGrid}>
              {currentPrograms.map(opp => (
                <div key={opp.id} style={s.oppCard}>
                  <div style={s.oppCardTop}>
                    <span className="tag tag-accent">{opp.category}</span>
                    <span className={`tag ${opp.status === "Open" || opp.status === "Closing soon" ? "tag-open" : ""}`}>
                      {opp.status}
                    </span>
                  </div>
                  <h3 style={s.oppTitle}>{opp.title}</h3>
                  {opp.description && <p style={s.oppDesc}>{opp.description}</p>}
                  <div style={s.oppMeta}>
                    {opp.deadline && (
                      <span style={s.oppMetaItem}>Deadline: {opp.deadline}</span>
                    )}
                    {opp.eligibility && (
                      <span style={s.oppMetaItem}>Eligibility: {opp.eligibility}</span>
                    )}
                  </div>
                  {opp.application_link && (
                    <a
                      href={opp.application_link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                      style={{ marginTop: 16, display: "inline-block" }}
                    >
                      Apply Now
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Programs Grid */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Our Work"
            title="Programs &amp; Initiatives"
            description="Explore the range of programs and initiatives Mausam Lab develops and delivers."
          />
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
          <h2 style={s.ctaH2}>Explore Our Work</h2>
          <div style={s.ctaDivider} />
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
  /* Current programs grid */
  oppGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 24,
  },
  oppCard: {
    background: "#fff", border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", padding: "28px 28px 24px",
    boxShadow: "var(--shadow-sm)",
    borderTop: "3px solid var(--color-primary)",
    display: "flex", flexDirection: "column",
  },
  oppCardTop: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 },
  oppTitle:   { color: "var(--color-primary)", fontSize: 18, fontWeight: 600, marginBottom: 10, lineHeight: 1.3 },
  oppDesc:    { color: "var(--color-text-muted)", fontSize: 14, lineHeight: 1.6, marginBottom: 12 },
  oppMeta:    { display: "flex", flexDirection: "column", gap: 4 },
  oppMetaItem:{ fontSize: 13, color: "var(--color-text-muted)" },
  /* Category cards */
  catCard: {
    background: "#fff", border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", padding: "24px 20px",
    borderTop: "3px solid var(--color-primary)", textAlign: "center",
  },
  catTitle: { fontWeight: 600, color: "var(--color-primary)", fontSize: 15, marginBottom: 8 },
  catDesc:  { color: "var(--color-text-muted)", fontSize: 14, lineHeight: 1.6, margin: 0 },
  /* CTA band */
  ctaBand:    { background: "var(--color-primary)", padding: "var(--space-6) 0" },
  ctaH2:      { color: "#fff", margin: 0 },
  ctaDivider: { width: 50, height: 3, background: "var(--color-accent)", borderRadius: 2, margin: "16px auto 20px" },
  ctaP:       { color: "rgba(255,255,255,0.85)", maxWidth: 580, margin: "0 auto 32px", fontSize: 16 },
};
