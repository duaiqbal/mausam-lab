import { useEffect } from "react";

export default function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} — Mausam Lab` : "Mausam Lab";
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute("content", description);
  }, [title, description]);
  return null;
}
