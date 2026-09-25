import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminTable from "../ui/AdminTable";
import Modal from "../ui/Modal";
import Field, { Input, Textarea, Select } from "../ui/Field";
import ImageUpload from "../ui/ImageUpload";
import SaveBar from "../ui/SaveBar";

// Single source of truth — same 7 types used in CMS and public website
const TYPES = ["Research", "Policy Brief", "Article", "Commentary", "Explainer", "Report", "Guide"];

const EMPTY = {
  title: "", type: "Research", author: "", date: "",
  description: "", download_url: "", image_url: "", sort_order: 0,
};

const COLS = [
  { key: "title",  label: "Title" },
  { key: "type",   label: "Type" },
  { key: "author", label: "Author" },
  { key: "date",   label: "Date" },
];

export default function PublicationsEditor() {
  const [items, setItems]   = useState([]);
  const [modal, setModal]   = useState(null);
  const [form, setForm]     = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  async function load() {
    const { data } = await supabase.from("publications").select("*").order("sort_order").order("created_at");
    setItems(data || []);
  }
  useEffect(() => { load(); }, []);

  function openAdd()  { setForm(EMPTY); setError(""); setModal("add"); }
  function openEdit(row) { setForm(row); setError(""); setModal("edit"); }
  function close()    { setModal(null); }

  async function save() {
    setError(""); setSaving(true);
    let err;
    if (modal === "add") {
      ({ error: err } = await supabase.from("publications").insert([form]));
    } else {
      ({ error: err } = await supabase.from("publications").update(form).eq("id", form.id));
    }
    setSaving(false);
    if (err) { setError(err.message); return; }
    close(); load();
  }

  async function del(row) {
    if (!confirm(`Delete "${row.title}"?`)) return;
    await supabase.from("publications").delete().eq("id", row.id);
    load();
  }

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div>
      <div style={hdr}>
        <div>
          <h1 style={h1}>Publications</h1>
          <p style={sub}>Research, policy briefs, articles, commentaries, explainers, reports, and guides.</p>
        </div>
        <button onClick={openAdd} style={addBtn}>+ Add publication</button>
      </div>

      <AdminTable columns={COLS} rows={items} onEdit={openEdit} onDelete={del} />

      {modal && (
        <Modal title={modal === "add" ? "New publication" : "Edit publication"} onClose={close}>
          <Field label="Title" required>
            <Input value={form.title} onChange={set("title")} placeholder="Publication title" required />
          </Field>
          <Field label="Type" required>
            <Select value={form.type} onChange={set("type")} options={TYPES} />
          </Field>
          <Field label="Author">
            <Input value={form.author} onChange={set("author")} placeholder="Author(s)" />
          </Field>
          <Field label="Date" hint="e.g. 'January 2024'">
            <Input value={form.date} onChange={set("date")} placeholder="January 2024" />
          </Field>
          <Field label="Description">
            <Textarea value={form.description} onChange={set("description")} placeholder="Short description of this publication…" rows={3} />
          </Field>
          <Field label="Download URL" hint="Link to PDF or external page (optional)">
            <Input value={form.download_url || ""} onChange={set("download_url")} placeholder="https://…" />
          </Field>
          <Field label="Cover image">
            <ImageUpload
              currentUrl={form.image_url}
              onUploaded={(url) => setForm((f) => ({ ...f, image_url: url }))}
              folder="publications"
            />
          </Field>
          <Field label="Sort order" hint="Lower = appears first">
            <Input type="number" value={form.sort_order} onChange={set("sort_order")} />
          </Field>
          {error && <p style={errStyle}>{error}</p>}
          <SaveBar onSave={save} onCancel={close} saving={saving} />
        </Modal>
      )}
    </div>
  );
}

const hdr    = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: "0.5rem" };
const h1     = { margin: 0, fontSize: "1.6rem", color: "#1f5b4c" };
const sub    = { margin: "0.25rem 0 0", color: "#5b6b63", fontSize: "0.875rem" };
const addBtn = { padding: "0.55rem 1.25rem", background: "#1f5b4c", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem", whiteSpace: "nowrap" };
const errStyle = { color: "#c0392b", fontSize: "0.8rem", background: "#fdf2f2", border: "1px solid #f5c6c6", borderRadius: 6, padding: "0.4rem 0.75rem" };
