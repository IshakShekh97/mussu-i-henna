"use client";

import {
  Award,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function RegistrationSummaryCard() {
  const directInquiryUrl = buildWhatsAppUrl(
    "Hello Mussu, I have questions regarding atelier masterclass registration.",
  );

  return (
    <div className="lg:col-span-5 space-y-4 sticky top-24">
      <div className="rounded-3xl border border-border/80 bg-background/90 backdrop-blur-xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/50">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-4 text-primary" />
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
              ATELIER CURRICULUM
            </span>
          </div>
          <Badge
            variant="outline"
            className="text-[10px] font-mono border-primary/30 text-primary bg-primary/5"
          >
            CERTIFIED
          </Badge>
        </div>

        <div className="space-y-3 text-xs font-sans text-muted-foreground">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">
                Authentic Bengali Kolka:
              </strong>{" "}
              Ancestral Shankha-Pola alignment, paisley drafting, and peacock
              geometry.
            </span>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">Fresh Paste Alchemy:</strong>{" "}
              Triple-sifted Bengal Lawsonia leaf preparation, Nilgiri terpene
              oil distillation, and cone rolling.
            </span>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">
                Live Bridal Practicum:
              </strong>{" "}
              Real bride drills, layout speed tests, and business consultation
              guidance.
            </span>
          </div>

          <div className="flex items-start gap-2.5">
            <Award className="size-3.5 text-primary shrink-0 mt-0.5" />
            <span>
              <strong className="text-foreground">
                Official Certification:
              </strong>{" "}
              Signed by Mussu Shekh upon portfolio review.
            </span>
          </div>
        </div>

        <Separator className="bg-border/40" />

        <div className="p-3.5 rounded-2xl bg-muted/20 border border-border/50 space-y-1 text-[11px] font-mono text-muted-foreground">
          <div className="flex justify-between">
            <span>LOCATION:</span>
            <span className="font-bold text-foreground">
              Mussu Atelier Studio, Kolkata
            </span>
          </div>
          <div className="flex justify-between">
            <span>CLASS SIZE:</span>
            <span className="font-bold text-primary">Strictly 10 Seats</span>
          </div>
          <div className="flex justify-between">
            <span>FORMAT:</span>
            <span className="font-bold text-foreground">
              In-Person &amp; Hybrid Stream
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-3xl border border-primary/20 bg-primary/5 flex items-center justify-between gap-3">
        <div>
          <h4 className="font-heading text-sm font-bold text-foreground">
            Questions on Syllabus?
          </h4>
          <p className="text-[11px] text-muted-foreground font-sans mt-0.5">
            Connect directly with Mussu on WhatsApp.
          </p>
        </div>
        <a
          href={directInquiryUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#160B0F] hover:bg-primary text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <MessageCircle className="size-3.5 text-emerald-400" />
          <span>Chat</span>
        </a>
      </div>
    </div>
  );
}
