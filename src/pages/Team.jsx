import { useMemo } from "react";
import SectionHeader from "../components/SectionHeader";
import TeamCard from "../components/TeamCard";
import EmptyState from "../components/EmptyState";
import PageMeta from "./PageMeta";
import { executiveTeam, departments } from "../data/team";
import { useCmsData } from "../lib/useCmsData";

// Build static fallback as flat array matching DB shape
const staticFlat = [
  ...executiveTeam.map((m) => ({ ...m, department: "Executive Team" })),
  ...departments.flatMap((d) => d.members.map((m) => ({ ...m, department: d.name }))),
];

export default function Team() {
  const { data: members, loading } = useCmsData("team_members", staticFlat);

  // Group by department
  const grouped = useMemo(() => {
    const map = new Map();
    for (const m of members) {
      const dept = m.department || "Executive Team";
      if (!map.has(dept)) map.set(dept, []);
      map.get(dept).push(m);
    }
    return map;
  }, [members]);

  // Normalise DB image_url for TeamCard (which shows a grey circle if no image)
  const normalise = (m) => ({ ...m, imageUrl: m.imageUrl ?? m.image_url ?? null });

  return (
    <div className="container" style={{ padding: "var(--space-5) var(--space-3)" }}>
      <PageMeta
        title="Team"
        description="Meet the Executive Team and Departments behind Mausam Lab."
      />
      <SectionHeader eyebrow="Team" title="Who we are" description="The people building Mausam Lab." />

      {loading ? (
        <p style={{ color: "var(--color-text-muted)", marginTop: "var(--space-3)" }}>Loading…</p>
      ) : members.length === 0 ? (
        <EmptyState message="No team members are currently listed." />
      ) : (
        <>
          {/* Executive Team first */}
          {grouped.has("Executive Team") && (
            <div style={{ marginTop: "var(--space-3)" }}>
              <h2>Executive Team</h2>
              <div className="grid grid-3">
                {grouped.get("Executive Team").map((m) => (
                  <TeamCard key={m.id} member={normalise(m)} />
                ))}
              </div>
            </div>
          )}

          {/* Other departments */}
          {[...grouped.entries()]
            .filter(([dept]) => dept !== "Executive Team")
            .map(([dept, deptMembers]) => (
              <div key={dept} style={{ marginTop: "var(--space-5)" }}>
                <h2>{dept}</h2>
                <div className="grid grid-3">
                  {deptMembers.map((m) => (
                    <TeamCard key={m.id} member={normalise(m)} />
                  ))}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
