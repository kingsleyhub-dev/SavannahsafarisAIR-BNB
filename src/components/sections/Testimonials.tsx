import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/site";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const Testimonials = () => (
  <section className="section-padding gradient-soft">
    <div className="container-luxe">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
        <span className="eyebrow">— Reviews</span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold">Loved by guests worldwide</h2>
      </div>

      <Carousel opts={{ loop: true, align: "start" }} className="max-w-5xl mx-auto">
        <CarouselContent>
          {testimonials.map((t) => (
            <CarouselItem key={t.name} className="md:basis-1/2">
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border h-full flex flex-col gap-4">
                <Quote className="size-8 text-accent" />
                <p className="text-lg leading-relaxed text-foreground/90 italic">"{t.quote}"</p>
                <div className="flex items-center gap-1 mt-auto">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="size-4 fill-accent text-accent" />)}
                </div>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  </section>
);