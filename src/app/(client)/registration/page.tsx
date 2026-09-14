"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
  Package,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { type RegistrationValues, registrationSchema } from "@/lib/schemas";

const WORKSHOP_PROGRAMS = [
  {
    id: "bengali-kolka",
    name: "Bengali Kolka & Bridal Geometry Masterclass (3-Day Intensive)",
    price: "₹8,500",
    description:
      "In-depth Kolka drafting, ancestral motifs & bridal symmetries.",
  },
  {
    id: "henna-chemistry",
    name: "Lawsonia Chemistry & Cone Churning Atelier (1-Day Hands-on)",
    price: "₹4,200",
    description:
      "Botanical formulation, Nilgiri oil blending & micro-cone rolling.",
  },
  {
    id: "advanced-speed",
    name: "Bridal Troupe & Speed Adornment Certification (2-Day Bootcamp)",
    price: "₹7,200",
    description:
      "Guest adornment pacing, Borjatri layouts & live bridal drills.",
  },
];

const COHORTS = [
  "October 2026 Weekend Batch (Kolkata Studio & Live Stream)",
  "November 2026 Pre-Wedding Season Intensive (Kolkata Flagship)",
  "December 2026 Winter Masterclass Cohort (Limited 10 Seats)",
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

export default function RegistrationPage() {
  const [confirmedData, setConfirmedData] = useState<RegistrationValues | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "Kolkata",
      program: WORKSHOP_PROGRAMS[0].id,
      cohort: COHORTS[0],
      experienceLevel: "beginner",
      includeKit: true,
      notes: "",
    },
  });

  const onSubmit = async (data: RegistrationValues) => {
    // Artificial slight delay for snappy UX
    await new Promise((resolve) => setTimeout(resolve, 350));
    setConfirmedData(data);

    const programName =
      WORKSHOP_PROGRAMS.find((p) => p.id === data.program)?.name ||
      data.program;

    const message = encodeURIComponent(
      `Hello Mussu! I have submitted my registration for the ${programName}.\n\n` +
        `• Name: ${data.fullName}\n` +
        `• WhatsApp: ${data.phone}\n` +
        `• District/City: ${data.city}\n` +
        `• Cohort: ${data.cohort}\n` +
        `• Experience: ${data.experienceLevel.toUpperCase()}\n` +
        `• Include Curated Student Kit: ${data.includeKit ? "Yes" : "No"}\n\n` +
        `Please confirm my registration slot and share atelier welcome details!`,
    );

    window.open(`https://wa.me/919830000000?text=${message}`, "_blank");
  };

  return (
    <main className="relative w-full min-h-screen pt-24 sm:pt-28 pb-20 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden">
      {/* ── Background Subtle Ambient Lights ── */}
      <div className="absolute top-24 left-1/4 -translate-x-1/2 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 right-1/4 w-96 h-96 bg-amber-500/6 rounded-full blur-3xl pointer-events-none" />

      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full mb-8 sm:mb-10 text-center max-w-3xl mx-auto"
      >
        <Badge
          variant="outline"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border-primary/20 text-primary text-xs font-mono tracking-wider uppercase mb-2.5"
        >
          <GraduationCap className="size-3.5" />
          <span>ATELIER ACADEMY &amp; MASTERCLASSES</span>
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
          REGISTER FOR ATELIER APPRENTICESHIP
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans max-w-xl mx-auto mt-2 leading-relaxed">
          Learn authentic Bengali Kolka motifs, 100% natural Lawsonia cone
          rolling, and bridal composition straight from Mussu Shekh.
        </p>
      </motion.div>

      {/* ── Main Registration Suite ── */}
      <div className="relative z-10 w-full rounded-3xl border border-border/70 bg-card/85 backdrop-blur-xl p-5 sm:p-8 lg:p-10 shadow-xs">
        {/* Form Suite Header */}
        <div className="pb-4 mb-6 border-b border-border/40 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block">
              ADMISSIONS 2026—2027
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-black tracking-tight text-foreground uppercase mt-0.5">
              Candidate Enrollment Form
            </h2>
            <p className="text-xs text-muted-foreground font-sans mt-0.5">
              Complete your profile below to secure your seat. Intimate cohort
              strictly capped at 10 candidates.
            </p>
          </div>

          <Badge
            variant="outline"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold w-fit"
          >
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Kolkata Autumn &amp; Winter Cohorts Open
          </Badge>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Controls (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Program Track (Select Component) */}
              <div>
                <Label
                  htmlFor="programSelect"
                  className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5"
                >
                  SELECT MASTERCLASS PROGRAM *
                </Label>
                <Controller
                  name="program"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="programSelect"
                        className="w-full justify-between rounded-xl bg-background/70 border-border/70 px-4 py-3 text-xs sm:text-sm font-sans text-foreground shadow-2xs h-auto cursor-pointer"
                      >
                        <SelectValue placeholder="Select workshop program..." />
                      </SelectTrigger>
                      <SelectContent
                        side="bottom"
                        align="start"
                        className="max-h-80 rounded-xl border border-border/60 bg-card/95 backdrop-blur-2xl p-1.5 shadow-2xl text-foreground z-50 transform-gpu"
                      >
                        {WORKSHOP_PROGRAMS.map((prog) => (
                          <SelectItem
                            key={prog.id}
                            value={prog.id}
                            className="rounded-lg px-3 py-2.5 text-xs sm:text-sm cursor-pointer transition-colors duration-150 focus:bg-primary/10 focus:text-primary data-checked:bg-primary/10 data-checked:text-primary"
                          >
                            <div className="flex flex-col gap-0.5">
                              <span className="font-semibold text-foreground">
                                {prog.name}
                              </span>
                              <span className="text-[11px] text-muted-foreground font-sans">
                                {prog.description} •{" "}
                                <strong className="text-primary font-mono">
                                  {prog.price}
                                </strong>
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.program && (
                  <span className="text-[11px] text-destructive mt-1 block">
                    {errors.program.message}
                  </span>
                )}
              </div>

              {/* Cohort Batch (Select Component) */}
              <div>
                <Label
                  htmlFor="cohortSelect"
                  className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5"
                >
                  PREFERRED COHORT SCHEDULE *
                </Label>
                <Controller
                  name="cohort"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="cohortSelect"
                        className="w-full justify-between rounded-xl bg-background/70 border-border/70 px-4 py-3 text-xs sm:text-sm font-sans text-foreground shadow-2xs h-auto cursor-pointer"
                      >
                        <SelectValue placeholder="Select cohort..." />
                      </SelectTrigger>
                      <SelectContent
                        side="bottom"
                        align="start"
                        className="rounded-xl border border-border/60 bg-card/95 backdrop-blur-2xl p-1.5 shadow-2xl text-foreground z-50 transform-gpu"
                      >
                        {COHORTS.map((c) => (
                          <SelectItem
                            key={c}
                            value={c}
                            className="rounded-lg px-3 py-2 text-xs sm:text-sm cursor-pointer transition-colors duration-150 focus:bg-primary/10 focus:text-primary data-checked:bg-primary/10 data-checked:text-primary"
                          >
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <Separator className="my-2 bg-border/40" />

              {/* Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <Label
                    htmlFor="fullName"
                    className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                  >
                    FULL NAME *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Subhashree Sen"
                    {...register("fullName")}
                    className="w-full rounded-xl bg-background/70 border-border/70 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all shadow-2xs h-auto"
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-destructive mt-1 block">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                  >
                    EMAIL ADDRESS *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="artist@atelier.com"
                    {...register("email")}
                    className="w-full rounded-xl bg-background/70 border-border/70 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all shadow-2xs h-auto"
                  />
                  {errors.email && (
                    <span className="text-[11px] text-destructive mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Phone & Bengal District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <Label
                    htmlFor="phone"
                    className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                  >
                    WHATSAPP PHONE NUMBER *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98300 00000"
                    {...register("phone")}
                    className="w-full rounded-xl bg-background/70 border-border/70 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all shadow-2xs h-auto"
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-destructive mt-1 block">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="citySelect"
                    className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                  >
                    WEST BENGAL LOCATION *
                  </Label>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="citySelect"
                          className="w-full justify-between rounded-xl bg-background/70 border-border/70 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-sans text-foreground shadow-2xs h-auto cursor-pointer"
                        >
                          <SelectValue placeholder="Select district..." />
                        </SelectTrigger>
                        <SelectContent
                          side="bottom"
                          align="start"
                          className="max-h-60 rounded-xl border border-border/60 bg-card/95 backdrop-blur-2xl p-1 shadow-2xl text-foreground z-50 transform-gpu"
                        >
                          {BENGAL_DISTRICTS.map((d) => (
                            <SelectItem
                              key={d}
                              value={d}
                              className="rounded-lg px-3 py-2 text-xs sm:text-sm cursor-pointer transition-colors duration-150 focus:bg-primary/10 focus:text-primary data-checked:bg-primary/10 data-checked:text-primary"
                            >
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* Experience Level (RadioGroup Component) */}
              <div>
                <Label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                  YOUR HENNA ART EXPERIENCE LEVEL *
                </Label>
                <Controller
                  name="experienceLevel"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
                    >
                      <label
                        htmlFor="r-beginner"
                        className={`flex items-start gap-2.5 p-3 rounded-2xl border cursor-pointer transition-all ${
                          field.value === "beginner"
                            ? "border-primary bg-primary/10 ring-1 ring-primary/40 shadow-2xs"
                            : "border-border/70 bg-background/70 hover:border-primary/40"
                        }`}
                      >
                        <RadioGroupItem
                          value="beginner"
                          id="r-beginner"
                          className="mt-0.5"
                        />
                        <div className="flex flex-col">
                          <span className="font-heading text-xs font-bold text-foreground">
                            Beginner
                          </span>
                          <span className="text-[10px] text-muted-foreground font-sans">
                            Starting from zero
                          </span>
                        </div>
                      </label>

                      <label
                        htmlFor="r-intermediate"
                        className={`flex items-start gap-2.5 p-3 rounded-2xl border cursor-pointer transition-all ${
                          field.value === "intermediate"
                            ? "border-primary bg-primary/10 ring-1 ring-primary/40 shadow-2xs"
                            : "border-border/70 bg-background/70 hover:border-primary/40"
                        }`}
                      >
                        <RadioGroupItem
                          value="intermediate"
                          id="r-intermediate"
                          className="mt-0.5"
                        />
                        <div className="flex flex-col">
                          <span className="font-heading text-xs font-bold text-foreground">
                            Intermediate
                          </span>
                          <span className="text-[10px] text-muted-foreground font-sans">
                            Cones &amp; basic motifs
                          </span>
                        </div>
                      </label>

                      <label
                        htmlFor="r-professional"
                        className={`flex items-start gap-2.5 p-3 rounded-2xl border cursor-pointer transition-all ${
                          field.value === "professional"
                            ? "border-primary bg-primary/10 ring-1 ring-primary/40 shadow-2xs"
                            : "border-border/70 bg-background/70 hover:border-primary/40"
                        }`}
                      >
                        <RadioGroupItem
                          value="professional"
                          id="r-professional"
                          className="mt-0.5"
                        />
                        <div className="flex flex-col">
                          <span className="font-heading text-xs font-bold text-foreground">
                            Professional
                          </span>
                          <span className="text-[10px] text-muted-foreground font-sans">
                            Practicing bridal artist
                          </span>
                        </div>
                      </label>
                    </RadioGroup>
                  )}
                />
              </div>

              {/* Kit Addon (Checkbox Component) */}
              <div className="p-3.5 rounded-2xl border border-primary/25 bg-primary/5">
                <Controller
                  name="includeKit"
                  control={control}
                  render={({ field }) => (
                    <label
                      htmlFor="includeKitCheckbox"
                      className="flex items-start gap-3 cursor-pointer select-none"
                    >
                      <Checkbox
                        id="includeKitCheckbox"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5 rounded-md border-primary text-primary"
                      />
                      <div className="flex flex-col text-xs font-sans">
                        <span className="font-bold text-foreground flex items-center gap-1.5">
                          <Package className="size-3.5 text-primary" />
                          <span>Include Curated Atelier Student Kit</span>
                          <Badge
                            variant="outline"
                            className="text-[9px] font-mono border-primary/30 text-primary py-0 px-1.5 ml-1"
                          >
                            RECOMMENDED
                          </Badge>
                        </span>
                        <span className="text-muted-foreground text-[11px] mt-0.5 leading-relaxed">
                          12 freshly churned Bengal organic cones, Nilgiri
                          aftercare balm, acrylic double-sided practice hand
                          &amp; pattern grid sketchbook.
                        </span>
                      </div>
                    </label>
                  )}
                />
              </div>

              {/* Notes / Aspirations (Textarea Component) */}
              <div>
                <Label
                  htmlFor="notes"
                  className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                >
                  GOALS &amp; SPECIFIC MOTIFS YOU WISH TO MASTER (OPTIONAL)
                </Label>
                <Textarea
                  id="notes"
                  rows={2}
                  placeholder="e.g. Master clean Kolka teardrops, overcome hand tremors, understand natural stain chemistry..."
                  {...register("notes")}
                  className="w-full rounded-xl bg-background/70 border-border/70 px-4 py-2.5 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all resize-none shadow-2xs min-h-20"
                />
              </div>

              {/* Submit CTA (Button Component) */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full border border-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground py-3 sm:py-3.5 px-8 font-bold uppercase tracking-wider text-xs sm:text-sm shadow-[0_10px_30px_-5px_rgba(139,58,43,0.35)] backdrop-blur-xl transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 h-auto"
                >
                  {isSubmitting ? (
                    <span>Processing Enrollment...</span>
                  ) : (
                    <>
                      <span>Submit Atelier Registration</span>
                      <Sparkles className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Right Column: Masterclass Highlights & Mentorship Card (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              {/* Mentorship Guarantee */}
              <div className="rounded-3xl border border-border/70 bg-muted/20 p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-bold">
                  <Award className="size-4" />
                  <span>THE ATELIER PEDAGOGY</span>
                </div>

                <div className="space-y-3 text-xs font-sans text-muted-foreground">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground">
                        Direct Mentorship:
                      </strong>{" "}
                      Small cohort strictly limited to 10 candidates per batch
                      for personalized one-on-one critique.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground">
                        Bengali Heritage Motifs:
                      </strong>{" "}
                      Shankha-Pola, floral vines, peacocks &amp; traditional
                      Kolka geometry drafting.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-foreground">
                        Certificate of Completion:
                      </strong>{" "}
                      Signed by founder Mussu Shekh, valid for luxury wedding
                      troupe auditions.
                    </span>
                  </div>
                </div>
              </div>

              {/* Studio Info Card */}
              <div className="rounded-3xl border border-primary/20 bg-primary/5 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-bold">
                  <BookOpen className="size-4" />
                  <span>STUDIO VENUE &amp; LOGISTICS</span>
                </div>

                <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                  Sessions are hosted at Mussu Henna Atelier Flagship, Camac
                  Heritage Mansions, Park Street, Kolkata. Live high-definition
                  multi-camera streaming available for candidates outside
                  Kolkata.
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Course Language:</span>
                  <span className="font-semibold text-foreground">
                    Bengali, English &amp; Hindi
                  </span>
                </div>
              </div>

              {/* WhatsApp Direct Help */}
              <div className="p-4 sm:p-5 rounded-3xl border border-border/70 bg-card/75 flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-heading text-sm font-bold text-foreground">
                    Questions on Eligibility?
                  </h4>
                  <p className="text-[11px] text-muted-foreground font-sans mt-0.5">
                    Speak directly with academy coordinators.
                  </p>
                </div>
                <Button
                  asChild
                  className="rounded-full bg-[#160B0F] hover:bg-primary text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs shrink-0 h-auto"
                >
                  <a
                    href="https://wa.me/919830000000?text=Hello%20Mussu%2C%20I%20have%20questions%20regarding%20atelier%20masterclass%20registration."
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="size-3.5 text-emerald-400 mr-1.5" />
                    <span>Chat</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* ── Confirmation Modal ── */}
      <AnimatePresence>
        {confirmedData && (
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
                APPLICATION RECORDED
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-black text-foreground mt-1">
                Welcome, {confirmedData.fullName}!
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-2 leading-relaxed">
                Your application for the masterclass program has been dispatched
                to WhatsApp for slot allotment.
              </p>

              <div className="my-5 p-4 rounded-2xl bg-muted/20 border border-border/50 space-y-2 text-xs font-sans">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cohort:</span>
                  <span className="font-semibold text-foreground font-mono">
                    {confirmedData.cohort}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student Kit:</span>
                  <span className="font-semibold text-primary">
                    {confirmedData.includeKit ? "Included" : "Self-Arranged"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-semibold text-foreground">
                    {confirmedData.city}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="flex-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-5 text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer h-auto"
                >
                  <a
                    href="https://wa.me/919830000000"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="size-4 mr-1.5" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setConfirmedData(null)}
                  className="px-5 py-3 rounded-full border border-border/70 hover:bg-muted text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-all cursor-pointer h-auto"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
