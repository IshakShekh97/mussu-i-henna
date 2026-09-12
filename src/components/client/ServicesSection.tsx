"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  bengaliTag: string;
  badge: string;
  image: string;
  link: string;
  theme: "dark" | "terracotta" | "light";
}

const SERVICES: ServiceItem[] = [
  {
    id: "bengali-bridal",
    title: "Royal Bengali Bridal Suite",
    subtitle: "Sacred Kolka mandalas & shankha-pola cuffs for Biye & Bou Bhat.",
    bengaliTag: "বাঙালি ব্রাইডাল",
    badge: "Biye & Bou Bhat",
    image: "/services/bengali-bridal.jpg",
    link: "/booking?service=bridal",
    theme: "dark",
  },
  {
    id: "gaye-holud",
    title: "Gaye Holud & Festive Utsav",
    subtitle: "Vibrant floral vines & jaali patterns for bridesmaids and family.",
    bengaliTag: "গায়ে হলুদ উৎসব",
    badge: "Gaye Holud & Party",
    image: "/services/gaye-holud.jpg",
    link: "/booking?service=gaye-holud",
    theme: "terracotta",
  },
  {
    id: "kolka-studio",
    title: "Kolka Trials & Organic Cones",
    subtitle: "1-on-1 bridal motif drafting & fresh handmade Sojat cones.",
    bengaliTag: "খাঁটি অর্গানিক কোণ",
    badge: "Trial & Fresh Cones",
    image: "/services/kolka-studio.jpg",
    link: "/booking?service=trials",
    theme: "light",
  },
];

const METRICS = [
  {
    value: "100%",
    label: "Pure Organic Sojat Lawsonia",
    description: "Zero PPD, zero chemical dye, 100% plant",
  },
  {
    value: "48h",
    label: "Deep Mahogany Stain Peak",
    description: "Cold-press eucalyptus oil dye release",
  },
  {
    value: "12+",
    label: "Years Kolka Craftsmanship",
    description: "Heritage Bengali bridal draftsmanship",
  },
  {
    value: "850+",
    label: "Bengali Brides Adorned",
    description: "Trusted across Kolkata, Dhaka & diaspora",
  },
];

// Helper tilt container matching ProductCard mechanics
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220, mass: 0.1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Entrance opening & Exit closing transforms linked directly to scroll (matching Hero.tsx)
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.78, 0.98],
    [0, 1, 1, 0],
  );
  const sectionScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.78, 0.98],
    [0.92, 1, 1, 0.90],
  );
  const sectionY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.78, 0.98],
    [60, 0, 0, -60],
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 sm:py-14 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden"
    >
      <motion.div
        style={{
          opacity: sectionOpacity,
          scale: sectionScale,
          y: sectionY,
        }}
        className="relative z-10 w-full origin-center"
      >
        {/* ── Section Header (Understated Headline Left + Arrow Controls Right) ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 sm:mb-9">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-primary mb-1.5">
              <Sparkles className="size-3" />
              <span>BENGALI ARTISTRY // 03</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground tracking-tight">
              Ceremonial Suites & Bengali Kolka Artistry
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1 max-w-xl">
              From sacred Biye & Gaye Holud ceremonies to fresh handmade organic cones, crafted for Bengali brides.
            </p>
          </div>

          {/* Minimal Carousel Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/booking"
              aria-label="Previous service"
              className="size-9 sm:size-10 rounded-full border border-border/70 bg-white/70 dark:bg-card/75 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-200 active:scale-95"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <Link
              href="/booking"
              aria-label="Next service"
              className="size-9 sm:size-10 rounded-full border border-border/70 bg-white/70 dark:bg-card/75 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-200 active:scale-95"
            >
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* ── 3 Featured Service Cards with Authentic Images ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
          {SERVICES.map((service) => {
            const isDark = service.theme === "dark";
            const isTerracotta = service.theme === "terracotta";

            const cardBg = isDark
              ? "bg-[#18110F] text-white border-white/10 shadow-lg"
              : isTerracotta
              ? "bg-primary text-white border-white/20 shadow-lg"
              : "bg-white/85 dark:bg-card/85 text-foreground border-border/70 backdrop-blur-xl shadow-lg";

            const btnBg = isDark
              ? "bg-white/15 hover:bg-white text-white hover:text-neutral-900"
              : isTerracotta
              ? "bg-white/20 hover:bg-white text-white hover:text-primary"
              : "bg-foreground hover:bg-primary text-background hover:text-primary-foreground";

            const subtitleColor = isDark
              ? "text-neutral-300"
              : isTerracotta
              ? "text-white/85"
              : "text-muted-foreground";

            return (
              <TiltCard
                key={service.id}
                className={`group relative flex flex-col justify-between rounded-[2rem] p-4 sm:p-5 border transition-shadow duration-300 ${cardBg}`}
              >
                {/* ── Card Image Container with Subtle Zoom on Hover ── */}
                <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 bg-black/10">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlay for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-white tracking-wide border border-white/20">
                      {service.badge}
                    </span>
                  </div>

                  {/* Bottom Bengali Tag */}
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-white/85 dark:bg-black/75 backdrop-blur-md text-[10px] font-semibold text-neutral-900 dark:text-white font-sans shadow-xs">
                      {service.bengaliTag}
                    </span>
                  </div>
                </div>

                {/* ── Aligned Content & Circular Action Button ── */}
                <div
                  className={`relative z-10 flex items-end justify-between w-full pt-2 border-t ${
                    isDark
                      ? "border-white/10"
                      : isTerracotta
                      ? "border-white/20"
                      : "border-border/50"
                  }`}
                >
                  <div className="pr-3">
                    <h3 className="text-base sm:text-lg font-bold font-heading tracking-tight leading-snug">
                      {service.title}
                    </h3>
                    <p className={`text-xs font-sans mt-0.5 line-clamp-1 ${subtitleColor}`}>
                      {service.subtitle}
                    </p>
                  </div>

                  <Link
                    href={service.link}
                    aria-label={`Book ${service.title}`}
                    className={`size-9 sm:size-10 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 hover:scale-105 active:scale-95 ${btnBg}`}
                  >
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* ── Bottom Metrics Row (Clean, Compact, Reference-Faithful) ── */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {METRICS.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <ArrowUp className="size-4 sm:size-5 text-primary stroke-[2.5]" />
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-heading">
                  {metric.value}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-foreground mt-1">
                {metric.label}
              </span>
              <span className="text-[11px] text-muted-foreground mt-0.5 font-sans">
                {metric.description}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
