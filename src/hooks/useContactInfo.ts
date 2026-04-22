import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { property as fallback } from "@/data/site";

export interface ContactInfo {
  whatsapp_primary: { label: string; number: string };
  whatsapp_secondary: { label: string; number: string };
  email: string;
  location: string;
}

const defaults: ContactInfo = {
  whatsapp_primary: { label: "Joel", number: "0712251765" },
  whatsapp_secondary: { label: "Rashid", number: "0791667175" },
  email: "kenziposh@yahoo.com",
  location: fallback.location,
};

export const useContactInfo = () => {
  const [contact, setContact] = useState<ContactInfo>(defaults);

  useEffect(() => {
    supabase.from("site_settings").select("value").eq("key", "contact").maybeSingle().then(({ data }) => {
      if (data?.value) setContact(data.value as unknown as ContactInfo);
    });
  }, []);

  return contact;
};

/** Normalise to international wa.me format (Kenya +254 default). */
export const toWaNumber = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0")) return "254" + digits.slice(1);
  return digits;
};
