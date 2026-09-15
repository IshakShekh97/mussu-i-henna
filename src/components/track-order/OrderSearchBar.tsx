"use client";

import { Search } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TrackOrderValues } from "@/lib/schemas";

interface OrderSearchBarProps {
  register: UseFormRegister<TrackOrderValues>;
  errors: FieldErrors<TrackOrderValues>;
  isSubmitting: boolean;
  onSelectSample: (orderId: string) => void;
}

export default function OrderSearchBar({
  register,
  errors,
  isSubmitting,
  onSelectSample,
}: OrderSearchBarProps) {
  return (
    <div className="space-y-3">
      <div className="relative flex items-center bg-card/90 rounded-2xl p-1.5 border border-border/80 shadow-sm">
        <div className="pl-3.5 text-muted-foreground">
          <Search className="size-4 text-primary" />
        </div>
        <Input
          type="text"
          placeholder="Enter Order ID (e.g. MH-2026-01)..."
          {...register("query")}
          className="border-0 bg-transparent text-xs sm:text-sm shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/60 h-auto py-2"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer h-auto shrink-0"
        >
          Track
        </Button>
      </div>

      {errors.query && (
        <span className="text-[11px] text-destructive block font-sans pl-2">
          {errors.query.message}
        </span>
      )}

      <div className="flex flex-wrap items-center gap-2 pl-2 text-xs font-mono text-muted-foreground">
        <span>Sample Orders:</span>
        {["MH-2026-01", "MH-2026-02", "MH-2026-03"].map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelectSample(id)}
            className="px-2.5 py-0.5 rounded-full bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border/60 transition-colors text-[11px] cursor-pointer"
          >
            {id}
          </button>
        ))}
      </div>
    </div>
  );
}
