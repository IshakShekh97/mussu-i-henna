"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  MessageCircle,
  Search,
  Snowflake,
  Sparkles,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type TrackOrderValues, trackOrderSchema } from "@/lib/schemas";

interface Milestone {
  title: string;
  detail: string;
  time: string;
  completed: boolean;
  current: boolean;
}

interface MockOrder {
  orderId: string;
  customerName: string;
  city: string;
  courier: string;
  awb: string;
  dispatchDate: string;
  estimatedArrival: string;
  items: { name: string; quantity: number }[];
  milestones: Milestone[];
}

const MOCK_ORDERS: Record<string, MockOrder> = {
  "MH-2026-01": {
    orderId: "MH-2026-01",
    customerName: "Debolina Banerjee",
    city: "Park Street, Kolkata",
    courier: "BlueDart Express Air Priority",
    awb: "BLD-849204128",
    dispatchDate: "14 Sep 2026, 09:30 AM",
    estimatedArrival: "16 Sep 2026 (Before Ceremony)",
    items: [
      { name: "Kolkata Bengal Organic Cones (Pack of 6)", quantity: 2 },
      { name: "Mahogany Glow Aftercare Balm", quantity: 1 },
      { name: "Pure Nilgiri Henna Essential Oil", quantity: 1 },
    ],
    milestones: [
      {
        title: "Batch Hand-Churned & Mixed",
        detail:
          "Triple-sifted Bengal Lawsonia prepared with steam-distilled eucalyptus.",
        time: "13 Sep, 11:00 AM",
        completed: true,
        current: false,
      },
      {
        title: "Inspected & Cold-Pack Packaged",
        detail:
          "Sealed with reusable cold-gel pack in insulated thermal pouch.",
        time: "13 Sep, 04:30 PM",
        completed: true,
        current: false,
      },
      {
        title: "Dispatched via Priority Air",
        detail:
          "Handed over to BlueDart Express hub (Airport transit facility).",
        time: "14 Sep, 09:30 AM",
        completed: true,
        current: true,
      },
      {
        title: "Out for Delivery",
        detail: "Courier agent will attempt delivery to your doorstep address.",
        time: "Expected 16 Sep",
        completed: false,
        current: false,
      },
      {
        title: "Delivered to Bridal Suite",
        detail:
          "Store in freezer (-18°C) until 30 minutes prior to application.",
        time: "Pending Delivery",
        completed: false,
        current: false,
      },
    ],
  },
  "MH-2026-02": {
    orderId: "MH-2026-02",
    customerName: "Priyanka Roy",
    city: "Ballygunge, Kolkata",
    courier: "DTDC Premium Cold-Chain",
    awb: "DTC-928103714",
    dispatchDate: "14 Sep 2026, 03:00 PM",
    estimatedArrival: "15 Sep 2026",
    items: [
      { name: "Bengali Bridal Kolka Box", quantity: 1 },
      { name: "Artisan Fine-Tip Kolka Cones", quantity: 3 },
    ],
    milestones: [
      {
        title: "Batch Hand-Churned & Mixed",
        detail:
          "Triple-sifted Bengal Lawsonia prepared with steam-distilled eucalyptus.",
        time: "14 Sep, 10:00 AM",
        completed: true,
        current: false,
      },
      {
        title: "Inspected & Cold-Pack Packaged",
        detail:
          "Sealed with reusable cold-gel pack in insulated thermal pouch.",
        time: "14 Sep, 02:30 PM",
        completed: true,
        current: true,
      },
      {
        title: "Dispatched via Priority Air",
        detail: "Courier pickup scheduled for afternoon transit.",
        time: "Expected Today",
        completed: false,
        current: false,
      },
      {
        title: "Out for Delivery",
        detail: "Courier agent will attempt delivery to your doorstep address.",
        time: "Expected 15 Sep",
        completed: false,
        current: false,
      },
      {
        title: "Delivered to Bridal Suite",
        detail:
          "Store in freezer (-18°C) until 30 minutes prior to application.",
        time: "Pending Delivery",
        completed: false,
        current: false,
      },
    ],
  },
  "MH-2026-03": {
    orderId: "MH-2026-03",
    customerName: "Ananya Sen",
    city: "Salt Lake Sector V, Kolkata",
    courier: "Delhivery Air Express",
    awb: "DEL-738192019",
    dispatchDate: "12 Sep 2026, 08:00 AM",
    estimatedArrival: "13 Sep 2026 (Delivered)",
    items: [
      { name: "Gaye Holud & Biye Trunk", quantity: 1 },
      { name: "Stain Protection Elixir", quantity: 2 },
    ],
    milestones: [
      {
        title: "Batch Hand-Churned & Mixed",
        detail:
          "Triple-sifted Bengal Lawsonia prepared with steam-distilled eucalyptus.",
        time: "11 Sep, 09:00 AM",
        completed: true,
        current: false,
      },
      {
        title: "Inspected & Cold-Pack Packaged",
        detail:
          "Sealed with reusable cold-gel pack in insulated thermal pouch.",
        time: "11 Sep, 03:00 PM",
        completed: true,
        current: false,
      },
      {
        title: "Dispatched via Priority Air",
        detail: "Handed over to courier express hub.",
        time: "12 Sep, 08:00 AM",
        completed: true,
        current: false,
      },
      {
        title: "Out for Delivery",
        detail: "Courier agent departed for final mile delivery.",
        time: "13 Sep, 10:15 AM",
        completed: true,
        current: false,
      },
      {
        title: "Delivered to Bridal Suite",
        detail: "Package delivered safely. Cones frozen for wedding day.",
        time: "13 Sep, 01:45 PM",
        completed: true,
        current: true,
      },
    ],
  },
};

