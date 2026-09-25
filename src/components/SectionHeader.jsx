export default function SectionHeader({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`section-header ${align === "center" ? "center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
