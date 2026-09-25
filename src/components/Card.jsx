import "./Card.css";

/** Generic card shell used as the base for the more specific *Card components. */
export default function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}
