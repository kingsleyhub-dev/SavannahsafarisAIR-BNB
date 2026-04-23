import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { images } from "@/data/site";

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

/** Map legacy /src/assets/<file> paths (stored in seed data) to bundled image URLs.
 *  Pass http(s), data:, blob:, and Supabase Storage URLs straight through. */
export const resolveImage = (value: string | undefined, fallback: string): string => {
  if (!value) return fallback;
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  const m = value.match(/\/(?:src\/)?assets\/([^/]+)\.[a-zA-Z0-9]+$/);
  if (m) {
    const key = m[1] as keyof typeof images;
    if (images[key]) return images[key] as string;
  }
  return value || fallback;
};
