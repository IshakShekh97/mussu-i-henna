"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Crown,
  Flower2,
  MapPin,
  MessageCircle,
  PartyPopper,
  Plus,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { type BookingFormValues, bookingFormSchema } from "@/lib/schemas";

interface CeremonyOption {
  id: string;
  num: string;
  title: string;
  bengali: string;
  badge: string;
  tag: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Exactly THREE hardcoded ceremonies as specified
const CEREMONIES: CeremonyOption[] = [
  {
    id: "bridal",
    num: "01",
    title: "Bridal / Normal Mehendi",
    bengali: "বাঙালি ব্রাইডাল ও সাধারণ মেহেন্দি",
    badge: "SIGNATURE BRIDAL",
    tag: "Bespoke Kolka & Traditional Art",
    description:
      "Bespoke Bengali Kolka motifs with guaranteed 48-hour deep mahogany stain.",
    icon: Crown,
  },
  {
    id: "guest_party",
    num: "02",
    title: "Guest / Party Mehendi",
    bengali: "অতিথি ও ব্রাইডাল পার্টি",
    badge: "CELEBRATION TROUPE",
    tag: "Sakhis, Borjatri & Family",
    description:
      "Fast, exquisite guest & bridesmaid adornments for celebratory troupes.",
    icon: PartyPopper,
  },
  {
    id: "festive_occasion",
    num: "03",
    title: "Festive / Occasion Mehendi",
    bengali: "উৎসব ও স্পেশাল অনুষ্ঠান",
    badge: "CULTURAL CELEBRATION",
    tag: "Gaye Holud, Pujo & Soirées",
    description:
      "Floral vines & traditional Alpona accents for Gaye Holud, Bou Bhat & Pujos.",
    icon: Flower2,
  },
];

const PLACEMENT_OPTIONS = [
  "Hands & Arms (Elbow to Palm)",
  "Forearms & Wrists Only",
  "Palms & Fingertips",
  "Feet & Ankles",
  "Legs (Knee to Ankle)",
  "Back / Shoulder Accent",
];

const BENGAL_DISTRICTS = [
  "Kolkata",
  "Howrah",
  "North 24 Parganas",
  "South 24 Parganas",
  "Hooghly",
  "Nadia",
  "Purba Medinipur",
  "Paschim Medinipur",
  "Burdwan (East & West)",
  "Birbhum (Santiniketan)",
  "Murshidabad",
  "Malda",
  "Darjeeling & Siliguri",
  "Other West Bengal Location",
];

function BookingContent() {
  const searchParams = useSearchParams();
  const occasionParam = searchParams.get("occasion");

  const [confirmedBooking, setConfirmedBooking] =
    useState<BookingFormValues | null>(null);
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  // Custom ceremonies added by user
  const [customCeremoniesList, setCustomCeremoniesList] = useState<string[]>(
    [],
  );
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customInputText, setCustomInputText] = useState("");

