/**
 * Publications list for the public site.
 * Merges rows added in Admin > Publications with rows added in Admin > Research,
 * so research articles appear on the Publications page under the "Research" type.
 * Falls back to the static placeholder list only when both tables are empty.
 */
import { useMemo } from "react";
import { useCmsData } from "./useCmsData";

export function usePublications(staticFallback = []) {
  const { data: pubs,     loading: pubsLoading }     = useCmsData("publications", []);
  const { data: research, loading: researchLoading } = useCmsData("research", []);

  const data = useMemo(() => {
    const researchAsPubs = research.map((r) => ({
      id:           `research-${r.id}`,
      title:        r.title,
      type:         "Research",
      author:       r.author,
      date:         r.date,
      excerpt:      r.excerpt,
      description:  r.excerpt,
      article_body: Array.isArray(r.body) ? r.body.join("\n\n") : "",
      image_url:    r.image_url,
      download_url: null,
    }));
    const all = [...pubs, ...researchAsPubs];
    return all.length > 0 ? all : staticFallback;
  }, [pubs, research, staticFallback]);

  return { data, loading: pubsLoading || researchLoading };
}