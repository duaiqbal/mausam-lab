import Card from "./Card";

export default function ProjectCard({ project }) {
  return (
    <Card>
      {project.isSample && <span className="placeholder-tag">Placeholder</span>}
      <span className="card-meta">
        {project.status} · {project.focusArea}
      </span>
      <h3>{project.title}</h3>
      <p className="card-desc">{project.description}</p>
    </Card>
  );
}
