import { useState } from "react";
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

/* Status badge style helper */
function StatusBadge({ status }) {
  const isOpen    = status === "Open";
  const isSoon    = status === "Closing soon" || status === "Coming soon";
  const isClosed  = !isOpen && !isSoon;
  const style = {
    display: "inline-block",
    fontSize: 11, fontWeight: 700,
    letterSpacing: "0.06em", textTransform: "uppercase",
    padding: "3px 10px", borderRadius: 999,
    background: isOpen ? "rgba(31,92,61,0.10)" : isSoon ? "rgba(204,78,0,0.10)" : "rgba(92,95,88,0.10)",
    color:      isOpen ? "var(--color-success)"  : isSoon ? "var(--color-accent)"  : "var(--color-text-muted)",
    border:     `1px solid ${isOpen ? "rgba(31,92,61,0.25)" : isSoon ? "rgba(204,78,0,0.25)" : "rgba(92,95,88,0.25)"}`,
  };
  return <span style={style}>{status}</span>;
}

/* Full-details modal */
function OppModal({ opp, onClose }) {
  return (
    <div style={m.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={m.modal} role="dialog" aria-modal="true">
        <button onClick={onClose} style={m.close} aria-label="Close">&#215;</button>

        {/* Header */}
        <div style={m.header}>
          <div style={m.headerTags}>
            <span className="tag tag-accent">{opp.category}</span>
            <StatusBadge status={opp.status} />
          </div>
          <h2 style={m.title}>{opp.title}</h2>
          {opp.deadline && (
            <p style={m.deadline}>Application deadline: <strong>{opp.deadline}</strong></p>
          )}
        </div>

        {/* Body */}
        <div style={m.body}>
          {opp.eligibility && (
            <div style={m.section}>
              <h4 style={m.sectionTitle}>Eligibility</h4>
              <p style={m.sectionText}>{opp.eligibility}</p>
            </div>
          )}
          {opp.description && (
            <div style={m.section}>
              <h4 style={m.sectionTitle}>About this opportunity</h4>
              <p style={m.sectionText} style={{ whiteSpace: "pre-wrap" }}>{opp.description}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={m.footer}>
          {opp.application_link ? (
            <a href={opp.application_link} target="_blank" rel="noreferrer" className="btn btn-primary">
              Apply Now
            </a>
          ) : (
            <a href="mailto:mausamlab@gmail.com" className="btn btn-primary">
              Apply via Email
            </a>
          )}
          <button onClick={onClose} className="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );
}

/* Opportunity card — compact */
function OppCard({ opp, onMoreInfo }) {
  return (
    <div style={c.card}>
      {/* Top labels */}
      <div style={c.labels}>
        <span className="tag tag-accent">{opp.category}</span>
        <StatusBadge status={opp.status} />
      </div>

      {/* Title */}
      <h3 style={c.title}>{opp.title}</h3>

      {/* Deadline */}
      {opp.deadline && (
        <p style={c.deadline}>
          <span style={c.deadlineLabel}>Deadline</span>
          {opp.deadline}
        </p>
      )}

      {/* Eligibility — one line teaser */}
      {opp.eligibility && (
        <p style={c.eligibility}>{opp.eligibility}</p>
      )}

      {/* Buttons */}
      <div style={c.btnRow}>
        <button onClick={() => onMoreInfo(opp)} style={c.btnInfo}>
          More Information
        </button>
        {opp.application_link ? (
          <a href={opp.application_link} target="_blank" rel="noreferrer" className="btn btn-primary" style={c.btnApply}>
            Apply Now
          </a>
        ) : (
          <a href="mailto:mausamlab@gmail.com" className="btn btn-primary" style={c.btnApply}>
            Apply Now
          </a>
        )}
      </div>
    </div>
  );
}

export default function Programs() {
  const { data: allOpps, loading } = useCmsData("opportunities", staticOpps);
  const [selected, setSelected]   = useState(null);

  const currentPrograms = allOpps.filter(o =>
    o.status === "Open" || o.status === "Closing soon" || o.status === "Coming soon"
  );

  return (
    <>
      <PageMeta title="Programs" description="Mausam Lab programs and initiatives." />
      {selected && <OppModal opp={selected} onClose={() => setSelected(null)} />}

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

      {/* Current Programs — compact cards from CMS */}
      {!loading && currentPrograms.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <SectionHeader eyebrow="Current Programs" title="Current Programs &amp; Opportunities" />
            <div style={c.grid}>
              {currentPrograms.map(opp => (
                <OppCard key={opp.id} opp={opp} onMoreInfo={setSelected} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Programs & Initiatives Grid */}
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

/* ── Styles ── */

// Card styles
const c = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20,
  },
  card: {
    background: "#fff",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    borderTop: "3px solid var(--color-primary)",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    boxShadow: "var(--shadow-sm)",
    transition: "box-shadow 0.15s",
  },
  labels: { display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" },
  title: {
    color: "var(--color-primary)", fontWeight: 600,
    fontSize: 17, margin: 0, lineHeight: 1.3,
  },
  deadline: {
    fontSize: 13, color: "var(--color-text-muted)", margin: 0,
    display: "flex", alignItems: "center", gap: 6,
  },
  deadlineLabel: {
    fontSize: 11, fontWeight: 700, textTransform: "uppercase",
    letterSpacing: "0.06em", color: "var(--color-accent)",
    background: "rgba(204,78,0,0.08)", padding: "2px 8px",
    borderRadius: 999, marginRight: 2,
  },
  eligibility: {
    fontSize: 13, color: "var(--color-text-muted)", margin: 0,
    lineHeight: 1.5,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  btnRow: { display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" },
  btnInfo: {
    padding: "9px 16px",
    border: "1.5px solid var(--color-primary)",
    background: "transparent", color: "var(--color-primary)",
    borderRadius: 4, fontFamily: "var(--font-body)",
    fontSize: 13, fontWeight: 600, cursor: "pointer",
    transition: "background 0.15s, color 0.15s",
    flex: 1, textAlign: "center",
  },
  btnApply: { fontSize: 13, padding: "9px 16px", flex: 1, textAlign: "center" },
};

// Modal styles
const m = {
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(34,38,31,0.55)",
    zIndex: 300, display: "flex",
    alignItems: "flex-start", justifyContent: "center",
    padding: "40px 16px", overflowY: "auto",
  },
  modal: {
    background: "#fff", borderRadius: 12,
    width: "100%", maxWidth: 620,
    boxShadow: "0 16px 56px rgba(34,38,31,0.18)",
    position: "relative", overflow: "hidden",
  },
  close: {
    position: "absolute", top: 14, right: 14,
    background: "none", border: "1px solid var(--color-border)",
    width: 30, height: 30, borderRadius: 4,
    cursor: "pointer", fontSize: "1rem",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "var(--color-text-muted)", fontFamily: "inherit",
  },
  header: {
    background: "var(--color-primary)",
    padding: "28px 28px 24px",
  },
  headerTags: { display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" },
  title: { color: "#fff", fontSize: 20, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.3 },
  deadline: { color: "rgba(255,255,255,0.8)", fontSize: 14, margin: 0 },
  body: { padding: "24px 28px" },
  section: { marginBottom: 20 },
  sectionTitle: {
    color: "var(--color-primary)", fontSize: 13, fontWeight: 700,
    textTransform: "uppercase", letterSpacing: "0.07em",
    marginBottom: 8, paddingBottom: 6,
    borderBottom: "1px solid var(--color-border)",
  },
  sectionText: { color: "var(--color-text)", fontSize: 14, lineHeight: 1.7, margin: 0 },
  footer: {
    padding: "16px 28px 24px",
    display: "flex", gap: 10,
    borderTop: "1px solid var(--color-border)",
  },
};

// Page styles
const s = {
  catCard: {
    background: "#fff", border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", padding: "24px 20px",
    borderTop: "3px solid var(--color-primary)", textAlign: "center",
  },
  catTitle: { fontWeight: 600, color: "var(--color-primary)", fontSize: 15, marginBottom: 8 },
  catDesc:  { color: "var(--color-text-muted)", fontSize: 14, lineHeight: 1.6, margin: 0 },
  ctaBand:    { background: "var(--color-primary)", padding: "var(--space-6) 0" },
  ctaH2:      { color: "#fff", margin: 0 },
  ctaDivider: { width: 50, height: 3, background: "var(--color-accent)", borderRadius: 2, margin: "16px auto 20px" },
  ctaP:       { color: "rgba(255,255,255,0.85)", maxWidth: 580, margin: "0 auto 32px", fontSize: 16 },
};
