import { useState, useMemo } from "react";
import PageMeta from "./PageMeta";
import { publications as staticPubs } from "../data/publications";
import { usePublications } from "../lib/usePublications";
import SectionHeader from "../components/SectionHeader";

const TYPES  = ["All", "Research", "Policy Brief", "Article", "Commentary", "Explainer", "Report", "Guide"];
const TOPICS = [
  "All",
  "Climate & Environmental Security", "Climate-Induced Displacement",
  "Water Security", "Climate Governance", "Climate Literacy",
  "Climate Skills", "Climate Finance", "Adaptation & Resilience",
  "Disaster Risk Reduction", "Climate Communication", "Sustainable Development",
];

/* ── Full article modal ─────────────────────────────────────────────── */
function ArticleModal({ pub, onClose }) {
  return (
    <div style={m.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={m.modal} role="dialog" aria-modal="true">
        <button onClick={onClose} style={m.close} aria-label="Close">&#215;</button>

        {/* Header */}
        <div style={m.header}>
          <span className="tag tag-accent" style={{ marginBottom: 12, display: "inline-block" }}>
            {pub.type || "Publication"}
          </span>
          <h2 style={m.title}>{pub.title}</h2>
          <p style={m.meta}>
            {[pub.author, pub.date].filter(Boolean).join(" · ")}
          </p>
        </div>

        {/* Cover image */}
        {pub.image_url && (
          <img src={pub.image_url} alt={pub.title} style={m.coverImg} />
        )}

        {/* Article body */}
        <div style={m.body}>
          {pub.article_body ? (
            pub.article_body.split("\n\n").filter(p => p.trim()).map((para, i) => (
              <p key={i} style={m.para}>{para.trim()}</p>
            ))
          ) : pub.description ? (
            pub.description.split("\n\n").filter(p => p.trim()).map((para, i) => (
              <p key={i} style={m.para}>{para.trim()}</p>
            ))
          ) : (
            <p style={{ color: "var(--color-text-muted)", fontStyle: "italic" }}>
              No article content added yet.
            </p>
          )}
        </div>

        {/* Download link */}
        {(pub.download_url) && (
          <div style={m.downloadRow}>
            <a href={pub.download_url} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: 14 }}>
              Download PDF
            </a>
          </div>
        )}

        <div style={m.footer}>
          <button onClick={onClose} style={m.closeBtn}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ── Publication card ───────────────────────────────────────────────── */
function PubCard({ pub, onReadMore }) {
  const imageUrl    = pub.image_url || null;
  const type        = pub.type || "Publication";
  const excerpt     = pub.excerpt || "";
  const downloadUrl = pub.download_url || pub.downloadUrl || null;
  // Show Read More if there is ANY content — article_body, description, or download
  const hasContent  = !!(pub.article_body || pub.description || downloadUrl);

  return (
    <div style={c.card}>
      {/* Cover image */}
      {imageUrl ? (
        <img src={imageUrl} alt={pub.title} style={c.img} />
      ) : (
        <div style={c.imgPlaceholder} />
      )}

      <div style={c.body}>
        {/* Type tag */}
        <span className="tag tag-accent" style={{ marginBottom: 10, display: "inline-block" }}>
          {type}
        </span>

        {/* Title */}
        <h3 style={c.title}>{pub.title}</h3>

        {/* Excerpt — short summary (only if filled in) */}
        {excerpt && <p style={c.excerpt}>{excerpt}</p>}

        {/* Author · Date */}
        {(pub.author || pub.date) && (
          <p style={c.meta}>{[pub.author, pub.date].filter(Boolean).join(" · ")}</p>
        )}

        {/* Buttons — always show Read More if there is any content */}
        <div style={c.btnRow}>
          {hasContent && (
            <button onClick={() => onReadMore(pub)} style={c.readMoreBtn}>
              Read More
            </button>
          )}
          {downloadUrl && (
            <a href={downloadUrl} target="_blank" rel="noreferrer" style={c.downloadLink}>
              Download PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────────────────── */
export default function Publications() {
  const { data: pubs, loading } = usePublications(staticPubs);
  const [search, setSearch] = useState("");
  const [type,   setType]   = useState("All");
  const [topic,  setTopic]  = useState("All");
  const [active, setActive] = useState(null); // pub being read

  const filtered = useMemo(() => {
    return pubs.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        (p.title   || "").toLowerCase().includes(q) ||
        (p.author  || "").toLowerCase().includes(q) ||
        (p.excerpt || p.description || "").toLowerCase().includes(q);
      const matchType  = type  === "All" || (p.type  || "") === type;
      const matchTopic = topic === "All" || (p.topic || "") === topic;
      return matchSearch && matchType && matchTopic;
    });
  }, [pubs, search, type, topic]);

  return (
    <>
      <PageMeta title="Publications" description="Research, policy briefs, articles, and climate analysis from Mausam Lab." />
      {active && <ArticleModal pub={active} onClose={() => setActive(null)} />}

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Publications</span>
          <h1>Knowledge for Climate Action</h1>
          <div className="hero-divider" />
          <p>
            Explore research, policy work, analysis, and practical resources produced by Mausam Lab.
            Our publications examine climate and sustainability challenges through locally grounded
            research, policy analysis, and accessible public knowledge.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div style={f.bar}>
        <div className="container" style={f.inner}>
          <input
            type="search"
            placeholder="Search by title, author, or keyword"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={f.searchInput}
            aria-label="Search publications"
          />
          <div style={f.row}>
            <span style={f.label}>Type:</span>
            {TYPES.map(t => (
              <button key={t} onClick={() => setType(t)}
                style={{ ...f.pill, ...(type === t ? f.pillOn : {}) }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section">
        <div className="container">
          {loading ? (
            <p style={{ color: "var(--color-text-muted)" }}>Loading…</p>
          ) : filtered.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--color-text-muted)", padding: "48px 0" }}>
              No publications match your search.
            </p>
          ) : (
            <div className="grid grid-3">
              {filtered.map(pub => (
                <PubCard key={pub.id} pub={pub} onReadMore={setActive} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ── Styles ── */

// Card
const c = {
  card: {
    background: "#fff", border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", overflow: "hidden",
    display: "flex", flexDirection: "column",
    boxShadow: "var(--shadow-sm)",
    transition: "box-shadow 0.15s, transform 0.15s",
  },
  img:            { width: "100%", aspectRatio: "4/3", objectFit: "cover" },
  imgPlaceholder: { width: "100%", aspectRatio: "4/3", background: "var(--color-neutral-light)" },
  body:    { padding: "20px 20px 20px", display: "flex", flexDirection: "column", flex: 1 },
  title:   { fontSize: 16, fontWeight: 600, color: "var(--color-primary)", marginBottom: 8, lineHeight: 1.3 },
  excerpt: { fontSize: 14, color: "var(--color-text)", lineHeight: 1.6, marginBottom: 8, flex: 1 },
  meta:    { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 14, letterSpacing: "0.01em" },
  btnRow:  { display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" },
  readMoreBtn: {
    flex: 1, padding: "9px 12px",
    background: "var(--color-primary)", color: "#fff",
    border: "none", borderRadius: 4,
    fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
    cursor: "pointer", textAlign: "center",
  },
  downloadLink: {
    flex: 1, padding: "9px 12px",
    border: "1.5px solid var(--color-primary)", color: "var(--color-primary)",
    borderRadius: 4, fontSize: 13, fontWeight: 600,
    textDecoration: "none", textAlign: "center",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
  },
};

// Filter bar
const f = {
  bar: {
    background: "#fff", borderBottom: "1px solid var(--color-border)",
    padding: "16px 0", position: "sticky", top: 68, zIndex: 50,
  },
  inner:       { display: "flex", flexDirection: "column", gap: 10 },
  searchInput: {
    width: "100%", padding: "10px 14px",
    border: "1px solid var(--color-border)", borderRadius: 4,
    fontFamily: "var(--font-body)", fontSize: 15, marginBottom: 0,
  },
  row:   { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" },
  label: { fontSize: 12, fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" },
  pill: {
    padding: "5px 12px", borderRadius: 999,
    border: "1px solid var(--color-border)",
    background: "transparent", fontSize: 13, cursor: "pointer",
    fontFamily: "var(--font-body)", color: "var(--color-neutral-mid)",
    transition: "background 0.15s, color 0.15s",
  },
  pillOn: { background: "var(--color-primary)", color: "#fff", borderColor: "var(--color-primary)", fontWeight: 600 },
};

// Modal
const m = {
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(34,38,31,0.55)", zIndex: 300,
    display: "flex", alignItems: "flex-start", justifyContent: "center",
    padding: "40px 16px", overflowY: "auto",
  },
  modal: {
    background: "#fff", borderRadius: 12,
    width: "100%", maxWidth: 700,
    boxShadow: "0 16px 56px rgba(34,38,31,0.18)",
    position: "relative",
  },
  close: {
    position: "absolute", top: 14, right: 14,
    background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
    width: 30, height: 30, borderRadius: 4,
    cursor: "pointer", fontSize: "1.1rem", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "inherit", zIndex: 1,
  },
  header: {
    background: "var(--color-primary)",
    borderRadius: "12px 12px 0 0",
    padding: "28px 28px 24px",
  },
  title:    { color: "#fff", fontSize: 20, fontWeight: 600, margin: "0 0 6px", lineHeight: 1.3 },
  meta:     { color: "rgba(255,255,255,0.75)", fontSize: 13, margin: 0, letterSpacing: "0.01em" },
  coverImg: { width: "100%", maxHeight: 280, objectFit: "cover" },
  body: {
    padding: "28px 28px 8px",
    maxHeight: "50vh", overflowY: "auto",
  },
  para: { fontSize: 15, lineHeight: 1.8, color: "var(--color-text)", marginBottom: 16 },
  downloadRow: { padding: "0 28px 16px" },
  footer: {
    padding: "12px 28px 20px",
    borderTop: "1px solid var(--color-border)",
    display: "flex", justifyContent: "flex-end",
  },
  closeBtn: {
    padding: "9px 20px", border: "1.5px solid var(--color-border)",
    background: "transparent", color: "var(--color-text-muted)",
    borderRadius: 4, fontFamily: "var(--font-body)", fontSize: 14,
    cursor: "pointer",
  },
};
