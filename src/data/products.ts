export interface Product {
  id: string;
  name: string;
  price: string;
  badges: [string, string];
  category: "cones" | "care" | "kits";
  image: string;
  tagline: string;
  description: string;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
}

export const CATEGORIES = [
  { id: "all", label: "All Creations" },
  { id: "cones", label: "Henna Cones" },
  { id: "care", label: "Care & Oils" },
  { id: "kits", label: "Bridal Suites" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const PRODUCTS: Product[] = [
  {
    id: "organic-cones",
    name: "Kolkata Sojat Organic Cones",
    price: "₹18",
    badges: ["Artisan Batch", "100% Organic"],
    category: "cones",
    image: "/products/henna-cones.png",
    tagline: "Triple-sifted henna paste with pure Nilgiri eucalyptus oil",
    description:
      "Handcrafted for Bengali bridal Kolka work using 100% pure organic henna powder, pure eucalyptus oil, and cane sugar syrup for a silky smooth flow and rich mahogany stain that lasts up to 2 weeks.",
    rating: 4.9,
    reviewsCount: 142,
    isFeatured: true,
  },
  {
    id: "aftercare-balm",
    name: "Mahogany Glow Aftercare Balm",
    price: "₹28",
    badges: ["Best Seller", "Aftercare"],
    category: "care",
    image: "/products/aftercare-balm.png",
    tagline:
      "Nourishing botanical blend to lock in and deepen your bridal mehndi stain",
    description:
      "All-natural balm made with organic beeswax, sweet almond oil, and therapeutic essential oils. Creates an impermeable moisture barrier that deepens the stain oxidation through Biye and Bou Bhat.",
    rating: 5.0,
    reviewsCount: 98,
    isFeatured: true,
  },
  {
    id: "essential-oil",
    name: "Pure Nilgiri Henna Essential Oil",
    price: "₹32",
    badges: ["Pure Extract", "Therapeutic"],
    category: "care",
    image: "/products/essential-oil.png",
    tagline:
      "High-terpene eucalyptus & cajeput for intense mahogany stain results",
    description:
      "A specialized blend of pure steam-distilled eucalyptus and cajeput essential oils with high monoterpene alcohol content, formulated specifically for maximum dye release and rich stain longevity.",
    rating: 4.9,
    reviewsCount: 76,
    isFeatured: true,
  },
  {
    id: "bridal-kit",
    name: "Bengali Bridal Kolka Box",
    price: "₹75",
    badges: ["New Edition", "Luxury Bridal"],
    category: "kits",
    image: "/products/bridal-kit.png",
    tagline:
      "Complete ceremonial bridal suite with artisan cones, balm & gold keepsake box",
    description:
      "The ultimate ceremonial package featuring 6 fresh bridal cones, luxury aftercare balm, sealant glaze, Bengali Kolka design guide, and an engraved gold-foiled presentation keepsake box.",
    rating: 5.0,
    reviewsCount: 64,
    isFeatured: true,
  },
  {
    id: "artisan-precision-cones",
    name: "Artisan Fine-Tip Kolka Cones",
    price: "₹24",
    badges: ["Artisan Tool", "Ultra Fine"],
    category: "cones",
    image: "/products/henna-cones.png",
    tagline:
      "Micro-pinhole cones engineered for intricate bridal lace & Kolka paisleys",
    description:
      "Laser-cut ultra-fine tips calibrated specifically for microscopic line work, intricate netting, Kolka curves, and delicate floral shading without hand fatigue.",
    rating: 4.8,
    reviewsCount: 53,
    isFeatured: false,
  },
  {
    id: "stain-protection-elixir",
    name: "Stain Protection Elixir",
    price: "₹36",
    badges: ["Special Edition", "Waterproof"],
    category: "care",
    image: "/products/essential-oil.png",
    tagline:
      "Protective organic sealant that shields fresh henna against moisture",
    description:
      "Fast-absorbing botanical sealant that forms a breathable protective microfilm over dry henna paste, locking in body warmth for deeper color development.",
    rating: 4.9,
    reviewsCount: 41,
    isFeatured: false,
  },
  {
    id: "ceremonial-mehndi-trunk",
    name: "Gaye Holud & Biye Trunk",
    price: "₹120",
    badges: ["Signature", "Limited Batch"],
    category: "kits",
    image: "/products/bridal-kit.png",
    tagline:
      "Handcrafted collector's gift trunk for grand Bengali wedding celebrations",
    description:
      "An heirloom-worthy wooden trunk wrapped in artisan cloth containing 12 fresh cones, 2 jars of aftercare balm, applicator accessories, and golden sealing ribbons for Gaye Holud and Biye ceremonies.",
    rating: 5.0,
    reviewsCount: 29,
    isFeatured: false,
  },
  {
    id: "sojat-reserve-cones",
    name: "Autumn Harvest Sojat Cones",
    price: "₹22",
    badges: ["Single Origin", "Dark Stain"],
    category: "cones",
    image: "/products/henna-cones.png",
    tagline: "First flush autumn harvest henna with unmatched dye release",
    description:
      "Single-estate henna paste from the peak November crop yield, offering exceptional elasticity and a deep burgundy dye curve.",
    rating: 4.8,
    reviewsCount: 37,
    isFeatured: false,
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.isFeatured).slice(
  0,
  4,
);
