import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { ChevronRight, FileText } from "lucide-react";
import { Loader2 } from "lucide-react";

interface Page { id: string; slug: string; title: string; description: string | null; sort_order: number; }

const PagesList = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("pages").select("*").order("sort_order").then(({ data }) => {
      setPages((data as Page[]) ?? []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="grid place-items-center py-12"><Loader2 className="size-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Pages</h1>
        <p className="text-muted-foreground mt-1">Edit text content for every page on your website.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {pages.map((p) => (
          <Link key={p.id} to={`/admin/dashboard/pages/${p.slug}`}>
            <Card className="p-5 hover:shadow-elegant transition-smooth flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                  <FileText className="size-5" />
                </div>
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-xs text-muted-foreground">/{p.slug === "home" ? "" : p.slug}</p>
                </div>
              </div>
              <ChevronRight className="size-4 text-muted-foreground group-hover:translate-x-1 transition-smooth" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PagesList;
