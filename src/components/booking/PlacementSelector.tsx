"use client";

import { Check } from "lucide-react";
import { PLACEMENT_OPTIONS } from "@/data/booking";

interface PlacementSelectorProps {
  selectedPreferences: string[];
  onTogglePreference: (item: string) => void;
}

export default function PlacementSelector({
  selectedPreferences,
  onTogglePreference,
}: PlacementSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
          03. HENNA PLACEMENT PREFERENCES
        </span>
        <span className="text-[11px] font-mono text-muted-foreground">
          Multiple Selection
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {PLACEMENT_OPTIONS.map((item) => {
          const isSelected = selectedPreferences.includes(item);

          return (
            <button
              key={item}
              type="button"
              onClick={() => onTogglePreference(item)}
              className={`p-3 rounded-xl border text-left text-xs font-sans transition-all duration-150 flex items-center justify-between gap-2 cursor-pointer ${
                isSelected
                  ? "bg-primary/10 border-primary text-foreground font-semibold shadow-2xs"
                  : "bg-background/60 border-border/70 text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <span className="leading-snug">{item}</span>
              <div
                className={`size-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border/80 bg-background"
                }`}
              >
                {isSelected && <Check className="size-2.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
