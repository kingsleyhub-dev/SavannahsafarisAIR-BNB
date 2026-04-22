import * as Icons from "lucide-react";
import { amenities } from "@/data/site";

export const Amenities = () => (
  <section className="section-padding bg-secondary/40">
    <div className="container-luxe">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <span className="eyebrow">— Amenities</span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-balance">Every comfort, considered</h2>
        <p className="text-muted-foreground text-lg">Thoughtfully equipped to feel like a private residence — only better.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {amenities.map((a, i) => {
          const Icon = (Icons as any)[a.icon] ?? Icons.Sparkles;
          return (
            <div
              key={a.label}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-elegant transition-smooth animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="size-12 rounded-xl gradient-forest text-primary-foreground flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <Icon className="size-5" />
              </div>
              <h3 className="font-semibold text-base mb-1">{a.label}</h3>
              <p className="text-xs text-muted-foreground">{a.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);