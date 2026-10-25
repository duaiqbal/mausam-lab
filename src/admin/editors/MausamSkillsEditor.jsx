import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Modal from "../ui/Modal";
import Field, { Input, Textarea, Select } from "../ui/Field";
import SaveBar from "../ui/SaveBar";

const RESOURCE_TYPES = ["Guide", "Template", "Example", "Checklist", "Article", "Video", "Further Reading"];

/* ── small helpers ── */
function Btn({ onClick, children, danger, outline }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "4px 14px", borderRadius: 6, cursor: "pointer",
        fontFamily: "inherit", fontSize: "0.78rem", fontWeight: 600,
        background: danger ? "#c0392b" : outline ? "transparent" : "#00357A",
        color: danger || !outline ? "#fff" : "#00357A",
        border: outline ? "1.5px solid #00357A" : "none",
        marginRight: 6,
      }}
    >
      {children}
    </button>
  );
}

function Table({ cols, rows, onEdit, onDelete }) {
  if (!rows.length) return <p style={{ color: "#5C5F58", marginTop: 12, fontSize: "0.875rem" }}>No items yet.</p>;
  return (
    <div style={{ overflowX: "auto", marginTop: 12 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(34,38,31,0.07)" }}>
        <thead>
          <tr>{cols.map(c => <th key={c.key} style={th}>{c.label}</th>)}<th style={th}>Actions</th></tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id} style={{ background: i % 2 === 0 ? "#fff" : "#F6F3F0" }}>
              {cols.map(c => <td key={c.key} style={td}>{c.render ? c.render(row) : String(row[c.key] ?? "")}</td>)}
              <td style={td}>
                <Btn onClick={() => onEdit(row)}>Edit</Btn>
                <Btn onClick={() => onDelete(row)} danger>Delete</Btn>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EDITOR
══════════════════════════════════════════════════════════════ */
export default function MausamSkillsEditor() {
  const [tab, setTab] = useState("categories");

  // Data
  const [categories, setCategories] = useState([]);
  const [skills,     setSkills]     = useState([]);
  const [resources,  setResources]  = useState([]);

  // Modal state
  const [modal, setModal]   = useState(null);  // { type: "cat"|"skill"|"resource", mode: "add"|"edit", data }
  const [form,  setForm]    = useState({});
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState("");

  // Filters
  const [filterCat,   setFilterCat]   = useState("all");
  const [filterSkill, setFilterSkill] = useState("all");

  /* ── loaders ── */
  async function loadAll() {
    const [c, s, r] = await Promise.all([
      supabase.from("skills_categories").select("*").order("sort_order").order("name"),
      supabase.from("skills").select("*").order("sort_order").order("name"),
      supabase.from("skill_resources").select("*").order("sort_order").order("created_at"),
    ]);
    setCategories(c.data || []);
    setSkills(s.data || []);
    setResources(r.data || []);
  }
  useEffect(() => { loadAll(); }, []);

  /* ── open modals ── */
  function openCatAdd()    { setForm({ name: "", description: "", sort_order: 0 }); setError(""); setModal({ type: "cat", mode: "add" }); }
  function openCatEdit(r)  { setForm(r); setError(""); setModal({ type: "cat", mode: "edit" }); }

  function openSkillAdd()  { setForm({ category_id: categories[0]?.id || "", name: "", description: "", sort_order: 0 }); setError(""); setModal({ type: "skill", mode: "add" }); }
  function openSkillEdit(r){ setForm(r); setError(""); setModal({ type: "skill", mode: "edit" }); }

  function openResAdd()    { setForm({ skill_id: skills[0]?.id || "", title: "", resource_type: "Guide", description: "", content: "", url: "", read_time: "", sort_order: 0 }); setError(""); setModal({ type: "resource", mode: "add" }); }
  function openResEdit(r)  { setForm(r); setError(""); setModal({ type: "resource", mode: "edit" }); }

  function closeModal()    { setModal(null); }

  /* ── save ── */
  async function save() {
    setError(""); setSaving(true);
    const { type, mode } = modal;
    const tableMap = { cat: "skills_categories", skill: "skills", resource: "skill_resources" };
    const table = tableMap[type];
    let err;
    if (mode === "add") {
      ({ error: err } = await supabase.from(table).insert([form]));
    } else {
      ({ error: err } = await supabase.from(table).update(form).eq("id", form.id));
    }
    setSaving(false);
    if (err) { setError(err.message); return; }
    closeModal(); loadAll();
  }

  /* ── delete ── */
  async function del(table, row, label) {
    if (!confirm(`Delete "${label}"? This will also delete all items underneath it.`)) return;
    await supabase.from(table).delete().eq("id", row.id);
    loadAll();
  }

  const set = f => e => setForm(prev => ({ ...prev, [f]: e.target.value }));

  /* ── filtered views ── */
  const visibleSkills    = filterCat   === "all" ? skills    : skills.filter(s => s.category_id === filterCat);
  const visibleResources = filterSkill === "all" ? resources : resources.filter(r => r.skill_id  === filterSkill);

  const catName   = id => categories.find(c => c.id === id)?.name  || "—";
  const skillName = id => skills.find(s => s.id === id)?.name       || "—";

  const TABS = [
    { id: "categories", label: `Categories (${categories.length})` },
    { id: "skills",     label: `Skills (${skills.length})` },
    { id: "resources",  label: `Resources (${resources.length})` },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: "1rem" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.6rem", color: "#00357A" }}>Mausam Skills</h1>
          <p style={{ margin: "4px 0 0", color: "#5C5F58", fontSize: "0.875rem" }}>
            Manage skill categories, individual skills, and their learning resources.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {tab === "categories" && <Btn onClick={openCatAdd}>+ Add Category</Btn>}
          {tab === "skills"     && <Btn onClick={openSkillAdd}>+ Add Skill</Btn>}
          {tab === "resources"  && <Btn onClick={openResAdd}>+ Add Resource</Btn>}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 4, borderBottom: "2px solid #D9D3CB", marginBottom: "1.25rem" }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "8px 18px", border: "none", cursor: "pointer",
              fontFamily: "inherit", fontSize: "0.875rem", fontWeight: tab === t.id ? 700 : 500,
              background: "transparent",
              color: tab === t.id ? "#00357A" : "#5C5F58",
              borderBottom: tab === t.id ? "2px solid #00357A" : "2px solid transparent",
              marginBottom: -2,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── CATEGORIES TAB ── */}
      {tab === "categories" && (
        <Table
          cols={[
            { key: "name",        label: "Category Name" },
            { key: "description", label: "Description" },
            { key: "sort_order",  label: "Order" },
            { key: "_skills",     label: "Skills", render: row => skills.filter(s => s.category_id === row.id).length },
          ]}
          rows={categories}
          onEdit={openCatEdit}
          onDelete={row => del("skills_categories", row, row.name)}
        />
      )}

      {/* ── SKILLS TAB ── */}
      {tab === "skills" && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#5C5F58" }}>Filter by category:</label>
            <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={filterSel}>
              <option value="all">All categories</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <Table
            cols={[
              { key: "name",        label: "Skill Name" },
              { key: "category_id", label: "Category",    render: row => catName(row.category_id) },
              { key: "description", label: "Description" },
              { key: "sort_order",  label: "Order" },
              { key: "_res",        label: "Resources",   render: row => resources.filter(r => r.skill_id === row.id).length },
            ]}
            rows={visibleSkills}
            onEdit={openSkillEdit}
            onDelete={row => del("skills", row, row.name)}
          />
        </>
      )}

      {/* ── RESOURCES TAB ── */}
      {tab === "resources" && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#5C5F58" }}>Filter by skill:</label>
            <select value={filterSkill} onChange={e => setFilterSkill(e.target.value)} style={filterSel}>
              <option value="all">All skills</option>
              {skills.map(s => <option key={s.id} value={s.id}>{catName(s.category_id)} → {s.name}</option>)}
            </select>
          </div>
          <Table
            cols={[
              { key: "title",         label: "Resource Title" },
              { key: "resource_type", label: "Type" },
              { key: "skill_id",      label: "Skill",       render: row => skillName(row.skill_id) },
              { key: "read_time",     label: "Read time" },
            ]}
            rows={visibleResources}
            onEdit={openResEdit}
            onDelete={row => del("skill_resources", row, row.title)}
          />
        </>
      )}

      {/* ══ MODAL ══ */}
      {modal && (
        <Modal
          title={
            modal.type === "cat"      ? (modal.mode === "add" ? "New Category"  : "Edit Category")  :
            modal.type === "skill"    ? (modal.mode === "add" ? "New Skill"     : "Edit Skill")     :
                                        (modal.mode === "add" ? "New Resource"  : "Edit Resource")
          }
          onClose={closeModal}
        >
          {/* ── Category form ── */}
          {modal.type === "cat" && (
            <>
              <Field label="Category name" required>
                <Input value={form.name || ""} onChange={set("name")} placeholder="e.g. Research Skills" required />
              </Field>
              <Field label="Description">
                <Textarea value={form.description || ""} onChange={set("description")} placeholder="One-line description of this category…" rows={2} />
              </Field>
              <Field label="Sort order" hint="Lower = appears first">
                <Input type="number" value={form.sort_order ?? 0} onChange={set("sort_order")} />
              </Field>
            </>
          )}

          {/* ── Skill form ── */}
          {modal.type === "skill" && (
            <>
              <Field label="Category" required>
                <Select
                  value={form.category_id || ""}
                  onChange={set("category_id")}
                  options={categories.map(c => ({ value: c.id, label: c.name }))}
                  required
                />
              </Field>
              <Field label="Skill name" required>
                <Input value={form.name || ""} onChange={set("name")} placeholder="e.g. Literature Review" required />
              </Field>
              <Field label="Description" hint="Short description shown under the skill tag">
                <Textarea value={form.description || ""} onChange={set("description")} placeholder="What this skill covers…" rows={2} />
              </Field>
              <Field label="Sort order" hint="Lower = appears first within the category">
                <Input type="number" value={form.sort_order ?? 0} onChange={set("sort_order")} />
              </Field>
            </>
          )}

          {/* ── Resource form ── */}
          {modal.type === "resource" && (
            <>
              <Field label="Skill" required>
                <Select
                  value={form.skill_id || ""}
                  onChange={set("skill_id")}
                  options={skills.map(s => ({ value: s.id, label: `${catName(s.category_id)} → ${s.name}` }))}
                  required
                />
              </Field>
              <Field label="Resource title" required>
                <Input value={form.title || ""} onChange={set("title")} placeholder="e.g. How to Write a Literature Review" required />
              </Field>
              <Field label="Type" required>
                <Select value={form.resource_type || "Guide"} onChange={set("resource_type")} options={RESOURCE_TYPES} />
              </Field>
              <Field label="Read time" hint="e.g. '5 min read'">
                <Input value={form.read_time || ""} onChange={set("read_time")} placeholder="5 min read" />
              </Field>
              <Field label="Short description" hint="1–2 lines shown on the skill card">
                <Textarea value={form.description || ""} onChange={set("description")} placeholder="Short description shown on the card…" rows={2} />
              </Field>
              <Field label="Full content" hint="The complete guide/article shown when the user opens this resource. Separate paragraphs with a blank line.">
                <Textarea value={form.content || ""} onChange={set("content")} placeholder={"First paragraph...\n\nSecond paragraph..."} rows={12} />
              </Field>
              <Field label="External URL" hint="Optional link to an external resource or PDF">
                <Input value={form.url || ""} onChange={set("url")} placeholder="https://…" />
              </Field>
              <Field label="Sort order" hint="Lower = appears first">
                <Input type="number" value={form.sort_order ?? 0} onChange={set("sort_order")} />
              </Field>
            </>
          )}

          {error && <p style={{ color: "#c0392b", fontSize: "0.8rem", background: "#fdf2f2", border: "1px solid #f5c6c6", borderRadius: 6, padding: "0.4rem 0.75rem" }}>{error}</p>}
          <SaveBar onSave={save} onCancel={closeModal} saving={saving} />
        </Modal>
      )}
    </div>
  );
}

const th = { background: "#00357A", color: "#fff", padding: "0.65rem 1rem", textAlign: "left", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.03em", whiteSpace: "nowrap" };
const td = { padding: "0.6rem 1rem", borderBottom: "1px solid #D9D3CB", verticalAlign: "top", maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "0.85rem" };
const filterSel = { padding: "5px 10px", border: "1.5px solid #D9D3CB", borderRadius: 6, fontFamily: "inherit", fontSize: "0.85rem", color: "#22261F" };
