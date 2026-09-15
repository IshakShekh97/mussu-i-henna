"use client";

import { Minus, Plus, ShoppingBag, Sparkles, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { parsePrice } from "@/lib/utils";
import type { CartItem } from "@/store/useCartStore";

interface CartItemListProps {
  items: CartItem[];
  updateQuantity: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
}

export default function CartItemList({
  items,
  updateQuantity,
  removeItem,
}: CartItemListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-border/70 bg-card/85 p-8 sm:p-12 text-center flex flex-col items-center justify-center">
        <div className="size-16 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground mb-4">
          <ShoppingBag className="size-8 stroke-1" />
        </div>
        <h3 className="font-heading text-lg font-bold text-foreground">
          Your Bag is Empty
        </h3>
        <p className="text-xs text-muted-foreground font-sans max-w-xs mt-1">
          Explore our handcrafted Bengal organic cones, balms, and bridal
          suites.
        </p>
        <Button
          asChild
          className="mt-6 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer h-auto"
        >
          <Link href="/shop">
            <Sparkles className="size-3.5 mr-1.5" />
            <span>Explore Catalog</span>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border/70 bg-card/85 backdrop-blur-xl p-5 sm:p-6 shadow-xs divide-y divide-border/40">
      {items.map(({ product, quantity }) => {
        const priceNum = parsePrice(product.price);
        return (
          <div
            key={product.id}
            className="py-4 first:pt-0 last:pb-0 flex items-start gap-4"
          >
            <div className="relative size-16 sm:size-20 rounded-2xl overflow-hidden bg-muted/30 border border-border/50 shrink-0">
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
                    onClick={() => updateQuantity(product.id, quantity - 1)}
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
                    onClick={() => updateQuantity(product.id, quantity + 1)}
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
      })}
    </div>
  );
}
