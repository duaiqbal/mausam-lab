import { Link } from "react-router-dom";

const STEPS = [
  { icon: "🔍", label: "Research" },
  { icon: "📋", label: "Policy" },
  { icon: "🛠", label: "Skills" },
  { icon: "⚙️", label: "Practice" },
  { icon: "🌱", label: "Action" },
];

export default function Hero() {
  return (
    <section style={s.hero}>
      <div className="container">
        <div style={s.inner}>
          <span className="eyebrow" style={s.eyebrow}>Mausam Lab</span>
          <h1 style={s.h1}>Climate knowledge.<br />From research to action.</h1>
          <p style={s.sub}>
            Mausam Lab is a youth-led climate research and policy platform. We study climate
            challenges, build practical knowledge, and connect evidence with action.
          </p>
          <div style={s.actions}>
            <Link to="/publications" className="btn btn-primary">Explore Our Research →</Link>
            <Link to="/about" className="btn btn-secondary" style={s.btnSec}>Learn About Mausam Lab →</Link>
          </div>

          {/* Process strip */}
          <div style={s.strip}>
            {STEPS.map((step, i) => (
              <span key={step.label} style={s.stripRow}>
                <span style={s.stepWrap}>
                  <span style={s.stepIcon}>{step.icon}</span>
                  <span style={s.stepLabel}>{step.label}</span>
                </span>
                {i < STEPS.length - 1 && <span style={s.arrow}>→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const s = {
  hero: {
    background: "var(--color-primary)",
    padding: "120px 0",
  },
  inner: { maxWidth: 780 },
  eyebrow: { color: "var(--color-accent-light)" },
  h1: {
    color: "#fff",
    fontSize: "clamp(30px,5vw,44px)",
    fontFamily: "var(--font-heading)",
    fontWeight: 600,
    lineHeight: 1.15,
    margin: "8px 0 20px",
  },
  sub: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 17,
    lineHeight: 1.6,
    maxWidth: 620,
    marginBottom: 32,
  },
  actions: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 },
  btnSec: { borderColor: "rgba(255,255,255,0.6)", color: "#fff" },
  strip: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
    background: "rgba(255,255,255,0.08)",
    borderRadius: 8,
    padding: "16px 20px",
    maxWidth: 560,
  },
  stripRow: { display: "flex", alignItems: "center", gap: 4 },
  stepWrap: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 },
  stepIcon: {
    width: 40, height: 40, borderRadius: "50%",
    background: "rgba(255,255,255,0.12)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "1.1rem",
  },
  stepLabel: { fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "0.04em" },
  arrow: { color: "rgba(255,255,255,0.4)", fontSize: "1.1rem", marginBottom: 20, paddingBottom: 4 },
};
