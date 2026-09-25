import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

const links = [
  { to: "/",              label: "Home",          end: true },
  { to: "/about",         label: "About" },
  { to: "/publications",  label: "Publications" },
  { to: "/programs",      label: "Programs" },
  { to: "/mausam-skills", label: "Mausam Skills" },
  { to: "/get-involved",  label: "Get Involved" },
  { to: "/contact",       label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo" aria-label="Mausam Lab home">
          <img src={logo} alt="" height="36" />
          <span className="navbar-wordmark">Mausam Lab</span>
        </NavLink>

        <button
          className="navbar-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span /><span /><span />
        </button>

        <nav className={`navbar-links ${open ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => isActive ? "active" : ""}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
