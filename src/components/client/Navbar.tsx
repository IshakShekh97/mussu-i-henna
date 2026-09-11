"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

import SmoothTab, { TabItem } from "@/components/ui/smooth-tab";

interface NavItem extends TabItem {
  name: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "/", title: "Home", name: "Home", href: "/" },
  { id: "/shop", title: "Shop", name: "Shop", href: "/shop" },
  { id: "/booking", title: "Booking", name: "Booking", href: "/booking" },
  {
    id: "/track-order",
    title: "Track Order",
    name: "Track Order",
    href: "/track-order",
  },
];

interface NavbarProps {
  cartCount?: number;
  onCartClick?: () => void;
}

export default function Navbar({ cartCount = 0, onCartClick }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const activeTabId =
    NAV_ITEMS.find(
      (item) =>
        pathname === item.href ||
        (item.href !== "/" && pathname.startsWith(item.href)),
    )?.id ?? "/";

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
          {/* Middle Island: Desktop Navigation Pill with SmoothTab */}
          <div className="hidden md:block">
            <SmoothTab
              items={NAV_ITEMS}
              selectedId={activeTabId}
              showCardContent={false}
              activeColor="bg-primary"
            />
          </div>

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

      {/* Mobile Animated Floating Dropdown Island */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
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
