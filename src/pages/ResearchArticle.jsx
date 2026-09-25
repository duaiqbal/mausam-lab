import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ArticleLayout from "../components/ArticleLayout";
import PageMeta from "./PageMeta";
import { researchItems } from "../data/research";
import { supabase } from "../lib/supabase";

export default function ResearchArticle() {
  const { slug } = useParams();
  const [item, setItem]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("research")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error && data) {
        setItem(data);
      } else {
        // Fall back to static data
        const fallback = researchItems.find((i) => i.slug === slug);
        setItem(fallback || null);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: "var(--space-6) var(--space-3)", textAlign: "center" }}>
        <p style={{ color: "var(--color-text-muted)" }}>Loading…</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container" style={{ padding: "var(--space-6) var(--space-3)", textAlign: "center" }}>
        <PageMeta title="Article Not Found" description="This research article could not be found." />
        <h1>Article Not Found</h1>
        <p>We couldn't find the research article you were looking for.</p>
        <Link to="/research">← Back to Research</Link>
      </div>
    );
  }

  return (
    <>
      <PageMeta title={item.title} description={item.excerpt} />
      <ArticleLayout item={item} />
    </>
  );
}
