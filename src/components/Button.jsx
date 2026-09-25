import { Link } from "react-router-dom";
import "./Button.css";

/**
 * Reusable button.
 * - Renders a <Link> when `to` is given (internal navigation)
 * - Renders a normal <button> when `onClick` is given (e.g. form submit)
 * variant: "primary" | "secondary"
 */
export default function Button({ to, onClick, type = "button", variant = "primary", children }) {
  const className = `btn btn-${variant}`;
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
