"use client";

import {
  ArrowRight,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { parsePrice } from "@/lib/utils";
import { buildWhatsAppUrl, formatCartItemsForWhatsApp } from "@/lib/whatsapp";
import { useCartStore } from "@/store/useCartStore";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    updateQuantity,
    removeItem,
    subtotal,
    totalItems,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const currentSubtotal = subtotal();
  const count = totalItems();
  const freeShippingThreshold = 500;
  const progressPercent = Math.min(
    100,
    Math.round((currentSubtotal / freeShippingThreshold) * 100),
  );

  const rawWhatsappMsg = `Hello Mussu! I would like to place an order for the following fresh henna creations:\n\n${formatCartItemsForWhatsApp(
    items,
  )}\n\nSubtotal: ₹${currentSubtotal}\nPlease share delivery confirmation and payment details!`;

  const whatsappCheckoutUrl = buildWhatsAppUrl(rawWhatsappMsg);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.aside
              aria-label="Artisan Shopping Bag"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              className="w-screen max-w-md bg-card border-l border-border/70 shadow-2xl flex flex-col justify-between"
            >
              <div className="p-5 sm:p-6 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <ShoppingBag className="size-4" />
                  </div>
                  <div>
                    <h2 className="font-heading text-base sm:text-lg font-bold text-foreground leading-tight">
                      Your Atelier Bag
                    </h2>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Badge
                        variant="outline"
                        className="text-[10px] font-mono border-primary/20 bg-primary/5 text-primary py-0 px-2"
                      >
                        {count} {count === 1 ? "Item" : "Items"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={closeCart}
                  aria-label="Close Bag"
                  className="rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="size-4" />
                </Button>
              </div>

              <div className="px-5 sm:px-6 py-3 bg-muted/20 border-b border-border/40">
                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Package className="size-3 text-primary" />
                    {progressPercent >= 100
                      ? "Free Cold-Pack Shipping Unlocked!"
                      : `Add ₹${freeShippingThreshold - currentSubtotal} for Free Shipping`}
                  </span>
                  <span className="font-bold text-primary">
                    {progressPercent}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 sm:p-6 divide-y divide-border/40">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="size-16 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground mb-4">
                      <ShoppingBag className="size-8 stroke-1" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Your Bag is Empty
                    </h3>
                    <p className="text-xs text-muted-foreground font-sans max-w-xs mt-1">
                      Explore our freshly hand-churned Bengal organic cones,
                      aftercare balms, and ceremonial bridal suites.
                    </p>
                    <Button
                      asChild
                      className="mt-6 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-primary/90 transition-all cursor-pointer h-auto"
                    >
                      <Link href="/shop" onClick={closeCart}>
                        <Sparkles className="size-3.5 mr-1.5" />
                        <span>Explore Catalog</span>
                      </Link>
                    </Button>
                  </div>
                ) : (
                  items.map(({ product, quantity }) => {
                    const priceNum = parsePrice(product.price);
                    return (
                      <div
                        key={product.id}
                        className="py-4 first:pt-0 last:pb-0 flex items-start gap-3.5"
                      >
                        <div className="relative size-16 sm:size-20 rounded-xl overflow-hidden bg-muted/30 border border-border/50 shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-heading text-xs sm:text-sm font-bold text-foreground line-clamp-1">
                                {product.name}
                              </h4>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => removeItem(product.id)}
                                aria-label={`Remove ${product.name}`}
                                className="text-muted-foreground/60 hover:text-destructive transition-colors cursor-pointer"
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            </div>
                            <span className="text-[10px] font-mono text-primary uppercase">
                              {product.category}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="inline-flex items-center border border-border/60 rounded-lg bg-background overflow-hidden">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() =>
                                  updateQuantity(product.id, quantity - 1)
                                }
                                aria-label="Decrease quantity"
                                className="rounded-none text-muted-foreground hover:text-foreground hover:bg-muted/50 cursor-pointer"
                              >
                                <Minus className="size-3" />
                              </Button>
                              <span className="w-7 text-center font-mono text-xs font-semibold text-foreground">
                                {quantity}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() =>
                                  updateQuantity(product.id, quantity + 1)
                                }
                                aria-label="Increase quantity"
                                className="rounded-none text-muted-foreground hover:text-foreground hover:bg-muted/50 cursor-pointer"
                              >
                                <Plus className="size-3" />
                              </Button>
                            </div>

                            <span className="font-mono text-xs sm:text-sm font-bold text-foreground">
                              ₹{priceNum * quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {items.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-border/50 bg-background/50 backdrop-blur-md flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground font-sans">
                      Subtotal
                    </span>
                    <span className="font-mono font-bold text-base sm:text-lg text-foreground">
                      ₹{currentSubtotal}
                    </span>
                  </div>

                  <p className="text-[11px] font-sans text-muted-foreground">
                    Includes insulated thermal pouch &amp; botanical storage
                    instructions.
                  </p>

                  <Button
                    asChild
                    size="lg"
                    className="w-full rounded-xl bg-[#160B0F] hover:bg-primary text-white py-3 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs transition-all duration-200 cursor-pointer h-auto"
                  >
                    <a
                      href={whatsappCheckoutUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>Instant WhatsApp Checkout</span>
                      <ArrowRight className="size-4 text-emerald-400 ml-1.5" />
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="secondary"
                    className="w-full rounded-xl border border-border text-foreground py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer h-auto"
                  >
                    <Link href="/cart" onClick={closeCart}>
                      <span>View Full Bag &amp; Details</span>
                    </Link>
                  </Button>
                </div>
              )}
            </motion.aside>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
