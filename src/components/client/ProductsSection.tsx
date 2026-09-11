"use client";

import { ArrowRight, ArrowUpRight, Check, Sparkles, Star } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FEATURED_PRODUCTS, type Product } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductsSection() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Entrance & Exit closing transforms linked directly to scroll
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.78, 0.96],
    [0.15, 1, 1, 0],
  );
  const sectionScale = useTransform(
    scrollYProgress,
    [0, 0.16, 0.78, 0.96],
    [0.96, 1, 1, 0.93],
  );
  const sectionY = useTransform(
    scrollYProgress,
    [0, 0.16, 0.78, 0.96],
    [35, 0, 0, -45],
  );

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setToastMessage(`Added "${product.name}" to your bag ✨`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden"
    >
      {/* ── Background Ambient Light Glow ── */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        style={{
          opacity: sectionOpacity,
          scale: sectionScale,
          y: sectionY,
        }}
        className="w-full origin-center"
      >
        {/* ── Section Header (Animates whenever in view) ── */}
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
                <Sparkles className="size-3" />
                <span>{"FEATURED COLLECTION // 02"}</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground uppercase"
              >
                ARTISAN ESSENTIALS
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.65, delay: 0.14 }}
                className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl font-sans"
              >
                Hand-formulated with 100% triple-sifted Rajasthani henna leaves,
                therapeutic botanical oils, and zero chemical preservatives.
              </motion.p>
            </div>

            {/* ── Direct Link to Full Shop Page with all categories ── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center"
            >
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-secondary hover:bg-foreground hover:text-background px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold shadow-xs backdrop-blur-xl transition-all duration-200 cursor-pointer"
              >
                <span>Explore All Products</span>
                <ArrowUpRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Products Grid: 4 Featured Items, Full Space, Re-animating on Every Scroll ── */}
        <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {FEATURED_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ProductCard
                product={product}
                priority={true}
                onAddToCart={handleAddToCart}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Interactive Quick View Modal ── */}
      <AnimatePresence>
        {selectedProduct && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setSelectedProduct(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-[2.5rem] bg-card/95 border border-border/60 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl flex flex-col"
            >
              {/* Modal Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close dialog"
                className="absolute top-5 right-5 size-9 rounded-full bg-black/5 flex items-center justify-center text-foreground/70 hover:text-foreground hover:scale-105 transition-all cursor-pointer"
              >
                ✕
              </button>

              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                {selectedProduct.badges.map((b) => (
                  <span
                    key={b}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Product Photo */}
              <div className="relative w-full h-64 my-2 flex items-center justify-center">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)]"
                />
              </div>

              {/* Product Details */}
              <div className="mt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <div className="flex items-center text-amber-500">
                    <Star className="size-3.5 fill-amber-500 text-amber-500" />
                    <span className="ml-1 font-semibold text-foreground">
                      {selectedProduct.rating}
                    </span>
                  </div>
                  <span>•</span>
                  <span>{selectedProduct.reviewsCount} customer reviews</span>
                </div>
                <h3 className="text-2xl font-black text-foreground">
                  {selectedProduct.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Modal Bottom Action */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
                <span className="text-3xl font-black text-foreground">
                  {selectedProduct.price}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-sm font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Add to Bag</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Interactive Floating Toast Notification ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-full bg-foreground text-background shadow-[0_15px_35px_rgba(0,0,0,0.25)] border border-white/20 backdrop-blur-xl"
          >
            <span className="size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
              <Check className="size-3.5" />
            </span>
            <span className="text-xs sm:text-sm font-medium">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
