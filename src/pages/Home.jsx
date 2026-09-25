import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SectionHeader from "../components/SectionHeader";
import PageMeta from "./PageMeta";
import { useCmsData } from "../lib/useCmsData";
import { publications } from "../data/publications";
import { researchItems } from "../data/research";

const WHAT_WE_DO = [
  { icon: "🔍", label: "Research", desc: "We investigate climate and sustainability challenges through locally grounded research." },
  { icon: "📋", label: "Policy",   desc: "We turn research into policy analysis and practical recommendations." },
  { icon: "🛠", label: "Skills",   desc: "We build practical skills in research, writing, policy, and communication." },
  { icon: "⚙️", label: "Practice", desc: "We run programs that connect knowledge with real-world challenges." },
  { icon: "🌱", label: "Action",   desc: "We support young people, institutions, and communities in applying that knowledge." },
];

export default function Home() {
  const { data: pubs }     = useCmsData("publications", publications);
  const { data: research } = useCmsData("research", researchItems);

  const featuredPubs = pubs.slice(0, 4);

  return (
    <>
      <PageMeta
        title="Home"
        description="Mausam Lab is a youth-led climate research and policy platform studying climate challenges and connecting evidence with action."
      />
      <Hero />

      {/* ── What We Do ── */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader eyebrow="What We Do" title="Five ways we work on climate" align="center" />
          <div className="grid grid-5" style={{ marginTop: 0 }}>
            {WHAT_WE_DO.map(item => (
              <div key={item.label} style={s.whatCard}>
                <span style={s.whatIcon}>{item.icon}</span>
                <h3 style={s.whatTitle}>{item.label}</h3>
                <p style={s.whatDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Publications ── */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Publications"
            title="Featured Publications"
            description="A selection of our latest research, policy work, and climate analysis."
          />
          <div className="grid grid-3" style={{ marginTop: 0 }}>
            {(featuredPubs.length > 0 ? featuredPubs : publications.slice(0, 3)).map(pub => (
              <PubCard key={pub.id} pub={pub} />
            ))}
          </div>
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Link to="/publications" className="btn btn-secondary">View All Publications →</Link>
          </div>
        </div>
      </section>

      {/* ── Collaborate CTA ── */}
      <section style={s.ctaBand}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={s.ctaH2}>Have an idea worth working on?</h2>
          <p style={s.ctaP}>
            We collaborate with researchers, students, universities, organizations, practitioners,
            and institutions on research, policy, learning, and climate initiatives.
          </p>
          <Link to="/get-involved" className="btn btn-primary">Collaborate With Us →</Link>
        </div>
      </section>
    </>
  );
}

function PubCard({ pub }) {
  const type       = pub.type || "Publication";
  const title      = pub.title || "";
  const author     = pub.author || "";
  const date       = pub.date || "";
  const desc       = pub.description || "";
  const imageUrl   = pub.image_url || null;

  return (
    <div className="card">
      {imageUrl ? (
        <img src={imageUrl} alt={title} style={s.pubImg} />
      ) : (
        <div style={s.pubImgPlaceholder} />
      )}
      <div style={{ padding: "0" }}>
        <span className="tag tag-accent" style={{ marginBottom: 10, display: "inline-block" }}>{type}</span>
        <h3 style={s.pubTitle}>{title}</h3>
        {(author || date) && (
          <p style={s.pubMeta}>{[author, date].filter(Boolean).join(" · ")}</p>
        )}
        {desc && <p style={s.pubDesc}>{desc}</p>}
        <Link to="/publications" style={s.readMore}>Read More →</Link>
      </div>
    </div>
  );
}

const s = {
  whatCard: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "24px 20px",
    display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8,
  },
  whatIcon:  { fontSize: "1.6rem" },
  whatTitle: { fontSize: 17, fontWeight: 600, color: "var(--color-primary)", margin: 0 },
  whatDesc:  { fontSize: 14, color: "var(--color-text-muted)", margin: 0, lineHeight: 1.5 },
  pubImg:    { width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: "6px 6px 0 0", marginBottom: 16 },
  pubImgPlaceholder: { width: "100%", aspectRatio: "4/3", background: "var(--color-neutral-light)", borderRadius: "6px 6px 0 0", marginBottom: 16 },
  pubTitle:  { fontSize: 17, fontWeight: 600, color: "var(--color-primary)", marginBottom: 6 },
  pubMeta:   { fontSize: 13, color: "var(--color-text-muted)", marginBottom: 8 },
  pubDesc:   { fontSize: 14, color: "var(--color-text-muted)", marginBottom: 12, lineHeight: 1.5 },
  readMore:  { fontSize: 14, fontWeight: 600, color: "var(--color-accent)", textDecoration: "none" },
  ctaBand: {
    background: "var(--color-neutral-light)",
    padding: "var(--space-6) 0",
    borderTop: "1px solid var(--color-border)",
  },
  ctaH2: { color: "var(--color-primary)", marginBottom: 16 },
  ctaP:  { color: "var(--color-text-muted)", maxWidth: 600, margin: "0 auto 32px", fontSize: 17 },
};
