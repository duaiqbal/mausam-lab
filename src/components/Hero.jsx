import { Link } from "react-router-dom";

const STEPS = ["Research", "Policy", "Skills", "Practice", "Action"];

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
            <Link to="/publications" className="btn btn-primary">Explore Our Research</Link>
            <Link to="/about" className="btn btn-secondary" style={s.btnSec}>Learn About Mausam Lab</Link>
          </div>

          {/* Process strip — text only, no emojis or arrows */}
          <div style={s.strip}>
            {STEPS.map((step, i) => (
              <span key={step} style={s.stripRow}>
                <span style={s.stepPill}>{step}</span>
                {i < STEPS.length - 1 && <span style={s.divider} aria-hidden="true" />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const s = {
  hero:    { background: "var(--color-primary)", padding: "120px 0" },
  inner:   { maxWidth: 780 },
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
  btnSec:  { borderColor: "rgba(255,255,255,0.6)", color: "#fff" },
  strip: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 0,
    background: "rgba(255,255,255,0.08)",
    borderRadius: 8,
    padding: "14px 20px",
    maxWidth: 540,
  },
  stripRow:  { display: "flex", alignItems: "center" },
  stepPill: {
    fontSize: 13,
    fontWeight: 600,
    color: "#fff",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    padding: "0 12px",
  },
  divider: {
    width: 1,
    height: 18,
    background: "rgba(255,255,255,0.25)",
    display: "inline-block",
  },
};
