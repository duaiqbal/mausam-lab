import { useState } from "react";
import { Link } from "react-router-dom";
import PageMeta from "./PageMeta";
import SectionHeader from "../components/SectionHeader";

/* ── Panel data ───────────────────────────────────────────────────────────── */
const PANELS = {
  volunteer: {
    title: "Volunteer With Us",
    intro: "Contribute your time, skills, and ideas to Mausam Lab's research, programs, communications, and initiatives.",
    body: [
      { heading: "What volunteers can work on", items: ["Research support and literature reviews", "Writing and editing for publications and communications", "Social media and content creation", "Event and programme coordination", "Data collection and analysis", "Administrative and operational support"] },
      { heading: "Eligibility", items: ["Open to students, graduates, and early-career professionals", "Strong interest in climate, research, policy, or communications", "Able to commit a minimum of 5 hours per week", "Strong written communication skills in English"] },
      { heading: "How to apply", items: ["Send your CV and a short cover note to mausamlab@gmail.com", "Include 'Volunteer Application' in the subject line", "Describe your area of interest and availability"] },
    ],
  },
  research: {
    title: "Research Opportunities",
    intro: "Take part in research projects, writing initiatives, and other opportunities to develop and contribute to climate research.",
    body: [
      { heading: "What's involved", items: ["Contributing to ongoing Mausam Lab research projects", "Co-authoring publications and policy briefs", "Independent research with mentorship and editorial support", "Participating in collaborative research initiatives"] },
      { heading: "Eligibility", items: ["Students or graduates with a background in relevant fields", "Demonstrated interest in climate, policy, or sustainability research", "Able to commit to project timelines"] },
      { heading: "How to apply", items: ["Email mausamlab@gmail.com with 'Research Opportunity' in the subject", "Include your CV and a brief research statement"] },
    ],
    opportunities: "No current opportunities open. Check back soon.",
  },
  internships: {
    title: "Internship Opportunities",
    intro: "Gain practical experience through Mausam Lab's research, policy, communication, and programme-based internships.",
    body: [
      { heading: "Current programme", items: ["Research Internship Programme — currently open. Visit our Programs page to view details and apply."] },
      { heading: "Types of internships", items: ["Research and policy internships", "Communications and content internships", "Programme coordination internships", "Data and analysis internships"] },
      { heading: "How to apply", items: ["Visit the Programs page to view currently open internships and apply directly", "For general internship queries, email mausamlab@gmail.com"] },
    ],
    cta: { label: "View Our Programs", to: "/programs" },
  },
  work: {
    title: "Work With Us",
    intro: "Explore future openings and opportunities to join the Mausam Lab team.",
    body: [
      { heading: "Current openings", items: [] },
      { heading: "Future roles may include", items: ["Research Associates", "Communications and Content roles", "Programme Coordinators", "Policy and Advocacy roles"] },
      { heading: "Expressions of interest", items: ["If you'd like to be considered for future roles, send your CV to mausamlab@gmail.com", "Include 'Expression of Interest' in the subject line"] },
    ],
    opportunities: "No positions are currently open. We will post openings here when available.",
  },
  researchCollab: {
    title: "Research Collaboration",
    intro: "Work with us on research projects, publications, field studies, and knowledge production.",
    body: [
      { heading: "What this involves", items: ["Joint research projects and co-authored publications", "Field studies and data collection partnerships", "Peer review and research feedback", "Shared platforms for knowledge dissemination"] },
      { heading: "Who we work with", items: ["Academics and researchers", "Research institutions and think tanks", "Graduate students with research proposals", "Independent researchers"] },
      { heading: "How to start", items: ["Email mausamlab@gmail.com with your proposal or idea", "Include 'Research Collaboration' in the subject line"] },
    ],
  },
  institutional: {
    title: "Institutional Collaboration",
    intro: "Partner with Mausam Lab on research, learning, youth engagement, and climate initiatives.",
    body: [
      { heading: "What this involves", items: ["MoUs and formal partnership agreements", "Joint programme design and delivery", "Shared capacity building initiatives", "Knowledge exchange and training partnerships"] },
      { heading: "Who we work with", items: ["Universities and academic institutions", "Civil society organisations", "International development organisations", "Government bodies and agencies"] },
      { heading: "How to start", items: ["Reach out via mausamlab@gmail.com", "Include 'Institutional Collaboration' in the subject line"] },
    ],
  },
  projectPartnership: {
    title: "Project Partnership",
    intro: "Develop and deliver collaborative climate, sustainability, or community-focused projects.",
    body: [
      { heading: "What this involves", items: ["Co-designing and delivering climate or sustainability projects", "Community-focused initiatives with shared goals", "Research-to-action projects", "Pilot programmes and field-based work"] },
      { heading: "How to start", items: ["Email mausamlab@gmail.com with your project idea", "Include 'Project Partnership' in the subject line", "Describe the scope, timeline, and what you are looking for"] },
    ],
  },
  sessions: {
    title: "Sessions & Events",
    intro: "Invite Mausam Lab to conduct a session, workshop, discussion, or take part in an event.",
    body: [
      { heading: "What we can offer", items: ["Workshops on research, policy, and climate skills", "Panel discussions and speaker sessions", "Guest lectures for universities and institutions", "Climate literacy sessions for organisations and communities"] },
      { heading: "How to request", items: ["Email mausamlab@gmail.com with your event details", "Include 'Session/Event Request' in the subject line", "Provide date, format, expected audience, and topic"] },
    ],
  },
  submitArticle: {
    title: "Submit an Article",
    intro: "Share an article or analysis for consideration in Mausam Lab's publications.",
    isArticleGuidelines: true,
  },
  contributeResearch: {
    title: "Contribute Research",
    intro: "Propose research or contribute to an ongoing research initiative.",
    body: [
      { heading: "How to contribute", items: ["Submit a research proposal to mausamlab@gmail.com", "Contribute data, findings, or analysis to an ongoing project", "Co-author with the Mausam Lab research team"] },
      { heading: "What we accept", items: ["Original research on climate, environment, or sustainability topics", "Pakistan or South Asia focused work preferred", "Any stage — from early ideas to completed research"] },
    ],
  },
  shareOpportunity: {
    title: "Share an Opportunity",
    intro: "Help us connect young people with relevant climate, research, policy, and development opportunities.",
    body: [
      { heading: "What to share", items: ["Fellowships, scholarships, and grants", "Research and internship opportunities", "Conferences, workshops, and events", "Job openings in climate, policy, or development"] },
      { heading: "How to share", items: ["Email mausamlab@gmail.com with the opportunity details", "Include 'Share an Opportunity' in the subject line"] },
    ],
  },
  proposeProject: {
    title: "Propose a Project",
    intro: "Have an idea for a climate or sustainability initiative? Tell us about it.",
    body: [
      { heading: "What we're looking for", items: ["Ideas that address real climate or sustainability challenges", "Proposals with clear goals and a feasible scope", "Projects that benefit communities, researchers, or practitioners"] },
      { heading: "How to propose", items: ["Email mausamlab@gmail.com with your project idea", "Include 'Project Proposal' in the subject line", "Describe the problem, proposed approach, and what support you are looking for"] },
    ],
  },
};

