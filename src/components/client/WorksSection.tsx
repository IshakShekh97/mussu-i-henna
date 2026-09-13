"use client";

import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { WORKS } from "@/data/works";

export default function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Intro and closing scroll-linked animation matching Hero, Products, and Services
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
    [0.94, 1, 1, 0.94],
  );
  const sectionY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.8, 0.98],
    [45, 0, 0, -45],
  );

  // Curate 4 signature preview works for the clean homepage glimpse
  const previewWorks = WORKS.slice(0, 4);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden bg-background"
    >
      <motion.div
        style={{
          opacity: sectionOpacity,
          scale: sectionScale,
          y: sectionY,
        }}
        className="relative z-10 w-full origin-center"
      >
        {/* ── Section Header (Minimal & Bold Matching Other Sections) ── */}
        <div className="relative z-10 w-full mb-10 sm:mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-wider uppercase mb-3"
              >
                <Sparkles className="size-3" />
                <span>{"PORTFOLIO GLIMPSE | 04"}</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground uppercase"
              >
                ATELIER WORKS
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.65, delay: 0.14 }}
                className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl font-sans"
              >
                A signature glimpse of bespoke Bengali bridal adornments crafted
                with 100% triple-sifted organic Sojat paste.
              </motion.p>
            </div>

            {/* Direct Redirect CTA Button to the Artist & Full Works Page */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center"
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-secondary hover:bg-foreground hover:text-background px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold shadow-xs backdrop-blur-xl transition-all duration-200 cursor-pointer"
              >
                <span>Read About Mussu &amp; View All Works</span>
                <ArrowUpRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Plain Background Glimpse Cards (Zero Modals, Zero Flicker) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full">
          {previewWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/60 bg-muted/20 aspect-3/4 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <Image
                src={work.image}
                alt={work.title}
                width={work.width}
                height={work.height}
                priority={index < 2}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Minimal Luxury Hover Overlay (Pure Info, No Modal) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 sm:p-5 pointer-events-none leading-normal">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/60 text-white border border-white/20 backdrop-blur-md">
                    <span className="size-1 rounded-full bg-primary" />
                    <span>{work.category}</span>
                  </span>
                </div>

                <div className="text-white">
                  <h3 className="font-heading text-sm sm:text-base font-bold tracking-tight text-white drop-shadow-xs line-clamp-1">
                    {work.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-sans text-white/80 mt-0.5 drop-shadow-xs">
                    {work.bengali}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Inspiring Homepage Atelier Banner with Direct Redirect ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="w-full mt-10 sm:mt-14 rounded-3xl border border-border/60 bg-muted/15 p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-primary mb-1 font-semibold">
              <Star className="size-3 fill-primary" />
              <span>THE ARTIST &amp; ATELIER PHILOSOPHY</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground tracking-tight">
              Bespoke Bengali Kolka by Mussu Shekh
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1 max-w-xl">
              Meet the master artist behind the needle-cone, learn about our
              100% organic Sojat recipe, and experience the full continuous 3D
              portfolio.
            </p>
          </div>

          <Link
            href="/about"
            className="group inline-flex items-center gap-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-xs sm:text-sm font-semibold shadow-md transition-all shrink-0 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Meet Mussu &amp; View 3D Works</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
