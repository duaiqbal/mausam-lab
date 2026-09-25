import Card from "./Card";

export default function PublicationCard({ pub }) {
  return (
    <Card>
      {pub.isSample && <span className="placeholder-tag">Sample / Placeholder</span>}
      <span className="card-meta">{pub.type}</span>
      <h3>{pub.title}</h3>
      <p className="card-desc">{pub.description}</p>
      <p className="card-meta">
        {pub.author} · {pub.date}
      </p>
      <div className="card-footer" style={{ display: "flex", gap: "0.75rem" }}>
        <a href="#" onClick={(e) => e.preventDefault()}>View</a>
        {pub.downloadUrl ? (
          <a href={pub.downloadUrl}>Download PDF</a>
        ) : (
          <span className="card-meta">PDF not yet available</span>
        )}
      </div>
    </Card>
  );
}
