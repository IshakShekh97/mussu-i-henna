"use client";

import {
  ArrowUpRight,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Globe,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";

interface PackageOption {
  id: string;
  title: string;
  bengali: string;
  price: string;
  duration: string;
  coverage: string;
  highlights: string[];
}

const PACKAGES: PackageOption[] = [
  {
    id: "bridal",
    title: "Bridal Mehendi",
    bengali: "বাঙালি রাজকীয় ব্রাইডাল",
    price: "₹12,500",
    duration: "4–6 Hours",
    coverage: "Elbow to palm + both feet",
    highlights: [
      "Custom Bengali Kolka & Shankha-Pola motifs",
      "Guaranteed 48-Hour Mahogany stain",
      "Complimentary Botanical Patch-Test Kit",
    ],
  },
  {
    id: "guest_party",
    title: "Guest / Party Mehendi",
    bengali: "অতিথি ও ব্রাইডাল পার্টি",
    price: "₹8,500",
    duration: "3–4 Hours",
    coverage: "Sakhis, Borjatri & Family Troupe",
    highlights: [
      "Express artistic motifs for guest groups",
      "Fresh Bengal Lawsonia & steam-distilled oils",
      "Coordinated ceremonial timing & touch-up cones",
    ],
  },
  {
    id: "festive_occasion",
    title: "Festive / Occasion Mehendi",
    bengali: "উৎসব ও স্পেশাল অনুষ্ঠান",
    price: "₹6,200",
    duration: "2–3 Hours",
    coverage: "Both wrists, palms & festive jaal",
    highlights: [
      "Ideal for Gaye Holud, Bou Bhat & Pujo celebrations",
      "Intricate floral vines & sacred Alpona touches",
      "100% natural, zero synthetic chemicals or PPD",
    ],
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "When should bridal henna be applied?",
    answer:
      "48 hours prior to the wedding vows. This allows pure Lawsonia paste to fully oxidize to its deepest mahogany tone.",
  },
  {
    question: "Are cones chemical-free & pregnancy safe?",
    answer:
      "Yes. Triple-sifted Bengal Lawsonia leaves and Nilgiri eucalyptus oils. 100% organic, zero synthetic dyes or PPD.",
  },
  {
    question: "Can we design custom couple motifs?",
    answer:
      "Every bridal set is bespoke, featuring hidden couple initials, family dates, and sacred Shankha-Pola motifs.",
  },
];

export default function BookingDemoSection() {
  const [selectedId, setSelectedId] = useState<string>("bridal");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const selectedPkg = PACKAGES.find((p) => p.id === selectedId) ?? PACKAGES[0];

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
      aria-label="Atelier Reservations Demo"
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
        {/* ── Compact Editorial Header ── */}
        <div className="w-full mb-8 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono tracking-wider uppercase mb-2"
            >
              <Sparkles className="size-3" />
              <span>ATELIER RESERVATIONS | 04</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground uppercase"
            >
              RESERVE YOUR CEREMONIAL DATE
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-xs sm:text-sm text-muted-foreground max-w-md font-sans leading-relaxed"
          >
            Strictly limited to 12 bespoke brides per month to maintain
            uncompromised batch quality &amp; detailed handcrafting.
          </motion.p>
        </div>

        {/* ── Compact Bento Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 w-full items-stretch">
          {/* ── Left Bento: Interactive Ritual & Experience Demo (lg:col-span-7) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-3xl border border-border/70 bg-card/85 backdrop-blur-md p-5 sm:p-7 flex flex-col justify-between shadow-xs"
          >
            <div>
              {/* Step indicator header */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <span className="flex size-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[11px] font-mono tracking-widest uppercase text-primary font-bold">
                    STEP 01 — SELECT RITUAL
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-muted/70 text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
                  SEASON 2026—2027
                </span>
              </div>

              {/* Package Selector Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4">
                {PACKAGES.map((pkg) => {
                  const isSelected = selectedId === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedId(pkg.id)}
                      className={`relative rounded-2xl p-3.5 text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary/30"
                          : "border-border/60 bg-background/50 hover:border-border hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`size-3.5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-border bg-background"
                          }`}
                        >
                          {isSelected && (
                            <span className="size-1 rounded-full bg-primary-foreground" />
                          )}
                        </span>
                        <span className="text-[10px] font-sans text-muted-foreground">
                          {pkg.bengali}
                        </span>
                      </div>
                      <div className="font-heading text-xs font-bold text-foreground leading-tight">
                        {pkg.title}
                      </div>
                      <div className="text-[11px] font-mono font-semibold text-primary mt-1.5">
                        {pkg.price}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Animated Package Preview Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPkg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24 }}
                  className="rounded-2xl border border-border/50 bg-muted/30 p-4 sm:p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-border/40 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-primary" />
                      <span className="font-sans font-medium text-foreground">
                        {selectedPkg.duration}
                      </span>
                    </div>
                    <div className="text-[11px] font-sans">
                      Coverage:{" "}
                      <span className="font-semibold text-foreground">
                        {selectedPkg.coverage}
                      </span>
                    </div>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-foreground">
                    {selectedPkg.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="size-3.5 text-primary shrink-0" />
                        <span className="text-[11px] sm:text-xs text-muted-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTAs Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-5 mt-4 border-t border-border/40">
              <Link
                href={`/booking?package=${encodeURIComponent(selectedPkg.id)}`}
                className="w-full sm:w-auto flex-1 group inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              >
                <span>Proceed to Reservation Form</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* ── Right Bento Stack: Concierge Card & FAQs (lg:col-span-5) ── */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5 justify-between">
            {/* Studio Flagship & WhatsApp Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-3xl border border-border/70 bg-card/85 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-2">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase text-primary font-bold">
                    <Building2 className="size-3" />
                    <span>STUDIO FLAGSHIP</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    BY APPOINTMENT ONLY
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground mt-1">
                  Park Street Atelier &amp; Lounge
                </h3>
                <p className="text-xs text-muted-foreground font-sans mt-1 flex items-start gap-1.5">
                  <MapPin className="size-3 text-primary shrink-0 mt-0.5" />
                  <span>
                    Flat 4B, Camac Heritage Mansions, Park Street, Kolkata
                  </span>
                </p>

                <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between text-[11px] font-sans text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Globe className="size-3 text-primary" />
                    <span>Destination Bridal Travel</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase text-primary font-semibold tracking-wider">
                    GLOBAL CONCIERGE
                  </span>
                </div>
              </div>

              <a
                href="https://wa.me/919830000000?text=Hello%20Mussu%2C%20I%20would%20like%20to%20inquire%20about%20bridal%20mehndi%20booking%20dates."
                target="_blank"
                rel="noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#160B0F] hover:bg-primary text-white px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              >
                <MessageCircle className="size-3.5 text-emerald-400" />
                <span>Direct WhatsApp Concierge</span>
              </a>
            </motion.div>

            {/* Compact FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-3xl border border-border/70 bg-card/85 backdrop-blur-md p-5 sm:p-6 shadow-xs flex-1 flex flex-col justify-center"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-[0.2em] uppercase text-primary font-bold mb-3">
                <Calendar className="size-3" />
                <span>CEREMONIAL FAQ</span>
              </div>

              <div className="flex flex-col divide-y divide-border/40">
                {FAQS.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={faq.question}
                      className="py-2.5 first:pt-0 last:pb-0"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-2 text-left font-sans text-xs font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`size-3.5 text-muted-foreground transition-transform duration-300 shrink-0 ${
                            isOpen ? "rotate-180 text-primary" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <p className="pt-1.5 text-[11px] sm:text-xs font-sans text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
