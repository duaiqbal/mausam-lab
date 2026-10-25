import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminTable from "../ui/AdminTable";
import Modal from "../ui/Modal";
import Field, { Input, Textarea, Select } from "../ui/Field";
import ImageUpload from "../ui/ImageUpload";
import SaveBar from "../ui/SaveBar";

const STATUSES = ["Planned", "In Progress", "Completed", "On Hold"];
const EMPTY    = { title: "", status: "Planned", focus_area: "", description: "", image_url: "", sort_order: 0 };
const COLS     = [
  { key: "title",      label: "Title" },
  { key: "status",     label: "Status" },
  { key: "focus_area", label: "Focus Area" },
];

export default function ProjectsEditor() {
  const [items, setItems]   = useState([]);
  const [modal, setModal]   = useState(null);
  const [form, setForm]     = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  async function load() {
    const { data } = await supabase.from("projects").select("*").order("sort_order").order("created_at");
    setItems(data || []);
  }
  useEffect(() => { load(); }, []);

  function openAdd()     { setForm(EMPTY); setError(""); setModal("add"); }
  function openEdit(row) { setForm(row); setError(""); setModal("edit"); }
  function close()       { setModal(null); }

  async function save() {
    setError(""); setSaving(true);
    let err;
    if (modal === "add") {
      ({ error: err } = await supabase.from("projects").insert([form]));
    } else {
      ({ error: err } = await supabase.from("projects").update(form).eq("id", form.id));
    }
    setSaving(false);
    if (err) { setError(err.message); return; }
    close(); load();
  }

  async function del(row) {
    if (!confirm(`Delete "${row.title}"?`)) return;
    await supabase.from("projects").delete().eq("id", row.id);
    load();
  }

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div>
      <div style={hdr}>
        <div>
          <h1 style={h1}>Projects</h1>
          <p style={sub}>Manage current, planned, and completed projects.</p>
        </div>
        <button onClick={openAdd} style={addBtn}>+ Add project</button>
      </div>

      <AdminTable columns={COLS} rows={items} onEdit={openEdit} onDelete={del} />

      {modal && (
        <Modal title={modal === "add" ? "New project" : "Edit project"} onClose={close}>
          <Field label="Title" required>
            <Input value={form.title} onChange={set("title")} placeholder="Project title" required />
          </Field>
          <Field label="Status" required>
            <Select value={form.status} onChange={set("status")} options={STATUSES} />
          </Field>
          <Field label="Focus area">
            <Input value={form.focus_area} onChange={set("focus_area")} placeholder="e.g. Climate Adaptation" />
          </Field>
          <Field label="Description">
            <Textarea value={form.description} onChange={set("description")} placeholder="Project description…" rows={4} />
          </Field>
          <Field label="Image">
            <ImageUpload
              currentUrl={form.image_url}
              onUploaded={(url) => setForm((f) => ({ ...f, image_url: url }))}
              folder="projects"
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
const h1     = { margin: 0, fontSize: "1.6rem", color: "#00357A" };
const sub    = { margin: "0.25rem 0 0", color: "#5C5F58", fontSize: "0.875rem" };
const addBtn = { padding: "0.55rem 1.25rem", background: "#00357A", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem", whiteSpace: "nowrap" };
const errStyle = { color: "#c0392b", fontSize: "0.8rem", background: "#fdf2f2", border: "1px solid #f5c6c6", borderRadius: 6, padding: "0.4rem 0.75rem" };
