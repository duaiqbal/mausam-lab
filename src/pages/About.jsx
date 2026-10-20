import { useMemo } from "react";
import PageMeta from "./PageMeta";
import SectionHeader from "../components/SectionHeader";
import logo from "../assets/logo.png";
import { useCmsData } from "../lib/useCmsData";
import "./About.css";

// Static fallback — only shown if Supabase has no data yet
const STATIC_TEAM = {
  Leadership: [
    { name: "Areeba Kanwal",        role: "Founder & Executive Director",   department: "Leadership" },
    { name: "Syed Kazim Raza Shah", role: "Assistant Executive Director",   department: "Leadership" },
  ],
  "Research & Policy Department": [
    { name: "Ghazala Ishaq", role: "Head of Research & Policy",            department: "Research & Policy Department" },
    { name: "Maria Aslam",   role: "Research Associate",                   department: "Research & Policy Department" },
    { name: "Attia Shamim",  role: "Research Associate",                   department: "Research & Policy Department" },
  ],
  "Internal Affairs Team": [
    { name: "Zubair Mahar",  role: "Head of Internal Affairs",             department: "Internal Affairs Team" },
    { name: "Maryam Akmal",  role: "Internal Affairs Associate",           department: "Internal Affairs Team" },
    { name: "Tooba Iqbal",   role: "Internal Affairs Associate",           department: "Internal Affairs Team" },
  ],
  "External Affairs Department": [
    { name: "Syed Umer Akhter", role: "Head of External Affairs",          department: "External Affairs Department" },
    { name: "Areeba Javed",     role: "External Affairs Associate",        department: "External Affairs Department" },
    { name: "Simrah Tariq",     role: "External Affairs Associate",        department: "External Affairs Department" },
  ],
  "Creative Content Department": [
    { name: "Tayyaba Muskan",  role: "Head of Creative Content",           department: "Creative Content Department" },
    { name: "Qulnasic Fatima", role: "Creative Content Associate",        department: "Creative Content Department" },
    { name: "Meherma Fatima",  role: "Creative Content Associate",        department: "Creative Content Department" },
  ],
};

