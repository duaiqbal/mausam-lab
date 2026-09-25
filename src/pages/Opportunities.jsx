import { useState, useMemo } from "react";
import SectionHeader from "../components/SectionHeader";
import OpportunityCard from "../components/OpportunityCard";
import EmptyState from "../components/EmptyState";
import PageMeta from "./PageMeta";
import { opportunities as staticOpps, opportunityCategories } from "../data/opportunities";
import { useCmsData } from "../lib/useCmsData";

export default function Opportunities() {
  const { data: opportunities, loading } = useCmsData("opportunities", staticOpps);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = [...new Set(opportunities.map((o) => o.category).filter(Boolean))];
    return cats.length ? cats : opportunityCategories;
  }, [opportunities]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return opportunities;
    return opportunities.filter((o) => o.category === activeCategory);
  }, [activeCategory, opportunities]);

  // Normalise DB field names for OpportunityCard
  const normalise = (o) => ({
    ...o,
    applicationLink: o.applicationLink ?? o.application_link ?? null,
  });

  return (
    <div className="container" style={{ padding: "var(--space-5) var(--space-3)" }}>
      <PageMeta
        title="Opportunities"
        description="Internships, fellowships, research, volunteering, and collaboration opportunities at Mausam Lab."
      />
      <SectionHeader
        eyebrow="Opportunities"
        title="Get involved"
        description="Current openings and ways to work with Mausam Lab."
      />

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "var(--space-4)" }}>
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="btn"
            style={{
              background: activeCategory === cat ? "var(--color-primary)" : "transparent",
              color: activeCategory === cat ? "#fff" : "var(--color-primary)",
              border: "2px solid var(--color-primary)",
              padding: "8px 16px",
              fontSize: "0.85rem",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: "var(--color-text-muted)" }}>Loading…</p>
      ) : filtered.length === 0 ? (
        <EmptyState message="No opportunities are currently available in this category." />
      ) : (
        <div className="grid grid-3">
          {filtered.map((o) => (
            <OpportunityCard key={o.id} opportunity={normalise(o)} />
          ))}
        </div>
      )}
    </div>
  );
}
