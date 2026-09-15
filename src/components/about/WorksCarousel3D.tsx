"use client";

import {
  ChevronLeft,
  ChevronRight,
  Flower2,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { WORKS } from "@/data/works";

export default function WorksCarousel3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.82, 0.98],
    [0, 1, 1, 0],
  );
  const sectionScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.82, 0.98],
    [0.94, 1, 1, 0.94],
  );
  const sectionY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.82, 0.98],
    [45, 0, 0, -45],
  );

  const total = WORKS.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <section
      id="atelier-works"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden"
    >
      <motion.div
        style={{
          opacity: sectionOpacity,
          scale: sectionScale,
          y: sectionY,
        }}
        className="relative z-10 w-full origin-center flex flex-col items-center"
      >
        <div className="w-full max-w-4xl text-center flex flex-col items-center mb-12 sm:mb-16">
          <Badge
            variant="outline"
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border-primary/20 text-primary text-xs font-mono tracking-wider uppercase mb-4"
          >
            <Sparkles className="size-3 text-primary" />
            <span>THE ATELIER COLLECTION | 02</span>
          </Badge>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-tight text-foreground"
          >
            Curated Ceremonial Works &amp;{" "}
            <span className="font-serif italic font-normal text-primary">
              Living Heirloom Art
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.14 }}
            className="text-sm sm:text-base text-muted-foreground mt-3 max-w-xl font-sans leading-relaxed"
          >
            A continuous 3D panorama of bespoke Bengali bridal adornments, Gaye
            Holud celebrations, and fine Kolka trials. Swipe or use controls to
            explore.
          </motion.p>
        </div>

        <div className="relative w-full h-105 sm:h-120 md:h-135 flex items-center justify-center overflow-visible">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x > 60 || info.velocity.x > 250) {
                handlePrev();
              } else if (info.offset.x < -60 || info.velocity.x < -250) {
                handleNext();
              }
            }}
            className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing [perspective:1400px] [transform-style:preserve-3d]"
          >
            {WORKS.map((work, index) => {
              let offset = index - activeIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              const isVisible = Math.abs(offset) <= 3;
              if (!isVisible) return null;

              const isCenter = offset === 0;

              const rotateY = offset * -16;
              const translateX = offset * 260;
              const translateZ = -Math.abs(offset) * 85;
              const scale = 1 - Math.abs(offset) * 0.08;
              const opacity =
                Math.abs(offset) === 0
                  ? 1
                  : Math.abs(offset) === 1
                    ? 0.92
                    : Math.abs(offset) === 2
                      ? 0.65
                      : 0.35;
              const zIndex = 30 - Math.abs(offset);

              return (
                <motion.div
                  key={work.id}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY,
                    scale,
                    opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 24,
                    mass: 0.8,
                  }}
                  style={{
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => {
                    if (!isCenter) {
                      setActiveIndex(index);
                    }
                  }}
                  className={`absolute w-56 sm:w-64 md:w-72 aspect-3/4 rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300 border ${
                    isCenter
                      ? "border-primary/40 shadow-[0_25px_60px_-15px_rgba(139,58,43,0.35)] cursor-default"
                      : "border-border/60 hover:border-primary/30 cursor-pointer"
                  } bg-card`}
                >
                  <Image
                    src={work.image}
                    alt={work.title}
                    width={work.width}
                    height={work.height}
                    priority={Math.abs(offset) <= 1}
                    sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-between p-4 sm:p-5 pointer-events-none leading-normal">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/60 text-white border border-white/20 backdrop-blur-md">
                        <span className="size-1 rounded-full bg-primary" />
                        <span>{work.category}</span>
                      </span>
                      <span className="text-[10px] font-mono text-white/70">
                        {index + 1}/{total}
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
              );
            })}
          </motion.div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handlePrev}
            aria-label="Previous artwork"
            className="absolute left-2 sm:left-6 md:left-10 z-40 size-11 sm:size-12 rounded-full border-border/60 bg-background/80 hover:bg-foreground hover:text-background text-foreground backdrop-blur-xl shadow-lg cursor-pointer active:scale-95"
          >
            <ChevronLeft className="size-5" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleNext}
            aria-label="Next artwork"
            className="absolute right-2 sm:right-6 md:right-10 z-40 size-11 sm:size-12 rounded-full border-border/60 bg-background/80 hover:bg-foreground hover:text-background text-foreground backdrop-blur-xl shadow-lg cursor-pointer active:scale-95"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-8 mb-16">
          {WORKS.map((work, idx) => (
            <button
              key={work.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Jump to ${work.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx
                  ? "w-8 bg-primary"
                  : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>

        <div className="w-full max-w-5xl rounded-3xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
            <div className="flex flex-col items-start text-left">
              <div className="size-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-3">
                <Flower2 className="size-5" />
              </div>
              <h4 className="font-heading font-bold text-base sm:text-lg text-foreground tracking-tight">
                100% Bengal Lawsonia
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1 leading-relaxed">
                Formulated with triple-sifted organic Bengal Lawsonia leaves and
                steam-distilled Nilgiri eucalyptus oils for rich 48-hour
                mahogany stain.
              </p>
            </div>

            <div className="flex flex-col items-start text-left">
              <div className="size-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-3">
                <HeartHandshake className="size-5" />
              </div>
              <h4 className="font-heading font-bold text-base sm:text-lg text-foreground tracking-tight">
                Bespoke Bengali Kolka
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1 leading-relaxed">
                Heirloom bridal adornments tailored to ancestral motifs,
                Shankha-Pola aesthetics, and Gaye Holud ceremonies.
              </p>
            </div>

            <div className="flex flex-col items-start text-left">
              <div className="size-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-3">
                <ShieldCheck className="size-5" />
              </div>
              <h4 className="font-heading font-bold text-base sm:text-lg text-foreground tracking-tight">
                Private Atelier Rituals
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1 leading-relaxed">
                Intimate 1-on-1 consultations, custom motif trials, and
                complimentary hypoallergenic patch-testing for every bride.
              </p>
            </div>
          </div>

          <Separator className="my-2 bg-border/40" />

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="font-serif italic text-base sm:text-lg text-foreground/90 max-w-xl">
                &ldquo;Every bride&apos;s hands carry a sacred generational
                blessing. My passion is drafting that love into deep mahogany
                art.&rdquo;
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <span className="text-xs font-mono tracking-widest uppercase text-primary font-bold">
                  MUSSU SHEKH
                </span>
                <span className="text-xs text-muted-foreground font-sans">
                  — Master Henna Artist &amp; Founder
                </span>
              </div>
            </div>

            <Button
              asChild
              className="group rounded-full border border-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-xs sm:text-sm font-semibold shadow-md transition-all shrink-0 hover:scale-105 active:scale-95 cursor-pointer h-auto"
            >
              <Link href="/booking">
                <span>Book Bridal Consultation</span>
                <Sparkles className="size-3.5 transition-transform group-hover:rotate-12 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
