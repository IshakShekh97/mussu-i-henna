import { Crown, Leaf, Sparkles } from "lucide-react";
import type React from "react";

export interface StorySpot {
  id: string;
  number: string;
  bengali: string;
  title: string;
  subtitle: string;
  headline: string;
  badge: string;
  description: string;
  details: string;
  quote: string;
  statValue: string;
  statLabel: string;
  x: number;
  y: number;
  icon: React.ComponentType<{ className?: string }>;
}

export const STORY_SPOTS: StorySpot[] = [
  {
    id: "founder",
    number: "01",
    bengali: "মাস্টার শিল্পী ও প্রতিষ্ঠাতা",
    title: "Mussu Shekh",
    subtitle: "Founder & Lead Artisan",
    headline: "Devotion to Authentic Bengali Bridal Heritage",
    badge: "8+ Years Mastery",
    description:
      "Rooted in sacred Bengali traditions, Mussu drafts every suite freehand, weaving sacred blessings into intricate Kolka vines.",
    details:
      "Mussu began her journey in Kolkata learning the traditional bridal arts of Shankha-Pola alignment, Gaye Holud turmeric ceremonies, and auspicious peacock and paisley iconography. Every stroke is guided by deep reverence for the bride's sacred ceremony, ensuring no two brides ever wear the same design.",
    quote:
      "In Bengal, bridal mehndi is not merely an ornament — it is a visual prayer and sacred blessing worn on the bride's hands.",
    statValue: "850+",
    statLabel: "Brides Adorned",
    x: 50,
    y: 14,
    icon: Crown,
  },
  {
    id: "paste",
    number: "02",
    bengali: "বিশুদ্ধ প্রাকৃতিক উপাদান",
    title: "Pure Bengal Lawsonia",
    subtitle: "Artisanal Chemical-Free Paste",
    headline: "Crafted Daily with Zero Synthetic Additives",
    badge: "100% Organic",
    description:
      "Mixed freshly in small morning batches with triple-sifted Bengal henna leaves, steam-distilled eucalyptus, and pure cane sugar.",
    details:
      "Unlike mass-market cones loaded with toxic chemical dyes and synthetic PPD, our proprietary atelier blend is 100% organic, hypoallergenic, and soothing. It produces a natural, aromatic henna that deepens into a rich mahogany stain peaking at 48 hours for Bou Bhat celebrations.",
    quote:
      "Pure organic ingredients honor the bride's skin and create a luminous stain that endures through every post-wedding feast.",
    statValue: "48h",
    statLabel: "Mahogany Stain",
    x: 35,
    y: 54,
    icon: Leaf,
  },
  {
    id: "sketchbook",
    number: "03",
    bengali: "হস্তনির্মিত কলকা নকশা",
    title: "Bespoke Bridal Suites",
    subtitle: "Sacred Ceremonial Kolka",
    headline: "Hand-Drafted to Mirror Your Benarasi Weave",
    badge: "100% Freehand",
    description:
      "Custom motifs hand-sketched to harmonize with the bride's Benarasi zari, Shankha-Pola, and heirlooms without stencils.",
    details:
      "We never use stencils, stickers, or digital prints. From traditional floral vines and lotus pools to sacred conch motifs and groom narrative cuffs, each design is drawn directly onto the skin with surgical precision and artistic poise.",
    quote:
      "Your bridal suite should be as unique and personal as your wedding vows, capturing the spirit of your ancestral legacy.",
    statValue: "100%",
    statLabel: "Freehand Drafted",
    x: 65,
    y: 72,
    icon: Sparkles,
  },
];
