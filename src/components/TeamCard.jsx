import Card from "./Card";

export default function TeamCard({ member }) {
  // Support both camelCase (static data) and snake_case (DB data)
  const imageUrl = member.imageUrl || member.image_url || null;

  return (
    <Card>
      {member.isSample && <span className="placeholder-tag">Placeholder</span>}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={member.name}
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "var(--space-2)",
            border: "2px solid var(--color-border)",
          }}
        />
      ) : (
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "var(--color-bg-alt)",
            border: "1px solid var(--color-border)",
            marginBottom: "var(--space-2)",
          }}
          aria-hidden="true"
        />
      )}
      <h3>{member.name}</h3>
      <p className="card-meta">{member.position}</p>
      <p className="card-desc">{member.bio}</p>
      {member.expertise && <p className="card-meta">Expertise: {member.expertise}</p>}
    </Card>
  );
}
