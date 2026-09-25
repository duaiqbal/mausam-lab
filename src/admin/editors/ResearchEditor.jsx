import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminTable from "../ui/AdminTable";
import Modal from "../ui/Modal";
import Field, { Input, Textarea, Select } from "../ui/Field";
import ImageUpload from "../ui/ImageUpload";
import SaveBar from "../ui/SaveBar";

const CATEGORIES = ["Research & Analysis", "Policy Analysis", "Research Articles"];

const EMPTY = {
  slug: "", title: "", category: "Research & Analysis",
  author: "", date: "", excerpt: "", body: [], image_url: "", sort_order: 0,
};

const COLS = [
  { key: "title",    label: "Title" },
  { key: "category", label: "Category" },
  { key: "author",   label: "Author" },
  { key: "date",     label: "Date" },
];

export default function ResearchEditor() {
  const [items, setItems]     = useState([]);
  const [modal, setModal]     = useState(null); // null | "add" | "edit"
  const [form, setForm]       = useState(EMPTY);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");
  // body is an array of paragraphs; we edit it as a single textarea
  const [bodyText, setBodyText] = useState("");

  async function load() {
    const { data } = await supabase.from("research").select("*").order("sort_order").order("created_at");
    setItems(data || []);
  }
  useEffect(() => { load(); }, []);

  function openAdd() {
    setForm(EMPTY);
    setBodyText("");
    setError("");
    setModal("add");
  }
  function openEdit(row) {
    setForm(row);
    setBodyText((row.body || []).join("\n\n"));
    setError("");
    setModal("edit");
  }
  function close() { setModal(null); }

  async function save() {
    setError("");
    setSaving(true);
    const payload = {
      ...form,
      body: bodyText.split("\n\n").map((p) => p.trim()).filter(Boolean),
    };
    let err;
    if (modal === "add") {
      const res = await supabase.from("research").insert([payload]);
      err = res.error;
    } else {
      const res = await supabase.from("research").update(payload).eq("id", form.id);
      err = res.error;
    }
    setSaving(false);
    if (err) { setError(err.message); return; }
    close();
    load();
  }

  async function del(row) {
    if (!confirm(`Delete "${row.title}"?`)) return;
    await supabase.from("research").delete().eq("id", row.id);
    load();
  }

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div>
      <div style={hdr}>
        <div>
          <h1 style={h1}>Research</h1>
          <p style={sub}>Add, edit, or remove research articles. Each article gets its own public URL at <code>/research/article/[slug]</code>.</p>
        </div>
        <button onClick={openAdd} style={addBtn}>+ Add article</button>
      </div>

      <AdminTable columns={COLS} rows={items} onEdit={openEdit} onDelete={del} />

      {modal && (
        <Modal title={modal === "add" ? "New research article" : "Edit research article"} onClose={close}>
          <Field label="Slug" required hint="URL-safe unique ID e.g. climate-policy-2024 (no spaces)">
            <Input value={form.slug} onChange={set("slug")} placeholder="my-article-slug" required />
          </Field>
          <Field label="Title" required>
            <Input value={form.title} onChange={set("title")} placeholder="Article title" required />
          </Field>
          <Field label="Category" required>
            <Select value={form.category} onChange={set("category")} options={CATEGORIES} />
          </Field>
          <Field label="Author">
            <Input value={form.author} onChange={set("author")} placeholder="Author name" />
          </Field>
          <Field label="Date" hint="Displayed as text, e.g. 'March 2024' or '15 March 2024'">
            <Input value={form.date} onChange={set("date")} placeholder="March 2024" />
          </Field>
          <Field label="Excerpt / summary" required>
            <Textarea value={form.excerpt} onChange={set("excerpt")} placeholder="Short summary shown on cards…" rows={2} />
          </Field>
          <Field label="Article body" hint="Separate each paragraph with a blank line. Each paragraph becomes its own block.">
            <Textarea
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              placeholder={"First paragraph...\n\nSecond paragraph..."}
              rows={10}
            />
          </Field>
          <Field label="Cover image">
            <ImageUpload
              currentUrl={form.image_url}
              onUploaded={(url) => setForm((f) => ({ ...f, image_url: url }))}
              folder="research"
            />
          </Field>
          <Field label="Sort order" hint="Lower numbers appear first. Default 0.">
            <Input type="number" value={form.sort_order} onChange={set("sort_order")} />
          </Field>
          {error && <p style={errStyle}>{error}</p>}
          <SaveBar onSave={save} onCancel={close} saving={saving} />
        </Modal>
      )}
    </div>
  );
}

const hdr = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: "0.5rem" };
const h1  = { margin: 0, fontSize: "1.6rem", color: "#1f5b4c" };
const sub = { margin: "0.25rem 0 0", color: "#5b6b63", fontSize: "0.875rem" };
const addBtn = { padding: "0.55rem 1.25rem", background: "#1f5b4c", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem", whiteSpace: "nowrap" };
const errStyle = { color: "#c0392b", fontSize: "0.8rem", background: "#fdf2f2", border: "1px solid #f5c6c6", borderRadius: 6, padding: "0.4rem 0.75rem" };