// Flatten static team for fallback array
const STATIC_FLAT = Object.values(STATIC_TEAM).flat();

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
  // Fetch team from Supabase — falls back to static data if DB empty
  const { data: teamMembers, loading: teamLoading } = useCmsData("team_members", STATIC_FLAT);

  // Group members by department, preserving insertion order
  const groupedTeam = useMemo(() => {
    const map = new Map();
    for (const m of teamMembers) {
      const dept = m.department || "Leadership";
      if (!map.has(dept)) map.set(dept, []);
      map.get(dept).push(m);
    }
    return map;
  }, [teamMembers]);
  return (
    <>
      <PageMeta title="About" description="Mausam Lab is a youth-led climate policy, research, and sustainability platform based in Pakistan." />

      {/* Who We Are */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About</span>
          <h1>Who We Are</h1>
          <div className="hero-divider" />
          <p>
            Mausam Lab is a youth-led climate policy, research, and sustainability platform based in Pakistan.
            We work to produce locally grounded knowledge that helps communities, institutions,
            and decision-makers understand and respond to climate risks.
          </p>
        </div>
      </section>

      {/* Who We Are detail */}
      <section className="section section-alt">
        <div className="container">
          <div className="about-twocol" style={s.twoCol}>
            <div>
              <p>
                We work on climate challenges through research, policy engagement, youth leadership, and practical initiatives. Our focus is producing locally grounded knowledge that helps communities, institutions, and decision-makers understand and respond to climate risks.
              </p>
              <p>
                From heatwaves and floods to water insecurity, drought, displacement, and urban resilience, we examine the climate challenges shaping Pakistan and work to connect evidence with practical responses.
              </p>
              <p style={s.tagline}>Research-driven · Youth-led · Policy-focused</p>
            </div>
            <div className="about-logocol" style={s.mapCol}>
              <div style={s.logoBox}>
                <img src={logo} alt="Mausam Lab" style={s.logoImg} />
                <p style={s.logoBoxLabel}>Mausam Lab</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Our Purpose" title="Mission &amp; Vision" />
          <div className="grid grid-2">
            <div style={s.mvCard}>
              <div style={s.mvBar} />
              <h3 style={s.mvTitle}>Our Mission</h3>
              <p style={s.mvText}>
                To produce accessible, locally grounded, and policy-relevant climate knowledge, while creating meaningful opportunities for young people to engage in research, policy, and climate action.
              </p>
            </div>
            <div style={s.mvCard}>
              <div style={s.mvBar} />
              <h3 style={s.mvTitle}>Our Vision</h3>
              <p style={s.mvText}>
                A climate-resilient Pakistan where evidence informs decisions, young people contribute directly to climate solutions, and local realities shape how climate challenges are understood and addressed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader eyebrow="Our Approach" title="Mausam Lab Works Across This Continuum" />
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

      {/* Why Mausam Lab */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Why Mausam Lab?" title="Why Mausam Lab?" />
          <div style={s.whyBody}>
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

      {/* Focus Areas */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader eyebrow="Focus Areas" title="Our Focus Areas" description="Our work spans interconnected climate, environmental, and development challenges. Our focus areas may evolve as our research and programs develop." />
          <div style={s.pillGrid}>
            {FOCUS_AREAS.map(area => (
              <span key={area} className="tag">{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Our Team" title="Our Team" description="Mausam Lab is built by young researchers, communicators, and practitioners working across different areas of climate and organisational development." />

          {teamLoading ? (
            <p style={{ textAlign: "center", color: "var(--color-text-muted)" }}>Loading team…</p>
          ) : (
            <>
              {[...groupedTeam.entries()].map(([dept, members]) => (
                <div key={dept} style={s.deptBlock}>
                  <h3 style={s.deptTitle}>{dept}</h3>
                  <div style={s.teamGrid}>
                    {members.map(m => (
                      <div key={m.id || m.name} style={s.teamCard}>
                        {/* Profile photo — uploaded via admin CMS */}
                        {m.image_url ? (
                          <img src={m.image_url} alt={m.name} style={s.memberPhoto} />
                        ) : (
                          <div style={s.avatar}>{m.name.charAt(0)}</div>
                        )}
                        <h4 style={s.memberName}>{m.name}</h4>
                        <p style={s.memberRole}>{m.position || m.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}

          <p style={s.teamClosing}>
            Mausam Lab is designed to grow with the people who contribute to it. As our research, programs, and collaborations expand, our team and areas of work will evolve with them.
          </p>
        </div>
      </section>
    </>
  );
}

const s = {
  twoCol:   { display: "grid", gridTemplateColumns: "60% 1fr", gap: 48, alignItems: "center" },
  h1:       { margin: "4px 0 16px" },
  mapCol:   { display: "flex", justifyContent: "center" },
  /* Logo box — replaces old PK Pakistan box */
  logoBox: {
    background: "var(--color-primary)",
    borderRadius: 14,
    width: 220, height: 220,
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: 10,
    padding: 24,
    boxShadow: "var(--shadow-md)",
  },
  logoImg:      { width: 100, height: 100, objectFit: "contain", filter: "brightness(0) invert(1)" },
  logoBoxLabel: { color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 16, margin: 0 },
  logoBoxSub:   { color: "rgba(255,255,255,0.65)", fontSize: 12, margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" },
  tagline:  { fontWeight: 600, color: "var(--color-primary)", fontSize: 15, letterSpacing: "0.02em", marginTop: 8 },
  mvCard: {
    border: "1px solid var(--color-border)", borderRadius: "var(--radius)",
    padding: 32, background: "var(--color-surface)", boxShadow: "var(--shadow-sm)",
  },
  mvBar:   { width: 40, height: 3, background: "var(--color-accent)", borderRadius: 2, marginBottom: 16 },
  mvTitle: { color: "var(--color-primary)", fontWeight: 600, marginBottom: 12 },
  mvText:  { color: "var(--color-text-muted)", lineHeight: 1.7, margin: 0, fontSize: 15 },
  stripRow:    { display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 0, marginTop: 16 },
  stripItem:   { display: "flex", alignItems: "center" },
  stripPill: {
    background: "var(--color-primary)", color: "#fff",
    padding: "9px 20px", fontSize: 13, fontWeight: 600,
    letterSpacing: "0.04em", textTransform: "uppercase",
  },
  stripDivider: { width: 24, height: 2, background: "var(--color-accent)", display: "inline-block" },
  approachCard: {
    background: "var(--color-surface)", border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", padding: 20, borderTop: "3px solid var(--color-primary)",
  },
  approachTitle: { color: "var(--color-primary)", fontWeight: 600, marginBottom: 8, fontSize: 15 },
  approachDesc:  { color: "var(--color-text-muted)", fontSize: 14, lineHeight: 1.6, margin: 0 },
  whyBody:       { maxWidth: 700, margin: "0 auto", textAlign: "center" },
  focusIntro:    { color: "var(--color-text-muted)", maxWidth: 640, margin: "0 auto" },
  pillGrid:      { display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" },
  deptBlock:     { marginBottom: 56 },
  deptTitle: {
    color: "var(--color-primary)", fontWeight: 600, fontSize: 18,
    borderBottom: "2px solid var(--color-accent)", paddingBottom: 8,
    marginBottom: 28, display: "inline-block",
  },
  teamGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
  },
  teamCard: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "28px 20px 20px",
    textAlign: "center",
    width: 190,
    flexShrink: 0,
    boxShadow: "var(--shadow-sm)",
    transition: "box-shadow 0.15s, transform 0.15s",
  },
  /* Profile photo — shown when image uploaded via CMS */
  memberPhoto: {
    width: 88, height: 88, borderRadius: "50%",
    objectFit: "cover",
    margin: "0 auto 14px",
    display: "block",
    border: "3px solid var(--color-neutral-light)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
  },
  /* Fallback initial avatar */
  avatar: {
    width: 88, height: 88, borderRadius: "50%",
    background: "var(--color-primary)", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 28, fontWeight: 700, margin: "0 auto 14px",
    fontFamily: "var(--font-heading)",
  },
  memberName:   { color: "var(--color-primary)", fontSize: 14, fontWeight: 600, margin: "0 0 5px", lineHeight: 1.3 },
  memberRole:   { color: "var(--color-text-muted)", fontSize: 12, margin: 0, lineHeight: 1.5 },
  memberDept:   { color: "var(--color-accent)", fontSize: 11, margin: "4px 0 0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" },
  teamClosing:  { textAlign: "center", color: "var(--color-text-muted)", fontSize: 14, maxWidth: 600, margin: "24px auto 0", fontStyle: "italic" },
};
