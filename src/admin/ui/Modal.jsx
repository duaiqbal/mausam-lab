import { useEffect } from "react";

export default function Modal({ title, onClose, children }) {
  // Close on Escape key
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div style={s.backdrop} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={s.modal} role="dialog" aria-modal="true" aria-label={title}>
        <div style={s.header}>
          <h2 style={s.title}>{title}</h2>
          <button onClick={onClose} style={s.close} aria-label="Close">&times;</button>
        </div>
        <div style={s.body}>{children}</div>
      </div>
    </div>
  );
}

const s = {
  backdrop: {
    position: "fixed", inset: 0,
    background: "rgba(34,38,31,0.45)",
    display: "flex", alignItems: "flex-start", justifyContent: "center",
    zIndex: 1000, padding: "2rem 1rem", overflowY: "auto",
  },
  modal: {
    background: "#fff", borderRadius: 14,
    width: "100%", maxWidth: 640,
    boxShadow: "0 12px 48px rgba(34,38,31,0.18)",
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "1.1rem 1.5rem", borderBottom: "1px solid #D9D3CB",
  },
  title: { margin: 0, fontSize: "1.1rem", color: "#00357A" },
  close: {
    background: "none", border: "none", fontSize: "1.1rem",
    cursor: "pointer", color: "#5C5F58", padding: "0 0.25rem",
  },
  body: { padding: "1.5rem" },
};
