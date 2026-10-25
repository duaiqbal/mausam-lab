import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AdminTable from "../ui/AdminTable";
import Modal from "../ui/Modal";
import Field, { Input, Textarea } from "../ui/Field";
import ImageUpload from "../ui/ImageUpload";
import SaveBar from "../ui/SaveBar";

const EMPTY = {
  name: "", position: "", bio: "", expertise: "",
  department: "Executive Team", image_url: "", sort_order: 0,
};

const COLS = [
  { key: "name",       label: "Name" },
  { key: "position",   label: "Position" },
  { key: "department", label: "Department" },
  { key: "expertise",  label: "Expertise" },
];

export default function TeamEditor() {
  const [items, setItems]   = useState([]);
  const [modal, setModal]   = useState(null);
  const [form, setForm]     = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");

  async function load() {
    const { data } = await supabase.from("team_members").select("*").order("department").order("sort_order").order("created_at");
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
      ({ error: err } = await supabase.from("team_members").insert([form]));
    } else {
      ({ error: err } = await supabase.from("team_members").update(form).eq("id", form.id));
    }
    setSaving(false);
    if (err) { setError(err.message); return; }
    close(); load();
  }

  async function del(row) {
    if (!confirm(`Remove "${row.name}" from the team?`)) return;
    await supabase.from("team_members").delete().eq("id", row.id);
    load();
  }

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div>
      <div style={hdr}>
        <div>
          <h1 style={h1}>Team</h1>
          <p style={sub}>Manage team members. Set department to "Executive Team" for the leadership section, or any other department name.</p>
        </div>
        <button onClick={openAdd} style={addBtn}>+ Add member</button>
      </div>

      <AdminTable columns={COLS} rows={items} onEdit={openEdit} onDelete={del} />

      {modal && (
        <Modal title={modal === "add" ? "New team member" : "Edit team member"} onClose={close}>
          <Field label="Full name" required>
            <Input value={form.name} onChange={set("name")} placeholder="Full name" required />
          </Field>
          <Field label="Position / Role" required>
            <Input value={form.position} onChange={set("position")} placeholder="e.g. Founder & Director" required />
          </Field>
          <Field label="Department" hint="Use 'Executive Team' for leadership, or create any department name you need">
            <Input value={form.department} onChange={set("department")} placeholder="Executive Team" />
          </Field>
          <Field label="Bio">
            <Textarea value={form.bio} onChange={set("bio")} placeholder="Short bio…" rows={3} />
          </Field>
          <Field label="Area of expertise">
            <Input value={form.expertise} onChange={set("expertise")} placeholder="e.g. Climate Policy" />
          </Field>
          <Field label="Profile photo">
            <ImageUpload
              currentUrl={form.image_url}
              onUploaded={(url) => setForm((f) => ({ ...f, image_url: url }))}
              folder="team"
            />
          </Field>
          <Field label="Sort order" hint="Lower = appears first within the same department">
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
