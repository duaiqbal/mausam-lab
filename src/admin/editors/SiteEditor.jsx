import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Field, { Input, Textarea } from "../ui/Field";

const DEFAULT = {
  brand_name: "Mausam Lab",
  brand_tagline: "Youth-led climate policy, research & sustainability.",
  contact_email: "",
  location: "",
  social_twitter: "",
  social_instagram: "",
  social_linkedin: "",
  social_facebook: "",
  about_intro: "",
  about_intro2: "",
  about_intro3: "",
  about_approach: [],
  about_approach_steps: ["Evidence", "Understanding", "Communication", "Skills", "Action"],
  about_focus_intro: "",
  about_focus_areas: [],
  about_what_we_do: [],
  about_contributions: [],
  about_different_intro: "",
  about_different_closing: "",
  about_vision: "",
  about_collaborations: "",
};

export default function SiteEditor() {
  const [form, setForm]     = useState(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);
  const [error, setError]   = useState("");
  const [tab, setTab]       = useState("brand");

  useEffect(() => {
    supabase.from("site_config").select("*").eq("id", "main").single().then(({ data }) => {
      if (data) setForm({ ...DEFAULT, ...data });
    });
  }, []);

  const set = (field) => (e) => {
    setSaved(false);
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  // Array-as-textarea helpers
  const arrToText  = (arr) => (Array.isArray(arr) ? arr.join("\n") : "");
  const textToArr  = (txt) => txt.split("\n").map((l) => l.trim()).filter(Boolean);

  // JSON array helpers (for what_we_do and contributions)
  const jsonToText = (val) => {
    try { return JSON.stringify(val, null, 2); } catch { return "[]"; }
  };
  const textToJson = (txt) => {
    try { return JSON.parse(txt); } catch { return null; }
  };

  const [whatWeDoText, setWhatWeDoText]       = useState("");
  const [contributionsText, setContribText]   = useState("");

  useEffect(() => {
    setWhatWeDoText(jsonToText(form.about_what_we_do));
    setContribText(jsonToText(form.about_contributions));
  }, [form.id]); // only re-sync on first load

  async function save() {
    setError(""); setSaving(true);

    // Parse JSON fields
    const whatWeDo = textToJson(whatWeDoText);
    const contribs = textToJson(contributionsText);
    if (whatWeDo === null) { setError("What We Do JSON is invalid — check formatting."); setSaving(false); return; }
    if (contribs === null) { setError("Contributions JSON is invalid — check formatting."); setSaving(false); return; }

    const payload = {
      ...form,
      id: "main",
      about_what_we_do:    whatWeDo,
      about_contributions: contribs,
    };

    const { error: err } = await supabase
      .from("site_config")
      .upsert(payload, { onConflict: "id" });

    setSaving(false);
    if (err) { setError(err.message); return; }
    setSaved(true);
  }

  const TABS = [
    { id: "brand",  label: "Brand & Contact" },
    { id: "about1", label: "About — Intro" },
    { id: "about2", label: "About — Focus & Approach" },
    { id: "about3", label: "About — What We Do" },
    { id: "about4", label: "About — Other" },
  ];

  return (
    <div>
      <div style={hdr}>
        <div>
          <h1 style={h1}>Brand &amp; About</h1>
          <p style={sub}>Controls site-wide brand info and the entire About page.</p>
        </div>
        <button onClick={save} disabled={saving} style={saveBtn}>
          {saving ? "Saving…" : saved ? "Saved" : "Save all changes"}
        </button>
      </div>
      {error && <p style={errStyle}>{error}</p>}

      {/* Tab switcher */}
      <div style={tabRow}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ ...tabBtn, ...(tab === t.id ? tabActive : {}) }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "brand" && (
        <Section>
          <Field label="Organisation name"><Input value={form.brand_name} onChange={set("brand_name")} /></Field>
          <Field label="Tagline"><Input value={form.brand_tagline} onChange={set("brand_tagline")} /></Field>
          <Field label="Contact email"><Input type="email" value={form.contact_email} onChange={set("contact_email")} placeholder="info@mausamlab.org" /></Field>
          <Field label="Location / city"><Input value={form.location} onChange={set("location")} placeholder="Islamabad, Pakistan" /></Field>
          <h3 style={sectionH3}>Social links</h3>
          <Field label="Twitter / X URL"><Input value={form.social_twitter} onChange={set("social_twitter")} placeholder="https://twitter.com/…" /></Field>
          <Field label="Instagram URL"><Input value={form.social_instagram} onChange={set("social_instagram")} placeholder="https://instagram.com/…" /></Field>
          <Field label="LinkedIn URL"><Input value={form.social_linkedin} onChange={set("social_linkedin")} placeholder="https://linkedin.com/…" /></Field>
          <Field label="Facebook URL"><Input value={form.social_facebook} onChange={set("social_facebook")} placeholder="https://facebook.com/…" /></Field>
        </Section>
      )}

      {tab === "about1" && (
        <Section>
          <Field label="About intro paragraph 1"><Textarea value={form.about_intro} onChange={set("about_intro")} rows={4} /></Field>
          <Field label="About intro paragraph 2"><Textarea value={form.about_intro2} onChange={set("about_intro2")} rows={4} /></Field>
          <Field label="About intro paragraph 3"><Textarea value={form.about_intro3} onChange={set("about_intro3")} rows={4} /></Field>
          <Field label="Vision statement"><Textarea value={form.about_vision} onChange={set("about_vision")} rows={5} /></Field>
          <Field label="Collaborations text"><Textarea value={form.about_collaborations} onChange={set("about_collaborations")} rows={3} /></Field>
        </Section>
      )}

      {tab === "about2" && (
        <Section>
          <Field label="Approach steps" hint="One step per line. Shown as pills → Evidence → Understanding → …">
            <Textarea
              value={arrToText(form.about_approach_steps)}
              onChange={(e) => { setSaved(false); setForm((f) => ({ ...f, about_approach_steps: textToArr(e.target.value) })); }}
              rows={6}
              placeholder={"Evidence\nUnderstanding\nCommunication\nSkills\nAction"}
            />
          </Field>
          <Field label="Approach paragraphs" hint="One paragraph per line">
            <Textarea
              value={arrToText(form.about_approach)}
              onChange={(e) => { setSaved(false); setForm((f) => ({ ...f, about_approach: textToArr(e.target.value) })); }}
              rows={5}
            />
          </Field>
          <Field label="Focus intro sentence"><Textarea value={form.about_focus_intro} onChange={set("about_focus_intro")} rows={2} /></Field>
          <Field label="Focus areas" hint="One focus area per line">
            <Textarea
              value={arrToText(form.about_focus_areas)}
              onChange={(e) => { setSaved(false); setForm((f) => ({ ...f, about_focus_areas: textToArr(e.target.value) })); }}
              rows={12}
              placeholder={"Climate adaptation and resilience\nClimate governance and policy\n…"}
            />
          </Field>
        </Section>
      )}

      {tab === "about3" && (
        <Section>
          <Field
            label="What We Do (JSON array)"
            hint='Each item needs "title" and "text". Edit the JSON directly.'
          >
            <Textarea
              value={whatWeDoText}
              onChange={(e) => { setSaved(false); setWhatWeDoText(e.target.value); }}
              rows={20}
              style={{ fontFamily: "monospace", fontSize: "0.82rem" }}
            />
          </Field>
          <div style={jsonExample}>
            Example format:<br />
            <code style={{ fontSize: "0.75rem" }}>{`[\n  { "title": "Research & Policy", "text": "…" },\n  { "title": "Climate Communication", "text": "…" }\n]`}</code>
          </div>
        </Section>
      )}

      {tab === "about4" && (
        <Section>
          <Field label="What makes Mausam Lab different — intro"><Textarea value={form.about_different_intro} onChange={set("about_different_intro")} rows={3} /></Field>
          <Field label="What makes Mausam Lab different — closing"><Textarea value={form.about_different_closing} onChange={set("about_different_closing")} rows={3} /></Field>
          <Field
            label="Contributions (JSON array)"
            hint='Each item needs "role" and "gives". e.g. { "role": "A researcher", "gives": "evidence" }'
          >
            <Textarea
              value={contributionsText}
              onChange={(e) => { setSaved(false); setContribText(e.target.value); }}
              rows={16}
              style={{ fontFamily: "monospace", fontSize: "0.82rem" }}
            />
          </Field>
        </Section>
      )}

      <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={save} disabled={saving} style={saveBtn}>
          {saving ? "Saving…" : saved ? "Saved" : "Save all changes"}
        </button>
      </div>
    </div>
  );
}

