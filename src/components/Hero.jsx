import { Link } from "react-router-dom";

const STEPS = ["Research", "Policy", "Skills", "Practice", "Action"];

export default function Hero() {
  return (
    <section className="page-hero" style={{ padding: "96px 0" }}>
      <div className="container">
        <span className="eyebrow">Mausam Lab</span>
        <h1>Climate knowledge.<br />From research to action.</h1>
        <div className="hero-divider" />
        <p>
          Mausam Lab is a youth-led climate research and policy platform. We study climate
          challenges, build practical knowledge, and connect evidence with action.
        </p>
        <div style={s.actions}>
          <Link to="/publications" className="btn btn-primary">Explore Our Research</Link>
          <Link to="/about" className="btn btn-secondary" style={s.btnSec}>Learn About Mausam Lab</Link>
        </div>
        {/* Process strip */}
        <div style={s.strip}>
          {STEPS.map((step, i) => (
            <span key={step} style={s.stripRow}>
              <span style={s.stepPill}>{step}</span>
              {i < STEPS.length - 1 && <span style={s.divider} aria-hidden="true" />}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const s = {
  actions: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", margin: "28px 0 40px" },
  btnSec:  { borderColor: "rgba(255,255,255,0.6)", color: "#fff" },
  strip: {
    display: "inline-flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.08)",
    borderRadius: 6,
    padding: "12px 20px",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 0,
  },
  stripRow:  { display: "flex", alignItems: "center" },
  stepPill:  { fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0 14px" },
  divider:   { width: 1, height: 16, background: "rgba(255,255,255,0.3)", display: "inline-block" },
};
