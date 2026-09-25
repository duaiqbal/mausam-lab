import Card from "./Card";

export default function OpportunityCard({ opportunity }) {
  return (
    <Card>
      {opportunity.isSample && <span className="placeholder-tag">Placeholder</span>}
      <span className="card-meta">{opportunity.category}</span>
      <h3>{opportunity.title}</h3>
      <p className="card-desc">{opportunity.description}</p>
      <p className="card-meta">Eligibility: {opportunity.eligibility}</p>
      <p className="card-meta">Deadline: {opportunity.deadline}</p>
      <div className="card-footer">
        <span className="card-meta">Status: {opportunity.status}</span>
      </div>
    </Card>
  );
}
