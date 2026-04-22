import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { StickyBookCTA } from "./StickyBookCTA";
import { ScrollToTop } from "./ScrollToTop";

export const SiteLayout = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <ScrollToTop />
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <WhatsAppButton />
    <StickyBookCTA />
  </div>
);