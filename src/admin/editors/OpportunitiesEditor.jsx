import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminTable from "../ui/AdminTable";
import Modal from "../ui/Modal";
import Field, { Input, Textarea, Select } from "../ui/Field";
import SaveBar from "../ui/SaveBar";

const CATEGORIES = ["Internships", "Fellowships", "Research", "Volunteering", "Collaborations"];
const STATUSES   = ["Open", "Closing soon", "Not currently open", "Coming soon"];

const EMPTY = {
  title: "", category: "Internships", eligibility: "", deadline: "",
  status: "Not currently open", description: "", application_link: "", sort_order: 0,
};

const COLS = [
  { key: "title",    label: "Title" },
  { key: "category", label: "Category" },
  { key: "status",   label: "Status" },
  { key: "deadline", label: "Deadline" },
];

export default function OpportunitiesEditor() {
  const [items, setItems]   = useState([]);
  const [modal, setModal]   = useState(null);
  const [form, setForm]     = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  async function load() {
    const { data } = await supabase.from("opportunities").select("*").order("sort_order").order("created_at");
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
      ({ error: err } = await supabase.from("opportunities").insert([form]));
    } else {
      ({ error: err } = await supabase.from("opportunities").update(form).eq("id", form.id));
    }
    setSaving(false);
    if (err) { setError(err.message); return; }
    close(); load();
  }

  async function del(row) {
    if (!confirm(`Delete "${row.title}"?`)) return;
    await supabase.from("opportunities").delete().eq("id", row.id);
    load();
  }

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div>
      <div style={hdr}>
        <div>
          <h1 style={h1}>Opportunities</h1>
          <p style={sub}>Internships, fellowships, research, volunteering, and collaboration opportunities.</p>
        </div>
        <button onClick={openAdd} style={addBtn}>+ Add opportunity</button>
      </div>

      <AdminTable columns={COLS} rows={items} onEdit={openEdit} onDelete={del} />

      {modal && (
        <Modal title={modal === "add" ? "New opportunity" : "Edit opportunity"} onClose={close}>
          <Field label="Title" required>
            <Input value={form.title} onChange={set("title")} placeholder="Opportunity title" required />
          </Field>
          <Field label="Category" required>
            <Select value={form.category} onChange={set("category")} options={CATEGORIES} />
          </Field>
          <Field label="Status" required>
            <Select value={form.status} onChange={set("status")} options={STATUSES} />
          </Field>
          <Field label="Deadline" hint="Plain text e.g. '31 March 2025' or 'Rolling basis'">
            <Input value={form.deadline} onChange={set("deadline")} placeholder="31 March 2025" />
          </Field>
          <Field label="Eligibility">
            <Input value={form.eligibility} onChange={set("eligibility")} placeholder="Who can apply" />
          </Field>
          <Field label="Description">
            <Textarea value={form.description} onChange={set("description")} placeholder="Full description of this opportunity…" rows={5} />
          </Field>
          <Field label="Application link" hint="URL for the application form or page (optional)">
            <Input value={form.application_link || ""} onChange={set("application_link")} placeholder="https://…" />
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
