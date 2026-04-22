import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "../auth/AuthProvider";
import { FileText, Image as ImageIcon, Phone, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ pages: 0, media: 0, recentEdits: 0 });

  useEffect(() => {
    (async () => {
      const [{ count: pages }, { count: media }, { count: recentEdits }] = await Promise.all([
        supabase.from("pages").select("*", { count: "exact", head: true }),
        supabase.from("media_assets").select("*", { count: "exact", head: true }),
        supabase.from("audit_log").select("*", { count: "exact", head: true })
          .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      ]);
      setStats({ pages: pages ?? 0, media: media ?? 0, recentEdits: recentEdits ?? 0 });
    })();
  }, []);

  const cards = [
    { label: "Pages", value: stats.pages, icon: FileText, to: "/admin/dashboard/pages" },
    { label: "Media items", value: stats.media, icon: ImageIcon, to: "/admin/dashboard/media" },
    { label: "Edits (7d)", value: stats.recentEdits, icon: Activity, to: "/admin/dashboard" },
    { label: "Contact info", value: "Edit", icon: Phone, to: "/admin/dashboard/contact" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground mt-1">Signed in as {user?.email}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, to }) => (
          <Link key={label} to={to}>
            <Card className="p-5 hover:shadow-elegant transition-smooth h-full">
              <Icon className="size-5 text-primary mb-3" />
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="font-display text-xl font-bold mb-2">Quick start</h2>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
          <li>Go to <Link to="/admin/dashboard/pages" className="text-primary underline">Pages</Link> to edit text on any section of the website.</li>
          <li>Use <Link to="/admin/dashboard/media" className="text-primary underline">Media Library</Link> to upload, replace, or delete images and videos.</li>
          <li>Update WhatsApp numbers and email in <Link to="/admin/dashboard/contact" className="text-primary underline">Contact</Link>.</li>
        </ul>
      </Card>
    </div>
  );
};

export default AdminDashboard;
