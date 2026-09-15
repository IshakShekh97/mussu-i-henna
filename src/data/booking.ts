import { Crown, Flower2, PartyPopper } from "lucide-react";
import type React from "react";

export interface CeremonyOption {
  id: string;
  num: string;
  title: string;
  bengali: string;
  badge: string;
  tag: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const CEREMONIES: CeremonyOption[] = [
  {
    id: "bridal",
    num: "01",
    title: "Bridal / Normal Mehendi",
    bengali: "বাঙালি ব্রাইডাল ও সাধারণ মেহেন্দি",
    badge: "SIGNATURE BRIDAL",
    tag: "Bespoke Kolka & Traditional Art",
    description:
      "Bespoke Bengali Kolka motifs with guaranteed 48-hour deep mahogany stain.",
    icon: Crown,
  },
  {
    id: "guest_party",
    num: "02",
    title: "Guest / Party Mehendi",
    bengali: "অতিথি ও ব্রাইডাল পার্টি",
    badge: "CELEBRATION TROUPE",
    tag: "Sakhis, Borjatri & Family",
    description:
      "Fast, exquisite guest & bridesmaid adornments for celebratory troupes.",
    icon: PartyPopper,
  },
  {
    id: "festive_occasion",
    num: "03",
    title: "Festive / Occasion Mehendi",
    bengali: "উৎসব ও স্পেশাল অনুষ্ঠান",
    badge: "CULTURAL CELEBRATION",
    tag: "Gaye Holud, Pujo & Soirées",
    description:
      "Floral vines & traditional Alpona accents for Gaye Holud, Bou Bhat & Pujos.",
    icon: Flower2,
  },
];

export const PLACEMENT_OPTIONS = [
  "Hands & Arms (Elbow to Palm)",
  "Forearms & Wrists Only",
  "Palms & Fingertips",
  "Feet & Ankles",
  "Legs (Knee to Ankle)",
  "Back / Shoulder Accent",
] as const;
