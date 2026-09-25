import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "../assets/logo.png";

const NAV = [
  { to: "/admin",               label: "Dashboard",     icon: "🏠", end: true },
  { to: "/admin/research",      label: "Research",      icon: "🔬" },
  { to: "/admin/publications",  label: "Publications",  icon: "📄" },
  { to: "/admin/initiatives",   label: "Initiatives",   icon: "🌱" },
  { to: "/admin/projects",      label: "Projects",      icon: "📁" },
  { to: "/admin/team",          label: "Team",          icon: "👥" },
  { to: "/admin/opportunities", label: "Opportunities", icon: "🎯" },
  { to: "/admin/site",          label: "Brand & About", icon: "⚙️" },
];

export default function AdminLayout() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login");
  }

  return (
    <div style={s.shell}>
      {/* ── Sidebar ── */}
      <aside style={s.sidebar}>
        <div style={s.sideTop}>
          <div style={s.brand}>
            <img src={logo} alt="" height={32} />
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
                <span style={{ fontSize: "1rem" }}>{item.icon}</span>
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
      <main style={s.main}>
        <Outlet />
      </main>
    </div>
  );
}

const s = {
  shell: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
    background: "#f5f8f6",
  },
  sidebar: {
    width: 240,
    minWidth: 240,
    background: "#1f5b4c",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    height: "100vh",
    overflowY: "auto",
  },
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
  main: {
    flex: 1,
    padding: "2rem 2.25rem",
    overflowY: "auto",
    maxWidth: "calc(100vw - 240px)",
  },
};
