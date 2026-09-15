"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CheckoutValues } from "@/lib/schemas";

interface CartCheckoutFormProps {
  register: UseFormRegister<CheckoutValues>;
  errors: FieldErrors<CheckoutValues>;
}

export default function CartCheckoutForm({
  register,
  errors,
}: CartCheckoutFormProps) {
  return (
    <div className="rounded-3xl border border-border/70 bg-card/85 backdrop-blur-xl p-5 sm:p-7 shadow-xs space-y-4">
      <h3 className="font-heading text-sm sm:text-base font-bold text-foreground">
        Shipping &amp; Delivery Destination
      </h3>

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

      <div>
        <Label
          htmlFor="address"
          className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
        >
          STREET ADDRESS *
        </Label>
        <Input
          id="address"
          type="text"
          placeholder="House/Apartment number, street name, landmark"
          {...register("address")}
          className="rounded-xl bg-background/70 border-border/70 text-xs sm:text-sm h-10 shadow-2xs"
        />
        {errors.address && (
          <span className="text-[11px] text-destructive mt-1 block">
            {errors.address.message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <Label
            htmlFor="city"
            className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
          >
            CITY / DISTRICT *
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="Kolkata"
            {...register("city")}
            className="rounded-xl bg-background/70 border-border/70 text-xs sm:text-sm h-10 shadow-2xs"
          />
          {errors.city && (
            <span className="text-[11px] text-destructive mt-1 block">
              {errors.city.message}
            </span>
          )}
        </div>

        <div>
          <Label
            htmlFor="postalCode"
            className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
          >
            PIN CODE (6 DIGITS) *
          </Label>
          <Input
            id="postalCode"
            type="text"
            placeholder="700029"
            maxLength={6}
            {...register("postalCode")}
            className="rounded-xl bg-background/70 border-border/70 text-xs sm:text-sm h-10 font-mono shadow-2xs"
          />
          {errors.postalCode && (
            <span className="text-[11px] text-destructive mt-1 block">
              {errors.postalCode.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <Label
          htmlFor="notes"
          className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
        >
          SPECIAL DELIVERY INSTRUCTIONS (OPTIONAL)
        </Label>
        <Textarea
          id="notes"
          rows={2}
          placeholder="e.g. Leave with security / Ring bell twice..."
          {...register("notes")}
          className="rounded-xl bg-background/70 border-border/70 text-xs sm:text-sm p-3 shadow-2xs resize-none"
        />
      </div>
    </div>
  );
}
