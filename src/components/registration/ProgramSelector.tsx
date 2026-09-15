"use client";

import { type Control, Controller, type FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { COHORTS, WORKSHOP_PROGRAMS } from "@/data/academy";
import type { RegistrationValues } from "@/lib/schemas";

interface ProgramSelectorProps {
  control: Control<RegistrationValues>;
  errors: FieldErrors<RegistrationValues>;
}

export default function ProgramSelector({
  control,
  errors,
}: ProgramSelectorProps) {
  return (
    <div className="space-y-5">
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
    </div>
  );
}
