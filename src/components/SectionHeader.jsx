/**
 * Reusable section header — centered, with accent underline divider.
 * Used on every page for consistent NRTC-style official look.
 */
export default function SectionHeader({ eyebrow, title, description, align = "center" }) {
  return (
    <div className={`sec-heading`} style={align === "left" ? { textAlign: "left" } : {}}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      <div
        className="sec-divider"
        style={align === "left" ? { margin: "16px 0 0" } : {}}
      />
      {description && <p>{description}</p>}
    </div>
  );
}
