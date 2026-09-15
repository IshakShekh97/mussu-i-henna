"use client";

import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
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
import { BENGAL_DISTRICTS } from "@/data/districts";
import type { BookingFormValues } from "@/lib/schemas";

interface BookingClientFormProps {
  register: UseFormRegister<BookingFormValues>;
  control: Control<BookingFormValues>;
  errors: FieldErrors<BookingFormValues>;
}

export default function BookingClientForm({
  register,
  control,
  errors,
}: BookingClientFormProps) {
  return (
    <div className="space-y-4">
      <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold block">
        04. CONTACT DETAILS &amp; CEREMONY VENUE
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <Label
            htmlFor="firstName"
            className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
          >
            FIRST NAME *
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Subhashree"
            {...register("firstName")}
            className="rounded-xl bg-background/70 border-border/70 text-xs sm:text-sm h-10.5 shadow-2xs"
          />
          {errors.firstName && (
            <span className="text-[11px] text-destructive mt-1 block">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div>
          <Label
            htmlFor="lastName"
            className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
          >
            LAST NAME *
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Sen"
            {...register("lastName")}
            className="rounded-xl bg-background/70 border-border/70 text-xs sm:text-sm h-10.5 shadow-2xs"
          />
          {errors.lastName && (
            <span className="text-[11px] text-destructive mt-1 block">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
            className="rounded-xl bg-background/70 border-border/70 text-xs sm:text-sm h-10.5 shadow-2xs"
          />
          {errors.email && (
            <span className="text-[11px] text-destructive mt-1 block">
              {errors.email.message}
            </span>
          )}
        </div>

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
            placeholder="+91 98300 XXXXX"
            {...register("phone")}
            className="rounded-xl bg-background/70 border-border/70 text-xs sm:text-sm h-10.5 shadow-2xs"
          />
          {errors.phone && (
            <span className="text-[11px] text-destructive mt-1 block">
              {errors.phone.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <Label
            htmlFor="citySelect"
            className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
          >
            WEST BENGAL DISTRICT *
          </Label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
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
                  {BENGAL_DISTRICTS.map((dist) => (
                    <SelectItem
                      key={dist}
                      value={dist}
                      className="rounded-lg px-3 py-2 text-xs sm:text-sm cursor-pointer transition-colors duration-150 focus:bg-primary/10 focus:text-primary data-checked:bg-primary/10 data-checked:text-primary"
                    >
                      {dist}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.city && (
            <span className="text-[11px] text-destructive mt-1 block">
              {errors.city.message}
            </span>
          )}
        </div>

        <div>
          <Label
            htmlFor="location"
            className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
          >
            CEREMONY VENUE / RESIDENCE *
          </Label>
          <Input
            id="location"
            type="text"
            placeholder="e.g. ITC Sonar / Salt Lake Block CE"
            {...register("location")}
            className="rounded-xl bg-background/70 border-border/70 text-xs sm:text-sm h-10.5 shadow-2xs"
          />
          {errors.location && (
            <span className="text-[11px] text-destructive mt-1 block">
              {errors.location.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <Label
          htmlFor="requirements"
          className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
        >
          SPECIAL REQUESTS / HEIRLOOM BENARASI MOTIFS (OPTIONAL)
        </Label>
        <Textarea
          id="requirements"
          rows={3}
          placeholder="Share your wedding theme, groom initials, specific floral vines, or bridal troupe count..."
          {...register("requirements")}
          className="rounded-xl bg-background/70 border-border/70 text-xs sm:text-sm p-3.5 shadow-2xs resize-none"
        />
        {errors.requirements && (
          <span className="text-[11px] text-destructive mt-1 block">
            {errors.requirements.message}
          </span>
        )}
      </div>
    </div>
  );
}