function Section({ children }) {
  return <div style={{ background: "#fff", borderRadius: 12, padding: "1.5rem", boxShadow: "0 2px 8px rgba(34,38,31,0.07)", marginTop: "1rem" }}>{children}</div>;
}

const hdr      = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: "0.5rem" };
const h1       = { margin: 0, fontSize: "1.6rem", color: "#00357A" };
const sub      = { margin: "0.25rem 0 0", color: "#5C5F58", fontSize: "0.875rem" };
const saveBtn  = { padding: "0.55rem 1.4rem", background: "#00357A", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: "0.88rem", whiteSpace: "nowrap" };
const errStyle = { color: "#c0392b", fontSize: "0.8rem", background: "#fdf2f2", border: "1px solid #f5c6c6", borderRadius: 6, padding: "0.4rem 0.75rem", marginBottom: "1rem" };
const sectionH3 = { fontSize: "1rem", color: "#00357A", margin: "1.5rem 0 0.75rem", borderTop: "1px solid #D9D3CB", paddingTop: "1rem" };
const tabRow   = { display: "flex", gap: 6, flexWrap: "wrap", marginTop: "1rem" };
const tabBtn   = { padding: "0.45rem 1rem", borderRadius: 7, border: "1.5px solid #D9D3CB", background: "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: "0.82rem", color: "#5C5F58" };
const tabActive = { background: "#00357A", color: "#fff", borderColor: "#00357A", fontWeight: 700 };
const jsonExample = { fontSize: "0.78rem", color: "#5C5F58", background: "#EAE3DE", border: "1px solid #D9D3CB", borderRadius: 6, padding: "0.5rem 0.75rem", marginTop: "0.5rem", whiteSpace: "pre" };
