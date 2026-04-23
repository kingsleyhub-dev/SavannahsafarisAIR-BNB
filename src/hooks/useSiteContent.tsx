import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type ContentMap = Record<string, string>;
// key format: `${pageSlug}.${sectionSlug}.${fieldKey}`

interface Ctx {
  loaded: boolean;
  get: (pageSlug: string, sectionSlug: string, fieldKey: string, fallback?: string) => string;
}

const SiteContentCtx = createContext<Ctx>({ loaded: false, get: (_p, _s, _k, fb = "") => fb });

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<ContentMap>({});
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("content_fields")
      .select("key, published_value, section_id, sections!inner(slug, page_id, pages!inner(slug))");
    if (error) { setLoaded(true); return; }
    const next: ContentMap = {};
    for (const row of (data ?? []) as any[]) {
      const pageSlug = row.sections?.pages?.slug;
      const sectionSlug = row.sections?.slug;
      if (!pageSlug || !sectionSlug) continue;
      if (row.published_value != null && row.published_value !== "") {
        next[`${pageSlug}.${sectionSlug}.${row.key}`] = row.published_value;
      }
    }
    setMap(next);
    setLoaded(true);
  }, []);

  useEffect(() => {
    load();
    const channel = supabase
      .channel("content_fields_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "content_fields" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [load]);

  const get = useCallback(
    (pageSlug: string, sectionSlug: string, fieldKey: string, fallback = "") =>
      map[`${pageSlug}.${sectionSlug}.${fieldKey}`] ?? fallback,
    [map],
  );

  return <SiteContentCtx.Provider value={{ loaded, get }}>{children}</SiteContentCtx.Provider>;
};

export const useSiteContent = () => useContext(SiteContentCtx);

/** Resolve an image value: passes through http(s)/data URLs and /assets paths.
 *  If the DB value is a /src/assets/... path (legacy), we leave it; build will handle. */
export const resolveImage = (value: string | undefined, fallback: string) => {
  if (!value) return fallback;
  return value;
};
