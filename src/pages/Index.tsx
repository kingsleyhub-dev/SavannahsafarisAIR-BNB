import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { ValueProp } from "@/components/sections/ValueProp";
import { Amenities } from "@/components/sections/Amenities";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { AvailabilityCalendar } from "@/components/sections/AvailabilityCalendar";
import { Testimonials } from "@/components/sections/Testimonials";
import { LocationPreview } from "@/components/sections/LocationPreview";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

const Index = () => (
  <>
    <Hero />
    <Highlights />
    <ValueProp />
    <Amenities />
    <GalleryPreview />
    <AvailabilityCalendar />
    <Testimonials />
    <LocationPreview />
    <ServicesPreview />
    <FAQ />
    <CTA />
  </>
);

export default Index;
