"use client";

import { Check, Plus, Sparkles, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CEREMONIES } from "@/data/booking";

interface CeremonySelectorProps {
  selectedCeremonies: string[];
  onSelectCeremony: (id: string) => void;
  customCeremoniesList: string[];
  isAddingCustom: boolean;
  setIsAddingCustom: (val: boolean) => void;
  customInputText: string;
  setCustomInputText: (val: string) => void;
  onAddCustom: () => void;
  onRemoveCustom: (name: string) => void;
  errorMessage?: string;
}

export default function CeremonySelector({
  selectedCeremonies,
  onSelectCeremony,
  customCeremoniesList,
  isAddingCustom,
  setIsAddingCustom,
  customInputText,
  setCustomInputText,
  onAddCustom,
  onRemoveCustom,
  errorMessage,
}: CeremonySelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
          01. CHOOSE CEREMONIAL OCCASION *
        </span>
        <span className="text-[11px] font-mono text-muted-foreground">
          Single Selection Only
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {CEREMONIES.map((ceremony) => {
          const isSelected = selectedCeremonies.includes(ceremony.id);
          const Icon = ceremony.icon;

          return (
            <button
              key={ceremony.id}
              type="button"
              onClick={() => onSelectCeremony(ceremony.id)}
              className={`relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/40"
                  : "border-border/60 bg-background/60 hover:bg-muted/40 hover:border-border"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-transparent font-bold"
                        : "bg-muted/60 text-muted-foreground border-border/60"
                    }`}
                  >
                    {ceremony.badge}
                  </Badge>

                  <div
                    className={`size-5 rounded-full flex items-center justify-center border transition-colors ${
                      isSelected
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-border/80 bg-background"
                    }`}
                  >
                    {isSelected && <Check className="size-3 stroke-[3]" />}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <Icon className="size-4 text-primary shrink-0" />
                  <h3 className="font-heading text-sm sm:text-base font-bold text-foreground">
                    {ceremony.title}
                  </h3>
                </div>

                <p className="text-[11px] font-mono text-primary/90 mt-0.5">
                  {ceremony.bengali}
                </p>

                <p className="text-xs text-muted-foreground font-sans mt-2 leading-relaxed">
                  {ceremony.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-border/40 text-[10px] font-mono text-muted-foreground">
                {ceremony.tag}
              </div>
            </button>
          );
        })}
      </div>

      {customCeremoniesList.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-mono text-muted-foreground">
            Custom Occasions:
          </span>
          {customCeremoniesList.map((customName) => {
            const customKey = `custom:${customName}`;
            const isSelected = selectedCeremonies.includes(customKey);

            return (
              <div
                key={customName}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary font-bold shadow-xs"
                    : "bg-background/80 text-foreground border-border/70 hover:border-border"
                }`}
                onClick={() => onSelectCeremony(customKey)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onSelectCeremony(customKey);
                  }
                }}
              >
                <span>{customName}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveCustom(customName);
                  }}
                  aria-label={`Remove ${customName}`}
                  className="hover:text-destructive transition-colors ml-0.5"
                >
                  <X className="size-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div>
        {isAddingCustom ? (
          <div className="flex items-center gap-2 max-w-md p-2 rounded-2xl bg-muted/30 border border-border/60">
            <Input
              type="text"
              placeholder="e.g. Gaye Holud Bridal Sister Troupe"
              value={customInputText}
              onChange={(e) => setCustomInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddCustom();
                }
              }}
              className="bg-background text-xs sm:text-sm h-9 rounded-xl border-border/70"
            />
            <Button
              type="button"
              size="sm"
              onClick={onAddCustom}
              className="rounded-xl px-3.5 h-9 text-xs font-mono uppercase tracking-wider"
            >
              Add
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                setIsAddingCustom(false);
                setCustomInputText("");
              }}
              className="rounded-xl"
            >
              <X className="size-4" />
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsAddingCustom(true)}
            className="rounded-full text-xs font-mono tracking-wider uppercase border-dashed border-border/80 hover:border-primary text-muted-foreground hover:text-foreground h-auto py-1.5 px-3.5 cursor-pointer"
          >
            <Plus className="size-3 mr-1" />
            <span>Add Custom Occasion</span>
          </Button>
        )}
      </div>

      {errorMessage && (
        <span className="text-[11px] text-destructive block font-sans">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
