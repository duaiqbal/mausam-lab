import { useState, useMemo } from "react";
import SectionHeader from "../components/SectionHeader";
import ResearchCard from "../components/ResearchCard";
import EmptyState from "../components/EmptyState";
import PageMeta from "./PageMeta";
import { researchItems, researchCategories } from "../data/research";
import { useCmsData } from "../lib/useCmsData";

export default function Research() {
  const { data: items, loading } = useCmsData("research", researchItems);
  const [activeCategory, setActiveCategory] = useState("All");

  // Derive category list from live data
  const categories = useMemo(() => {
    const cats = [...new Set(items.map((i) => i.category).filter(Boolean))];
    return cats.length ? cats : researchCategories;
  }, [items]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  return (
    <div className="container" style={{ padding: "var(--space-5) var(--space-3)" }}>
      <PageMeta
        title="Research"
        description="Research and analysis, policy analysis, and research articles from Mausam Lab."
      />
      <SectionHeader
        eyebrow="Research"
        title="Research & Analysis, Policy Analysis, Research Articles"
        description="Research, policy analysis, and articles from Mausam Lab."
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
        <EmptyState message="No research articles are currently available in this category." />
      ) : (
        <div className="grid grid-3">
          {filtered.map((item) => (
            <ResearchCard key={item.slug || item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
