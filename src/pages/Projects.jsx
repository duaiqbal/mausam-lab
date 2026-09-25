import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";
import EmptyState from "../components/EmptyState";
import PageMeta from "./PageMeta";
import { projects as staticProjects } from "../data/projects";
import { useCmsData } from "../lib/useCmsData";

export default function Projects() {
  const { data: projects, loading } = useCmsData("projects", staticProjects);

  // Normalise DB field (focus_area) to match ProjectCard prop (focusArea)
  const normalise = (p) => ({ ...p, focusArea: p.focusArea ?? p.focus_area ?? "" });

  return (
    <div className="container" style={{ padding: "var(--space-5) var(--space-3)" }}>
      <PageMeta
        title="Projects"
        description="Projects Mausam Lab is planning, running, or has completed."
      />
      <SectionHeader
        eyebrow="Projects"
        title="What we're building"
        description="Current, planned, and completed Mausam Lab projects."
      />

      {loading ? (
        <p style={{ color: "var(--color-text-muted)" }}>Loading…</p>
      ) : projects.length === 0 ? (
        <EmptyState message="No projects are currently available." />
      ) : (
        <div className="grid grid-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={normalise(p)} />
          ))}
        </div>
      )}
    </div>
  );
}
