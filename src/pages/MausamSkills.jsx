import { useEffect, useState } from "react";
import PageMeta from "./PageMeta";
import SectionHeader from "../components/SectionHeader";
import { supabase } from "../lib/supabase";

/* ── Static fallback data (shown if DB is empty) ─────────────────────────── */
const STATIC_CATEGORIES = [
  { id: "s1", name: "Research Skills",      description: "Build the skills to ask better questions, conduct stronger research, and work with evidence." },
  { id: "s2", name: "Policy Skills",        description: "Learn how to understand policy, communicate evidence, and develop practical recommendations." },
  { id: "s3", name: "Communication Skills", description: "Learn how to turn complex research and climate issues into clear, accessible communication." },
  { id: "s4", name: "Career Skills",        description: "Practical resources for navigating opportunities in research, policy, climate, and development." },
  { id: "s5", name: "Climate Knowledge",    description: "Build a stronger understanding of the ideas and systems shaping climate policy and action." },
];
const STATIC_SKILLS = [
  { id: "sk1", category_id: "s1", name: "Literature Review" },
  { id: "sk2", category_id: "s1", name: "Research Questions" },
  { id: "sk3", category_id: "s1", name: "Interviews" },
  { id: "sk4", category_id: "s1", name: "Surveys" },
  { id: "sk5", category_id: "s1", name: "Field Research" },
  { id: "sk6", category_id: "s1", name: "Referencing & Citations" },
  { id: "sk7", category_id: "s2", name: "Policy Brief Writing" },
  { id: "sk8", category_id: "s2", name: "Policy Analysis" },
  { id: "sk9", category_id: "s2", name: "Stakeholder Mapping" },
  { id: "sk10",category_id: "s2", name: "Policy Recommendations" },
  { id: "sk11",category_id: "s2", name: "Policy Research" },
  { id: "sk12",category_id: "s3", name: "Climate Communication" },
  { id: "sk13",category_id: "s3", name: "Writing for Public Audiences" },
  { id: "sk14",category_id: "s3", name: "Research Storytelling" },
  { id: "sk15",category_id: "s3", name: "Visual Communication" },
  { id: "sk16",category_id: "s3", name: "Science Communication" },
  { id: "sk17",category_id: "s4", name: "CV & Profile Building" },
  { id: "sk18",category_id: "s4", name: "Scholarship Applications" },
  { id: "sk19",category_id: "s4", name: "Conference Applications" },
  { id: "sk20",category_id: "s4", name: "Professional Networking" },
  { id: "sk21",category_id: "s5", name: "Climate Governance" },
  { id: "sk22",category_id: "s5", name: "Climate Finance" },
  { id: "sk23",category_id: "s5", name: "Adaptation & Resilience" },
  { id: "sk24",category_id: "s5", name: "Disaster Risk Reduction" },
  { id: "sk25",category_id: "s5", name: "Environmental Security" },
];

const RESOURCE_TYPE_COLORS = {
  "Guide":          { bg: "rgba(0,53,122,0.08)",  color: "var(--color-primary)" },
  "Template":       { bg: "rgba(204,78,0,0.08)",  color: "var(--color-accent)" },
  "Example":        { bg: "rgba(31,92,61,0.08)",  color: "var(--color-success)" },
  "Checklist":      { bg: "rgba(0,53,122,0.08)",  color: "var(--color-primary)" },
  "Article":        { bg: "rgba(204,78,0,0.08)",  color: "var(--color-accent)" },
  "Video":          { bg: "rgba(92,95,88,0.08)",  color: "var(--color-text-muted)" },
  "Further Reading":{ bg: "rgba(92,95,88,0.08)",  color: "var(--color-text-muted)" },
};

