"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Sparkles, Star, ArrowUpRight } from "lucide-react";

function MagneticCTA({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.32);
    y.set((e.clientY - centerY) * 0.32);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Link
        href={href}
        className="group relative inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/90 hover:bg-primary text-primary-foreground px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold shadow-[0_10px_30px_-5px_rgba(139,58,43,0.35)] backdrop-blur-2xl transition-all duration-200"
      >
        {children}
      </Link>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100dvh-2.2rem)] md:h-[calc(100dvh-2.5rem)] w-full overflow-hidden flex flex-col justify-between pt-12 sm:pt-14 md:pt-0 pb-0 px-3 sm:px-6 lg:px-8 mx-auto select-none">
      <div className="relative flex-1 flex flex-col items-center justify-between w-full my-0 py-0">
        {/* ── Top Giant Headline: CREATIVE HENNA ── */}
        <div className="relative z-10 w-full text-center flex flex-col items-center pt-2 sm:pt-3 md:pt-2">
          <motion.h1
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-7xl md:text-8xl lg:text-[18rem] font-black tracking-tighter uppercase leading-[0.84] sm:leading-[0.82] text-foreground transition-colors"
          >
            CREATIVE
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative flex items-center justify-center"
          >
            <h2 className="text-7xl md:text-8xl lg:text-[17rem] font-black tracking-tighter uppercase leading-[0.84] sm:leading-[0.82] text-foreground transition-colors">
              HENNA
            </h2>
          </motion.div>

          {/* ── Mobile Call To Action (Placed neatly in the open upper space, never covers the hand) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="flex md:hidden z-30 pointer-events-auto mt-3 sm:mt-4"
          >
            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/95 hover:bg-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold shadow-[0_8px_20px_-4px_rgba(139,58,43,0.35)] backdrop-blur-xl active:scale-95 transition-all"
            >
              <span className="size-1.5 rounded-full bg-primary-foreground animate-pulse" />
              <span>Book Consultation</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* ── Central Hero Hand (Responsive Sizing: Reaches Headline Gracefully On All Devices) ── */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none flex items-end justify-center z-25">
          <motion.div
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.3,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.12,
            }}
            className="relative h-[82vh] sm:h-[70vh] md:h-[78vh] lg:h-[86vh] max-h-240 aspect-568/1024 flex items-end justify-center"
          >
            <Image
              src="/hero-hand.png"
              alt="Mussu Henna Bridal Hand Art"
              fill
              priority
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 55vw, 620px"
              className="object-contain object-bottom drop-shadow-[0_25px_50px_rgba(30,16,20,0.22)]"
            />
          </motion.div>
        </div>

        {/* ── Left Floating Card (Minimal Modern Glassmorphism) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -35, y: 15 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: -25, y: 10 }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.35,
          }}
          className="absolute left-1.5 sm:left-4 md:left-8 lg:left-14 top-[28%] xs:top-[30%] sm:top-[32%] md:top-[35%] z-30 pointer-events-auto"
        >
          <motion.div
            animate={{
              y: [0, -6, 0],
              rotate: [-1.5, 0.5, -1.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.05 }}
            className="w-25 xs:w-[115px] sm:w-36 md:w-44 rounded-2xl border border-white/35 bg-white/15 p-2 xs:p-2.5 sm:p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.35)] backdrop-blur-2xl transition-all duration-300"
          >
            {/* Top row */}
            <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-mono tracking-wider uppercase text-muted-foreground">
              <span>{"01 // BRIDAL"}</span>
              <Sparkles className="size-2.5 sm:size-3.5 text-primary" />
            </div>

            {/* Middle title */}
            <div className="my-1 sm:my-2 text-left">
              <div className="font-heading font-bold text-[11px] xs:text-xs sm:text-sm md:text-base text-foreground leading-snug">
                Bespoke Mehndi
              </div>
              <div className="text-[9px] sm:text-[11px] text-muted-foreground font-sans mt-0.5">
                Bridal Handcraft
              </div>
            </div>

            {/* Bottom tag */}
            <div className="pt-0.5 sm:pt-1 flex items-center">
              <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-mono bg-primary/10 text-primary border border-primary/20">
                100% Organic
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right Floating Card (Bottom Position on Small Screens, Top/Middle on Large Screens) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 35, y: 15 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: 25, y: 10 }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.4,
          }}
          className="absolute right-1.5 sm:right-4 md:right-8 lg:right-14 bottom-[19%] xs:bottom-[20%] sm:bottom-[22%] md:bottom-auto md:top-[37%] z-30 pointer-events-auto"
        >
          <motion.div
            animate={{
              y: [0, 6, 0],
              rotate: [1.5, -0.5, 1.5],
            }}
            transition={{
              duration: 5.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.05 }}
            className="w-25 xs:w-[115px] sm:w-36 md:w-44 rounded-2xl border border-white/35 bg-white/15 p-2 xs:p-2.5 sm:p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.35)] backdrop-blur-2xl transition-all duration-300"
          >
            {/* Top row */}
            <div className="flex items-center justify-between text-[8px] sm:text-[10px] font-mono tracking-wider uppercase text-muted-foreground">
              <span>EST. 2024</span>
              <Star className="size-2.5 sm:size-3.5 fill-primary text-primary" />
            </div>

            {/* Middle title */}
            <div className="my-1 sm:my-2 text-left">
              <div className="font-heading font-bold text-[11px] xs:text-xs sm:text-sm md:text-base text-foreground leading-snug">
                Rich Stain
              </div>
              <div className="text-[9px] sm:text-[11px] text-muted-foreground font-sans mt-0.5">
                Sojat Rajasthani
              </div>
            </div>

            {/* Bottom tag */}
            <div className="pt-0.5 sm:pt-1 flex items-center">
              <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-mono bg-muted/60 text-muted-foreground border border-border/50">
                Guaranteed
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Desktop Floating Magnetic Call to Action (Preserved Exactly on Desktop) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="hidden md:block absolute right-6 md:right-10 lg:right-16 bottom-[20%] sm:bottom-[22%] lg:bottom-[24%] z-30 pointer-events-auto"
        >
          <MagneticCTA href="/booking">
            <span className="size-1.5 rounded-full bg-primary-foreground animate-pulse" />
            <span>Book Consultation</span>
            <ArrowUpRight className="size-3.5 sm:size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticCTA>
        </motion.div>

        {/* ── Bottom Giant Headline: ARTISTRY ── */}
        <div className="relative z-10 w-full text-center pb-1 sm:pb-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full overflow-hidden"
          >
            <h2 className="text-7xl max-sm:mb-5 sm:text-8xl md:text-9xl lg:text-[12.8rem] font-black tracking-tight sm:tracking-tighter uppercase leading-[0.8] text-primary transition-colors drop-shadow-xs">
              ARTISTRY
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
