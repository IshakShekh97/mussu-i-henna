"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { FEATURED_PRODUCTS, type Product } from "@/data/products";
import CartToast from "./CartToast";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";

export default function ProductsSection() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Entrance opening & Exit closing transforms linked directly to scroll
  // Disappears when scrolling past in either direction, and re-animates smoothly when returning
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.76, 0.93],
    [0, 1, 1, 0],
  );
  const sectionScale = useTransform(
    scrollYProgress,
    [0, 0.18, 0.76, 0.93],
    [0.93, 1, 1, 0.93],
  );
  const sectionY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.76, 0.93],
    [45, 0, 0, -45],
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
                Hand-formulated with 100% triple-sifted henna leaves,
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

      {/* ── Interactive Quick View Modal & Toast ── */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
      <CartToast message={toastMessage} />
    </section>
  );
}
