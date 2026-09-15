"use client";

import { CheckCircle2, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { WORKSHOP_PROGRAMS } from "@/data/academy";
import type { RegistrationValues } from "@/lib/schemas";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface RegistrationConfirmationModalProps {
  confirmedData: RegistrationValues | null;
  onClose: () => void;
}

export default function RegistrationConfirmationModal({
  confirmedData,
  onClose,
}: RegistrationConfirmationModalProps) {
  if (!confirmedData) return null;

  const programName =
    WORKSHOP_PROGRAMS.find((p) => p.id === confirmedData.program)?.name ||
    confirmedData.program;

  const rawMessage =
    `Hello Mussu! I have submitted my registration for the ${programName}.\n\n` +
    `• Name: ${confirmedData.fullName}\n` +
    `• WhatsApp: ${confirmedData.phone}\n` +
    `• District/City: ${confirmedData.city}\n` +
    `• Cohort: ${confirmedData.cohort}\n` +
    `• Experience: ${confirmedData.experienceLevel.toUpperCase()}\n` +
    `• Include Curated Student Kit: ${confirmedData.includeKit ? "Yes" : "No"}\n\n` +
    `Please confirm my registration slot and share atelier welcome details!`;

  const whatsappUrl = buildWhatsAppUrl(rawMessage);

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
            ENROLLMENT APPLICATION RECORDED
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-black text-foreground mt-1">
            Welcome, {confirmedData.fullName}!
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-2 leading-relaxed">
            Your registration profile for Mussu Henna Atelier Masterclass has
            been received:
          </p>

          <div className="my-5 p-4 rounded-2xl bg-muted/20 border border-border/50 space-y-2 text-xs font-sans">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Program:</span>
              <span className="font-semibold text-foreground truncate max-w-[240px] text-right">
                {programName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cohort:</span>
              <span className="font-semibold text-primary font-mono text-right truncate max-w-[240px]">
                {confirmedData.cohort}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location / City:</span>
              <span className="font-semibold text-foreground">
                {confirmedData.city}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Student Kit:</span>
              <span className="font-semibold text-foreground">
                {confirmedData.includeKit ? "Included (+₹1,500)" : "Opted out"}
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
