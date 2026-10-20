import { Link } from "react-router-dom";
import PageMeta from "./PageMeta";
import "./REIProgramme.css";

const TRACKS = [
  {
    team: "Team A",
    title: "Basic Research Writing",
    spots: "20 Interns",
    desc: "A foundational research track focused on developing practical skills in research, writing, and evidence-based analysis.",
  },
  {
    team: "Team B",
    title: "Research Media & Newsletter",
    spots: "2 Interns",
    desc: "A research communication track focused on translating research and ideas into accessible media and newsletter content.",
  },
  {
    team: "Team C",
    title: "Academic Research",
    spots: "2 Interns",
    desc: "An academic research track for participants developing a research article through structured research, analysis, mentorship, and a final presentation.",
  },
];

const THEMES = [
  "Climate Adaptation & Resilience",
  "Climate Risk & Economic Resilience",
  "Climate Justice & Inclusive Development",
  "Disaster Risk Reduction & Economic Planning",
  "Food Security & Climate Change",
  "Climate Governance",
  "Sustainable Finance & Green Economics",
];

const WHO_CAN_APPLY = [
  "Undergraduate students",
  "Early-career researchers and graduates",
  "Individuals interested in economics, public policy, climate, or environmental issues",
  "Participants able to commit to the complete six-week programme",
  "Individuals willing to work across disciplines",
  "Applicants based in, or with strong working knowledge of, the Pakistani policy and development context",
];

const WHAT_YOU_DO = [
  "Develop practical research skills",
  "Work across economics, climate, sustainability, and policy",
  "Complete weekly research and writing tasks",
  "Participate in learning and mentoring sessions",
  "Develop research-based outputs",
  "Receive guidance throughout the programme",
  "Present or submit their final work",
];

const COMPLETION = [
  "75% minimum attendance in official sessions or approved alternatives.",
  "At least 6 of 8 required weekly tasks submitted.",
  "Final presentation or portfolio submission.",
  "Research article submission for Team C participants.",
  "Final Defence Presentation during the final week.",
];

const GLANCE = [
  { label: "Duration",             value: "6 weeks" },
  { label: "Format",               value: "Online" },
  { label: "Start Date",           value: "15 October 2026" },
  { label: "Application Deadline", value: "30 September 2026" },
  { label: "Cohort",               value: "3" },
  { label: "Stipend",              value: "Unpaid" },
];

