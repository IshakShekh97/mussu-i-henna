"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface CartToastProps {
  message: string | null;
}

export default function CartToast({ message }: CartToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-full bg-foreground text-background shadow-[0_15px_35px_rgba(0,0,0,0.25)] border border-white/20 backdrop-blur-xl"
        >
          <span className="size-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
            <Check className="size-3.5" />
          </span>
          <span className="text-xs sm:text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
