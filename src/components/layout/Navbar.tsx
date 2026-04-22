import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/property", label: "The Stay" },
  { to: "/gallery", label: "Gallery" },
  { to: "/services", label: "Services" },
  { to: "/location", label: "Location" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-elegant",
        scrolled || open
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-soft"
          : "bg-transparent"
      )}
    >
      <div className="container-luxe flex items-center justify-between h-20">
        <Logo variant={scrolled || open ? "dark" : "light"} />

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-smooth",
                  scrolled
                    ? "text-foreground/80 hover:text-primary hover:bg-secondary"
                    : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-white/10",
                  isActive && (scrolled ? "text-primary bg-secondary" : "text-primary-foreground bg-white/15")
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="hero" size="sm">
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "lg:hidden p-2 rounded-full transition-smooth",
            scrolled || open ? "text-primary hover:bg-secondary" : "text-primary-foreground hover:bg-white/10"
          )}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden bg-background border-t border-border animate-fade-in">
          <div className="container-luxe py-6 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3 rounded-xl text-base font-medium transition-smooth",
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button asChild variant="hero" size="lg" className="mt-4">
              <Link to="/booking">Book Now</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};