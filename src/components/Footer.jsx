import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div className="container footer-inner" style={s.inner}>
        {/* Col 1 — Brand */}
        <div>
          <div style={s.brand}>
            <span style={s.logoBadge}><img src={logo} alt="" height={26} /></span>
            <span style={s.wordmark}>Mausam Lab</span>
          </div>
          <p style={s.mission}>
            A youth-led climate research and policy platform working to connect evidence with action.
          </p>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h4 style={s.colHead}>Quick Links</h4>
          <div style={s.colLinks}>
            <Link to="/" style={s.link}>Home</Link>
            <Link to="/about" style={s.link}>About</Link>
            <Link to="/publications" style={s.link}>Publications</Link>
            <Link to="/programs" style={s.link}>Programs</Link>
            <Link to="/mausam-skills" style={s.link}>Mausam Skills</Link>
            <Link to="/get-involved" style={s.link}>Get Involved</Link>
            <Link to="/contact" style={s.link}>Contact</Link>
          </div>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <h4 style={s.colHead}>Contact</h4>
          <div style={s.colLinks}>
            <a href="mailto:mausamlab@gmail.com" style={s.link}>mausamlab@gmail.com</a>
            <a href="https://wa.me/923283544920" target="_blank" rel="noreferrer" style={s.link}>WhatsApp</a>
          </div>
          <h4 style={{ ...s.colHead, marginTop: 16 }}>Follow Us</h4>
          <div style={s.colLinks}>
            <a href="https://linkedin.com/company/mausam-lab" target="_blank" rel="noreferrer" style={s.link}>LinkedIn</a>
            <a href="https://instagram.com/mausamlab" target="_blank" rel="noreferrer" style={s.link}>Instagram</a>
          </div>
        </div>
      </div>

      <div style={s.bottom}>
        <div className="container">
          <p style={s.bottomText}>
            © {new Date().getFullYear()} Mausam Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const s = {
  footer:    { background: "var(--color-primary-dark)", color: "rgba(255,255,255,0.85)", marginTop: "var(--space-6)" },
  inner:     { display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, padding: "var(--space-6) var(--space-3)" },
  brand:     { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 },
  logoBadge: { width: 36, height: 36, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  wordmark:  { fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "1rem", color: "#fff" },
  mission:   { color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.6, maxWidth: 280 },
  colHead:   { color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 10, letterSpacing: "0.03em" },
  colLinks:  { display: "flex", flexDirection: "column", gap: 8 },
  link:      { color: "rgba(255,255,255,0.75)", fontSize: 14, textDecoration: "none", transition: "color 0.15s" },
  bottom:    { borderTop: "1px solid rgba(255,255,255,0.12)", padding: "var(--space-2) var(--space-3)" },
  bottomText:{ color: "rgba(255,255,255,0.55)", fontSize: 13, margin: 0 },
};