export default function REIProgramme() {
  return (
    <>
      <PageMeta
        title="Research Internship Programme"
        description="A six-week interdisciplinary research internship by Mausam Lab × Rethinking Economics Islamabad."
      />

      {/* ── Header ── */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Current Program</span>
          <h1>Research Internship Programme</h1>
          <p style={{ fontWeight: 600, color: "var(--color-accent-light)", marginBottom: 8 }}>
            Mausam Lab × Rethinking Economics Islamabad
          </p>
          <p>
            An interdisciplinary research internship connecting economics, climate, sustainability,
            policy, and public communication.
          </p>
        </div>
      </section>

      {/* ── Body + Sidebar ── */}
      <section className="section">
        <div className="container">
          <div className="rei-layout" style={s.layout}>

            {/* ── Main body ── */}
            <div style={s.body}>
              {/* Intro */}
              <p style={s.intro}>
                Mausam Lab and Rethinking Economics Islamabad (REI) are launching a six-week research
                internship for undergraduate students and early-career researchers interested in
                economics, public policy, climate, sustainability, and public communication. The
                programme brings together REI's work in heterodox economics with Mausam Lab's focus on
                climate, sustainability, research, and public communication.
              </p>

              {/* Three Tracks */}
              <h2 style={s.sectionH2}>Three Tracks</h2>
              <div className="grid grid-3" style={{ marginBottom: 40 }}>
                {TRACKS.map(t => (
                  <div key={t.team} style={s.trackCard}>
                    <span style={s.trackTeam}>{t.team}</span>
                    <h3 style={s.trackTitle}>{t.title}</h3>
                    <span style={s.trackSpots}>{t.spots}</span>
                    <p style={s.trackDesc}>{t.desc}</p>
                  </div>
                ))}
              </div>

              {/* Research Themes */}
              <h2 style={s.sectionH2}>Research Themes (Team C)</h2>
              <p style={s.bodyP}>Participants in the academic research track may work on:</p>
              <div style={s.pillGrid}>
                {THEMES.map(theme => (
                  <span key={theme} className="tag">{theme}</span>
                ))}
              </div>

              {/* Who Can Apply */}
              <h2 style={{ ...s.sectionH2, marginTop: 40 }}>Who Can Apply</h2>
              <p style={s.bodyP}>The programme is open to:</p>
              <ul style={s.checkList}>
                {WHO_CAN_APPLY.map(item => (
                  <li key={item} style={s.checkItem}>
                    <span style={s.checkIcon}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p style={s.noteText}>
                Applicants must also agree to the programme's Responsible AI Usage Policy.
              </p>

              {/* What You Will Do */}
              <h2 style={{ ...s.sectionH2, marginTop: 40 }}>What You Will Do</h2>
              <p style={s.bodyP}>Throughout the programme, participants will:</p>
              <ul style={s.checkList}>
                {WHAT_YOU_DO.map(item => (
                  <li key={item} style={s.checkItem}>
                    <span style={s.checkIcon}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Completion Requirements */}
              <h2 style={{ ...s.sectionH2, marginTop: 40 }}>Completion Requirements</h2>
              <p style={s.bodyP}>Participants must meet the programme's completion requirements, including:</p>
              <ol style={s.numberedList}>
                {COMPLETION.map((item, i) => (
                  <li key={i} style={s.numberedItem}>{item}</li>
                ))}
              </ol>
              <p style={s.noteText}>
                Selected participants from Teams A and B, and all Team C participants, will present
                their work before a review panel. Where possible, an external evaluator will take part
                in the assessment.
              </p>

              {/* Apply block */}
              <div style={s.applyBlock}>
                <div style={s.applyLeft}>
                  <p style={s.applyDate}><strong>Applications close:</strong> 30 September 2026</p>
                  <p style={s.applyDate}><strong>Internship begins:</strong> 15 October 2026</p>
                  <p style={s.applyNote}>
                    Interview dates for shortlisted applicants will be communicated separately.
                  </p>
                </div>
                <div style={s.applyRight}>
                  <a
                    href="https://forms.gle/placeholder"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={s.applyBtn}
                  >
                    Apply Now →
                  </a>
                </div>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="rei-sidebar" style={s.sidebar}>
              <div style={s.glanceCard}>
                <h3 style={s.glanceTitle}>Programme at a Glance</h3>
                {GLANCE.map(row => (
                  <div key={row.label} style={s.glanceRow}>
                    <span style={s.glanceLabel}>{row.label}</span>
                    <span style={s.glanceValue}>{row.value}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, textAlign: "center" }}>
                  <span className="tag tag-open" style={{ fontSize: 13 }}>Applications Open</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

const s = {
  layout:   { display: "grid", gridTemplateColumns: "1fr 280px", gap: 48, alignItems: "start" },
  body:     { maxWidth: 900 },
  intro:    { fontSize: 16, lineHeight: 1.7, color: "var(--color-text)", marginBottom: 40 },
  sectionH2: { color: "var(--color-primary)", fontSize: 22, fontWeight: 600, marginBottom: 16, paddingTop: 8 },
  bodyP:    { color: "var(--color-text-muted)", fontSize: 15, marginBottom: 12 },
  trackCard: {
    background: "var(--color-surface)", border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", padding: 20,
  },
  trackTeam:  { fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "var(--color-accent)", display: "block", marginBottom: 6 },
  trackTitle: { color: "var(--color-primary)", fontSize: 16, fontWeight: 600, marginBottom: 4 },
  trackSpots: { fontSize: 12, color: "var(--color-text-muted)", display: "block", marginBottom: 10 },
  trackDesc:  { fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 },
  pillGrid:   { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 },
  checkList:  { listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 10 },
  checkItem:  { display: "flex", gap: 10, alignItems: "flex-start", fontSize: 15, color: "var(--color-text)" },
  checkIcon:  { color: "var(--color-success)", fontWeight: 700, marginTop: 2, flexShrink: 0 },
  numberedList: { paddingLeft: 20, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 10 },
  numberedItem: { fontSize: 15, color: "var(--color-text)", lineHeight: 1.6 },
  noteText:   { fontSize: 13, color: "var(--color-text-muted)", fontStyle: "italic", marginTop: 8 },
  applyBlock: {
    display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap",
    borderTop: "2px solid var(--color-border)", paddingTop: 32, marginTop: 48,
  },
  applyLeft:  { flex: 1 },
  applyDate:  { fontSize: 15, marginBottom: 6 },
  applyNote:  { fontSize: 13, color: "var(--color-text-muted)", marginTop: 8 },
  applyRight: { display: "flex", alignItems: "center" },
  applyBtn:   { padding: "18px 36px", fontSize: 16 },
  sidebar: {
    position: "sticky", top: 88,
  },
  glanceCard: {
    background: "var(--color-neutral-light)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: 24,
  },
  glanceTitle: { color: "var(--color-primary)", fontWeight: 600, fontSize: 16, marginBottom: 16 },
  glanceRow:   { display: "flex", justifyContent: "space-between", gap: 8, padding: "8px 0", borderBottom: "1px solid var(--color-border)" },
  glanceLabel: { fontSize: 13, color: "var(--color-text-muted)", fontWeight: 500 },
  glanceValue: { fontSize: 13, color: "var(--color-text)", fontWeight: 600, textAlign: "right" },
};
