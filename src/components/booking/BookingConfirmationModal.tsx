"use client";

import { CheckCircle2, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import type { BookingFormValues } from "@/lib/schemas";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface BookingConfirmationModalProps {
  confirmedBooking: BookingFormValues | null;
  occasionLabels: string;
  onClose: () => void;
}

export default function BookingConfirmationModal({
  confirmedBooking,
  occasionLabels,
  onClose,
}: BookingConfirmationModalProps) {
  if (!confirmedBooking) return null;

  const whatsappText = `Hello Mussu, I have submitted a bridal quotation request for ${occasionLabels} on ${confirmedBooking.ceremonyDate} at ${confirmedBooking.location}, ${confirmedBooking.city}. My name is ${confirmedBooking.firstName} ${confirmedBooking.lastName}.`;
  const whatsappUrl = buildWhatsAppUrl(whatsappText);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-lg rounded-3xl border border-border/80 bg-card/95 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl text-left"
        >
          <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
            <CheckCircle2 className="size-7" />
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block">
            QUOTATION REQUEST RECORDED
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-black text-foreground mt-1">
            Subho Bibaha, {confirmedBooking.firstName}!
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-2 leading-relaxed">
            Thank you for choosing Mussu Henna Atelier for your ceremonial
            rituals. We have compiled your celebration details:
          </p>

          <div className="my-5 p-4 rounded-2xl bg-muted/20 border border-border/50 space-y-2 text-xs font-sans">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Occasion:</span>
              <span className="font-semibold text-foreground">
                {occasionLabels}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ceremony Date:</span>
              <span className="font-semibold text-primary font-mono">
                {confirmedBooking.ceremonyDate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-semibold text-foreground">
                {confirmedBooking.location}, {confirmedBooking.city}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-5 text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              <MessageCircle className="size-4" />
              <span>Confirm on WhatsApp</span>
            </a>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-5 py-3 rounded-full border border-border/70 hover:bg-muted text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-all cursor-pointer h-auto"
            >
              Close
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
