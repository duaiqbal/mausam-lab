import PageMeta from "./PageMeta";

const TEAM = {
  Leadership: [
    { name: "Areeba Kanwal",       role: "Founder & Executive Director" },
    { name: "Syed Kazim Raza Shah", role: "Assistant Executive Director" },
  ],
  "Research & Policy Department": [
    { name: "Ghazala Ishaq",  role: "Head of Research & Policy" },
    { name: "Maria Aslam",    role: "Research Associate" },
    { name: "Attia Shamim",   role: "Research Associate" },
  ],
  "Internal Affairs Team": [
    { name: "Zubair Mahar",   role: "Head of Internal Affairs" },
    { name: "Maryam Akmal",   role: "Internal Affairs Associate" },
    { name: "Tooba Iqbal",    role: "Internal Affairs Associate" },
  ],
  "External Affairs Department": [
    { name: "Syed Umer Akhter", role: "Head of External Affairs" },
    { name: "Areeba Javed",     role: "External Affairs Associate" },
    { name: "Simrah Tariq",     role: "External Affairs Associate" },
  ],
  "Creative Content Department": [
    { name: "Tayyaba Muskan",  role: "Head of Creative Content" },
    { name: "Qulnasic Fatima", role: "Creative Content Associate" },
    { name: "Meherma Fatima",  role: "Creative Content Associate" },
  ],
};

const FOCUS_AREAS = [
  "Climate & Environmental Security",
  "Climate-Induced Displacement",
  "Water Security",
  "Climate Governance",
  "Climate Finance & Economics",
  "Adaptation & Resilience",
  "Disaster Risk Reduction",
  "Climate Communication",
  "Sustainable Development",
  "Climate Literacy & Skills",
];

const APPROACH_STEPS = [
  { label: "Research",  desc: "We study climate and sustainability challenges through evidence and locally relevant research." },
  { label: "Policy",    desc: "We translate research into policy insights, analysis, and recommendations that can inform decision-making." },
  { label: "Skills",    desc: "We equip young people with practical skills in research, policy, writing, communication, and climate practice." },
  { label: "Practice",  desc: "We turn knowledge into programs, initiatives, and learning opportunities that respond to real-world challenges." },
  { label: "Action",    desc: "We connect people, knowledge, and institutions to support practical climate action." },
];

