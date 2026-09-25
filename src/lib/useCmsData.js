/**
 * Generic hook for fetching a table from Supabase with a static fallback.
 * Now includes realtime subscriptions so public pages auto-update when admin saves changes.
 */
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useCmsData(table, fallback = [], options = {}) {
  const [data, setData]       = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        let query = supabase.from(table).select("*");

        // Apply ordering
        const orders = options.order || [["sort_order"], ["created_at"]];
        for (const [col, dir = "asc"] of orders) {
          query = query.order(col, { ascending: dir === "asc" });
        }

        const { data: rows, error } = await query;

        if (cancelled) return;

        if (error) {
          console.warn(`[CMS] Failed to load "${table}", using static fallback:`, error.message);
          setData(fallback);
        } else if (!rows || rows.length === 0) {
          // DB table is empty — use static fallback so the site still shows something
          setData(fallback);
        } else {
          setData(rows);
        }
      } catch (e) {
        if (!cancelled) {
          console.warn(`[CMS] Error loading "${table}":`, e);
          setData(fallback);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel(`public:${table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        (payload) => {
          console.log(`[CMS] ${table} changed:`, payload.eventType);
          // Re-fetch whenever INSERT, UPDATE, or DELETE happens
          fetchData();
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [table]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading };
}

/**
 * Fetches the single site_config row with realtime updates.
 */
export function useSiteConfig(defaults = {}) {
  const [config, setConfig]   = useState(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchConfig() {
      try {
        const { data, error } = await supabase
          .from("site_config")
          .select("*")
          .eq("id", "main")
          .single();

        if (cancelled) return;
        if (!error && data) setConfig({ ...defaults, ...data });
      } catch (e) {
        if (!cancelled) console.warn("[CMS] Error loading site_config:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchConfig();

    // Subscribe to realtime changes on site_config
    const subscription = supabase
      .channel("public:site_config")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "site_config" },
        (payload) => {
          console.log("[CMS] site_config changed:", payload.eventType);
          fetchConfig();
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { config, loading };
}
