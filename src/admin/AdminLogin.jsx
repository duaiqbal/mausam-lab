import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { supabaseConfigured } from "../lib/supabase";
import logo from "../assets/logo.png";

export default function AdminLogin() {
  const { signIn } = useAuth();
  const navigate   = useNavigate();

  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Guard: env vars not set yet
    if (!supabaseConfigured) {
      setError("Supabase is not connected yet. Follow the steps below to finish setup.");
      return;
    }

    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);

    if (err) {
      // Give friendlier messages for common Supabase error codes
      if (err.message?.toLowerCase().includes("invalid login credentials")) {
        setError("Incorrect email or password. Please try again.");
      } else if (err.message?.toLowerCase().includes("email not confirmed")) {
        setError("Your account email hasn't been confirmed yet. Check your inbox.");
      } else {
        setError(err.message);
      }
    } else {
      navigate("/admin");
    }
  }

  const notConfigured = !supabaseConfigured;

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Logo */}
        <div style={s.logoRow}>
          <img src={logo} alt="Mausam Lab" height={44} />
          <span style={s.wordmark}>Mausam Lab</span>
        </div>

        <h1 style={s.heading}>Admin Login</h1>
        <p style={s.sub}>Sign in to manage website content.</p>

        {/* ── Setup banner shown when env vars are missing ── */}
        {notConfigured && (
          <div style={s.setupBanner}>
            <strong style={{ display: "block", marginBottom: 6 }}>
              ⚠️ Supabase not connected yet
            </strong>
            To finish setup, you need to:
            <ol style={s.setupList}>
              <li>
                Create a free Supabase project at{" "}
                <a href="https://supabase.com" target="_blank" rel="noreferrer" style={s.link}>
                  supabase.com
                </a>
              </li>
              <li>
                Copy your <strong>Project URL</strong> and <strong>anon public key</strong>
                {" "}from Supabase → Settings → API
              </li>
              <li>
                Open <code style={s.code}>.env.local</code> in this project and replace the
                placeholder values:
                <pre style={s.pre}>{`VITE_SUPABASE_URL=https://xxxx.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-key`}</pre>
              </li>
              <li>Restart the dev server (<code style={s.code}>npm run dev</code>)</li>
              <li>
                For the <strong>live Vercel site</strong>: add the same two variables in
                Vercel → Project → Settings → Environment Variables, then redeploy
              </li>
            </ol>
            See <strong>CMS-SETUP.md</strong> in the project folder for full instructions.
          </div>
        )}

        {/* Login form — always shown so you can test once configured */}
        <form onSubmit={handleSubmit} style={s.form}>
          <label style={s.label} htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ ...s.input, ...(notConfigured ? s.inputDisabled : {}) }}
            placeholder="admin@example.com"
            disabled={notConfigured}
          />

          <label style={s.label} htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...s.input, ...(notConfigured ? s.inputDisabled : {}) }}
            placeholder="••••••••"
            disabled={notConfigured}
          />

          {error && <p style={s.error}>{error}</p>}

          <button
            type="submit"
            disabled={loading || notConfigured}
            style={{ ...s.btn, ...(notConfigured ? s.btnDisabled : {}) }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    background: "#f5f8f6",
    fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
    padding: "3rem 1rem",
  },
  card: {
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 6px 32px rgba(28,38,34,0.10)",
    padding: "2.5rem 2.25rem",
    width: "100%",
    maxWidth: 480,
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: "1.5rem",
  },
  wordmark: { fontWeight: 700, fontSize: "1.1rem", color: "#1f5b4c" },
  heading:  { margin: "0 0 0.25rem", fontSize: "1.6rem", color: "#1f5b4c" },
  sub:      { margin: "0 0 1.25rem", color: "#5b6b63", fontSize: "0.9rem" },

  setupBanner: {
    background: "#fff8e6",
    border: "1.5px solid #f0c040",
    borderRadius: 10,
    padding: "1rem 1.1rem",
    fontSize: "0.84rem",
    color: "#4a3800",
    marginBottom: "1.5rem",
    lineHeight: 1.6,
  },
  setupList: { margin: "8px 0 0 0", paddingLeft: 18, lineHeight: 2 },
  link:  { color: "#1f5b4c", fontWeight: 600 },
  code:  { background: "#f0f4f2", borderRadius: 4, padding: "1px 5px", fontSize: "0.82rem", fontFamily: "monospace" },
  pre:   { background: "#f0f4f2", borderRadius: 6, padding: "0.5rem 0.75rem", fontSize: "0.78rem", fontFamily: "monospace", margin: "4px 0 0", whiteSpace: "pre-wrap" },

  form:  { display: "flex", flexDirection: "column", gap: "0.5rem" },
  label: { fontSize: "0.85rem", fontWeight: 600, color: "#1c2622", marginBottom: 2 },
  input: {
    padding: "0.65rem 0.9rem",
    borderRadius: 8,
    border: "1.5px solid #dfe7e2",
    fontSize: "0.95rem",
    outline: "none",
    marginBottom: "0.75rem",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box",
    color: "#1c2622",
  },
  inputDisabled: { background: "#f5f5f5", color: "#aaa", cursor: "not-allowed" },
  btn: {
    marginTop: "0.5rem",
    padding: "0.75rem",
    background: "#1f5b4c",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  btnDisabled: { background: "#9db8b1", cursor: "not-allowed" },
  error: {
    color: "#c0392b",
    fontSize: "0.875rem",
    margin: "0 0 0.5rem",
    background: "#fdf2f2",
    border: "1px solid #f5c6c6",
    borderRadius: 6,
    padding: "0.5rem 0.75rem",
  },
};
