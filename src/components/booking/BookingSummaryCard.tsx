"use client";

import {
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface BookingSummaryCardProps {
  occasionLabel: string;
  selectedDate: string;
  city: string;
}

export default function BookingSummaryCard({
  occasionLabel,
  selectedDate,
  city,
}: BookingSummaryCardProps) {
  const directInquiryUrl = buildWhatsAppUrl(
    "Hello Mussu, I would like to check availability for a Bengali bridal mehndi booking.",
  );

  return (
    <div className="lg:col-span-4 sticky top-24 space-y-4">
      <div className="rounded-3xl border border-border/80 bg-card/90 backdrop-blur-xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/50">
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            ATELIER CONSULTATION
          </span>
          <Badge
            variant="outline"
            className="text-[10px] font-mono border-primary/30 text-primary bg-primary/5"
          >
            2026—2027
          </Badge>
        </div>

        <div className="space-y-2.5">
          <div className="text-xs font-mono text-muted-foreground flex justify-between items-center">
            <span>SELECTED OCCASION:</span>
            <span className="font-bold text-foreground truncate max-w-[170px] text-right">
              {occasionLabel}
            </span>
          </div>

          <div className="text-xs font-mono text-muted-foreground flex justify-between items-center">
            <span>DATE:</span>
            <span className="font-bold text-primary">
              {selectedDate || "Not chosen yet"}
            </span>
          </div>

          <div className="text-xs font-mono text-muted-foreground flex justify-between items-center">
            <span>REGION:</span>
            <span className="font-bold text-foreground">
              {city || "West Bengal"}
            </span>
          </div>
        </div>

        <Separator className="bg-border/50" />

        <div className="space-y-1.5 text-xs text-muted-foreground font-sans">
          <div className="flex items-center gap-1.5 text-foreground font-semibold">
            <Sparkles className="size-3.5 text-primary" />
            <span>Quotation Policy</span>
          </div>
          <p className="leading-relaxed text-[11px]">
            Pricing is tailored to the bride's Benarasi zari motif intricacy,
            troupe count, and destination. We respond within 4 hours.
          </p>
        </div>

        <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-border/50">
          <Image
            src="/booking-atelier.jpg"
            alt="Mussu Henna Atelier Kolkata"
            fill
            sizes="360px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
            <span className="text-[10px] font-mono text-white/90 uppercase tracking-wider">
              Flagship Studio • Kolkata, WB
            </span>
          </div>
        </div>

        <div className="pt-1 space-y-2 text-xs font-sans text-muted-foreground border-t border-border/40">
          <div className="flex items-start gap-2">
            <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Southern Avenue &amp; Salt Lake, Kolkata (Private trials by
              appointment)
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="size-4 text-primary shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Tuesday – Sunday, 11:00 AM – 7:30 PM
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border/70 bg-muted/20 p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-bold">
          <ShieldCheck className="size-4" />
          <span>THE BENGAL ATELIER STANDARD</span>
        </div>

        <div className="space-y-2.5 text-xs font-sans text-muted-foreground">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">100% Bengal Lawsonia:</strong>{" "}
              Freshly mixed with zero synthetic chemicals, black henna, or PPD.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">
                48-Hour Stain Guarantee:
              </strong>{" "}
              Vibrant mahogany stain lasting through Biye and Bou Bhat.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">Doorstep Patch-Test:</strong>{" "}
              Delivered across West Bengal before the wedding.
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-3xl border border-primary/20 bg-primary/5 flex items-center justify-between gap-3">
        <div>
          <h4 className="font-heading text-sm font-bold text-foreground">
            Direct Inquiry?
          </h4>
          <p className="text-[11px] text-muted-foreground font-sans mt-0.5">
            Chat directly with Mussu on WhatsApp.
          </p>
        </div>
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          href={directInquiryUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#160B0F] hover:bg-primary text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <MessageCircle className="size-3.5 text-emerald-400" />
          <span>WhatsApp</span>
        </motion.a>
      </div>
    </div>
  );
}
