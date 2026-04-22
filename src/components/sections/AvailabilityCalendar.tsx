import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import type { DateRange } from "react-day-picker";

export const AvailabilityCalendar = () => {
  const [range, setRange] = useState<DateRange | undefined>();
  const today = new Date();

  return (
    <section className="section-padding bg-secondary/40">
      <div className="container-luxe grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="eyebrow">— Live availability</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-balance">Check the calendar, book in seconds</h2>
          <p className="text-muted-foreground text-lg">
            Pick your dates and lock in best-rate direct booking. Instant confirmation by email.
          </p>
          <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <CalendarDays className="size-4 text-primary" />
              <span className="font-medium">Selected:</span>
              <span className="text-muted-foreground">
                {range?.from ? range.from.toLocaleDateString() : "Pick check-in"}
                {range?.to ? ` → ${range.to.toLocaleDateString()}` : ""}
              </span>
            </div>
            <Button asChild variant="hero" size="lg" className="w-full">
              <Link to="/booking">Continue to Booking</Link>
            </Button>
          </div>
        </div>
        <div className="bg-card rounded-2xl shadow-elegant p-4 sm:p-6 border border-border">
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            disabled={{ before: today }}
            className="mx-auto"
          />
        </div>
      </div>
    </section>
  );
};