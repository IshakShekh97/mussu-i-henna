"use client";

import { CheckCircle2, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CartOrderSuccessProps {
  orderId: string;
}

export default function CartOrderSuccess({ orderId }: CartOrderSuccessProps) {
  return (
    <div className="max-w-xl mx-auto rounded-3xl border border-border/80 bg-card/90 backdrop-blur-xl p-6 sm:p-10 text-center shadow-lg space-y-5">
      <div className="size-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
        <CheckCircle2 className="size-9" />
      </div>

      <div>
        <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold block">
          ATELIER ORDER DISPATCH QUEUED
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-black text-foreground mt-1">
          Thank You!
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-2 leading-relaxed">
          Your fresh henna batch order has been forwarded to our WhatsApp
          concierge. Your provisional Order ID is:
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-muted/20 border border-border/60 inline-block font-mono text-lg font-bold text-primary px-8">
        {orderId}
      </div>

      <p className="text-xs text-muted-foreground font-sans max-w-sm mx-auto leading-relaxed">
        Our team will confirm your batch harvest, UPI payment QR, and priority
        cold-chain dispatch schedule on WhatsApp within 30 minutes.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          asChild
          className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-xs font-bold uppercase tracking-wider shadow-xs cursor-pointer h-auto"
        >
          <Link href="/track-order">
            <Package className="size-4 mr-1.5" />
            <span>Track Order Status</span>
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="flex-1 rounded-full border border-border/70 hover:bg-muted py-3 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground cursor-pointer h-auto"
        >
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
