import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./admin/AuthContext";
import RequireAuth from "./admin/RequireAuth";

/* ── Layout ── */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* ── Public pages ── */
import Home         from "./pages/Home";
import About        from "./pages/About";
import Publications from "./pages/Publications";
import Programs     from "./pages/Programs";
import REIProgramme from "./pages/REIProgramme";
import MausamSkills from "./pages/MausamSkills";
import GetInvolved  from "./pages/GetInvolved";
import Contact      from "./pages/Contact";
import Research     from "./pages/Research";
import ResearchArticle from "./pages/ResearchArticle";
import Initiatives  from "./pages/Initiatives";
import Projects     from "./pages/Projects";
import Team         from "./pages/Team";
import Opportunities from "./pages/Opportunities";
import NotFound     from "./pages/NotFound";

/* ── Admin pages ── */
import AdminLogin         from "./admin/AdminLogin";
import AdminLayout        from "./admin/AdminLayout";
import AdminDashboard     from "./admin/AdminDashboard";
import ResearchEditor     from "./admin/editors/ResearchEditor";
import PublicationsEditor from "./admin/editors/PublicationsEditor";
import InitiativesEditor  from "./admin/editors/InitiativesEditor";
import ProjectsEditor     from "./admin/editors/ProjectsEditor";
import TeamEditor         from "./admin/editors/TeamEditor";
import OpportunitiesEditor from "./admin/editors/OpportunitiesEditor";
import SiteEditor         from "./admin/editors/SiteEditor";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ── Public website ── */}
          <Route
            path="/*"
            element={
              <>
                <a href="#main-content" className="skip-link">Skip to content</a>
                <Navbar />
                <main id="main-content">
                  <Routes>
                    <Route path="/"                       element={<Home />} />
                    <Route path="/about"                  element={<About />} />
                    <Route path="/publications"           element={<Publications />} />
                    <Route path="/programs"               element={<Programs />} />
                    <Route path="/programs/rei"           element={<REIProgramme />} />
                    <Route path="/mausam-skills"          element={<MausamSkills />} />
                    <Route path="/get-involved"           element={<GetInvolved />} />
                    <Route path="/contact"                element={<Contact />} />
                    {/* legacy routes kept so old links don't break */}
                    <Route path="/research"               element={<Research />} />
                    <Route path="/research/article/:slug" element={<ResearchArticle />} />
                    <Route path="/initiatives"            element={<Initiatives />} />
                    <Route path="/projects"               element={<Projects />} />
                    <Route path="/team"                   element={<Team />} />
                    <Route path="/opportunities"          element={<Opportunities />} />
                    <Route path="*"                       element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />

          {/* ── Admin login ── */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ── Protected admin panel ── */}
          <Route
            path="/admin/*"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index                  element={<AdminDashboard />} />
            <Route path="research"        element={<ResearchEditor />} />
            <Route path="publications"    element={<PublicationsEditor />} />
            <Route path="initiatives"     element={<InitiativesEditor />} />
            <Route path="projects"        element={<ProjectsEditor />} />
            <Route path="team"            element={<TeamEditor />} />
            <Route path="opportunities"   element={<OpportunitiesEditor />} />
            <Route path="site"            element={<SiteEditor />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