const ARTICLE_GUIDELINES = {
  guidelines: [
    "Write in clear, direct, and accessible English. Avoid unnecessary jargon and define technical terms where needed.",
    "Articles should be evidence-based, with factual claims, statistics, and figures supported by credible and traceable sources.",
    "Prefer primary sources, government and multilateral institutions, peer-reviewed research, and reputable research organisations.",
    "Use British English spelling.",
    "Keep the article relevant to climate, environment, sustainability, governance, development, or related areas within Mausam Lab's scope.",
    "Where relevant, prioritise Pakistan-specific, local, or community-based perspectives.",
    "Use clear headings and short paragraphs to improve readability.",
    "Include sources and properly attribute any data, quotations, or ideas taken from other sources.",
    "Articles must be original. Plagiarism or unattributed copying will not be accepted.",
    "AI tools may be used for brainstorming, outlining, editing, or improving clarity, but all research, analysis, facts, statistics, and references must be independently verified by the author.",
    "If AI has played a substantive role in drafting the article, authors should disclose this to the reviewer.",
  ],
  format: [
    "Submit the article as an editable Word document (.doc/.docx) or another editable format approved by Mausam Lab.",
    "Do not submit articles as flattened PDFs or image files.",
    "Include the article title, author name, and relevant sources in the submission.",
    "Images, charts, or figures must include captions and source/credit information.",
  ],
  process: [
    "Articles must be submitted via email at mausamlab@gmail.com.",
    "All submissions will be reviewed by the Mausam Lab Research Team for originality, factual accuracy, sourcing, clarity, and relevance.",
    "Authors may be asked to make revisions before publication.",
    "Authors will be informed within 4–5 days whether their article has been accepted for publication.",
  ],
};

