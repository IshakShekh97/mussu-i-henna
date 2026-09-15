"use client";

import { Package } from "lucide-react";
import { type Control, Controller, type FieldErrors } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { RegistrationValues } from "@/lib/schemas";

interface ExperienceSelectorProps {
  control: Control<RegistrationValues>;
  errors: FieldErrors<RegistrationValues>;
}

export default function ExperienceSelector({
  control,
  errors,
}: ExperienceSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-2">
          PRIOR HENNA EXPERIENCE *
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
              {[
                {
                  id: "beginner",
                  label: "Beginner / Novice",
                  desc: "New to cone drafting",
                },
                {
                  id: "intermediate",
                  label: "Practicing Artist",
                  desc: "Knows basic lines & florals",
                },
                {
                  id: "professional",
                  label: "Professional",
                  desc: "Seeking Bengali Kolka mastery",
                },
              ].map((lvl) => {
                const isSelected = field.value === lvl.id;
                return (
                  <label
                    key={lvl.id}
                    htmlFor={`exp-${lvl.id}`}
                    className={`flex flex-col p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary/10 border-primary shadow-2xs"
                        : "bg-background/50 border-border/70 hover:border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-xs font-bold text-foreground">
                        {lvl.label}
                      </span>
                      <RadioGroupItem value={lvl.id} id={`exp-${lvl.id}`} />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-sans mt-1">
                      {lvl.desc}
                    </span>
                  </label>
                );
              })}
            </RadioGroup>
          )}
        />
        {errors.experienceLevel && (
          <span className="text-[11px] text-destructive mt-1 block">
            {errors.experienceLevel.message}
          </span>
        )}
      </div>

      <div className="p-3.5 rounded-2xl bg-muted/20 border border-border/60 flex items-start gap-3">
        <Controller
          name="includeKit"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="includeKit"
              checked={field.value}
              onCheckedChange={field.onChange}
              className="mt-0.5"
            />
          )}
        />
        <label htmlFor="includeKit" className="cursor-pointer select-none">
          <div className="flex items-center gap-1.5">
            <Package className="size-3.5 text-primary shrink-0" />
            <span className="text-xs font-bold text-foreground">
              Include Professional Atelier Student Tool Kit (+₹1,500)
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground font-sans mt-0.5 leading-relaxed">
            Includes 12 freshly rolled Bengal cones, Nilgiri terpene oil, Kolka
            acrylic practice boards, acrylic sealant glaze, and handbook.
          </p>
        </label>
      </div>
    </div>
  );
}
