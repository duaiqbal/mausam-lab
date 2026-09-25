import { useState } from "react";
import PageMeta from "./PageMeta";

const INTEREST_OPTIONS = [
  "Research collaboration",
  "Institutional partnership",
  "Project collaboration",
  "Speaking/Session",
  "Joining Mausam Lab",
  "Media/Communications",
  "Contributing to Mausam Lab",
  "Other",
];

const EMPTY = { name: "", organisation: "", email: "", interest: "", message: "" };

export default function Contact() {
  const [form, setForm]         = useState(EMPTY);
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate(v) {
    const e = {};
    if (!v.name.trim())    e.name    = "Please enter your name.";
    if (!v.email.trim())   e.email   = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email.";
    if (!v.interest)       e.interest = "Please select an option.";
    if (!v.message.trim()) e.message  = "Please enter a message.";
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(er => ({ ...er, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setForm(EMPTY);
    }
  }

  return (
    <>
      <PageMeta title="Contact" description="Get in touch with Mausam Lab for questions, collaborations, partnerships, or media inquiries." />

      {/* ── Hero ── */}
      <section className="page-hero" style={{ padding: "48px 0" }}>
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Let's connect.</h1>
          <p>
            For questions, collaborations, partnerships, media inquiries, or general information,
            reach out to Mausam Lab.
          </p>
        </div>
      </section>

      {/* ── Contact Details ── */}
      <section className="section section-alt">
        <div className="container">
          <div style={s.detailsGrid}>
            {/* Email */}
            <div style={s.detailCard}>
              <h3 style={s.detailTitle}>📧 Email</h3>
              <a href="mailto:mausamlab@gmail.com" style={s.detailLink}>
                mausamlab@gmail.com
              </a>
            </div>

            {/* WhatsApp */}
            <div style={s.detailCard}>
              <h3 style={s.detailTitle}>💬 WhatsApp</h3>
              <a href="https://wa.me/923283544920" target="_blank" rel="noreferrer" style={s.detailLink}>
                +92 328 3544920
              </a>
            </div>

            {/* Connect */}
            <div style={s.detailCard}>
              <h3 style={s.detailTitle}>🔗 Connect With Us</h3>
              <div style={s.socialList}>
                <a
                  href="https://linkedin.com/company/mausam-lab"
                  target="_blank"
                  rel="noreferrer"
                  style={s.socialLink}
                >
                  LinkedIn
                </a>
                <a
                  href="https://instagram.com/mausamlab"
                  target="_blank"
                  rel="noreferrer"
                  style={s.socialLink}
                >
                  @mausamlab
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Collaboration Form ── */}
      <section className="section">
        <div className="container">
          <div style={s.formCard}>
            <div style={{ marginBottom: 28 }}>
              <h2 style={s.formTitle}>Interested in working with Mausam Lab?</h2>
              <p style={s.formSubtitle}>Tell us a little about yourself and what you have in mind.</p>
            </div>

            {submitted ? (
              <div className="form-success" style={{ fontSize: 16 }}>
                Thanks — we'll be in touch soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-2" style={{ gap: 20 }}>
                  {/* Name */}
                  <div>
                    <label htmlFor="name">
                      Name <span className="required-star">*</span>
                    </label>
                    <input
                      id="name" name="name" type="text"
                      value={form.name} onChange={handleChange}
                      aria-invalid={!!errors.name}
                      placeholder="Your full name"
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  {/* Organisation */}
                  <div>
                    <label htmlFor="organisation">Organisation / Institution</label>
                    <input
                      id="organisation" name="organisation" type="text"
                      value={form.organisation} onChange={handleChange}
                      placeholder="Optional"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email">
                      Email <span className="required-star">*</span>
                    </label>
                    <input
                      id="email" name="email" type="email"
                      value={form.email} onChange={handleChange}
                      aria-invalid={!!errors.email}
                      placeholder="your@email.com"
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  {/* Interest */}
                  <div>
                    <label htmlFor="interest">
                      I'm interested in <span className="required-star">*</span>
                    </label>
                    <select
                      id="interest" name="interest"
                      value={form.interest} onChange={handleChange}
                      aria-invalid={!!errors.interest}
                    >
                      <option value="">Select one…</option>
                      {INTEREST_OPTIONS.map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    {errors.interest && <span className="form-error">{errors.interest}</span>}
                  </div>
                </div>

                {/* Message — full width */}
                <div style={{ marginTop: 4 }}>
                  <label htmlFor="message">
                    Tell us more <span className="required-star">*</span>
                  </label>
                  <textarea
                    id="message" name="message"
                    rows={5} value={form.message} onChange={handleChange}
                    aria-invalid={!!errors.message}
                    placeholder="Tell us about your idea, question, or proposal…"
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <button type="submit" className="btn btn-primary">Submit →</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

const s = {
  detailsGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 },
  detailCard:  {
    background: "var(--color-surface)", border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", padding: 24,
  },
  detailTitle: { color: "var(--color-primary)", fontWeight: 600, fontSize: 16, marginBottom: 10 },
  detailLink:  { color: "var(--color-primary)", fontWeight: 500, fontSize: 15, textDecoration: "none" },
  socialList:  { display: "flex", flexDirection: "column", gap: 8 },
  socialLink:  { color: "var(--color-primary)", fontWeight: 600, fontSize: 15, textDecoration: "none" },
  formCard: {
    background: "var(--color-neutral-light)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", padding: "40px",
    maxWidth: 860,
  },
  formTitle:    { color: "var(--color-primary)", marginBottom: 6 },
  formSubtitle: { color: "var(--color-text-muted)", fontSize: 15, margin: 0 },
};
