// Reusable labelled form field
export default function Field({ label, required, hint, children }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={s.label}>
        {label}
        {required && <span style={{ color: "#c0392b" }}> *</span>}
      </label>
      {hint && <p style={s.hint}>{hint}</p>}
      {children}
    </div>
  );
}

export function Input({ value, onChange, type = "text", placeholder, required, ...rest }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      style={s.input}
      {...rest}
    />
  );
}

export function Textarea({ value, onChange, placeholder, rows = 4, required }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      style={{ ...s.input, resize: "vertical" }}
    />
  );
}

export function Select({ value, onChange, options, required }) {
  return (
    <select value={value} onChange={onChange} required={required} style={s.input}>
      {options.map((o) => (
        <option key={typeof o === "string" ? o : o.value} value={typeof o === "string" ? o : o.value}>
          {typeof o === "string" ? o : o.label}
        </option>
      ))}
    </select>
  );
}

const s = {
  label: { display: "block", fontWeight: 600, fontSize: "0.83rem", color: "#22261F", marginBottom: 4 },
  hint:  { margin: "0 0 4px", fontSize: "0.75rem", color: "#5C5F58" },
  input: {
    width: "100%",
    padding: "0.6rem 0.85rem",
    border: "1.5px solid #D9D3CB",
    borderRadius: 7,
    fontSize: "0.9rem",
    fontFamily: "inherit",
    color: "#22261F",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
  },
};
