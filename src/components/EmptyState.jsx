/** Clean message shown instead of a broken/blank section when there is no content yet. */
export default function EmptyState({ message = "No content is currently available." }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "var(--space-5) var(--space-3)",
        color: "var(--color-text-muted)",
        border: "1px dashed var(--color-border)",
        borderRadius: "var(--radius)",
      }}
    >
      {message}
    </div>
  );
}
