"use client";

import { ArrowUpRight, Eye, Layers, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

interface SignatureWork {
  id: string;
  num: string;
  title: string;
  category: string;
  bengali: string;
  ceremony: string;
  image: string;
  detail: string;
}

const SIGNATURE_WORKS: SignatureWork[] = [
  {
    id: "work-1",
    num: "01",
    title: "Royal Bengali Flora",
    category: "Bridal Full Arm Suite",
    bengali: "রাজকীয় ফুল ও লতা",
    ceremony: "Bespoke Biye",
    image: "/works/work-1.webp",
    detail: "Intricate paisley cuffs with traditional fingertip motifs",
  },
  {
    id: "work-4",
    num: "02",
    title: "Shankha-Pola Bridal Vine",
    category: "Bengali Biye Traditional",
    bengali: "শাঁখা-পলা ব্রাইডাল লতা",
    ceremony: "Sacred Vows",
    image: "/works/work-4.webp",
    detail: "Hand-drafted heirloom vines tailored to red & white bangles",
  },
  {
    id: "work-3",
    num: "03",
    title: "Sunburst Artisan Mandala",
    category: "Festive Gaye Holud",
    bengali: "সূর্যমুখ মন্ডলা",
    ceremony: "Turmeric Soirée",
    image: "/works/work-3.webp",
    detail: "Radiant floral centerpiece with organic Nilgiri eucalyptus oils",
  },
  {
    id: "work-6",
    num: "04",
    title: "Heirloom Kolka Cuff",
    category: "Bou Bhat Royal",
    bengali: "ঐতিহ্যবাহী কোলকা কাফ",
    ceremony: "Post-Wedding Reception",
    image: "/works/work-6.webp",
    detail: "Geometric lace jaali with 48-hour deep mahogany oxidation",
  },
];

export default function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const activeWork = SIGNATURE_WORKS[activeIdx] ?? SIGNATURE_WORKS[0];

  // Smooth scroll entrance & exit transformations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0],
  );
  const sectionScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.96, 1, 1, 0.96],
  );
  const sectionY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [30, 0, 0, -30],
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Atelier Works Archive"
      className="relative w-full py-12 sm:py-16 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden"
    >
      <motion.div
        style={{
          opacity: sectionOpacity,
          scale: sectionScale,
          y: sectionY,
        }}
        className="relative z-10 w-full origin-center"
      >
        {/* ── Section Header Row ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border/50">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono tracking-wider uppercase mb-2">
              <Sparkles className="size-3" />
              <span>PORTFOLIO GLIMPSE | 04</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground uppercase">
              ATELIER WORKS ARCHIVE
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1.5 max-w-xl">
              A glimpse into 850+ adorned brides, sacred Shankha-Pola motifs,
              and freehand Bengali Kolka artistry.
            </p>
          </div>

          <Link
            href="/about"
            className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary hover:bg-foreground hover:text-background px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-xs backdrop-blur-xl transition-all duration-200 cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>Explore All Works &amp; 3D Gallery</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* ── Main Fuller Bento Showcase ── */}
        <div className="mt-8 rounded-[2rem] sm:rounded-[2.5rem] border border-border/70 bg-card/85 backdrop-blur-xl p-5 sm:p-7 md:p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
            {/* ── Left Column: Masterpiece Visual Preview (lg:col-span-6) ── */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="relative w-full aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] max-h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden border border-border/60 bg-background/80 shadow-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeWork.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={activeWork.image}
                      alt={activeWork.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

                    {/* Top Floating Glass Badges */}
                    <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono tracking-wider uppercase">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {activeWork.ceremony}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-mono font-semibold">
                        {activeWork.num} / 04
                      </span>
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white pointer-events-none">
                      <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-primary-foreground/90 uppercase mb-1">
                        <span>{activeWork.category}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-heading font-black text-white leading-snug">
                        {activeWork.title}
                      </h3>
                      <div className="flex items-center justify-between gap-2 mt-1 pt-2 border-t border-white/20 text-xs">
                        <span className="font-sans text-white/80">
                          {activeWork.detail}
                        </span>
                        <span className="font-sans text-xs text-white/90 font-medium shrink-0">
                          {activeWork.bengali}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ── Right Column: Interactive Selection Stack & Full Gallery Portal (lg:col-span-6) ── */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-5">
              {/* Interactive Preview Switcher */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3 pb-2 border-b border-border/40">
                  <span>SELECT SIGNATURE COLLECTION</span>
                  <span className="text-[11px] text-primary font-bold">
                    PREVIEW {activeWork.num}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {SIGNATURE_WORKS.map((work, idx) => {
                    const isActive = activeIdx === idx;
                    return (
                      <button
                        key={work.id}
                        type="button"
                        onClick={() => setActiveIdx(idx)}
                        onMouseEnter={() => setActiveIdx(idx)}
                        className={`relative w-full rounded-2xl p-3.5 sm:p-4 text-left transition-all duration-200 border cursor-pointer flex items-center justify-between gap-3 ${
                          isActive
                            ? "border-primary/60 bg-primary/10 shadow-xs"
                            : "border-border/50 bg-background/50 hover:border-border hover:bg-muted/40"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeWorkTab"
                            className="absolute inset-0 rounded-2xl ring-1 ring-primary/40 pointer-events-none"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.35,
                            }}
                          />
                        )}

                        <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                          <span
                            className={`font-mono text-xs sm:text-sm font-bold transition-colors ${
                              isActive
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          >
                            {work.num}
                          </span>
                          <div>
                            <div className="font-heading text-xs sm:text-sm font-bold text-foreground leading-tight">
                              {work.title}
                            </div>
                            <div className="text-[11px] font-sans text-muted-foreground mt-0.5">
                              {work.category} • {work.bengali}
                            </div>
                          </div>
                        </div>

                        <div className="relative z-10 flex items-center gap-2 shrink-0">
                          <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-background/80 border border-border/60 text-muted-foreground uppercase">
                            {work.ceremony}
                          </span>
                          <span
                            className={`size-2 rounded-full transition-colors ${
                              isActive ? "bg-primary" : "bg-border"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Curated Archive Portal Card (Drives User to /about) ── */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5 flex flex-col justify-between gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      <Layers className="size-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-heading font-bold text-foreground uppercase tracking-wide">
                        Step Inside The 3D Atelier Gallery
                      </h4>
                      <p className="text-[11px] sm:text-xs text-muted-foreground font-sans mt-0.5">
                        Experience 24+ full ceremonial archives, zoom into
                        micro-kolka strokes, and witness mahogany stain depth.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Eye className="size-3 text-primary" /> 24+ Works
                    </span>
                    <span>•</span>
                    <span>3D Exhibition</span>
                    <span>•</span>
                    <span>Behind The Craft</span>
                  </div>

                  <Link
                    href="/about"
                    className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>View Full Gallery</span>
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
