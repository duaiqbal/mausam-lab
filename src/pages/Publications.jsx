import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PageMeta from "./PageMeta";
import { publications as staticPubs } from "../data/publications";
import { useCmsData } from "../lib/useCmsData";

const TYPES   = ["All", "Research", "Policy Brief", "Article", "Commentary", "Explainer", "Report", "Guide"];
const TOPICS  = [
  "All",
  "Climate & Environmental Security",
  "Climate-Induced Displacement",
  "Water Security",
  "Climate Governance",
  "Climate Literacy",
  "Climate Skills",
  "Climate Finance",
  "Adaptation & Resilience",
  "Disaster Risk Reduction",
  "Climate Communication",
  "Sustainable Development",
];

export default function Publications() {
  const { data: pubs, loading } = useCmsData("publications", staticPubs);
  const [search, setSearch]     = useState("");
  const [type,   setType]       = useState("All");
  const [topic,  setTopic]      = useState("All");

  const filtered = useMemo(() => {
    return pubs.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        (p.title  || "").toLowerCase().includes(q) ||
        (p.author || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q);
      const matchType  = type  === "All" || (p.type  || "") === type;
      const matchTopic = topic === "All" || (p.topic || "") === topic;
      return matchSearch && matchType && matchTopic;
    });
  }, [pubs, search, type, topic]);

  return (
    <>
      <PageMeta title="Publications" description="Research, policy briefs, articles, and climate analysis from Mausam Lab." />

      {/* ── Hero band ── */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Publications</span>
          <h1>Knowledge for climate action.</h1>
          <p>
            Explore research, policy work, analysis, and practical resources produced by Mausam Lab.
            Our publications examine climate and sustainability challenges through locally grounded
            research, policy analysis, and accessible public knowledge.
          </p>
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div style={s.filterBar}>
        <div className="container" style={s.filterInner}>
          <input
            type="search"
            placeholder="Search by title, topic, author, or keyword"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={s.searchInput}
            aria-label="Search publications"
          />
          <div style={s.filterRow}>
            <div style={s.filterGroup}>
              <span style={s.filterLabel}>Type:</span>
              {TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  style={{ ...s.pill, ...(type === t ? s.pillActive : {}) }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div style={s.filterRow}>
            <div style={s.filterGroup}>
              <span style={s.filterLabel}>Topic:</span>
              <div style={s.topicWrap}>
                {TOPICS.map(tp => (
                  <button
                    key={tp}
                    onClick={() => setTopic(tp)}
                    style={{ ...s.pill, ...(topic === tp ? s.pillActive : {}) }}
                  >
                    {tp}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="section">
        <div className="container">
          {loading ? (
            <p style={{ color: "var(--color-text-muted)" }}>Loading…</p>
          ) : filtered.length === 0 ? (
            <div style={s.empty}>
              <p>No publications match your search. Try adjusting the filters.</p>
            </div>
          ) : (
            <div className="grid grid-3">
              {filtered.map(pub => <PubCard key={pub.id} pub={pub} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function PubCard({ pub }) {
  const imageUrl   = pub.image_url || null;
  const type       = pub.type || "Publication";
  const downloadUrl = pub.download_url || pub.downloadUrl || null;

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      {imageUrl ? (
        <img src={imageUrl} alt={pub.title} style={s.cardImg} />
      ) : (
        <div style={s.cardImgPlaceholder} />
      )}
      <div style={{ padding: 24 }}>
        <span className="tag tag-accent" style={{ marginBottom: 10 }}>{type}</span>
        <h3 style={s.cardTitle}>{pub.title}</h3>
        {(pub.author || pub.date) && (
          <p style={s.cardMeta}>{[pub.author, pub.date].filter(Boolean).join(" · ")}</p>
        )}
        {pub.description && <p style={s.cardDesc}>{pub.description}</p>}
        <div style={s.cardFooter}>
          {downloadUrl ? (
            <a href={downloadUrl} target="_blank" rel="noreferrer" style={s.readMore}>Read More →</a>
          ) : (
            <span style={{ ...s.readMore, opacity: 0.45, cursor: "default" }}>Read More →</span>
          )}
        </div>
      </div>
    </div>
  );
}

const s = {
  filterBar: {
    background: "var(--color-surface)",
    borderBottom: "1px solid var(--color-border)",
    padding: "20px 0",
    position: "sticky", top: 68, zIndex: 50,
  },
  filterInner: { display: "flex", flexDirection: "column", gap: 12 },
  searchInput: {
    width: "100%", padding: "10px 14px",
    border: "1px solid var(--color-border)", borderRadius: 4,
    fontFamily: "var(--font-body)", fontSize: 15,
    marginBottom: 0,
  },
  filterRow:   { display: "flex", alignItems: "flex-start", gap: 8, flexWrap: "wrap" },
  filterGroup: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" },
  filterLabel: { fontSize: 13, fontWeight: 600, color: "var(--color-text-muted)", whiteSpace: "nowrap" },
  topicWrap:   { display: "flex", flexWrap: "wrap", gap: 6 },
  pill: {
    padding: "5px 12px", borderRadius: 999,
    border: "1px solid var(--color-border)",
    background: "transparent", fontSize: 13, cursor: "pointer",
    fontFamily: "var(--font-body)", color: "var(--color-neutral-mid)",
    transition: "background 0.15s, color 0.15s",
  },
  pillActive: {
    background: "var(--color-primary)", color: "#fff",
    borderColor: "var(--color-primary)", fontWeight: 600,
  },
  empty:      { textAlign: "center", padding: "48px 0", color: "var(--color-text-muted)" },
  cardImg:    { width: "100%", aspectRatio: "4/3", objectFit: "cover" },
  cardImgPlaceholder: { width: "100%", aspectRatio: "4/3", background: "var(--color-neutral-light)" },
  cardTitle:  { fontSize: 17, fontWeight: 600, color: "var(--color-primary)", marginBottom: 6, lineHeight: 1.3 },
  cardMeta:   { fontSize: 13, color: "var(--color-text-muted)", marginBottom: 8 },
  cardDesc:   { fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.5, marginBottom: 16 },
  cardFooter: { marginTop: "auto" },
  readMore:   { fontSize: 14, fontWeight: 600, color: "var(--color-accent)", textDecoration: "none" },
};
