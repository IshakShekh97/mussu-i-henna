"use client";

import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function ArtistHero() {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax and scroll-exit transforms matching Hero and Services
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Background giant typography moves slower for real parallax depth
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -60]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.8],
    [1, 0.4, 0],
  );

  // Cutout figure transforms
  const figureY = useTransform(scrollYProgress, [0, 0.8], [0, 80]);
  const figureScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.94]);

  // Overall section exit (animates out on scroll down, reverses on scroll up)
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.82],
    [1, 0.5, 0],
  );
  const sectionScale = useTransform(scrollYProgress, [0, 0.82], [1, 0.92]);
  const sectionY = useTransform(scrollYProgress, [0, 0.82], [0, -50]);

  // Peripheral editorial labels exit motion
  const labelOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const labelLeftX = useTransform(scrollYProgress, [0, 0.35], [0, -35]);
  const labelRightX = useTransform(scrollYProgress, [0, 0.35], [0, 35]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92dvh] md:min-h-screen w-full flex flex-col justify-between pt-16 sm:pt-20 md:pt-14 pb-16 sm:pb-12 px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 select-none overflow-hidden"
    >
      <motion.div
        style={{
          opacity: sectionOpacity,
          scale: sectionScale,
          y: sectionY,
        }}
        className="relative flex-1 w-full flex flex-col justify-between origin-center"
      >
        {/* ── Top Editorial Row (Image 1 Style) ── */}
        <div className="relative z-30 w-full flex items-start justify-between gap-4 pt-2 sm:pt-4">
          {/* Top-Left: Artisan Tagline & Divider */}
          <motion.div
            style={{ opacity: labelOpacity, x: labelLeftX }}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start max-w-xs"
          >
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase text-primary font-bold">
              ARTISAN &amp; FOUNDER
            </span>
            <p className="text-xs sm:text-sm font-sans font-medium text-foreground uppercase tracking-wider mt-1 leading-snug">
              Heritage Henna That Moves With Tradition.
            </p>
            <div className="w-10 h-0.5 bg-primary/40 mt-2" />
          </motion.div>

          {/* Top-Right: Atelier Provenance */}
          <motion.div
            style={{ opacity: labelOpacity, x: labelRightX }}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:flex flex-col items-end text-right"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono uppercase tracking-wider text-primary mb-1">
              <Sparkles className="size-2.5 text-primary" />
              <span>BENGALI ATELIER</span>
            </div>
            <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
              {"KOLKATA | EST. 2024"}
            </span>
          </motion.div>
        </div>

        {/* ── Center Stage: Giant Background Typography + Cutout Figure ── */}
        <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[380px] sm:min-h-[460px] md:min-h-[540px]">
          {/* Giant Background Typography: "MUSSU" (Exact Image 1 "GAZU" Style) */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
          >
            <h1 className="w-full text-center text-[22vw] sm:text-[23vw] md:text-[24vw] font-black tracking-tighter uppercase text-foreground leading-none">
              MUSSU
            </h1>
          </motion.div>

          {/* Center Artist Cutout Figure Overlapping Typography */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            style={{ y: figureY, scale: figureScale }}
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15,
            }}
            className="relative z-20 h-[62vh] sm:h-[68vh] md:h-[75vh] max-h-[720px] aspect-848/1264 flex items-end justify-center pointer-events-none"
          >
            <Image
              src="/mussu-cutout.webp"
              alt="Mussu Shekh - Master Henna Artist & Founder"
              fill
              priority
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 560px"
              className="object-contain object-bottom drop-shadow-[0_25px_45px_rgba(0,0,0,0.18)]"
            />
          </motion.div>
        </div>

        {/* ── Bottom Editorial Row (Image 1 Style) ── */}
        <div className="relative z-30 w-full flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pt-4">
          {/* Bottom-Left: Action CTA Buttons */}
          <motion.div
            style={{ opacity: labelOpacity, x: labelLeftX }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 sm:gap-6"
          >
            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <a
              href="#atelier-works"
              className="text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-primary hover:text-primary transition-all cursor-pointer"
            >
              Explore Works ↓
            </a>
          </motion.div>

          {/* Bottom-Right: Collection Metadata & Trust Mark */}
          <motion.div
            style={{ opacity: labelOpacity, x: labelRightX }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center sm:items-end text-center sm:text-right"
          >
            <div className="flex items-center gap-1 text-[11px] font-mono text-primary font-bold tracking-widest uppercase">
              <Star className="size-3 fill-primary text-primary" />
              <span>BESPOKE BRIDAL SUITES</span>
            </div>
            <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase mt-0.5">
              {"850+ BRIDES ADORNED | 2026"}
            </p>
            <div className="w-10 h-0.5 bg-primary/40 mt-1.5 hidden sm:block" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
