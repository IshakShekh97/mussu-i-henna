"use client";

import { ArrowLeft, Filter, Search, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import CartToast from "@/components/client/CartToast";
import ProductCard from "@/components/client/ProductCard";
import QuickViewModal from "@/components/client/QuickViewModal";
import { CATEGORIES, PRODUCTS, type Product } from "@/data/products";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setToastMessage(`Added "${product.name}" to your bag ✨`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <main className="relative w-full min-h-screen pt-24 pb-20 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden">
      {/* ── Background Subtle Ambient Lights ── */}
      <div className="absolute top-20 left-1/3 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 right-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* ── Back Navigation & Tag ── */}
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-wider uppercase mb-3">
              <Sparkles className="size-3" />
              <span>THE COMPLETE COLLECTION</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground uppercase">
              ARTISAN CATALOG
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl font-sans">
              Browse our complete catalog of organic henna cones, botanical
              aftercare remedies, precision tools, and bridal ceremonial trunks.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border/70 bg-white/60  backdrop-blur-md text-xs sm:text-sm text-foreground  focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>
        </div>
      </div>

      {/* ── Category Filter Pills (Exclusive to Shop Page as requested) ── */}
      <div className="relative z-10 w-full mb-10 pb-4 border-b border-black/5 ">
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-black/5 border border-border/50 backdrop-blur-xl w-fit">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-background  font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="shop-active-category"
                    className="absolute inset-0 rounded-full bg-foreground shadow-sm"
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
      </div>

      {/* ── Products Grid: All Products, Full Width, Responsive ── */}
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
                onQuickView={(p) => setSelectedProduct(p)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Empty State ── */}
      {filteredProducts.length === 0 && (
        <div className="w-full py-20 flex flex-col items-center justify-center text-center">
          <div className="size-16 rounded-full bg-black/5 flex items-center justify-center mb-4">
            <Filter className="size-6 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            No products found
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Try choosing another category or clearing your search term.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 px-5 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ── Interactive Quick View Modal & Toast ── */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
      <CartToast message={toastMessage} />
    </main>
  );
}
