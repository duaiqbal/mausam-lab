// Bottom save / cancel bar for forms
export default function SaveBar({ onSave, onCancel, saving, saveLabel = "Save", disabled = false }) {
  return (
    <div style={s.bar}>
      <button type="button" onClick={onCancel} style={s.cancel}>Cancel</button>
      <button type="button" onClick={onSave} disabled={saving || disabled} style={s.save}>
        {saving ? "Saving…" : saveLabel}
      </button>
    </div>
  );
}

const s = {
  bar: {
    display: "flex", justifyContent: "flex-end", gap: 10,
    marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #dfe7e2",
  },
  cancel: {
    padding: "0.55rem 1.2rem", background: "transparent",
    border: "1.5px solid #dfe7e2", borderRadius: 8, cursor: "pointer",
    fontFamily: "inherit", fontSize: "0.88rem", color: "#5b6b63",
  },
  save: {
    padding: "0.55rem 1.4rem", background: "#1f5b4c", color: "#fff",
    border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer",
    fontFamily: "inherit", fontSize: "0.88rem",
  },
};