export default function TrackOrderPage() {
  const [activeOrder, setActiveOrder] = useState<MockOrder | null>(
    MOCK_ORDERS["MH-2026-01"],
  );
  const [hasSearched, setHasSearched] = useState(false);
  const [copiedAwb, setCopiedAwb] = useState(false);

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

  const onSubmit = async (data: TrackOrderValues) => {
    setHasSearched(true);
    const cleaned = data.query.trim().toUpperCase();
    const found = MOCK_ORDERS[cleaned] || null;
    setActiveOrder(found);
  };

  const handleQuickSelect = (id: string) => {
    setValue("query", id, { shouldValidate: true });
    setActiveOrder(MOCK_ORDERS[id]);
    setHasSearched(false);
  };

  const handleCopyAwb = (awb: string) => {
    navigator.clipboard.writeText(awb);
    setCopiedAwb(true);
    setTimeout(() => setCopiedAwb(false), 2000);
  };

  // Calculate milestone progress percentage for line fill
  const activeStepIndex = activeOrder
    ? activeOrder.milestones.findLastIndex((m) => m.completed || m.current)
    : 0;
  const progressRatio =
    activeOrder && activeOrder.milestones.length > 1
      ? Math.max(0, activeStepIndex) / (activeOrder.milestones.length - 1)
      : 0;

  return (
    <main className="relative w-full min-h-screen pt-24 pb-20 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden">
      {/* ── Background Subtle Ambient Lights (Living float animation) ── */}
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

      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full mb-10 sm:mb-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-wider uppercase mb-3"
        >
          <Sparkles className="size-3" />
          <span>ATELIER LOGISTICS | 01</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase"
        >
          TRACK YOUR FRESH ORDER
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs sm:text-sm text-muted-foreground font-sans max-w-xl mt-2 leading-relaxed"
        >
          Monitor your fresh henna cones from our hand-churned Bengal Lawsonia
          batches, thermal cold-pack preparation, and express air transit to
          your bridal suite.
        </motion.p>

        {/* ── Search Bar Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 max-w-2xl"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. MH-2026-01)"
                {...register("query")}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border/70 text-xs sm:text-sm font-mono text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-xs"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs disabled:opacity-50"
            >
              <span>{isSubmitting ? "Searching..." : "Track Status"}</span>
              <ArrowRight className="size-4" />
            </motion.button>
          </form>
          {errors.query && (
            <span className="text-[11px] text-destructive font-mono mt-1.5 ml-4 block">
              {errors.query.message}
            </span>
          )}

          {/* Quick Demo Selector */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-mono text-muted-foreground">
            <span>Try sample orders:</span>
            {Object.keys(MOCK_ORDERS).map((id) => (
              <motion.button
                key={id}
                type="button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleQuickSelect(id)}
                className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                  activeOrder?.orderId === id
                    ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                    : "border-border/60 bg-muted/30 hover:bg-muted text-muted-foreground"
                }`}
              >
                {id}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Order Display Area with Smooth Transitions ── */}
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
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="size-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-3"
            >
              <AlertCircle className="size-8" />
            </motion.div>
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* ── Left Column: Animated 5-Step Milestone Tracker (lg:col-span-7) ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-7 rounded-3xl border border-border/70 bg-card/85 backdrop-blur-xl p-6 sm:p-8 shadow-xs"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/40">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                    LIVE ATELIER TRANSIT
                  </span>
                  <h2 className="font-heading text-lg sm:text-xl font-bold text-foreground mt-0.5">
                    Order {activeOrder.orderId}
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
                  </span>
                  Active Batch
                </span>
              </div>

              {/* Milestones Timeline */}
              <div className="relative pl-6 sm:pl-8 space-y-6">
                {/* Background timeline rail */}
                <div className="absolute top-4 bottom-6 left-3 sm:left-4 w-0.5 bg-border/40 -translate-x-1/2 rounded-full overflow-hidden">
                  {/* Filled progress bar */}
                  <motion.div
                    initial={{ height: "0%" }}
                    animate={{ height: `${progressRatio * 100}%` }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.15,
                    }}
                    className="w-full bg-gradient-to-b from-primary via-primary to-emerald-500 rounded-full"
                  />
                </div>

                {activeOrder.milestones.map((milestone, idx) => (
                  <motion.div
                    key={milestone.title}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 + idx * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative flex items-start gap-4 group"
                  >
                    {/* Step Marker Dot */}
                    {milestone.completed ? (
                      <motion.span
                        initial={{ scale: 0.6 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + idx * 0.08 }}
                        className="absolute -left-6 sm:-left-8 top-1 size-6 sm:size-8 rounded-full border border-primary bg-primary text-primary-foreground shadow-xs flex items-center justify-center -translate-x-1/2"
                      >
                        <CheckCircle2 className="size-3.5 sm:size-4" />
                      </motion.span>
                    ) : milestone.current ? (
                      <span className="absolute -left-6 sm:-left-8 top-1 size-6 sm:size-8 rounded-full border border-emerald-500 bg-card text-emerald-500 flex items-center justify-center -translate-x-1/2 shadow-xs">
                        <motion.span
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.7, 0, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 rounded-full bg-emerald-500/30"
                        />
                        <Clock className="size-3.5 sm:size-4 relative z-10 animate-spin [animation-duration:8s]" />
                      </span>
                    ) : (
                      <span className="absolute -left-6 sm:-left-8 top-1 size-6 sm:size-8 rounded-full border border-border bg-background text-muted-foreground/60 flex items-center justify-center -translate-x-1/2">
                        <Clock className="size-3.5 sm:size-4" />
                      </span>
                    )}

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h3
                          className={`text-xs sm:text-sm font-heading font-bold transition-colors ${
                            milestone.completed || milestone.current
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {milestone.title}
                        </h3>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {milestone.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground font-sans mt-0.5 leading-relaxed">
                        {milestone.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Right Column: Order Details & Cold Storage Instructions (lg:col-span-5) ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {/* Shipment Overview Box */}
              <div className="rounded-3xl border border-border/70 bg-card/85 backdrop-blur-xl p-6 shadow-xs transition-colors hover:border-border">
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border/40 text-xs font-mono uppercase tracking-widest text-primary font-bold">
                  <Truck className="size-4" />
                  <span>COURIER &amp; DISPATCH DATA</span>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Customer:</span>
                    <span className="font-semibold text-foreground">
                      {activeOrder.customerName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Destination:</span>
                    <span className="font-semibold text-foreground">
                      {activeOrder.city}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Courier:</span>
                    <span className="font-mono font-medium text-foreground">
                      {activeOrder.courier}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      AWB Tracking No:
                    </span>
                    <div className="inline-flex items-center gap-1.5">
                      <span className="font-mono text-primary font-bold">
                        {activeOrder.awb}
                      </span>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                        onClick={() => handleCopyAwb(activeOrder.awb)}
                        className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        title="Copy AWB Tracking Number"
                        aria-label="Copy AWB Tracking Number"
                      >
                        {copiedAwb ? (
                          <Check className="size-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border/40">
                    <span className="text-muted-foreground">
                      Estimated Arrival:
                    </span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {activeOrder.estimatedArrival}
                    </span>
                  </div>
                </div>

                {/* Items in this Batch */}
                <div className="mt-5 pt-4 border-t border-border/40">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                    ITEMS IN THIS BATCH
                  </span>
                  <ul className="space-y-1.5 text-xs font-sans">
                    {activeOrder.items.map((item) => (
                      <motion.li
                        key={item.name}
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between text-foreground py-0.5"
                      >
                        <span className="line-clamp-1">{item.name}</span>
                        <span className="font-mono text-muted-foreground ml-2">
                          x{item.quantity}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Cold Chain Henna Storage Instructions */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl border border-border/70 bg-muted/30 p-5 sm:p-6 flex items-start gap-4 group"
              >
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="size-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <Snowflake className="size-5" />
                </motion.div>
                <div className="text-xs font-sans text-muted-foreground leading-relaxed">
                  <strong className="text-foreground font-semibold block text-sm mb-0.5">
                    Important Fresh Storage Advice
                  </strong>
                  Because our cones contain 100% pure Lawsonia and zero chemical
                  preservatives, please store cones in your freezer immediately
                  upon delivery. Defrost at room temperature 30 minutes before
                  ceremonial application.
                </div>
              </motion.div>

              {/* Concierge Help */}
              <div className="p-5 rounded-3xl border border-primary/20 bg-primary/5 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-heading text-sm font-bold text-foreground">
                    Need Help With Delivery?
                  </h4>
                  <p className="text-[11px] text-muted-foreground font-sans mt-0.5">
                    Direct dispatch concierge on WhatsApp.
                  </p>
                </div>
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href={`https://wa.me/919830000000?text=Hello%20Mussu%2C%20I%20have%20an%20inquiry%20regarding%20my%20order%20${activeOrder.orderId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#160B0F] hover:bg-primary text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs shrink-0"
                >
                  <MessageCircle className="size-3.5 text-emerald-400" />
                  <span>Contact</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
