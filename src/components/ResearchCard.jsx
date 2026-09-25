import { Link } from "react-router-dom";
import Card from "./Card";

export default function ResearchCard({ item }) {
  return (
    <Card>
      {item.isSample && <span className="placeholder-tag">Sample / Placeholder</span>}
      <span className="card-meta">{item.category}</span>
      <h3>{item.title}</h3>
      <p className="card-desc">{item.excerpt}</p>
      <p className="card-meta">
        {item.author} · {item.date}
      </p>
      <div className="card-footer">
        <Link to={`/research/article/${item.slug}`}>Read more →</Link>
      </div>
    </Card>
  );
}
