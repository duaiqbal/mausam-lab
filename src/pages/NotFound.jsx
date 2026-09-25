import Button from "../components/Button";
import PageMeta from "./PageMeta";

export default function NotFound() {
  return (
    <div
      className="container"
      style={{ padding: "var(--space-6) var(--space-3)", textAlign: "center" }}
    >
      <PageMeta title="Page Not Found" description="This page could not be found." />
      <span className="eyebrow">404</span>
      <h1>Page Not Found</h1>
      <p style={{ color: "var(--color-text-muted)", maxWidth: 480, margin: "0 auto var(--space-3)" }}>
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Button to="/">Return Home</Button>
    </div>
  );
}
