"use client";

import { ArrowRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import type { Product } from "@/data/products";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
  return (
    <AnimatePresence>
      {product && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
        >
          <motion.div
            data-lenis-prevent
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
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-5 right-5 size-9 rounded-full bg-black/5 flex items-center justify-center text-foreground/70 hover:text-foreground hover:scale-105 transition-all cursor-pointer"
            >
              ✕
            </button>

            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              {product.badges.map((b) => (
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
                src={product.image}
                alt={product.name}
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
                    {product.rating}
                  </span>
                </div>
                <span>•</span>
                <span>{product.reviewsCount} customer reviews</span>
              </div>
              <h3 className="text-2xl font-black text-foreground">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Modal Bottom Action */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
              <span className="text-3xl font-black text-foreground">
                {product.price}
              </span>

              <button
                type="button"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
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
  );
}
