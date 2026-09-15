"use client";

import { Check, Copy, Truck } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { MockOrder } from "@/data/orders";

interface OrderStatusCardProps {
  order: MockOrder;
}

export default function OrderStatusCard({ order }: OrderStatusCardProps) {
  const [copiedAwb, setCopiedAwb] = useState(false);

  const handleCopyAwb = () => {
    navigator.clipboard.writeText(order.awb);
    setCopiedAwb(true);
    setTimeout(() => setCopiedAwb(false), 2000);
  };

  const isDelivered = order.milestones.every((m) => m.completed);

  return (
    <div className="rounded-3xl border border-border/80 bg-card/85 backdrop-blur-xl p-5 sm:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-xl sm:text-2xl font-black text-foreground">
              {order.orderId}
            </h2>
            <Badge
              variant="outline"
              className={`text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                isDelivered
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  : "bg-primary/10 text-primary border-primary/20"
              }`}
            >
              {isDelivered ? "Delivered" : "In Cold-Chain Transit"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground font-sans mt-0.5">
            Recipient:{" "}
            <strong className="text-foreground">{order.customerName}</strong> •{" "}
            {order.city}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-mono text-muted-foreground uppercase block">
              COURIER AIRWAY BILL
            </span>
            <span className="text-xs font-mono font-bold text-foreground">
              {order.awb}
            </span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={handleCopyAwb}
            aria-label="Copy AWB number"
            className="rounded-xl cursor-pointer"
          >
            {copiedAwb ? (
              <Check className="size-3.5 text-emerald-500" />
            ) : (
              <Copy className="size-3.5 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
            CARRIER &amp; LOGISTICS
          </span>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <Truck className="size-3.5 text-primary" />
            <span>{order.courier}</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
            DISPATCH DATE
          </span>
          <span className="text-xs font-mono font-medium text-foreground">
            {order.dispatchDate}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-0.5">
            ESTIMATED ARRIVAL
          </span>
          <span className="text-xs font-mono font-bold text-primary">
            {order.estimatedArrival}
          </span>
        </div>
      </div>
    </div>
  );
}
