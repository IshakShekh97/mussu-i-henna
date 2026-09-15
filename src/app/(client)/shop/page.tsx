"use client";

import {
  ArrowLeft,
  ArrowUpDown,
  Filter,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import CartToast from "@/components/common/CartToast";
import ProductCard from "@/components/shop/ProductCard";
import QuickViewModal from "@/components/shop/QuickViewModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { useProductActions } from "@/hooks/useProductActions";
import { parsePrice } from "@/lib/utils";

const SORT_OPTIONS = [
  { id: "featured", label: "Featured Collections" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated ★" },
  { id: "name_asc", label: "Alphabetical: A to Z" },
] as const;

type SortOptionId = (typeof SORT_OPTIONS)[number]["id"];

const CATEGORY_ALIASES: Record<string, string> = {
  cones: "cones",
  cone: "cones",
  care: "care",
  aftercare: "care",
  oils: "care",
  oil: "care",
  kits: "kits",
  kit: "kits",
  bridal: "kits",
  all: "all",
};

function normalizeCategory(param: string | null): string {
  if (!param) return "all";
  const clean = param.toLowerCase().trim();
  return CATEGORY_ALIASES[clean] || "all";
}

function ShopContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawCategory = searchParams.get("category");
  const rawSort = searchParams.get("sort");
  const rawQuery = searchParams.get("q") ?? searchParams.get("search") ?? "";

  const activeCategory = useMemo(
    () => normalizeCategory(rawCategory),
    [rawCategory],
  );

  const activeSort = useMemo(() => {
    return (
      SORT_OPTIONS.some((opt) => opt.id === rawSort) ? rawSort : "featured"
    ) as SortOptionId;
  }, [rawSort]);

  const [searchInput, setSearchInput] = useState(rawQuery);
  const {
    toastMessage,
    selectedProduct,
    handleAddToCart,
    openQuickView,
    closeQuickView,
  } = useProductActions();

  useEffect(() => {
    setSearchInput(rawQuery);
  }, [rawQuery]);

  const updateUrlParams = useCallback(
    (updates: {
      category?: string | null;
      sort?: string | null;
      q?: string | null;
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      if ("category" in updates) {
        if (!updates.category || updates.category === "all") {
          params.delete("category");
        } else {
          params.set("category", updates.category);
        }
      }

      if ("sort" in updates) {
        if (!updates.sort || updates.sort === "featured") {
          params.delete("sort");
        } else {
          params.set("sort", updates.sort);
        }
      }

      if ("q" in updates) {
        if (!updates.q || updates.q.trim() === "") {
          params.delete("q");
          params.delete("search");
        } else {
          params.set("q", updates.q.trim());
          params.delete("search");
        }
      }

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== rawQuery) {
        updateUrlParams({ q: searchInput });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, rawQuery, updateUrlParams]);

  const filteredProducts = useMemo(() => {
    const q = searchInput.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const matchesSearch =
        q === "" ||
        product.name.toLowerCase().includes(q) ||
        product.tagline.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.badges.some((b) => b.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      switch (activeSort) {
        case "price_asc":
          return parsePrice(a.price) - parsePrice(b.price);
        case "price_desc":
          return parsePrice(b.price) - parsePrice(a.price);
        case "rating":
          return b.rating - a.rating;
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "featured":
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        default:
          return 0;
      }
    });
  }, [activeCategory, activeSort, searchInput]);

  const hasActiveFilters =
    activeCategory !== "all" ||
    activeSort !== "featured" ||
    searchInput.trim() !== "";

  const handleResetFilters = () => {
    setSearchInput("");
    router.replace(pathname, { scroll: false });
  };

  return (
    <main className="relative w-full min-h-screen pt-24 pb-20 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden">
      <div className="absolute top-20 left-1/3 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 right-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full mb-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <Badge
              variant="outline"
              className="gap-2 px-3 py-1 rounded-full bg-primary/10 border-primary/20 text-primary text-xs font-mono tracking-wider uppercase mb-3"
            >
              <Sparkles className="size-3" />
              <span>THE COMPLETE COLLECTION</span>
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground uppercase">
              ARTISAN CATALOG
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl font-sans">
              Browse our complete catalog of organic Bengal henna cones,
              botanical aftercare remedies, precision tools, and bridal
              ceremonial trunks.
            </p>
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground z-10" />
            <Input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search cones, oils, kits..."
              className="w-full pl-10 pr-10 py-2.5 h-10 rounded-full border border-border/70 bg-white/60 dark:bg-black/30 backdrop-blur-md text-xs sm:text-sm text-foreground focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all shadow-xs"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  updateUrlParams({ q: null });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full transition-colors cursor-pointer z-10"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-6 bg-border/40" />

      <div className="relative z-10 w-full mb-8 pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-border/50 backdrop-blur-xl w-fit">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => updateUrlParams({ category: cat.id })}
                className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-background font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="shop-active-category"
                    className="absolute inset-0 rounded-full bg-foreground shadow-xs"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="rounded-full gap-1.5 h-8 px-3 text-xs bg-black/5 dark:bg-white/5 border-border/40 hover:bg-black/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="size-3" />
              <span>Reset</span>
            </Button>
          )}

          <div className="flex items-center gap-2">
            <Select
              value={activeSort}
              onValueChange={(val) => {
                if (val) updateUrlParams({ sort: val });
              }}
            >
              <SelectTrigger className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-border/50 bg-black/5 dark:bg-white/5 backdrop-blur-xl text-xs sm:text-sm font-medium text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-colors shadow-2xs h-auto cursor-pointer">
                <ArrowUpDown className="size-3.5 text-primary" />
                <span className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider hidden sm:inline">
                  Sort:
                </span>
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                side="bottom"
                align="end"
                sideOffset={6}
                className="rounded-2xl border border-border/60 bg-card/95 backdrop-blur-2xl p-1.5 shadow-2xl text-foreground min-w-48 z-50 transform-gpu will-change-transform"
              >
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.id}
                    value={opt.id}
                    className="rounded-xl px-3 py-2 text-xs sm:text-sm cursor-pointer transition-colors duration-150 focus:bg-primary/10 focus:text-primary data-checked:bg-primary/10 data-checked:text-primary data-highlighted:bg-primary/10 data-highlighted:text-primary"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full mb-6 flex items-center justify-between text-xs text-muted-foreground font-mono">
        <span>
          SHOWING {filteredProducts.length} OF {PRODUCTS.length} CREATIONS
        </span>
        {activeCategory !== "all" && (
          <Badge
            variant="outline"
            className="uppercase tracking-wider text-primary border-primary/30 font-mono rounded-full px-2.5 py-0.5"
          >
            FILTER: {activeCategory}
          </Badge>
        )}
      </div>

      <motion.div
        layout
        className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{
                duration: 0.4,
                delay: index * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ProductCard
                product={product}
                priority={index < 4}
                onAddToCart={handleAddToCart}
                onQuickView={openQuickView}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="w-full py-20 flex flex-col items-center justify-center text-center">
          <div className="size-16 rounded-full bg-black/5 flex items-center justify-center mb-4">
            <Filter className="size-6 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            No creations found
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Try adjusting your search keywords, switching categories, or
            resetting active filters.
          </p>
          <Button
            type="button"
            onClick={handleResetFilters}
            className="mt-4 px-5 py-2 rounded-full font-semibold cursor-pointer"
          >
            Reset All Filters
          </Button>
        </div>
      )}

      <QuickViewModal
        product={selectedProduct}
        onClose={closeQuickView}
        onAddToCart={handleAddToCart}
      />
      <CartToast message={toastMessage} />
    </main>
  );
}

function ShopLoadingSkeleton() {
  return (
    <main className="relative w-full min-h-screen pt-24 pb-20 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden">
      <Skeleton className="w-28 h-4 rounded-md mb-6" />
      <Skeleton className="w-72 h-10 rounded-lg mb-3" />
      <Skeleton className="w-96 h-5 rounded-md mb-10" />
      <Skeleton className="w-full h-12 rounded-full mb-8" />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton
            key={i}
            className="h-96 rounded-3xl border border-border/30"
          />
        ))}
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoadingSkeleton />}>
      <ShopContent />
    </Suspense>
  );
}