export default function About() {
  return (
    <>
      <PageMeta title="About" description="Mausam Lab is a youth-led climate policy, research, and sustainability platform based in Pakistan." />

      {/* ── Section 1: Who We Are ── */}
      <section className="section section-alt">
        <div className="container">
          <div style={s.twoCol}>
            <div style={s.textCol}>
              <span className="eyebrow">About</span>
              <h1 style={s.h1}>Who We Are</h1>
              <p>
                Mausam Lab is a youth-led climate policy, research, and sustainability platform based in Pakistan.
              </p>
              <p>
                We work on climate challenges through research, policy engagement, youth leadership, and practical initiatives. Our focus is producing locally grounded knowledge that helps communities, institutions, and decision-makers understand and respond to climate risks.
              </p>
              <p>
                From heatwaves and floods to water insecurity, drought, displacement, and urban resilience, we examine the climate challenges shaping Pakistan and work to connect evidence with practical responses.
              </p>
              <p style={s.tagline}>Research-driven · Youth-led · Policy-focused</p>
            </div>
            <div style={s.mapCol}>
              <div style={s.mapBox}>
                <span style={s.mapEmoji}>🇵🇰</span>
                <p style={s.mapLabel}>Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Mission & Vision ── */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div style={s.mvCard}>
              <span style={s.mvIcon}>🎯</span>
              <h3 style={s.mvTitle}>Our Mission</h3>
              <p style={s.mvText}>
                To produce accessible, locally grounded, and policy-relevant climate knowledge, while creating meaningful opportunities for young people to engage in research, policy, and climate action.
              </p>
            </div>
            <div style={s.mvCard}>
              <span style={s.mvIcon}>🔭</span>
              <h3 style={s.mvTitle}>Our Vision</h3>
              <p style={s.mvText}>
                A climate-resilient Pakistan where evidence informs decisions, young people contribute directly to climate solutions, and local realities shape how climate challenges are understood and addressed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Our Approach ── */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="eyebrow">Our Approach</span>
            <h2>Mausam Lab works across this continuum</h2>
            <div style={s.stripRow}>
              {APPROACH_STEPS.map((step, i) => (
                <span key={step.label} style={s.stripItem}>
                  <span style={s.stripPill}>{step.label}</span>
                  {i < APPROACH_STEPS.length - 1 && <span style={s.stripArrow}>→</span>}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-5">
            {APPROACH_STEPS.map(step => (
              <div key={step.label} style={s.approachCard}>
                <h4 style={s.approachTitle}>{step.label}</h4>
                <p style={s.approachDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Why Mausam Lab ── */}
      <section className="section">
        <div className="container">
          <div style={s.whyInner}>
            <span className="eyebrow">Why Mausam Lab?</span>
            <h2>Why Mausam Lab?</h2>
            <p>
              Climate challenges are not experienced the same way everywhere. A heatwave in Karachi, water insecurity in Thar, flooding in Sindh, or drought elsewhere in Pakistan involves different risks, needs, and responses.
            </p>
            <p>
              Mausam Lab exists to bring closer attention to these local realities through research and policy engagement, while creating space for young people to contribute meaningfully to the climate conversation.
            </p>
            <p>
              Climate knowledge should not stop at awareness. It should help people understand problems, inform decisions, build capacity, and support action.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 5: Focus Areas ── */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span className="eyebrow">Focus Areas</span>
            <h2>Our Focus Areas</h2>
            <p style={s.focusIntro}>
              Our work spans interconnected climate, environmental, and development challenges. Our focus areas may evolve as our research and programs develop.
            </p>
          </div>
          <div style={s.pillGrid}>
            {FOCUS_AREAS.map(area => (
              <span key={area} className="tag">{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Our Team ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="eyebrow">Our Team</span>
            <h2>Our Team</h2>
            <p style={s.focusIntro}>
              Mausam Lab is built by young researchers, communicators, and practitioners working across different areas of climate and organisational development.
            </p>
          </div>

          {Object.entries(TEAM).map(([dept, members]) => (
            <div key={dept} style={s.deptBlock}>
              <h3 style={s.deptTitle}>{dept}</h3>
              <div style={s.teamGrid}>
                {members.map(m => (
                  <div key={m.name} style={s.teamCard}>
                    <div style={s.avatar} aria-hidden="true">
                      {m.name.charAt(0)}
                    </div>
                    <h4 style={s.memberName}>{m.name}</h4>
                    <p style={s.memberRole}>{m.role}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p style={s.teamClosing}>
            Mausam Lab is designed to grow with the people who contribute to it. As our research, programs, and collaborations expand, our team and areas of work will evolve with them.
          </p>
        </div>
      </section>
    </>
  );
}

const s = {
  /* Who We Are */
  twoCol:   { display: "grid", gridTemplateColumns: "60% 1fr", gap: 48, alignItems: "center" },
  textCol:  {},
  mapCol:   { display: "flex", justifyContent: "center" },
  mapBox:   {
    background: "var(--color-primary)",
    borderRadius: 16,
    width: 260, height: 260,
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: 12,
  },
  mapEmoji: { fontSize: "4rem" },
  mapLabel: { color: "#fff", fontWeight: 600, fontSize: 18, margin: 0 },
  tagline:  { fontWeight: 600, color: "var(--color-primary)", fontSize: 15, letterSpacing: "0.02em", marginTop: 8 },

  /* Mission / Vision */
  mvCard:  {
    border: "1px solid var(--color-border)", borderRadius: "var(--radius)",
    padding: 32, background: "var(--color-surface)",
    boxShadow: "var(--shadow-sm)",
  },
  mvIcon:  { fontSize: "2rem", display: "block", marginBottom: 12 },
  mvTitle: { color: "var(--color-primary)", fontWeight: 600, marginBottom: 12 },
  mvText:  { color: "var(--color-text-muted)", lineHeight: 1.7, margin: 0, fontSize: 15 },

  /* Approach */
  stripRow:   { display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 6, marginTop: 16 },
  stripItem:  { display: "flex", alignItems: "center", gap: 6 },
  stripPill:  {
    background: "var(--color-primary)", color: "#fff",
    padding: "8px 18px", borderRadius: 999,
    fontWeight: 600, fontSize: 14,
  },
  stripArrow: { color: "var(--color-text-muted)", fontSize: "1.1rem" },
  approachCard: {
    background: "var(--color-surface)", border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", padding: 20,
  },
  approachTitle: { color: "var(--color-primary)", fontWeight: 600, marginBottom: 8, fontSize: 16 },
  approachDesc:  { color: "var(--color-text-muted)", fontSize: 14, lineHeight: 1.6, margin: 0 },

  /* Why */
  whyInner:   { maxWidth: 780, margin: "0 auto" },

  /* Focus Areas */
  focusIntro: { color: "var(--color-text-muted)", maxWidth: 640, margin: "0 auto" },
  pillGrid:   {
    display: "flex", flexWrap: "wrap", gap: 10,
    justifyContent: "center",
  },

  /* Team */
  deptBlock:  { marginBottom: 48 },
  deptTitle:  {
    color: "var(--color-primary)", fontWeight: 600, fontSize: 20,
    borderBottom: "2px solid var(--color-accent)", paddingBottom: 8,
    marginBottom: 24, display: "inline-block",
  },
  teamGrid:   {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: 20,
    justifyItems: "center",
  },
  teamCard:   {
    background: "var(--color-surface)", border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", padding: "24px 16px",
    textAlign: "center", width: "100%",
    boxShadow: "var(--shadow-sm)",
    transition: "box-shadow 0.15s, transform 0.15s",
  },
  avatar: {
    width: 64, height: 64, borderRadius: "50%",
    background: "var(--color-primary)", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 24, fontWeight: 700, margin: "0 auto 12px",
  },
  memberName: { color: "var(--color-primary)", fontSize: 15, fontWeight: 600, margin: "0 0 4px" },
  memberRole: { color: "var(--color-text-muted)", fontSize: 13, margin: 0, lineHeight: 1.4 },
  teamClosing: {
    textAlign: "center", color: "var(--color-text-muted)",
    fontSize: 14, maxWidth: 600, margin: "16px auto 0", fontStyle: "italic",
  },
};
