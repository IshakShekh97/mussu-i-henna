"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ExperienceSelector from "@/components/registration/ExperienceSelector";
import ProgramSelector from "@/components/registration/ProgramSelector";
import RegistrationConfirmationModal from "@/components/registration/RegistrationConfirmationModal";
import RegistrationSummaryCard from "@/components/registration/RegistrationSummaryCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { COHORTS, WORKSHOP_PROGRAMS } from "@/data/academy";
import { BENGAL_DISTRICTS } from "@/data/districts";
import { type RegistrationValues, registrationSchema } from "@/lib/schemas";

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
    await new Promise((resolve) => setTimeout(resolve, 350));
    setConfirmedData(data);
  };

  return (
    <main className="relative w-full min-h-screen pt-24 sm:pt-28 pb-20 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden">
      <div className="absolute top-24 left-1/4 -translate-x-1/2 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 right-1/4 w-96 h-96 bg-amber-500/6 rounded-full blur-3xl pointer-events-none" />

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

      <div className="relative z-10 w-full rounded-3xl border border-border/70 bg-card/85 backdrop-blur-xl p-5 sm:p-8 lg:p-10 shadow-xs">
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
            <div className="lg:col-span-7 space-y-5">
              <ProgramSelector control={control} errors={errors} />

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
                    className="rounded-xl bg-background/70 border-border/70 text-xs sm:text-sm h-10 shadow-2xs"
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
                    placeholder="subhashree@example.com"
                    {...register("email")}
                    className="rounded-xl bg-background/70 border-border/70 text-xs sm:text-sm h-10 shadow-2xs"
                  />
                  {errors.email && (
                    <span className="text-[11px] text-destructive mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <Label
                    htmlFor="phone"
                    className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                  >
                    WHATSAPP NUMBER *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98300 XXXXX"
                    {...register("phone")}
                    className="rounded-xl bg-background/70 border-border/70 text-xs sm:text-sm h-10 shadow-2xs"
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
                    DISTRICT / CITY *
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
                          className="max-h-72 rounded-xl border border-border/60 bg-card/95 backdrop-blur-2xl p-1.5 shadow-2xl text-foreground z-50 transform-gpu"
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

              <ExperienceSelector control={control} errors={errors} />

              <div>
                <Label
                  htmlFor="notes"
                  className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                >
                  SPECIAL LEARNING OBJECTIVES / PORTFOLIO GOALS (OPTIONAL)
                </Label>
                <Textarea
                  id="notes"
                  rows={3}
                  placeholder="Share what specific Bengali Kolka motifs or bridal styles you wish to master..."
                  {...register("notes")}
                  className="rounded-xl bg-background/70 border-border/70 text-xs sm:text-sm p-3 shadow-2xs resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs uppercase tracking-wider px-8 py-3.5 shadow-sm cursor-pointer h-auto"
                >
                  <span>Submit Masterclass Enrollment</span>
                </Button>
              </div>
            </div>

            <RegistrationSummaryCard />
          </div>
        </form>
      </div>

      <RegistrationConfirmationModal
        confirmedData={confirmedData}
        onClose={() => setConfirmedData(null)}
      />
    </main>
  );
}
