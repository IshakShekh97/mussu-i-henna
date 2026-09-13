"use client";

import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  detail: string;
  bengali: string;
  image: string;
  link: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "bengali-bridal",
    title: "Royal Biye Bridal",
    category: "Sacred Ceremony",
    detail: "Kolka & Shankha-Pola",
    bengali: "বাঙালি রাজকীয় ব্রাইডাল",
    image: "/services/bengali-bridal.jpg",
    link: "/booking?service=bridal",
  },
  {
    id: "gaye-holud",
    title: "Gaye Holud Utsav",
    category: "Festive Celebration",
    detail: "Floral Vines & Jaali",
    bengali: "গায়ে হলুদ ও উৎসব",
    image: "/services/gaye-holud.jpg",
    link: "/booking?service=gaye-holud",
  },
  {
    id: "bou-bhat",
    title: "Bou Bhat Reception",
    category: "Post-Wedding Elegance",
    detail: "Deep Mahogany Stain",
    bengali: "বউভাত অভ্যর্থনা",
    image: "/services/bou-bhat.jpg",
    link: "/booking?service=bou-bhat",
  },
  {
    id: "kolka-studio",
    title: "Kolka Design Trials",
    category: "Private Consultation",
    detail: "1-on-1 Motif & Patch Test",
    bengali: "কোলকা ড্রাফটিং ও ট্রায়াল",
    image: "/services/kolka-studio.jpg",
    link: "/booking?service=trials",
  },
  {
    id: "organic-cones",
    title: "Organic Cones Atelier",
    category: "Artisan Batches",
    detail: "100% Sojat & Nilgiri",
    bengali: "খাঁটি অর্গানিক কোণ",
    image: "/products/henna-cones.png",
    link: "/shop?category=cones",
  },
];

export default function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [displayedIdx, setDisplayedIdx] = useState<number>(0);
  const listRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Smooth mouse-follow coordinates for the floating preview on desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 22, stiffness: 200, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotate = useTransform(smoothX, [0, 1600], [-5, 5]);

  // Section opening and closing scroll animation
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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!listRef.current) return;
    const rect = listRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleRowEnter = (idx: number) => {
    setActiveIdx(idx);
    setDisplayedIdx(idx);
  };

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
        {/* ── Section Header (Bold branding matching ProductsSection) ── */}
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
                <span>{"CEREMONIAL ATELIER | 03"}</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground uppercase"
              >
                CEREMONIAL SERVICES
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.65, delay: 0.14 }}
                className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl font-sans"
              >
                Handcrafted henna rituals honouring generations of Bengali
                bridal traditions, from Gaye Holud vibrancy to Bou Bhat
                elegance.
              </motion.p>
            </div>

            {/* ── Direct Link to Booking Consultation ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center"
            >
              <Link
                href="/booking"
                className="group inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-secondary hover:bg-foreground hover:text-background px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold shadow-xs backdrop-blur-xl transition-all duration-200 cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Interactive Editorial List Container ── */}
        <section
          ref={listRef}
          aria-label="Ceremonial Services"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActiveIdx(null)}
          className="relative w-full border-t border-border/40"
        >
          {/* ── Mouse-Following Floating Image (Desktop Experience) ── */}
          <motion.div
            style={{
              left: smoothX,
              top: smoothY,
              x: "-50%",
              y: "-50%",
              rotate,
            }}
            animate={{
              opacity: activeIdx !== null ? 1 : 0,
              scale: activeIdx !== null ? 1 : 0.82,
            }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute z-40 hidden md:block w-80 lg:w-96 aspect-4/3 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-white/20 bg-neutral-900"
          >
            <Image
              src={SERVICES[displayedIdx].image}
              alt={SERVICES[displayedIdx].title}
              fill
              sizes="400px"
              className="object-cover transition-opacity duration-200"
              priority
            />
          </motion.div>

          {/* ── Service Rows with Context Thumbnails ── */}
          {SERVICES.map((service, idx) => {
            const isHovered = activeIdx === idx;
            const hasHover = activeIdx !== null;

            return (
              <Link
                key={service.id}
                href={service.link}
                onMouseEnter={() => handleRowEnter(idx)}
                className={`group relative flex items-center justify-between border-b border-border/30  py-4 sm:py-5 md:py-6 px-3 sm:px-6 md:px-8 transition-all duration-300 ${
                  isHovered
                    ? "bg-primary/4 z-10"
                    : hasHover
                      ? "opacity-40"
                      : "opacity-100 hover:bg-foreground/2"
                }`}
              >
                {/* Left: Number + Thumbnail + Service Title & Bengali Script */}
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6 min-w-0">
                  <span className="font-mono text-xs sm:text-sm text-muted-foreground/60 w-5 sm:w-6 shrink-0 md:hidden">
                    0{idx + 1}
                  </span>

                  {/* Context Thumbnail (Small-scale visual preview) */}
                  <div className="relative size-12 sm:size-14 md:size-16 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border border-border/50 shadow-xs group-hover:scale-105 group-hover:border-primary/40 group-hover:shadow-md transition-all duration-300 bg-muted/20 lg:hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Title & Diverse Typographic Hierarchy */}
                  <div className="flex flex-col min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                      <h3 className="font-heading text-base sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors truncate sm:whitespace-normal">
                        {service.title}
                      </h3>
                      <span className="text-xs sm:text-sm font-sans text-muted-foreground/80 group-hover:text-foreground/80 transition-colors">
                        ({service.bengali})
                      </span>
                    </div>

                    {/* Mobile-only category pill for quick context */}
                    <div className="flex sm:hidden items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono tracking-wider uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                        {service.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Metadata & Action CTA */}
                <div className="flex items-center justify-end gap-4 sm:gap-8 md:gap-12 shrink-0">
                  <div className="hidden sm:flex flex-col items-end text-right">
                    <span className="text-xs font-mono tracking-wider uppercase text-foreground/80 font-medium">
                      {service.category}
                    </span>
                    <span className="text-[11px] font-sans text-muted-foreground">
                      {service.detail}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-foreground group-hover:text-primary transition-colors">
                    <span className="hidden sm:inline">Reserve</span>
                    <span className="size-8 sm:size-9 rounded-full border border-border/70 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-200 shadow-xs">
                      <ArrowUpRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </section>
      </motion.div>
    </section>
  );
}
