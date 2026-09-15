"use client";

import { ArrowRight, Package, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CartOrderSummaryProps {
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  finalTotal: number;
  isSubmitting: boolean;
  itemCount: number;
}

export default function CartOrderSummary({
  subtotal,
  shippingFee,
  discountAmount,
  finalTotal,
  isSubmitting,
  itemCount,
}: CartOrderSummaryProps) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card/90 backdrop-blur-xl p-5 sm:p-6 shadow-sm space-y-4">
      <h3 className="font-heading text-sm sm:text-base font-bold text-foreground">
        Order Summary
      </h3>

      <div className="space-y-2 text-xs font-sans">
        <div className="flex justify-between text-muted-foreground">
          <span>Items Subtotal ({itemCount})</span>
          <span className="font-mono text-foreground">₹{subtotal}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-600">
            <span>Special Promo Discount</span>
            <span className="font-mono">-₹{discountAmount}</span>
          </div>
        )}

        <div className="flex justify-between text-muted-foreground">
          <span>Insulated Cold-Chain Shipping</span>
          <span className="font-mono text-foreground">
            {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
          </span>
        </div>
      </div>

      <Separator className="bg-border/50" />

      <div className="flex justify-between items-baseline">
        <span className="text-sm font-bold text-foreground">Final Total</span>
        <span className="text-2xl font-black font-mono text-primary">
          ₹{finalTotal}
        </span>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || itemCount === 0}
        size="lg"
        className="w-full rounded-xl bg-[#160B0F] hover:bg-primary text-white py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer h-auto"
      >
        <span>Proceed to WhatsApp Checkout</span>
        <ArrowRight className="size-4 text-emerald-400 ml-1.5" />
      </Button>

      <div className="pt-2 text-[11px] text-muted-foreground font-sans space-y-1.5 border-t border-border/40">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-primary shrink-0" />
          <span>Payment via UPI / Netbanking upon confirmation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Package className="size-3.5 text-primary shrink-0" />
          <span>Priority dispatch with reusable cold-gel pack</span>
        </div>
      </div>
    </div>
  );
}
