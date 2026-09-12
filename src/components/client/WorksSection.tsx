"use client";

import { ArrowUpRight, Eye, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { WORKS, type WorkItem } from "@/data/works";

export default function WorksSection() {
  const [activeItem, setActiveItem] = useState<WorkItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Intro and closing scroll-linked animation matching Hero and other sections
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.8, 0.98],
    [0, 1, 1, 0],
  );
  const sectionScale = useTransform(
    scrollYProgress,
    [0, 0.18, 0.8, 0.98],
    [0.93, 1, 1, 0.93],
  );
  const sectionY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.8, 0.98],
    [50, 0, 0, -50],
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden"
    >
      <motion.div
        style={{
          opacity: sectionOpacity,
          scale: sectionScale,
          y: sectionY,
        }}
        className="relative z-10 w-full origin-center"
      >
        {/* ── Section Header (Animates in and out on scroll) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-primary mb-2.5"
            >
              <Sparkles className="size-3.5 text-primary" />
              <span>{"PORTFOLIO // LIVE ATELIER WORKS"}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.06 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground font-sans"
            >
              Selected Bridal &amp;{" "}
              <span className="font-serif italic font-normal text-primary">
                Ceremonial Works
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="text-xs sm:text-sm text-muted-foreground font-sans max-w-md md:text-right leading-relaxed"
          >
            Curated heirloom captures from Gaye Holud, Biye, and Bou Bhat
            celebrations. Drafted by hand with triple-sifted organic Sojat henna
            paste.
          </motion.p>
        </div>

        {/* ── Seamless Gapless Masonry Grid (Zero Gaps, Zero Flicker) ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.05 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-border/40 shadow-xs bg-muted/10 leading-none"
        >
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-0 [column-gap:0]">
            {WORKS.map((work, index) => (
              <button
                type="button"
                key={work.id}
                onClick={() => setActiveItem(work)}
                className="group relative break-inside-avoid block w-full m-0 p-0 leading-none overflow-hidden cursor-pointer bg-muted/20 border-0 text-left"
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  width={work.width}
                  height={work.height}
                  priority={index < 4}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full h-auto block m-0 p-0 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Subtle Luxury Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 sm:p-5 pointer-events-none leading-normal">
                  {/* Top category chip */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/60 text-white border border-white/20 backdrop-blur-md">
                      <span className="size-1 rounded-full bg-primary" />
                      <span>{work.category}</span>
                    </span>
                    <span className="size-7 rounded-full bg-white/20 text-white flex items-center justify-center backdrop-blur-md">
                      <Eye className="size-3.5" />
                    </span>
                  </div>

                  {/* Bottom Title & Bengali Subtitle */}
                  <div className="text-white">
                    <h3 className="font-heading text-sm sm:text-base font-bold tracking-tight text-white drop-shadow-xs line-clamp-1">
                      {work.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-sans text-white/80 mt-0.5 drop-shadow-xs">
                      {work.bengali}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Interactive Fullscreen Image Lightbox Modal ── */}
      <AnimatePresence>
        {activeItem && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
            onClick={() => setActiveItem(null)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setActiveItem(null);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] rounded-[2rem] sm:rounded-[2.5rem] bg-card/95 border border-border/60 overflow-hidden shadow-2xl backdrop-blur-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                aria-label="Close preview"
                className="absolute top-4 right-4 z-20 size-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="size-4" />
              </button>

              {/* Large Image Preview */}
              <div className="relative w-full max-h-[60vh] sm:max-h-[66vh] aspect-3/4 bg-black/10 overflow-hidden flex items-center justify-center">
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Modal Detail Row */}
              <div className="p-5 sm:p-7 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono tracking-wider uppercase text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                      {activeItem.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-sans">
                      ({activeItem.bengali})
                    </span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    {activeItem.title}
                  </h3>
                </div>

                <Link
                  href={`/booking?style=${encodeURIComponent(activeItem.title)}`}
                  onClick={() => setActiveItem(null)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold shadow-md transition-all shrink-0 hover:scale-105 active:scale-95"
                >
                  <span>Book This Style</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
