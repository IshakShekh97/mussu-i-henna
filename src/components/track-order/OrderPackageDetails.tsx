"use client";

import { MessageCircle, Snowflake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { MockOrder } from "@/data/orders";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface OrderPackageDetailsProps {
  order: MockOrder;
}

export default function OrderPackageDetails({
  order,
}: OrderPackageDetailsProps) {
  const inquiryUrl = buildWhatsAppUrl(
    `Hello Mussu, I have an inquiry regarding my order ${order.orderId}`,
  );

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border/80 bg-card/85 backdrop-blur-xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/50">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            PARCEL CONTENTS
          </span>
          <Badge
            variant="outline"
            className="text-[10px] font-mono border-primary/20 bg-primary/5 text-primary"
          >
            {order.items.reduce((acc, item) => acc + item.quantity, 0)} Items
          </Badge>
        </div>

        <div className="divide-y divide-border/40">
          {order.items.map((item) => (
            <div
              key={item.name}
              className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs"
            >
              <span className="font-medium text-foreground font-sans">
                {item.name}
              </span>
              <span className="font-mono text-muted-foreground font-semibold">
                ×{item.quantity}
              </span>
            </div>
          ))}
        </div>

        <Separator className="bg-border/40" />

        <div className="p-3.5 rounded-2xl bg-muted/20 border border-border/60 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Snowflake className="size-3.5 text-sky-500" />
            <span>Bridal Freezing Protocol</span>
          </div>
          <p className="text-[11px] text-muted-foreground font-sans leading-relaxed">
            Store cones immediately in freezer (-18°C) upon arrival. Defrost at
            room temperature 30 minutes before application.
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-3xl border border-primary/20 bg-primary/5 flex items-center justify-between gap-3">
        <div>
          <h4 className="font-heading text-sm font-bold text-foreground">
            Delivery Question?
          </h4>
          <p className="text-[11px] text-muted-foreground font-sans mt-0.5">
            Mussu Atelier concierge is on WhatsApp.
          </p>
        </div>
        <a
          href={inquiryUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#160B0F] hover:bg-primary text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <MessageCircle className="size-3.5 text-emerald-400" />
          <span>Inquire</span>
        </a>
      </div>
    </div>
  );
}
