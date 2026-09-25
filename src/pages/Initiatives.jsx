import SectionHeader from "../components/SectionHeader";
import PageMeta from "./PageMeta";
import { initiatives as staticInitiatives } from "../data/initiatives";
import { useCmsData } from "../lib/useCmsData";

export default function Initiatives() {
  const { data: initiatives, loading } = useCmsData("initiatives", staticInitiatives);

  return (
    <div className="container" style={{ padding: "var(--space-5) var(--space-3)" }}>
      <PageMeta
        title="Initiatives"
        description="Mausam Explains, Mausam Decoded, Climate Connections, and Mausam Skills — Mausam Lab's ongoing initiatives."
      />
      <SectionHeader
        eyebrow="Initiatives"
        title="What we run"
        description="Ongoing initiatives that make up the day-to-day work of Mausam Lab."
      />

      {loading ? (
        <p style={{ color: "var(--color-text-muted)" }}>Loading…</p>
      ) : (
        <div className="grid grid-2">
          {initiatives.map((item) => (
            <div id={item.slug} key={item.slug || item.id} className="card" style={{ scrollMarginTop: "90px" }}>
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: "var(--radius)", marginBottom: "var(--space-2)" }}
                />
              )}
              <h3>{item.name}</h3>
              <p className="card-desc">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
