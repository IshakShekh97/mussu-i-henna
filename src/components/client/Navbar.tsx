"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Booking", href: "/booking" },
  { name: "Track Order", href: "/track-order" },
];

interface NavbarProps {
  cartCount?: number;
  onCartClick?: () => void;
}

export default function Navbar({ cartCount = 0, onCartClick }: NavbarProps) {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
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
            className="group flex items-center rounded-full border border-border/70 bg-card/85 px-5 py-2 sm:px-6 sm:py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:border-border hover:shadow-md"
          >
            <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-primary transition-colors group-hover:opacity-90">
              Mussu
            </span>
            <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-foreground ml-1.5 transition-colors group-hover:opacity-90">
              Henna
            </span>
          </Link>
        </motion.div>

        {/* Right Islands: Navigation Pill + Action Pill */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          {/* Middle Island: Desktop Navigation Pill */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex gap-2 items-center rounded-full border border-border/70 bg-card/85 p-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md"
            onMouseLeave={() => setHoveredPath(null)}
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredPath(item.href)}
                  className={cn(
                    "relative px-4 sm:px-5 py-1.5 sm:py-2 text-sm font-medium transition-colors duration-200 select-none",
                    isActive
                      ? "text-primary-foreground font-semibold"
                      : "text-foreground/75 hover:text-foreground",
                  )}
                >
                  {/* Sliding Active Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-primary shadow-xs"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Subtle Hover Highlight (only on inactive tabs) */}
                  {!isActive && hoveredPath === item.href && (
                    <motion.div
                      layoutId="hover-pill"
                      className="absolute inset-0 rounded-full bg-muted/60"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}

                  {/* Label Text */}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Island: Cart Button Pill */}
          <motion.button
            type="button"
            onClick={onCartClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            aria-label={`Shopping cart with ${cartCount} items`}
            className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-border/70 bg-card/85 text-foreground/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md transition-colors hover:text-foreground hover:border-border cursor-pointer"
          >
            <ShoppingCart
              className="h-4 w-4 sm:h-4.5 sm:w-4.5"
              strokeWidth={1.9}
            />

            {/* Cart Badge */}
            <motion.span
              key={cartCount}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 sm:h-5 sm:min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] sm:text-[11px] font-bold text-primary-foreground shadow-xs ring-2 ring-background"
            >
              {cartCount}
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

      {/* Mobile Animated Dropdown Island */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="mx-auto mt-3 max-w-7xl md:hidden overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-2 shadow-xl backdrop-blur-xl"
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
