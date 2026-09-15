"use client";

import { ArrowRight, ArrowUpRight, Sparkles, Star } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { STORY_SPOTS, type StorySpot } from "@/data/story-spots";

export default function ArtistHero() {
  const [activeSpotId, setActiveSpotId] = useState<string>("founder");
  const [modalSpot, setModalSpot] = useState<StorySpot | null>(null);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -60]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.8],
    [1, 0.4, 0],
  );

  const figureY = useTransform(scrollYProgress, [0, 0.8], [0, 80]);
  const figureScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.94]);

  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.82],
    [1, 0.5, 0],
  );
  const sectionScale = useTransform(scrollYProgress, [0, 0.82], [1, 0.92]);
  const sectionY = useTransform(scrollYProgress, [0, 0.82], [0, -50]);

  const labelOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const labelLeftX = useTransform(scrollYProgress, [0, 0.35], [0, -35]);
  const labelRightX = useTransform(scrollYProgress, [0, 0.35], [0, 35]);

  return (
    <section
      ref={containerRef}
      aria-label="Artist Story & Heritage Hero"
      className="relative min-h-[96dvh] w-full flex flex-col justify-between pt-16 sm:pt-20 md:pt-14 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 select-none overflow-hidden"
    >
      <motion.div
        style={{
          opacity: sectionOpacity,
          scale: sectionScale,
          y: sectionY,
        }}
        className="relative flex-1 w-full flex flex-col justify-between origin-center"
      >
        <div className="relative z-30 w-full flex items-start justify-between gap-4 pt-2 sm:pt-4">
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

          <motion.div
            style={{ opacity: labelOpacity, x: labelRightX }}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:flex flex-col items-end text-right"
          >
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border-primary/20 text-[10px] font-mono uppercase tracking-wider text-primary mb-1"
            >
              <Sparkles className="size-2.5 text-primary" />
              <span>BENGALI ATELIER</span>
            </Badge>
            <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
              {"KOLKATA | EST. 2024"}
            </span>
          </motion.div>
        </div>

        <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[460px] sm:min-h-[540px] md:min-h-[620px] lg:min-h-[680px]">
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
          >
            <span className="text-[22vw] md:text-[24vw] font-black uppercase tracking-tighter text-foreground/8 leading-none select-none font-heading drop-shadow-xs">
              MUSSU
            </span>
          </motion.div>

          <div className="relative z-10 w-full flex items-center justify-center">
            <div className="hidden xl:flex flex-col gap-5 w-72 2xl:w-80 absolute left-4 2xl:left-12 z-20">
              {STORY_SPOTS.slice(0, 2).map((spot) => {
                const isActive = activeSpotId === spot.id;
                const Icon = spot.icon;

                return (
                  <motion.div
                    key={spot.id}
                    onMouseEnter={() => setActiveSpotId(spot.id)}
                    onClick={() => {
                      setActiveSpotId(spot.id);
                      setModalSpot(spot);
                    }}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-left backdrop-blur-md ${
                      isActive
                        ? "bg-card/90 border-primary/50 shadow-xl ring-1 ring-primary/30 translate-x-1"
                        : "bg-card/60 border-border/60 hover:bg-card/85 hover:border-border hover:translate-x-0.5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-primary">
                        {`${spot.number} • ${spot.badge}`}
                      </span>
                      <Icon className="size-3.5 text-primary" />
                    </div>
                    <h3 className="text-sm font-bold font-sans text-foreground">
                      {spot.title}
                    </h3>
                    <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">
                      {spot.bengali}
                    </p>
                    <p className="text-xs font-sans text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                      {spot.description}
                    </p>
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-border/40 text-[11px] font-mono">
                      <span className="font-bold text-foreground">
                        {spot.statValue}
                      </span>
                      <span className="text-primary hover:underline flex items-center gap-1">
                        Read Story <ArrowRight className="size-2.5" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="relative flex items-center justify-center">
              <motion.div
                style={{ y: figureY, scale: figureScale }}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative w-auto h-[60vh] sm:h-[68vh] md:h-[75vh] lg:h-[82vh] max-h-[860px] aspect-[848/1264] max-w-[90vw]"
              >
                <Image
                  src="/mussu-cutout.png"
                  alt="Mussu - Lead Bengali Bridal Mehndi Artist"
                  fill
                  priority
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 540px, 720px"
                  className="object-contain object-center drop-shadow-[0_20px_45px_rgba(22,11,15,0.22)]"
                />

                {STORY_SPOTS.map((spot) => {
                  const isActive = activeSpotId === spot.id;
                  const Icon = spot.icon;

                  return (
                    <div
                      key={spot.id}
                      style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <div className="relative flex items-center justify-center">
                        <span
                          className={`absolute inline-flex h-9 w-9 sm:h-11 sm:w-11 rounded-full opacity-75 animate-ping transition-colors ${
                            isActive ? "bg-primary/50" : "bg-primary/20"
                          }`}
                        />

                        <button
                          type="button"
                          onClick={() => {
                            setActiveSpotId(spot.id);
                            setModalSpot(spot);
                          }}
                          onMouseEnter={() => setActiveSpotId(spot.id)}
                          onFocus={() => setActiveSpotId(spot.id)}
                          aria-label={`View story: ${spot.title}`}
                          className={`relative flex items-center justify-center size-7 sm:size-9 rounded-full border-2 transition-all duration-300 shadow-xl cursor-pointer ${
                            isActive
                              ? "bg-primary text-primary-foreground border-background scale-110 ring-4 ring-primary/40"
                              : "bg-background/90 text-foreground border-primary/50 hover:bg-primary hover:text-primary-foreground hover:scale-110"
                          }`}
                        >
                          <Icon className="size-3 sm:size-4" />
                          <span className="sr-only">{spot.title}</span>
                        </button>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="hidden lg:flex absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 rounded-lg bg-foreground/95 text-background backdrop-blur-md text-[10px] font-mono tracking-wider uppercase whitespace-nowrap shadow-xl items-center gap-1.5 pointer-events-none z-30"
                          >
                            <span className="text-primary font-bold">
                              {spot.number}
                            </span>
                            <span>{spot.title}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <div className="hidden xl:flex flex-col gap-5 w-72 2xl:w-80 absolute right-4 2xl:right-12 z-20">
              {STORY_SPOTS.slice(2, 4).map((spot) => {
                const isActive = activeSpotId === spot.id;
                const Icon = spot.icon;

                return (
                  <motion.div
                    key={spot.id}
                    onMouseEnter={() => setActiveSpotId(spot.id)}
                    onClick={() => {
                      setActiveSpotId(spot.id);
                      setModalSpot(spot);
                    }}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-left backdrop-blur-md ${
                      isActive
                        ? "bg-card/90 border-primary/50 shadow-xl ring-1 ring-primary/30 -translate-x-1"
                        : "bg-card/60 border-border/60 hover:bg-card/85 hover:border-border hover:-translate-x-0.5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-primary">
                        {`${spot.number} • ${spot.badge}`}
                      </span>
                      <Icon className="size-3.5 text-primary" />
                    </div>
                    <h3 className="text-sm font-bold font-sans text-foreground">
                      {spot.title}
                    </h3>
                    <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">
                      {spot.bengali}
                    </p>
                    <p className="text-xs font-sans text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                      {spot.description}
                    </p>
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-border/40 text-[11px] font-mono">
                      <span className="font-bold text-foreground">
                        {spot.statValue}
                      </span>
                      <span className="text-primary hover:underline flex items-center gap-1">
                        Read Story <ArrowRight className="size-2.5" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="xl:hidden w-full max-w-2xl mx-auto grid grid-cols-2 gap-2.5 sm:gap-3 py-3 z-20">
          {STORY_SPOTS.map((spot) => {
            const isActive = activeSpotId === spot.id;
            const Icon = spot.icon;

            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => {
                  setActiveSpotId(spot.id);
                  setModalSpot(spot);
                }}
                className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer backdrop-blur-md ${
                  isActive
                    ? "bg-card/90 border-primary/50 shadow-md ring-1 ring-primary/30"
                    : "bg-card/60 border-border/60 hover:bg-card/80"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono font-bold text-primary">
                    {spot.number}
                  </span>
                  <Icon className="size-3 text-primary" />
                </div>
                <div className="text-xs font-bold font-sans text-foreground truncate">
                  {spot.title}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  {spot.statValue} • Tap to view
                </div>
              </button>
            );
          })}
        </div>

        <div className="relative z-30 w-full flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 pb-2">
          <motion.div
            style={{ opacity: labelOpacity, x: labelLeftX }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <Button
              asChild
              className="group rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95 h-auto"
            >
              <Link href="/booking">
                <span>Book Consultation</span>
                <ArrowUpRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>

            <Link
              href="#atelier-works"
              className="inline-flex items-center text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase text-foreground/80 hover:text-primary underline underline-offset-4 decoration-foreground/30 hover:decoration-primary transition-all cursor-pointer py-2"
            >
              Explore Works ↓
            </Link>
          </motion.div>

          <motion.div
            style={{ opacity: labelOpacity, x: labelRightX }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center sm:items-end text-center sm:text-right"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-primary font-bold tracking-widest uppercase">
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

      <Dialog
        open={modalSpot !== null}
        onOpenChange={(open) => {
          if (!open) setModalSpot(null);
        }}
      >
        <DialogContent className="max-w-lg p-6 sm:p-8 rounded-3xl bg-background/95 backdrop-blur-xl border border-border shadow-2xl">
          {modalSpot && (
            <div className="flex flex-col gap-4">
              <DialogHeader>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border-primary/20 text-[10px] font-mono uppercase tracking-wider text-primary"
                  >
                    <Sparkles className="size-2.5 text-primary" />
                    <span>{modalSpot.badge}</span>
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground">
                    {modalSpot.number} / 04
                  </span>
                </div>

                <DialogTitle className="text-2xl sm:text-3xl font-heading font-black text-foreground">
                  {modalSpot.title}
                </DialogTitle>
                <DialogDescription className="text-xs font-mono text-primary uppercase tracking-wider">
                  {modalSpot.bengali} • {modalSpot.subtitle}
                </DialogDescription>
              </DialogHeader>

              <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                <p className="font-serif italic text-sm sm:text-base text-foreground/90 leading-relaxed">
                  &ldquo;{modalSpot.quote}&rdquo;
                </p>
              </div>

              <div className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed flex flex-col gap-3">
                <p>{modalSpot.details}</p>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-card border border-border/80">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {modalSpot.statLabel}
                  </div>
                  <div className="text-xl sm:text-2xl font-heading font-black text-foreground">
                    {modalSpot.statValue}
                  </div>
                </div>

                <Button
                  asChild
                  size="sm"
                  className="rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-mono text-xs uppercase tracking-wider px-5"
                >
                  <Link href="/booking">
                    <span>Consult</span>
                    <ArrowUpRight className="size-3 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
