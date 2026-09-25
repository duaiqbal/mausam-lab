import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const SECTIONS = [
  { label: "Research articles", table: "research",       to: "/admin/research",      icon: "🔬" },
  { label: "Publications",      table: "publications",   to: "/admin/publications",  icon: "📄" },
  { label: "Initiatives",       table: "initiatives",    to: "/admin/initiatives",   icon: "🌱" },
  { label: "Projects",          table: "projects",       to: "/admin/projects",      icon: "📁" },
  { label: "Team members",      table: "team_members",   to: "/admin/team",          icon: "👥" },
  { label: "Opportunities",     table: "opportunities",  to: "/admin/opportunities", icon: "🎯" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    async function fetchCounts() {
      const results = await Promise.all(
        SECTIONS.map(({ table }) =>
          supabase.from(table).select("id", { count: "exact", head: true })
        )
      );
      const map = {};
      SECTIONS.forEach(({ table }, i) => {
        map[table] = results[i].count ?? 0;
      });
      setCounts(map);
    }
    fetchCounts();
  }, []);

  return (
    <div>
      <h1 style={s.heading}>Dashboard</h1>
      <p style={s.sub}>Welcome to the Mausam Lab CMS. Select a section below to manage content.</p>

      <div style={s.grid}>
        {SECTIONS.map(({ label, table, to, icon }) => (
          <Link key={table} to={to} style={s.card}>
            <span style={s.icon}>{icon}</span>
            <div>
              <div style={s.cardLabel}>{label}</div>
              <div style={s.cardCount}>
                {counts[table] !== undefined ? counts[table] : "…"} item{counts[table] !== 1 ? "s" : ""}
              </div>
            </div>
          </Link>
        ))}

        <Link to="/admin/site" style={s.card}>
          <span style={s.icon}>⚙️</span>
          <div>
            <div style={s.cardLabel}>Brand &amp; About</div>
            <div style={s.cardCount}>Site-wide settings</div>
          </div>
        </Link>
      </div>

      <div style={s.infoBox}>
        <strong>How it works:</strong> Any change you save here is written directly to Supabase and appears on the live website at{" "}
        <a href="https://mausam-lab.vercel.app" target="_blank" rel="noreferrer" style={{ color: "#1f5b4c" }}>
          mausam-lab.vercel.app
        </a>{" "}
        immediately — no redeploy needed.
      </div>
    </div>
  );
}

const s = {
  heading: { margin: "0 0 0.25rem", fontSize: "1.75rem", color: "#1f5b4c" },
  sub:     { margin: "0 0 2rem", color: "#5b6b63", fontSize: "0.95rem" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: "1.25rem 1.1rem",
    boxShadow: "0 2px 8px rgba(28,38,34,0.07)",
    display: "flex",
    alignItems: "center",
    gap: 14,
    textDecoration: "none",
    color: "#1c2622",
    border: "1.5px solid #dfe7e2",
    transition: "box-shadow 0.15s, border-color 0.15s",
  },
  icon:      { fontSize: "1.6rem" },
  cardLabel: { fontWeight: 700, fontSize: "0.9rem", color: "#1f5b4c" },
  cardCount: { fontSize: "0.8rem", color: "#5b6b63", marginTop: 2 },
  infoBox: {
    background: "#e8f5f1",
    border: "1px solid #b2d8cc",
    borderRadius: 10,
    padding: "1rem 1.25rem",
    fontSize: "0.88rem",
    color: "#1c2622",
    maxWidth: 620,
  },
};
