export interface WorkshopProgram {
  id: string;
  name: string;
  price: string;
  description: string;
}

export const WORKSHOP_PROGRAMS: WorkshopProgram[] = [
  {
    id: "bengali-kolka",
    name: "Bengali Kolka & Bridal Geometry Masterclass (3-Day Intensive)",
    price: "₹8,500",
    description:
      "In-depth Kolka drafting, ancestral motifs & bridal symmetries.",
  },
  {
    id: "henna-chemistry",
    name: "Lawsonia Chemistry & Cone Churning Atelier (1-Day Hands-on)",
    price: "₹4,200",
    description:
      "Botanical formulation, Nilgiri oil blending & micro-cone rolling.",
  },
  {
    id: "advanced-speed",
    name: "Bridal Troupe & Speed Adornment Certification (2-Day Bootcamp)",
    price: "₹7,200",
    description:
      "Guest adornment pacing, Borjatri layouts & live bridal drills.",
  },
];

export const COHORTS = [
  "October 2026 Weekend Batch (Kolkata Studio & Live Stream)",
  "November 2026 Pre-Wedding Season Intensive (Kolkata Flagship)",
  "December 2026 Winter Masterclass Cohort (Limited 10 Seats)",
] as const;
