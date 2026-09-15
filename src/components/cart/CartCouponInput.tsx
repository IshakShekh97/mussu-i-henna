"use client";

import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CartCouponInputProps {
  couponCode: string;
  setCouponCode: (code: string) => void;
  applyCoupon: () => void;
  couponApplied: boolean;
  couponError: string;
}

export default function CartCouponInput({
  couponCode,
  setCouponCode,
  applyCoupon,
  couponApplied,
  couponError,
}: CartCouponInputProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-4 space-y-2.5">
      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-foreground">
        <Tag className="size-3.5 text-primary" />
        <span>PROMO CODE</span>
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Try 'BRIDAL10'"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          disabled={couponApplied}
          className="rounded-xl bg-background/80 text-xs sm:text-sm h-9 uppercase font-mono"
        />
        <Button
          type="button"
          onClick={applyCoupon}
          disabled={couponApplied || !couponCode.trim()}
          className="rounded-xl px-4 text-xs font-mono font-bold uppercase h-9 cursor-pointer shrink-0"
        >
          {couponApplied ? "Applied" : "Apply"}
        </Button>
      </div>

      {couponApplied && (
        <span className="text-[11px] text-emerald-600 font-mono block">
          ✓ BRIDAL10 applied! 10% discount added.
        </span>
      )}

      {couponError && (
        <span className="text-[11px] text-destructive font-mono block">
          {couponError}
        </span>
      )}
    </div>
  );
}