/* ── Sub components ───────────────────────────────────────────────────────── */
function InvolveCard({ title, desc, panelKey, onOpen }) {
  return (
    <button onClick={() => onOpen(panelKey)} style={s.iCard}>
      <h3 style={s.iTitle}>{title}</h3>
      <p style={s.iDesc}>{desc}</p>
      <span style={s.iLink}>Learn More</span>
    </button>
  );
}

function Panel({ panelKey, onClose }) {
  const data = PANELS[panelKey];
  if (!data) return null;
  return (
    <div style={s.overlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={s.panel} role="dialog" aria-modal="true" aria-label={data.title}>
        <button onClick={onClose} style={s.closeBtn} aria-label="Close">&#215;</button>
        <div style={s.panelHeader}>
          <h2 style={s.panelTitle}>{data.title}</h2>
          <p style={s.panelIntro}>{data.intro}</p>
        </div>
        {data.isArticleGuidelines ? (
          <ArticleGuidelinesContent />
        ) : (
          <>
            {data.body && data.body.map(section => (
              <div key={section.heading} style={s.panelSection}>
                <h3 style={s.panelSectionTitle}>{section.heading}</h3>
                {section.items.length === 0 ? (
                  <p style={s.noItems}>No current openings.</p>
                ) : (
                  <ul style={s.panelList}>
                    {section.items.map(item => (
                      <li key={item} style={s.panelListItem}>
                        <span style={s.checkMark}>&#10003;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {data.opportunities && (
              <div style={s.noOpps}>
                <p style={{ margin: 0 }}>{data.opportunities}</p>
              </div>
            )}
            {data.cta && (
              <div style={{ marginTop: 24 }}>
                <Link to={data.cta.to} className="btn btn-primary" onClick={onClose}>{data.cta.label}</Link>
              </div>
            )}
            <div style={s.panelFooter}>
              Contact: <a href="mailto:mausamlab@gmail.com" style={s.emailLink}>mausamlab@gmail.com</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ArticleGuidelinesContent() {
  return (
    <div>
      {[
        { heading: "Article Guidelines", items: ARTICLE_GUIDELINES.guidelines },
        { heading: "Submission Format",  items: ARTICLE_GUIDELINES.format },
        { heading: "Submission Process", items: ARTICLE_GUIDELINES.process },
      ].map(sec => (
        <div key={sec.heading} style={s.panelSection}>
          <h3 style={s.panelSectionTitle}>{sec.heading}</h3>
          <ul style={s.panelList}>
            {sec.items.map(item => (
              <li key={item} style={s.panelListItem}>
                <span style={s.checkMark}>&#10003;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p style={s.noteText}>
        Mausam Lab reserves the right to edit submissions for clarity, accuracy, formatting, and editorial consistency before publication.
      </p>
      <div style={s.panelFooter}>
        Submit to: <a href="mailto:mausamlab@gmail.com" style={s.emailLink}>mausamlab@gmail.com</a>
      </div>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────────────────── */
export default function GetInvolved() {
  const [activePanel, setActivePanel] = useState(null);

  return (
    <>
      <PageMeta title="Get Involved" description="Join Mausam Lab, collaborate, or contribute to climate research and policy work." />
      {activePanel && <Panel panelKey={activePanel} onClose={() => setActivePanel(null)} />}

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Get Involved</span>
          <h1>Be Part of the Work</h1>
          <div className="hero-divider" />
          <p>
            Mausam Lab works with young researchers, students, universities, organizations,
            practitioners, and institutions to build knowledge and create practical responses to
            climate and sustainability challenges. Whether you want to contribute, collaborate,
            learn, or work with us, there are different ways to get involved.
          </p>
        </div>
      </section>

      {/* Join Mausam Lab */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader eyebrow="Join Mausam Lab" title="Join Mausam Lab" />
          <div className="grid grid-4">
            <InvolveCard title="Volunteer" desc="Contribute your time, skills, and ideas to Mausam Lab's research, programs, communications, and initiatives." panelKey="volunteer" onOpen={setActivePanel} />
            <InvolveCard title="Research Opportunities" desc="Take part in research projects, writing initiatives, and other opportunities to develop and contribute to climate research." panelKey="research" onOpen={setActivePanel} />
            <InvolveCard title="Internship Opportunities" desc="Gain practical experience through Mausam Lab's research, policy, communication, and programme-based internships." panelKey="internships" onOpen={setActivePanel} />
            <InvolveCard title="Work With Us" desc="Explore future openings and opportunities to join the Mausam Lab team." panelKey="work" onOpen={setActivePanel} />
          </div>
        </div>
      </section>

      {/* Collaborate */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Collaborate With Us" title="Collaborate With Us" description="We welcome collaborations that contribute to meaningful research, learning, policy engagement, and climate action." />
          <div className="grid grid-4">
            <InvolveCard title="Research Collaboration" desc="Work with us on research projects, publications, field studies, and knowledge production." panelKey="researchCollab" onOpen={setActivePanel} />
            <InvolveCard title="Institutional Collaboration" desc="Partner with Mausam Lab on research, learning, youth engagement, and climate initiatives." panelKey="institutional" onOpen={setActivePanel} />
            <InvolveCard title="Project Partnership" desc="Develop and deliver collaborative climate, sustainability, or community-focused projects." panelKey="projectPartnership" onOpen={setActivePanel} />
            <InvolveCard title="Sessions & Events" desc="Invite Mausam Lab to conduct a session, workshop, discussion, or take part in an event." panelKey="sessions" onOpen={setActivePanel} />
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link to="/contact" className="btn btn-secondary">Start a Collaboration</Link>
          </div>
        </div>
      </section>

      {/* Partner band */}
      <section style={s.partnerBand}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={s.partnerH2}>Partner With Us</h2>
          <p style={s.partnerP}>
            We work with universities, research institutes, civil society organizations, youth organizations,
            development organizations, practitioners, and other institutions. Partnerships can take different
            forms, from joint research and programs to knowledge exchange, training, and institutional initiatives.
          </p>
          <Link to="/contact" className="btn btn-primary">Partner With Us</Link>
        </div>
      </section>

      {/* Contribute */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeader eyebrow="Contribute" title="Contribute" description="Have research, ideas, or resources that could contribute to the climate conversation?" />
          <div className="grid grid-4">
            <InvolveCard title="Submit an Article" desc="Share an article or analysis for consideration." panelKey="submitArticle" onOpen={setActivePanel} />
            <InvolveCard title="Contribute Research" desc="Propose research or contribute to an ongoing research initiative." panelKey="contributeResearch" onOpen={setActivePanel} />
            <InvolveCard title="Share an Opportunity" desc="Help us connect young people with relevant climate, research, policy, and development opportunities." panelKey="shareOpportunity" onOpen={setActivePanel} />
            <InvolveCard title="Propose a Project" desc="Have an idea for a climate or sustainability initiative? Tell us about it." panelKey="proposeProject" onOpen={setActivePanel} />
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link to="/contact" className="btn btn-secondary">Contribute to Mausam Lab</Link>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section style={s.closeBand}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={s.closeH2}>Have an idea, question, or collaboration in mind?</h2>
          <Link to="/contact" className="btn btn-primary">Contact Mausam Lab</Link>
        </div>
      </section>
    </>
  );
}

const s = {
  sectionHead:  { marginBottom: 32 },
  sectionIntro: { color: "var(--color-text-muted)", maxWidth: 620, marginTop: 8 },
  iCard: {
    background: "var(--color-surface)", border: "1px solid var(--color-border)",
    borderRadius: "var(--radius)", padding: 24,
    display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10,
    cursor: "pointer", textAlign: "left", fontFamily: "var(--font-body)",
    transition: "box-shadow 0.15s, transform 0.15s", width: "100%",
    borderTop: "3px solid var(--color-primary)",
  },
  iTitle: { color: "var(--color-primary)", fontWeight: 600, fontSize: 15, margin: 0 },
  iDesc:  { color: "var(--color-text-muted)", fontSize: 14, lineHeight: 1.5, margin: 0, flex: 1 },
  iLink:  { fontSize: 12, fontWeight: 700, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.06em" },
  partnerBand: { background: "var(--color-neutral-light)", padding: "var(--space-6) 0", borderTop: "1px solid var(--color-border)" },
  partnerH2:   { color: "var(--color-primary)", marginBottom: 16 },
  partnerP:    { color: "var(--color-text-muted)", maxWidth: 640, margin: "0 auto 32px", fontSize: 16, lineHeight: 1.7 },
  closeBand:   { background: "var(--color-primary)", padding: "var(--space-6) 0" },
  closeH2:     { color: "#fff", marginBottom: 24 },
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(34,38,31,0.55)", zIndex: 200,
    display: "flex", alignItems: "flex-start", justifyContent: "center",
    padding: "40px 16px", overflowY: "auto",
  },
  panel: {
    background: "#fff", borderRadius: 10,
    width: "100%", maxWidth: 680,
    padding: "36px", position: "relative",
    boxShadow: "0 12px 48px rgba(34,38,31,0.18)",
    maxHeight: "85vh", overflowY: "auto",
  },
  closeBtn: {
    position: "absolute", top: 16, right: 16,
    background: "none", border: "1px solid var(--color-border)",
    width: 32, height: 32, borderRadius: 4,
    cursor: "pointer", color: "var(--color-text-muted)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "1.1rem", fontFamily: "inherit",
  },
  panelHeader:      { marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid var(--color-border)" },
  panelTitle:       { color: "var(--color-primary)", fontWeight: 600, fontSize: 22, margin: "0 0 8px" },
  panelIntro:       { color: "var(--color-text-muted)", fontSize: 15, lineHeight: 1.6, margin: 0 },
  panelSection:     { marginBottom: 24 },
  panelSectionTitle:{ color: "var(--color-primary)", fontWeight: 600, fontSize: 15, marginBottom: 10, paddingBottom: 6, borderBottom: "1px solid var(--color-border)" },
  panelList:        { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 },
  panelListItem:    { display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "var(--color-text)", lineHeight: 1.5 },
  checkMark:        { color: "var(--color-success)", fontWeight: 700, flexShrink: 0, marginTop: 1 },
  noOpps:           { background: "var(--color-neutral-light)", borderRadius: "var(--radius)", padding: 16, color: "var(--color-text-muted)", fontSize: 14, marginBottom: 16 },
  noItems:          { color: "var(--color-text-muted)", fontSize: 14, fontStyle: "italic" },
  panelFooter:      { marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--color-border)", fontSize: 14, color: "var(--color-text-muted)" },
  emailLink:        { color: "var(--color-primary)", fontWeight: 600, textDecoration: "none" },
  noteText:         { fontSize: 13, color: "var(--color-text-muted)", fontStyle: "italic", marginTop: 12, lineHeight: 1.6 },
};
