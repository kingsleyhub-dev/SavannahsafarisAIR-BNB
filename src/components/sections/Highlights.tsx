import { Wifi, Car, ShieldCheck, Mountain, MapPin, Trees } from "lucide-react";

const items = [
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Car, label: "Free Parking" },
  { icon: ShieldCheck, label: "Secure Stay" },
  { icon: Mountain, label: "City Views" },
  { icon: MapPin, label: "Prime Location" },
  { icon: Trees, label: "Near National Park" },
];

export const Highlights = () => (
  <section className="py-12 bg-card border-y border-border">
    <div className="container-luxe grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="flex flex-col items-center text-center gap-2 group">
          <div className="size-12 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
            <Icon className="size-5" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-foreground/80">{label}</span>
        </div>
      ))}
    </div>
  </section>
);