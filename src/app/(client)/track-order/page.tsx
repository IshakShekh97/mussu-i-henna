"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import OrderMilestonesTimeline from "@/components/track-order/OrderMilestonesTimeline";
import OrderPackageDetails from "@/components/track-order/OrderPackageDetails";
import OrderSearchBar from "@/components/track-order/OrderSearchBar";
import OrderStatusCard from "@/components/track-order/OrderStatusCard";
import { MOCK_ORDERS, type MockOrder } from "@/data/orders";
import { type TrackOrderValues, trackOrderSchema } from "@/lib/schemas";

export default function TrackOrderPage() {
  const [activeOrder, setActiveOrder] = useState<MockOrder | null>(
    MOCK_ORDERS["MH-2026-01"],
  );
  const [hasSearched, setHasSearched] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TrackOrderValues>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: {
      query: "MH-2026-01",
    },
  });

  const onSubmit = (data: TrackOrderValues) => {
    setHasSearched(true);
    const cleaned = data.query.trim().toUpperCase();
    const found = MOCK_ORDERS[cleaned] || null;
    setActiveOrder(found);
  };

  const handleSelectSample = (orderId: string) => {
    setValue("query", orderId, { shouldValidate: true });
    setActiveOrder(MOCK_ORDERS[orderId] || null);
    setHasSearched(false);
  };

  return (
    <main className="relative w-full min-h-screen pt-24 pb-20 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden">
      <motion.div
        animate={{
          x: [0, 20, -15, 0],
          y: [0, -15, 12, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-1/4 -translate-x-1/2 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -22, 18, 0],
          y: [0, 18, -12, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-96 right-1/4 w-96 h-96 bg-emerald-500/6 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-wider uppercase mb-3">
            <Sparkles className="size-3" />
            <span>ATELIER LOGISTICS | 01</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
            TRACK YOUR FRESH ORDER
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground font-sans max-w-xl mt-2 leading-relaxed">
            Monitor your fresh henna cones from our hand-churned Bengal Lawsonia
            batches, thermal cold-pack preparation, and express air transit to
            your bridal suite.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 max-w-2xl">
            <OrderSearchBar
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
              onSelectSample={handleSelectSample}
            />
          </form>
        </div>

        <AnimatePresence mode="wait">
          {hasSearched && !activeOrder ? (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-border/70 bg-card/70 backdrop-blur-xl p-10 text-center max-w-xl mx-auto my-8 shadow-xs"
            >
              <div className="size-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="size-8" />
              </div>
              <h2 className="font-heading text-lg font-bold text-foreground">
                No Active Batch Found
              </h2>
              <p className="text-xs text-muted-foreground font-sans mt-1">
                We couldn&apos;t find an order matching that identifier. Please
                check the spelling or click one of our sample order codes above.
              </p>
            </motion.div>
          ) : activeOrder ? (
            <motion.div
              key={activeOrder.orderId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <OrderStatusCard order={activeOrder} />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7">
                  <OrderMilestonesTimeline
                    milestones={activeOrder.milestones}
                  />
                </div>
                <div className="lg:col-span-5">
                  <OrderPackageDetails order={activeOrder} />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
