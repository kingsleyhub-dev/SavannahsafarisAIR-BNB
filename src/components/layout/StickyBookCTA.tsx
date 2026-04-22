import { Link, useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";

export const StickyBookCTA = () => {
  const { pathname } = useLocation();
  if (pathname === "/booking") return null;
  return (
    <Link
      to="/booking"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-primary text-primary-foreground shadow-elegant hover:bg-primary-glow hover:scale-105 transition-smooth font-medium text-sm"
    >
      <Calendar className="size-4" />
      <span>Book Now</span>
    </Link>
  );
};