// Generic sortable table used by all CMS list views
export default function AdminTable({ columns, rows, onEdit, onDelete }) {
  if (!rows.length) {
    return <p style={{ color: "#5b6b63", marginTop: "1.5rem" }}>No items yet. Add one above.</p>;
  }
  return (
    <div style={{ overflowX: "auto", marginTop: "1.5rem" }}>
      <table style={s.table}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={s.th}>{c.label}</th>
            ))}
            <th style={s.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id || i} style={i % 2 === 0 ? s.rowEven : s.rowOdd}>
              {columns.map((c) => (
                <td key={c.key} style={s.td}>
                  {c.render ? c.render(row[c.key], row) : String(row[c.key] ?? "")}
                </td>
              ))}
              <td style={s.td}>
                <button onClick={() => onEdit(row)} style={s.btnEdit}>Edit</button>
                <button onClick={() => onDelete(row)} style={s.btnDel}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const s = {
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 8px rgba(28,38,34,0.07)" },
  th: { background: "#1f5b4c", color: "#fff", padding: "0.7rem 1rem", textAlign: "left", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.03em", whiteSpace: "nowrap" },
  td: { padding: "0.65rem 1rem", borderBottom: "1px solid #dfe7e2", verticalAlign: "top", maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  rowEven: { background: "#fff" },
  rowOdd:  { background: "#f9fbfa" },
  btnEdit: { marginRight: 6, padding: "3px 12px", background: "#1f5b4c", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontSize: "0.78rem", fontFamily: "inherit" },
  btnDel:  { padding: "3px 12px", background: "#c0392b", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontSize: "0.78rem", fontFamily: "inherit" },
};
