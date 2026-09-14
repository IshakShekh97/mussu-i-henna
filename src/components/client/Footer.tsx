"use client";

import { ArrowUpRight, Check, Mail, Send, Sparkles } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHoveredBadge, setIsHoveredBadge] = useState(false);

  const footerRef = useRef<HTMLElement>(null);

  // Smooth scroll-linked spring transforms for fluid entrance
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.15,
  });

  const wordmarkY = useTransform(smoothProgress, [0, 1], [40, 0]);
  const wordmarkScale = useTransform(smoothProgress, [0, 1], [0.96, 1]);
  const wordmarkOpacity = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0.65, 0.9, 1],
  );
  const contentY = useTransform(smoothProgress, [0, 1], [24, 0]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2500);
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full pt-10 sm:pt-14 pb-0 select-none overflow-hidden"
    >
      {/* ── Main Deep Luxury Card Container (Zero Shadows, Fluid Responsive Curves) ── */}
      <div className="relative w-full bg-[#160B0F] text-[#FBF7F0] rounded-t-[2.5rem] sm:rounded-t-[3.5rem] md:rounded-t-[4.5rem] border-t border-white/10 overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-4 sm:pb-6 px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20">
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 w-full flex flex-col justify-between"
        >
          {/* ── Top Grid: Navigation Columns + Interactive Newsletter ── */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-10 sm:pb-14 border-b border-white/10">
            {/* Nav Column 1: SHOP (md:col-span-2) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="col-span-1 md:col-span-2 flex flex-col"
            >
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-primary font-bold mb-4">
                SHOP
              </span>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm font-sans text-white/70">
                <li>
                  <Link
                    href="/shop?category=cones"
                    className="group inline-flex items-center gap-1 hover:text-white transition-colors duration-200"
                  >
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      Bengal Cones
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?category=care&q=balm"
                    className="group inline-flex items-center gap-1 hover:text-white transition-colors duration-200"
                  >
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      Mahogany Balm
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?category=care&q=oil"
                    className="group inline-flex items-center gap-1 hover:text-white transition-colors duration-200"
                  >
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      Nilgiri Pure Oil
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?category=kits"
                    className="group inline-flex items-center gap-1 hover:text-white transition-colors duration-200"
                  >
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      Bridal Kolka Kit
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    className="group inline-flex items-center gap-1 text-primary hover:text-primary-foreground/90 font-medium transition-colors duration-200 pt-1"
                  >
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      Explore All
                    </span>
                    <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Nav Column 2: ATELIER (md:col-span-2) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-1 md:col-span-2 flex flex-col"
            >
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-primary font-bold mb-4">
                ATELIER
              </span>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm font-sans text-white/70">
                <li>
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-1 hover:text-white transition-colors duration-200"
                  >
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      About Mussu
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking?occasion=bridal"
                    className="group inline-flex items-center gap-1 hover:text-white transition-colors duration-200"
                  >
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      Bridal Mehendi
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking?occasion=guest_party"
                    className="group inline-flex items-center gap-1 hover:text-white transition-colors duration-200"
                  >
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      Guest / Party
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking?occasion=festive_occasion"
                    className="group inline-flex items-center gap-1 hover:text-white transition-colors duration-200"
                  >
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      Festive / Occasion
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about#atelier-works"
                    className="group inline-flex items-center gap-1 text-primary hover:text-primary-foreground/90 font-medium transition-colors duration-200 pt-1"
                  >
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      3D Portfolio
                    </span>
                    <ArrowUpRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Nav Column 3: CARE & PROTOCOL (md:col-span-2) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="col-span-1 md:col-span-2 flex flex-col"
            >
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-primary font-bold mb-4">
                CARE
              </span>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm font-sans text-white/70">
                <li>
                  <Link
                    href="/track-order"
                    className="group inline-flex items-center gap-1 hover:text-white transition-colors duration-200"
                  >
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      Track Order
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking?quotation=bridal"
                    className="group inline-flex items-center gap-1 hover:text-white transition-colors duration-200"
                  >
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      Request Quotation
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-1 hover:text-white transition-colors duration-200"
                  >
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      48H Stain Guide
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/registration"
                    className="group inline-flex items-center gap-1 hover:text-white transition-colors duration-200"
                  >
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      Registration
                    </span>
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Column 4: NEWSLETTER SIGNUP & SOCIALS (md:col-span-6) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-2 md:col-span-6 flex flex-col items-start md:items-end md:text-right"
            >
              <div className="w-full max-w-md flex flex-col items-start md:items-end">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="size-3 text-primary" />
                  <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-white/90 font-bold">
                    NEWSLETTER SIGNUP
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/60 font-sans mb-4 leading-relaxed">
                  Join the atelier circle for fresh harvest batches, bridal
                  booking announcements, and traditional aftercare rituals.
                </p>

                {/* Flat Pill Input Form (Zero Shadows, Fluid Focus State) */}
                <form
                  onSubmit={handleSubscribe}
                  className="w-full relative flex items-center bg-white/95 text-neutral-900 rounded-full p-1.5 pl-4 sm:pl-5 border border-white/20 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300"
                >
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    disabled={isSubscribed}
                    className="w-full bg-transparent border-0 text-xs sm:text-sm font-sans text-neutral-900 placeholder:text-neutral-500 focus-visible:ring-0 shadow-none pr-2 h-auto py-1"
                  />

                  <Button
                    type="submit"
                    disabled={isSubscribed}
                    className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 shrink-0 flex items-center gap-1.5 cursor-pointer h-auto ${
                      isSubscribed
                        ? "bg-emerald-600 text-white hover:bg-emerald-600"
                        : "bg-[#160B0F] hover:bg-primary text-white"
                    }`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isSubscribed ? (
                        <motion.span
                          key="subscribed"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="inline-flex items-center gap-1.5"
                        >
                          <Check className="size-3.5" />
                          <span>Joined</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="inline-flex items-center gap-1"
                        >
                          <span>Join</span>
                          <Send className="size-3" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </form>

                {/* Social Icons Row (Zero Shadows, Fluid Spring Hover Physics) */}
                <div className="flex items-center gap-3 mt-5">
                  <motion.a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    whileHover={{ y: -3, scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    className="size-9 rounded-full bg-white/10 hover:bg-primary text-white/80 hover:text-white transition-colors duration-200 flex items-center justify-center backdrop-blur-md cursor-pointer"
                  >
                    <InstagramIcon className="size-4" />
                  </motion.a>
                  <motion.a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    whileHover={{ y: -3, scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    className="size-9 rounded-full bg-white/10 hover:bg-primary text-white/80 hover:text-white transition-colors duration-200 flex items-center justify-center backdrop-blur-md cursor-pointer"
                  >
                    <FacebookIcon className="size-4" />
                  </motion.a>
                  <motion.a
                    href="mailto:contact@mussuhenna.com"
                    aria-label="Email"
                    whileHover={{ y: -3, scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    className="size-9 rounded-full bg-white/10 hover:bg-primary text-white/80 hover:text-white transition-colors duration-200 flex items-center justify-center backdrop-blur-md cursor-pointer"
                  >
                    <Mail className="size-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Mid-Row: Provenance & Copyright (Image 1 Style, sits cleanly above badge) ── */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 pb-2 text-[11px] font-mono uppercase tracking-wider text-white/50">
            <span>© 2026 Mussu Henna Atelier. All rights reserved.</span>
            <span>Handcrafted in Bengal ✦ 100% Pure Lawsonia</span>
          </div>

          {/* ── Center Rotating Sticker Seal Badge (Zero Shadows, Fluid Continuous Float & Upright Center Text) ── */}
          <div className="relative w-full flex justify-center -mb-8 sm:-mb-10 md:-mb-12 z-30 pointer-events-auto mt-2 sm:mt-4">
            <motion.div
              onMouseEnter={() => setIsHoveredBadge(true)}
              onMouseLeave={() => setIsHoveredBadge(false)}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.12, rotate: 6 }}
              whileTap={{ scale: 0.94 }}
              className="relative size-24 sm:size-28 md:size-32 rounded-full bg-[#D4A373] text-[#160B0F] border-2 border-white/30 flex items-center justify-center cursor-pointer select-none shrink-0"
            >
              {/* Outer Rotating SVG Text Ring */}
              <motion.svg
                viewBox="0 0 160 160"
                aria-label="Mussu Henna Atelier Seal"
                animate={{ rotate: 360 }}
                transition={{
                  duration: isHoveredBadge ? 7 : 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 w-full h-full pointer-events-none p-1.5"
              >
                <title>Mussu Henna Atelier Seal</title>
                <path
                  id="footerBadgeCircle"
                  d="M 80, 80 m -56, 0 a 56,56 0 1,1 112,0 a 56,56 0 1,1 -112,0"
                  fill="none"
                />
                <text className="text-[10.5px] font-mono font-bold uppercase tracking-[0.24em] fill-[#160B0F]">
                  <textPath href="#footerBadgeCircle" startOffset="0%">
                    ✦ MUSSU HENNA ✦ 100% ORGANIC ✦ EST. 2024
                  </textPath>
                </text>
              </motion.svg>

              {/* Center Seal Text Remains Fixed Upright (Never Upside Down) */}
              <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-base sm:text-lg font-heading font-black tracking-tighter text-[#160B0F] leading-none">
                  মুসু
                </span>
                <span className="text-[8px] font-mono uppercase tracking-widest text-[#160B0F]/80 mt-0.5 font-bold">
                  ATELIER
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── GIGANTIC Edge-to-Edge Brand Typography (Full Clearance, Zero Shadows, Zero Clipping, Fluid Parallax Scale) ── */}
          <div className="relative w-full flex items-center justify-center pt-6 sm:pt-8 md:pt-10 pb-4 sm:pb-6 leading-none overflow-hidden">
            <motion.h2
              style={{
                opacity: wordmarkOpacity,
                y: wordmarkY,
                scale: wordmarkScale,
              }}
              className="w-full text-center text-[19vw] sm:text-[20vw] md:text-[21vw] font-black tracking-tighter uppercase leading-[0.84] sm:leading-[0.82] select-none text-white block whitespace-nowrap will-change-transform"
            >
              MUSSU
            </motion.h2>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