  const initialCeremony =
    occasionParam === "guest_party"
      ? "guest_party"
      : occasionParam === "festive_occasion"
        ? "festive_occasion"
        : "bridal";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      ceremonies: [initialCeremony],
      customCeremony: "",
      city: "Kolkata",
      location: "",
      ceremonyDate: "",
      preferences: ["Hands & Arms (Elbow to Palm)"],
      requirements: "",
    },
  });

  const selectedCeremonies = watch("ceremonies") || [];
  const selectedPreferences = watch("preferences") || [];
  const selectedDate = watch("ceremonyDate");

  // Sync URL query param on mount if provided
  useEffect(() => {
    if (occasionParam) {
      if (
        ["bridal", "guest_party", "festive_occasion"].includes(occasionParam)
      ) {
        setValue("ceremonies", [occasionParam]);
      } else if (occasionParam === "custom") {
        setIsAddingCustom(true);
      }
    }
  }, [occasionParam, setValue]);

  // SINGLE SELECTION ONLY: Select strictly one ceremony
  const handleCeremonySelect = (id: string) => {
    setValue("ceremonies", [id], { shouldValidate: true });
    if (!id.startsWith("custom:")) {
      setValue("customCeremony", "");
    }
  };

  // Add custom ceremony dynamically and set as the single selected ceremony
  const handleAddCustomSubmit = () => {
    const trimmed = customInputText.trim();
    if (!trimmed) return;

    if (!customCeremoniesList.includes(trimmed)) {
      setCustomCeremoniesList([...customCeremoniesList, trimmed]);
    }
    const customKey = `custom:${trimmed}`;
    setValue("ceremonies", [customKey], { shouldValidate: true });
    setValue("customCeremony", trimmed);
    setCustomInputText("");
    setIsAddingCustom(false);
  };

  // Remove a custom ceremony
  const handleRemoveCustom = (customName: string) => {
    const updatedList = customCeremoniesList.filter((c) => c !== customName);
    setCustomCeremoniesList(updatedList);
    const customKey = `custom:${customName}`;
    if (selectedCeremonies.includes(customKey)) {
      setValue("ceremonies", ["bridal"], { shouldValidate: true });
      setValue("customCeremony", "");
    }
  };

  // Toggle placement preference
  const handlePreferenceToggle = (item: string) => {
    const exists = selectedPreferences.includes(item);
    const updated = exists
      ? selectedPreferences.filter((p) => p !== item)
      : [...selectedPreferences, item];
    setValue("preferences", updated);
  };

  // Calendar generation helpers
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(year, month, 1).getDay();
  }, [year, month]);

  const monthName = useMemo(() => {
    return currentMonthDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [currentMonthDate]);

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const handleDateSelect = (dayNum: number) => {
    const selected = new Date(year, month, dayNum);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) return;

    const dateString = `${selected.getFullYear()}-${String(
      selected.getMonth() + 1,
    ).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;

    setValue("ceremonyDate", dateString, { shouldValidate: true });
  };

  const onSubmit = async (data: BookingFormValues) => {
    setConfirmedBooking(data);
  };

  const getOccasionLabels = (ceremonyIds: string[], customText?: string) => {
    return ceremonyIds
      .map((id) => {
        if (id === "bridal") return "Bridal / Normal Mehendi";
        if (id === "guest_party") return "Guest / Party Mehendi";
        if (id === "festive_occasion") return "Festive / Occasion Mehendi";
        if (id.startsWith("custom:")) return id.replace("custom:", "Custom: ");
        if (id === "custom")
          return customText ? `Custom (${customText})` : "Custom Occasion";
        return id;
      })
      .join(", ");
  };

  return (
    <main className="relative w-full min-h-screen pt-24 pb-20 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden">
      {/* ── Background Ambient Lights ── */}
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -20, 15, 0],
          scale: [1, 1.08, 0.95, 1],
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
          x: [0, -25, 20, 0],
          y: [0, 20, -15, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-96 right-1/4 w-96 h-96 bg-amber-500/6 rounded-full blur-3xl pointer-events-none"
      />

      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full mb-8 sm:mb-10 text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-wider uppercase mb-2.5">
          <Sparkles className="size-3" />
          <span>BENGALI BRIDAL ATELIER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
          BOOK YOUR CEREMONIAL RITUAL
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans max-w-xl mx-auto mt-2 leading-relaxed">
          Select your ceremonial tradition, or add your custom occasion. Receive
          an itemized quote on WhatsApp.
        </p>
      </motion.div>

      {/* ── Section 1: Strictly The 3 Compact Ceremony Cards + Custom Option ── */}
      <div className="relative z-10 w-full mb-8 sm:mb-10">
        <div className="flex items-center justify-between gap-3 mb-3.5 sm:mb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block">
              SACRED TRADITIONS
            </span>
            <h2 className="font-heading text-base sm:text-lg font-bold text-foreground">
              Select Ceremony
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingCustom((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-mono font-medium transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <Plus className="size-3" />
            <span>{isAddingCustom ? "Close" : "Custom Occasion"}</span>
          </button>
        </div>

        {/* Inline Custom Ceremony Input */}
        <AnimatePresence>
          {isAddingCustom && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mb-4 p-3.5 rounded-2xl border border-primary/30 bg-card/85 backdrop-blur-xl shadow-xs overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                <input
                  type="text"
                  value={customInputText}
                  onChange={(e) => setCustomInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomSubmit();
                    }
                  }}
                  placeholder="Enter custom occasion name (e.g. Sangeet Celebration, Ring Ceremony)..."
                  className="flex-1 rounded-xl bg-background/80 border border-border/70 px-3.5 py-2 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all"
                />
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleAddCustomSubmit}
                    disabled={!customInputText.trim()}
                    className="px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 shadow-xs"
                  >
                    Select Custom
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingCustom(false);
                      setCustomInputText("");
                    }}
                    className="px-3 py-2 rounded-full border border-border/70 hover:bg-muted text-xs font-mono text-muted-foreground transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Occasion Chips (Single Select) */}
        {customCeremoniesList.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-3.5 p-2 rounded-xl bg-muted/20 border border-border/40">
            <span className="text-[11px] font-mono text-muted-foreground ml-1">
              Custom:
            </span>
            {customCeremoniesList.map((customName) => {
              const isSelected = selectedCeremonies.includes(
                `custom:${customName}`,
              );
              return (
                <span
                  key={customName}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono transition-all ${
                    isSelected
                      ? "border-primary bg-primary/15 text-primary font-bold shadow-2xs"
                      : "border-border/70 bg-background/80 text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleCeremonySelect(`custom:${customName}`)}
                    className="flex items-center gap-1.5 cursor-pointer"
                  >
                    <div
                      className={`size-3.5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/60"
                      }`}
                    >
                      {isSelected && (
                        <div className="size-1 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <span>{customName}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveCustom(customName)}
                    className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer p-0.5 rounded-full hover:bg-muted"
                    title="Remove"
                    aria-label={`Remove ${customName}`}
                  >
                    <X className="size-3" />
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {/* STRICTLY THREE COMPACT, ELEGANT CEREMONY CARDS (SINGLE-SELECT) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {CEREMONIES.map((ceremony) => {
            const isSelected = selectedCeremonies.includes(ceremony.id);
            const Icon = ceremony.icon;

            return (
              <motion.div
                key={ceremony.id}
                whileHover={{ y: -2, scale: 1.008 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.18 }}
                onClick={() => handleCeremonySelect(ceremony.id)}
                className={`group relative rounded-2xl border p-3.5 sm:p-4 backdrop-blur-xl transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-primary bg-primary/8 ring-1 ring-primary/40 shadow-[0_4px_20px_-4px_rgba(139,58,43,0.18)]"
                    : "border-border/70 bg-card/75 hover:border-primary/40 hover:bg-card/90"
                }`}
              >
                <div>
                  {/* Top line: Num tag + Radio indicator */}
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-wider uppercase text-muted-foreground mb-2">
                    <span className="font-bold text-primary">
                      #{ceremony.num} {ceremony.badge}
                    </span>
                    <div
                      className={`size-4 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-primary bg-primary shadow-2xs"
                          : "border-border/70 bg-background/80 group-hover:border-primary/50"
                      }`}
                    >
                      {isSelected && (
                        <div className="size-1.5 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="size-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-sm sm:text-base font-bold text-foreground leading-snug truncate">
                        {ceremony.title}
                      </h3>
                      <span className="text-[11px] font-sans text-primary font-serif italic block truncate">
                        {ceremony.bengali}
                      </span>
                    </div>
                  </div>

                  {/* Concise description */}
                  <p className="text-[11px] sm:text-xs text-muted-foreground font-sans leading-relaxed line-clamp-2 mt-1">
                    {ceremony.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Section 2: Quotation Request Form Suite ── */}
      <div className="relative z-10 w-full rounded-3xl border border-border/70 bg-card/85 backdrop-blur-xl p-5 sm:p-8 lg:p-10 shadow-xs">
        {/* Form Suite Header */}
        <div className="pb-4 mb-5 border-b border-border/40 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block">
              CONFIDENTIAL INQUIRY
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-black tracking-tight text-foreground uppercase mt-0.5">
              Quotation &amp; Reservation Details
            </h2>
            <p className="text-xs text-muted-foreground font-sans mt-0.5">
              Fill in your details below. We will review availability and send
              your itemized estimate.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              West Bengal Autumn &amp; Winter 2026 Dates Open
            </span>
          </div>
        </div>

        {/* Selected Occasion Pill */}
        <div className="mb-5 sm:mb-6 p-3 rounded-2xl bg-muted/20 border border-border/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Selected Occasion:
            </span>
            {selectedCeremonies.map((id) => {
              const found = CEREMONIES.find((c) => c.id === id);
              const label = id.startsWith("custom:")
                ? id.replace("custom:", "Custom: ")
                : found?.title || "Bridal / Normal Mehendi";

              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold"
                >
                  <Check className="size-3" />
                  <span>{label}</span>
                </span>
              );
            })}
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            Single selection
          </span>
        </div>

        {/* Form Grid */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Form Fields (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              {/* Email Address */}
              <div>
                <label
                  htmlFor="bookingEmail"
                  className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                >
                  EMAIL ADDRESS *
                </label>
                <input
                  id="bookingEmail"
                  type="email"
                  placeholder="bride@email.com"
                  {...register("email")}
                  className="w-full rounded-xl bg-background/70 border border-border/70 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all shadow-2xs"
                />
                {errors.email && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* First Name * & Last Name * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="bookingFirstName"
                    className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                  >
                    FIRST NAME *
                  </label>
                  <input
                    id="bookingFirstName"
                    type="text"
                    placeholder="Debolina"
                    {...register("firstName")}
                    className="w-full rounded-xl bg-background/70 border border-border/70 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all shadow-2xs"
                  />
                  {errors.firstName && (
                    <span className="text-[11px] text-destructive mt-1 block">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="bookingLastName"
                    className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                  >
                    LAST NAME *
                  </label>
                  <input
                    id="bookingLastName"
                    type="text"
                    placeholder="Banerjee"
                    {...register("lastName")}
                    className="w-full rounded-xl bg-background/70 border border-border/70 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all shadow-2xs"
                  />
                  {errors.lastName && (
                    <span className="text-[11px] text-destructive mt-1 block">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Phone / WhatsApp Number */}
              <div>
                <label
                  htmlFor="bookingPhone"
                  className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                >
                  WHATSAPP CONTACT NUMBER *
                </label>
                <input
                  id="bookingPhone"
                  type="tel"
                  placeholder="+91 98300 00000"
                  {...register("phone")}
                  className="w-full rounded-xl bg-background/70 border border-border/70 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all shadow-2xs"
                />
                <span className="text-[11px] text-muted-foreground/80 font-sans mt-1 block">
                  Your personalized quotation will be sent directly via
                  WhatsApp.
                </span>
                {errors.phone && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* West Bengal District / City & Venue Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="bookingCity"
                    className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                  >
                    WEST BENGAL DISTRICT *
                  </label>
                  <select
                    id="bookingCity"
                    {...register("city")}
                    className="w-full rounded-xl bg-background/70 border border-border/70 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all shadow-2xs"
                  >
                    {BENGAL_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <span className="text-[11px] text-destructive mt-1 block">
                      {errors.city.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="bookingLocation"
                    className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                  >
                    VENUE / HOTEL / RESIDENCE *
                  </label>
                  <input
                    id="bookingLocation"
                    type="text"
                    placeholder="e.g. ITC Sonar / Hyatt Regency / Home"
                    {...register("location")}
                    className="w-full rounded-xl bg-background/70 border border-border/70 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all shadow-2xs"
                  />
                  {errors.location && (
                    <span className="text-[11px] text-destructive mt-1 block">
                      {errors.location.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Ceremony Date with Interactive Calendar */}
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                  CEREMONY DATE *{" "}
                  {selectedDate && `(Selected: ${selectedDate})`}
                </span>
                <input type="hidden" {...register("ceremonyDate")} />

                {/* Mini Calendar Widget */}
                <div className="rounded-2xl border border-border/70 bg-card/60 p-3.5 sm:p-4 shadow-2xs">
                  {/* Calendar Month Header */}
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-border/40">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="size-7 rounded-lg hover:bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      aria-label="Previous Month"
                    >
                      <ChevronLeft className="size-3.5" />
                    </button>
                    <span className="text-xs sm:text-sm font-mono font-bold text-foreground uppercase tracking-wider">
                      {monthName}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="size-7 rounded-lg hover:bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      aria-label="Next Month"
                    >
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>

                  {/* Days of Week */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <span
                        key={d}
                        className="text-[10px] font-mono uppercase text-muted-foreground/70"
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                      <div
                        key={`empty-${
                          // biome-ignore lint/suspicious/noArrayIndexKey: spacer
                          i
                        }`}
                        className="size-7 sm:size-8"
                      />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNum = i + 1;
                      const dateObj = new Date(year, month, dayNum);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const isPast = dateObj < today;

                      const formattedDay = `${year}-${String(
                        month + 1,
                      ).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                      const isSelected = selectedDate === formattedDay;

                      return (
                        <button
                          key={dayNum}
                          type="button"
                          disabled={isPast}
                          onClick={() => handleDateSelect(dayNum)}
                          className={`size-7 sm:size-8 rounded-full text-xs font-mono transition-all flex items-center justify-center mx-auto cursor-pointer ${
                            isPast
                              ? "text-muted-foreground/30 cursor-not-allowed"
                              : isSelected
                                ? "bg-primary text-primary-foreground font-bold shadow-xs scale-105"
                                : "text-foreground hover:bg-primary/15 hover:text-primary"
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {errors.ceremonyDate && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.ceremonyDate.message}
                  </span>
                )}
              </div>

              {/* Body Placement Preferences */}
              <div>
                <span className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                  MEHENDI COVERAGE PREFERENCES
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {PLACEMENT_OPTIONS.map((opt) => {
                    const isChecked = selectedPreferences.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handlePreferenceToggle(opt)}
                        className={`px-3 py-1 rounded-full border text-xs font-sans transition-all cursor-pointer ${
                          isChecked
                            ? "border-primary bg-primary/10 text-primary font-medium"
                            : "border-border/60 bg-muted/30 hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        {isChecked ? "✓ " : "+ "}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Requirements */}
              <div>
                <label
                  htmlFor="bookingRequirements"
                  className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                >
                  ADDITIONAL MOTIF OR TIMING REQUIREMENTS (OPTIONAL)
                </label>
                <textarea
                  id="bookingRequirements"
                  rows={2}
                  placeholder="Bride & groom initials to conceal, family heirloom motifs, ceremony timing..."
                  {...register("requirements")}
                  className="w-full rounded-xl bg-background/70 border border-border/70 px-4 py-2.5 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all resize-none shadow-2xs"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-1">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="w-full rounded-full border border-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground py-3 sm:py-3.5 px-8 font-bold uppercase tracking-wider text-xs sm:text-sm shadow-[0_10px_30px_-5px_rgba(139,58,43,0.35)] backdrop-blur-xl transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Preparing Quotation...</span>
                  ) : (
                    <>
                      <span>Request Bridal Quotation</span>
                      <Sparkles className="size-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Right Column: Studio Card & Assurance (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Studio Lounge Visual Card */}
              <div className="rounded-3xl border border-border/70 bg-card/75 backdrop-blur-xl overflow-hidden shadow-xs">
                <div className="relative aspect-16/10 w-full">
                  <Image
                    src="/booking-atelier.jpg"
                    alt="Mussu Henna Bridal Studio Kolkata"
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                      KOLKATA FLAGSHIP ATELIER
                    </span>
                    <h4 className="font-heading text-base sm:text-lg font-bold text-foreground">
                      Camac Heritage Mansions
                    </h4>
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-3 text-xs font-sans">
                  <div className="flex items-start gap-2.5 text-muted-foreground">
                    <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Suite 12, 3rd Floor, Camac Street &amp; Park Street
                      Crossing, Kolkata 700016
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5 text-muted-foreground">
                    <Clock className="size-4 text-primary shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Tuesday – Sunday, 11:00 AM – 7:30 PM (By appointment)
                    </p>
                  </div>
                </div>
              </div>

              {/* Bengal Artisanal Assurance */}
              <div className="rounded-3xl border border-border/70 bg-muted/20 p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-bold">
                  <ShieldCheck className="size-4" />
                  <span>THE BENGAL ATELIER STANDARD</span>
                </div>

                <div className="space-y-2.5 text-xs font-sans text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground">
                        100% Bengal Lawsonia:
                      </strong>{" "}
                      Freshly mixed with zero synthetic chemicals, black henna,
                      or PPD.
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
                      <strong className="text-foreground">
                        Doorstep Patch-Test:
                      </strong>{" "}
                      Delivered across West Bengal before the wedding.
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Concierge Card */}
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
                  href="https://wa.me/919830000000?text=Hello%20Mussu%2C%20I%20would%20like%20to%20check%20availability%20for%20a%20Bengali%20bridal%20mehndi%20booking."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#160B0F] hover:bg-primary text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs shrink-0"
                >
                  <MessageCircle className="size-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </motion.a>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* ── Confirmation Modal ── */}
      <AnimatePresence>
        {confirmedBooking && (
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
                    {getOccasionLabels(
                      confirmedBooking.ceremonies,
                      confirmedBooking.customCeremony,
                    )}
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
                  href={`https://wa.me/919830000000?text=${encodeURIComponent(
                    `Hello Mussu, I have submitted a bridal quotation request for ${getOccasionLabels(
                      confirmedBooking.ceremonies,
                      confirmedBooking.customCeremony,
                    )} on ${confirmedBooking.ceremonyDate} at ${
                      confirmedBooking.location
                    }, ${confirmedBooking.city}. My name is ${
                      confirmedBooking.firstName
                    } ${confirmedBooking.lastName}.`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-5 text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  <MessageCircle className="size-4" />
                  <span>Confirm on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setConfirmedBooking(null)}
                  className="px-5 py-3 rounded-full border border-border/70 hover:bg-muted text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-28 flex items-center justify-center text-xs font-mono text-muted-foreground">
          Loading Bridal Suite...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
