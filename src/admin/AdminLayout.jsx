import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "../assets/logo.png";
import "./AdminLayout.css";

const NAV = [
  { to: "/admin",               label: "Dashboard", end: true },
  { to: "/admin/research",      label: "Research" },
  { to: "/admin/publications",  label: "Publications" },
  { to: "/admin/initiatives",   label: "Initiatives" },
  { to: "/admin/projects",      label: "Projects" },
  { to: "/admin/team",          label: "Team" },
  { to: "/admin/opportunities", label: "Opportunities" },
  { to: "/admin/skills",        label: "Mausam Skills" },
  { to: "/admin/site",          label: "Brand & About" },
];

export default function AdminLayout() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Close the drawer whenever the route changes (mobile)
  useEffect(() => { setOpen(false); }, [location]);

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login");
  }

  return (
    <div className="admin-shell">
      {/* ── Mobile top bar ── */}
      <div className="admin-topbar">
        <button
          className="admin-hamburger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
        <img src={logo} alt="" height={26} style={{ filter: "brightness(0) invert(1)" }} />
        <span className="admin-topbar-title">Mausam Lab CMS</span>
      </div>

      {/* ── Backdrop (mobile, when drawer open) ── */}
      <div
        className={`admin-backdrop ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ── Sidebar / drawer ── */}
      <aside className={`admin-sidebar ${open ? "is-open" : ""}`}>
        <div style={s.sideTop}>
          <div style={s.brand}>
            <img src={logo} alt="" height={32} style={{ filter: "brightness(0) invert(1)" }} />
            <div>
              <div style={s.brandName}>Mausam Lab</div>
              <div style={s.brandSub}>CMS Admin</div>
            </div>
          </div>

          <nav style={s.nav}>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({
                  ...s.navLink,
                  ...(isActive ? s.navLinkActive : {}),
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div style={s.sideBottom}>
          <p style={s.userEmail}>{session?.user?.email}</p>
          <button onClick={handleSignOut} style={s.signOutBtn}>
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main content area ── */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

const s = {
  sideTop: { padding: "1.5rem 0 1rem" },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "0 1.25rem 1.5rem",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    marginBottom: "0.75rem",
  },
  brandName: { fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.2 },
  brandSub: { fontSize: "0.72rem", opacity: 0.65 },
  nav: { display: "flex", flexDirection: "column", gap: 2, padding: "0 0.75rem" },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "0.55rem 0.85rem",
    borderRadius: 8,
    color: "rgba(255,255,255,0.8)",
    textDecoration: "none",
    fontSize: "0.88rem",
    fontWeight: 500,
    transition: "background 0.15s, color 0.15s",
  },
  navLinkActive: {
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    fontWeight: 700,
  },
  sideBottom: {
    padding: "1rem 1.25rem 1.5rem",
    borderTop: "1px solid rgba(255,255,255,0.15)",
  },
  userEmail: {
    fontSize: "0.75rem",
    opacity: 0.7,
    margin: "0 0 0.5rem",
    wordBreak: "break-all",
  },
  signOutBtn: {
    width: "100%",
    padding: "0.5rem",
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: 7,
    fontWeight: 600,
    fontSize: "0.82rem",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};
