"use client";

import { motion } from "motion/react";
import {
  Leaf,
  Sparkles,
  ShieldCheck,
  Clock,
  Heart,
  Droplets,
  Flower2,
  CheckCircle2,
} from "lucide-react";

interface FeatureItem {
  icon: typeof Leaf;
  title: string;
  tagline: string;
  category: "henna" | "customer";
}

const HENNA_FEATURES: FeatureItem[] = [
  {
    icon: Leaf,
    title: "100% Sojat Leaf Harvest",
    tagline: "Triple-sifted, first-flush Rajasthani crop",
    category: "henna",
  },
  {
    icon: Droplets,
    title: "Pure Nilgiri Essential Oils",
    tagline: "Steam-distilled eucalyptus & cajeput blend",
    category: "henna",
  },
  {
    icon: Flower2,
    title: "Lemon & Raw Sugar Glaze",
    tagline: "Natural sealant locks moisture for deep dye release",
    category: "henna",
  },
  {
    icon: ShieldCheck,
    title: "0% PPD, Ammonia or Chemicals",
    tagline: "Never black henna, 100% botanical & chemical-free",
    category: "henna",
  },
];

const CUSTOMER_FEATURES: FeatureItem[] = [
  {
    icon: Clock,
    title: "48h Mahogany Peak for Biye Lagna",
    tagline: "Deepens naturally to rich burgundy for the wedding day",
    category: "customer",
  },
  {
    icon: Heart,
    title: "Gentle for Shankha-Pola Wearers",
    tagline: "Hypoallergenic, maternity safe & cooling on skin",
    category: "customer",
  },
  {
    icon: CheckCircle2,
    title: "Complimentary Patch-Test Kit",
    tagline: "Sample cone mailed prior to your ceremony",
    category: "customer",
  },
  {
    icon: Sparkles,
    title: "14-Day Longevity Through Bou Bhat",
    tagline: "Fades evenly through your reception & celebrations",
    category: "customer",
  },
];

export default function TrustSection() {
  return (
    <section className="relative w-full py-10 sm:py-12 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden">
      <div className="relative z-10 w-full">
        {/* ── Understated, Quiet Luxury Eyebrow & Title ── */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-7 pb-4 border-b border-border/40">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-muted-foreground">
              THE BOTANICAL STANDARD
            </span>
            <span className="text-muted-foreground/40 text-xs">•</span>
            <span className="text-xs text-primary font-medium">
              বিশুদ্ধ ভেষজ মেহেন্দি — Pure Ingredients, Honest Bengali Craft
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground font-sans hidden sm:inline-block">
            Freshly mixed in small batches for Gaye Holud & Biye ceremonies
          </span>
        </div>

        {/* ── Compact 2-Column Bullet Grid (Henna Botanicals & Bengali Bridal Care) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-14 gap-y-4">
          {/* Column 1: Henna Features */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground/70">
              <Leaf className="size-3.5 text-primary" />
              <span>The Organic Recipe (খাঁটি উপাদান)</span>
            </div>

            <div className="space-y-2.5">
              {HENNA_FEATURES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="size-3.5" />
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-2 text-xs leading-snug">
                      <span className="font-semibold text-foreground">
                        {item.title}
                      </span>
                      <span className="text-muted-foreground font-sans">
                        — {item.tagline}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Customer & Bridal Care */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground/70">
              <Heart className="size-3.5 text-primary" />
              <span>The Bridal Experience (বাঙালি কনের যত্ন)</span>
            </div>

            <div className="space-y-2.5">
              {CUSTOMER_FEATURES.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 + 0.1 }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="size-3.5" />
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-2 text-xs leading-snug">
                      <span className="font-semibold text-foreground">
                        {item.title}
                      </span>
                      <span className="text-muted-foreground font-sans">
                        — {item.tagline}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Subtle Decorative Botanical Divider ── */}
        <div className="mt-8 pt-4 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-emerald-500" />
              Patch-Tested Safe
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-primary" />
              100% Sojat Lawsonia
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-amber-500" />
              Zero Black Henna
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground/60 hidden md:inline-block">
            Mussu Henna Atelier • খাঁটি মেহেদি কারিগর
          </span>
        </div>
      </div>
    </section>
  );
}
