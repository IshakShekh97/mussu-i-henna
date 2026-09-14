"use client";

import { Menu, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

interface NavItem {
  id: string;
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "/", name: "Home", href: "/" },
  { id: "/about", name: "About", href: "/about" },
  { id: "/shop", name: "Shop", href: "/shop" },
  { id: "/booking", name: "Booking", href: "/booking" },
  {
    id: "/track-order",
    name: "Track Order",
    href: "/track-order",
  },
  {
    id: "/registration",
    name: "Registration",
    href: "/registration",
  },
];

interface NavbarProps {
  cartCount?: number;
  onCartClick?: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const pathname = usePathname();
  const storeCount = useCartStore((state) => state.totalItems());
  const openCart = useCartStore((state) => state.openCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveCartCount =
    cartCount !== undefined ? cartCount : mounted ? storeCount : 0;
  const effectiveCartClick = onCartClick ?? openCart;

  const routeActiveTabId =
    NAV_ITEMS.find(
      (item) =>
        pathname === item.href ||
        (item.href !== "/" && pathname.startsWith(item.href)),
    )?.id ?? "/";

  const [activeTabId, setActiveTabId] = useState(routeActiveTabId);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [pillStyle, setPillStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  // Sync active tab if route changes (e.g. browser back/forward)
  useEffect(() => {
    setActiveTabId(routeActiveTabId);
  }, [routeActiveTabId]);

  // Keep pill positioned over the active tab, immune to window scroll
  useEffect(() => {
    const updatePill = () => {
      const activeEl = tabRefs.current.get(activeTabId);
      if (activeEl) {
        setPillStyle({
          left: activeEl.offsetLeft,
          top: activeEl.offsetTop,
          width: activeEl.offsetWidth,
          height: activeEl.offsetHeight,
        });
      }
    };

    updatePill();
    window.addEventListener("resize", updatePill);

    const container = navContainerRef.current;
    let resizeObserver: ResizeObserver | null = null;
    if (container && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updatePill);
      resizeObserver.observe(container);
    }

    return () => {
      window.removeEventListener("resize", updatePill);
      resizeObserver?.disconnect();
    };
  }, [activeTabId]);

  // Close mobile menu on click outside or escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    if (pathname) {
      setMobileMenuOpen(false);
    }
  }, [pathname]);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-3 sm:top-5 z-50 w-full px-4 sm:px-6 lg:px-10"
    >
      <div className="mx-auto flex max-w-full items-center justify-between gap-4">
        {/* Left Island: Brand Pill */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-full border border-border/70 bg-card/85 py-1.5 pl-2 pr-4.5 sm:py-2 sm:pl-2.5 sm:pr-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:border-border hover:shadow-md"
          >
            <div className="relative size-7 sm:size-8 rounded-full overflow-hidden shrink-0 border border-primary/20 shadow-xs group-hover:scale-105 transition-transform duration-300 bg-amber-50/50">
              <Image
                src="/logo.webp"
                alt="Mussu Henna"
                width={32}
                height={32}
                priority
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex items-center">
              <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-primary transition-colors group-hover:opacity-90">
                Mussu
              </span>
              <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-foreground ml-1.5 transition-colors group-hover:opacity-90">
                Henna
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Right Islands: Navigation Pill + Action Pill */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          {/* Middle Island: Desktop Navigation Pill */}
          <div className="hidden md:block">
            <div
              ref={navContainerRef}
              className="relative flex items-center gap-2 p-1.5 rounded-full bg-black/5 border border-border/50 backdrop-blur-xl w-fit"
            >
              {/* Animated Sliding Pill (Immune to scroll jumps) */}
              {pillStyle && (
                <motion.div
                  className="absolute rounded-full bg-foreground shadow-sm pointer-events-none"
                  initial={false}
                  animate={{
                    x: pillStyle.left,
                    y: pillStyle.top,
                    width: pillStyle.width,
                    height: pillStyle.height,
                  }}
                  style={{
                    top: 0,
                    left: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              {NAV_ITEMS.map((item) => {
                const isActive = activeTabId === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    ref={(el) => {
                      if (el) tabRefs.current.set(item.id, el);
                      else tabRefs.current.delete(item.id);
                    }}
                    onClick={() => setActiveTabId(item.id)}
                    className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "text-background font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && !pillStyle && (
                      <div className="absolute inset-0 rounded-full bg-foreground shadow-sm" />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Island: Cart Button Pill */}
          <motion.button
            type="button"
            onClick={effectiveCartClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            aria-label={`Shopping cart with ${effectiveCartCount} items`}
            className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-border/70 bg-card/85 text-foreground/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md transition-colors hover:text-foreground hover:border-border cursor-pointer"
          >
            <ShoppingCart
              className="h-4 w-4 sm:h-4.5 sm:w-4.5"
              strokeWidth={1.9}
            />

            {/* Cart Badge */}
            <motion.span
              key={effectiveCartCount}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 sm:h-5 sm:min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] sm:text-[11px] font-bold text-primary-foreground shadow-xs ring-2 ring-background"
            >
              {effectiveCartCount}
            </motion.span>
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <motion.button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card/85 text-foreground/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md transition-colors hover:text-foreground hover:border-border cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-4.5 w-4.5" strokeWidth={2} />
            ) : (
              <Menu className="h-4.5 w-4.5" strokeWidth={2} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Animated Floating Dropdown Island */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="absolute left-4 right-4 sm:left-6 sm:right-6 top-full mt-2.5 md:hidden overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-2 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "relative flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "text-foreground/80 hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
