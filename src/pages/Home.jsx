import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SectionHeader from "../components/SectionHeader";
import PageMeta from "./PageMeta";
import { useCmsData } from "../lib/useCmsData";
import { publications } from "../data/publications";

const WHAT_WE_DO = [
  { label: "Research",  desc: "We investigate climate and sustainability challenges through locally grounded research." },
  { label: "Policy",    desc: "We turn research into policy analysis and practical recommendations." },
  { label: "Skills",    desc: "We build practical skills in research, writing, policy, and communication." },
  { label: "Practice",  desc: "We run programs that connect knowledge with real-world challenges." },
  { label: "Action",    desc: "We support young people, institutions, and communities in applying that knowledge." },
];

export default function Home() {
  const { data: pubs } = useCmsData("publications", publications);
  const featuredPubs   = pubs.slice(0, 3);

  return (
    <>
      <PageMeta title="Home" description="Mausam Lab is a youth-led climate research and policy platform." />
      <Hero />

      {/* What We Do */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader eyebrow="What We Do" title="Five Ways We Work on Climate" />
          <div className="grid grid-5">
            {WHAT_WE_DO.map((item, i) => (
              <div key={item.label} style={s.whatCard}>
                <div style={s.whatNum}>{String(i + 1).padStart(2, "0")}</div>
                <h3 style={s.whatTitle}>{item.label}</h3>
                <p style={s.whatDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Publications"
            title="Featured Publications"
            description="A selection of our latest research, policy work, and climate analysis."
          />
          <div className="grid grid-3">
            {(featuredPubs.length > 0 ? featuredPubs : publications.slice(0, 3)).map(pub => (
              <PubCard key={pub.id} pub={pub} />
            ))}
          </div>
          <div style={s.centerBtn}>
            <Link to="/publications" className="btn btn-secondary">View All Publications</Link>
          </div>
        </div>
      </section>

      {/* Collaborate CTA */}
      <section style={s.ctaBand}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={s.ctaH2}>Have an Idea Worth Working On?</h2>
          <div style={s.ctaDivider} />
          <p style={s.ctaP}>
            We collaborate with researchers, students, universities, organizations, practitioners,
            and institutions on research, policy, learning, and climate initiatives.
          </p>
          <Link to="/get-involved" className="btn btn-primary">Collaborate With Us</Link>
        </div>
      </section>
    </>
  );
}

function PubCard({ pub }) {
  const type        = pub.type || "Publication";
  const imageUrl    = pub.image_url || null;
  const downloadUrl = pub.download_url || pub.downloadUrl || null;

  return (
    <div style={s.pubCard}>
      {imageUrl ? (
        <img src={imageUrl} alt={pub.title} style={s.pubImg} />
      ) : (
        <div style={s.pubImgPlaceholder} />
      )}
      <div style={s.pubBody}>
        <span className="tag tag-accent" style={{ marginBottom: 10 }}>{type}</span>
        <h3 style={s.pubTitle}>{pub.title}</h3>
        {(pub.author || pub.date) && (
          <p style={s.pubMeta}>{[pub.author, pub.date].filter(Boolean).join(" · ")}</p>
        )}
        {pub.description && <p style={s.pubDesc}>{pub.description}</p>}
        {downloadUrl ? (
          <a href={downloadUrl} target="_blank" rel="noreferrer" style={s.readMore}>Read More</a>
        ) : (
          <Link to="/publications" style={s.readMore}>View Publications</Link>
        )}
      </div>
    </div>
  );
}

const s = {
  whatCard: {
    background: "#fff", border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", padding: "28px 20px",
    borderTop: "3px solid var(--color-primary)", textAlign: "center",
  },
  whatNum:   { fontSize: 28, fontWeight: 700, color: "var(--color-border)", fontFamily: "var(--font-heading)", marginBottom: 8 },
  whatTitle: { fontSize: 16, fontWeight: 600, color: "var(--color-primary)", margin: "0 0 8px" },
  whatDesc:  { fontSize: 14, color: "var(--color-text-muted)", margin: 0, lineHeight: 1.6 },
  pubCard:   { background: "#fff", border: "1px solid var(--color-border)", borderRadius: "var(--radius)", overflow: "hidden", display: "flex", flexDirection: "column" },
  pubImg:    { width: "100%", aspectRatio: "4/3", objectFit: "cover" },
  pubImgPlaceholder: { width: "100%", aspectRatio: "4/3", background: "var(--color-neutral-light)" },
  pubBody:   { padding: 24, display: "flex", flexDirection: "column", flex: 1 },
  pubTitle:  { fontSize: 16, fontWeight: 600, color: "var(--color-primary)", marginBottom: 6, lineHeight: 1.3 },
  pubMeta:   { fontSize: 13, color: "var(--color-text-muted)", marginBottom: 8 },
  pubDesc:   { fontSize: 14, color: "var(--color-text-muted)", marginBottom: 14, lineHeight: 1.5, flex: 1 },
  readMore:  { fontSize: 13, fontWeight: 600, color: "var(--color-accent)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em" },
  centerBtn: { marginTop: 36, textAlign: "center" },
  ctaBand:   { background: "var(--color-primary)", padding: "var(--space-6) 0" },
  ctaH2:     { color: "#fff", margin: 0 },
  ctaDivider:{ width: 50, height: 3, background: "var(--color-accent)", borderRadius: 2, margin: "16px auto 20px" },
  ctaP:      { color: "rgba(255,255,255,0.85)", maxWidth: 600, margin: "0 auto 32px", fontSize: 16 },
};
