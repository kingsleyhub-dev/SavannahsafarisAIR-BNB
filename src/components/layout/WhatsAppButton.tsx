import { MessageCircle } from "lucide-react";
import { useContactInfo, toWaNumber } from "@/hooks/useContactInfo";

export const WhatsAppButton = () => {
  const contact = useContactInfo();
  const num = toWaNumber(contact.whatsapp_primary.number);
  return (
    <a
      href={`https://wa.me/${num}?text=Hi%20Savannah%20Safaris%2C%20I'd%20like%20to%20enquire%20about%20a%20booking.`}
      target="_blank"
      rel="noopener"
      aria-label={`Chat with ${contact.whatsapp_primary.label} on WhatsApp`}
      className="fixed bottom-6 left-6 z-40 size-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-elegant hover:scale-110 transition-smooth animate-float"
    >
      <MessageCircle className="size-6 fill-current" />
      <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40" />
    </a>
  );
};
