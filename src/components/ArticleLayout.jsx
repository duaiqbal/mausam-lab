import { Link } from "react-router-dom";

/** Reusable long-form article layout used by /research/article/:slug. */
export default function ArticleLayout({ item }) {
  return (
    <article className="container" style={{ maxWidth: 760, padding: "var(--space-5) var(--space-3)" }}>
      <Link to="/research">← Back to Research</Link>

      {item.isSample && (
        <div style={{ margin: "var(--space-2) 0" }}>
          <span className="placeholder-tag">Sample / Placeholder Content</span>
        </div>
      )}

      <span className="eyebrow">{item.category}</span>
      <h1>{item.title}</h1>
      <p style={{ color: "var(--color-text-muted)" }}>
        {item.author} · {item.date}
      </p>

      <div style={{ marginTop: "var(--space-4)", fontSize: "1.05rem" }}>
        {item.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
