"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import CartToast from "@/components/common/CartToast";
import ProductCard from "@/components/shop/ProductCard";
import QuickViewModal from "@/components/shop/QuickViewModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FEATURED_PRODUCTS } from "@/data/products";
import { useProductActions } from "@/hooks/useProductActions";

export default function ProductsSection() {
  const {
    toastMessage,
    selectedProduct,
    handleAddToCart,
    openQuickView,
    closeQuickView,
  } = useProductActions();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden"
    >
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
        <div className="relative z-10 w-full mb-10 sm:mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border-primary/20 text-primary text-xs font-mono tracking-wider uppercase mb-3"
              >
                <span>FEATURED COLLECTION | 02</span>
              </Badge>

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

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center"
            >
              <Button
                asChild
                variant="secondary"
                className="group rounded-full border border-border/70 bg-secondary hover:bg-foreground hover:text-background px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold shadow-xs backdrop-blur-xl transition-all duration-200 cursor-pointer h-auto"
              >
                <Link href="/shop">
                  <span>Explore All Products</span>
                  <ArrowUpRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

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
                onQuickView={openQuickView}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <QuickViewModal
        product={selectedProduct}
        onClose={closeQuickView}
        onAddToCart={handleAddToCart}
      />
      <CartToast message={toastMessage} />
    </section>
  );
}
