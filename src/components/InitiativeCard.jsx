import Card from "./Card";
import Button from "./Button";

export default function InitiativeCard({ initiative }) {
  return (
    <Card>
      <h3>{initiative.name}</h3>
      <p className="card-desc">{initiative.description}</p>
      <div className="card-footer">
        <Button to={`/initiatives#${initiative.slug}`} variant="secondary">
          Explore
        </Button>
      </div>
    </Card>
  );
}