/* ── Resource detail modal ────────────────────────────────────────────────── */
function ResourceModal({ resource, onClose }) {
  return (
    <div style={m.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={m.modal} role="dialog" aria-modal="true">
        <button onClick={onClose} style={m.closeBtn} aria-label="Close">&#215;</button>

        <div style={m.header}>
          <div style={m.headerMeta}>
            <span style={{
              ...m.typeBadge,
              ...(RESOURCE_TYPE_COLORS[resource.resource_type] || RESOURCE_TYPE_COLORS["Guide"]),
            }}>
              {resource.resource_type}
            </span>
            {resource.read_time && <span style={m.readTime}>{resource.read_time}</span>}
          </div>
          <h2 style={m.title}>{resource.title}</h2>
          {resource.description && <p style={m.desc}>{resource.description}</p>}
        </div>

        <div style={m.body}>
          {resource.content ? (
            resource.content.split("\n\n").filter(p => p.trim()).map((para, i) => (
              <p key={i} style={m.para}>{para.trim()}</p>
            ))
          ) : (
            <p style={m.noContent}>No detailed content added yet. Check back soon.</p>
          )}
        </div>

        {resource.url && (
          <div style={m.linkRow}>
            <a href={resource.url} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: 14 }}>
              View External Resource
            </a>
          </div>
        )}

        <div style={m.footer}>
          <button onClick={onClose} style={m.footerClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ── Skill modal — shows all resources for a skill ───────────────────────── */
function SkillModal({ skill, resources, onClose, onOpenResource }) {
  return (
    <div style={m.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ ...m.modal, maxWidth: 640 }} role="dialog" aria-modal="true">
        <button onClick={onClose} style={m.closeBtn} aria-label="Close">&#215;</button>

        <div style={{ ...m.header, background: "var(--color-primary)" }}>
          <h2 style={{ ...m.title, color: "#fff" }}>{skill.name}</h2>
          {skill.description && <p style={{ ...m.desc, color: "rgba(255,255,255,0.8)" }}>{skill.description}</p>}
        </div>

        <div style={m.body}>
          {resources.length === 0 ? (
            <p style={m.noContent}>No resources added yet for this skill. Check back soon.</p>
          ) : (
            <div style={sk.resourceGrid}>
              {resources.map(r => (
                <button key={r.id} onClick={() => onOpenResource(r)} style={sk.resourceCard}>
                  <div style={sk.resourceTop}>
                    <span style={{
                      ...sk.typeBadge,
                      ...(RESOURCE_TYPE_COLORS[r.resource_type] || RESOURCE_TYPE_COLORS["Guide"]),
                    }}>
                      {r.resource_type}
                    </span>
                    {r.read_time && <span style={sk.readTime}>{r.read_time}</span>}
                  </div>
                  <h4 style={sk.resourceTitle}>{r.title}</h4>
                  {r.description && <p style={sk.resourceDesc}>{r.description}</p>}
                  <span style={sk.openLink}>Open resource</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={m.footer}>
          <button onClick={onClose} style={m.footerClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────────────────── */
export default function MausamSkills() {
  const [categories, setCategories] = useState([]);
  const [skills,     setSkills]     = useState([]);
  const [resources,  setResources]  = useState([]);
  const [loading,    setLoading]    = useState(true);

  const [activeSkill,    setActiveSkill]    = useState(null); // skill modal
  const [activeResource, setActiveResource] = useState(null); // resource modal

  useEffect(() => {
    async function load() {
      const [c, s, r] = await Promise.all([
        supabase.from("skills_categories").select("*").order("sort_order").order("name"),
        supabase.from("skills").select("*").order("sort_order").order("name"),
        supabase.from("skill_resources").select("*").order("sort_order").order("created_at"),
      ]);

      const cats = (c.data && c.data.length > 0) ? c.data : STATIC_CATEGORIES;
      const sks  = (s.data && s.data.length > 0) ? s.data : STATIC_SKILLS;
      const res  = r.data || [];

      setCategories(cats);
      setSkills(sks);
      setResources(res);
      setLoading(false);
    }
    load();
  }, []);

  // Skills for a given category
  const skillsFor  = catId => skills.filter(s => s.category_id === catId);
  // Resources for a given skill
  const resourcesFor = skillId => resources.filter(r => r.skill_id === skillId);

  function openSkill(skill) {
    setActiveResource(null);
    setActiveSkill(skill);
  }
  function openResource(resource) {
    setActiveResource(resource);
  }

  const FORMATS = ["Guides", "Examples", "Templates", "Checklists", "Articles", "Further Reading"];

  return (
    <>
      <PageMeta title="Mausam Skills" description="Practical learning resources for students and emerging climate professionals." />

      {/* Skill resources modal */}
      {activeSkill && !activeResource && (
        <SkillModal
          skill={activeSkill}
          resources={resourcesFor(activeSkill.id)}
          onClose={() => setActiveSkill(null)}
          onOpenResource={openResource}
        />
      )}

      {/* Individual resource modal */}
      {activeResource && (
        <ResourceModal
          resource={activeResource}
          onClose={() => setActiveResource(null)}
        />
      )}

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Mausam Skills</span>
          <h1>Learn it. Apply it. Use it.</h1>
          <div className="hero-divider" />
          <p>
            Mausam Skills is a practical learning space for students, young researchers, and emerging
            climate professionals. Click on any skill to access guides, templates, and learning resources.
          </p>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Explore Skills"
            title="Skill Categories"
            description="Select any skill to access practical resources, guides, and learning materials."
          />

          {loading ? (
            <p style={{ textAlign: "center", color: "var(--color-text-muted)" }}>Loading…</p>
          ) : (
            <div style={p.categoryList}>
              {categories.map((cat, i) => {
                const catSkills = skillsFor(cat.id);
                return (
                  <div key={cat.id} style={{ ...p.categoryBlock, background: i % 2 === 0 ? "#fff" : "var(--color-neutral-light)" }}>
                    {/* Category header */}
                    <div style={p.catHeader}>
                      <div style={p.catIndex}>{String(i + 1).padStart(2, "0")}</div>
                      <div>
                        <h3 style={p.catName}>{cat.name}</h3>
                        {cat.description && <p style={p.catDesc}>{cat.description}</p>}
                      </div>
                    </div>

                    {/* Skill tags — click to open skill modal */}
                    {catSkills.length > 0 ? (
                      <div style={p.skillTags}>
                        {catSkills.map(skill => {
                          const resCount = resourcesFor(skill.id).length;
                          return (
                            <button
                              key={skill.id}
                              onClick={() => openSkill(skill)}
                              style={p.skillTag}
                              title={`${resCount} resource${resCount !== 1 ? "s" : ""} available`}
                            >
                              {skill.name}
                              {resCount > 0 && (
                                <span style={p.resCount}>{resCount}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <p style={p.noSkills}>No skills added yet in this category.</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Resource formats CTA */}
      <section style={p.ctaBand}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={p.ctaH2}>Practical, Not Just Theoretical</h2>
          <div style={p.ctaDivider} />
          <p style={p.ctaP}>
            Mausam Skills resources are designed to help you move from understanding a concept to using it.
          </p>
          <div style={p.formatPills}>
            {FORMATS.map(f => <span key={f} className="tag">{f}</span>)}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Styles ── */

// Page
const p = {
  categoryList: { display: "flex", flexDirection: "column", gap: 8 },
  categoryBlock: {
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)",
    padding: "28px 32px",
    borderLeft: "4px solid var(--color-primary)",
  },
  catHeader: { display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 18 },
  catIndex:  {
    fontSize: 28, fontWeight: 700, color: "var(--color-border)",
    fontFamily: "var(--font-heading)", lineHeight: 1, flexShrink: 0, minWidth: 40,
  },
  catName: { color: "var(--color-primary)", fontWeight: 600, fontSize: 20, margin: "0 0 4px" },
  catDesc: { color: "var(--color-text-muted)", fontSize: 14, margin: 0, lineHeight: 1.5 },
  skillTags:  { display: "flex", flexWrap: "wrap", gap: 8, paddingLeft: 60 },
  skillTag: {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "8px 16px",
    background: "var(--color-surface)", border: "1.5px solid var(--color-border)",
    borderRadius: 999, cursor: "pointer",
    fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
    color: "var(--color-primary)",
    transition: "background 0.15s, border-color 0.15s, color 0.15s",
  },
  resCount: {
    background: "var(--color-primary)", color: "#fff",
    fontSize: 11, fontWeight: 700, borderRadius: 999,
    padding: "1px 7px", lineHeight: 1.6,
  },
  noSkills: { color: "var(--color-text-muted)", fontSize: 14, paddingLeft: 60, margin: 0, fontStyle: "italic" },
  ctaBand:    { background: "var(--color-primary)", padding: "var(--space-6) 0" },
  ctaH2:      { color: "#fff", margin: 0 },
  ctaDivider: { width: 50, height: 3, background: "var(--color-accent)", borderRadius: 2, margin: "16px auto 20px" },
  ctaP:       { color: "rgba(255,255,255,0.85)", maxWidth: 520, margin: "0 auto 20px", fontSize: 16 },
  formatPills:{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" },
};

// Skill modal resource grid
const sk = {
  resourceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 14 },
  resourceCard: {
    background: "#fff", border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", padding: "18px 16px",
    display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start",
    cursor: "pointer", textAlign: "left", fontFamily: "var(--font-body)",
    transition: "box-shadow 0.15s, transform 0.15s",
    borderTop: "3px solid var(--color-primary)",
  },
  resourceTop:   { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  typeBadge: {
    fontSize: 11, fontWeight: 700, textTransform: "uppercase",
    letterSpacing: "0.06em", padding: "2px 9px", borderRadius: 999,
  },
  readTime:      { fontSize: 12, color: "var(--color-text-muted)" },
  resourceTitle: { color: "var(--color-primary)", fontWeight: 600, fontSize: 14, margin: 0, lineHeight: 1.3 },
  resourceDesc:  { color: "var(--color-text-muted)", fontSize: 13, margin: 0, lineHeight: 1.5 },
  openLink:      { fontSize: 12, fontWeight: 700, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4 },
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
    width: "100%", maxWidth: 600,
    boxShadow: "0 16px 56px rgba(34,38,31,0.18)",
    position: "relative",
  },
  closeBtn: {
    position: "absolute", top: 14, right: 14, zIndex: 1,
    background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
    width: 30, height: 30, borderRadius: 4,
    cursor: "pointer", fontSize: "1.1rem", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "inherit",
  },
  header: {
    background: "var(--color-neutral-light)",
    borderRadius: "12px 12px 0 0",
    padding: "24px 28px 20px",
  },
  headerMeta: { display: "flex", gap: 8, alignItems: "center", marginBottom: 10 },
  typeBadge: {
    fontSize: 11, fontWeight: 700, textTransform: "uppercase",
    letterSpacing: "0.06em", padding: "3px 10px", borderRadius: 999,
  },
  readTime:  { fontSize: 12, color: "var(--color-text-muted)" },
  title:     { color: "var(--color-primary)", fontSize: 20, fontWeight: 600, margin: "0 0 6px", lineHeight: 1.3 },
  desc:      { color: "var(--color-text-muted)", fontSize: 14, margin: 0, lineHeight: 1.5 },
  body:      { padding: "24px 28px", maxHeight: "55vh", overflowY: "auto" },
  para:      { fontSize: 15, lineHeight: 1.8, color: "var(--color-text)", marginBottom: 14 },
  noContent: { color: "var(--color-text-muted)", fontStyle: "italic", fontSize: 14 },
  linkRow:   { padding: "4px 28px 16px" },
  footer: {
    padding: "12px 28px 20px",
    borderTop: "1px solid var(--color-border)",
    display: "flex", justifyContent: "flex-end",
  },
  footerClose: {
    padding: "9px 20px", border: "1.5px solid var(--color-border)",
    background: "transparent", color: "var(--color-text-muted)",
    borderRadius: 4, fontFamily: "var(--font-body)", fontSize: 14, cursor: "pointer",
  },
};
